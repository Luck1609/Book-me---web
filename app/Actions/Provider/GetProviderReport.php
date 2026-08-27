<?php

namespace App\Actions\Provider;

use App\Models\Booking;
use App\Models\ProviderProfile;
use App\Models\Service;
use App\Models\StaffMember;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class GetProviderReport
{
    /**
     * Build report data for a provider and the requested date range.
     *
     * @return array<string, mixed>
     */
    public function __invoke(
        ProviderProfile $providerProfile,
        string $period = '30d',
        ?string $startDate = null,
        ?string $endDate = null,
    ): array {
        [$start, $end] = $this->dateRange($period, $startDate, $endDate);
        $previousEnd = $start->subDay()->endOfDay();
        $previousStart = $previousEnd->subDays($start->diffInDays($end))->startOfDay();

        $bookings = $this->bookingQuery($providerProfile, $start, $end)
            ->with([
                'user:id,name',
                'service:id,name,price',
                'staffMember:id,name,role,rating',
            ])
            ->get(['id', 'user_id', 'service_id', 'staff_member_id', 'schedule']);
        $revenue = (float) $bookings->sum(fn (Booking $booking): float => $this->bookingRevenue($booking));
        $previousSummary = $this->summary($providerProfile, $previousStart, $previousEnd);
        $clientVisits = $bookings->whereNotNull('user_id')->groupBy('user_id');
        $returningClientIds = $clientVisits
            ->filter(fn (Collection $visits): bool => $visits->count() > 1)
            ->keys();
        $averageBooking = $bookings->isEmpty() ? 0.0 : $revenue / $bookings->count();

        return [
            'date_range' => [
                'start_date' => $start->toDateString(),
                'end_date' => $end->toDateString(),
            ],
            'stats' => [
                'revenue' => $revenue,
                'revenue_change' => $this->percentageChange($revenue, $previousSummary['revenue']),
                'bookings' => $bookings->count(),
                'bookings_change' => $this->percentageChange($bookings->count(), $previousSummary['bookings']),
                'average_booking' => $averageBooking,
                'average_change' => $this->percentageChange($averageBooking, $previousSummary['average_booking']),
                'retention' => $clientVisits->isEmpty() ? 0.0 : round($returningClientIds->count() / $clientVisits->count() * 100, 1),
                'retention_change' => $this->percentageChange(
                    $clientVisits->isEmpty() ? 0.0 : $returningClientIds->count() / $clientVisits->count() * 100,
                    $previousSummary['retention'],
                ),
            ],
            'chart' => $this->chart($bookings, $start, $end),
            'services' => $this->serviceMix($bookings, $revenue),
            'team' => $this->teamPerformance($providerProfile, $bookings),
            'top_clients' => $this->topClients($clientVisits),
            'returning_revenue' => (float) $bookings
                ->filter(fn (Booking $booking): bool => $booking->user_id !== null && $returningClientIds->contains($booking->user_id))
                ->sum(fn (Booking $booking): float => $this->bookingRevenue($booking)),
            'returning_revenue_percentage' => $revenue === 0.0
                ? 0.0
                : round(
                    $bookings
                        ->filter(fn (Booking $booking): bool => $booking->user_id !== null && $returningClientIds->contains($booking->user_id))
                        ->sum(fn (Booking $booking): float => $this->bookingRevenue($booking))
                    / $revenue * 100,
                    1,
                ),
            'insight' => $this->insight($bookings, $start, $end),
        ];
    }

    /** @return array{0: CarbonImmutable, 1: CarbonImmutable} */
    private function dateRange(string $period, ?string $startDate, ?string $endDate): array
    {
        if ($period === 'custom' && $startDate !== null && $endDate !== null) {
            return [
                CarbonImmutable::parse($startDate)->startOfDay(),
                CarbonImmutable::parse($endDate)->endOfDay(),
            ];
        }

        $end = CarbonImmutable::now()->endOfDay();

        if ($period === 'year') {
            return [CarbonImmutable::now()->startOfYear(), $end];
        }

        $days = match ($period) {
            '7d' => 7,
            '90d' => 90,
            default => 30,
        };

        return [$end->subDays($days - 1)->startOfDay(), $end];
    }

    /** @return Builder<Booking> */
    private function bookingQuery(ProviderProfile $providerProfile, CarbonImmutable $start, CarbonImmutable $end): Builder
    {
        return Booking::query()
            ->whereBelongsTo($providerProfile)
            ->whereBetween('schedule', [$start, $end])
            ->where('status', '!=', Booking::STATUS_CANCELLED);
    }

    /** @return array{bookings: int, revenue: float, average_booking: float, retention: float} */
    private function summary(ProviderProfile $providerProfile, CarbonImmutable $start, CarbonImmutable $end): array
    {
        $bookings = $this->bookingsCount($providerProfile, $start, $end);
        $revenue = $this->revenue($providerProfile, $start, $end);

        return [
            'bookings' => $bookings,
            'revenue' => $revenue,
            'average_booking' => $bookings === 0 ? 0.0 : $revenue / $bookings,
            'retention' => $this->retention($providerProfile, $start, $end),
        ];
    }

    private function bookingsCount(ProviderProfile $providerProfile, CarbonImmutable $start, CarbonImmutable $end): int
    {
        return $this->bookingQuery($providerProfile, $start, $end)->count();
    }

    private function revenue(ProviderProfile $providerProfile, CarbonImmutable $start, CarbonImmutable $end): float
    {
        $bookingTable = (new Booking)->getTable();
        $serviceTable = (new Service)->getTable();

        return (float) $this->bookingQuery($providerProfile, $start, $end)
            ->join($serviceTable, "{$serviceTable}.id", '=', "{$bookingTable}.service_id")
            ->sum("{$serviceTable}.price");
    }

    private function retention(ProviderProfile $providerProfile, CarbonImmutable $start, CarbonImmutable $end): float
    {
        $visits = $this->bookingQuery($providerProfile, $start, $end)
            ->whereNotNull('user_id')
            ->select('user_id')
            ->selectRaw('COUNT(*) as booking_count')
            ->groupBy('user_id')
            ->get();

        if ($visits->isEmpty()) {
            return 0.0;
        }

        return round($visits->filter(fn (Booking $visit): bool => (int) $visit->booking_count > 1)->count() / $visits->count() * 100, 1);
    }

    private function bookingRevenue(Booking $booking): float
    {
        return (float) ($booking->service?->price ?? 0);
    }

    /** @return array<int, array{label: string, revenue: float, bookings: int}> */
    private function chart(EloquentCollection $bookings, CarbonImmutable $start, CarbonImmutable $end): array
    {
        $spanDays = $start->diffInDays($end) + 1;
        $step = $spanDays <= 14 ? 'day' : ($spanDays <= 90 ? 'week' : 'month');
        $buckets = [];
        $cursor = $start->startOfDay();

        while ($cursor->lte($end)) {
            $bucket = $this->bucketForDate($cursor, $start, $spanDays);
            $buckets[$bucket['key']] = [
                'label' => $bucket['label'],
                'revenue' => 0.0,
                'bookings' => 0,
            ];
            $cursor = match ($step) {
                'day' => $cursor->addDay(),
                'week' => $cursor->addWeek(),
                default => $cursor->startOfMonth()->addMonth(),
            };
        }

        foreach ($bookings as $booking) {
            $bucket = $this->bucketForDate(CarbonImmutable::instance($booking->schedule), $start, $spanDays);
            $buckets[$bucket['key']] ??= [
                'label' => $bucket['label'],
                'revenue' => 0.0,
                'bookings' => 0,
            ];
            $buckets[$bucket['key']]['revenue'] += $this->bookingRevenue($booking);
            $buckets[$bucket['key']]['bookings']++;
        }

        return array_values($buckets);
    }

    /** @return array{key: string, label: string} */
    private function bucketForDate(CarbonImmutable $date, CarbonImmutable $start, int $spanDays): array
    {
        if ($spanDays <= 14) {
            $bucket = $date->startOfDay();

            return ['key' => $bucket->toDateString(), 'label' => $bucket->format('M j')];
        }

        if ($spanDays <= 90) {
            $bucket = $start->startOfDay()->addDays(intdiv($start->diffInDays($date), 7) * 7);

            return ['key' => $bucket->toDateString(), 'label' => $bucket->format('M j')];
        }

        $bucket = $date->startOfMonth();

        return ['key' => $bucket->toDateString(), 'label' => $bucket->format('M Y')];
    }

    /** @return array<int, array{name: string, bookings: int, revenue: float, share: float}> */
    private function serviceMix(EloquentCollection $bookings, float $totalRevenue): array
    {
        $services = $bookings->groupBy(fn (Booking $booking): string => $booking->service_id ?? 'unknown')
            ->map(function (EloquentCollection $serviceBookings): array {
                $service = $serviceBookings->first()->service;
                $revenue = (float) $serviceBookings->sum(fn (Booking $booking): float => $this->bookingRevenue($booking));

                return [
                    'name' => $service?->name ?? 'Service unavailable',
                    'bookings' => $serviceBookings->count(),
                    'revenue' => $revenue,
                    'share' => 0.0,
                ];
            })
            ->sortByDesc('revenue')
            ->values();

        return $services->map(fn (array $service): array => [
            ...$service,
            'share' => $totalRevenue === 0.0 ? 0.0 : round($service['revenue'] / $totalRevenue * 100, 1),
        ])->all();
    }

    /** @return array<int, array<string, mixed>> */
    private function teamPerformance(ProviderProfile $providerProfile, EloquentCollection $bookings): array
    {
        $bookingsByStaff = $bookings->whereNotNull('staff_member_id')->groupBy('staff_member_id');

        return $providerProfile->staffMembers()
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'role', 'rating'])
            ->map(function (StaffMember $member) use ($bookingsByStaff): array {
                $memberBookings = $bookingsByStaff->get($member->id, collect());

                return [
                    'id' => $member->id,
                    'name' => $member->name,
                    'initials' => $this->initials($member->name),
                    'role' => $member->role,
                    'bookings' => $memberBookings->count(),
                    'revenue' => (float) $memberBookings->sum(fn (Booking $booking): float => $this->bookingRevenue($booking)),
                    'rating' => $member->rating === null ? null : (float) $member->rating,
                ];
            })
            ->sortByDesc('bookings')
            ->values()
            ->all();
    }

    /** @return array<int, array<string, mixed>> */
    private function topClients(Collection $clientVisits): array
    {
        return $clientVisits->map(function (EloquentCollection $visits): array {
            $client = $visits->first()->user;

            return [
                'id' => $client?->id,
                'name' => $client?->name ?? 'Unknown client',
                'initials' => $this->initials($client?->name ?? 'Unknown client'),
                'visits' => $visits->count(),
                'spend' => (float) $visits->sum(fn (Booking $booking): float => $this->bookingRevenue($booking)),
            ];
        })->sortByDesc('spend')->take(3)->values()->all();
    }

    private function initials(string $name): string
    {
        $parts = preg_split('/\s+/', trim($name)) ?: [];

        return Str::upper(collect($parts)->filter()->take(2)->map(fn (string $part): string => Str::substr($part, 0, 1))->implode(''));
    }

    private function insight(EloquentCollection $bookings, CarbonImmutable $start, CarbonImmutable $end): string
    {
        $chart = collect($this->chart($bookings, $start, $end));
        $strongest = $chart->sortByDesc('revenue')->first();

        if ($strongest === null || $strongest['bookings'] === 0) {
            return 'No bookings were recorded for this period. Add availability to create more opportunities for clients.';
        }

        return "{$strongest['label']} was your strongest period with {$strongest['bookings']} booking".
            ($strongest['bookings'] === 1 ? '' : 's').'. Consider opening another slot around this time.';
    }

    private function percentageChange(float|int $current, float|int $previous): float
    {
        if ((float) $previous === 0.0) {
            return (float) $current === 0.0 ? 0.0 : 100.0;
        }

        return round(((float) $current - (float) $previous) / (float) $previous * 100, 1);
    }
}
