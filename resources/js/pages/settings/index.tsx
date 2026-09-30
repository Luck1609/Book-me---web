import { Link } from '@inertiajs/react'
import { ArrowUpRight, BookOpen, Calendar, ChartNoAxesCombined, CreditCard, Landmark, ThumbsUp, UserCircle, UserRoundGroup } from 'lucide-react'
import type { ReactNode } from 'react'
import Container from '@/components/container'
import Heading from '@/components/heading'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import AppLayout from '@/layouts/app'
import settings from '@/routes/settings'


const settingsList = [
  {
    title: "Personal Profile",
    description: "Update your personal information",
    url: settings.profile.edit().url,
    icon: UserCircle
  },
  {
    title: "Business Profile",
    description: "Customize and manage your business information",
    url: settings.businessProfile.edit().url,
    icon: Landmark
  },
  {
    title: "Scheduling",
    description: "Customize and manage your business information",
    url: settings.schedule.index().url,
    icon: Calendar
  },
  {
    title: "Clients",
    description: "Customize and manage your business information",
    url: settings.client.index().url,
    icon: UserRoundGroup
  },
  {
    title: "Billing & Payments",
    description: "Customize and manage your business information",
    url: settings.subscription.index().url,
    icon: CreditCard
  },
  {
    title: "Revenue",
    description: "Manage your expense and your work inputs",
    url: settings.revenue.index().url,
    icon: ChartNoAxesCombined
  },
  {
    title: "Catalog",
    description: "Manage categories and services offered by you",
    url: settings.catalog.index().url,
    icon: BookOpen
  },
  {
    title: "Rating & Reviews",
    description: "Manage your expense and your work inputs",
    url: settings.reviews.index().url,
    icon: ThumbsUp
  },
]

export default function SettingsPage() {
  return (
    <main className=''>
      <Container className="py-10 space-y-10">
        <Heading
          title="Settings Management"
          description="Manage your all settings related to your business."
        />

        <div className="grid grid-cols-4 gap-8">
          {
            settingsList.map(({ title, description, url, icon: Icon }) => (
              <Link key={url} href={url} className="cursor-pointer">
                <Card className="flex-col justify-between gap-3 p-5">
                  <div className="flex flex-col gap-y-2">
                    <CardTitle className="flex items-center gap-2 ">
                      <Icon className="size-5 text-primary dark:text-emerald-500" />
                      <span>{title}</span>
                    </CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </div>

                  <div className="flex justify-end">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-sm">View</span>
                      <ArrowUpRight className="size-4" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          }
        </div>
      </Container>
    </main>
  )
}


SettingsPage.layout = (page: ReactNode) => (
  <AppLayout>
    {page}
  </AppLayout>
)
