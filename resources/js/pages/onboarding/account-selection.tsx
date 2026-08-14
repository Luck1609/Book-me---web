import type { InertiaFormProps } from '@inertiajs/react'
import { User, Store } from 'lucide-react'
import { Checkbox } from '@/components/form/checkbox'

export default function AccountSelection({ form }: {form: InertiaFormProps}) {
  return (
    <div>
      <Checkbox
        name="type"
        form={form}
        options={[
          {
            label: <div className="flex flex-col items-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
                <User aria-hidden="true" className="size-8" />
              </div>
              <h2 className="mb-2 font-headline-md text-headline-md text-primary text-center">
                I am a Client
              </h2>
            </div>,
            value: "client",
            description: "I want to browse services, book appointments, and manage my care plan."
          },
          {
            label: <div className="flex flex-col items-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
                <Store aria-hidden="true" className="size-8" />
              </div>
              <h2 className="mb-2 font-headline-md text-headline-md text-primary text-center">
                I am a Service Provcider
              </h2>
            </div>,
            value: "provider",
            description: "I want to list my services, manage bookings, and connect with clients."
          },
        ]}
        classNames={{
          wrapper: "flex flex-row",
          field: {
            container: "bg-card p-8! border rounded-xl",
            description: "text-center text-sm border-red-300"
          }
        }}
      />
    </div>
  )
}

