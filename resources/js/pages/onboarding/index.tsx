import { Head, useForm } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Store, User } from 'lucide-react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import AccountSelection from './account-selection';
import BasicInfo from './shop/basic-info';
import LocationDetails from './shop/location-details';

export default function OnboardingForm() {
  const form = useForm({
    type: ""
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    form.submit()
  }

  return (
    <>
      <Head title="Account Selection" />

      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-margin-mobile text-on-background md:p-margin-desktop">

        <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-3xl flex-col items-center gap-y-10">

          <div className="w-full">
            <div className="mb-stack-sm flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase">
                Step 2 of 3
              </span>
              <span className="font-label-md text-label-md text-primary">
                Shop Details
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: '66.66%' }}
              ></div>
            </div>
          </div>

          <div className="w-full text-center">
            <h1 className="mb-stack-sm font-headline-lg-mobile text-headline-lg-mobile text-primary md:font-headline-lg md:text-headline-lg">
              How will you use the application?
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Select your primary role to customize your experience.
            </p>
          </div>


          {/* <AccountSelection form={form} /> */}
          {/* <BasicInfo form={form} /> */}
          <LocationDetails form={form} />


          <div className="flex w-full justify-between">
            <Button variant="secondary" id="back-btn">
              <ChevronLeft />
              <span>Back</span>
            </Button>

            <Button id="continue-btn">
              <span>Continue</span>
              <ChevronRight />
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
