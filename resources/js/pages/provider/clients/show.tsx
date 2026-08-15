import { Head } from '@inertiajs/react';
import {
  ArrowLeft,
  Calendar,
  CalendarDays,
  CalendarRange,
  ChevronRight,
  CircleCheck,
  ContactRound,
  CreditCard,
  Download,
  History,
  LayoutDashboard,
  Mail,
  Phone,
  Plus,
  Scissors,
  Settings,
  User,
  Users,
} from 'lucide-react';

export default function ClientDetails() {
  return (
    <>
      <Head title="Client Details - Craft & Groom">
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="min-h-screen bg-background pb-24 font-body-md text-on-background md:pb-0">
        <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-outline-variant bg-surface px-margin-mobile md:px-margin-desktop">
          <div className="flex items-center gap-4">
            <button className="rounded-full p-2 transition-all transition-colors hover:bg-surface-variant/50 active:opacity-80">
              <ArrowLeft aria-hidden="true" className="size-6 text-primary" />
            </button>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary md:font-headline-lg md:text-headline-lg">
              Craft & Groom
            </h1>
          </div>
          <div className="h-10 w-10 overflow-hidden rounded-full border border-outline-variant">
            <img
              className="h-full w-full object-cover"
              data-alt="A professional headshot of a master barber in an elite studio setting. The lighting is sophisticated and warm, reflecting a premium service environment. He wears a clean, high-quality apron and has a focused, expert expression. The background is a blurred high-end barbershop with dark wood and metallic accents, consistent with a luxury craft aesthetic."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuByPf7ObTU-Wil5melUe7N1yYjPEzYQIS74l7x4_oA1W4izT0FnuLme9kdHhrYMmah2LUCGjMHb-90XEDtuDQEHGeosB9emGjK4lmr7-ZX71CjsXp9QVRnwS_Y7jp2ShfbpyziSTn-k7wt1Gu27su-6_QoDpsV7pGe2AkJLqX0BwpxB6N1MgHMSiBdegJal5THXIio6EMcZNYYfSEElBCfcyu7NmUPeQvA5aghRls68LGs-JlPqsDJrbXNKceJLf08uoYFpjXpKA8o"
            />
          </div>
        </header>
        <main className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-12">
            <div className="flex flex-col items-center rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-stack-md text-center shadow-[0px_2px_4px_rgba(15,23,42,0.04)] md:col-span-4">
              <div className="relative mb-stack-md h-32 w-32 overflow-hidden rounded-full ring-4 ring-secondary/10 md:h-40 md:w-40">
                <img
                  className="h-full w-full object-cover"
                  data-alt="A high-end portrait of a sophisticated male client for a premium grooming service. He is styled meticulously with a sharp, modern haircut and a well-maintained beard. The setting is a bright, minimalist studio with soft, natural light coming from the side. The color palette is clean, featuring whites and soft grays to emphasize the luxury minimalist feel of the 'Craft & Groom' brand."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOQQNZUmzLRx7Zi95i3mDwtjtS4ANtyHiF9oxEZzVUNIVj-CWypyvxPX9UVhKIBDdjFfr_xbSZSy7uoF0L1dvBbQps8wj2wUNuvRIVkfMcKKDrLc2l2AsozKI8mHfD9ETo8N7D4_Ep7_2NJSkTvbUf0DJPUw135r1m8bKZHbyjsxJUgc9-C-fA833B0TWp5uFDi4nFefQnfEf_FhfnK3PhZmRHgiIO96qmNXM7HCECbxx5orgLyVAzCDelkLvWQBz1hUtBfBbCwK8"
                />
              </div>
              <h2 className="mb-1 font-headline-lg-mobile text-headline-lg-mobile text-primary">
                Julian Sterling
              </h2>
              <span className="mb-stack-md rounded-full bg-secondary-container px-3 py-1 font-label-md text-label-md text-on-secondary-fixed-variant">
                V.I.P. Member
              </span>
              <div className="w-full space-y-3 border-t border-outline-variant pt-4">
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <Phone aria-hidden="true" className="size-5" />
                  <span className="font-body-md text-body-md">
                    +1 (555) 234-8901
                  </span>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <Mail aria-hidden="true" className="size-5" />
                  <span className="font-body-md text-body-md">
                    j.sterling@outlook.com
                  </span>
                </div>
              </div>
              <div className="mt-stack-md flex w-full gap-2">
                <button className="flex-1 rounded-lg bg-primary py-3 font-label-md text-label-md text-on-primary transition-all active:scale-95">
                  Message
                </button>
                <button className="flex-1 rounded-lg border border-primary py-3 font-label-md text-label-md text-primary transition-all active:scale-95">
                  Call
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-gutter md:col-span-8 md:grid-cols-2">
              <div className="flex flex-col rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-stack-md shadow-[0px_2px_4px_rgba(15,23,42,0.04)]">
                <div className="mb-stack-md flex items-center gap-2">
                  <Scissors
                    aria-hidden="true"
                    className="size-6 text-secondary"
                  />
                  <h3 className="font-md text-md text-primary">
                    Grooming Profile
                  </h3>
                </div>
                <div className="flex-grow space-y-4">
                  <div>
                    <p className="mb-1 font-label-md text-label-md text-on-surface-variant uppercase">
                      Primary Style
                    </p>
                    <p className="font-body-lg text-body-lg font-semibold text-primary">
                      Low-Fade Executive Contour
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 font-label-md text-label-md text-on-surface-variant uppercase">
                      Beard Trim
                    </p>
                    <p className="font-body-md text-body-md text-primary">
                      Tapered length, natural cheek line, sandalwood oil finish.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 font-label-md text-label-md text-on-surface-variant uppercase">
                      Products Used
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-lg bg-surface-container-high px-3 py-1 font-label-md text-caption text-on-surface">
                        Matte Clay
                      </span>
                      <span className="rounded-lg bg-surface-container-high px-3 py-1 font-label-md text-caption text-on-surface">
                        Sea Salt Spray
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-gutter">
                <div className="flex h-[calc(50%-12px)] flex-col justify-between rounded-xl bg-primary p-stack-md text-on-primary shadow-lg">
                  <div>
                    <p className="font-label-md text-label-md uppercase opacity-70">
                      Total Spend
                    </p>
                    <p className="font-display-lg text-lg">$1,420.00</p>
                  </div>
                  <p className="mt-2 font-body-md text-body-md opacity-80">
                    Last visit: 12 days ago
                  </p>
                </div>
                <div className="flex h-[calc(50%-12px)] flex-col justify-center rounded-xl bg-secondary-container p-stack-md">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-md text-md text-on-secondary-fixed-variant">
                      Next Booking
                    </span>
                    <Calendar
                      aria-hidden="true"
                      className="size-6 text-on-secondary-fixed-variant"
                    />
                  </div>
                  <p className="font-display-lg text-[28px] leading-tight text-on-secondary-fixed-variant">
                    OCT 24, 2023
                  </p>
                  <p className="font-body-md text-body-md text-on-secondary-fixed-variant opacity-80">
                    02:30 PM • 60 mins
                  </p>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-stack-lg">
            <div className="mb-stack-md flex items-center justify-between">
              <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
                Appointment History
              </h3>
              <button className="flex items-center gap-1 font-label-md text-label-md text-secondary">
                Export PDF <Download aria-hidden="true" className="size-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="group flex cursor-pointer flex-col justify-between gap-4 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-stack-md transition-shadow hover:shadow-md md:flex-row md:items-center">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-surface-container-high text-primary transition-colors group-hover:bg-secondary-container">
                    <span className="font-label-md text-[12px] leading-none uppercase">
                      Oct
                    </span>
                    <span className="font-md text-md leading-none">
                      08
                    </span>
                  </div>
                  <div>
                    <h4 className="font-md text-md text-primary">
                      Full Service Grooming
                    </h4>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Haircut, Beard, Charcoal Mask
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="hidden text-right md:block">
                    <p className="font-label-md text-label-md text-on-surface-variant">
                      PROVIDER
                    </p>
                    <p className="font-body-md text-body-md font-semibold text-primary">
                      Master Barber James
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display-lg text-md text-primary">
                      $120
                    </p>
                    <span className="flex items-center justify-end gap-1 font-label-md text-caption text-green-600">
                      <CircleCheck
                        aria-hidden="true"
                        className="size-3.5 fill-current"
                      />{' '}
                      Paid
                    </span>
                  </div>
                  <ChevronRight
                    aria-hidden="true"
                    className="size-6 text-on-surface-variant transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>

              <div className="group flex cursor-pointer flex-col justify-between gap-4 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-stack-md transition-shadow hover:shadow-md md:flex-row md:items-center">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-surface-container-high text-primary transition-colors group-hover:bg-secondary-container">
                    <span className="font-label-md text-[12px] leading-none uppercase">
                      Sep
                    </span>
                    <span className="font-md text-md leading-none">
                      12
                    </span>
                  </div>
                  <div>
                    <h4 className="font-md text-md text-primary">
                      Executive Haircut
                    </h4>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Signature Fade & Styling
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="hidden text-right md:block">
                    <p className="font-label-md text-label-md text-on-surface-variant">
                      PROVIDER
                    </p>
                    <p className="font-body-md text-body-md font-semibold text-primary">
                      Master Barber James
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display-lg text-md text-primary">
                      $85
                    </p>
                    <span className="flex items-center justify-end gap-1 font-label-md text-caption text-green-600">
                      <CircleCheck
                        aria-hidden="true"
                        className="size-3.5 fill-current"
                      />{' '}
                      Paid
                    </span>
                  </div>
                  <ChevronRight
                    aria-hidden="true"
                    className="size-6 text-on-surface-variant transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>

              <div className="group flex cursor-pointer flex-col justify-between gap-4 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-stack-md transition-shadow hover:shadow-md md:flex-row md:items-center">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-surface-container-high text-primary transition-colors group-hover:bg-secondary-container">
                    <span className="font-label-md text-[12px] leading-none uppercase">
                      Aug
                    </span>
                    <span className="font-md text-md leading-none">
                      15
                    </span>
                  </div>
                  <div>
                    <h4 className="font-md text-md text-primary">
                      Beard & Sculpt
                    </h4>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Line-up, Hot Towel, Oil Treatment
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="hidden text-right md:block">
                    <p className="font-label-md text-label-md text-on-surface-variant">
                      PROVIDER
                    </p>
                    <p className="font-body-md text-body-md font-semibold text-primary">
                      Senior Stylist Sarah
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display-lg text-md text-primary">
                      $45
                    </p>
                    <span className="flex items-center justify-end gap-1 font-label-md text-caption text-green-600">
                      <CircleCheck
                        aria-hidden="true"
                        className="size-3.5 fill-current"
                      />{' '}
                      Paid
                    </span>
                  </div>
                  <ChevronRight
                    aria-hidden="true"
                    className="size-6 text-on-surface-variant transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
              <div className="py-4 text-center">
                <button className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary">
                  View All 18 Past Appointments
                </button>
              </div>
            </div>
          </section>

          <div className="fixed bottom-24 left-0 z-40 w-full px-margin-mobile md:hidden">
            <button className="shadow-high flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-label-md text-label-md text-on-primary transition-all active:scale-[0.98]">
              <Plus aria-hidden="true" className="size-6" />
              New Appointment
            </button>
          </div>
        </main>

        <aside className="fixed top-0 left-0 z-50 hidden h-full w-80 flex-col border-r border-outline-variant bg-surface py-stack-lg md:flex">
          <div className="mb-stack-lg px-6">
            <h2 className="font-headline-lg text-headline-lg text-primary">
              Craft & Groom
            </h2>
            <div className="mt-8 flex items-center gap-3 rounded-xl bg-surface-container-low p-3">
              <div className="h-10 w-10 overflow-hidden rounded-full">
                <img
                  className="h-full w-full object-cover"
                  data-alt="A professional headshot of a master barber in an elite studio setting. The lighting is sophisticated and warm, reflecting a premium service environment. He wears a clean, high-quality apron and has a focused, expert expression. The background is a blurred high-end barbershop with dark wood and metallic accents, consistent with a luxury craft aesthetic."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTnN9jA6x4QjV6tF9szZrnIw1CHwmg7HgVGkWoPpAjI24tFv_ZX5C-ktC4VnnMhd-our2PGTZzwV_XLbLZJUERhGxSJfpirLl7YdIBuzpY39FqNYVXDkRuxij362vZc5QBHTmYx3FP1Ugml3zL6HUOdNbinXWcSKzITcOUsR-f58KuiTYMPF9GvlX4UVWZmybB6ow4EZVelw864Wjm6O7-DoId9aNRClIQYtWsbW2PNCNESZCYnbKIF8Ls2bT58E4T7Ef9vmIMgeM"
                />
              </div>
              <div>
                <p className="font-label-md text-label-md leading-none text-primary">
                  Master Barber
                </p>
                <p className="font-caption text-caption text-on-surface-variant">
                  Elite Studio • Premium Tier
                </p>
              </div>
            </div>
          </div>
          <nav className="flex-grow">
            <div className="mx-2 flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 text-on-surface-variant transition-all hover:bg-surface-container-high">
              <LayoutDashboard aria-hidden="true" className="size-6" />
              <span className="font-body-md text-body-md">Dashboard</span>
            </div>
            <div className="mx-2 flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 text-on-surface-variant transition-all hover:bg-surface-container-high">
              <CalendarRange aria-hidden="true" className="size-6" />
              <span className="font-body-md text-body-md">Appointments</span>
            </div>
            <div className="mx-2 flex items-center gap-4 rounded-lg bg-secondary-container px-4 py-3 text-on-secondary-container shadow-sm">
              <ContactRound aria-hidden="true" className="size-6" />
              <span className="font-body-md text-body-md font-bold">
                Client Database
              </span>
            </div>
            <div className="mx-2 flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 text-on-surface-variant transition-all hover:bg-surface-container-high">
              <CreditCard aria-hidden="true" className="size-6" />
              <span className="font-body-md text-body-md">Revenue</span>
            </div>
            <div className="mx-2 mt-auto flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 text-on-surface-variant transition-all hover:bg-surface-container-high">
              <Settings aria-hidden="true" className="size-6" />
              <span className="font-body-md text-body-md">Settings</span>
            </div>
          </nav>
        </aside>

        <nav className="pb-safe fixed bottom-0 z-50 flex h-20 w-full items-center justify-around border-t border-outline-variant bg-surface px-4 shadow-[0px_-2px_10px_rgba(15,23,42,0.04)] md:hidden">
          <div className="flex flex-col items-center justify-center text-on-surface-variant opacity-60">
            <CalendarDays aria-hidden="true" className="size-6" />
            <span className="font-label-md text-label-md">Schedule</span>
          </div>
          <div className="flex flex-col items-center justify-center font-bold text-secondary">
            <Users aria-hidden="true" className="size-6 fill-current" />
            <span className="font-label-md text-label-md">Clients</span>
          </div>
          <div className="flex flex-col items-center justify-center text-on-surface-variant opacity-60">
            <History aria-hidden="true" className="size-6" />
            <span className="font-label-md text-label-md">History</span>
          </div>
          <div className="flex flex-col items-center justify-center text-on-surface-variant opacity-60">
            <User aria-hidden="true" className="size-6" />
            <span className="font-label-md text-label-md">Profile</span>
          </div>
        </nav>

        <button className="fixed right-6 bottom-24 z-30 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-on-primary shadow-2xl transition-transform duration-200 active:scale-90 md:right-12 md:bottom-12">
          <Plus aria-hidden="true" className="size-8" />
        </button>
      </div>
    </>
  );
}
