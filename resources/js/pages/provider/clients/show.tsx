import { Head, Link } from '@inertiajs/react';
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarCheck2,
  CalendarDays,
  ChevronRight,
  Edit3,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Phone,
  Plus,
  Scissors,
  Star,
  Tag,
  UserRound,
} from 'lucide-react';
import booking from '@/routes/booking';
import client from '@/routes/client';

type ClientDetails = {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  memberSince: string;
  visits: number;
  totalSpend: string;
  averageSpend: string;
  lastVisit: string;
  nextBooking: string;
  preferredService: string;
  notes: string;
};

type ClientShowProps = {
  client?: ClientDetails;
};

type Visit = {
  id: string;
  date: string;
  service: string;
  duration: string;
  amount: string;
  status: 'Completed' | 'Upcoming';
};

const sampleClient: ClientDetails = {
  id: 'client-001',
  name: 'Julian Sterling',
  initials: 'JS',
  email: 'julian.sterling@example.com',
  phone: '+1 (212) 555-0148',
  memberSince: 'March 2024',
  visits: 24,
  totalSpend: '$1,420.00',
  averageSpend: '$59.17',
  lastVisit: '12 August 2026',
  nextBooking: '28 August 2026 · 10:30 AM',
  preferredService: 'Signature Fade & Lineup',
  notes:
    'Prefers a low fade with a natural finish. Always allow a few extra minutes for the consultation; Julian likes to talk through the shape before we start.',
};

const visits: Visit[] = [
  {
    id: 'BK-240824',
    date: '12 Aug 2026',
    service: 'Signature Fade & Lineup',
    duration: '45 min',
    amount: '$65.00',
    status: 'Completed',
  },
  {
    id: 'BK-240712',
    date: '18 Jul 2026',
    service: 'Beard Sculpting & Oil Treatment',
    duration: '60 min',
    amount: '$70.00',
    status: 'Completed',
  },
  {
    id: 'BK-240603',
    date: '21 Jun 2026',
    service: 'Signature Fade & Lineup',
    duration: '45 min',
    amount: '$65.00',
    status: 'Completed',
  },
  {
    id: 'BK-240828',
    date: '28 Aug 2026',
    service: 'Signature Fade & Lineup',
    duration: '45 min',
    amount: '$65.00',
    status: 'Upcoming',
  },
];

function InfoItem({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Mail;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#edf7f2] text-[#0f8a62] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
        <Icon aria-hidden="true" className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold tracking-[0.14em] text-[#91aaa2] uppercase">
          {label}
        </p>
        <p className="mt-1 truncate text-sm font-semibold text-[#17343c] dark:text-white">
          {children}
        </p>
      </div>
    </div>
  );
}

export default function ClientShow({
  client: providedClient,
}: ClientShowProps) {
  const currentClient = providedClient ?? sampleClient;

  return (
    <>
      <Head title={`${currentClient.name} · Client profile`} />

      <main className="min-h-[calc(100vh-3rem)] bg-[#f6faf8] px-4 py-6 text-[#17343c] sm:px-6 lg:px-8 lg:py-8 dark:bg-[#101917] dark:text-[#e6f1ed]">
        <div className="mx-auto max-w-7xl space-y-6 lg:space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href={client.index.url()}
              className="group inline-flex items-center gap-2 text-sm font-bold text-[#70908a] transition hover:text-[#0f8a62] dark:text-[#9cb8b1] dark:hover:text-[#8fe0bb]"
            >
              <span className="flex size-9 items-center justify-center rounded-xl border border-[#dceae4] bg-white transition group-hover:-translate-x-0.5 group-hover:border-[#b9d5ca] dark:border-white/10 dark:bg-[#17221f]">
                <ArrowLeft aria-hidden="true" className="size-4" />
              </span>
              Back to clients
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-[#dceae4] bg-white px-3.5 py-2.5 text-sm font-bold text-[#41645a] transition hover:bg-[#f4fbf7] dark:border-white/10 dark:bg-[#17221f] dark:text-[#c4d8d1] dark:hover:bg-white/8"
              >
                <Edit3 aria-hidden="true" className="size-4" />
                Edit profile
              </button>
              <button
                type="button"
                aria-label="More client actions"
                className="flex size-10 items-center justify-center rounded-xl border border-[#dceae4] bg-white text-[#70908a] transition hover:bg-[#f4fbf7] dark:border-white/10 dark:bg-[#17221f] dark:text-[#9cb8b1] dark:hover:bg-white/8"
              >
                <MoreHorizontal aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section className="relative isolate overflow-hidden rounded-3xl bg-[#17343c] px-6 py-7 text-white shadow-[0_20px_55px_rgba(23,52,60,0.14)] sm:px-8 lg:px-10 lg:py-9">
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute -top-28 right-0 size-80 rounded-full bg-[#0f8a62]/35 blur-3xl" />
              <div className="absolute -bottom-44 left-1/3 size-96 rounded-full bg-[#806edc]/20 blur-3xl" />
            </div>
            <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-[#d9f7e8] text-xl font-bold text-[#0f6b4d]">
                  {currentClient.initials}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-xs font-bold tracking-[0.16em] text-[#8fe0bb] uppercase">
                      Client profile
                    </p>
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold text-[#b8c9c7]">
                      Regular client
                    </span>
                  </div>
                  <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                    {currentClient.name}
                  </h1>
                  <p className="mt-2 text-sm text-[#b8c9c7]">
                    Client since {currentClient.memberSince} ·{' '}
                    {currentClient.visits} visits together
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0f8a62] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#0f8a62]/20 transition hover:bg-[#0d7955]"
                >
                  <Plus aria-hidden="true" className="size-4" />
                  New booking
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  <MessageCircle aria-hidden="true" className="size-4" />
                  Message
                </button>
              </div>
            </div>
          </section>

          <section
            aria-label="Client summary"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <p className="text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
                Total visits
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
                {currentClient.visits}
              </p>
              <p className="mt-1 text-xs text-[#0f8a62] dark:text-[#8fe0bb]">
                A loyal relationship
              </p>
            </div>
            <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <p className="text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
                Total spend
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
                {currentClient.totalSpend}
              </p>
              <p className="mt-1 text-xs text-[#91aaa2]">
                {currentClient.averageSpend} average visit
              </p>
            </div>
            <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <p className="text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
                Last visit
              </p>
              <p className="mt-2 text-xl font-bold tracking-tight text-[#17343c] dark:text-white">
                {currentClient.lastVisit}
              </p>
              <p className="mt-1 text-xs text-[#91aaa2]">
                Right on their usual rhythm
              </p>
            </div>
            <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <p className="text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
                Next booking
              </p>
              <p className="mt-2 text-xl font-bold tracking-tight text-[#17343c] dark:text-white">
                28 Aug
              </p>
              <p className="mt-1 text-xs font-semibold text-[#0f8a62] dark:text-[#8fe0bb]">
                10:30 AM · Confirmed
              </p>
            </div>
          </section>

          <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.85fr)]">
            <div className="space-y-6">
              <section className="overflow-hidden rounded-2xl border border-[#dceae4] bg-white shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
                <div className="flex items-center justify-between border-b border-[#e7f0ec] px-5 py-5 sm:px-6 dark:border-white/8">
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                      Visit history
                    </p>
                    <h2 className="mt-1 text-lg font-bold tracking-tight text-[#17343c] dark:text-white">
                      A record of great work
                    </h2>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0f8a62] dark:text-[#8fe0bb]"
                  >
                    View all
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </button>
                </div>
                <div className="divide-y divide-[#e7f0ec] dark:divide-white/8">
                  {visits.map((visit) => (
                    <Link
                      key={visit.id}
                      href={booking.show.url(visit.id)}
                      className="group flex items-center gap-4 px-5 py-4 transition hover:bg-[#f8fcfa] sm:px-6 dark:hover:bg-white/4"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#edf7f2] text-[#0f8a62] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
                        <Scissors aria-hidden="true" className="size-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="truncate text-sm font-bold text-[#17343c] dark:text-white">
                            {visit.service}
                          </p>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${visit.status === 'Upcoming' ? 'bg-[#e6e1ff] text-[#594e9e] dark:bg-[#806edc]/15 dark:text-[#c0b8ec]' : 'bg-[#edf4f0] text-[#5d8073] dark:bg-[#5d8073]/15 dark:text-[#a9c9bd]'}`}
                          >
                            {visit.status}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-[#91aaa2]">
                          {visit.date} · {visit.duration} · {visit.id}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-[#17343c] dark:text-white">
                        {visit.amount}
                      </p>
                      <ChevronRight
                        aria-hidden="true"
                        className="size-4 text-[#b0c3bc] transition group-hover:translate-x-0.5 group-hover:text-[#0f8a62]"
                      />
                    </Link>
                  ))}
                </div>
              </section>
              <section className="rounded-2xl border border-[#dceae4] bg-[#fffaf5] p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] sm:p-6 dark:border-[#6c503c]/40 dark:bg-[#251f1a]">
                <div className="flex items-center gap-2">
                  <Tag aria-hidden="true" className="size-5 text-[#a55c2d]" />
                  <h2 className="text-base font-bold text-[#17343c] dark:text-white">
                    Provider notes
                  </h2>
                </div>
                <p className="mt-4 text-sm leading-6 text-[#5d706a] dark:text-[#c5b7a9]">
                  {currentClient.notes}
                </p>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#a55c2d]"
                >
                  Edit note
                  <Edit3 aria-hidden="true" className="size-3.5" />
                </button>
              </section>
            </div>
            <aside className="space-y-6">
              <section className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                      Contact details
                    </p>
                    <h2 className="mt-1 text-lg font-bold tracking-tight text-[#17343c] dark:text-white">
                      Stay connected
                    </h2>
                  </div>
                  <UserRound
                    aria-hidden="true"
                    className="size-6 text-[#2d6980] dark:text-[#8ac5d7]"
                  />
                </div>
                <div className="mt-5 space-y-4">
                  <a
                    href={`mailto:${currentClient.email}`}
                    className="block transition hover:opacity-80"
                  >
                    <InfoItem icon={Mail} label="Email">
                      {currentClient.email}
                    </InfoItem>
                  </a>
                  <a
                    href={`tel:${currentClient.phone}`}
                    className="block transition hover:opacity-80"
                  >
                    <InfoItem icon={Phone} label="Phone">
                      {currentClient.phone}
                    </InfoItem>
                  </a>
                </div>
                <button
                  type="button"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#dceae4] py-3 text-sm font-bold text-[#0f8a62] transition hover:bg-[#f4fbf7] dark:border-white/10 dark:text-[#8fe0bb] dark:hover:bg-white/8"
                >
                  <MessageCircle aria-hidden="true" className="size-4" />
                  Send a message
                </button>
              </section>
              <section className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#e6e1ff] text-[#594e9e] dark:bg-[#806edc]/15 dark:text-[#c0b8ec]">
                    <Star aria-hidden="true" className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                      Preferences
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#17343c] dark:text-white">
                      {currentClient.preferredService}
                    </p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#f8fcfa] p-3 dark:bg-white/5">
                    <p className="text-[10px] font-bold text-[#91aaa2] uppercase">
                      Frequency
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#17343c] dark:text-white">
                      Every 3–4 weeks
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#f8fcfa] p-3 dark:bg-white/5">
                    <p className="text-[10px] font-bold text-[#91aaa2] uppercase">
                      Satisfaction
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#17343c] dark:text-white">
                      5.0 / 5
                    </p>
                  </div>
                </div>
              </section>
              <section className="rounded-2xl bg-[#0f8a62] p-5 text-white shadow-[0_16px_35px_rgba(15,138,98,0.18)]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-[#b8efd5] uppercase">
                      Next visit
                    </p>
                    <h2 className="mt-1 text-lg font-bold">
                      {currentClient.nextBooking}
                    </h2>
                  </div>
                  <CalendarCheck2
                    aria-hidden="true"
                    className="size-6 text-[#b8efd5]"
                  />
                </div>
                <p className="mt-4 text-sm leading-6 text-[#d1f5e4]">
                  {currentClient.preferredService} is already on the calendar.
                  Everything looks ready.
                </p>
                <button
                  type="button"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-[#0f6b4d] transition hover:bg-[#effcf5]"
                >
                  <CalendarDays aria-hidden="true" className="size-4" />
                  Open booking
                </button>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
