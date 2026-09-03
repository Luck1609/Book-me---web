import type { ServiceRecord } from '@/types/app';

export function getInitialDuration(
  services: ServiceRecord[],
  serviceId: string,
): string {
  const service = services.find(
    (providerService) => providerService.id === serviceId,
  );

  return service ? String(service.min_duration) : '';
}

export function durationLabel(service: ServiceRecord): string {
  return service.min_duration === service.max_duration
    ? `${service.min_duration} min`
    : `${service.min_duration}–${service.max_duration} min`;
}

export function currency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function parseLocalDate(date: string): Date {
  const [year, month, day] = date.split('-').map(Number);

  return new Date(year, month - 1, day, 12);
}

export function formatDate(date: string): string {
  if (!date) {
    return 'Choose a date';
  }

  return parseLocalDate(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatTime(time: string): string {
  if (!time) {
    return 'Choose a time';
  }

  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;

  return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
}
