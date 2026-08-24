import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, KeyRound } from 'lucide-react';
import type { FormEvent } from 'react';
import { Input, Password } from '@/components/form/input';
import SubmitButton from '@/components/form/submit-button';
import { login } from '@/routes';
import { update } from '@/routes/password';

type ResetPasswordProps = {
  email?: string;
  token?: string;
  passwordRules?: string;
};

export default function ResetPassword({
  email = '',
  token = '',
  passwordRules,
}: ResetPasswordProps) {
  const form = useForm({
    email,
    token,
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.post(update().url);
  };

  return (
    <>
      <Head title="Reset your password" />

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="grid gap-5">
          <Input
            type="email"
            name="email"
            label="Email address"
            placeholder="email@example.com"
            autoComplete="email"
            form={form}
            tabIndex={1}
          />

          <Password
            name="password"
            tabIndex={2}
            label="New password"
            placeholder="Create a new password"
            autoComplete="new-password"
            form={form}
          />

          <Password
            name="password_confirmation"
            tabIndex={3}
            label="Confirm new password"
            placeholder="Repeat your new password"
            autoComplete="new-password"
            form={form}
          />

          {passwordRules && (
            <div className="flex items-start gap-2.5 rounded-2xl bg-[#f7faf8] px-4 py-3 text-xs leading-5 text-[#718282]">
              <KeyRound
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-[#0f8a62]"
              />
              <span>{passwordRules}</span>
            </div>
          )}

          <SubmitButton
            label="Reset password"
            className="w-full rounded-xl bg-[#0f8a62] text-white shadow-[0_10px_22px_rgba(15,138,98,0.18)] hover:bg-[#0b7653]"
            form={form}
            tabIndex={4}
          />
        </div>

        <Link
          href={login()}
          tabIndex={5}
          className="mx-auto mt-6 flex w-fit items-center gap-2 text-sm font-semibold text-[#0f8a62] transition-colors hover:text-[#0b7653] hover:underline"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to login
        </Link>
      </form>
    </>
  );
}

ResetPassword.layout = {
  asDirectChild: false,
  title: 'Choose a new password',
  description:
    'Create a fresh password and get back to managing your day with confidence.',
};
