import type { InertiaFormProps } from '@inertiajs/react';
import { Checkbox } from '@/components/form/checkbox';
import { Input } from '@/components/form/input';
import { RadioGroup } from '@/components/form/radio';

export default function Operations({
  form,
}: {
  form: InertiaFormProps<Record<string, any>>;
}) {
  return (
    <div className="grid w-full gap-6 rounded-xl bg-card p-6 md:p-8">
      <Checkbox
        name="working_days"
        label="Select working days"
        description="How many days do you work within the week?"
        form={form}
        multiple
        options={[
          { label: 'Sunday', value: 'sunday' },
          { label: 'Monday', value: 'monday' },
          { label: 'Tuesday', value: 'tuesday' },
          { label: 'Wednesday', value: 'wednesday' },
          { label: 'Thurday', value: 'thursday' },
          { label: 'Friday', value: 'friday' },
          { label: 'Saturday', value: 'saturday' },
        ]}
        classNames={{
          container: 'flex flex-row gap-x-3',
          field: {
            label: 'text-xs',
          },
        }}
      />

      <div className="grid gap-5 lg:grid-cols-4">
        <Input name="opens_at" label="Opens at" type="time" form={form} />

        <Input name="closes_at" label="Closes at" type="time" form={form} />
      </div>

      <div className="w-1/2">
        <RadioGroup
          name="includes_holidays"
          label="Do you work on holidays?"
          // description="Indicate if you work on holidays"
          form={form}
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' },
          ]}
          className="flex"
          classNames={{
            label: 'mb-1',
            field: {},
          }}
        />
      </div>
    </div>
  );
}
