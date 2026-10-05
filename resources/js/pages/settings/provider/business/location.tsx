import { Head, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2, MapPin } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import type { FormEvent } from 'react';
import { Input } from '@/components/form/input';
import { Select } from '@/components/form/select';
import SubmitButton from '@/components/form/submit-button';
import settings from '@/routes/settings';
import type { SelectOptions } from '@/types';
import type { ServiceProvider } from '@/types/app';
import { BusinessProfileRoutes } from '@/types/enums';
import { businessData } from './data';


type RegionOption = SelectOptions & {
  districts: SelectOptions[];
};

type PageProps = {
  providerProfile: ServiceProvider;
  categories: SelectOptions[];
  regions: RegionOption[];
};

type BusinessProfileFormData = {
  region_id: string;
  district_id: string;
  city: string;
  address: string;
};

export default function LocationSetup() {
  const { providerProfile, regions = [] } = usePage<PageProps>().props;
  console.log('profile', providerProfile)
  const form = useForm<BusinessProfileFormData>({
    region_id: providerProfile?.region_id as string ?? "",
    district_id: providerProfile?.district_id as string ?? "",
    city: providerProfile?.city ?? "",
    address: providerProfile?.address ?? "",
  });

  console.log('regions', regions)

  const districts = useMemo(
    () =>
      regions.find((region) => region.value === form.data.region_id)
        ?.districts ?? [],
    [form.data.region_id, regions],
  );

  useEffect(() => {
    if (
      !form.data.district_id ||
      districts.some((district) => district.value === form.data.district_id)
    ) {
      return;
    }

    form.setData('district_id', '');
  }, [districts, form, form.data.district_id]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // form.patch(settings.businessProfile.update().url, {
    //   preserveScroll: true,
    //   onSuccess: () => toast.success('Business profile updated.'),
    // });
  };

  return (
    <>
      <Head title="Business Location settings" />

      <div className="space-y-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-[#0f8a62] uppercase dark:text-[#8fe0bb]">
              Your public presence
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#17343c] dark:text-white">
              Business Location
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
              Shape how clients discover your business and know exactly where you are.
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e9f8f0] px-3 py-1.5 text-xs font-semibold text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
            <CheckCircle2 aria-hidden="true" className="size-3.5" />
            Profile workspace
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-3xl border border-[#dceae4] bg-card dark:border-white/10 dark:bg-[#17221f]"
        >
          <div className="space-y-8 p-5 sm:p-8">
            <section className="space-y-5">
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#dcecf5] text-[#2d6980] dark:bg-[#2d6980]/15 dark:text-[#9bd1e4]">
                  <MapPin aria-hidden="true" className="size-4" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#17343c] dark:text-white">
                    Business location
                  </h3>
                  <p className="mt-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
                    Help clients know exactly where to find you.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Select
                  name="region_id"
                  label="Region"
                  placeholder="Select a region"
                  options={regions}
                  form={form}
                />
                <Select
                  name="district_id"
                  label="District"
                  placeholder={!form.data.region_id ? "Select region first" : "Select a district"}
                  options={districts}
                  form={form}
                />
                <Input
                  name="city"
                  label="City or town"
                  placeholder="e.g. Accra"
                  form={form}
                  required
                />
                <Input
                  name="address"
                  label="Street address"
                  placeholder="e.g. 14 Oxford Street"
                  form={form}
                  required
                />
              </div>

              <div className="">
                <span className="text-sm font-medium">Enter your shop's location</span>
                <div className="bg-slate-300 w-full h-120 rounded-xl"></div>
              </div>
            </section>
          </div>

          <footer className="flex flex-col gap-3 border-t border-[#e7f0ec] bg-[#fbfcfa] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 dark:border-white/8 dark:bg-[#17221f]">
            <p className="text-xs text-[#91aaa2]">
              Changes update your public business profile immediately.
            </p>
            <SubmitButton
              form={form}
              label="Save business profile"
              className="rounded-xl bg-[#0f8a62] px-5 text-white shadow-[0_10px_22px_rgba(15,138,98,0.18)] hover:bg-[#0b7653]"
            />
          </footer>
        </form>
      </div>
    </>
  )
}


LocationSetup.layout = {
  breadcrumbs: [
    {
      title: 'Business Location',
      href: settings.businessProfile.edit(BusinessProfileRoutes.Location).url,
    },
  ],
  ...businessData
};
