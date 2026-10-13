import { useState } from "react"
import { ShieldCheck, FileSignature, FolderOpen, Check, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { OnboardingShell } from "@/components/onboarding/onboarding-shell"
import { Button } from "@/components/ui/button"
import { EoCertificateModal } from "@/components/onboarding/eo-certificate-modal"
import { LicenseCopiesModal } from "@/components/onboarding/license-copies-modal"
import { ProducerAgreementModal } from "@/components/onboarding/producer-agreement-modal"

const LICENSED_STATE_COUNT = 4

const DOCS = [
  {
    key: "eo",
    icon: ShieldCheck,
    title: "E&O certificate",
    body: "Current and unexpired E&O - we'll pull the carrier, limits and expiry off it so you don't type them.",
    action: "Upload",
    doneLabel: "Uploaded",
  },
  {
    key: "w9",
    icon: FileSignature,
    title: "W-9 form (pre-filled)",
    body: "Filled in from your SSN or your agency's EIN - check the various fields, then sign.",
    action: "Review & sign",
    doneLabel: "Signed",
  },
  {
    key: "licenses",
    icon: FolderOpen,
    title: "License copies",
    body: `One copy for each of your ${LICENSED_STATE_COUNT} licensed states.`,
    action: "Upload",
    doneLabel: "Uploaded",
  },
]

const HELP_BULLETS = [
  "Allows you to get access to markets",
  "Allows you to get quotes",
  "Allows you to claim leads",
]

function StepComplianceDocuments({ onNext, onExit }) {
  const [done, setDone] = useState({ eo: false, w9: false, licenses: false })
  const [openModal, setOpenModal] = useState(null)

  function markDone(key) {
    setDone((prev) => ({ ...prev, [key]: true }))
  }

  function openFor(key) {
    setOpenModal(key)
  }

  return (
    <OnboardingShell currentStep={4} onExit={onExit}>
      <div className="flex w-full max-w-[900px] gap-12 py-8">
        <div className="flex w-full max-w-[620px] flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="m-0 text-xl leading-7 font-semibold text-text-primary">
              Submit your compliance documents
            </h1>
            <p className="text-sm leading-5 text-text-secondary">
              Provide the documents below to unlock access to markets.
            </p>
          </div>

          <ul className="flex flex-col divide-y divide-border-default rounded-xl shadow-[0px_0px_0px_1px_var(--color-black-alpha-16),0px_1px_2px_0px_var(--color-black-alpha-8)]">
            {DOCS.map((doc) => {
              const isDone = done[doc.key]
              return (
                <li key={doc.key} className="flex items-center gap-4 p-5">
                  <doc.icon className="size-5 shrink-0 text-text-secondary" />
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="text-sm leading-5 font-medium text-text-primary">
                      {doc.title}
                    </span>
                    <span className="text-[13px] leading-[18px] text-text-secondary">
                      {doc.body}
                    </span>
                  </div>
                  {isDone ? (
                    <span className="flex shrink-0 items-center gap-1.5 text-sm leading-5 font-medium text-success-text">
                      <Check className="size-4" />
                      {doc.doneLabel}
                    </span>
                  ) : (
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      shape="circular"
                      className="shrink-0"
                      onClick={() => openFor(doc.key)}
                    >
                      {doc.action}
                    </Button>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="flex w-full items-center justify-end gap-3">
            <Button type="button" variant="text" onClick={onNext}>
              Skip
            </Button>
            <Button type="button" variant="primary" shape="circular" onClick={onNext}>
              Continue
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>

        <div className={cn("hidden w-[320px] shrink-0 flex-col gap-3 lg:flex")}>
          <p className="text-sm leading-5 font-medium text-text-primary">
            Compliance documents activates the following
          </p>
          <ul className="flex flex-col gap-2">
            {HELP_BULLETS.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2 text-sm leading-5 text-text-secondary">
                <Check className="mt-0.5 size-4 shrink-0 text-success-icon" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <EoCertificateModal
        open={openModal === "eo"}
        onOpenChange={(v) => setOpenModal(v ? "eo" : null)}
        onSave={() => markDone("eo")}
      />
      <ProducerAgreementModal
        open={openModal === "w9"}
        onOpenChange={(v) => setOpenModal(v ? "w9" : null)}
        onSign={() => markDone("w9")}
      />
      <LicenseCopiesModal
        open={openModal === "licenses"}
        onOpenChange={(v) => setOpenModal(v ? "licenses" : null)}
        onDone={() => markDone("licenses")}
      />
    </OnboardingShell>
  )
}

export { StepComplianceDocuments }
