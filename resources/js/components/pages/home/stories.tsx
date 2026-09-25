import { Star } from 'lucide-react'
import Container from '@/components/container'

export default function Stories() {
  return (
    <section
      id="stories"
      className="scroll-mt-20 bg-white px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div>
            <p className="mb-5 text-[11px] font-bold tracking-[0.14em] text-[#0f8a62] uppercase">
              People love the difference
            </p>
            <h2 className="text-4xl leading-[1.05] font-bold tracking-[-0.055em] text-[#17343c] sm:text-5xl">
              When the booking is easy, the whole business feels lighter.
            </h2>
            <div className="mt-8 flex items-center gap-1 text-[#f0b75a]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  aria-hidden="true"
                  className="size-4 fill-current"
                />
              ))}
              <span className="ml-2 text-sm font-bold text-[#53696b]">
                4.9 from 2,000+ reviews
              </span>
            </div>
          </div>
          <div className="rounded-[26px] bg-[#f1f8f4] p-7 sm:p-10">
            <div className="flex gap-1 text-[#f0b75a]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  aria-hidden="true"
                  className="size-4 fill-current"
                />
              ))}
            </div>
            <blockquote className="mt-6 max-w-2xl text-2xl leading-tight font-semibold tracking-[-0.04em] text-[#29464a] sm:text-3xl">
              “Before Book Me, my DMs were full of ‘are you free on Saturday?’
              Now clients choose a time, pay their deposit, and I can focus on
              making them feel beautiful.”
            </blockquote>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-[#f1c5a1] text-sm font-bold text-[#9b5632]">
                MO
              </div>
              <div>
                <p className="text-sm font-bold text-[#29464a]">
                  Maame Owusu
                </p>
                <p className="text-xs text-[#78908b]">
                  Founder, Maame's Beauty Bar · Accra
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-4 border-t border-[#e8eeeb] pt-10 sm:grid-cols-4 sm:gap-8">
          <div>
            <p className="text-3xl font-bold tracking-[-0.06em] text-[#17343c]">
              24/7
            </p>
            <p className="mt-1 text-xs text-[#7e8c8c]">your link is open</p>
          </div>
          <div>
            <p className="text-3xl font-bold tracking-[-0.06em] text-[#17343c]">
              GHS
            </p>
            <p className="mt-1 text-xs text-[#7e8c8c]">
              deposits made simple
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold tracking-[-0.06em] text-[#17343c]">
              1 link
            </p>
            <p className="mt-1 text-xs text-[#7e8c8c]">to share everywhere</p>
          </div>
          <div>
            <p className="text-3xl font-bold tracking-[-0.06em] text-[#17343c]">
              3 cities
            </p>
            <p className="mt-1 text-xs text-[#7e8c8c]">and growing</p>
          </div>
        </div>
      </Container>
    </section>
  )
}

