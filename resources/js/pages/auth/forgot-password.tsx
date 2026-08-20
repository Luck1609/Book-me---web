import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, MailCheck } from 'lucide-react';
import type { FormEvent } from 'react';
import { Input } from '@/components/form/input';
import SubmitButton from '@/components/form/submit-button';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
  const form = useForm({
    email: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.post(email().url);
  };

  return (
    <>
      <Head title="Forgot password" />

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

          <SubmitButton
            label="Request reset link"
            className="w-full rounded-xl bg-[#0f8a62] text-white shadow-[0_10px_22px_rgba(15,138,98,0.18)] hover:bg-[#0b7653]"
            form={form}
            tabIndex={2}
          />
        </div>

        {status && (
          <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-[#c7e8d8] bg-[#effaf4] px-4 py-3 text-sm leading-5 text-[#166448]">
            <MailCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span>{status}</span>
          </div>
        )}

        <Link
          href={login()}
          tabIndex={3}
          className="mx-auto mt-6 flex w-fit items-center gap-2 text-sm font-semibold text-[#0f8a62] transition-colors hover:text-[#0b7653] hover:underline"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to login
        </Link>
      </form>
    </>
  );
}

ForgotPassword.layout = {
  asDirectChild: false,
  title: 'Recover your account',
  description:
    'Enter your email and we’ll send you a secure link to choose a new password.',
};
