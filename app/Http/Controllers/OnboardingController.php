<?php

namespace App\Http\Controllers;

use App\Actions\Onboarding\CompleteProviderOnboarding;
use App\Http\Requests\Onboarding\StoreProviderOnboardingRequest;
use App\Models\Category;
use App\Models\Region;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class OnboardingController extends Controller
{
  public function index(): Response
  {
    return inertia('onboarding/index', [
      'regions' => Region::with('districts')
        ->select('id', 'name')
        ->get()
        ->map(fn($region) => [
          'label' => $region->name,
          'value' => $region->id,
          'districts' => $region->districts->map(fn($district) => [
            'label' => $district->name,
            'value' => $district->id,
          ]),
        ]),
      'categories' => Category::select('id', 'name')
        ->get()
        ->map(fn($category) => [
          'label' => $category->name,
          'value' => $category->id,
        ]),

    ]);
  }

  public function store(
    StoreProviderOnboardingRequest $request,
    CompleteProviderOnboarding $completeProviderOnboarding,
  ): RedirectResponse {
    $user = $request->user();

    abort_unless($user instanceof User, 401);

    $completeProviderOnboarding($user, $request->validated());

    return to_route('onboarding.success');
  }
}
