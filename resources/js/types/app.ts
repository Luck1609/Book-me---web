import type { User } from "./auth";
import type { ProviderStatus } from "./enums";



export type ServiceRecord = {
  id: string;
  name: string;
  description: string | null;
  price: string | number;
  min_duration: number;
  max_duration: number;
  is_active: boolean;
  image: string | null;
};

export type ServiceProvider = {
	id: string;
	name: string;
	category: string;
	region: string;
	district: string;
	description: string;
	phone: string;
	email: string;
	address: string;
	city: string;
	latitude: string;
	longitude: string;
	status: ProviderStatus;
	workingdays: string[];
	worksOnHolidays: boolean
	isAcceptingBookings: boolean;
  services: ServiceRecord[];
  businessHours: BusinessHour[]
  slug: string;
  avatar: string | null;
	[x: string]: unknown;
}

export type BookingRecord = {
	id: string;
	provider: ServiceProvider;
	service: ServiceRecord,
	schedule: string;
	notes: string | null;
	client: User;
	servant: User;
	[x: string]: unknown;
}


export type BusinessHour = {
  id: string;
  day_of_week: number;
  is_closed: boolean;
  opens_at: string | null;
  closes_at: string | null;
	[x: string]: unknown;
};
