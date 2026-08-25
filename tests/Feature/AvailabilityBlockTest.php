<?php

namespace Tests\Feature;

use App\Models\AvailabilityBlock;
use App\Models\Category;
use App\Models\District;
use App\Models\Region;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AvailabilityBlockTest extends TestCase
{
    use RefreshDatabase;

    public function test_provider_can_create_a_break_block(): void
    {
        $provider = $this->createProvider();

        $response = $this->actingAs($provider)->post(route('availability-blocks.store'), [
            'type' => 'break',
            'starts_at' => now()->addDay()->setTime(12, 0)->toDateTimeString(),
            'ends_at' => now()->addDay()->setTime(13, 0)->toDateTimeString(),
            'reason' => 'Lunch break',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('availability_blocks', [
            'provider_profile_id' => $provider->providerProfile->id,
            'type' => 'break',
            'reason' => 'Lunch break',
        ]);
    }

    public function test_time_block_end_must_be_after_the_start(): void
    {
        $provider = $this->createProvider();

        $response = $this->actingAs($provider)->from(route('dashboard'))->post(route('availability-blocks.store'), [
            'type' => 'time_off',
            'starts_at' => now()->addDay()->setTime(13, 0)->toDateTimeString(),
            'ends_at' => now()->addDay()->setTime(12, 0)->toDateTimeString(),
        ]);

        $response->assertRedirect(route('dashboard'));
        $response->assertSessionHasErrors('ends_at');
        $this->assertDatabaseCount('availability_blocks', 0);
    }

    public function test_provider_can_view_the_schedule_and_delete_their_block(): void
    {
        $provider = $this->createProvider();
        $block = AvailabilityBlock::query()->create([
            'provider_profile_id' => $provider->providerProfile->id,
            'starts_at' => now()->addDay()->setTime(12, 0),
            'ends_at' => now()->addDay()->setTime(13, 0),
            'type' => 'break',
            'reason' => 'Lunch break',
        ]);

        $this->actingAs($provider)
            ->get(route('schedule.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('provider/schedule/index')
                ->has('businessHours')
                ->where('blocks.0.id', $block->id));

        $this->actingAs($provider)
            ->delete(route('availability-blocks.destroy', $block))
            ->assertRedirect();

        $this->assertModelMissing($block);
    }

    public function test_provider_cannot_delete_another_providers_block(): void
    {
        $provider = $this->createProvider();
        $otherProvider = $this->createProvider();
        $block = AvailabilityBlock::query()->create([
            'provider_profile_id' => $otherProvider->providerProfile->id,
            'starts_at' => now()->addDay()->setTime(12, 0),
            'ends_at' => now()->addDay()->setTime(13, 0),
            'type' => 'time_off',
        ]);

        $this->actingAs($provider)
            ->delete(route('availability-blocks.destroy', $block))
            ->assertForbidden();

        $this->assertModelExists($block);
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
