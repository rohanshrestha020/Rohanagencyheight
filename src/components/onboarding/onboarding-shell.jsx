import { Building2 } from "lucide-react"

import { OnboardingSteps } from "@/components/onboarding/onboarding-steps"
import agencyHeightLogo from "@/assets/login/agency-height-logo.svg"

// Shared chrome for every onboarding screen: dark header, "Account Setup" /
// "Exit" banner, and the left step rail. Figma's dark header used a literal
// #191919 background, not a semantic token, so it's reproduced as-is here.
function OnboardingShell({ currentStep, onExit, onContactSupport, children }) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-surface-base">
      <div className="flex h-16 shrink-0 items-center bg-[#191919] px-6">
        <img src={agencyHeightLogo} alt="Agency Height" className="h-6 w-auto brightness-0 invert" />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <OnboardingSteps currentStep={currentStep} onContactSupport={onContactSupport} />

        <div className="relative flex flex-1 flex-col overflow-y-auto">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-sm px-2 py-1 text-sm leading-5 font-medium text-primary-text hover:bg-surface-highlight"
            >
              <Building2 className="size-4" />
              Account Setup
            </button>
            <button
              type="button"
              onClick={onExit}
              className="rounded-sm px-2 py-1 text-sm leading-5 font-medium text-error-text hover:bg-error-bg"
            >
              Exit
            </button>
          </div>

          <div className="flex flex-1 items-start justify-center px-8 pb-12">{children}</div>
        </div>
      </div>
    </div>
  )
}

export { OnboardingShell }
