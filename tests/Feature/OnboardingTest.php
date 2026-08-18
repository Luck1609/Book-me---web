<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OnboardingTest extends TestCase
{
    use RefreshDatabase;

    public function test_unonboarded_users_can_access_the_onboarding_screen(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get(route('onboarding'))
            ->assertOk();
    }

    public function test_guests_are_redirected_to_login_before_onboarding_is_checked(): void
    {
        $this->get(route('dashboard'))
            ->assertRedirect(route('login'));
    }
}
