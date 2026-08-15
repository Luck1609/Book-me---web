import { Head, useForm } from '@inertiajs/react';
import type { InertiaFormProps } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import SubmitButton from '@/components/form/submit-button';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import AccountSelection from './account-selection';
import BasicInfo from './shop/basic-info';
import LocationDetails from './shop/location-details';
import Operations from './shop/operation';
import Service from './shop/service';
import ShopSetupSuccessful from './shop/success';

const formSteps: { title: string; description: string }[] = [
  {
    title: 'How will you use the application?',
    description: 'Select your primary role to customize your experience.',
  },
  {
    title: 'What do you do?',
    description: 'Provide these information about your outfit',
  },
  {
    title: 'Where is you outfit located?',
    description:
      'Detailed description helps clients to reach you without difficulty',
  },
  {
    title: 'What time do you work?',
    description: 'This helps clients know when to book appointments',
  },
  {
    title: 'What services do you provide?',
    description: 'List of all the services you provide at your outfit',
  },
];

type ServiceFormData = {
  image: File | null;
  name: string;
  price: number | string;
  min_duration: string;
  max_duration: string;
  description: string;
};

type OnboardingFormData = {
  type: string;
  avatar: File | null;
  name: string;
  category_id: string;
  description: string;
  region_id: string;
  district_id: string;
  city: string;
  address: string;
  working_days: string[];
  opens_at: string;
  closes_at: string;
  includes_holidays: string;
  services: ServiceFormData[];
};

enum NavAction {
  INCRMENT = 'increment',
  DECRMENT = 'decrement',
}

export default function OnboardingForm() {
  const [step, setStep] = useState(0);
  const form = useForm<OnboardingFormData>({
    type: '',

    avatar: null,
    name: '',
    category_id: '',
    description: '',

    region_id: '',
    district_id: '',
    city: '',
    address: '',

    working_days: [],
    opens_at: '',
    closes_at: '',
    includes_holidays: '',

    services: [
      {
        image: null,
        name: '',
        price: 0,
        min_duration: '',
        max_duration: '',
        description: '',
      },
    ],
  });

  const hasValue = (value: unknown): boolean => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }

    if (typeof value === 'string') {
      return value.trim().length > 0;
    }

    return value !== null && value !== undefined;
  };

  const isStepValid = (currentStep: number): boolean => {
    switch (currentStep) {
      case 0:
        return hasValue(form.data.type);
      case 1:
        return [
          form.data.name,
          form.data.category_id,
          form.data.description,
        ].every(hasValue);
      case 2:
        return [
          form.data.region_id,
          form.data.district_id,
          form.data.city,
          form.data.address,
        ].every(hasValue);
      case 3:
        return (
          hasValue(form.data.working_days) &&
          hasValue(form.data.opens_at) &&
          hasValue(form.data.closes_at) &&
          (form.data.includes_holidays === '0' ||
            form.data.includes_holidays === '1')
        );
      case 4: {
        const service = form.data.services[0];

        if (!service) {
          return false;
        }

        const price = Number(service.price);
        const minimumDuration = Number(service.min_duration);
        const maximumDuration = Number(service.max_duration);

        return (
          [
            service.name,
            service.price,
            service.min_duration,
            service.max_duration,
            service.description,
          ].every(hasValue) &&
          price > 0 &&
          minimumDuration > 0 &&
          maximumDuration >= minimumDuration
        );
      }
      default:
        return false;
    }
  };

  const canContinue = isStepValid(step);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    form.submit();
  };

  const handleNavigation = (action: NavAction) => {
    if (action === NavAction.INCRMENT) {
      if (!canContinue) {
        return;
      }

      setStep((currentStep) => currentStep + 1);
    }

    if (action === NavAction.DECRMENT) {
      if (step === 0) {
        return;
      }

      setStep((currentStep) => currentStep - 1);
    }
  };

  return (
    <>
      <Head title="Account Selection" />

      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-margin-mobile text-on-background md:p-margin-desktop">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center gap-y-10"
        >
          {
            form.data.type === "provider" && (
              <div className="w-full">
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase">
                    Step {step + 1} of {formSteps.length}
                  </span>
                  <span className="font-label-md text-label-md text-primary">
                    Shop Setup
                  </span>
                </div>

                <Progress
                  value={(step / formSteps.length) * 100}
                  className="h-3 bg-slate-200"
                />
              </div>
            )
          }

          <div className="flex w-full flex-1 items-center">
            <div className="grid w-full gap-y-10">
              <div className="w-full text-center">
                <h1 className="mb-stack-sm font-headline-lg-mobile text-headline-lg-mobile text-primary md:font-headline-lg md:text-headline-lg">
                  {formSteps[step].title}
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {formSteps[step].description}
                </p>
              </div>

              {getForm(step, form)}
            </div>
          </div>

          <div className="flex w-full justify-between">
            <Button
              variant="secondary"
              id="back-btn"
              onClick={() => handleNavigation(NavAction.DECRMENT)}
            // disabled={step > 0}
            >
              <ChevronLeft />
              <span>Back</span>
            </Button>

            {step + 1 !== formSteps.length ? (
              <Button
                id="continue-btn"
                onClick={() => handleNavigation(NavAction.INCRMENT)}
                disabled={!canContinue}
              >
                <span>Continue</span>
                <ChevronRight />
              </Button>
            ) : (
              <SubmitButton label="Complete setup" form={form} />
            )}
          </div>
        </form>
      </div>
    </>
  );
}

const getForm = (step: number, form: InertiaFormProps<OnboardingFormData>) => {
  switch (step) {
    case 0:
      return <AccountSelection form={form} />;
    case 1:
      return <BasicInfo form={form} />;
    case 2:
      return <LocationDetails form={form} />;
    case 3:
      return <Operations form={form} />;
    case 4:
      return <Service form={form} />;
    case 5:
      return <ShopSetupSuccessful />;

    default:
      return <AccountSelection form={form} />;
  }
};
