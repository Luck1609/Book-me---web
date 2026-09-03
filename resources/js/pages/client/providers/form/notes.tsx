import type { InertiaFormProps } from '@inertiajs/react';
import { CalendarDays, Check } from 'lucide-react';
import { Textarea } from '@/components/form/textarea';
import type { ServiceRecord } from '@/types/app';
import type { BookingFormData } from './types';
import { formatDate, formatTime } from './utils';

type Props = {
  form: InertiaFormProps<BookingFormData>;
  selectedService?: ServiceRecord;
};

export default function ProviderNotes({ form, selectedService }: Props) {
  return (
    <section className="grid gap-5" aria-labelledby="booking-note-heading">
      <div className="rounded-xl bg-[#f4fbf7] p-4 text-sm dark:bg-[#0f8a62]/10">
        <div className="flex items-center gap-2 font-bold text-[#17343c] dark:text-white">
          <Check aria-hidden="true" className="size-4 text-[#0f8a62]" />
          {selectedService?.name}
        </div>
        <p className="mt-2 flex items-center gap-2 text-[#41645a] dark:text-[#c4d8d1]">
          <CalendarDays className="size-4 text-[#0f8a62]" />
          {formatDate(form.data.date)} at {formatTime(form.data.time)}
        </p>
      </div>
      <div>
        <h3 id="booking-note-heading" className="sr-only">
          Add a note
        </h3>
        <Textarea
          name="notes"
          label="Additional note (optional)"
          placeholder="Anything your provider should know before your visit?"
          rows={4}
          form={form}
        />
      </div>
    </section>
  );
}
