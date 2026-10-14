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

class ProviderAutomationTest extends TestCase
{
    use RefreshDatabase;

    public function test_provider_can_view_automation_catalog_with_provider_scoped_settings(): void
    {
        [$provider, $profile] = $this->createProvider();

        $response = $this->actingAs($provider)->get(route('settings.notifications.index', ['target' => 'automation']));

        $response->assertOk()->assertInertia(fn (Assert $page) => $page
            ->component('settings/provider/notification/automation')
            ->has('automations', 6)
            ->where('automations.0.items.0.enabled', false));

        $this->assertDatabaseCount('provider_automations', 11);
        $this->assertDatabaseHas('provider_automations', ['provider_profile_id' => $profile->id, 'key' => 'new_appointment']);
    }

    public function test_provider_can_enable_automation_with_a_custom_message(): void
    {
        [$provider, $profile] = $this->createProvider();
        $automation = $profile->automations()->create(['key' => 'new_appointment', 'enabled' => false, 'message' => 'Default', 'channel' => 'email', 'channels' => ['email']]);

        $this->actingAs($provider)->put(route('settings.notifications.update', $automation), [
            'enabled' => true,
            'message' => 'Welcome {client_name}, your appointment is confirmed.',
            'channels' => ['email', 'sms', 'whatsapp'],
        ])->assertSessionHasNoErrors();

        $this->assertSame(['email', 'sms', 'whatsapp'], $automation->fresh()->channels);
        $this->assertDatabaseHas('provider_automations', ['id' => $automation->id, 'provider_profile_id' => $profile->id, 'enabled' => true, 'message' => 'Welcome {client_name}, your appointment is confirmed.']);
    }

    public function test_provider_cannot_update_another_providers_automation(): void
    {
        [$provider] = $this->createProvider();
        [, $otherProfile] = $this->createProvider();
        $automation = $otherProfile->automations()->create(['key' => 'new_appointment', 'enabled' => false, 'message' => 'Default', 'channel' => 'email', 'channels' => ['email']]);

        $this->actingAs($provider)->put(route('settings.notifications.update', $automation), [
            'enabled' => true,
            'message' => 'Not allowed',
            'channels' => ['email'],
        ])->assertForbidden();
    }

    /** @return array{0: User, 1: ProviderProfile} */
    private function createProvider(): array
    {
        $provider = User::factory()->create();
        Role::findOrCreate('service_provider', 'web');
        $provider->assignRole('service_provider');
        $region = Region::create(['name' => fake()->unique()->word()]);
        $district = District::create(['name' => fake()->unique()->city(), 'region_id' => $region->id]);
        $category = Category::create(['name' => fake()->unique()->word()]);
        $profile = $provider->providerProfile()->create([
            'region_id' => $region->id,
            'district_id' => $district->id,
            'category_id' => $category->id,
            'business_name' => fake()->company(),
            'working_days' => ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        ]);

        return [$provider, $profile];
    }
}
