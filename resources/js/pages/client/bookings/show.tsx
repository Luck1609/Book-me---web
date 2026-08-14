import { Head } from '@inertiajs/react';
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  CalendarClock,
  CirclePlus,
  CreditCard,
  History,
  MessageCircle,
  Navigation,
  User,
  Users,
  X,
} from 'lucide-react';

export default function AppointmentDetails() {
  return (
    <>
      <Head title="Appointment Details | Craft & Groom">
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-outline-variant bg-surface px-margin-mobile md:px-margin-desktop">
          <div className="flex items-center gap-4">
            <button className="scale-95 rounded-full p-2 transition-all transition-colors hover:bg-surface-variant/50 active:opacity-80">
              <ArrowLeft aria-hidden="true" className="size-6 text-primary" />
            </button>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary md:font-headline-lg md:text-headline-lg">
              Craft &amp; Groom
            </h1>
          </div>
          <div className="flex items-center gap-stack-md">
            <div className="mr-6 hidden gap-6 md:flex">
              <a
                className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
                href="#"
              >
                Schedule
              </a>
              <a
                className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
                href="#"
              >
                Messages
              </a>
            </div>
            <div className="h-10 w-10 overflow-hidden rounded-full border border-outline-variant bg-surface-variant">
              <img
                className="h-full w-full object-cover"
                data-alt="A professional portrait of a skilled master barber in a high-end, minimalist studio. The lighting is soft and cinematic, highlighting the clean aesthetic of the white marble walls and midnight blue accents. The style is modern minimalist with a focus on luxury and craftsmanship."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuByWiGbre1V2-LPqagaN0pvyYCiCoJHsv9ACUUm0e7lHL2iaG839YyvU-w66EdZhmfABodZ5qXxIsp8UxGDjhkJ9PCLsyAs5lZhKWx05TQeFQm5BlSNpWb6QNn3wigFkr9B1Cd1EvII3oRS7r_KajdjcOFkDFVG1ByWS4YDhcEnb0-AejyX2Py6t-lFwIv8tlKajCGgTFMLJGKgn-cbJvB4UvdlDoKs3vH0vW1UMTRMO1web7lLGYe5A1sBczgTeN8MS69QqUihXzM"
              />
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1200px] flex-grow px-margin-mobile py-stack-lg md:px-margin-desktop">
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
            <div className="flex flex-col gap-stack-lg lg:col-span-8">
              <div className="flex flex-col justify-between gap-stack-md md:flex-row md:items-center">
                <div>
                  <p className="mb-1 font-label-md text-label-md tracking-widest text-on-surface-variant uppercase">
                    Appointment Details
                  </p>
                  <h2 className="font-headline-lg text-headline-lg text-primary">
                    ID: #CG-882910
                  </h2>
                </div>
                <div>
                  <span className="inline-flex items-center rounded-full bg-secondary-container px-4 py-2 font-label-md text-label-md text-on-secondary-fixed-variant">
                    <BadgeCheck
                      aria-hidden="true"
                      className="mr-2 size-[18px] fill-current"
                    />
                    CONFIRMED
                  </span>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-outline-variant/30 bg-surface shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-64 md:h-full">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      data-alt="Close-up of a premium grooming kit with gold-plated shears and a midnight blue shaving brush on a white marble surface. The atmosphere is quiet luxury, emphasizing precision and craftsmanship. Soft window light creates gentle shadows."
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDcAh5AISiXEA1ttLCR3B_c8xQQlYSzKmZu6auN7bmw3CMV1yskvzwz_jU--QhYSAgGkLctURm1amZzeaNj3BiXTlv4Ir0e9cqginOtFQSgjGHFc56wHwTy-AQh6i9P8UtEZljmbWWqVIgvvlXBhh7TCNr7ww2eFxhvBb44qcEIvBDdpfYcFnnMq81FNQwuNjzOlqFzUH2KMUg1ndQrHxc45SAQVBUmgO_2iINiAGcHY1OPPrZJqZTx66Th7z3D_Mm33-xrTE8Ld9M')",
                      }}
                    ></div>
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-stack-md">
                      <div className="text-white">
                        <h3 className="font-headline-md text-headline-md">
                          The Master Suite
                        </h3>
                        <p className="font-body-md text-body-md opacity-90">
                          Full service cut, wash, and hot towel shave.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-stack-lg">
                    <div className="flex flex-col gap-stack-md">
                      <div className="flex items-start gap-stack-md">
                        <div className="rounded-lg bg-surface-variant/50 p-3">
                          <CalendarDays
                            aria-hidden="true"
                            className="size-6 text-primary"
                          />
                        </div>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface-variant uppercase">
                            Date &amp; Time
                          </p>
                          <p className="font-body-lg text-body-lg font-bold">
                            Tuesday, October 24, 2023
                          </p>
                          <p className="font-body-md text-body-md text-on-surface-variant">
                            2:30 PM — 3:45 PM (75 min)
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-start gap-stack-md">
                        <div className="rounded-lg bg-surface-variant/50 p-3">
                          <CreditCard
                            aria-hidden="true"
                            className="size-6 text-primary"
                          />
                        </div>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface-variant uppercase">
                            Total Price
                          </p>
                          <p className="font-display-lg text-[32px] font-bold text-primary">
                            $120.00
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-stack-md border-t border-outline-variant/30 pt-stack-md">
                      <p className="font-caption text-caption text-on-surface-variant italic">
                        Payment will be processed at the studio.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-outline-variant/30 bg-surface p-stack-lg shadow-[0_2px_4px_rgba(15,23,42,0.04)]">
                <div className="flex flex-col gap-gutter md:flex-row">
                  <div className="flex-grow">
                    <h4 className="mb-2 font-headline-md text-headline-md">
                      Location
                    </h4>
                    <p className="font-body-lg text-body-lg font-bold">
                      Elite Studio — Manhattan
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      420 Madison Avenue, 12th Floor
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      New York, NY 10017
                    </p>
                    <button className="mt-4 flex items-center font-label-md text-label-md text-primary hover:underline">
                      <Navigation aria-hidden="true" className="mr-1 size-5" />
                      Get Directions
                    </button>
                  </div>
                  <div className="relative h-48 w-full overflow-hidden rounded-lg border border-outline-variant/30 md:w-64">
                    <div
                      className="absolute inset-0"
                      data-location="Manhattan, New York"
                    ></div>
                    <img
                      className="h-full w-full object-cover"
                      data-alt="A clean, minimalist map rendering of Manhattan's Midtown area, showing street grids in light gray and highlights in professional blue. The style is modern and high-contrast, fitting a premium service application."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkAcmM3Y2oon9FVP2Xp17Ou83hELB2d0xy848Zn7oogq6_C6LQ0t8cjRRuzsqgI3HE_Rx2xZwXpc-Yig2uk5qs0LAmH-bgGH9Y93CXQWmNkr9FZsLZzZ1-pMM2IYx4rnV_uw1GVoGFEzZdKcJyTB_5omRBiRNGfy_VTC_hOPNrvLzsITLnIMHpPdupXXEh-tr6WZElylBFdy_k_imo87c--vkRZwIuZCD1o0-mkl_u_mAHDa8rnI3h6xde8XP7AtfThW1ROHuh5tI"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-stack-lg lg:col-span-4">
              <div className="rounded-xl border border-outline-variant/30 bg-surface p-stack-lg shadow-[0_2px_4px_rgba(15,23,42,0.04)]">
                <h4 className="mb-stack-md font-label-md text-label-md text-on-surface-variant uppercase">
                  Your Professional
                </h4>
                <div className="mb-stack-md flex items-center gap-stack-md">
                  <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-secondary-container">
                    <img
                      className="h-full w-full object-cover"
                      data-alt="Close-up headshot of a master barber with a sharp, professional appearance. He is wearing a minimalist dark apron in a bright, modern studio. The lighting is clean and emphasizes his focus on precision. The aesthetic is high-end and reliable."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3cDF64DHfZAl0FBZPI9Si0YDzv2brUoLbf9YT-ZzoBYa3VDfXCKjQNtjMxGQOCyu3Rtb40S9W0Bt4Ih8e7rmd81RXT7msghkPFlLdJiUz-oLzlBhnFCG424dIAtc8qtK-SbvOVtuIMwvHxy0I5CAnUN7_iK1jh0tVcdWRpRYs6S3sVUN_RaOTxTWkBTJvfG5yRP5Td2fASjdRcwOhWg2C2tRbrl2g_rW_AGaUj70Wgi3EWDHyW3lHNmaOhGjO1xvb5kr6Cc2y4Fk"
                    />
                  </div>
                  <div>
                    <p className="font-headline-md text-headline-md">
                      Julian Sterling
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Master Barber • Elite Tier
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex flex-1 items-center justify-center rounded-lg bg-surface-variant/30 px-4 py-3 font-label-md text-label-md text-primary transition-all hover:bg-surface-variant/50">
                    <MessageCircle aria-hidden="true" className="mr-2 size-5" />
                    Message
                  </button>
                  <button className="flex flex-1 items-center justify-center rounded-lg bg-surface-variant/30 px-4 py-3 font-label-md text-label-md text-primary transition-all hover:bg-surface-variant/50">
                    <User aria-hidden="true" className="mr-2 size-5" />
                    Profile
                  </button>
                </div>
              </div>

              <div className="rounded-xl bg-primary p-stack-lg text-on-primary shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
                <h4 className="mb-stack-md font-headline-md text-headline-md text-white">
                  Manage Booking
                </h4>
                <div className="flex flex-col gap-stack-sm">
                  <button className="flex w-full items-center justify-center rounded-lg bg-secondary-container py-4 font-label-md text-label-md text-on-secondary-container transition-all hover:brightness-105 active:scale-95">
                    <CalendarClock aria-hidden="true" className="mr-2 size-5" />
                    Reschedule Appointment
                  </button>
                  <button className="flex w-full items-center justify-center rounded-lg border border-white/20 bg-transparent py-4 font-label-md text-label-md text-white transition-all hover:bg-white/10 active:scale-95">
                    <X aria-hidden="true" className="mr-2 size-5" />
                    Cancel Booking
                  </button>
                </div>
                <p className="mt-stack-md text-center font-caption text-caption text-white/60">
                  Cancellations are free up to 24 hours before the appointment
                  time.
                </p>
              </div>

              <button className="flex w-full items-center justify-center gap-stack-sm rounded-lg border border-dashed border-outline-variant py-stack-md font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary">
                <CirclePlus aria-hidden="true" className="size-5" />
                Add to Google Calendar
              </button>
            </div>
          </div>
        </main>

        <nav className="pb-safe fixed bottom-0 z-50 flex h-20 w-full items-center justify-around border-t border-outline-variant bg-surface px-4 shadow-[0px_-2px_10px_rgba(15,23,42,0.04)] md:hidden">
          <button className="flex flex-col items-center justify-center text-on-surface-variant opacity-60 transition-transform duration-200 active:scale-90">
            <CalendarDays aria-hidden="true" className="size-6" />
            <span className="font-label-md text-label-md">Schedule</span>
          </button>
          <button className="flex flex-col items-center justify-center text-on-surface-variant opacity-60 transition-transform duration-200 active:scale-90">
            <Users aria-hidden="true" className="size-6" />
            <span className="font-label-md text-label-md">Clients</span>
          </button>
          <button className="flex flex-col items-center justify-center font-bold text-secondary transition-transform duration-200 active:scale-90">
            <History aria-hidden="true" className="size-6 fill-current" />
            <span className="font-label-md text-label-md">History</span>
          </button>
          <button className="flex flex-col items-center justify-center text-on-surface-variant opacity-60 transition-transform duration-200 active:scale-90">
            <User aria-hidden="true" className="size-6" />
            <span className="font-label-md text-label-md">Profile</span>
          </button>
        </nav>
      </div>
    </>
  );
}
