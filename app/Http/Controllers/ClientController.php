<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Models\Booking;
use App\Models\ProviderProfile;
use App\Models\User;
use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        /** @var User $provider */
        $provider = $request->user();
        Gate::authorize('viewAny', Booking::class);

        $providerProfile = $provider->providerProfile()->firstOrFail();
        $search = trim($request->string('search')->toString());
        $segment = $request->string('segment')->toString();
        $sort = $request->string('sort')->toString() === 'oldest' ? 'oldest' : 'recent';
        $query = $this->clientQuery($providerProfile);

        $this->applySearch($query, $search, $providerProfile);
        $this->applySegmentFilter($query, $segment, $providerProfile);

        $clients = $query
            ->with($this->clientBookingLoad($providerProfile))
            ->withMax($this->lastVisitLoad($providerProfile), 'schedule')
            ->orderByRaw('provider_last_visit_at '.($sort === 'oldest' ? 'ASC' : 'DESC').' NULLS LAST')
            ->orderBy('name')
            ->paginate(12)
            ->withQueryString()
            ->through(fn (User $client): array => $this->clientData($client));

        return Inertia::render('provider/clients/index', [
            'clients' => $clients,
            'stats' => $this->stats($providerProfile),
            'filters' => [
                'search' => $search,
                'segment' => in_array($segment, ['regular', 'new', 'inactive'], true) ? $segment : 'all',
                'sort' => $sort,
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClientRequest $request): RedirectResponse
    {
        /** @var User $provider */
        $provider = $request->user();
        $providerProfile = $provider->providerProfile()->firstOrFail();
        $data = $request->validated();

        DB::transaction(function () use ($data, $providerProfile): void {
            $client = User::query()->where('email', $data['email'])->first();

            if ($client === null) {
                $client = User::query()->create($data);
            } else {
                $client->update([
                    'name' => $data['name'],
                    'phone' => $data['phone'] ?? null,
                ]);
            }

            $providerProfile->clients()->syncWithoutDetaching([$client->id]);
        });

        return to_route('client.index')->with('success', 'Client added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        return Inertia::render('provider/clients/show');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): never
    {
        abort(404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): never
    {
        abort(404);
    }

    /**
     * @return Builder<User>
     */
    private function clientQuery(ProviderProfile $providerProfile): Builder
    {
        return User::query()->where(function (Builder $query) use ($providerProfile): void {
            $query
                ->whereHas('clientProviders', fn (Builder $providerQuery) => $providerQuery->whereKey($providerProfile->id))
                ->orWhereHas('bookings', fn (Builder $bookingQuery) => $bookingQuery->whereBelongsTo($providerProfile, 'providerProfile'));
        });
    }

    private function applySearch(Builder $query, string $search, ProviderProfile $providerProfile): void
    {
        if ($search === '') {
            return;
        }

        $term = "%{$search}%";

        $query->where(function (Builder $query) use ($term, $providerProfile): void {
            $query
                ->whereRaw('LOWER(name) LIKE LOWER(?)', [$term])
                ->orWhereRaw('LOWER(email) LIKE LOWER(?)', [$term])
                ->orWhereRaw('LOWER(phone) LIKE LOWER(?)', [$term])
                ->orWhereHas('bookings', function (Builder $bookingQuery) use ($term, $providerProfile): void {
                    $bookingQuery
                        ->whereBelongsTo($providerProfile, 'providerProfile')
                        ->whereHas('service', fn (Builder $serviceQuery) => $serviceQuery
                            ->whereRaw('LOWER(name) LIKE LOWER(?)', [$term]));
                });
        });
    }

    private function applySegmentFilter(Builder $query, string $segment, ProviderProfile $providerProfile): void
    {
        if (! in_array($segment, ['regular', 'new', 'inactive'], true)) {
            return;
        }

        $now = now();
        $cutoff = $now->copy()->subDays(90);
        $pastVisits = function (Builder $bookingQuery) use ($providerProfile, $now): void {
            $this->applyVisitConstraint($bookingQuery, $providerProfile, null, $now);
        };
        $recentVisits = function (Builder $bookingQuery) use ($providerProfile, $cutoff, $now): void {
            $this->applyVisitConstraint($bookingQuery, $providerProfile, $cutoff, $now);
        };
        $oldVisits = function (Builder $bookingQuery) use ($providerProfile, $cutoff): void {
            $this->applyVisitConstraint($bookingQuery, $providerProfile, null, $cutoff);
        };

        if ($segment === 'inactive') {
            $query
                ->whereHas('bookings', $oldVisits)
                ->whereDoesntHave('bookings', $recentVisits);

            return;
        }

        $query->where(function (Builder $query) use ($pastVisits, $recentVisits): void {
            $query
                ->whereHas('bookings', $recentVisits)
                ->orWhereDoesntHave('bookings', $pastVisits);
        });

        if ($segment === 'regular') {
            $query->whereHas('bookings', $pastVisits, '>=', 3);

            return;
        }

        $query->where(function (Builder $query) use ($pastVisits): void {
            $query
                ->whereDoesntHave('bookings', $pastVisits)
                ->orWhereHas('bookings', $pastVisits, '<', 3);
        });
    }

    private function applyVisitConstraint(
        Builder|Relation $query,
        ProviderProfile $providerProfile,
        ?CarbonInterface $from = null,
        ?CarbonInterface $until = null,
    ): void {
        $query
            ->where('provider_profile_id', $providerProfile->id)
            ->where('status', '!=', Booking::STATUS_CANCELLED)
            ->where('schedule', '<=', $until ?? now());

        if ($from !== null) {
            $query->where('schedule', '>', $from);
        }
    }

    /** @return array<string, int> */
    private function stats(ProviderProfile $providerProfile): array
    {
        $stats = [];

        foreach (['total' => 'all', 'regular' => 'regular', 'new' => 'new', 'inactive' => 'inactive'] as $key => $segment) {
            $query = $this->clientQuery($providerProfile);
            $this->applySegmentFilter($query, $segment, $providerProfile);
            $stats[$key] = $query->count();
        }

        return $stats;
    }

    /** @return array<string, mixed> */
    private function clientData(User $client): array
    {
        $now = now();
        $visits = $client->bookings
            ->filter(fn (Booking $booking): bool => $booking->schedule !== null && $booking->schedule->lessThanOrEqualTo($now) && $booking->status !== Booking::STATUS_CANCELLED)
            ->values();
        $lastVisit = $visits->sortByDesc('schedule')->first()?->schedule;
        $nextBooking = $client->bookings
            ->filter(fn (Booking $booking): bool => $booking->schedule !== null && $booking->schedule->isFuture() && $booking->status !== Booking::STATUS_CANCELLED)
            ->sortBy('schedule')
            ->first();
        $serviceCounts = $visits
            ->filter(fn (Booking $booking): bool => $booking->service !== null)
            ->groupBy('service_id')
            ->sortByDesc(fn ($serviceBookings): int => $serviceBookings->count());
        $favoriteService = $serviceCounts->first()?->first()?->service?->name ?? 'No service yet';
        $totalSpend = $visits->sum(fn (Booking $booking): float => (float) ($booking->service?->price ?? 0));
        $segment = $lastVisit !== null && $lastVisit->lessThanOrEqualTo($now->copy()->subDays(90))
            ? 'inactive'
            : ($visits->count() >= 3 ? 'regular' : 'new');

        return [
            'id' => $client->id,
            'name' => $client->name,
            'initials' => Str::of($client->name)->explode(' ')->filter()->map(fn (string $part): string => Str::upper(Str::substr($part, 0, 1)))->implode(''),
            'email' => $client->email ?? 'No email provided',
            'phone' => $client->phone ?? 'No phone provided',
            'segment' => $segment,
            'visits' => $visits->count(),
            'lastVisit' => $lastVisit?->format('d M Y') ?? 'No visits yet',
            'nextBooking' => $nextBooking?->schedule?->format('d M · h:i A') ?? 'Not booked',
            'spend' => '$'.number_format($totalSpend, 2),
            'favoriteService' => $favoriteService,
            'tone' => $this->toneFor($client->id),
        ];
    }

    /** @return array<string, callable(Builder|Relation): void> */
    private function clientBookingLoad(ProviderProfile $providerProfile): array
    {
        return [
            'bookings' => function (Builder|Relation $query) use ($providerProfile): void {
                $query
                    ->where('provider_profile_id', $providerProfile->id)
                    ->where('status', '!=', Booking::STATUS_CANCELLED)
                    ->with('service:id,name,price')
                    ->select(['id', 'user_id', 'service_id', 'schedule', 'status']);
            },
        ];
    }

    /** @return array<string, callable(Builder|Relation): void> */
    private function lastVisitLoad(ProviderProfile $providerProfile): array
    {
        return [
            'bookings as provider_last_visit_at' => function (Builder|Relation $query) use ($providerProfile): void {
                $this->applyVisitConstraint($query, $providerProfile);
            },
        ];
    }

    private function toneFor(string $id): string
    {
        return [
            'bg-[#d9f7e8] text-[#0f6b4d]',
            'bg-[#ffead9] text-[#a55c2d]',
            'bg-[#dcecf5] text-[#2d6980]',
            'bg-[#f3f0ff] text-[#685bb4]',
            'bg-[#f2e8eb] text-[#96546a]',
            'bg-[#e6e1ff] text-[#594e9e]',
        ][abs(crc32($id)) % 6];
    }
}
