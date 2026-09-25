import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';

export default function ThemeToggle() {
  const { resolvedAppearance, updateAppearance } = useAppearance();
  const [isMounted, setIsMounted] = useState(false);
  const isDark = isMounted && resolvedAppearance === 'dark';
  const nextAppearance = isDark ? 'light' : 'dark';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => updateAppearance(nextAppearance)}
      aria-label={`Switch to ${nextAppearance} mode`}
      title={`Switch to ${nextAppearance} mode`}
      className="size-9 rounded-xl text-[#41645a] hover:bg-[#e9f8f0] hover:text-[#0f8a62] dark:text-[#c4d8d1] dark:hover:bg-[#0f8a62]/15 dark:hover:text-[#8fe0bb]"
    >
      {isDark ? (
        <Sun aria-hidden="true" className="size-4.5" />
      ) : (
        <Moon aria-hidden="true" className="size-4.5" />
      )}
    </Button>
  );
}
