import { Head } from '@inertiajs/react';
import {
  Bell,
  BellRing,
  CalendarCheck2,
  Check,
  Clock3,
  Mail,
  MessageCircle,
  MessageSquareText,
  Smartphone,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

type NotificationKey =
  | 'bookingConfirmed'
  | 'appointmentReminders'
  | 'bookingChanges'
  | 'providerMessages'
  | 'serviceUpdates'
  | 'bookMeUpdates';

type NotificationSettings = Record<NotificationKey, boolean>;

type NotificationOption = {
  key: NotificationKey;
  title: string;
  description: string;
  icon: typeof Bell;
  iconClassName: string;
};

const initialSettings: NotificationSettings = {
  bookingConfirmed: true,
  appointmentReminders: true,
  bookingChanges: true,
  providerMessages: true,
  serviceUpdates: true,
  bookMeUpdates: false,
};

const appointmentOptions: NotificationOption[] = [
  {
    key: 'bookingConfirmed',
    title: 'Booking confirmations',
    description: 'Get a clear confirmation when your appointment is booked.',
    icon: CalendarCheck2,
    iconClassName:
      'bg-[#d9f7e8] text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]',
  },
  {
    key: 'appointmentReminders',
    title: 'Appointment reminders',
    description: 'Receive a gentle reminder before it is time to leave.',
    icon: Clock3,
    iconClassName:
      'bg-[#edf7fb] text-[#2d6980] dark:bg-[#2d6980]/15 dark:text-[#9bd1e4]',
  },
  {
    key: 'bookingChanges',
    title: 'Booking changes',
    description: 'Know right away if an appointment is moved or cancelled.',
    icon: XCircle,
    iconClassName:
      'bg-[#fff4eb] text-[#a55c2d] dark:bg-[#a55c2d]/15 dark:text-[#f0b58b]',
  },
];

const communicationOptions: NotificationOption[] = [
  {
    key: 'providerMessages',
    title: 'Provider messages',
    description: 'See when a provider sends a message about your booking.',
    icon: MessageCircle,
    iconClassName:
      'bg-[#e9f8f0] text-[#0f8a62] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]',
  },
  {
    key: 'serviceUpdates',
    title: 'Service updates',
    description:
      'Stay informed when a provider updates your appointment details.',
    icon: MessageSquareText,
    iconClassName:
      'bg-[#f3f0ff] text-[#685bb4] dark:bg-[#685bb4]/15 dark:text-[#c0b8ec]',
  },
];

function NotificationOptionRow({
  option,
  checked,
  onCheckedChange,
}: {
  option: NotificationOption;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  const Icon = option.icon;

  return (
    <div className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[#fbfdfc] sm:px-6 dark:hover:bg-white/[0.02]">
      <span
        className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${option.iconClassName}`}
      >
        <Icon aria-hidden="true" className="size-[18px]" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-[#17343c] dark:text-white">
          {option.title}
        </p>
        <p className="mt-1 text-xs leading-5 text-[#70908a] dark:text-[#9cb8b1]">
          {option.description}
        </p>
      </div>
      <Switch
        aria-label={`${checked ? 'Disable' : 'Enable'} ${option.title}`}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}

function NotificationGroup({
  title,
  description,
  options,
  settings,
  onToggle,
}: {
  title: string;
  description: string;
  options: NotificationOption[];
  settings: NotificationSettings;
  onToggle: (key: NotificationKey, checked: boolean) => void;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#dceae4] bg-white shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
      <div className="border-b border-[#e7f0ec] px-5 py-5 sm:px-6 dark:border-white/8">
        <h2 className="text-base font-bold text-[#17343c] dark:text-white">
          {title}
        </h2>
        <p className="mt-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
          {description}
        </p>
      </div>
      <div className="divide-y divide-[#e7f0ec] dark:divide-white/8">
        {options.map((option) => (
          <NotificationOptionRow
            key={option.key}
            option={option}
            checked={settings[option.key]}
            onCheckedChange={(checked) => onToggle(option.key, checked)}
          />
        ))}
      </div>
    </section>
  );
}

export default function ClientNotificationSettings() {
  const [settings, setSettings] =
    useState<NotificationSettings>(initialSettings);
  const [saved, setSaved] = useState(false);

  const enabledCount = Object.values(settings).filter(Boolean).length;

  const toggleSetting = (key: NotificationKey, checked: boolean) => {
    setSettings((currentSettings) => ({
      ...currentSettings,
      [key]: checked,
    }));
    setSaved(false);
  };

  const saveSettings = () => {
    setSaved(true);
  };

  return (
    <>
      <Head title="Notification settings" />

      <div className="space-y-8">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-[#0f8a62] uppercase dark:text-[#8fe0bb]">
              Your appointments
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#17343c] dark:text-white">
              Notification settings
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
              Choose how BookMe keeps you in the loop, from the first booking
              confirmation to the final appointment reminder.
            </p>
          </div>
          <Button
            type="button"
            onClick={saveSettings}
            className="w-fit rounded-xl bg-[#0f8a62] px-4 text-white shadow-[0_10px_22px_rgba(15,138,98,0.18)] hover:bg-[#0b7653]"
          >
            {saved ? <Check aria-hidden="true" /> : <Bell aria-hidden="true" />}
            {saved ? 'Changes saved' : 'Save preferences'}
          </Button>
        </header>

        <section className="relative overflow-hidden rounded-3xl bg-[#17343c] text-white shadow-[0_18px_45px_rgba(23,52,60,0.14)]">
          <div className="absolute -top-24 -right-16 size-64 rounded-full bg-[#0f8a62]/30 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 size-72 rounded-full bg-[#78d6ae]/10 blur-3xl" />
          <div className="relative flex flex-col gap-7 p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#0f8a62] text-[#d9f7e8] shadow-lg shadow-black/10">
                  <BellRing aria-hidden="true" className="size-6" />
                </span>
                <div>
                  <p className="text-xs font-bold tracking-[0.14em] text-[#8fe0bb] uppercase">
                    Your notification setup
                  </p>
                  <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                    {enabledCount} of {Object.keys(settings).length} alerts are
                    on
                  </h2>
                </div>
              </div>
              <p className="mt-5 text-sm leading-6 text-[#b8c9c7]">
                We’ll keep the important details close at hand so you can enjoy
                your appointments without checking your inbox all day.
              </p>
            </div>
            <Badge className="w-fit border-0 bg-[#d9f7e8] px-3 py-1.5 text-[#0f6b4d] hover:bg-[#d9f7e8]">
              <span className="size-1.5 rounded-full bg-[#0f8a62]" />
              {enabledCount > 0
                ? 'Notifications are active'
                : 'Notifications are off'}
            </Badge>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
          <div className="space-y-6">
            <NotificationGroup
              title="Appointment activity"
              description="Stay close to the bookings that shape your day."
              options={appointmentOptions}
              settings={settings}
              onToggle={toggleSetting}
            />
            <NotificationGroup
              title="Messages and updates"
              description="Be ready when your provider has something to share."
              options={communicationOptions}
              settings={settings}
              onToggle={toggleSetting}
            />
            <NotificationGroup
              title="From BookMe"
              description="Optional ideas to make your next booking even easier."
              options={[
                {
                  key: 'bookMeUpdates',
                  title: 'BookMe updates and tips',
                  description:
                    'Occasional product news, helpful tips, and local service inspiration.',
                  icon: Sparkles,
                  iconClassName:
                    'bg-[#f3f0ff] text-[#685bb4] dark:bg-[#685bb4]/15 dark:text-[#c0b8ec]',
                },
              ]}
              settings={settings}
              onToggle={toggleSetting}
            />
          </div>

          <aside className="space-y-4">
            <section className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#edf7fb] text-[#2d6980] dark:bg-[#2d6980]/15 dark:text-[#9bd1e4]">
                  <Smartphone aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h2 className="text-sm font-bold text-[#17343c] dark:text-white">
                    Delivery channels
                  </h2>
                  <p className="mt-0.5 text-xs text-[#70908a] dark:text-[#9cb8b1]">
                    How we’ll reach you
                  </p>
                </div>
              </div>
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between gap-3 rounded-xl bg-[#f4fbf7] p-3 dark:bg-[#0f8a62]/10">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#0f8a62] shadow-sm dark:bg-[#17343c] dark:text-[#8fe0bb]">
                      <Mail aria-hidden="true" className="size-4" />
                    </span>
                    <span className="truncate text-xs font-semibold text-[#41645a] dark:text-[#c4d8d1]">
                      Account email
                    </span>
                  </div>
                  <Check aria-hidden="true" className="size-4 text-[#0f8a62]" />
                </div>
                <div className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-[#dceae4] p-3 dark:border-white/10">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#f4fbf7] text-[#0f8a62] dark:bg-[#0f8a62]/10 dark:text-[#8fe0bb]">
                      <Smartphone aria-hidden="true" className="size-4" />
                    </span>
                    <span className="truncate text-xs font-semibold text-[#70908a] dark:text-[#9cb8b1]">
                      Push notifications
                    </span>
                  </div>
                  <span className="text-[10px] font-bold tracking-wide text-[#91aaa2] uppercase">
                    Coming soon
                  </span>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[#dceae4] bg-[#f6faf8] p-5 dark:border-[#286c51] dark:bg-[#101917]">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#d9f7e8] text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
                <Bell aria-hidden="true" className="size-5" />
              </div>
              <h2 className="mt-4 text-sm font-bold text-[#17343c] dark:text-white">
                Just the right amount
              </h2>
              <p className="mt-1.5 text-xs leading-5 text-[#70908a] dark:text-[#9cb8b1]">
                Appointment confirmations, changes, and reminders stay on by
                default. You can quiet optional updates at any time.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}
