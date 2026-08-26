import { Form, Head, Link, router, usePage } from '@inertiajs/react';
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  Save,
  Trash2,
} from 'lucide-react';
import { Fragment, useState } from 'react';
import { OpenTimeBlockForm } from '@/components/form/components/time-block-form';
import { Button } from '@/components/ui/button';
import { useNotice } from '@/contexts/notice-context';
import { dashboard } from '@/routes';
import availabilityBlocks from '@/routes/availability-blocks';
import businessHoursRoutes from '@/routes/business-hours';
import BusinessHourEditor from './form/business-hour-editor';

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


const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function inputTime(value: string | null): string {
  return value?.slice(0, 5) ?? '';
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

function BusinessHourEditorLocal({ hour }: { hour: BusinessHour }) {
  const [isClosed, setIsClosed] = useState(hour.is_closed);
  const day = days[hour.day_of_week] ?? 'Day';

  return (
    <Form
      {...businessHoursRoutes.update.form(hour.id)}
      options={{ preserveScroll: true }}
      className="border-b border-[#e7f0ec] py-4 last:border-b-0 dark:border-white/8"
    >
      {({ errors, processing, recentlySuccessful }) => (
        <div className="grid gap-4 lg:grid-cols-[minmax(9rem,1fr)_minmax(16rem,2fr)_auto] lg:items-end">
          <div>
            <p className="font-semibold">{day}</p>
            <label className="mt-2 inline-flex cursor-pointer items-center gap-2 text-xs text-[#70908a] dark:text-[#9cb8b1]">
              <input
                type="checkbox"
                name="is_closed"
                value="1"
                checked={isClosed}
                onChange={(event) => setIsClosed(event.target.checked)}
                className="size-4 rounded border-[#b7d1c5] accent-[#0f8a62]"
              />
              Closed
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1.5 text-xs font-medium text-[#70908a] dark:text-[#9cb8b1]">
              Opens at
              <input
                name="opens_at"
                type="time"
                defaultValue={inputTime(hour.opens_at)}
                disabled={isClosed}
                className="h-10 rounded-xl border border-[#dfe9e3] bg-[#fbfcfa] px-3 text-sm text-[#17343c] transition outline-none focus:border-[#76c9a5] focus:ring-4 focus:ring-[#e3f6ee] disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-[#e6f1ed]"
              />
              {errors.opens_at && (
                <span className="text-xs text-red-500">{errors.opens_at}</span>
              )}
            </label>
            <label className="grid gap-1.5 text-xs font-medium text-[#70908a] dark:text-[#9cb8b1]">
              Closes at
              <input
                name="closes_at"
                type="time"
                defaultValue={inputTime(hour.closes_at)}
                disabled={isClosed}
                className="h-10 rounded-xl border border-[#dfe9e3] bg-[#fbfcfa] px-3 text-sm text-[#17343c] transition outline-none focus:border-[#76c9a5] focus:ring-4 focus:ring-[#e3f6ee] disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-[#e6f1ed]"
              />
              {errors.closes_at && (
                <span className="text-xs text-red-500">{errors.closes_at}</span>
              )}
            </label>
          </div>

          <div className="flex items-center gap-2 lg:justify-end">
            <Button type="submit" size="sm" disabled={processing}>
              <Save aria-hidden="true" className="size-4" />
              {processing ? 'Saving…' : 'Save'}
            </Button>
            {recentlySuccessful && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0f8a62]">
                <Check aria-hidden="true" className="size-3.5" />
                Saved
              </span>
            )}
          </div>
        </div>
      )}
    </Form>
  );
}

export default function Schedule() {
  const [currentField, setCurrentField] = useState<number | null>(null)
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

  const handleToggle = (index?: number) => {
    console.log('Toggled index', index)
    setCurrentField(index ?? null)
  }
console.log('Business hours', businessHours)
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
                Review your working hours, upcoming bookings, and protected
                time.
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
                {
                  businessHours.map((hour, index) => (
                    <div className="py-2" key={hour.id}>
                      <BusinessHourEditor
                        hour={hour}
                        edit={currentField === index}
                        toggle={handleToggle}
                        index={index}
                      />
                    </div>
                  ))
                }
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
                        {formatDateTime(block.starts_at) +
                          ' – ' +
                          formatDateTime(block.ends_at)}
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
                <div
                  key={booking.id}
                  className="rounded-xl border border-[#e7f0ec] p-4 dark:border-white/8"
                >
                  <p className="text-sm font-bold">
                    {booking.service?.name ?? 'Appointment'}
                  </p>
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
