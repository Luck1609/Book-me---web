import { Link, usePage } from '@inertiajs/react'
import { ArrowUpRight, Calendar, UserCircle } from 'lucide-react'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import settings from '@/routes/settings'
import { UserType } from '@/types'


const settingsList = (role: UserType) => ([
  {
    title: "Personal Profile",
    description: "Update your personal information",
    url: settings.profile.edit().url,
    icon: UserCircle
  },
  {
    title: "Account Security",
    description: "Update your password and other account security features",
    url: settings.profile.edit().url,
    icon: UserCircle
  },
  ...role === UserType.CLIENT ? [
    {
      title: "Notifications",
      description: "Manage your notification preference and how providers can reach you",
      url: settings.schedule.index().url,
      icon: Calendar
    }
  ] : []
])

export default function ClientSettingsPage() {
  const { user } = usePage().props

  return (
    <div className="grid grid-cols-4 gap-8">
      {
        settingsList(user.role).map(({ title, description, url, icon: Icon }) => (
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
