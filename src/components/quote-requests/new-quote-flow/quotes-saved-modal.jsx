import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

function QuotesSavedModal({ open, onOpenChange, account, lineItemCount, requestCount, onContinueToProposal, onViewQuoteRequest }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm" showCloseButton={false}>
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-success-bg">
            <span className="flex size-10 items-center justify-center rounded-full bg-success-solid text-success-contrast">
              <Check className="size-6" />
            </span>
          </span>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Your quotes are saved!</h2>
            <p className="text-sm text-text-secondary">
              {lineItemCount} line item{lineItemCount === 1 ? "" : "s"} created across {requestCount}{" "}
              quote request{requestCount === 1 ? "" : "s"}
              {account ? ` for ${account.name}` : ""}.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2">
            <Button type="button" className="w-full" onClick={onContinueToProposal}>
              Continue to proposal
            </Button>
            <Button type="button" variant="tertiary" className="w-full" onClick={onViewQuoteRequest}>
              View quote request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { QuotesSavedModal }
