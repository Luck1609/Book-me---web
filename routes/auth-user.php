<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OnboardingController;
use Illuminate\Support\Facades\Route;

Route::get('/onboarding', [OnboardingController::class, 'index'])
    ->middleware(['auth'])
    ->name('onboarding');

Route::post('/onboarding', [OnboardingController::class, 'store'])
    ->middleware(['auth', 'precognitive'])
    ->name('onboarding.store');

Route::inertia('/account-created', 'onboarding/success')->name('onboarding.success');

Route::middleware(['auth', 'verified', 'onboarded'])->group(function () {
    Route::inertia('/verify-account', 'auth/account-verification')->name('account-verification');
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});
