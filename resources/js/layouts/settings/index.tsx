import { usePage } from '@inertiajs/react'
import type { ReactNode } from 'react'
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

export default function SettingsLayout({ children, ...props }: Children<{
  navList: NavList[];
  backOptions: {
    label?: ReactNode;
    url: string;
  }
}>) {
  const { user } = usePage().props

  if (user?.role === UserType.CLIENT) {
    return (
      <ClientSettingsLayout>{children}</ClientSettingsLayout>
    )
  }

  return (
    <ProviderSettingsLayout {...props}>{children}</ProviderSettingsLayout>
  )
}

