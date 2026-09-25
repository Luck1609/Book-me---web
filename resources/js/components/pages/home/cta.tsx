import { Link } from '@inertiajs/react'
import { ArrowRight, Zap } from 'lucide-react'
import Container from '@/components/container'
import { register } from '@/routes'

export default function CTA() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <Container className="relative overflow-hidden rounded-[30px] bg-[#0f8a62] px-6 py-16 text-center text-white sm:px-12 sm:py-20">
        <div className="absolute -top-28 -left-20 size-72 rounded-full border-36 border-white/10" />
        <div className="absolute -right-24 -bottom-40 size-96 rounded-full border-45 border-[#72d5ac]/20" />
        <div className="relative">
          <Zap
            aria-hidden="true"
            className="mx-auto size-7 text-[#ffce8e]"
            fill="currentColor"
          />
          <h2 className="mx-auto mt-5 max-w-2xl text-4xl leading-[1.04] font-bold tracking-[-0.055em] sm:text-5xl">
            Your next great booking is one link away.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-[#c5f0dc]">
            Join the Ghanaian businesses making more room for meaningful work.
            Start free and let your clients book on their own time.
          </p>
          <Link
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#0f8a62] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#f4fff9]"
            href={register()}
          >
            Get started for free{' '}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <p className="mt-4 text-[11px] font-medium text-[#b5e8cf]">
            No credit card required · Start in minutes
          </p>
        </div>
      </Container>
    </section>
  )
}

