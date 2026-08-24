import { Link } from '@inertiajs/react';
import { AppContent } from '@/components/app-content';
import AppLogo from '@/components/app-logo';
import { AppShell } from '@/components/app-shell';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { mainNavItems } from '@/lib/data';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

export default function AppLayout({
  breadcrumbs = [],
  children,
}: {
  breadcrumbs?: BreadcrumbItem[];
  children: React.ReactNode;
}) {
  return (
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
          <NavMain items={mainNavItems} />
        </SidebarContent>

        <SidebarFooter>
          {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
          <NavUser />
        </SidebarFooter>
      </Sidebar>

      <AppContent variant="sidebar" className="overflow-x-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
        </header>


        {children}
      </AppContent>
    </AppShell>
  );
}
