import { useRef, useState } from "react"
import { UploadCloud } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CARRIERS = ["Covertree Insurance", "Blitz Insurance", "Coterie Insurance"]
const LIMITS = ["$1M / $1M", "$1M / $2M", "$2M / $2M", "$2M / $4M"]

function Field({ label, children }) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <span className="text-sm leading-5 font-medium text-text-primary">{label}</span>
      {children}
    </div>
  )
}

function EoCertificateModal({ open, onOpenChange, onSave }) {
  const fileInputRef = useRef(null)
  const [fileName, setFileName] = useState(null)
  const [carrier, setCarrier] = useState("")
  const [policyNumber, setPolicyNumber] = useState("")
  const [limits, setLimits] = useState("")
  const [expiration, setExpiration] = useState("")

  const canSave = carrier && policyNumber && limits && expiration

  function handleSave() {
    if (!canSave) return
    onSave?.({ fileName, carrier, policyNumber, limits, expiration })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[620px]">
        <DialogHeader>
          <DialogTitle>E&amp;O certificate</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Field label="Upload Certificate of insurance">
            <div className="flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-neutral-6 px-6 py-8 text-center">
              <UploadCloud className="size-6 text-text-tertiary" />
              <p className="text-sm leading-5 font-semibold text-text-primary">
                Drag and drop files here
              </p>
              <p className="text-xs leading-4 text-text-tertiary">
                PDF, DOC, DOCX · Max 5 MB per file
              </p>
              {fileName ? (
                <p className="text-xs leading-4 text-text-secondary">Selected: {fileName}</p>
              ) : null}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                hidden
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
              />
              {/* Intentional one-off style per Figma — not a pattern to reuse elsewhere. */}
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="mt-2 border-transparent bg-tertiary-blue-3 text-text-blue hover:bg-tertiary-blue-4"
                onClick={() => fileInputRef.current?.click()}
              >
                Browse files
              </Button>
            </div>
          </Field>

          <p className="text-sm leading-5 text-text-secondary">
            Carriers check your errors &amp; omissions coverage before they appoint you. Add the
            policy details and attach the certificate.
          </p>

          <Field label="E&amp;O carrier">
            <Select value={carrier} onValueChange={setCarrier}>
              <SelectTrigger>
                <SelectValue placeholder="Select carrier" />
              </SelectTrigger>
              <SelectContent>
                {CARRIERS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Policy number">
            <Input
              placeholder="e.g. EO-1183472"
              value={policyNumber}
              onChange={(e) => setPolicyNumber(e.target.value)}
            />
          </Field>

          <Field label="Limits (per claim / aggregate)">
            <Select value={limits} onValueChange={setLimits}>
              <SelectTrigger>
                <SelectValue placeholder="Select limits" />
              </SelectTrigger>
              <SelectContent>
                {LIMITS.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Expiration date">
            <Input
              placeholder="dd/mm/yyyy"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
            />
          </Field>
        </div>

        <DialogFooter>
          <Button type="button" variant="text" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" variant="primary" disabled={!canSave} onClick={handleSave}>
            Save E&amp;O details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { EoCertificateModal }
