<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;
use Tests\TestCase;

class SocialAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_supported_providers_redirect_to_social_provider(): void
    {
        foreach (['google', 'facebook', 'tiktok'] as $provider) {
            Socialite::fake($provider);

            $this->get(route('auth.social.redirect', $provider))
                ->assertRedirect();
        }
    }

    public function test_social_callback_creates_and_authenticates_a_user_with_email(): void
    {
        Socialite::fake('google', SocialiteUser::fake([
            'id' => 'google-user-1',
            'name' => 'Google User',
            'email' => 'google@example.com',
            'avatar' => 'https://example.com/google.jpg',
        ]));

        $response = $this->get(route('auth.social.callback', 'google'));

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));

        $user = User::where('email', 'google@example.com')->firstOrFail();

        $this->assertModelExists($user);
        $this->assertSame('google', $user->social_platform);
        $this->assertSame('google-user-1', $user->social_platform_id);
        $this->assertNotNull($user->email_verified_at);
    }

    public function test_social_callback_redirects_to_email_form_when_email_is_missing(): void
    {
        Socialite::fake('facebook', SocialiteUser::fake([
            'id' => 'facebook-user-1',
            'name' => 'Facebook User',
            'email' => null,
        ]));

        $response = $this->get(route('auth.social.callback', 'facebook'));

        $response->assertRedirect(route('auth.social.email.create', absolute: false));
        $response->assertSessionHas('social_auth.pending', [
            'provider' => 'facebook',
            'provider_id' => 'facebook-user-1',
            'name' => 'Facebook User',
            'avatar' => 'https://example.com/avatar.jpg',
        ]);

        $this->get(route('auth.social.email.create'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('auth/social-email')
                ->where('provider', 'Facebook'));
    }

    public function test_missing_email_can_be_completed_to_create_and_authenticate_a_user(): void
    {
        $response = $this->withSession([
            'social_auth.pending' => [
                'provider' => 'tiktok',
                'provider_id' => 'tiktok-user-1',
                'name' => 'TikTok User',
                'avatar' => null,
            ],
        ])->post(route('auth.social.email.store'), [
            'email' => 'tiktok@example.com',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));

        $user = User::where('email', 'tiktok@example.com')->firstOrFail();

        $this->assertModelExists($user);
        $this->assertSame('tiktok', $user->social_platform);
        $this->assertSame('tiktok-user-1', $user->social_platform_id);
        $this->assertNull($user->email_verified_at);
    }

    public function test_missing_email_form_requires_a_valid_email(): void
    {
        $response = $this->withSession([
            'social_auth.pending' => [
                'provider' => 'facebook',
                'provider_id' => 'facebook-user-2',
                'name' => 'Facebook User',
                'avatar' => null,
            ],
        ])->from(route('auth.social.email.create'))->post(route('auth.social.email.store'), [
            'email' => 'not-an-email',
        ]);

        $response->assertSessionHasErrors('email');
        $this->assertGuest();
        $this->assertDatabaseCount('users', 0);
    }

    public function test_existing_social_identity_can_authenticate_without_an_email(): void
    {
        $user = User::factory()->create([
            'email' => 'existing@example.com',
            'social_platform' => 'tiktok',
            'social_platform_id' => 'tiktok-existing',
        ]);

        Socialite::fake('tiktok', SocialiteUser::fake([
            'id' => 'tiktok-existing',
            'email' => null,
        ]));

        $response = $this->get(route('auth.social.callback', 'tiktok'));

        $this->assertAuthenticatedAs($user);
        $response->assertRedirect(route('dashboard', absolute: false));
    }
}
