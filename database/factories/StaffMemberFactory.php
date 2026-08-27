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
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->e164PhoneNumber(),
            'role' => fake()->randomElement(['Barber', 'Senior Stylist', 'Nail Technician']),
            'status' => fake()->randomElement(['available', 'away', 'offline']),
            'shift_start' => '09:00',
            'shift_end' => '18:00',
            'next_shift_at' => now()->startOfDay()->addHours(9),
            'photo_path' => null,
            'is_active' => true,
        ];
    }
}
