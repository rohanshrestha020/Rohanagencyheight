import { useState } from "react"
import { Check, ChevronUp, Headset } from "lucide-react"

import { cn } from "@/lib/utils"

const STEPS = [
  "Verify NPN",
  "Licensed States",
  "Profile Information",
  "Business Information",
  "Compliance Documents",
]

function StepMarker({ status, index }) {
  if (status === "done") {
    return (
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-success-icon text-white">
        <Check className="size-3.5" />
      </span>
    )
  }
  if (status === "current") {
    return <span className="size-6 shrink-0 rounded-full bg-text-primary" />
  }
  return (
    <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border-default bg-surface-subtle text-[11px] text-text-tertiary shadow-[0px_0px_0px_1px_var(--color-black-alpha-16),0px_1px_2px_0px_var(--color-black-alpha-8)]">
      {index + 1}
    </span>
  )
}

// The step-progress rail shown on every onboarding screen. Figma's own
// export had an apparent authoring bug where "todo" steps sometimes render
// the done-checkmark marker — this reconstructs the intended, consistent
// logic (index < currentStep = done) rather than reproducing that glitch.
function OnboardingSteps({ currentStep, onContactSupport, className }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={cn("flex w-[260px] shrink-0 flex-col justify-between px-4 py-8", className)}>
      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="flex w-full items-center justify-between text-left"
        >
          <span className="text-base leading-6 font-semibold text-text-primary">
            Account setup
          </span>
          <ChevronUp className={cn("size-4 text-text-tertiary transition-transform", collapsed && "rotate-180")} />
        </button>

        {!collapsed ? (
          <ol className="flex flex-col gap-4">
            {STEPS.map((label, index) => {
              const status =
                index < currentStep ? "done" : index === currentStep ? "current" : "todo"
              return (
                <li key={label} className="flex items-center gap-3">
                  <StepMarker status={status} index={index} />
                  <span
                    className={cn(
                      "text-sm leading-5 font-medium",
                      status === "todo" ? "text-text-tertiary" : "text-text-primary"
                    )}
                  >
                    {label}
                  </span>
                </li>
              )
            })}
          </ol>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onContactSupport}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-surface-base px-4 text-sm leading-5 font-medium text-text-primary shadow-[0px_0px_0px_1px_var(--color-black-alpha-16),0px_1px_2px_0px_var(--color-black-alpha-8)] hover:bg-surface-highlight"
        >
          Contact Support
        </button>
        <button
          type="button"
          onClick={onContactSupport}
          aria-label="Contact support"
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-base text-text-secondary shadow-[0px_0px_0px_1px_var(--color-black-alpha-16),0px_1px_2px_0px_var(--color-black-alpha-8)] hover:bg-surface-highlight"
        >
          <Headset className="size-4" />
        </button>
      </div>
    </aside>
  )
}

export { OnboardingSteps, STEPS }
