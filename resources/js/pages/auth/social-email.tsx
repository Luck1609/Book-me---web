import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Mail } from 'lucide-react';
import type { FormEvent } from 'react';
import { Input } from '@/components/form/input';
import SubmitButton from '@/components/form/submit-button';
import { login } from '@/routes';
import { store } from '@/routes/auth/social/email';

type SocialEmailProps = {
  provider: string;
};

export default function SocialEmail({ provider }: SocialEmailProps) {
  const form = useForm({
    email: '',
  }).withPrecognition('post', store().url);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.submit();
  };

  return (
    <>
      <Head title="Complete your account" />

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="grid gap-5">
          <div className="flex items-start gap-3 rounded-2xl bg-[#f7faf8] px-4 py-3 text-sm leading-5 text-[#718282]">
            <Mail
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-[#0f8a62]"
            />
            <p>
              {provider} did not provide an email address. Add one to finish
              creating your Book Me account.
            </p>
          </div>

          <Input
            type="email"
            name="email"
            label="Email address"
            placeholder="email@example.com"
            autoComplete="email"
            autoFocus
            form={form}
            tabIndex={1}
          />

          <SubmitButton
            label="Continue"
            className="w-full rounded-xl bg-[#0f8a62] text-white shadow-[0_10px_22px_rgba(15,138,98,0.18)] hover:bg-[#0b7653]"
            form={form}
            tabIndex={2}
          />
        </div>

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

SocialEmail.layout = {
  asDirectChild: false,
  title: 'One last step',
  description:
    'Add your email so we can secure your account and keep you connected to Book Me.',
};
