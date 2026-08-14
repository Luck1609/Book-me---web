import { EllipsisVertical } from 'lucide-react';
import type { ReactNode } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { Icon } from '@/types';

export type RowActionOption = {
  label?: ReactNode;
  disabled?: boolean;
  classNames?: {
    container?: string;
    icon?: string;
    label?: string
  }
  icon: Icon
  action: () => void
}

type RowOptions = {
  options: (RowActionOption | never)[],
  className?: string
}

export default function RowActions({ options, className }: RowOptions) {

  return (
    <div className={cn("w-full flex justify-center", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {
            options.map(({ label, disabled, action, classNames, icon: ActionIcon }, index: number) => {
              return (
                <DropdownMenuItem
                  key={index.toString()}
                  onClick={action}
                  disabled={disabled}
                  className={cn("space-x-1", disabled && "opacity-50 cursor-not-allowed", classNames?.container)}
                >
                  <ActionIcon className={cn("stroke-subtext size-4", classNames?.icon)} />
                  {label && <span className={cn("text-sm", classNames?.label)}>{label}</span>}
                </DropdownMenuItem>
              )
            })
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
