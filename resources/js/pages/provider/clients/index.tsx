import { Head, Link, router, useForm } from '@inertiajs/react';
import {
  ArrowUpRight,
  CalendarDays,
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
import { store } from '@/actions/App/Http/Controllers/ClientController';
import { Input } from '@/components/form/input';
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
import client from '@/routes/client';

type ClientSegment = 'regular' | 'new' | 'inactive';
type SegmentFilter = 'all' | ClientSegment;
type SortOrder = 'recent' | 'oldest';
type ViewMode = 'cards' | 'table';

type ClientRecord = {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  segment: ClientSegment;
  visits: number;
  lastVisit: string;
  nextBooking: string;
  spend: string;
  favoriteService: string;
  tone: string;
};

type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

type PaginatedClients = {
  data: ClientRecord[];
  current_page: number;
  last_page: number;
  from: number | null;
  to: number | null;
  total: number;
  links: PaginationLink[];
};

type ClientPageProps = {
  clients: PaginatedClients;
  stats: {
    total: number;
    regular: number;
    new: number;
    inactive: number;
  };
  filters: {
    search: string;
    segment: SegmentFilter;
    sort: SortOrder;
  };
};

type ClientFormData = {
  name: string;
  email: string;
  phone: string;
};

const segmentTabs: { label: string; value: SegmentFilter }[] = [
  { label: 'All clients', value: 'all' },
  { label: 'Regulars', value: 'regular' },
  { label: 'New clients', value: 'new' },
  { label: 'Inactive', value: 'inactive' },
];

function segmentLabel(segment: ClientSegment): string {
  if (segment === 'regular') {
    return 'Regular';
  }

  if (segment === 'inactive') {
    return 'Inactive';
  }

  return 'New client';
}

function segmentClassName(segment: ClientSegment): string {
  if (segment === 'regular') {
    return 'bg-[#e9f8f0] text-[#0f8a62] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]';
  }

  if (segment === 'inactive') {
    return 'bg-[#f2f0f1] text-[#7b8884] dark:bg-white/10 dark:text-[#afc0ba]';
  }

  return 'bg-[#fff4eb] text-[#a55c2d] dark:bg-[#a55c2d]/15 dark:text-[#f0b58b]';
}

export default function ClientIndex({
  clients,
  stats,
  filters,
}: ClientPageProps) {
  const [activeSegment, setActiveSegment] = useState<SegmentFilter>(
    filters.segment,
  );
  const [search, setSearch] = useState(filters.search);
  const [sort, setSort] = useState<SortOrder>(filters.sort);
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const form = useForm<ClientFormData>({ name: '', email: '', phone: '' })
    .withPrecognition(store())
    .setValidationTimeout(500);

  const visitClients = useCallback(() => {
    router.get(
      client.index.url(),
      {
        search: search || undefined,
        segment: activeSegment === 'all' ? undefined : activeSegment,
        sort: sort === 'recent' ? undefined : sort,
      },
      {
        preserveState: true,
        preserveScroll: true,
        replace: true,
      },
    );
  }, [activeSegment, search, sort]);

  useEffect(() => {
    if (
      search === filters.search &&
      activeSegment === filters.segment &&
      sort === filters.sort
    ) {
      return;
    }

    const timeout = window.setTimeout(visitClients, 300);

    return () => window.clearTimeout(timeout);
  }, [activeSegment, filters, search, sort, visitClients]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    form.post(store.url(), {
      preserveScroll: true,
      onSuccess: () => {
        form.reset();
        setIsFormOpen(false);
        toast.success('Client added successfully.');
      },
    });
  };

  const statCards = [
    {
      label: 'Total clients',
      value: stats.total,
      note: 'Across your client book',
      icon: Users,
      iconClass: 'bg-[#d9f7e8] text-[#0f6b4d]',
      accent: (
        <ArrowUpRight aria-hidden="true" className="size-4 text-[#0f8a62]" />
      ),
    },
    {
      label: 'Regulars',
      value: stats.regular,
      note: 'Your strongest relationships',
      icon: Star,
      iconClass: 'bg-[#e6e1ff] text-[#594e9e]',
      accent: (
        <span className="text-xs font-bold text-[#685bb4] dark:text-[#c0b8ec]">
          Loyal
        </span>
      ),
    },
    {
      label: 'New clients',
      value: stats.new,
      note: 'Welcome them thoughtfully',
      icon: Sparkles,
      iconClass: 'bg-[#ffead9] text-[#a55c2d]',
      accent: (
        <span className="rounded-full bg-[#fff4eb] px-2 py-1 text-[10px] font-bold text-[#a55c2d] dark:bg-[#a55c2d]/15 dark:text-[#f0b58b]">
          Growing
        </span>
      ),
    },
    {
      label: 'Need attention',
      value: stats.inactive,
      note: 'No visit in 90+ days',
      icon: Clock3,
      iconClass: 'bg-[#dcecf5] text-[#2d6980]',
      accent: (
        <span className="text-xs font-bold text-[#2d6980] dark:text-[#8ac5d7]">
          Reconnect
        </span>
      ),
    },
  ];

  return (
    <>
      <Head title="Clients" />

      <main className="min-h-[calc(100vh-3rem)] bg-[#f6faf8] px-4 py-6 text-[#17343c] sm:px-6 lg:px-8 lg:py-8 dark:bg-[#101917] dark:text-[#e6f1ed]">
        <div className="mx-auto max-w-7xl space-y-6 lg:space-y-8">
          <section className="flex flex-col gap-6 rounded-3xl bg-[#17343c] px-6 py-7 text-white shadow-[0_20px_55px_rgba(23,52,60,0.12)] sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:py-8">
            <div>
              <div className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-[#8fe0bb] uppercase">
                <Users aria-hidden="true" className="size-4" />
                Client relationships
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Your clients
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#b8c9c7] sm:text-base">
                The people who keep your craft moving. Stay close to every
                relationship and every return visit.
              </p>
            </div>
            <Button
              type="button"
              onClick={() => setIsFormOpen(true)}
              className="w-fit rounded-xl bg-[#0f8a62] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#0f8a62]/20 hover:bg-[#0d7955]"
            >
              <Plus aria-hidden="true" className="size-4" />
              Add client
            </Button>
          </section>

          <section
            aria-label="Client summary"
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
                      className={`flex size-10 items-center justify-center rounded-xl ${iconClass}`}
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
                  placeholder="Search by name, email, phone or service"
                  aria-label="Search clients"
                  className="h-11 w-full rounded-xl border border-[#dceae4] bg-[#f8fcfa] pr-4 pl-11 text-sm transition outline-none placeholder:text-[#91aaa2] focus:border-[#76c9a5] focus:ring-4 focus:ring-[#e3f6ee] dark:border-white/10 dark:bg-white/5 dark:placeholder:text-[#719089] dark:focus:border-[#4fae88] dark:focus:ring-[#0f8a62]/15"
                />
              </div>
              <div className="flex [scrollbar-width:none] items-center gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
                {segmentTabs.map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setActiveSegment(tab.value)}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${activeSegment === tab.value ? 'bg-[#17343c] text-white dark:bg-[#0f8a62]' : 'border border-[#dceae4] text-[#70908a] hover:bg-[#f4fbf7] dark:border-white/10 dark:text-[#9cb8b1] dark:hover:bg-white/8'}`}
                  >
                    {tab.label}
                    {tab.value !== 'all' && (
                      <span className="ml-1.5 text-[10px] opacity-70">
                        {stats[tab.value]}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 border-b border-[#e7f0ec] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-white/8">
              <p className="text-sm text-[#70908a] dark:text-[#9cb8b1]">
                <span className="font-bold text-[#17343c] dark:text-white">
                  {clients.total}
                </span>{' '}
                clients found
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
                    className="inline-flex items-center gap-2 rounded-lg border border-[#dceae4] px-3 py-2 text-xs font-bold text-[#70908a] transition hover:bg-[#f4fbf7] dark:border-white/10 dark:text-[#9cb8b1] dark:hover:bg-white/8"
                  >
                    <Filter aria-hidden="true" className="size-3.5" />
                    Filters
                  </button>
                  {isFilterOpen && (
                    <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl border border-[#dceae4] bg-white p-2 shadow-xl dark:border-white/10 dark:bg-[#17221f]">
                      {segmentTabs.map((tab) => (
                        <button
                          key={tab.value}
                          type="button"
                          onClick={() => {
                            setActiveSegment(tab.value);
                            setIsFilterOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold ${activeSegment === tab.value ? 'bg-[#e9f8f0] text-[#0f8a62] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]' : 'text-[#70908a] hover:bg-[#f4fbf7] dark:text-[#9cb8b1] dark:hover:bg-white/8'}`}
                        >
                          {tab.label}
                          {tab.value !== 'all' && (
                            <span>{stats[tab.value]}</span>
                          )}
                        </button>
                      ))}
                      {activeSegment !== 'all' && (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveSegment('all');
                            setIsFilterOpen(false);
                          }}
                          className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-[#a55c2d] hover:bg-[#fff4eb]"
                        >
                          <X aria-hidden="true" className="size-3.5" /> Clear
                          filter
                        </button>
                      )}
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
                    {sort === 'recent' ? 'Recently active' : 'Oldest activity'}
                    <ChevronDown aria-hidden="true" className="size-3.5" />
                  </button>
                  {isSortOpen && (
                    <div className="absolute right-0 z-20 mt-2 w-44 rounded-xl border border-[#dceae4] bg-white p-2 shadow-xl dark:border-white/10 dark:bg-[#17221f]">
                      {(['recent', 'oldest'] as SortOrder[]).map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setSort(option);
                            setIsSortOpen(false);
                          }}
                          className={`flex w-full rounded-lg px-3 py-2 text-left text-xs font-semibold ${sort === option ? 'bg-[#e9f8f0] text-[#0f8a62] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]' : 'text-[#70908a] hover:bg-[#f4fbf7] dark:text-[#9cb8b1] dark:hover:bg-white/8'}`}
                        >
                          {option === 'recent'
                            ? 'Recently active'
                            : 'Oldest activity'}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div
                  className="flex items-center rounded-lg border border-[#dceae4] p-0.5 dark:border-white/10"
                  role="group"
                  aria-label="Client view"
                >
                  <button
                    type="button"
                    aria-label="Show cards"
                    aria-pressed={viewMode === 'cards'}
                    onClick={() => setViewMode('cards')}
                    className={`rounded-md p-1.5 ${viewMode === 'cards' ? 'bg-[#17343c] text-white dark:bg-[#0f8a62]' : 'text-[#91aaa2]'}`}
                  >
                    <LayoutGrid aria-hidden="true" className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Show table"
                    aria-pressed={viewMode === 'table'}
                    onClick={() => setViewMode('table')}
                    className={`rounded-md p-1.5 ${viewMode === 'table' ? 'bg-[#17343c] text-white dark:bg-[#0f8a62]' : 'text-[#91aaa2]'}`}
                  >
                    <Table2 aria-hidden="true" className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            {viewMode === 'cards' ? (
              <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-6">
                {clients.data.length > 0 ? (
                  clients.data.map((item) => (
                    <Link
                      key={item.id}
                      href={client.show.url(item.id)}
                      prefetch
                      className="group relative overflow-hidden rounded-2xl border border-[#dceae4] bg-[#fbfdfc] p-5 transition hover:-translate-y-0.5 hover:border-[#b9d5ca] hover:shadow-[0_14px_30px_rgba(23,52,60,0.08)] dark:border-white/10 dark:bg-white/3 dark:hover:border-[#376452]"
                    >
                      <div className="absolute top-0 right-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-[#d9f7e8]/60 transition group-hover:scale-125 dark:bg-[#0f8a62]/10" />
                      <div className="relative flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex size-12 items-center justify-center rounded-2xl text-sm font-bold ${item.tone}`}
                          >
                            {item.initials}
                          </span>
                          <div className="min-w-0">
                            <h2 className="truncate text-sm font-bold text-[#17343c] dark:text-white">
                              {item.name}
                            </h2>
                            <span
                              className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${segmentClassName(item.segment)}`}
                            >
                              {segmentLabel(item.segment)}
                            </span>
                          </div>
                        </div>
                        <MoreHorizontal
                          aria-hidden="true"
                          className="size-5 text-[#a0b5ae]"
                        />
                      </div>
                      <div className="relative mt-5 grid grid-cols-2 gap-3 border-y border-[#e7f0ec] py-4 text-xs dark:border-white/8">
                        <div>
                          <p className="text-[#91aaa2]">Visits</p>
                          <p className="mt-1 font-bold text-[#17343c] dark:text-white">
                            {item.visits}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#91aaa2]">Total spend</p>
                          <p className="mt-1 font-bold text-[#17343c] dark:text-white">
                            {item.spend}
                          </p>
                        </div>
                      </div>
                      <div className="relative mt-4 space-y-2.5">
                        <div className="flex items-center gap-2 text-xs text-[#70908a] dark:text-[#9cb8b1]">
                          <CalendarDays
                            aria-hidden="true"
                            className="size-3.5 text-[#0f8a62]"
                          />
                          Next:{' '}
                          <span className="font-semibold text-[#41645a] dark:text-[#c4d8d1]">
                            {item.nextBooking}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#70908a] dark:text-[#9cb8b1]">
                          <Star
                            aria-hidden="true"
                            className="size-3.5 text-[#a55c2d]"
                          />
                          Favorite:{' '}
                          <span className="truncate font-semibold text-[#41645a] dark:text-[#c4d8d1]">
                            {item.favoriteService}
                          </span>
                        </div>
                      </div>
                      <div className="relative mt-5 flex items-center justify-between border-t border-[#e7f0ec] pt-4 dark:border-white/8">
                        <span className="text-[11px] text-[#91aaa2]">
                          Last visit {item.lastVisit}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0f8a62] transition group-hover:gap-1.5 dark:text-[#8fe0bb]">
                          View profile
                          <ChevronRight
                            aria-hidden="true"
                            className="size-3.5"
                          />
                        </span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <EmptyState />
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="border-b border-[#e7f0ec] bg-[#fbfdfc] text-xs text-[#91aaa2] dark:border-white/8 dark:bg-white/3">
                    <tr>
                      <th className="px-6 py-4 font-bold">Client</th>
                      <th className="px-4 py-4 font-bold">Segment</th>
                      <th className="px-4 py-4 font-bold">Visits</th>
                      <th className="px-4 py-4 font-bold">Total spend</th>
                      <th className="px-4 py-4 font-bold">Last visit</th>
                      <th className="px-6 py-4 text-right font-bold">
                        Next booking
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e7f0ec] dark:divide-white/8">
                    {clients.data.length > 0 ? (
                      clients.data.map((item) => (
                        <tr
                          key={item.id}
                          className="transition hover:bg-[#f8fcfa] dark:hover:bg-white/4"
                        >
                          <td className="px-6 py-4">
                            <Link
                              href={client.show.url(item.id)}
                              className="flex items-center gap-3"
                            >
                              <span
                                className={`flex size-10 items-center justify-center rounded-xl text-xs font-bold ${item.tone}`}
                              >
                                {item.initials}
                              </span>
                              <span>
                                <span className="block font-bold text-[#17343c] dark:text-white">
                                  {item.name}
                                </span>
                                <span className="mt-0.5 block text-xs text-[#91aaa2]">
                                  {item.email}
                                </span>
                              </span>
                            </Link>
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`rounded-full px-2 py-1 text-[10px] font-bold ${segmentClassName(item.segment)}`}
                            >
                              {segmentLabel(item.segment)}
                            </span>
                          </td>
                          <td className="px-4 py-4 font-bold text-[#17343c] dark:text-white">
                            {item.visits}
                          </td>
                          <td className="px-4 py-4 font-bold text-[#17343c] dark:text-white">
                            {item.spend}
                          </td>
                          <td className="px-4 py-4 text-xs text-[#70908a] dark:text-[#9cb8b1]">
                            {item.lastVisit}
                          </td>
                          <td className="px-6 py-4 text-right text-xs font-semibold text-[#41645a] dark:text-[#c4d8d1]">
                            {item.nextBooking}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6}>
                          <EmptyState />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex flex-col gap-3 border-t border-[#e7f0ec] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-white/8">
              <p className="text-xs text-[#91aaa2]">
                Showing {clients.from ?? 0}–{clients.to ?? 0} of {clients.total}{' '}
                clients
              </p>
              <div className="flex items-center gap-1">
                {clients.links.map((link, index) =>
                  link.url ? (
                    <Link
                      key={`${link.label}-${index}`}
                      href={link.url}
                      preserveState
                      preserveScroll
                      className={`rounded-lg px-2.5 py-1.5 text-xs font-bold ${link.active ? 'bg-[#17343c] text-white dark:bg-[#0f8a62]' : 'text-[#70908a] hover:bg-[#f4fbf7] dark:text-[#9cb8b1] dark:hover:bg-white/8'}`}
                    >
                      {paginationLabel(link.label)}
                    </Link>
                  ) : (
                    <span
                      key={`${link.label}-${index}`}
                      className="px-2.5 py-1.5 text-xs text-[#c2d0cb]"
                    >
                      {paginationLabel(link.label)}
                    </span>
                  ),
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add a client</DialogTitle>
            <DialogDescription>
              Save the client’s contact details to your private client book.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-5">
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
                label="Save client"
                className="rounded-xl bg-[#0f8a62] text-white hover:bg-[#0b7653]"
              />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full px-6 py-16 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#edf7f2] text-[#0f8a62] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
        <Search aria-hidden="true" className="size-5" />
      </div>
      <h3 className="mt-4 text-base font-bold text-[#17343c] dark:text-white">
        No clients found
      </h3>
      <p className="mt-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
        Try another name or client segment.
      </p>
    </div>
  );
}

function paginationLabel(label: string): string {
  return label.replace('&laquo;', '«').replace('&raquo;', '»');
}
