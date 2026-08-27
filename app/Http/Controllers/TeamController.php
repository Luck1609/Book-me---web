<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTeamMemberRequest;
use App\Models\Booking;
use App\Models\ProviderProfile;
use App\Models\StaffMember;
use App\Models\User;
use Carbon\Carbon;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
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
        $role = $request->string('role')->toString();
        $status = $request->string('status')->toString();
        $sort = $request->string('sort')->toString() === 'recent' ? 'recent' : 'active';
        $bookingTable = (new Booking)->getTable();
        $weekStart = CarbonImmutable::now()->startOfWeek();
        $weekEnd = CarbonImmutable::now()->endOfWeek();

        $team = $providerProfile->staffMembers()
            ->where('is_active', true)
            ->withCount([
                'bookings as bookings_count' => fn (Builder $query) => $query
                    ->whereBetween("{$bookingTable}.schedule", [$weekStart, $weekEnd])
                    ->where('status', '!=', Booking::STATUS_CANCELLED),
            ])
            ->when($search !== '', function (Builder $query) use ($search): void {
                $term = "%{$search}%";
                $query->where(function (Builder $query) use ($term): void {
                    $query
                        ->whereRaw('LOWER(name) LIKE LOWER(?)', [$term])
                        ->orWhereRaw('LOWER(email) LIKE LOWER(?)', [$term])
                        ->orWhereRaw('LOWER(phone) LIKE LOWER(?)', [$term])
                        ->orWhereRaw('LOWER(role) LIKE LOWER(?)', [$term]);
                });
            })
            ->when(in_array($role, ['barber', 'stylist', 'support'], true), fn (Builder $query) => $this->applyRoleFilter($query, $role))
            ->when(in_array($status, ['available', 'away', 'offline'], true), fn (Builder $query) => $query->where('status', $status))
            ->when($sort === 'active', fn (Builder $query) => $query->orderByDesc('bookings_count'))
            ->when($sort === 'recent', fn (Builder $query) => $query->latest())
            ->orderBy('name')
            ->get()
            ->map(fn (StaffMember $member): array => $this->memberData($member))
            ->values()
            ->all();

        return Inertia::render('provider/team/index', [
            'team' => $team,
            'stats' => $this->stats($providerProfile),
            'filters' => [
                'search' => $search,
                'role' => in_array($role, ['barber', 'stylist', 'support'], true) ? $role : 'all',
                'status' => in_array($status, ['available', 'away', 'offline'], true) ? $status : 'all',
                'sort' => $sort,
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeamMemberRequest $request): RedirectResponse
    {
        /** @var User $provider */
        $provider = $request->user();
        $providerProfile = $provider->providerProfile()->firstOrFail();

        $providerProfile->staffMembers()->create($request->validated());

        return to_route('team.index')->with('success', 'Team member added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, StaffMember $team): Response
    {
        /** @var User $provider */
        $provider = $request->user();
        Gate::authorize('viewAny', Booking::class);
        abort_unless($team->provider_profile_id === $provider->providerProfile()->value('id'), 404);

        return Inertia::render('provider/team/show', [
            'teamMember' => [
                'id' => $team->id,
                'name' => $team->name,
                'initials' => $this->initials($team->name),
                'role' => $team->role,
                'email' => $team->email,
                'phone' => $team->phone ?? 'No phone provided',
                'statusLabel' => $this->statusLabel($team->status),
                'joined' => $team->created_at?->format('F Y') ?? 'Recently',
                'bookings' => $team->bookings()->whereBetween('schedule', [now()->startOfMonth(), now()->endOfMonth()])->count(),
                'rating' => $team->rating ?? '—',
                'revenue' => '—',
                'completionRate' => '—',
                'specialties' => [],
                'bio' => 'This team member has not added a profile bio yet.',
            ],
        ]);
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

    private function applyRoleFilter(Builder $query, string $role): void
    {
        if ($role === 'support') {
            $query->where(function (Builder $query): void {
                $query
                    ->whereRaw('LOWER(role) LIKE LOWER(?)', ['%experience%'])
                    ->orWhereRaw('LOWER(role) LIKE LOWER(?)', ['%technician%'])
                    ->orWhereRaw('LOWER(role) LIKE LOWER(?)', ['%support%']);
            });

            return;
        }

        $query->whereRaw('LOWER(role) LIKE LOWER(?)', ["%{$role}%"]);
    }

    /** @return array<string, int> */
    private function stats(ProviderProfile $providerProfile): array
    {
        $team = $providerProfile->staffMembers()->where('is_active', true);
        $total = (clone $team)->count();
        $available = (clone $team)->where('status', 'available')->count();
        $away = (clone $team)->where('status', 'away')->count();
        $start = CarbonImmutable::now()->startOfWeek();
        $end = CarbonImmutable::now()->endOfWeek();
        $bookings = $providerProfile->bookings()
            ->whereBetween('schedule', [$start, $end])
            ->where('status', '!=', Booking::STATUS_CANCELLED)
            ->count();

        return [
            'total' => $total,
            'available' => $available,
            'away' => $away,
            'offline' => max($total - $available - $away, 0),
            'coverage' => $total > 0 ? (int) round(($available / $total) * 100) : 0,
            'bookings' => $bookings,
        ];
    }

    /** @return array<string, mixed> */
    private function memberData(StaffMember $member): array
    {
        return [
            'id' => $member->id,
            'name' => $member->name,
            'initials' => $this->initials($member->name),
            'role' => $member->role,
            'email' => $member->email,
            'status' => $member->status,
            'statusLabel' => $this->statusLabel($member->status),
            'shift' => $this->shiftLabel($member->shift_start, $member->shift_end),
            'nextShift' => $this->nextShiftLabel($member->next_shift_at),
            'bookings' => (int) $member->bookings_count,
            'rating' => $member->rating ?? '—',
            'workload' => min((int) $member->bookings_count * 10, 100),
            'tone' => $this->toneFor($member->id),
        ];
    }

    private function initials(string $name): string
    {
        return Str::of($name)
            ->explode(' ')
            ->filter()
            ->map(fn (string $part): string => Str::upper(Str::substr($part, 0, 1)))
            ->take(2)
            ->implode('');
    }

    private function statusLabel(string $status): string
    {
        return match ($status) {
            'available' => 'Available now',
            'away' => 'On break',
            default => 'Off today',
        };
    }

    private function shiftLabel(?string $start, ?string $end): string
    {
        if ($start === null || $end === null) {
            return 'Not scheduled';
        }

        return Carbon::parse($start)->format('h:i A').' – '.Carbon::parse($end)->format('h:i A');
    }

    private function nextShiftLabel(?Carbon $nextShift): string
    {
        if ($nextShift === null) {
            return 'Not scheduled';
        }

        $day = $nextShift->isToday() ? 'Today' : ($nextShift->isTomorrow() ? 'Tomorrow' : $nextShift->format('d M'));

        return $day.' · '.$nextShift->format('h:i A');
    }

    private function toneFor(string $id): string
    {
        $tones = [
            'bg-[#d9f7e8] text-[#0f6b4d]',
            'bg-[#e6e1ff] text-[#594e9e]',
            'bg-[#dcecf5] text-[#2d6980]',
            'bg-[#ffead9] text-[#a55c2d]',
            'bg-[#f3f0ff] text-[#685bb4]',
            'bg-[#f2e8eb] text-[#96546a]',
        ];

        return $tones[abs(crc32($id)) % count($tones)];
    }
}
