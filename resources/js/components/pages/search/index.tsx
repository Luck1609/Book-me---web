import { Head, Link } from '@inertiajs/react';
import {
  ChevronDown,
  Search as SearchIcon,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import type { ReactNode } from 'react';
import Container from '@/components/container';
import Heading from '@/components/heading';
import { ProviderCard } from '@/components/provider-card';
import Search from '@/components/search';
import GuestLayout from '@/layouts/guest';
import { cn } from '@/lib/utils';
import { home } from '@/routes';
import type { ServiceProvider } from '@/types/app';

const providers: ServiceProvider[] = [
  {
    name: "Ama's Beauty Bar",
    category: 'Hair',
    city: 'East Legon, Accra',
    rating: 4.9,
    reviews: 126,
    price: 120,
    duration: '1 hr 30 min',
    initials: 'AB',
    accent: 'from-[#d8f4e7] to-[#f8dccd]',
    featured: true,
  },
  {
    name: 'The Grooming Club GH',
    category: 'Barbering',
    city: 'Osu, Accra',
    rating: 4.8,
    reviews: 94,
    price: 70,
    duration: '45 min',
    initials: 'GC',
    accent: 'from-[#d9e6f5] to-[#eee3d0]',
    featured: true,
  },
  {
    name: 'Kente & Co. Studio',
    category: 'Photography',
    city: 'Ahodwo, Kumasi',
    rating: 5,
    reviews: 68,
    price: 250,
    duration: '1 hr',
    initials: 'KC',
    accent: 'from-[#f7e0ba] to-[#e4e6f7]',
    featured: true,
  },
  {
    name: 'Nhyira Nails & Spa',
    category: 'Nails',
    city: 'Spintex, Accra',
    rating: 4.9,
    reviews: 81,
    price: 90,
    duration: '1 hr',
    initials: 'NN',
    accent: 'from-[#f5d9e8] to-[#d8f2e9]',
  },
  {
    name: 'The Soft Life Studio',
    category: 'Wellness',
    city: 'Cantonments, Accra',
    rating: 4.8,
    reviews: 52,
    price: 180,
    duration: '1 hr',
    initials: 'SL',
    accent: 'from-[#d9eef2] to-[#f4e0c8]',
  },
  {
    name: 'Kumasi Lens House',
    category: 'Photography',
    city: 'Adum, Kumasi',
    rating: 4.9,
    reviews: 47,
    price: 200,
    duration: '1 hr 30 min',
    initials: 'KL',
    accent: 'from-[#e5ddf5] to-[#f3e4d1]',
  },
  {
    name: 'Braids by Esi',
    category: 'Hair',
    city: 'Madina, Accra',
    rating: 4.7,
    reviews: 39,
    price: 160,
    duration: '2 hr',
    initials: 'BE',
    accent: 'from-[#f1dfd2] to-[#d8edf2]',
  },
  {
    name: 'Nana Menspa',
    category: 'Wellness',
    city: 'Koforidua',
    rating: 4.8,
    reviews: 31,
    price: 140,
    duration: '1 hr',
    initials: 'NM',
    accent: 'from-[#dcebd5] to-[#f4e1ed]',
  },
];

const categories = [
  'All services',
  'Hair',
  'Nails',
  'Barbering',
  'Wellness',
  'Photography',
];

export function SearchListing() {
  return (
    <>
      <Head title="Find a provider" />

      <main className="min-h-screen bg-[#f7faf8] px-4 py-6 text-[#17343c] sm:px-6 lg:px-8 lg:py-10">
        <Container>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#7b938d]">
            <Link href={home()} className="transition hover:text-[#0f8a62]">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#17343c]">Search</span>
          </div>

          <Heading
            title={
              <>
                <p className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-primary uppercase">
                  <Sparkles className="size-4" /> Discover local talent
                </p>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Find your next appointment.
                </h1>
              </>
            }
            description=""
            classNames={{
              container: 'mt-6',
              title: 'text-3xl font-bold tracking-tighter sm:text-5xl',
            }}
          />

          <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                // onClick={() => setCategory(item)}
                className={cn(
                  'flex shrink-0 rounded-full border px-4 py-2.5 text-xs font-bold transition',
                  // category === item
                  //   ? 'border-[#17343c] bg-[#17343c] text-white'
                  //   : 'border-[#dceae4] bg-white text-[#607873] hover:border-[#9fcbb5] hover:text-[#0f8a62]'
                )}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 border-b border-[#e1ece6] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-[#70908a]">8 providers available</p>
              <h2 className="mt-1 text-2xl font-bold tracking-[-0.04em]">
                Matching your search
                {/* {query || category !== 'All services'
                  ? 'Matching your search'
                  : 'Popular near you'} */}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex items-center rounded-xl border border-[#dceae4] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#53696b]"
              >
                <SlidersHorizontal className="mr-2 size-4" /> Filters
              </button>
              <label className="inline-flex items-center rounded-xl border border-[#dceae4] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#53696b]">
                <span className="mr-2 text-[#8ca09b]">Sort by</span>
                <select
                  // value={sort}
                  // onChange={(event) => setSort(event.target.value)}
                  className="appearance-none bg-transparent outline-none"
                >
                  <option>Recommended</option>
                  <option>Top rated</option>
                  <option>Most reviewed</option>
                </select>
                <ChevronDown className="ml-2 size-4" />
              </label>
            </div>
          </div>

          {providers.length > 0 ? (
            <section className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {providers.map((provider) => (
                <ProviderCard key={provider.name} provider={provider} />
              ))}
            </section>
          ) : (
            <div className="mt-6 rounded-[22px] border border-dashed border-[#b9dccc] bg-white p-14 text-center">
              <SearchIcon className="mx-auto size-9 text-[#0f8a62]" />
              <h2 className="mt-4 font-bold">No providers found</h2>
              <p className="mt-1 text-sm text-[#78908b]">
                Try another service, city, or search term.
              </p>
              <button
                type="button"
                // onClick={clearFilters}
                className="mt-5 rounded-full bg-[#0f8a62] px-5 py-2.5 text-sm font-bold text-white"
              >
                Clear filters
              </button>
            </div>
          )}
        </Container>
      </main>
    </>
  );
}

SearchListing.layout = (page: ReactNode) => (
  <GuestLayout component={<Search />}>{page}</GuestLayout>
);
