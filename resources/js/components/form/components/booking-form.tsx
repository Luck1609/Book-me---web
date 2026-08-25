import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

import { Input } from '@/components/form/input';
import { Select } from '@/components/form/select';
import SubmitButton from '@/components/form/submit-button';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useNotice } from '@/contexts/notice-context';
import { show, store } from '@/routes/booking';
import { Textarea } from '@/components/form/textarea';
import { Plus } from 'lucide-react';

type BookingFormData = {
  client_name: string;
  client_email: string;
  service: string;
  duration: string;
  date: string;
  time: string;
  notes: string;
};

const serviceOptions = [
  {
    label: 'Traditional Hot Towel Shave',
    value: 'Traditional Hot Towel Shave',
  },
  { label: 'Style Consultation & Trim', value: 'Style Consultation & Trim' },
  {
    label: 'Beard Sculpting & Oil Treatment',
    value: 'Beard Sculpting & Oil Treatment',
  },
  { label: 'Signature Fade & Lineup', value: 'Signature Fade & Lineup' },
  { label: 'Premium Cut & Finish', value: 'Premium Cut & Finish' },
];

const durationOptions = [
  { label: '30 minutes', value: '30' },
  { label: '45 minutes', value: '45' },
  { label: '60 minutes', value: '60' },
  { label: '75 minutes', value: '75' },
  { label: '90 minutes', value: '90' },
];

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-sm text-red-500">{message}</p> : null;
}

export default function BookingForm() {
  const { hide } = useNotice();
  const form = useForm<BookingFormData>({
    client_name: '',
    client_email: '',
    service: '',
    duration: '60',
    date: '',
    time: '',
    notes: '',
  });

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
          name="service"
          label="Service"
          placeholder="Choose a service"
          options={serviceOptions}
          form={form}
        />
        <Select
          name="duration"
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
              <span className="font-normal text-muted-foreground">(optional)</span>
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
          className="rounded-xl bg-[#0f8a62] text-white hover:bg-[#0d7955]"
        />
      </div>
    </form>
    );
}


export const OpenBookingForm = () => {
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
      content: <BookingForm />,
    });
  }

  return (
    <Button onClick={handleShow}>
      <Plus aria-hidden="true" />
      New booking
    </Button>
    )
};