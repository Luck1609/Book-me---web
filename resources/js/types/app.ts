import { User } from "./auth";
import { ProviderStatus } from "./enums";



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
	services: ServiceRecord[]
}

export type BookingRecord = {
	id: string;
	provider: ServiceProvider;
	service: ServiceRecord,
	schedule: string;
	notes: string | null;
	client: User;
	servant: User;
}