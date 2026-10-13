import { useState } from "react"
import { FileText, Upload, Check } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const STATES = [
  { name: "Texas", lines: "Property · Casualty · Commercial Auto" },
  { name: "Louisiana", lines: "Property · Casualty" },
  { name: "Oklahoma", lines: "Property · Casualty · Workers Comp" },
  { name: "New Mexico", lines: "Property only" },
]

function LicenseCopiesModal({ open, onOpenChange, onDone }) {
  const [uploaded, setUploaded] = useState({})

  const uploadedCount = Object.values(uploaded).filter(Boolean).length
  const allUploaded = uploadedCount === STATES.length

  function handleDone() {
    if (!allUploaded) return
    onDone?.()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[620px]">
        <DialogHeader>
          <DialogTitle>License copies</DialogTitle>
        </DialogHeader>

        <p className="text-sm leading-5 text-text-secondary">
          Carriers ask for a copy of your license in every state you want to be appointed in.
          Your NIPR record shows 4.
        </p>

        <ul className="flex flex-col divide-y divide-border-default">
          {STATES.map((state) => {
            const isUploaded = Boolean(uploaded[state.name])
            return (
              <li key={state.name} className="flex items-center gap-3 py-3">
                <FileText className="size-5 shrink-0 text-text-tertiary" />
                <div className="flex flex-1 flex-col">
                  <span className="text-sm leading-5 font-medium text-text-primary">
                    {state.name}
                  </span>
                  <span className="text-[13px] leading-[18px] text-text-secondary">
                    {state.lines}
                  </span>
                </div>
                {isUploaded ? (
                  <span className="flex items-center gap-1.5 text-sm leading-5 font-medium text-success-text">
                    <Check className="size-4" />
                    Uploaded
                  </span>
                ) : (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setUploaded((prev) => ({ ...prev, [state.name]: true }))}
                  >
                    <Upload className="size-4" />
                    Upload file
                  </Button>
                )}
              </li>
            )
          })}
        </ul>

        <DialogFooter className="items-center sm:justify-between">
          <span className="text-[13px] leading-[18px] text-text-tertiary">
            {uploadedCount} of {STATES.length} uploaded
          </span>
          <div className="flex gap-2">
            <Button type="button" variant="text" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="button" variant="primary" disabled={!allUploaded} onClick={handleDone}>
              Done
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { LicenseCopiesModal }
