import type { InertiaFormProps } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import type { BookingFormData } from './types';
import { formatDate, formatTime } from './utils';

type Props = {
  form: InertiaFormProps<BookingFormData>;
  availableSlots: string[];
  availabilityProcessing: boolean;
  slotError?: string;
  clearStepError: () => void;
};

export default function ProviderSlots({
  form,
  availableSlots,
  availabilityProcessing,
  slotError,
  clearStepError,
}: Props) {
  return (
    <section className="grid gap-3" aria-labelledby="booking-time-heading">
      <h3 id="booking-time-heading" className="sr-only">
        Choose a time
      </h3>

      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-[#17343c] dark:text-white">
          Available times
        </span>

        <span className="text-[#70908a] dark:text-[#9cb8b1]">
          {formatDate(form.data.date)}
        </span>
      </div>

      {availabilityProcessing ? (
        <div className="rounded-xl bg-[#f4fbf7] p-4 text-sm text-[#41645a] dark:bg-[#0f8a62]/10 dark:text-[#c4d8d1]">
          Checking live availability...
        </div>
      ) : slotError ? (
        <div
          role="alert"
          className="rounded-xl bg-[#fff4eb] p-4 text-sm text-[#a55c2d]"
        >
          {slotError}
        </div>
      ) : availableSlots.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {availableSlots.map((slot) => {
            const isSelected = form.data.time === slot;

            return (
              <button
                key={slot}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  form.setData('time', slot);
                  clearStepError();
                }}
                className={cn(
                  'rounded-xl border px-3 py-3 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-[#0f8a62] focus-visible:outline-none',
                  isSelected
                    ? 'border-[#0f8a62] bg-[#0f8a62] text-white'
                    : 'border-[#dceae4] text-[#41645a] hover:border-[#0f8a62] hover:text-[#0f6b4d] dark:border-white/10 dark:text-[#c4d8d1]',
                )}
              >
                {formatTime(slot)}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl bg-[#f4fbf7] p-4 text-sm leading-5 text-[#41645a] dark:bg-[#0f8a62]/10 dark:text-[#c4d8d1]">
          No unbooked times are available for this date. Choose another date to
          see more options.
        </div>
      )}
    </section>
  );
}
