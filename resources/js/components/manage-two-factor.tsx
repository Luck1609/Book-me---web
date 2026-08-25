import { Form } from '@inertiajs/react';
import { CheckCircle2, ShieldCheck, Smartphone } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import TwoFactorRecoveryCodes from '@/components/two-factor-recovery-codes';
import TwoFactorSetupModal from '@/components/two-factor-setup-modal';
import { Button } from '@/components/ui/button';
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth';
import { disable, enable } from '@/routes/two-factor';

export type Props = {
  canManageTwoFactor?: boolean;
  requiresConfirmation?: boolean;
  twoFactorEnabled?: boolean;
};

export default function ManageTwoFactor(props: Props) {
  const requiresConfirmation = props.requiresConfirmation ?? false;
  const twoFactorEnabled = props.twoFactorEnabled ?? false;

  const {
    qrCodeSvg,
    hasSetupData,
    manualSetupKey,
    clearSetupData,
    clearTwoFactorAuthData,
    fetchSetupData,
    recoveryCodesList,
    fetchRecoveryCodes,
    errors,
  } = useTwoFactorAuth();
  const [showSetupModal, setShowSetupModal] = useState<boolean>(false);
  const prevTwoFactorEnabled = useRef(twoFactorEnabled);

  useEffect(() => {
    if (prevTwoFactorEnabled.current && !twoFactorEnabled) {
      clearTwoFactorAuthData();
    }

    prevTwoFactorEnabled.current = twoFactorEnabled;
  }, [twoFactorEnabled, clearTwoFactorAuthData]);

  if (!(props.canManageTwoFactor ?? false)) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-[#dceae4] bg-white shadow-[0_16px_45px_rgba(23,52,60,0.06)] dark:border-white/10 dark:bg-[#17221f]">
      <div className="flex flex-col gap-4 border-b border-[#e7f0ec] bg-[#fbfefc] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 dark:border-white/8 dark:bg-[#17221f]">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#edf7fb] text-[#2d6980] dark:bg-[#2d6980]/15 dark:text-[#9bd1e4]">
            <Smartphone aria-hidden="true" className="size-5" />
          </span>
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-[#2d6980] uppercase dark:text-[#9bd1e4]">
              Extra sign-in protection
            </p>
            <h2 className="mt-0.5 text-lg font-bold text-[#17343c] dark:text-white">
              Two-factor authentication
            </h2>
          </div>
        </div>
        <span
          className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${twoFactorEnabled ? 'bg-[#d9f7e8] text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]' : 'bg-[#fff4eb] text-[#a55c2d] dark:bg-[#a55c2d]/15 dark:text-[#f0b58b]'}`}
        >
          <span
            className={`size-1.5 rounded-full ${twoFactorEnabled ? 'bg-[#0f8a62]' : 'bg-[#d8864e]'}`}
          />
          {twoFactorEnabled ? 'Enabled' : 'Not enabled'}
        </span>
      </div>

      <div className="space-y-6 p-5 sm:p-8">
        {twoFactorEnabled ? (
          <div className="space-y-5">
            <div className="flex items-start gap-3 rounded-2xl bg-[#f4fbf7] p-4 dark:bg-[#0f8a62]/10">
              <CheckCircle2
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-[#0f8a62] dark:text-[#8fe0bb]"
              />
              <p className="text-sm leading-6 text-[#41645a] dark:text-[#c4d8d1]">
                Your account asks for a secure, time-based code from your
                authenticator app whenever you sign in on a new device.
              </p>
            </div>

            <Form {...disable.form()}>
              {({ processing }) => (
                <Button
                  variant="destructive"
                  type="submit"
                  disabled={processing}
                  className="rounded-xl"
                >
                  Disable 2FA
                </Button>
              )}
            </Form>

            <TwoFactorRecoveryCodes
              recoveryCodesList={recoveryCodesList}
              fetchRecoveryCodes={fetchRecoveryCodes}
              errors={errors}
            />
          </div>
        ) : (
          <div className="space-y-5">
            <p className="max-w-2xl text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
              Add an authenticator app to require a secure code at sign-in. It
              keeps your account protected even if someone learns your password.
            </p>

            {hasSetupData ? (
              <Button
                onClick={() => setShowSetupModal(true)}
                className="rounded-xl bg-[#0f8a62] text-white hover:bg-[#0b7653]"
              >
                <ShieldCheck />
                Continue setup
              </Button>
            ) : (
              <Form
                {...enable.form()}
                onSuccess={() => setShowSetupModal(true)}
              >
                {({ processing }) => (
                  <Button
                    type="submit"
                    disabled={processing}
                    className="rounded-xl bg-[#0f8a62] text-white hover:bg-[#0b7653]"
                  >
                    Enable 2FA
                  </Button>
                )}
              </Form>
            )}
          </div>
        )}
      </div>

      <TwoFactorSetupModal
        isOpen={showSetupModal}
        onClose={() => setShowSetupModal(false)}
        requiresConfirmation={requiresConfirmation}
        twoFactorEnabled={twoFactorEnabled}
        qrCodeSvg={qrCodeSvg}
        manualSetupKey={manualSetupKey}
        clearSetupData={clearSetupData}
        fetchSetupData={fetchSetupData}
        errors={errors}
      />
    </section>
  );
}
