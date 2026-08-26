<?php

use App\Http\Controllers\AvailabilityBlockController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\BusinessHourController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NotificationsController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\TeamController;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
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
    Route::get('schedule', [ScheduleController::class, 'index'])->name('schedule.index');
    Route::get('notifications/inbox', [NotificationsController::class, 'index'])->name('notifications.index');
    Route::inertia('report', 'provider/report/index')->name('report');

    Route::resource('availability-blocks', AvailabilityBlockController::class)
        ->only(['store', 'destroy']);
    Route::resource('business-hours', BusinessHourController::class)
        ->only(['update'])->middleware([HandlePrecognitiveRequests::class]);

    Route::resource('booking', BookingController::class);
    Route::resource('client', ClientController::class)
        ->middleware([HandlePrecognitiveRequests::class]);
    Route::resource('team', TeamController::class);
});
