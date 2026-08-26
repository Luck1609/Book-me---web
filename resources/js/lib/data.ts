import {
  CalendarCheck,
  CalendarRange,
  ChartNoAxesCombined,
  ContactRound,
  LayoutGrid,
  UsersRound,
} from 'lucide-react';
import { dashboard, report } from '@/routes';
import booking from '@/routes/booking';
import client from '@/routes/client';
import team from '@/routes/team';
import type { NavItem } from '@/types';
import schedule from '@/routes/schedule';

export const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: dashboard(),
    icon: LayoutGrid,
  },
  {
    title: 'Bookings',
    href: booking.index.url(),
    icon: CalendarRange,
  },
  {
    title: 'Clients',
    href: client.index.url(),
    icon: ContactRound,
  },
  {
    title: 'Schedules',
    href: schedule.index.url(),
    icon: CalendarCheck,
  },
  {
    title: 'Team Management',
    href: team.index.url(),
    icon: UsersRound,
  },
  {
    title: 'Report',
    href: report(),
    icon: ChartNoAxesCombined,
  },
];
