import type { InertiaFormProps } from '@inertiajs/react';
import { Eye, EyeClosed } from 'lucide-react';
import type { UseHttpPrecognitiveProps } from 'node_modules/@inertiajs/react/types/useHttp';
import * as React from 'react';

import { Input as InputComponent } from '@/components/ui/input';
import { InputGroup, InputGroupAddon } from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { cn, handleFormData } from '@/lib/utils';
import type { Icon } from '@/types';

type Props<T extends object> = Omit<React.ComponentProps<'input'>, 'form'> & {
  label?: string | React.ReactNode;
  name: string;
  classNames?: {
    label?: string;
    error?: string;
    wrapper?: string;
    container?: string;
    passwordIcon?: string;
    prefixIcon?: string;
    prependIcon?: string;
  };
  form: InertiaFormProps<T> | UseHttpPrecognitiveProps<T>;
  icons?: {
    prefixIcon?: Icon;
    prependIcon?: Icon;
  };
};

export function Input<T extends object>({
  classNames,
  label,
  name,
  form,
  icons,
  ...props
}: Props<T>) {
  let componentProps = { ...props };
  let error = null;
  let validate: (() => void) | undefined;
  let touch: (() => void) | undefined;
  let invalid: (() => boolean) | undefined;

  if (form) {
    const {
      value,
      error: formError,
      handleChange: handleFormChange,
      validate: formValidate,
      touch: formTouch,
      invalid: formInvalid,
    } = handleFormData(name, form) || {};
    error = formError;
    validate = formValidate;
    touch = formTouch;
    invalid = formInvalid;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (handleFormChange) {
        handleFormChange(e.target.value);
      }
    };

    const handleBlur = () => {
      touch?.();
      validate?.();
    };

    componentProps = {
      value,
      onChange: handleChange,
      onBlur: handleBlur,
      ...props,
    };
  }

  return (
    <div className={cn('relative w-full space-y-1.5', classNames?.wrapper)}>
      {label ? (
        typeof label === 'string' ? (
          <Label
            htmlFor={name}
            className={cn(
              'text-xs font-medium text-[#70908a] dark:text-[#9cb8b1]',
              classNames?.label,
            )}
          >
            {label}
          </Label>
        ) : (
          label
        )
      ) : null}

      <InputGroup className={cn('', classNames?.container)}>
        <InputComponent
          id={name}
          name={name}
          {...componentProps}
          className={cn(
            'absolute top-0 left-0 z-0 h-full w-full border-none',
            icons?.prefixIcon ? 'pl-10' : '',
            componentProps.className,
          )}
        />

        {icons?.prefixIcon && (
          <InputGroupAddon align="inline-start">
            <icons.prefixIcon className={cn('z-1', classNames?.prefixIcon)} />
          </InputGroupAddon>
        )}
        {icons?.prependIcon && (
          <InputGroupAddon align="inline-end">
            {icons?.prependIcon && (
              <icons.prependIcon
                className={cn('relative z-50', classNames?.prependIcon)}
              />
            )}
          </InputGroupAddon>
        )}
      </InputGroup>

      {/* Validation error display - shows when field is invalid (touched or has error) */}
      {invalid?.() && error && (
        <small className={cn('text-sm text-red-500', classNames?.error)}>
          {error as string}
        </small>
      )}
    </div>
  );
}

export function Password<T extends object>(options: Props<T>) {
  const [showText, setShowText] = React.useState(false);

  const toggleShowText = () => setShowText((prev) => !prev);

  const Icon = () =>
    !showText ? (
      <Eye
        onClick={toggleShowText}
        className={cn(
          'absolute right-3.5 cursor-pointer',
          props?.classNames?.prependIcon,
        )}
      />
    ) : (
      <EyeClosed
        onClick={toggleShowText}
        className={cn(
          'absolute right-3.5 cursor-pointer',
          props?.classNames?.prependIcon,
        )}
      />
    );

  const { icons, ...props } = options;

  const componentProps = {
    type: showText ? 'text' : 'password',
    ...props,
    className: cn('', props.className),
    icons: {
      ...icons,
      prependIcon: Icon,
    },
  };

  return <Input {...componentProps} />;
}
