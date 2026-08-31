<?php

namespace Tests\Feature;

use App\Enums\ProviderStatus;
use App\Models\Category;
use App\Models\District;
use App\Models\ProviderProfile;
use App\Models\Region;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ClientFavoriteTest extends TestCase
{
    use RefreshDatabase;

    public function test_client_can_add_remove_and_filter_favorite_providers(): void
    {
        $client = $this->createClient();
        $provider = $this->createProvider('The Gilded Blade', ProviderStatus::Approved);
        $this->createProvider('Another Provider', ProviderStatus::Approved);

        $this->actingAs($client)
            ->post(route('client.providers.favorite', $provider->slug))
            ->assertRedirect();

        $this->assertTrue($client->favoriteProviders()->whereKey($provider->id)->exists());

        $this->actingAs($client)
            ->get(route('dashboard'))
            ->assertInertia(fn (Assert $page) => $page
                ->where('stats.savedProviders', 1));

        $this->actingAs($client)
            ->post(route('client.providers.favorite', $provider->slug))
            ->assertRedirect();

        $this->assertSame(1, $client->favoriteProviders()->count());

        $this->actingAs($client)
            ->get(route('client.providers.index', ['favorites' => true]))
            ->assertInertia(fn (Assert $page) => $page
                ->where('filters.favorites', true)
                ->has('providers.data', 1)
                ->where('providers.data.0.id', $provider->id)
                ->where('providers.data.0.is_favorite', true));

        $this->actingAs($client)
            ->get(route('client.favorite.index'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('client/favorite')
                ->has('data', 1)
                ->where('data.0.id', $provider->id));

        $this->actingAs($client)
            ->get(route('client.providers.show', $provider->slug))
            ->assertInertia(fn (Assert $page) => $page
                ->where('provider.is_favorite', true));

        $this->actingAs($client)
            ->delete(route('client.providers.unfavorite', $provider->slug))
            ->assertRedirect();

        $this->assertFalse($client->fresh()->favoriteProviders()->whereKey($provider->id)->exists());
    }

    public function test_only_clients_can_favorite_discoverable_providers(): void
    {
        $provider = $this->createProvider('The Gilded Blade', ProviderStatus::Approved);
        $serviceProvider = $this->createProvider('Another Provider', ProviderStatus::Approved, 'service_provider');
        $draftProvider = $this->createProvider('Draft Provider', ProviderStatus::Draft);

        $this->actingAs($serviceProvider->owner)
            ->post(route('client.providers.favorite', $provider->slug))
            ->assertForbidden();

        $client = $this->createClient();

        $this->actingAs($client)
            ->post(route('client.providers.favorite', $draftProvider->slug))
            ->assertNotFound();
    }

    private function createClient(): User
    {
        $client = User::factory()->create();
        Role::findOrCreate('client', 'web');
        $client->assignRole('client');

        return $client;
    }

    private function createProvider(string $businessName, ProviderStatus $status, string $role = 'service_provider'): ProviderProfile
    {
        $provider = User::factory()->create();
        Role::findOrCreate($role, 'web');
        $provider->assignRole($role);
        $region = Region::query()->create(['name' => fake()->unique()->word()]);
        $district = District::query()->create([
            'name' => fake()->unique()->city(),
            'region_id' => $region->id,
        ]);
        $category = Category::query()->create(['name' => fake()->unique()->word()]);

        return $provider->providerProfile()->create([
            'region_id' => $region->id,
            'district_id' => $district->id,
            'category_id' => $category->id,
            'business_name' => $businessName,
            'slug' => fake()->unique()->slug(),
            'status' => $status,
            'working_days' => ['monday'],
        ]);
    }
}
