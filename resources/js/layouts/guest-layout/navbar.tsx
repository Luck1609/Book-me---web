import { Link } from '@inertiajs/react'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { useState } from 'react';
import AppLogo from '@/components/app-logo';
import { about, contact, home, login, register } from '@/routes'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="relative z-50 border-b border-[#e8eeeb]/80 bg-[#fbfcfa]/90 backdrop-blur-md">
      <div className="mx-auto flex h-19 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href={home()} aria-label="Book Me home" onClick={closeMenu}>
          <AppLogo />
        </Link>
        <nav className="hidden items-center gap-8 text-[13px] font-semibold text-[#5c7072] lg:flex">
          <a
            className="transition-colors hover:text-[#0f8a62]"
            href="#features"
          >
            Features
          </a>
          <a
            className="transition-colors hover:text-[#0f8a62]"
            href="#how-it-works"
          >
            How it works
          </a>
          <a
            className="flex items-center gap-1 transition-colors hover:text-[#0f8a62]"
            href="#solutions"
          >
            Solutions{' '}
            <ChevronDown aria-hidden="true" className="size-3.5" />
          </a>
          <a
            className="transition-colors hover:text-[#0f8a62]"
            href="#stories"
          >
            Customer stories
          </a>
          <Link
            className="transition-colors hover:text-[#0f8a62]"
            href={about()}
          >
            About us
          </Link>
          <Link
            className="transition-colors hover:text-[#0f8a62]"
            href={contact()}
          >
            Contact
          </Link>
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          <Link
            className="text-[13px] font-bold text-[#53696b] transition-colors hover:text-[#0f8a62]"
            href={login()}
          >
            Log in
          </Link>
          <Link
            className="inline-flex items-center gap-2 rounded-full bg-[#0f8a62] px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_7px_16px_rgba(15,138,98,0.18)] transition hover:-translate-y-0.5 hover:bg-[#0b7653]"
            href={register()}
          >
            Get started{' '}
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>
        <button
          className="flex size-10 items-center justify-center rounded-xl text-[#17343c] lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <nav className="absolute inset-x-0 top-full border-b border-[#e5ece8] bg-[#fbfcfa] px-5 py-5 shadow-lg lg:hidden">
          <div className="flex flex-col gap-4 text-sm font-semibold text-[#5c7072]">
            <a href="#features" onClick={closeMenu}>
              Features
            </a>
            <a href="#how-it-works" onClick={closeMenu}>
              How it works
            </a>
            <a href="#solutions" onClick={closeMenu}>
              Solutions
            </a>
            <a href="#stories" onClick={closeMenu}>
              Customer stories
            </a>
            <Link href={about()} onClick={closeMenu}>
              About us
            </Link>
            <Link href={contact()} onClick={closeMenu}>
              Contact
            </Link>
            <div className="mt-2 flex items-center gap-3 border-t border-[#e5ece8] pt-4">
              <Link
                className="flex-1 rounded-full border border-[#d8e4de] py-3 text-center text-[#53696b]"
                href={login()}
                onClick={closeMenu}
              >
                Log in
              </Link>
              <Link
                className="flex-1 rounded-full bg-[#0f8a62] py-3 text-center text-white"
                href={register()}
                onClick={closeMenu}
              >
                Get started
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}

