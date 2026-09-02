import { Head, router } from '@inertiajs/react';
import {
  Clock3,
  Edit3,
  PackageOpen,
  Plus,
  Scissors,
  Trash2,
} from 'lucide-react';

import ServiceForm from '@/components/service-form';
import type { ServiceRecord } from '@/components/service-form';
import { Button } from '@/components/ui/button';
import { useNotice } from '@/contexts/notice-context';
import { destroy, index } from '@/routes/services';

type PageProps = {
  services?: ServiceRecord[];
};

function formatPrice(price: string | number): string {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2,
  }).format(Number(price));
}

function formatDuration(service: ServiceRecord): string {
  return service.min_duration === service.max_duration
    ? `${service.min_duration} min`
    : `${service.min_duration}–${service.max_duration} min`;
}

export default function Services({ services = [] }: PageProps) {
  const { hide, show, toggleLoading } = useNotice();
  const activeServices = services.filter((service) => service.is_active).length;

  const openCreateModal = () => {
    show({
      type: 'modal',
      title: 'Add a new service',
      description: 'Give clients a clear view of what you offer.',
      modalType: 'default',
      classNames: { content: 'sm:max-w-3xl' },
      content: <ServiceForm />,
    });
  };

  const openEditModal = (service: ServiceRecord) => {
    show({
      type: 'modal',
      title: 'Edit service',
      description: 'Keep your service details accurate and easy to book.',
      modalType: 'default',
      classNames: { content: 'sm:max-w-3xl' },
      content: <ServiceForm service={service} />,
    });
  };

  const confirmDelete = (service: ServiceRecord) => {
    show({
      type: 'notice',
      title: 'Delete this service?',
      description: `${service.name} will be removed from your public booking profile.`,
      onConfirm: () => {
        toggleLoading(true);
        router.delete(destroy.url(service.id), {
          preserveScroll: true,
          onSuccess: hide,
          onFinish: () => toggleLoading(false),
        });
      },
    });
  };

  return (
    <>
      <Head title="Services settings" />

      <div className="space-y-8">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-[#0f8a62] uppercase dark:text-[#8fe0bb]">
              Your offer
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#17343c] dark:text-white">
              Services
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
              Build a simple menu of services that makes choosing your business
              feel easy.
            </p>
          </div>
          <Button onClick={openCreateModal}>
            <Plus aria-hidden="true" />
            Add service
          </Button>
        </header>

        <section
          aria-label="Service summary"
          className="grid gap-4 sm:grid-cols-3"
        >
          <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#d9f7e8] text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
              <Scissors aria-hidden="true" className="size-5" />
            </span>
            <p className="mt-5 text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
              Total services
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-#17343c] dark:text-white">
              {services.length}
            </p>
          </div>
          <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#e6e1ff] text-[#594e9e] dark:bg-[#594e9e]/15 dark:text-[#c0b8ec]">
              <PackageOpen aria-hidden="true" className="size-5" />
            </span>
            <p className="mt-5 text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
              Visible to clients
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
              {activeServices}
            </p>
          </div>
          <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#dcecf5] text-[#2d6980] dark:bg-[#2d6980]/15 dark:text-[#9bd1e4]">
              <Clock3 aria-hidden="true" className="size-5" />
            </span>
            <p className="mt-5 text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
              Booking menu
            </p>
            <p className="mt-1 text-sm font-semibold text-[#17343c] dark:text-white">
              {services.length
                ? 'Ready for bookings'
                : 'Waiting for your first service'}
            </p>
          </div>
        </section>

        {services.length === 0 ? (
          <section className="rounded-3xl border border-dashed border-[#b9dfcc] bg-[#f6faf8] px-6 py-16 text-center dark:border-[#286c51] dark:bg-[#101917]">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#d9f7e8] text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
              <Scissors aria-hidden="true" className="size-6" />
            </div>
            <h2 className="mt-5 text-lg font-bold text-[#17343c] dark:text-white">
              Your service menu is empty
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
              Add your first service to start shaping a booking experience
              clients can understand at a glance.
            </p>
            <Button onClick={openCreateModal}>
              <Plus aria-hidden="true" />
              Add your first service
            </Button>
          </section>
        ) : (
          <section
            aria-label="Your services"
            className="grid gap-4 md:grid-cols-2"
          >
            {services.map((service) => (
              <article
                key={service.id}
                className="group overflow-hidden rounded-2xl border border-[#dceae4] bg-white shadow-[0_8px_25px_rgba(23,52,60,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(23,52,60,0.08)] dark:border-white/10 dark:bg-[#17221f]"
              >
                <div className="flex items-start justify-between gap-4 border-b border-[#e7f0ec] p-5 dark:border-white/8">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#17343c] text-[#8fe0bb] dark:bg-[#0f8a62]/20">
                      {service.image ? (
                        <img
                          src={service.image}
                          alt=""
                          className="size-full object-cover"
                        />
                      ) : (
                        <Scissors aria-hidden="true" className="size-5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h2 className="truncate text-base font-bold text-[#17343c] dark:text-white">
                        {service.name}
                      </h2>
                      <span className="mt-1 inline-flex rounded-full bg-[#e9f8f0] px-2 py-0.5 text-[10px] font-bold text-[#0f8a62] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
                        {service.is_active ? 'Visible' : 'Hidden'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 p-5">
                  <p className="min-h-12 text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
                    {service.description || 'No description added yet.'}
                  </p>
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium text-[#91aaa2]">
                        Starting at
                      </p>
                      <p className="mt-1 text-xl font-bold text-[#17343c] dark:text-white">
                        {formatPrice(service.price)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-[#91aaa2]">
                        Duration
                      </p>
                      <p className="mt-1 text-sm font-bold text-[#41645a] dark:text-[#c4d8d1]">
                        {formatDuration(service)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 border-t border-[#e7f0ec] pt-4 dark:border-white/8">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => openEditModal(service)}
                    >
                      <Edit3 aria-hidden="true" />
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="rounded-xl"
                      aria-label={`Delete ${service.name}`}
                      onClick={() => confirmDelete(service)}
                    >
                      <Trash2 aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </>
  );
}

Services.layout = {
  breadcrumbs: [
    {
      title: 'Services',
      href: index(),
    },
  ],
};
