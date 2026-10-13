import { useState } from "react"
import { Info } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PillSelect } from "@/components/onboarding/pill-select"

const LINES_OF_BUSINESS = [
  "Property & Casualty",
  "Personal Lines",
  "Commercial Lines",
  "Life",
  "Accident & Health",
  "Surplus Lines",
  "Adjuster",
]

function LicensedStateModal({ open, onOpenChange, onAdd }) {
  const [state, setState] = useState("Colorado")
  const [lines, setLines] = useState(["Property & Casualty", "Personal Lines"])

  function handleAdd() {
    onAdd?.({ state, lines })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Add a licence NIPR hasn&apos;t picked up yet.</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm leading-5 font-medium text-text-primary">State</label>
            <Select value={state} onValueChange={setState}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Colorado">Colorado</SelectItem>
                <SelectItem value="Texas">Texas</SelectItem>
                <SelectItem value="Louisiana">Louisiana</SelectItem>
                <SelectItem value="Oklahoma">Oklahoma</SelectItem>
                <SelectItem value="New Mexico">New Mexico</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <PillSelect
            label="Lines of business"
            required
            helperText="Only the lines Colorado issues are listed. Pick every line your licence covers."
            options={LINES_OF_BUSINESS}
            multiple
            value={lines}
            onChange={setLines}
          />

          <Alert status="warning">
            <Info />
            <AlertDescription>
              We can&apos;t confirm this with NIPR yet, so it counts as trusted-by-you. Add the
              licence copy in Compliance Documents to access markets and submissions.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter className="bg-surface-subtle">
          <Button type="button" variant="text" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" variant="primary" shape="rounded" onClick={handleAdd}>
            Add state
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { LicensedStateModal }
