import { Head, router, useForm } from '@inertiajs/react';
import { Edit3, FolderOpen, Plus, Tags, Trash2 } from 'lucide-react';
import type { FormEvent } from 'react';
import { Input } from '@/components/form/input';
import SubmitButton from '@/components/form/submit-button';
import { Textarea } from '@/components/form/textarea';
import { Button } from '@/components/ui/button';
import { useNotice } from '@/contexts/notice-context';
import settings from '@/routes/settings';
import type { ProviderCategory } from '@/types/app';
import { catalogLayoutProps, CatalogPageEnum } from './navigation';

type PageProps = {
  categories?: ProviderCategory[];
};

type CategoryFormProps = {
  category?: ProviderCategory;
};

function CategoryForm({ category }: CategoryFormProps) {
  const { hide } = useNotice();

  const form = useForm({
    name: category?.name ?? '',
    description: category?.description ?? '',
  }).withPrecognition(
    category
      ? settings.catalog.categories.update(category.id)
      : settings.catalog.categories.store(),
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    form.submit({
      preserveScroll: true,
      onSuccess: hide,
    });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <Input
        name="name"
        label="Category name"
        placeholder="e.g. Hair services"
        form={form}
      />

      <Textarea
        name="description"
        label="Description"
        placeholder="Describe the services that belong in this group"
        form={form}
        rows={4}
      />

      <div className="flex flex-col-reverse gap-3 border-t border-[#e7f0ec] pt-5 sm:flex-row sm:justify-end dark:border-white/8">
        <Button type="button" variant="outline" onClick={hide}>
          Cancel
        </Button>

        <SubmitButton
          form={form}
          label={category ? 'Save category' : 'Add category'}
        />
      </div>
    </form>
  );
}

export default function CatalogSettings({ categories = [] }: PageProps) {
  const { hide, show, toggleLoading } = useNotice();
  const serviceCount = categories.reduce(
    (total, category) => total + category.services_count,
    0,
  );

  const openCreateModal = () => {
    show({
      type: 'modal',
      title: 'Add a service category',
      description:
        'Group related services so clients can browse your offer easily.',
      modalType: 'default',
      content: <CategoryForm />,
    });
  };

  const openEditModal = (category: ProviderCategory) => {
    show({
      type: 'modal',
      title: 'Edit service category',
      description: 'Keep your service groups clear and easy to understand.',
      modalType: 'default',
      content: <CategoryForm category={category} />,
    });
  };

  const confirmDelete = (category: ProviderCategory) => {
    show({
      type: 'notice',
      title: 'Delete this category?',
      description:
        category.services_count > 0
          ? `${category.name} will be removed and its services will become uncategorized.`
          : `${category.name} will be removed from your service menu.`,
      onConfirm: () => {
        toggleLoading(true);
        router.delete(settings.catalog.categories.destroy(category.id).url, {
          preserveScroll: true,
          onSuccess: hide,
          onFinish: () => toggleLoading(false),
        });
      },
    });
  };

  return (
    <>
      <Head title="Service categories" />
      <div className="space-y-8">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-[#0f8a62] uppercase dark:text-[#8fe0bb]">
              Your offer
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#17343c] dark:text-white">
              Service categories
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
              Create your own groups for the services you provide. These are
              separate from Book Me&apos;s main provider categories.
            </p>
          </div>
          <Button onClick={openCreateModal}>
            <Plus aria-hidden="true" />
            Add category
          </Button>
        </header>

        <section
          aria-label="Category summary"
          className="grid gap-4 sm:grid-cols-2"
        >
          <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#d9f7e8] text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
              <Tags aria-hidden="true" className="size-5" />
            </span>
            <p className="mt-5 text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
              Your categories
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
              {categories.length}
            </p>
          </div>
          <div className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#e6e1ff] text-[#594e9e] dark:bg-[#594e9e]/15 dark:text-[#c0b8ec]">
              <FolderOpen aria-hidden="true" className="size-5" />
            </span>
            <p className="mt-5 text-sm font-medium text-[#70908a] dark:text-[#9cb8b1]">
              Grouped services
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-[#17343c] dark:text-white">
              {serviceCount}
            </p>
          </div>
        </section>

        {categories.length === 0 ? (
          <section className="rounded-3xl border border-dashed border-[#b9dfcc] bg-[#f6faf8] px-6 py-16 text-center dark:border-[#286c51] dark:bg-[#101917]">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#d9f7e8] text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
              <Tags aria-hidden="true" className="size-6" />
            </div>
            <h2 className="mt-5 text-lg font-bold text-[#17343c] dark:text-white">
              No service categories yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
              Add a category such as Hair services, Treatments, or Packages,
              then assign your services to it.
            </p>
            <Button onClick={openCreateModal}>
              <Plus aria-hidden="true" />
              Add your first category
            </Button>
          </section>
        ) : (
          <section
            aria-label="Your service categories"
            className="grid gap-4 md:grid-cols-2"
          >
            {categories.map((category) => (
              <article
                key={category.id}
                className="rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#17343c] text-[#8fe0bb] dark:bg-[#0f8a62]/20">
                      <Tags aria-hidden="true" className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="truncate text-base font-bold text-[#17343c] dark:text-white">
                        {category.name}
                      </h2>
                      <p className="mt-1 text-xs text-[#70908a] dark:text-[#9cb8b1]">
                        {category.services_count}{' '}
                        {category.services_count === 1 ? 'service' : 'services'}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label={`Edit ${category.name}`}
                      onClick={() => openEditModal(category)}
                    >
                      <Edit3 aria-hidden="true" />
                    </Button>

                    <Button
                      variant="destructive"
                      size="icon"
                      aria-label={`Delete ${category.name}`}
                      onClick={() => confirmDelete(category)}
                    >
                      <Trash2 aria-hidden="true" />
                    </Button>
                  </div>
                </div>
                <p className="mt-5 min-h-12 text-sm leading-6 text-[#70908a] dark:text-[#abc0ba]">
                  {category.description || 'No description added yet.'}
                </p>
              </article>
            ))}
          </section>
        )}
      </div>
    </>
  );
}

CatalogSettings.layout = {
  breadcrumbs: [
    {
      title: 'Categories',
      href: settings.catalog.index({ query: { target: CatalogPageEnum.Categories } }),
    },
  ],
  ...catalogLayoutProps,
};
