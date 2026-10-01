import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Globe2,
  Heart,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { ServiceProvider, ServiceRecord } from '@/types/app';
import Container from '../container';

type ProviderDetailsProps = { provider?: ServiceProvider };

type DisplayService = {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: string;
  price: string;
};

const gallery = [
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=900&q=85',
];

const fallbackServices: DisplayService[] = [
  {
    id: 'signature-cut',
    name: 'Signature cut & finish',
    category: 'Hair',
    description: 'A tailored cut, wash and professional finish.',
    duration: '1 hr',
    price: 'GH₵ 180',
  },
  {
    id: 'glow-facial',
    name: 'Glow facial',
    category: 'Skin',
    description: 'A refreshing facial ritual for brighter, softer skin.',
    duration: '45 min',
    price: 'GH₵ 220',
  },
  {
    id: 'gel-manicure',
    name: 'Gel manicure',
    category: 'Nails',
    description: 'Shape, cuticle care and a long-lasting gel finish.',
    duration: '1 hr 15 min',
    price: 'GH₵ 150',
  },
  {
    id: 'deep-tissue',
    name: 'Deep tissue massage',
    category: 'Wellness',
    description: 'Focused pressure to release tension and restore balance.',
    duration: '1 hr',
    price: 'GH₵ 250',
  },
  {
    id: 'brow-shape',
    name: 'Brow shape & tint',
    category: 'Beauty',
    description: 'A polished shape and soft tint matched to your features.',
    duration: '30 min',
    price: 'GH₵ 90',
  },
];

const hours = [
  ['Monday', 'Closed'],
  ['Tuesday', '9:00 AM – 8:00 PM'],
  ['Wednesday', '9:00 AM – 8:00 PM'],
  ['Thursday', '9:00 AM – 8:00 PM'],
  ['Friday', '9:00 AM – 8:00 PM'],
  ['Saturday', '8:30 AM – 7:00 PM'],
  ['Sunday', 'Closed'],
];

function formatService(service: ServiceRecord): DisplayService {
  const price = Number(service.price);

  return {
    id: service.id,
    name: service.name,
    category: 'Featured',
    description:
      service.description || 'A considered treatment delivered with care.',
    duration:
      service.min_duration === service.max_duration
        ? `${service.min_duration} min`
        : `${service.min_duration}–${service.max_duration} min`,
    price: `GH₵ ${Number.isNaN(price) ? service.price : price.toFixed(0)}`,
  };
}

export function ProviderDetails({ provider }: ProviderDetailsProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All services');
  const [isSaved, setIsSaved] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const providerServices = provider?.services?.length
    ? provider.services.map(formatService)
    : fallbackServices;
  const categories = [
    'All services',
    ...new Set(providerServices.map((service) => service.category)),
  ];
  const visibleServices = providerServices.filter(
    (service) =>
      activeCategory === 'All services' || service.category === activeCategory,
  );
  const servicesToShow = showAllServices
    ? visibleServices
    : visibleServices.slice(0, 4);
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

        <section className="grid gap-3 lg:grid-cols-[1.45fr_0.8fr] lg:grid-rows-2">
          <div className="relative min-h-70 overflow-hidden rounded-3xl bg-[#dcebe4] lg:row-span-2 lg:min-h-130">
            <img
              src={gallery[activeImage]}
              alt={`${providerName} studio interior`}
              className="absolute inset-0 size-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-black/5" />
            <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-4">
              <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#17343c] shadow-sm backdrop-blur">
                Featured studio
              </span>
              <div className="flex gap-2">
                {gallery.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    aria-label={`View studio photo ${index + 1}`}
                    onClick={() => setActiveImage(index)}
                    className={`size-11 overflow-hidden rounded-xl border-2 transition ${activeImage === index ? 'border-white' : 'border-white/50 opacity-75 hover:opacity-100'}`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="size-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <img
            src={gallery[1]}
            alt="Treatment area"
            className="hidden h-63.5 w-full rounded-3xl object-cover lg:block"
          />
          <img
            src={gallery[2]}
            alt="Studio details"
            className="hidden h-63.5 w-full rounded-3xl object-cover lg:block"
          />
        </section>

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
          {['About', 'Services', 'Team', 'Reviews', 'Opening hours'].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="shrink-0 text-[#728b84] transition hover:text-[#0f8a62]"
              >
                {item}
              </a>
            ),
          )}
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

            <section id="services">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="mb-2 text-xs font-bold tracking-[0.16em] text-[#0f8a62] uppercase">
                    Treatments
                  </p>
                  <h2 className="text-2xl font-bold sm:text-3xl">Services</h2>
                </div>
                <span className="text-sm text-[#7b938d]">
                  {providerServices.length * 4 + 4} services available
                </span>
              </div>
              <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setActiveCategory(category);
                      setShowAllServices(false);
                    }}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${activeCategory === category ? 'bg-[#17343c] text-white dark:bg-[#d9f7e8] dark:text-[#17343c]' : 'bg-[#edf5f0] text-[#66817a] hover:bg-[#dcebe4] dark:bg-white/10 dark:text-[#b8cec5]'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="mt-4 divide-y divide-[#e4eee8] rounded-2xl border border-[#dfece5] bg-white dark:divide-white/10 dark:border-white/10 dark:bg-white/5">
                {servicesToShow.map((service) => (
                  <div
                    key={service.id}
                    className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="mb-1 text-xs font-bold text-[#0f8a62]">
                        {service.category}
                      </p>
                      <h3 className="font-bold">{service.name}</h3>
                      <p className="mt-1 text-sm text-[#78918a]">
                        {service.description}
                      </p>
                      <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#8aa099]">
                        <Clock3 className="size-3.5" />
                        {service.duration}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-5 sm:block sm:text-right">
                      <p className="font-bold">{service.price}</p>
                      <button
                        type="button"
                        onClick={() => setSelectedService(service.id)}
                        className={`mt-2 rounded-full px-4 py-2 text-xs font-bold transition ${selectedService === service.id ? 'bg-[#d9f7e8] text-[#0f8a62]' : 'border border-[#b9d8c8] text-[#0f8a62] hover:bg-[#eff9f3]'}`}
                      >
                        {selectedService === service.id ? (
                          <span className="inline-flex items-center gap-1">
                            <Check className="size-3.5" />
                            Selected
                          </span>
                        ) : (
                          'Book'
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {visibleServices.length > 4 && (
                <button
                  type="button"
                  onClick={() => setShowAllServices(!showAllServices)}
                  className="mt-4 w-full rounded-full border border-[#c9ded3] py-3 text-sm font-bold text-[#0f8a62] transition hover:bg-[#f0f8f4]"
                >
                  {showAllServices
                    ? 'Show fewer services'
                    : `See all ${visibleServices.length} services`}
                </button>
              )}
            </section>

            <section id="reviews">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-bold tracking-[0.16em] text-[#0f8a62] uppercase">
                    Kind words
                  </p>
                  <h2 className="text-2xl font-bold sm:text-3xl">Reviews</h2>
                </div>
                <div className="text-right">
                  <p className="flex items-center justify-end gap-1 text-lg font-bold">
                    <Star className="size-5 fill-[#f0b75a] text-[#f0b75a]" />
                    {rating}
                  </p>
                  <p className="text-xs text-[#7b938d]">128 reviews</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[
                  [
                    'Ama K.',
                    'The team is so welcoming and the result was exactly what I wanted. I will definitely be back.',
                    '2 weeks ago',
                  ],
                  [
                    'Nana B.',
                    'Beautiful space, easy booking and genuinely thoughtful service from start to finish.',
                    '1 month ago',
                  ],
                ].map(([name, review, date]) => (
                  <article
                    key={name}
                    className="rounded-2xl border border-[#dfece5] bg-white p-5 dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{name}</span>
                      <span className="text-xs text-[#8ca49d]">{date}</span>
                    </div>
                    <div className="mt-3 flex gap-0.5 text-[#f0b75a]">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="size-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#6f8981]">
                      {review}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
            <section
              id="opening-hours"
              className="rounded-2xl border border-[#dfece5] bg-white p-5 dark:border-white/10 dark:bg-white/5"
            >
              <h2 className="font-bold">Opening hours</h2>
              <div className="mt-4 space-y-3 text-sm">
                {hours.map(([day, time]) => (
                  <div key={day} className="flex justify-between gap-4">
                    <span className="text-[#7b938d]">{day}</span>
                    <span
                      className={
                        time === 'Closed'
                          ? 'font-medium text-[#a4b4ae]'
                          : 'font-semibold'
                      }
                    >
                      {time}
                    </span>
                  </div>
                ))}
              </div>
            </section>
            <section className="rounded-2xl border border-[#dfece5] bg-white p-5 dark:border-white/10 dark:bg-white/5">
              <h2 className="font-bold">Good to know</h2>
              <div className="mt-4 space-y-4 text-sm text-[#6f8981]">
                <p className="flex items-center gap-3">
                  <ShieldCheck className="size-4 text-[#0f8a62]" />
                  Instant confirmation
                </p>
                <p className="flex items-center gap-3">
                  <MessageCircle className="size-4 text-[#0f8a62]" />
                  Friendly, personal service
                </p>
                <p className="flex items-center gap-3">
                  <Globe2 className="size-4 text-[#0f8a62]" />
                  Accessible location
                </p>
              </div>
            </section>
            <section className="rounded-2xl bg-[#17343c] p-5 text-white shadow-[0_14px_35px_rgba(23,52,60,0.16)] dark:bg-[#1d3f3c]">
              <p className="text-xs font-bold tracking-[0.16em] text-[#a8ddbd] uppercase">
                Ready when you are
              </p>
              <h2 className="mt-2 text-xl font-bold">
                Find your next feel-good moment.
              </h2>
              <Button
                onClick={scrollToServices}
                className="mt-5 w-full bg-[#d9f7e8] text-[#17343c] hover:bg-white"
              >
                Book now
                <CalendarDays className="size-4" />
              </Button>
            </section>
            <div className="flex flex-wrap gap-4 px-1 text-sm text-[#78918a]">
              <a
                href={`tel:${provider?.phone || ''}`}
                className="inline-flex items-center gap-2 hover:text-[#0f8a62]"
              >
                <Phone className="size-4" />
                Call
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 hover:text-[#0f8a62]"
              >
                <MessageCircle className="size-4" />
                Message
              </a>
              <a
                href="#social"
                className="inline-flex items-center gap-2 hover:text-[#0f8a62]"
              >
                <Instagram className="size-4" />
                Instagram
              </a>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
