import { usePage } from '@inertiajs/react';
import ClientNotificationSettings from '@/pages/settings/client/notification';
import ProviderNotificationSettings from '@/pages/settings/provider/notification';
import { UserType } from '@/types';

export default function NotificationSettings() {
  const { user } = usePage().props;

  if (user.role === UserType.PROVIDER) {
    return <ProviderNotificationSettings />;
  }

  return <ClientNotificationSettings />;
}
