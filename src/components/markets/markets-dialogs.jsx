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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const LINES = [
  "General liability",
  "Business owners (BOP)",
  "Commercial property",
  "Workers comp",
  "Dwelling fire",
  "Homeowners",
  "Personal auto",
  "Flood",
  "Other",
]

// Assumption: Figma only showed the "Submit a risk" button, not what it
// opens. A short intake (account, line, notes) is the minimum the wholesale
// desk would need to start shopping the risk.
function SubmitRiskDialog({ carrier, onOpenChange, onSubmit }) {
  const [account, setAccount] = useState("")
  const [line, setLine] = useState("")
  const [notes, setNotes] = useState("")

  function reset() {
    setAccount("")
    setLine("")
    setNotes("")
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!account.trim() || !line) return
    onSubmit({ carrier, account: account.trim(), line, notes: notes.trim() })
    reset()
  }

  return (
    <Dialog
      open={Boolean(carrier)}
      onOpenChange={(next) => {
        if (!next) reset()
        onOpenChange(next)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Submit a risk to {carrier?.name}</DialogTitle>
            <DialogDescription>
              The Agency Height wholesale desk submits, negotiates and returns quotes under your
              name.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label htmlFor="risk-account">Account name</Label>
            <Input
              id="risk-account"
              size="sm"
              value={account}
              onChange={(event) => setAccount(event.target.value)}
              placeholder="e.g. Doe LLC"
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="risk-line">Line of business</Label>
            <Select value={line} onValueChange={setLine}>
              <SelectTrigger id="risk-line" size="sm">
                <SelectValue placeholder="Select a line" />
              </SelectTrigger>
              <SelectContent>
                {LINES.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="risk-notes">Notes for the underwriter (optional)</Label>
            <Textarea
              id="risk-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Effective date, limits, loss history…"
              rows={3}
            />
          </div>

          <DialogFooter className="-mx-4 -mb-4 mt-2">
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!account.trim() || !line}>
              Submit risk
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function RequestCarrierDialog({ open, onOpenChange, onSubmit }) {
  const [carrierName, setCarrierName] = useState("")
  const [reason, setReason] = useState("")

  function reset() {
    setCarrierName("")
    setReason("")
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!carrierName.trim()) return
    onSubmit({ carrierName: carrierName.trim(), reason: reason.trim() })
    reset()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) reset()
        onOpenChange(next)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Request a carrier</DialogTitle>
            <DialogDescription>
              Not seeing a market you need? Tell us and we’ll chase the appointment.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label htmlFor="request-carrier">Carrier name</Label>
            <Input
              id="request-carrier"
              size="sm"
              value={carrierName}
              onChange={(event) => setCarrierName(event.target.value)}
              placeholder="e.g. Hiscox"
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="request-reason">What do you want to write with them? (optional)</Label>
            <Textarea
              id="request-reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="Lines, states, a specific account…"
              rows={3}
            />
          </div>

          <DialogFooter className="-mx-4 -mb-4 mt-2">
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!carrierName.trim()}>
              Send request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { RequestCarrierDialog, SubmitRiskDialog }
