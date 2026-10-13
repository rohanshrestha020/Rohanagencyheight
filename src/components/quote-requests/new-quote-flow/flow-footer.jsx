import { Button } from "@/components/ui/button"

function FlowFooter({
  onExit,
  exitLabel = "Exit",
  onBack,
  onNext,
  nextLabel = "Next",
  nextDisabled = false,
}) {
  return (
    <div className="flex w-full shrink-0 items-center justify-between border-t border-border-default bg-surface-base px-6 py-4">
      <Button type="button" variant="text" onClick={onExit}>
        {exitLabel}
      </Button>
      <div className="flex items-center gap-3">
        {onBack ? (
          <Button type="button" variant="secondary" onClick={onBack}>
            Back
          </Button>
        ) : null}
        <Button type="button" shape="circular" onClick={onNext} disabled={nextDisabled}>
          {nextLabel}
        </Button>
      </div>
    </div>
  )
}

export { FlowFooter }
