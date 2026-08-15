import type { InertiaFormProps } from '@inertiajs/react';
import FileUploader from '@/components/form/file-uploader';
import { Input } from '@/components/form/input';
import { Select } from '@/components/form/select';
import { Textarea } from '@/components/form/textarea';

export default function BasicInfo({
  form,
}: {
  form: InertiaFormProps<Record<string, any>>;
}) {
  return (
    <div className="relative grid w-full gap-y-6 rounded-xl bg-card p-6 lg:p-8">
      <div className="w-1/2">
        <FileUploader
          name="avatar"
          label="Upload profile picture"
          form={form}
        />
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Input
            name="name"
            label="Shop Name"
            placeholder="e.g. The Craft Barbershop"
            form={form}
          />
        </div>

        <Select
          name="category_id"
          label="Business category"
          placeholder="Select category"
          form={form}
          options={[
            { label: 'Barbershop', value: 'barber' },
            { label: 'Hair Salon', value: 'salon' },
            { label: 'Spa &amp; Wellness', value: 'spa' },
            { label: 'Tattoo Studio', value: 'tattoo' },
          ]}
        />
      </div>

      <Textarea
        name="description"
        label="Shop description"
        placeholder="Describe your shop's vibe, specialties, and what makes you unique..."
        form={form}
        rows={5}
      />
    </div>
  );
}
