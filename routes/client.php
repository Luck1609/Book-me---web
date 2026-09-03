<?php

use App\Http\Controllers\Client\BookingController;
use App\Http\Controllers\Client\FavoriteController;
use App\Http\Controllers\Client\ProviderController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'onboarded'])->prefix('client')->as('client.')->group(function (): void {
    Route::get('providers', [ProviderController::class, 'index'])->name('providers.index');
    Route::get('favorites', [FavoriteController::class, 'index'])->name('favorite.index');
    Route::get('providers/{providerProfile:slug}/availability', [ProviderController::class, 'availability'])->name('providers.availability');
    Route::get('providers/{providerProfile:slug}', [ProviderController::class, 'show'])->name('providers.show');
    Route::post('providers/{providerProfile:slug}/favorite', [FavoriteController::class, 'store'])->name('providers.favorite');
    Route::delete('providers/{providerProfile:slug}/favorite', [FavoriteController::class, 'destroy'])->name('providers.unfavorite');
    Route::resource('booking', BookingController::class)->only(['index', 'store', 'show', 'destroy']);
});
