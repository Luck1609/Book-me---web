import { Head, Link } from '@inertiajs/react';
import {
  Bell,
  BellRing,
  Check,
  ChevronRight,
  Clock3,
  Mail,
  MessageSquareText,
  NotebookPen,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import settingsRoute from '@/routes/settings';

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
    <div className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[#fbfdfc] sm:px-6 dark:hover:bg-white/2">
      <span
        className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${option.iconClassName}`}
      >
        <Icon aria-hidden="true" className="size-4.5" />
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

export default function ProviderNotificationSettings() {
  const [settings, setSettings] =
    useState<NotificationSettings>(initialSettings);
  const [saved, setSaved] = useState(false);

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
                href={settingsRoute.profile.edit()}
                className="mt-4 flex w-full items-center justify-between gap-3 text-left text-xs font-bold text-[#0f8a62] transition-colors hover:text-[#0b7653] dark:text-[#8fe0bb] dark:hover:text-white"
              >
                Manage account email
                <ChevronRight aria-hidden="true" className="size-4" />
              </Link>
            </section>

            <section className="bg-card rounded-2xl border border-[#dceae4] p-5 dark:border-[#286c51]">
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


ProviderNotificationSettings.layout = {
  classNames: {
    aside: "32"
  },
  navList: [
    {
      label: "Booking",
      icon: NotebookPen,
      url: ""
    },
    {
      label: "Booking",
      icon: NotebookPen,
      url: ""
    },
  ],
}
