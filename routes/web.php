<?php

use App\Http\Controllers\OnboardingController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/about', 'about')->name('about');
Route::inertia('/contact', 'contact')->name('contact');
Route::inertia('/privacy-policy', 'privacy-policy')->name('privacy');
Route::inertia('/terms-and-conditions', 'terms-and-conditions')->name('terms');

Route::get('/onboarding', [OnboardingController::class, 'index'])
  ->middleware(['auth'])
  ->name('onboarding');
Route::post('/onboarding', [OnboardingController::class, 'store'])
  ->middleware(['auth', 'precognitive'])
  ->name('onboarding.store');

Route::middleware(['auth', 'verified', 'onboarded'])->group(function () {
  Route::inertia('/verify-account', 'auth/account-verification')->name('account-verification');
  Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::prefix('media')->name('media.')->group(function () {
  Route::get('/preview/{id}', function (string $id) {
    // $media = Media::findOrFail($id);

    // return $media->getPath();
  })->name('preview');

  Route::get('/download/{id}', function (string $id) {
    // $media = Media::findOrFail($id);

    // return response()->download($media->getPath(), $media->file_name);
  })->name('download');

  Route::delete('{id}', function (string $id) {
    // $media = Media::findOrFail($id);
    // $media->delete();
  })->name('destroy');
});

require __DIR__ . '/settings.php';
