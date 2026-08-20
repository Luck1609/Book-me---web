<?php

namespace App\Http\Controllers;

use App\Http\Requests\Onboarding\StoreProviderOnboardingRequest;
use App\Models\Category;
use App\Models\Region;
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
        ->map(fn ($region) => [
          'label' => $region->name,
          'value' => $region->id,
          'districts' => $region->districts->map(fn ($district) => [
            'label' => $district->name,
            'value' => $district->id,
          ])
        ]),
      'categories' => Category::select('id', 'name')
        ->get()
        ->map(fn ($category) => [
          'label' => $category->name,
          'value' => $category->id,
        ])

    ]);
  }

  public function store(StoreProviderOnboardingRequest $request): RedirectResponse
  {
    $request->validated();

    return back();
  }
}
