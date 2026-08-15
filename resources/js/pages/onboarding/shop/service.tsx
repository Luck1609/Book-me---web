import type { InertiaFormProps } from '@inertiajs/react';
import FileUploader from '@/components/form/file-uploader';
import { Input } from '@/components/form/input';
import { Textarea } from '@/components/form/textarea';

export default function Service({
  form,
}: {
  form: InertiaFormProps<Record<string, any>>;
}) {
  return (
    <div className="relative grid w-full gap-y-6 rounded-xl bg-card p-8">
      <div className="w-1/2">
        <FileUploader
          name="services.0.image"
          label="Sample picture"
          form={form}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Input
            name="services.0.name"
            label="Service name"
            placeholder="eg. Premium haircut"
            form={form}
          />
        </div>
        <Input
          name="services.0.price"
          type="number"
          label="Service price"
          placeholder="eg. 25"
          form={form}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Input
          name="services.0.min_duration"
          label="Minimum duration"
          placeholder="eg. 30 (mins)"
          form={form}
        />
        <Input
          name="services.0.max_duration"
          label="Maximum duration"
          placeholder="eg. 50 (mins)"
          form={form}
        />
      </div>

      <Textarea
        name="services.0.description"
        label="Service description"
        placeholder="Type in you shop description"
        form={form}
      />
    </div>
  );
}
