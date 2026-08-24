import { Head, useForm, usePage } from '@inertiajs/react';
import {
  Building2,
  CalendarCheck2,
  CheckCircle2,
  Globe2,
  MapPin,
} from 'lucide-react';
import { useEffect, useMemo } from 'react';
import type { FormEvent } from 'react';
import { toast } from 'sonner';

import { Input } from '@/components/form/input';
import { Select } from '@/components/form/select';
import SubmitButton from '@/components/form/submit-button';
import { Switch } from '@/components/form/switch';
import { Textarea } from '@/components/form/textarea';
import { edit, update } from '@/routes/business-profile';
import type { SelectOptions } from '@/types';

type RegionOption = SelectOptions & {
  districts: SelectOptions[];
};

type ProviderProfile = {
  business_name: string;
  slug: string;
  description: string | null;
  phone: string | null;
  email: string | null;
  address: string;
  city: string;
  region_id: string;
  district_id: string;
  category_id: string;
  is_accepting_bookings: boolean;
};

type PageProps = {
  providerProfile: ProviderProfile;
  categories: SelectOptions[];
  regions: RegionOption[];
};

type BusinessProfileFormData = {
  business_name: string;
  category_id: string;
  description: string;
  phone: string;
  email: string;
  region_id: string;
  district_id: string;
  city: string;
  address: string;
  is_accepting_bookings: boolean;
};

export default function BusinessProfile() {
  const { providerProfile, categories, regions } = usePage<PageProps>().props;
  const form = useForm<BusinessProfileFormData>({
    business_name: providerProfile.business_name,
    category_id: providerProfile.category_id,
    description: providerProfile.description ?? '',
    phone: providerProfile.phone ?? '',
    email: providerProfile.email ?? '',
    region_id: providerProfile.region_id,
    district_id: providerProfile.district_id,
    city: providerProfile.city,
    address: providerProfile.address,
    is_accepting_bookings: providerProfile.is_accepting_bookings,
  });

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

    form.patch(update.url(), {
      preserveScroll: true,
      onSuccess: () => toast.success('Business profile updated.'),
    });
  };

  return (
    <>
      <Head title="Business profile settings" />

      <div className="space-y-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-[#0f8a62] uppercase dark:text-[#8fe0bb]">
              Your public presence
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#17343c] dark:text-white">
              Business profile
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
              Shape how clients discover your business and understand what you
              offer.
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e9f8f0] px-3 py-1.5 text-xs font-semibold text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
            <CheckCircle2 aria-hidden="true" className="size-3.5" />
            Profile workspace
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-3xl border border-[#dceae4] bg-white shadow-[0_16px_45px_rgba(23,52,60,0.06)] dark:border-white/10 dark:bg-[#17221f]"
        >
          <div className="flex flex-col gap-5 border-b border-[#e7f0ec] bg-[#17343c] px-5 py-6 text-white sm:flex-row sm:items-center sm:justify-between sm:px-8 dark:border-white/8">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#0f8a62] text-[#d9f7e8] shadow-lg shadow-black/10">
                <Building2 aria-hidden="true" className="size-6" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-[0.14em] text-[#8fe0bb] uppercase">
                  Business details
                </p>
                <h2 className="mt-1 text-lg font-bold">
                  Keep your profile clear
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#b8c9c7]">
              <Globe2 aria-hidden="true" className="size-4 text-[#8fe0bb]" />
              bookme.app/{providerProfile.slug}
            </div>
          </div>

          <div className="space-y-8 p-5 sm:p-8">
            <section className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-[#17343c] dark:text-white">
                  Business identity
                </h3>
                <p className="mt-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
                  Give clients the essentials at a glance.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-[minmax(0,1.4fr)_minmax(220px,0.8fr)]">
                <Input
                  name="business_name"
                  label="Business name"
                  placeholder="e.g. The Craft Barbershop"
                  form={form}
                  required
                />
                <Select
                  name="category_id"
                  label="Category"
                  placeholder="Select a category"
                  options={categories}
                  form={form}
                />
              </div>

              <Textarea
                name="description"
                label="About your business"
                placeholder="Tell clients what makes your business special..."
                rows={5}
                form={form}
              />
            </section>

            <div className="h-px bg-[#e7f0ec] dark:bg-white/8" />

            <section className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-[#17343c] dark:text-white">
                  Contact details
                </h3>
                <p className="mt-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
                  Make it easy for clients to reach the right place.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  name="email"
                  label="Business email"
                  type="email"
                  placeholder="hello@yourbusiness.com"
                  autoComplete="email"
                  form={form}
                />
                <Input
                  name="phone"
                  label="Phone number"
                  type="tel"
                  placeholder="+233 24 000 0000"
                  autoComplete="tel"
                  form={form}
                />
              </div>
            </section>

            <div className="h-px bg-[#e7f0ec] dark:bg-white/8" />

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
                  placeholder="Select a district"
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
            </section>

            <div className="h-px bg-[#e7f0ec] dark:bg-white/8" />

            <section className="space-y-5">
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e9f8f0] text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
                  <CalendarCheck2 aria-hidden="true" className="size-4" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#17343c] dark:text-white">
                    Booking availability
                  </h3>
                  <p className="mt-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
                    Control whether clients can request new appointments from
                    your public profile.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-2xl border border-[#dceae4] bg-[#f6faf8] p-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-[#101917]">
                <div>
                  <p className="text-sm font-bold text-[#17343c] dark:text-white">
                    Accept new bookings
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#70908a] dark:text-[#9cb8b1]">
                    {form.data.is_accepting_bookings
                      ? 'Your services are available for clients to book.'
                      : 'Your profile stays visible, but new booking requests are paused.'}
                  </p>
                </div>
                <Switch
                  name="is_accepting_bookings"
                  form={form}
                  aria-label="Accept new bookings"
                />
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
  );
}

BusinessProfile.layout = {
  breadcrumbs: [
    {
      title: 'Business profile',
      href: edit(),
    },
  ],
};
