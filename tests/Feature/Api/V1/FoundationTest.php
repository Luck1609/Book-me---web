<?php

namespace Tests\Feature\Api\V1;

use App\Contracts\SmsSender;
use App\Models\ProviderProfile;
use App\Models\Role;
use App\Models\User;
use App\Services\OtpService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\RateLimiter;
use Tests\TestCase;

class FoundationTest extends TestCase
{
    use RefreshDatabase;

    public function test_email_registration_and_password_login_issue_sanctum_token(): void
    {
        $registration = $this->postJson('/api/v1/auth/register', [
            'name' => 'Client User',
            'email' => 'client@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'account_type' => 'client',
        ]);

        $registration->assertCreated()
            ->assertJsonPath('data.user.email', 'client@example.com')
            ->assertJsonPath('data.verification_required', false);

        $user = User::query()->where('email', 'client@example.com')->firstOrFail();
        $this->assertMatchesRegularExpression('/^[0-9a-f-]{36}$/', $user->id);
        $this->assertTrue($user->hasRole('client'));

        $login = $this->postJson('/api/v1/auth/login', [
            'identifier' => 'client@example.com',
            'password' => 'password',
        ]);

        $login->assertOk()->assertJsonStructure(['data' => ['user', 'token']]);

        $token = $login->json('data.token');
        $this->withToken($token)->getJson('/api/v1/auth/me')->assertOk()->assertJsonPath('data.id', $user->id);
        $this->withToken($token)->postJson('/api/v1/auth/logout')->assertOk();
    }

    public function test_phone_registration_sends_hashed_otp_and_verification_issues_token(): void
    {
        RateLimiter::clear('otp:+233501234567');
        $sentMessage = null;
        $sender = \Mockery::mock(SmsSender::class);
        $sender->shouldReceive('send')->once()->withArgs(function (string $phone, string $message) use (&$sentMessage): bool {
            $sentMessage = $message;

            return $phone === '+233501234567';
        });
        $this->app->instance(SmsSender::class, $sender);

        $this->postJson('/api/v1/auth/register', [
            'name' => 'Phone User',
            'phone' => '+233501234567',
            'account_type' => 'client',
        ])->assertCreated()->assertJsonPath('data.verification_required', true);

        preg_match('/\b(\d{6})\b/', (string) $sentMessage, $matches);
        $this->assertArrayHasKey(1, $matches);
        $this->assertDatabaseMissing('otp_challenges', ['code_hash' => $matches[1]]);

        $response = $this->postJson('/api/v1/auth/otp/verify', [
            'phone' => '+233501234567',
            'code' => $matches[1],
        ]);

        $response->assertOk()->assertJsonStructure(['data' => ['user', 'token']]);
        $this->assertNotNull(User::query()->where('phone', '+233501234567')->firstOrFail()->phone_verified_at);
    }

    public function test_expired_or_invalid_otp_cannot_be_used(): void
    {
        $user = User::factory()->create(['phone' => '+233501234568']);
        app(OtpService::class)->request($user->phone);

        $response = $this->postJson('/api/v1/auth/otp/verify', [
            'phone' => $user->phone,
            'code' => '000000',
        ]);

        $response->assertUnprocessable()->assertJsonValidationErrors('code');
        $this->assertNull($user->fresh()->phone_verified_at);
    }

    public function test_provider_resources_are_owned_by_the_authenticated_provider(): void
    {
        $provider = User::factory()->create();
        Role::findOrCreate('service_provider', 'web');
        $provider->assignRole('service_provider');
        $token = $provider->createToken('test')->plainTextToken;

        $profile = $this->withToken($token)->postJson('/api/v1/provider/profile', [
            'business_name' => 'Book Me Barbers',
            'slug' => 'book-me-barbers',
        ])->assertCreated()->json('data');

        $service = $this->withToken($token)->postJson('/api/v1/provider/services', [
            'name' => 'Haircut',
            'price' => 50,
            'duration_minutes' => 30,
        ])->assertCreated()->json('data');

        $other = User::factory()->create();
        $other->assignRole('service_provider');
        $otherToken = $other->createToken('test')->plainTextToken;

        $this->app['auth']->forgetGuards();
        $this->withToken($otherToken)
            ->patchJson('/api/v1/provider/services/'.$service['id'], ['name' => 'Hijacked'])
            ->assertForbidden();

        ProviderProfile::query()->findOrFail($profile['id'])->update(['status' => 'approved']);
        $this->getJson('/api/v1/providers')->assertOk()->assertJsonFragment(['id' => $profile['id']]);
    }
}
