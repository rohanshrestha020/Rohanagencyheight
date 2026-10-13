import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex w-full min-w-0 rounded-md border bg-surface-base text-text-primary transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-text-primary placeholder:text-text-tertiary hover:border-border-hover focus-visible:border-border-focus focus-visible:shadow-[0_0_0_1px_var(--color-border-focus),0_0_0_4px_var(--color-brand-a20)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-border-disabled disabled:bg-surface-subtle disabled:text-text-tertiary",
  {
    variants: {
      // Figma axis: Size
      size: {
        sm: "h-12 px-3 text-sm",
        default: "h-14 px-3 text-base",
        lg: "h-16 px-3 text-base",
      },
      // Figma axis: Status
      status: {
        default: "border-border-default",
        error:
          "border-error-border focus-visible:border-error-border focus-visible:shadow-[0_0_0_1px_var(--color-error-solid),0_0_0_4px_var(--color-error-red-a20)]",
        success: "border-success-border",
      },
    },
    defaultVariants: {
      size: "default",
      status: "default",
    },
  }
)

function Input({ className, type, size = "default", status = "default", ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      aria-invalid={status === "error" || undefined}
      className={cn(inputVariants({ size, status }), className)}
      {...props}
    />
  )
}

export { Input, inputVariants }
