<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/onboarding', 'onboarding/index')
    ->middleware(['auth', 'verified'])
    ->name('onboarding');

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

require __DIR__.'/settings.php';
