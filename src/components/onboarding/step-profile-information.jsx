import { ArrowLeft, ArrowRight, Upload } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FloatingLabelInput } from "@/components/ui/floating-label-input"
import { OnboardingShell } from "@/components/onboarding/onboarding-shell"
import { PhoneField } from "@/components/onboarding/phone-field"
import { AddressField } from "@/components/onboarding/address-field"

const FIELD_SHADOW =
  "shadow-[0px_0px_0px_1px_var(--color-black-alpha-16),0px_1px_2px_0px_var(--color-black-alpha-8)]"

function StepProfileInformation({ formData, updateFormData, onNext, onBack, onExit }) {
  return (
    <OnboardingShell currentStep={2} onExit={onExit}>
      <div className="flex w-full max-w-[620px] flex-col gap-8 py-8">
        <button
          type="button"
          onClick={onBack}
          className={cn(
            "flex h-7 w-fit items-center gap-1.5 rounded-full bg-surface-subtle px-3 text-sm leading-5 font-medium text-primary-text",
            FIELD_SHADOW
          )}
        >
          <ArrowLeft className="size-4" />
          Back
        </button>

        <div className="flex flex-col gap-2">
          <h1 className="m-0 text-[20px] leading-7 font-semibold text-text-primary">
            Add your profile information
          </h1>
          <p className="text-sm leading-5 text-text-secondary">
            Some details are fetched from your NPN information
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-[#e54ade] text-base font-semibold text-white">
            LB
          </span>
          <div className="flex flex-1 flex-col gap-2">
            <p className="text-sm leading-5 font-medium text-text-primary">Profile Picture</p>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="border-primary-border text-primary-text"
              >
                <Upload className="size-4" />
                Upload image
              </Button>
              <Button type="button" variant="text" size="sm" className="opacity-50">
                Remove
              </Button>
            </div>
            <p className="text-xs leading-4 text-text-tertiary">
              *.png,*jpg files up to 10 MB at least 400px by 400px ·{" "}
              <button type="button" className="text-info-text underline underline-offset-2">
                View Photo guidelines
              </button>
            </p>
          </div>
        </div>

        <div className="flex w-full items-start gap-5">
          <FloatingLabelInput
            id="full-name"
            label="Full name"
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            helperText="As it appears on your license"
            className={cn("flex-1 border-transparent bg-surface-subtle", FIELD_SHADOW)}
          />
          <FloatingLabelInput
            id="agency-name"
            label="Agency name or DBA"
            value={formData.agencyName}
            onChange={(e) => updateFormData({ agencyName: e.target.value })}
            helperText="Optional — how clients know you"
            className={cn("flex-1 border-transparent bg-surface-subtle", FIELD_SHADOW)}
          />
        </div>

        <PhoneField
          id="phone"
          value={formData.phone}
          onChange={(v) => updateFormData({ phone: v })}
          helperText="We text you the moment an underwriter moves — that's all"
        />

        <AddressField
          id="address"
          value={formData.address}
          onChange={(v) => updateFormData({ address: v })}
        />

        <div className="flex w-full items-center justify-between">
          <span />
          <Button type="button" variant="primary" shape="circular" onClick={onNext}>
            Continue
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </OnboardingShell>
  )
}

export { StepProfileInformation }
