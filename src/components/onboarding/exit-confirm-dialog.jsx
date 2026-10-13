import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

function ExitConfirmDialog({ open, onOpenChange, onConfirm }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to exit?</DialogTitle>
          <DialogDescription>
            You will be logged out. You can continue from where you left off in your next
            login.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="primary" intent="negative" onClick={onConfirm}>
            Yes, I&apos;m sure
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { ExitConfirmDialog }
