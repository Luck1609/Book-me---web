import type { InertiaFormProps } from '@inertiajs/react'
import { Input } from '@/components/form/input'
import { Textarea } from '@/components/form/textarea'
import FileUploader from '@/components/form/file-uploader'

export default function Service({ form }: { form: InertiaFormProps }) {
  return (
    <div className="w-full grid gap-y-6 bg-card relative p-8 rounded-xl">
      <div className="w-1/2">
        <FileUploader name="image" label="Sample picture" form={form} />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <Input name="name" label="Service name" placeholder="eg. Premium haircut" form={form} />
        </div>
        <Input name="price" type="number" label="Service name" placeholder="eg. Premium haircut" form={form} />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Input name="min_duration" label="Minimum duration" placeholder="eg. 30 (mins)" form={form} />
        <Input name="max_duration" label="Maximum duration" placeholder="eg. 50 (mins)" form={form} />
      </div>

      <Textarea name="description" label="Service description" placeholder="Type in you shop description" form={form} />
    </div>
  )
}

