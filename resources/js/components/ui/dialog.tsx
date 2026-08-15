"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"
import { NoticeModalConfig } from "@/contexts/notice-context"
import { Children } from "@/types"
import Heading from "@/components/heading"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-6 rounded-xl bg-popover p-6 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-md data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" asChild>
            <Button
              variant="ghost"
              className="absolute top-4 right-4"
              size="icon-sm"
            >
              <XIcon
              />
              <span className="sr-only">Close</span>
            </Button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("font-heading leading-none font-medium", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}


export type ModalProps = {
  open: boolean;
  dialogToggler: () => void
  title?: string;
  modalType?: 'default' | 'custom'
  description?: string;
  trigger?: {
    label: React.ReactNode
  }
} & Pick<NoticeModalConfig, 'classNames'>

const Modal = ({ children, trigger, title, description, ...props }: Children<ModalProps>) => {
  return (
    <>
      {
        props.modalType === "default"
          ? (
            <Dialog open={props.open} onOpenChange={props.dialogToggler}>
              {
                trigger && <DialogTrigger onClick={props.dialogToggler} className={props?.classNames?.trigger}>{trigger.label}</DialogTrigger>
              }
              <DialogContent
                className={cn("overflow-y-auto max-h-full", props?.classNames?.content)}
              >
                {
                  title && (
                    <DialogHeader className={cn("", props?.classNames?.heading?.header)}>
                      <DialogTitle className={cn("", props?.classNames?.heading?.title)}>{title}</DialogTitle>
                      {
                        description && (
                          <DialogDescription className={cn("", props?.classNames?.heading?.description)}>{description}</DialogDescription>
                        )
                      }
                    </DialogHeader>
                  )
                }

                {children}
              </DialogContent>
            </Dialog>
          )
          : (
            !props.open
              ? <></>
              : (
                <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true" role="dialog">
                  <div className="absolute inset-0 bg-black/50" onClick={props.dialogToggler} />

                  <div
                    className={cn(
                      "relative z-10 w-full max-w-lg rounded-2xl bg-background p-6 shadow-xl overflow-y-auto max-h-[90vh]",
                      props?.classNames?.content
                    )}
                  >
                    {trigger && (
                      <button
                        onClick={props.dialogToggler}
                        className={props?.classNames?.trigger}
                      >
                        {trigger.label}
                      </button>
                    )}

                    {title && (
                      <Heading title={title} description={description} />
                    )}

                    {children}
                  </div>
                </div>
              )
          )
      }


    </>
  )
}

const CustomModal = ({ children, trigger, title, description, ...props }: Children<ModalProps>) => {
  if (!props.open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true" role="dialog">
      <div className="absolute inset-0 bg-black/50" onClick={props.dialogToggler} />

      <div
        className={cn(
          "relative z-10 w-full max-w-lg rounded-2xl bg-background p-6 shadow-xl overflow-y-auto max-h-[90vh]",
          props?.classNames?.content
        )}
      >
        {trigger && (
          <button
            onClick={props.dialogToggler}
            className={props?.classNames?.trigger}
          >
            {trigger.label}
          </button>
        )}

        {title && (
          <Heading title={title} description={description} />
        )}

        {children}
      </div>
    </div>
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  Modal,
  CustomModal
}
