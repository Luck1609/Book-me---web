<?php

namespace Tests\Feature;

use App\Enums\ProviderStatus;
use App\Models\Booking;
use App\Models\BusinessHour;
use App\Models\Category;
use App\Models\District;
use App\Models\ProviderProfile;
use App\Models\Region;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ClientBookingTest extends TestCase
{
    use RefreshDatabase;

    public function test_client_dashboard_and_provider_discovery_use_live_provider_data(): void
    {
        $client = $this->createClient();
        [, $provider] = $this->createProvider('The Gilded Blade', ProviderStatus::Approved);
        $provider->services()->create([
            'name' => 'Signature cut',
            'price' => 80,
            'min_duration_minutes' => 45,
            'max_duration_minutes' => 45,
        ]);

        $this->actingAs($client)
            ->get(route('dashboard'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('client/dashboard')
                ->where('stats.upcoming', 0)
                ->where('providers.0.business_name', 'The Gilded Blade'));

        $this->actingAs($client)
            ->get(route('client.providers.index', ['search' => 'Gilded']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('client/providers/index')
                ->where('filters.search', 'Gilded')
                ->has('providers.data', 1)
                ->where('providers.data.0.business_name', 'The Gilded Blade'));

        $this->actingAs($client)
            ->get(route('client.providers.show', $provider->slug))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('client/providers/show')
                ->where('provider.business_name', 'The Gilded Blade')
                ->has('provider.services', 1));

        $this->actingAs($client)
            ->get(route('client.booking.create', ['provider' => $provider->id]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('client/bookings/form/index')
                ->where('provider.id', $provider->id)
                ->has('services', 1));
    }

    public function test_client_can_request_a_booking_for_an_open_provider(): void
    {
        $client = $this->createClient();
        [, $provider] = $this->createProvider('The Gilded Blade', ProviderStatus::Approved);
        $service = $provider->services()->create([
            'name' => 'Signature cut',
            'price' => 80,
            'min_duration_minutes' => 45,
            'max_duration_minutes' => 45,
        ]);
        $date = now()->addDay();
        BusinessHour::factory()->create([
            'provider_profile_id' => $provider->id,
            'day_of_week' => $date->dayOfWeek,
            'opens_at' => '09:00',
            'closes_at' => '17:00',
        ]);

        $response = $this->actingAs($client)->post(route('client.booking.store'), [
            'provider_profile_id' => $provider->id,
            'service_id' => $service->id,
            'duration_minutes' => 45,
            'date' => $date->format('Y-m-d'),
            'time' => '10:00',
            'notes' => 'Please keep the finish natural.',
        ]);

        $response->assertSessionHasNoErrors()->assertRedirect(route('client.booking.index'));
        $booking = $client->bookings()->firstOrFail();

        $this->assertModelExists($booking);
        $this->assertSame(Booking::STATUS_PENDING, $booking->status);
        $this->assertSame($provider->id, $booking->provider_profile_id);
        $this->assertTrue($provider->clients()->whereKey($client->id)->exists());
    }

    public function test_client_cannot_book_a_time_that_is_already_booked_or_blocked(): void
    {
        $client = $this->createClient();
        [, $provider] = $this->createProvider('The Gilded Blade', ProviderStatus::Approved);
        $service = $provider->services()->create([
            'name' => 'Signature cut',
            'price' => 80,
            'min_duration_minutes' => 45,
            'max_duration_minutes' => 45,
        ]);
        $date = now()->addDay();
        $provider->bookings()->create([
            'user_id' => User::factory()->create()->id,
            'service_id' => $service->id,
            'schedule' => $date->setTime(10, 0),
            'duration_minutes' => 45,
            'status' => Booking::STATUS_CONFIRMED,
        ]);

        $response = $this->actingAs($client)->post(route('client.booking.store'), [
            'provider_profile_id' => $provider->id,
            'service_id' => $service->id,
            'duration_minutes' => 45,
            'date' => $date->format('Y-m-d'),
            'time' => '10:15',
        ]);

        $response->assertStatus(422);
        $this->assertSame(1, $provider->bookings()->count());
    }

    public function test_client_can_view_and_cancel_only_their_future_booking(): void
    {
        $client = $this->createClient();
        $otherClient = $this->createClient();
        [, $provider] = $this->createProvider('The Gilded Blade', ProviderStatus::Approved);
        $service = $provider->services()->create([
            'name' => 'Signature cut',
            'price' => 80,
            'min_duration_minutes' => 45,
            'max_duration_minutes' => 45,
        ]);
        $booking = $provider->bookings()->create([
            'user_id' => $client->id,
            'service_id' => $service->id,
            'schedule' => now()->addDay(),
            'duration_minutes' => 45,
            'status' => Booking::STATUS_PENDING,
        ]);

        $this->actingAs($client)
            ->get(route('client.booking.show', $booking))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('client/bookings/show')
                ->where('booking.id', $booking->id)
                ->where('booking.can_cancel', true));

        $this->actingAs($otherClient)
            ->get(route('client.booking.show', $booking))
            ->assertForbidden();

        $this->actingAs($client)
            ->delete(route('client.booking.destroy', $booking))
            ->assertRedirect(route('client.booking.index'));

        $this->assertSame(Booking::STATUS_CANCELLED, $booking->fresh()->status);
    }

    private function createClient(): User
    {
        $client = User::factory()->create();
        Role::findOrCreate('client', 'web');
        $client->assignRole('client');

        return $client;
    }

    /** @return array{0: User, 1: ProviderProfile} */
    private function createProvider(string $businessName, ProviderStatus $status): array
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
            'business_name' => $businessName,
            'slug' => fake()->unique()->slug(),
            'status' => $status,
            'working_days' => ['monday'],
        ]);

        return [$provider, $profile];
    }
}
