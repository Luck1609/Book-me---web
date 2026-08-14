import { Head } from '@inertiajs/react';
import {
  CalendarDays,
  CalendarRange,
  CircleCheck,
  Compass,
  ImagePlus,
  Info,
  LayoutDashboard,
  MapPin,
  Pencil,
  Plus,
  Scissors,
  Search,
  Settings,
  Trash2,
  User,
  UserRound,
  Users,
  X,
} from 'lucide-react';

export default function ShopProfile() {
  return (
    <>
      <Head title="Craft & Care | Provider Settings">
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
        <aside className="fixed top-0 left-0 z-40 hidden h-screen w-72 flex-col bg-surface-container-low shadow-lg md:flex dark:bg-surface-container-high">
          <div className="flex flex-col items-start gap-4 p-margin-desktop">
            <div className="h-16 w-16 overflow-hidden rounded-full border border-outline-variant bg-surface-container-highest">
              <img
                className="h-full w-full object-cover"
                data-alt="A professional, clean-cut portrait of a high-end service provider in a minimalist studio setting. The lighting is bright and airy, emphasizing a premium brand identity. The background features soft grey tones and elegant, architectural lines that suggest a modern boutique experience. Soft focus highlights the provider's approachable yet expert demeanor."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBs4lwqBHDNnM9Mu2T4Md0oBGj4-HpelzkRvPo1qHPlPpDoLC7Jzgim3y3fMXBgpomdsYDALCKrxC5teY9HNUT5T-WT31FhhaEX_JDF_ff1xe-UgXMWZs7vWreWmBlWoEXGayM1npCSlEopk5ozNOwS36sDdog2DA7lrsJKN-xZyZizzXxyDO25fmNCUI3JwF7O50bngdQdwPbLgXlBnl31bMIsauobRwwaiJ_ZyP80RmYLzoSEuugUrbIulzEvvNI2lextmC7S-HU"
              />
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md text-primary">
                The Master Barber
              </h2>
              <p className="font-label-md text-label-md text-on-surface-variant">
                Open for Business
              </p>
              <span className="mt-1 block font-caption text-caption text-secondary">
                Provider Mode
              </span>
            </div>
          </div>
          <nav className="mt-4 flex-1 space-y-1">
            <a
              className="mx-2 flex items-center gap-3 rounded-lg px-4 py-3 text-on-surface-variant transition-colors hover:bg-surface-container-highest"
              href="#"
            >
              <LayoutDashboard aria-hidden="true" className="size-6" />
              <span>Schedule</span>
            </a>
            <a
              className="mx-2 flex items-center gap-3 rounded-lg px-4 py-3 text-on-surface-variant transition-colors hover:bg-surface-container-highest"
              href="#"
            >
              <CalendarRange aria-hidden="true" className="size-6" />
              <span>Bookings</span>
            </a>
            <a
              className="mx-2 flex items-center gap-3 rounded-lg px-4 py-3 text-on-surface-variant transition-colors hover:bg-surface-container-highest"
              href="#"
            >
              <Users aria-hidden="true" className="size-6" />
              <span>Clients</span>
            </a>
            <a
              className="mx-2 flex items-center gap-3 rounded-lg bg-secondary-container px-4 py-3 font-bold text-on-secondary-container"
              href="#"
            >
              <Settings aria-hidden="true" className="size-6 fill-current" />
              <span>Settings</span>
            </a>
          </nav>
        </aside>

        <header className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between bg-surface px-margin-mobile shadow-sm md:hidden">
          <h1 className="font-headline-md text-headline-md text-primary">
            Craft &amp; Care
          </h1>
          <div className="flex gap-4">
            <button className="text-primary">
              <Search aria-hidden="true" className="size-6" />
            </button>
            <button className="text-primary">
              <MapPin aria-hidden="true" className="size-6" />
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-margin-mobile pt-20 pb-32 md:ml-72 md:px-margin-desktop md:pt-margin-desktop">
          <div className="mb-stack-lg">
            <h2 className="mb-2 font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg">
              Shop Profile
            </h2>
            <p className="font-body-md text-on-surface-variant">
              Manage your public presence and operational details.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
            <div className="space-y-stack-lg lg:col-span-8">
              <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_2px_4px_rgba(15,23,42,0.04)] transition-[transform,box-shadow] duration-200 hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-label-md text-label-md tracking-widest text-on-surface-variant uppercase">
                    Basic Information
                  </h3>
                  <Info aria-hidden="true" className="size-6 text-outline" />
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="block font-label-md text-label-md text-on-surface-variant uppercase">
                        Shop Name
                      </label>
                      <input
                        className="w-full rounded-lg border border-outline-variant bg-surface-container-low px-4 py-3 font-body-md focus:border-primary-container focus:shadow-[0_0_0_2px_rgba(19,27,46,0.1)] focus:outline-none"
                        type="text"
                        value="The Master Barber"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block font-label-md text-label-md text-on-surface-variant uppercase">
                        Category
                      </label>
                      <select className="w-full rounded-lg border border-outline-variant bg-surface-container-low px-4 py-3 font-body-md focus:border-primary-container focus:shadow-[0_0_0_2px_rgba(19,27,46,0.1)] focus:outline-none">
                        <option>Hair &amp; Grooming</option>
                        <option>Spa &amp; Wellness</option>
                        <option>Tattoo &amp; Piercing</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block font-label-md text-label-md text-on-surface-variant uppercase">
                      Address
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded-lg border border-outline-variant bg-surface-container-low py-3 pr-4 pl-10 font-body-md focus:border-primary-container focus:shadow-[0_0_0_2px_rgba(19,27,46,0.1)] focus:outline-none"
                        type="text"
                        value="124 Craftsmanship Way, Suite 4B, New York, NY"
                      />
                      <MapPin
                        aria-hidden="true"
                        className="absolute top-3.5 left-3 size-5 text-outline"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block font-label-md text-label-md text-on-surface-variant uppercase">
                      About the Shop
                    </label>
                    <textarea
                      className="w-full rounded-lg border border-outline-variant bg-surface-container-low px-4 py-3 font-body-md focus:border-primary-container focus:shadow-[0_0_0_2px_rgba(19,27,46,0.1)] focus:outline-none"
                      rows={4}
                    >
                      Premium grooming services for the modern gentleman. We
                      specialize in classic cuts, beard sculpting, and luxury
                      hot towel shaves.
                    </textarea>
                  </div>
                </div>
              </section>

              <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_2px_4px_rgba(15,23,42,0.04)] transition-[transform,box-shadow] duration-200 hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-label-md text-label-md tracking-widest text-on-surface-variant uppercase">
                    Service Menu
                  </h3>
                  <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-label-md text-label-md text-on-primary transition-all active:scale-95">
                    <Plus aria-hidden="true" className="size-3.5" /> Add Service
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border border-outline-variant/30 bg-surface-container-low p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded bg-primary-container text-on-primary-container">
                        <Scissors aria-hidden="true" className="size-6" />
                      </div>
                      <div>
                        <h4 className="font-headline-md text-headline-md text-sm">
                          Signature Haircut
                        </h4>
                        <p className="font-caption text-caption text-on-surface-variant">
                          45 mins • Includes consultation
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-headline-md font-bold">$65.00</span>
                      <div className="mt-1 flex gap-2">
                        <button className="text-xl text-outline hover:text-primary">
                          <Pencil aria-hidden="true" className="size-6" />
                        </button>
                        <button className="text-xl text-outline hover:text-error">
                          <Trash2 aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-outline-variant/30 bg-surface-container-low p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded bg-primary-container text-on-primary-container">
                        <UserRound aria-hidden="true" className="size-6" />
                      </div>
                      <div>
                        <h4 className="font-headline-md text-headline-md text-sm">
                          Luxury Hot Shave
                        </h4>
                        <p className="font-caption text-caption text-on-surface-variant">
                          30 mins • Traditional razor
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-headline-md font-bold">$40.00</span>
                      <div className="mt-1 flex gap-2">
                        <button className="text-xl text-outline hover:text-primary">
                          <Pencil aria-hidden="true" className="size-6" />
                        </button>
                        <button className="text-xl text-outline hover:text-error">
                          <Trash2 aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_2px_4px_rgba(15,23,42,0.04)] transition-[transform,box-shadow] duration-200 hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
                <h3 className="mb-6 font-label-md text-label-md tracking-widest text-on-surface-variant uppercase">
                  Gallery Portfolio
                </h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="group relative aspect-square overflow-hidden rounded-lg border border-outline-variant bg-surface-container-highest">
                    <img
                      className="h-full w-full object-cover"
                      data-alt="A clean, minimalist shot of a master barber's tools—scissors, a straight razor, and a fine-tooth comb—arranged neatly on a marble countertop. The lighting is cool and professional, reflecting a high-end luxury barber shop environment. The composition is artistic and asymmetric, highlighting the craftsmanship of the trade."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA__aXIfgeSeGNvOtY_GEgtc71RrHDiPAmm4U6A79YZwS8tbtdCqf-SNuBZdAI3sBupvDqsPMyCD66ot8nFHEstNBYJhgGdVlI4ZU_3va3NdhyFYGQBAvTDAGr2OkZMwv144c8Qm_uIaFHnjcBbHdWK26_HKUY5qb-uTx7kT2mjWsjRx6esN6dW1dvEkTV8bBr3ebuzzmRUWzbZAkp992MUFKISJowdMJLzrKtk8OsJr8aFb9Rircc0GIwp1bMUczS1d2EoK5G4VUM"
                    />
                    <button className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-error text-on-error opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                      <X aria-hidden="true" className="size-3.5" />
                    </button>
                  </div>
                  <div className="group relative aspect-square overflow-hidden rounded-lg border border-outline-variant bg-surface-container-highest">
                    <img
                      className="h-full w-full object-cover"
                      data-alt="A close-up of a meticulously styled modern pompadour haircut on a client. The focus is sharp on the texture of the hair and the clean fade. The background is a soft-focus studio setting with warm accent lights, creating a sophisticated and expert aesthetic for a professional portfolio."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbvzdkYEHZODwXkmDKRLwmxoUSG2S0VlIE6Q0O88ENRWoJgiWJwKWsyiMjP81EZgnGP_8vd7bYArVyGW90zEZ5NZX8zLH0vzqgb0ayqeNH0KPxPn44bZRF2LPaJHdJEnkIhVSR1yVeuljdm5SX79cnorCLzU4hlCtCVExctNUyqNqSRqwnHohX3Ktu3Tbj5fMXIVVg2u1k27rXIf_GdO9uBlIQx-sC1cyJS3-bzIohXISe8c3tpmP3P7WRx-8thtLgtvT7_eh1ODY"
                    />
                    <button className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-error text-on-error opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                      <X aria-hidden="true" className="size-3.5" />
                    </button>
                  </div>
                  <div className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-outline-variant text-outline transition-colors hover:bg-surface-container-low">
                    <ImagePlus aria-hidden="true" className="size-8" />
                    <span className="text-caption">Upload Photo</span>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-stack-lg lg:col-span-4">
              <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_2px_4px_rgba(15,23,42,0.04)] transition-[transform,box-shadow] duration-200 hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
                <h3 className="mb-6 font-label-md text-label-md tracking-widest text-on-surface-variant uppercase">
                  Opening Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-body-md">
                    <span className="font-bold">Mon - Fri</span>
                    <span>09:00 - 19:00</span>
                  </div>
                  <div className="flex items-center justify-between text-body-md">
                    <span className="font-bold">Saturday</span>
                    <span>10:00 - 17:00</span>
                  </div>
                  <div className="flex items-center justify-between text-body-md text-on-surface-variant/60">
                    <span className="font-bold">Sunday</span>
                    <span>Closed</span>
                  </div>
                  <button className="mt-4 w-full rounded-lg border border-primary py-2 font-label-md text-label-md text-primary transition-colors hover:bg-surface-container-low">
                    Edit Hours
                  </button>
                </div>
              </section>

              <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_2px_4px_rgba(15,23,42,0.04)] transition-[transform,box-shadow] duration-200 hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
                <h3 className="mb-6 font-label-md text-label-md tracking-widest text-on-surface-variant uppercase">
                  Notifications
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <input
                      defaultChecked
                      className="mt-1 h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary"
                      type="checkbox"
                    />
                    <div>
                      <h4 className="text-sm font-bold">New Booking Alerts</h4>
                      <p className="text-caption text-on-surface-variant">
                        Instant notification for every new appointment.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <input
                      defaultChecked
                      className="mt-1 h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary"
                      type="checkbox"
                    />
                    <div>
                      <h4 className="text-sm font-bold">Reschedule Requests</h4>
                      <p className="text-caption text-on-surface-variant">
                        Get notified when clients move their slots.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <input
                      className="mt-1 h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary"
                      type="checkbox"
                    />
                    <div>
                      <h4 className="text-sm font-bold">Marketing Emails</h4>
                      <p className="text-caption text-on-surface-variant">
                        Stay updated with platform features and news.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex flex-col gap-3">
                <button className="w-full rounded-xl bg-primary py-4 text-body-lg font-bold text-on-primary shadow-lg transition-transform active:scale-95">
                  Save All Changes
                </button>
                <button className="w-full py-2 font-label-md text-label-md text-on-surface-variant hover:underline">
                  Discard Changes
                </button>
              </div>
            </div>
          </div>
        </main>

        <nav className="shadow-high fixed bottom-0 left-0 z-50 flex w-full items-center justify-around rounded-t-xl bg-surface px-4 py-2 md:hidden">
          <a
            className="flex flex-col items-center justify-center p-2 text-on-surface-variant transition-all hover:bg-surface-container-highest"
            href="#"
          >
            <Compass aria-hidden="true" className="size-6" />
            <span className="font-label-md text-label-md">Discover</span>
          </a>
          <a
            className="flex flex-col items-center justify-center p-2 text-on-surface-variant transition-all hover:bg-surface-container-highest"
            href="#"
          >
            <CalendarDays aria-hidden="true" className="size-6" />
            <span className="font-label-md text-label-md">Bookings</span>
          </a>
          <a
            className="flex flex-col items-center justify-center rounded-xl bg-primary-container p-2 text-on-primary-container duration-200 active:scale-90"
            href="#"
          >
            <User aria-hidden="true" className="size-6 fill-current" />
            <span className="font-label-md text-label-md">Profile</span>
          </a>
        </nav>

        <div
          className="pointer-events-none fixed bottom-24 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-2 rounded-full bg-inverse-surface px-6 py-3 text-inverse-on-surface opacity-0 shadow-lg transition-opacity duration-300 md:bottom-10"
          id="toast"
        >
          <CircleCheck aria-hidden="true" className="size-6 text-green-400" />
          <span className="font-label-md text-label-md">
            Settings updated successfully
          </span>
        </div>
      </div>
    </>
  );
}
