<?php

namespace Tests\Feature\Settings;

use App\Models\Category;
use App\Models\District;
use App\Models\ProviderProfile;
use App\Models\Region;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class ServicesTest extends TestCase
{
    use RefreshDatabase;

    public function test_provider_can_view_the_services_page(): void
    {
        [$user, $profile] = $this->createProvider();
        $service = $profile->services()->create([
            'name' => 'Premium haircut',
            'description' => 'A tailored haircut and finish.',
            'price' => 80,
            'min_duration_minutes' => 30,
            'max_duration_minutes' => 45,
        ]);

        $response = $this->actingAs($user)->get(route('services.index'));

        $response->assertOk()->assertInertia(fn ($page) => $page
            ->component('settings/services')
            ->has('services', 1)
            ->where('services.0.id', $service->id)
            ->where('services.0.name', 'Premium haircut'));
    }

    public function test_provider_can_create_update_and_delete_a_service(): void
    {
        [$user, $profile] = $this->createProvider();

        $createResponse = $this->actingAs($user)->post(route('services.store'), [
            'name' => 'Premium haircut',
            'description' => 'A tailored haircut and finish.',
            'price' => '80.00',
            'min_duration' => '30',
            'max_duration' => '45',
            'image' => UploadedFile::fake()->image('service.png'),
        ]);

        $createResponse->assertSessionHasNoErrors()->assertRedirect(route('services.index'));

        $service = $profile->services()->firstOrFail();
        $this->assertSame(30, $service->min_duration_minutes);
        $this->assertSame(45, $service->max_duration_minutes);
        $this->assertCount(1, $service->getMedia('image'));

        $updateResponse = $this->actingAs($user)->put(route('services.update', $service), [
            'name' => 'Signature haircut',
            'description' => 'A refreshed service description.',
            'price' => '95.00',
            'min_duration' => '45',
            'max_duration' => '60',
        ]);

        $updateResponse->assertSessionHasNoErrors()->assertRedirect(route('services.index'));
        $this->assertSame('Signature haircut', $service->refresh()->name);
        $this->assertSame('95.00', $service->price);

        $deleteResponse = $this->actingAs($user)->delete(route('services.destroy', $service));

        $deleteResponse->assertSessionHasNoErrors()->assertRedirect(route('services.index'));
        $this->assertSoftDeleted('services', ['id' => $service->id]);
    }

    public function test_provider_cannot_manage_another_providers_service(): void
    {
        [$user] = $this->createProvider();
        [, $otherProfile] = $this->createProvider();
        $service = $otherProfile->services()->create([
            'name' => 'Private service',
            'description' => 'This belongs to another provider.',
            'price' => 50,
            'min_duration_minutes' => 30,
            'max_duration_minutes' => 30,
        ]);

        $response = $this->actingAs($user)->delete(route('services.destroy', $service));

        $response->assertForbidden();
        $this->assertNotSoftDeleted('services', ['id' => $service->id]);
    }

    /**
     * @return array{0: User, 1: ProviderProfile}
     */
    private function createProvider(): array
    {
        $user = User::factory()->create();
        Role::findOrCreate('service_provider', 'web');
        $user->assignRole('service_provider');
        $region = Region::query()->create(['name' => fake()->unique()->word()]);
        $district = District::query()->create([
            'name' => fake()->unique()->city(),
            'region_id' => $region->id,
        ]);
        $category = Category::query()->create(['name' => fake()->unique()->word]);
        $profile = $user->providerProfile()->create([
            'region_id' => $region->id,
            'district_id' => $district->id,
            'category_id' => $category->id,
            'business_name' => fake()->company(),
            'slug' => fake()->unique()->slug(),
            'working_days' => ['monday'],
        ]);

        return [$user, $profile];
    }
}
