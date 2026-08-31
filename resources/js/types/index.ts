import type { ReactNode } from 'react';

export type * from './auth';
export type * from './navigation';
export type * from './notifications';
export type * from './ui';

export type Media = {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
};

export type SelectOptions = {
  label: ReactNode;
  value: string;
  description?: string;
};


export enum UserType {
  CLIENT = "client",
  PROVIDER = "service_provider"
}