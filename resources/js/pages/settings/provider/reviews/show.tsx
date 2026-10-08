import { Head, useForm } from '@inertiajs/react';
import { Star } from 'lucide-react';
import { Select } from '@/components/form/select';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import settings from '@/routes/settings';
import type { Review } from '@/types/app';
import { ReviewPagesEnum } from '.';




export function Stars({ rating, size = 'size-4' }: { rating: number; size?: string }) {
  return (
    <span
      className="flex gap-0.5 text-[#f0b75a]"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={cn(size, index < rating ? 'fill-current' : 'text-[#d8e5df]')}
        />
      ))}
    </span>
  );
}

type Props = {
  reviews: Review[];
  onRead: (review: Review) => void;
}


export default function ReviewDetails({ reviews, onRead }: Props) {
  const getInitials = useInitials()
  const form = useForm({
    filter: ""
  })
  console.log('Review details', reviews)

  return (
    <>
      <Head title="Review details" />

      <div className="space-y-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-[#0f8a62] uppercase dark:text-[#8fe0bb]">
              Client feedback
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#17343c] dark:text-white">
              Rating breakdown
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
              A closer look at what is driving your rating and how each service
              is performing.
            </p>
          </div>


          <form className="w-60">
            <Select
              name="filter"
              form={form}
              placeholder="Filter by rating"
              options={
                Array.from({ length: 5 }, (_, index: number) => ({
                  label: `${index + 1} star${index > 0 ? 's' : ''}`,
                  value: `${index + 1}`
                }))
              }
            />
          </form>
        </header>

        <section className="grid lg:grid-cols-3 gap-5">
          {
            reviews.map((review) => {
              return (
                <article key={review.id} className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#d9f7e8] text-xs font-bold text-[#0f6b4d] dark:bg-[#0f8a62]/20 dark:text-[#8fe0bb]">
                      {getInitials(review.client)}
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
              )
            })
          }
        </section>
      </div>
    </>
  );
}


ReviewDetails.layout = {
  backOptions: {
    label: 'Back to reviews breakdown',
    url: settings.review.index({ query: { target: 'breakdown' } }).url
    // url: settings.review.index({query: {target: ReviewPagesEnum.Breakdown}}).url
  }
}
