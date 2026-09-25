import type { ReactNode } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { ServiceProvider } from '@/types/app';
import { ProviderCardView } from './preview-card';

type Props = {
  title: string;
  subHeading: string;
  providers: ServiceProvider[];
  action?: ReactNode;
};
export default function FeaturedCarousel({
  providers,
  title,
  subHeading,
  action = <></>,
}: Props) {
  return (
    <>
      <div className="mt-14 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold tracking-[0.14em] text-[#c47632] uppercase">
            {subHeading}
          </p>
          <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#17343c] sm:text-3xl">
            {title}
          </h3>
        </div>

        {action}
      </div>
      <Carousel opts={{ align: 'start' }} className="mt-6 px-1 sm:px-2">
        <CarouselContent className="-ml-4">
          {providers.map((provider) => (
            <CarouselItem
              key={provider.name}
              className="basis-[88%] pl-4 sm:basis-[48%] lg:basis-[32%]"
            >
              <ProviderCardView provider={provider} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-2 border-[#d9e8df] bg-white text-[#0f8a62] shadow-md hover:bg-[#f0f8f4] sm:-left-4" />
        <CarouselNext className="-right-2 border-[#d9e8df] bg-white text-[#0f8a62] shadow-md hover:bg-[#f0f8f4] sm:-right-4" />
      </Carousel>
    </>
  );
}
