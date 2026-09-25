import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { gallery } from './data';

export default function Gallery() {
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);

  const showPreviousImage = (): void => {
    setLightboxImage((current) =>
      current === null ? 0 : (current - 1 + gallery.length) % gallery.length,
    );
  };

  const showNextImage = (): void => {
    setLightboxImage((current) =>
      current === null ? 0 : (current + 1) % gallery.length,
    );
  };

  return (
    <section className="grid gap-3 lg:grid-cols-[1.45fr_0.8fr] lg:grid-rows-2">
      <div className="relative min-h-70 overflow-hidden rounded-3xl bg-[#dcebe4] lg:row-span-2 lg:min-h-130">
        <button
          type="button"
          className="absolute inset-0 size-full cursor-zoom-in"
          aria-label="View studio photo larger"
          onClick={() => setLightboxImage(activeImage)}
        >
          <img
            src={gallery[activeImage]}
            alt="Studio interior"
            className="size-full object-cover transition duration-500 hover:scale-105"
          />
        </button>

        <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-black/5" />
        <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-4">
          <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#17343c] shadow-sm backdrop-blur">
            Featured studio
          </span>
          <div className="flex max-w-[calc(100%-8rem)] [scrollbar-width:none] gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
            {gallery.map((image, index) => (
              <button
                key={image}
                type="button"
                aria-label={`View studio photo ${index + 1}`}
                onClick={() => {
                  setActiveImage(index);
                  setLightboxImage(index);
                }}
                className={`size-11 shrink-0 overflow-hidden rounded-xl border-2 transition ${activeImage === index ? 'border-white' : 'border-white/50 opacity-75 hover:opacity-100'}`}
              >
                <img src={image} alt="" className="size-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
      {[1, 2].map((index) => (
        <button
          key={gallery[index]}
          type="button"
          className="group relative hidden h-63.5 w-full overflow-hidden rounded-3xl lg:block"
          aria-label={`View studio photo ${index + 1} larger`}
          onClick={() => {
            setActiveImage(index);
            setLightboxImage(index);
          }}
        >
          <img
            src={gallery[index]}
            alt={index === 1 ? 'Treatment area' : 'Studio details'}
            className="size-full object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
        </button>
      ))}

      {lightboxImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#10231f]/85 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Studio photo preview"
          tabIndex={-1}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              showPreviousImage();
            }

            if (event.key === 'ArrowRight') {
              showNextImage();
            }

            if (event.key === 'Escape') {
              setLightboxImage(null);
            }
          }}
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            className="absolute top-5 right-5 flex size-10 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
            aria-label="Close studio photo preview"
            onClick={() => setLightboxImage(null)}
          >
            <X className="size-5" />
          </button>
          <button
            type="button"
            className="absolute left-3 flex size-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:left-6"
            aria-label="Previous studio photo"
            onClick={(event) => {
              event.stopPropagation();
              showPreviousImage();
            }}
          >
            <ChevronLeft className="size-6" />
          </button>
          <div
            className="flex max-w-5xl flex-col items-center gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={gallery[lightboxImage]}
              alt={`Studio photo ${lightboxImage + 1}`}
              className="max-h-[72vh] max-w-[82vw] rounded-2xl object-contain shadow-2xl"
            />
            <div className="flex max-w-[82vw] snap-x snap-mandatory [scrollbar-width:none] gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {gallery.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className={`size-14 shrink-0 snap-center overflow-hidden rounded-xl border-2 transition ${index === lightboxImage ? 'border-white' : 'border-white/30 opacity-60 hover:opacity-100'}`}
                  aria-label={`View studio photo ${index + 1}`}
                  onClick={() => setLightboxImage(index)}
                >
                  <img
                    src={image}
                    alt={`Studio photo ${index + 1}`}
                    className="size-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="absolute right-3 flex size-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:right-6"
            aria-label="Next studio photo"
            onClick={(event) => {
              event.stopPropagation();
              showNextImage();
            }}
          >
            <ChevronRight className="size-6" />
          </button>
          <span className="absolute bottom-5 rounded-full bg-black/35 px-3 py-1 text-xs font-semibold text-white">
            {lightboxImage + 1} / {gallery.length}
          </span>
        </div>
      )}
    </section>
  );
}
