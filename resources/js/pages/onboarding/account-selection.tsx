import type { InertiaFormProps } from '@inertiajs/react';
import { User, Store } from 'lucide-react';
import { Checkbox } from '@/components/form/checkbox';
import { cn } from '@/lib/utils';

export default function AccountSelection({
  form,
}: {
  form: InertiaFormProps<Record<string, any>>;
}) {
  return (
    <>
      <Checkbox
        name="type"
        form={form}
        options={[
          {
            label: (
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary',
                    form.data.type === 'client' ? 'bg-primary/10' : '',
                  )}
                >
                  <User aria-hidden="true" className="size-8" />
                </div>
                <h2 className="mb-2 text-center font-md text-md text-primary">
                  I am a Client
                </h2>
              </div>
            ),
            value: 'client',
            description:
              'I want to browse services, book appointments, and manage my care plan.',
          },
          {
            label: (
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary',
                    form.data.type === 'provider' ? 'bg-primary/10' : '',
                  )}
                >
                  <Store aria-hidden="true" className="size-8" />
                </div>
                <h2 className="mb-2 text-center font-md text-md text-primary">
                  I am a Service Provider
                </h2>
              </div>
            ),
            value: 'provider',
            description:
              'I want to list my services, manage bookings, and connect with clients.',
          },
        ]}
        classNames={{
          container: 'flex flex-row gap-5',
          field: {
            wrapper: 'bg-card lg:p-8',
            container: 'p-0! bg-overflow-hidden',
            label: 'overflow-hidden border-none',
            description: 'text-center text-sm',
          },
        }}
      />
    </>
  );
}
