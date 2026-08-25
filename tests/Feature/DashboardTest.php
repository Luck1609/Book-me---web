<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\BusinessHour;
use App\Models\Category;
use App\Models\District;
use App\Models\Region;
use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $response = $this->get(route('dashboard'));
        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_users_without_a_provider_profile_are_redirected_to_onboarding(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get(route('dashboard'))
            ->assertRedirect(route('onboarding'));
    }

    public function test_provider_dashboard_returns_provider_scoped_dashboard_data(): void
    {
        $provider = User::factory()->create();
        $region = Region::query()->create(['name' => 'Ashanti']);
        $district = District::query()->create([
            'name' => 'Kumasi Metropolitan',
            'region_id' => $region->id,
        ]);
        $category = Category::query()->create(['name' => 'Beauty']);
        $profile = $provider->providerProfile()->create([
            'region_id' => $region->id,
            'district_id' => $district->id,
            'category_id' => $category->id,
            'business_name' => 'Book Me Barbers',
            'slug' => 'book-me-barbers',
            'description' => 'A modern barbershop.',
            'working_days' => ['monday'],
        ]);
        $service = Service::factory()->create([
            'provider_profile_id' => $profile->id,
            'name' => 'Haircut',
            'price' => 85,
            'min_duration_minutes' => 60,
            'max_duration_minutes' => 60,
        ]);
        BusinessHour::factory()->create([
            'provider_profile_id' => $profile->id,
            'day_of_week' => now()->dayOfWeek,
        ]);
        $client = User::factory()->create(['name' => 'Jamie Client']);
        Booking::query()->create([
            'user_id' => $client->id,
            'provider_profile_id' => $profile->id,
            'service_id' => $service->id,
            'schedule' => now()->subMinutes(10),
        ]);

        $this->actingAs($provider)
            ->get(route('dashboard'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('provider/dashboard')
                ->where('metrics.bookings_this_month', 1)
                ->where('metrics.revenue_this_month', 85)
                ->where('today.booking_count', 1)
                ->where('today.appointments.0.client', 'Jamie Client')
                ->where('today.appointments.0.service', 'Haircut')
                ->where('today.appointments.0.status', 'in-progress')
                ->where('profile.business_name', 'Book Me Barbers')
                ->has('weekly_revenue.days', 7));
    }
}
