import { Form, Head } from '@inertiajs/react';
import {
  CheckCircle2,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { useRef } from 'react';
import SecurityController from '@/actions/App/Http/Controllers/Settings/SecurityController';
import InputError from '@/components/input-error';
import type { Props as ManagePasskeysProps } from '@/components/manage-passkeys';
import ManagePasskeys from '@/components/manage-passkeys';
import type { Props as ManageTwoFactorProps } from '@/components/manage-two-factor';
import ManageTwoFactor from '@/components/manage-two-factor';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { edit } from '@/routes/security';

type Props = {
  passwordRules: string;
} & ManagePasskeysProps &
  ManageTwoFactorProps;

function ProtectionStat({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof LockKeyhole;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="flex items-center gap-3 border-t border-white/10 pt-4 sm:border-t-0 sm:border-l sm:pl-5 first:sm:border-l-0 first:sm:pl-0">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#9be4c2]">
        <Icon aria-hidden="true" className="size-[18px]" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-[#b8c9c7]">{label}</p>
        <p className="mt-0.5 truncate text-sm font-bold text-white">{value}</p>
        <p className="mt-0.5 truncate text-[11px] text-[#8fa9a4]">{detail}</p>
      </div>
    </div>
  );
}

export default function Security(props: Props) {
  const passwordInput = useRef<HTMLInputElement>(null);
  const currentPasswordInput = useRef<HTMLInputElement>(null);
  const twoFactorEnabled = props.twoFactorEnabled ?? false;
  const passkeyCount = props.passkeys?.length ?? 0;
  const activeProtections = [true, twoFactorEnabled, passkeyCount > 0].filter(
    Boolean,
  ).length;
  const protectionLabel =
    activeProtections === 3
      ? 'Fully protected'
      : activeProtections === 2
        ? 'Strong protection'
        : 'Good foundation';

  return (
    <>
      <Head title="Security settings" />

      <h1 className="sr-only">Security settings</h1>

      <div className="space-y-8">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-[#0f8a62] uppercase dark:text-[#8fe0bb]">
              Account protection
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#17343c] dark:text-white">
              Security settings
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
              Keep your sign-in details protected and choose the security tools
              that work best for you.
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e9f8f0] px-3 py-1.5 text-xs font-semibold text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
            <ShieldCheck aria-hidden="true" className="size-3.5" />
            {protectionLabel}
          </div>
        </header>

        <section className="relative overflow-hidden rounded-3xl bg-[#17343c] text-white shadow-[0_18px_45px_rgba(23,52,60,0.14)]">
          <div className="absolute -top-24 -right-16 size-64 rounded-full bg-[#0f8a62]/30 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 size-72 rounded-full bg-[#78d6ae]/10 blur-3xl" />

          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-xl">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-[#0f8a62] text-[#d9f7e8] shadow-lg shadow-black/10">
                    <ShieldCheck aria-hidden="true" className="size-6" />
                  </span>
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-[#8fe0bb] uppercase">
                      Your security posture
                    </p>
                    <h3 className="mt-1 text-xl font-bold sm:text-2xl">
                      {activeProtections} of 3 protections active
                    </h3>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-6 text-[#b8c9c7]">
                  A strong password is your first line of defense. Add
                  two-factor authentication or a passkey for extra peace of
                  mind.
                </p>
              </div>

              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#d9f7e8] px-3 py-1.5 text-xs font-bold text-[#0f6b4d]">
                <span className="size-1.5 rounded-full bg-[#0f8a62]" />
                {protectionLabel}
              </span>
            </div>

            <div className="mt-8 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-3">
              <ProtectionStat
                icon={LockKeyhole}
                label="Password"
                value="Protected"
                detail="Keep it unique and private"
              />
              <ProtectionStat
                icon={Smartphone}
                label="Two-factor authentication"
                value={twoFactorEnabled ? 'Enabled' : 'Not enabled'}
                detail={
                  twoFactorEnabled
                    ? 'Extra sign-in check is active'
                    : 'Add a second layer of protection'
                }
              />
              <ProtectionStat
                icon={KeyRound}
                label="Passkeys"
                value={passkeyCount ? `${passkeyCount} added` : 'Not added'}
                detail={
                  passkeyCount
                    ? 'Passwordless sign-in available'
                    : 'Use your device to sign in'
                }
              />
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-[#dceae4] bg-white shadow-[0_16px_45px_rgba(23,52,60,0.06)] dark:border-white/10 dark:bg-[#17221f]">
          <div className="flex flex-col gap-4 border-b border-[#e7f0ec] bg-[#fbfefc] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 dark:border-white/8 dark:bg-[#17221f]">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#d9f7e8] text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
                <LockKeyhole aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="text-xs font-bold tracking-[0.14em] text-[#0f8a62] uppercase dark:text-[#8fe0bb]">
                  Password & sign-in
                </p>
                <h3 className="mt-0.5 text-lg font-bold text-[#17343c] dark:text-white">
                  Update your password
                </h3>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-5 text-[#70908a] sm:text-right dark:text-[#9cb8b1]">
              Use a password you do not reuse on other websites.
            </p>
          </div>

          <Form
            {...SecurityController.update.form()}
            options={{
              preserveScroll: true,
            }}
            resetOnError={[
              'password',
              'password_confirmation',
              'current_password',
            ]}
            resetOnSuccess
            onError={(errors) => {
              if (errors.password) {
                passwordInput.current?.focus();
              }

              if (errors.current_password) {
                currentPasswordInput.current?.focus();
              }
            }}
          >
            {({ errors, processing, wasSuccessful }) => (
              <>
                <div className="grid gap-5 p-5 sm:p-8">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="current_password"
                      className="text-[#41645a] dark:text-[#c4d8d1]"
                    >
                      Current password
                    </Label>
                    <PasswordInput
                      id="current_password"
                      ref={currentPasswordInput}
                      name="current_password"
                      className="h-12 rounded-xl border-[#dceae4] bg-[#fbfefc] dark:border-white/10 dark:bg-[#101917]"
                      autoComplete="current-password"
                      placeholder="Enter your current password"
                    />
                    <InputError message={errors.current_password} />
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label
                        htmlFor="password"
                        className="text-[#41645a] dark:text-[#c4d8d1]"
                      >
                        New password
                      </Label>
                      <PasswordInput
                        id="password"
                        ref={passwordInput}
                        name="password"
                        className="h-12 rounded-xl border-[#dceae4] bg-[#fbfefc] dark:border-white/10 dark:bg-[#101917]"
                        autoComplete="new-password"
                        placeholder="Create a new password"
                        passwordrules={props.passwordRules}
                      />
                      <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                      <Label
                        htmlFor="password_confirmation"
                        className="text-[#41645a] dark:text-[#c4d8d1]"
                      >
                        Confirm password
                      </Label>
                      <PasswordInput
                        id="password_confirmation"
                        name="password_confirmation"
                        className="h-12 rounded-xl border-[#dceae4] bg-[#fbfefc] dark:border-white/10 dark:bg-[#101917]"
                        autoComplete="new-password"
                        placeholder="Repeat your new password"
                        passwordrules={props.passwordRules}
                      />
                      <InputError message={errors.password_confirmation} />
                    </div>
                  </div>
                </div>

                <footer className="flex flex-col gap-3 border-t border-[#e7f0ec] bg-[#fbfcfa] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 dark:border-white/8 dark:bg-[#17221f]">
                  <p className="flex items-center gap-2 text-xs text-[#91aaa2]">
                    {wasSuccessful && (
                      <CheckCircle2
                        aria-hidden="true"
                        className="size-4 text-[#0f8a62]"
                      />
                    )}
                    {wasSuccessful
                      ? 'Password updated successfully.'
                      : 'Your password is encrypted and never shared.'}
                  </p>
                  <Button
                    type="submit"
                    disabled={processing}
                    data-test="update-password-button"
                    className="rounded-xl bg-[#0f8a62] px-5 text-white shadow-[0_10px_22px_rgba(15,138,98,0.18)] hover:bg-[#0b7653]"
                  >
                    {processing ? 'Updating...' : 'Update password'}
                  </Button>
                </footer>
              </>
            )}
          </Form>
        </section>

        <ManageTwoFactor
          canManageTwoFactor={props.canManageTwoFactor}
          requiresConfirmation={props.requiresConfirmation}
          twoFactorEnabled={props.twoFactorEnabled}
        />

        <ManagePasskeys
          canManagePasskeys={props.canManagePasskeys}
          passkeys={props.passkeys}
        />
      </div>
    </>
  );
}

Security.layout = {
  breadcrumbs: [
    {
      title: 'Security settings',
      href: edit(),
    },
  ],
};
