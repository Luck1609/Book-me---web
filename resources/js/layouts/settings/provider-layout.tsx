import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import Container from '@/components/container';
import { Button } from '@/components/ui/button';
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
}>

const defaultList = [
  { label: "Item 1", url: "", },
  { label: "Item 2", url: "", },
  { label: "Item 3", url: "", },
  { label: "Item 4", url: "", },
  { label: "Item 5", url: "", },
]

const defaultBackOptions = {
  label: "Back",
  url: settings.index().url
}

export default function ProviderSettingsLayout({ navList, backOptions = defaultBackOptions, children }: Props) {
  return (
    <Container className="py-10 space-y-5">
      <Link href={backOptions.url} className="block">
        <Button variant="outline">
          <ArrowLeft />
          {backOptions?.label}
        </Button>
      </Link>

      <div className="grid lg:grid-cols-5 gap-x-10">
        {
          navList && (
            <aside className="bg-card rounded-xl p-2">
              <ul className="space-y-1">
                {
                  navList.map((item) => (
                    <li className="p-2 pl-5 hover:bg-accent rounded-lg" key={item.label}>{item.label}</li>
                  ))
                }
              </ul>
            </aside>
          )
        }

        <main className="lg:col-span-4">
          {children}
        </main>
      </div>
    </Container>
  )
}

