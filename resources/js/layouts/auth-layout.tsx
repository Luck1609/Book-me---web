import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { NoticeProvider } from '@/contexts/notice-context';
import { cn } from '@/lib/utils';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthLayout({
  children,
  title,
  description,
  classNames,
  icon,
  backgroundImage,
  asDirectChild = true
}: AuthLayoutProps) {

  return (
    <NoticeProvider>
      {
        !asDirectChild
          ? (
            <div className="bg-background relative grid h-dvh items-center justify-center px-8 sm:px-0">
              <div className={cn("bg-card grid lg:grid-cols-2 lg:px-0", classNames?.wrapper)}>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                  <div className="absolute inset-0  after:bg-zinc-900/10 after:z-1 after:absolute after:w-full after:h-full bg-cover" style={{ backgroundImage: `url('${backgroundImage}')`,  }} />
                  <Link
                    href={home()}
                    className="relative z-20 flex items-center text-lg font-medium"
                  >
                    <AppLogoIcon className="mr-2 size-8 fill-current text-white" />
                    Book Me
                  </Link>
                </div>

                  <div className={cn("mx-auto flex w-full flex-col justify-center space-y-6 lg:px-8 lg:py-10", classNames?.container)}>
                    {icon}

                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                      <h1 className="text-xl font-bold">{title}</h1>
                      <p className="text-sm text-balance text-muted-foreground">
                        {description}
                      </p>
                    </div>
                    {children}
                  </div>
                </div>
            </div>
          )
          : children
      }
    </NoticeProvider>
  );
}
