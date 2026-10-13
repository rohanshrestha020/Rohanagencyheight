import { useState } from "react"
import { Lock, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Paperclip } from "lucide-react"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const TEMPLATES = [
  {
    id: "comprehensive",
    label: "Comprehensive",
    description: "Full coverage-by-coverage breakdown with every selected quote and its dec page.",
  },
  {
    id: "one-pager",
    label: "One-pager",
    description: "Single summary sheet — best quote per coverage, side by side.",
  },
]

function BuildProposalFlow({ account, quotes, onSendProposal, onBack, onExit }) {
  const [stage, setStage] = useState("template")
  const [template, setTemplate] = useState("comprehensive")
  const [includeOtherRequests, setIncludeOtherRequests] = useState(false)
  const [selectedQuoteIds, setSelectedQuoteIds] = useState(
    () => new Set(quotes.filter((q) => q.status === "Quoted").map((q) => q.id))
  )
  const [selectedDocIds, setSelectedDocIds] = useState(() => new Set(quotes.map((q) => q.id)))
  const [emailOpen, setEmailOpen] = useState(false)
  const [emailFields, setEmailFields] = useState({
    to: account?.email ?? "",
    subject: `Your ${quotes.map((q) => q.coverageLabel).join(" & ")} proposal — ${account?.name ?? ""}`,
    message: `Hi,\n\nAttached is the proposal we discussed. Take a look and let me know if you'd like to walk through the numbers together.\n\nBest,`,
  })

  const includedQuotes = quotes.filter((q) => selectedQuoteIds.has(q.id))

  function toggleQuote(id) {
    setSelectedQuoteIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  function toggleDoc(id) {
    setSelectedDocIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  if (stage === "template") {
    return (
      <div className="mx-auto flex w-full max-w-[640px] flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-text-primary">Build the proposal</h1>
          <p className="text-sm text-text-secondary">
            Pick a template and the quotes you want {account?.name} to see.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-text-primary">Account</p>
          <div className="flex items-center justify-between rounded-md border border-border-default bg-surface-subtle px-4 py-3">
            <div>
              <p className="text-sm font-medium text-text-primary">{account?.name}</p>
              <p className="text-xs text-text-tertiary">Preselected from this quote request — can't be changed here</p>
            </div>
            <Lock className="size-4 text-text-tertiary" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-text-primary">Template</p>
          <div className="grid grid-cols-2 gap-3">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTemplate(t.id)}
                className={cn(
                  "flex flex-col gap-1 rounded-md border p-4 text-left",
                  template === t.id
                    ? "border-primary-solid bg-primary-bg/40"
                    : "border-border-default hover:bg-surface-highlight"
                )}
              >
                <span className="flex items-center gap-2 text-sm font-medium text-text-primary">
                  <span
                    className={cn(
                      "flex size-4 items-center justify-center rounded-full border",
                      template === t.id ? "border-primary-solid" : "border-border-default"
                    )}
                  >
                    {template === t.id ? <span className="size-2 rounded-full bg-primary-solid" /> : null}
                  </span>
                  {t.label}
                </span>
                <span className="text-xs text-text-tertiary">{t.description}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-text-primary">Quotes to include</p>
            <label className="flex items-center gap-2 text-xs text-text-secondary">
              <Switch checked={includeOtherRequests} onCheckedChange={setIncludeOtherRequests} />
              Also show quotes from other requests on this account
            </label>
          </div>
          <div className="flex flex-col gap-2">
            {quotes.map((quote) => (
              <label
                key={quote.id}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-md border px-4 py-3",
                  selectedQuoteIds.has(quote.id)
                    ? "border-primary-solid bg-primary-bg/30"
                    : "border-border-default"
                )}
              >
                <div className="flex items-center gap-3">
                  <Checkbox checked={selectedQuoteIds.has(quote.id)} onCheckedChange={() => toggleQuote(quote.id)} />
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {quote.carrierName}{" "}
                      <span className="font-normal text-text-tertiary">{quote.coverageLabel}</span>
                    </p>
                    <p className="text-xs text-text-tertiary">Quote generated {quote.addedOn}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-success-text">{quote.proposal}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex w-full items-center justify-between border-t border-border-default pt-4">
          <Button type="button" variant="text" onClick={onExit}>
            Save and exit
          </Button>
          <div className="flex items-center gap-3">
            <Button type="button" variant="secondary" onClick={onBack}>
              Back
            </Button>
            <Button
              type="button"
              shape="circular"
              disabled={includedQuotes.length === 0}
              onClick={() => setStage("attachments")}
            >
              Continue to attachments
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-[960px] flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-text-primary">Attachments</h1>
          <p className="text-sm text-text-secondary">Choose which documents ride along with the proposal.</p>
        </div>

        <div className="grid grid-cols-[280px_1fr] gap-6">
          <div className="flex flex-col gap-2">
            {includedQuotes.map((quote, index) => (
              <label
                key={quote.id}
                className={cn(
                  "flex flex-col gap-1 rounded-md border p-3 cursor-pointer",
                  selectedDocIds.has(quote.id)
                    ? "border-primary-solid bg-primary-bg/30"
                    : "border-border-default"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <Checkbox
                      className="mt-0.5"
                      checked={selectedDocIds.has(quote.id)}
                      onCheckedChange={() => toggleDoc(quote.id)}
                    />
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {quote.carrierName} — {quote.coverageLabel} dec page.pdf
                      </p>
                      <p className="text-xs text-text-tertiary">{quote.coverageLabel} · {quote.carrierName}</p>
                    </div>
                  </div>
                  {index === 0 ? <Badge status="selected" size="sm">RECOMMENDED</Badge> : null}
                </div>
                {index === 0 ? (
                  <p className="pl-6 text-xs text-primary-text">
                    Recommended — fullest schedule of coverage at the strongest bindable rate.
                  </p>
                ) : null}
              </label>
            ))}
          </div>

          <div className="flex flex-col gap-2 rounded-md border border-border-default bg-surface-subtle p-4">
            <div className="flex items-center justify-between text-xs text-text-tertiary">
              <div className="flex items-center gap-2">
                <ZoomOut className="size-4" />
                100%
                <ZoomIn className="size-4" />
              </div>
              <span>Full page</span>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-6 rounded-md bg-secondary-blue-800 p-10 text-white">
              <p className="text-lg font-semibold">Renegade</p>
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-xl font-semibold">
                  Insurance Quote Proposal for {account?.name}
                </p>
              </div>
              <p className="text-xs text-white/70">Presented on {new Date().toLocaleDateString()}</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-text-tertiary">
              <ChevronLeft className="size-4" /> Page 1 of {Math.max(includedQuotes.length, 1)}{" "}
              <ChevronRight className="size-4" />
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-between border-t border-border-default pt-4">
          <Button type="button" variant="text" onClick={onExit}>
            Save and exit
          </Button>
          <div className="flex items-center gap-3">
            <Button type="button" variant="secondary" onClick={() => setStage("template")}>
              Back
            </Button>
            <Button type="button" shape="circular" onClick={() => setEmailOpen(true)}>
              Continue to email
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={emailOpen} onOpenChange={setEmailOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Send proposal</DialogTitle>
            <DialogDescription>Review the email before it goes out.</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="proposal-to">To</Label>
              <Input
                id="proposal-to"
                size="sm"
                value={emailFields.to}
                onChange={(event) => setEmailFields((prev) => ({ ...prev, to: event.target.value }))}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="proposal-subject">Subject</Label>
              <Input
                id="proposal-subject"
                size="sm"
                value={emailFields.subject}
                onChange={(event) => setEmailFields((prev) => ({ ...prev, subject: event.target.value }))}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="proposal-message">Message</Label>
              <Textarea
                id="proposal-message"
                className="min-h-32"
                value={emailFields.message}
                onChange={(event) => setEmailFields((prev) => ({ ...prev, message: event.target.value }))}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {includedQuotes
                .filter((q) => selectedDocIds.has(q.id))
                .map((q) => (
                  <span
                    key={q.id}
                    className="flex items-center gap-1.5 rounded-full bg-surface-highlight px-3 py-1 text-xs text-text-secondary"
                  >
                    <Paperclip className="size-3.5" />
                    {q.carrierName}-{q.coverageLabel}.pdf
                  </span>
                ))}
            </div>
          </div>

          <DialogFooter className="-mx-4 -mb-4">
            <Button type="button" variant="secondary" onClick={() => setEmailOpen(false)}>
              Back
            </Button>
            <Button type="button" variant="secondary" onClick={() => setEmailOpen(false)}>
              Save as draft
            </Button>
            <Button
              type="button"
              onClick={() => {
                setEmailOpen(false)
                onSendProposal(emailFields)
              }}
            >
              Send proposal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export { BuildProposalFlow }
