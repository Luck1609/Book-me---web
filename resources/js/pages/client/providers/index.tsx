import { Head, Link, router } from '@inertiajs/react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useInitials } from '@/hooks/use-initials';
import client from '@/routes/client';

type Provider = {
  id: string;
  slug: string;
  business_name: string;
  description: string | null;
  city: string | null;
  avatar: string | null;
  is_favorite: boolean;
  services: { id: string; name: string; price: number }[];
};

type Paginator = {
  data: Provider[];
  links: { url: string | null; label: string; active: boolean }[];
  total: number;
};

const categories = [
  'All services',
  'Hair',
  'Nails',
  'Barbering',
  'Wellness',
  'Photography',
];

function currency(amount: number): string {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ProviderIndex({
  providers,
  filters,
}: {
  providers: Paginator;
  filters: { search: string; favorites: boolean };
}) {
  const [search, setSearch] = useState(filters.search);
  const initialRender = useRef(true);
  const favoritesFilter = useRef(filters.favorites);
  const getInitials = useInitials();

  useEffect(() => {
    favoritesFilter.current = filters.favorites;
  }, [filters.favorites]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;

      return;
    }

    const timeout = window.setTimeout(
      () =>
        router.visit(
          client.providers.index({
            query: {
              ...(favoritesFilter.current ? { favorites: true } : {}),
              ...(search.trim() ? { search: search.trim() } : {}),
            },
          }),
          {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            only: ['providers', 'filters'],
          },
        ),
      300,
    );

    return () => window.clearTimeout(timeout);
  }, [search]);

  const toggleFavorite = (provider: Provider): void => {
    if (provider.is_favorite) {
      router.delete(client.providers.unfavorite(provider.slug), {
        preserveScroll: true,
        only: ['providers', 'filters'],
      });

      return;
    }

    router.post(
      client.providers.favorite(provider.slug),
      {},
      {
        preserveScroll: true,
        only: ['providers', 'filters'],
      },
    );
  };

  return (
    <>
      <Head title="Find a provider" />
      <main className="min-h-[calc(100vh-3rem)] bg-[#f7faf8] px-4 py-5 text-[#17343c] sm:px-6 lg:px-8 lg:py-8 dark:bg-[#101917] dark:text-[#e6f1ed]">
        <div className="mx-auto max-w-7xl space-y-6 lg:space-y-8">
          <nav
            className="flex items-center gap-2 text-xs font-semibold text-[#7b938d]"
            aria-label="Breadcrumb"
          >
            <Link
              href={client.index()}
              className="transition hover:text-[#0f8a62]"
            >
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#17343c] dark:text-[#e6f1ed]">
              Find a provider
            </span>
          </nav>

          <section className="rounded-[28px] border border-[#dfece5] bg-white px-5 py-7 shadow-[0_12px_35px_rgba(23,52,60,0.05)] sm:px-8 sm:py-9 lg:px-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-[#0f8a62] uppercase">
                  <Sparkles className="size-4" />
                  Book local, feel good
                </p>
                <h1 className="text-3xl font-bold tracking-[-0.045em] sm:text-4xl">
                  Find your next appointment.
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-[#70908a] sm:text-base">
                  Discover trusted providers in Ghana and book a time that works
                  for you.
                </p>
              </div>
              <Link
                href={client.booking.index()}
                className="hidden items-center gap-2 text-sm font-bold text-[#0f8a62] sm:flex"
              >
                View my bookings <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="mt-7 flex flex-col gap-3 rounded-2xl border border-[#d9e8df] bg-[#f8fcfa] p-3 sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-3 rounded-xl bg-white px-4 py-3 text-[#17343c] shadow-sm">
                <Search
                  aria-hidden="true"
                  className="size-5 shrink-0 text-[#0f8a62]"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search provider, service, or city"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#91aaa2]"
                />
              </div>
              <button
                type="button"
                className="flex items-center justify-between gap-3 rounded-xl border border-[#dceae4] bg-white px-4 py-3 text-left text-sm font-semibold text-[#53696b] shadow-sm sm:w-44"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="size-4 text-[#0f8a62]" /> Accra
                </span>
                <ChevronDown className="size-4 text-[#91aaa2]" />
              </button>
              <button
                type="button"
                onClick={() => setSearch((value) => value.trim())}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#0f8a62] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_18px_rgba(15,138,98,0.18)] transition hover:bg-[#0b7653]"
              >
                Search
              </button>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {categories.map((category) => {
                const isActive =
                  category === 'All services'
                    ? search === ''
                    : search.toLowerCase() === category.toLowerCase();

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      setSearch(category === 'All services' ? '' : category)
                    }
                    className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-bold transition ${isActive ? 'border-[#17343c] bg-[#17343c] text-white' : 'border-[#dceae4] bg-white text-[#607873] hover:border-[#9fcbb5] hover:text-[#0f8a62]'}`}
                  >
                    {isActive && (
                      <Check aria-hidden="true" className="size-3.5" />
                    )}
                    {category}
                  </button>
                );
              })}
            </div>
          </section>
          <div className="flex flex-col gap-4 border-b border-[#e1ece6] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-[#70908a] dark:text-[#9cb8b1]">
                {providers.total} providers available
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-[-0.04em] text-[#17343c] dark:text-white">
                {search ? `Results for “${search}”` : 'Popular near you'}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                asChild
                variant="outline"
                className="rounded-xl border-[#dceae4] bg-white text-[#53696b]"
              >
                <Link
                  href={client.providers.index({
                    query: filters.favorites ? {} : { favorites: true },
                  })}
                >
                  <Heart className="mr-2 size-4" />
                  {filters.favorites ? 'All providers' : 'Saved providers'}
                </Link>
              </Button>
              <button
                type="button"
                className="inline-flex items-center rounded-xl border border-[#dceae4] bg-white px-3.5 py-2 text-sm font-semibold text-[#53696b]"
              >
                <SlidersHorizontal className="mr-2 size-4" /> Filters
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-xl border border-[#dceae4] bg-white px-3.5 py-2 text-sm font-semibold text-[#53696b]"
              >
                Recommended <ChevronDown className="ml-2 size-4" />
              </button>
            </div>
          </div>
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {providers.data.map((provider) => (
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
                      {getInitials(provider.business_name)}
                    </span>
                  )}
                  <button
                    type="button"
                    aria-label={
                      provider.is_favorite
                        ? `Remove ${provider.business_name} from saved providers`
                        : `Save ${provider.business_name}`
                    }
                    aria-pressed={provider.is_favorite}
                    onClick={() => toggleFavorite(provider)}
                    className="flex size-10 items-center justify-center rounded-full bg-white/85 text-[#d46c7a] shadow-sm transition hover:bg-white"
                  >
                    <Heart
                      aria-hidden="true"
                      className={`size-5 ${provider.is_favorite ? 'fill-current' : ''}`}
                    />
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-[#17343c] dark:text-white">
                        {provider.business_name}
                      </h3>
                      <p className="mt-1 flex items-center gap-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
                        <MapPin className="size-3.5" />
                        {provider.city || 'Local provider'}
                      </p>
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-[#d9f7e8] px-2.5 py-1 text-xs font-bold text-[#0f6b4d]">
                      <Star className="size-3 fill-current text-[#c68b28]" />{' '}
                      4.9
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
                        ? ` · from ${currency(provider.services[0].price)}`
                        : ''}
                    </span>
                    <Link
                      href={client.providers.show(provider.slug)}
                      className="flex items-center gap-1 text-sm font-bold text-[#0f8a62]"
                    >
                      View <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
            {providers.data.length === 0 && (
              <div className="rounded-2xl border border-dashed border-[#b9dccc] p-12 text-center md:col-span-2 xl:col-span-3">
                <Search className="mx-auto size-8 text-[#0f8a62]" />
                <p className="mt-3 font-bold">
                  No providers match that search.
                </p>
                <p className="mt-1 text-sm text-[#70908a]">
                  Try a different service, city, or provider name.
                </p>
              </div>
            )}
          </section>

          {providers.links.length > 3 && (
            <nav
              className="flex flex-wrap justify-center gap-2"
              aria-label="Provider pages"
            >
              {providers.links.map((link) =>
                link.url ? (
                  <Link
                    key={link.label}
                    href={link.url}
                    className={`rounded-lg px-3 py-2 text-sm ${link.active ? 'bg-[#17343c] text-white' : 'border border-[#dceae4] bg-white text-[#41645a] dark:border-white/10 dark:bg-[#17221f] dark:text-[#c4d8d1]'}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                ) : (
                  <span
                    key={link.label}
                    className="px-3 py-2 text-sm text-[#91aaa2]"
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                ),
              )}
            </nav>
          )}
        </div>
      </main>
    </>
  );
}
