import { Head, Link } from '@inertiajs/react';
import {
  ArrowLeft,
  CalendarCheck2,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Copy,
  CreditCard,
  Edit3,
  Mail,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react';
import booking from '@/routes/booking';

type BookingDetails = {
  id: string;
  client: string;
  initials: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  duration: string;
  amount: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  statusMessage: string;
  note: string;
};

type BookingShowProps = {
  booking: BookingDetails;
};

function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof CalendarDays;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#edf7f2] text-[#0f8a62] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
        <Icon aria-hidden="true" className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold tracking-[0.14em] text-[#91aaa2] uppercase">
          {label}
        </p>
        <div className="mt-1 text-sm font-semibold text-[#17343c] dark:text-white">
          {children}
        </div>
      </div>
    </div>
  );
}

function BookingStatus({ status }: { status: BookingDetails['status'] }) {
  const isPending = status === 'pending';
  const isCompleted = status === 'completed';
  const isCancelled = status === 'cancelled';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${isPending ? 'bg-[#fff4eb] text-[#a55c2d] dark:bg-[#a55c2d]/15 dark:text-[#f0b58b]' : isCompleted ? 'bg-[#edf4f0] text-[#5d8073] dark:bg-[#5d8073]/15 dark:text-[#a9c9bd]' : isCancelled ? 'bg-[#f8edf0] text-[#96546a] dark:bg-[#96546a]/15 dark:text-[#dea8b8]' : 'bg-[#e9f8f0] text-[#0f8a62] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]'}`}
    >
      {isPending ? (
        <Clock3 aria-hidden="true" className="size-3.5" />
      ) : (
        <CheckCircle2 aria-hidden="true" className="size-3.5" />
      )}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function BookingShow({
  booking: providedBooking,
}: BookingShowProps) {
  const currentBooking = providedBooking;

  return (
    <>
      <Head title={`Booking ${currentBooking.id}`} />

      <main className="min-h-[calc(100vh-3rem)] bg-[#f6faf8] px-4 py-6 text-[#17343c] sm:px-6 lg:px-8 lg:py-8 dark:bg-[#101917] dark:text-[#e6f1ed]">
        <div className="mx-auto max-w-7xl space-y-6 lg:space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href={booking.index.url()}
              className="group inline-flex items-center gap-2 text-sm font-bold text-[#70908a] transition hover:text-[#0f8a62] dark:text-[#9cb8b1] dark:hover:text-[#8fe0bb]"
            >
              <span className="flex size-9 items-center justify-center rounded-xl border border-[#dceae4] bg-white transition group-hover:-translate-x-0.5 group-hover:border-[#b9d5ca] dark:border-white/10 dark:bg-[#17221f]">
                <ArrowLeft aria-hidden="true" className="size-4" />
              </span>
              Back to bookings
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-[#dceae4] bg-white px-3.5 py-2.5 text-sm font-bold text-[#41645a] transition hover:bg-[#f4fbf7] dark:border-white/10 dark:bg-[#17221f] dark:text-[#c4d8d1] dark:hover:bg-white/8"
              >
                <Copy aria-hidden="true" className="size-4" />
                Copy booking ID
              </button>
              <button
                type="button"
                aria-label="More booking actions"
                className="flex size-10 items-center justify-center rounded-xl border border-[#dceae4] bg-white text-[#70908a] transition hover:bg-[#f4fbf7] dark:border-white/10 dark:bg-[#17221f] dark:text-[#9cb8b1] dark:hover:bg-white/8"
              >
                <MoreHorizontal aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section className="relative isolate overflow-hidden rounded-3xl bg-[#17343c] px-6 py-7 text-white shadow-[0_20px_55px_rgba(23,52,60,0.14)] sm:px-8 lg:px-10 lg:py-9">
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute -top-28 right-0 size-80 rounded-full bg-[#0f8a62]/35 blur-3xl" />
              <div className="absolute -bottom-44 left-1/3 size-96 rounded-full bg-[#806edc]/20 blur-3xl" />
            </div>
            <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#e6e1ff] text-lg font-bold text-[#594e9e] sm:size-16">
                  {currentBooking.initials}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-xs font-bold tracking-[0.16em] text-[#8fe0bb] uppercase">
                      Booking details
                    </p>
                    <span className="text-xs text-[#7f9d98]">
                      #{currentBooking.id}
                    </span>
                  </div>
                  <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                    {currentBooking.client}
                  </h1>
                  <p className="mt-2 text-sm text-[#b8c9c7]">
                    {currentBooking.service}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                <BookingStatus status={currentBooking.status} />
                <span className="text-sm text-[#a9c3c0]">
                  {currentBooking.statusMessage}
                </span>
              </div>
            </div>
          </section>

          <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)]">
            <div className="space-y-6">
              <section className="rounded-2xl border border-[#dceae4] bg-white shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
                <div className="flex items-center justify-between border-b border-[#e7f0ec] px-5 py-5 sm:px-6 dark:border-white/8">
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                      Appointment summary
                    </p>
                    <h2 className="mt-1 text-lg font-bold tracking-tight text-[#17343c] dark:text-white">
                      Everything for this visit
                    </h2>
                  </div>
                  <CalendarCheck2
                    aria-hidden="true"
                    className="size-6 text-[#0f8a62] dark:text-[#8fe0bb]"
                  />
                </div>
                <div className="grid gap-6 px-5 py-6 sm:grid-cols-2 sm:px-6">
                  <DetailRow icon={CalendarDays} label="Date & time">
                    <span>{currentBooking.date}</span>
                    <span className="mt-1 block text-xs font-medium text-[#70908a] dark:text-[#9cb8b1]">
                      {currentBooking.time} · {currentBooking.duration}
                    </span>
                  </DetailRow>
                  <DetailRow icon={Sparkles} label="Service">
                    <span>{currentBooking.service}</span>
                    <span className="mt-1 block text-xs font-medium text-[#70908a] dark:text-[#9cb8b1]">
                      Premium grooming service
                    </span>
                  </DetailRow>
                  <DetailRow icon={MapPin} label="Location">
                    <span>BookMe Studio</span>
                    <span className="mt-1 block text-xs font-medium text-[#70908a] dark:text-[#9cb8b1]">
                      124 Craftsmanship Way, Suite 4B
                    </span>
                  </DetailRow>
                  <DetailRow icon={CreditCard} label="Payment">
                    <span>{currentBooking.amount}</span>
                    <span className="mt-1 block text-xs font-medium text-[#0f8a62] dark:text-[#8fe0bb]">
                      Pay at the studio
                    </span>
                  </DetailRow>
                </div>
              </section>

              <section className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] sm:p-6 dark:border-white/10 dark:bg-[#17221f]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                      Booking activity
                    </p>
                    <h2 className="mt-1 text-lg font-bold tracking-tight text-[#17343c] dark:text-white">
                      A clear paper trail
                    </h2>
                  </div>
                  <ShieldCheck
                    aria-hidden="true"
                    className="size-6 text-[#2d6980] dark:text-[#8ac5d7]"
                  />
                </div>
                <div className="relative mt-6 space-y-6 pl-8 before:absolute before:top-2 before:bottom-2 before:left-[9px] before:w-px before:bg-[#dceae4] dark:before:bg-white/10">
                  <div className="relative">
                    <span className="absolute -left-8 flex size-5 items-center justify-center rounded-full bg-[#d9f7e8] text-[#0f8a62] ring-4 ring-white dark:bg-[#0f8a62]/20 dark:text-[#8fe0bb] dark:ring-[#17221f]">
                      <Check aria-hidden="true" className="size-3" />
                    </span>
                    <p className="text-sm font-bold text-[#17343c] dark:text-white">
                      Booking requested
                    </p>
                    <p className="mt-1 text-xs text-[#70908a] dark:text-[#9cb8b1]">
                      Monday, August 23 · 4:12 PM
                    </p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-8 flex size-5 items-center justify-center rounded-full bg-[#d9f7e8] text-[#0f8a62] ring-4 ring-white dark:bg-[#0f8a62]/20 dark:text-[#8fe0bb] dark:ring-[#17221f]">
                      <Check aria-hidden="true" className="size-3" />
                    </span>
                    <p className="text-sm font-bold text-[#17343c] dark:text-white">
                      Confirmed by provider
                    </p>
                    <p className="mt-1 text-xs text-[#70908a] dark:text-[#9cb8b1]">
                      Monday, August 23 · 4:26 PM
                    </p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-8 flex size-5 items-center justify-center rounded-full bg-[#e6e1ff] text-[#594e9e] ring-4 ring-white dark:bg-[#806edc]/20 dark:text-[#c0b8ec] dark:ring-[#17221f]">
                      <Clock3 aria-hidden="true" className="size-3" />
                    </span>
                    <p className="text-sm font-bold text-[#17343c] dark:text-white">
                      Appointment starts
                    </p>
                    <p className="mt-1 text-xs text-[#70908a] dark:text-[#9cb8b1]">
                      Today · {currentBooking.time}
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-[#dceae4] bg-[#fffaf5] p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] sm:p-6 dark:border-[#6c503c]/40 dark:bg-[#251f1a]">
                <div className="flex items-center gap-2">
                  <MessageCircle
                    aria-hidden="true"
                    className="size-5 text-[#a55c2d]"
                  />
                  <h2 className="text-base font-bold text-[#17343c] dark:text-white">
                    Client note
                  </h2>
                </div>
                <p className="mt-4 text-sm leading-6 text-[#5d706a] dark:text-[#c5b7a9]">
                  &ldquo;{currentBooking.note}&rdquo;
                </p>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                      Client profile
                    </p>
                    <h2 className="mt-1 text-lg font-bold tracking-tight text-[#17343c] dark:text-white">
                      Get to know John
                    </h2>
                  </div>
                  <button
                    type="button"
                    aria-label="Edit client"
                    className="rounded-lg p-2 text-[#91aaa2] transition hover:bg-[#edf7f2] hover:text-[#0f8a62] dark:hover:bg-white/8"
                  >
                    <Edit3 aria-hidden="true" className="size-4" />
                  </button>
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-[#e6e1ff] text-sm font-bold text-[#594e9e]">
                    {currentBooking.initials}
                  </div>
                  <div>
                    <p className="font-bold text-[#17343c] dark:text-white">
                      {currentBooking.client}
                    </p>
                    <p className="mt-0.5 text-xs text-[#70908a] dark:text-[#9cb8b1]">
                      Returning client · 8 visits
                    </p>
                  </div>
                </div>
                <div className="mt-5 space-y-3 border-t border-[#e7f0ec] pt-5 dark:border-white/8">
                  <a
                    href={`mailto:${currentBooking.email}`}
                    className="flex items-center gap-3 text-sm text-[#41645a] transition hover:text-[#0f8a62] dark:text-[#c4d8d1] dark:hover:text-[#8fe0bb]"
                  >
                    <Mail
                      aria-hidden="true"
                      className="size-4 text-[#91aaa2]"
                    />
                    {currentBooking.email}
                  </a>
                  <a
                    href={`tel:${currentBooking.phone}`}
                    className="flex items-center gap-3 text-sm text-[#41645a] transition hover:text-[#0f8a62] dark:text-[#c4d8d1] dark:hover:text-[#8fe0bb]"
                  >
                    <Phone
                      aria-hidden="true"
                      className="size-4 text-[#91aaa2]"
                    />
                    {currentBooking.phone}
                  </a>
                </div>
                <button
                  type="button"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#dceae4] py-3 text-sm font-bold text-[#0f8a62] transition hover:bg-[#f4fbf7] dark:border-white/10 dark:text-[#8fe0bb] dark:hover:bg-white/8"
                >
                  <MessageCircle aria-hidden="true" className="size-4" />
                  Message client
                </button>
              </section>

              <section className="rounded-2xl bg-[#0f8a62] p-5 text-white shadow-[0_16px_35px_rgba(15,138,98,0.18)]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-[#b8efd5] uppercase">
                      Manage booking
                    </p>
                    <h2 className="mt-1 text-lg font-bold">
                      Keep the day moving
                    </h2>
                  </div>
                  <CalendarCheck2
                    aria-hidden="true"
                    className="size-6 text-[#b8efd5]"
                  />
                </div>
                <div className="mt-5 grid gap-2">
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-[#0f6b4d] transition hover:bg-[#effcf5]"
                  >
                    <Edit3 aria-hidden="true" className="size-4" />
                    Reschedule booking
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    <X aria-hidden="true" className="size-4" />
                    Cancel booking
                  </button>
                </div>
                <p className="mt-4 text-center text-xs leading-5 text-[#b8efd5]">
                  Clients receive an automatic update when you change this
                  booking.
                </p>
              </section>

              <section className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-[#dcecf5] text-[#2d6980] dark:bg-[#2d6980]/15 dark:text-[#8ac5d7]">
                    <UserRound aria-hidden="true" className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                      Service history
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-[#17343c] dark:text-white">
                      Last visit 18 days ago
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-[#e7f0ec] pt-4 dark:border-white/8">
                  <span className="text-xs text-[#70908a] dark:text-[#9cb8b1]">
                    Total spent
                  </span>
                  <span className="text-sm font-bold text-[#17343c] dark:text-white">
                    $680.00
                  </span>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
