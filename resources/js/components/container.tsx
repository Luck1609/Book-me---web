import { cn } from '@/lib/utils'
import type { Children } from '@/types'

export default function Container({ children, className }: Children<{ className?: string; }>) {

  return (
    <div className={cn("w-full mx-auto max-w-360", className)}>
      {children}
    </div>
  )
}

