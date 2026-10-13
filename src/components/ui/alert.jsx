import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

// Each status sets three custom properties consumed by the container, the
// accent bar, and any icon/action inside — this is how one variant drives
// bg/border/accent/text together without a big compound-variant matrix.
// "neutral" has no dedicated token family in Figma's Tokens collection (only
// info/success/warning/error do), so it composites generic surface/text/border
// tokens instead — matching how the design file itself treats it.
const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-md border bg-[var(--alert-bg)] border-[var(--alert-border)] py-3 pr-4 pl-5 text-left text-sm has-data-[slot=alert-action]:pr-16 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-[var(--alert-accent)] *:[svg:not([class*='size-'])]:size-5",
  {
    variants: {
      status: {
        info: "[--alert-bg:var(--color-info-bg)] [--alert-border:var(--color-info-border)] [--alert-accent:var(--color-info-solid)] [--alert-text:var(--color-info-text)]",
        success:
          "[--alert-bg:var(--color-success-bg)] [--alert-border:var(--color-success-border)] [--alert-accent:var(--color-success-solid)] [--alert-text:var(--color-success-text)]",
        warning:
          "[--alert-bg:var(--color-warning-bg)] [--alert-border:var(--color-warning-border)] [--alert-accent:var(--color-warning-solid)] [--alert-text:var(--color-warning-text)]",
        error:
          "[--alert-bg:var(--color-error-bg)] [--alert-border:var(--color-error-border)] [--alert-accent:var(--color-error-solid)] [--alert-text:var(--color-error-text)]",
        neutral:
          "[--alert-bg:var(--color-surface-subtle)] [--alert-border:var(--color-border-disabled)] [--alert-accent:var(--color-text-tertiary)] [--alert-text:var(--color-text-secondary)]",
      },
    },
    defaultVariants: {
      status: "info",
    },
  }
)

function Alert({ className, status = "info", ...props }) {
  return (
    <div
      data-slot="alert"
      data-status={status}
      role="alert"
      className={cn(alertVariants({ status }), className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-2 bottom-2 left-1.5 w-1 rounded-full bg-[var(--alert-accent)]"
      />
      {props.children}
    </div>
  )
}

function AlertTitle({ className, ...props }) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium text-text-primary group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-text-primary",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-sm text-balance text-text-secondary md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:text-[var(--alert-text)] [&_p:not(:last-child)]:mb-4",
        className
      )}
      {...props}
    />
  )
}

// Corner slot for a dismiss icon or a compact action button.
function AlertAction({ className, ...props }) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2 right-2", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
