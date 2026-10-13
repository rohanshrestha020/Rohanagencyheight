import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function AddQuoteDialog({ open, onOpenChange, request, onAdd }) {
  const [premium, setPremium] = useState("")

  function handleSubmit(event) {
    event.preventDefault()
    const value = Number(premium)
    if (!premium || Number.isNaN(value) || value <= 0) return
    onAdd(value)
    setPremium("")
  }

  if (!request) return null

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) setPremium("")
        onOpenChange(next)
      }}
    >
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Add quote manually</DialogTitle>
            <DialogDescription>
              Record a carrier quote you received outside the rater for {request.account} ·{" "}
              {request.policyType}.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label htmlFor="manual-premium">Premium</Label>
            <Input
              id="manual-premium"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={premium}
              onChange={(event) => setPremium(event.target.value)}
              placeholder="e.g. 3250"
              size="sm"
              autoFocus
            />
          </div>

          <DialogFooter className="-mx-4 -mb-4 mt-2">
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add quote</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { AddQuoteDialog }
