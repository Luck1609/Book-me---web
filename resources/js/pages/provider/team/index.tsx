import { Head, Link, router, useForm } from '@inertiajs/react';
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Filter,
  LayoutGrid,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  Star,
  Table2,
  Users,
  X,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { toast } from 'sonner';
import { store } from '@/actions/App/Http/Controllers/TeamController';
import { Input } from '@/components/form/input';
import { Select } from '@/components/form/select';
import SubmitButton from '@/components/form/submit-button';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import team from '@/routes/team';

type TeamStatus = 'available' | 'away' | 'offline';
type RoleFilter = 'all' | 'barber' | 'stylist' | 'support';
type StatusFilter = 'all' | TeamStatus;
type SortOrder = 'active' | 'recent';
type ViewMode = 'cards' | 'table';

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
  team: TeamMember[];
  stats: {
    total: number;
    available: number;
    away: number;
    offline: number;
    coverage: number;
    bookings: number;
  };
  filters: {
    search: string;
    role: RoleFilter;
    status: StatusFilter;
    sort: SortOrder;
  };
};

type TeamFormData = {
  name: string;
  email: string;
  phone: string;
  role: string;
  status: TeamStatus;
  shift_start: string;
  shift_end: string;
  next_shift_at: string;
};

const roleTabs: { label: string; value: RoleFilter }[] = [
  { label: 'Everyone', value: 'all' },
  { label: 'Barbers', value: 'barber' },
  { label: 'Stylists', value: 'stylist' },
  { label: 'Support', value: 'support' },
];

const statusOptions: { label: string; value: StatusFilter }[] = [
  { label: 'All statuses', value: 'all' },
  { label: 'Available', value: 'available' },
  { label: 'On break', value: 'away' },
  { label: 'Offline', value: 'offline' },
];

const formRoleOptions = [
  { label: 'Barber', value: 'Barber' },
  { label: 'Senior Stylist', value: 'Senior Stylist' },
  { label: 'Nail Technician', value: 'Nail Technician' },
  { label: 'Guest Experience', value: 'Guest Experience' },
  { label: 'Support', value: 'Support' },
];

const formStatusOptions = [
  { label: 'Available now', value: 'available' },
  { label: 'On break', value: 'away' },
  { label: 'Off today', value: 'offline' },
];

function getStatusClass(status: TeamStatus): string {
  if (status === 'available') {
    return 'bg-[#e9f8f0] text-[#0f8a62] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]';
  }

  if (status === 'away') {
    return 'bg-[#fff4eb] text-[#a55c2d] dark:bg-[#a55c2d]/15 dark:text-[#f0b58b]';
  }

  return 'bg-[#f2f0f1] text-[#7b8884] dark:bg-white/10 dark:text-[#afc0ba]';
}

function statusLabel(status: StatusFilter): string {
  return (
    statusOptions.find((option) => option.value === status)?.label ?? 'Filters'
  );
}

function activeButtonClass(active: boolean): string {
  return active
    ? 'bg-[#17343c] text-white dark:bg-[#0f8a62]'
    : 'border border-[#dceae4] text-[#70908a] hover:bg-[#f4fbf7] dark:border-white/10 dark:text-[#9cb8b1] dark:hover:bg-white/8';
}

export default function TeamIndex({
  team: teamMembers,
  stats,
  filters,
}: TeamPageProps) {
  const [activeRole, setActiveRole] = useState<RoleFilter>(filters.role);
  const [activeStatus, setActiveStatus] = useState<StatusFilter>(
    filters.status,
  );
  const [search, setSearch] = useState(filters.search);
  const [sort, setSort] = useState<SortOrder>(filters.sort);
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const form = useForm<TeamFormData>({
    name: '',
    email: '',
    phone: '',
    role: 'Barber',
    status: 'available',
    shift_start: '09:00',
    shift_end: '18:00',
    next_shift_at: '',
  })
    .withPrecognition(store())
    .setValidationTimeout(500);

  const visitTeam = useCallback(() => {
    router.get(
      team.index.url(),
      {
        search: search || undefined,
        role: activeRole === 'all' ? undefined : activeRole,
        status: activeStatus === 'all' ? undefined : activeStatus,
        sort,
      },
      {
        preserveState: true,
        preserveScroll: true,
        replace: true,
      },
    );
  }, [activeRole, activeStatus, search, sort]);

  useEffect(() => {
    if (
      search === filters.search &&
      activeRole === filters.role &&
      activeStatus === filters.status &&
      sort === filters.sort
    ) {
      return;
    }

    const timeout = window.setTimeout(visitTeam, 300);

    return () => window.clearTimeout(timeout);
  }, [activeRole, activeStatus, filters, search, sort, visitTeam]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    form.post(store.url(), {
      preserveScroll: true,
      onSuccess: () => {
        form.reset();
        setIsFormOpen(false);
        toast.success('Team member added successfully.');
      },
    });
  };

  const statCards = [
    {
      label: 'Team members',
      value: stats.total,
      note: 'Across your studio',
      icon: Users,
      iconClass: 'bg-[#d9f7e8] text-[#0f6b4d]',
      accent: (
        <ArrowUpRight aria-hidden="true" className="size-4 text-[#0f8a62]" />
      ),
    },
    {
      label: 'Available now',
      value: stats.available,
      note: "Ready for today's work",
      icon: CheckCircle2,
      iconClass: 'bg-[#e6e1ff] text-[#594e9e]',
      accent: (
        <span className="text-xs font-bold text-[#685bb4] dark:text-[#c0b8ec]">
          Live
        </span>
      ),
    },
    {
      label: 'Live coverage',
      value: String(stats.coverage) + '%',
      note: 'Team availability today',
      icon: Clock3,
      iconClass: 'bg-[#ffead9] text-[#a55c2d]',
      accent: (
        <span className="rounded-full bg-[#fff4eb] px-2 py-1 text-[10px] font-bold text-[#a55c2d] dark:bg-[#a55c2d]/15 dark:text-[#f0b58b]">
          {stats.away} away
        </span>
      ),
    },
    {
      label: 'Bookings this week',
      value: stats.bookings,
      note: 'Across the whole team',
      icon: CalendarDays,
      iconClass: 'bg-[#dcecf5] text-[#2d6980]',
      accent: <Sparkles aria-hidden="true" className="size-4 text-[#2d6980]" />,
    },
  ];

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
            <Button
              type="button"
              onClick={() => setIsFormOpen(true)}
              className="w-fit rounded-xl bg-[#0f8a62] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#0f8a62]/20 hover:bg-[#0d7955]"
            >
              <Plus aria-hidden="true" className="size-4" />
              Add team member
            </Button>
          </section>

          <section
            aria-label="Team summary"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {statCards.map(
              ({ label, value, note, icon: Icon, iconClass, accent }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={
                        'flex size-10 items-center justify-center rounded-xl ' +
                        iconClass
                      }
                    >
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    {accent}
                  </div>
                  <p className="mt-5 text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
                    {label}
                  </p>
                  <p className="mt-1 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
                    {value}
                  </p>
                  <p className="mt-1 text-xs text-[#91aaa2]">{note}</p>
                </div>
              ),
            )}
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
                    className={
                      'shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ' +
                      activeButtonClass(activeRole === tab.value)
                    }
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 border-b border-[#e7f0ec] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-white/8">
              <p className="text-sm text-[#70908a] dark:text-[#9cb8b1]">
                <span className="font-bold text-[#17343c] dark:text-white">
                  {teamMembers.length}
                </span>{' '}
                team members shown
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <button
                    type="button"
                    aria-expanded={isFilterOpen}
                    onClick={() => {
                      setIsFilterOpen((open) => !open);
                      setIsSortOpen(false);
                    }}
                    className={
                      'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold transition ' +
                      (activeStatus !== 'all'
                        ? 'border-[#76c9a5] bg-[#edf7f2] text-[#0f8a62] dark:border-[#4fae88] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]'
                        : 'border-[#dceae4] text-[#70908a] hover:bg-[#f4fbf7] dark:border-white/10 dark:text-[#9cb8b1] dark:hover:bg-white/8')
                    }
                  >
                    <Filter aria-hidden="true" className="size-3.5" />
                    {statusLabel(activeStatus)}
                    <ChevronDown aria-hidden="true" className="size-3.5" />
                  </button>
                  {isFilterOpen && (
                    <div className="absolute top-full right-0 z-20 mt-2 min-w-40 rounded-xl border border-[#dceae4] bg-white p-1.5 shadow-xl dark:border-white/10 dark:bg-[#17221f]">
                      {statusOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setActiveStatus(option.value);
                            setIsFilterOpen(false);
                          }}
                          className={
                            'block w-full rounded-lg px-3 py-2 text-left text-xs font-semibold ' +
                            activeButtonClass(activeStatus === option.value)
                          }
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    type="button"
                    aria-expanded={isSortOpen}
                    onClick={() => {
                      setIsSortOpen((open) => !open);
                      setIsFilterOpen(false);
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#dceae4] px-3 py-2 text-xs font-bold text-[#70908a] transition hover:bg-[#f4fbf7] dark:border-white/10 dark:text-[#9cb8b1] dark:hover:bg-white/8"
                  >
                    {sort === 'active' ? 'Most active' : 'Recently added'}
                    <ChevronDown aria-hidden="true" className="size-3.5" />
                  </button>
                  {isSortOpen && (
                    <div className="absolute top-full right-0 z-20 mt-2 min-w-40 rounded-xl border border-[#dceae4] bg-white p-1.5 shadow-xl dark:border-white/10 dark:bg-[#17221f]">
                      {[
                        { label: 'Most active', value: 'active' as SortOrder },
                        {
                          label: 'Recently added',
                          value: 'recent' as SortOrder,
                        },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setSort(option.value);
                            setIsSortOpen(false);
                          }}
                          className={
                            'block w-full rounded-lg px-3 py-2 text-left text-xs font-semibold ' +
                            activeButtonClass(sort === option.value)
                          }
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center rounded-lg border border-[#dceae4] p-0.5 dark:border-white/10">
                  <button
                    type="button"
                    aria-label="Show cards"
                    aria-pressed={viewMode === 'cards'}
                    onClick={() => setViewMode('cards')}
                    className={
                      'rounded-md p-1.5 ' +
                      (viewMode === 'cards'
                        ? 'bg-[#17343c] text-white dark:bg-[#0f8a62]'
                        : 'text-[#91aaa2]')
                    }
                  >
                    <LayoutGrid aria-hidden="true" className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Show table"
                    aria-pressed={viewMode === 'table'}
                    onClick={() => setViewMode('table')}
                    className={
                      'rounded-md p-1.5 ' +
                      (viewMode === 'table'
                        ? 'bg-[#17343c] text-white dark:bg-[#0f8a62]'
                        : 'text-[#91aaa2]')
                    }
                  >
                    <Table2 aria-hidden="true" className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            {teamMembers.length === 0 ? (
              <EmptyState />
            ) : viewMode === 'cards' ? (
              <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-6">
                {teamMembers.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
            ) : (
              <TeamTable teamMembers={teamMembers} />
            )}
            <div className="flex flex-col gap-3 border-t border-[#e7f0ec] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-white/8">
              <p className="text-xs text-[#91aaa2]">
                Showing {teamMembers.length} team members
              </p>
              {activeStatus !== 'all' && (
                <button
                  type="button"
                  onClick={() => setActiveStatus('all')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0f8a62] dark:text-[#8fe0bb]"
                >
                  Clear status filter
                  <X aria-hidden="true" className="size-3.5" />
                </button>
              )}
            </div>
          </section>
        </div>
      </main>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add a team member</DialogTitle>
            <DialogDescription>
              Save this person&apos;s contact details, role, and availability.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                name="name"
                label="Full name"
                placeholder="e.g. Ama Mensah"
                autoComplete="name"
                form={form}
                required
              />
              <Input
                name="email"
                label="Email address"
                type="email"
                placeholder="ama@example.com"
                autoComplete="email"
                form={form}
                required
              />
              <Input
                name="phone"
                label="Phone number"
                type="tel"
                placeholder="+233 24 000 0000"
                autoComplete="tel"
                form={form}
              />
              <Select
                name="role"
                label="Role"
                options={formRoleOptions}
                form={form}
              />
              <Select
                name="status"
                label="Status"
                options={formStatusOptions}
                form={form}
              />
              <Input
                name="next_shift_at"
                label="Next shift"
                type="datetime-local"
                form={form}
              />
              <Input
                name="shift_start"
                label="Shift starts"
                type="time"
                form={form}
              />
              <Input
                name="shift_end"
                label="Shift ends"
                type="time"
                form={form}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </Button>
              <SubmitButton
                form={form}
                label="Save team member"
                className="rounded-xl bg-[#0f8a62] text-white hover:bg-[#0b7653]"
              />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <Link
      href={team.show.url(member.id)}
      prefetch
      className="group relative overflow-hidden rounded-2xl border border-[#dceae4] bg-[#fbfdfc] p-5 transition hover:-translate-y-0.5 hover:border-[#b9d5ca] hover:shadow-[0_14px_30px_rgba(23,52,60,0.08)] dark:border-white/10 dark:bg-white/3 dark:hover:border-[#376452]"
    >
      <div className="absolute top-0 right-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-[#d9f7e8]/60 transition group-hover:scale-125 dark:bg-[#0f8a62]/10" />
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={
              'relative flex size-12 items-center justify-center rounded-2xl text-sm font-bold ' +
              member.tone
            }
          >
            {member.initials}
            <span
              className={
                'absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-[#fbfdfc] ' +
                (member.status === 'available'
                  ? 'bg-[#0f8a62]'
                  : member.status === 'away'
                    ? 'bg-[#f0a46e]'
                    : 'bg-[#9aaba5]') +
                ' dark:border-[#17221f]'
              }
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
        <MoreHorizontal aria-hidden="true" className="size-5 text-[#a0b5ae]" />
      </div>
      <div className="relative mt-5 flex items-center justify-between">
        <span
          className={
            'rounded-full px-2.5 py-1 text-[10px] font-bold ' +
            getStatusClass(member.status)
          }
        >
          {member.statusLabel}
        </span>
        <span className="flex items-center gap-1 text-xs font-bold text-[#a55c2d]">
          <Star aria-hidden="true" className="size-3.5 fill-current" />
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
            className={
              'h-full rounded-full ' +
              (member.workload > 80 ? 'bg-[#a55c2d]' : 'bg-[#0f8a62]')
            }
            style={{ width: String(member.workload) + '%' }}
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
  );
}

function TeamTable({ teamMembers }: { teamMembers: TeamMember[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="border-b border-[#e7f0ec] bg-[#fbfdfc] text-[10px] font-bold tracking-[0.12em] text-[#91aaa2] uppercase dark:border-white/8 dark:bg-white/3">
          <tr>
            <th className="px-6 py-4">Team member</th>
            <th className="px-4 py-4">Status</th>
            <th className="px-4 py-4">Shift</th>
            <th className="px-4 py-4">Bookings</th>
            <th className="px-4 py-4">Workload</th>
            <th className="px-6 py-4 text-right">Profile</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#e7f0ec] dark:divide-white/8">
          {teamMembers.map((member) => (
            <tr
              key={member.id}
              className="transition hover:bg-[#f8fcfa] dark:hover:bg-white/3"
            >
              <td className="px-6 py-4">
                <Link
                  href={team.show.url(member.id)}
                  className="flex items-center gap-3"
                >
                  <span
                    className={
                      'flex size-10 items-center justify-center rounded-xl text-xs font-bold ' +
                      member.tone
                    }
                  >
                    {member.initials}
                  </span>
                  <span>
                    <span className="block font-bold text-[#17343c] dark:text-white">
                      {member.name}
                    </span>
                    <span className="mt-1 block text-xs text-[#70908a] dark:text-[#9cb8b1]">
                      {member.role}
                    </span>
                  </span>
                </Link>
              </td>
              <td className="px-4 py-4">
                <span
                  className={
                    'rounded-full px-2.5 py-1 text-[10px] font-bold ' +
                    getStatusClass(member.status)
                  }
                >
                  {member.statusLabel}
                </span>
              </td>
              <td className="px-4 py-4 text-xs text-[#70908a] dark:text-[#9cb8b1]">
                {member.shift}
              </td>
              <td className="px-4 py-4 font-bold text-[#17343c] dark:text-white">
                {member.bookings}
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-20 overflow-hidden rounded-full bg-[#e8f1ed] dark:bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#0f8a62]"
                      style={{ width: String(member.workload) + '%' }}
                    />
                  </div>
                  <span className="text-xs text-[#70908a] dark:text-[#9cb8b1]">
                    {member.workload}%
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <Link
                  href={team.show.url(member.id)}
                  className="text-xs font-bold text-[#0f8a62] dark:text-[#8fe0bb]"
                >
                  View profile
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="px-6 py-16 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#edf7f2] text-[#0f8a62] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
        <Search aria-hidden="true" className="size-5" />
      </div>
      <h3 className="mt-4 text-base font-bold text-[#17343c] dark:text-white">
        No team members found
      </h3>
      <p className="mt-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
        Try another name, role, or status filter.
      </p>
    </div>
  );
}
