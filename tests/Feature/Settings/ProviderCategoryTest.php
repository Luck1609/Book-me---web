<?php

namespace Tests\Feature\Settings;

use App\Models\Category;
use App\Models\District;
use App\Models\ProviderProfile;
use App\Models\Region;
use App\Models\Role;
use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ProviderCategoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_provider_can_view_their_categories_on_the_catalog_page(): void
    {
        [$provider, $profile] = $this->createProvider();
        $category = $profile->categories()->create([
            'name' => 'Hair services',
            'description' => 'Cuts, styling, and treatments.',
        ]);
        $category->services()->create([
            'provider_profile_id' => $profile->id,
            'name' => 'Signature cut',
            'price' => 80,
            'min_duration_minutes' => 30,
            'max_duration_minutes' => 45,
        ]);

        $this->actingAs($provider)->get(route('settings.catalog.index', ['target' => 'categories']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('settings/provider/catalog/index')
                ->where('categories.0.name', 'Hair services')
                ->where('categories.0.services_count', 1)
            );
    }

    public function test_provider_can_create_update_and_delete_their_category(): void
    {
        [$provider, $profile] = $this->createProvider();

        $this->actingAs($provider)->post(route('settings.catalog.categories.store'), [
            'name' => 'Treatments',
            'description' => 'Wellness treatments.',
        ])->assertSessionHasNoErrors()->assertRedirect(route('settings.catalog.index', ['target' => 'categories']));

        $this->assertCount(1, $profile->categories()->get());
        $category = $profile->categories()->firstOrFail();

        $this->actingAs($provider)->patch(route('settings.catalog.categories.update', $category), [
            'name' => 'Advanced treatments',
            'description' => 'Updated description.',
        ])->assertSessionHasNoErrors();

        $this->assertSame('Advanced treatments', $category->refresh()->name);

        $this->actingAs($provider)->post(route('settings.catalog.store'), [
            'name' => 'Relaxation massage',
            'price' => '80.00',
            'min_duration' => '60',
            'max_duration' => '60',
            'category_id' => $category->id,
        ])->assertSessionHasNoErrors();

        $this->assertSame($category->id, Service::where('name', 'Relaxation massage')->value('category_id'));

        $this->actingAs($provider)->delete(route('settings.catalog.categories.destroy', $category))
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('settings.catalog.index', ['target' => 'categories']));

        $this->assertModelMissing($category);
    }

    public function test_provider_cannot_manage_another_providers_category(): void
    {
        [$provider] = $this->createProvider();
        [, $otherProfile] = $this->createProvider();
        $category = $otherProfile->categories()->create(['name' => 'Private category']);

        $this->actingAs($provider)
            ->patch(route('settings.catalog.categories.update', $category), ['name' => 'Changed'])
            ->assertForbidden();

        $this->actingAs($provider)
            ->delete(route('settings.catalog.categories.destroy', $category))
            ->assertForbidden();

        $this->assertModelExists($category);
    }

    /** @return array{0: User, 1: ProviderProfile} */
    private function createProvider(): array
    {
        $provider = User::factory()->create();
        Role::findOrCreate('service_provider', 'web');
        $provider->assignRole('service_provider');
        $region = Region::create(['name' => fake()->unique()->word()]);
        $district = District::create([
            'name' => fake()->unique()->city(),
            'region_id' => $region->id,
        ]);
        $category = Category::create(['name' => fake()->unique()->word()]);
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
