<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateBusinessHourRequest;
use App\Http\Requests\UpdateBusinessHoursRequest;
use App\Models\BusinessHour;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class BusinessHourController extends Controller
{
    public function update(
        UpdateBusinessHourRequest $request,
        BusinessHour $businessHour,
    ): RedirectResponse {
        Gate::authorize('update', $businessHour);

        $isClosed = $request->boolean('is_closed');
        $validated = $request->validated();

        $businessHour->update([
            'is_closed' => $isClosed,
            'opens_at' => $isClosed ? null : $validated['opens_at'],
            'closes_at' => $isClosed ? null : $validated['closes_at'],
        ]);

        return back()->with('success', 'Working hours updated successfully.');
    }

    public function updateMany(UpdateBusinessHoursRequest $request): RedirectResponse
    {
        $hours = $request->validated('hours');
        $businessHours = BusinessHour::with('providerProfile')
            ->whereKey(collect($hours)->pluck('id'))
            ->get()
            ->keyBy('id');

        foreach ($hours as $hour) {
            $businessHour = $businessHours->get($hour['id']);
            abort_unless($businessHour instanceof BusinessHour, 404);
            Gate::authorize('update', $businessHour);
        }

        DB::transaction(function () use ($businessHours, $hours): void {
            foreach ($hours as $hour) {
                $isClosed = (bool) $hour['is_closed'];

                $businessHours->get($hour['id'])->update([
                    'day_of_week' => $hour['day_of_week'],
                    'is_closed' => $isClosed,
                    'opens_at' => $isClosed ? null : $hour['opens_at'],
                    'closes_at' => $isClosed ? null : $hour['closes_at'],
                ]);
            }
        });

        return back()->with('success', 'Working hours updated successfully.');
    }
}
