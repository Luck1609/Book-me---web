import { Head, Link, useForm } from '@inertiajs/react';
import type { InertiaFormProps } from '@inertiajs/react';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ShieldCheck,
} from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { store } from '@/actions/App/Http/Controllers/OnboardingController';
import { AppLogo } from '@/components/app-logo';
import SubmitButton from '@/components/form/submit-button';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { home, login, privacy, terms } from '@/routes';
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
  })
    .withPrecognition(store())
    .validateFiles();

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
  const progressValue = ((step + 1) / formSteps.length) * 100;

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
      <Head title="Set up your Book Me profile" />

      <div className="relative min-h-screen overflow-hidden bg-[#fbfcfa] text-[#17343c] selection:bg-[#bce9d4] selection:text-[#17343c]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 size-[30rem] rounded-full bg-[#dff4eb] blur-3xl" />
          <div className="absolute bottom-0 -left-48 size-[28rem] rounded-full bg-[#fff0d6] blur-3xl" />
        </div>

        <header className="relative z-10 border-b border-[#e8eeeb]/80 bg-[#fbfcfa]/90 backdrop-blur-md">
          <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
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
        </header>

        <main className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-stretch">
            <aside className="hidden flex-col justify-between rounded-[26px] bg-[#17343c] p-7 text-white shadow-[0_24px_55px_rgba(34,60,70,0.12)] lg:flex">
              <div>
                <div className="flex size-11 items-center justify-center rounded-2xl bg-[#0f8a62] text-[#d9f7e8]">
                  <ShieldCheck aria-hidden="true" className="size-5" />
                </div>
                <p className="mt-8 text-[11px] font-bold tracking-[0.14em] text-[#72d5ac] uppercase">
                  Welcome to Book Me
                </p>
                <h1 className="mt-4 text-3xl leading-[1.05] font-bold tracking-[-0.055em]">
                  One thoughtful step at a time.
                </h1>
                <p className="mt-5 text-sm leading-6 text-[#aec0be]">
                  A few details now means a much smoother booking experience for
                  you and your clients later.
                </p>
              </div>

              <div className="mt-12 space-y-3">
                {formSteps.map((item, index) => {
                  const isCurrent = index === step;
                  const isComplete = index < step;

                  return (
                    <div
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${isCurrent ? 'bg-white/[0.1] text-white' : 'text-[#7e9b99]'}`}
                      key={item.title}
                    >
                      <span
                        className={`flex size-7 items-center justify-center rounded-full text-[10px] font-bold ${isComplete ? 'bg-[#72d5ac] text-[#17343c]' : isCurrent ? 'bg-[#0f8a62] text-white' : 'border border-white/15 text-[#7e9b99]'}`}
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
                      <span className="text-xs font-semibold">
                        {item.title.split('?')[0]}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-12 flex items-center gap-2 border-t border-white/10 pt-5 text-[11px] text-[#9bb4b2]">
                <Clock3
                  aria-hidden="true"
                  className="size-3.5 text-[#ffce8e]"
                />
                Usually takes about 10 minutes
              </div>
            </aside>

            <form
              onSubmit={handleSubmit}
              className="flex min-w-0 flex-col gap-5"
            >
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
                <Progress
                  value={progressValue}
                  className="mt-5 h-2 bg-[#eaf0ec]"
                />
              </div>

              <div className="flex-1 rounded-[26px] border border-[#e1ebe5] bg-white p-5 shadow-[0_16px_35px_rgba(45,86,68,0.06)] sm:p-8 lg:p-10">
                <div className="max-w-2xl">
                  <h2 className="text-3xl leading-[1.05] font-bold tracking-[-0.055em] text-[#17343c] sm:text-4xl">
                    {formSteps[step].title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[#718081] sm:text-base">
                    {formSteps[step].description}
                  </p>
                </div>

                <div className="mt-8">{getForm(step, form)}</div>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-[26px] border border-[#e1ebe5] bg-white p-4 shadow-[0_16px_35px_rgba(45,86,68,0.06)] sm:p-5">
                <Button
                  className="rounded-full border border-[#dce6e1] bg-white px-5 text-[#53696b] hover:bg-[#f3f8f5]"
                  disabled={step === 0}
                  id="back-btn"
                  onClick={() => handleNavigation(NavAction.DECRMENT)}
                  variant="secondary"
                >
                  <ChevronLeft className="size-4" />
                  <span>Back</span>
                </Button>

                {step + 1 !== formSteps.length ? (
                  <Button
                    className="rounded-full bg-[#0f8a62] px-6 font-bold text-white shadow-[0_8px_18px_rgba(15,138,98,0.18)] hover:bg-[#0b7653]"
                    disabled={!canContinue}
                    id="continue-btn"
                    onClick={() => handleNavigation(NavAction.INCRMENT)}
                  >
                    <span>Continue</span>
                    <ChevronRight className="size-4" />
                  </Button>
                ) : (
                  <SubmitButton
                    className="rounded-full bg-[#0f8a62] px-6 font-bold text-white shadow-[0_8px_18px_rgba(15,138,98,0.18)] hover:bg-[#0b7653]"
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
