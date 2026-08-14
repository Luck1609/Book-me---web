import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { MobileLoginIcon } from '@/assets/icons';
import background from '@/assets/images/book.webp';
import { Checkbox } from '@/components/form/checkbox';
import { Input, Password } from '@/components/form/input';
import SubmitButton from '@/components/form/submit-button';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import SocialAuthButtons, { AlternateLogin } from './social-buttons';


export default function Login() {
  const form = useForm({
    email: "",
    password: ""
  })


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.post(store().url)
  }

  return (
    <>
      <Head title="Log in" />

      <AuthLayout
        classNames={{
          wrapper: "border rounded-xl overflow-hidden",
          container: "sm:w-130 items-center p-5"
        }}
        icon={
          <MobileLoginIcon className="size-56" />
        }
        title="Welcome Back"
        description="Login and let's jump back in where you left off"
        backgroundImage={background}
      >
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <Input
              type="email"
              name="email"
              label="Email address"
              placeholder="email@example.com"
              form={form}
              tabIndex={1}
            />

            <Password
              name="password"
              tabIndex={2}
              label={
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
              }
              placeholder="Enter your password"
              form={form}
            />

            <div className="flex items-center justify-between space-x-3">
              <div className="lg:w-2/3">
                <Checkbox
                  name="remember"
                  tabIndex={4}
                  isBoolean
                  label="Remember me"
                  form={form}
                  classNames={{
                    field: {
                      wrapper: "flex items-center space-x-3 border-none has-data-[state=checked]:border-none has-data-[state=checked]:bg-background",
                      container: "p-0!"
                    }
                  }}
                />
              </div>

              <div className="lg:w-1/3">
                <Link
                  href={request()}
                  className="font-medium text-primary text-sm hover:underline"
                // tabIndex={3}
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <SubmitButton
              label="Log in"
              className="w-full"
              form={form}
              tabIndex={5}
            />
          </div>

          <AlternateLogin />

          <SocialAuthButtons />

          <div className="text-center text-sm text-muted-foreground mt-4">
            Don't have an account?{' '}
            <Link href={register()} tabIndex={5} className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </AuthLayout>
    </>
  );
}
