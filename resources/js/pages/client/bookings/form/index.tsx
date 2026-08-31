import { Head, Link, useForm } from '@inertiajs/react';
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
} from 'lucide-react';
import type { FormEvent } from 'react';
import { useEffect } from 'react';
import { store } from '@/actions/App/Http/Controllers/Client/BookingController';
import { Input } from '@/components/form/input';
import { Select } from '@/components/form/select';
import SubmitButton from '@/components/form/submit-button';
import { Textarea } from '@/components/form/textarea';
import { Button } from '@/components/ui/button';
import client from '@/routes/client';

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
  slug: string;
  business_name: string;
  address: string | null;
  city: string | null;
};
type BusinessHour = {
  day_of_week: number;
  is_closed: boolean;
  opens_at: string | null;
  closes_at: string | null;
};
type FormData = {
  provider_profile_id: string;
  service_id: string;
  duration_minutes: string;
  date: string;
  time: string;
  notes: string;
};

function currency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
function durationOptions(
  service?: Service,
): { label: string; value: string }[] {
  if (!service) {
    return [];
  }

  return Array.from(
    {
      length:
        Math.floor(
          (service.max_duration_minutes - service.min_duration_minutes) / 15,
        ) + 1,
    },
    (_, index) => service.min_duration_minutes + index * 15,
  ).map((minutes) => ({ label: `${minutes} minutes`, value: String(minutes) }));
}
function hoursForDate(
  date: string,
  businessHours: BusinessHour[],
): string | null {
  if (!date) {
    return null;
  }

  const day = new Date(`${date}T12:00:00`).getDay();
  const hour = businessHours.find((item) => item.day_of_week === day);

  if (!hour) {
    return null;
  }

  return hour.is_closed
    ? 'Closed on this day'
    : `Open ${hour.opens_at?.slice(0, 5)}–${hour.closes_at?.slice(0, 5)}`;
}

export default function BookingCreate({
  provider,
  services,
  selectedService = '',
  businessHours,
}: {
  provider: Provider;
  services: Service[];
  selectedService?: string;
  businessHours: BusinessHour[];
}) {
  const initialService = selectedService || services[0]?.id || '';
  const form = useForm<FormData>({
    provider_profile_id: provider.id,
    service_id: initialService,
    duration_minutes: '',
    date: '',
    time: '',
    notes: '',
  }).withPrecognition(store());
  const activeService = services.find(
    (service) => service.id === form.data.service_id,
  );

  useEffect(() => {
    if (
      activeService &&
      (!form.data.duration_minutes ||
        Number(form.data.duration_minutes) <
          activeService.min_duration_minutes ||
        Number(form.data.duration_minutes) > activeService.max_duration_minutes)
    ) {
      form.setData(
        'duration_minutes',
        String(activeService.min_duration_minutes),
      );
    }
  }, [activeService, form]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.post(store().url, { preserveScroll: true });
  };

  return (
    <>
      <Head title={`Book at ${provider.business_name}`} />
      <main className="min-h-[calc(100vh-3rem)] bg-[#f6faf8] px-4 py-6 text-[#17343c] sm:px-6 lg:px-8 lg:py-8 dark:bg-[#101917] dark:text-[#e6f1ed]">
        <div className="mx-auto max-w-5xl space-y-6 lg:space-y-8">
          <Link
            href={client.providers.show(provider.slug)}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0f8a62]"
          >
            <ArrowLeft className="size-4" />
            Back to provider
          </Link>
          <section className="rounded-3xl bg-[#17343c] px-6 py-8 text-white shadow-[0_20px_55px_rgba(23,52,60,0.14)] sm:px-8 lg:px-10">
            <p className="text-xs font-bold tracking-[0.16em] text-[#8fe0bb] uppercase">
              Reserve a time
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Book at {provider.business_name}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-sm text-[#b8c9c7]">
              <MapPin className="size-4" />
              {provider.address || provider.city || 'Provider location'}
            </p>
          </section>
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] sm:p-7 dark:border-white/10 dark:bg-[#17221f]"
            >
              <div>
                <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                  1. Choose your service
                </p>
                <div className="mt-4 grid gap-3">
                  {services.map((service) => (
                    <label
                      key={service.id}
                      className={`cursor-pointer rounded-xl border p-4 transition ${form.data.service_id === service.id ? 'border-[#0f8a62] bg-[#f4fbf7] dark:bg-[#0f8a62]/10' : 'border-[#e7f0ec] dark:border-white/8'}`}
                    >
                      <input
                        type="radio"
                        name="service_id"
                        value={service.id}
                        checked={form.data.service_id === service.id}
                        onChange={(event) =>
                          form.setData('service_id', event.target.value)
                        }
                        className="sr-only"
                      />
                      <span className="flex items-start justify-between gap-4">
                        <span>
                          <span className="block font-bold text-[#17343c] dark:text-white">
                            {service.name}
                          </span>
                          <span className="mt-1 block text-sm text-[#70908a] dark:text-[#b6ccc5]">
                            {service.description ||
                              'A tailored service with care and attention to detail.'}
                          </span>
                        </span>
                        <span className="shrink-0 text-lg font-bold text-[#17343c] dark:text-white">
                          {currency(service.price)}
                        </span>
                      </span>
                      <span className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#41645a] dark:text-[#c4d8d1]">
                        <Clock3 className="size-3.5 text-[#0f8a62]" />
                        {service.min_duration_minutes ===
                        service.max_duration_minutes
                          ? `${service.min_duration_minutes} min`
                          : `${service.min_duration_minutes}–${service.max_duration_minutes} min`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Select
                  name="duration_minutes"
                  label="Duration"
                  options={durationOptions(activeService)}
                  placeholder="Choose duration"
                  form={form}
                />
                <Input
                  name="date"
                  label="Date"
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  required
                  form={form}
                />
              </div>
              {form.data.date && (
                <p className="-mt-3 flex items-center gap-2 text-sm text-[#0f6b4d] dark:text-[#8fe0bb]">
                  <CalendarDays className="size-4" />
                  {hoursForDate(form.data.date, businessHours) ||
                    'The provider will confirm opening hours'}
                </p>
              )}
              <Input
                name="time"
                label="Start time"
                type="time"
                required
                form={form}
              />
              <Textarea
                name="notes"
                label="Notes for your provider (optional)"
                placeholder="Anything they should know before your visit?"
                rows={4}
                form={form}
              />
              <div className="flex flex-col-reverse gap-3 border-t border-[#e7f0ec] pt-5 sm:flex-row sm:justify-end dark:border-white/8">
                <Button asChild variant="outline" className="rounded-xl">
                  <Link href={client.providers.show(provider.slug)}>
                    Cancel
                  </Link>
                </Button>
                <SubmitButton
                  form={form}
                  label="Request booking"
                  className="rounded-xl"
                />
              </div>
            </form>
            <aside className="space-y-4">
              <div className="rounded-2xl border border-[#dceae4] bg-white p-6 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
                <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                  What happens next
                </p>
                <div className="mt-5 space-y-5">
                  {[
                    'Your request is sent to the provider.',
                    'They confirm the time or suggest an alternative.',
                    'Your confirmed appointment appears in My bookings.',
                  ].map((step, index) => (
                    <div key={step} className="flex gap-3">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#d9f7e8] text-xs font-bold text-[#0f6b4d]">
                        {index + 1}
                      </span>
                      <p className="pt-1 text-sm leading-5 text-[#41645a] dark:text-[#c4d8d1]">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-[#b9dccc] bg-[#f4fbf7] p-5 dark:bg-[#0f8a62]/10">
                <div className="flex items-center gap-2 text-[#0f6b4d] dark:text-[#8fe0bb]">
                  <CheckCircle2 className="size-4" />
                  <p className="text-sm font-bold">No payment is taken yet</p>
                </div>
                <p className="mt-2 text-xs leading-5 text-[#41645a] dark:text-[#b6ccc5]">
                  This request is saved securely and only becomes confirmed
                  after the provider accepts it.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
