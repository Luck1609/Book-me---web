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
