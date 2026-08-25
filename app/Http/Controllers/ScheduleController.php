<?php

namespace App\Http\Controllers;

use App\Models\AvailabilityBlock;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ScheduleController extends Controller
{
    public function index(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();
        Gate::authorize('viewAny', AvailabilityBlock::class);

        $providerProfile = $user->providerProfile()->firstOrFail();
        $today = now()->startOfDay();

        return Inertia::render('provider/schedule/index', [
            'businessHours' => $providerProfile->businessHours()
                ->orderBy('day_of_week')
                ->get(['id', 'day_of_week', 'is_closed', 'opens_at', 'closes_at']),
            'blocks' => $providerProfile->availabilityBlocks()
                ->where('ends_at', '>=', $today)
                ->orderBy('starts_at')
                ->get(['id', 'starts_at', 'ends_at', 'type', 'reason']),
            'bookings' => $providerProfile->bookings()
                ->with([
                    'user:id,name',
                    'service:id,name',
                ])
                ->whereBetween('schedule', [$today, $today->copy()->addDays(30)->endOfDay()])
                ->orderBy('schedule')
                ->get(['id', 'user_id', 'service_id', 'schedule']),
        ]);
    }
}
