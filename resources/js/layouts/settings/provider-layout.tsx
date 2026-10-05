import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import Container from '@/components/container';
import { Button } from '@/components/ui/button';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn } from '@/lib/utils';
import settings from '@/routes/settings';
import type { Children, Icon } from '@/types'



export type NavList = {
  label: string;
  url: string;
  icon?: Icon;
  position?: 'prefix' | 'prepend'
}

type Props = Children<{
  navList?: NavList[];
  backOptions: {
    label?: ReactNode;
    url: string;
  }
  showAside?: boolean;
  classNames?: {
    wrapper?: string;
    aside?: string;
    container?: string;
  }
}>

const defaultBackOptions = {
  label: "Back to general settings",
  url: settings.index().url
}

export default function ProviderSettingsLayout({ navList, backOptions = defaultBackOptions, children, classNames }: Props) {
  const { isCurrentUrl } = useCurrentUrl()

  return (
    <Container className="py-10 space-y-5">
      <Link href={backOptions.url} className="block">
        <Button variant="ghost" className="pl-0 hover:pl-4">
          <ArrowLeft />
          {backOptions?.label}
        </Button>
      </Link>

      <div className={cn("grid lg:grid-cols-5 gap-x-10", classNames?.wrapper)}>
        {
          navList && (
            <aside className={cn("bg-card rounded-xl p-5", classNames?.aside)}>
              <ul className="space-y-1">
                {
                  navList.map((item) => (
                    <li
                      key={item.label}
                    >
                      <Link
                        href={item.url}
                        className={cn(
                          "w-full inline-flex items-center gap-x-2 px-3 py-2.5 hover:bg-accent rounded-lg",
                          isCurrentUrl(item.url)
                            ? "bg-muted"
                            : ""
                        )}
                      >
                        {item?.icon && <item.icon className="size-5" />}
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </aside>
          )
        }

        <main className={cn("", !navList ? "lg:col-span-5" : "lg:col-span-4", classNames?.container)}>
          {children}
        </main>
      </div>
    </Container>
  )
}

