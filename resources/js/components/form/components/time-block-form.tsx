import { useForm } from '@inertiajs/react';
import type { FormEvent, ReactNode } from 'react';

import { Input } from '@/components/form/input';
import { Select } from '@/components/form/select';
import SubmitButton from '@/components/form/submit-button';
import { Textarea } from '@/components/form/textarea';
import { Button } from '@/components/ui/button';
import { useNotice } from '@/contexts/notice-context';
import availabilityBlocks from '@/routes/availability-blocks';

export type TimeBlockType = 'break' | 'time_off';

type TimeBlockFormData = {
  type: TimeBlockType;
  starts_at: string;
  ends_at: string;
  reason: string;
};

type TimeBlockFormProps = {
  initialType?: TimeBlockType;
  onCancel?: () => void;
};

const typeOptions = [
  { label: 'Break', value: 'break' },
  { label: 'Time off', value: 'time_off' },
];

function TimeBlockForm({ initialType = 'break', onCancel }: TimeBlockFormProps) {
  const { hide } = useNotice();
  const form = useForm<TimeBlockFormData>({
    type: initialType,
    starts_at: '',
    ends_at: '',
    reason: '',
  });

  const handleCancel = () => {
    onCancel?.();
    hide();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    form.post(availabilityBlocks.store().url, {
      preserveScroll: true,
      onSuccess: () => {
        form.reset();
        handleCancel();
      },
    });
  };

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <Select
        name="type"
        label="Block type"
        options={typeOptions}
        form={form}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          name="starts_at"
          label="Starts"
          type="datetime-local"
          required
          form={form}
        />
        <Input
          name="ends_at"
          label="Ends"
          type="datetime-local"
          required
          form={form}
        />
      </div>

      <Textarea
        name="reason"
        label="Reason"
        placeholder="Add a note for your calendar."
        rows={4}
        form={form}
      />

      <div className="flex flex-col-reverse gap-3 border-t border-[#e7f0ec] pt-5 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <SubmitButton
          form={form}
          label="Save time block"
          className="rounded-xl bg-[#0f8a62] text-white hover:bg-[#0d7955]"
        />
      </div>
    </form>
  );
}

type OpenTimeBlockFormProps = {
  initialType?: TimeBlockType;
  buttonLabel?: string;
  className?: string;
  children?: ReactNode;
  description?: string;
  title?: string;
};

export function OpenTimeBlockForm({
  initialType = 'break',
  buttonLabel = 'Add time block',
  className,
  children,
  description = 'Protect time in your calendar from new bookings.',
  title = 'Add a time block',
}: OpenTimeBlockFormProps) {
  const { show } = useNotice();

  const handleShow = () => {
    show({
      type: 'modal',
      title,
      description,
      modalType: 'default',
      classNames: {
        content: 'sm:max-w-xl',
      },
      content: <TimeBlockForm initialType={initialType} />,
    });
  };

  if (children) {
    return (
      <button type="button" className={className} onClick={handleShow}>
        {children}
      </button>
    );
  }

  return (
    <Button type="button" className={className} onClick={handleShow}>
      {buttonLabel}
    </Button>
  );
}

export default TimeBlockForm;
