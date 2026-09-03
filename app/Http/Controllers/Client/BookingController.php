<?php

namespace App\Http\Controllers\Client;

use App\Enums\UserTypeEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreClientBookingRequest;
use App\Models\Booking;
use App\Models\ProviderProfile;
use App\Models\Service;
use App\Models\User;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    public function index(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();
        abort_unless($user->hasRole(UserTypeEnum::CLIENT), 403);
        Gate::authorize('viewAny', Booking::class);
        $tab = $request->string('tab')->toString();
        $tab = in_array($tab, ['upcoming', 'past', 'cancelled'], true) ? $tab : 'upcoming';
        $now = now();

        $bookings = $user->bookings()
            ->with([
                'providerProfile:id,business_name,slug,address,city',
                'service:id,name,price,min_duration_minutes,max_duration_minutes',
            ])
            ->when($tab === 'upcoming', fn (Builder $query) => $query
                ->where('schedule', '>=', $now)
                ->where('status', '!=', Booking::STATUS_CANCELLED))
            ->when($tab === 'past', fn (Builder $query) => $query
                ->where('schedule', '<', $now)
                ->where('status', '!=', Booking::STATUS_CANCELLED))
            ->when($tab === 'cancelled', fn (Builder $query) => $query->where('status', Booking::STATUS_CANCELLED))
            ->orderBy($tab === 'upcoming' ? 'schedule' : 'schedule', $tab === 'upcoming' ? 'asc' : 'desc')
            ->paginate(9)
            ->withQueryString()
            ->through(fn (Booking $booking): array => $this->bookingData($booking));

        return Inertia::render('client/bookings/index', [
            'bookings' => $bookings,
            'stats' => [
                'upcoming' => $user->bookings()->where('schedule', '>=', $now)->where('status', '!=', Booking::STATUS_CANCELLED)->count(),
                'completed' => $user->bookings()->where('schedule', '<', $now)->where('status', '!=', Booking::STATUS_CANCELLED)->count(),
                'cancelled' => $user->bookings()->where('status', Booking::STATUS_CANCELLED)->count(),
            ],
            'filters' => ['tab' => $tab],
        ]);
    }


    public function store(StoreClientBookingRequest $request): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();
        [
          'time' => $time,
          'date' => $date,
          'provider_profile_id' => $providerId,
          'service_id' => $serviceId,
          'notes' => $notes
        ] = $request->validated();

        $schedule = CarbonImmutable::createFromFormat('Y-m-d H:i', "{$date} {$time}");

        $duration = Service::find($serviceId)?->max_duration_minutes;

        DB::transaction(function () use ($serviceId, $providerId, $schedule, $duration, $user, $notes): void {
            $provider = ProviderProfile::query()->lockForUpdate()->findOrFail($providerId);
            $this->ensureWithinBusinessHours($provider, $schedule, $duration);
            $this->ensureNoBookingConflict($provider, $schedule, $duration);
            $provider->clients()->syncWithoutDetaching([$user->id]);
            $provider->bookings()->create([
                'user_id' => $user->id,
                'service_id' => $serviceId,
                'schedule' => $schedule,
                'duration_minutes' => $duration,
                'note' => $notes ?? null,
                'status' => Booking::STATUS_PENDING,
            ]);
        });

        return back()->with('success', 'Booking requested. The provider will confirm it shortly.');
    }

    public function show(Request $request, Booking $booking): Response
    {
        abort_unless($request->user()?->hasRole(UserTypeEnum::CLIENT->value), 403);
        Gate::authorize('view', $booking);
        $booking->load([
            'providerProfile:id,business_name,slug,address,city,phone,email',
            'service:id,name,price,min_duration_minutes,max_duration_minutes',
        ]);

        return Inertia::render('client/bookings/show', [
            'booking' => $this->bookingData($booking),
        ]);
    }

    public function destroy(Request $request, Booking $booking): RedirectResponse
    {
        abort_unless($request->user()?->hasRole(UserTypeEnum::CLIENT->value), 403);
        Gate::authorize('delete', $booking);
        $booking->update(['status' => Booking::STATUS_CANCELLED]);

        return to_route('client.booking.index')->with('success', 'Booking cancelled.');
    }

    /** @return array<string, mixed> */
    private function bookingData(Booking $booking): array
    {
        $status = $booking->status === Booking::STATUS_CONFIRMED && $booking->schedule?->isPast()
            ? Booking::STATUS_COMPLETED
            : $booking->status;
        $duration = $booking->duration_minutes
            ?? $booking->service?->max_duration_minutes
            ?? $booking->service?->min_duration_minutes
            ?? 0;

        return [
            'id' => $booking->id,
            'reference' => '#'.strtoupper(substr($booking->id, 0, 8)),
            'provider' => $booking->providerProfile?->business_name ?? 'Provider unavailable',
            'provider_slug' => $booking->providerProfile?->slug,
            'address' => $booking->providerProfile?->address,
            'city' => $booking->providerProfile?->city,
            'phone' => $booking->providerProfile?->phone,
            'email' => $booking->providerProfile?->email,
            'service' => $booking->service?->name ?? 'Service unavailable',
            'date' => $booking->schedule?->format('l, M j, Y'),
            'time' => $booking->schedule?->format('h:i A'),
            'schedule' => $booking->schedule?->toIso8601String(),
            'duration' => $duration,
            'amount' => (float) ($booking->service?->price ?? 0),
            'status' => $status,
            'note' => $booking->note,
            'booked_on' => $booking->created_at->format('l, M j, Y'),
            'can_cancel' => $status !== Booking::STATUS_COMPLETED
                && $status !== Booking::STATUS_CANCELLED
                && $booking->schedule?->isFuture(),
        ];
    }

    private function ensureWithinBusinessHours(ProviderProfile $provider, CarbonImmutable $schedule, int $duration): void
    {
        $hour = $provider->businessHours()
            ->where('day_of_week', $schedule->dayOfWeek)
            ->first();

        if ($hour === null) {
            return;
        }

        $start = $schedule->format('H:i');
        $end = $schedule->addMinutes($duration)->format('H:i');
        $opensAt = substr((string) $hour->opens_at, 0, 5);
        $closesAt = substr((string) $hour->closes_at, 0, 5);

        abort_if($hour->is_closed || $hour->opens_at === null || $hour->closes_at === null || $start < $opensAt || $end > $closesAt, 422, 'The selected time is outside the provider\'s business hours.');
    }

    private function ensureNoBookingConflict(ProviderProfile $provider, CarbonImmutable $schedule, int $duration): void
    {
        $end = $schedule->addMinutes($duration);

        $hasConflict = $provider->bookings()
            ->whereDate('schedule', $schedule->toDateString())
            ->where('status', '!=', Booking::STATUS_CANCELLED)
            ->lockForUpdate()
            ->get(['schedule', 'duration_minutes'])
            ->contains(function (Booking $booking) use ($schedule, $end): bool {
                $bookingEnd = $booking->schedule?->addMinutes($booking->duration_minutes ?? 0);

                return $bookingEnd !== null && $booking->schedule < $end && $bookingEnd > $schedule;
            });

        $hasBlockedTime = $provider->availabilityBlocks()
            ->where('starts_at', '<', $end)
            ->where('ends_at', '>', $schedule)
            ->lockForUpdate()
            ->exists();

        abort_if($hasConflict || $hasBlockedTime, 422, 'That time is no longer available. Please choose another slot.');
    }
}
