import { Head } from '@inertiajs/react';
import { ArrowRight, MessageSquareText, Star, TrendingUp } from 'lucide-react';
import { useState } from 'react';

type Review = {
  id: number;
  client: string;
  initials: string;
  rating: number;
  service: string;
  comment: string;
  date: string;
};

type PageProps = {
  averageRating?: number;
  totalReviews?: number;
  reviews?: Review[];
};

const ratingBreakdown = [
  { rating: 5, count: 98, percentage: 77 },
  { rating: 4, count: 22, percentage: 17 },
  { rating: 3, count: 6, percentage: 5 },
  { rating: 2, count: 1, percentage: 1 },
  { rating: 1, count: 1, percentage: 1 },
];

const fallbackReviews: Review[] = [
  {
    id: 1,
    client: 'Ama K.',
    initials: 'AK',
    rating: 5,
    service: 'Signature facial',
    comment:
      'The team is so welcoming and the result was exactly what I wanted. I will definitely be back.',
    date: '2 weeks ago',
  },
  {
    id: 2,
    client: 'Nana B.',
    initials: 'NB',
    rating: 5,
    service: 'Deep tissue massage',
    comment:
      'Beautiful space, easy booking and genuinely thoughtful service from start to finish.',
    date: '1 month ago',
  },
  {
    id: 3,
    client: 'Esi A.',
    initials: 'EA',
    rating: 4,
    service: 'Glow treatment',
    comment:
      'A lovely experience. The staff listened carefully and gave me helpful aftercare advice.',
    date: '1 month ago',
  },
];

function Stars({ rating, size = 'size-4' }: { rating: number; size?: string }) {
  return (
    <span
      className="flex gap-0.5 text-[#f0b75a]"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={`${size} ${index < rating ? 'fill-current' : 'text-[#d8e5df]'}`}
        />
      ))}
    </span>
  );
}

function ReviewCard({
  review,
  onRead,
}: {
  review: Review;
  onRead: (review: Review) => void;
}) {
  return (
    <article className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#d9f7e8] text-xs font-bold text-[#0f6b4d] dark:bg-[#0f8a62]/20 dark:text-[#8fe0bb]">
          {review.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-[#17343c] dark:text-white">
                {review.client}
              </p>
              <p className="mt-0.5 text-xs text-[#70908a] dark:text-[#9cb8b1]">
                {review.service}
              </p>
            </div>
            <time className="shrink-0 text-xs text-[#8ca49d]">
              {review.date}
            </time>
          </div>
          <div className="mt-3">
            <Stars rating={review.rating} size="size-3.5" />
          </div>
          <p className="mt-3 text-sm leading-6 text-[#6f8981] dark:text-[#abc0ba]">
            {review.comment}
          </p>
          <button
            type="button"
            onClick={() => onRead(review)}
            className="mt-3 text-xs font-bold text-[#0f8a62] hover:underline dark:text-[#8fe0bb]"
          >
            Read full review
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ReviewSettings({
  averageRating = 4.9,
  totalReviews = 128,
  reviews = fallbackReviews,
}: PageProps) {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <>
      <Head title="Rating and reviews" />
      <div className="space-y-8">
        <header>
          <p className="text-xs font-bold tracking-[0.16em] text-[#0f8a62] uppercase dark:text-[#8fe0bb]">
            Client feedback
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#17343c] dark:text-white">
            Rating &amp; reviews
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
            See what clients love about your services and find opportunities to
            make every visit even better.
          </p>
        </header>

        <section
          className="grid gap-4 sm:grid-cols-3"
          aria-label="Review summary"
        >
          <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#fff4d9] text-[#c38518]">
              <Star aria-hidden="true" className="size-5 fill-current" />
            </span>
            <p className="mt-5 text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
              Average rating
            </p>
            <div className="mt-1 flex items-end gap-3">
              <p className="text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
                {averageRating.toFixed(1)}
              </p>
              <Stars rating={Math.round(averageRating)} />
            </div>
          </div>
          <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#d9f7e8] text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
              <MessageSquareText aria-hidden="true" className="size-5" />
            </span>
            <p className="mt-5 text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
              Total reviews
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
              {totalReviews}
            </p>
          </div>
          <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#e6e1ff] text-[#594e9e] dark:bg-[#594e9e]/15 dark:text-[#c0b8ec]">
              <TrendingUp aria-hidden="true" className="size-5" />
            </span>
            <p className="mt-5 text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
              This month
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
              +12
            </p>
            <p className="mt-1 text-xs text-[#70908a] dark:text-[#9cb8b1]">
              new reviews received
            </p>
          </div>
        </section>

        <section
          className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] sm:p-6 dark:border-white/10 dark:bg-[#17221f]"
          aria-labelledby="rating-breakdown-title"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                id="rating-breakdown-title"
                className="text-base font-bold text-[#17343c] dark:text-white"
              >
                Rating breakdown
              </h2>
              <p className="mt-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
                Your clients are consistently delighted with their visits.
              </p>
            </div>
            <span className="hidden rounded-full bg-[#e9f8f0] px-3 py-1.5 text-xs font-semibold text-[#0f6b4d] sm:inline-flex dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
              Excellent
            </span>
          </div>
          <div className="mt-6 space-y-3">
            {ratingBreakdown.map((item) => (
              <div
                key={item.rating}
                className="flex items-center gap-3 text-sm"
              >
                <span className="flex w-10 items-center gap-1 font-semibold text-[#17343c] dark:text-white">
                  {item.rating}
                  <Star
                    aria-hidden="true"
                    className="size-3.5 fill-[#f0b75a] text-[#f0b75a]"
                  />
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#edf4f0] dark:bg-white/8">
                  <div
                    className="h-full rounded-full bg-[#0f8a62]"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="w-8 text-right text-xs text-[#70908a] dark:text-[#9cb8b1]">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4" aria-labelledby="recent-reviews-title">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2
                id="recent-reviews-title"
                className="text-lg font-bold text-[#17343c] dark:text-white"
              >
                {showAllReviews ? 'All reviews' : 'Recent reviews'}
              </h2>
              <p className="mt-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
                Read the words your clients shared after their appointments.
              </p>
            </div>
            {reviews.length > 3 && (
              <button
                type="button"
                onClick={() => setShowAllReviews((current) => !current)}
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#0f8a62] hover:underline dark:text-[#8fe0bb]"
              >
                {showAllReviews ? 'Show recent' : 'View all'}
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
            )}
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {visibleReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onRead={setSelectedReview}
              />
            ))}
          </div>
        </section>
      </div>

      {selectedReview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#17343c]/35 p-4"
          role="presentation"
          onClick={() => setSelectedReview(null)}
        >
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-dialog-title"
            className="w-full max-w-lg rounded-2xl border border-[#dceae4] bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#17221f]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold tracking-[0.16em] text-[#0f8a62] uppercase dark:text-[#8fe0bb]">
                  Client review
                </p>
                <h2
                  id="review-dialog-title"
                  className="mt-2 text-xl font-bold text-[#17343c] dark:text-white"
                >
                  {selectedReview.client}
                </h2>
                <p className="mt-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
                  {selectedReview.service} · {selectedReview.date}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close review"
                onClick={() => setSelectedReview(null)}
                className="text-2xl leading-none text-[#70908a] hover:text-[#17343c] dark:hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="mt-5">
              <Stars rating={selectedReview.rating} />
            </div>
            <p className="mt-5 text-base leading-7 text-[#516f67] dark:text-[#c0d1cb]">
              “{selectedReview.comment}”
            </p>
            <button
              type="button"
              onClick={() => setSelectedReview(null)}
              className="mt-6 h-10 rounded-full bg-[#0f8a62] px-5 text-sm font-semibold text-white hover:bg-[#0b7351]"
            >
              Done
            </button>
          </article>
        </div>
      )}
    </>
  );
}
