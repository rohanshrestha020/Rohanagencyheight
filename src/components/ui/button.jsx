import * as React from "react"
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// Figma "Elevation/Borders/Active" effect style — a 1px border-focus ring
// plus a 3px brand-a20 halo, shared by every focusable form/action control.
const FOCUS_RING =
  "focus-visible:shadow-[0_0_0_1px_var(--color-border-focus),0_0_0_4px_var(--color-brand-a20)]"

const buttonVariants = cva(
  cn(
    "group/button inline-flex shrink-0 items-center justify-center gap-2 border border-transparent font-medium whitespace-nowrap transition-colors outline-none select-none disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    FOCUS_RING
  ),
  {
    variants: {
      // Figma axis: Hierarchy
      variant: {
        primary: "disabled:bg-border-disabled disabled:text-text-tertiary",
        secondary:
          "disabled:border-border-disabled disabled:bg-surface-subtle disabled:text-text-tertiary",
        tertiary: "disabled:bg-surface-subtle disabled:text-text-tertiary",
        // Assumption: Figma didn't show a Text-hierarchy hover/disabled state
        // explicitly — reusing the tertiary tint for hover, tertiary's muted
        // disabled treatment for consistency.
        text: "disabled:bg-transparent disabled:text-text-tertiary",
      },
      // Figma axis: Intent
      intent: {
        default: "",
        success: "",
        negative: "",
      },
      // Figma axis: Size (label buttons)
      size: {
        sm: "h-9 gap-1.5 px-3.5 text-sm leading-5",
        default: "h-10 gap-2 px-4 text-sm leading-5",
        lg: "h-11 gap-2 px-5 text-sm leading-5",
        xl: "h-12 gap-2 px-6 text-base leading-6",
        // Figma "Icon buttons" page — same color system, its own size scale.
        "icon-sm": "size-8 px-0",
        icon: "size-11 px-0",
        "icon-lg": "size-14 px-0",
      },
      // Figma axis: Shape
      shape: {
        rounded: "rounded-md",
        circular: "rounded-full",
      },
    },
    compoundVariants: [
      // ---- Primary (solid fill) ----
      {
        variant: "primary",
        intent: "default",
        className:
          "bg-primary-solid text-primary-contrast hover:bg-primary-solid-hover active:bg-primary-solid-hover",
      },
      {
        variant: "primary",
        intent: "success",
        className:
          "bg-success-solid text-success-contrast hover:bg-success-solid-hover active:bg-success-solid-hover",
      },
      {
        variant: "primary",
        intent: "negative",
        className:
          "bg-error-solid text-error-contrast hover:bg-error-solid-hover active:bg-error-solid-hover",
      },
      // ---- Secondary (outlined) ----
      {
        variant: "secondary",
        intent: "default",
        className:
          "border-border-default bg-surface-base text-primary-text hover:bg-surface-subtle",
      },
      {
        variant: "secondary",
        intent: "success",
        className:
          "border-success-border bg-surface-base text-success-text hover:bg-success-bg",
      },
      {
        variant: "secondary",
        intent: "negative",
        className:
          "border-error-border bg-surface-base text-error-text hover:bg-error-bg",
      },
      // ---- Tertiary (tinted fill) ----
      {
        variant: "tertiary",
        intent: "default",
        className: "bg-primary-bg text-primary-text hover:bg-primary-bg-hover",
      },
      {
        variant: "tertiary",
        intent: "success",
        className: "bg-success-bg text-success-text hover:bg-success-bg-hover",
      },
      {
        variant: "tertiary",
        intent: "negative",
        className: "bg-error-bg text-error-text hover:bg-error-bg-hover",
      },
      // ---- Text (no fill) ----
      {
        variant: "text",
        intent: "default",
        className: "bg-transparent text-primary-text hover:bg-primary-bg",
      },
      {
        variant: "text",
        intent: "success",
        className: "bg-transparent text-success-text hover:bg-success-bg",
      },
      {
        variant: "text",
        intent: "negative",
        className: "bg-transparent text-error-text hover:bg-error-bg",
      },
    ],
    defaultVariants: {
      variant: "primary",
      intent: "default",
      size: "default",
      shape: "rounded",
    },
  }
)

function Button({
  className,
  variant = "primary",
  intent = "default",
  size = "default",
  shape = "rounded",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-intent={intent}
      data-size={size}
      data-shape={shape}
      className={cn(buttonVariants({ variant, intent, size, shape, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
