"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

function Sheet(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props} />
}

function SheetTrigger(props: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger {...props} />
}

function SheetClose(props: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close {...props} />
}

function SheetPortal(props: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/20",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out",
          " backdrop-blur-xl bg-background/60", // 🔥 explicit theme
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:duration-500 data-[state=closed]:duration-300",

          side === "right" &&
            "inset-y-0 right-0 h-full w-3/4 sm:max-w-sm border-l dark:border-white/10 border-black/10 data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",

          side === "left" &&
            "inset-y-0 left-0 h-full w-3/4 sm:max-w-sm border-r dark:border-white/10 border-black/10 data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",

          side === "top" &&
            "inset-x-0 top-0 border-b dark:border-white/10 border-black/10 data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",

          side === "bottom" &&
            "inset-x-0 bottom-0 border-t dark:border-white/10 border-black/10 data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",

          className
        )}
        {...props}
      >
        {children}

        {showCloseButton && (
          <DialogPrimitive.Close
            className={cn(
              "absolute top-4 right-4 rounded-md p-1 opacity-70 transition-opacity",
              "hover:opacity-100 focus:outline-none focus:ring-2",
              "text-dark dark:text-light",
              "focus:ring-black dark:focus:ring-white",
            )}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader(props: React.ComponentProps<"div">) {
  return <div className="flex flex-col gap-1.5 p-4" {...props} />
}

function SheetFooter(props: React.ComponentProps<"div">) {
  return <div className="mt-auto flex flex-col gap-2 p-4" {...props} />
}

function SheetTitle(props: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className="text-lg font-semibold"
      {...props}
    />
  )
}

function SheetDescription(
  props: React.ComponentProps<typeof DialogPrimitive.Description>
) {
  return (
    <DialogPrimitive.Description
      className="text-sm opacity-70"
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
