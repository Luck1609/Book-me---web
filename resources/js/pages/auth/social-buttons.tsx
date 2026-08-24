import facebook from '@/assets/images/facebook.png';
import google from '@/assets/images/google.webp';
import tiktok from '@/assets/images/tiktok.webp';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const strategies = [
  {
    label: 'Google',
    logo: google,
    value: 'google',
  },
  {
    label: 'Facebook',
    logo: facebook,
    value: 'facebook',
  },
  {
    label: 'TikTok',
    logo: tiktok,
    value: 'tiktok',
  },
];

export default function SocialAuthButtons({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn('mx-auto flex w-full justify-center gap-3', className)}>
      {strategies.map((strategy) => (
        <Button
          key={strategy.value}
          type="button"
          variant="outline"
          // size="icon-lg"
          aria-label={`Continue with ${strategy.label}`}
          className="border-[#dfe9e4] bg-white shadow-none hover:border-[#b5dfcb] hover:bg-[#f3faf6]"
        >
          <img src={strategy.logo} alt="" className="size-5" />
          <span className="font-medium">{ strategy.label }</span>
        </Button>
      ))}
    </div>
  );
}

export const AlternateLogin = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'relative flex w-full items-center justify-center gap-4 py-5',
        className,
      )}
    >
      <div className="absolute h-px w-full bg-[#e8efeb]" />
      <span className="relative z-1 bg-white px-3 text-xs font-semibold tracking-[0.08em] text-[#8a9a9b] uppercase">
        Or continue with
      </span>
    </div>
  );
};
