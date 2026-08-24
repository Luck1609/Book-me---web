import { Head } from '@inertiajs/react';
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCircle2,
  CreditCard,
  Crown,
  Gauge,
  Sparkles,
  UsersRound,
  Zap,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNotice } from '@/contexts/notice-context';
import { edit } from '@/routes/subscription';

type PlanId = 'starter' | 'growth' | 'scale';

type Plan = {
  id: PlanId;
  name: string;
  price: number;
  description: string;
  bookingLimit: string;
  teamSeats: string;
  rank: number;
  recommended?: boolean;
  features: string[];
};

type PageProps = {
  currentPlanId?: PlanId;
  renewalDate?: string;
  billingCycle?: 'monthly' | 'yearly';
};

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    description: 'The essentials for getting your booking page live.',
    bookingLimit: '25 bookings / month',
    teamSeats: '1 team seat',
    rank: 1,
    features: [
      'Public booking page',
      'Up to 3 services',
      'Email booking notifications',
      'Basic booking history',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 149,
    description: 'More room to grow, with the tools regular clients expect.',
    bookingLimit: '250 bookings / month',
    teamSeats: '3 team seats',
    rank: 2,
    recommended: true,
    features: [
      'Unlimited services',
      'Client reminders',
      'Performance insights',
      'Team scheduling',
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    price: 299,
    description: 'A complete workspace for busy businesses and growing teams.',
    bookingLimit: 'Unlimited bookings',
    teamSeats: 'Unlimited team seats',
    rank: 3,
    features: [
      'Everything in Growth',
      'Priority support',
      'Advanced reports',
      'Custom booking policies',
    ],
  },
];

function formatPrice(price: number): string {
  return price === 0 ? 'Free' : `GHS ${price.toLocaleString('en-GH')}`;
}

export default function Subscription({
  currentPlanId: initialCurrentPlanId = 'growth',
  renewalDate = 'September 24, 2026',
  billingCycle = 'monthly',
}: PageProps) {
  const { hide, show } = useNotice();
  const [currentPlanId, setCurrentPlanId] =
    useState<PlanId>(initialCurrentPlanId);
  const currentPlan =
    plans.find((plan) => plan.id === currentPlanId) ?? plans[1];
  const billingLabel =
    billingCycle === 'yearly' ? 'Annual billing' : 'Monthly billing';

  const usage = useMemo(
    () => ({
      bookings: currentPlan.id === 'starter' ? '18 of 25' : '86 of 250',
      percentage: currentPlan.id === 'starter' ? 72 : 34,
    }),
    [currentPlan.id],
  );

  const requestPlanChange = (plan: Plan) => {
    if (plan.id === currentPlan.id) {
      return;
    }

    const isUpgrade = plan.rank > currentPlan.rank;
    const action = isUpgrade ? 'Upgrade' : 'Downgrade';

    show({
      type: 'notice',
      title: `${action} to ${plan.name}?`,
      description: isUpgrade
        ? `Unlock ${plan.bookingLimit.toLowerCase()} and more tools for your business with the ${plan.name} plan.`
        : `Your ${currentPlan.name} plan will remain available until the end of the current billing cycle.`,
      confirmText: `${action} plan`,
      cancelText: 'Keep current plan',
      onConfirm: () => {
        setCurrentPlanId(plan.id);
        hide();
      },
    });
  };

  return (
    <>
      <Head title="Subscription plan settings" />

      <div className="space-y-8">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-[#0f8a62] uppercase dark:text-[#8fe0bb]">
              Plans & billing
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#17343c] dark:text-white">
              Choose room to grow
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
              Pick the plan that fits your business today, then move up as your
              bookings and team grow.
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e9f8f0] px-3 py-1.5 text-xs font-semibold text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
            <CheckCircle2 aria-hidden="true" className="size-3.5" />
            Secure billing
          </div>
        </header>

        <section className="overflow-hidden rounded-3xl bg-[#17343c] text-white shadow-[0_18px_45px_rgba(23,52,60,0.14)]">
          <div className="relative overflow-hidden p-6 sm:p-8">
            <div className="absolute -top-20 -right-16 size-56 rounded-full bg-[#0f8a62]/30 blur-3xl" />
            <div className="absolute -bottom-28 left-1/3 size-64 rounded-full bg-[#78d6ae]/10 blur-3xl" />

            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-[#0f8a62] text-[#d9f7e8] shadow-lg shadow-black/10">
                    <Crown aria-hidden="true" className="size-6" />
                  </span>
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-[#8fe0bb] uppercase">
                      Your current plan
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <h2 className="text-2xl font-bold">{currentPlan.name}</h2>
                      <Badge className="border-0 bg-[#d9f7e8] text-[#0f6b4d] hover:bg-[#d9f7e8]">
                        <CheckCircle2 aria-hidden="true" /> Active
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="mt-5 max-w-lg text-sm leading-6 text-[#b8c9c7]">
                  {currentPlan.description} Your plan includes{' '}
                  {currentPlan.bookingLimit.toLowerCase()} and{' '}
                  {currentPlan.teamSeats.toLowerCase()}.
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-1 lg:items-end">
                <p className="text-3xl font-bold">
                  {formatPrice(currentPlan.price)}
                  {currentPlan.price > 0 && (
                    <span className="ml-1 text-sm font-medium text-[#b8c9c7]">
                      / month
                    </span>
                  )}
                </p>
                <p className="text-xs text-[#b8c9c7]">{billingLabel}</p>
              </div>
            </div>

            <div className="relative mt-8 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
              <PlanStat
                icon={<CalendarDays aria-hidden="true" />}
                label="Next renewal"
                value={renewalDate}
              />
              <PlanStat
                icon={<Gauge aria-hidden="true" />}
                label="Bookings this cycle"
                value={usage.bookings}
              />
              <PlanStat
                icon={<UsersRound aria-hidden="true" />}
                label="Team access"
                value={currentPlan.teamSeats}
              />
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3" aria-label="Plan usage">
          <UsageCard
            icon={<Zap aria-hidden="true" />}
            label="Booking usage"
            value={`${usage.percentage}%`}
            detail="of your monthly allowance"
            progress={usage.percentage}
            color="green"
          />
          <UsageCard
            icon={<CreditCard aria-hidden="true" />}
            label="Next payment"
            value={
              currentPlan.price === 0 ? 'GHS 0' : formatPrice(currentPlan.price)
            }
            detail={renewalDate}
            color="blue"
          />
          <UsageCard
            icon={<Sparkles aria-hidden="true" />}
            label="Plan health"
            value="Good fit"
            detail="You have room to grow"
            color="purple"
          />
        </section>

        <section className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-[#17343c] dark:text-white">
              Plans for every stage
            </h2>
            <p className="mt-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
              Upgrade when you need more capacity or downgrade when you need to
              simplify.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {plans.map((plan) => {
              const isCurrent = plan.id === currentPlan.id;
              const isUpgrade = plan.rank > currentPlan.rank;

              return (
                <article
                  key={plan.id}
                  className={`relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-[0_8px_25px_rgba(23,52,60,0.04)] transition dark:bg-[#17221f] ${
                    isCurrent
                      ? 'border-[#0f8a62] ring-2 ring-[#0f8a62]/15 dark:border-[#52c995] dark:ring-[#52c995]/15'
                      : 'border-[#dceae4] dark:border-white/10'
                  }`}
                >
                  {plan.recommended && (
                    <div className="bg-[#0f8a62] px-5 py-2 text-center text-[10px] font-bold tracking-[0.14em] text-white uppercase">
                      Most popular
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-[#17343c] dark:text-white">
                          {plan.name}
                        </h3>
                        <p className="mt-2 min-h-12 text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
                          {plan.description}
                        </p>
                      </div>
                      {isCurrent && (
                        <Badge
                          variant="outline"
                          className="border-[#b9dfcc] text-[#0f6b4d] dark:border-[#286c51] dark:text-[#8fe0bb]"
                        >
                          Current
                        </Badge>
                      )}
                    </div>

                    <div className="mt-6 flex items-end gap-1">
                      <span className="text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
                        {formatPrice(plan.price)}
                      </span>
                      {plan.price > 0 && (
                        <span className="pb-1 text-xs font-medium text-[#91aaa2]">
                          / month
                        </span>
                      )}
                    </div>

                    <div className="mt-5 space-y-3 border-t border-[#e7f0ec] pt-5 dark:border-white/8">
                      {plan.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-start gap-2.5 text-sm text-[#41645a] dark:text-[#c4d8d1]"
                        >
                          <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#d9f7e8] text-[#0f8a62] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
                            <Check aria-hidden="true" className="size-3" />
                          </span>
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-7">
                      <Button
                        type="button"
                        variant={isCurrent ? 'outline' : 'default'}
                        className={`w-full rounded-xl ${isCurrent ? 'border-[#b9dfcc] text-[#0f6b4d] hover:bg-[#f0faf4] dark:border-[#286c51] dark:text-[#8fe0bb] dark:hover:bg-[#0f8a62]/10' : 'bg-[#0f8a62] text-white hover:bg-[#0b7653]'}`}
                        disabled={isCurrent}
                        onClick={() => requestPlanChange(plan)}
                      >
                        {isCurrent ? (
                          'Current plan'
                        ) : isUpgrade ? (
                          <>
                            <ArrowUpRight aria-hidden="true" />
                            Upgrade to {plan.name}
                          </>
                        ) : (
                          <>
                            <ArrowDownRight aria-hidden="true" />
                            Downgrade to {plan.name}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-[#dceae4] bg-[#f6faf8] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 dark:border-white/10 dark:bg-[#101917]">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#dcecf5] text-[#2d6980] dark:bg-[#2d6980]/15 dark:text-[#9bd1e4]">
              <CreditCard aria-hidden="true" className="size-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#17343c] dark:text-white">
                Billing is simple and transparent
              </h2>
              <p className="mt-1 text-xs leading-5 text-[#70908a] dark:text-[#9cb8b1]">
                Plan changes are confirmed before they are applied. You can
                adjust your plan whenever your business needs change.
              </p>
            </div>
          </div>
          <p className="shrink-0 text-xs font-semibold text-[#41645a] dark:text-[#c4d8d1]">
            Billing history will appear here
          </p>
        </section>
      </div>
    </>
  );
}

function PlanStat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/6 px-4 py-3">
      <span className="text-[#8fe0bb] [&>svg]:size-4">{icon}</span>
      <div className="min-w-0">
        <p className="truncate text-[11px] text-[#b8c9c7]">{label}</p>
        <p className="mt-0.5 truncate text-sm font-semibold text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

function UsageCard({
  icon,
  label,
  value,
  detail,
  progress,
  color,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
  progress?: number;
  color: 'green' | 'blue' | 'purple';
}) {
  const colors = {
    green:
      'bg-[#d9f7e8] text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]',
    blue: 'bg-[#dcecf5] text-[#2d6980] dark:bg-[#2d6980]/15 dark:text-[#9bd1e4]',
    purple:
      'bg-[#e6e1ff] text-[#594e9e] dark:bg-[#594e9e]/15 dark:text-[#c0b8ec]',
  };

  return (
    <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
      <div className="flex items-start justify-between gap-3">
        <span
          className={`flex size-10 items-center justify-center rounded-xl ${colors[color]} [&>svg]:size-5`}
        >
          {icon}
        </span>
        <p className="text-xs font-medium text-[#91aaa2]">{label}</p>
      </div>
      <p className="mt-5 text-2xl font-bold tracking-tight text-[#17343c] dark:text-white">
        {value}
      </p>
      <p className="mt-1 text-xs text-[#70908a] dark:text-[#9cb8b1]">
        {detail}
      </p>
      {progress !== undefined && (
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#e7f0ec] dark:bg-white/10">
          <div
            className="h-full rounded-full bg-[#0f8a62]"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

Subscription.layout = {
  breadcrumbs: [
    {
      title: 'Subscription plan',
      href: edit(),
    },
  ],
};
