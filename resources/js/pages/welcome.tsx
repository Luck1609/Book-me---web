import { Head, Link } from '@inertiajs/react';
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck2,
  CalendarDays,
  Check,
  CircleCheck,
  Clock3,
  CreditCard,
  Globe2,
  MessageCircleMore,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Zap,
} from 'lucide-react';
import {
  register,
} from '@/routes';

const steps = [
  {
    number: '01',
    title: 'Set up your services',
    description:
      'Add your services, availability, and a few details about how you work.',
    icon: Sparkles,
  },
  {
    number: '02',
    title: 'Share your booking page',
    description:
      'Send one beautiful link to clients or add it to your website and socials.',
    icon: Globe2,
  },
  {
    number: '03',
    title: 'Let Book Me handle the rest',
    description:
      'Bookings, reminders, payments, and changes stay organized automatically.',
    icon: CalendarCheck2,
  },
];

const features = [
  {
    title: 'Your calendar, finally calm',
    description:
      'Keep your availability in one place and stop playing calendar ping-pong.',
    icon: CalendarDays,
    color: 'bg-[#e3f6ee] text-[#0f8a62]',
  },
  {
    title: 'Clients book on their time',
    description:
      'Give people a simple, branded booking experience that works around the clock.',
    icon: Users,
    color: 'bg-[#fce9df] text-[#c85c34]',
  },
  {
    title: 'Fewer no-shows, more yeses',
    description:
      'Automatic confirmations and reminders keep every appointment moving forward.',
    icon: MessageCircleMore,
    color: 'bg-[#ece8ff] text-[#6253c7]',
  },
  {
    title: 'Get paid without the chase',
    description:
      'Collect deposits or payments at booking and keep your business cash flow clear.',
    icon: CreditCard,
    color: 'bg-[#fff2cc] text-[#b98514]',
  },
];

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
                Willow & Co.
              </p>
              <p className="text-[9px] text-[#8a9a9b]">Team calendar</p>
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
                  Brand strategy call
                </p>
                <p className="mt-0.5 text-[9px] text-[#59967c]">
                  Nadia · 9:00 – 10:00 AM
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
                  Website consultation
                </p>
                <p className="mt-0.5 text-[9px] text-[#8b82c5]">
                  Michael · 10:30 – 11:30 AM
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
                  Project check-in
                </p>
                <p className="mt-0.5 text-[9px] text-[#c68568]">
                  Chris · 1:00 – 2:00 PM
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

export default function Welcome() {

  return (
    <>
      <Head title="Simple scheduling for growing businesses" />

      <section className="relative isolate px-5 pt-16 pb-24 sm:px-8 sm:pt-24 lg:px-12 lg:pt-28 lg:pb-32">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-28 -right-36 size-128 rounded-full bg-[#dff4eb] blur-3xl" />
          <div className="absolute top-104 -left-48 size-112 rounded-full bg-[#fff0d6] blur-3xl" />
          <div className="absolute top-0 left-1/2 h-full w-px bg-[#ebf1ed]" />
        </div>
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c7e8d8] bg-[#effaf4] px-3.5 py-2 text-[11px] font-bold tracking-[0.08em] text-[#0f8a62] uppercase">
              <span className="size-1.5 rounded-full bg-[#0f8a62]" />{' '}
              Scheduling that feels human
            </div>
            <h1 className="text-[clamp(2.9rem,6vw,5.7rem)] leading-[0.98] font-bold tracking-[-0.07em] text-[#17343c]">
              More time for the work that{' '}
              <span className="text-[#0f8a62]">matters.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#6c7d7e] sm:text-lg sm:leading-8">
              Book Me makes scheduling feel effortless. Give clients a
              beautiful way to book, while you stay focused on doing your
              best work.
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
              No credit card required{' '}
              <span className="text-[#c6d0cc]">·</span> Set up in minutes
            </div>
          </div>
          <div className="mt-16 sm:mt-20">
            <BookingPreview />
          </div>
        </div>
      </section>

      <section className="border-y border-[#e8eeeb] bg-white px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 md:flex-row">
          <p className="text-center text-[11px] font-bold tracking-widest text-[#91a09f] uppercase md:text-left">
            Trusted by people who put clients first
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm font-bold tracking-[-0.03em] text-[#a4b2b0] sm:gap-x-10">
            <span>willow & co.</span>
            <span>northstar</span>
            <span className="font-serif italic">Goodkind</span>
            <span>
              STUDIO<span className="text-[#0f8a62]">/</span>27
            </span>
            <span className="flex items-center gap-1">
              <Star
                aria-hidden="true"
                className="size-3 fill-current text-[#f0b75a]"
              />{' '}
              4.9 average
            </span>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="scroll-mt-20 bg-[#17343c] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-5 text-[11px] font-bold tracking-[0.14em] text-[#72d5ac] uppercase">
                A simpler way to work
              </p>
              <h2 className="max-w-lg text-4xl leading-[1.04] font-bold tracking-[-0.055em] sm:text-5xl">
                From “when are you free?” to “see you then.”
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-[#b0c0bf]">
                Everything you need to make booking the easiest part of your
                client experience.
              </p>
              <Link
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#7de0b5] transition hover:text-white"
                href={register()}
              >
                Create your free account{' '}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {steps.map(({ number, title, description, icon: Icon }) => (
                <div
                  key={number}
                  className="rounded-[20px] border border-white/10 bg-white/6 p-5 transition hover:-translate-y-1 hover:bg-white/1 sm:p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-[#28555a] text-[#7de0b5]">
                      <Icon aria-hidden="true" className="size-5" />
                    </div>
                    <span className="text-xs font-bold text-[#719394]">
                      {number}
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-bold tracking-[-0.03em]">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#a8bdbc]">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="scroll-mt-20 bg-[#fbfcfa] px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="mb-5 text-[11px] font-bold tracking-[0.14em] text-[#0f8a62] uppercase">
                Built around your business
              </p>
              <h2 className="text-4xl leading-[1.05] font-bold tracking-[-0.055em] text-[#17343c] sm:text-5xl">
                Less admin. More of the good stuff.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#708081]">
              A thoughtful toolkit for independent professionals and teams
              who care about every client touchpoint.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ title, description, icon: Icon, color }) => (
              <div
                key={title}
                className="group rounded-[22px] border border-[#e4ece7] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#b8ddca] hover:shadow-[0_16px_35px_rgba(45,86,68,0.08)]"
              >
                <div
                  className={`flex size-11 items-center justify-center rounded-2xl ${color}`}
                >
                  <Icon aria-hidden="true" className="size-5" />
                </div>
                <h3 className="mt-7 text-lg font-bold tracking-[-0.03em] text-[#17343c]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#768687]">
                  {description}
                </p>
                <span className="mt-7 flex items-center gap-1 text-xs font-bold text-[#0f8a62] opacity-0 transition group-hover:opacity-100">
                  Learn more{' '}
                  <ArrowRight aria-hidden="true" className="size-3" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="solutions"
        className="scroll-mt-20 bg-[#fff6e8] px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
      >
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-5 text-[11px] font-bold tracking-[0.14em] text-[#c47632] uppercase">
              Made to feel like you
            </p>
            <h2 className="text-4xl leading-[1.04] font-bold tracking-[-0.055em] text-[#17343c] sm:text-5xl">
              Your booking page should feel like an invitation.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#7e7062]">
              Keep your brand front and center. Add your colors, services,
              policies, and personality, then share one polished link
              everywhere.
            </p>
            <div className="mt-8 grid gap-3 text-sm font-semibold text-[#5f665f] sm:grid-cols-2">
              {[
                'Custom availability',
                'Mobile-first booking',
                'Deposits & payments',
                'Calendar sync',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="flex size-5 items-center justify-center rounded-full bg-white text-[#0f8a62] shadow-sm">
                    <Check
                      aria-hidden="true"
                      className="size-3"
                      strokeWidth={3}
                    />
                  </span>
                  {item}
                </div>
              ))}
            </div>
            <Link
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#17343c] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#234950]"
              href={register()}
            >
              Make it yours{' '}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-3 rotate-2 rounded-[28px] bg-[#f3d8af]" />
            <div className="relative overflow-hidden rounded-[23px] border border-[#f2dfc2] bg-white shadow-[0_24px_50px_rgba(122,91,42,0.13)]">
              <div className="flex items-center justify-between border-b border-[#f1ece5] px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-[#e77b4d] text-[10px] font-bold text-white">
                    A
                  </div>
                  <span className="text-xs font-bold text-[#394c4e]">
                    Amelia Studio
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-[#929b99]">
                  About · Services · Contact
                </span>
              </div>
              <div className="grid gap-6 p-6 sm:grid-cols-[1fr_1.1fr] sm:p-9">
                <div>
                  <div className="mb-5 h-2 w-10 rounded-full bg-[#f1b887]" />
                  <h3 className="text-2xl leading-tight font-bold tracking-tighter text-[#263d40]">
                    Make space for what makes you feel good.
                  </h3>
                  <p className="mt-3 text-xs leading-5 text-[#87918f]">
                    Choose a service and a time that works for you.
                  </p>
                  <div className="mt-7 flex items-center gap-2 text-[10px] font-bold text-[#e77b4d]">
                    <Clock3 aria-hidden="true" className="size-3.5" /> Open
                    today · 9 AM – 6 PM
                  </div>
                </div>
                <div className="rounded-2xl bg-[#fbf7f1] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#4d5d5e]">
                      Choose a service
                    </span>
                    <span className="text-[9px] text-[#acb5b2]">
                      1 of 2
                    </span>
                  </div>
                  {[
                    'Consultation · 30 min',
                    'Signature session · 60 min',
                    'Follow-up · 20 min',
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`mt-3 flex items-center justify-between rounded-xl border px-3 py-3 text-[10px] font-semibold ${index === 0 ? 'border-[#f3c4a4] bg-white text-[#c15f35]' : 'border-transparent bg-white/60 text-[#71807e]'}`}
                    >
                      <span>{item}</span>
                      {index === 0 && (
                        <Check aria-hidden="true" className="size-3.5" />
                      )}
                    </div>
                  ))}
                  <button className="mt-4 w-full rounded-xl bg-[#e77b4d] py-3 text-[10px] font-bold text-white">
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="stories"
        className="scroll-mt-20 bg-white px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="mb-5 text-[11px] font-bold tracking-[0.14em] text-[#0f8a62] uppercase">
                People love the difference
              </p>
              <h2 className="text-4xl leading-[1.05] font-bold tracking-[-0.055em] text-[#17343c] sm:text-5xl">
                A little less busywork goes a long way.
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
                “Book Me took the awkward back-and-forth out of my business.
                Clients book when they’re ready, and I get to focus on the
                work I’m actually here to do.”
              </blockquote>
              <div className="mt-8 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-[#f1c5a1] text-sm font-bold text-[#9b5632]">
                  JM
                </div>
                <div>
                  <p className="text-sm font-bold text-[#29464a]">
                    Jordan Mensah
                  </p>
                  <p className="text-xs text-[#78908b]">
                    Founder, Kindred Creative Studio
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
              <p className="mt-1 text-xs text-[#7e8c8c]">
                your business is open
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-[-0.06em] text-[#17343c]">
                10 min
              </p>
              <p className="mt-1 text-xs text-[#7e8c8c]">to get set up</p>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-[-0.06em] text-[#17343c]">
                0%
              </p>
              <p className="mt-1 text-xs text-[#7e8c8c]">calendar chaos</p>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-[-0.06em] text-[#17343c]">
                1 link
              </p>
              <p className="mt-1 text-xs text-[#7e8c8c]">
                to share everywhere
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[30px] bg-[#0f8a62] px-6 py-16 text-center text-white sm:px-12 sm:py-20">
          <div className="absolute -top-28 -left-20 size-72 rounded-full border-36 border-white/10" />
          <div className="absolute -right-24 -bottom-40 size-96 rounded-full border-45 border-[#72d5ac]/20" />
          <div className="relative">
            <Zap
              aria-hidden="true"
              className="mx-auto size-7 text-[#ffce8e]"
              fill="currentColor"
            />
            <h2 className="mx-auto mt-5 max-w-2xl text-4xl leading-[1.04] font-bold tracking-[-0.055em] sm:text-5xl">
              Your next great booking is closer than you think.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-[#c5f0dc]">
              Join the people making more room for meaningful work. Start
              free and see how simple scheduling can be.
            </p>
            <Link
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#0f8a62] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#f4fff9]"
              href={register()}
            >
              Get started for free{' '}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <p className="mt-4 text-[11px] font-medium text-[#b5e8cf]">
              No credit card required · Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
