import { Head, Link } from '@inertiajs/react';
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CreditCard,
  MessageCircleMore,
  Search,
  Star,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import Container from '@/components/container';
import { register } from '@/routes';
import type { ServiceProvider } from '@/types/app';
import CTA from './cta';
import FeaturedCarousel from './featured-carousel';
import Hero from './hero';
import HowItWorks from './how-it-works';
import Solutions from './solutions';
import Stories from './stories';

const features = [
  {
    title: 'Your calendar, finally calm',
    description:
      'Keep your availability in one place and stop playing calendar ping-pong across Accra and beyond.',
    icon: CalendarDays,
    color: 'bg-[#e3f6ee] text-[#0f8a62]',
  },
  {
    title: 'Clients book on their time',
    description:
      'Give people a simple, branded booking experience that works around the clock, even while you sleep.',
    icon: Users,
    color: 'bg-[#fce9df] text-[#c85c34]',
  },
  {
    title: 'Fewer no-shows, more yeses',
    description:
      'WhatsApp-friendly confirmations and reminders help keep every appointment moving forward.',
    icon: MessageCircleMore,
    color: 'bg-[#ece8ff] text-[#6253c7]',
  },
  {
    title: 'Get paid without the chase',
    description:
      'Collect deposits in Ghana cedis at booking and keep your business cash flow clear.',
    icon: CreditCard,
    color: 'bg-[#fff2cc] text-[#b98514]',
  },
];

const featuredProviders: ServiceProvider[] = [
  {
    name: "Ama's Beauty Bar",
    category: 'Hair & beauty',
    city: 'East Legon, Accra',
    rating: '4.9',
    price: 'From GHS 120',
    initials: 'AB',
    accent: 'from-[#d8f4e7] to-[#f8dccd]',
    tag: 'Popular this week',
  },
  {
    name: 'The Grooming Club GH',
    category: 'Barbering',
    city: 'Osu, Accra',
    rating: '4.8',
    price: 'From GHS 70',
    initials: 'GC',
    accent: 'from-[#d9e6f5] to-[#eee3d0]',
    tag: 'Featured space',
  },
  {
    name: 'Kente & Co. Studio',
    category: 'Photography',
    city: 'Ahodwo, Kumasi',
    rating: '5.0',
    price: 'From GHS 250',
    initials: 'KC',
    accent: 'from-[#f7e0ba] to-[#e4e6f7]',
    tag: 'Top rated',
  },
];

const trendingProviders: ServiceProvider[] = [
  {
    name: 'Nhyira Nails & Spa',
    category: 'Nails & wellness',
    city: 'Spintex, Accra',
    rating: '4.9',
    price: 'From GHS 90',
    initials: 'NN',
    accent: 'from-[#f5d9e8] to-[#d8f2e9]',
    tag: 'Trending now',
  },
  {
    name: 'The Soft Life Studio',
    category: 'Massage & wellness',
    city: 'Cantonments, Accra',
    rating: '4.8',
    price: 'From GHS 180',
    initials: 'SL',
    accent: 'from-[#d9eef2] to-[#f4e0c8]',
    tag: 'New on Book Me',
  },
  {
    name: 'Kumasi Lens House',
    category: 'Creative studio',
    city: 'Adum, Kumasi',
    rating: '4.9',
    price: 'From GHS 200',
    initials: 'KL',
    accent: 'from-[#e5ddf5] to-[#f3e4d1]',
    tag: 'Rising star',
  },
];

export function LandingPage() {
  const [providerSearch, setProviderSearch] = useState('');
  const searchTerm = providerSearch.trim().toLowerCase();
  const filterProviders = (providers: ServiceProvider[]): ServiceProvider[] =>
    providers.filter((provider) =>
      [provider.name, provider.category, provider.city]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm),
    );

  const visibleFeaturedProviders = filterProviders(featuredProviders);
  const visibleTrendingProviders = filterProviders(trendingProviders);

  return (
    <>
      <Head title="Simple booking for Ghanaian businesses" />

      <Hero />

      <section className="border-y border-[#e8eeeb] bg-white px-5 py-8 sm:px-8 lg:px-12">
        <Container className="mx-auto flex flex-col items-center justify-between gap-5 md:flex-row">
          <p className="text-center text-[11px] font-bold tracking-widest text-[#91a09f] uppercase md:text-left">
            Loved by independent businesses across Ghana
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm font-bold tracking-[-0.03em] text-[#a4b2b0] sm:gap-x-10">
            <span>AMAS BEAUTY</span>
            <span>Accra Lens</span>
            <span className="font-serif italic">Kente & Co.</span>
            <span>
              KUMASI<span className="text-[#0f8a62]">/</span>CREATIVE
            </span>
            <span className="flex items-center gap-1">
              <Star
                aria-hidden="true"
                className="size-3 fill-current text-[#f0b75a]"
              />{' '}
              4.9 average
            </span>
          </div>
        </Container>
      </section>

      <section
        id="providers"
        className="scroll-mt-20 bg-[#fbfcfa] px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 text-[11px] font-bold tracking-[0.14em] text-[#0f8a62] uppercase">
              Find your next favourite place
            </p>
            <h2 className="text-4xl leading-[1.05] font-bold tracking-[-0.055em] text-[#17343c] sm:text-5xl">
              Great people are already taking bookings.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#708081]">
              Search salons, barbers, studios, wellness spaces, and creatives
              around Ghana. Your next appointment is closer than you think.
            </p>
            <div className="mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-2xl border border-[#d9e8df] bg-white px-4 py-3.5 text-left shadow-[0_10px_30px_rgba(45,86,68,0.06)] focus-within:border-[#76c9a2] focus-within:ring-4 focus-within:ring-[#dff4e9]">
              <Search
                aria-hidden="true"
                className="size-5 shrink-0 text-[#0f8a62]"
              />
              <input
                aria-label="Search providers"
                value={providerSearch}
                onChange={(event) => setProviderSearch(event.target.value)}
                placeholder="Search by service, provider, or city"
                className="w-full bg-transparent text-sm text-[#17343c] outline-none placeholder:text-[#9aaba6]"
              />
              <span className="hidden shrink-0 rounded-lg bg-[#f2f8f5] px-2 py-1 text-[10px] font-bold text-[#729088] sm:block">
                {searchTerm
                  ? `${visibleFeaturedProviders.length + visibleTrendingProviders.length} found`
                  : 'Ghana'}
              </span>
            </div>
          </div>

          <FeaturedCarousel
            title="Featured providers"
            subHeading="Handpicked for you"
            providers={visibleFeaturedProviders}
            action={
              <Link
                href={register()}
                className="hidden items-center gap-1 text-sm font-bold text-[#0f8a62] sm:flex"
              >
                See all providers{' '}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            }
          />

          <FeaturedCarousel
            title="Trending providers"
            subHeading="People are talking"
            providers={visibleTrendingProviders}
            action={
              <span className="hidden items-center gap-1 text-xs font-semibold text-[#78908b] sm:flex">
                <span className="size-2 rounded-full bg-[#f0b75a]" /> Updated
                weekly
              </span>
            }
          />
        </Container>
      </section>

      <HowItWorks />

      <section
        id="features"
        className="scroll-mt-20 bg-[#fbfcfa] px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
      >
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="mb-5 text-[11px] font-bold tracking-[0.14em] text-[#0f8a62] uppercase">
                Built around your business
              </p>
              <h2 className="text-4xl leading-[1.05] font-bold tracking-[-0.055em] text-[#17343c] sm:text-5xl">
                Less admin. More time for your people.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#708081]">
              A thoughtful toolkit for Ghanaian professionals and teams who care
              about every client touchpoint.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ title, description, icon: Icon, color }) => (
              <div
                key={title}
                className="group rounded-[22px] border border-[#e4ece7] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#b8ddca] hover:shadow-[0_16px_35px_rgba(45,86,68,0.08)]"
              >
                <div
                  className={`flex size-11 items-center justify-center rounded-2xl ${color}`}
                >
                  <Icon aria-hidden="true" className="size-5" />
                </div>
                <h3 className="mt-7 text-lg font-bold tracking-[-0.03em] text-[#17343c]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#768687]">
                  {description}
                </p>
                <span className="mt-7 flex items-center gap-1 text-xs font-bold text-[#0f8a62] opacity-0 transition group-hover:opacity-100">
                  Learn more{' '}
                  <ArrowRight aria-hidden="true" className="size-3" />
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Solutions />

      <Stories />

      <CTA />
    </>
  );
}
