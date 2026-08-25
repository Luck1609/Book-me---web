import { Head, Link } from '@inertiajs/react';
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Edit3,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Phone,
  Scissors,
  ShieldCheck,
  Star,
  UserRound,
} from 'lucide-react';
import team from '@/routes/team';

type TeamMemberDetails = {
  id: string;
  name: string;
  initials: string;
  role: string;
  email: string;
  phone: string;
  statusLabel: string;
  joined: string;
  bookings: number;
  rating: string;
  revenue: string;
  completionRate: string;
  specialties: string[];
  bio: string;
};

type TeamShowProps = {
  teamMember?: TeamMemberDetails;
};

type Shift = {
  day: string;
  hours: string;
  active: boolean;
};

type TeamBooking = {
  id: string;
  client: string;
  service: string;
  time: string;
  amount: string;
  status: 'Completed' | 'Upcoming';
};

const sampleMember: TeamMemberDetails = {
  id: 'team-001',
  name: 'Julian Sterling',
  initials: 'JS',
  role: 'Lead Barber',
  email: 'julian.sterling@example.com',
  phone: '+1 (212) 555-0148',
  statusLabel: 'Available now',
  joined: 'January 2024',
  bookings: 18,
  rating: '4.9',
  revenue: '$2,480',
  completionRate: '98%',
  specialties: ['Signature fades', 'Classic scissor cuts', 'Hot towel shaves'],
  bio: 'Julian brings a calm, precise approach to every appointment. He is especially known for thoughtful consultations and finishes that grow out beautifully.',
};

const shifts: Shift[] = [
  { day: 'Monday', hours: '09:00 AM – 06:00 PM', active: true },
  { day: 'Tuesday', hours: '09:00 AM – 06:00 PM', active: true },
  { day: 'Wednesday', hours: '09:00 AM – 06:00 PM', active: true },
  { day: 'Thursday', hours: '09:00 AM – 06:00 PM', active: true },
  { day: 'Friday', hours: '10:00 AM – 07:00 PM', active: true },
  { day: 'Saturday', hours: 'Off', active: false },
  { day: 'Sunday', hours: 'Off', active: false },
];

const recentBookings: TeamBooking[] = [
  {
    id: 'BK-240824',
    client: 'John Doe',
    service: 'Traditional Hot Towel Shave',
    time: 'Today · 10:00 AM',
    amount: '$85.00',
    status: 'Upcoming',
  },
  {
    id: 'BK-240819',
    client: 'Marcus Thorne',
    service: 'Signature Fade & Lineup',
    time: 'Yesterday · 09:00 AM',
    amount: '$65.00',
    status: 'Completed',
  },
  {
    id: 'BK-240812',
    client: 'Elena Rodriguez',
    service: 'Style Consultation & Trim',
    time: '12 Aug · 11:30 AM',
    amount: '$55.00',
    status: 'Completed',
  },
];

function InfoItem({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Mail;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#edf7f2] text-[#0f8a62] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
        <Icon aria-hidden="true" className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold tracking-[0.14em] text-[#91aaa2] uppercase">
          {label}
        </p>
        <p className="mt-1 truncate text-sm font-semibold text-[#17343c] dark:text-white">
          {children}
        </p>
      </div>
    </div>
  );
}

export default function TeamShow({
  teamMember: providedMember,
}: TeamShowProps) {
  const member = providedMember ?? sampleMember;

  return (
    <>
      <Head title={`${member.name} · Team profile`} />

      <main className="min-h-[calc(100vh-3rem)] bg-[#f6faf8] px-4 py-6 text-[#17343c] sm:px-6 lg:px-8 lg:py-8 dark:bg-[#101917] dark:text-[#e6f1ed]">
        <div className="mx-auto max-w-7xl space-y-6 lg:space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href={team.index.url()}
              className="group inline-flex items-center gap-2 text-sm font-bold text-[#70908a] transition hover:text-[#0f8a62] dark:text-[#9cb8b1] dark:hover:text-[#8fe0bb]"
            >
              <span className="flex size-9 items-center justify-center rounded-xl border border-[#dceae4] bg-white transition group-hover:-translate-x-0.5 group-hover:border-[#b9d5ca] dark:border-white/10 dark:bg-[#17221f]">
                <ArrowLeft aria-hidden="true" className="size-4" />
              </span>
              Back to team
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-[#dceae4] bg-white px-3.5 py-2.5 text-sm font-bold text-[#41645a] transition hover:bg-[#f4fbf7] dark:border-white/10 dark:bg-[#17221f] dark:text-[#c4d8d1] dark:hover:bg-white/8"
              >
                <Edit3 aria-hidden="true" className="size-4" />
                Edit member
              </button>
              <button
                type="button"
                aria-label="More team member actions"
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
                <div className="relative flex size-16 shrink-0 items-center justify-center rounded-2xl bg-[#d9f7e8] text-xl font-bold text-[#0f6b4d]">
                  {member.initials}
                  <span className="absolute -right-1 -bottom-1 size-4 rounded-full border-4 border-[#17343c] bg-[#0f8a62]" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-xs font-bold tracking-[0.16em] text-[#8fe0bb] uppercase">
                      Team member profile
                    </p>
                    <span className="rounded-full bg-[#0f8a62]/25 px-2.5 py-1 text-[10px] font-bold text-[#a9efce]">
                      {member.statusLabel}
                    </span>
                  </div>
                  <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                    {member.name}
                  </h1>
                  <p className="mt-2 text-sm text-[#b8c9c7]">
                    {member.role} · With the team since {member.joined}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0f8a62] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#0f8a62]/20 transition hover:bg-[#0d7955]"
                >
                  <MessageCircle aria-hidden="true" className="size-4" />
                  Message
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  <CalendarDays aria-hidden="true" className="size-4" />
                  View schedule
                </button>
              </div>
            </div>
          </section>

          <section
            aria-label="Team member summary"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <p className="text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
                Bookings this month
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
                {member.bookings}
              </p>
              <p className="mt-1 text-xs text-[#0f8a62] dark:text-[#8fe0bb]">
                +12% from last month
              </p>
            </div>
            <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <p className="text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
                Revenue generated
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
                {member.revenue}
              </p>
              <p className="mt-1 text-xs text-[#91aaa2]">
                Across completed services
              </p>
            </div>
            <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <p className="text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
                Client rating
              </p>
              <p className="mt-2 flex items-center gap-2 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
                {member.rating}
                <Star
                  aria-hidden="true"
                  className="size-5 fill-[#f0a46e] text-[#f0a46e]"
                />
              </p>
              <p className="mt-1 text-xs text-[#91aaa2]">
                From 48 client reviews
              </p>
            </div>
            <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <p className="text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
                Completion rate
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
                {member.completionRate}
              </p>
              <p className="mt-1 text-xs text-[#0f8a62] dark:text-[#8fe0bb]">
                Excellent reliability
              </p>
            </div>
          </section>

          <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.85fr)]">
            <div className="space-y-6">
              <section className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] sm:p-6 dark:border-white/10 dark:bg-[#17221f]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                      Recent bookings
                    </p>
                    <h2 className="mt-1 text-lg font-bold tracking-tight text-[#17343c] dark:text-white">
                      Work on the calendar
                    </h2>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0f8a62] dark:text-[#8fe0bb]"
                  >
                    View all
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </button>
                </div>
                <div className="mt-5 divide-y divide-[#e7f0ec] dark:divide-white/8">
                  {recentBookings.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#edf7f2] text-[#0f8a62] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
                        <Scissors aria-hidden="true" className="size-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="truncate text-sm font-bold text-[#17343c] dark:text-white">
                            {item.client}
                          </p>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${item.status === 'Upcoming' ? 'bg-[#e6e1ff] text-[#594e9e] dark:bg-[#806edc]/15 dark:text-[#c0b8ec]' : 'bg-[#edf4f0] text-[#5d8073] dark:bg-[#5d8073]/15 dark:text-[#a9c9bd]'}`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <p className="mt-1 truncate text-xs text-[#91aaa2]">
                          {item.service} · {item.time}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-[#17343c] dark:text-white">
                        {item.amount}
                      </p>
                      <ChevronRight
                        aria-hidden="true"
                        className="size-4 text-[#b0c3bc]"
                      />
                    </div>
                  ))}
                </div>
              </section>
              <section className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] sm:p-6 dark:border-white/10 dark:bg-[#17221f]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                      About the role
                    </p>
                    <h2 className="mt-1 text-lg font-bold tracking-tight text-[#17343c] dark:text-white">
                      A little more about {member.name.split(' ')[0]}
                    </h2>
                  </div>
                  <ShieldCheck
                    aria-hidden="true"
                    className="size-6 text-[#2d6980] dark:text-[#8ac5d7]"
                  />
                </div>
                <p className="mt-5 text-sm leading-6 text-[#5d706a] dark:text-[#c4d8d1]">
                  {member.bio}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {member.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#f4fbf7] px-3 py-1.5 text-xs font-semibold text-[#41645a] dark:bg-[#0f8a62]/10 dark:text-[#a9d8c4]"
                    >
                      <CheckCircle2
                        aria-hidden="true"
                        className="size-3.5 text-[#0f8a62]"
                      />
                      {specialty}
                    </span>
                  ))}
                </div>
              </section>
            </div>
            <aside className="space-y-6">
              <section className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                      Contact details
                    </p>
                    <h2 className="mt-1 text-lg font-bold tracking-tight text-[#17343c] dark:text-white">
                      Stay connected
                    </h2>
                  </div>
                  <UserRound
                    aria-hidden="true"
                    className="size-6 text-[#2d6980] dark:text-[#8ac5d7]"
                  />
                </div>
                <div className="mt-5 space-y-4">
                  <a
                    href={`mailto:${member.email}`}
                    className="block transition hover:opacity-80"
                  >
                    <InfoItem icon={Mail} label="Email">
                      {member.email}
                    </InfoItem>
                  </a>
                  <a
                    href={`tel:${member.phone}`}
                    className="block transition hover:opacity-80"
                  >
                    <InfoItem icon={Phone} label="Phone">
                      {member.phone}
                    </InfoItem>
                  </a>
                </div>
                <button
                  type="button"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#dceae4] py-3 text-sm font-bold text-[#0f8a62] transition hover:bg-[#f4fbf7] dark:border-white/10 dark:text-[#8fe0bb] dark:hover:bg-white/8"
                >
                  <MessageCircle aria-hidden="true" className="size-4" />
                  Message {member.name.split(' ')[0]}
                </button>
              </section>
              <section className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                      Weekly availability
                    </p>
                    <h2 className="mt-1 text-lg font-bold tracking-tight text-[#17343c] dark:text-white">
                      Working hours
                    </h2>
                  </div>
                  <Clock3
                    aria-hidden="true"
                    className="size-6 text-[#0f8a62] dark:text-[#8fe0bb]"
                  />
                </div>
                <div className="mt-5 space-y-3">
                  {shifts.map((shift) => (
                    <div
                      key={shift.day}
                      className="flex items-center justify-between text-sm"
                    >
                      <span
                        className={`font-semibold ${shift.active ? 'text-[#17343c] dark:text-white' : 'text-[#91aaa2]'}`}
                      >
                        {shift.day}
                      </span>
                      <span
                        className={
                          shift.active
                            ? 'text-[#41645a] dark:text-[#c4d8d1]'
                            : 'text-[#91aaa2]'
                        }
                      >
                        {shift.hours}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#dceae4] py-3 text-xs font-bold text-[#0f8a62] transition hover:bg-[#f4fbf7] dark:border-white/10 dark:text-[#8fe0bb] dark:hover:bg-white/8"
                >
                  <Edit3 aria-hidden="true" className="size-3.5" />
                  Edit availability
                </button>
              </section>
              <section className="rounded-2xl bg-[#0f8a62] p-5 text-white shadow-[0_16px_35px_rgba(15,138,98,0.18)]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-[#b8efd5] uppercase">
                      Team access
                    </p>
                    <h2 className="mt-1 text-lg font-bold">
                      Lead barber permissions
                    </h2>
                  </div>
                  <ShieldCheck
                    aria-hidden="true"
                    className="size-6 text-[#b8efd5]"
                  />
                </div>
                <p className="mt-4 text-sm leading-6 text-[#d1f5e4]">
                  Can manage assigned bookings, view client notes, and update
                  personal availability.
                </p>
                <button
                  type="button"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-[#0f6b4d] transition hover:bg-[#effcf5]"
                >
                  Manage permissions
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </button>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
