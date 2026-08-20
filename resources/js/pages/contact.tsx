import { Head } from '@inertiajs/react';
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Mail,
  MessageCircleMore,
  Send,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { register } from '@/routes';

const contactOptions = [
  {
    title: 'Email our team',
    detail: 'hello@bookme.app',
    note: 'For general questions and ideas',
    icon: Mail,
    href: 'mailto:hello@bookme.app',
  },
  {
    title: 'Chat with support',
    detail: 'Usually within a few hours',
    note: 'For help getting set up',
    icon: MessageCircleMore,
    href: 'mailto:support@bookme.app',
  },
  {
    title: 'Explore Book Me',
    detail: 'Start free, no card needed',
    note: 'See the product for yourself',
    icon: Sparkles,
    href: register().url,
  },
];

const faqs = [
  [
    'How quickly will I hear back?',
    'We usually reply within one business day.',
  ],
  [
    'Can you help me move from another tool?',
    'Absolutely. Tell us what you are using and we will help you find the smoothest path over.',
  ],
  [
    'Is Book Me right for my type of business?',
    'If your work involves appointments, consultations, classes, or client meetings, we would love to show you around.',
  ],
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Book Me enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );

    window.location.href = `mailto:hello@bookme.app?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <Head title="Contact Book Me" />
      {/* <div className="min-h-screen overflow-hidden bg-[#fbfcfa] text-[#17343c] selection:bg-[#bce9d4] selection:text-[#17343c]">
        <MarketingHeader />

        <main> */}
          <section className="relative isolate px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28 lg:px-12">
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute -top-40 -left-24 size-120 rounded-full bg-[#dff4eb] blur-3xl" />
              <div className="absolute top-24 -right-40 size-128 rounded-full bg-[#fff0d6] blur-3xl" />
            </div>
            <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div className="pt-4">
                <p className="mb-5 text-[11px] font-bold tracking-[0.14em] text-[#0f8a62] uppercase">
                  Contact Book Me
                </p>
                <h1 className="max-w-xl text-[clamp(2.9rem,6vw,5.7rem)] leading-[0.98] font-bold tracking-[-0.07em] text-[#17343c]">
                  Let&apos;s make your day feel{' '}
                  <span className="text-[#0f8a62]">lighter.</span>
                </h1>
                <p className="mt-7 max-w-md text-base leading-7 text-[#6c7d7e] sm:text-lg sm:leading-8">
                  Questions, ideas, or just want to see if Book Me is a good
                  fit? We are here and happy to help.
                </p>
                <div className="mt-10 flex items-center gap-3 text-sm text-[#738383]">
                  <div className="flex size-10 items-center justify-center rounded-full bg-[#e3f6ee] text-[#0f8a62]">
                    <Clock3 aria-hidden="true" className="size-4" />
                  </div>
                  <div>
                    <p className="font-bold text-[#3c5558]">
                      Real humans, thoughtful replies
                    </p>
                    <p className="mt-1 text-xs">
                      Monday to Friday · We reply within one business day
                    </p>
                  </div>
                </div>
              </div>
              <form
                className="rounded-[26px] border border-[#e0ebe5] bg-white p-6 shadow-[0_24px_55px_rgba(45,86,68,0.09)] sm:p-9"
                onSubmit={handleSubmit}
              >
                <div className="flex items-center justify-between gap-4 border-b border-[#e8eeeb] pb-6">
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.12em] text-[#0f8a62] uppercase">
                      Send a note
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#17343c]">
                      What can we help with?
                    </h2>
                  </div>
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-[#e3f6ee] text-[#0f8a62]">
                    <Send aria-hidden="true" className="size-5" />
                  </div>
                </div>
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2 text-xs font-bold text-[#53696b]">
                    Your name
                    <input
                      required
                      value={form.name}
                      onChange={(event) =>
                        setForm({ ...form, name: event.target.value })
                      }
                      className="h-12 rounded-xl border border-[#dfe9e3] bg-[#fbfcfa] px-4 text-sm font-normal text-[#17343c] transition outline-none focus:border-[#76c9a5] focus:ring-4 focus:ring-[#e3f6ee]"
                      placeholder="Jane Smith"
                    />
                  </label>
                  <label className="grid gap-2 text-xs font-bold text-[#53696b]">
                    Email address
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        setForm({ ...form, email: event.target.value })
                      }
                      className="h-12 rounded-xl border border-[#dfe9e3] bg-[#fbfcfa] px-4 text-sm font-normal text-[#17343c] transition outline-none focus:border-[#76c9a5] focus:ring-4 focus:ring-[#e3f6ee]"
                      placeholder="jane@studio.com"
                    />
                  </label>
                </div>
                <label className="mt-5 grid gap-2 text-xs font-bold text-[#53696b]">
                  Your message
                  <textarea
                    required
                    value={form.message}
                    onChange={(event) =>
                      setForm({ ...form, message: event.target.value })
                    }
                    className="min-h-36 resize-y rounded-xl border border-[#dfe9e3] bg-[#fbfcfa] px-4 py-3 text-sm leading-6 font-normal text-[#17343c] transition outline-none focus:border-[#76c9a5] focus:ring-4 focus:ring-[#e3f6ee]"
                    placeholder="Tell us what is on your mind..."
                  />
                </label>
                <button
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f8a62] px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(15,138,98,0.18)] transition hover:-translate-y-0.5 hover:bg-[#0b7653]"
                  type="submit"
                >
                  Open email to send{' '}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </button>
                <p className="mt-3 text-center text-[11px] leading-5 text-[#91a09f]">
                  This opens your email app with your message ready to send.
                </p>
              </form>
            </div>
          </section>

          <section className="border-y border-[#e8eeeb] bg-white px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
            <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
              {contactOptions.map(
                ({ title, detail, note, icon: Icon, href }) => (
                  <a
                    key={title}
                    className="group rounded-[22px] border border-[#e4ece7] bg-[#fbfcfa] p-6 transition hover:-translate-y-1 hover:border-[#b8ddca] hover:bg-white hover:shadow-[0_16px_35px_rgba(45,86,68,0.08)]"
                    href={href}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex size-11 items-center justify-center rounded-2xl bg-[#e3f6ee] text-[#0f8a62]">
                        <Icon aria-hidden="true" className="size-5" />
                      </div>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 text-[#a5b2af] transition group-hover:text-[#0f8a62]"
                      />
                    </div>
                    <h3 className="mt-7 text-lg font-bold tracking-[-0.03em] text-[#17343c]">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-[#0f8a62]">
                      {detail}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-[#7d8d8d]">
                      {note}
                    </p>
                  </a>
                ),
              )}
            </div>
          </section>

          <section className="bg-[#17343c] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12">
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="mb-5 text-[11px] font-bold tracking-[0.14em] text-[#72d5ac] uppercase">
                  A few quick answers
                </p>
                <h2 className="max-w-md text-4xl leading-[1.05] font-bold tracking-[-0.055em] sm:text-5xl">
                  You might be wondering.
                </h2>
                <p className="mt-6 max-w-sm text-base leading-7 text-[#b0c0bf]">
                  If your question is not here, send us a note. We are always
                  glad to talk it through.
                </p>
              </div>
              <div className="grid gap-3">
                {faqs.map(([question, answer]) => (
                  <details
                    key={question}
                    className="group rounded-2xl border border-white/10 bg-white/6 p-5"
                  >
                    <summary className="cursor-pointer list-none text-base font-bold text-white marker:hidden">
                      {question}
                      <span className="float-right text-[#7de0b5] transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-[#a8bdbc]">
                      {answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        {/* </main>

        <MarketingFooter />
      </div> */}
    </>
  );
}
