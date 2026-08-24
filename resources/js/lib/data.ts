import { CalendarRange, ChartNoAxesCombined, ContactRound, LayoutGrid, UsersRound } from "lucide-react";
import { dashboard } from "@/routes";
import type { NavItem } from "@/types";

export const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: dashboard(),
    icon: LayoutGrid,
  },
  {
    title: 'Booking',
    href: "#",
    icon: CalendarRange,
  },
  {
    title: 'Client',
    href: "#",
    icon: ContactRound,
  },
  {
    title: 'Team Management',
    href: "#",
    icon: UsersRound,
  },
  {
    title: 'Report',
    href: "#",
    icon: ChartNoAxesCombined,
  },
];
