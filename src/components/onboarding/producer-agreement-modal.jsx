import { useState } from "react"
import {
  FileText,
  Lock,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const TOTAL_PAGES = 6

const PROFILE = [
  ["Legal name", "Marcus J. Whitfield"],
  ["Agency / DBA", "Whitfield Insurance Group"],
  ["Business address", "Austin, TX"],
  ["NPN", "8123456"],
]

const TAX_CLASSIFICATIONS = ["LLC - Partnership", "LLC - S-Corp", "LLC - C-Corp", "Sole Proprietor"]

function Field({ label, helperText, children }) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <span className="text-sm leading-5 font-medium text-text-primary">{label}</span>
      {children}
      {helperText ? <p className="text-xs leading-4 text-text-tertiary">{helperText}</p> : null}
    </div>
  )
}

function ProducerAgreementModal({ open, onOpenChange, onSign }) {
  const [page, setPage] = useState(1)
  const [signerTitle, setSignerTitle] = useState("")
  const [taxClassification, setTaxClassification] = useState("LLC - Partnership")
  const [taxpayerId, setTaxpayerId] = useState("")
  const [signature, setSignature] = useState("")
  const [agreed, setAgreed] = useState(false)

  const canSign = signerTitle && taxpayerId && signature && agreed

  function handleSign() {
    if (!canSign) return
    onSign?.({ signerTitle, taxClassification, taxpayerId, signature })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col sm:max-w-[1100px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="size-4" />
            producer-agreement.pdf
          </DialogTitle>
        </DialogHeader>

        <div className="flex min-h-0 flex-1 gap-0 overflow-hidden rounded-xl border border-border-default">
          {/* Left pane — static placeholder, not a real PDF renderer. */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-surface-subtle p-8">
            <div className="flex aspect-[8.5/11] w-full max-w-[380px] flex-col gap-2 rounded-sm bg-white p-8 shadow-lg">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="h-2 rounded-full bg-neutral-4"
                  style={{ width: `${90 - (i % 3) * 15}%` }}
                />
              ))}
            </div>

            <div className="absolute bottom-4 flex items-center gap-3 rounded-full bg-surface-base px-4 py-2 shadow-[0px_0px_0px_1px_var(--color-black-alpha-16),0px_1px_2px_0px_var(--color-black-alpha-8)]">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                aria-label="Previous page"
                className="text-text-secondary hover:text-text-primary disabled:opacity-40"
                disabled={page <= 1}
              >
                <ChevronLeft className="size-4" />
              </button>
              <span className="text-[13px] leading-[18px] whitespace-nowrap text-text-secondary">
                Page {page} of {TOTAL_PAGES}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
                aria-label="Next page"
                className="text-text-secondary hover:text-text-primary disabled:opacity-40"
                disabled={page >= TOTAL_PAGES}
              >
                <ChevronRight className="size-4" />
              </button>
              <div className="h-4 w-px bg-border-default" />
              <ZoomOut className="size-4 text-text-tertiary" />
              <span className="text-[13px] leading-[18px] text-text-secondary">100%</span>
              <ZoomIn className="size-4 text-text-tertiary" />
              <div className="h-4 w-px bg-border-default" />
              <Download className="size-4 text-text-tertiary" />
            </div>
          </div>

          {/* Right pane */}
          <div className="flex w-[458px] shrink-0 flex-col gap-4 overflow-y-auto bg-white p-6">
            <div className="flex items-center gap-1.5 text-xs leading-4 text-text-tertiary">
              <Lock className="size-3.5" />
              Pulled from your profile — locked
            </div>

            <div className="flex flex-col gap-2 rounded-xl bg-surface-subtle p-4">
              {PROFILE.map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-2">
                  <span className="text-[13px] leading-[18px] text-text-secondary">{label}</span>
                  <span className="text-sm leading-5 font-medium text-text-primary">{value}</span>
                </div>
              ))}
            </div>

            <span className="text-sm leading-5 font-medium text-text-primary">
              Required from you
            </span>

            <Field label="Signer title">
              <Input
                placeholder="e.g. Principal, Agency Owner"
                value={signerTitle}
                onChange={(e) => setSignerTitle(e.target.value)}
              />
            </Field>

            <div className="flex flex-col gap-1.5">
              <span className="text-sm leading-5 font-medium text-text-primary">
                Effective date
              </span>
              <div className="flex h-14 w-full items-center rounded-md border border-border-disabled bg-surface-subtle px-3 text-base text-text-tertiary">
                August 12, 2026
              </div>
            </div>

            <Field label="Federal Tax Classification">
              <Select value={taxClassification} onValueChange={setTaxClassification}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TAX_CLASSIFICATIONS.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Taxpayer ID (SSN or EIN)" helperText="From Form W-9, Part I — used only for 1099 reporting">
              <Input
                placeholder="XX-XXXXXXX"
                value={taxpayerId}
                onChange={(e) => setTaxpayerId(e.target.value)}
              />
            </Field>

            <Field label="Type your signature" helperText="Your typed name is applied to the document">
              <Input
                placeholder="Full legal name"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
              />
            </Field>

            <label className="flex items-start gap-2">
              <Checkbox
                checked={agreed}
                onCheckedChange={(v) => setAgreed(v === true)}
                className="mt-0.5"
              />
              <span className="text-[13px] leading-[18px] text-text-secondary">
                I agree this typed signature is my legal electronic signature, and I am
                authorized to bind this agency to the agreement.
              </span>
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="text" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" variant="primary" disabled={!canSign} onClick={handleSign}>
            Sign &amp; submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { ProducerAgreementModal }
