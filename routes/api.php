<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\ProviderProfileController;
use App\Http\Controllers\Api\V1\ServiceController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::prefix('auth')->group(function (): void {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/otp/request', [AuthController::class, 'requestOtp'])->middleware('throttle:10,1');
        Route::post('/otp/verify', [AuthController::class, 'verifyOtp'])->middleware('throttle:10,1');

        Route::middleware('auth:sanctum')->group(function (): void {
            Route::get('/me', [AuthController::class, 'me']);
            Route::post('/logout', [AuthController::class, 'logout']);
        });
    });

    Route::get('/providers', [ProviderProfileController::class, 'index']);
    Route::get('/providers/{providerProfile}', [ProviderProfileController::class, 'show']);

    Route::middleware('auth:sanctum')->group(function (): void {
        Route::post('/provider/profile', [ProviderProfileController::class, 'store']);
        Route::patch('/provider/profile/{providerProfile}', [ProviderProfileController::class, 'update']);
        Route::get('/provider/services', [ServiceController::class, 'index']);
        Route::post('/provider/services', [ServiceController::class, 'store']);
        Route::get('/provider/services/{service}', [ServiceController::class, 'show']);
        Route::patch('/provider/services/{service}', [ServiceController::class, 'update']);
        Route::delete('/provider/services/{service}', [ServiceController::class, 'destroy']);
    });
});
