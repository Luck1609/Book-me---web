<?php

use App\Http\Controllers\BusinessProfileController;
use App\Http\Controllers\NotificationsController;
use App\Http\Controllers\Settings\BillingController;
use App\Http\Controllers\Settings\CategoryController;
use App\Http\Controllers\Settings\ClientController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\RatingController;
use App\Http\Controllers\Settings\RevenueController;
use App\Http\Controllers\Settings\ScheduleController;
use App\Http\Controllers\Settings\SecurityController;
use App\Http\Controllers\Settings\ServiceController;
use Illuminate\Auth\Middleware\RequirePassword;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->as('settings.')->prefix('settings')->group(function () {
    Route::get('/', [ProfileController::class, 'index'])->name('index');

    Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('profile/phones', [ProfileController::class, 'storePhone'])
        ->middleware([HandlePrecognitiveRequests::class])
        ->name('profile.phones.store');
    Route::post('profile/phones/verify', [ProfileController::class, 'verifyPhone'])
        ->middleware([HandlePrecognitiveRequests::class])
        ->name('profile.phones.verify');

    Route::get('business/{page}', [BusinessProfileController::class, 'edit'])->name('business-profile.edit');

    Route::patch('business', [BusinessProfileController::class, 'update'])
        ->middleware([HandlePrecognitiveRequests::class])
        ->name('business.update');

    Route::resource('subscription', BillingController::class)
        ->only(['index', 'update']);

    Route::resource('revenue', RevenueController::class)
        ->only(['index', 'update']);

    Route::get('review', [RatingController::class, 'index'])->name('review.index');
    Route::resource('review', RatingController::class)
        ->only(['show', 'update']);

    Route::resource('client', ClientController::class)
        ->only(['index', 'update']);

    Route::resource('catalog', ServiceController::class)
        ->only(['index', 'store', 'update', 'destroy'])
        ->parameters(['catalog' => 'service'])
        ->names('catalog');

    Route::resource('catalog/categories', CategoryController::class)
        ->only(['store', 'update', 'destroy'])
        ->middleware([HandlePrecognitiveRequests::class])
        ->names('catalog.categories');

    Route::resource('schedule', ScheduleController::class)
        ->only(['index', 'store', 'update', 'destroy'])
        ->names('schedule');

    Route::resource('notifications', NotificationsController::class)
        ->only(['index', 'update']);
});

Route::middleware(['auth', 'verified'])->as('settings.')->group(function () {
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/security', [SecurityController::class, 'edit'])
        ->middleware(RequirePassword::class)
        ->name('security.edit');

    Route::put('settings/password', [SecurityController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('user-password.update');
});

Route::get('.well-known/passkey-endpoints', function () {
    return response()->json([
        'enroll' => route('security.edit'),
        'manage' => route('security.edit'),
    ]);
})->name('well-known.passkeys');
