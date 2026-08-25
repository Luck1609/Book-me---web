import { router } from '@inertiajs/react';
import { CheckCircle2, KeyRound } from 'lucide-react';
import { destroy } from '@/actions/Laravel/Passkeys/Http/Controllers/PasskeyRegistrationController';
import PasskeyItem from '@/components/passkey-item';
import PasskeyRegistration from '@/components/passkey-register';
import type { Passkey } from '@/types/auth';

export type Props = {
  canManagePasskeys?: boolean;
  passkeys?: Passkey[];
};

const EmptyState = () => {
  return (
    <div className="bg-[#fbfefc] p-8 text-center dark:bg-[#101917]">
      <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#f3f0ff] text-[#685bb4] dark:bg-[#685bb4]/15 dark:text-[#c0b8ec]">
        <KeyRound aria-hidden="true" className="size-7" />
      </div>
      <p className="font-bold text-[#17343c] dark:text-white">
        No passkeys yet
      </p>
      <p className="mt-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
        Add a passkey to sign in quickly without typing a password.
      </p>
    </div>
  );
};

export default function ManagePasskeys(props: Props) {
  const passkeys = props.passkeys ?? [];

  const handleDelete = (id: number, onError: () => void) => {
    router.delete(destroy.url(String(id)), {
      preserveScroll: true,
      onError,
    });
  };

  const handleRegisterSuccess = () => {
    router.reload();
  };

  if (!(props.canManagePasskeys ?? false)) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-[#dceae4] bg-white shadow-[0_16px_45px_rgba(23,52,60,0.06)] dark:border-white/10 dark:bg-[#17221f]">
      <div className="flex flex-col gap-4 border-b border-[#e7f0ec] bg-[#fbfefc] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 dark:border-white/8 dark:bg-[#17221f]">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#f3f0ff] text-[#685bb4] dark:bg-[#685bb4]/15 dark:text-[#c0b8ec]">
            <KeyRound aria-hidden="true" className="size-5" />
          </span>
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-[#685bb4] uppercase dark:text-[#c0b8ec]">
              Passwordless access
            </p>
            <h2 className="mt-0.5 text-lg font-bold text-[#17343c] dark:text-white">
              Passkeys
            </h2>
          </div>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f3f0ff] px-3 py-1.5 text-xs font-bold text-[#685bb4] dark:bg-[#685bb4]/15 dark:text-[#c0b8ec]">
          <CheckCircle2 aria-hidden="true" className="size-3.5" />
          {passkeys.length
            ? `${passkeys.length} ${passkeys.length === 1 ? 'device' : 'devices'} connected`
            : 'No devices connected'}
        </span>
      </div>

      <div className="space-y-6 p-5 sm:p-8">
        <p className="max-w-2xl text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
          Passkeys use your device&apos;s biometrics or screen lock to verify
          it&apos;s you. They are fast, private, and resistant to phishing.
        </p>

        <div className="overflow-hidden rounded-2xl border border-[#e7f0ec] dark:border-white/8">
          {passkeys.length > 0 ? (
            passkeys.map((passkey) => (
              <PasskeyItem
                key={passkey.id}
                passkey={passkey}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>

        <PasskeyRegistration onSuccess={handleRegisterSuccess} />
      </div>
    </section>
  );
}
