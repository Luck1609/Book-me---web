import type { InertiaFormProps } from '@inertiajs/react'
import { Input } from '@/components/form/input'
import { Select } from '@/components/form/select'
import { Textarea } from '@/components/form/textarea'

export default function LocationDetails({ form }: { form: InertiaFormProps }) {
  return (
    <div className="w-full bg-card p-6 md:p-8 rounded-xl grid lg:grid-cols-2 gap-6">
      <Select
        name="region_id"
        label="Region"
        placeholder="Select region"
        form={form}
        options={[
          { label: "Barbershop", value: "barber" },
          { label: "Hair Salon", value: "salon" },
          { label: "Spa &amp; Wellness", value: "spa" },
          { label: "Tattoo Studio", value: "tattoo" },
        ]}
      />

      <Select
        name="district_id"
        label="District"
        placeholder="Select district"
        form={form}
        options={[
          { label: "Barbershop", value: "barber" },
          { label: "Hair Salon", value: "salon" },
          { label: "Spa &amp; Wellness", value: "spa" },
          { label: "Tattoo Studio", value: "tattoo" },
        ]}
      />


      <Input name="city" label="City/Town" placeholder="eg. Berekum" form={form} />

      <div className="lg:col-span-2">
        <Textarea name="address" label="Type in address" placeholder="eg. Berekum" form={form} />
      </div>
    </div>
  )
}

