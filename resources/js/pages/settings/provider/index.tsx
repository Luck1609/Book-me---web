import { Link } from '@inertiajs/react'
import { ArrowUpRight, BookOpen, Calendar, CreditCard, Landmark, ThumbsUp, UserCircle } from 'lucide-react'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import settings from '@/routes/settings'
import { BusinessProfileRoutes } from '@/types/enums'


const settingsList = [
  {
    title: "Personal Profile",
    description: "Update your personal information and your account's security",
    url: settings.profile.edit().url,
    icon: UserCircle
  },
  {
    title: "Business Profile",
    description: "Customize and manage your business information",
    url: settings.businessProfile.edit(BusinessProfileRoutes.Details).url,
    icon: Landmark
  },
  {
    title: "Notifications",
    description: "Manage your notification preference and how you reach you clients",
    url: settings.notifications.index().url,
    icon: Calendar
  },
  {
    title: "Billing & Payments",
    description: "Customize and manage your business information",
    url: settings.subscription.index().url,
    icon: CreditCard
  },
  // {
  //   title: "Revenue",
  //   description: "Manage your expense and your work inputs",
  //   url: settings.revenue.index().url,
  //   icon: ChartNoAxesCombined
  // },
  {
    title: "Catalog",
    description: "Manage categories and services offered by you",
    url: settings.catalog.index().url,
    icon: BookOpen
  },
  {
    title: "Rating & Reviews",
    description: "Know what your clients think about your services",
    url: settings.reviews.index().url,
    icon: ThumbsUp
  },
]

export default function ProviderSettingsPage() {

  return (
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
  )
}
