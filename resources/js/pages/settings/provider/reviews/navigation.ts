import { LayoutDashboard, Star } from 'lucide-react';
import settings from '@/routes/settings';

export enum ReviewPagesEnum {
  Breakdown = 'breakdown',
  Overview = 'overview',
}

export const reviewLayoutProps = {
  classNames: {
    aside: 'h-32',
  },
  navList: [
    {
      label: 'Overview',
      icon: LayoutDashboard,
      url: settings.review.index.url({
        query: { target: ReviewPagesEnum.Overview },
      }),
    },
    {
      label: 'Breakdown',
      icon: Star,
      url: settings.review.index.url({
        query: { target: ReviewPagesEnum.Breakdown },
      }),
    },
  ],
};
