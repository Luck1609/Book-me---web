import { Head, Link } from '@inertiajs/react';
import {
  CheckCircle2,
  ChevronDown,
  Star,
  TrendingUp,
} from 'lucide-react';
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item';
import settings from '@/routes/settings';
import { reviewLayoutProps, ReviewPagesEnum } from '.';

const services = [
  ['Signature facial', 42, 4.98, '+0.2', '1'],
  ['Deep tissue massage', 31, 4.94, '+0.1', '2'],
  ['Glow treatment', 28, 4.86, '+0.4', '3'],
  ['Classic manicure', 27, 4.81, '—', '4'],
] as const;

const months = [
  ['Apr', 4.6],
  ['May', 4.8],
  ['Jun', 4.7],
  ['Jul', 4.9],
  ['Aug', 4.9],
  ['Sep', 4.9],
] as const;

export default function ReviewBreakdown() {
  return (
    <>
      <Head title="Rating breakdown" />
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
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[#dceae4] px-4 text-sm font-medium text-[#17343c] hover:bg-[#f3f8f5] dark:border-white/10 dark:text-white dark:hover:bg-white/5"
          >
            <ChevronDown aria-hidden="true" className="size-4" /> Last 6 months
          </button>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-2xl border border-[#dceae4] bg-white p-6 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
            <div className="flex items-center gap-5">
              <div className="flex size-24 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#fff4d9] text-[#c38518]">
                <span className="text-3xl font-bold">4.9</span>
                <Star aria-hidden="true" className="size-4 fill-current" />
              </div>
              <div>
                <p className="text-base font-bold text-[#17343c] dark:text-white">
                  Excellent client satisfaction
                </p>
                <p className="mt-1 text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
                  You are in the top 10% of providers on Book Me.
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#0f8a62] dark:text-[#8fe0bb]">
                  <TrendingUp aria-hidden="true" className="size-4" /> 0.3
                  points this year
                </div>
              </div>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-4 border-t border-[#e7f0ec] pt-5 dark:border-white/8">
              <div>
                <p className="text-xs text-[#70908a] dark:text-[#9cb8b1]">
                  Total reviews
                </p>
                <p className="mt-1 text-xl font-bold text-[#17343c] dark:text-white">
                  128
                </p>
              </div>
              <div>
                <p className="text-xs text-[#70908a] dark:text-[#9cb8b1]">
                  5-star reviews
                </p>
                <p className="mt-1 text-xl font-bold text-[#17343c] dark:text-white">
                  77%
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#dceae4] bg-white p-6 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
            <h2 className="text-base font-bold text-[#17343c] dark:text-white">
              Rating over time
            </h2>
            <p className="mt-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
              Your average rating has stayed strong.
            </p>
            <div className="mt-6 flex h-32 items-end gap-3">
              {months.map(([month, rating]) => (
                <div
                  key={month}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <span className="text-[10px] font-semibold text-[#70908a]">
                    {rating}
                  </span>
                  <div
                    className="w-full rounded-t-lg bg-[#a8e4c6] dark:bg-[#0f8a62]/55"
                    style={{ height: `${rating * 18}%` }}
                  />
                  <span className="text-[10px] text-[#8ca49d]">{month}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-[#dceae4] bg-white shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
          <div className="border-b border-[#e7f0ec] px-5 py-5 sm:px-6 dark:border-white/8">
            <h2 className="text-base font-bold text-[#17343c] dark:text-white">
              Rating by service
            </h2>
            <p className="mt-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
              See which services are creating your strongest client experiences.
            </p>
          </div>
          <div className="divide-y divide-[#e7f0ec] dark:divide-white/8">
            {services.map(([name, reviewCount, rating, change, id], index) => (
              <Link href={settings.review.show(id)} className="bg-rose-400" key={index.toString()}>
                <Item>
                  {/* <ItemMedia variant="icon">
                  <HomeIcon />
                </ItemMedia> */}
                  <ItemContent className="">
                    <ItemTitle>{name}</ItemTitle>
                    <ItemDescription >{reviewCount} client reviews</ItemDescription>
                  </ItemContent>

                  <ItemActions>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-sm font-bold text-[#17343c] dark:text-white">
                        {rating.toFixed(2)}{' '}
                        <Star
                          aria-hidden="true"
                          className="size-3.5 fill-[#f0b75a] text-[#f0b75a]"
                        />
                      </span>
                      <span className="inline-flex min-w-14 items-center justify-center gap-1 rounded-full bg-[#e9f8f0] px-2 py-1 text-xs font-semibold text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
                        <TrendingUp aria-hidden="true" className="size-3" />{' '}
                        {change}
                      </span>
                    </div>
                  </ItemActions>
                </Item>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#b9dfcc] bg-[#f6faf8] p-5 dark:border-[#286c51] dark:bg-[#101917]">
          <div className="flex gap-3">
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-[#0f8a62] dark:text-[#8fe0bb]"
            />
            <div>
              <h2 className="text-sm font-bold text-[#17343c] dark:text-white">
                Keep the momentum going
              </h2>
              <p className="mt-1 text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
                Your clients value a thoughtful experience. Keep asking for
                feedback after appointments to learn what matters most.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}


ReviewBreakdown.layout = {
  ...reviewLayoutProps,
  backOptions: {
    label: 'Back to reviews overview',
    url: settings.review.index({query: {target: ReviewPagesEnum.Overview}}).url
  }
}
