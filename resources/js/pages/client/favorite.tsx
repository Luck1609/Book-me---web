import { Head, Link, router } from '@inertiajs/react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Heart,
  MapPin,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNotice } from '@/contexts/notice-context';
import { useInitials } from '@/hooks/use-initials';
import client from '@/routes/client';
import type { ServiceProvider, ServiceRecord } from '@/types/app';
import ClientBookingForm from './providers/form';


function currency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function Favorite({ data }: { data: ServiceProvider[] }) {
  const { show } = useNotice()
  const getInitials = useInitials();
  const removeFavorite = (provider: ServiceProvider): void => {
    router.delete(client.providers.unfavorite(provider.slug), {
      preserveScroll: true,
      only: ['data'],
    });
  };



  const handleToggleBookingModal = (provider: ServiceProvider, service?: ServiceRecord): void => {
    show({
      type: 'modal',
      title: 'Book an appointment',
      classNames: { content: 'sm:max-w-xl' },
      content: (
        <ClientBookingForm
          provider={provider}
          service={service}
        />
      ),
    });
  };


  console.log('Provider details', data)

  return (
    <>
      <Head title="Saved providers" />

      <div className="min-h-[calc(100vh-3rem)] bg-[#f6faf8] px-4 py-6 text-[#17343c] sm:px-6 lg:px-8 lg:py-8 dark:bg-[#101917] dark:text-[#e6f1ed]">
        <div className="mx-auto max-w-7xl space-y-6 lg:space-y-8">
          <section className="relative overflow-hidden rounded-3xl bg-[#17343c] px-6 py-8 text-white shadow-[0_20px_55px_rgba(23,52,60,0.14)] sm:px-8 lg:px-10 lg:py-10">
            <div className="pointer-events-none absolute -top-24 right-0 size-72 rounded-full bg-[#0f8a62]/30 blur-3xl" />
            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Link
                  href={client.providers.index()}
                  className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-[#8fe0bb] transition hover:text-white"
                >
                  <ArrowLeft aria-hidden="true" className="size-4" />
                  Browse providers
                </Link>
                <p className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-[#8fe0bb] uppercase">
                  <Heart aria-hidden="true" className="size-4 fill-current" />
                  Your shortlist
                </p>
                <h1 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
                  Saved providers.
                  <span className="block text-[#a9c3c0]">
                    Ready when you are.
                  </span>
                </h1>
                <p className="mt-4 max-w-lg text-sm leading-6 text-[#b8c9c7] sm:text-base">
                  Keep the providers you love close by, so your next booking
                  takes only a few clicks.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  asChild
                  className="rounded-xl bg-[#8fe0bb] text-[#17343c] hover:bg-[#b9f1d3]"
                >
                  <Link href={client.providers.index()}>
                    <Search aria-hidden="true" className="size-4" />
                    Find a provider
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-xl border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                >
                  <Link href={client.booking.index()}>My bookings</Link>
                </Button>
              </div>
            </div>
          </section>

          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-[#70908a] dark:text-[#9cb8b1]">
                {data.length} {data.length === 1 ? 'provider' : 'providers'}
                saved
              </p>
              <h2 className="mt-1 text-2xl font-bold text-[#17343c] dark:text-white">
                Your favorites
              </h2>
            </div>
            <Heart
              aria-hidden="true"
              className="size-7 text-[#d46c7a] opacity-80"
            />
          </div>

          {data.length > 0 ? (
            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {data.map((provider) => (
                <article
                  key={provider.id}
                  className="overflow-hidden rounded-2xl border border-[#dceae4] bg-white shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]"
                >
                  <div className="flex h-36 items-start justify-between bg-linear-to-br from-[#d9f7e8] via-[#f3f0ff] to-[#ffead9] p-5">
                    {provider.avatar ? (
                      <img
                        src={provider.avatar}
                        alt=""
                        className="size-16 rounded-2xl object-cover ring-4 ring-white/70"
                      />
                    ) : (
                      <span className="flex size-16 items-center justify-center rounded-2xl bg-white/80 text-lg font-bold text-[#594e9e]">
                        {getInitials(provider.name)}
                      </span>
                    )}

                    <button
                      type="button"
                      aria-label={`Remove ${provider.name} from saved providers`}
                      onClick={() => removeFavorite(provider)}
                      className="flex size-10 items-center justify-center rounded-full bg-white/85 text-[#d46c7a] shadow-sm transition hover:bg-white"
                    >
                      <Heart
                        aria-hidden="true"
                        className="size-5 fill-current"
                      />
                    </button>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-[#17343c] dark:text-white">
                          {provider.name}
                        </h3>
                        <p className="mt-1 flex items-center gap-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
                          <MapPin aria-hidden="true" className="size-3.5" />
                          {provider.city || 'Local provider'}
                        </p>
                      </div>
                      <span className="rounded-full bg-[#d9f7e8] px-2.5 py-1 text-xs font-bold text-[#0f6b4d]">
                        Open
                      </span>
                    </div>

                    <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-5 text-[#70908a] dark:text-[#b6ccc5]">
                      {provider.description ||
                        'A trusted local provider ready to help you feel your best.'}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-[#e7f0ec] pt-4 dark:border-white/8">
                      <span className="text-sm text-[#41645a] dark:text-[#c4d8d1]">
                        {provider.services.length} services
                        {provider.services[0]
                          ? ` · from ${currency(provider.services[0].price as number)}`
                          : ''}
                      </span>
                      <Link
                        href={client.providers.show(provider.slug)}
                        className="flex items-center gap-1 text-sm font-bold text-[#0f8a62]"
                      >
                        View{' '}
                        <ArrowRight aria-hidden="true" className="size-4" />
                      </Link>
                    </div>

                    <Button
                      className="mt-4 w-full rounded-xl bg-[#17343c] text-white hover:bg-[#27525a]"
                      onClick={() => handleToggleBookingModal(provider)}
                    >
                      {/* <Link
                        href={client.booking.create({
                          query: { provider: provider.id },
                        })}
                      > */}
                      <CalendarDays aria-hidden="true" className="size-4" />
                      Book a visit
                      {/* </Link> */}
                    </Button>
                  </div>
                </article>
              ))}
            </section>
          ) : (
            <section className="rounded-3xl border border-dashed border-[#b9dccc] bg-white px-6 py-16 text-center shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-[#386653] dark:bg-[#17221f]">
              <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#d9f7e8] text-[#0f6b4d]">
                <Heart aria-hidden="true" className="size-7" />
              </span>
              <h2 className="mt-5 text-xl font-bold text-[#17343c] dark:text-white">
                No saved providers yet
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
                Tap the heart on a provider you love and it will appear here for
                quick access.
              </p>
              <Button asChild className="mt-6 rounded-xl">
                <Link href={client.providers.index()}>
                  <Search aria-hidden="true" className="size-4" />
                  Explore providers
                </Link>
              </Button>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
