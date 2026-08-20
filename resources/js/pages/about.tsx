import { Head, Link } from '@inertiajs/react';
import {
  ArrowRight,
  ArrowUpRight,
  HeartHandshake,
  Lightbulb,
  MessageCircleMore,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { contact, register } from '@/routes';

const values = [
  {
    title: 'Human by default',
    description:
      'We design for real conversations, real businesses, and the people who make both happen.',
    icon: HeartHandshake,
    color: 'bg-[#e3f6ee] text-[#0f8a62]',
  },
  {
    title: 'Clear over clever',
    description:
      'The best tools disappear into your day. Every detail should make the next step feel obvious.',
    icon: Lightbulb,
    color: 'bg-[#fff2d8] text-[#bd791e]',
  },
  {
    title: 'Room to grow',
    description:
      'Book Me should feel useful on day one and still feel like the right fit as your work gets bigger.',
    icon: Sparkles,
    color: 'bg-[#ece8ff] text-[#6253c7]',
  },
];

export default function About() {
  return (
    <>
      <Head title="About Book Me" />

      <section className="relative isolate px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28 lg:px-12">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-36 -right-36 size-136 rounded-full bg-[#dff4eb] blur-3xl" />
          <div className="absolute bottom-0 -left-40 size-112 rounded-full bg-[#fff0d6] blur-3xl" />
        </div>
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="mb-5 text-[11px] font-bold tracking-[0.14em] text-[#0f8a62] uppercase">
              About Book Me
            </p>
            <h1 className="max-w-2xl text-[clamp(2.9rem,6vw,5.7rem)] leading-[0.98] font-bold tracking-[-0.07em] text-[#17343c]">
              Scheduling should feel like{' '}
              <span className="text-[#0f8a62]">hospitality.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#6c7d7e] sm:text-lg sm:leading-8">
              Book Me gives independent professionals and growing teams more
              space to do meaningful work. We take care of the busywork
              around every appointment, so your clients feel looked after
              before they even walk through the door.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f8a62] px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(15,138,98,0.2)] transition hover:-translate-y-0.5 hover:bg-[#0b7653]"
                href={register()}
              >
                Start for free{' '}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#dce6e1] bg-white/70 px-7 py-3.5 text-sm font-bold text-[#53696b] transition hover:border-[#b8d8c8] hover:text-[#0f8a62]"
                href={contact()}
              >
                Say hello{' '}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -top-5 -right-4 size-20 rounded-full bg-[#ffc77d]/45 blur-2xl" />
            <div className="absolute -bottom-5 -left-4 size-24 rounded-full bg-[#61cda8]/35 blur-2xl" />
            <div className="relative rounded-[28px] bg-[#17343c] p-5 shadow-[0_28px_70px_rgba(34,60,70,0.17)] sm:p-7">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#0f8a62] text-white">
                    <HeartHandshake aria-hidden="true" className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">
                      The Book Me promise
                    </p>
                    <p className="mt-1 text-[10px] text-[#9bb4b2]">
                      More room for meaningful work
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-[#28555a] px-3 py-1.5 text-[9px] font-bold text-[#7de0b5]">
                  Always on
                </span>
              </div>
              <div className="py-8">
                <p className="text-3xl leading-tight font-bold tracking-tighter text-white sm:text-4xl">
                  “The best kind of technology feels a little like care.”
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/[0.07] p-4">
                  <p className="text-2xl font-bold tracking-tighter text-[#7de0b5]">
                    10 min
                  </p>
                  <p className="mt-1 text-[10px] text-[#9bb4b2]">
                    to start simply
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.07] p-4">
                  <p className="text-2xl font-bold tracking-tighter text-[#ffce8e]">
                    24/7
                  </p>
                  <p className="mt-1 text-[10px] text-[#9bb4b2]">
                    to welcome clients
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e8eeeb] bg-white px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-5 text-[11px] font-bold tracking-[0.14em] text-[#c47632] uppercase">
              Why we started
            </p>
            <h2 className="text-4xl leading-[1.05] font-bold tracking-[-0.055em] text-[#17343c] sm:text-5xl">
              There is more to a booking than a time slot.
            </h2>
          </div>
          <div className="max-w-2xl text-base leading-8 text-[#6f8081]">
            <p>
              We kept seeing brilliant people lose hours to the same small
              problems: messages that went unanswered, calendars that needed
              constant tending, and clients who had to work too hard to
              book.
            </p>
            <p className="mt-5">
              Book Me was created to make that part feel lighter. The
              product is practical, but the idea behind it is simple: when
              the details are handled thoughtfully, people have more energy
              for the work and relationships that matter most.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfcfa] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-xl">
            <p className="mb-5 text-[11px] font-bold tracking-[0.14em] text-[#0f8a62] uppercase">
              What guides us
            </p>
            <h2 className="text-4xl leading-[1.05] font-bold tracking-[-0.055em] text-[#17343c] sm:text-5xl">
              Small details. Strong principles.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {values.map(({ title, description, icon: Icon, color }) => (
              <div
                key={title}
                className="rounded-[22px] border border-[#e4ece7] bg-white p-7 transition hover:-translate-y-1 hover:border-[#b8ddca] hover:shadow-[0_16px_35px_rgba(45,86,68,0.08)]"
              >
                <div
                  className={`flex size-11 items-center justify-center rounded-2xl ${color}`}
                >
                  <Icon aria-hidden="true" className="size-5" />
                </div>
                <h3 className="mt-7 text-xl font-bold tracking-[-0.03em] text-[#17343c]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#768687]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff6e8] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <div className="rounded-[26px] border border-[#f2dfc2] bg-white p-6 shadow-[0_24px_50px_rgba(122,91,42,0.1)] sm:p-8">
              <div className="flex items-center justify-between border-b border-[#f1ece5] pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-[#d9ede5] text-sm font-bold text-[#0f8a62]">
                    BM
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#394c4e]">
                      Book Me team
                    </p>
                    <p className="mt-1 text-[10px] text-[#9ba5a2]">
                      A note from your support team
                    </p>
                  </div>
                </div>
                <MessageCircleMore
                  aria-hidden="true"
                  className="size-5 text-[#e77b4d]"
                />
              </div>
              <p className="mt-6 text-lg leading-7 font-semibold tracking-[-0.03em] text-[#29464a]">
                “You do not have to figure it out alone. Tell us what your
                day looks like and we will help you make it work better.”
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[#e77b4d]">
                Talk to a real human{' '}
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="mb-5 text-[11px] font-bold tracking-[0.14em] text-[#c47632] uppercase">
              Built alongside our users
            </p>
            <h2 className="text-4xl leading-[1.05] font-bold tracking-[-0.055em] text-[#17343c] sm:text-5xl">
              Good software starts with listening.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#7e7062]">
              From the first sketch to every feature we ship, we stay close
              to the people using Book Me every day. Their feedback keeps
              the product grounded, useful, and pleasantly human.
            </p>
            <div className="mt-8 flex items-center gap-6 text-sm text-[#6d736c]">
              <div className="flex items-center gap-2">
                <Users
                  aria-hidden="true"
                  className="size-4 text-[#0f8a62]"
                />{' '}
                Independent teams
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck
                  aria-hidden="true"
                  className="size-4 text-[#0f8a62]"
                />{' '}
                Privacy minded
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[30px] bg-[#0f8a62] px-6 py-14 text-center text-white sm:px-12 sm:py-18">
          <div className="absolute -top-28 -left-20 size-72 rounded-full border-36 border-white/10" />
          <div className="absolute -right-24 -bottom-40 size-96 rounded-full border-45 border-[#72d5ac]/20" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-4xl leading-[1.04] font-bold tracking-[-0.055em] sm:text-5xl">
              Make more room for the work you love.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-[#c5f0dc]">
              We would love to help you make scheduling feel a little more
              like you.
            </p>
            <Link
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#0f8a62] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#f4fff9]"
              href={register()}
            >
              Get started for free{' '}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
