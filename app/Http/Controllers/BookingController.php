<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;
use App\Models\ProviderProfile;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();
        Gate::authorize('viewAny', Booking::class);

        $providerProfile = $user->providerProfile()->firstOrFail();
        $search = trim($request->string('search')->toString());
        $status = $request->string('status')->toString();
        $serviceId = $request->string('service')->toString();
        $sort = $request->string('sort')->toString() === 'oldest' ? 'oldest' : 'newest';
        $bookingTable = (new Booking)->getTable();

        $query = $providerProfile->bookings()
            ->select([
                "{$bookingTable}.id",
                "{$bookingTable}.user_id",
                "{$bookingTable}.service_id",
                "{$bookingTable}.schedule",
                "{$bookingTable}.duration_minutes",
                "{$bookingTable}.status",
                "{$bookingTable}.note",
            ])
            ->with([
                'user:id,name,email',
                'service:id,name,price,min_duration_minutes,max_duration_minutes',
            ])
            ->when($search !== '', function (Builder $query) use ($search, $bookingTable): void {
                $term = "%{$search}%";

                $query->where(function (Builder $query) use ($term, $bookingTable): void {
                    $query
                        ->whereHas('user', fn (Builder $userQuery) => $userQuery
                            ->whereRaw('LOWER(name) LIKE LOWER(?)', [$term])
                            ->orWhereRaw('LOWER(email) LIKE LOWER(?)', [$term]))
                        ->orWhereHas('service', fn (Builder $serviceQuery) => $serviceQuery
                            ->whereRaw('LOWER(name) LIKE LOWER(?)', [$term]))
                        ->orWhereRaw("LOWER(CAST({$bookingTable}.id AS TEXT)) LIKE LOWER(?)", [$term]);
                });
            })
            ->when($serviceId !== '', fn (Builder $query) => $query->where('service_id', $serviceId))
            ->when(in_array($status, $this->bookingStatuses(), true), fn (Builder $query) => $this->applyStatusFilter($query, $status, $bookingTable))
            ->when($sort === 'oldest', fn (Builder $query) => $query->orderBy("{$bookingTable}.schedule"))
            ->when($sort === 'newest', fn (Builder $query) => $query->orderByDesc("{$bookingTable}.schedule"));

        $bookings = $query->paginate(10)->withQueryString();

        return Inertia::render('provider/booking/index', [
            'bookings' => $bookings->through(fn (Booking $booking): array => $this->bookingData($booking)),
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
            'stats' => $this->stats($providerProfile),
            'filters' => [
                'search' => $search,
                'status' => in_array($status, $this->bookingStatuses(), true) ? $status : 'all',
                'service' => $serviceId,
                'sort' => $sort,
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookingRequest $request): RedirectResponse
    {
        /** @var User $provider */
        $provider = $request->user();
        $providerProfile = $provider->providerProfile()->firstOrFail();
        $data = $request->validated();

        DB::transaction(function () use ($data, $providerProfile): void {
            $client = User::query()->firstOrCreate(
                ['email' => $data['client_email']],
                ['name' => $data['client_name']],
            );

            $providerProfile->bookings()->create([
                'user_id' => $client->id,
                'service_id' => $data['service_id'],
                'staff_member_id' => $data['staff_member_id'] ?? null,
                'schedule' => "{$data['date']} {$data['time']}",
                'duration_minutes' => $data['duration_minutes'],
                'note' => $data['notes'] ?? null,
                'status' => Booking::STATUS_CONFIRMED,
            ]);
        });

        return to_route('booking.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking): Response
    {
        Gate::authorize('view', $booking);

        $booking->load([
            'user:id,name,email,phone',
            'service:id,name,price,min_duration_minutes,max_duration_minutes',
            'providerProfile:id,business_name',
        ]);

        return Inertia::render('provider/booking/show', [
            'booking' => $this->bookingData($booking),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /** @return array<int, string> */
    private function bookingStatuses(): array
    {
        return [
            Booking::STATUS_CONFIRMED,
            Booking::STATUS_PENDING,
            Booking::STATUS_COMPLETED,
            Booking::STATUS_CANCELLED,
        ];
    }

    private function applyStatusFilter(Builder $query, string $status, string $bookingTable): void
    {
        $now = now();

        if ($status === Booking::STATUS_COMPLETED) {
            $query->where(function (Builder $query) use ($now): void {
                $query->where('status', Booking::STATUS_COMPLETED)
                    ->orWhere(function (Builder $query) use ($now): void {
                        $query->where('status', Booking::STATUS_CONFIRMED)
                            ->where('schedule', '<=', $now);
                    });
            });

            return;
        }

        if ($status === Booking::STATUS_CONFIRMED) {
            $query->where('status', Booking::STATUS_CONFIRMED)
                ->where('schedule', '>', $now);

            return;
        }

        $query->where("{$bookingTable}.status", $status);
    }

    /** @return array<string, int> */
    private function stats(ProviderProfile $providerProfile): array
    {
        $bookings = $providerProfile->bookings();
        $now = now();

        return [
            'total' => (clone $bookings)->count(),
            'confirmed' => (clone $bookings)->where('status', Booking::STATUS_CONFIRMED)->where('schedule', '>', $now)->count(),
            'pending' => (clone $bookings)->where('status', Booking::STATUS_PENDING)->count(),
            'completed_this_month' => (clone $bookings)
                ->whereBetween('schedule', [$now->copy()->startOfMonth(), $now->copy()->endOfMonth()])
                ->where(function (Builder $query) use ($now): void {
                    $query->where('status', Booking::STATUS_COMPLETED)
                        ->orWhere(function (Builder $query) use ($now): void {
                            $query->where('status', Booking::STATUS_CONFIRMED)
                                ->where('schedule', '<=', $now);
                        });
                })
                ->count(),
        ];
    }

    /** @return array<string, mixed> */
    private function bookingData(Booking $booking): array
    {
        $clientName = $booking->user?->name ?? 'Unknown client';
        $service = $booking->service;
        $duration = $booking->duration_minutes ?? $service?->max_duration_minutes ?? $service?->min_duration_minutes ?? 0;

        return [
            'id' => $booking->id,
            'reference' => '#'.strtoupper(substr($booking->id, 0, 8)),
            'client' => $clientName,
            'initials' => collect(explode(' ', $clientName))->map(fn (string $part): string => substr($part, 0, 1))->join(''),
            'clientMeta' => $booking->user?->email ?? 'No email provided',
            'service' => $service?->name ?? 'Service unavailable',
            'date' => $booking->schedule?->format('l, M j, Y'),
            'time' => $booking->schedule?->format('h:i A'),
            'duration' => "{$duration} min",
            'amount' => '$'.number_format((float) ($service?->price ?? 0), 2),
            'status' => $this->displayStatus($booking),
            'statusMessage' => $this->statusMessage($this->displayStatus($booking)),
            'note' => $booking->note ?? 'No note provided.',
            'email' => $booking->user?->email ?? 'No email provided',
            'phone' => $booking->user?->phone ?? 'No phone provided',
            'schedule' => $booking->schedule?->toIso8601String(),
        ];
    }

    private function displayStatus(Booking $booking): string
    {
        if ($booking->status === Booking::STATUS_CONFIRMED && $booking->schedule?->isPast()) {
            return Booking::STATUS_COMPLETED;
        }

        return $booking->status;
    }

    private function statusMessage(string $status): string
    {
        return match ($status) {
            Booking::STATUS_PENDING => 'This booking is awaiting review.',
            Booking::STATUS_COMPLETED => 'This appointment has been completed.',
            Booking::STATUS_CANCELLED => 'This booking has been cancelled.',
            default => 'This appointment is confirmed.',
        };
    }
}
