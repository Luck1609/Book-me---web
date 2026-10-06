import { Head, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2, MapPin } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/form/input';
import { Select } from '@/components/form/select';
import SubmitButton from '@/components/form/submit-button';
import { Textarea } from '@/components/form/textarea';
import settings from '@/routes/settings';
import type { SelectOptions } from '@/types';
import type { ServiceProvider } from '@/types/app';
import { BusinessProfileRoutes } from '@/types/enums';
import { businessData } from './data';

type RegionOption = SelectOptions & { districts: SelectOptions[] };
type PageProps = { providerProfile: ServiceProvider; regions: RegionOption[] };
type BusinessProfileFormData = {
  region_id: string;
  district_id: string;
  city: string;
  address: string;
  latitude: string;
  longitude: string;
};
type Coordinates = { lat: number; lng: number };
type GoogleMapClickEvent = {
  latLng?: { lat: () => number; lng: () => number };
};
type GoogleMapsApi = {
  maps: {
    Map: new (
      element: HTMLElement,
      options: Record<string, unknown>,
    ) => {
      addListener: (
        event: string,
        callback: (event: GoogleMapClickEvent) => void,
      ) => void;
    };
    Marker: new (options: Record<string, unknown>) => {
      setMap: (map: unknown) => void;
    };
  };
};

declare global {
  interface Window {
    google?: GoogleMapsApi;
  }
}

let googleMapsPromise: Promise<GoogleMapsApi> | null = null;

function loadGoogleMaps(apiKey: string): Promise<GoogleMapsApi> {
  if (window.google) {
    return Promise.resolve(window.google);
  }

  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  googleMapsPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}`;
    script.async = true;
    script.defer = true;
    script.onload = () =>
      window.google
        ? resolve(window.google)
        : reject(new Error('Google Maps did not load correctly.'));
    script.onerror = () =>
      reject(new Error('Google Maps could not be loaded.'));
    document.head.appendChild(script);
  });

  return googleMapsPromise;
}

function validCoordinate(
  value: string | number | null | undefined,
): number | null {
  if (
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value.trim() === '')
  ) {
    return null;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : null;
}

export default function LocationSetup() {
  const { providerProfile, regions = [] } = usePage<PageProps>().props;
  const mapElement = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const initialPosition = useMemo<Coordinates>(
    () => ({
      lat: validCoordinate(providerProfile?.latitude) ?? 5.6037,
      lng: validCoordinate(providerProfile?.longitude) ?? -0.187,
    }),
    [providerProfile?.latitude, providerProfile?.longitude],
  );

  const form = useForm<BusinessProfileFormData>({
    region_id: (providerProfile?.region_id as string | undefined) ?? '',
    district_id: (providerProfile?.district_id as string | undefined) ?? '',
    city: providerProfile?.city ?? '',
    address: providerProfile?.address ?? '',
    latitude: providerProfile?.latitude ?? '',
    longitude: providerProfile?.longitude ?? '',
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

  useEffect(() => {
    if (!apiKey || !mapElement.current) {
      return;
    }

    let cancelled = false;
    let marker: { setMap: (map: unknown) => void } | null = null;
    loadGoogleMaps(apiKey)
      .then((google) => {
        if (cancelled || !mapElement.current) {
          return;
        }

        const map = new google.maps.Map(mapElement.current, {
          center: initialPosition,
          zoom:
            providerProfile?.latitude && providerProfile?.longitude ? 16 : 12,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        });

        if (form.data.latitude && form.data.longitude) {
          marker = new google.maps.Marker({
            map,
            position: initialPosition,
            title: 'Business location',
          });
        }

        map.addListener('click', (event) => {
          const latitude = event.latLng?.lat();
          const longitude = event.latLng?.lng();

          if (latitude === undefined || longitude === undefined) {
            return;
          }

          marker?.setMap(null);

          marker = new google.maps.Marker({
            map,
            position: { lat: latitude, lng: longitude },
            title: 'Business location',
          });
          form.setData('latitude', latitude.toFixed(6));
          form.setData('longitude', longitude.toFixed(6));
        });
      })
      .catch(() =>
        setMapError('The map could not be loaded. You can try again later.'),
      );

    return () => {
      cancelled = true;
      marker?.setMap(null);
    };
  }, [
    apiKey,
    form,
    initialPosition,
    providerProfile?.latitude,
    providerProfile?.longitude,
  ]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.transform((data) => ({
      ...data,
      latitude: data.latitude.trim() === '' ? null : Number(data.latitude),
      longitude: data.longitude.trim() === '' ? null : Number(data.longitude),
    }));
    form.patch(settings.business.update().url, {
      preserveScroll: true,
      onSuccess: () => toast.success('Business profile updated.'),
    });
  };

  return (
    <>
      <Head title="Business Location settings" />

      <div className="max-w-4xl space-y-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-[#0f8a62] uppercase dark:text-[#8fe0bb]">
              Your public presence
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#17343c] dark:text-white">
              Business Location
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
              Shape how clients discover your business and know exactly where
              you are.
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
                  placeholder={
                    !form.data.region_id
                      ? 'Select region first'
                      : 'Select a district'
                  }
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

                <div className="sm:col-span-2">
                  <Textarea
                    name="address"
                    label="Street address"
                    placeholder="e.g. 14 Oxford Street"
                    form={form}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-[#17343c] dark:text-white">
                    Pin your shop&apos;s location
                  </span>
                  <p className="text-xs text-[#70908a] dark:text-[#9cb8b1]">
                    Click the map to drop or move the pin.
                  </p>
                </div>
                {apiKey ? (
                  <div
                    ref={mapElement}
                    className="h-120 w-full rounded-xl bg-slate-200 dark:bg-slate-800"
                  />
                ) : (
                  <div className="flex h-48 items-center justify-center rounded-xl bg-slate-100 px-6 text-center text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                    Add VITE_GOOGLE_MAPS_API_KEY to enable the location map.
                  </div>
                )}
                {mapError && (
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    {mapError}
                  </p>
                )}
                {form.data.latitude && form.data.longitude && (
                  <p className="text-xs text-[#70908a] dark:text-[#9cb8b1]">
                    Selected coordinates: {form.data.latitude},{' '}
                    {form.data.longitude}
                  </p>
                )}
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

LocationSetup.layout = {
  breadcrumbs: [
    {
      title: 'Business Location',
      href: settings.businessProfile.edit(BusinessProfileRoutes.Location).url,
    },
  ],
  ...businessData,
};
