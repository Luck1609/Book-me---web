<?php

namespace App\Http\Controllers;

use App\Actions\Provider\GetProviderDashboard;
use App\Enums\UserTypeEnum;
use App\Models\Booking;
use App\Models\ProviderProfile;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request, GetProviderDashboard $getProviderDashboard): Response
    {
        $user = $request->user();

        abort_unless($user instanceof User, 401);

        if ($user->hasRole(UserTypeEnum::CLIENT)) {
            return inertia('client/dashboard', $this->clientDashboardData($user));
        }

        $providerProfile = $user->providerProfile()->firstOrFail();
        Gate::authorize('view', $providerProfile);

        return inertia('provider/dashboard', $getProviderDashboard($providerProfile));
    }

    /** @return array<string, mixed> */
    private function clientDashboardData(User $user): array
    {
        $now = now();
        $upcomingBooking = $user->bookings()
            ->with([
                'providerProfile:id,business_name,slug,address,city',
                'service:id,name,price,min_duration_minutes,max_duration_minutes',
            ])
            ->where('schedule', '>=', $now)
            ->where('status', '!=', Booking::STATUS_CANCELLED)
            ->orderBy('schedule')
            ->first();
        $recentBookings = $user->bookings()
            ->with([
                'providerProfile:id,business_name,slug,city',
                'service:id,name,price',
            ])
            ->latest('schedule')
            ->limit(4)
            ->get();
        $favoriteProviderIds = $user->favoriteProviders()->pluck('id');
        $providers = ProviderProfile::query()
            ->approved()
            ->where('is_accepting_bookings', true)
            ->with(['services' => fn (Builder|Relation $query) => $query
                ->where('is_active', true)
                ->select(['id', 'provider_profile_id', 'name', 'price', 'min_duration_minutes', 'max_duration_minutes'])
                ->orderBy('sort_order')
                ->orderBy('name')])
            ->latest()
            ->limit(6)
            ->get()
            ->map(fn (ProviderProfile $provider): array => $this->providerData($provider, $favoriteProviderIds->contains($provider->id)))
            ->values()
            ->all();

        return [
            'upcomingBooking' => $upcomingBooking ? $this->bookingData($upcomingBooking) : null,
            'recentBookings' => $recentBookings->map(fn (Booking $booking): array => $this->bookingData($booking))->values()->all(),
            'providers' => $providers,
            'stats' => [
                'upcoming' => $user->bookings()->where('schedule', '>=', $now)->where('status', '!=', Booking::STATUS_CANCELLED)->count(),
                'completed' => $user->bookings()->where('schedule', '<', $now)->where('status', '!=', Booking::STATUS_CANCELLED)->count(),
                'savedProviders' => $user->favoriteProviders()->count(),
            ],
        ];
    }

    /** @return array<string, mixed> */
    private function bookingData(Booking $booking): array
    {
        return [
            'id' => $booking->id,
            'provider' => $booking->providerProfile?->business_name ?? 'Provider unavailable',
            'provider_slug' => $booking->providerProfile?->slug,
            'city' => $booking->providerProfile?->city,
            'service' => $booking->service?->name ?? 'Service unavailable',
            'date' => $booking->schedule?->format('D, M j'),
            'time' => $booking->schedule?->format('g:i A'),
            'status' => $booking->status === Booking::STATUS_CONFIRMED && $booking->schedule?->isPast()
                ? Booking::STATUS_COMPLETED
                : $booking->status,
            'amount' => (float) ($booking->service?->price ?? 0),
        ];
    }

    /** @return array<string, mixed> */
    private function providerData(ProviderProfile $provider, bool $isFavorite = false): array
    {
        return [
            'id' => $provider->id,
            'slug' => $provider->slug,
            'business_name' => $provider->business_name,
            'description' => $provider->description,
            'city' => $provider->city,
            'avatar' => $provider->getFirstMediaUrl('avatar') ?: null,
            'is_favorite' => $isFavorite,
            'services' => $provider->services->map(fn ($service): array => [
                'id' => $service->id,
                'name' => $service->name,
                'price' => (float) $service->price,
                'min_duration_minutes' => $service->min_duration_minutes,
                'max_duration_minutes' => $service->max_duration_minutes,
            ])->values()->all(),
        ];
    }
}
