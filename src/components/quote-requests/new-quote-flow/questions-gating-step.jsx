import { Input } from "@/components/ui/input"
import { YesNoToggle } from "@/components/quote-requests/new-quote-flow/yes-no-toggle"
import { COVERAGE_CATALOG } from "@/components/quote-requests/new-quote-flow/constants"

function QuestionsGatingStep({ gating, onGatingChange, coverageKeys, perCoverage, onPerCoverageChange }) {
  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-text-primary">Underwriting questions</h1>
        <p className="text-sm text-text-secondary">
          Answer these once and the underwriters will not have to come back to you for them.
          Everything here is required.
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-md border border-border-default bg-surface-base p-5">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-text-primary">
            Has this business had a loss or claim in the last 5 years?
          </p>
          <YesNoToggle
            value={gating.priorLoss}
            onChange={(value) => onGatingChange({ priorLoss: value })}
            name="Prior loss"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-text-primary">
            Has this business had a lapse of coverage, been declined, canceled, or non-renewed in
            the last 3 years?
          </p>
          <YesNoToggle
            value={gating.priorLapse}
            onChange={(value) => onGatingChange({ priorLapse: value })}
            name="Prior lapse"
          />
        </div>

        {gating.priorLapse === "Yes" ? (
          <div className="flex flex-col gap-3 border-l-2 border-primary-border pl-4">
            <p className="text-sm text-text-secondary">
              Tell us what happened — the underwriters will ask otherwise.
            </p>
            <div className="grid grid-cols-3 gap-3">
              <Input
                value={gating.lapseWhatHappened ?? ""}
                onChange={(event) => onGatingChange({ lapseWhatHappened: event.target.value })}
                placeholder="What happened"
                size="sm"
              />
              <Input
                value={gating.lapseCarrier ?? ""}
                onChange={(event) => onGatingChange({ lapseCarrier: event.target.value })}
                placeholder="Which carrier"
                size="sm"
              />
              <Input
                value={gating.lapseWhen ?? ""}
                onChange={(event) => onGatingChange({ lapseWhen: event.target.value })}
                placeholder="When"
                size="sm"
              />
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-base font-semibold text-text-primary">
          Effective date and target premium — one set per coverage
        </h2>
        {coverageKeys.map((key) => {
          const coverage = COVERAGE_CATALOG.find((c) => c.key === key)
          const values = perCoverage[key] ?? {}
          return (
            <div
              key={key}
              className="flex flex-col gap-3 rounded-md border border-border-default bg-surface-base p-4"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-medium text-text-primary">
                  <coverage.icon className="size-4 text-text-tertiary" />
                  {coverage.label}
                </span>
                <span className="text-xs text-text-tertiary">{coverage.route}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-text-tertiary">Effective date</label>
                  <Input
                    type="date"
                    value={values.effectiveDate ?? ""}
                    onChange={(event) =>
                      onPerCoverageChange(key, { effectiveDate: event.target.value })
                    }
                    size="sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-text-tertiary">Target premium</label>
                  <Input
                    value={values.targetPremium ?? ""}
                    onChange={(event) =>
                      onPerCoverageChange(key, { targetPremium: event.target.value })
                    }
                    placeholder="$4,500"
                    size="sm"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { QuestionsGatingStep }
