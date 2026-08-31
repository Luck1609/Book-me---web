<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Conversation;
use App\Models\District;
use App\Models\ProviderProfile;
use App\Models\Region;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ChatTest extends TestCase
{
    use RefreshDatabase;

    public function test_provider_and_client_can_only_view_their_shared_chat_history(): void
    {
        [$provider, $providerProfile] = $this->createProvider();
        $client = $this->createClient();
        $otherClient = $this->createClient();
        $providerProfile->clients()->attach($client);
        $conversation = Conversation::query()->create([
            'provider_profile_id' => $providerProfile->id,
            'client_id' => $client->id,
        ]);
        $message = $conversation->messages()->create([
            'sender_id' => $client->id,
            'body' => 'Could we move my appointment slightly later?',
        ]);
        $conversation->update(['last_message_at' => $message->created_at]);

        $this->actingAs($provider)
            ->get(route('chats.show', $conversation))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('chats/index')
                ->where('activeConversation.id', $conversation->id)
                ->where('activeConversation.name', $client->name)
                ->where('messages.0.body', 'Could we move my appointment slightly later?'));

        $this->actingAs($client)
            ->get(route('chats.show', $conversation))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('activeConversation.name', $providerProfile->business_name)
                ->where('messages.0.sender_id', $client->id));

        $this->actingAs($otherClient)
            ->get(route('chats.show', $conversation))
            ->assertForbidden();
    }

    public function test_client_can_start_a_conversation_and_provider_receives_new_messages(): void
    {
        $client = $this->createClient();
        [$provider, $providerProfile] = $this->createProvider();
        $providerProfile->clients()->attach($client);

        $response = $this->actingAs($client)->post(route('chats.store'), [
            'provider_profile_id' => $providerProfile->id,
        ]);

        $conversation = Conversation::query()->firstOrFail();
        $response->assertRedirect(route('chats.show', $conversation));

        $this->actingAs($client)
            ->post(route('chats.messages.store', $conversation), [
                'body' => 'I have a question about my upcoming booking.',
            ])
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('chats.show', $conversation));

        $this->assertDatabaseHas('messages', [
            'conversation_id' => $conversation->id,
            'sender_id' => $client->id,
            'body' => 'I have a question about my upcoming booking.',
        ]);
        $this->assertSame($client->id, $conversation->fresh()->client_id);

        $this->actingAs($provider)
            ->get(route('chats.show', $conversation))
            ->assertInertia(fn (Assert $page) => $page
                ->where('messages.0.body', 'I have a question about my upcoming booking.'));
    }

    public function test_provider_can_start_a_conversation_with_an_existing_client(): void
    {
        [$provider, $providerProfile] = $this->createProvider();
        $client = $this->createClient();
        $providerProfile->clients()->attach($client);

        $response = $this->actingAs($provider)->post(route('chats.store'), [
            'provider_profile_id' => $providerProfile->id,
            'client_id' => $client->id,
        ]);

        $conversation = Conversation::query()->firstOrFail();
        $response->assertRedirect(route('chats.show', $conversation));

        $this->actingAs($provider)
            ->post(route('chats.messages.store', $conversation), [
                'body' => 'Your appointment is confirmed.',
            ])
            ->assertSessionHasNoErrors();

        $this->actingAs($client)
            ->get(route('chats.show', $conversation))
            ->assertInertia(fn (Assert $page) => $page
                ->where('messages.0.sender_id', $provider->id)
                ->where('messages.0.body', 'Your appointment is confirmed.'));
    }

    /** @return array{0: User, 1: ProviderProfile} */
    private function createProvider(): array
    {
        $provider = User::factory()->create();
        Role::findOrCreate('service_provider', 'web');
        $provider->assignRole('service_provider');
        $region = Region::query()->create(['name' => fake()->unique()->word()]);
        $district = District::query()->create([
            'name' => fake()->unique()->city(),
            'region_id' => $region->id,
        ]);
        $category = Category::query()->create(['name' => fake()->unique()->word()]);
        $profile = $provider->providerProfile()->create([
            'region_id' => $region->id,
            'district_id' => $district->id,
            'category_id' => $category->id,
            'business_name' => fake()->company(),
            'slug' => fake()->unique()->slug(),
            'working_days' => ['monday'],
        ]);

        return [$provider, $profile];
    }

    private function createClient(): User
    {
        $client = User::factory()->create();
        Role::findOrCreate('client', 'web');
        $client->assignRole('client');

        return $client;
    }
}
