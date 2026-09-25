import { Link } from '@inertiajs/react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import AppLogo from '@/components/app-logo';
import Container from '@/components/container';
import { cn } from '@/lib/utils';
import { home, login, register } from '@/routes';
import ThemeToggle from '../app/theme-toggler';

type Props = {
  className?: string;
  container?: string;
  component?: ReactNode;
};

export default function Navbar({
  className = '',
  component = <></>,
  container,
}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={cn(
        'relative z-50 border-b border-[#e8eeeb]/80 bg-[#fbfcfa]/90 backdrop-blur-md',
        className,
      )}
    >
      <Container
        className={cn(
          'mx-auto flex h-25 items-center justify-between',
          container,
        )}
      >
        <Link href={home()} aria-label="Book Me home" onClick={closeMenu}>
          <AppLogo />
        </Link>

        {component}

        <div className="">
          <div className="hidden items-center gap-5 lg:flex">
            <ThemeToggle />

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
              Create account{' '}
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
      </Container>

      {/* {isMenuOpen && (
        <nav className="absolute inset-x-0 top-full border-b border-[#e5ece8] bg-[#fbfcfa] px-5 py-5 shadow-lg lg:hidden">
          <div className="flex flex-col gap-4 text-sm font-semibold text-[#5c7072]">
            <a href="#features" onClick={closeMenu}>
              Features
            </a>
            <Link href={search()} onClick={closeMenu}>
              Find a provider
            </Link>
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
            <Link href={forBusiness()} onClick={closeMenu}>
              For business
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
      )} */}
    </header>
  );
}
