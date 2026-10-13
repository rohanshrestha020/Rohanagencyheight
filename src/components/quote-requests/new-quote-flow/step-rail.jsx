import { Check, Headphones } from "lucide-react"

import { cn } from "@/lib/utils"
import { FLOW_STEPS } from "@/components/quote-requests/new-quote-flow/constants"

function StepRail({ currentStep, completedSteps, onSelectStep, questionsNav }) {
  const currentIndex = FLOW_STEPS.findIndex((step) => step.key === currentStep)

  return (
    <div className="flex h-full w-[220px] shrink-0 flex-col justify-between border-r border-border-default bg-surface-base px-4 py-6">
      <div className="flex flex-col gap-1">
        {FLOW_STEPS.map((step, index) => {
          const done = completedSteps.includes(step.key)
          const active = step.key === currentStep
          const reachable = done || index <= currentIndex
          return (
            <div key={step.key} className="flex flex-col">
              <button
                type="button"
                disabled={!reachable}
                onClick={() => reachable && onSelectStep(step.key)}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2 py-2 text-left text-sm disabled:cursor-not-allowed",
                  active ? "font-semibold text-text-primary" : "font-medium text-text-tertiary",
                  reachable && !active && "hover:bg-surface-highlight hover:text-text-secondary"
                )}
              >
                {done ? (
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-success-solid text-success-contrast">
                    <Check className="size-3.5" />
                  </span>
                ) : (
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full text-[11px]",
                      active
                        ? "bg-primary-solid text-primary-contrast"
                        : "border border-border-default text-text-tertiary"
                    )}
                  >
                    {!active && index + 1}
                  </span>
                )}
                {step.label}
              </button>

              {active && step.key === "questions" && questionsNav ? (
                <div className="mt-1 ml-7 flex flex-col gap-0.5 border-l border-border-default pl-3">
                  <p className="py-1 text-xs text-text-tertiary">Underwriting Questions</p>
                  {questionsNav.coverages.map((coverage) => (
                    <button
                      key={coverage.key}
                      type="button"
                      onClick={() => questionsNav.onSelectCoverage(coverage.key)}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm",
                        coverage.key === questionsNav.activeCoverageKey
                          ? "bg-primary-bg font-medium text-primary-text"
                          : "text-text-secondary hover:bg-surface-highlight"
                      )}
                    >
                      {coverage.done ? (
                        <Check className="size-3.5 shrink-0 text-success-solid" />
                      ) : (
                        <span className="size-3.5 shrink-0 rounded-full border border-border-default" />
                      )}
                      {coverage.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>

      <div className="flex h-10 w-fit items-center gap-2 rounded-full border border-border-default bg-surface-base pr-1 pl-4 text-sm font-medium whitespace-nowrap text-text-primary">
        <button type="button" className="whitespace-nowrap hover:text-text-secondary">
          Contact Support
        </button>
        <button
          type="button"
          aria-label="Contact support"
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-text-secondary hover:bg-surface-highlight"
        >
          <Headphones className="size-4" />
        </button>
      </div>
    </div>
  )
}

export { StepRail }
