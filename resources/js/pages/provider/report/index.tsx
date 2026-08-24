import { Head } from '@inertiajs/react';
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  ChevronDown,
  Download,
  MoreHorizontal,
  PieChart,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  WalletCards,
} from 'lucide-react';
import { useMemo, useState } from 'react';

type Period = '7d' | '30d' | '90d' | 'year';

type ReportData = {
  revenue: string;
  revenueChange: string;
  bookings: string;
  bookingsChange: string;
  averageBooking: string;
  averageChange: string;
  retention: string;
  retentionChange: string;
  chart: { label: string; revenue: number; bookings: number }[];
};

type ReportPageProps = {
  analytics?: Partial<Record<Period, ReportData>>;
};

const sampleReports: Record<Period, ReportData> = {
  '7d': {
    revenue: '$3,160',
    revenueChange: '+14.8%',
    bookings: '48',
    bookingsChange: '+12.5%',
    averageBooking: '$65.83',
    averageChange: '+4.2%',
    retention: '86%',
    retentionChange: '+3.1%',
    chart: [
      { label: 'Mon', revenue: 420, bookings: 7 },
      { label: 'Tue', revenue: 610, bookings: 9 },
      { label: 'Wed', revenue: 480, bookings: 8 },
      { label: 'Thu', revenue: 720, bookings: 11 },
      { label: 'Fri', revenue: 540, bookings: 8 },
      { label: 'Sat', revenue: 390, bookings: 5 },
      { label: 'Sun', revenue: 0, bookings: 0 },
    ],
  },
  '30d': {
    revenue: '$12,480',
    revenueChange: '+18.6%',
    bookings: '186',
    bookingsChange: '+15.4%',
    averageBooking: '$67.10',
    averageChange: '+5.8%',
    retention: '82%',
    retentionChange: '+4.4%',
    chart: [
      { label: 'Wk 1', revenue: 2400, bookings: 34 },
      { label: 'Wk 2', revenue: 3180, bookings: 47 },
      { label: 'Wk 3', revenue: 2920, bookings: 43 },
      { label: 'Wk 4', revenue: 3980, bookings: 62 },
    ],
  },
  '90d': {
    revenue: '$34,920',
    revenueChange: '+22.1%',
    bookings: '542',
    bookingsChange: '+19.8%',
    averageBooking: '$64.43',
    averageChange: '+2.9%',
    retention: '79%',
    retentionChange: '+6.2%',
    chart: [
      { label: 'Jun', revenue: 9200, bookings: 141 },
      { label: 'Jul', revenue: 10800, bookings: 166 },
      { label: 'Aug', revenue: 14920, bookings: 235 },
    ],
  },
  year: {
    revenue: '$104,280',
    revenueChange: '+28.4%',
    bookings: '1,624',
    bookingsChange: '+25.6%',
    averageBooking: '$64.21',
    averageChange: '+3.8%',
    retention: '76%',
    retentionChange: '+8.1%',
    chart: [
      { label: 'Mar', revenue: 6800, bookings: 105 },
      { label: 'Apr', revenue: 7600, bookings: 118 },
      { label: 'May', revenue: 8200, bookings: 126 },
      { label: 'Jun', revenue: 9200, bookings: 141 },
      { label: 'Jul', revenue: 10800, bookings: 166 },
      { label: 'Aug', revenue: 14920, bookings: 235 },
    ],
  },
};

const services = [
  {
    name: 'Signature Fade & Lineup',
    bookings: 68,
    revenue: '$4,420',
    share: 35,
    tone: '#0f8a62',
  },
  {
    name: 'Traditional Hot Towel Shave',
    bookings: 42,
    revenue: '$3,570',
    share: 28,
    tone: '#806edc',
  },
  {
    name: 'Beard Sculpting & Oil Treatment',
    bookings: 36,
    revenue: '$2,520',
    share: 20,
    tone: '#f0a46e',
  },
  {
    name: 'Style Consultation & Trim',
    bookings: 24,
    revenue: '$1,320',
    share: 11,
    tone: '#4b9ab3',
  },
  {
    name: 'Other services',
    bookings: 16,
    revenue: '$650',
    share: 6,
    tone: '#b7c9c2',
  },
];

const teamPerformance = [
  {
    name: 'Julian Sterling',
    initials: 'JS',
    role: 'Lead Barber',
    bookings: 48,
    revenue: '$3,160',
    rating: '4.9',
    tone: 'bg-[#d9f7e8] text-[#0f6b4d]',
  },
  {
    name: 'Maya Okafor',
    initials: 'MO',
    role: 'Senior Stylist',
    bookings: 42,
    revenue: '$2,940',
    rating: '5.0',
    tone: 'bg-[#e6e1ff] text-[#594e9e]',
  },
  {
    name: 'Nia Mensah',
    initials: 'NM',
    role: 'Nail Technician',
    bookings: 38,
    revenue: '$2,610',
    rating: '4.9',
    tone: 'bg-[#ffead9] text-[#a55c2d]',
  },
  {
    name: 'Theo Anderson',
    initials: 'TA',
    role: 'Barber',
    bookings: 31,
    revenue: '$2,120',
    rating: '4.8',
    tone: 'bg-[#dcecf5] text-[#2d6980]',
  },
];

const topClients = [
  {
    name: 'Julian Sterling',
    initials: 'JS',
    visits: 24,
    spend: '$1,420',
    tone: 'bg-[#d9f7e8] text-[#0f6b4d]',
  },
  {
    name: 'Marcus Thorne',
    initials: 'MT',
    visits: 18,
    spend: '$1,180',
    tone: 'bg-[#e6e1ff] text-[#594e9e]',
  },
  {
    name: 'Theo Anderson',
    initials: 'TA',
    visits: 16,
    spend: '$1,080',
    tone: 'bg-[#dcecf5] text-[#2d6980]',
  },
];

const periodOptions: { label: string; value: Period }[] = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
  { label: 'This year', value: 'year' },
];

function MetricCard({
  icon: Icon,
  label,
  value,
  change,
  tone,
  positive = true,
}: {
  icon: typeof WalletCards;
  label: string;
  value: string;
  change: string;
  tone: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
      <div className="flex items-start justify-between">
        <span
          className={`flex size-10 items-center justify-center rounded-xl ${tone}`}
        >
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold ${positive ? 'bg-[#e9f8f0] text-[#0f8a62] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]' : 'bg-[#fff4eb] text-[#a55c2d] dark:bg-[#a55c2d]/15 dark:text-[#f0b58b]'}`}
        >
          {positive ? (
            <ArrowUpRight aria-hidden="true" className="size-3" />
          ) : (
            <ArrowDownRight aria-hidden="true" className="size-3" />
          )}
          {change}
        </span>
      </div>
      <p className="mt-5 text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
        {label}
      </p>
      <p className="mt-1 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
        {value}
      </p>
      <p className="mt-1 text-xs text-[#91aaa2]">vs. previous period</p>
    </div>
  );
}

export default function Report({ analytics }: ReportPageProps) {
  const [period, setPeriod] = useState<Period>('30d');
  const report = useMemo(
    () => ({ ...sampleReports[period], ...(analytics?.[period] ?? {}) }),
    [analytics, period],
  );
  const maxRevenue = Math.max(...report.chart.map((point) => point.revenue), 1);

  return (
    <>
      <Head title="Reports & analytics" />

      <main className="min-h-[calc(100vh-3rem)] bg-[#f6faf8] px-4 py-6 text-[#17343c] sm:px-6 lg:px-8 lg:py-8 dark:bg-[#101917] dark:text-[#e6f1ed]">
        <div className="mx-auto max-w-7xl space-y-6 lg:space-y-8">
          <section className="flex flex-col gap-6 rounded-3xl bg-[#17343c] px-6 py-7 text-white shadow-[0_20px_55px_rgba(23,52,60,0.12)] sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:py-8">
            <div>
              <div className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-[#8fe0bb] uppercase">
                <BarChart3 aria-hidden="true" className="size-4" />
                Provider intelligence
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Your business at a glance
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#b8c9c7] sm:text-base">
                Understand what is working, where your time goes, and what to
                focus on next.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <label className="relative">
                <span className="sr-only">Report period</span>
                <select
                  value={period}
                  onChange={(event) => setPeriod(event.target.value as Period)}
                  className="h-11 appearance-none rounded-xl border border-white/15 bg-white/8 py-0 pr-10 pl-4 text-sm font-bold text-white transition outline-none hover:bg-white/15 focus:ring-2 focus:ring-[#8fe0bb]"
                >
                  {periodOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="text-[#17343c]"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#b8c9c7]"
                />
              </label>
              <button
                type="button"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#0f8a62] px-4 text-sm font-bold text-white shadow-lg shadow-[#0f8a62]/20 transition hover:bg-[#0d7955]"
              >
                <Download aria-hidden="true" className="size-4" />
                Export report
              </button>
            </div>
          </section>

          <section
            aria-label="Performance summary"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            <MetricCard
              icon={WalletCards}
              label="Revenue"
              value={report.revenue}
              change={report.revenueChange}
              tone="bg-[#d9f7e8] text-[#0f6b4d]"
            />
            <MetricCard
              icon={CalendarDays}
              label="Bookings"
              value={report.bookings}
              change={report.bookingsChange}
              tone="bg-[#e6e1ff] text-[#594e9e]"
            />
            <MetricCard
              icon={TrendingUp}
              label="Average booking value"
              value={report.averageBooking}
              change={report.averageChange}
              tone="bg-[#ffead9] text-[#a55c2d]"
            />
            <MetricCard
              icon={Users}
              label="Client retention"
              value={report.retention}
              change={report.retentionChange}
              tone="bg-[#dcecf5] text-[#2d6980]"
            />
          </section>

          <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)]">
            <section className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] sm:p-6 dark:border-white/10 dark:bg-[#17221f]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                    Performance trend
                  </p>
                  <h2 className="mt-1 text-lg font-bold tracking-tight text-[#17343c] dark:text-white">
                    Revenue &amp; bookings
                  </h2>
                </div>
                <button
                  type="button"
                  aria-label="Chart options"
                  className="rounded-lg p-2 text-[#91aaa2] transition hover:bg-[#edf7f2] dark:hover:bg-white/8"
                >
                  <MoreHorizontal aria-hidden="true" className="size-5" />
                </button>
              </div>
              <div className="mt-5 flex items-center gap-4 text-xs font-semibold text-[#70908a] dark:text-[#9cb8b1]">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#0f8a62]" />
                  Revenue
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#806edc]" />
                  Bookings
                </span>
              </div>
              <div className="mt-6 flex h-64 gap-3">
                <div className="flex flex-col justify-between pb-6 text-[10px] text-[#91aaa2]">
                  <span>$4k</span>
                  <span>$3k</span>
                  <span>$2k</span>
                  <span>$1k</span>
                  <span>$0</span>
                </div>
                <div className="relative flex flex-1 flex-col">
                  <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-6">
                    <span className="border-t border-dashed border-[#e7f0ec] dark:border-white/8" />
                    <span className="border-t border-dashed border-[#e7f0ec] dark:border-white/8" />
                    <span className="border-t border-dashed border-[#e7f0ec] dark:border-white/8" />
                    <span className="border-t border-dashed border-[#e7f0ec] dark:border-white/8" />
                    <span className="border-t border-dashed border-[#e7f0ec] dark:border-white/8" />
                  </div>
                  <div className="relative z-10 flex h-full items-end justify-around gap-2 pb-6">
                    {report.chart.map((point) => (
                      <div
                        key={point.label}
                        className="group flex h-full flex-1 items-end justify-center gap-1.5"
                      >
                        <div className="relative flex h-full w-3 items-end">
                          <div
                            className="w-full rounded-t-md bg-[#cce9db] transition group-hover:bg-[#8bcfb0] dark:bg-[#245a47]"
                            style={{
                              height: `${Math.max((point.revenue / maxRevenue) * 88, point.revenue ? 8 : 2)}%`,
                            }}
                          >
                            <span className="pointer-events-none absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded-md bg-[#17343c] px-1.5 py-1 text-[10px] font-bold whitespace-nowrap text-white group-hover:block dark:bg-white dark:text-[#17343c]">
                              ${point.revenue.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="relative flex h-full w-3 items-end">
                          <div
                            className="w-full rounded-t-md bg-[#dcd6ff] transition group-hover:bg-[#a89df0] dark:bg-[#4a407d]"
                            style={{
                              height: `${Math.max((point.bookings / Math.max(...report.chart.map((item) => item.bookings), 1)) * 58, point.bookings ? 8 : 2)}%`,
                            }}
                          />
                        </div>
                        <span className="absolute bottom-0 text-[10px] font-semibold text-[#91aaa2]">
                          {point.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-xl bg-[#f4fbf7] px-4 py-3 text-xs text-[#41645a] dark:bg-[#0f8a62]/10 dark:text-[#b8d9c9]">
                <span className="font-bold">Strongest day:</span> Thursday
                generated the most revenue with 11 completed bookings.
              </div>
            </section>

            <section className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] sm:p-6 dark:border-white/10 dark:bg-[#17221f]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                    Service mix
                  </p>
                  <h2 className="mt-1 text-lg font-bold tracking-tight text-[#17343c] dark:text-white">
                    What clients book
                  </h2>
                </div>
                <PieChart
                  aria-hidden="true"
                  className="size-6 text-[#0f8a62] dark:text-[#8fe0bb]"
                />
              </div>
              <div className="mt-6 flex items-center gap-5">
                <div
                  className="relative flex size-32 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: `conic-gradient(${services.map((service, index) => `${service.tone} ${services.slice(0, index).reduce((sum, item) => sum + item.share, 0)}% ${services.slice(0, index + 1).reduce((sum, item) => sum + item.share, 0)}%`).join(', ')})`,
                  }}
                >
                  <div className="flex size-20 items-center justify-center rounded-full bg-white text-center dark:bg-[#17221f]">
                    <span>
                      <strong className="block text-xl text-[#17343c] dark:text-white">
                        186
                      </strong>
                      <small className="text-[10px] text-[#91aaa2]">
                        bookings
                      </small>
                    </span>
                  </div>
                </div>
                <div className="min-w-0 space-y-2.5">
                  {services.slice(0, 4).map((service) => (
                    <div
                      key={service.name}
                      className="flex items-center gap-2 text-xs"
                    >
                      <span
                        className="size-2 shrink-0 rounded-full"
                        style={{ backgroundColor: service.tone }}
                      />
                      <span className="truncate text-[#70908a] dark:text-[#9cb8b1]">
                        {service.name}
                      </span>
                      <span className="ml-auto font-bold text-[#17343c] dark:text-white">
                        {service.share}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 space-y-3 border-t border-[#e7f0ec] pt-5 dark:border-white/8">
                {services.slice(0, 3).map((service) => (
                  <div
                    key={service.name}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-[#70908a] dark:text-[#9cb8b1]">
                      {service.name}
                    </span>
                    <span className="font-bold text-[#17343c] dark:text-white">
                      {service.revenue}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.95fr)]">
            <section className="overflow-hidden rounded-2xl border border-[#dceae4] bg-white shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <div className="flex items-center justify-between border-b border-[#e7f0ec] px-5 py-5 sm:px-6 dark:border-white/8">
                <div>
                  <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                    Team performance
                  </p>
                  <h2 className="mt-1 text-lg font-bold tracking-tight text-[#17343c] dark:text-white">
                    Who is driving the week
                  </h2>
                </div>
                <button
                  type="button"
                  className="text-xs font-bold text-[#0f8a62] dark:text-[#8fe0bb]"
                >
                  View team
                </button>
              </div>
              <div className="divide-y divide-[#e7f0ec] dark:divide-white/8">
                {teamPerformance.map((member) => (
                  <div
                    key={member.name}
                    className="flex items-center gap-3 px-5 py-4 sm:px-6"
                  >
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${member.tone}`}
                    >
                      {member.initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-[#17343c] dark:text-white">
                        {member.name}
                      </p>
                      <p className="mt-0.5 text-xs text-[#91aaa2]">
                        {member.role}
                      </p>
                    </div>
                    <div className="hidden text-right sm:block">
                      <p className="text-xs text-[#91aaa2]">Bookings</p>
                      <p className="mt-0.5 text-sm font-bold text-[#17343c] dark:text-white">
                        {member.bookings}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#91aaa2]">Revenue</p>
                      <p className="mt-0.5 text-sm font-bold text-[#17343c] dark:text-white">
                        {member.revenue}
                      </p>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-bold text-[#a55c2d]">
                      <Star
                        aria-hidden="true"
                        className="size-3.5 fill-current"
                      />
                      {member.rating}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] sm:p-6 dark:border-white/10 dark:bg-[#17221f]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase dark:text-[#9cb8b1]">
                    Client loyalty
                  </p>
                  <h2 className="mt-1 text-lg font-bold tracking-tight text-[#17343c] dark:text-white">
                    Your top clients
                  </h2>
                </div>
                <Users
                  aria-hidden="true"
                  className="size-6 text-[#2d6980] dark:text-[#8ac5d7]"
                />
              </div>
              <div className="mt-5 space-y-4">
                {topClients.map((client) => (
                  <div key={client.name} className="flex items-center gap-3">
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${client.tone}`}
                    >
                      {client.initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-[#17343c] dark:text-white">
                        {client.name}
                      </p>
                      <p className="mt-0.5 text-xs text-[#91aaa2]">
                        {client.visits} visits
                      </p>
                    </div>
                    <p className="text-sm font-bold text-[#17343c] dark:text-white">
                      {client.spend}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl bg-[#f4fbf7] p-4 dark:bg-[#0f8a62]/10">
                <div className="flex items-start gap-3">
                  <Sparkles
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-[#0f8a62] dark:text-[#8fe0bb]"
                  />
                  <p className="text-xs leading-5 text-[#41645a] dark:text-[#b8d9c9]">
                    Your returning clients generated <strong>$6,840</strong>{' '}
                    this period — 55% of total revenue.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <section className="flex flex-col gap-4 rounded-2xl border border-[#b9d5ca] bg-[#edf8f2] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 dark:border-[#376452] dark:bg-[#0f8a62]/10">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#0f8a62] text-white">
                <Sparkles aria-hidden="true" className="size-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#17343c] dark:text-white">
                  One useful insight
                </p>
                <p className="mt-1 text-sm text-[#41645a] dark:text-[#b8d9c9]">
                  Thursday is your strongest day. Consider opening one extra
                  slot next Thursday to capture more high-intent bookings.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-[#0f8a62] dark:text-[#8fe0bb]"
            >
              Plan availability
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </button>
          </section>
        </div>
      </main>
    </>
  );
}
