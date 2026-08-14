// Components
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import type { FormEvent } from 'react';
import { ForgotPasswordIcon } from '@/assets/icons';
import background from "@/assets/images/forgot-password.webp"
import { Input } from '@/components/form/input';
import SubmitButton from '@/components/form/submit-button';
import { Button } from '@/components/ui/button';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword() {
  const form = useForm({
    email: "",
  })


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.post(email().url)
  }

  return (
    <>
      <Head title="Forgot password" />

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


          <SubmitButton
            label="Request reset link"
            className="w-full"
            form={form}
            tabIndex={5}
          />
        </div>

        <div className="w-full mt-4">
          <Link href={login()} tabIndex={5} className="flex items-center justify-center gap-2 text-primary hover:underline">
            <Button variant="ghost" className="text-primary">
              <ArrowLeft className="size-4" />
              <span className="uppercase">Back to login</span>
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
}



ForgotPassword.layout = {
  classNames: {
    wrapper: "border rounded-xl overflow-hidden",
    container: "sm:w-110 items-center p-5"
  },
  icon: <ForgotPasswordIcon className="size-56" />,
  asDirectChild: false,
  title: "Forgot password",
  description: "Enter your email to receive a password reset link",
  backgroundImage: background
}
