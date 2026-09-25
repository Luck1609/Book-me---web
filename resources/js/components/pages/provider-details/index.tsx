import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  Heart,
  MapPin,
  Share2,
  Star,
} from 'lucide-react';
import { useState } from 'react';
import Container from '@/components/container';
import { Button } from '@/components/ui/button';
import type { ServiceProvider } from '@/types/app';
import Aside from './aside';
import Gallery from './gallery';
import Portfolio from './portfolio';
import Reviews from './reviews';
import Services from './services';

type ProviderDetailsProps = {
  provider?: ServiceProvider;
  portfolioImages?: string[];
};

export function ProviderDetails({
  provider,
}: ProviderDetailsProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const providerName = provider?.name || 'The Olive Room';
  const providerAddress =
    provider?.address || provider?.city || '12 Independence Avenue, Accra';
  const providerCategory = provider?.category || 'Beauty & wellness studio';
  const providerDescription =
    provider?.description ||
    'A calm, considered space for hair, skin and wellness rituals. Our experienced team creates personal treatments that fit beautifully into your day.';
  const rating = provider?.rating ? Number(provider.rating).toFixed(1) : '4.9';


  const scrollToServices = (): void => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#fbfcfa] text-[#17343c] dark:bg-[#111917] dark:text-[#e5f2ed]">
      <Container className="py-5 lg:py-8">
        <div className="mb-5 flex items-center justify-between">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#66817a] transition hover:text-[#0f8a62]"
          >
            <ArrowLeft className="size-4" />
            Back to providers
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#66817a] transition hover:text-[#0f8a62]"
          >
            <Share2 className="size-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>

        <Gallery />

        <section className="relative border-b border-[#dfebe5] py-7 sm:py-9 dark:border-white/10">
          <div className="max-w-3xl">
            <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[#718b84]">
              <span className="font-semibold text-[#0f8a62]">
                {providerCategory}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-bold text-[#17343c] dark:text-white">
                <Star className="size-4 fill-[#f0b75a] text-[#f0b75a]" />
                {rating}
              </span>
              <span>(128 reviews)</span>
              <span>•</span>
              <span className="text-[#0f8a62]">Open until 8:00 PM</span>
            </div>
            <h1 className="text-3xl font-bold tracking-[-0.045em] sm:text-5xl">
              {providerName}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-sm text-[#6d8780]">
              <MapPin className="size-4 text-[#0f8a62]" />
              {providerAddress}
            </p>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 lg:absolute lg:right-0 lg:bottom-8 lg:mt-0">
            <button
              type="button"
              aria-label={isSaved ? 'Remove from saved' : 'Save provider'}
              aria-pressed={isSaved}
              onClick={() => setIsSaved(!isSaved)}
              className="flex size-11 items-center justify-center rounded-full border border-[#d9e7e0] bg-white text-[#d46c7a] transition hover:bg-[#fff3f4] dark:border-white/10 dark:bg-white/5"
            >
              <Heart className={`size-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <Button onClick={scrollToServices} className="h-11 px-6">
              <CalendarDays className="size-4" />
              Book an appointment
            </Button>
          </div>
        </section>

        <nav
          className="sticky top-0 z-10 -mx-4 flex gap-6 overflow-x-auto border-b border-[#dfebe5] bg-[#fbfcfa]/95 px-4 py-4 text-sm font-semibold backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 dark:border-white/10 dark:bg-[#111917]/95"
          aria-label="Provider sections"
        >
          {[
            'About',
            'Portfolio',
            'Services',
            'Team',
            'Reviews',
            'Opening hours',
          ].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="shrink-0 text-[#728b84] transition hover:text-[#0f8a62]"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="grid gap-10 py-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:py-12">
          <div className="min-w-0 space-y-12">
            <section id="about">
              <p className="mb-2 text-xs font-bold tracking-[0.16em] text-[#0f8a62] uppercase">
                About the studio
              </p>
              <h2 className="text-2xl font-bold sm:text-3xl">
                A little time, just for you.
              </h2>
              <p
                className={`mt-4 max-w-2xl text-sm leading-7 text-[#69827b] dark:text-[#b5cbc3] ${showAbout ? '' : 'line-clamp-3'}`}
              >
                {providerDescription} We believe the best appointments feel
                personal from the moment you arrive, with thoughtful advice,
                quality products and a team that listens.
              </p>
              <button
                type="button"
                onClick={() => setShowAbout(!showAbout)}
                className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#0f8a62]"
              >
                {showAbout ? 'Show less' : 'Read more'}
                <ChevronDown
                  className={`size-4 transition ${showAbout ? 'rotate-180' : ''}`}
                />
              </button>
            </section>


            <Services provider={provider as ServiceProvider} />

            <Reviews />

            <Portfolio />
          </div>

          <Aside />
        </div>
      </Container>

    </main>
  );
}
