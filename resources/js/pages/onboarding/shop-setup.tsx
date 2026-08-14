import { Head } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, ChevronDown, CircleHelp } from 'lucide-react';

export default function ShopSetup() {
  return (
    <>
      <Head title="Shop Profile Setup">
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="min-h-screen bg-background font-body-md text-on-background selection:bg-primary-container selection:text-on-primary-container">
        <header className="docked full-width flat no shadows fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-background px-margin-mobile md:px-margin-desktop dark:bg-background">
          <button
            aria-label="Go back"
            className="rounded-full p-2 text-primary transition-colors duration-150 hover:bg-surface-container-highest/20 active:scale-95 dark:text-primary"
          >
            <ArrowLeft aria-hidden="true" className="size-6" />
          </button>
          <div className="flex-grow text-center font-headline-md text-headline-md font-bold text-primary dark:text-primary">
            Craft &amp; Care
          </div>
          <button
            aria-label="Help"
            className="rounded-full p-2 text-primary transition-colors duration-150 hover:bg-surface-container-highest/20 active:scale-95 dark:text-primary"
          >
            <CircleHelp aria-hidden="true" className="size-6" />
          </button>
        </header>
        <main className="mx-auto max-w-container-max px-margin-mobile pt-24 pb-32 md:w-2/3 md:px-margin-desktop lg:w-1/2">
          <div className="mb-stack-lg">
            <div className="mb-stack-sm flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase">
                Step 2 of 3
              </span>
              <span className="font-label-md text-label-md text-primary">
                Shop Details
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: '66.66%' }}
              ></div>
            </div>
          </div>
          <div className="mb-stack-lg">
            <h1 className="mb-stack-sm font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg">
              Set up your shop profile
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Tell us a bit about your business to help clients find you and
              understand what you offer.
            </p>
          </div>

          <form
            onSubmit={(event) => event.preventDefault()}
            className="space-y-stack-md rounded-xl border border-surface-container-highest bg-surface-container-lowest p-6 shadow-[0px_2px_4px_rgba(15,23,42,0.04)] md:p-8"
          >
            <div className="flex flex-col gap-stack-sm">
              <label
                className="font-label-md text-label-md text-on-surface uppercase"
                htmlFor="shopName"
              >
                Shop Name
              </label>
              <input
                className="w-full rounded-lg border border-outline-variant bg-surface p-4 font-body-md text-body-md text-on-surface transition-colors placeholder:text-on-surface-variant focus:border-tertiary-container focus:ring-1 focus:ring-tertiary-container"
                id="shopName"
                placeholder="e.g. The Craft Barbershop"
                type="text"
              />
            </div>

            <div className="flex flex-col gap-stack-sm">
              <label
                className="font-label-md text-label-md text-on-surface uppercase"
                htmlFor="businessCategory"
              >
                Business Category
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none rounded-lg border border-outline-variant bg-surface p-4 pr-10 font-body-md text-body-md text-on-surface transition-colors focus:border-tertiary-container focus:ring-1 focus:ring-tertiary-container"
                  defaultValue=""
                  id="businessCategory"
                >
                  <option disabled value="">
                    Select a category
                  </option>
                  <option value="barber">Barbershop</option>
                  <option value="salon">Hair Salon</option>
                  <option value="spa">Spa &amp; Wellness</option>
                  <option value="tattoo">Tattoo Studio</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
                  <ChevronDown aria-hidden="true" className="size-6" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-stack-sm">
              <label
                className="font-label-md text-label-md text-on-surface uppercase"
                htmlFor="shopAddress"
              >
                Shop Address
              </label>
              <input
                className="w-full rounded-lg border border-outline-variant bg-surface p-4 font-body-md text-body-md text-on-surface transition-colors placeholder:text-on-surface-variant focus:border-tertiary-container focus:ring-1 focus:ring-tertiary-container"
                id="shopAddress"
                placeholder="123 Main St, Suite 100"
                type="text"
              />
            </div>

            <div className="flex flex-col gap-stack-sm">
              <label
                className="font-label-md text-label-md text-on-surface uppercase"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="w-full resize-none rounded-lg border border-outline-variant bg-surface p-4 font-body-md text-body-md text-on-surface transition-colors placeholder:text-on-surface-variant focus:border-tertiary-container focus:ring-1 focus:ring-tertiary-container"
                id="description"
                placeholder="Describe your shop's vibe, specialties, and what makes you unique..."
                rows={4}
              ></textarea>
              <p className="text-right font-caption text-caption text-on-surface-variant">
                0/500 characters
              </p>
            </div>
          </form>

          <div className="mt-stack-lg flex flex-col items-center justify-between gap-stack-md md:flex-row">
            <button
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary px-6 py-4 font-label-md text-label-md tracking-wide text-primary uppercase transition-colors hover:bg-surface-container-highest md:w-auto"
              type="button"
            >
              Save as Draft
            </button>
            <button
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 font-label-md text-label-md tracking-wide text-on-primary uppercase shadow-[0px_2px_4px_rgba(15,23,42,0.04)] transition-colors hover:bg-primary/90 md:w-auto"
              type="submit"
            >
              Complete Setup
              <ArrowRight aria-hidden="true" className="size-5" />
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
