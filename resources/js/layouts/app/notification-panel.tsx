import { Link, usePage } from '@inertiajs/react';
import { Bell, CheckCheck, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import notifications from '@/routes/notifications';
import type { UserNotification } from '@/types';

type NotificationPanelProps = {
  unreadNotifications?: UserNotification[];
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
    month: 'short',
    day: 'numeric',
  }).format(new Date(createdAt));
}

export default function NotificationPanel() {
  const { unreadNotifications = [], unreadNotificationCount = 0 } =
    usePage<NotificationPanelProps>().props;
  const notificationCountLabel =
    unreadNotificationCount > 99 ? '99+' : unreadNotificationCount;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={
            unreadNotificationCount > 0
              ? `${unreadNotificationCount} unread notifications`
              : 'Notifications'
          }
          className="relative size-9 rounded-xl text-[#41645a] hover:bg-[#e9f8f0] hover:text-[#0f8a62] dark:text-[#c4d8d1] dark:hover:bg-[#0f8a62]/15 dark:hover:text-[#8fe0bb]"
        >
          <Bell aria-hidden="true" className="size-4.5" />
          {unreadNotificationCount > 0 && (
            <span className="absolute -top-1 -right-1 flex min-w-4 items-center justify-center rounded-full bg-[#0f8a62] px-1 text-[10px] leading-4 font-bold text-white ring-2 ring-background">
              {notificationCountLabel}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-[min(380px,calc(100vw-2rem))] overflow-hidden rounded-2xl border-[#dceae4] p-0 shadow-[0_18px_45px_rgba(23,52,60,0.14)] dark:border-white/10"
      >
        <div className="flex items-center justify-between border-b border-[#e7f0ec] bg-[#fbfefc] px-4 py-4 dark:border-white/8 dark:bg-[#17221f]">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-[#0f8a62] uppercase dark:text-[#8fe0bb]">
              Your inbox
            </p>
            <h2 className="mt-0.5 text-base font-bold text-[#17343c] dark:text-white">
              Notifications
            </h2>
          </div>
          <span className="rounded-full bg-[#d9f7e8] px-2.5 py-1 text-xs font-bold text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
            {unreadNotificationCount} unread
          </span>
        </div>

        {unreadNotifications.length > 0 ? (
          <div className="max-h-90 overflow-y-auto p-2">
            {unreadNotifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                asChild
                className="h-auto items-start gap-3 rounded-xl p-3 focus:bg-[#f4fbf7] dark:focus:bg-[#0f8a62]/10"
              >
                <Link href={notifications.index()}>
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#d9f7e8] text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
                    <Bell aria-hidden="true" className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-3">
                      <span className="truncate text-sm font-bold text-[#17343c] dark:text-white">
                        {notificationTitle(notification)}
                      </span>
                      <span className="shrink-0 text-[11px] text-[#91aaa2]">
                        {notificationDate(notification.created_at)}
                      </span>
                    </span>
                    <span className="mt-1 line-clamp-2 text-xs leading-5 text-[#70908a] dark:text-[#9cb8b1]">
                      {notificationDescription(notification)}
                    </span>
                  </span>
                </Link>
              </DropdownMenuItem>
            ))}
          </div>
        ) : (
          <div className="px-6 py-10 text-center">
            <span className="mx-auto flex size-11 items-center justify-center rounded-2xl bg-[#f3f0ff] text-[#685bb4] dark:bg-[#685bb4]/15 dark:text-[#c0b8ec]">
              <Inbox aria-hidden="true" className="size-5" />
            </span>
            <p className="mt-4 text-sm font-bold text-[#17343c] dark:text-white">
              You&apos;re all caught up
            </p>
            <p className="mt-1 text-xs leading-5 text-[#70908a] dark:text-[#9cb8b1]">
              New booking and account updates will appear here.
            </p>
          </div>
        )}

        <div className="border-t border-[#e7f0ec] p-2 dark:border-white/8">
          <DropdownMenuItem
            asChild
            className="justify-center gap-2 rounded-xl py-2.5 font-semibold text-[#0f8a62] focus:bg-[#f4fbf7] focus:text-[#0f6b4d] dark:focus:bg-[#0f8a62]/10 dark:focus:text-[#8fe0bb]"
          >
            <Link href={notifications.index()}>
              {unreadNotificationCount > 0 ? (
                <CheckCheck aria-hidden="true" className="size-4" />
              ) : (
                <Inbox aria-hidden="true" className="size-4" />
              )}
              View all notifications
            </Link>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
