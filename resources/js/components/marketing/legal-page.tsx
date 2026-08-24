import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import type { ReactNode } from 'react';
import { home } from '@/routes';

type LegalPageProps = {
  children: ReactNode;
  description: string;
  lastUpdated: string;
  title: string;
};

export function LegalSection({
  children,
  number,
  title,
}: {
  children: ReactNode;
  number: string;
  title: string;
}) {
  return (
    <section
      className="scroll-mt-24 border-t border-[#e8eeeb] pt-8 first:border-t-0 first:pt-0"
      id={`section-${number}`}
    >
      <div className="flex gap-4 sm:gap-6">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e3f6ee] text-[11px] font-bold text-[#0f8a62]">
          {number}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold tracking-[-0.035em] text-[#17343c] sm:text-2xl">
            {title}
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-[#6f8081]">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LegalPage({
  children,
  description,
  lastUpdated,
  title,
}: LegalPageProps) {
  return (
    <>
      <Head title={title} />
      
      <section className="relative isolate overflow-hidden bg-[#17343c] px-5 pt-16 pb-16 text-white sm:px-8 sm:pt-24 sm:pb-20 lg:px-12">
        <div className="pointer-events-none absolute -top-48 -right-24 -z-10 size-136 rounded-full border-42 border-white/5" />
        <div className="pointer-events-none absolute -bottom-64 -left-32 -z-10 size-120 rounded-full border-38 border-[#72d5ac]/10" />
        <div className="mx-auto max-w-4xl">
          <Link
            className="inline-flex items-center gap-2 text-xs font-bold text-[#9fc2bd] transition hover:text-white"
            href={home()}
          >
            <ArrowLeft aria-hidden="true" className="size-3.5" /> Back to
            Book Me
          </Link>
          <div className="mt-10 flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#28555a] text-[#7de0b5]">
              <ShieldCheck aria-hidden="true" className="size-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold tracking-[0.14em] text-[#72d5ac] uppercase">
                Book Me legal
              </p>
              <h1 className="mt-3 text-4xl leading-[1.04] font-bold tracking-[-0.06em] sm:text-6xl">
                {title}
              </h1>
            </div>
          </div>
          <p className="mt-7 max-w-2xl text-base leading-7 text-[#b0c0bf] sm:text-lg sm:leading-8">
            {description}
          </p>
          <p className="mt-6 text-xs font-medium text-[#8ea9a6]">
            Last updated {lastUpdated}
          </p>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[220px_1fr] lg:items-start">
          <aside className="hidden lg:sticky lg:top-28 lg:block">
            <p className="text-[11px] font-bold tracking-[0.12em] text-[#94a2a0] uppercase">
              On this page
            </p>
            <nav className="mt-5 flex flex-col gap-3 text-xs font-semibold text-[#718081]">
              {['01', '02', '03', '04', '05', '06'].map((number) => (
                <a
                  key={number}
                  className="transition hover:text-[#0f8a62]"
                  href={`#section-${number}`}
                >
                  Section {number}
                </a>
              ))}
            </nav>
          </aside>
          <article className="max-w-3xl space-y-10 rounded-[26px] border border-[#e4ece7] bg-white p-6 shadow-[0_16px_35px_rgba(45,86,68,0.05)] sm:p-10">
            <div className="rounded-2xl border border-[#f2dfc2] bg-[#fff8ed] px-5 py-4 text-sm leading-6 text-[#806f5e]">
              This page is a starter template for Book Me. Replace the
              marked business details, confirm the data practices described
              here, and have the final version reviewed for the laws that
              apply to your business before publishing.
            </div>
            {children}
          </article>
        </div>
      </section>
    </>
  );
}
