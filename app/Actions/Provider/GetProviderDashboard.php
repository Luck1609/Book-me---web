<?php

namespace App\Actions\Provider;

use App\Models\Booking;
use App\Models\ProviderProfile;
use App\Models\Service;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Collection;

class GetProviderDashboard
{
    /**
     * Build the dashboard data for a provider profile.
     *
     * @return array<string, mixed>
     */
    public function __invoke(ProviderProfile $providerProfile): array
    {
        $now = now();
        $today = $now->startOfDay();
        $monthStart = $now->startOfMonth();
        $monthEnd = $now->endOfMonth();
        $previousMonthStart = $monthStart->subMonth();
        $previousMonthEnd = $monthStart->subSecond();
        $weekStart = $now->startOfWeek();
        $weekEnd = $weekStart->endOfWeek();

        $todayBookings = $this->todayBookings($providerProfile, $today);
        $monthlyBookings = $this->bookingsCount($providerProfile, $monthStart, $monthEnd);
        $monthlyRevenue = $this->revenue($providerProfile, $monthStart, $monthEnd);
        $previousMonthlyBookings = $this->bookingsCount($providerProfile, $previousMonthStart, $previousMonthEnd);
        $previousMonthlyRevenue = $this->revenue($providerProfile, $previousMonthStart, $previousMonthEnd);

        return [
            'date' => $today->toDateString(),
            'metrics' => [
                'bookings_this_month' => $monthlyBookings,
                'bookings_change_percentage' => $this->percentageChange($monthlyBookings, $previousMonthlyBookings),
                'revenue_this_month' => $monthlyRevenue,
                'revenue_change_percentage' => $this->percentageChange($monthlyRevenue, $previousMonthlyRevenue),
                'new_clients_count' => $this->newClientsCount($providerProfile, $monthStart, $monthEnd),
                'returning_clients_percentage' => $this->returningClientsPercentage($providerProfile, $monthStart, $monthEnd),
                'client_satisfaction' => null,
            ],
            'today' => [
                'booking_count' => $todayBookings->count(),
                'next_appointment_in_minutes' => $this->nextAppointmentInMinutes($todayBookings, $now),
                'appointments' => $todayBookings->map(fn (Booking $booking): array => $this->appointment($booking, $now))->values()->all(),
            ],
            'profile' => $this->profileCompletion($providerProfile),
            'services' => $providerProfile->services()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get(['id', 'name', 'price', 'min_duration_minutes', 'max_duration_minutes'])
                ->map(fn (Service $service): array => [
                    'id' => $service->id,
                    'name' => $service->name,
                    'price' => (float) $service->price,
                    'min_duration_minutes' => $service->min_duration_minutes,
                    'max_duration_minutes' => $service->max_duration_minutes,
                ])
                ->values()
                ->all(),
            'weekly_revenue' => $this->weeklyRevenue($providerProfile, $weekStart, $weekEnd),
        ];
    }

    /**
     * @return Collection<int, Booking>
     */
    private function todayBookings(ProviderProfile $providerProfile, CarbonImmutable $today): Collection
    {
        return Booking::query()
            ->whereBelongsTo($providerProfile)
            ->with([
                'user:id,name',
                'service:id,name,min_duration_minutes,max_duration_minutes,price',
            ])
            ->whereBetween('schedule', [$today, $today->endOfDay()])
            ->orderBy('schedule')
            ->get();
    }

    private function bookingsCount(ProviderProfile $providerProfile, CarbonImmutable $start, CarbonImmutable $end): int
    {
        return Booking::query()
            ->whereBelongsTo($providerProfile)
            ->whereBetween('schedule', [$start, $end])
            ->count();
    }

    private function revenue(ProviderProfile $providerProfile, CarbonImmutable $start, CarbonImmutable $end): float
    {
        $bookingTable = (new Booking)->getTable();
        $serviceTable = (new Service)->getTable();

        return (float) Booking::query()
            ->whereBelongsTo($providerProfile)
            ->join($serviceTable, "{$serviceTable}.id", '=', "{$bookingTable}.service_id")
            ->whereBetween("{$bookingTable}.schedule", [$start, $end])
            ->sum("{$serviceTable}.price");
    }

    private function returningClientsPercentage(ProviderProfile $providerProfile, CarbonImmutable $start, CarbonImmutable $end): float
    {
        $clientVisitCounts = Booking::query()
            ->whereBelongsTo($providerProfile)
            ->whereBetween('schedule', [$start, $end])
            ->whereNotNull('user_id')
            ->select('user_id')
            ->selectRaw('COUNT(*) as booking_count')
            ->groupBy('user_id')
            ->pluck('booking_count');

        if ($clientVisitCounts->isEmpty()) {
            return 0;
        }

        return round(
            $clientVisitCounts->filter(fn (mixed $bookingCount): bool => (int) $bookingCount > 1)->count()
                / $clientVisitCounts->count()
                * 100,
            1,
        );
    }

    private function newClientsCount(ProviderProfile $providerProfile, CarbonImmutable $start, CarbonImmutable $end): int
    {
        $bookingTable = (new Booking)->getTable();

        return Booking::query()
            ->whereBelongsTo($providerProfile)
            ->whereNotNull('user_id')
            ->whereBetween('schedule', [$start, $end])
            ->whereNotExists(function ($query) use ($bookingTable, $providerProfile, $start): void {
                $query
                    ->selectRaw('1')
                    ->from("{$bookingTable} as previous_bookings")
                    ->whereColumn('previous_bookings.user_id', "{$bookingTable}.user_id")
                    ->where('previous_bookings.provider_profile_id', $providerProfile->id)
                    ->where('previous_bookings.schedule', '<', $start);
            })
            ->distinct()
            ->count('user_id');
    }

    /**
     * @param  Collection<int, Booking>  $bookings
     */
    private function nextAppointmentInMinutes(Collection $bookings, CarbonImmutable $now): ?int
    {
        $nextBooking = $bookings->first(fn (Booking $booking): bool => $booking->schedule->gt($now));

        return $nextBooking === null ? null : max(0, (int) $now->diffInMinutes($nextBooking->schedule, false));
    }

    /**
     * @return array<string, mixed>
     */
    private function appointment(Booking $booking, CarbonImmutable $now): array
    {
        $schedule = $booking->schedule;
        $service = $booking->service;
        $durationMinutes = optional($service)->max_duration_minutes ?? optional($service)->min_duration_minutes ?? 0;
        $endsAt = $schedule->addMinutes($durationMinutes);
        $status = $endsAt->lte($now) ? 'completed' : ($schedule->lte($now) ? 'in-progress' : 'upcoming');

        return [
            'id' => $booking->id,
            'client' => optional($booking->user)->name ?? 'Unknown client',
            'service' => optional($service)->name ?? 'Service unavailable',
            'time' => $schedule->format('h:i A'),
            'duration' => "{$durationMinutes} min",
            'price' => (float) (optional($service)->price ?? 0),
            'status' => $status,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function profileCompletion(ProviderProfile $providerProfile): array
    {
        $checklist = [
            [
                'key' => 'add_cover_photo',
                'label' => 'Add a cover photo',
                'completed' => $providerProfile->getFirstMediaUrl('avatar') !== '',
            ],
            [
                'key' => 'set_availability',
                'label' => 'Set your availability',
                'completed' => $providerProfile->businessHours()->where('is_closed', false)->exists(),
            ],
            [
                'key' => 'share_booking_link',
                'label' => 'Share your booking link',
                'completed' => filled($providerProfile->slug),
            ],
        ];

        $completedItems = collect($checklist)->where('completed', true)->count();

        return [
            'business_name' => $providerProfile->business_name,
            'completion_percentage' => (int) round($completedItems / count($checklist) * 100),
            'checklist' => $checklist,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function weeklyRevenue(ProviderProfile $providerProfile, CarbonImmutable $weekStart, CarbonImmutable $weekEnd): array
    {
        $currentWeekTotal = $this->revenue($providerProfile, $weekStart, $weekEnd);
        $previousWeekStart = $weekStart->subWeek();
        $previousWeekTotal = $this->revenue($providerProfile, $previousWeekStart, $previousWeekStart->endOfWeek());
        $bookingTable = (new Booking)->getTable();

        $bookings = Booking::query()
            ->whereBelongsTo($providerProfile)
            ->with('service:id,price')
            ->whereBetween("{$bookingTable}.schedule", [$weekStart, $weekEnd])
            ->get(['id', 'service_id', 'schedule']);

        $dailyTotals = $bookings
            ->groupBy(fn (Booking $booking): string => $booking->schedule->toDateString())
            ->map(fn (Collection $dayBookings): float => (float) $dayBookings->sum(
                fn (Booking $booking): float => (float) (optional($booking->service)->price ?? 0),
            ));
        $maximumDailyRevenue = max(1, (float) $dailyTotals->max());

        $days = collect(range(0, 6))->map(function (int $offset) use ($weekStart, $dailyTotals, $maximumDailyRevenue): array {
            $date = $weekStart->addDays($offset);
            $amount = (float) $dailyTotals->get($date->toDateString(), 0);

            return [
                'date' => $date->toDateString(),
                'day' => $date->format('D'),
                'amount' => $amount,
                'value' => round($amount / $maximumDailyRevenue * 100, 1),
            ];
        })->all();

        return [
            'start_date' => $weekStart->toDateString(),
            'end_date' => $weekEnd->toDateString(),
            'total' => $currentWeekTotal,
            'change_percentage' => $this->percentageChange($currentWeekTotal, $previousWeekTotal),
            'days' => $days,
        ];
    }

    private function percentageChange(float $current, float $previous): float
    {
        if ($previous === 0.0) {
            return $current === 0.0 ? 0.0 : 100.0;
        }

        return round(($current - $previous) / $previous * 100, 1);
    }
}
