import { usePage } from '@inertiajs/react';
import { MailClock, NotebookPen } from 'lucide-react';
import ClientNotificationSettings from '@/pages/settings/client/notification';
import ProviderNotificationSettings from '@/pages/settings/provider/notification';
import settings from '@/routes/settings';
import { UserType } from '@/types';

export default function NotificationSettings() {
  const { user } = usePage().props;

  if (user.role === UserType.Provider) {
    return <ProviderNotificationSettings />;
  }

  return <ClientNotificationSettings />;
}

NotificationSettings.layout = {
  classNames: {
    aside: 'h-32',
  },
  navList: [
    {
      label: 'Booking',
      icon: NotebookPen,
      url: settings.index().url,
    },
    {
      label: 'Automation',
      icon: MailClock,
      url: settings.index().url,
    },
  ],
};
