import { router, usePage } from "@inertiajs/react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import type { FlashToast } from "@/types/ui";

export function useFlashToast(): void {
  useEffect(() => {
    return router.on("flash", (event) => {
      const flash = (event as CustomEvent).detail?.flash;
      const data = flash?.toast as FlashToast | undefined;

      if (!data) {
        return;
      }

      toast[data.type](data.message);
    });
  }, []);
}

interface FlashMessage {
  title: string;
  message: string;
  code?: number;
  id: string;
}

interface FlashData {
  error?: FlashMessage;
  success?: FlashMessage;
  info?: FlashMessage;
  warning?: FlashMessage;
}

const STORAGE_KEY = "shown_flash_ids";
const ID_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Get shown message IDs from sessionStorage
 */
function getShownIds(): Record<string, number> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return {};
    }

    const parsed = JSON.parse(stored) as Record<string, number>;
    const now = Date.now();

    // Clean up expired IDs
    const valid: Record<string, number> = {};

    for (const [id, timestamp] of Object.entries(parsed)) {
      if (now - timestamp < ID_EXPIRY_MS) {
        valid[id] = timestamp;
      }
    }

    return valid;
  } catch {
    return {};
  }
}

/**
 * Save shown message ID to sessionStorage
 */
function saveShownId(id: string): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const shownIds = getShownIds();
    shownIds[id] = Date.now();
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(shownIds));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Check if a message has already been shown
 */
function hasBeenShown(id: string): boolean {
  const shownIds = getShownIds();

  return id in shownIds;
}

/**
 * Hook to consume and display Inertia flash messages
 * Prevents duplicate messages on browser back button
 */
export function useFlashMessages(): void {
  const { props } = usePage();
  const flash = props.flash as FlashData | undefined;
  const processedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!flash) {
      return;
    }

    const types: Array<{
      type: string;
      data?: FlashMessage;
      toastFn: typeof toast.error;
    }> = [
      { type: "error", data: flash.error, toastFn: toast.error },
      { type: "success", data: flash.success, toastFn: toast.success },
      { type: "info", data: flash.info, toastFn: toast.info },
      { type: "warning", data: flash.warning, toastFn: toast.warning },
    ];

    for (const { type, data, toastFn } of types) {
      if (!data) {
        continue;
      }

      // Generate unique ID for this message
      const messageId = data?.id;

      // Skip if already processed in this session or shown before
      if (processedRef.current.has(messageId) || hasBeenShown(messageId)) {
        continue;
      }

      // Mark as processed
      processedRef.current.add(messageId);
      saveShownId(messageId);

      // Display the toast
      const description = data.code
        ? `[${data.code}] ${data.message}`
        : data.message;

      toastFn(data.title, {
        description,
        duration: type === "error" ? 8000 : 5000,
        position: "top-right",
      });
    }
  }, [flash]);
}
