<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Client\BookingController;

Route::prefix('client')->as('client.')->group(function() {
	Route::resource('booking', BookingController::class);
});