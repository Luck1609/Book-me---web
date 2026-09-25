import { Link, usePage } from '@inertiajs/react';
import { AppContent } from '@/components/app-content';
import AppLogo from '@/components/app-logo';
import { AppShell } from '@/components/app-shell';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { NoticeProvider } from '@/contexts/notice-context';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { mainNavItems } from '@/lib/data';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import NotificationPanel from './notification-panel';
import ThemeToggle from './theme-toggler';


export default function AppLayout({
  breadcrumbs = [],
  children,
}: {
  breadcrumbs?: BreadcrumbItem[];
  children: React.ReactNode;
}) {
  const { user } = usePage().props
  const { isCurrentOrParentUrl } = useCurrentUrl();

  return (
    <NoticeProvider>
      <AppShell variant="sidebar">
        <Sidebar collapsible="icon" variant="inset">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <Link href={dashboard()} prefetch>
                    <AppLogo />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent className="lg:mt-5">
            <SidebarGroup className="px-2 py-0">
              <SidebarMenu className="space-y-1">
                {mainNavItems(user?.role).map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isCurrentOrParentUrl(item.href)}
                      tooltip={{ children: item.title }}
                    >
                      <Link href={item.href} className="text-base" prefetch>
                        {item.icon && <item.icon className="size-5!" />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <NavUser />
          </SidebarFooter>
        </Sidebar>

        <AppContent variant="sidebar" className="overflow-x-hidden">
          <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                <ThemeToggle />
                <NotificationPanel />
              </div>
            </div>
          </header>

          {children}
        </AppContent>
      </AppShell>
    </NoticeProvider>
  );
}
