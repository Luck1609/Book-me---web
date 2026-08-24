import { Link } from '@inertiajs/react'
import AppLogo from '@/components/app-logo'
import { about, contact, login, privacy, register, terms } from '@/routes'

export default function Footer() {
  return (

    <footer className="border-t border-[#e6eeea] bg-[#fbfcfa] px-5 pt-12 pb-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <AppLogo />
            <p className="mt-4 max-w-xs text-sm leading-6 text-[#7c8c8d]">
              Simple scheduling for people doing work that matters.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-14 gap-y-8 text-sm sm:grid-cols-3 sm:gap-x-20">
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-bold tracking-widest text-[#94a2a0] uppercase">
                Product
              </p>
              <a
                className="text-[#53696b] hover:text-[#0f8a62]"
                href="#features"
              >
                Features
              </a>
              <a
                className="text-[#53696b] hover:text-[#0f8a62]"
                href="#solutions"
              >
                Booking pages
              </a>
              <a
                className="text-[#53696b] hover:text-[#0f8a62]"
                href="#how-it-works"
              >
                How it works
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-bold tracking-widest text-[#94a2a0] uppercase">
                Company
              </p>
              <a
                className="text-[#53696b] hover:text-[#0f8a62]"
                href="#stories"
              >
                Customer stories
              </a>
              <Link
                className="text-[#53696b] hover:text-[#0f8a62]"
                href={about()}
              >
                About us
              </Link>
              <Link
                className="text-[#53696b] hover:text-[#0f8a62]"
                href={contact()}
              >
                Contact
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-bold tracking-widest text-[#94a2a0] uppercase">
                Get started
              </p>
              <Link
                className="text-[#53696b] hover:text-[#0f8a62]"
                href={login()}
              >
                Log in
              </Link>
              <Link
                className="text-[#53696b] hover:text-[#0f8a62]"
                href={register()}
              >
                Create account
              </Link>
              <Link
                className="text-[#53696b] hover:text-[#0f8a62]"
                href={contact()}
              >
                Help center
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-[#e6eeea] pt-6 text-xs text-[#93a19f] sm:flex-row">
          <p>© {new Date().getFullYear()} Book Me. Made for better days.</p>
          <div className="flex gap-5">
            <Link className="hover:text-[#0f8a62]" href={privacy()}>
              Privacy
            </Link>
            <Link className="hover:text-[#0f8a62]" href={terms()}>
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

