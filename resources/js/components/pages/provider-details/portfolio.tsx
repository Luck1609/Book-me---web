import React, { useState } from 'react'
import { gallery } from './data';

export default function Portfolio() {
  const [activePortfolioImage, setActivePortfolioImage] = useState<number | null>(null);

  const portfolio = gallery?.length
    ? gallery
    : [gallery[3], gallery[1], gallery[2], gallery[0]];

  return (
    <>
      <section id="portfolio">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.16em] text-[#0f8a62] uppercase">
              Our work
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl">Portfolio</h2>
          </div>
          <span className="text-sm text-[#7b938d]">
            {portfolio.length} photos
          </span>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {portfolio.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActivePortfolioImage(index)}
              className={`group relative overflow-hidden rounded-2xl bg-[#dcebe4] text-left ${index === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'}`}
              aria-label={`Open portfolio image ${index + 1}`}
            >
              <img
                src={image}
                alt={`portfolio example ${index + 1}`}
                className="size-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/15" />
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-[#8aa099]">
          Tap an image to view it larger.
        </p>
      </section>

      {activePortfolioImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#10231f]/85 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio image preview"
          onClick={() => setActivePortfolioImage(null)}
        >
          <button
            type="button"
            onClick={() => setActivePortfolioImage(null)}
            className="absolute top-5 right-5 flex size-10 items-center justify-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-white/25"
            aria-label="Close portfolio image preview"
          >
            ×
          </button>
          <img
            src={portfolio[activePortfolioImage]}
            alt={`portfolio example ${activePortfolioImage + 1}`}
            // alt={`${providerName} portfolio example ${activePortfolioImage + 1}`}
            className="max-h-[88vh] max-w-5xl rounded-2xl object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}

