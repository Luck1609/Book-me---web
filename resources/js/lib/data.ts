import {
  CalendarCheck,
  CalendarRange,
  ChartNoAxesCombined,
  ContactRound,
  Heart,
  LayoutGrid,
  MessageCircleMore,
  UsersRound,
} from 'lucide-react';
import { dashboard, report } from '@/routes';
import booking from '@/routes/booking';
import client from '@/routes/client';
import schedule from '@/routes/schedule';
import team from '@/routes/team';
import { UserType } from '@/types';
import type { NavItem } from '@/types';

export const mainNavItems = (accountType?: UserType): NavItem[] => ([
  {
    title: 'Dashboard',
    href: dashboard(),
    icon: LayoutGrid,
  },
  {
    title: 'Bookings',
    href: accountType === UserType.PROVIDER
    ? booking.index.url()
    : client.booking.index.url(),
    icon: CalendarRange,
  },
  {
    title: 'Chats',
    href: accountType === UserType.PROVIDER
    ? booking.index.url()
    : client.booking.index.url(),
    icon: MessageCircleMore,
  },
  ...accountType !== UserType.PROVIDER
  ? [
    {
      title: 'Favorites',
      href: client.booking.index.url(),
      icon: Heart,
    },
  ]
  : [
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
  ]
]);
