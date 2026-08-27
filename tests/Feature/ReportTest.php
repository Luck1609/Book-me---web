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

class ReportTest extends TestCase
{
    use RefreshDatabase;

    public function test_provider_can_view_a_database_backed_report_for_a_custom_range(): void
    {
        [$provider, $profile] = $this->createProvider();
        [, $otherProfile] = $this->createProvider();
        $service = $profile->services()->create([
            'name' => 'Signature cut',
            'price' => 100,
            'min_duration_minutes' => 30,
            'max_duration_minutes' => 30,
        ]);
        $otherService = $otherProfile->services()->create([
            'name' => 'Other service',
            'price' => 500,
            'min_duration_minutes' => 30,
            'max_duration_minutes' => 30,
        ]);
        $staffMember = $profile->staffMembers()->create([
            'name' => 'Ama Staff',
            'email' => 'ama-staff@example.com',
            'role' => 'Barber',
            'rating' => 4.8,
            'status' => 'available',
        ]);
        $returningClient = User::factory()->create(['name' => 'Returning Client']);
        $newClient = User::factory()->create(['name' => 'New Client']);
        $startDate = now()->subDays(10)->startOfDay();
        $endDate = now()->endOfDay();

        $profile->bookings()->createMany([
            [
                'user_id' => $returningClient->id,
                'service_id' => $service->id,
                'staff_member_id' => $staffMember->id,
                'schedule' => $startDate->copy()->addDays(2),
                'duration_minutes' => 30,
                'status' => Booking::STATUS_COMPLETED,
            ],
            [
                'user_id' => $returningClient->id,
                'service_id' => $service->id,
                'staff_member_id' => $staffMember->id,
                'schedule' => $startDate->copy()->addDays(5),
                'duration_minutes' => 30,
                'status' => Booking::STATUS_CONFIRMED,
            ],
            [
                'user_id' => $newClient->id,
                'service_id' => $service->id,
                'schedule' => $startDate->copy()->addDays(7),
                'duration_minutes' => 30,
                'status' => Booking::STATUS_CANCELLED,
            ],
        ]);
        $otherProfile->bookings()->create([
            'user_id' => User::factory()->create()->id,
            'service_id' => $otherService->id,
            'schedule' => $startDate->copy()->addDays(3),
            'duration_minutes' => 30,
            'status' => Booking::STATUS_COMPLETED,
        ]);

        $response = $this->actingAs($provider)->get(route('report', [
            'period' => 'custom',
            'start_date' => $startDate->toDateString(),
            'end_date' => $endDate->toDateString(),
        ]));

        $response->assertOk()->assertInertia(fn (Assert $page) => $page
            ->component('provider/report/index')
            ->where('filters.period', 'custom')
            ->where('filters.start_date', $startDate->toDateString())
            ->where('filters.end_date', $endDate->toDateString())
            ->where('report.stats.bookings', 2)
            ->where('report.stats.revenue', 200)
            ->where('report.stats.retention', 100)
            ->where('report.services.0.name', 'Signature cut')
            ->where('report.services.0.bookings', 2)
            ->where('report.services.0.share', 100)
            ->where('report.team.0.name', 'Ama Staff')
            ->where('report.team.0.bookings', 2)
            ->where('report.top_clients.0.name', 'Returning Client')
            ->where('report.top_clients.0.visits', 2)
            ->where('report.top_clients.0.spend', 200));
    }

    public function test_provider_cannot_use_an_invalid_custom_report_range(): void
    {
        [$provider] = $this->createProvider();

        $this->actingAs($provider)
            ->get(route('report', [
                'period' => 'custom',
                'start_date' => '2026-08-20',
                'end_date' => '2026-08-19',
            ]))
            ->assertSessionHasErrors('end_date');
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
