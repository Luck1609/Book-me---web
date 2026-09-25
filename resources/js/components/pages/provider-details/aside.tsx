import { CalendarDays, Globe2, Instagram, MessageCircle, Phone, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'



const hours = [
  ['Monday', 'Closed'],
  ['Tuesday', '9:00 AM – 8:00 PM'],
  ['Wednesday', '9:00 AM – 8:00 PM'],
  ['Thursday', '9:00 AM – 8:00 PM'],
  ['Friday', '9:00 AM – 8:00 PM'],
  ['Saturday', '8:30 AM – 7:00 PM'],
  ['Sunday', 'Closed'],
];

export default function Aside() {
  const scrollToServices = (): void => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
      <section
        id="opening-hours"
        className="rounded-2xl border border-[#dfece5] bg-white p-5 dark:border-white/10 dark:bg-white/5"
      >
        <h2 className="font-bold">Opening hours</h2>
        <div className="mt-4 space-y-3 text-sm">
          {hours.map(([day, time]) => (
            <div key={day} className="flex justify-between gap-4">
              <span className="text-[#7b938d]">{day}</span>
              <span
                className={
                  time === 'Closed'
                    ? 'font-medium text-[#a4b4ae]'
                    : 'font-semibold'
                }
              >
                {time}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-[#dfece5] bg-white p-5 dark:border-white/10 dark:bg-white/5">
        <h2 className="font-bold">Good to know</h2>
        <div className="mt-4 space-y-4 text-sm text-[#6f8981]">
          <p className="flex items-center gap-3">
            <ShieldCheck className="size-4 text-[#0f8a62]" />
            Instant confirmation
          </p>
          <p className="flex items-center gap-3">
            <MessageCircle className="size-4 text-[#0f8a62]" />
            Friendly, personal service
          </p>
          <p className="flex items-center gap-3">
            <Globe2 className="size-4 text-[#0f8a62]" />
            Accessible location
          </p>
        </div>
      </section>

      <section className="rounded-2xl bg-[#17343c] p-5 text-white shadow-[0_14px_35px_rgba(23,52,60,0.16)] dark:bg-[#1d3f3c]">
        <p className="text-xs font-bold tracking-[0.16em] text-[#a8ddbd] uppercase">
          Ready when you are
        </p>
        <h2 className="mt-2 text-xl font-bold">
          Find your next feel-good moment.
        </h2>
        <Button
          onClick={scrollToServices}
          className="mt-5 w-full bg-[#d9f7e8] text-[#17343c] hover:bg-white"
        >
          Book now
          <CalendarDays className="size-4" />
        </Button>
      </section>
      <div className="flex flex-wrap gap-4 px-1 text-sm text-[#78918a]">
        <a
          href="tel:0249149420"
          // href={`tel:${provider?.phone || ''}`}
          className="inline-flex items-center gap-2 hover:text-[#0f8a62]"
        >
          <Phone className="size-4" />
          Call
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 hover:text-[#0f8a62]"
        >
          <MessageCircle className="size-4" />
          Message
        </a>
        <a
          href="#social"
          className="inline-flex items-center gap-2 hover:text-[#0f8a62]"
        >
          <Instagram className="size-4" />
          Instagram
        </a>
      </div>
    </aside>
  )
}

