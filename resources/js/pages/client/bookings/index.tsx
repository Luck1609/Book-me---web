import { Head } from '@inertiajs/react';
import {
  CalendarDays,
  CalendarRange,
  CircleCheck,
  CircleX,
  Clock,
  Clock3,
  ContactRound,
  CreditCard,
  Ellipsis,
  History,
  LayoutDashboard,
  Menu,
  Scissors,
  Settings,
  Star,
  User,
  Users,
} from 'lucide-react';

export default function MyBookings() {
  return (
    <>
      <Head title="My Bookings - Craft & Groom">
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="min-h-screen bg-background pb-24 font-body-md text-on-background md:pt-0 md:pb-0 md:pl-20 lg:pl-80">
        <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-outline-variant bg-surface px-margin-mobile md:px-margin-desktop dark:border-outline dark:bg-surface-dim">
          <div className="flex items-center gap-4">
            <button
              className="rounded-full p-2 text-primary transition-colors hover:bg-surface-variant/50"
              data-icon="menu"
            >
              <Menu aria-hidden="true" className="size-6" />
            </button>
            <h1 className="font-headline-lg text-headline-lg-mobile tracking-tight text-primary md:text-headline-lg dark:text-primary-fixed-dim">
              Craft &amp; Groom
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 overflow-hidden rounded-full border border-outline-variant bg-surface-variant">
              <img
                className="h-full w-full object-cover"
                data-alt="A clean, minimalist portrait of a professional male hair stylist in a modern studio environment. The stylist is wearing a high-quality dark apron over a white shirt, looking towards the camera with a friendly, expert expression. The background is softly blurred, showing hints of a premium boutique salon with warm wood accents and soft, high-key lighting. The overall mood is professional, sophisticated, and trustworthy."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzTXrFYHDa65Vz2ZgrU_wkrxoxzx0ZBqH3_26O6VOm6e2yi5GyCmqDpAiumkb9u2LwGWYtSt3tdG1ETZ5vCmJ14kw5led_ZHoDKsj_fLhDauhw35A6YADz5cEtbEW5-L1TBPDdPStXShfGNShsL2_7MmrA_cctQSmwFA-XzxwOmB1cTxZ3c81ONT9gXSLg18tXel4pQX8ewa2QAwZUVSsZeZKMK3cbaQ-X_an8SWGRol7MnrXmc9eykuj2sFBlsTabKeRLYIm7xrs"
              />
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
          <section className="mb-stack-lg">
            <h2 className="mb-1 font-headline-lg text-headline-lg-mobile text-primary md:text-headline-lg">
              My Bookings
            </h2>
            <p className="font-body-md text-on-surface-variant">
              Manage your grooming ritual appointments.
            </p>
          </section>

          <div className="sticky top-16 z-30 mb-stack-lg flex border-b border-outline-variant bg-background pt-4">
            <button
              className="relative px-6 py-4 font-label-md text-label-md text-primary transition-colors"
              id="tab-upcoming"
            >
              Upcoming
              <div
                className="absolute -bottom-px left-0 h-[3px] w-full bg-black"
                id="indicator-upcoming"
              ></div>
            </button>
            <button
              className="relative px-6 py-4 font-label-md text-label-md text-on-surface-variant opacity-60 transition-colors hover:opacity-100"
              id="tab-past"
            >
              Past
              <div
                className="absolute -bottom-px left-0 hidden h-[3px] w-full bg-black"
                id="indicator-past"
              ></div>
            </button>
          </div>

          <div
            className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3"
            id="upcoming-content"
          >
            <div className="flex transform flex-col gap-4 rounded-xl border border-outline-variant/30 bg-surface p-6 shadow-[0_2px_4px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-md text-md text-primary">
                    Gentleman's Cut
                  </h3>
                  <p className="font-body-md text-on-surface-variant">
                    The Elite Studio
                  </p>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-secondary-container px-3 py-1 font-label-md text-caption text-on-secondary-fixed-variant">
                  <CircleCheck
                    aria-hidden="true"
                    className="size-3.5 fill-current"
                  />
                  Confirmed
                </span>
              </div>
              <div className="h-px w-full bg-outline-variant"></div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-on-surface">
                  <CalendarDays
                    aria-hidden="true"
                    className="size-6 text-primary opacity-60"
                  />
                  <span className="font-body-md">Thursday, Oct 24, 2023</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface">
                  <Clock
                    aria-hidden="true"
                    className="size-6 text-primary opacity-60"
                  />
                  <span className="font-body-md">10:30 AM — 11:15 AM</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface">
                  <User
                    aria-hidden="true"
                    className="size-6 text-primary opacity-60"
                  />
                  <span className="font-body-md">Master Barber Marcus</span>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <button className="flex-1 rounded-lg border border-primary py-3 font-label-md text-label-md text-primary transition-all hover:bg-surface-variant/20 active:scale-95">
                  Reschedule
                </button>
                <button className="rounded-lg border border-outline-variant p-3 text-on-surface-variant transition-all hover:border-error hover:bg-error/10 hover:text-error">
                  <Ellipsis aria-hidden="true" className="size-6" />
                </button>
              </div>
            </div>

            <div className="flex transform flex-col gap-4 rounded-xl border border-outline-variant/30 bg-surface p-6 shadow-[0_2px_4px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-md text-md text-primary">
                    Beard Sculpting
                  </h3>
                  <p className="font-body-md text-on-surface-variant">
                    Heritage Lounge
                  </p>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-surface-variant px-3 py-1 font-label-md text-caption text-on-surface-variant">
                  <Clock3 aria-hidden="true" className="size-3.5" />
                  Pending
                </span>
              </div>
              <div className="h-px w-full bg-outline-variant"></div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-on-surface">
                  <CalendarDays
                    aria-hidden="true"
                    className="size-6 text-primary opacity-60"
                  />
                  <span className="font-body-md">Monday, Nov 2, 2023</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface">
                  <Clock
                    aria-hidden="true"
                    className="size-6 text-primary opacity-60"
                  />
                  <span className="font-body-md">02:00 PM — 02:45 PM</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface">
                  <User
                    aria-hidden="true"
                    className="size-6 text-primary opacity-60"
                  />
                  <span className="font-body-md">Senior Groomer Elena</span>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <button className="flex-1 rounded-lg border border-primary py-3 font-label-md text-label-md text-primary transition-all hover:bg-surface-variant/20 active:scale-95">
                  Modify
                </button>
                <button className="rounded-lg border border-outline-variant p-3 text-on-surface-variant transition-all hover:border-error hover:bg-error/10 hover:text-error">
                  <CircleX aria-hidden="true" className="size-6" />
                </button>
              </div>
            </div>
          </div>
          <div
            className="grid hidden grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3"
            id="past-content"
          >
            <div className="flex flex-col gap-4 rounded-xl border border-outline-variant/30 bg-surface/60 p-6 opacity-80 grayscale-[0.2]">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-md text-md text-on-surface-variant">
                    Signature Fade
                  </h3>
                  <p className="font-body-md text-on-surface-variant">
                    The Elite Studio
                  </p>
                </div>
                <span className="rounded-full bg-surface-container px-3 py-1 font-label-md text-caption text-on-surface-variant">
                  Completed
                </span>
              </div>
              <div className="h-px w-full bg-outline-variant/50"></div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-on-surface-variant opacity-70">
                  <CalendarDays aria-hidden="true" className="size-6" />
                  <span className="font-body-md">Sept 12, 2023</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant opacity-70">
                  <CreditCard aria-hidden="true" className="size-6" />
                  <span className="font-body-md font-bold text-primary">
                    $45.00
                  </span>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <button className="flex-1 rounded-lg bg-primary py-3 font-label-md text-label-md text-white transition-all hover:opacity-90 active:scale-95">
                  Rebook Service
                </button>
                <button className="rounded-lg border border-outline-variant p-3 text-on-surface-variant transition-all hover:bg-surface-variant">
                  <Star aria-hidden="true" className="size-6" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-xl border border-outline-variant/30 bg-surface/60 p-6 opacity-80 grayscale-[0.2]">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-md text-md text-on-surface-variant">
                    Hot Towel Shave
                  </h3>
                  <p className="font-body-md text-on-surface-variant">
                    Craft &amp; Co.
                  </p>
                </div>
                <span className="rounded-full bg-surface-container px-3 py-1 font-label-md text-caption text-on-surface-variant">
                  Completed
                </span>
              </div>
              <div className="h-px w-full bg-outline-variant/50"></div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-on-surface-variant opacity-70">
                  <CalendarDays aria-hidden="true" className="size-6" />
                  <span className="font-body-md">Aug 05, 2023</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant opacity-70">
                  <CreditCard aria-hidden="true" className="size-6" />
                  <span className="font-body-md font-bold text-primary">
                    $35.00
                  </span>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <button className="flex-1 rounded-lg bg-primary py-3 font-label-md text-label-md text-white transition-all hover:opacity-90 active:scale-95">
                  Rebook Service
                </button>
                <button className="rounded-lg border border-outline-variant p-3 text-on-surface-variant transition-all hover:bg-surface-variant">
                  <Star aria-hidden="true" className="size-6" />
                </button>
              </div>
            </div>
          </div>
        </main>

        <nav className="pb-safe fixed bottom-0 z-50 flex h-20 w-full items-center justify-around border-t border-outline-variant bg-surface px-4 shadow-[0px_-2px_10px_rgba(15,23,42,0.04)] md:hidden dark:border-outline dark:bg-surface-dim">
          <a
            className="flex flex-col items-center justify-center text-on-surface-variant opacity-60 transition-colors hover:text-secondary dark:text-on-surface-variant"
            href="#"
          >
            <CalendarDays aria-hidden="true" className="size-6" />
            <span className="font-label-md text-label-md">Schedule</span>
          </a>
          <a
            className="flex flex-col items-center justify-center text-on-surface-variant opacity-60 transition-colors hover:text-secondary dark:text-on-surface-variant"
            href="#"
          >
            <Users aria-hidden="true" className="size-6" />
            <span className="font-label-md text-label-md">Clients</span>
          </a>
          <a
            className="flex flex-col items-center justify-center font-bold text-secondary transition-transform duration-200 active:scale-90 dark:text-secondary-fixed-dim"
            href="#"
          >
            <History aria-hidden="true" className="size-6 fill-current" />
            <span className="font-label-md text-label-md">History</span>
          </a>
          <a
            className="flex flex-col items-center justify-center text-on-surface-variant opacity-60 transition-colors hover:text-secondary dark:text-on-surface-variant"
            href="#"
          >
            <User aria-hidden="true" className="size-6" />
            <span className="font-label-md text-label-md">Profile</span>
          </a>
        </nav>

        <div className="shadow-high fixed top-0 left-0 z-50 hidden h-full w-20 flex-col border-r border-outline-variant bg-surface py-stack-lg md:flex lg:w-80 dark:bg-surface-container-low">
          <div className="mb-12 px-6">
            <h2 className="hidden font-headline-lg text-headline-lg text-primary lg:block">
              Craft &amp; Groom
            </h2>
            <Scissors
              aria-hidden="true"
              className="size-8 text-primary lg:hidden"
            />
          </div>
          <div className="flex h-full flex-col gap-2">
            <div className="mx-2 flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 text-on-surface-variant transition-all hover:bg-surface-container-high">
              <LayoutDashboard aria-hidden="true" className="size-6" />
              <span className="hidden font-body-md lg:block">Dashboard</span>
            </div>
            <div className="mx-2 flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 text-on-surface-variant transition-all hover:bg-surface-container-high">
              <CalendarRange aria-hidden="true" className="size-6" />
              <span className="hidden font-body-md lg:block">Appointments</span>
            </div>
            <div className="mx-2 flex items-center gap-4 rounded-lg bg-secondary-container px-4 py-3 text-on-secondary-container dark:bg-on-secondary-fixed-variant dark:text-secondary-fixed">
              <History aria-hidden="true" className="size-6 fill-current" />
              <span className="hidden font-body-md lg:block">History</span>
            </div>
            <div className="mx-2 flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 text-on-surface-variant transition-all hover:bg-surface-container-high">
              <ContactRound aria-hidden="true" className="size-6" />
              <span className="hidden font-body-md lg:block">
                Client Database
              </span>
            </div>
            <div className="mx-2 mt-auto flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 text-on-surface-variant transition-all hover:bg-surface-container-high">
              <Settings aria-hidden="true" className="size-6" />
              <span className="hidden font-body-md lg:block">Settings</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
