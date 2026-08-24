import {
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

export const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: dashboard(),
    icon: LayoutGrid,
  },
  {
    title: 'Booking',
    href: booking.index.url(),
    icon: CalendarRange,
  },
  {
    title: 'Client',
    href: client.index.url(),
    icon: ContactRound,
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
