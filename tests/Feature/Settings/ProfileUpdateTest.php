<?php

namespace Tests\Feature\Settings;

use App\Contracts\SmsSender;
use App\Models\User;
use App\Models\UserPhone;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class ProfileUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_profile_page_is_displayed(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get(route('settings.profile.edit'));

        $response->assertOk();
    }

    public function test_user_can_add_multiple_ghanaian_phone_numbers(): void
    {
        $user = User::factory()->create();
        $sender = \Mockery::mock(SmsSender::class);
        $sender->shouldReceive('send')->twice();
        $this->app->instance(SmsSender::class, $sender);

        $this->actingAs($user)->post(route('settings.profile.phones.store'), ['phone' => '024 123 4567'])
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('settings.profile.edit'));
        $this->actingAs($user)->post(route('settings.profile.phones.store'), ['phone' => '+233 50 123 4568'])
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('settings.profile.edit'));

        $this->assertCount(2, $user->phoneNumbers()->get());
        $this->assertTrue($user->phoneNumbers()->where('phone', '+233241234567')->exists());
        $this->assertTrue($user->phoneNumbers()->where('phone', '+233501234568')->exists());
    }

    public function test_phone_number_must_be_a_valid_ghanaian_mobile_number(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->from(route('settings.profile.edit'))
            ->post(route('settings.profile.phones.store'), ['phone' => '+14155552671'])
            ->assertSessionHasErrors('phone')
            ->assertRedirect(route('settings.profile.edit'));

        $this->assertDatabaseCount('user_phones', 0);
    }

    public function test_user_can_verify_an_added_phone_number(): void
    {
        $user = User::factory()->create();
        $sentMessage = null;
        $sender = \Mockery::mock(SmsSender::class);
        $sender->shouldReceive('send')->once()->withArgs(function (string $phone, string $message) use (&$sentMessage): bool {
            $sentMessage = $message;

            return $phone === '+233241234567';
        });
        $this->app->instance(SmsSender::class, $sender);

        $this->actingAs($user)->post(route('settings.profile.phones.store'), ['phone' => '0241234567']);
        preg_match('/\b(\d{6})\b/', (string) $sentMessage, $matches);

        $this->actingAs($user)->post(route('settings.profile.phones.verify'), [
            'phone' => '0241234567',
            'code' => $matches[1],
        ])->assertSessionHasNoErrors()->assertRedirect(route('settings.profile.edit'));

        $this->assertNotNull(UserPhone::where('phone', '+233241234567')->firstOrFail()->verified_at);
    }

    public function test_profile_information_can_be_updated(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->patch(route('profile.update'), [
                'name' => 'Test User',
                'email' => 'test@example.com',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('profile.edit'));

        $user->refresh();

        $this->assertSame('Test User', $user->name);
        $this->assertSame('test@example.com', $user->email);
        $this->assertNull($user->email_verified_at);
    }

    public function test_profile_avatar_can_be_updated(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->patch(route('profile.update'), [
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => UploadedFile::fake()->image('avatar.png'),
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('profile.edit'));

        $this->assertCount(1, $user->refresh()->getMedia('avatar'));
        $this->assertNotNull($user->avatar);
    }

    public function test_profile_avatar_must_be_an_image(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->from(route('profile.edit'))
            ->patch(route('profile.update'), [
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => UploadedFile::fake()->create('avatar.pdf', 100, 'application/pdf'),
            ]);

        $response
            ->assertSessionHasErrors('avatar')
            ->assertRedirect(route('profile.edit'));

        $this->assertCount(0, $user->refresh()->getMedia('avatar'));
    }

    public function test_email_verification_status_is_unchanged_when_the_email_address_is_unchanged(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->patch(route('profile.update'), [
                'name' => 'Test User',
                'email' => $user->email,
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('profile.edit'));

        $this->assertNotNull($user->refresh()->email_verified_at);
    }

    public function test_user_can_delete_their_account(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->delete(route('profile.destroy'), [
                'password' => 'password',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('home'));

        $this->assertGuest();
        $this->assertNull($user->fresh());
    }

    public function test_correct_password_must_be_provided_to_delete_account(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->from(route('profile.edit'))
            ->delete(route('profile.destroy'), [
                'password' => 'wrong-password',
            ]);

        $response
            ->assertSessionHasErrors('password')
            ->assertRedirect(route('profile.edit'));

        $this->assertNotNull($user->fresh());
    }
}
