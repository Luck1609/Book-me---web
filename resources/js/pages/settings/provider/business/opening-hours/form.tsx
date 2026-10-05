import { useForm } from '@inertiajs/react';
// import { Edit, Save, X } from 'lucide-react';
// import { useEffect } from 'react';
import type {FormEvent } from 'react';
import { Checkbox } from '@/components/form/checkbox';
import { Input } from '@/components/form/input';
import SubmitButton from '@/components/form/submit-button';
import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import businessHours from '@/routes/business-hours';
import type { BusinessHour } from '@/types/app';
import { Button } from '@/components/ui/button';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// function inputTime(value: string | null): string {
//   return value?.slice(0, 5) ?? '';
// }

type Prop = {
  hours: BusinessHour[];
  toggler: () => void
};


// type BusinessHourForm = {
//   hours: {
//     id: string;
//     is_closed: boolean;
//     day_of_week: number | string;
//     opens_at: string;
//     closes_at: string;
//   }[]
// };


export default function BusinessHourEditor({
  hours,
  toggler
}: Prop) {
  // const [closedHours, setClosedHours] = useState(second)
  const form = useForm({
    hours: hours
  })//.withPrecognition(businessHours.update(hour.id));

  // const form = useForm<BusinessHourForm>({
  //   is_closed: false,
  //   day_of_week: '',
  //   opens_at: '',
  //   closes_at: '',
  // }).withPrecognition(businessHours.update(hour.id));

  // useEffect(() => {
  //   form.setData({
  //     is_closed: hour.is_closed,
  //     closes_at: inputTime(hour.closes_at),
  //     day_of_week: hour.day_of_week,
  //     opens_at: inputTime(hour.opens_at),
  //   });
  // }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // form.transform((data) => ({
    //   ...data,
    //   opens_at: inputTime(data.opens_at),
    //   closes_at: inputTime(data.closes_at),
    //   day_of_week: days[index],
    // }));

    // form.submit({
    //   onSuccess: () => {
    //     form.setData({
    //       opens_at: inputTime(form.data.opens_at),
    //       closes_at: inputTime(form.data.closes_at),
    //     });
    //   },
    // });
  };

console.log('Business hour form data', form.data)

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-5 space-y-3">
        {
          form.data.hours.map((hour, index: number) => (
            <div className="grid lg:grid-cols-5" key={index.toString()}>
              <div className="lg:col-span-3">
                <p className={cn("font-medium", hour.is_closed ? "text-red-500" : "text-green-500")}>
                  {hour.is_closed ? "Closed" : "Open"}
                </p>

                <Checkbox
                  name={`hours.${index}.is_closed`}
                  label={days[index]}
                  form={form}
                  classNames={{
                    field: {
                      wrapper:
                        'border-none has-data-[state=checked]:border-none has-data-[state=checked]:bg-transparent',
                    },
                  }}
                  isBoolean
                />
              </div>

              <div className="lg:col-span-2 grid gap-3 sm:grid-cols-2">
                <Input
                  name={`hours.${index}.opens_at`}
                  label="Opens at"
                  type="time"
                  form={form}
                  disabled={hour.is_closed}
                />

                <Input
                  name={`hours.${index}.closes_at`}
                  label="Closes at"
                  type="time"
                  form={form}
                  disabled={hour.is_closed}
                />
              </div>
            </div>
          ))
        }
      </div>


      <footer className="flex flex-col gap-3 border-t border-[#e7f0ec] bg-[#fbfcfa] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 dark:border-white/8 dark:bg-[#17221f]">
        <p className="text-xs text-[#91aaa2]">
          Changes update your public business profile immediately.
        </p>

        <div className="flex gap-3">
          <Button variant="destructive" onClick={toggler}>Cancel</Button>
          <SubmitButton
            form={form}
            label="Update working hours"
            className="rounded-xl bg-[#0f8a62] px-5 text-white shadow-[0_10px_22px_rgba(15,138,98,0.18)] hover:bg-[#0b7653]"
          />
        </div>
      </footer>
    </form>
  );
}
