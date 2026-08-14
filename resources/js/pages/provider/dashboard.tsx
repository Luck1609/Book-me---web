import { Head } from '@inertiajs/react';
import {
  CalendarDays,
  CalendarRange,
  CircleCheck,
  Compass,
  EllipsisVertical,
  LayoutDashboard,
  MapPin,
  Plus,
  Search,
  Settings,
  User,
  Users,
} from 'lucide-react';

export default function Dashboard() {
  return (
    <>
      <Head title="Craft & Care | Provider Dashboard">
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="overflow-x-hidden font-body-md">
        <header className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between bg-surface px-margin-mobile shadow-sm md:px-margin-desktop">
          <div className="flex items-center gap-3">
            <MapPin aria-hidden="true" className="size-6 text-primary" />
            <h1 className="font-headline-md text-headline-md text-primary">
              Craft &amp; Care
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low"
              data-icon="search"
            >
              <Search aria-hidden="true" className="size-6" />
            </button>
            <div className="h-8 w-8 overflow-hidden rounded-full border border-outline-variant bg-surface-container-highest">
              <img
                className="h-full w-full object-cover"
                data-alt="A clean professional studio portrait of a master barber in a minimalist, high-end shop environment. The lighting is soft and directional, emphasizing premium craftsmanship and expertise. The aesthetic is modern and sophisticated with a neutral, high-contrast palette."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuChF7bqPPqpYcR0he2FZjHwJXl3dAXChor2F7QlWBUQXWGe-YfoJ0yEvC2B9BtFRDHRbu1RDzn1fCYX0tZ2_Y07GwT0jSq9hPP47SKyOtohoPhpf1UTEEjtBFiDsXeKdg8cxp8ZUmcxVj4ExAOqZYZ7Y8jsdUUssBo1jUw1z-e4Cjgzbaf4FEyV5Tb7OC8DhrayrTks76qE-IywW5pCRXZdKdmzHbS8CoReLy0vLVQfbsfqxDc5BZVErDtJtDlkC04Evtps9tXg9tw"
              />
            </div>
          </div>
        </header>

        <aside className="fixed top-0 left-0 z-40 hidden h-screen w-72 flex-col bg-surface-container-low pt-20 shadow-lg md:flex">
          <div className="mb-8 flex flex-col px-6">
            <div className="mb-4 flex items-center gap-4">
              <div className="h-12 w-12 overflow-hidden rounded-lg border border-outline-variant bg-surface-container-highest">
                <img
                  className="h-full w-full object-cover"
                  data-alt="A macro close-up of a premium leather-wrapped chair in a minimalist modern barber shop. The image features shallow depth of field, highlighting the fine stitching and luxury texture. The lighting is cinematic and warm, conveying quality and care."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDl7o9xCnqwnXdpGgF_IweEkYfW7ps1TFzAV01Kj-G-9Tam7viuubUUZwfheUPH6N2d4wELGGggMMNLwb7IBmSB9ez0n3fNAZh62BTl6q4v_yEGoiHxm6UCFiPNqv2n1IY7rTfCZBsO5ufUXlBf3K2AnO32KwirG3ZuZCTqzFFnxxg1KCcssH8GrD6PEI-yfwSN2g8P1umXr3gqPCcLVWcz49etYxpQAPn9wbVmmfJl4uUXNzbeC-odDIvPjVJ6U8wrJ8lRCXbLmU"
                />
              </div>
              <div>
                <h2 className="font-headline-md text-headline-md text-primary">
                  The Master Barber
                </h2>
                <p className="font-caption text-on-surface-variant">
                  Open for Business
                </p>
              </div>
            </div>
            <div className="inline-block w-fit rounded-lg bg-secondary-container px-2 py-1">
              <span className="font-label-md text-label-md text-on-secondary-container">
                Provider Mode
              </span>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            <a
              className="mx-2 flex items-center gap-3 rounded-lg bg-secondary-container px-4 py-3 font-bold text-on-secondary-container transition-colors duration-100 active:opacity-80"
              href="#"
            >
              <LayoutDashboard aria-hidden="true" className="size-6" />
              <span className="font-body-md">Schedule</span>
            </a>
            <a
              className="mx-2 flex items-center gap-3 rounded-lg px-4 py-3 text-on-surface-variant transition-colors duration-100 hover:bg-surface-container-highest active:opacity-80"
              href="#"
            >
              <CalendarRange aria-hidden="true" className="size-6" />
              <span className="font-body-md">Bookings</span>
            </a>
            <a
              className="mx-2 flex items-center gap-3 rounded-lg px-4 py-3 text-on-surface-variant transition-colors duration-100 hover:bg-surface-container-highest active:opacity-80"
              href="#"
            >
              <Users aria-hidden="true" className="size-6" />
              <span className="font-body-md">Clients</span>
            </a>
            <a
              className="mx-2 flex items-center gap-3 rounded-lg px-4 py-3 text-on-surface-variant transition-colors duration-100 hover:bg-surface-container-highest active:opacity-80"
              href="#"
            >
              <Settings aria-hidden="true" className="size-6" />
              <span className="font-body-md">Settings</span>
            </a>
          </nav>
        </aside>

        <main className="px-margin-mobile pt-24 pb-28 md:ml-72 md:px-margin-desktop md:pt-28">
          <div className="mx-auto max-w-container-max">
            <section className="mb-stack-lg">
              <h2 className="mb-stack-md font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg">
                Today's Overview
              </h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                <div className="rounded-xl border border-[#E2E8F0] bg-surface-container-lowest p-6 shadow-[0px_2px_4px_rgba(15,23,42,0.04)] transition-all hover:shadow-md">
                  <p className="mb-2 font-label-md text-label-md text-on-surface-variant uppercase">
                    Total Bookings
                  </p>
                  <p className="font-display-lg text-display-lg text-primary">
                    12
                  </p>
                </div>
                <div className="rounded-xl border border-[#E2E8F0] bg-surface-container-lowest p-6 shadow-[0px_2px_4px_rgba(15,23,42,0.04)] transition-all hover:shadow-md">
                  <p className="mb-2 font-label-md text-label-md text-on-surface-variant uppercase">
                    Revenue Today
                  </p>
                  <p className="font-display-lg text-display-lg text-primary">
                    $450
                  </p>
                </div>

                <div className="hidden rounded-xl border border-[#E2E8F0] bg-surface-container-lowest p-6 shadow-[0px_2px_4px_rgba(15,23,42,0.04)] transition-all hover:shadow-md md:block">
                  <p className="mb-2 font-label-md text-label-md text-on-surface-variant uppercase">
                    Efficiency Rate
                  </p>
                  <p className="font-display-lg text-display-lg text-primary">
                    94%
                  </p>
                </div>
                <div className="hidden rounded-xl border border-[#E2E8F0] bg-surface-container-lowest p-6 shadow-[0px_2px_4px_rgba(15,23,42,0.04)] transition-all hover:shadow-md md:block">
                  <p className="mb-2 font-label-md text-label-md text-on-surface-variant uppercase">
                    Active Clients
                  </p>
                  <p className="font-display-lg text-display-lg text-primary">
                    8
                  </p>
                </div>
              </div>
            </section>

            <section>
              <div className="mb-stack-md flex items-center justify-between">
                <h2 className="font-headline-md text-headline-md text-primary">
                  Today's Schedule
                </h2>
                <div className="flex gap-2">
                  <button className="rounded-lg bg-surface-container-low px-4 py-2 font-label-md text-label-md transition-colors hover:bg-surface-container-highest">
                    Timeline
                  </button>
                  <button className="rounded-lg px-4 py-2 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-highest">
                    List
                  </button>
                </div>
              </div>
              <div className="relative space-y-stack-md pl-8 before:absolute before:inset-y-0 before:left-3 before:w-px before:bg-slate-200">
                <div className="relative opacity-60">
                  <div className="absolute top-4 -left-8 z-10 h-4 w-4 rounded-full border-4 border-surface bg-outline"></div>
                  <div className="rounded-xl border border-transparent bg-surface-container p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-label-md text-label-md text-on-surface-variant">
                          09:00 AM — 09:45 AM
                        </p>
                        <h3 className="font-headline-md text-headline-md text-on-surface">
                          Marcus Thorne
                        </h3>
                        <p className="font-body-md text-on-surface-variant">
                          Signature Fade &amp; Lineup
                        </p>
                      </div>
                      <CircleCheck
                        aria-hidden="true"
                        className="size-6 fill-current text-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute top-4 -left-8 z-10 h-4 w-4 animate-pulse rounded-full border-4 border-surface bg-secondary-container"></div>
                  <div className="rounded-xl border-l-4 border-secondary-container bg-surface-container-lowest p-6 shadow-[0px_12px_24px_rgba(15,23,42,0.08)]">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span className="rounded bg-primary-container px-2 py-0.5 text-[10px] font-bold tracking-widest text-on-primary-container uppercase">
                            In Progress
                          </span>
                          <p className="font-label-md text-label-md text-on-surface-variant">
                            10:00 AM — 11:00 AM
                          </p>
                        </div>
                        <h3 className="font-headline-md text-headline-md text-primary">
                          John Doe
                        </h3>
                        <p className="font-body-md text-on-surface-variant">
                          Traditional Hot Towel Shave
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-headline-md text-headline-md text-primary">
                          $65.00
                        </p>
                        <button className="mt-2 font-label-md text-label-md text-primary underline hover:text-on-surface-variant">
                          Manage
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute top-4 -left-8 z-10 h-4 w-4 rounded-full border-4 border-surface bg-outline-variant"></div>
                  <div className="rounded-xl border border-[#E2E8F0] bg-surface-container-lowest p-4 transition-colors hover:border-outline">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-label-md text-label-md text-on-surface-variant">
                          11:30 AM — 12:15 PM
                        </p>
                        <h3 className="font-headline-md text-headline-md text-primary">
                          Sarah Williams
                        </h3>
                        <p className="font-body-md text-on-surface-variant">
                          Style Consultation &amp; Trim
                        </p>
                      </div>
                      <EllipsisVertical
                        aria-hidden="true"
                        className="size-6 text-on-surface-variant"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute top-4 -left-8 z-10 h-4 w-4 rounded-full border-4 border-surface bg-outline-variant"></div>
                  <div className="rounded-xl border border-[#E2E8F0] bg-surface-container-lowest p-4 transition-colors hover:border-outline">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-label-md text-label-md text-on-surface-variant">
                          01:00 PM — 02:00 PM
                        </p>
                        <h3 className="font-headline-md text-headline-md text-primary">
                          Robert Chen
                        </h3>
                        <p className="font-body-md text-on-surface-variant">
                          Beard Sculpting &amp; Oil Treatment
                        </p>
                      </div>
                      <EllipsisVertical
                        aria-hidden="true"
                        className="size-6 text-on-surface-variant"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        <button className="group fixed right-6 bottom-24 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg duration-150 active:scale-95 md:right-12 md:bottom-12">
          <Plus aria-hidden="true" className="size-6 text-2xl" />
          <span className="ml-0 max-w-0 overflow-hidden font-label-md text-label-md whitespace-nowrap transition-all duration-300 group-hover:ml-2 group-hover:max-w-xs">
            Add Booking
          </span>
        </button>

        <nav className="shadow-high fixed bottom-0 left-0 z-50 flex w-full items-center justify-around rounded-t-xl border-t border-outline-variant/10 bg-surface px-4 py-2 md:hidden">
          <a
            className="flex flex-col items-center justify-center p-2 text-on-surface-variant transition-all duration-200 hover:bg-surface-container-highest active:scale-90"
            href="#"
          >
            <Compass aria-hidden="true" className="size-6" />
            <span className="font-label-md text-label-md">Discover</span>
          </a>
          <a
            className="flex flex-col items-center justify-center rounded-xl bg-primary-container p-2 text-on-primary-container duration-200 active:scale-90"
            href="#"
          >
            <CalendarDays aria-hidden="true" className="size-6 fill-current" />
            <span className="font-label-md text-label-md">Bookings</span>
          </a>
          <a
            className="flex flex-col items-center justify-center p-2 text-on-surface-variant transition-all duration-200 hover:bg-surface-container-highest active:scale-90"
            href="#"
          >
            <User aria-hidden="true" className="size-6" />
            <span className="font-label-md text-label-md">Profile</span>
          </a>
        </nav>
      </div>
    </>
  );
}
