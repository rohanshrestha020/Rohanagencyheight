import { ChevronDown } from "lucide-react"

const FIELD_SHADOW =
  "shadow-[0px_0px_0px_1px_var(--color-black-alpha-16),0px_1px_2px_0px_var(--color-black-alpha-8)]"

// Figma's own component only shows a US "+1" option, so the country
// selector is decorative here (no real country-switching data exists to
// wire up) — everything else (the actual number input) is fully real.
function PhoneField({ id, label = "Phone", helperText, value, onChange }) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <div
        className={`flex h-14 w-full items-center gap-2 rounded-md border-transparent bg-surface-subtle px-3 ${FIELD_SHADOW}`}
      >
        <button
          type="button"
          className="flex shrink-0 items-center gap-1 text-sm text-text-secondary"
        >
          <span className="inline-block h-3 w-4 overflow-hidden rounded-[2px]" aria-hidden="true">
            <span className="block h-1 w-full bg-[#B22234]" />
            <span className="block h-1 w-full bg-white" />
            <span className="block h-1 w-full bg-[#3C3B6E]" />
          </span>
          +1
          <ChevronDown className="size-3.5" />
        </button>
        <div className="h-6 w-px bg-border-default" />
        <div className="flex flex-1 flex-col justify-center">
          <label htmlFor={id} className="text-xs leading-4 text-text-secondary">
            {label}
          </label>
          <input
            id={id}
            type="tel"
            placeholder="Mobile number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent text-base leading-6 text-text-primary outline-none placeholder:text-text-tertiary"
          />
        </div>
      </div>
      {helperText ? <p className="text-xs leading-4 text-text-secondary">{helperText}</p> : null}
    </div>
  )
}

export { PhoneField }
