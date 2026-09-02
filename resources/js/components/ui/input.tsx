import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // "h-11 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        "h-10 w-full min-w-0 rounded-full border border-[#dfe9e3] bg-[#fbfcfa] px-4 text-sm font-normal",
        "text-[#17343c] transition outline-none focus:border-[#76c9a5] focus:ring-4 focus:ring-[#e3f6ee]",
        "dark:bg-white/5 dark:border-white/10 dark:text-slate-300 placeholder:text-slate-400 dark:disabled:text-slate-500",
        // "h-12 w-full min-w-0 rounded-full border-none bg-transparent px-4 text-sm font-normal text-[#17343c] transition outline-none focus:border-none focus:ring-0 focus:ring-[#e3f6ee]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
