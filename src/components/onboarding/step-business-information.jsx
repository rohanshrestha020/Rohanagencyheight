import { useState } from "react"
import { ArrowRight } from "lucide-react"

import { OnboardingShell } from "@/components/onboarding/onboarding-shell"
import { PillSelect } from "@/components/onboarding/pill-select"
import { MatchedMarketsModal } from "@/components/onboarding/matched-markets-modal"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

function StepBusinessInformation({ formData, updateFormData, onNext, onExit }) {
  const [marketsOpen, setMarketsOpen] = useState(false)

  return (
    <OnboardingShell currentStep={3} onExit={onExit}>
      <div className="flex w-full max-w-[620px] flex-col gap-8 py-8">
        <div className="flex flex-col gap-2">
          <h1 className="m-0 text-xl leading-7 font-semibold tracking-normal text-text-primary">
            Tell us about your business
          </h1>
          <p className="text-sm leading-5 text-text-secondary">
            This shapes the markets and leads we line up for you.
          </p>
        </div>

        <Alert status="info">
          <AlertDescription>
            Most agencies increase their revenue by up to 20% by working with Agency Height -
            same carriers, same policies.
          </AlertDescription>
        </Alert>

        <button
          type="button"
          onClick={() => setMarketsOpen(true)}
          className="self-start text-sm leading-5 font-medium text-primary-text underline underline-offset-2"
        >
          View all matched markets
        </button>

        <div className="flex flex-col gap-6">
          <PillSelect
            label="What is your book size?"
            required
            options={["Under $1M", "$1M - $5M", "$1M - $20M", "$20M+"]}
            value={formData.bookSize}
            onChange={(v) => updateFormData({ bookSize: v })}
          />
          <PillSelect
            label="People writing business"
            optional
            options={["Just me", "2 - 4", "5 - 10", "11+"]}
            value={formData.peopleWritingBusiness}
            onChange={(v) => updateFormData({ peopleWritingBusiness: v })}
          />
          <PillSelect
            label="Book Mix"
            optional
            options={["Mostly personal", "Mostly commercial", "Mostly life", "About even"]}
            value={formData.bookMix}
            onChange={(v) => updateFormData({ bookMix: v })}
          />
          <PillSelect
            label="What you run today"
            optional
            options={[
              "AMS360",
              "EZLynx",
              "Applied Epic",
              "HawkSoft",
              "QQCatalyst",
              "Nowcerts",
              "Spreadsheets",
              "Others",
            ]}
            value={formData.agencyManagementSystem}
            onChange={(v) => updateFormData({ agencyManagementSystem: v })}
          />
          <PillSelect
            label="What you pay for your agency website"
            optional
            options={[
              "I don't have a website",
              "Under $50/mo",
              "$50 – $100/mo",
              "$100 – $250/mo",
              "$250 – $500/mo",
              "$500+/mo",
            ]}
            value={formData.websiteCost}
            onChange={(v) => updateFormData({ websiteCost: v })}
          />
        </div>

        <div className="flex justify-end">
          <Button type="button" variant="primary" shape="circular" onClick={onNext}>
            Continue
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>

      <MatchedMarketsModal open={marketsOpen} onOpenChange={setMarketsOpen} />
    </OnboardingShell>
  )
}

export { StepBusinessInformation }
