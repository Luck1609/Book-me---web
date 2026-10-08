<?php

namespace App\Services;

use App\Models\ProviderProfile;
use App\Models\Review;
use App\Models\Service;
use App\Models\User;
use Carbon\CarbonImmutable;
use Illuminate\Support\Collection;

class RatingService
{

  /** @return array<string, mixed> */
  public function breakdownData(ProviderProfile $profile, Collection $reviews): array
  {
    $services = $profile->services()
      ->withCount('reviews')
      ->withAvg('reviews', 'rating')
      ->orderBy('name')
      ->get();

    $months = collect(range(5, 0))->map(function (int $monthsAgo) use ($reviews): array {
      $month = CarbonImmutable::now()->subMonths($monthsAgo);

      $average = $reviews
        ->filter(fn(Review $review): bool => $review->created_at?->isSameMonth($month) === true)
        ->avg('rating');

      return [
        'label' => $month->format('M'),
        'rating' => $average === null
          ? 0
          : round((float) $average, 1)
      ];
    });

    return [
      ...$this->summaryData($reviews),
      'services' => $services->map(function (Service $service) use ($reviews): array {
        $serviceReviews = $reviews->where('service_id', $service->id);
        $current = $serviceReviews->filter(fn(Review $review): bool => $review->created_at?->greaterThanOrEqualTo(now()->subMonths(6)) === true)->avg('rating');
        $previous = $serviceReviews->filter(fn(Review $review): bool => $review->created_at?->between(now()->subMonths(12), now()->subMonths(6)) === true)->avg('rating');

        return [
          'id' => $service->id,
          'name' => $service->name,
          'reviewCount' => $service->reviews_count,
          'rating' => $service->reviews_avg_rating === null ? 0 : round((float) $service->reviews_avg_rating, 2),
          'change' => $current === null || $previous === null ? null : round((float) $current - (float) $previous, 1),
        ];
      })->values(),
      'months' => $months,
    ];
  }

  /** @return array<string, mixed> */
  public function summaryData(Collection $reviews): array
  {
    $total = $reviews->count();

    $breakdown = collect(range(5, 1))->map(function (int $rating) use ($reviews): array {
      $count = $reviews->where('rating', $rating)->count();

      return ['rating' => $rating, 'count' => $count, 'percentage' => $reviews->isEmpty() ? 0 : (int) round($count / $reviews->count() * 100)];
    });

    return [
      'averageRating' => $total === 0 ? 0 : round((float) $reviews->avg('rating'), 1),
      'totalReviews' => $total,
      'thisMonth' => $reviews->filter(fn(Review $review): bool => $review->created_at?->isSameMonth(now()) === true)->count(),
      'ratingBreakdown' => $breakdown->values(),
    ];
  }

  /** @return Collection<int, Review> */
  public function reviews(ProviderProfile $profile): Collection
  {
    return $profile->reviews()->with(['user:id,name', 'service:id,name'])->latest()->get();
  }

  /** @return array<string, mixed> */
  public function reviewData(Review $review): array
  {
    return [
      'id' => $review->id,
      'client' => $review->user?->name ?? 'Former client',
      'rating' => $review->rating,
      'service' => $review->service?->name ?? 'Removed service',
      'comment' => $review->comment ?? '🤖 This is automatically generated since the user didn\'t leave any comment',
      'date' => $review->created_at?->diffForHumans() ?? '',
    ];
  }

  public function providerProfile(?User $user): ProviderProfile
  {
    abort_unless($user instanceof User, 401);

    return $user->providerProfile()->firstOrFail();
  }
}
