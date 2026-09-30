import { Head, useForm, usePage } from '@inertiajs/react';
import {
  Camera,
  CheckCircle2,
  Edit2,
  Mail,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { toast } from 'sonner';

import {
  storePhone,
  verifyPhone,
} from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import FileUploader from '@/components/form/file-uploader';
import { Input } from '@/components/form/input';
import SubmitButton from '@/components/form/submit-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useNotice } from '@/contexts/notice-context';
import { useInitials } from '@/hooks/use-initials';
import settings from '@/routes/settings';
import { send } from '@/routes/verification';
import type { PhoneNumber, User } from '@/types';

type PageProps = {
  user: User;
  phoneNumbers: PhoneNumber[];
  mustVerifyEmail: boolean;
  status?: string;
};

type AddPhoneFormData = {
  phone: string;
};

type VerifyPhoneFormData = {
  phone: string;
  code: string;
};

function AddPhoneForm() {
  const { hide } = useNotice();
  const form = useForm<AddPhoneFormData>({ phone: '' }).withPrecognition(
    storePhone(),
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
        name="phone"
        label="Ghanaian phone number"
        placeholder="024 123 4567"
        autoComplete="tel"
        inputMode="tel"
        form={form}
        required
      />
      <p className="text-xs text-muted-foreground">
        Use a Ghanaian mobile number, such as 024 123 4567 or +233 24 123 4567.
      </p>
      <div className="flex justify-end gap-3 border-t pt-5">
        <Button type="button" variant="outline" onClick={hide}>
          Cancel
        </Button>
        <SubmitButton form={form} label="Add number" />
      </div>
    </form>
  );
}

function VerifyPhoneForm({ phone }: { phone: string }) {
  const { hide } = useNotice();
  const form = useForm<VerifyPhoneFormData>({
    phone,
    code: '',
  }).withPrecognition(verifyPhone());

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
        name="code"
        label="Verification code"
        placeholder="123456"
        inputMode="numeric"
        maxLength={6}
        autoComplete="one-time-code"
        form={form}
        required
      />
      <p className="text-xs text-muted-foreground">
        Enter the six-digit code sent to {phone}.
      </p>
      <div className="flex justify-end gap-3 border-t pt-5">
        <Button type="button" variant="outline" onClick={hide}>
          Cancel
        </Button>
        <SubmitButton form={form} label="Verify number" />
      </div>
    </form>
  );
}

type ProfileFormData = {
  name: string;
  email: string;
  avatar: File | null;
};

export default function Profile() {
  const { user, phoneNumbers } = usePage<PageProps>().props;
  const [edit, setEdit] = useState(false);
  const getInitials = useInitials();
  const { show } = useNotice();

  const form = useForm<ProfileFormData>({
    name: user.name,
    email: user.email,
    avatar: null,
  });

  const emailVerificationForm = useForm({});

  const memberSince = useMemo(
    () =>
      new Intl.DateTimeFormat('en-GH', {
        month: 'long',
        year: 'numeric',
      }).format(new Date(user.created_at)),
    [user.created_at],
  );

  const toggleEdit = () => {
    setEdit((prev: boolean) => !prev);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    form.patch(settings.profile.update().url, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => toast.success('Profile updated.'),
    });
  };

  const handleEmailVerification = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    emailVerificationForm.post(send().url, {
      onSuccess: () => {
        // toast success message
      },
      onError: () => {
        // toast error message
      },
    });
  };

  const handleAddPhone = () => {
    show({
      type: 'modal',
      title: 'Add a phone number',
      description:
        'Add another number to your BookMe account and verify it by SMS.',
      content: <AddPhoneForm />,
    });
  };

  const handleVerifyPhone = (phone: string) => {
    show({
      type: 'modal',
      title: 'Verify phone number',
      description: 'Confirm that you own this phone number.',
      content: <VerifyPhoneForm phone={phone} />,
    });
  };

  return (
    <>
      <Head title="Profile settings" />

      <div className="space-y-8">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-[#0f8a62] uppercase dark:text-[#8fe0bb]">
              Your account -{' '}
              <span className="rounded-full bg-emerald-100 px-2.5 py-1">
                Member since - {memberSince}
              </span>
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#17343c] dark:text-white">
              Personal profile
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
              Keep your account details current so your BookMe workspace always
              feels like yours.
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e9f8f0] px-3 py-1.5 text-xs font-semibold text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
            <ShieldCheck aria-hidden="true" className="size-3.5" />
            Account secured
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-3xl border border-[#dceae4] bg-white shadow-[0_16px_45px_rgba(23,52,60,0.06)] dark:border-white/10 dark:bg-[#17221f]"
        >
          <div className="space-y-8 p-5 sm:p-8">
            <section className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#17343c] dark:text-white">
                    Profile photo
                  </h3>
                  <p className="mt-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
                    Add a friendly face so your team and clients know who they
                    are working with.
                  </p>
                </div>

                <div className="h-px bg-[#e7f0ec] dark:bg-white/8" />

                {!edit && (
                  <Button
                    variant="secondary"
                    size="icon-lg"
                    onClick={toggleEdit}
                  >
                    <Edit2 />
                  </Button>
                )}
              </div>

              <div className="grid lg:grid-cols-2">
                {!edit ? (
                  <div className="gapx-5 mt-2 flex h-auto w-full flex-row items-center justify-start space-y-0 gap-x-5 rounded-xl border-[#0f8a62]/30 bg-[#d9f7e8] p-4 text-2xl font-bold text-[#0f6b4d] dark:bg-[#0f8a62]/5 dark:text-[#8fe0bb] dark:hover:bg-[#0f8a62]/15">
                    <Avatar className="size-26 rounded-full">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="rounded-full bg-[#d9f7e8] text-2xl font-bold text-[#0f6b4d] dark:bg-[#0f8a62]/20 dark:text-[#8fe0bb]">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                      <h4 className="text-base">Update your avatar</h4>
                      <p className="text-sm font-normal">Type: Not available</p>
                      <p className="text-sm font-normal">Size: Not available</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <FileUploader
                      name="avatar"
                      label="Change profile photo"
                      title="Select picture to upload"
                      description="JPG, PNG or WEBP · up to 1 MB"
                      accept="image/jpeg,image/webp,image/png"
                      maxSize={1 * 1024 * 1024}
                      form={form}
                      icon={{
                        item: Camera,
                        classNames: {
                          item: 'size-8',
                          wrapper: 'size-26 bg-primary/30',
                        },
                      }}
                      classNames={{
                        wrapper:
                          'h-auto border-[#0f8a62]/30 flex-row gap-x-5 items-center space-y-0 justify-start mt-2 bg-[#d9f7e8] text-2xl font-bold text-[#0f6b4d] dark:bg-[#0f8a62]/5 dark:hover:bg-[#0f8a62]/15 dark:text-[#8fe0bb]',
                        // ' bg-[#d9f7e8] text-2xl font-bold text-[#0f6b4d] dark:bg-[#0f8a62]/20 dark:text-[#8fe0bb]',
                        header: {
                          title:
                            'text-base text-[#17343c] dark:text-white text-left',
                          description: 'text-[#70908a] dark:text-[#9cb8b1]',
                        },
                        preview: {
                          card: {
                            wrapper:
                              'h-auto border-dashed mt-2 bg-[#d9f7e8] text-2xl font-bold text-[#0f6b4d] dark:bg-[#0f8a62]/5 dark:hover:bg-[#0f8a62]/15 dark:text-[#8fe0bb]',
                            icon: {
                              wrapper: 'size-26 rounded-full',
                            },
                          },
                        },
                      }}
                    />
                  </div>
                )}
              </div>
            </section>

            <section className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-[#17343c] dark:text-white">
                  Personal information
                </h3>
                <p className="mt-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
                  These details are used to identify you across your BookMe
                  account.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  name="name"
                  label="Full name"
                  placeholder="e.g. Ama Mensah"
                  autoComplete="name"
                  form={form}
                  required
                  disabled={!edit}
                />
                <Input
                  name="email"
                  label="Email address"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  form={form}
                  required
                  disabled={!edit}
                />
              </div>
            </section>

            <section className="space-y-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#17343c] dark:text-white">
                    Phone numbers
                  </h3>
                  <p className="mt-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
                    Add multiple Ghanaian numbers and verify each one for
                    account recovery.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddPhone}
                >
                  <Phone className="size-4" />
                  Add number
                </Button>
              </div>

              <div className="space-y-3">
                {phoneNumbers.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-[#dceae4] p-4 text-sm text-[#70908a] dark:border-white/10 dark:text-[#9cb8b1]">
                    No phone numbers have been added yet.
                  </p>
                ) : (
                  phoneNumbers.map((phoneNumber) => (
                    <div
                      key={phoneNumber.id ?? phoneNumber.phone}
                      className="flex flex-col gap-3 rounded-xl border border-[#dceae4] p-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-lg bg-[#e9f8f0] text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
                          <Phone className="size-4" />
                        </span>
                        <span className="text-sm font-semibold text-[#17343c] dark:text-white">
                          {phoneNumber.phone}
                        </span>
                      </div>
                      {phoneNumber.verified_at ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f8a62] dark:text-[#8fe0bb]">
                          <CheckCircle2 className="size-4" />
                          Verified
                        </span>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleVerifyPhone(phoneNumber.phone)}
                        >
                          Verify number
                        </Button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          <footer className="flex flex-col gap-3 border-t border-[#e7f0ec] bg-[#fbfcfa] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 dark:border-white/8 dark:bg-[#17221f]">
            <p className="text-xs text-[#91aaa2]">
              Your changes are saved securely to your account.
            </p>
            {edit && (
              <div className="flex gap-3">
                <Button variant="destructive" onClick={toggleEdit}>
                  Cancel
                </Button>
                <SubmitButton form={form} label="Save profile" />
              </div>
            )}
          </footer>
        </form>

        <form onSubmit={handleEmailVerification}>
          {user.email_verified_at === null && (
            <div className="flex flex-col gap-4 rounded-2xl border border-[#f3dfb7] bg-[#fffaf0] p-4 sm:flex-row sm:items-start sm:justify-between dark:border-[#80662c]/40 dark:bg-[#4d3d18]/20">
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#f9e9bd] text-[#9c6d16] dark:bg-[#80662c]/30 dark:text-[#f5d783]">
                  <Mail aria-hidden="true" className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-bold text-[#6f5117] dark:text-[#f5d783]">
                    Verify your email address
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#8c6f34] dark:text-[#d8bd70]">
                    Confirm your email to keep account notifications and booking
                    updates reliable.
                  </p>
                </div>
              </div>

              <SubmitButton
                variant="outline"
                className="rounded-xl border-[#e7c978] bg-transparent text-[#7c5b1b] hover:bg-[#fff4d8] dark:border-[#80662c] dark:text-[#f5d783] dark:hover:bg-[#80662c]/20"
                label="Resend email"
                form={emailVerificationForm}
              />
            </div>
          )}
        </form>

        <DeleteUser />
      </div>
    </>
  );
}

Profile.layout = {
  breadcrumbs: [
    {
      title: 'Profile settings',
      href: settings.profile.edit().url,
    },
  ],
};
