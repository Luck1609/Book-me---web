<?php

namespace Tests\Feature\Settings;

use App\Models\Category;
use App\Models\District;
use App\Models\ProviderProfile;
use App\Models\Region;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BusinessProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_provider_can_view_the_business_profile_settings_page(): void
    {
        [$user] = $this->createProvider();

        $response = $this->actingAs($user)->get(route('business-profile.edit'));

        $response->assertOk()->assertInertia(fn ($page) => $page
            ->component('settings/business-profile')
            ->has('providerProfile')
            ->where('providerProfile.is_accepting_bookings', true)
            ->has('categories')
            ->has('regions'));
    }

    public function test_provider_can_update_their_business_profile(): void
    {
        [$user, $profile, $region, $district, $category] = $this->createProvider();

        $response = $this->actingAs($user)->patch(route('business-profile.update'), [
            'business_name' => 'The New Craft Studio',
            'category_id' => $category->id,
            'description' => 'A thoughtful studio for modern appointments.',
            'phone' => '+233240000000',
            'email' => 'hello@craftstudio.test',
            'region_id' => $region->id,
            'district_id' => $district->id,
            'city' => 'Kumasi',
            'address' => '14 Adum Road',
            'is_accepting_bookings' => false,
        ]);

        $response->assertSessionHasNoErrors()->assertRedirect(route('business-profile.edit'));

        $this->assertSame('The New Craft Studio', $profile->refresh()->business_name);
        $this->assertSame('hello@craftstudio.test', $profile->email);
        $this->assertSame('14 Adum Road', $profile->address);
        $this->assertFalse($profile->is_accepting_bookings);
    }

    public function test_provider_cannot_assign_a_district_from_another_region(): void
    {
        [$user, , $region, , $category] = $this->createProvider();
        $otherRegion = Region::query()->create(['name' => 'Central']);
        $otherDistrict = District::query()->create([
            'name' => 'Cape Coast Metropolitan',
            'region_id' => $otherRegion->id,
        ]);

        $response = $this->actingAs($user)
            ->from(route('business-profile.edit'))
            ->patch(route('business-profile.update'), [
                'business_name' => 'The New Craft Studio',
                'category_id' => $category->id,
                'region_id' => $region->id,
                'district_id' => $otherDistrict->id,
                'city' => 'Kumasi',
                'address' => '14 Adum Road',
            ]);

        $response->assertSessionHasErrors('district_id')->assertRedirect(route('business-profile.edit'));
    }

    /**
     * @return array{0: User, 1: ProviderProfile, 2: Region, 3: District, 4: Category}
     */
    private function createProvider(): array
    {
        $user = User::factory()->create();
        Role::findOrCreate('service_provider', 'web');
        $user->assignRole('service_provider');
        $region = Region::query()->create(['name' => 'Ashanti']);
        $district = District::query()->create([
            'name' => 'Kumasi Metropolitan',
            'region_id' => $region->id,
        ]);
        $category = Category::query()->create(['name' => 'Beauty']);
        $profile = $user->providerProfile()->create([
            'region_id' => $region->id,
            'district_id' => $district->id,
            'category_id' => $category->id,
            'business_name' => 'The Craft Barbershop',
            'slug' => 'the-craft-barbershop',
            'description' => 'A modern barbershop.',
            'phone' => '+233240000000',
            'email' => 'hello@barbershop.test',
            'address' => '12 Adum Road',
            'city' => 'Kumasi',
            'working_days' => ['monday', 'wednesday', 'friday'],
            'works_on_holidays' => false,
        ]);

        return [$user, $profile, $region, $district, $category];
    }
}
