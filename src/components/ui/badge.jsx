import * as React from "react"
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border font-medium whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-3.5",
  {
    variants: {
      // Figma axis: Status
      status: {
        general: "border-border-default bg-surface-highlight text-text-secondary",
        success: "border-success-border bg-success-bg text-success-text",
        warning: "border-warning-border bg-warning-bg text-warning-text",
        error: "border-error-border bg-error-bg text-error-text",
        info: "border-info-border bg-info-bg text-info-text",
        // Assumption: Figma's "Selected" status wasn't broken down in the
        // inspection pass — reusing the same bg/border/text triad the
        // Select menu item uses for its selected state.
        selected: "border-primary-border bg-primary-bg text-primary-text",
        // Figma "Quote Requests" table's brand-tinted status (e.g. "Proposal
        // sent") — border-transparent since the design shows no chip border.
        brand: "border-transparent bg-brand-bg text-brand-text",
      },
      // Figma axis: Size
      size: {
        sm: "h-6 gap-1 px-2 text-xs",
        default: "h-7 gap-1 px-3 text-sm",
        lg: "h-10 gap-1.5 px-4 text-sm",
      },
      // Figma axis: Shape
      shape: {
        rounded: "rounded-md",
        circular: "rounded-full",
      },
    },
    defaultVariants: {
      status: "general",
      size: "default",
      shape: "rounded",
    },
  }
)

function Badge({
  className,
  status = "general",
  size = "default",
  shape = "rounded",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-status={status}
      data-size={size}
      data-shape={shape}
      className={cn(badgeVariants({ status, size, shape }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
