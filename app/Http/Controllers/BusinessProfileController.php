<?php

namespace App\Http\Controllers;

use App\Http\Requests\Settings\BusinessProfileUpdateRequest;
use App\Models\Category;
use App\Models\Region;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BusinessProfileController extends Controller
{
    /**
     * Show the business profile settings page.
     */
    public function edit(Request $request): Response
    {
        abort_unless($request->user() instanceof User, 401);

        $providerProfile = $request->user()->providerProfile()->firstOrFail();

        return Inertia::render('settings/business-profile', [
            'providerProfile' => $providerProfile->only([
                'id',
                'business_name',
                'slug',
                'description',
                'phone',
                'email',
                'address',
                'city',
                'region_id',
                'district_id',
                'category_id',
                'is_accepting_bookings',
            ]),
            'categories' => Category::query()
                ->select(['id', 'name'])
                ->orderBy('name')
                ->get()
                ->map(fn (Category $category): array => [
                    'label' => $category->name,
                    'value' => $category->id,
                ]),
            'regions' => Region::query()
                ->with(['districts:id,name,region_id'])
                ->select(['id', 'name'])
                ->orderBy('name')
                ->get()
                ->map(fn (Region $region): array => [
                    'label' => $region->name,
                    'value' => $region->id,
                    'districts' => $region->districts->map(fn ($district): array => [
                        'label' => $district->name,
                        'value' => $district->id,
                    ])->values(),
                ]),
        ]);
    }

    /**
     * Update the authenticated provider's business profile.
     */
    public function update(BusinessProfileUpdateRequest $request): RedirectResponse
    {
        abort_unless($request->user() instanceof User, 401);

        $request->user()->providerProfile()->firstOrFail()->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Business profile updated.')]);

        return to_route('business-profile.edit');
    }
}
