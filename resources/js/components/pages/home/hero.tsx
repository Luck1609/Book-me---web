import { Link } from '@inertiajs/react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleCheck,
  Play,
  ShieldCheck,
} from 'lucide-react';
import Container from '@/components/container';
import { register } from '@/routes';

export default function Hero() {
  return (
    <section className="relative isolate px-5 pt-16 pb-24 sm:px-8 sm:pt-24 lg:px-12 lg:pt-28 lg:pb-32">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-28 -right-36 size-128 rounded-full bg-[#dff4eb] blur-3xl" />
        <div className="absolute top-104 -left-48 size-112 rounded-full bg-[#fff0d6] blur-3xl" />
        <div className="absolute top-0 left-1/2 h-full w-px bg-[#ebf1ed]" />
      </div>

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c7e8d8] bg-[#effaf4] px-3.5 py-2 text-[11px] font-bold tracking-[0.08em] text-[#0f8a62] uppercase">
            <span className="size-1.5 rounded-full bg-[#0f8a62]" /> Built for
            the way Ghana gets things done
          </div>
          <h1 className="text-[clamp(2.9rem,6vw,5.7rem)] leading-[0.98] font-bold tracking-[-0.07em] text-[#17343c]">
            Your craft deserves a{' '}
            <span className="text-[#0f8a62]">full calendar.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#6c7d7e] sm:text-lg sm:leading-8">
            Book Me helps Ghanaian salons, barbers, stylists, photographers,
            coaches, and studios turn “please send your MoMo” into a smooth
            booking experience.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f8a62] px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(15,138,98,0.2)] transition hover:-translate-y-0.5 hover:bg-[#0b7653] sm:w-auto"
              href={register()}
            >
              Start for free{' '}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <a
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#dce6e1] bg-white/70 px-7 py-3.5 text-sm font-bold text-[#53696b] transition hover:border-[#b8d8c8] hover:text-[#0f8a62] sm:w-auto"
              href="#how-it-works"
            >
              <span className="flex size-5 items-center justify-center rounded-full bg-[#e8f5ef]">
                <Play
                  aria-hidden="true"
                  className="ml-0.5 size-2.5 fill-current text-[#0f8a62]"
                />
              </span>
              See how it works
            </a>
          </div>
          <div className="mt-5 flex items-center justify-center gap-2 text-[11px] font-medium text-[#809091]">
            <ShieldCheck
              aria-hidden="true"
              className="size-3.5 text-[#0f8a62]"
            />{' '}
            No credit card required <span className="text-[#c6d0cc]">·</span>{' '}
            Accept deposits in GHS
          </div>
        </div>
        <div className="mt-16 sm:mt-20">
          <BookingPreview />
        </div>
      </Container>
    </section>
  );
}

const appointmentTimes = ['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM'];

function BookingPreview() {
  return (
    <div className="relative mx-auto w-full max-w-155">
      <div className="absolute -top-8 -right-3 hidden size-20 rounded-full bg-[#ffc77d]/50 blur-2xl sm:block" />
      <div className="absolute -bottom-8 -left-5 size-24 rounded-full bg-[#61cda8]/35 blur-2xl" />

      <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white shadow-[0_28px_70px_rgba(34,60,70,0.17)]">
        <div className="flex items-center justify-between border-b border-[#edf0ef] px-4 py-3.5 sm:px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#0f8a62] text-xs font-bold text-white">
              W
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#17343c]">
                Ama's Beauty Bar
              </p>
              <p className="text-[9px] text-[#8a9a9b]">Accra · Team calendar</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden rounded-full bg-[#f3f6f5] px-3 py-1.5 text-[9px] font-semibold text-[#647577] sm:block">
              Today
            </div>
            <div className="size-7 rounded-full bg-[#d9ede5]" />
          </div>
        </div>

        <div className="grid grid-cols-[68px_1fr] sm:grid-cols-[86px_1fr]">
          <div className="border-r border-[#edf0ef] bg-[#fbfcfb] pt-4">
            {appointmentTimes.map((time) => (
              <div
                key={time}
                className="h-17 px-2 text-right text-[9px] font-medium text-[#a1adae] sm:px-3"
              >
                {time}
              </div>
            ))}
          </div>
          <div className="relative bg-white px-3 pt-4 sm:px-5">
            <div className="absolute inset-x-0 top-15.25 border-t border-[#f0f3f2]" />
            <div className="absolute inset-x-0 top-32.25 border-t border-[#f0f3f2]" />
            <div className="absolute inset-x-0 top-49.25 border-t border-[#f0f3f2]" />
            <div className="absolute inset-x-0 top-66.25 border-t border-[#f0f3f2]" />
            <div className="relative z-10 flex h-13 items-center rounded-xl border border-[#b5e5d1] bg-[#eaf8f1] px-3 shadow-sm sm:px-4">
              <div className="mr-3 h-7 w-1 rounded-full bg-[#0f8a62]" />
              <div>
                <p className="text-[10px] font-bold text-[#166448]">
                  Knotless braids
                </p>
                <p className="mt-0.5 text-[9px] text-[#59967c]">
                  Adjoa · 9:00 – 11:00 AM
                </p>
              </div>
              <CircleCheck
                aria-hidden="true"
                className="ml-auto size-4 text-[#0f8a62]"
              />
            </div>
            <div className="relative z-10 mt-4 flex h-16.5 items-center rounded-xl border border-[#e5defd] bg-[#f5f1ff] px-3 sm:px-4">
              <div className="mr-3 h-7 w-1 rounded-full bg-[#8473e3]" />
              <div>
                <p className="text-[10px] font-bold text-[#5f50bc]">
                  Gel manicure
                </p>
                <p className="mt-0.5 text-[9px] text-[#8b82c5]">
                  Esi · 10:30 – 11:30 AM
                </p>
              </div>
              <div className="ml-auto rounded-full bg-white px-2 py-1 text-[8px] font-semibold text-[#7465d2]">
                Paid
              </div>
            </div>
            <div className="relative z-10 mt-4 flex h-13 items-center rounded-xl border border-[#ffd9c7] bg-[#fff1e9] px-3 sm:px-4">
              <div className="mr-3 h-7 w-1 rounded-full bg-[#e77b4d]" />
              <div>
                <p className="text-[10px] font-bold text-[#b65a32]">
                  Bridal glam trial
                </p>
                <p className="mt-0.5 text-[9px] text-[#c68568]">
                  Yaa · 1:00 – 2:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-[#edf0ef] px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2 text-[9px] text-[#809091]">
            <span className="size-2 rounded-full bg-[#0f8a62]" /> 8 bookings
            today
          </div>
          <span className="text-[9px] font-semibold text-[#0f8a62]">
            View calendar{' '}
            <ArrowUpRight aria-hidden="true" className="ml-0.5 inline size-3" />
          </span>
        </div>
      </div>

      <div className="absolute -right-4 bottom-8 flex items-center gap-2.5 rounded-2xl border border-white bg-white px-3.5 py-3 shadow-[0_15px_35px_rgba(34,60,70,0.16)] sm:-right-8">
        <div className="flex size-8 items-center justify-center rounded-full bg-[#e3f6ee] text-[#0f8a62]">
          <Check aria-hidden="true" className="size-4" strokeWidth={3} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-[#17343c]">
            Booking confirmed
          </p>
          <p className="text-[9px] text-[#8a9a9b]">
            A client just booked with you
          </p>
        </div>
      </div>
    </div>
  );
}
