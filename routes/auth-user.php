<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\TeamController;
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
    Route::inertia('report', 'provider/report/index')->name('report');

    Route::resource('booking', BookingController::class);
    Route::resource('client', ClientController::class);
    Route::resource('team', TeamController::class);
});
