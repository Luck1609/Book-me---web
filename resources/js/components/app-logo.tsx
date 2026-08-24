import AppLogoIcon from '@/components/app-logo-icon';

export function AppLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <AppLogoIcon />
      <span className="text-[1.15rem] font-bold tracking-[-0.04em] text-[#162d35]">
        Book<span className="text-[#0f8a62]">Me</span>
      </span>
    </div>
  );
}

export default AppLogo;
