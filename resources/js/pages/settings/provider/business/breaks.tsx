import { Head, router, usePage } from '@inertiajs/react';
import {
  Clock3,
  Trash2,
} from 'lucide-react';
import { OpenTimeBlockForm } from '@/components/form/components/time-block-form';
import { Button } from '@/components/ui/button';
import { useNotice } from '@/contexts/notice-context';
import availabilityBlocks from '@/routes/availability-blocks';
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


function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}


export default function OpeningHours() {
  const { businessHours, blocks } =
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

  // const handleToggle = (index?: number) => {
  //   console.log('Toggled index', index);
  //   setCurrentField(index ?? null);
  // };
  console.log('Business blocks', blocks);
  console.log('Business hours', businessHours);

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

        <section className="w-full max-w-4xl rounded-2xl border border-[#dceae4] bg-card p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
          <div className="flex justify-between item-start">
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

            <OpenTimeBlockForm />
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
