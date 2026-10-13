import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { inputVariants } from "@/components/ui/input"

// Figma's Inputs page shows the label sitting above an empty box at rest,
// then moving inside the box as a small caption once focused or filled.
// Reproduced here with the standard CSS-only peer/placeholder-shown
// floating-label technique (no JS state) — a close approximation rather
// than a pixel-exact reconstruction of the two distinct rest/active layouts.
function FloatingLabelInput({
  id,
  label,
  size = "default",
  status = "default",
  helperText,
  className,
  ...props
}) {
  const helperColor =
    status === "error"
      ? "text-error-text"
      : status === "success"
        ? "text-success-text"
        : "text-text-tertiary"

  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="relative">
        <input
          id={id}
          data-slot="input"
          placeholder=" "
          aria-invalid={status === "error" || undefined}
          className={cn(inputVariants({ size, status }), "peer pt-4 pb-1", className)}
          {...props}
        />
        <Label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-text-tertiary transition-all duration-150",
            "peer-focus:top-3.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-text-secondary",
            "peer-not-placeholder-shown:top-3.5 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-text-secondary",
            "peer-disabled:text-text-tertiary"
          )}
        >
          {label}
        </Label>
      </div>
      {helperText ? (
        <p className={cn("text-xs", helperColor)}>{helperText}</p>
      ) : null}
    </div>
  )
}

export { FloatingLabelInput }
