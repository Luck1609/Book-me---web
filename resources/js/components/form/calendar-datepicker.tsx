import type { InertiaFormProps, InertiaPrecognitiveFormProps } from "@inertiajs/react"
import * as React from "react"

import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import { cn, handleFormData } from "@/lib/utils"


type Props<T extends object> = Omit<React.ComponentProps<"input">, 'form' | 'disabled'> & {
  name: string;
  label?: string | React.ReactNode;
  placeholder?: string;
  form: InertiaFormProps<T> | InertiaPrecognitiveFormProps<T>
  disabled?: React.ComponentProps<typeof Calendar>['disabled'];
  onChange?: (value: string) => void;
  classNames?: {
    label?: string;
    error?: string;
    wrapper?: string;
    trigger?: {
      container?: string;
      button?: string;
    }
  }
}

export function CalendarDatePicker<T extends object>({ name, label, classNames, form, disabled, onChange }: Props<T>) {
  if (!form) {
    throw new Error("DatePicker component requires inertia useForm hook")
  }

  const { value, handleChange: handleFormChange, error: formError, validate, touch, invalid } = handleFormData(name, form) || {}
  const error = formError

  const handleSelect = (date: Date | undefined) => {
    const value = date ? formatDateForInput(date) : ''

    handleFormChange?.(value)
    onChange?.(value)
    touch?.()
    validate?.()
  }

  const date = value instanceof Date ? value : parseDate(value as string)

  return (
    <Field className={cn("mx-auto w-full gap-0", classNames?.wrapper)}>
      <FieldLabel htmlFor="date" className={cn("mb-1", classNames?.label)}>{label}</FieldLabel>

      <Calendar
        mode="single"
        selected={date}
        defaultMonth={date}
        captionLayout="dropdown"
        onSelect={handleSelect}
        disabled={disabled}
      />

      {/* Validation error display */}
      {invalid?.() && error && (
        <small className={cn("text-red-500 text-sm", classNames?.error)}>
          {error as string}
        </small>
    )}
    </Field>
    )
}

function formatDateForInput(date: Date): string {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map((part, index) => (index === 0 ? String(part) : String(part).padStart(2, '0')))
    .join('-')
}

function parseDate(value: string): Date | undefined {
  if (!value) {
    return undefined
  }

  const [year, month, day] = value.split('-').map(Number)

  return new Date(year, month - 1, day, 12)
}
