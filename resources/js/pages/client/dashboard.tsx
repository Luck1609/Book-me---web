import { Head, Link, usePoll } from '@inertiajs/react';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Search,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import client from '@/routes/client';
import type { User } from '@/types';

type Booking = {
  id: string;
  provider: string;
  provider_slug: string | null;
  city: string | null;
  service: string;
  date: string | null;
  time: string | null;
  status: string;
  amount: number;
};

type Provider = {
  id: string;
  slug: string;
  business_name: string;
  description: string | null;
  city: string | null;
  avatar: string | null;
  services: { id: string; name: string; price: number }[];
};

type PageProps = {
  user: User;
  upcomingBooking: Booking | null;
  recentBookings: Booking[];
  providers: Provider[];
  stats: { upcoming: number; completed: number; savedProviders: number };
};

function currency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function statusLabel(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function Dashboard({
  user,
  upcomingBooking,
  recentBookings,
  providers,
  stats,
}: PageProps) {
  usePoll(10000, { only: ['upcomingBooking', 'recentBookings', 'stats'] });
  const firstName = user.name.split(' ')[0] || 'there';

  return (
    <>
      <Head title="Client dashboard" />
      <main className="min-h-[calc(100vh-3rem)] bg-[#f6faf8] px-4 py-6 text-[#17343c] sm:px-6 lg:px-8 lg:py-8 dark:bg-[#101917] dark:text-[#e6f1ed]">
        <div className="mx-auto max-w-7xl space-y-6 lg:space-y-8">
          <section className="relative overflow-hidden rounded-3xl bg-[#17343c] px-6 py-8 text-white shadow-[0_20px_55px_rgba(23,52,60,0.14)] sm:px-8 lg:px-10 lg:py-10">
            <div className="pointer-events-none absolute -top-24 right-0 size-72 rounded-full bg-[#0f8a62]/30 blur-3xl" />
            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-[#8fe0bb] uppercase">
                  <Sparkles aria-hidden="true" className="size-4" />
                  Your booking space
                </p>
                <h1 className="max-w-xl text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
                  Welcome back, {firstName}.
                  <span className="block text-[#a9c3c0]">
                    Find time for yourself.
                  </span>
                </h1>
                <p className="mt-4 max-w-lg text-sm leading-6 text-[#b8c9c7] sm:text-base">
                  Discover trusted providers, reserve a time that works, and
                  keep every appointment in one place.
                </p>
              </div>
              <Button
                asChild
                className="w-full rounded-xl bg-[#8fe0bb] text-[#17343c] hover:bg-[#b9f1d3] sm:w-auto"
              >
                <Link href={client.providers.index()}>
                  <Search aria-hidden="true" className="size-4" />
                  Find a provider
                </Link>
              </Button>
            </div>
          </section>

          <section
            aria-label="Your booking summary"
            className="grid gap-4 sm:grid-cols-3"
          >
            {[
              {
                label: 'Upcoming',
                value: stats.upcoming,
                icon: CalendarDays,
                tone: 'bg-[#d9f7e8] text-[#0f6b4d]',
              },
              {
                label: 'Completed',
                value: stats.completed,
                icon: CheckCircle2,
                tone: 'bg-[#e6e1ff] text-[#594e9e]',
              },
              {
                label: 'Saved providers',
                value: stats.savedProviders,
                icon: Sparkles,
                tone: 'bg-[#ffead9] text-[#a55c2d]',
              },
            ].map(({ label, value, icon: Icon, tone }) => (
              <div
                key={label}
                className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]"
              >
                <span
                  className={`flex size-10 items-center justify-center rounded-xl ${tone}`}
                >
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <p className="mt-5 text-sm text-[#70908a] dark:text-[#9cb8b1]">
                  {label}
                </p>
                <p className="mt-1 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
                  {value}
                </p>
              </div>
            ))}
          </section>

          <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
            <section className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] sm:p-6 dark:border-white/10 dark:bg-[#17221f]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                    Next appointment
                  </p>
                  <h2 className="mt-1 text-xl font-bold tracking-tight text-[#17343c] dark:text-white">
                    Your next reset
                  </h2>
                </div>
                <Clock3 aria-hidden="true" className="size-6 text-[#0f8a62]" />
              </div>
              {upcomingBooking ? (
                <div className="mt-6 rounded-2xl bg-[#f4fbf7] p-5 dark:bg-[#0f8a62]/10">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-bold text-[#17343c] dark:text-white">
                        {upcomingBooking.provider}
                      </p>
                      <p className="mt-1 text-sm text-[#70908a] dark:text-[#b6ccc5]">
                        {upcomingBooking.service}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#d9f7e8] px-3 py-1 text-xs font-bold text-[#0f6b4d] dark:bg-[#0f8a62]/20 dark:text-[#8fe0bb]">
                      {statusLabel(upcomingBooking.status)}
                    </span>
                  </div>
                  <div className="mt-5 grid gap-3 text-sm text-[#41645a] sm:grid-cols-2 dark:text-[#c4d8d1]">
                    <span className="flex items-center gap-2">
                      <CalendarDays className="size-4 text-[#0f8a62]" />
                      {upcomingBooking.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock3 className="size-4 text-[#0f8a62]" />
                      {upcomingBooking.time}
                    </span>
                    {upcomingBooking.city && (
                      <span className="flex items-center gap-2 sm:col-span-2">
                        <MapPin className="size-4 text-[#0f8a62]" />
                        {upcomingBooking.city}
                      </span>
                    )}
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-5 rounded-xl border-[#b9dccc] text-[#0f6b4d] dark:text-[#8fe0bb]"
                  >
                    <Link href={client.booking.show(upcomingBooking.id)}>
                      View appointment <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-dashed border-[#b9dccc] bg-[#f8fcfa] p-8 text-center dark:border-[#386653] dark:bg-[#14201c]">
                  <CalendarDays className="mx-auto size-8 text-[#0f8a62]" />
                  <p className="mt-3 font-bold text-[#17343c] dark:text-white">
                    No upcoming appointment
                  </p>
                  <p className="mt-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
                    Pick a provider and make your next visit yours.
                  </p>
                  <Button asChild className="mt-5 rounded-xl">
                    <Link href={client.providers.index()}>
                      Browse providers
                    </Link>
                  </Button>
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] sm:p-6 dark:border-white/10 dark:bg-[#17221f]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                    Explore
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-[#17343c] dark:text-white">
                    Providers near you
                  </h2>
                </div>
                <Link
                  href={client.providers.index()}
                  className="text-sm font-bold text-[#0f8a62]"
                >
                  See all
                </Link>
              </div>
              <div className="mt-5 space-y-3">
                {providers.slice(0, 3).map((provider) => (
                  <Link
                    key={provider.id}
                    href={client.providers.show(provider.slug)}
                    className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-[#f4fbf7] dark:hover:bg-[#0f8a62]/10"
                  >
                    {provider.avatar ? (
                      <img
                        src={provider.avatar}
                        alt=""
                        className="size-12 rounded-xl object-cover"
                      />
                    ) : (
                      <span className="flex size-12 items-center justify-center rounded-xl bg-[#e6e1ff] text-sm font-bold text-[#594e9e]">
                        {initials(provider.business_name)}
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-bold text-[#17343c] dark:text-white">
                        {provider.business_name}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-[#70908a] dark:text-[#9cb8b1]">
                        {provider.city || 'Local provider'} ·{' '}
                        {provider.services.length} services
                      </span>
                    </span>
                    <ArrowRight className="size-4 text-[#91aaa2]" />
                  </Link>
                ))}
                {providers.length === 0 && (
                  <p className="py-8 text-center text-sm text-[#70908a]">
                    No providers are available yet.
                  </p>
                )}
              </div>
            </section>
          </div>

          <section className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] sm:p-6 dark:border-white/10 dark:bg-[#17221f]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                  Recent activity
                </p>
                <h2 className="mt-1 text-xl font-bold text-[#17343c] dark:text-white">
                  Your booking history
                </h2>
              </div>
              <Link
                href={client.booking.index()}
                className="text-sm font-bold text-[#0f8a62]"
              >
                View all
              </Link>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {recentBookings.map((booking) => (
                <Link
                  key={booking.id}
                  href={client.booking.show(booking.id)}
                  className="flex items-center gap-4 rounded-xl border border-[#e7f0ec] p-4 transition hover:border-[#b9dccc] dark:border-white/8"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-[#f3f0ff] text-[#685bb4]">
                    <CalendarDays className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-bold text-[#17343c] dark:text-white">
                      {booking.service}
                    </span>
                    <span className="mt-1 block text-xs text-[#70908a] dark:text-[#9cb8b1]">
                      {booking.provider} · {booking.date} at {booking.time}
                    </span>
                  </span>
                  <span className="text-sm font-bold text-[#41645a] dark:text-[#c4d8d1]">
                    {currency(booking.amount)}
                  </span>
                </Link>
              ))}
              {recentBookings.length === 0 && (
                <p className="py-8 text-center text-sm text-[#70908a] md:col-span-2">
                  Your completed and requested bookings will show up here.
                </p>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
