import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function DeleteQuoteRequestDialog({ open, onOpenChange, request, onConfirm }) {
  if (!request) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete quote request?</DialogTitle>
          <DialogDescription>
            {request.account} · {request.id} will be permanently removed. This can't be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="-mx-4 -mb-4">
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" intent="negative" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { DeleteQuoteRequestDialog }
