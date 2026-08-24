import type { InertiaFormProps } from '@inertiajs/react';
import type { UseHttpPrecognitiveProps } from 'node_modules/@inertiajs/react/types/useHttp';
import type { Checkbox as CheckboxPrimitive } from 'radix-ui';
import * as React from 'react';

import { Checkbox as CheckboxComponent } from '@/components/ui/checkbox';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { cn, handleFormData } from '@/lib/utils';
import type { SelectOptions } from '@/types';

type Props<T extends object> = Omit<
  React.ComponentProps<typeof CheckboxPrimitive.Root>,
  'form'
> & {
  description?: string | React.ReactNode;
  name: string;
  label?: React.ReactNode;
  isBoolean?: boolean;
  multiple?: boolean;
  options?: SelectOptions[];
  suppressError?: boolean;
  classNames?: {
    label?: string;
    description?: string;
    error?: string;
    wrapper?: string;
    container?: string;
    field?: {
      wrapper?: string;
      content?: string;
      label?: string;
      description?: string;
      item?: string;
      container?: string;
    };
  };
  form: InertiaFormProps<T> | UseHttpPrecognitiveProps<T>;
  orientation?: 'vertical' | 'horizontal';
};

export function Checkbox<T extends object>({
  classNames,
  label,
  name,
  form,
  isBoolean = false,
  multiple = true,
  options,
  ...props
}: Props<T>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let componentProps = (_option?: SelectOptions) => props;
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

    const updateFormValue = (nextValue: unknown) => {
      if (handleFormChange) {
        handleFormChange(nextValue);
        touch?.();
        validate?.();
      }
    };

    if (isBoolean) {
      componentProps = () => ({
        ...props,
        checked: Boolean(value),
        onCheckedChange: (checked: boolean) =>
          updateFormValue(checked === true),
      });
    } else if (multiple) {
      const selectedValues = Array.isArray(value) ? (value as string[]) : [];

      componentProps = (option?: SelectOptions) => ({
        ...props,
        checked: option ? selectedValues.includes(option.value) : false,
        onCheckedChange: (checked: boolean) => {
          if (!option) {
            return;
          }

          const nextValues =
            checked === true
              ? [...new Set([...selectedValues, option.value])]
              : selectedValues.filter(
                  (selectedValue) => selectedValue !== option.value,
                );

          updateFormValue(nextValues);
        },
      });
    } else {
      componentProps = (option?: SelectOptions) => ({
        ...props,
        checked: option ? value === option.value : false,
        onCheckedChange: (checked: boolean) => {
          if (option && checked === true) {
            updateFormValue(option.value);
          }
        },
      });
    }
  }

  return (
    <FieldSet className={cn('w-full', classNames?.wrapper)}>
      {isBoolean ? (
        <FieldLabel
          htmlFor={name}
          className={cn('relative', classNames?.field?.wrapper)}
        >
          <Field
            orientation={props?.orientation ?? 'horizontal'}
            className={cn('', classNames?.field?.container)}
          >
            <CheckboxComponent id={name} name={name} {...componentProps()} />
            <FieldContent className={cn('', classNames?.field?.content)}>
              {label && (
                <span className={cn('', classNames?.field?.label)}>
                  {label}
                </span>
              )}
              {props?.description && (
                <FieldDescription
                  className={cn('', classNames?.field?.description)}
                >
                  {props.description}
                </FieldDescription>
              )}
            </FieldContent>
          </Field>
        </FieldLabel>
      ) : (
        <>
          {label ? (
            typeof label === 'string' ? (
              <FieldLegend
                variant="label"
                className={cn('font-medium', classNames?.label)}
              >
                {label}
              </FieldLegend>
            ) : (
              label
            )
          ) : null}
          {props?.description && (
            <FieldDescription className={cn('', classNames?.description)}>
              {props.description}
            </FieldDescription>
          )}

          <div className={cn('', classNames?.container)}>
            {options?.map((option) => (
              <FieldLabel
                key={option.value}
                htmlFor={option.value}
                className={cn('relative', classNames?.field?.wrapper)}
              >
                <Field
                  orientation={props?.orientation ?? 'horizontal'}
                  className={cn('', classNames?.field?.container)}
                >
                  <CheckboxComponent
                    id={option.value}
                    name={option.value}
                    {...componentProps(option)}
                  />
                  <FieldContent className={cn('', classNames?.field?.content)}>
                    <span className={cn('', classNames?.field?.label)}>
                      {option.label}
                    </span>
                    {option.description && (
                      <FieldDescription
                        className={cn('', classNames?.field?.description)}
                      >
                        {option.description}
                      </FieldDescription>
                    )}
                  </FieldContent>
                </Field>
              </FieldLabel>
            ))}
          </div>
        </>
      )}

      {/* Validation error display */}

      {props?.suppressError
        ? null
        : invalid?.() &&
          error && (
            <small className={cn('text-sm text-red-500', classNames?.error)}>
              {error as string}
            </small>
          )}
    </FieldSet>
  );
}
