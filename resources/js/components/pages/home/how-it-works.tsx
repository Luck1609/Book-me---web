import { Link } from '@inertiajs/react';
import { ArrowUpRight, CalendarCheck2, Globe2, Sparkles } from 'lucide-react';
import Container from '@/components/container';
import { register } from '@/routes';

const steps = [
  {
    number: '01',
    title: 'Set up your services',
    description:
      'Add your services, prices in GHS, availability, and the details clients always ask for.',
    icon: Sparkles,
  },
  {
    number: '02',
    title: 'Share your booking page',
    description:
      'Send one beautiful link on WhatsApp, Instagram, or your Google Business profile.',
    icon: Globe2,
  },
  {
    number: '03',
    title: 'Let Book Me handle the rest',
    description:
      'Bookings, reminders, deposits, and changes stay organized automatically.',
    icon: CalendarCheck2,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 bg-[#17343c] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="mb-5 text-[11px] font-bold tracking-[0.14em] text-[#72d5ac] uppercase">
              Your business, your rhythm
            </p>
            <h2 className="max-w-lg text-4xl leading-[1.04] font-bold tracking-[-0.055em] sm:text-5xl">
              From “when are you free?” to “see you then.”
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-[#b0c0bf]">
              Everything you need to make booking the easiest part of your
              client experience, whether they find you on Instagram, WhatsApp,
              or by referral.
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
      </Container>
    </section>
  );
}
