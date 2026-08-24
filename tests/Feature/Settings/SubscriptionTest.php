<?php

namespace Tests\Feature\Settings;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SubscriptionTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_provider_can_view_the_subscription_settings_page(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('subscription.edit'));

        $response->assertOk()->assertInertia(fn ($page) => $page
            ->component('settings/subscription'));
    }
}
