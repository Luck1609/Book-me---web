import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { SignupIcon } from '@/assets/icons';
import background from "@/assets/images/login.webp"
import { Input, Password } from '@/components/form/input';
import SubmitButton from '@/components/form/submit-button';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';
import { store } from '@/routes/register';
import SocialAuthButtons, { AlternateLogin } from './social-buttons';


export default function Register() {
  const form = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  })


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.post(store().url)
  }

  return (
    <>
      <Head title="Register" />

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-2 gap-6">
          <Input
            name="name"
            label="Name"
            placeholder="Nathan Luck"
            form={form}
            tabIndex={1}
          />

          <Input
            type="email"
            name="email"
            label="Email address"
            placeholder="email@example.com"
            form={form}
            tabIndex={2}
          />

          <Password
            name="password"
            tabIndex={3}
            label={
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
            }
            placeholder="Enter your password"
            form={form}
          />

          <Password
            name="password_confirmation"
            tabIndex={4}
            label={
              <div className="flex items-center">
                <Label htmlFor="password">Password confirmation</Label>
              </div>
            }
            placeholder="Enter your password"
            form={form}
          />

          <div className="flex justify-center lg:col-span-2">
            <SubmitButton
              label="Log in"
              className="w-2/3"
              form={form}
              tabIndex={5}
            />
          </div>
        </div>

        <AlternateLogin />

        <SocialAuthButtons />

        <div className="text-center text-sm text-muted-foreground mt-4">
          Don't have an account?{' '}
          <Link href={login()} tabIndex={5} className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </>
  );
}


Register.layout = {
  classNames: {
    wrapper: "border rounded-xl overflow-hidden",
    container: "sm:w-160 items-center p-5"
  },
  icon: <SignupIcon className="size-56" />,
  asDirectChild: false,
  title: "Create an account",
  description: "Enter your details below to create your account",
  backgroundImage: background
}
