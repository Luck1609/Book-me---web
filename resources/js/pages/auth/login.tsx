import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { Checkbox } from '@/components/form/checkbox';
import { Input, Password } from '@/components/form/input';
import SubmitButton from '@/components/form/submit-button';
import { Label } from '@/components/ui/label';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import SocialAuthButtons, { AlternateLogin } from './social-buttons';

export default function Login() {
  const form = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.post(store().url);
  };

  return (
    <>
      <Head title="Log in" />

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
            label={<Label htmlFor="password">Password</Label>}
            placeholder="Enter your password"
            autoComplete="current-password"
            form={form}
          />

          <div className="grid lg:grid-cols-2 gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Checkbox
              name="remember"
              tabIndex={3}
              isBoolean
              label="Remember me"
              form={form}
              classNames={{
                field: {
                  wrapper:
                    'flex items-center space-x-3 border-none has-data-[state=checked]:border-none has-data-[state=checked]:bg-background',
                  container: 'p-0!',
                },
              }}
            />

            <Link
              href={request()}
              className="text-sm text-right font-semibold text-[#0f8a62] transition-colors hover:text-[#0b7653] hover:underline"
              tabIndex={4}
            >
              Forgot password?
            </Link>
          </div>

          <SubmitButton
            label="Log in"
            className="w-full rounded-xl bg-[#0f8a62] text-white shadow-[0_10px_22px_rgba(15,138,98,0.18)] hover:bg-[#0b7653]"
            form={form}
            tabIndex={5}
          />
        </div>

        <AlternateLogin />

        <SocialAuthButtons />

        <p className="mt-6 text-center text-sm text-[#718282]">
          New to Book Me?{' '}
          <Link
            href={register()}
            tabIndex={6}
            className="font-bold text-[#0f8a62] transition-colors hover:text-[#0b7653] hover:underline"
          >
            Create an account
          </Link>
        </p>
      </form>
    </>
  );
}

Login.layout = {
  asDirectChild: false,
  title: 'Welcome back',
  description:
    'Log in to keep your schedule moving and your day feeling clear.',
};
