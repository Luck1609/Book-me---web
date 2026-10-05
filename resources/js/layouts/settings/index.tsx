import { usePage } from '@inertiajs/react'
import type { ReactNode } from 'react'
import settings from '@/routes/settings'
import { UserType } from '@/types'
import type { Children, Icon } from '@/types'
import ClientSettingsLayout from './client-layout'
import ProviderSettingsLayout from './provider-layout'


export type NavList = {
  label: string;
  url: string;
  icon?: Icon;
  position?: 'prefix' | 'prepend'
}

const providerRouteExceptions = [settings.profile.edit().url, settings.security.edit().url]

export default function SettingsLayout({ children, ...props }: Children<{
  navList: NavList[];
  backOptions: {
    label?: ReactNode;
    url: string;
  }
}>) {
  const { props: {user}, url } = usePage()

  if (user?.role === UserType.PROVIDER && !providerRouteExceptions.includes(url)) {
    return (
      <ProviderSettingsLayout {...props}>{children}</ProviderSettingsLayout>
    )
  }

  return (
    <ClientSettingsLayout>{children}</ClientSettingsLayout>
  )
}

