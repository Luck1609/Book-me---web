<?php

namespace Database\Factories;

use App\Models\ProviderProfile;
use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Service>
 */
class ServiceFactory extends Factory
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
            'name' => fake()->words(3, true),
            'description' => fake()->optional()->sentence(),
            'price' => fake()->randomFloat(2, 10, 500),
            'duration_minutes' => fake()->randomElement([30, 45, 60, 90]),
            'is_active' => true,
            'requires_payment' => false,
            'sort_order' => 0,
        ];
    }
}
