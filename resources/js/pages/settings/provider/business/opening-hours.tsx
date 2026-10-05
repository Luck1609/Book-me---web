import { Head, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import {
  CalendarDays,
  Pencil,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import settings from '@/routes/settings';
import { BusinessProfileRoutes } from '@/types/enums';
import { businessData } from './data';

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

export default function OpeningHours() {
  const { businessHours } = usePage<SchedulePageProps>().props;

  return (
    <>
      <Head title="Business opening hours settings" />

      <div className="space-y-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-[#0f8a62] uppercase dark:text-[#8fe0bb]">
              Provider calendar
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#17343c] dark:text-white">
              Manage availability
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
              Review your working hours, upcoming bookings, and protected
              time.
            </p>
          </div>
        </header>

        <div className="max-w-4xl">
          <section className="rounded-2xl border border-[#dceae4] bg-card p-5 dark:border-white/10 dark:bg-[#17221f] space-y-5">
            <div className="flex justify-between items-center gap-3">
              <div className="flex justify-between items-center gap-3">
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

              <Button>
                <Pencil />
                Edit
              </Button>
            </div>

            <div className="">
              <ul className="space-y-3">
                {businessHours.map((hour) => (
                  <li className="flex justify-between items-center py-2" key={hour.id}>
                    <div className="flex items-center gap-3">
                      <span className={cn("size-4 rounded-full", hour.is_closed ? "bg-red-500" : "bg-green-500")}></span>
                      <span>{days[hour.day_of_week]}</span>
                    </div>

                    <div className="flex gap-x-2">
                      {
                        hour.is_closed
                          ? "Closed"
                          : (
                            <>
                              <span>{format(new Date(`2026, 9, 16 ${hour.opens_at}`), 'h:mm a')}</span>
                              -
                              <span>{format(new Date(`2026, 9, 16 ${hour.closes_at}`), 'h:mm a')}</span>
                            </>
                          )
                      }
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}



OpeningHours.layout = {
  breadcrumbs: [
    {
      title: 'Business Opening Hours',
      href: settings.businessProfile.edit(BusinessProfileRoutes.Location).url,
    },
  ],
  ...businessData
};
