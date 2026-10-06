<?php

namespace App\Http\Controllers;

use App\Http\Requests\Settings\BusinessProfileUpdateRequest;
use App\Models\User;
use App\Services\BusinessProfileService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BusinessProfileController extends Controller
{
    public function __construct(protected BusinessProfileService $service) {}

    public function edit(Request $request, string $page): Response
    {
        abort_unless($request->user() instanceof User, 401);

        return match ($page) {
            'location' => inertia('settings/provider/business/location', [
                ...$this->service->businessAvailability($request->user()),
            ]),
            'opening_hours' => inertia('settings/provider/business/opening-hours/index', $this->service->businessHours($request->user())),
            'breaks' => inertia('settings/provider/business/breaks', $this->service->businessHours($request->user())),
            default => inertia('settings/provider/business/details', $this->service->businessDetails($request->user())),
        };
    }

    public function update(BusinessProfileUpdateRequest $request): RedirectResponse
    {
        abort_unless($request->user() instanceof User, 401);

        $request->user()->providerProfile()->firstOrFail()->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Business profile updated.')]);

        return back();
    }
}
