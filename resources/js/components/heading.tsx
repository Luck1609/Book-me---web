import type { JSX, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  title: ReactNode;
  description?: ReactNode;
  variant?: 'default' | 'small';
  headingLevel?: HeadingLevelType;
  classNames?: {
    container?: string;
    title?: string;
    description?: string;
  };
};

export default function Heading({
  title,
  headingLevel = 2,
  description,
  variant = 'default',
  classNames,
}: Props) {
  return (
    <header
      className={cn(
        variant === 'small' ? '' : 'space-y-1',
        classNames?.container,
      )}
    >
      {typeof title !== 'string' ? (
        title
      ) : (
        <HeadingLevel
          level={headingLevel}
          className={cn(
            'text-2xl font-bold text-foreground',
            classNames?.title,
          )}
        >
          {title}
        </HeadingLevel>
      )}
      {description &&
        (typeof description === 'string' ? (
          <p
            className={cn(
              'mt-0.5 text-sm text-muted-foreground',
              classNames?.description,
            )}
          >
            {description}
          </p>
        ) : (
          description
        ))}
    </header>
  );
}

type HeadingLevelType = 1 | 2 | 3 | 4 | 5 | 6;

function HeadingLevel({
  level,
  children,
  ...props
}: {
  level: HeadingLevelType;
  children: ReactNode;
} & JSX.IntrinsicElements['h1']) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  return <Tag {...props}>{children}</Tag>;
}
