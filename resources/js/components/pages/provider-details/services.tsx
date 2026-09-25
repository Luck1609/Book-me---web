import { Check, Clock3 } from 'lucide-react';
import { useState } from 'react'
import type { ServiceProvider, ServiceRecord } from '@/types/app';



type DisplayService = {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: string;
  price: string;
};


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

export default function Services({ provider }: {provider: ServiceProvider}) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showAllServices, setShowAllServices] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All services');


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

  return (
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
  )
}
