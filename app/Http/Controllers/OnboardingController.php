<?php

namespace App\Http\Controllers;

use App\Http\Requests\Onboarding\StoreProviderOnboardingRequest;
use Illuminate\Http\RedirectResponse;

class OnboardingController extends Controller
{
    public function index(): mixed
    {
        return inertia('onboarding/index');
    }

    public function store(StoreProviderOnboardingRequest $request): RedirectResponse
    {
        $request->validated();

        return back();
    }
}
