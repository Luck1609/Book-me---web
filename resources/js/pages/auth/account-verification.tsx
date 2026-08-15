import { Head, Link, useForm } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import type { FormEvent } from 'react';
import { PasswordResetIcon } from '@/assets/icons';
import background from '@/assets/images/verify.webp';
import { OTP } from '@/components/form/otp';
import SubmitButton from '@/components/form/submit-button';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { logout } from '@/routes';
import { update } from '@/routes/password';


export default function AccountVerification() {
  const form = useForm({
    otp: "",
  })


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.post(update().url)
  }


  console.log('Otp form data', form.data.otp)

  return (
    <>
      <Head title="Email verification" />

      <AuthLayout
        classNames={{
          wrapper: "border rounded-xl overflow-hidden",
          container: "sm:w-110 items-center p-5"
        }}
        icon={
          <PasswordResetIcon className="size-56" />
        }
        title="Email verification"
        description="Please verify your email address by typing in your OTP"
        backgroundImage={background}
      >
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="grid gap-6">

            <OTP
              name="otp"
              form={form}
              classNames={{
                container: "gap-3",
                input: "rounded-lg border size-12"
              }}
            />

            <SubmitButton
              label="Reset Pasword"
              className="w-full"
              form={form}
              tabIndex={5}
            />
          </div>

          <div className="w-full mt-4">
            <Link href={logout()} tabIndex={5} className="w-full flex items-center justify-center gap-2 text-primary hover:underline">
              <Button variant="ghost" className="text-primary">
                <LogOut className="size-4 stroke-destructive" />
                <span className="uppercase text-destructive">Logout</span>
              </Button>
            </Link>
          </div>
        </form>
      </AuthLayout>
    </>
  );
}
