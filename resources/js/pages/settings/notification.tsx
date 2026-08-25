import { Head, Link } from '@inertiajs/react';
import {
  Bell,
  BellRing,
  Check,
  ChevronRight,
  Clock3,
  Mail,
  MessageSquareText,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { edit as editProfile } from '@/routes/profile';

type NotificationKey =
  | 'newBookings'
  | 'bookingChanges'
  | 'dailySummary'
  | 'clientReminders'
  | 'messages'
  | 'productUpdates';

type NotificationSettings = Record<NotificationKey, boolean>;

type NotificationOption = {
  key: NotificationKey;
  title: string;
  description: string;
  icon: typeof Bell;
  iconClassName: string;
};

const initialSettings: NotificationSettings = {
  newBookings: true,
  bookingChanges: true,
  dailySummary: false,
  clientReminders: true,
  messages: true,
  productUpdates: false,
};

const bookingOptions: NotificationOption[] = [
  {
    key: 'newBookings',
    title: 'New booking requests',
    description: 'Know the moment a client books a service with you.',
    icon: BellRing,
    iconClassName:
      'bg-[#d9f7e8] text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]',
  },
  {
    key: 'bookingChanges',
    title: 'Booking changes',
    description: 'Get notified when a client reschedules or cancels.',
    icon: Clock3,
    iconClassName:
      'bg-[#edf7fb] text-[#2d6980] dark:bg-[#2d6980]/15 dark:text-[#9bd1e4]',
  },
  {
    key: 'dailySummary',
    title: 'Daily schedule summary',
    description: 'Receive a calm morning overview of your appointments.',
    icon: Sparkles,
    iconClassName:
      'bg-[#f3f0ff] text-[#685bb4] dark:bg-[#685bb4]/15 dark:text-[#c0b8ec]',
  },
];

const communicationOptions: NotificationOption[] = [
  {
    key: 'clientReminders',
    title: 'Client reminders',
    description: 'Stay ahead of upcoming appointments and no-shows.',
    icon: Smartphone,
    iconClassName:
      'bg-[#fff4eb] text-[#a55c2d] dark:bg-[#a55c2d]/15 dark:text-[#f0b58b]',
  },
  {
    key: 'messages',
    title: 'Client messages',
    description: 'See when a client sends a new message or question.',
    icon: MessageSquareText,
    iconClassName:
      'bg-[#e9f8f0] text-[#0f8a62] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]',
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

export default function Notification() {
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
              Stay in the know
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#17343c] dark:text-white">
              Notification settings
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
              Choose what deserves your attention so you can focus on giving
              clients a great experience.
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
                We’ll send important booking activity to your account email so
                you never have to keep refreshing your calendar.
              </p>
            </div>
            <Badge className="w-fit border-0 bg-[#d9f7e8] px-3 py-1.5 text-[#0f6b4d] hover:bg-[#d9f7e8]">
              <span className="size-1.5 rounded-full bg-[#0f8a62]" />
              Notifications are active
            </Badge>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
          <div className="space-y-6">
            <NotificationGroup
              title="Booking activity"
              description="Stay close to the moments that keep your calendar moving."
              options={bookingOptions}
              settings={settings}
              onToggle={toggleSetting}
            />
            <NotificationGroup
              title="Client communication"
              description="Be ready when clients need a quick response."
              options={communicationOptions}
              settings={settings}
              onToggle={toggleSetting}
            />
            <NotificationGroup
              title="From Book Me"
              description="Occasional ideas and updates to help your business grow."
              options={[
                {
                  ...bookingOptions[0],
                  key: 'productUpdates',
                  title: 'Product updates',
                  description:
                    'Hear about helpful new features, tips, and platform news.',
                  icon: Sparkles,
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
                  <Mail aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h2 className="text-sm font-bold text-[#17343c] dark:text-white">
                    Delivery channel
                  </h2>
                  <p className="mt-0.5 text-xs text-[#70908a] dark:text-[#9cb8b1]">
                    Where we’ll reach you
                  </p>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-[#f4fbf7] p-3 dark:bg-[#0f8a62]/10">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#0f8a62] shadow-sm dark:bg-[#17343c] dark:text-[#8fe0bb]">
                    <Mail aria-hidden="true" className="size-4" />
                  </span>
                  <span className="truncate text-xs font-semibold text-[#41645a] dark:text-[#c4d8d1]">
                    Your account email
                  </span>
                </div>
                <Check aria-hidden="true" className="size-4 text-[#0f8a62]" />
              </div>
              <Link
                href={editProfile()}
                className="mt-4 flex w-full items-center justify-between gap-3 text-left text-xs font-bold text-[#0f8a62] transition-colors hover:text-[#0b7653] dark:text-[#8fe0bb] dark:hover:text-white"
              >
                Manage account email
                <ChevronRight aria-hidden="true" className="size-4" />
              </Link>
            </section>

            <section className="rounded-2xl border border-[#dceae4] bg-[#f6faf8] p-5 dark:border-[#286c51] dark:bg-[#101917]">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#d9f7e8] text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
                <Bell aria-hidden="true" className="size-5" />
              </div>
              <h2 className="mt-4 text-sm font-bold text-[#17343c] dark:text-white">
                A quieter inbox
              </h2>
              <p className="mt-1.5 text-xs leading-5 text-[#70908a] dark:text-[#9cb8b1]">
                You can change these preferences whenever your workday or team
                changes. Booking alerts are always easy to turn back on.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}
