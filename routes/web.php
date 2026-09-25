<?php

use App\Http\Controllers\Auth\SocialAuthController;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->name('auth.')->group(function (): void {
    Route::get('/{provider}/redirect', [SocialAuthController::class, 'redirect'])
        ->whereIn('provider', ['google', 'facebook', 'tiktok'])
        ->name('social.redirect');
    Route::get('/{provider}/callback', [SocialAuthController::class, 'callback'])
        ->whereIn('provider', ['google', 'facebook', 'tiktok'])
        ->name('social.callback');
    Route::get('/social/email', [SocialAuthController::class, 'emailForm'])
        ->name('social.email.create');
    Route::post('/social/email', [SocialAuthController::class, 'completeEmail'])
        ->middleware('precognitive')
        ->name('social.email.store');
});

Route::inertia('/', 'index')->name('home');
Route::inertia('/for-business', 'for-business')->name('for-business');
Route::inertia('/about', 'about')->name('about');
Route::inertia('/contact', 'contact')->name('contact');
Route::inertia('/privacy-policy', 'privacy-policy')->name('privacy');
Route::inertia('/terms-and-conditions', 'terms-and-conditions')->name('terms');
Route::get('/back', fn (Request $request) => back())->name('go-back');

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
require __DIR__.'/client.php';
require __DIR__.'/auth-user.php';
