import type { Children } from '@/types'
import Footer from './footer'
import Navbar from './navbar'

export default function GuestLayout({ children }: Children) {
  return (

    <div className="min-h-screen overflow-hidden bg-[#fbfcfa] text-[#17343c] selection:bg-[#bce9d4] selection:text-[#17343c]">
      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  )
}
