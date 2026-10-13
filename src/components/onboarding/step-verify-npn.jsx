import { Building2, User, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { OnboardingShell } from "@/components/onboarding/onboarding-shell"
import { OptionCard } from "@/components/onboarding/option-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const FIELD_SHADOW =
  "shadow-[0px_0px_0px_1px_var(--color-black-alpha-16),0px_1px_2px_0px_var(--color-black-alpha-8)]"

function LabeledField({ label, required, optional, helperText, className, ...inputProps }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-baseline gap-1">
        <label className="text-sm leading-5 font-medium text-text-primary">{label}</label>
        {required ? <span className="text-sm leading-5 text-error-text">*</span> : null}
        {optional ? <span className="text-sm leading-5 text-text-tertiary">(Optional)</span> : null}
      </div>
      <Input
        className={cn("rounded-sm border-transparent bg-surface-subtle", FIELD_SHADOW)}
        {...inputProps}
      />
      {helperText ? <p className="text-xs leading-4 text-text-secondary">{helperText}</p> : null}
    </div>
  )
}

function StepVerifyNpn({ formData, updateFormData, onNext, onExit }) {
  const businessType = formData.businessType ?? "business"
  const npn = formData.npn ?? "8123456"
  const agencyNpn = formData.agencyNpn ?? ""

  return (
    <OnboardingShell currentStep={0} onExit={onExit}>
      <div className="flex w-full max-w-[620px] flex-col gap-8 pt-8">
        <div className="flex flex-col gap-2">
          <h1 className="m-0 text-xl leading-7 font-semibold text-text-primary">
            Verify your NPN
          </h1>
          <p className="text-sm leading-5 text-text-secondary">
            We&apos;ll pull your license record straight from NIPR.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm leading-5 font-medium text-text-primary">
            What type of agency are you?
          </p>
          <div className="flex w-full items-stretch gap-5">
            <OptionCard
              icon={Building2}
              title="Business Entity"
              subtitle="LLC, S-Corp, C-Corp, Partnership or LLP"
              selected={businessType === "business"}
              onClick={() => updateFormData({ businessType: "business" })}
            />
            <OptionCard
              icon={User}
              title="Individual / Sole Proprietor"
              subtitle="Individual producer, no separate entity"
              selected={businessType === "individual"}
              onClick={() => updateFormData({ businessType: "individual" })}
            />
          </div>
        </div>

        <div className="flex w-full items-start gap-5">
          <LabeledField
            label="Enter your NPN number"
            required
            className="w-[288px] shrink-0"
            placeholder="6 - 9 digit individual NPN"
            value={npn}
            onChange={(e) => updateFormData({ npn: e.target.value })}
          />
          <LabeledField
            label="Agency NPN"
            optional
            className="flex-1"
            placeholder="6 - 9 digit agency NPN"
            helperText="Required if your agency is registered as a Business Entity on the W-9."
            value={agencyNpn}
            onChange={(e) => updateFormData({ agencyNpn: e.target.value })}
          />
        </div>

        <div className="flex w-full items-center justify-between">
          <span className="h-10 w-[84px]" aria-hidden="true" />
          <Button type="button" variant="primary" shape="circular" onClick={onNext}>
            Continue
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </OnboardingShell>
  )
}

export { StepVerifyNpn }
