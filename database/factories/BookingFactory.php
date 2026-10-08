<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\ProviderProfile;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'provider_profile_id' => ProviderProfile::factory(),
            'service_id' => Service::factory(),
            'schedule' => now()->subDay(),
            'duration_minutes' => 60,
            'status' => Booking::STATUS_COMPLETED,
            'note' => null,
        ];
    }
}
