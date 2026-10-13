import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { COVERAGE_CATALOG } from "@/components/quote-requests/new-quote-flow/constants"

const QUOTE_STATUS_BADGE = {
  Quoted: "success",
  Referred: "warning",
  Declined: "error",
}

function ReviewCard({ title, onEdit, children }) {
  return (
    <div className="flex flex-col gap-3 rounded-md border border-border-default bg-surface-base p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
        <button type="button" onClick={onEdit} className="text-sm font-medium text-primary-text hover:underline">
          Edit
        </button>
      </div>
      {children}
    </div>
  )
}

function ReviewSubmitStep({
  note,
  onNoteChange,
  account,
  coverageKeys,
  perCoverage,
  gating,
  documents,
  quotes,
  onToggleQuoteSelection,
  onEditStep,
  onAddAnotherQuote,
}) {
  const uploadedCount = documents.filter((d) => d.status === "uploaded").length

  return (
    <div className="mx-auto flex w-full max-w-[720px] flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-text-primary">Review and submit</h1>
        <p className="text-sm text-text-secondary">
          Check it over before it goes to the desk. Click any section to go back and edit it.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-text-primary">Note for the underwriter</h3>
        <p className="text-xs text-text-tertiary">
          Context about the risk, the relationship, or anything unusual the underwriter should
          know before they shop it.
        </p>
        <Textarea
          value={note}
          onChange={(event) => onNoteChange(event.target.value.slice(0, 1000))}
          className="min-h-24"
        />
        <p className="self-end text-xs text-text-tertiary">{note.length}/1000</p>
      </div>

      <ReviewCard title="Account" onEdit={() => onEditStep("account")}>
        {account ? (
          <div>
            <p className="text-sm font-medium text-text-primary">{account.name}</p>
            <p className="text-xs text-text-tertiary">
              {account.phone} · {account.email} · {account.address}
            </p>
          </div>
        ) : null}
      </ReviewCard>

      <ReviewCard title="Coverages and quote method" onEdit={() => onEditStep("quote-type")}>
        <div className="grid grid-cols-2 gap-3">
          {coverageKeys.map((key) => {
            const coverage = COVERAGE_CATALOG.find((c) => c.key === key)
            const values = perCoverage[key] ?? {}
            return (
              <div key={key} className="rounded-md bg-surface-highlight p-3">
                <p className="text-sm font-medium text-text-primary">{coverage.label}</p>
                <p className="text-xs text-text-tertiary">
                  {values.effectiveDate || "No date set"} · {values.targetPremium || "No target"}
                </p>
              </div>
            )
          })}
        </div>
        <p className="text-xs text-text-tertiary">
          Quote method — <span className="font-medium text-text-secondary">Through wholesale</span>{" "}
          <Badge status="info" size="sm">Usually 1-2 business days</Badge>
        </p>
      </ReviewCard>

      <ReviewCard title="Underwriting questions" onEdit={() => onEditStep("questions")}>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-text-tertiary">Loss or claim in the last 5 years?</p>
            <p className="text-text-primary">{gating.priorLoss || "—"}</p>
          </div>
          <div>
            <p className="text-text-tertiary">Policy lapse or cancellation in last 3 years?</p>
            <p className="text-text-primary">
              {gating.priorLapse === "Yes"
                ? `Yes — ${gating.lapseWhatHappened || "unspecified"}, ${gating.lapseCarrier || "—"}, ${gating.lapseWhen || "—"}`
                : gating.priorLapse || "—"}
            </p>
          </div>
        </div>
      </ReviewCard>

      <ReviewCard title="Documents" onEdit={() => onEditStep("quote-type")}>
        <div className="flex items-center gap-2">
          <Badge status="success" size="sm">{uploadedCount} uploaded</Badge>
          <Badge status="warning" size="sm">{documents.length - uploadedCount} still needed</Badge>
        </div>
        <p className="text-xs text-text-tertiary">
          You can submit now — the desk will chase the outstanding items, but a complete file
          quotes faster.
        </p>
      </ReviewCard>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Your quotes</h3>
            <p className="text-xs text-text-tertiary">
              Tick the ones you want in the proposal. Bringing opens the carrier with everything
              already filled in.
            </p>
          </div>
          <Button type="button" variant="secondary" size="sm" onClick={onAddAnotherQuote}>
            + Add Another Quote
          </Button>
        </div>
        <div className="overflow-hidden rounded-md border border-border-default">
          <Table>
            <TableHeader>
              <TableRow className="bg-surface-highlight hover:bg-surface-highlight">
                <TableHead className="w-10 px-3" />
                <TableHead className="px-3">Carrier</TableHead>
                <TableHead className="px-3">Coverage</TableHead>
                <TableHead className="px-3">Added on</TableHead>
                <TableHead className="px-3">Valid to</TableHead>
                <TableHead className="px-3">Proposal</TableHead>
                <TableHead className="px-3">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell className="px-3">
                    <Checkbox
                      checked={quote.selectedForProposal}
                      disabled={quote.status !== "Quoted"}
                      onCheckedChange={() => onToggleQuoteSelection(quote.id)}
                    />
                  </TableCell>
                  <TableCell className="px-3 text-sm font-medium text-text-primary">
                    {quote.carrierName}
                  </TableCell>
                  <TableCell className="px-3 text-sm text-text-secondary">{quote.coverageLabel}</TableCell>
                  <TableCell className="px-3 text-sm text-text-secondary">{quote.addedOn}</TableCell>
                  <TableCell className="px-3 text-sm text-text-secondary">{quote.validTo}</TableCell>
                  <TableCell className="px-3 text-sm font-medium text-success-text">
                    {quote.status === "Quoted" ? quote.proposal : "—"}
                  </TableCell>
                  <TableCell className="px-3">
                    <Badge status={QUOTE_STATUS_BADGE[quote.status]} size="sm">
                      {quote.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export { ReviewSubmitStep }
