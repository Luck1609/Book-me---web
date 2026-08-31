import { Head, Link, router } from '@inertiajs/react';
import { ArrowRight, MapPin, Search, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import client from '@/routes/client';

type Provider = {
  id: string;
  slug: string;
  business_name: string;
  description: string | null;
  city: string | null;
  avatar: string | null;
  services: { id: string; name: string; price: number }[];
};

type Paginator = {
  data: Provider[];
  links: { url: string | null; label: string; active: boolean }[];
  total: number;
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

export default function ProviderIndex({
  providers,
  filters,
}: {
  providers: Paginator;
  filters: { search: string };
}) {
  const [search, setSearch] = useState(filters.search);
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;

      return;
    }

    const timeout = window.setTimeout(
      () =>
        router.visit(
          client.providers.index({
            query: search.trim() ? { search: search.trim() } : {},
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

  return (
    <>
      <Head title="Find a provider" />
      <main className="min-h-[calc(100vh-3rem)] bg-[#f6faf8] px-4 py-6 text-[#17343c] sm:px-6 lg:px-8 lg:py-8 dark:bg-[#101917] dark:text-[#e6f1ed]">
        <div className="mx-auto max-w-7xl space-y-6 lg:space-y-8">
          <section className="rounded-3xl bg-[#17343c] px-6 py-8 text-white shadow-[0_20px_55px_rgba(23,52,60,0.14)] sm:px-8 lg:px-10">
            <p className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-[#8fe0bb] uppercase">
              <Sparkles className="size-4" />
              Explore self-care
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Find your next provider.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#b8c9c7] sm:text-base">
              Search by shop, service, or city and book directly from a
              provider&apos;s live availability.
            </p>
            <div className="mt-6 flex max-w-2xl items-center gap-3 rounded-2xl bg-white px-4 py-3 text-[#17343c]">
              <Search className="size-5 text-[#0f8a62]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search provider, service, or city"
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#91aaa2]"
              />
            </div>
          </section>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#70908a] dark:text-[#9cb8b1]">
                {providers.total} providers available
              </p>
              <h2 className="mt-1 text-2xl font-bold text-[#17343c] dark:text-white">
                Browse trusted spaces
              </h2>
            </div>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href={client.booking.index()}>My bookings</Link>
            </Button>
          </div>
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {providers.data.map((provider) => (
              <article
                key={provider.id}
                className="overflow-hidden rounded-2xl border border-[#dceae4] bg-white shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]"
              >
                <div className="h-36 bg-gradient-to-br from-[#d9f7e8] via-[#f3f0ff] to-[#ffead9] p-5">
                  {provider.avatar ? (
                    <img
                      src={provider.avatar}
                      alt=""
                      className="size-16 rounded-2xl object-cover ring-4 ring-white/70"
                    />
                  ) : (
                    <span className="flex size-16 items-center justify-center rounded-2xl bg-white/80 text-lg font-bold text-[#594e9e]">
                      {initials(provider.business_name)}
                    </span>
                  )}
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
