import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, CalendarDays, Clock3, Trash2 } from 'lucide-react';
import { OpenTimeBlockForm } from '@/components/form/components/time-block-form';
import { Button } from '@/components/ui/button';
import { useNotice } from '@/contexts/notice-context';
import { dashboard } from '@/routes';
import availabilityBlocks from '@/routes/availability-blocks';

type BusinessHour = {
  id: string;
  day_of_week: number;
  is_closed: boolean;
  opens_at: string | null;
  closes_at: string | null;
};

type TimeBlock = {
  id: string;
  starts_at: string;
  ends_at: string;
  type: 'break' | 'time_off';
  reason: string | null;
};

type Booking = {
  id: string;
  schedule: string;
  user: { name: string } | null;
  service: { name: string } | null;
};

type SchedulePageProps = {
  businessHours: BusinessHour[];
  blocks: TimeBlock[];
  bookings: Booking[];
};

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function formatTime(value: string | null): string {
  if (!value) {
    return '—';
  }

  const [hours, minutes] = value.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

export default function Schedule() {
  const { businessHours, blocks, bookings } =
    usePage<SchedulePageProps>().props;
  const { show } = useNotice();

  const removeBlock = (block: TimeBlock) => {
    show({
      type: 'notice',
      title: 'Remove this time block?',
      description: 'New bookings may become available during this time.',
      confirmText: 'Remove block',
      onConfirm: () => {
        router.delete(availabilityBlocks.destroy(block.id).url, {
          preserveScroll: true,
        });
      },
    });
  };

  return (
    <>
      <Head title="Provider calendar" />

      <div className="min-h-[calc(100vh-3rem)] bg-[#f6faf8] px-4 py-6 text-[#17343c] sm:px-6 lg:px-8 lg:py-8 dark:bg-[#101917] dark:text-[#e6f1ed]">
        <div className="mx-auto max-w-7xl space-y-6">
          <header className="flex flex-col gap-4 rounded-3xl bg-[#17343c] px-6 py-7 text-white shadow-[0_20px_55px_rgba(23,52,60,0.15)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <Link
                href={dashboard()}
                className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#a9c3c0] transition hover:text-white"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                Back to dashboard
              </Link>
              <p className="text-xs font-bold tracking-[0.16em] text-[#8fe0bb] uppercase">
                Provider calendar
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                Manage availability
              </h1>
              <p className="mt-2 max-w-xl text-sm text-[#b8c9c7]">
                Review your working hours, upcoming bookings, and protected time.
              </p>
            </div>
            <OpenTimeBlockForm />
          </header>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#edf7fb] text-[#2d6980]">
                  <CalendarDays aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h2 className="text-lg font-bold">Working hours</h2>
                  <p className="text-sm text-[#70908a] dark:text-[#9cb8b1]">
                    Your regular availability
                  </p>
                </div>
              </div>
              <div className="mt-5 divide-y divide-[#e7f0ec] dark:divide-white/8">
                {businessHours.map((hour) => (
                  <div key={hour.id} className="flex items-center justify-between py-3 text-sm">
                    <span className="font-semibold">{days[hour.day_of_week] ?? 'Day'}</span>
                    <span className="text-[#70908a] dark:text-[#9cb8b1]">
                      {hour.is_closed
                        ? 'Closed'
                        : formatTime(hour.opens_at) + ' – ' + formatTime(hour.closes_at)}
                    </span>
                  </div>
                ))}
                {businessHours.length === 0 && (
                  <p className="py-4 text-sm text-[#70908a] dark:text-[#9cb8b1]">
                    No working hours have been configured yet.
                  </p>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#f3f0ff] text-[#685bb4]">
                  <Clock3 aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h2 className="text-lg font-bold">Protected time</h2>
                  <p className="text-sm text-[#70908a] dark:text-[#9cb8b1]">
                    Breaks and time off
                  </p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {blocks.map((block) => (
                  <div
                    key={block.id}
                    className="flex items-start gap-3 rounded-xl bg-[#f6faf8] p-3 dark:bg-white/5"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">
                        {block.type === 'time_off' ? 'Time off' : 'Break'}
                      </p>
                      <p className="mt-1 text-xs text-[#70908a] dark:text-[#9cb8b1]">
                        {formatDateTime(block.starts_at) + ' – ' + formatDateTime(block.ends_at)}
                      </p>
                      {block.reason && (
                        <p className="mt-1 text-xs text-[#70908a] dark:text-[#9cb8b1]">
                          {block.reason}
                        </p>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Remove time block"
                      onClick={() => removeBlock(block)}
                    >
                      <Trash2 aria-hidden="true" className="size-4" />
                    </Button>
                  </div>
                ))}
                {blocks.length === 0 && (
                  <p className="py-4 text-sm text-[#70908a] dark:text-[#9cb8b1]">
                    No upcoming protected time.
                  </p>
                )}
              </div>
            </section>
          </div>

          <section className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#d9f7e8] text-[#0f6b4d]">
                <CalendarDays aria-hidden="true" className="size-5" />
              </span>
              <div>
                <h2 className="text-lg font-bold">Upcoming bookings</h2>
                <p className="text-sm text-[#70908a] dark:text-[#9cb8b1]">
                  The next 30 days
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {bookings.map((booking) => (
                <div key={booking.id} className="rounded-xl border border-[#e7f0ec] p-4 dark:border-white/8">
                  <p className="text-sm font-bold">{booking.service?.name ?? 'Appointment'}</p>
                  <p className="mt-1 text-xs text-[#70908a] dark:text-[#9cb8b1]">
                    {booking.user?.name ?? 'Client'}
                  </p>
                  <p className="mt-3 text-xs font-semibold text-[#0f8a62] dark:text-[#8fe0bb]">
                    {formatDateTime(booking.schedule)}
                  </p>
                </div>
              ))}
              {bookings.length === 0 && (
                <p className="py-4 text-sm text-[#70908a] dark:text-[#9cb8b1]">
                  No upcoming bookings.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
