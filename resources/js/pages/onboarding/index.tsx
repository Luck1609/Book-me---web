import { Head, Link, useForm } from '@inertiajs/react';
import type {
  InertiaFormProps,
  InertiaPrecognitiveFormProps,
} from '@inertiajs/react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { store } from '@/actions/App/Http/Controllers/OnboardingController';
import SubmitButton from '@/components/form/submit-button';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn, getNestedValue } from '@/lib/utils';
import { privacy, terms } from '@/routes';
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
  type: 'client' | 'provider';
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
  INCREMENT = 'increment',
  DECREMENT = 'decrement',
}

type OnboardingField = string;
type OnboardingForm = InertiaPrecognitiveFormProps<OnboardingFormData>;

const requiredFieldsByStep: Record<number, OnboardingField[]> = {
  0: ['type'],
  1: ['name', 'category_id', 'description'],
  2: ['region_id', 'district_id', 'city', 'address'],
  3: ['working_days', 'opens_at', 'closes_at', 'includes_holidays'],
  4: [
    'services.0.name',
    'services.0.price',
    'services.0.min_duration',
    'services.0.max_duration',
    'services.0.description',
  ],
};

const getFieldsForStep = (
  currentStep: number,
  avatar: File | null,
  serviceImage: File | null,
): OnboardingField[] => {
  const fields = [...(requiredFieldsByStep[currentStep] ?? [])];

  if (currentStep === 1 && avatar) {
    fields.push('avatar');
  }

  if (currentStep === 4 && serviceImage) {
    fields.push('services.0.image');
  }

  return fields;
};

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
  })
    .withPrecognition(store())
    .setValidationTimeout(500)
    .validateFiles();

  const formRef = useRef<OnboardingForm>(form);
  const previousData = useRef<OnboardingFormData | null>(null);
  const avatar = form.data.avatar;
  const serviceImage = form.data.services[0]?.image ?? null;

  const fieldsForStep = useMemo(
    () => getFieldsForStep(step, avatar, serviceImage),
    [step, avatar, serviceImage],
  );

  useEffect(() => {
    formRef.current = form;
  }, [form]);

  useEffect(() => {
    const previous = previousData.current;
    previousData.current = form.data;

    if (!previous) {
      return;
    }

    const changedFields = fieldsForStep.filter(
      (field) =>
        getNestedValue(previous, field) !== getNestedValue(form.data, field),
    );

    changedFields.forEach((field) => {
      const currentForm = formRef.current;

      currentForm.touch(field as never);
      currentForm.validate(field as never, {
        only: [field] as never[],
      });
    });
  }, [step, fieldsForStep, form.data]);

  const isStepValid = fieldsForStep.every(
    (field) => form.valid(field as never) && !form.invalid(field as never),
  );
  const stepHasErrors = fieldsForStep.some((field) =>
    form.invalid(field as never),
  );
  const canContinue = !form.validating && isStepValid;
  const showProgressBar = form.data.type === 'provider';
  const progressValue = ((step + 1) / formSteps.length) * 100;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    form.submit();
  };

  const handleNavigation = (action: NavAction) => {
    if (action === NavAction.INCREMENT) {
      if (!canContinue) {
        return;
      }

      setStep((currentStep) => currentStep + 1);
    }

    if (action === NavAction.DECREMENT) {
      if (step === 0) {
        return;
      }

      setStep((currentStep) => currentStep - 1);
    }
  };

  console.log("Onboarding form details", form.data)

  return (
    <>
      <Head title="Set up your Book Me profile" />

      <div className="relative min-h-screen overflow-hidden bg-[#fbfcfa] text-[#17343c] selection:bg-[#bce9d4] selection:text-[#17343c]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 size-120 rounded-full bg-[#dff4eb] blur-3xl" />
          <div className="absolute bottom-0 -left-48 size-112 rounded-full bg-[#fff0d6] blur-3xl" />
        </div>

        {/* <header className="relative z-10 border-b border-[#e8eeeb]/80 bg-[#fbfcfa]/90 backdrop-blur-md">
          <div className="mx-auto flex h-19 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
            <Link href={home()} aria-label="Book Me home">
              <AppLogo />
            </Link>
            <div className="flex items-center gap-2 text-xs text-[#7a8989] sm:gap-3 sm:text-sm">
              <span className="hidden sm:inline">Already have an account?</span>
              <Link
                className="inline-flex items-center gap-1.5 font-bold text-[#0f8a62] hover:text-[#0b7653]"
                href={login()}
              >
                Log in <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
            </div>
          </div>
        </header> */}

        <main className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-14">
          <div className="mx-auto grid max-w-5xl gap-8">
            <form
              onSubmit={handleSubmit}
              className="flex min-w-0 flex-col gap-5"
            >
              <div
                aria-hidden={!showProgressBar}
                className={cn(
                  'grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                  showProgressBar
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'pointer-events-none grid-rows-[0fr] opacity-0',
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="rounded-[26px] border border-[#e1ebe5] bg-white p-5 shadow-[0_16px_35px_rgba(45,86,68,0.06)] sm:p-7">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-bold tracking-[0.12em] text-[#0f8a62] uppercase">
                          Profile setup
                        </p>
                        <p className="mt-2 text-sm font-bold text-[#53696b]">
                          Step {step + 1} of {formSteps.length}
                        </p>
                      </div>
                      <span className="rounded-full bg-[#e3f6ee] px-3 py-1.5 text-[10px] font-bold text-[#0f8a62]">
                        {Math.round(progressValue)}% complete
                      </span>
                    </div>

                    <div className="mt-7 grid grid-cols-5">
                      {formSteps.map((item, index) => {
                        const isCurrent = index === step;
                        const isComplete = index < step;

                        return (
                          <div
                            className="relative flex min-w-0 flex-col items-center"
                            key={item.title}
                          >
                            {index < formSteps.length - 1 && (
                              <span
                                aria-hidden="true"
                                className={cn(
                                  'absolute top-3 left-1/2 h-px w-full',
                                  index < step
                                    ? 'bg-[#72d5ac]'
                                    : 'bg-[#e1ebe5]',
                                )}
                              />
                            )}
                            <span
                              aria-current={isCurrent ? 'step' : undefined}
                              className={cn(
                                'relative z-10 flex size-6 items-center justify-center rounded-full text-[10px] font-bold transition sm:size-7',
                                isComplete
                                  ? 'bg-[#72d5ac] text-[#17343c]'
                                  : isCurrent
                                    ? 'bg-[#0f8a62] text-white ring-4 ring-[#e3f6ee]'
                                    : 'border border-[#cbd9d2] bg-white text-[#7a8989]',
                              )}
                            >
                              {isComplete ? (
                                <Check
                                  aria-hidden="true"
                                  className="size-3.5"
                                  strokeWidth={3}
                                />
                              ) : (
                                index + 1
                              )}
                            </span>
                            <span
                              className={cn(
                                'mt-2 hidden w-full truncate px-1 text-center text-[10px] font-semibold sm:block',
                                isCurrent ? 'text-[#0f8a62]' : 'text-[#718081]',
                              )}
                            >
                              {item.title.split('?')[0]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 rounded-[26px] border border-[#e1ebe5] bg-white p-5 shadow-[0_16px_35px_rgba(45,86,68,0.06)] sm:p-8 lg:p-10">
                <div className="max-w-2xl">
                  <h2 className="text-3xl leading-[1.05] font-bold tracking-[-0.055em] text-[#17343c] sm:text-4xl">
                    {formSteps[step].title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[#718081] sm:text-base">
                    {formSteps[step].description}
                  </p>
                  <div
                    aria-live="polite"
                    className="mt-5 flex items-center gap-2 text-xs font-semibold"
                  >
                    <span
                      className={cn(
                        'size-2 rounded-full',
                        form.validating
                          ? 'animate-pulse bg-[#ffbd72]'
                          : stepHasErrors
                            ? 'bg-[#d75c4a]'
                            : canContinue
                              ? 'bg-[#0f8a62]'
                              : 'bg-[#c9d6d1]',
                      )}
                    />
                    <span className="text-[#718081]">
                      {form.validating
                        ? 'Checking this step…'
                        : stepHasErrors
                          ? 'Review the highlighted fields to continue.'
                          : canContinue
                            ? 'All fields are validated.'
                            : 'Complete each field to continue.'}
                    </span>
                  </div>
                </div>

                <div className="mt-8">{getForm(step, form)}</div>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-[26px] border border-[#e1ebe5] bg-white p-4 shadow-[0_16px_35px_rgba(45,86,68,0.06)] sm:p-5">
                <Button
                  className="rounded-full border border-[#dce6e1] bg-white px-5 text-[#53696b] hover:bg-[#f3f8f5]"
                  disabled={step === 0}
                  id="back-btn"
                  onClick={() => handleNavigation(NavAction.DECREMENT)}
                  variant="secondary"
                >
                  <ChevronLeft className="size-4" />
                  <span>Back</span>
                </Button>

                { (form.data.type === "provider" ||
                  step + 1 !== formSteps.length) ? (
                  <Button
                    className="rounded-full bg-[#0f8a62] px-6 font-bold text-white shadow-[0_8px_18px_rgba(15,138,98,0.18)] hover:bg-[#0b7653]"
                    disabled={!canContinue || form.validating}
                    id="continue-btn"
                    onClick={() => handleNavigation(NavAction.INCREMENT)}
                  >
                    <span>Continue</span>
                    <ChevronRight className="size-4" />
                  </Button>
                ) : (
                  <SubmitButton
                    className="rounded-full bg-[#0f8a62] px-6 font-bold text-white shadow-[0_8px_18px_rgba(15,138,98,0.18)] hover:bg-[#0b7653]"
                    disabled={!canContinue || form.processing}
                    label="Complete setup"
                    form={form}
                  />
                )}
              </div>
            </form>
          </div>

          <p className="mt-8 text-center text-xs leading-5 text-[#91a09f]">
            By continuing, you agree to our{' '}
            <Link
              className="font-semibold text-[#0f8a62] hover:underline"
              href={privacy()}
            >
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link
              className="font-semibold text-[#0f8a62] hover:underline"
              href={terms()}
            >
              Terms and Conditions
            </Link>
            .
          </p>
        </main>
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
