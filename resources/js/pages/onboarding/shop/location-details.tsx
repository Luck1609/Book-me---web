import { usePage } from '@inertiajs/react';
import type { InertiaFormProps } from '@inertiajs/react';
import { useMemo } from 'react';
import { Input } from '@/components/form/input';
import { Select } from '@/components/form/select';
import { Textarea } from '@/components/form/textarea';
import type { SelectOptions } from '@/types';

export default function LocationDetails({
  form,
}: {
  form: InertiaFormProps<Record<string, any>>;
}) {
  const { regions } = usePage<{ regions: (SelectOptions & { districts: SelectOptions[] })[] }>().props

  const districts = useMemo(() => {
    return regions.filter(
      (region) => region.value === form.data.region_id
    )?.[0]?.['districts']
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.data.region_id])

  console.log('Region list', regions)
  console.log('District list', districts)

  return (
    <div className="grid w-full gap-6 rounded-xl bg-card p-6 md:p-8 lg:grid-cols-2">
      <Select
        name="region_id"
        label="Region"
        placeholder="Select region"
        form={form}
        options={regions}
      />

      <Select
        name="district_id"
        label="District"
        placeholder="Select district"
        form={form}
        options={districts ?? []}
      />

      <Input
        name="city"
        label="City/Town"
        placeholder="eg. Berekum"
        form={form}
      />

      <div className="lg:col-span-2">
        <Textarea
          name="address"
          label="Type in address"
          placeholder="eg. Berekum"
          form={form}
        />
      </div>
    </div>
  );
}
