<?php

namespace Tests\Feature\Settings;

use App\Models\Booking;
use App\Models\Category;
use App\Models\District;
use App\Models\ProviderProfile;
use App\Models\Region;
use App\Models\Review;
use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ProviderReviewsTest extends TestCase
{
    use RefreshDatabase;

    public function test_provider_can_view_database_backed_review_overview_and_breakdown(): void
    {
        [$provider, $profile] = $this->createProvider();
        $service = $profile->services()->create([
            'name' => 'Signature facial',
            'price' => 100,
            'min_duration_minutes' => 60,
            'max_duration_minutes' => 60,
        ]);
        $this->createReview($profile, $service, 5, 'Wonderful service.');
        $this->createReview($profile, $service, 4, 'Very good visit.');

        $this->actingAs($provider)->get(route('settings.review.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('settings/provider/reviews/index')
                ->where('averageRating', 4.5)
                ->where('totalReviews', 2)
                ->where('ratingBreakdown.0.count', 1)
                ->where('reviews.0.comment', 'Very good visit.')
            );

        $this->actingAs($provider)->get(route('settings.review.index', ['target' => 'breakdown']))
            ->assertInertia(fn (Assert $page) => $page
                ->component('settings/provider/reviews/breakdown')
                ->where('services.0.name', 'Signature facial')
                ->where('services.0.reviewCount', 2)
                ->where('services.0.rating', 4.5)
                ->has('months', 6)
            );
    }

    public function test_provider_can_view_reviews_for_own_service_and_cannot_view_another_provider_service(): void
    {
        [$provider, $profile] = $this->createProvider();
        [, $otherProfile] = $this->createProvider();
        $service = $profile->services()->create([
            'name' => 'Massage',
            'price' => 80,
            'min_duration_minutes' => 30,
            'max_duration_minutes' => 60,
        ]);
        $otherService = $otherProfile->services()->create([
            'name' => 'Other service',
            'price' => 80,
            'min_duration_minutes' => 30,
            'max_duration_minutes' => 60,
        ]);
        $this->createReview($profile, $service, 5, 'Excellent.');

        $this->actingAs($provider)->get(route('settings.review.show', $service))
            ->assertInertia(fn (Assert $page) => $page
                ->component('settings/provider/reviews/show')
                ->where('service.name', 'Massage')
                ->where('reviews.0.comment', 'Excellent.')
            );

        $this->actingAs($provider)->get(route('settings.review.show', $otherService))
            ->assertNotFound();
    }

    /** @return array{0: User, 1: ProviderProfile} */
    private function createProvider(): array
    {
        $provider = User::factory()->create();
        $region = Region::create(['name' => fake()->unique()->word()]);
        $district = District::create(['name' => fake()->unique()->city(), 'region_id' => $region->id]);
        $category = Category::create(['name' => fake()->unique()->word()]);
        $profile = ProviderProfile::factory()->for($provider, 'owner')->create([
            'region_id' => $region->id,
            'district_id' => $district->id,
            'category_id' => $category->id,
            'working_days' => ['monday'],
        ]);

        return [$provider, $profile];
    }

    private function createReview(ProviderProfile $profile, Service $service, int $rating, string $comment): Review
    {
        $client = User::factory()->create();
        $booking = Booking::create([
            'user_id' => $client->id,
            'provider_profile_id' => $profile->id,
            'service_id' => $service->id,
            'schedule' => now()->subDay(),
            'duration_minutes' => 60,
            'status' => Booking::STATUS_COMPLETED,
        ]);

        return Review::create([
            'booking_id' => $booking->id,
            'provider_profile_id' => $profile->id,
            'user_id' => $client->id,
            'service_id' => $service->id,
            'rating' => $rating,
            'comment' => $comment,
        ]);
    }
}
