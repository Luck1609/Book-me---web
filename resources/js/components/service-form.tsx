import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

import SubmitButton from '@/components/form/submit-button';
import { Button } from '@/components/ui/button';
import { useNotice } from '@/contexts/notice-context';
import { ServiceFields } from '@/pages/onboarding/shop/service';
import type { ServiceFormData } from '@/pages/onboarding/types';
import { store, update } from '@/routes/services';

export type ServiceRecord = {
  id: string;
  name: string;
  description: string | null;
  price: string | number;
  min_duration: number;
  max_duration: number;
  is_active: boolean;
  image: string | null;
};

type Props = {
  service?: ServiceRecord;
};

const emptyService: ServiceFormData = {
  image: null,
  name: '',
  price: '',
  min_duration: '',
  max_duration: '',
  description: '',
};

export default function ServiceForm({ service }: Props) {
  const { hide } = useNotice();
  const form = useForm<{ services: ServiceFormData[] }>({
    services: [
      service
        ? {
            ...emptyService,
            name: service.name,
            price: service.price,
            min_duration: service.min_duration.toString(),
            max_duration: service.max_duration.toString(),
            description: service.description ?? '',
          }
        : emptyService,
    ],
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (service) {
      form
        .transform((data) => ({ ...data.services[0], _method: 'PUT' }))
        .post(update.url(service.id), {
          forceFormData: true,
          preserveScroll: true,
          onSuccess: hide,
        });

      return;
    }

    form
      .transform((data) => ({ ...data.services[0] }))
      .post(store.url(), {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: hide,
      });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <ServiceFields
        form={form}
        index={0}
        animation={null}
        onAnimationComplete={() => {}}
      />

      <div className="flex flex-col-reverse gap-3 border-t border-[#e7f0ec] pt-5 sm:flex-row sm:justify-end dark:border-white/8">
        <Button type="button" variant="outline" onClick={hide}>
          Cancel
        </Button>
        <SubmitButton
          form={form}
          label={service ? 'Save changes' : 'Add service'}
          className="rounded-xl bg-[#0f8a62] text-white hover:bg-[#0d7955]"
        />
      </div>
    </form>
  );
}
