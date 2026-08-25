<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Str;
use Tests\TestCase;

class NotificationsTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_view_their_unread_notifications(): void
    {
        $user = User::factory()->create();
        Role::findOrCreate('client', 'web');
        $user->assignRole('client');

        $unreadNotification = DatabaseNotification::create([
            'id' => (string) Str::uuid(),
            'type' => 'App\\Notifications\\BookingConfirmed',
            'notifiable_type' => User::class,
            'notifiable_id' => $user->id,
            'data' => [
                'title' => 'Booking confirmed',
                'message' => 'Your appointment is ready to view.',
            ],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DatabaseNotification::create([
            'id' => (string) Str::uuid(),
            'type' => 'App\\Notifications\\OldUpdate',
            'notifiable_type' => User::class,
            'notifiable_id' => $user->id,
            'data' => ['title' => 'Already read'],
            'read_at' => now(),
            'created_at' => now()->subDay(),
            'updated_at' => now()->subDay(),
        ]);

        $response = $this->actingAs($user)->get(route('notifications.index'));

        $response->assertOk()->assertInertia(fn ($page) => $page
            ->component('notifications/index')
            ->has('notifications', 1)
            ->where('unreadNotificationCount', 1)
            ->where('notifications.0.id', $unreadNotification->id)
            ->where('notifications.0.data.title', 'Booking confirmed'));
    }

    public function test_notifications_page_requires_authentication(): void
    {
        $this->get(route('notifications.index'))
            ->assertRedirect(route('login'));
    }
}
