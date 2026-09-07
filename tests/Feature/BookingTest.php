<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Category;
use App\Models\District;
use App\Models\ProviderProfile;
use App\Models\Region;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class BookingTest extends TestCase
{
    use RefreshDatabase;

    public function test_provider_can_view_provider_scoped_bookings_with_search_filters_and_live_stats(): void
    {
        [$provider, $profile] = $this->createProvider();
        [, $otherProfile] = $this->createProvider();
        $service = $profile->services()->create([
            'name' => 'Signature haircut',
            'description' => 'A tailored cut.',
            'price' => 85,
            'min_duration_minutes' => 45,
            'max_duration_minutes' => 60,
        ]);
        $otherService = $otherProfile->services()->create([
            'name' => 'Private service',
            'description' => 'Not visible to this provider.',
            'price' => 100,
            'min_duration_minutes' => 30,
            'max_duration_minutes' => 30,
        ]);
        $completedClient = User::factory()->create([
            'name' => 'Jamie Client',
            'email' => 'jamie@example.com',
        ]);
        $pendingClient = User::factory()->create([
            'name' => 'Alex Client',
            'email' => 'alex@example.com',
        ]);

        $completedBooking = $profile->bookings()->create([
            'user_id' => $completedClient->id,
            'service_id' => $service->id,
            'schedule' => now()->subDay(),
            'duration_minutes' => 45,
            'status' => Booking::STATUS_CONFIRMED,
        ]);
        $profile->bookings()->create([
            'user_id' => $pendingClient->id,
            'service_id' => $service->id,
            'schedule' => now()->addDay(),
            'duration_minutes' => 60,
            'status' => Booking::STATUS_PENDING,
        ]);
        $otherProfile->bookings()->create([
            'user_id' => User::factory()->create()->id,
            'service_id' => $otherService->id,
            'schedule' => now()->addDay(),
            'duration_minutes' => 30,
            'status' => Booking::STATUS_CONFIRMED,
        ]);

        $response = $this->actingAs($provider)->get(route('booking.index', [
            'search' => 'Jamie',
            'status' => 'completed',
            'service' => $service->id,
        ]));

        $response->assertOk()->assertInertia(fn (Assert $page) => $page
            ->component('provider/booking/index')
            ->where('stats.total', 2)
            ->where('stats.pending', 1)
            ->where('stats.confirmed', 0)
            ->where('stats.completed_this_month', 1)
            ->where('filters.search', 'Jamie')
            ->where('filters.status', 'completed')
            ->where('filters.service', $service->id)
            ->has('bookings.data', 1)
            ->where('bookings.data.0.id', $completedBooking->id)
            ->where('bookings.data.0.client', 'Jamie Client')
            ->where('bookings.data.0.status', 'completed'));
    }

    public function test_provider_can_create_a_persisted_booking_for_a_new_client(): void
    {
        [$provider, $profile] = $this->createProvider();
        $service = $profile->services()->create([
            'name' => 'Classic cut',
            'description' => 'A classic cut.',
            'price' => 70,
            'min_duration_minutes' => 30,
            'max_duration_minutes' => 60,
        ]);
        $date = now()->addDay()->format('Y-m-d');

        $response = $this->actingAs($provider)->post(route('booking.store'), [
            'client_name' => 'Taylor Client',
            'client_email' => 'taylor@example.com',
            'service_id' => $service->id,
            'duration_minutes' => '45',
            'date' => $date,
            'time' => '10:30',
            'notes' => 'Please use the matte finish.',
        ]);

        $response->assertSessionHasNoErrors()->assertRedirect(route('booking.index'));

        $booking = $profile->bookings()->with(['user', 'service'])->firstOrFail();

        $this->assertModelExists($booking);
        $this->assertSame('Taylor Client', $booking->user->name);
        $this->assertSame('taylor@example.com', $booking->user->email);
        $this->assertSame($service->id, $booking->service->id);
        $this->assertSame(45, $booking->duration_minutes);
        $this->assertSame(Booking::STATUS_CONFIRMED, $booking->status);
        $this->assertSame('Please use the matte finish.', $booking->note);
    }

    public function test_provider_cannot_create_a_booking_with_another_providers_service(): void
    {
        [$provider, $profile] = $this->createProvider();
        [, $otherProfile] = $this->createProvider();
        $service = $otherProfile->services()->create([
            'name' => 'Private service',
            'description' => 'Not available here.',
            'price' => 50,
            'min_duration_minutes' => 30,
            'max_duration_minutes' => 30,
        ]);

        $response = $this->actingAs($provider)->post(route('booking.store'), [
            'client_name' => 'Taylor Client',
            'client_email' => 'taylor@example.com',
            'service_id' => $service->id,
            'duration_minutes' => '30',
            'date' => now()->addDay()->format('Y-m-d'),
            'time' => '10:30',
        ]);

        $response->assertSessionHasErrors('service_id');
        $this->assertDatabaseCount('bookings', 0);
        $this->assertSame(0, $profile->bookings()->count());
    }

    public function test_provider_can_accept_and_cancel_a_pending_booking(): void
    {
        [$provider, $profile] = $this->createProvider();
        $client = User::factory()->create();
        $service = $profile->services()->create([
            'name' => 'Classic cut',
            'description' => 'A classic cut.',
            'price' => 70,
            'min_duration_minutes' => 30,
            'max_duration_minutes' => 60,
        ]);
        $booking = $profile->bookings()->create([
            'user_id' => $client->id,
            'service_id' => $service->id,
            'schedule' => now()->addDay(),
            'duration_minutes' => 45,
            'status' => Booking::STATUS_PENDING,
        ]);

        $this->actingAs($provider)
            ->put(route('booking.update', $booking), ['action' => 'accept'])
            ->assertSessionHasNoErrors()
            ->assertRedirect();

        $this->assertSame(Booking::STATUS_CONFIRMED, $booking->fresh()->status);

        $this->actingAs($provider)
            ->delete(route('booking.destroy', $booking))
            ->assertSessionHasNoErrors()
            ->assertRedirect();

        $this->assertSame(Booking::STATUS_CANCELLED, $booking->fresh()->status);
    }

    public function test_provider_can_reschedule_a_booking_and_detail_includes_client_service_history(): void
    {
        [$provider, $profile] = $this->createProvider();
        $client = User::factory()->create(['name' => 'Jamie Client']);
        $service = $profile->services()->create([
            'name' => 'Signature haircut',
            'description' => 'A tailored cut.',
            'price' => 85,
            'min_duration_minutes' => 45,
            'max_duration_minutes' => 60,
        ]);
        $profile->bookings()->create([
            'user_id' => $client->id,
            'service_id' => $service->id,
            'schedule' => now()->subDays(3),
            'duration_minutes' => 45,
            'status' => Booking::STATUS_CONFIRMED,
        ]);
        $booking = $profile->bookings()->create([
            'user_id' => $client->id,
            'service_id' => $service->id,
            'schedule' => now()->addDay(),
            'duration_minutes' => 45,
            'status' => Booking::STATUS_CONFIRMED,
        ]);
        $newSchedule = now()->addDays(2)->setTime(14, 30);

        $this->actingAs($provider)
            ->put(route('booking.update', $booking), [
                'action' => 'reschedule',
                'date' => $newSchedule->format('Y-m-d'),
                'time' => $newSchedule->format('H:i'),
            ])
            ->assertSessionHasNoErrors()
            ->assertRedirect();

        $this->assertTrue($booking->fresh()->schedule->equalTo($newSchedule));

        $this->actingAs($provider)
            ->get(route('booking.show', $booking))
            ->assertInertia(fn (Assert $page) => $page
                ->where('booking.client_id', $client->id)
                ->where('booking.provider_profile_id', $profile->id)
                ->where('booking.totalSpent', '$85.00')
                ->where('booking.lastVisit', fn (string $lastVisit): bool => str_contains($lastVisit, 'day')));
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
}
