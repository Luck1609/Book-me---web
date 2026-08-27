<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\District;
use App\Models\ProviderProfile;
use App\Models\Region;
use App\Models\Role;
use App\Models\StaffMember;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class TeamTest extends TestCase
{
    use RefreshDatabase;

    public function test_provider_can_view_scoped_team_members_with_search_filters_and_live_stats(): void
    {
        [$provider, $profile] = $this->createProvider();
        [, $otherProfile] = $this->createProvider();
        $availableMember = $profile->staffMembers()->create([
            'name' => 'Ama Available',
            'email' => 'ama@example.com',
            'role' => 'Lead Barber',
            'status' => 'available',
            'shift_start' => '09:00',
            'shift_end' => '18:00',
        ]);
        $awayMember = $profile->staffMembers()->create([
            'name' => 'Kojo Away',
            'email' => 'kojo@example.com',
            'role' => 'Senior Stylist',
            'status' => 'away',
        ]);
        $otherProfile->staffMembers()->create([
            'name' => 'Other Provider',
            'email' => 'other@example.com',
            'role' => 'Barber',
            'status' => 'available',
        ]);
        $service = $profile->services()->create([
            'name' => 'Signature cut',
            'price' => 50,
            'min_duration_minutes' => 30,
            'max_duration_minutes' => 60,
        ]);
        $profile->bookings()->create([
            'user_id' => User::factory()->create()->id,
            'service_id' => $service->id,
            'staff_member_id' => $availableMember->id,
            'schedule' => now()->addDay(),
            'duration_minutes' => 30,
            'status' => 'confirmed',
        ]);

        $response = $this->actingAs($provider)->get(route('team.index', [
            'search' => 'Ama',
            'role' => 'barber',
        ]));

        $response->assertOk()->assertInertia(fn (Assert $page) => $page
            ->component('provider/team/index')
            ->where('stats.total', 2)
            ->where('stats.available', 1)
            ->where('stats.away', 1)
            ->where('stats.bookings', 1)
            ->where('filters.search', 'Ama')
            ->where('filters.role', 'barber')
            ->has('team', 1)
            ->where('team.0.id', $availableMember->id)
            ->where('team.0.bookings', 1)
            ->where('team.0.name', 'Ama Available'));

        $this->actingAs($provider)
            ->get(route('team.index', ['status' => 'away']))
            ->assertInertia(fn (Assert $page) => $page
                ->has('team', 1)
                ->where('team.0.id', $awayMember->id));
    }

    public function test_provider_can_persist_a_team_member(): void
    {
        [$provider, $profile] = $this->createProvider();

        $response = $this->actingAs($provider)->post(route('team.store'), [
            'name' => 'New Team Member',
            'email' => 'new-member@example.com',
            'phone' => '+233240000000',
            'role' => 'Barber',
            'status' => 'available',
            'shift_start' => '09:00',
            'shift_end' => '18:00',
            'next_shift_at' => now()->addDay()->format('Y-m-d H:i'),
        ]);

        $response->assertSessionHasNoErrors()->assertRedirect(route('team.index'));

        $member = StaffMember::query()->where('email', 'new-member@example.com')->firstOrFail();

        $this->assertModelExists($member);
        $this->assertSame($profile->id, $member->provider_profile_id);
        $this->assertSame('Barber', $member->role);
    }

    public function test_provider_cannot_store_an_invalid_team_member(): void
    {
        [$provider] = $this->createProvider();

        $this->actingAs($provider)
            ->post(route('team.store'), [
                'name' => '',
                'email' => 'not-an-email',
                'role' => '',
                'status' => 'unknown',
                'shift_start' => '18:00',
                'shift_end' => '09:00',
            ])
            ->assertSessionHasErrors(['name', 'email', 'role', 'status', 'shift_end']);
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
