<?php

namespace Tests\Feature;

use App\Models\BusinessHour;
use App\Models\Category;
use App\Models\District;
use App\Models\Region;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class ProviderOnboardingTest extends TestCase
{
    use RefreshDatabase;

    public function test_provider_onboarding_persists_the_profile_hours_and_services(): void
    {
        $user = User::factory()->create();
        $region = Region::query()->create(['name' => 'Ashanti']);
        $district = District::query()->create([
            'name' => 'Kumasi Metropolitan',
            'region_id' => $region->id,
        ]);
        $category = Category::query()->create(['name' => 'Beauty']);

        $response = $this->actingAs($user)->post(route('onboarding.store'), [
            'type' => 'provider',
            'avatar' => UploadedFile::fake()->image('avatar.png'),
            'name' => 'The Craft Barbershop',
            'category_id' => $category->id,
            'description' => 'A modern barbershop.',
            'region_id' => $region->id,
            'district_id' => $district->id,
            'city' => 'Kumasi',
            'address' => '12 Adum Road',
            'working_days' => ['monday', 'wednesday', 'friday'],
            'opens_at' => '09:00',
            'closes_at' => '18:00',
            'includes_holidays' => '1',
            'services' => [
                [
                    'image' => UploadedFile::fake()->image('service.png'),
                    'name' => 'Premium haircut',
                    'price' => '80.00',
                    'min_duration' => '30',
                    'max_duration' => '45',
                    'description' => 'A tailored haircut and finish.',
                ],
            ],
        ]);

        $response->assertRedirect(route('onboarding.success'))
            ->assertSessionHasNoErrors();

        $user->refresh();
        $profile = $user->providerProfile()->with(['businessHours', 'services'])->firstOrFail();
        $service = $profile->services->firstOrFail();

        $this->assertTrue($user->has_onboarded);
        $this->assertTrue($user->hasRole('service_provider'));
        $this->assertSame('The Craft Barbershop', $profile->business_name);
        $this->assertSame(['monday', 'wednesday', 'friday'], $profile->working_days);
        $this->assertTrue($profile->works_on_holidays);
        $this->assertCount(7, $profile->businessHours);
        $this->assertFalse($profile->businessHours->firstWhere('day_of_week', 1)->is_closed);
        $this->assertTrue($profile->businessHours->firstWhere('day_of_week', 2)->is_closed);
        $this->assertSame(30, $service->min_duration_minutes);
        $this->assertSame(45, $service->max_duration_minutes);
        $this->assertSame(0, $service->sort_order);
        $this->assertCount(1, $profile->getMedia('avatar'));
        $this->assertCount(1, $service->getMedia('image'));
    }

    public function test_client_onboarding_marks_the_user_complete_without_creating_a_provider_profile(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('onboarding.store'), [
            'type' => 'client',
        ]);

        $response->assertRedirect(route('onboarding.success'))
            ->assertSessionHasNoErrors();

        $user->refresh();

        $this->assertTrue($user->has_onboarded);
        $this->assertTrue($user->hasRole('client'));
        $this->assertFalse($user->providerProfile()->exists());
        $this->assertSame(0, BusinessHour::query()->count());
    }

    public function test_provider_onboarding_can_skip_services(): void
    {
        $user = User::factory()->create();
        $region = Region::query()->create(['name' => 'Ashanti']);
        $district = District::query()->create([
            'name' => 'Kumasi Metropolitan',
            'region_id' => $region->id,
        ]);
        $category = Category::query()->create(['name' => 'Beauty']);

        $response = $this->actingAs($user)->post(route('onboarding.store'), [
            'type' => 'provider',
            'name' => 'The Craft Barbershop',
            'category_id' => $category->id,
            'description' => 'A modern barbershop.',
            'region_id' => $region->id,
            'district_id' => $district->id,
            'city' => 'Kumasi',
            'address' => '12 Adum Road',
            'working_days' => ['monday', 'wednesday', 'friday'],
            'opens_at' => '09:00',
            'closes_at' => '18:00',
            'includes_holidays' => '1',
            'services' => [],
        ]);

        $response->assertRedirect(route('onboarding.success'))
            ->assertSessionHasNoErrors();

        $user->refresh();

        $this->assertTrue($user->has_onboarded);
        $this->assertTrue($user->hasRole('service_provider'));
        $this->assertNotNull($user->providerProfile);
        $this->assertSame(0, $user->providerProfile->services()->count());
    }
}
