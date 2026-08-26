import { useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useEffect } from 'react';
import type { FormEvent } from 'react';

import { Input } from '@/components/form/input';
import { Select } from '@/components/form/select';
import SubmitButton from '@/components/form/submit-button';
import { Textarea } from '@/components/form/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useNotice } from '@/contexts/notice-context';
import { store } from '@/routes/booking';

type BookingFormData = {
  client_name: string;
  client_email: string;
  service_id: string;
  duration_minutes: string;
  date: string;
  time: string;
  notes: string;
};

export type BookingService = {
  id: string;
  name: string;
  price: number;
  min_duration_minutes: number;
  max_duration_minutes: number;
};

type BookingFormProps = {
  services?: BookingService[];
};

export default function BookingForm({ services = [] }: BookingFormProps) {
  const { hide } = useNotice();
  const form = useForm<BookingFormData>({
    client_name: '',
    client_email: '',
    service_id: '',
    duration_minutes: '',
    date: '',
    time: '',
    notes: '',
  }).withPrecognition(store());

  const selectedService = services.find(
    (service) => service.id === form.data.service_id,
  );
  const durationOptions = selectedService
    ? Array.from(
        {
          length:
            Math.ceil(
              (selectedService.max_duration_minutes -
                selectedService.min_duration_minutes) /
                15,
            ) + 1,
        },
        (_, index) =>
          Math.min(
            selectedService.min_duration_minutes + index * 15,
            selectedService.max_duration_minutes,
          ),
      )
        .filter(
          (minutes, index, durations) => durations.indexOf(minutes) === index,
        )
        .map((minutes) => ({
          label: `${minutes} minutes`,
          value: String(minutes),
        }))
    : [];

  useEffect(() => {
    if (!selectedService) {
      return;
    }

    const currentDuration = Number(form.data.duration_minutes);
    const durationIsValid =
      currentDuration >= selectedService.min_duration_minutes &&
      currentDuration <= selectedService.max_duration_minutes;

    if (!durationIsValid) {
      form.setData(
        'duration_minutes',
        String(selectedService.min_duration_minutes),
      );
    }
  }, [form, form.data.duration_minutes, selectedService]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    form.post(store().url, {
      preserveScroll: true,
      onSuccess: () => {
        form.reset();
        hide();
      },
    });
  };

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          name="client_name"
          label="Client name"
          placeholder="e.g. Jordan Lee"
          autoComplete="name"
          required
          form={form}
        />
        <Input
          name="client_email"
          label="Client email"
          type="email"
          placeholder="jordan@example.com"
          autoComplete="email"
          required
          form={form}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
        <Select
          name="service_id"
          label="Service"
          placeholder={
            services.length > 0 ? 'Choose a service' : 'Add a service first'
          }
          options={services.map((service) => ({
            label: service.name,
            value: service.id,
          }))}
          form={form}
        />
        <Select
          name="duration_minutes"
          label="Duration"
          options={durationOptions}
          form={form}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input name="date" label="Date" type="date" required form={form} />
        <Input
          name="time"
          label="Start time"
          type="time"
          required
          form={form}
        />
      </div>

      <div className="grid gap-1.5">
        <Textarea
          name="notes"
          label={
            <Label htmlFor="notes">
              Notes{' '}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </Label>
          }
          placeholder="Add anything you or the client should remember."
          form={form}
          rows={5}
        />
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-[#e7f0ec] pt-5 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={hide}>
          Cancel
        </Button>
        <SubmitButton
          form={form}
          label="Create booking"
          disabled={services.length === 0}
        />
      </div>
    </form>
  );
}

export const OpenBookingForm = ({ services = [] }: BookingFormProps) => {
  const { show } = useNotice();

  const handleShow = () => {
    show({
      type: 'modal',
      title: 'Create a new booking',
      description: 'Add a client appointment to your schedule.',
      modalType: 'default',
      classNames: {
        content: 'sm:max-w-2xl',
      },
      content: <BookingForm services={services} />,
    });
  };

  return (
    <Button onClick={handleShow}>
      <Plus aria-hidden="true" />
      New booking
    </Button>
  );
};
