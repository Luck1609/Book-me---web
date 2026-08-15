import { Head } from '@inertiajs/react';
import {
  CalendarDays,
  Compass,
  Flower2,
  MapPin,
  Palette,
  Scissors,
  Search,
  Star,
  User,
  UserRound,
} from 'lucide-react';

export default function FindShop() {
  return (
    <>
      <Head title="Craft & Care | Discover Excellence">
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="bg-surface selection:bg-secondary-container selection:text-on-secondary-container">
        <header className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between bg-surface px-margin-mobile shadow-sm">
          <div className="flex items-center gap-2">
            <MapPin aria-hidden="true" className="size-6 text-primary" />
            <span className="font-md text-md tracking-tight text-primary">
              Craft & Care
            </span>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-150 hover:bg-surface-container-low active:scale-95">
            <Search aria-hidden="true" className="size-6 text-primary" />
          </button>
        </header>
        <main className="mx-auto max-w-container-max px-margin-mobile pt-20 pb-24 md:px-margin-desktop">
          <section className="mb-stack-lg">
            <h1 className="mb-stack-md font-headline-lg-mobile text-headline-lg-mobile text-primary md:font-headline-lg md:text-headline-lg">
              Find your next style.
            </h1>
            <div className="group relative">
              <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                <Search aria-hidden="true" className="size-6 text-outline" />
              </div>
              <input
                className="h-14 w-full rounded-lg border border-outline-variant bg-surface-container-low pr-4 pl-12 font-body-md text-body-md transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary"
                placeholder="Search barbers, spas, or salons..."
                type="text"
              />
            </div>
          </section>

          <section className="mb-stack-lg flex [scrollbar-width:none] gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
            <button className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-label-md text-label-md whitespace-nowrap text-on-primary transition-transform active:scale-95">
              <Scissors aria-hidden="true" className="size-6" />
              Barber
            </button>
            <button className="flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container px-6 py-3 font-label-md text-label-md whitespace-nowrap text-on-surface transition-colors hover:bg-surface-container-highest active:scale-95">
              <Flower2 aria-hidden="true" className="size-6" />
              Spa
            </button>
            <button className="flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container px-6 py-3 font-label-md text-label-md whitespace-nowrap text-on-surface transition-colors hover:bg-surface-container-highest active:scale-95">
              <UserRound aria-hidden="true" className="size-6" />
              Hair Salon
            </button>
            <button className="flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container px-6 py-3 font-label-md text-label-md whitespace-nowrap text-on-surface transition-colors hover:bg-surface-container-highest active:scale-95">
              <Palette aria-hidden="true" className="size-6" />
              Nails
            </button>
          </section>

          <section className="mb-stack-lg">
            <div className="mb-stack-md flex items-end justify-between">
              <h2 className="font-md text-md text-primary">
                Featured Shops
              </h2>
              <a
                className="font-label-md text-label-md text-secondary hover:underline"
                href="#"
              >
                View All
              </a>
            </div>
            <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
              <div className="group relative h-[400px] overflow-hidden rounded-xl bg-surface-container-high shadow-[0_2px_4px_rgba(15,23,42,0.04)]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  data-alt="A sophisticated, high-end barbershop interior with vintage leather chairs, polished dark wood accents, and soft amber lighting. The atmosphere is quiet, professional, and luxurious, featuring a minimalist aesthetic with clean white walls and high-contrast black fixtures. The lighting is warm and inviting, highlighting the premium craftsmanship of the tools on the counters."
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCUsZ0ka4AT3J-b9ECGiiAe0Rwl5OFyi3M2tI1AeLcpgpbi2Nivf3hlnXAS4SLAdxhSRkWCBeEG312ythTZ_yNTGF3hgX18m2OsSiB36TQwKvM9vGaSLO3PkVfIZQm9jvR6Fljrp2ox1BoDIc2UQNA4yHkhPqPGxAjjGWITXK-cDpnO6zLmLmA97A9PLYb1NpKfFpsVdmOC8MkDm9ho7MgoKgH27-LijQ5rsqeFhcWLU66mY4pkfjEKUhGinB6YWmrRrw1T695s8VI')",
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                  <div className="mb-1 flex items-center gap-1">
                    <Star
                      aria-hidden="true"
                      className="size-3.5 fill-current text-secondary-fixed"
                    />
                    <span className="font-label-md text-label-md">
                      4.9 (240 reviews)
                    </span>
                  </div>
                  <h3 className="font-headline-lg-mobile text-headline-lg-mobile">
                    The Gilded Blade
                  </h3>
                  <p className="mt-1 font-body-md text-body-md text-on-surface-variant/80">
                    Master grooming for the modern professional.
                  </p>
                  <button className="mt-4 rounded-lg bg-white px-6 py-3 font-label-md text-label-md text-black transition-colors hover:bg-primary-fixed-dim active:scale-95">
                    Book Now
                  </button>
                </div>
              </div>

              <div className="grid grid-rows-2 gap-gutter">
                <div className="group flex cursor-pointer gap-4 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-[0_2px_4px_rgba(15,23,42,0.04)] transition-all hover:border-primary">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-surface-container">
                    <img
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      data-alt="A close-up of a modern minimalist salon station with a circular mirror reflecting a bright, airy room. A set of professional shears and a fine-tooth comb are neatly arranged on a white marble surface. The lighting is high-key and natural, creating a clean and serene environment with a focus on precision and care."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9vKCfojl4QWBoAuGBG__bLH9Q2stWF0963ieLfzIIkGcnSycADZKdVbqebutkujnVkx7uVPmVWCPzyGU-lVmKC7qJlH5jGgc5BTPApGslk8-stT4vKHg5Bd8aKxnZGSbOUHjfVhIt1iuJ85xrY47ffXWo7ZaOjjlH28ifl6Wqf1N4WX4kdyt5nItJtMaQLnLhn3_4CG6khWSVtwxTe7vv-XD6y3Uc7HDX98QwHFc4Fh1SHHLtqlViKP9as_7QsZjIyb0QKfSyriI"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-md text-md text-primary">
                      Pure Aesthetic
                    </h4>
                    <p className="font-caption text-caption text-on-surface-variant">
                      Hair Salon & Color Lab
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-secondary">
                      <Star
                        aria-hidden="true"
                        className="size-4 fill-current"
                      />
                      <span className="font-label-md text-[12px]">
                        4.8 • 1.2 miles away
                      </span>
                    </div>
                  </div>
                </div>
                <div className="group flex cursor-pointer gap-4 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-[0_2px_4px_rgba(15,23,42,0.04)] transition-all hover:border-primary">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-surface-container">
                    <img
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      data-alt="An ultra-modern urban spa treatment room with soft charcoal walls and indirect warm LED lighting. A sleek, white massage table is draped in premium linen. In the background, a small bamboo plant adds a touch of organic green against the minimalist, dark-toned interior. The mood is deeply tranquil and exclusive."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm7zHWG8hXoUwtKiP4-pwX_HLBi9DYWnJsBFllSU_orBFJOQi9MgY7HaWYCFsuRYQWXp_QuyrM5f7HVZtojqgFuQT1buMnsfV7RizchRTphrK4Ys6PRrZSSBZhiQRFjiYkf-O1PLxB7wnOiwKQpj3QJup1R_sAH19erYLLwBR1rSpSOyZ4dz3Rt7buuR9bTII-gCV3hX2g-RNd2ZEeSHeWzRHkXxmZGleq3fLmiFbV_MNjDUK3m4H7ZbSHQa6GzrFdsina-aRbgcs"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-md text-md text-primary">
                      Onyx Sanctuary
                    </h4>
                    <p className="font-caption text-caption text-on-surface-variant">
                      Premium Spa & Relaxation
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-secondary">
                      <Star
                        aria-hidden="true"
                        className="size-4 fill-current"
                      />
                      <span className="font-label-md text-[12px]">
                        5.0 • 0.8 miles away
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-stack-lg">
            <h2 className="mb-stack-md font-md text-md text-primary">
              Nearby Shops
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4 transition-shadow hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-full bg-surface-container">
                    <img
                      className="h-full w-full object-cover"
                      data-alt="A logo-style shot of a classic barber pole with a modern twist, reflecting in a polished glass window. The colors are deep navy blue and gold, suggesting a premium, traditional yet updated service environment. Soft daylight creates clean reflections."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHavKKcpqTSHEAOd9fSy-hFN3XlR6I_aaQd5ZZxc3omXqnM2cDxKdSy42N7KqHPr6u4vVAFeLt8IcnnT-q-HDi2bENf3w0408p81t2pzKBNyB_btScJcEzDXutn88SgMxT575ulByWNVoJMwar-P87WHaLUYZADb7AvfzaryGfFqU8a8fJGx9D0ACHHEBxoUNnfZg1yc06WpHdc6Ol2sJG4HVp9iRegQXBTq9NWMGsU3Xf27V0TITdyEQUzAxkG1k5CrwNhMpLCI8"
                    />
                  </div>
                  <div>
                    <h5 className="font-md text-md leading-tight text-primary">
                      Heritage Grooming
                    </h5>
                    <div className="mt-1 flex items-center gap-2 font-caption text-caption text-on-surface-variant">
                      <span>0.4 miles</span>
                      <span className="h-1 w-1 rounded-full bg-outline"></span>
                      <span className="font-semibold text-secondary">
                        Open until 8 PM
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-secondary">
                    <Star
                      aria-hidden="true"
                      className="size-[18px] fill-current"
                    />
                    <span className="font-md text-md">
                      4.7
                    </span>
                  </div>
                  <p className="font-caption text-caption text-on-surface-variant">
                    120 reviews
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4 transition-shadow hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-full bg-surface-container">
                    <img
                      className="h-full w-full object-cover"
                      data-alt="A stylish interior of a boutique hair salon featuring rose gold accents and velvet seating. The lighting is soft and flattering, emphasizing a feminine and upscale atmosphere. Pristine white floors and large mirrors create a sense of spaciousness and clarity."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKqQQHMHjeC1woQqfI88AgguVP22XG1b05eaGhPq0CLHO9BcFKod8dBhJMYuP_wbUEXglwvbtR_eh0cBDFZ1CfJGm9C8U0aMNA5MYGf2Pbqj9xK8jr7PO-M5z40bgIUZxgy4y30Rd25kHV30xNbJU2FKgnzXz3SFI5ZdY30ZWv5iKNQqwNrZD4peB3f_CJtk51QdTQV8fWD_NWzwvnJ1hkeZvlh7ZEZ3fH9xcZEXHJNALljnMnaMDfSfwnCCLBuTgVcFJbSsONYCM"
                    />
                  </div>
                  <div>
                    <h5 className="font-md text-md leading-tight text-primary">
                      Velvet & Vine
                    </h5>
                    <div className="mt-1 flex items-center gap-2 font-caption text-caption text-on-surface-variant">
                      <span>1.1 miles</span>
                      <span className="h-1 w-1 rounded-full bg-outline"></span>
                      <span className="font-semibold text-error">
                        Closing soon (6 PM)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-secondary">
                    <Star
                      aria-hidden="true"
                      className="size-[18px] fill-current"
                    />
                    <span className="font-md text-md">
                      4.9
                    </span>
                  </div>
                  <p className="font-caption text-caption text-on-surface-variant">
                    88 reviews
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4 transition-shadow hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-full bg-surface-container">
                    <img
                      className="h-full w-full object-cover"
                      data-alt="The entryway of a minimalist barber studio with a sleek black door and a single, elegant brass sign. The surrounding area is clean and modern, with a few carefully placed succulents. The morning light is crisp and bright, highlighting the texture of the charcoal-colored exterior wall."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS8fbBT1s9cZ4Bqp3351xRPvQHGnFm_NMd66OL5RTqcEifLy2r0HylDIisZd51LFDZXvSGqjq4shJOzI-L9Is6xgYwwZfzNlB-kFJeOOjLHyLgIjdorpdzahtgxfZ2vkL_3bx7BFF-z7KeZUk9VHhHcYOLRvDzpOi8p6yTy8cB_o6buDry-5VpBQWIMDIAd6gXlyX9FurwjcGT3rKkxjg12VugZzuSdtpn4HBreodCI3mTEYMPl6xXXRjvGK-aLQ8WkCs6JYbvyMc"
                    />
                  </div>
                  <div>
                    <h5 className="font-md text-md leading-tight text-primary">
                      Studio Zero
                    </h5>
                    <div className="mt-1 flex items-center gap-2 font-caption text-caption text-on-surface-variant">
                      <span>2.5 miles</span>
                      <span className="h-1 w-1 rounded-full bg-outline"></span>
                      <span className="font-semibold text-secondary">
                        Open until 9 PM
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-secondary">
                    <Star
                      aria-hidden="true"
                      className="size-[18px] fill-current"
                    />
                    <span className="font-md text-md">
                      4.6
                    </span>
                  </div>
                  <p className="font-caption text-caption text-on-surface-variant">
                    310 reviews
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <nav className="shadow-high fixed bottom-0 left-0 z-50 flex w-full items-center justify-around rounded-t-xl bg-surface px-4 py-2">
          <a
            className="flex flex-col items-center justify-center rounded-xl bg-primary-container p-2 text-on-primary-container transition-all duration-200 active:scale-90"
            href="#"
          >
            <Compass aria-hidden="true" className="size-6 fill-current" />
            <span className="font-label-md text-label-md">Discover</span>
          </a>
          <a
            className="flex flex-col items-center justify-center p-2 text-on-surface-variant transition-all duration-200 hover:bg-surface-container-highest active:scale-90"
            href="#"
          >
            <CalendarDays aria-hidden="true" className="size-6" />
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
