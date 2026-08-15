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

enum NavAction {
  INCRMENT = 'increment',
  DECRMENT = 'decrement',
}

export default function OnboardingForm() {
  const [step, setStep] = useState(4);
  const form = useForm({
    type: "",

    avatar: null,
    name: "",
    category_id: "",
    description: "",

    region_id: "",
    district_id: "",
    city: "",
    address: "",

    working_days: [],
    opens_at: "",
    closes_at: "",
    includes_holidays: false,

    services: [
      {
        image: null,
        name: "",
        price: 0.00,
        min_duration: "",
        max_duration: "",
        description: "",
      }
    ]
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    form.submit();
  };

  const handleNavigation = (action: NavAction) => {
    if (action === NavAction.INCRMENT) {
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
          className="mx-auto flex flex-1 w-full max-w-4xl flex-col items-center gap-y-10"
        >
          <div className="w-full">
            <div className="mb-1 flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase">
                Step {step + 1} of {formSteps.length}
              </span>
              <span className="font-label-md text-label-md text-primary">
                Shop Setup
              </span>
            </div>

            <Progress value={step / formSteps.length * 100} className="h-3 bg-slate-200" />
          </div>


          <div className="w-full flex flex-1 items-center">
            <div className="w-full grid gap-y-10">
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

const getForm = (step: number, form: InertiaFormProps) => {
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
