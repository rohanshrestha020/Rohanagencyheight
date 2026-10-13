import { cn } from "@/lib/utils"

// Selectable card used for the "What type of agency are you?" choice.
// Selection is shown via the same focus-ring treatment used elsewhere in
// this app (Elevation/Borders/Active), not a filled-color change — that's
// what Figma's own component actually does here.
function OptionCard({ icon: Icon, title, subtitle, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-1 items-start gap-3 rounded-md border p-4 text-left",
        selected
          ? "border-border-default bg-surface-highlight shadow-[0px_0px_0px_1px_var(--color-border-focus),0px_0px_0px_4px_var(--color-brand-a20)]"
          : "border-transparent bg-surface-base shadow-[0px_0px_0px_1px_var(--color-black-alpha-16),0px_1px_2px_0px_var(--color-black-alpha-8)]"
      )}
    >
      <Icon className="size-4 shrink-0 text-text-primary" />
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-base leading-6 font-medium text-text-primary">{title}</p>
        <p className="text-xs leading-4 text-text-secondary">{subtitle}</p>
      </div>
      <span
        className={cn(
          "mt-0.5 size-4 shrink-0 rounded-full",
          selected
            ? "bg-text-primary"
            : "bg-surface-base shadow-[0px_0px_0px_1px_var(--color-black-alpha-16),0px_1px_2px_0px_var(--color-black-alpha-8)]"
        )}
      />
    </button>
  )
}

export { OptionCard }
