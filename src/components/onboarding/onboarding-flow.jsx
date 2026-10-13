import { useState } from "react"

import { StepVerifyNpn } from "@/components/onboarding/step-verify-npn"
import { StepLicensedStates } from "@/components/onboarding/step-licensed-states"
import { StepProfileInformation } from "@/components/onboarding/step-profile-information"
import { StepBusinessInformation } from "@/components/onboarding/step-business-information"
import { StepComplianceDocuments } from "@/components/onboarding/step-compliance-documents"
import { ExitConfirmDialog } from "@/components/onboarding/exit-confirm-dialog"

// Wizard controller: owns the shared form state and step position, renders
// exactly one step at a time, and mounts the flow-level exit-confirmation
// dialog alongside whichever step is active. The "account is set up" success
// modal now shows on the Dashboard (see DashboardPage) rather than here.
function OnboardingFlow({ onComplete, onExit }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [formData, setFormData] = useState({})
  const [exitOpen, setExitOpen] = useState(false)

  function updateFormData(patch) {
    setFormData((prev) => ({ ...prev, ...patch }))
  }

  const next = () => setStepIndex((i) => Math.min(i + 1, 4))
  const back = () => setStepIndex((i) => Math.max(i - 1, 0))
  const openExit = () => setExitOpen(true)

  const shared = { formData, updateFormData, onExit: openExit }

  return (
    <>
      {stepIndex === 0 && <StepVerifyNpn {...shared} onNext={next} />}
      {stepIndex === 1 && <StepLicensedStates {...shared} onNext={next} onBack={back} />}
      {stepIndex === 2 && <StepProfileInformation {...shared} onNext={next} onBack={back} />}
      {stepIndex === 3 && <StepBusinessInformation {...shared} onNext={next} />}
      {stepIndex === 4 && <StepComplianceDocuments {...shared} onNext={() => onComplete?.()} />}

      <ExitConfirmDialog
        open={exitOpen}
        onOpenChange={setExitOpen}
        onConfirm={() => {
          setExitOpen(false)
          onExit?.()
        }}
      />
    </>
  )
}

export { OnboardingFlow }
