<?php

namespace Database\Factories;

use App\Models\BusinessHour;
use App\Models\ProviderProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BusinessHour>
 */
class BusinessHourFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'provider_profile_id' => ProviderProfile::factory(),
            'day_of_week' => fake()->numberBetween(0, 6),
            'is_closed' => false,
            'opens_at' => '09:00',
            'closes_at' => '17:00',
        ];
    }
}
