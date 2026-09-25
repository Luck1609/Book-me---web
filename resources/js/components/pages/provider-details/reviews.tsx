import { Star } from 'lucide-react'

export default function Reviews() {
  return (
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
            4
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
  )
}
