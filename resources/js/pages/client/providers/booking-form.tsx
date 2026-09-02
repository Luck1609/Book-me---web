import { useForm } from '@inertiajs/react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { store } from '@/actions/App/Http/Controllers/Client/BookingController';
import { CalendarDatePicker } from '@/components/form/calendar-datepicker';
import SubmitButton from '@/components/form/submit-button';
import { Textarea } from '@/components/form/textarea';
import { Button } from '@/components/ui/button';
import { useNotice } from '@/contexts/notice-context';

type Service = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  min_duration_minutes: number;
  max_duration_minutes: number;
  requires_payment: boolean;
};

type Provider = {
  id: string;
  business_name: string;
  address: string | null;
  city: string | null;
  services: Service[];
};

type BusinessHour = {
  day_of_week: number;
  is_closed: boolean;
  opens_at: string | null;
  closes_at: string | null;
};

type BookedTime = {
  date: string;
  time: string;
  duration_minutes: number | null;
};

type BlockedTime = {
  starts_at: string;
  ends_at: string;
};

type BookingFormData = {
  provider_profile_id: string;
  service_id: string;
  duration_minutes: string;
  date: string;
  time: string;
  notes: string;
};

type Props = {
  provider: Provider;
  businessHours: BusinessHour[];
  bookings?: BookedTime[];
  blockedTimes?: BlockedTime[];
  service?: { id: string };
};

const TOTAL_STEPS = 4;

export default function ClientBookingForm({
  provider,
  businessHours,
  bookings = [],
  blockedTimes = [],
  service,
}: Props) {
  const { hide } = useNotice();
  const initialServiceId = provider.services.some(
    (providerService) => providerService.id === service?.id,
  )
    ? service?.id ?? ''
    : provider.services[0]?.id ?? '';
  const [step, setStep] = useState(1);
  const [stepError, setStepError] = useState('');
  const form = useForm<BookingFormData>({
    provider_profile_id: provider.id,
    service_id: initialServiceId,
    duration_minutes: getInitialDuration(provider.services, initialServiceId),
    date: '',
    time: '',
    notes: '',
  }).withPrecognition(store());

  const selectedService = provider.services.find(
    (providerService) => providerService.id === form.data.service_id,
  );
  const availableSlots = useMemo(
    () =>
      getAvailableSlots(
        form.data.date,
        selectedService,
        businessHours,
        bookings,
        blockedTimes,
      ),
    [
      blockedTimes,
      bookings,
      businessHours,
      form.data.date,
      selectedService,
    ],
  );

  useEffect(() => {
    if (form.data.time && !availableSlots.includes(form.data.time)) {
      form.setData('time', '');
    }
  }, [availableSlots, form, form.data.time]);

  const handleServiceChange = (serviceId: string): void => {
    const nextService = provider.services.find(
      (providerService) => providerService.id === serviceId,
    );

    form.setData((data) => ({
      ...data,
      service_id: serviceId,
      duration_minutes: nextService
        ? String(nextService.min_duration_minutes)
        : '',
      date: '',
      time: '',
    }));
    setStepError('');
  };

  const handleNext = (): void => {
    setStepError('');

    if (step === 1 && !form.data.service_id) {
      setStepError('Choose a service to continue.');

      return;
    }

    if (step === 2 && !form.data.date) {
      setStepError('Choose a date to continue.');

      return;
    }

    if (step === 3 && !form.data.time) {
      setStepError('Choose an available time slot to continue.');

      return;
    }

    setStep((currentStep) => Math.min(currentStep + 1, TOTAL_STEPS));
  };

  const handleBack = (): void => {
    setStepError('');
    setStep((currentStep) => Math.max(currentStep - 1, 1));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    form.post(store().url, {
      preserveScroll: true,
      onSuccess: () => {
        form.reset();
        hide();
      },
    });
  };

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase">
            Step {step} of {TOTAL_STEPS}
          </p>
          <h2 className="mt-1 text-xl font-bold text-[#17343c] dark:text-white">
            {stepTitle(step)}
          </h2>
        </div>
        <div className="flex gap-1.5" aria-label={`Step ${step} of ${TOTAL_STEPS}`}>
          {Array.from({ length: TOTAL_STEPS }, (_, index) => (
            <span
              key={index}
              aria-hidden="true"
              className={`h-1.5 w-8 rounded-full ${index < step ? 'bg-[#0f8a62]' : 'bg-[#dceae4] dark:bg-white/15'}`}
            />
          ))}
        </div>
      </div>

      {step === 1 && (
        <section className="grid gap-3" aria-labelledby="booking-service-heading">
          <h3 id="booking-service-heading" className="sr-only">
            Choose a service
          </h3>
          {provider.services.length > 0 ? (
            provider.services.map((providerService) => {
              const isSelected = form.data.service_id === providerService.id;

              return (
                <label
                  key={providerService.id}
                  className={`cursor-pointer rounded-2xl border p-4 transition ${isSelected ? 'border-[#0f8a62] bg-[#f4fbf7] ring-2 ring-[#0f8a62]/15 dark:bg-[#0f8a62]/10' : 'border-[#e7f0ec] hover:border-[#b9dccc] dark:border-white/10'}`}
                >
                  <input
                    type="radio"
                    name="service_id"
                    value={providerService.id}
                    checked={isSelected}
                    onChange={() => handleServiceChange(providerService.id)}
                    className="sr-only"
                  />
                  <span className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border ${isSelected ? 'border-[#0f8a62] bg-[#0f8a62] text-white' : 'border-[#b9dccc] text-transparent'}`}
                    >
                      <Check aria-hidden="true" className="size-3.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-start justify-between gap-3">
                        <span className="font-bold text-[#17343c] dark:text-white">
                          {providerService.name}
                        </span>
                        <span className="shrink-0 font-bold text-[#17343c] dark:text-white">
                          {currency(providerService.price)}
                        </span>
                      </span>
                      <span className="mt-1 block text-sm leading-5 text-[#70908a] dark:text-[#b6ccc5]">
                        {providerService.description ||
                          'A tailored service with care and attention to detail.'}
                      </span>
                      <span className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#41645a] dark:text-[#c4d8d1]">
                        <Clock3 className="size-3.5 text-[#0f8a62]" />
                        {durationLabel(providerService)}
                      </span>
                    </span>
                  </span>
                </label>
              );
            })
          ) : (
            <p className="rounded-xl bg-[#fff4eb] p-4 text-sm text-[#a55c2d]">
              This provider has no active services available for booking.
            </p>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="grid justify-items-center gap-3" aria-labelledby="booking-date-heading">
          <h3 id="booking-date-heading" className="sr-only">
            Choose a date
          </h3>
          <CalendarDatePicker
            name="date"
            label="Select your preferred date"
            form={form}
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
      )}

      {step === 3 && (
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
          {availableSlots.length > 0 ? (
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
                      setStepError('');
                    }}
                    className={`rounded-xl border px-3 py-3 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-[#0f8a62] focus-visible:outline-none ${isSelected ? 'border-[#0f8a62] bg-[#0f8a62] text-white' : 'border-[#dceae4] text-[#41645a] hover:border-[#0f8a62] hover:text-[#0f6b4d] dark:border-white/10 dark:text-[#c4d8d1]'}`}
                  >
                    {formatTime(slot)}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl bg-[#f4fbf7] p-4 text-sm leading-5 text-[#41645a] dark:bg-[#0f8a62]/10 dark:text-[#c4d8d1]">
              No unbooked times are available for this date. Choose another
              date to see more options.
            </div>
          )}
        </section>
      )}

      {step === 4 && (
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
      )}

      {stepError && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {stepError}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-[#e7f0ec] pt-5 sm:flex-row sm:justify-between dark:border-white/10">
        {step > 1 ? (
          <Button type="button" variant="outline" onClick={handleBack}>
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back
          </Button>
        ) : (
          <span />
        )}
        {step < TOTAL_STEPS ? (
          <Button
            type="button"
            onClick={handleNext}
            disabled={provider.services.length === 0}
          >
            Continue
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        ) : (
          <SubmitButton form={form} label="Request booking" />
        )}
      </div>
    </form>
  );
}

function stepTitle(step: number): string {
  return ['Choose a service', 'Pick a date', 'Select a time', 'Almost there'][
    step - 1
  ];
}

function getInitialDuration(services: Service[], serviceId: string): string {
  const service = services.find((providerService) => providerService.id === serviceId);

  return service ? String(service.min_duration_minutes) : '';
}

function durationLabel(service: Service): string {
  return service.min_duration_minutes === service.max_duration_minutes
    ? `${service.min_duration_minutes} min`
    : `${service.min_duration_minutes}–${service.max_duration_minutes} min`;
}

function currency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
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

function getAvailableSlots(
  date: string,
  service: Service | undefined,
  businessHours: BusinessHour[],
  bookings: BookedTime[],
  blockedTimes: BlockedTime[],
): string[] {
  if (!date || !service) {
    return [];
  }

  const dayOfWeek = parseLocalDate(date).getDay();
  const businessHour = businessHours.find(
    (hour) => hour.day_of_week === dayOfWeek,
  );

  if (
    !businessHour ||
    businessHour.is_closed ||
    !businessHour.opens_at ||
    !businessHour.closes_at
  ) {
    return [];
  }

  const openingMinutes = timeToMinutes(businessHour.opens_at);
  const closingMinutes = timeToMinutes(businessHour.closes_at);
  const duration = service.min_duration_minutes;
  const slots: string[] = [];
  const today = new Date();
  const todayInput = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const currentMinutes = today.getHours() * 60 + today.getMinutes();

  for (
    let startMinutes = openingMinutes;
    startMinutes + duration <= closingMinutes;
    startMinutes += 30
  ) {
    if (date === todayInput && startMinutes <= currentMinutes) {
      continue;
    }

    const endMinutes = startMinutes + duration;
    const bookingOverlaps = bookings.some((booking) => {
      if (booking.date !== date) {
        return false;
      }

      const bookingStart = timeToMinutes(booking.time);
      const bookingEnd = bookingStart + (booking.duration_minutes ?? 30);

      return startMinutes < bookingEnd && endMinutes > bookingStart;
    });
    const blockOverlaps = blockedTimes.some((block) => {
      const blockStart = dateTimeToMinutes(block.starts_at, date);
      const blockEnd = dateTimeToMinutes(block.ends_at, date);

      return (
        blockStart !== null &&
        blockEnd !== null &&
        startMinutes < blockEnd &&
        endMinutes > blockStart
      );
    });

    if (!bookingOverlaps && !blockOverlaps) {
      slots.push(minutesToTime(startMinutes));
    }
  }

  return slots;
}

function parseLocalDate(date: string): Date {
  const [year, month, day] = date.split('-').map(Number);

  return new Date(year, month - 1, day, 12);
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.slice(0, 5).split(':').map(Number);

  return hours * 60 + minutes;
}

function minutesToTime(minutes: number): string {
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
}

function dateTimeToMinutes(value: string, date: string): number | null {
  const [datePart, timePart] = value.split(' ');

  if (datePart !== date || !timePart) {
    return null;
  }

  return timeToMinutes(timePart);
}

function formatDate(date: string): string {
  if (!date) {
    return 'Choose a date';
  }

  return parseLocalDate(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTime(time: string): string {
  if (!time) {
    return 'Choose a time';
  }

  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;

  return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
}
