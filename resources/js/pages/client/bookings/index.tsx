import { Head, Link, router, usePoll } from '@inertiajs/react';
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Search,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import client from '@/routes/client';

type Booking = {
  id: string;
  reference: string;
  provider: string;
  provider_slug: string | null;
  address: string | null;
  city: string | null;
  service: string;
  date: string | null;
  time: string | null;
  duration: number;
  amount: number;
  status: string;
  note: string | null;
  can_cancel: boolean;
};
type Paginator = {
  data: Booking[];
  links: { url: string | null; label: string; active: boolean }[];
  total: number;
};
type Tab = 'upcoming' | 'past' | 'cancelled';

const tabs: { label: string; value: Tab }[] = [
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Past', value: 'past' },
  { label: 'Cancelled', value: 'cancelled' },
];
function currency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
function Status({ status }: { status: string }) {
  const Icon =
    status === 'cancelled'
      ? XCircle
      : status === 'completed'
        ? CheckCircle2
        : Clock3;
  const tone =
    status === 'cancelled'
      ? 'bg-[#f2e8eb] text-[#96546a]'
      : status === 'completed'
        ? 'bg-[#d9f7e8] text-[#0f6b4d]'
        : status === 'pending'
          ? 'bg-[#ffead9] text-[#a55c2d]'
          : 'bg-[#e6e1ff] text-[#594e9e]';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${tone}`}
    >
      <Icon className="size-3.5" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function BookingIndex({
  bookings,
  stats,
  filters,
}: {
  bookings: Paginator;
  stats: { upcoming: number; completed: number; cancelled: number };
  filters: { tab: Tab };
}) {
  usePoll(10000, { only: ['bookings', 'stats'] });
  const setTab = (tab: Tab) =>
    router.visit(
      client.booking.index({ query: tab === 'upcoming' ? {} : { tab } }),
      {
        preserveScroll: true,
        preserveState: true,
        replace: true,
        only: ['bookings', 'stats', 'filters'],
      },
    );

  return (
    <>
      <Head title="My bookings" />
      <main className="min-h-[calc(100vh-3rem)] bg-[#f6faf8] px-4 py-6 text-[#17343c] sm:px-6 lg:px-8 lg:py-8 dark:bg-[#101917] dark:text-[#e6f1ed]">
        <div className="mx-auto max-w-7xl space-y-6 lg:space-y-8">
          <section className="flex flex-col gap-5 rounded-3xl bg-[#17343c] px-6 py-8 text-white shadow-[0_20px_55px_rgba(23,52,60,0.14)] sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10">
            <div>
              <p className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-[#8fe0bb] uppercase">
                <CalendarDays className="size-4" />
                Your appointments
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                My bookings
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#b8c9c7] sm:text-base">
                Everything you have requested, confirmed, completed, or
                cancelled.
              </p>
            </div>
            <Button
              asChild
              className="rounded-xl bg-[#8fe0bb] text-[#17343c] hover:bg-[#b9f1d3]"
            >
              <Link href={client.providers.index()}>
                <Search className="size-4" />
                Find a provider
              </Link>
            </Button>
          </section>
          <section className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Upcoming', value: stats.upcoming },
              { label: 'Completed', value: stats.completed },
              { label: 'Cancelled', value: stats.cancelled },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]"
              >
                <p className="text-sm text-[#70908a] dark:text-[#9cb8b1]">
                  {item.label}
                </p>
                <p className="mt-1 text-3xl font-bold text-[#17343c] dark:text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </section>
          <section className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] sm:p-6 dark:border-white/10 dark:bg-[#17221f]">
            <div className="flex flex-wrap gap-2 border-b border-[#e7f0ec] pb-4 dark:border-white/8">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setTab(tab.value)}
                  className={`rounded-xl px-4 py-2 text-sm font-bold transition ${filters.tab === tab.value ? 'bg-[#17343c] text-white' : 'text-[#70908a] hover:bg-[#f4fbf7] dark:text-[#b6ccc5] dark:hover:bg-[#0f8a62]/10'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {bookings.data.map((booking) => (
                <Link
                  key={booking.id}
                  href={client.booking.show(booking.id)}
                  className="group rounded-2xl border border-[#e7f0ec] p-5 transition hover:border-[#b9dccc] hover:shadow-[0_8px_25px_rgba(23,52,60,0.05)] dark:border-white/8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-bold text-[#17343c] dark:text-white">
                        {booking.service}
                      </p>
                      <p className="mt-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
                        {booking.provider}
                      </p>
                    </div>
                    <Status status={booking.status} />
                  </div>
                  <div className="mt-5 grid gap-3 text-sm text-[#41645a] sm:grid-cols-2 dark:text-[#c4d8d1]">
                    <span className="flex items-center gap-2">
                      <CalendarDays className="size-4 text-[#0f8a62]" />
                      {booking.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock3 className="size-4 text-[#0f8a62]" />
                      {booking.time} · {booking.duration} min
                    </span>
                    {(booking.address || booking.city) && (
                      <span className="flex items-center gap-2 sm:col-span-2">
                        <MapPin className="size-4 text-[#0f8a62]" />
                        {booking.address || booking.city}
                      </span>
                    )}
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-[#e7f0ec] pt-4 text-sm dark:border-white/8">
                    <span className="text-[#91aaa2]">{booking.reference}</span>
                    <span className="font-bold text-[#17343c] group-hover:text-[#0f8a62] dark:text-white">
                      {currency(booking.amount)} · View details
                    </span>
                  </div>
                </Link>
              ))}
              {bookings.data.length === 0 && (
                <div className="rounded-2xl border border-dashed border-[#b9dccc] p-12 text-center lg:col-span-2">
                  <CalendarDays className="mx-auto size-8 text-[#0f8a62]" />
                  <p className="mt-3 font-bold text-[#17343c] dark:text-white">
                    Nothing here yet
                  </p>
                  <p className="mt-1 text-sm text-[#70908a]">
                    Browse providers to make your next appointment.
                  </p>
                  <Button asChild className="mt-5 rounded-xl">
                    <Link href={client.providers.index()}>
                      Browse providers
                    </Link>
                  </Button>
                </div>
              )}
            </div>
            {bookings.links.length > 3 && (
              <nav
                className="mt-6 flex flex-wrap justify-center gap-2"
                aria-label="Booking pages"
              >
                {bookings.links.map((link) =>
                  link.url ? (
                    <Link
                      key={link.label}
                      href={link.url}
                      className={`rounded-lg px-3 py-2 text-sm ${link.active ? 'bg-[#17343c] text-white' : 'border border-[#dceae4] text-[#41645a] dark:border-white/10 dark:text-[#c4d8d1]'}`}
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  ) : (
                    <span
                      key={link.label}
                      className="px-3 py-2 text-sm text-[#91aaa2]"
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  ),
                )}
              </nav>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
