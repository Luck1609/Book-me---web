import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

import { Select } from '@/components/form/select';
import SubmitButton from '@/components/form/submit-button';
import { Button } from '@/components/ui/button';
import { useNotice } from '@/contexts/notice-context';
import { ServiceFields } from '@/pages/onboarding/shop/service';
import type { ServiceFormData } from '@/pages/onboarding/types';
import settings from '@/routes/settings';
import type { ProviderCategory, ServiceRecord } from '@/types/app';

type Props = {
  service?: ServiceRecord;
  categories?: ProviderCategory[];
};

const emptyService: ServiceFormData = {
  image: null,
  name: '',
  price: '',
  min_duration: '',
  max_duration: '',
  description: '',
  category_id: '',
};

export default function ServiceForm({ service, categories = [] }: Props) {
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
            category_id: service.category_id ?? '',
          }
        : emptyService,
    ],
  }).withPrecognition(
    !service ? settings.catalog.store() : settings.catalog.update(service?.id),
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if (service) {
    //   form.transform((data) => ({ ...data.services[0] }))

    //   form.submit({
    //       forceFormData: true,
    //       preserveScroll: true,
    //       onSuccess: hide,
    //     });

    //   return;
    // }

    form.transform((data) => ({ ...data.services[0] }));

    form.submit({
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

      {categories.length > 0 && (
        <Select
          name="services.0.category_id"
          label="Service category"
          placeholder="Choose a category"
          form={form}
          options={categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
        />
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-[#e7f0ec] pt-5 sm:flex-row sm:justify-end dark:border-white/8">
        <Button type="button" variant="outline" onClick={hide}>
          Cancel
        </Button>
        <SubmitButton
          form={form}
          label={service ? 'Save changes' : 'Add service'}
        />
      </div>
    </form>
  );
}
