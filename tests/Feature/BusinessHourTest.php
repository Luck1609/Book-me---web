<?php

namespace Tests\Feature;

use App\Models\BusinessHour;
use App\Models\Category;
use App\Models\District;
use App\Models\Region;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BusinessHourTest extends TestCase
{
    use RefreshDatabase;

    public function test_provider_can_update_a_business_hours_row(): void
    {
        $provider = $this->createProvider();
        $businessHour = BusinessHour::factory()->create([
            'provider_profile_id' => $provider->providerProfile->id,
            'day_of_week' => 1,
        ]);

        $response = $this->actingAs($provider)->put(
            route('business-hours.update', $businessHour),
            [
                'is_closed' => false,
                'opens_at' => '10:30',
                'closes_at' => '19:00',
            ],
        );

        $response->assertRedirect()->assertSessionHasNoErrors();
        $this->assertDatabaseHas('business_hours', [
            'id' => $businessHour->id,
            'is_closed' => false,
            'opens_at' => '10:30',
            'closes_at' => '19:00',
        ]);
    }

    public function test_provider_can_close_a_day_and_clear_its_times(): void
    {
        $provider = $this->createProvider();
        $businessHour = BusinessHour::factory()->create([
            'provider_profile_id' => $provider->providerProfile->id,
            'day_of_week' => 2,
        ]);

        $response = $this->actingAs($provider)->put(
            route('business-hours.update', $businessHour),
            ['is_closed' => true],
        );

        $response->assertRedirect()->assertSessionHasNoErrors();
        $this->assertDatabaseHas('business_hours', [
            'id' => $businessHour->id,
            'is_closed' => true,
            'opens_at' => null,
            'closes_at' => null,
        ]);
    }

    public function test_closing_time_must_be_after_opening_time(): void
    {
        $provider = $this->createProvider();
        $businessHour = BusinessHour::factory()->create([
            'provider_profile_id' => $provider->providerProfile->id,
            'day_of_week' => 3,
        ]);

        $response = $this->actingAs($provider)->from(route('schedule.index'))->put(
            route('business-hours.update', $businessHour),
            [
                'is_closed' => false,
                'opens_at' => '19:00',
                'closes_at' => '10:30',
            ],
        );

        $response->assertRedirect(route('schedule.index'))
            ->assertSessionHasErrors('closes_at');
        $this->assertDatabaseHas('business_hours', [
            'id' => $businessHour->id,
            'opens_at' => '09:00',
            'closes_at' => '17:00',
        ]);
    }

    public function test_provider_cannot_update_another_providers_business_hours(): void
    {
        $provider = $this->createProvider();
        $otherProvider = $this->createProvider();
        $businessHour = BusinessHour::factory()->create([
            'provider_profile_id' => $otherProvider->providerProfile->id,
            'day_of_week' => 4,
        ]);

        $this->actingAs($provider)->put(
            route('business-hours.update', $businessHour),
            [
                'is_closed' => false,
                'opens_at' => '10:30',
                'closes_at' => '19:00',
            ],
        )->assertForbidden();

        $this->assertDatabaseHas('business_hours', [
            'id' => $businessHour->id,
            'opens_at' => '09:00',
            'closes_at' => '17:00',
        ]);
    }

    private function createProvider(): User
    {
        $provider = User::factory()->create();
        Role::findOrCreate('service_provider', 'web');
        $provider->assignRole('service_provider');

        $region = Region::query()->create(['name' => fake()->unique()->city()]);
        $district = District::query()->create([
            'name' => fake()->unique()->city(),
            'region_id' => $region->id,
        ]);
        $category = Category::query()->create(['name' => fake()->unique()->word()]);

        $provider->providerProfile()->create([
            'region_id' => $region->id,
            'district_id' => $district->id,
            'category_id' => $category->id,
            'business_name' => fake()->company(),
            'slug' => fake()->unique()->slug(),
            'working_days' => ['monday'],
        ]);

        return $provider;
    }
}
