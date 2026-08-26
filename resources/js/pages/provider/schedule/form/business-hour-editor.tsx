import { useForm } from '@inertiajs/react';
import { Edit, Save, X } from 'lucide-react';
import { useEffect } from 'react';
import type { FormEvent } from 'react';
import { Checkbox } from '@/components/form/checkbox';
import { Input } from '@/components/form/input';
import { Button } from '@/components/ui/button';
import businessHours from '@/routes/business-hours';
import SubmitButton from '@/components/form/submit-button';

export type BusinessHour = {
  id: string;
  day_of_week: number;
  is_closed: boolean;
  opens_at: string | null;
  closes_at: string | null;
};

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function inputTime(value: string | null): string {
  return value?.slice(0, 5) ?? '';
}

type Prop = {
  hour: BusinessHour;
  index: number;
  edit: boolean;
  toggle: (index?: number) => void;
};

type BusinessHourForm = {
  is_closed: boolean;
  day_of_week: number | string;
  opens_at: string;
  closes_at: string;
};

export default function BusinessHourEditor({
  hour,
  index,
  edit,
  toggle,
}: Prop) {
  const form = useForm<BusinessHourForm>({
    is_closed: false,
    day_of_week: '',
    opens_at: '',
    closes_at: '',
  }).withPrecognition(businessHours.update(hour.id));

  useEffect(() => {
    form.setData({
      is_closed: hour.is_closed,
      closes_at: inputTime(hour.closes_at),
      day_of_week: hour.day_of_week,
      opens_at: inputTime(hour.opens_at),
    });
  }, [hour]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    form.transform((data) => ({
      ...data,
      opens_at: inputTime(data.opens_at),
      closes_at: inputTime(data.closes_at),
      day_of_week: days[index],
    }));
    form.submit({
      onSuccess: () => {
        form.setData({
          opens_at: inputTime(form.data.opens_at),
          closes_at: inputTime(form.data.closes_at),
        })

        toggle()
      }
    });
  };

  const handleToggle = () => {
    form.reset();
    toggle();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 lg:grid-cols-[minmax(9rem,1fr)_minmax(16rem,2fr)_auto] lg:items-end"
    >
      <div className="">
        <p className="font-medium">{days[index]}</p>
        <Checkbox
          name="is_closed"
          label="Closed"
          form={form}
          classNames={{
            field: {
              wrapper:
              'border-none has-data-[state=checked]:border-none has-data-[state=checked]:bg-background',
            },
          }}
          isBoolean
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          name="opens_at"
          label="Opens at"
          type="time"
          form={form}
          disabled={form.data.is_closed || !edit}
        />
        <Input
          name="closes_at"
          label="Closes at"
          type="time"
          form={form}
          disabled={form.data.is_closed || !edit}
        />
      </div>

      <div className="flex items-center gap-2 lg:justify-end">
        {!edit ? (
            <Button className="h-10" onClick={() => toggle(index)}>
              <Edit />
              Edit
            </Button>
          ) : (
          <>
            <Button size="icon" variant="destructive" onClick={handleToggle}>
              <X />
            </Button>

            <SubmitButton
              form={form}
              label={<Save />}
              size="icon"
              isIconButton
            />
          </>
          )}
        </div>
      </form>
      );
}
