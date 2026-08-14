import { Head } from '@inertiajs/react';
import { ArrowLeft, Store, User } from 'lucide-react';

export default function AccountSelection() {
  return (
    <>
      <Head title="Account Selection - Craft & Care">
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-margin-mobile text-on-background md:p-margin-desktop">
        <header className="fixed top-0 left-0 z-50 flex w-full items-center justify-start bg-transparent p-6">
          <button className="rounded-full p-2 text-primary transition-colors duration-150 hover:bg-surface-container-highest/20 active:scale-95">
            <ArrowLeft aria-hidden="true" className="size-6" />
          </button>
        </header>
        <main className="mx-auto flex w-full max-w-3xl flex-col items-center">
          <div className="mb-stack-lg w-full text-center">
            <h1 className="mb-stack-sm font-headline-lg-mobile text-headline-lg-mobile text-primary md:font-headline-lg md:text-headline-lg">
              How will you use Craft &amp; Care?
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Select your primary role to customize your experience.
            </p>
          </div>

          <div
            className="mb-stack-lg grid w-full grid-cols-1 gap-gutter md:grid-cols-2"
            id="role-selection"
          >
            <button
              aria-checked="false"
              className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border border-slate-200/80 bg-white/70 p-8 text-center shadow-[0_12px_24px_rgba(15,23,42,0.04)] backdrop-blur-[10px] transition-all duration-300 hover:-translate-y-0.5 hover:border-black hover:shadow-[0_16px_32px_rgba(15,23,42,0.08)] focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background focus:outline-none"
              data-role="client"
              role="radio"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
                <User aria-hidden="true" className="size-8" />
              </div>
              <h2 className="mb-2 font-headline-md text-headline-md text-primary">
                I am a Client
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                I want to browse services, book appointments, and manage my care
                plan.
              </p>
            </button>

            <button
              aria-checked="false"
              className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border border-slate-200/80 bg-white/70 p-8 text-center shadow-[0_12px_24px_rgba(15,23,42,0.04)] backdrop-blur-[10px] transition-all duration-300 hover:-translate-y-0.5 hover:border-black hover:shadow-[0_16px_32px_rgba(15,23,42,0.08)] focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background focus:outline-none"
              data-role="provider"
              role="radio"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
                <Store aria-hidden="true" className="size-8" />
              </div>
              <h2 className="mb-2 font-headline-md text-headline-md text-primary">
                I am a Provider
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                I want to list my services, manage bookings, and connect with
                clients.
              </p>
            </button>
          </div>

          <div className="mt-stack-md flex w-full justify-center">
            <button
              className="cursor-not-allowed rounded-lg bg-primary px-12 py-4 font-label-md text-label-md text-on-primary opacity-50 shadow-md transition-all duration-300 hover:shadow-lg active:scale-95"
              disabled
              id="continue-btn"
            >
              Continue
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
