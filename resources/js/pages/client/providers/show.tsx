import { Head, Link } from '@inertiajs/react';
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Scissors,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import client from '@/routes/client';

type Provider = {
  id: string;
  slug: string;
  business_name: string;
  description: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  avatar: string | null;
  services: Service[];
};
type Service = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  min_duration_minutes: number;
  max_duration_minutes: number;
  requires_payment: boolean;
};
type BusinessHour = {
  day_of_week: number;
  is_closed: boolean;
  opens_at: string | null;
  closes_at: string | null;
};

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
function currency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
function duration(service: Service): string {
  return service.min_duration_minutes === service.max_duration_minutes
    ? `${service.min_duration_minutes} min`
    : `${service.min_duration_minutes}–${service.max_duration_minutes} min`;
}
function dayName(day: number): string {
  return (
    [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ][day] ?? 'Day'
  );
}

export default function ProviderShow({
  provider,
  businessHours,
}: {
  provider: Provider;
  businessHours: BusinessHour[];
}) {
  return (
    <>
      <Head title={provider.business_name} />
      <main className="min-h-[calc(100vh-3rem)] bg-[#f6faf8] px-4 py-6 text-[#17343c] sm:px-6 lg:px-8 lg:py-8 dark:bg-[#101917] dark:text-[#e6f1ed]">
        <div className="mx-auto max-w-5xl space-y-6 lg:space-y-8">
          <Link
            href={client.providers.index()}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0f8a62]"
          >
            <ArrowLeft className="size-4" />
            All providers
          </Link>
          <section className="overflow-hidden rounded-3xl border border-[#dceae4] bg-white shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
            <div className="h-48 bg-gradient-to-br from-[#d9f7e8] via-[#f3f0ff] to-[#ffead9] p-6">
              {provider.avatar ? (
                <img
                  src={provider.avatar}
                  alt=""
                  className="size-24 rounded-3xl object-cover ring-4 ring-white/70"
                />
              ) : (
                <span className="flex size-24 items-center justify-center rounded-3xl bg-white/80 text-2xl font-bold text-[#594e9e]">
                  {initials(provider.business_name)}
                </span>
              )}
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
                    {provider.business_name}
                  </h1>
                  <p className="mt-2 flex items-center gap-2 text-sm text-[#70908a] dark:text-[#9cb8b1]">
                    <MapPin className="size-4" />
                    {provider.address || provider.city || 'Local provider'}
                  </p>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-[#5d706a] dark:text-[#b6ccc5]">
                    {provider.description ||
                      'A trusted local provider ready to help you feel your best.'}
                  </p>
                </div>
                <Button asChild className="rounded-xl">
                  <Link
                    href={client.booking.create({
                      query: { provider: provider.id },
                    })}
                  >
                    <CalendarDays className="size-4" />
                    Book a visit
                  </Link>
                </Button>
              </div>
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-[#41645a] dark:text-[#c4d8d1]">
                {provider.phone && (
                  <a
                    href={`tel:${provider.phone}`}
                    className="flex items-center gap-2 hover:text-[#0f8a62]"
                  >
                    <Phone className="size-4 text-[#0f8a62]" />
                    {provider.phone}
                  </a>
                )}
                {provider.email && (
                  <a
                    href={`mailto:${provider.email}`}
                    className="flex items-center gap-2 hover:text-[#0f8a62]"
                  >
                    <Mail className="size-4 text-[#0f8a62]" />
                    {provider.email}
                  </a>
                )}
              </div>
            </div>
          </section>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
            <section className="rounded-2xl border border-[#dceae4] bg-white p-6 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                Choose your ritual
              </p>
              <h2 className="mt-1 text-2xl font-bold text-[#17343c] dark:text-white">
                Services
              </h2>
              <div className="mt-5 space-y-3">
                {provider.services.map((service) => (
                  <div
                    key={service.id}
                    className="flex flex-col gap-4 rounded-xl border border-[#e7f0ec] p-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/8"
                  >
                    <div className="flex gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#d9f7e8] text-[#0f6b4d]">
                        <Scissors className="size-4" />
                      </span>
                      <div>
                        <h3 className="font-bold text-[#17343c] dark:text-white">
                          {service.name}
                        </h3>
                        <p className="mt-1 text-sm leading-5 text-[#70908a] dark:text-[#b6ccc5]">
                          {service.description ||
                            'A tailored service with care and attention to detail.'}
                        </p>
                        <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#41645a] dark:text-[#c4d8d1]">
                          <Clock3 className="size-3.5 text-[#0f8a62]" />
                          {duration(service)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                      <p className="text-lg font-bold text-[#17343c] dark:text-white">
                        {currency(service.price)}
                      </p>
                      <Link
                        href={client.booking.create({
                          query: { provider: provider.id, service: service.id },
                        })}
                        className="text-sm font-bold text-[#0f8a62]"
                      >
                        Book this
                      </Link>
                    </div>
                  </div>
                ))}
                {provider.services.length === 0 && (
                  <p className="py-8 text-center text-sm text-[#70908a]">
                    This provider has no active services yet.
                  </p>
                )}
              </div>
            </section>
            <aside className="rounded-2xl border border-[#dceae4] bg-white p-6 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                Opening hours
              </p>
              <h2 className="mt-1 text-xl font-bold text-[#17343c] dark:text-white">
                Plan your visit
              </h2>
              <div className="mt-5 space-y-3">
                {businessHours.length > 0 ? (
                  businessHours.map((hour) => (
                    <div
                      key={hour.day_of_week}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <span className="text-[#41645a] dark:text-[#c4d8d1]">
                        {dayName(hour.day_of_week)}
                      </span>
                      <span className="font-semibold text-[#17343c] dark:text-white">
                        {hour.is_closed
                          ? 'Closed'
                          : `${hour.opens_at?.slice(0, 5)}–${hour.closes_at?.slice(0, 5)}`}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm leading-6 text-[#70908a]">
                    Hours are confirmed when you choose a time.
                  </p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
