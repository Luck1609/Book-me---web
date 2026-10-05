import { usePage } from '@inertiajs/react'
import type { ReactNode } from 'react'
import Container from '@/components/container'
import Heading from '@/components/heading'
import AppLayout from '@/layouts/app'
import { UserType } from '@/types'
import ClientSettingsPage from './client'
import ProviderSettingsPage from './provider'



export default function SettingsPage() {
  const { user } = usePage().props

  return (
    <>
      <Container className="py-10 space-y-10">
        <Heading
          title="General Settings"
          description="Manage your all settings related to your business."
        />

        {
          user.role === UserType.PROVIDER
            ? <ProviderSettingsPage />
            : <ClientSettingsPage />
        }
      </Container>
    </>
  )
}


SettingsPage.layout = (page: ReactNode) => (
  <AppLayout>
    {page}
  </AppLayout>
)
