<?php

namespace Database\Factories;

use App\Models\ProviderProfile;
use App\Models\StaffMember;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<StaffMember>
 */
class StaffMemberFactory extends Factory
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
            'name' => fake()->name(),
            'phone' => fake()->e164PhoneNumber(),
            'photo_path' => null,
            'is_active' => true,
        ];
    }
}
