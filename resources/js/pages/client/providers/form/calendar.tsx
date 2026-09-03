import type { InertiaFormProps } from '@inertiajs/react';
import { CalendarDays } from 'lucide-react';
import { CalendarDatePicker } from '@/components/form/calendar-datepicker';
import type { BookingFormData, BusinessHour } from './types';

type Props = {
  form: InertiaFormProps<BookingFormData>;
  businessHours: BusinessHour[];
  clearStepError: () => void;
};

export default function ProviderCalendar({
  form,
  businessHours,
  clearStepError,
}: Props) {
  return (
    <section
      className="grid justify-items-center gap-3"
      aria-labelledby="booking-date-heading"
    >
      <h3 id="booking-date-heading" className="sr-only">
        Choose a date
      </h3>
      <CalendarDatePicker
        name="date"
        label="Select your preferred date"
        form={form}
        onChange={() => {
          form.setData('time', '');
          clearStepError();
        }}
        disabled={(date) => isDateUnavailable(date, businessHours)}
        classNames={{
          wrapper: 'mx-0',
          label: 'self-start text-[#17343c] dark:text-white',
        }}
      />
      <p className="flex items-center gap-2 text-center text-xs text-[#70908a] dark:text-[#9cb8b1]">
        <CalendarDays className="size-3.5" />
        Dates with no opening hours cannot be selected.
      </p>
    </section>
  );
}

function isDateUnavailable(date: Date, businessHours: BusinessHour[]): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (date < today) {
    return true;
  }

  const businessHour = businessHours.find(
    (hour) => hour.day_of_week === date.getDay(),
  );

  return businessHour?.is_closed ?? false;
}
