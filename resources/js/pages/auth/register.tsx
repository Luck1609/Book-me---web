import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { Input, Password } from '@/components/form/input';
import SubmitButton from '@/components/form/submit-button';
import { login, privacy, register, terms } from '@/routes';
import SocialAuthButtons, { AlternateLogin } from './social-buttons';

export default function Register() {
  const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.post(register().url);
  };

  return (
    <>
      <Head title="Create an account" />

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            name="name"
            label="Full name"
            placeholder="Nathan Luck"
            autoComplete="name"
            form={form}
            tabIndex={1}
          />

          <Input
            type="email"
            name="email"
            label="Email address"
            placeholder="email@example.com"
            autoComplete="email"
            form={form}
            tabIndex={2}
          />

          <Password
            name="password"
            tabIndex={3}
            label="Password"
            placeholder="Create a password"
            autoComplete="new-password"
            form={form}
          />

          <Password
            name="password_confirmation"
            tabIndex={4}
            label="Confirm password"
            placeholder="Repeat your password"
            autoComplete="new-password"
            form={form}
          />

          <div className="sm:col-span-2">
            <SubmitButton
              label="Create my account"
              className="w-full rounded-xl bg-[#0f8a62] text-white shadow-[0_10px_22px_rgba(15,138,98,0.18)] hover:bg-[#0b7653]"
              form={form}
              tabIndex={5}
            />
          </div>
        </div>

        <p className="mt-5 text-center text-xs leading-5 text-[#849292]">
          By creating an account, you agree to our{' '}
          <Link
            className="font-semibold text-[#0f8a62] hover:underline"
            href={terms()}
          >
            Terms
          </Link>{' '}
          and{' '}
          <Link
            className="font-semibold text-[#0f8a62] hover:underline"
            href={privacy()}
          >
            Privacy Policy
          </Link>
          .
        </p>

        <AlternateLogin />

        <SocialAuthButtons />

        <p className="mt-6 text-center text-sm text-[#718282]">
          Already have an account?{' '}
          <Link
            href={login()}
            tabIndex={6}
            className="font-bold text-[#0f8a62] transition-colors hover:text-[#0b7653] hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </>
  );
}

Register.layout = {
  asDirectChild: false,
  title: 'Create your account',
  description:
    'Set up your Book Me account and make space for more of the work you love.',
};
