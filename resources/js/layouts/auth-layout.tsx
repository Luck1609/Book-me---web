import { Link } from '@inertiajs/react';
import {
  ArrowUpRight,
  CalendarCheck2,
  Check,
  Clock3,
  Sparkles,
  Users,
} from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';
import { NoticeProvider } from '@/contexts/notice-context';
import { cn } from '@/lib/utils';
import { home, privacy, terms } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthLayout({
  children,
  title,
  description,
  classNames,
  icon,
  backgroundImage,
  asDirectChild = true,
  redirect
}: AuthLayoutProps) {
  console.log('Auth layout applied')
  if (asDirectChild) {
    return <NoticeProvider>{children}</NoticeProvider>;
  }

  return (
    <NoticeProvider>
      <div className="min-h-screen bg-[#fbfcfa] px-4 py-4 text-[#17343c] selection:bg-[#bce9d4] selection:text-[#17343c] sm:px-6 lg:px-10 lg:py-6">
        <div
          className={cn(
            'mx-auto flex min-h-[calc(100dvh-2rem)] max-w-360 flex-col overflow-hidden rounded-4xl border border-[#e2ebe6] bg-white shadow-[0_24px_70px_rgba(34,60,70,0.12)] lg:grid lg:min-h-[calc(100dvh-3rem)] lg:grid-cols-[minmax(350px,0.86fr)_minmax(0,1.14fr)]',
            classNames?.wrapper,
            )}
        >
          <aside className="relative hidden overflow-hidden bg-[#17343c] p-8 text-white lg:flex lg:flex-col lg:p-10 xl:p-12">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -top-24 -right-24 size-80 rounded-full bg-[#0f8a62]/35 blur-3xl" />
              <div className="absolute -bottom-36 -left-24 size-96 rounded-full bg-[#f0a46e]/20 blur-3xl" />
              {backgroundImage && (
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-[0.08] mix-blend-screen"
                  style={{ backgroundImage: `url('${backgroundImage}')` }}
                  />
                  )}
            </div>

            <Link
              href={home()}
              aria-label="Book Me home"
              className="relative z-10 flex w-fit items-center gap-2.5"
            >
              <AppLogoIcon />
              <span className="text-[1.15rem] font-bold tracking-[-0.04em] text-white">
                Book<span className="text-[#8fe0bb]">Me</span>
              </span>
            </Link>

            {icon && (
              <div className="pointer-events-none absolute top-24 right-8 z-10 opacity-10">
                {icon}
              </div>
              )}

            <div className="relative z-10 mt-auto max-w-lg">
              <p className="text-[11px] font-bold tracking-[0.16em] text-[#8fe0bb] uppercase">
                The calmer way to book
              </p>
              <h2 className="mt-4 max-w-md text-4xl leading-[1.02] font-bold tracking-[-0.06em] xl:text-5xl">
                Make room for work that matters.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-6 text-[#b8c9c7]">
                Book Me keeps your availability, clients, and appointments in
                one thoughtful place.
              </p>

              <div className="mt-9 rounded-3xl border border-white/10 bg-white/8 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.14)] backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-xl bg-[#0f8a62] text-[#d9f7e8]">
                      <CalendarCheck2 aria-hidden="true" className="size-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-white">
                        Today&apos;s schedule
                      </p>
                      <p className="text-[9px] text-[#9bb2ae]">
                        Everything in one view
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#d9f7e8]/10 px-2 py-1 text-[9px] font-semibold text-[#9be2c2]">
                    3 bookings
                  </span>
                </div>

                <div className="space-y-2.5 pt-3">
                  <div className="flex items-center gap-3 rounded-2xl bg-white/8 px-3 py-2.5">
                    <span className="size-2 rounded-full bg-[#72d5ac]" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10px] font-bold text-white">
                        Brand strategy call
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-[9px] text-[#9bb2ae]">
                        <Clock3 aria-hidden="true" className="size-3" /> 9:00 –
                        10:00 AM
                      </p>
                    </div>
                    <Check
                      aria-hidden="true"
                      className="size-4 text-[#72d5ac]"
                    />
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-[#806edc]/20 px-3 py-2.5">
                    <span className="size-2 rounded-full bg-[#b9adff]" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10px] font-bold text-white">
                        Website consultation
                      </p>
                      <p className="mt-0.5 text-[9px] text-[#c0b8ec]">
                        10:30 – 11:30 AM
                      </p>
                    </div>
                    <span className="rounded-full bg-white/10 px-2 py-1 text-[8px] font-semibold text-[#ddd8ff]">
                      Paid
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-[10px] text-[#9bb2ae]">
                <Users aria-hidden="true" className="size-3.5 text-[#72d5ac]" />
                Join teams building more space into their day.
              </div>
            </div>
          </aside>

          <section className="flex min-w-0 flex-1 flex-col bg-white">
            <header className="flex items-center justify-between px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
              <Link
                href={home()}
                aria-label="Book Me home"
                className="lg:hidden"
              >
                <div className="flex items-center gap-2.5">
                  <AppLogoIcon />
                  <span className="text-[1.15rem] font-bold tracking-[-0.04em] text-[#162d35]">
                    Book<span className="text-[#0f8a62]">Me</span>
                  </span>
                </div>
              </Link>
              <div className="hidden lg:block" />
              <Link
                href={redirect ? redirect.href : home()}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6b7e7e] transition-colors hover:text-[#0f8a62] sm:text-sm"
              >
                { redirect?.icon && <redirect.icon className="size-3.5" />}
                { redirect ? redirect.label : 'Back to home' }
                { !redirect?.icon && <ArrowUpRight aria-hidden="true" className="size-3.5" />}
              </Link>
            </header>

            <div className="flex flex-1 items-center px-5 pb-8 sm:px-8 lg:px-12 lg:pb-12">
              <div
                className={cn(
                  'mx-auto w-full max-w-124',
                  classNames?.container,
                  )}
              >
                <div className="mb-8">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c7e8d8] bg-[#effaf4] px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] text-[#0f8a62] uppercase">
                    <Sparkles aria-hidden="true" className="size-3" /> Book Me
                    account
                  </div>
                  <h1 className="text-3xl leading-tight font-bold tracking-[-0.055em] text-[#17343c] sm:text-4xl">
                    {title}
                  </h1>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-[#718282] sm:text-base">
                    {description}
                  </p>
                </div>

                {children}
              </div>
            </div>

            <footer className="flex flex-col gap-3 border-t border-[#edf1ef] px-5 py-5 text-[11px] text-[#8a9a9b] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
              <span>Simple scheduling for growing businesses.</span>
              <div className="flex items-center gap-4">
                <Link
                  className="transition-colors hover:text-[#0f8a62]"
                  href={privacy()}
                >
                  Privacy
                </Link>
                <Link
                  className="transition-colors hover:text-[#0f8a62]"
                  href={terms()}
                >
                  Terms
                </Link>
              </div>
            </footer>
          </section>
        </div>
      </div>
    </NoticeProvider>
    );
}
