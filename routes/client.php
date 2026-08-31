<?php

use App\Http\Controllers\Client\BookingController;
use App\Http\Controllers\Client\ProviderController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'onboarded'])->prefix('client')->as('client.')->group(function (): void {
    Route::get('providers', [ProviderController::class, 'index'])->name('providers.index');
    Route::get('providers/{providerProfile:slug}', [ProviderController::class, 'show'])->name('providers.show');
    Route::resource('booking', BookingController::class)->only(['index', 'create', 'store', 'show', 'destroy']);
});
