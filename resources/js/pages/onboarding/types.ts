
export type ServiceFormData = {
  image: File | null;
  name: string;
  price: number | string;
  min_duration: string;
  max_duration: string;
  description: string;
};

export type OnboardingFormData = {
  type: 'client' | 'provider' | null;
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
