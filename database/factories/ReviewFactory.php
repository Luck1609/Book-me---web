<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\ProviderProfile;
use App\Models\Review;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'booking_id' => Booking::factory(),
            'provider_profile_id' => ProviderProfile::factory(),
            'user_id' => User::factory(),
            'service_id' => Service::factory(),
            'rating' => fake()->numberBetween(3, 5),
            'comment' => fake()->optional()->paragraph(),
        ];
    }
}
