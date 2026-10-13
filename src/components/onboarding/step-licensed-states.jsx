import { useState } from "react"
import { ArrowLeft, ArrowRight, Plus, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { OnboardingShell } from "@/components/onboarding/onboarding-shell"
import { LicensedStateModal } from "@/components/onboarding/licensed-state-modal"

const DEFAULT_STATES = [
  { state: "Texas", lines: "Property · Casualty · Commercial Auto" },
  { state: "Louisiana", lines: "Property · Casualty" },
  { state: "Oklahoma", lines: "Property · Casualty · Workers Comp" },
  { state: "New Mexico", lines: "Property only" },
]

// Reconstructed step: Figma's step rail lists "Licensed States" as its own
// step, but the file has no dedicated full-page frame for it — only the
// "Add a licensed state" modal exists. This screen was built to give that
// step real content, reusing the modal and the same example states shown
// later in the compliance-documents License Copies modal.
function StepLicensedStates({ formData, updateFormData, onNext, onBack, onExit }) {
  const [modalOpen, setModalOpen] = useState(false)
  const states = formData.licensedStates ?? DEFAULT_STATES

  function handleAdd({ state, lines }) {
    updateFormData({
      licensedStates: [...states, { state, lines: lines.join(" · ") }],
    })
  }

  return (
    <OnboardingShell currentStep={1} onExit={onExit}>
      <div className="flex w-full max-w-[620px] flex-col gap-8 pt-8">
        <div className="flex flex-col gap-2">
          <h1 className="m-0 text-xl leading-7 font-semibold text-text-primary">
            Confirm your licensed states
          </h1>
          <p className="text-sm leading-5 text-text-secondary">
            We pulled these from your NPN record — add any we missed.
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-md border border-border-default">
          {states.map((row, i) => (
            <div
              key={row.state}
              className={`flex items-center gap-3 px-4 py-3 ${
                i !== states.length - 1 ? "border-b border-border-default" : ""
              }`}
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-highlight text-text-secondary">
                <MapPin className="size-4" />
              </span>
              <div className="flex flex-col">
                <p className="text-sm leading-5 font-medium text-text-primary">{row.state}</p>
                <p className="text-xs leading-4 text-text-secondary">{row.lines}</p>
              </div>
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="secondary"
          className="w-fit"
          onClick={() => setModalOpen(true)}
        >
          <Plus className="size-4" />
          Add a state we missed
        </Button>

        <div className="flex w-full items-center justify-between">
          <Button type="button" variant="secondary" onClick={onBack}>
            <ArrowLeft className="size-4" />
            Back
          </Button>
          <Button type="button" variant="primary" shape="circular" onClick={onNext}>
            Continue
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>

      <LicensedStateModal open={modalOpen} onOpenChange={setModalOpen} onAdd={handleAdd} />
    </OnboardingShell>
  )
}

export { StepLicensedStates }
