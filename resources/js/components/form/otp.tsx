import type { InertiaFormProps } from '@inertiajs/react';
import type { OTPInputProps } from 'input-otp';
import type { UseHttpPrecognitiveProps } from 'node_modules/@inertiajs/react/types/useHttp';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { cn, handleFormData } from '@/lib/utils';

type InputOTPProps = Omit<OTPInputProps, 'children' | 'render'>;

type Props<T extends object> = Omit<InputOTPProps, 'form' | 'maxLength'> & {
  label?: string | React.ReactNode;
  name: string;
  maxLength?: number;
  classNames?: {
    wrapper?: string;
    label?: string;
    container?: string;
    error?: string;
    input?: string;
  };
  form: InertiaFormProps<T> | UseHttpPrecognitiveProps<T>;
};

export function OTP<T extends object>({
  classNames,
  label,
  name,
  form,
  maxLength = 6,
  ...props
}: Props<T>) {
  let componentProps: InputOTPProps = {
    maxLength,
    ...props,
  };
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

    const handleChange = (value: string) => {
      if (handleFormChange) {
        handleFormChange(value);
      }
    };

    const handleBlur = () => {
      touch?.();
      validate?.();
    };

    componentProps = {
      maxLength,
      value: (value as string) ?? '',
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
            className={cn('font-medium', classNames?.label)}
          >
            {label}
          </Label>
        ) : (
          label
        )
      ) : null}

      <InputOTP id={name} name={name} {...componentProps}>
        <InputOTPGroup className={cn('gap-5', classNames?.container)}>
          {Array.from({ length: maxLength }, (_, index) => (
            <InputOTPSlot
              key={index}
              index={index}
              className={cn('shadow-none', classNames?.input)}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>

      {/* Validation error display */}
      {invalid?.() && error && (
        <small className={cn('text-sm text-red-500', classNames?.error)}>
          {error as string}
        </small>
      )}
    </div>
  );
}
