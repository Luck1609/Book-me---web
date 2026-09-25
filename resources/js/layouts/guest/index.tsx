import type { ReactNode } from 'react';
import type { Children } from '@/types'
import Footer from './footer'
import Navbar from './navbar'


type Props = Children<{
  className?: string;
  component?: ReactNode
}>

export default function GuestLayout({ children, ...props }: Props) {

  return (
    <div className="min-h-screen overflow-hidden bg-[#fbfcfa] text-[#17343c] selection:bg-[#bce9d4] selection:text-[#17343c]">
      <Navbar {...props} />

      <main>{children}</main>

      <Footer />
    </div>
  )
}
