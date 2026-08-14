import { Head } from '@inertiajs/react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Flower2,
  Moon,
  Scissors,
  Sun,
  Sunrise,
  UserRound,
} from 'lucide-react';

export default function Booking() {
  return (
    <>
      <Head title="The Classic Cut - Booking">
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="min-h-screen bg-background pb-32 text-on-background">
        <header className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between bg-surface px-margin-mobile shadow-sm">
          <button
            aria-label="Back to discovery"
            className="flex items-center justify-center rounded-full p-2 transition-colors duration-150 hover:bg-surface-container-low active:scale-95"
          >
            <ArrowLeft aria-hidden="true" className="size-6 text-primary" />
          </button>
          <h1 className="font-headline-md text-headline-md font-bold text-primary">
            The Classic Cut
          </h1>
          <div className="w-10"></div>
        </header>
        <main className="mx-auto max-w-container-max pt-16">
          <section className="relative h-[265px] w-full overflow-hidden md:h-[397px]">
            <div
              className="absolute inset-0 h-full w-full bg-cover bg-center"
              data-alt="A high-end, minimalist barber shop interior with black leather chairs, large mirrors, and warm ambient lighting. The atmosphere is sophisticated and clean, reflecting a premium grooming experience. Soft morning light filters through large windows, highlighting the polished wood floors and chrome details of the professional barbering stations."
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDSUlvu1Tu5X-3sq8qmX7WMfzc8JxxN6lGS5ctIKlo4dcTxBIf76OOnQpd_sHCzZLH705jpPVu-fHb_tCLiy-dJWg-7SycbYb6Wi18Is9-23qrjh1FO0YGI6kZHEKzzmzQmPDjXsEm_33nizYtq79VrCKX-OzATkeJM-z9Yv152ZaI04HIpm_JF95pzx73m3cyapzv5AEW98qQmQuEF-fIPWSo2gNWlQO3RVJkpYLyh2RoQ-yq2myFKGZBhWqkNBMSI58CeKcFX6E4')",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-margin-mobile text-white md:left-margin-desktop">
              <span className="mb-2 inline-block rounded-full bg-secondary-container px-3 py-1 font-label-md text-label-md text-on-secondary-container">
                PREMIUM BARBERING
              </span>
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg">
                Mastering the Craft
              </h2>
            </div>
          </section>
          <div className="mt-stack-lg flex flex-col gap-stack-lg px-margin-mobile md:px-margin-desktop">
            <section>
              <h3 className="mb-4 font-label-md text-label-md tracking-widest text-on-surface-variant uppercase">
                Select Service
              </h3>
              <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
                <label className="group relative block cursor-pointer">
                  <input
                    defaultChecked
                    className="peer sr-only"
                    name="service"
                    type="radio"
                  />
                  <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-[0_2px_4px_rgba(15,23,42,0.04)] transition-all duration-200 peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/10">
                    <div className="mb-4 flex items-start justify-between">
                      <Scissors
                        aria-hidden="true"
                        className="size-6 text-primary"
                      />
                      <span className="font-headline-md text-headline-md text-primary">
                        $30
                      </span>
                    </div>
                    <h4 className="mb-1 font-body-lg text-body-lg font-bold">
                      Haircut
                    </h4>
                    <p className="font-caption text-caption text-on-surface-variant">
                      Precision cutting and styling tailored to your look.
                    </p>
                  </div>
                </label>

                <label className="group relative block cursor-pointer">
                  <input className="peer sr-only" name="service" type="radio" />
                  <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-[0_2px_4px_rgba(15,23,42,0.04)] transition-all duration-200 peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/10">
                    <div className="mb-4 flex items-start justify-between">
                      <UserRound
                        aria-hidden="true"
                        className="size-6 text-primary"
                      />
                      <span className="font-headline-md text-headline-md text-primary">
                        $20
                      </span>
                    </div>
                    <h4 className="mb-1 font-body-lg text-body-lg font-bold">
                      Beard Trim
                    </h4>
                    <p className="font-caption text-caption text-on-surface-variant">
                      Sculpting and detailing for a sharp, clean beard line.
                    </p>
                  </div>
                </label>

                <label className="group relative block cursor-pointer">
                  <input className="peer sr-only" name="service" type="radio" />
                  <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-[0_2px_4px_rgba(15,23,42,0.04)] transition-all duration-200 peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/10">
                    <div className="mb-4 flex items-start justify-between">
                      <Flower2
                        aria-hidden="true"
                        className="size-6 text-primary"
                      />
                      <span className="font-headline-md text-headline-md text-primary">
                        $45
                      </span>
                    </div>
                    <h4 className="mb-1 font-body-lg text-body-lg font-bold">
                      Full Grooming
                    </h4>
                    <p className="font-caption text-caption text-on-surface-variant">
                      The signature experience: Cut, trim, and luxury hot towel
                      shave.
                    </p>
                  </div>
                </label>
              </div>
            </section>
            <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
              <section className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-label-md text-label-md text-on-surface-variant uppercase">
                    Select Date
                  </h3>
                  <div className="flex gap-2">
                    <button className="rounded-full p-1 transition-colors hover:bg-surface-container-highest">
                      <ChevronLeft aria-hidden="true" className="size-3.5" />
                    </button>
                    <span className="font-label-md text-label-md text-primary">
                      October 2023
                    </span>
                    <button className="rounded-full p-1 transition-colors hover:bg-surface-container-highest">
                      <ChevronRight aria-hidden="true" className="size-3.5" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  <div className="py-2 font-caption text-caption text-on-surface-variant">
                    S
                  </div>
                  <div className="py-2 font-caption text-caption text-on-surface-variant">
                    M
                  </div>
                  <div className="py-2 font-caption text-caption text-on-surface-variant">
                    T
                  </div>
                  <div className="py-2 font-caption text-caption text-on-surface-variant">
                    W
                  </div>
                  <div className="py-2 font-caption text-caption text-on-surface-variant">
                    T
                  </div>
                  <div className="py-2 font-caption text-caption text-on-surface-variant">
                    F
                  </div>
                  <div className="py-2 font-caption text-caption text-on-surface-variant">
                    S
                  </div>

                  <button className="flex aspect-square cursor-default items-center justify-center font-body-md text-body-md text-on-surface-variant/40">
                    28
                  </button>
                  <button className="flex aspect-square cursor-default items-center justify-center font-body-md text-body-md text-on-surface-variant/40">
                    29
                  </button>
                  <button className="flex aspect-square cursor-default items-center justify-center font-body-md text-body-md text-on-surface-variant/40">
                    30
                  </button>
                  <button className="flex aspect-square items-center justify-center rounded-lg font-body-md text-body-md text-primary transition-all duration-200 ease-in-out hover:bg-surface-container-highest">
                    1
                  </button>
                  <button className="flex aspect-square items-center justify-center rounded-lg font-body-md text-body-md text-primary transition-all duration-200 ease-in-out hover:bg-surface-container-highest">
                    2
                  </button>
                  <button className="flex aspect-square items-center justify-center rounded-lg font-body-md text-body-md text-primary transition-all duration-200 ease-in-out hover:bg-surface-container-highest">
                    3
                  </button>
                  <button className="flex aspect-square items-center justify-center rounded-lg font-body-md text-body-md text-primary transition-all duration-200 ease-in-out hover:bg-surface-container-highest">
                    4
                  </button>
                  <button className="flex aspect-square items-center justify-center rounded-lg font-body-md text-body-md text-primary transition-all duration-200 ease-in-out hover:bg-surface-container-highest">
                    5
                  </button>
                  <button className="flex aspect-square items-center justify-center rounded-lg bg-primary font-body-md text-body-md font-bold text-on-primary shadow-[0_2px_4px_rgba(15,23,42,0.04)]">
                    6
                  </button>
                  <button className="flex aspect-square items-center justify-center rounded-lg font-body-md text-body-md text-primary transition-all duration-200 ease-in-out hover:bg-surface-container-highest">
                    7
                  </button>
                  <button className="flex aspect-square items-center justify-center rounded-lg font-body-md text-body-md text-primary transition-all duration-200 ease-in-out hover:bg-surface-container-highest">
                    8
                  </button>
                  <button className="flex aspect-square items-center justify-center rounded-lg font-body-md text-body-md text-primary transition-all duration-200 ease-in-out hover:bg-surface-container-highest">
                    9
                  </button>
                  <button className="flex aspect-square items-center justify-center rounded-lg font-body-md text-body-md text-primary transition-all duration-200 ease-in-out hover:bg-surface-container-highest">
                    10
                  </button>
                  <button className="flex aspect-square items-center justify-center rounded-lg font-body-md text-body-md text-primary transition-all duration-200 ease-in-out hover:bg-surface-container-highest">
                    11
                  </button>
                </div>
              </section>

              <section className="flex flex-col gap-6">
                <div>
                  <h3 className="mb-3 flex items-center gap-2 font-label-md text-label-md text-on-surface-variant uppercase">
                    <Sunrise aria-hidden="true" className="size-[18px]" />{' '}
                    Morning
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button className="rounded-lg border border-outline-variant bg-surface px-4 py-2 font-body-md text-body-md transition-all duration-200 ease-in-out hover:border-primary active:scale-95">
                      09:00 AM
                    </button>
                    <button className="rounded-lg border border-outline-variant bg-surface px-4 py-2 font-body-md text-body-md transition-all duration-200 ease-in-out hover:border-primary active:scale-95">
                      10:30 AM
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="mb-3 flex items-center gap-2 font-label-md text-label-md text-on-surface-variant uppercase">
                    <Sun aria-hidden="true" className="size-[18px]" /> Afternoon
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button className="rounded-lg bg-primary px-4 py-2 font-body-md text-body-md font-bold text-on-primary shadow-[0_2px_4px_rgba(15,23,42,0.04)] active:scale-95">
                      01:00 PM
                    </button>
                    <button className="rounded-lg border border-outline-variant bg-surface px-4 py-2 font-body-md text-body-md transition-all duration-200 ease-in-out hover:border-primary active:scale-95">
                      02:30 PM
                    </button>
                    <button className="rounded-lg border border-outline-variant bg-surface px-4 py-2 font-body-md text-body-md transition-all duration-200 ease-in-out hover:border-primary active:scale-95">
                      04:00 PM
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="mb-3 flex items-center gap-2 font-label-md text-label-md text-on-surface-variant uppercase">
                    <Moon aria-hidden="true" className="size-[18px]" /> Evening
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button className="rounded-lg border border-outline-variant bg-surface px-4 py-2 font-body-md text-body-md transition-all duration-200 ease-in-out hover:border-primary active:scale-95">
                      06:00 PM
                    </button>
                    <button className="cursor-not-allowed rounded-lg border border-outline-variant bg-surface-container-high px-4 py-2 font-body-md text-body-md line-through opacity-30">
                      07:30 PM
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>

        <div className="fixed bottom-0 left-0 z-50 w-full border-t border-outline-variant/20 bg-surface px-margin-mobile py-6 shadow-[0_12px_24px_rgba(15,23,42,0.08)] md:px-margin-desktop">
          <div className="mx-auto flex max-w-container-max items-center justify-between gap-gutter">
            <div className="hidden md:block">
              <p className="font-label-md text-label-md text-on-surface-variant uppercase">
                Your Appointment
              </p>
              <p className="font-body-lg text-body-lg font-bold">
                Haircut • Oct 6, 01:00 PM
              </p>
            </div>
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-12 py-4 font-headline-md text-headline-md font-bold text-on-primary shadow-[0_12px_24px_rgba(15,23,42,0.08)] transition-all hover:opacity-90 active:scale-95 md:w-auto">
              Confirm Booking{' '}
              <ChevronRight aria-hidden="true" className="size-6" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
