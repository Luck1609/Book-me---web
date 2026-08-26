<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\District;
use App\Models\ProviderProfile;
use App\Models\Region;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ClientTest extends TestCase
{
    use RefreshDatabase;

    public function test_provider_can_view_provider_scoped_clients_with_live_stats_search_and_segments(): void
    {
        [$provider, $profile] = $this->createProvider();
        [, $otherProfile] = $this->createProvider();
        $service = $profile->services()->create([
            'name' => 'Signature haircut',
            'description' => 'A tailored cut.',
            'price' => 85,
            'min_duration_minutes' => 45,
            'max_duration_minutes' => 60,
        ]);
        $otherService = $otherProfile->services()->create([
            'name' => 'Private service',
            'description' => 'Not visible to this provider.',
            'price' => 100,
            'min_duration_minutes' => 30,
            'max_duration_minutes' => 30,
        ]);
        $regularClient = User::factory()->create([
            'name' => 'Jamie Regular',
            'email' => 'jamie@example.com',
        ]);
        $newClient = User::factory()->create([
            'name' => 'Alex New',
            'email' => 'alex@example.com',
        ]);
        $inactiveClient = User::factory()->create([
            'name' => 'Morgan Inactive',
            'email' => 'morgan@example.com',
        ]);
        $manualClient = User::factory()->create([
            'name' => 'Taylor Manual',
            'email' => 'taylor@example.com',
        ]);

        foreach ([1, 10, 20] as $daysAgo) {
            $profile->bookings()->create([
                'user_id' => $regularClient->id,
                'service_id' => $service->id,
                'schedule' => now()->subDays($daysAgo),
                'duration_minutes' => 45,
                'status' => 'confirmed',
            ]);
        }
        $profile->bookings()->create([
            'user_id' => $newClient->id,
            'service_id' => $service->id,
            'schedule' => now()->subDays(2),
            'duration_minutes' => 45,
            'status' => 'confirmed',
        ]);
        $profile->bookings()->create([
            'user_id' => $inactiveClient->id,
            'service_id' => $service->id,
            'schedule' => now()->subDays(120),
            'duration_minutes' => 45,
            'status' => 'confirmed',
        ]);
        $profile->clients()->attach($manualClient);
        $otherProfile->bookings()->create([
            'user_id' => User::factory()->create()->id,
            'service_id' => $otherService->id,
            'schedule' => now()->subDay(),
            'duration_minutes' => 30,
            'status' => 'confirmed',
        ]);

        $response = $this->actingAs($provider)->get(route('client.index', [
            'search' => 'Jamie',
        ]));

        $response->assertOk()->assertInertia(fn (Assert $page) => $page
            ->component('provider/clients/index')
            ->where('stats.total', 4)
            ->where('stats.regular', 1)
            ->where('stats.new', 2)
            ->where('stats.inactive', 1)
            ->where('filters.search', 'Jamie')
            ->has('clients.data', 1)
            ->where('clients.data.0.id', $regularClient->id)
            ->where('clients.data.0.name', 'Jamie Regular')
            ->where('clients.data.0.segment', 'regular')
            ->where('clients.data.0.visits', 3));

        $this->actingAs($provider)
            ->get(route('client.index', ['segment' => 'inactive']))
            ->assertInertia(fn (Assert $page) => $page
                ->has('clients.data', 1)
                ->where('clients.data.0.id', $inactiveClient->id));
    }

    public function test_provider_can_persist_a_client_and_scope_the_relationship(): void
    {
        [$provider, $profile] = $this->createProvider();

        $response = $this->actingAs($provider)->post(route('client.store'), [
            'name' => 'New Client',
            'email' => 'new-client@example.com',
            'phone' => '+233240000000',
        ]);

        $response->assertSessionHasNoErrors()->assertRedirect(route('client.index'));

        $client = User::query()->where('email', 'new-client@example.com')->firstOrFail();

        $this->assertModelExists($client);
        $this->assertTrue($profile->clients()->whereKey($client->id)->exists());
    }

    /** @return array{0: User, 1: ProviderProfile} */
    private function createProvider(): array
    {
        $provider = User::factory()->create();
        Role::findOrCreate('service_provider', 'web');
        $provider->assignRole('service_provider');
        $region = Region::query()->create(['name' => fake()->unique()->word()]);
        $district = District::query()->create([
            'name' => fake()->unique()->city(),
            'region_id' => $region->id,
        ]);
        $category = Category::query()->create(['name' => fake()->unique()->word()]);
        $profile = $provider->providerProfile()->create([
            'region_id' => $region->id,
            'district_id' => $district->id,
            'category_id' => $category->id,
            'business_name' => fake()->company(),
            'slug' => fake()->unique()->slug(),
            'working_days' => ['monday'],
        ]);

        return [$provider, $profile];
    }
}
