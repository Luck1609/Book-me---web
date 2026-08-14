<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/account-selection', 'conversions/account-selection')->name('account-selection');
Route::inertia('/booking', 'conversions/booking')->name('booking');
Route::inertia('/appointment-details', 'conversions/appointment-details')->name('appointment-details');
Route::inertia('/client-listing', 'conversions/client-listing')->name('client-listing');
Route::inertia('/client-details', 'conversions/client-details')->name('client-details');
Route::inertia('/home', 'conversions/dashboard')->name('user-dashboard');
Route::inertia('/find-shop', 'conversions/find-shop')->name('find-shop');
Route::inertia('/forgot-password', 'conversions/forgot-password')->name('forgot-password');
Route::inertia('/login', 'conversions/login')->name('login');
Route::inertia('/register', 'conversions/register')->name('register');
Route::inertia('/shop-profile', 'conversions/shop-profile')->name('shop-profile');
Route::inertia('/shop-setup', 'conversions/shop-setup')->name('shop-setup');
Route::inertia('/my-booking', 'conversions/my-bookings')->name('my-booking');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
