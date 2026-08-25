import { Head, usePage } from '@inertiajs/react';
import {
  ArrowUpRight,
  Bell,
  CalendarCheck2,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  MoreHorizontal,
  Plus,
  Share2,
  Sparkles,
  Users,
  WalletCards,
} from 'lucide-react';
import type { User } from '@/types';
import BookingForm, { OpenBookingForm } from '@/components/form/components/booking-form';
import { Button } from '@/components/ui/button';

type PageProps = {
  auth: {
    user: User;
  };
};

type Appointment = {
  client: string;
  service: string;
  time: string;
  duration: string;
  price: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  initials: string;
  tone: string;
};

const appointments: Appointment[] = [
  {
    client: 'Marcus Thorne',
    service: 'Signature Fade & Lineup',
    time: '09:00 AM',
    duration: '45 min',
    price: '$65.00',
    status: 'completed',
    initials: 'MT',
    tone: 'bg-[#d9f7e8] text-[#0f6b4d]',
  },
  {
    client: 'John Doe',
    service: 'Traditional Hot Towel Shave',
    time: '10:00 AM',
    duration: '60 min',
    price: '$85.00',
    status: 'in-progress',
    initials: 'JD',
    tone: 'bg-[#e6e1ff] text-[#594e9e]',
  },
  {
    client: 'Sarah Williams',
    service: 'Style Consultation & Trim',
    time: '11:30 AM',
    duration: '45 min',
    price: '$55.00',
    status: 'upcoming',
    initials: 'SW',
    tone: 'bg-[#ffead9] text-[#a55c2d]',
  },
  {
    client: 'Robert Chen',
    service: 'Beard Sculpting & Oil Treatment',
    time: '01:00 PM',
    duration: '60 min',
    price: '$70.00',
    status: 'upcoming',
    initials: 'RC',
    tone: 'bg-[#dcecf5] text-[#2d6980]',
  },
];

const weeklyRevenue = [
  { day: 'Mon', amount: '$420', value: 62 },
  { day: 'Tue', amount: '$610', value: 88 },
  { day: 'Wed', amount: '$480', value: 69 },
  { day: 'Thu', amount: '$720', value: 100 },
  { day: 'Fri', amount: '$540', value: 78 },
  { day: 'Sat', amount: '$390', value: 55 },
  { day: 'Sun', amount: '$0', value: 6 },
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function statusLabel(status: Appointment['status']): string {
  if (status === 'in-progress') {
    return 'In progress';
  }

  if (status === 'completed') {
    return 'Completed';
  }

  return 'Upcoming';
}

export default function Dashboard() {
  const { auth } = usePage<PageProps>().props;
  const firstName = auth.user.name.split(' ')[0] || 'there';


  const openBookingForm = () => {
    show({
      type: 'modal',
      title: 'Create a new booking',
      description: 'Add a client appointment to your schedule.',
      modalType: 'default',
      classNames: {
        content: 'sm:max-w-2xl',
      },
      content: <BookingForm />,
    });
  };

  return (
    <>
      <Head title="Provider dashboard" />

      <div className="min-h-[calc(100vh-3rem)] bg-[#f6faf8] px-4 py-6 text-[#17343c] sm:px-6 lg:px-8 lg:py-8 dark:bg-[#101917] dark:text-[#e6f1ed]">
        <div className="mx-auto max-w-7xl space-y-6 lg:space-y-8">
          <section className="relative isolate overflow-hidden rounded-3xl bg-[#17343c] px-6 py-8 text-white shadow-[0_20px_55px_rgba(23,52,60,0.15)] sm:px-8 lg:px-10 lg:py-10">
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute -top-28 right-0 size-80 rounded-full bg-[#0f8a62]/35 blur-3xl" />
              <div className="absolute -bottom-44 left-1/3 size-96 rounded-full bg-[#806edc]/20 blur-3xl" />
              <div className="absolute top-0 right-20 h-full w-px rotate-45 bg-white/8" />
              <div className="absolute top-0 right-48 h-full w-px rotate-45 bg-white/8" />
            </div>

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-5 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-[#8fe0bb] uppercase">
                  <span className="size-2 rounded-full bg-[#72d5ac]" />
                  Tuesday, 24 August 2026
                </div>

                <h1 className="max-w-xl text-3xl leading-tight font-bold tracking-tighter sm:text-4xl lg:text-[2.75rem]">
                  Good morning, {firstName}.
                  <span className="block text-[#a9c3c0]">
                    Let&apos;s make today count.
                  </span>
                </h1>

                <p className="mt-4 max-w-lg text-sm leading-6 text-[#b8c9c7] sm:text-base">
                  You have 4 appointments today and a calm, productive day
                  ahead.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <OpenBookingForm />
                <Button
                  // variant=""
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-[#8fe0bb] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17343c]"
                >
                  <Share2 aria-hidden="true" className="size-4" />
                  Share profile
                </Button>
              </div>
            </div>
          </section>

          <section
            aria-label="Today's key metrics"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <div className="flex items-start justify-between">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#d9f7e8] text-[#0f6b4d]">
                  <CalendarCheck2 aria-hidden="true" className="size-5" />
                </div>
                <span className="rounded-full bg-[#e9f8f0] px-2.5 py-1 text-xs font-bold text-[#0f8a62] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
                  +12.5%
                </span>
              </div>
              <p className="mt-5 text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
                Bookings this month
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
                48
              </p>
            </div>

            <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <div className="flex items-start justify-between">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#e6e1ff] text-[#594e9e]">
                  <WalletCards aria-hidden="true" className="size-5" />
                </div>
                <span className="rounded-full bg-[#f3f0ff] px-2.5 py-1 text-xs font-bold text-[#685bb4] dark:bg-[#806edc]/15 dark:text-[#c0b8ec]">
                  +8.4%
                </span>
              </div>
              <p className="mt-5 text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
                Revenue this month
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
                $3,840
              </p>
            </div>

            <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <div className="flex items-start justify-between">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#ffead9] text-[#a55c2d]">
                  <Users aria-hidden="true" className="size-5" />
                </div>
                <span className="rounded-full bg-[#fff4eb] px-2.5 py-1 text-xs font-bold text-[#a55c2d] dark:bg-[#a55c2d]/15 dark:text-[#f0b58b]">
                  +3 new
                </span>
              </div>
              <p className="mt-5 text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
                Returning clients
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
                86%
              </p>
            </div>

            <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <div className="flex items-start justify-between">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#dcecf5] text-[#2d6980]">
                  <Sparkles aria-hidden="true" className="size-5" />
                </div>
                <span className="rounded-full bg-[#edf7fb] px-2.5 py-1 text-xs font-bold text-[#2d6980] dark:bg-[#2d6980]/15 dark:text-[#8ac5d7]">
                  Excellent
                </span>
              </div>
              <p className="mt-5 text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
                Client satisfaction
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
                4.9<span className="text-lg text-[#70908a]">/5</span>
              </p>
            </div>
          </section>

          <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.85fr)]">
            <section className="overflow-hidden rounded-2xl border border-[#dceae4] bg-white shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <div className="flex flex-col gap-4 border-b border-[#e7f0ec] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-white/8">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold tracking-tight text-[#17343c] dark:text-white">
                      Today&apos;s schedule
                    </h2>
                    <span className="rounded-full bg-[#e9f8f0] px-2 py-0.5 text-[11px] font-bold text-[#0f8a62] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
                      4 bookings
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
                    Tuesday, August 24 · Your next appointment is in 20 min
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex w-fit items-center gap-1.5 text-sm font-bold text-[#0f8a62] transition hover:text-[#0b6549] dark:text-[#8fe0bb]"
                >
                  View calendar{' '}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </button>
              </div>

              <div className="divide-y divide-[#e7f0ec] dark:divide-white/8">
                {appointments.map((appointment) => (
                  <div
                    key={`${appointment.time}-${appointment.client}`}
                    className="group flex items-center gap-4 px-5 py-4 transition hover:bg-[#f8fcfa] sm:px-6 dark:hover:bg-white/4"
                  >
                    <div
                      className={`hidden w-16 shrink-0 text-right text-xs font-bold sm:block ${appointment.status === 'in-progress' ? 'text-[#0f8a62]' : 'text-[#70908a] dark:text-[#9cb8b1]'}`}
                    >
                      {appointment.time}
                    </div>
                    <div
                      className={`relative flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${appointment.tone}`}
                    >
                      {appointment.initials}
                      {appointment.status === 'in-progress' && (
                        <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-white bg-[#0f8a62] dark:border-[#17221f]" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-sm font-bold text-[#17343c] dark:text-white">
                          {appointment.client}
                        </p>
                        {appointment.status === 'in-progress' && (
                          <span className="rounded-full bg-[#e9f8f0] px-2 py-0.5 text-[10px] font-bold text-[#0f8a62] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
                            Live now
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#70908a] dark:text-[#9cb8b1]">
                        <span className="font-semibold text-[#0f8a62] sm:hidden">
                          {appointment.time}
                        </span>
                        <span>{appointment.service}</span>
                        <span className="text-[#b6c9c1]">·</span>
                        <span>{appointment.duration}</span>
                      </div>
                    </div>
                    <div className="hidden text-right sm:block">
                      <p className="text-sm font-bold text-[#17343c] dark:text-white">
                        {appointment.price}
                      </p>
                      <p
                        className={`mt-1 text-[11px] font-semibold ${appointment.status === 'completed' ? 'text-[#70908a]' : appointment.status === 'in-progress' ? 'text-[#0f8a62]' : 'text-[#a1b4ae]'}`}
                      >
                        {statusLabel(appointment.status)}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label={`More options for ${appointment.client}`}
                      className="rounded-lg p-2 text-[#9ab2aa] transition hover:bg-[#edf7f2] hover:text-[#17343c] dark:hover:bg-white/8 dark:hover:text-white"
                    >
                      <MoreHorizontal aria-hidden="true" className="size-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#e7f0ec] px-5 py-4 dark:border-white/8">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#b9d5ca] py-3 text-sm font-bold text-[#0f8a62] transition hover:bg-[#f4fbf7] dark:border-[#376452] dark:text-[#8fe0bb] dark:hover:bg-[#0f8a62]/10"
                >
                  <Plus aria-hidden="true" className="size-4" />
                  Add time block
                </button>
              </div>
            </section>

            <div className="space-y-6">
              <section className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                      Your profile
                    </p>
                    <h2 className="mt-1 text-lg font-bold tracking-tight text-[#17343c] dark:text-white">
                      Almost ready to share
                    </h2>
                  </div>
                  <div className="flex size-10 items-center justify-center rounded-full bg-[#17343c] text-sm font-bold text-[#8fe0bb] dark:bg-[#0f8a62] dark:text-white">
                    {getInitials(auth.user.name)}
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between text-xs font-semibold">
                  <span className="text-[#70908a] dark:text-[#9cb8b1]">
                    Profile completion
                  </span>
                  <span className="text-[#0f8a62] dark:text-[#8fe0bb]">
                    80%
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e8f1ed] dark:bg-white/10">
                  <div className="h-full w-4/5 rounded-full bg-[#0f8a62]" />
                </div>
                <div className="mt-5 space-y-3">
                  {[
                    'Add a cover photo',
                    'Set your availability',
                    'Share your booking link',
                  ].map((item, index) => (
                    <div key={item} className="flex items-center gap-3 text-sm">
                      <span
                        className={`flex size-5 items-center justify-center rounded-full ${index === 0 ? 'border border-[#b9d5ca] text-transparent dark:border-[#376452]' : 'bg-[#d9f7e8] text-[#0f8a62] dark:bg-[#0f8a62]/20 dark:text-[#8fe0bb]'}`}
                      >
                        {index > 0 && (
                          <Check aria-hidden="true" className="size-3" />
                        )}
                      </span>
                      <span
                        className={
                          index === 0
                            ? 'font-semibold text-[#17343c] dark:text-white'
                            : 'text-[#70908a] line-through dark:text-[#9cb8b1]'
                        }
                      >
                        {item}
                      </span>
                      {index === 0 && (
                        <ChevronRight
                          aria-hidden="true"
                          className="ml-auto size-4 text-[#0f8a62]"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                      This week
                    </p>
                    <h2 className="mt-1 text-lg font-bold tracking-tight text-[#17343c] dark:text-white">
                      Revenue overview
                    </h2>
                  </div>
                  <button
                    type="button"
                    aria-label="Revenue options"
                    className="rounded-lg p-2 text-[#9ab2aa] hover:bg-[#edf7f2] dark:hover:bg-white/8"
                  >
                    <MoreHorizontal aria-hidden="true" className="size-5" />
                  </button>
                </div>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold tracking-tight text-[#17343c] dark:text-white">
                      $3,160
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#0f8a62] dark:text-[#8fe0bb]">
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                      14.8% from last week
                    </p>
                  </div>
                  <span className="rounded-lg bg-[#f4fbf7] px-2 py-1 text-[11px] font-bold text-[#0f8a62] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
                    Aug 18–24
                  </span>
                </div>
                <div className="mt-6 flex h-28 items-end justify-between gap-2">
                  {weeklyRevenue.map((item, index) => (
                    <div
                      key={item.day}
                      className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                    >
                      <div className="group relative flex h-full w-full items-end">
                        <div
                          className={`w-full rounded-t-md transition-all ${index === 3 ? 'bg-[#0f8a62]' : 'bg-[#cce9db] group-hover:bg-[#9ed6ba] dark:bg-[#245a47] dark:group-hover:bg-[#347960]'}`}
                          style={{ height: `${item.value}%` }}
                        >
                          <span className="pointer-events-none absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded-md bg-[#17343c] px-1.5 py-1 text-[10px] font-bold whitespace-nowrap text-white group-hover:block dark:bg-white dark:text-[#17343c]">
                            {item.amount}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-[#91aaa2]">
                        {item.day}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <section className="grid gap-4 sm:grid-cols-3">
            <button
              type="button"
              className="group flex items-center gap-4 rounded-2xl border border-[#dceae4] bg-white p-4 text-left shadow-[0_8px_25px_rgba(23,52,60,0.04)] transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-[#17221f]"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#edf7fb] text-[#2d6980] dark:bg-[#2d6980]/15 dark:text-[#8ac5d7]">
                <CalendarDays aria-hidden="true" className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-[#17343c] dark:text-white">
                  Manage availability
                </span>
                <span className="mt-0.5 block text-xs text-[#70908a] dark:text-[#9cb8b1]">
                  Keep your calendar up to date
                </span>
              </span>
              <ChevronRight
                aria-hidden="true"
                className="size-4 text-[#9ab2aa] transition group-hover:translate-x-0.5"
              />
            </button>
            <button
              type="button"
              className="group flex items-center gap-4 rounded-2xl border border-[#dceae4] bg-white p-4 text-left shadow-[0_8px_25px_rgba(23,52,60,0.04)] transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-[#17221f]"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#fff4eb] text-[#a55c2d] dark:bg-[#a55c2d]/15 dark:text-[#f0b58b]">
                <Bell aria-hidden="true" className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-[#17343c] dark:text-white">
                  Review notifications
                </span>
                <span className="mt-0.5 block text-xs text-[#70908a] dark:text-[#9cb8b1]">
                  2 reminders need your attention
                </span>
              </span>
              <ChevronRight
                aria-hidden="true"
                className="size-4 text-[#9ab2aa] transition group-hover:translate-x-0.5"
              />
            </button>
            <button
              type="button"
              className="group flex items-center gap-4 rounded-2xl border border-[#dceae4] bg-white p-4 text-left shadow-[0_8px_25px_rgba(23,52,60,0.04)] transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-[#17221f]"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#f3f0ff] text-[#685bb4] dark:bg-[#806edc]/15 dark:text-[#c0b8ec]">
                <Clock3 aria-hidden="true" className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-[#17343c] dark:text-white">
                  Block time off
                </span>
                <span className="mt-0.5 block text-xs text-[#70908a] dark:text-[#9cb8b1]">
                  Protect space for yourself
                </span>
              </span>
              <ChevronRight
                aria-hidden="true"
                className="size-4 text-[#9ab2aa] transition group-hover:translate-x-0.5"
              />
            </button>
          </section>
        </div>
      </div>
    </>
  );
}
