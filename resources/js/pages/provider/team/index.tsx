import { Head, Link } from '@inertiajs/react';
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import team from '@/routes/team';

type TeamStatus = 'available' | 'away' | 'offline';

type TeamMember = {
  id: string;
  name: string;
  initials: string;
  role: string;
  email: string;
  status: TeamStatus;
  statusLabel: string;
  shift: string;
  nextShift: string;
  bookings: number;
  rating: string;
  workload: number;
  tone: string;
};

type TeamPageProps = {
  team?: TeamMember[];
};

const sampleTeam: TeamMember[] = [
  {
    id: 'team-001',
    name: 'Julian Sterling',
    initials: 'JS',
    role: 'Lead Barber',
    email: 'julian.sterling@example.com',
    status: 'available',
    statusLabel: 'Available now',
    shift: '09:00 AM – 06:00 PM',
    nextShift: 'Today · 09:00 AM',
    bookings: 18,
    rating: '4.9',
    workload: 82,
    tone: 'bg-[#d9f7e8] text-[#0f6b4d]',
  },
  {
    id: 'team-002',
    name: 'Maya Okafor',
    initials: 'MO',
    role: 'Senior Stylist',
    email: 'maya.okafor@example.com',
    status: 'available',
    statusLabel: 'Available now',
    shift: '10:00 AM – 07:00 PM',
    nextShift: 'Today · 10:00 AM',
    bookings: 14,
    rating: '5.0',
    workload: 68,
    tone: 'bg-[#e6e1ff] text-[#594e9e]',
  },
  {
    id: 'team-003',
    name: 'Theo Anderson',
    initials: 'TA',
    role: 'Barber',
    email: 'theo.anderson@example.com',
    status: 'away',
    statusLabel: 'On break',
    shift: '08:30 AM – 05:30 PM',
    nextShift: 'Today · 08:30 AM',
    bookings: 12,
    rating: '4.8',
    workload: 56,
    tone: 'bg-[#dcecf5] text-[#2d6980]',
  },
  {
    id: 'team-004',
    name: 'Nia Mensah',
    initials: 'NM',
    role: 'Nail Technician',
    email: 'nia.mensah@example.com',
    status: 'available',
    statusLabel: 'Available now',
    shift: '09:30 AM – 06:30 PM',
    nextShift: 'Today · 09:30 AM',
    bookings: 16,
    rating: '4.9',
    workload: 74,
    tone: 'bg-[#ffead9] text-[#a55c2d]',
  },
  {
    id: 'team-005',
    name: 'Sofia Bennett',
    initials: 'SB',
    role: 'Guest Experience',
    email: 'sofia.bennett@example.com',
    status: 'offline',
    statusLabel: 'Off today',
    shift: '09:00 AM – 05:00 PM',
    nextShift: 'Tomorrow · 09:00 AM',
    bookings: 0,
    rating: '4.9',
    workload: 34,
    tone: 'bg-[#f3f0ff] text-[#685bb4]',
  },
  {
    id: 'team-006',
    name: 'Marcus Vane',
    initials: 'MV',
    role: 'Barber',
    email: 'marcus.vane@example.com',
    status: 'available',
    statusLabel: 'Available now',
    shift: '11:00 AM – 08:00 PM',
    nextShift: 'Today · 11:00 AM',
    bookings: 11,
    rating: '4.8',
    workload: 61,
    tone: 'bg-[#f2e8eb] text-[#96546a]',
  },
];

const roleTabs = [
  { label: 'Everyone', value: 'all' },
  { label: 'Barbers', value: 'barber' },
  { label: 'Stylists', value: 'stylist' },
  { label: 'Support', value: 'support' },
] as const;

function getStatusClass(status: TeamStatus): string {
  if (status === 'available') {
    return 'bg-[#e9f8f0] text-[#0f8a62] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]';
  }

  if (status === 'away') {
    return 'bg-[#fff4eb] text-[#a55c2d] dark:bg-[#a55c2d]/15 dark:text-[#f0b58b]';
  }

  return 'bg-[#f2f0f1] text-[#7b8884] dark:bg-white/10 dark:text-[#afc0ba]';
}

function matchesRole(
  member: TeamMember,
  filter: (typeof roleTabs)[number]['value'],
): boolean {
  if (filter === 'all') {
    return true;
  }

  if (filter === 'barber') {
    return member.role.toLowerCase().includes('barber');
  }

  if (filter === 'stylist') {
    return member.role.toLowerCase().includes('stylist');
  }

  return (
    member.role.toLowerCase().includes('experience') ||
    member.role.toLowerCase().includes('technician')
  );
}

export default function TeamIndex({
  team: providedTeam = sampleTeam,
}: TeamPageProps) {
  const [activeRole, setActiveRole] =
    useState<(typeof roleTabs)[number]['value']>('all');
  const [search, setSearch] = useState('');

  const visibleTeam = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return providedTeam.filter((member) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        `${member.name} ${member.role} ${member.email}`
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesRole(member, activeRole) && matchesSearch;
    });
  }, [activeRole, providedTeam, search]);

  const availableCount = providedTeam.filter(
    (member) => member.status === 'available',
  ).length;
  const onBreakCount = providedTeam.filter(
    (member) => member.status === 'away',
  ).length;
  const totalBookings = providedTeam.reduce(
    (sum, member) => sum + member.bookings,
    0,
  );

  return (
    <>
      <Head title="Team management" />

      <main className="min-h-[calc(100vh-3rem)] bg-[#f6faf8] px-4 py-6 text-[#17343c] sm:px-6 lg:px-8 lg:py-8 dark:bg-[#101917] dark:text-[#e6f1ed]">
        <div className="mx-auto max-w-7xl space-y-6 lg:space-y-8">
          <section className="flex flex-col gap-6 rounded-3xl bg-[#17343c] px-6 py-7 text-white shadow-[0_20px_55px_rgba(23,52,60,0.12)] sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:py-8">
            <div>
              <div className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-[#8fe0bb] uppercase">
                <Users aria-hidden="true" className="size-4" />
                Team workspace
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Your team
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#b8c9c7] sm:text-base">
                Give every person the clarity and space they need to do their
                best work.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#0f8a62] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#0f8a62]/20 transition hover:bg-[#0d7955] focus-visible:ring-2 focus-visible:ring-[#8fe0bb] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17343c]"
            >
              <Plus aria-hidden="true" className="size-4" />
              Add team member
            </button>
          </section>

          <section
            aria-label="Team summary"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#d9f7e8] text-[#0f6b4d]">
                  <Users aria-hidden="true" className="size-5" />
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 text-[#0f8a62]"
                />
              </div>
              <p className="mt-5 text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
                Team members
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
                {providedTeam.length}
              </p>
              <p className="mt-1 text-xs text-[#91aaa2]">Across your studio</p>
            </div>
            <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#e6e1ff] text-[#594e9e]">
                  <CheckCircle2 aria-hidden="true" className="size-5" />
                </span>
                <span className="text-xs font-bold text-[#685bb4] dark:text-[#c0b8ec]">
                  Live
                </span>
              </div>
              <p className="mt-5 text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
                Available now
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
                {availableCount}
              </p>
              <p className="mt-1 text-xs text-[#91aaa2]">
                Ready for today&apos;s work
              </p>
            </div>
            <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#ffead9] text-[#a55c2d]">
                  <Clock3 aria-hidden="true" className="size-5" />
                </span>
                <span className="rounded-full bg-[#fff4eb] px-2 py-1 text-[10px] font-bold text-[#a55c2d] dark:bg-[#a55c2d]/15 dark:text-[#f0b58b]">
                  {onBreakCount} away
                </span>
              </div>
              <p className="mt-5 text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
                Live coverage
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
                {Math.round(
                  (availableCount / Math.max(providedTeam.length, 1)) * 100,
                )}
                %
              </p>
              <p className="mt-1 text-xs text-[#91aaa2]">
                Team availability today
              </p>
            </div>
            <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#dcecf5] text-[#2d6980]">
                  <CalendarDays aria-hidden="true" className="size-5" />
                </span>
                <Sparkles
                  aria-hidden="true"
                  className="size-4 text-[#2d6980]"
                />
              </div>
              <p className="mt-5 text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
                Bookings this week
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
                {totalBookings}
              </p>
              <p className="mt-1 text-xs text-[#91aaa2]">
                Across the whole team
              </p>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-[#dceae4] bg-white shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
            <div className="flex flex-col gap-4 border-b border-[#e7f0ec] px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-6 dark:border-white/8">
              <div className="relative w-full lg:max-w-sm">
                <Search
                  aria-hidden="true"
                  className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#91aaa2]"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  type="search"
                  placeholder="Search team members"
                  aria-label="Search team members"
                  className="h-11 w-full rounded-xl border border-[#dceae4] bg-[#f8fcfa] pr-4 pl-11 text-sm transition outline-none placeholder:text-[#91aaa2] focus:border-[#76c9a5] focus:ring-4 focus:ring-[#e3f6ee] dark:border-white/10 dark:bg-white/5 dark:placeholder:text-[#719089] dark:focus:border-[#4fae88] dark:focus:ring-[#0f8a62]/15"
                />
              </div>
              <div className="flex [scrollbar-width:none] items-center gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
                {roleTabs.map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setActiveRole(tab.value)}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${activeRole === tab.value ? 'bg-[#17343c] text-white dark:bg-[#0f8a62]' : 'border border-[#dceae4] text-[#70908a] hover:bg-[#f4fbf7] dark:border-white/10 dark:text-[#9cb8b1] dark:hover:bg-white/8'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 border-b border-[#e7f0ec] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-white/8">
              <p className="text-sm text-[#70908a] dark:text-[#9cb8b1]">
                <span className="font-bold text-[#17343c] dark:text-white">
                  {visibleTeam.length}
                </span>{' '}
                team members shown
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#dceae4] px-3 py-2 text-xs font-bold text-[#70908a] transition hover:bg-[#f4fbf7] dark:border-white/10 dark:text-[#9cb8b1] dark:hover:bg-white/8"
                >
                  <Filter aria-hidden="true" className="size-3.5" />
                  Filters
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#dceae4] px-3 py-2 text-xs font-bold text-[#70908a] transition hover:bg-[#f4fbf7] dark:border-white/10 dark:text-[#9cb8b1] dark:hover:bg-white/8"
                >
                  Most active
                  <ChevronDown aria-hidden="true" className="size-3.5" />
                </button>
              </div>
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-6">
              {visibleTeam.length > 0 ? (
                visibleTeam.map((member) => (
                  <Link
                    key={member.id}
                    href={team.show.url(member.id)}
                    prefetch
                    className="group relative overflow-hidden rounded-2xl border border-[#dceae4] bg-[#fbfdfc] p-5 transition hover:-translate-y-0.5 hover:border-[#b9d5ca] hover:shadow-[0_14px_30px_rgba(23,52,60,0.08)] dark:border-white/10 dark:bg-white/3 dark:hover:border-[#376452]"
                  >
                    <div className="absolute top-0 right-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-[#d9f7e8]/60 transition group-hover:scale-125 dark:bg-[#0f8a62]/10" />
                    <div className="relative flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`relative flex size-12 items-center justify-center rounded-2xl text-sm font-bold ${member.tone}`}
                        >
                          {member.initials}
                          <span
                            className={`absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-[#fbfdfc] ${member.status === 'available' ? 'bg-[#0f8a62]' : member.status === 'away' ? 'bg-[#f0a46e]' : 'bg-[#9aaba5]'} dark:border-[#17221f]`}
                          />
                        </span>
                        <div className="min-w-0">
                          <h2 className="truncate text-sm font-bold text-[#17343c] dark:text-white">
                            {member.name}
                          </h2>
                          <p className="mt-1 text-xs text-[#70908a] dark:text-[#9cb8b1]">
                            {member.role}
                          </p>
                        </div>
                      </div>
                      <MoreHorizontal
                        aria-hidden="true"
                        className="size-5 text-[#a0b5ae]"
                      />
                    </div>
                    <div className="relative mt-5 flex items-center justify-between">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${getStatusClass(member.status)}`}
                      >
                        {member.statusLabel}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-[#a55c2d]">
                        <Star
                          aria-hidden="true"
                          className="size-3.5 fill-current"
                        />
                        {member.rating}
                      </span>
                    </div>
                    <div className="relative mt-5 grid grid-cols-2 gap-3 border-y border-[#e7f0ec] py-4 text-xs dark:border-white/8">
                      <div>
                        <p className="text-[#91aaa2]">Today&apos;s shift</p>
                        <p className="mt-1 font-bold text-[#17343c] dark:text-white">
                          {member.shift}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#91aaa2]">Bookings</p>
                        <p className="mt-1 font-bold text-[#17343c] dark:text-white">
                          {member.bookings} this week
                        </p>
                      </div>
                    </div>
                    <div className="relative mt-4">
                      <div className="flex items-center justify-between text-[10px] font-bold text-[#91aaa2]">
                        <span>Workload</span>
                        <span>{member.workload}%</span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e8f1ed] dark:bg-white/10">
                        <div
                          className={`h-full rounded-full ${member.workload > 80 ? 'bg-[#a55c2d]' : 'bg-[#0f8a62]'}`}
                          style={{ width: `${member.workload}%` }}
                        />
                      </div>
                    </div>
                    <div className="relative mt-5 flex items-center justify-between border-t border-[#e7f0ec] pt-4 dark:border-white/8">
                      <span className="flex items-center gap-1.5 text-[11px] text-[#91aaa2]">
                        <CalendarDays aria-hidden="true" className="size-3.5" />
                        {member.nextShift}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0f8a62] transition group-hover:gap-1.5 dark:text-[#8fe0bb]">
                        View profile
                        <ChevronRight aria-hidden="true" className="size-3.5" />
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full px-6 py-16 text-center">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#edf7f2] text-[#0f8a62] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
                    <Search aria-hidden="true" className="size-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-[#17343c] dark:text-white">
                    No team members found
                  </h3>
                  <p className="mt-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
                    Try another name or role filter.
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3 border-t border-[#e7f0ec] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-white/8">
              <p className="text-xs text-[#91aaa2]">
                Showing {visibleTeam.length} of {providedTeam.length} team
                members
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0f8a62] dark:text-[#8fe0bb]"
              >
                View team schedule
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
