<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Services\RatingService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RatingController extends Controller
{
  public function __construct(protected RatingService $service)
  {}

  public function index(Request $request): Response
  {
    $profile = $this->service->providerProfile($request->user());
    $reviews = $this->service->reviews($profile);

    return match ($request->string('target')->toString()) {
      'breakdown' => Inertia::render('settings/provider/reviews/breakdown', $this->service->breakdownData($profile, $reviews)),
      default => Inertia::render('settings/provider/reviews/index', [
        ...$this->service->summaryData($reviews),
        'reviews' => $reviews->take(5)->map(fn(Review $review): array => $this->service->reviewData($review))->values(),
      ]),
    };
  }

  public function show(Request $request, string $review): Response
  {
    $profile = $this->service->providerProfile($request->user());
    $service = $profile->services()->whereKey($review)->firstOrFail();
    $rating = $request->integer('rating');
    $reviews = $service->reviews()
      ->whereBelongsTo($profile)
      ->when($rating >= 1 && $rating <= 5, fn($query) => $query->where('rating', $rating))
      ->with(['user:id,name', 'service:id,name'])
      ->latest()
      ->get();

    return Inertia::render('settings/provider/reviews/show', [
      'service' => ['id' => $service->id, 'name' => $service->name],
      'rating' => $rating >= 1 && $rating <= 5 ? $rating : null,
      'reviews' => $reviews->map(fn(Review $item): array => $this->service->reviewData($item))->values(),
    ]);
  }


}
