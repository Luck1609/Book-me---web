<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateBusinessHourRequest;
use App\Models\BusinessHour;
use Illuminate\Http\RedirectResponse;
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
}
