import { Badge } from "@/components/ui/badge"

// Figma "Quote Requests" table status chips. "declined" has no dedicated tab
// in the design (only All/Draft/In market/Quoted) — categorized under
// "in-market" below since it's a request that was submitted and came back,
// not a draft or a live quote.
const STATUS_META = {
  draft: { label: "Draft", badgeStatus: "general", category: "draft" },
  "in-review": { label: "In review", badgeStatus: "info", category: "in-market" },
  "info-needed": { label: "Info needed", badgeStatus: "warning", category: "in-market" },
  declined: { label: "Declined", badgeStatus: "error", category: "in-market" },
  quoted: { label: "Quoted", badgeStatus: "success", category: "quoted" },
  "proposal-sent": { label: "Proposal sent", badgeStatus: "brand", category: "quoted" },
}

function StatusBadge({ status, className }) {
  const meta = STATUS_META[status]
  return (
    <Badge status={meta.badgeStatus} shape="circular" size="sm" className={className}>
      {meta.label}
    </Badge>
  )
}

export { StatusBadge, STATUS_META }
