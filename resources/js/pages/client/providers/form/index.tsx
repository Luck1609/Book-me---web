/* eslint-disable react-hooks/exhaustive-deps */
import { useForm, useHttp } from '@inertiajs/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { store } from '@/actions/App/Http/Controllers/Client/BookingController';
import SubmitButton from '@/components/form/submit-button';
import { Button } from '@/components/ui/button';
import { useNotice } from '@/contexts/notice-context';
import { availability } from '@/routes/client/providers';
import type { ServiceProvider, ServiceRecord } from '@/types/app';
import ProviderCalendar from './calendar';
import ProviderNotes from './notes';
import ProviderServices from './services';
import ProviderSlots from './slots';
import type {
  AvailabilityResponse,
  AvailabilityResult,
  BookingFormData,
} from './types';

type Props = {
  provider: ServiceProvider;
  // businessHours: BusinessHour[];
  service?: ServiceRecord;
};

const TOTAL_STEPS = 4;

export default function ClientBookingForm({
  provider,
  service,
}: Props) {
  const { hide } = useNotice();

  const [step, setStep] = useState(1);
  const [stepError, setStepError] = useState('');

  const [availabilityResult, setAvailabilityResult] = useState<AvailabilityResult>({
    date: '',
    slots: [],
  });

  const availabilityQuery = useHttp<{ service_id: string; date: string }, AvailabilityResponse>({
    service_id: service?.id ?? '',
    date: '',
  }).withPrecognition(availability(provider.slug));

  const form = useForm<BookingFormData>({
    provider_profile_id: provider.id,
    service_id: service?.id ?? "",
    date: '',
    time: '',
    notes: '',
  }).withPrecognition(store());

  const selectedService = provider.services.find(
    (providerService) => providerService.id === form.data.service_id,
  );


  const availableSlots = availabilityResult.date === form.data.date
    ? availabilityResult.slots
    : [];

  const slotError = availabilityResult.date === form.data.date
    ? availabilityResult.error
    : undefined;

  useEffect(() => {
    if (!form.data.date || !form.data.service_id) {
      return;
    }

    let isCurrentRequest = true;

    availabilityQuery.transform((data) => ({
      ...data,
      service_id: form.data.service_id ?? service?.id,
      date: form.data.date
    }))

    availabilityQuery.submit({
      onSuccess: (response) => {
        if (isCurrentRequest) {
          setAvailabilityResult({
            date: form.data.date,
            slots: response.slots,
          });
        }
      },
      onError: () => {
        if (isCurrentRequest) {
          setAvailabilityResult({
            date: form.data.date,
            slots: [],
            error: 'We could not load availability. Please try again.',
          });
        }
      },
    })

    return () => {
      isCurrentRequest = false;
      availabilityQuery.cancel();
    };
  }, [
    form.data.service_id,
    form.data.date
  ]);

  const handleNext = (): void => {
    setStepError('');

    if (step === 1 && !form.data.service_id) {
      setStepError('Choose a service to continue.');

      return;
    }

    if (step === 2 && !form.data.date) {
      setStepError('Choose a date to continue.');

      return;
    }

    if (step === 3 && !form.data.time) {
      setStepError('Choose an available time slot to continue.');

      return;
    }

    setStep((currentStep) => Math.min(currentStep + 1, TOTAL_STEPS));
  };

  const handleBack = (): void => {
    setStepError('');
    setStep((currentStep) => Math.max(currentStep - 1, 1));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    form.submit({
      preserveScroll: true,
      onSuccess: () => {
        form.reset();
        hide();
      },
    });
  };

  console.log('Provider details', provider)

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold tracking-[0.14em] text-[#70908a] uppercase">
            Step {step} of {TOTAL_STEPS}
          </p>
          <h2 className="mt-1 text-xl font-bold text-[#17343c] dark:text-white">
            {stepTitle(step)}
          </h2>
        </div>
        <div
          className="flex gap-1.5"
          aria-label={`Step ${step} of ${TOTAL_STEPS}`}
        >
          {Array.from({ length: TOTAL_STEPS }, (_, index) => (
            <span
              key={index}
              aria-hidden="true"
              className={`h-1.5 w-8 rounded-full ${index < step ? 'bg-[#0f8a62]' : 'bg-[#dceae4] dark:bg-white/15'}`}
            />
          ))}
        </div>
      </div>

      {step === 1 && (
        <ProviderServices
          form={form}
          provider={provider}
          clearStepError={() => setStepError('')}
        />
      )}

      {step === 2 && (
        <ProviderCalendar
          form={form}
          businessHours={provider.businessHours}
          clearStepError={() => setStepError('')}
        />
      )}

      {step === 3 && (
        <ProviderSlots
          form={form}
          availableSlots={availableSlots}
          availabilityProcessing={availabilityQuery.processing}
          slotError={slotError}
          clearStepError={() => setStepError('')}
        />
      )}

      {step === 4 && (
        <ProviderNotes form={form} selectedService={selectedService} />
      )}

      {stepError && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {stepError}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-[#e7f0ec] pt-5 sm:flex-row sm:justify-between dark:border-white/10">
        {step > 1 ? (
          <Button type="button" variant="outline" onClick={handleBack}>
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back
          </Button>
        ) : (
          <span />
        )}
        {step < TOTAL_STEPS ? (
          <Button
            type="button"
            onClick={handleNext}
            disabled={provider.services.length === 0}
          >
            Continue
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        ) : (
          <SubmitButton form={form} label="Request booking" />
        )}
      </div>
    </form>
  );
}

function stepTitle(step: number): string {
  return ['Choose a service', 'Pick a date', 'Select a time', 'Almost there'][
    step - 1
  ];
}
