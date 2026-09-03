import { Head, Link, useForm } from '@inertiajs/react';
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
  XCircle,
} from 'lucide-react';
import { destroy } from '@/actions/App/Http/Controllers/Client/BookingController';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import client from '@/routes/client';
import { useNotice } from '@/contexts/notice-context';

type Booking = {
  id: string;
  reference: string;
  provider: string;
  provider_slug: string | null;
  address: string | null;
  city: string | null;
  phone: string | null;
  email: string | null;
  service: string;
  date: string | null;
  time: string | null;
  schedule: string | null;
  duration: number;
  amount: number;
  status: string;
  note: string | null;
  can_cancel: boolean;
};
function currency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
function Status({ status }: { status: string }) {
  const cancelled = status === 'cancelled';
  const completed = status === 'completed';
  const Icon = cancelled ? XCircle : completed ? CheckCircle2 : Clock3;
  const tone = cancelled
    ? 'bg-[#f2e8eb] text-[#96546a]'
    : completed
      ? 'bg-[#d9f7e8] text-[#0f6b4d]'
      : status === 'pending'
        ? 'bg-[#ffead9] text-[#a55c2d]'
        : 'bg-[#e6e1ff] text-[#594e9e]';

  return (
    <span
      className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold", tone)}
    >
      <Icon className="size-4" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function BookingShow({ booking }: { booking: Booking }) {
  const form = useForm({});
  const { show } = useNotice()

  const handleCancel = () => {

    show({
      type: "notice",
      title: "Cancel booking",
      description: "Are you sure you want to cancel this booking. This action action clears you booking history, which may be unavailable for booking in the future.",
      onConfirm: () => {
        form.delete(destroy(booking.id).url);
      }
    })
  };

  return (
    <>
      <Head title={`${booking.service} · ${booking.provider}`} />

      <div className="min-h-[calc(100vh-3rem)] bg-[#f6faf8] px-4 py-6 text-[#17343c] sm:px-6 lg:px-8 lg:py-8 dark:bg-[#101917] dark:text-[#e6f1ed]">
        <div className="mx-auto max-w-5xl space-y-6 lg:space-y-8">
          <Link
            href={client.booking.index()}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0f8a62]"
          >
            <ArrowLeft className="size-4" />
            Back to my bookings
          </Link>

          <section className="flex flex-col gap-5 rounded-3xl bg-[#17343c] px-6 py-8 text-white shadow-[0_20px_55px_rgba(23,52,60,0.14)] sm:flex-row sm:items-end sm:justify-between sm:px-8 lg:px-10">
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-[#8fe0bb] uppercase">
                Appointment details
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                {booking.service}
              </h1>
              <p className="mt-2 text-[#b8c9c7]">
                {booking.provider} · {booking.reference}
              </p>
            </div>
            <Status status={booking.status} />
          </section>


          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
            <div className="space-y-6">
              <section className="rounded-2xl border border-[#dceae4] bg-white p-6 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
                <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                  Your visit
                </p>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div className="flex gap-3">
                    <CalendarDays className="mt-0.5 size-5 text-[#0f8a62]" />
                    <div>
                      <p className="text-xs text-[#70908a]">Date</p>
                      <p className="mt-1 font-bold text-[#17343c] dark:text-white">
                        {booking.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock3 className="mt-0.5 size-5 text-[#0f8a62]" />
                    <div>
                      <p className="text-xs text-[#70908a]">Time</p>
                      <p className="mt-1 font-bold text-[#17343c] dark:text-white">
                        {booking.time} · {booking.duration} min
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 sm:col-span-2">
                    <MapPin className="mt-0.5 size-5 text-[#0f8a62]" />
                    <div>
                      <p className="text-xs text-[#70908a]">Location</p>
                      <p className="mt-1 font-bold text-[#17343c] dark:text-white">
                        {booking.address ||
                          booking.city ||
                          'Location provided by provider'}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              <section className="rounded-2xl border border-[#dceae4] bg-white p-6 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
                <div className="flex items-center gap-2">
                  <MessageCircle className="size-5 text-[#a55c2d]" />
                  <h2 className="font-bold text-[#17343c] dark:text-white">
                    Your note
                  </h2>
                </div>
                <p className="mt-4 text-sm leading-6 text-[#5d706a] dark:text-[#b6ccc5]">
                  {booking.note || 'No note was added to this booking.'}
                </p>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="rounded-2xl border border-[#dceae4] bg-white p-6 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
                <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                  Provider
                </p>
                <h2 className="mt-1 text-xl font-bold text-[#17343c] dark:text-white">
                  {booking.provider}
                </h2>
                <div className="mt-5 space-y-3 text-sm text-[#41645a] dark:text-[#c4d8d1]">
                  {booking.phone && (
                    <a
                      href={`tel:${booking.phone}`}
                      className="flex items-center gap-3 hover:text-[#0f8a62]"
                    >
                      <Phone className="size-4 text-[#0f8a62]" />
                      {booking.phone}
                    </a>
                  )}
                  {booking.address && (
                    <span className="flex items-start gap-3">
                      <MapPin className="mt-0.5 size-4 text-[#0f8a62]" />
                      {booking.address}
                    </span>
                  )}
                </div>
              </section>

              <section className="rounded-2xl border border-[#dceae4] bg-white p-6 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#70908a]">
                    Estimated total
                  </span>
                  <span className="text-xl font-bold text-[#17343c] dark:text-white">
                    {currency(booking.amount)}
                  </span>
                </div>

                {booking.can_cancel && (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      handleCancel();
                    }}
                  >
                    <Button
                      type="submit"
                      variant="outline"
                      className="mt-5 w-full rounded-xl border-[#e5b9c3] text-[#96546a] hover:bg-[#fdf0f3]"
                      disabled={form.processing}
                    >
                      Cancel booking
                    </Button>
                  </form>
                )}
              </section>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
