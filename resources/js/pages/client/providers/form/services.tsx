import type { InertiaFormProps } from '@inertiajs/react';
import { Check, Clock3 } from 'lucide-react';
import type { ServiceProvider } from '@/types/app';
import type { BookingFormData } from './types';
import { currency, durationLabel } from './utils';
import { cn } from '@/lib/utils';

type Props = {
	form: InertiaFormProps<BookingFormData>;
	provider: ServiceProvider;
	clearStepError: () => void;
};

export default function ProviderServices({
	form,
	provider,
	clearStepError,
}: Props) {
	const handleServiceChange = (serviceId: string): void => {
		const nextService = provider.services.find(
			(providerService) => providerService.id === serviceId,
			);

		form.setData((data) => ({
			...data,
			service_id: serviceId,
			duration_minutes: nextService
			? String(nextService.min_duration)
			: '',
			date: '',
			time: '',
		}));
		clearStepError();
	};

	return (
		<section className="grid gap-3" aria-labelledby="booking-service-heading">
			<h3 id="booking-service-heading" className="sr-only">
				Choose a service
			</h3>
			{provider.services.length > 0 ? (
				provider.services.map((providerService) => {
					const isSelected = form.data.service_id === providerService.id;

					return (
						<label
							key={providerService.id}
							className={`cursor-pointer rounded-2xl border p-4 transition ${isSelected ? 'border-[#0f8a62] bg-[#f4fbf7] ring-2 ring-[#0f8a62]/15 dark:bg-[#0f8a62]/10' : 'border-[#e7f0ec] hover:border-[#b9dccc] dark:border-white/10'}`}
						>
							<input
								type="radio"
								name="service_id"
								value={providerService.id}
								checked={isSelected}
								onChange={() => handleServiceChange(providerService.id)}
								className="sr-only"
							/>
							<span className="flex items-start gap-3">
								<span
									className={cn(
										"mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border",
										isSelected
										? 'border-[#0f8a62] bg-[#0f8a62] text-white'
										: 'border-[#b9dccc] text-transparent'
										)}
								>
									<Check aria-hidden="true" className="size-3.5" />
								</span>
								<span className="min-w-0 flex-1">
									<span className="flex items-start justify-between gap-3">
										<span className="font-bold text-[#17343c] dark:text-white">
											{providerService.name}
										</span>
										<span className="shrink-0 font-bold text-[#17343c] dark:text-white">
											{currency(providerService.price as number)}
										</span>
									</span>
									<span className="mt-1 block text-sm leading-5 text-[#70908a] dark:text-[#b6ccc5]">
										{providerService.description ||
										'A tailored service with care and attention to detail.'}
									</span>
									<span className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#41645a] dark:text-[#c4d8d1]">
										<Clock3 className="size-3.5 text-[#0f8a62]" />
										{durationLabel(providerService)}
									</span>
								</span>
							</span>
						</label>
						);
				})
				) : (
				<p className="rounded-xl bg-[#fff4eb] p-4 text-sm text-[#a55c2d]">
					This provider has no active services available for booking.
				</p>
				)}
			</section>
			);
}
