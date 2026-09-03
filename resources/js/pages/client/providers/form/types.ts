// export type Service = {
//   id: string;
//   name: string;
//   description: string | null;
//   price: number;
//   min_duration_minutes: number;
//   max_duration_minutes: number;
//   requires_payment: boolean;
// };

// export type Provider = {
//   id: string;
//   slug: string;
//   business_name: string;
//   address: string | null;
//   city: string | null;
//   services: Service[];
// };

export type BusinessHour = {
  day_of_week: number;
  is_closed: boolean;
  opens_at: string | null;
  closes_at: string | null;
};

export type BookingFormData = {
  provider_profile_id: string;
  service_id: string;
  // duration_minutes: string;
  date: string;
  time: string;
  notes: string;
};

export type AvailabilityResponse = {
  slots: string[];
};

export type AvailabilityResult = {
  date: string;
  slots: string[];
  error?: string;
};
