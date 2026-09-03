<?php

namespace App\Http\Controllers\Client;

use App\Enums\ProviderStatus;
use App\Enums\UserTypeEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\GetProviderAvailabilityRequest;
use App\Models\AvailabilityBlock;
use App\Models\Booking;
use App\Models\ProviderProfile;
use App\Models\Service;
use App\Models\User;
use App\Services\HelperService;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProviderController extends Controller
{
    public function index(Request $request): Response
    {
        $client = $this->clientFrom($request);
        $search = trim($request->string('search')->toString());
        $favoritesOnly = $request->boolean('favorites');
        $favoriteProviderIds = $client->favoriteProviders()->pluck('id');

        $providers = ProviderProfile::query()
            ->approved()
            ->where('is_accepting_bookings', true)
            ->when($favoritesOnly, fn (Builder $query) => $query->whereKey($favoriteProviderIds))
            ->with(['services' => fn (Builder|Relation $query) => $query
                ->where('is_active', true)
                ->select(['id', 'provider_profile_id', 'name', 'price', 'min_duration_minutes', 'max_duration_minutes'])
                ->orderBy('sort_order')
                ->orderBy('name')])
            ->when($search !== '', function (Builder $query) use ($search): void {
                $term = "%{$search}%";
                $query->where(function (Builder $query) use ($term): void {
                    $query
                        ->whereRaw('LOWER(business_name) LIKE LOWER(?)', [$term])
                        ->orWhereRaw('LOWER(city) LIKE LOWER(?)', [$term])
                        ->orWhereRaw('LOWER(description) LIKE LOWER(?)', [$term])
                        ->orWhereHas('services', fn (Builder $serviceQuery) => $serviceQuery
                            ->where('is_active', true)
                            ->whereRaw('LOWER(name) LIKE LOWER(?)', [$term]));
                });
            })
            ->latest()
            ->paginate(12)
            ->withQueryString()
            ->through(fn (ProviderProfile $provider): array => $this->providerData($provider, $favoriteProviderIds->contains($provider->id)));

        return Inertia::render('client/providers/index', [
            'providers' => $providers,
            'filters' => ['search' => $search, 'favorites' => $favoritesOnly],
        ]);
    }

    public function show(Request $request, ProviderProfile $providerProfile): Response
    {
        $client = $this->clientFrom($request);
        abort_unless($providerProfile->status->value === 'approved' && $providerProfile->is_accepting_bookings, 404);

        $providerProfile->load([
            'services' => fn (Builder|Relation $query) => $query
                ->where('is_active', true)
                ->select(['id', 'provider_profile_id', 'name', 'description', 'price', 'min_duration_minutes', 'max_duration_minutes', 'requires_payment'])
                ->orderBy('sort_order')
                ->orderBy('name'),
            'businessHours:id,provider_profile_id,day_of_week,is_closed,opens_at,closes_at',
        ]);

        return Inertia::render('client/providers/show', [
            'provider' => $this->providerData($providerProfile, $client->favoriteProviders()->whereKey($providerProfile->id)->exists()),
            'businessHours' => HelperService::getBusinessHours($providerProfile),
        ]);
    }

    public function availability(GetProviderAvailabilityRequest $request, ProviderProfile $providerProfile): JsonResponse
    {
        $this->clientFrom($request);
        abort_unless($providerProfile->status === ProviderStatus::Approved && $providerProfile->is_accepting_bookings, 404);

        ['service_id' => $serviceId, 'date' => $date] = $request->validated();

        $service = $providerProfile->services()
            ->whereKey($serviceId)
            ->where('is_active', true)
            ->firstOrFail();

        $date = CarbonImmutable::createFromFormat('!Y-m-d', $date);

        return response()->json([
            'slots' => $this->availableSlots($providerProfile, $service, $date),
        ]);
    }

    /** @return array<string, mixed> */
    private function providerData(ProviderProfile $provider, bool $isFavorite = false): array
    {
        return [
            'id' => $provider->id,
            'slug' => $provider->slug,
            'business_name' => $provider->business_name,
            'description' => $provider->description,
            'phone' => $provider->phone,
            'email' => $provider->email,
            'address' => $provider->address,
            'city' => $provider->city,
            'avatar' => $provider->getFirstMediaUrl('avatar') ?: null,
            'is_favorite' => $isFavorite,
            'services' => $provider->services->map(fn ($service): array => [
                'id' => $service->id,
                'name' => $service->name,
                'description' => $service->description,
                'price' => (float) $service->price,
                'min_duration_minutes' => $service->min_duration_minutes,
                'max_duration_minutes' => $service->max_duration_minutes,
                'requires_payment' => $service->requires_payment,
            ])->values()->all(),
        ];
    }

    private function clientFrom(Request $request): User
    {
        $user = $request->user();

        abort_unless($user instanceof User && $user->hasRole(UserTypeEnum::CLIENT->value), 403);

        return $user;
    }

    /** @return array<int, string> */
    private function availableSlots(ProviderProfile $providerProfile, Service $service, CarbonImmutable $date): array
    {
        $businessHour = $providerProfile->businessHours()
            ->where('day_of_week', $date->dayOfWeek)
            ->first();

        if ($businessHour === null || $businessHour->is_closed || $businessHour->opens_at === null || $businessHour->closes_at === null) {
            return [];
        }

        $openingMinutes = $this->timeToMinutes($businessHour->opens_at);
        $closingMinutes = $this->timeToMinutes($businessHour->closes_at);
        $duration = $service->min_duration_minutes;
        $dayStart = $date->startOfDay();
        $dayEnd = $date->endOfDay();

        $bookings = $providerProfile->bookings()
            ->whereDate('schedule', $date->toDateString())
            ->where('status', '!=', Booking::STATUS_CANCELLED)
            ->get(['schedule', 'duration_minutes']);

        $blockedTimes = $providerProfile->availabilityBlocks()
            ->whereNotNull('starts_at')
            ->whereNotNull('ends_at')
            ->where('starts_at', '<', $dayEnd)
            ->where('ends_at', '>', $dayStart)
            ->get(['starts_at', 'ends_at']);

        $slots = [];

        for ($startMinutes = $openingMinutes; $startMinutes + $duration <= $closingMinutes; $startMinutes += 30) {
            $slotStart = $date->setTime(intdiv($startMinutes, 60), $startMinutes % 60);
            $slotEnd = $slotStart->addMinutes($duration);

            if ($slotStart->lessThanOrEqualTo(now())) {
                continue;
            }

            $bookingOverlaps = $bookings->contains(function (Booking $booking) use ($slotStart, $slotEnd): bool {
                $bookingStart = CarbonImmutable::instance($booking->schedule);
                $bookingEnd = $bookingStart->addMinutes($booking->duration_minutes ?? 30);

                return $bookingStart->lessThan($slotEnd) && $bookingEnd->greaterThan($slotStart);
            });
            $blockOverlaps = $blockedTimes->contains(function (AvailabilityBlock $block) use ($slotStart, $slotEnd): bool {
                $blockStart = CarbonImmutable::instance($block->starts_at);
                $blockEnd = CarbonImmutable::instance($block->ends_at);

                return $blockStart->lessThan($slotEnd) && $blockEnd->greaterThan($slotStart);
            });

            if (! $bookingOverlaps && ! $blockOverlaps) {
                $slots[] = $slotStart->format('H:i');
            }
        }

        return $slots;
    }

    private function timeToMinutes(string $time): int
    {
        [$hours, $minutes] = array_map('intval', explode(':', substr($time, 0, 5)));

        return ($hours * 60) + $minutes;
    }
}
