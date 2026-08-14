import type { InertiaFormProps } from '@inertiajs/react';
import FileUploader from '@/components/form/file-uploader';
import { Input } from '@/components/form/input';
import { Select } from '@/components/form/select';
import { Textarea } from '@/components/form/textarea';

export default function BasicInfo({ form }: {form: InertiaFormProps}) {
  return (
    <main className="w-full">

      {/* <div className="mb-stack-lg">
        <h1 className="mb-stack-sm font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg">
          Set up your shop profile
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Tell us a bit about your business to help clients find you and
          understand what you offer.
        </p>
      </div> */}

      <div
        className="space-y-stack-md rounded-xl border border-surface-container-highest bg-surface-container-lowest p-6 md:p-8"
      >
        <FileUploader
          name="avatar"
          label="Upload profile picture"
          form={form}
        />


        <div className="grid lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2">
            <Input name="name" label="Shop Name" placeholder="e.g. The Craft Barbershop" form={form} />
          </div>

          <Select
            name="category"
            label="Business category"
            placeholder="Select category"
            form={form}
            options={[
              {label: "Barbershop", value: "barber"},
              {label: "Hair Salon", value: "salon"},
              {label: "Spa &amp; Wellness", value: "spa"},
              {label: "Tattoo Studio", value: "tattoo"},
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

    </main>
  );
}
