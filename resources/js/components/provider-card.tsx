import { Link } from "@inertiajs/react";
import { Heart, MapPin, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ServiceProvider } from "@/types/app";


export function ProviderCard({ provider }: { provider: ServiceProvider }) {
  const [saved, setSaved] = useState(false);

  return (
    <Link className="group overflow-hidden transition duration-300 hover:-translate-y-1">
      <div
        className={cn(
          "relative flex h-56 items-end bg-linear-to-br p-5 rounded-xl",
          provider.accent as string
        )}
      >
        {provider.featured as boolean && (
          <span className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold text-[#56716a] backdrop-blur-sm">
            <Sparkles className="size-3 text-[#c47632]" /> Featured
          </span>
        )}
        <button
          type="button"
          onClick={() => setSaved(!saved)}
          aria-label={
            saved
              ? `Remove ${provider.name} from saved`
              : `Save ${provider.name}`
          }
          aria-pressed={saved}
          className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-white/80 text-[#d46c7a] shadow-sm backdrop-blur-sm transition hover:bg-white"
        >
          <Heart className={`size-4 ${saved ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-3 space-y-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-bold tracking-[-0.03em] text-[#17343c]">
              {provider.name}
            </h2>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-[#53696b]">
            <Star className="size-3.5 fill-current text-[#f0b75a]" />
            {Number(provider.rating).toFixed(1)}
          </div>
        </div>
        <p className="flex items-center gap-1.5 text-xs text-[#78908b]">
          <MapPin className="size-3.5 text-[#0f8a62]" /> {provider.city}
        </p>

        <div className="flex gap-1 text-xs text-[#78908b] mt-1">
          <p className="font-semibold text-[#0f8a62]">
            {provider.category}
          </p>
          <span>-</span>
          <span>11 reviews</span>
        </div>

      </div>
    </Link>
  );
}
