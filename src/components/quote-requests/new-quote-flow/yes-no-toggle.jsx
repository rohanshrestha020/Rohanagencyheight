import { cn } from "@/lib/utils"

function YesNoToggle({ value, onChange, name, options = ["Yes", "No"] }) {
  return (
    <div className="flex w-full gap-3" role="radiogroup" aria-label={name}>
      {options.map((option) => {
        const selected = value === option
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option)}
            className={cn(
              "flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border text-sm font-medium",
              selected
                ? "border-primary-border bg-primary-bg text-primary-text"
                : "border-border-default bg-surface-base text-text-primary hover:bg-surface-highlight"
            )}
          >
            <span
              className={cn(
                "flex size-4 items-center justify-center rounded-full border",
                selected ? "border-primary-solid" : "border-border-default"
              )}
            >
              {selected ? <span className="size-2 rounded-full bg-primary-solid" /> : null}
            </span>
            {option}
          </button>
        )
      })}
    </div>
  )
}

export { YesNoToggle }
