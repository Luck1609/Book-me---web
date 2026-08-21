import type { InertiaFormProps } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import FileUploader from '@/components/form/file-uploader';
import { Input } from '@/components/form/input';
import { Textarea } from '@/components/form/textarea';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';
import type { OnboardingFormData } from '../types';


type Props = {
  form: InertiaFormProps<Pick<OnboardingFormData, "services">>
}

export default function Service({ form }: Props) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)


  useEffect(() => {
    setCount(form.data.services.length)
  }, [form.data.services])

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const handleAddMore = () => {
    form.setData("services", [
      ...form.data.services,
      {
        image: null,
        name: '',
        price: 0,
        min_duration: '',
        max_duration: '',
        description: '',
      },
    ]
    )
  }

  return (
    <div className="px-8">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {
            Array.from({ length: form.data.services.length }, (_, i) => {
              return (
                <CarouselItem key={i.toString()}>
                  <Form form={form} index={i} />
                </CarouselItem>
              )
            })
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="grid lg:grid-cols-2 items-center mt-8">

        <div className="font-semibold text-primary text-sm">Service {current} out of {count}</div>

        <div className="flex gap-3 justify-end">
          <Button variant="default-soft" onClick={handleAddMore}>
            <Plus /> Add more services
          </Button>

          {
            form.data.services.length > 1 && (
              <Button variant="destructive" onClick={handleAddMore}>
                <Trash2 /> Delete service
              </Button>
            )
          }
        </div>
      </div>
    </div>
  );
}


const Form = ({ form, index }: Props & { index: number }) => {
  return (
    <div className="relative grid w-full gap-y-6 rounded-xl bg-card px-5">
      <div className="w-1/2">
        <FileUploader
          name={`services.${index}.image`}
          label="Sample picture"
          form={form}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Input
            name={`services.${index}.name`}
            label="Service name"
            placeholder="eg. Premium haircut"
            form={form}
          />
        </div>
        <Input
          name={`services.${index}.price`}
          type="number"
          label="Service price"
          placeholder="eg. 25"
          form={form}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Input
          name={`services.${index}.min_duration`}
          label="Minimum duration"
          placeholder="eg. 30 (mins)"
          form={form}
        />
        <Input
          name={`services.${index}.max_duration`}
          label="Maximum duration"
          placeholder="eg. 50 (mins)"
          form={form}
        />
      </div>

      <Textarea
        name={`services.${index}.description`}
        label="Service description"
        placeholder="Type in you shop description"
        form={form}
      />
    </div>
  )
}
