import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { PasswordResetIcon } from '@/assets/icons';
import background from '@/assets/images/password-reset.webp';
import { Password } from '@/components/form/input';
import SubmitButton from '@/components/form/submit-button';
import AuthLayout from '@/layouts/auth-layout';
import { update } from '@/routes/password';


export default function ResetPassword() {
  const form = useForm({
    email: "",
    password: "",
    password_confirmation: "",
  })


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.post(update().url)
  }

  return (
    <>
      <Head title="Reset Password" />

      <AuthLayout
        classNames={{
          wrapper: "border rounded-xl overflow-hidden",
          container: "sm:w-105 items-center p-5"
        }}
        icon={
          <PasswordResetIcon className="size-56" />
        }
        title="Reset password"
        description="Please enter your new password below"
        backgroundImage={background}
      >
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="grid gap-6">

            <Password
              name="password"
              tabIndex={2}
              label="Password"
              placeholder="**********"
              form={form}
            />

            <Password
              name="password_confirmation"
              tabIndex={2}
              label="Password confirmation"
              placeholder="***********"
              form={form}
            />

            <SubmitButton
              label="Reset Pasword"
              className="w-full"
              form={form}
              tabIndex={5}
            />
          </div>
        </form>
      </AuthLayout>
    </>
  );
}
