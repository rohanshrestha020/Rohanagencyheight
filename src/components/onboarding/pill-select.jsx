import { cn } from "@/lib/utils"

// Single- or multi-select pill group used throughout the "Tell us about your
// business" step and the "Add a licensed state" modal.
function PillSelect({ label, required, optional, helperText, options, multiple = false, value, onChange }) {
  const selected = Array.isArray(value) ? value : value ? [value] : []

  function toggle(option) {
    if (multiple) {
      onChange(
        selected.includes(option)
          ? selected.filter((v) => v !== option)
          : [...selected, option]
      )
    } else {
      onChange(option)
    }
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-baseline gap-1">
        <span className="text-sm leading-5 font-medium text-text-primary">{label}</span>
        {required ? <span className="text-sm leading-5 text-error-text">*</span> : null}
        {optional ? <span className="text-sm leading-5 text-text-tertiary">(Optional)</span> : null}
      </div>
      {helperText ? <p className="text-xs leading-4 text-text-tertiary">{helperText}</p> : null}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option)
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              className={cn(
                "rounded-full px-3 py-1.5 text-[13px] leading-[18px] whitespace-nowrap",
                isSelected
                  ? "bg-primary-solid text-primary-contrast"
                  : "bg-surface-base text-text-primary shadow-[0px_1px_1px_0px_var(--color-black-alpha-8),0px_0px_0px_1px_var(--color-black-alpha-16)] hover:bg-surface-highlight"
              )}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { PillSelect }
