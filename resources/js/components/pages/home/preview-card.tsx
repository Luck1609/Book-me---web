import { Link } from '@inertiajs/react';
import { ArrowRight, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInitials } from '@/hooks/use-initials';
import { register } from '@/routes';
import type { ServiceProvider } from '@/types/app';

export function ProviderCardView({ provider }: { provider: ServiceProvider }) {
  const getInitials = useInitials();

  return (
    <article className="group overflow-hidden rounded-[22px] border border-[#e3ece7] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#b9ddca] hover:shadow-[0_18px_38px_rgba(45,86,68,0.1)]">
      <div
        className={`relative flex h-32 items-end bg-linear-to-br ${provider.accent} p-5`}
      >
        <span className="absolute top-4 left-4 rounded-full bg-white/75 px-2.5 py-1 text-[10px] font-bold text-[#56716a] backdrop-blur-sm">
          {provider.tag}
        </span>
        <div className="flex size-14 items-center justify-center rounded-2xl border-4 border-white/70 bg-[#17343c] text-sm font-bold text-white shadow-sm">
          {getInitials(provider.name as string)}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold tracking-[-0.03em] text-[#17343c]">
              {provider.name}
            </h3>
            <p className="mt-1 text-xs font-medium text-[#0f8a62]">
              {provider.category}
            </p>
          </div>
          <span className="flex items-center gap-1 text-xs font-bold text-[#53696b]">
            <Star
              aria-hidden="true"
              className="size-3 fill-current text-[#f0b75a]"
            />
            {provider.rating}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#edf2ef] pt-4 text-xs text-[#78908b]">
          <span className="flex items-center gap-1.5">
            <MapPin aria-hidden="true" className="size-3.5 text-[#0f8a62]" />
            {provider.city}
          </span>
          {/* <span className="font-semibold text-[#53696b]">{provider.price}</span> */}
        </div>

        <Link href={register()} className="mt-4 block">
          <Button className="w-full" variant="default-soft">
            Book a service
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Button>
        </Link>
      </div>
    </article>
  );
}
