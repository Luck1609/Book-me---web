import { Head, Link, router } from '@inertiajs/react';
import {
  ArrowDownUp,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Filter,
  Search,
  Sparkles,
  Users,
  XCircle,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { OpenBookingForm } from '@/components/form/components/booking-form';
import type { BookingService } from '@/components/form/components/booking-form';
import booking from '@/routes/booking';

type BookingStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';

type BookingRecord = {
  id: string;
  reference: string;
  client: string;
  initials: string;
  clientMeta: string;
  service: string;
  date: string;
  time: string;
  duration: string;
  amount: string;
  status: BookingStatus;
};

type BookingPaginator = {
  data: BookingRecord[];
  current_page: number;
  last_page: number;
  from: number | null;
  to: number | null;
  total: number;
  links: { url: string | null; label: string; active: boolean }[];
};

type BookingPageProps = {
  bookings: BookingPaginator;
  services: BookingService[];
  stats: {
    total: number;
    confirmed: number;
    pending: number;
    completed_this_month: number;
  };
  filters: {
    search: string;
    status: 'all' | BookingStatus;
    service: string;
    sort: 'newest' | 'oldest';
  };
};

const statusTabs: { label: string; value: 'all' | BookingStatus }[] = [
  { label: 'All bookings', value: 'all' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Pending', value: 'pending' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
];

function statusTone(status: BookingStatus): string {
  if (status === 'pending') {
    return 'bg-[#ffead9] text-[#a55c2d]';
  }

  if (status === 'completed') {
    return 'bg-[#d9f7e8] text-[#0f6b4d]';
  }

  if (status === 'cancelled') {
    return 'bg-[#f2e8eb] text-[#96546a]';
  }

  return 'bg-[#e6e1ff] text-[#594e9e]';
}

function statusDetails(status: BookingStatus): {
  label: string;
  className: string;
  icon: typeof CheckCircle2;
} {
  if (status === 'pending') {
    return {
      label: 'Needs review',
      className:
        'bg-[#fff4eb] text-[#a55c2d] dark:bg-[#a55c2d]/15 dark:text-[#f0b58b]',
      icon: Clock3,
    };
  }

  if (status === 'completed') {
    return {
      label: 'Completed',
      className:
        'bg-[#edf4f0] text-[#5d8073] dark:bg-[#5d8073]/15 dark:text-[#a9c9bd]',
      icon: CheckCircle2,
    };
  }

  if (status === 'cancelled') {
    return {
      label: 'Cancelled',
      className:
        'bg-[#f8edf0] text-[#96546a] dark:bg-[#96546a]/15 dark:text-[#dea8b8]',
      icon: XCircle,
    };
  }

  return {
    label: 'Confirmed',
    className:
      'bg-[#e9f8f0] text-[#0f8a62] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]',
    icon: CheckCircle2,
  };
}

function BookingStatus({ status }: { status: BookingStatus }) {
  const details = statusDetails(status);
  const Icon = details.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${details.className}`}
    >
      <Icon aria-hidden="true" className="size-3.5" />
      {details.label}
    </span>
  );
}

export default function BookingIndex({
  bookings,
  services,
  stats,
  filters,
}: BookingPageProps) {
  const [activeStatus, setActiveStatus] = useState<'all' | BookingStatus>(
    filters.status,
  );
  const [search, setSearch] = useState(filters.search);
  const [selectedService, setSelectedService] = useState(filters.service);
  const [sort, setSort] = useState<'newest' | 'oldest'>(filters.sort);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;

      return;
    }

    const timeout = window.setTimeout(() => {
      const query: Record<string, string> = {};

      if (search.trim() !== '') {
        query.search = search.trim();
      }

      if (activeStatus !== 'all') {
        query.status = activeStatus;
      }

      if (selectedService !== '') {
        query.service = selectedService;
      }

      if (sort !== 'newest') {
        query.sort = sort;
      }

      router.visit(booking.index({ query }), {
        preserveState: true,
        preserveScroll: true,
        replace: true,
        only: ['bookings', 'stats', 'filters'],
      });
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [activeStatus, search, selectedService, sort]);

  const goToPage = (url: string | null) => {
    if (url) {
      router.visit(url, { preserveState: true, preserveScroll: true });
    }
  };

  return (
    <>
      <Head title="Bookings" />

      <main className="min-h-[calc(100vh-3rem)] bg-[#f6faf8] px-4 py-6 text-[#17343c] sm:px-6 lg:px-8 lg:py-8 dark:bg-[#101917] dark:text-[#e6f1ed]">
        <div className="mx-auto max-w-7xl space-y-6 lg:space-y-8">
          <section className="flex flex-col gap-6 rounded-3xl bg-[#17343c] px-6 py-7 text-white shadow-[0_20px_55px_rgba(23,52,60,0.12)] sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:py-8">
            <div>
              <div className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-[#8fe0bb] uppercase">
                <CalendarDays aria-hidden="true" className="size-4" />
                Appointment workspace
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Bookings
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#b8c9c7] sm:text-base">
                Keep every client commitment clear, confirmed, and easy to act
                on.
              </p>
            </div>

            <OpenBookingForm services={services} />
          </section>

          <section
            aria-label="Booking summary"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#d9f7e8] text-[#0f6b4d]">
                  <CalendarDays aria-hidden="true" className="size-5" />
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 text-[#0f8a62]"
                />
              </div>
              <p className="mt-5 text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
                Total bookings
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
                {stats.total}
              </p>
              <p className="mt-1 text-xs text-[#91aaa2]">
                Across your current schedule
              </p>
            </div>
            <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#e6e1ff] text-[#594e9e]">
                  <CheckCircle2 aria-hidden="true" className="size-5" />
                </span>
                <span className="text-xs font-bold text-[#685bb4] dark:text-[#c0b8ec]">
                  Ready
                </span>
              </div>
              <p className="mt-5 text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
                Confirmed
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
                {stats.confirmed}
              </p>
              <p className="mt-1 text-xs text-[#91aaa2]">Clients are all set</p>
            </div>
            <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#ffead9] text-[#a55c2d]">
                  <Clock3 aria-hidden="true" className="size-5" />
                </span>
                <span className="rounded-full bg-[#fff4eb] px-2 py-1 text-[10px] font-bold text-[#a55c2d] dark:bg-[#a55c2d]/15 dark:text-[#f0b58b]">
                  Action needed
                </span>
              </div>
              <p className="mt-5 text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
                Pending requests
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
                {stats.pending}
              </p>
              <p className="mt-1 text-xs text-[#91aaa2]">
                Respond within 24 hours
              </p>
            </div>
            <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#dcecf5] text-[#2d6980]">
                  <Users aria-hidden="true" className="size-5" />
                </span>
                <Sparkles
                  aria-hidden="true"
                  className="size-4 text-[#2d6980]"
                />
              </div>
              <p className="mt-5 text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
                Completed this month
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
                {stats.completed_this_month}
              </p>
              <p className="mt-1 text-xs text-[#91aaa2]">
                A strong month so far
              </p>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-[#dceae4] bg-white shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
            <div className="flex flex-col gap-4 border-b border-[#e7f0ec] px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-6 dark:border-white/8">
              <div className="relative w-full lg:max-w-sm">
                <Search
                  aria-hidden="true"
                  className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#91aaa2]"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  type="search"
                  placeholder="Search bookings"
                  aria-label="Search bookings"
                  className="h-11 w-full rounded-xl border border-[#dceae4] bg-[#f8fcfa] pr-4 pl-11 text-sm transition outline-none placeholder:text-[#91aaa2] focus:border-[#76c9a5] focus:ring-4 focus:ring-[#e3f6ee] dark:border-white/10 dark:bg-white/5 dark:placeholder:text-[#719089] dark:focus:border-[#4fae88] dark:focus:ring-[#0f8a62]/15"
                />
              </div>
              <div className="flex [scrollbar-width:none] items-center gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
                {statusTabs.map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setActiveStatus(tab.value)}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${activeStatus === tab.value ? 'bg-[#17343c] text-white dark:bg-[#0f8a62]' : 'border border-[#dceae4] text-[#70908a] hover:bg-[#f4fbf7] dark:border-white/10 dark:text-[#9cb8b1] dark:hover:bg-white/8'}`}
                  >
                    {tab.label}
                    {tab.value === 'pending' && stats.pending > 0 && (
                      <span className="ml-1.5 rounded-full bg-[#ffead9] px-1.5 py-0.5 text-[10px] text-[#a55c2d]">
                        {stats.pending}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 border-b border-[#e7f0ec] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-white/8">
              <p className="text-sm text-[#70908a] dark:text-[#9cb8b1]">
                <span className="font-bold text-[#17343c] dark:text-white">
                  {bookings.data.length}
                </span>{' '}
                bookings shown
              </p>
              <div className="flex items-center gap-2">
                <label className="inline-flex items-center gap-2 rounded-lg border border-[#dceae4] px-3 py-2 text-xs font-bold text-[#70908a] transition hover:bg-[#f4fbf7] dark:border-white/10 dark:text-[#9cb8b1] dark:hover:bg-white/8">
                  <Filter aria-hidden="true" className="size-3.5" />
                  <span className="sr-only">Filter by service</span>
                  <select
                    value={selectedService}
                    onChange={(event) => setSelectedService(event.target.value)}
                    className="bg-transparent outline-none"
                    aria-label="Filter by service"
                  >
                    <option value="">All services</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setSort(sort === 'newest' ? 'oldest' : 'newest')
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-[#dceae4] px-3 py-2 text-xs font-bold text-[#70908a] transition hover:bg-[#f4fbf7] dark:border-white/10 dark:text-[#9cb8b1] dark:hover:bg-white/8"
                >
                  <ArrowDownUp aria-hidden="true" className="size-3.5" />
                  {sort === 'newest' ? 'Newest first' : 'Oldest first'}
                  <ChevronDown aria-hidden="true" className="size-3.5" />
                </button>
              </div>
            </div>

            <div className="hidden grid-cols-[1.4fr_1.5fr_1fr_0.7fr_0.8fr_24px] gap-4 bg-[#f8fcfa] px-6 py-3 text-[10px] font-bold tracking-[0.14em] text-[#91aaa2] uppercase lg:grid dark:bg-white/3">
              <span>Client</span>
              <span>Service</span>
              <span>Date &amp; time</span>
              <span>Status</span>
              <span className="text-right">Amount</span>
              <span />
            </div>

            <div className="divide-y divide-[#e7f0ec] dark:divide-white/8">
              {bookings.data.length > 0 ? (
                bookings.data.map((item) => (
                  <Link
                    key={item.id}
                    href={booking.show.url(item.id)}
                    prefetch
                    className="group relative grid items-center gap-4 px-5 py-5 transition hover:bg-[#f8fcfa] lg:grid-cols-[1.4fr_1.5fr_1fr_0.7fr_0.8fr_24px] lg:px-6 dark:hover:bg-white/4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={`flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${statusTone(item.status)}`}
                      >
                        {item.initials}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-[#17343c] dark:text-white">
                          {item.client}
                        </p>
                        <p className="mt-0.5 text-xs text-[#91aaa2]">
                          {item.clientMeta}
                        </p>
                      </div>
                    </div>
                    <div className="min-w-0 pl-[52px] lg:pl-0">
                      <p className="truncate text-sm font-semibold text-[#41645a] dark:text-[#c4d8d1]">
                        {item.service}
                      </p>
                      <p className="mt-0.5 text-xs text-[#91aaa2]">
                        {item.reference} · {item.duration}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 pl-[52px] text-sm text-[#41645a] lg:pl-0 dark:text-[#c4d8d1]">
                      <CalendarDays
                        aria-hidden="true"
                        className="size-4 text-[#91aaa2]"
                      />
                      <span>
                        <span className="font-semibold">{item.date}</span>
                        <span className="ml-1 text-xs text-[#91aaa2]">
                          · {item.time}
                        </span>
                      </span>
                    </div>
                    <div className="pl-[52px] lg:pl-0">
                      <BookingStatus status={item.status} />
                    </div>
                    <div className="flex items-center justify-between border-t border-[#edf3ef] pt-3 pl-[52px] lg:block lg:border-0 lg:pt-0 lg:pl-0 lg:text-right dark:border-white/8">
                      <span className="text-xs font-medium text-[#91aaa2] lg:hidden">
                        Booking total
                      </span>
                      <span className="text-sm font-bold text-[#17343c] dark:text-white">
                        {item.amount}
                      </span>
                    </div>
                    <ChevronRight
                      aria-hidden="true"
                      className="absolute right-5 size-4 text-[#b0c3bc] transition group-hover:translate-x-0.5 group-hover:text-[#0f8a62] lg:static"
                    />
                  </Link>
                ))
              ) : (
                <div className="px-6 py-16 text-center">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#edf7f2] text-[#0f8a62] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
                    <Search aria-hidden="true" className="size-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-[#17343c] dark:text-white">
                    No bookings found
                  </h3>
                  <p className="mt-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
                    Try adjusting your search or status filter.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-[#e7f0ec] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-white/8">
              <p className="text-xs text-[#91aaa2]">
                Showing {bookings.from ?? 0}–{bookings.to ?? 0} of{' '}
                {bookings.total} bookings
              </p>
              <div className="flex items-center gap-2">
                {bookings.links.map((link, index) => (
                  <button
                    key={`${link.label}-${index}`}
                    type="button"
                    disabled={!link.url || link.active}
                    onClick={() => goToPage(link.url)}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-bold ${link.active ? 'bg-[#17343c] text-white dark:bg-[#0f8a62]' : 'text-[#70908a] hover:bg-[#f4fbf7] dark:text-[#9cb8b1] dark:hover:bg-white/8'} disabled:cursor-default disabled:opacity-50`}
                  >
                    {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
