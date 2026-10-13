import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { StatusBadge } from "@/components/quote-requests/status-badge"

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-border-default py-2.5 last:border-b-0">
      <p className="text-sm text-text-secondary">{label}</p>
      <p className="text-sm font-medium text-text-primary">{value}</p>
    </div>
  )
}

function formatCurrency(value) {
  if (value == null) return "—"
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" })
}

function QuoteRequestDetailsDialog({ open, onOpenChange, request }) {
  if (!request) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{request.account}</DialogTitle>
          <DialogDescription>{request.id}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col">
          <DetailRow label="Policy type" value={request.policyType} />
          <DetailRow label="How quoted" value={request.howQuoted ?? "—"} />
          <DetailRow label="Quotes" value={request.quotes ?? "—"} />
          <DetailRow label="Status" value={<StatusBadge status={request.status} />} />
          <DetailRow label="Updated" value={request.updated} />
          <DetailRow label="Best premium" value={formatCurrency(request.bestPremium)} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { QuoteRequestDetailsDialog }
