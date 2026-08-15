import { Head } from '@inertiajs/react';
import {
  Bell,
  CalendarDays,
  CalendarRange,
  ChevronRight,
  ContactRound,
  CreditCard,
  EllipsisVertical,
  History,
  LayoutDashboard,
  Mail,
  Menu,
  Plus,
  Search,
  Settings,
  SlidersHorizontal,
  User,
  UserPlus,
  Users,
} from 'lucide-react';

export default function ClientListing() {
  return (
    <>
      <Head title="Client Database | Craft & Groom">
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="flex min-h-screen flex-col bg-background font-body-md text-on-background md:flex-row">
        <aside className="shadow-high sticky top-0 hidden h-screen w-80 flex-col rounded-r-xl bg-surface-container-low py-stack-lg text-primary md:flex">
          <div className="mb-10 px-6">
            <h1 className="font-headline-lg text-headline-lg tracking-tight text-primary">
              Craft & Groom
            </h1>
            <div className="mt-8 flex items-center gap-4 rounded-xl bg-surface-container p-4">
              <img
                className="h-12 w-12 rounded-full object-cover"
                data-alt="A professional studio portrait of a master barber in a minimalist, high-end salon. The lighting is soft and cinematic, highlighting the clean lines of the modern space. The aesthetic is monochromatic with subtle gold accents, conveying a sense of premium craftsmanship and quiet luxury."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMK7WnQhUFWsT4rwzEmwcRg7UZRLKz-sF4tk79gFwE9FrUaiupA58k_oISIOI88jxkIejn2UX8Hu4sVTYiyuH6DhvHBu9rt2fyIYVaV_BmgypQhwDFO382tb5bcmB4IP7TeoN0NVeSaj-imIdX5pjsY7cD0lrxDUjMEDwfA4sgPPYiODs4P-jl4nS6Wz0zl6cKR37ruelBZcOCYOqLWIggOWx5lsTCSOsYaLXrNcHJp_DujR8p9-iHoGUke678iMc-aSIcnwh63zc"
              />
              <div>
                <p className="font-md text-md">
                  Master Barber
                </p>
                <p className="font-caption text-caption opacity-70">
                  Elite Studio • Premium Tier
                </p>
              </div>
            </div>
          </div>
          <nav className="flex-1 space-y-2">
            <div className="mx-2 flex cursor-pointer items-center gap-3 px-4 py-3 text-on-surface-variant transition-all duration-150 hover:bg-surface-container-high">
              <LayoutDashboard aria-hidden="true" className="size-6" />
              <span>Dashboard</span>
            </div>
            <div className="mx-2 flex cursor-pointer items-center gap-3 px-4 py-3 text-on-surface-variant transition-all duration-150 hover:bg-surface-container-high">
              <CalendarRange aria-hidden="true" className="size-6" />
              <span>Appointments</span>
            </div>
            <div className="mx-2 flex cursor-pointer items-center gap-3 rounded-lg bg-secondary-container px-4 py-3 font-bold text-on-secondary-container transition-all duration-150">
              <ContactRound
                aria-hidden="true"
                className="size-6 fill-current"
              />
              <span>Client Database</span>
            </div>
            <div className="mx-2 flex cursor-pointer items-center gap-3 px-4 py-3 text-on-surface-variant transition-all duration-150 hover:bg-surface-container-high">
              <CreditCard aria-hidden="true" className="size-6" />
              <span>Revenue</span>
            </div>
            <div className="mx-2 flex cursor-pointer items-center gap-3 px-4 py-3 text-on-surface-variant transition-all duration-150 hover:bg-surface-container-high">
              <Settings aria-hidden="true" className="size-6" />
              <span>Settings</span>
            </div>
          </nav>
        </aside>

        <main className="flex min-h-screen flex-1 flex-col pb-24 md:pb-8">
          <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-outline-variant bg-surface px-margin-mobile">
            <div className="flex items-center gap-4">
              <button className="p-2 transition-colors hover:bg-surface-variant/50 active:opacity-80 md:hidden">
                <Menu aria-hidden="true" className="size-6" />
              </button>
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary md:font-headline-lg md:text-headline-lg">
                Clients
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-full p-2 transition-colors hover:bg-surface-variant/50">
                <Bell aria-hidden="true" className="size-6" />
              </button>
              <img
                className="h-8 w-8 rounded-full border border-outline-variant shadow-sm"
                data-alt="A close-up shot of a stylized profile picture avatar in a circular frame. The background is a soft, out-of-focus modern studio environment. The lighting is professional and warm, fitting for a high-end service provider interface."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi7wQ76x2DLSphMiSErp1rU9FeMjthbUVfSNPggrzN6Nc78wfrEQQO-C76ZUlgTmBkuANn5epDDschVEHsMlKN6xO6U0_sobzKZI266jnH-RoTh73yeez1VIxkIAerG4Crvd-4uSa8o4IPDUsFkPvcWZ_2PtzHL7vaVAp-U8IpKwPYo_RjQtj8uJ44xfBqvnCGm93pg-y1Ji9shcf_2yr_XWjeMlEh4p6R5dmh4UbyNOiQh8UC8vRq05QTnVDb8hA8HDe_blTH7IM"
              />
            </div>
          </header>

          <div className="mx-auto w-full max-w-container-max space-y-stack-lg p-margin-mobile md:p-margin-desktop">
            <section className="grid grid-cols-1 gap-gutter md:grid-cols-12">
              <div className="relative md:col-span-8">
                <Search
                  aria-hidden="true"
                  className="absolute top-1/2 left-4 size-6 -translate-y-1/2 text-outline"
                />
                <input
                  className="h-14 w-full rounded-lg border border-outline-variant bg-surface pr-4 pl-12 font-body-md text-on-surface shadow-[0px_2px_4px_rgba(15,23,42,0.04)] transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary"
                  placeholder="Search by name, phone or email..."
                  type="text"
                />
              </div>
              <div className="flex gap-2 md:col-span-4">
                <button className="shadow-low flex h-14 flex-1 items-center justify-center gap-2 rounded-lg bg-primary font-label-md text-on-primary transition-all active:scale-95">
                  <UserPlus aria-hidden="true" className="size-5" />
                  NEW CLIENT
                </button>
                <button className="flex h-14 w-14 items-center justify-center rounded-lg border border-outline-variant bg-surface transition-all hover:bg-surface-variant/20 active:scale-95">
                  <SlidersHorizontal aria-hidden="true" className="size-6" />
                </button>
              </div>
            </section>

            <div className="flex [scrollbar-width:none] items-center gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
              <button className="rounded-full bg-primary px-6 py-2 font-label-md text-on-primary transition-all">
                All Clients
              </button>
              <button className="rounded-full border border-outline-variant bg-surface px-6 py-2 font-label-md text-on-surface-variant transition-all hover:bg-surface-variant/30">
                Regulars
              </button>
              <button className="rounded-full border border-outline-variant bg-surface px-6 py-2 font-label-md text-on-surface-variant transition-all hover:bg-surface-variant/30">
                New Clients
              </button>
              <button className="rounded-full border border-outline-variant bg-surface px-6 py-2 font-label-md text-on-surface-variant transition-all hover:bg-surface-variant/30">
                Inactive
              </button>
            </div>

            <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="shadow-low hover:shadow-high group relative cursor-pointer overflow-hidden rounded-xl border border-outline-variant bg-surface p-6 transition-all">
                <div className="absolute top-0 right-0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <EllipsisVertical
                    aria-hidden="true"
                    className="size-6 text-outline"
                  />
                </div>
                <div className="flex items-start gap-4">
                  <img
                    className="h-16 w-16 rounded-xl object-cover shadow-sm"
                    data-alt="A professional headshot of a stylish male client for a premium grooming app. He is in a brightly lit environment with a clean, blurred background. The image has a high-end, lifestyle magazine feel with a minimalist color palette of whites and grays."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa4H1-Y021H95DgWIVUGsBk6OgNToxGEUG-uqbXtxs1H3lQ823SrXkmEVz3wUOCA1v64yAAdIEWJ_uRJi1APtNz68rYKthNYP25HHGBhFyvLsIDUXoikzMqNkNCYtY95v6kAOSBmmughw4GlWQVqZ3HYgbWm1jlz12Xtwfjcwq5UVTFe-fKfRMHtXZdJPy_kdP0srh8XdLBiSvyzjMKWKFIZ-m3YZK1GcQy4PlgL4OP7gxTI4eiC5Y_ZK9i3NJ712K1pvT8TOjT8k"
                  />
                  <div className="flex-1">
                    <h3 className="font-md text-md text-primary">
                      Julian Sterling
                    </h3>
                    <p className="mb-3 font-caption text-caption text-on-surface-variant">
                      Regular • 24 Visits
                    </p>
                    <div className="flex items-center gap-2 font-label-md text-outline">
                      <History aria-hidden="true" className="size-[18px]" />
                      <span>Last: Oct 12, 2023</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-outline-variant pt-4">
                  <span className="font-label-md text-secondary">
                    Premium Cut
                  </span>
                  <button className="flex items-center gap-1 font-label-md text-primary hover:underline">
                    Book <ChevronRight aria-hidden="true" className="size-4" />
                  </button>
                </div>
              </div>

              <div className="shadow-low hover:shadow-high group relative cursor-pointer overflow-hidden rounded-xl border border-outline-variant bg-surface p-6 transition-all">
                <div className="absolute top-0 right-0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <EllipsisVertical
                    aria-hidden="true"
                    className="size-6 text-outline"
                  />
                </div>
                <div className="flex items-start gap-4">
                  <img
                    className="h-16 w-16 rounded-xl object-cover shadow-sm"
                    data-alt="A portrait of a sophisticated woman with a sharp haircut, appearing as a client in a high-end salon interface. The lighting is airy and bright, emphasizing a modern light-mode aesthetic. The composition is clean, centered, and professional."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXFXh_zlFlKSIds3jMsXu65hIVjFiTzL2c8Gn7-uofSB5fRZaewIlENEsRtobjqVmdBL1PBk6UknSBWchpAYc5vX-7zjkYeHum_8barwuvtSUz-KwsflJXQtSeyaPR4IkP_sjLoh4PQ3U9oWlvXcB-LXO430snha1ZuZ8ATLSG89k4i-o2vYGPNkxiI8nJzYHXJqD8dL117i7Yt6ByifjhAIj7_rO0AT5JRi5WnQdD7llQpjk7G4SOGCAb2yFbKxCuimQJcVsXqBU"
                  />
                  <div className="flex-1">
                    <h3 className="font-md text-md text-primary">
                      Elena Rodriguez
                    </h3>
                    <p className="mb-3 font-caption text-caption text-on-surface-variant">
                      New Client • 1 Visit
                    </p>
                    <div className="flex items-center gap-2 font-label-md text-outline">
                      <History aria-hidden="true" className="size-[18px]" />
                      <span>Last: Nov 01, 2023</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-outline-variant pt-4">
                  <span className="font-label-md text-secondary">
                    Beard Sculpt
                  </span>
                  <button className="flex items-center gap-1 font-label-md text-primary hover:underline">
                    Book <ChevronRight aria-hidden="true" className="size-4" />
                  </button>
                </div>
              </div>

              <div className="shadow-low hover:shadow-high group relative cursor-pointer overflow-hidden rounded-xl border border-outline-variant bg-surface p-6 transition-all">
                <div className="absolute top-0 right-0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <EllipsisVertical
                    aria-hidden="true"
                    className="size-6 text-outline"
                  />
                </div>
                <div className="flex items-start gap-4">
                  <img
                    className="h-16 w-16 rounded-xl object-cover shadow-sm"
                    data-alt="A focused headshot of a client with a clean beard and stylish hair, suitable for a professional barber client list. The image is bright, with soft shadows and a minimalist background that feels modern and premium. High contrast and professional lighting."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbf79393s_9x2ROQsBBdRSWOVpxT8N7V-sAjMZLow_jG8xhqxQ3FIAVIXbLmo5UEOHG0RCAkw3rfKYD4mKOJA-FYV4mx5S4aUaYz4hD4YxRNGqIyPYMsMJqqwl5q6QE2dVx0382SfkDmas8R4sibhPDeBQST-ptSMvy-_Efp3kgaWTBufD-pCRkULT6NsOWiPjvR2uzKsFRkOm0QHBpNStsuKbWBqHt2rcwKaDZLRABjvFhpLol25XfxXToppIJvgP4WiMyEandN0"
                  />
                  <div className="flex-1">
                    <h3 className="font-md text-md text-primary">
                      Marcus Vane
                    </h3>
                    <p className="mb-3 font-caption text-caption text-on-surface-variant">
                      Regular • 12 Visits
                    </p>
                    <div className="flex items-center gap-2 font-label-md text-outline">
                      <History aria-hidden="true" className="size-[18px]" />
                      <span>Last: Oct 28, 2023</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-outline-variant pt-4">
                  <span className="font-label-md text-secondary">
                    Full Service
                  </span>
                  <button className="flex items-center gap-1 font-label-md text-primary hover:underline">
                    Book <ChevronRight aria-hidden="true" className="size-4" />
                  </button>
                </div>
              </div>

              <div className="shadow-low hover:shadow-high group relative cursor-pointer overflow-hidden rounded-xl border border-outline-variant bg-surface p-6 transition-all">
                <div className="absolute top-0 right-0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <EllipsisVertical
                    aria-hidden="true"
                    className="size-6 text-outline"
                  />
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-surface-variant font-md text-primary shadow-sm">
                    SK
                  </div>
                  <div className="flex-1">
                    <h3 className="font-md text-md text-primary">
                      Soren Kierkegaard
                    </h3>
                    <p className="mb-3 font-caption text-caption text-on-surface-variant">
                      Inactive • 8 Visits
                    </p>
                    <div className="flex items-center gap-2 font-label-md text-outline">
                      <History aria-hidden="true" className="size-[18px]" />
                      <span>Last: Aug 15, 2023</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-outline-variant pt-4">
                  <span className="font-label-md text-on-error-container">
                    Follow up needed
                  </span>
                  <button className="flex items-center gap-1 font-label-md text-primary hover:underline">
                    Email <Mail aria-hidden="true" className="size-4" />
                  </button>
                </div>
              </div>

              <div className="shadow-low hover:shadow-high group relative cursor-pointer overflow-hidden rounded-xl border border-outline-variant bg-surface p-6 transition-all">
                <div className="absolute top-0 right-0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <EllipsisVertical
                    aria-hidden="true"
                    className="size-6 text-outline"
                  />
                </div>
                <div className="flex items-start gap-4">
                  <img
                    className="h-16 w-16 rounded-xl object-cover shadow-sm"
                    data-alt="A portrait of a male client with a professional, clean-cut look. The background is a soft white, highlighting the crisp details of his haircut. The photo is professionally shot for a high-end service marketplace, emphasizing cleanliness and precision."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL_Ss9H7MOtd080m2v3VsAbCa_7vU_7QiD_Zcd71JtDaT2sspIyeGQNbmaUY-5WP9If_zUyrR_yh6_t9T8WoMT27_2jd_VVjL7uISaJ5XFL5Nj-KUrKUxq8bFKhTNDLwmGYX2N54AE0rS9O5lJXtFNAkRRGmL05QBui3uN8fp5w35vSqzGm5DR-AWHrr7IUH2YvsGroqvsXYh5Hw6YiwABErSS9Oo0mhpNc51xUSeJPgqMZSkUvuYbnuJUQ55r4yBTrgN7wnXdK4w"
                  />
                  <div className="flex-1">
                    <h3 className="font-md text-md text-primary">
                      David Chen
                    </h3>
                    <p className="mb-3 font-caption text-caption text-on-surface-variant">
                      Regular • 32 Visits
                    </p>
                    <div className="flex items-center gap-2 font-label-md text-outline">
                      <History aria-hidden="true" className="size-[18px]" />
                      <span>Last: Nov 03, 2023</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-outline-variant pt-4">
                  <span className="font-label-md text-secondary">
                    Classic Cut
                  </span>
                  <button className="flex items-center gap-1 font-label-md text-primary hover:underline">
                    Book <ChevronRight aria-hidden="true" className="size-4" />
                  </button>
                </div>
              </div>

              <div className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-outline-variant p-6 text-center transition-all hover:bg-surface-container/30">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface-variant text-outline transition-all group-hover:bg-primary group-hover:text-on-primary">
                  <Plus aria-hidden="true" className="size-6" />
                </div>
                <p className="font-md text-md text-on-surface-variant">
                  Add New Client
                </p>
                <p className="font-caption text-caption text-outline">
                  Quickly add details for a walk-in
                </p>
              </div>
            </section>
          </div>
        </main>

        <nav className="pb-safe fixed bottom-0 z-50 flex h-20 w-full items-center justify-around border-t border-outline-variant bg-surface px-4 shadow-[0px_-2px_10px_rgba(15,23,42,0.04)] md:hidden">
          <div className="flex cursor-pointer flex-col items-center justify-center text-on-surface-variant opacity-60 transition-colors hover:text-secondary">
            <CalendarDays aria-hidden="true" className="size-6" />
            <span className="mt-1 font-label-md text-label-md">Schedule</span>
          </div>
          <div className="flex cursor-pointer flex-col items-center justify-center font-bold text-secondary transition-colors">
            <Users aria-hidden="true" className="size-6 fill-current" />
            <span className="mt-1 font-label-md text-label-md">Clients</span>
          </div>
          <div className="flex cursor-pointer flex-col items-center justify-center text-on-surface-variant opacity-60 transition-colors hover:text-secondary">
            <History aria-hidden="true" className="size-6" />
            <span className="mt-1 font-label-md text-label-md">History</span>
          </div>
          <div className="flex cursor-pointer flex-col items-center justify-center text-on-surface-variant opacity-60 transition-colors hover:text-secondary">
            <User aria-hidden="true" className="size-6" />
            <span className="mt-1 font-label-md text-label-md">Profile</span>
          </div>
        </nav>
      </div>
    </>
  );
}
