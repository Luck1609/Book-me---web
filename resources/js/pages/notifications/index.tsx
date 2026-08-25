import { Head } from '@inertiajs/react';
import { Bell, CheckCircle2, Inbox, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import notificationsRoute from '@/routes/notifications';
import type { UserNotification } from '@/types';

type Props = {
  notifications?: UserNotification[];
  unreadNotificationCount?: number;
};

function notificationTitle(notification: UserNotification): string {
  const title = notification.data.title ?? notification.data.message;

  if (typeof title === 'string' && title.trim()) {
    return title;
  }

  const type = notification.type.split('\\').pop() ?? 'Notification';

  return type.replace(/([a-z])([A-Z])/g, '$1 $2');
}

function notificationDescription(notification: UserNotification): string {
  const description =
    notification.data.description ??
    notification.data.body ??
    notification.data.message;

  return typeof description === 'string' && description.trim()
    ? description
    : 'You have a new update waiting for you.';
}

function notificationDate(createdAt: string): string {
  return new Intl.DateTimeFormat('en-GH', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(createdAt));
}

function NotificationCard({
  notification,
}: {
  notification: UserNotification;
}) {
  return (
    <article className="flex gap-4 border-b border-[#e7f0ec] p-5 last:border-b-0 sm:p-6 dark:border-white/8">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#d9f7e8] text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
        <Bell aria-hidden="true" className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <h2 className="text-sm font-bold text-[#17343c] dark:text-white">
            {notificationTitle(notification)}
          </h2>
          <time
            dateTime={notification.created_at}
            className="shrink-0 text-xs text-[#91aaa2]"
          >
            {notificationDate(notification.created_at)}
          </time>
        </div>
        <p className="mt-2 text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
          {notificationDescription(notification)}
        </p>
        <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#0f8a62] dark:text-[#8fe0bb]">
          <span className="size-1.5 rounded-full bg-[#0f8a62]" />
          Unread
        </div>
      </div>
    </article>
  );
}

export default function Notifications({
  notifications = [],
  unreadNotificationCount = 0,
}: Props) {
  return (
    <>
      <Head title="Notifications" />

      <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-[#0f8a62] uppercase dark:text-[#8fe0bb]">
              Your updates
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#17343c] dark:text-white">
              Notifications
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
              Keep up with the booking, account, and workspace updates that need
              your attention.
            </p>
          </div>
          <Badge className="w-fit border-0 bg-[#e9f8f0] px-3 py-1.5 text-[#0f6b4d] hover:bg-[#e9f8f0] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
            <span className="size-1.5 rounded-full bg-[#0f8a62]" />
            {unreadNotificationCount} unread
          </Badge>
        </header>

        <section className="relative overflow-hidden rounded-3xl bg-[#17343c] text-white shadow-[0_18px_45px_rgba(23,52,60,0.14)]">
          <div className="absolute -top-24 -right-16 size-64 rounded-full bg-[#0f8a62]/30 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 size-72 rounded-full bg-[#78d6ae]/10 blur-3xl" />
          <div className="relative flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#0f8a62] text-[#d9f7e8] shadow-lg shadow-black/10">
                <Sparkles aria-hidden="true" className="size-6" />
              </span>
              <div>
                <p className="text-xs font-bold tracking-[0.14em] text-[#8fe0bb] uppercase">
                  Notification center
                </p>
                <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                  {unreadNotificationCount
                    ? 'There is something new for you.'
                    : 'You are all caught up.'}
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#b8c9c7]">
              <CheckCircle2
                aria-hidden="true"
                className="size-4 text-[#8fe0bb]"
              />
              Unread notifications only
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-[#dceae4] bg-white shadow-[0_16px_45px_rgba(23,52,60,0.06)] dark:border-white/10 dark:bg-[#17221f]">
          <div className="flex items-center justify-between border-b border-[#e7f0ec] px-5 py-5 sm:px-6 dark:border-white/8">
            <div>
              <h2 className="text-base font-bold text-[#17343c] dark:text-white">
                Unread notifications
              </h2>
              <p className="mt-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
                We will keep new updates here until you review them.
              </p>
            </div>
            <Inbox
              aria-hidden="true"
              className="hidden size-5 text-[#91aaa2] sm:block"
            />
          </div>

          {notifications.length > 0 ? (
            <div>
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </div>
          ) : (
            <div className="px-6 py-16 text-center">
              <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#f3f0ff] text-[#685bb4] dark:bg-[#685bb4]/15 dark:text-[#c0b8ec]">
                <Inbox aria-hidden="true" className="size-6" />
              </span>
              <h3 className="mt-5 text-base font-bold text-[#17343c] dark:text-white">
                No unread notifications
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
                You are up to date. New booking and account activity will show
                up here when it needs your attention.
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

Notifications.layout = {
  breadcrumbs: [
    {
      title: 'Notifications',
      href: notificationsRoute.index(),
    },
  ],
};
