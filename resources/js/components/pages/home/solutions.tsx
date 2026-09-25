import { Link } from '@inertiajs/react';
import { ArrowRight, Check, MapPin } from 'lucide-react';
import Container from '@/components/container';
import { register } from '@/routes';

export default function Solutions() {
  return (
    <section
      id="solutions"
      className="scroll-mt-20 bg-[#fff6e8] px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
    >
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-5 text-[11px] font-bold tracking-[0.14em] text-[#c47632] uppercase">
            Made for your corner of Ghana
          </p>
          <h2 className="text-4xl leading-[1.04] font-bold tracking-[-0.055em] text-[#17343c] sm:text-5xl">
            Your booking page should feel like a warm welcome.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-7 text-[#7e7062]">
            Keep your brand front and center. Add your colors, services,
            policies, and personality, then share one polished link
            everywhere—from Osu to Oforikrom.
          </p>
          <div className="mt-8 grid gap-3 text-sm font-semibold text-[#5f665f] sm:grid-cols-2">
            {[
              'Custom availability',
              'Mobile-first booking',
              'MoMo-ready deposits',
              'WhatsApp sharing',
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
            Make it yours <ArrowRight aria-hidden="true" className="size-4" />
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
                  Adjoa Studio
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
                  Make space for the work you love.
                </h3>
                <p className="mt-3 text-xs leading-5 text-[#87918f]">
                  Choose a service and a time that works for you.
                </p>
                <div className="mt-7 flex items-center gap-2 text-[10px] font-bold text-[#e77b4d]">
                  <MapPin aria-hidden="true" className="size-3.5" /> Accra ·
                  Open today · 9 AM – 6 PM
                </div>
              </div>
              <div className="rounded-2xl bg-[#fbf7f1] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#4d5d5e]">
                    Choose a service
                  </span>
                  <span className="text-[9px] text-[#acb5b2]">1 of 2</span>
                </div>
                {[
                  'Consultation · GHS 80',
                  'Signature session · GHS 250',
                  'Follow-up · GHS 50',
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
      </Container>
    </section>
  );
}
