import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { YesNoToggle } from "@/components/quote-requests/new-quote-flow/yes-no-toggle"
import {
  COVERAGE_CATALOG,
  QUESTIONNAIRE_SECTIONS,
  ELIGIBILITY_ATTESTATIONS,
} from "@/components/quote-requests/new-quote-flow/constants"

function Field({ field, value, onChange }) {
  if (field.type === "yesno") {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-text-primary">{field.label}</p>
        <YesNoToggle
          value={value ?? ""}
          onChange={onChange}
          name={field.label}
          options={field.options}
        />
      </div>
    )
  }

  if (field.type === "textarea") {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm text-text-primary">{field.label}</label>
        <Textarea
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Describe here…"
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-text-primary">{field.label}</label>
      <Input
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={field.placeholder}
        size="sm"
      />
    </div>
  )
}

// Every selected coverage reuses this same field template (adapted from the
// only fully-designed coverage detail form, "General Liability" — node
// 905:60046) rather than a bespoke field set per coverage type.
function CoverageQuestionnaire({ coverageKey, answers, onFieldChange, attestations, onAttestationChange }) {
  const coverage = COVERAGE_CATALOG.find((c) => c.key === coverageKey)

  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col gap-8">
      <h1 className="text-2xl font-semibold text-text-primary">{coverage.label}</h1>

      {QUESTIONNAIRE_SECTIONS.map((section) => (
        <div key={section.key} className="flex flex-col gap-4">
          <h2 className="text-base font-semibold text-text-primary">{section.title}</h2>
          {section.fields.map((field) => (
            <Field
              key={field.key}
              field={field}
              value={answers[field.key]}
              onChange={(value) => onFieldChange(field.key, value)}
            />
          ))}
        </div>
      ))}

      <div className="flex flex-col gap-3">
        <h2 className="text-base font-semibold text-text-primary">Eligibility attestations</h2>
        <p className="text-sm text-text-secondary">
          Eligibility for a bindable quote depends on every statement below being accurate.
        </p>
        {ELIGIBILITY_ATTESTATIONS.map((statement, index) => (
          <Field
            key={index}
            field={{
              key: `attestation-${index}`,
              label: statement,
              type: "yesno",
              options: ["Agree", "Disagree"],
            }}
            value={attestations[index]}
            onChange={(value) => onAttestationChange(index, value)}
          />
        ))}
      </div>
    </div>
  )
}

export { CoverageQuestionnaire }
