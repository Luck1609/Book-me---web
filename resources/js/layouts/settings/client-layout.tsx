import { Link, usePage } from '@inertiajs/react';
import { ArrowLeft, BellRing, ShieldUser, UserCircle } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import Container from '@/components/container';
import { Button } from '@/components/ui/button';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn, toUrl } from '@/lib/utils';
import settings from '@/routes/settings';
import { UserType } from '@/types';
import type { NavItem } from '@/types';

const sidebarNavItems = (userType: UserType): NavItem[] => [
  {
    title: 'Personal Profile',
    href: settings.profile.edit(),
    icon: UserCircle,
  },
  {
    title: 'Security',
    href: settings.security.edit(),
    icon: ShieldUser,
  },
  ...(userType === UserType.PROVIDER
    ? []
    : [
      {
        title: 'Notifications',
        href: settings.notifications.index(),
        icon: BellRing,
      },
    ]),
];

export default function ClientSettingsLayout({ children }: PropsWithChildren) {
  const { isCurrentOrParentUrl } = useCurrentUrl();
  const { user } = usePage().props;

  return (
    <Container className="py-10 space-y-5">
      {
        user.role === UserType.PROVIDER && (
          <Link href={settings.index()} className="block">
            <Button variant="outline">
              <ArrowLeft />
              Back to settings
            </Button>
          </Link>
        )
      }

      <div className="grid lg:grid-cols-5 gap-x-10">
        <aside className={cn("bg-card p-5 rounded-xl", user.role === UserType.CLIENT ? "h-40" : "h-30")}>
          <nav
            className="flex flex-col space-y-1 space-x-0"
            aria-label="Settings"
          >
            {sidebarNavItems(user.role).map((item, index) => (
              <Button
                key={`${toUrl(item.href)}-${index}`}
                size="sm"
                variant="ghost"
                asChild
                className={cn('w-full justify-start', {
                  'bg-muted': isCurrentOrParentUrl(item.href),
                })}
              >
                <Link href={item.href} className="gap-2 py-5">
                  {item.icon && <item.icon className="size-5" />}
                  {item.title}
                </Link>
              </Button>
            ))}
          </nav>
        </aside>

        <div className="lg:col-span-4">{children}</div>
      </div>
    </Container>
  );
}
