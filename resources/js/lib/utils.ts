import type { InertiaFormProps, InertiaLinkProps } from "@inertiajs/react";
import { clsx } from "clsx";
import type { ClassValue } from "clsx";
// import DOMPurify from "dompurify";
import type { UseHttpPrecognitiveProps } from "node_modules/@inertiajs/react/types/useHttp";
import { twMerge } from "tailwind-merge";

// export const sanitizedHtml = (html: string) => {
//   return DOMPurify.sanitize(html);
// }

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps["href"]>): string {
  return typeof url === "string" ? url : url.url;
}

// Form inputs
export function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((current, key) => current?.[key], obj);
}

function deepClone<T>(value: T): T {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (value instanceof File || value instanceof Blob || value instanceof Date) {
    return value;
    // if (Array.isArray(value)) return value.map(deepClone) as unknown as T;
  }

  if (Array.isArray(value)) {
    return value.map((value) => {
      // console.log('Value before cloning', value)
      const cloned = deepClone(value);
      
      return cloned;
    }) as unknown as T;
  }

  return Object.fromEntries(
    Object.entries(value as object).map(([k, v]) => {
      // console.log('Current iterator', k, 'value', v)
      return [k, deepClone(v)];
    })
  ) as T;
}

export function setNestedValue(obj: any, path: string, value: any): any {
  const keys = path.split(".");

  const lastKey = keys.pop();

  const target = keys.reduce((current, key) => {
    if (!current[key]) {
      current[key] = {};
    }

    return current[key];
  }, obj);

  if (lastKey) {
    target[lastKey] = value;
  }

  return obj;
}

const AVATAR_COLORS = [
  "bg-orange-500",
  "bg-blue-500",
  "bg-emerald-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-yellow-500",
  "bg-teal-500",
  "bg-red-500",
  "bg-indigo-500",
  "bg-cyan-500",
  "bg-sky-500",
  "bg-rose-500",
  "bg-fuchsia-500",
  "bg-slate-500",
];

export function getColor(str: string) {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function handleFormData<T extends object>(
  name: string,
  form: InertiaFormProps<T> | UseHttpPrecognitiveProps<T>
) {
  if (!form) {
    return;
  }

  const isNestedPath = name.includes(".");
  const value = isNestedPath
    ? getNestedValue(form.data, name)
    : form.data[name as keyof T];
  const error = isNestedPath
    ? getNestedValue(form.errors, name)
    : form.errors?.[name as keyof typeof form.errors];

  const handleChange = (fieldData: any) => {
    if (isNestedPath) {
      form.setData((data) => {
        const newData = deepClone(data);
        console.log("Newly cloned nested data", newData);
        setNestedValue(newData, name, fieldData);

        return newData;
      });
    } else {
      // For non-nested paths, use the callback approach to avoid type issues
      form.setData((data) => {
        const updatedData = {
          ...data,
          [name]: Array.isArray(fieldData) ? [...fieldData] : fieldData,
        } as T;

        return updatedData;
      });
    }
  };

  // Precognition helpers - cast form to access precognition methods
  const precogForm = form as any;

  const validate = () => {
    if (typeof precogForm.validate === "function") {
      precogForm.validate(name);
    }
  };

  const touch = () => {
    if (typeof precogForm.touch === "function") {
      precogForm.touch(name);
    }
  };

  const invalid = (): boolean => {
    if (typeof precogForm.invalid === "function") {
      return precogForm.invalid(name);
    }

    return form.hasErrors && !!error;
  };

  const valid = (): boolean => {
    if (typeof precogForm.valid === "function") {
      return precogForm.valid(name);
    }

    return false;
  };

  const touched = (): boolean => {
    if (typeof precogForm.touched === "function") {
      return precogForm.touched(name);
    }

    return false;
  };

  const validating = !!precogForm.validating;

  return {
    value: value ?? "",
    handleChange,
    error,
    validate,
    touch,
    invalid,
    valid,
    touched,
    validating,
  };
}
// End of form inputs

export const formatTimeToDateTime = (time: string) => {
  if (!time) {
    return "";
  }

  const today = new Date();
  const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(today.getDate()).padStart(2, "0")}`;

  return `${date} ${time}:00`;
};
