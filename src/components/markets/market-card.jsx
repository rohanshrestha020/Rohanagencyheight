import { ArrowRight, Check, Zap } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Figma "Elevation/Card" (resting) and "Elevation/Card-Hover" effect styles.
const ELEVATION =
  "shadow-[0_1px_2px_-1px_var(--color-black-alpha-8),0_0_0_1px_var(--color-black-alpha-16)] hover:shadow-[0_2px_10px_-1px_var(--color-black-alpha-8),0_1px_2px_-1px_var(--color-black-alpha-16),0_0_0_1px_var(--color-black-alpha-12)]"

// Which CTA a card shows. Access type picks the Button hierarchy (Figma:
// instant = primary, wholesale = tertiary, appointment = secondary).
function resolveAction(carrier, { appointed, status }) {
  if (appointed) {
    return {
      kind: "submit",
      label: "Submit a risk",
      variant: "tertiary",
      trailingIcon: ArrowRight,
      // Assumption: Figma reused the wholesale caption on appointed cards;
      // that copy isn't true once you hold the appointment.
      caption: "You're appointed — submit risks any time",
    }
  }
  if (carrier.access === "instant") {
    return { kind: "grant", label: "Get instant access", variant: "primary", leadingIcon: Zap, caption: carrier.caption }
  }
  if (carrier.access === "wholesale") {
    return { kind: "submit", label: "Submit a risk", variant: "tertiary", trailingIcon: ArrowRight, caption: carrier.caption }
  }
  if (status === "requested") {
    return { kind: "request", label: "Appointment requested", variant: "secondary", leadingIcon: Check, disabled: true, caption: "We'll email you when it's approved" }
  }
  return { kind: "request", label: "Request appointment", variant: "secondary", caption: carrier.caption }
}

function MarketLogo({ logo, name, className }) {
  return (
    <div
      className={cn(
        "flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border-default bg-surface-base p-2",
        className
      )}
    >
      {logo ? (
        <img src={logo} alt={`${name} logo`} className="size-full rounded-sm object-contain" />
      ) : (
        <span className="text-sm leading-5 font-semibold text-text-secondary">
          {name.slice(0, 3).toUpperCase()}
        </span>
      )}
    </div>
  )
}

function AmRating({ value }) {
  return (
    <div className="flex shrink-0 items-center gap-1 rounded-full border border-border-default bg-surface-base py-1 pr-1 pl-2">
      <span className="text-[11px] leading-4 text-text-secondary">AM Rating</span>
      <span className="rounded-full bg-success-solid px-2 text-sm leading-5 font-medium text-success-contrast">
        {value}
      </span>
    </div>
  )
}

function NewBadge() {
  return (
    <Badge status="info" size="sm" shape="circular" className="font-normal">
      New this month
    </Badge>
  )
}

function stateMatchStatus(stateMatch) {
  if (stateMatch.startsWith("All")) return "success"
  if (stateMatch.startsWith("Varies")) return "general"
  return "warning"
}

function MarketTags({ carrier, className }) {
  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {carrier.paper ? (
        <Badge status={carrier.paper === "Admitted" ? "info" : "warning"} size="sm" className="font-normal">
          {carrier.paper}
        </Badge>
      ) : null}
      <Badge status={stateMatchStatus(carrier.stateMatch)} size="sm" className="font-normal">
        {carrier.stateMatch}
      </Badge>
    </div>
  )
}

function detailRows(carrier) {
  const rows = [["Licensed in", carrier.licensedIn]]
  if (carrier.commission) {
    rows.push(["New business", carrier.commission.newBusiness], ["Renewal", carrier.commission.renewal])
  } else {
    rows.push(["Commission", "On appointment"])
  }
  return rows
}

function MarketAction({ action, onAction, className }) {
  const LeadingIcon = action.leadingIcon
  const TrailingIcon = action.trailingIcon
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Button
        variant={action.variant}
        shape="circular"
        className="w-full"
        disabled={action.disabled}
        onClick={() => onAction(action.kind)}
      >
        {LeadingIcon ? <LeadingIcon /> : null}
        {action.label}
        {TrailingIcon ? <TrailingIcon /> : null}
      </Button>
      <p className="text-center text-xs leading-4 text-text-secondary">{action.caption}</p>
    </div>
  )
}

// Figma "Market Card - proposed" (node 14:4059) — the grid card.
function GridMarketCard({ carrier, action, onAction }) {
  return (
    <article className={cn("flex flex-col gap-4 rounded-md bg-surface-base p-4 transition-shadow", ELEVATION)}>
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <MarketLogo logo={carrier.logo} name={carrier.name} />
          {carrier.isNew || carrier.amRating ? (
            <div className="flex flex-col items-end gap-2">
              {carrier.isNew ? <NewBadge /> : null}
              {carrier.amRating ? <AmRating value={carrier.amRating} /> : null}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-0.5">
          <h3 className="text-base leading-6 font-medium text-text-primary">{carrier.name}</h3>
          <p className="line-clamp-2 text-sm leading-5 text-text-secondary">{carrier.hook}</p>
        </div>
      </div>

      <MarketTags carrier={carrier} />

      <dl className="flex flex-col gap-2 border-t border-border-default pt-3">
        {detailRows(carrier).map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-2">
            <dt className="text-xs leading-4 text-text-secondary">{label}</dt>
            <dd className="text-sm leading-5 font-medium text-text-primary">{value}</dd>
          </div>
        ))}
      </dl>

      {/* mt-auto pins the CTA to the bottom so buttons line up across a grid row */}
      <MarketAction action={action} onAction={onAction} className="mt-auto" />
    </article>
  )
}

// Figma "Market Card · Compact - proposed" (node 17:3962) — the list row.
// Stacks vertically below lg so it still works on narrow screens.
function CompactMarketCard({ carrier, action, onAction }) {
  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-md bg-surface-base p-4 transition-shadow lg:flex-row lg:items-center lg:gap-6",
        ELEVATION
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-6">
        <MarketLogo logo={carrier.logo} name={carrier.name} />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex min-w-0 flex-col gap-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base leading-6 font-medium text-text-primary">{carrier.name}</h3>
              {carrier.isNew ? <NewBadge /> : null}
              {carrier.amRating ? <AmRating value={carrier.amRating} /> : null}
            </div>
            <p className="truncate text-sm leading-5 text-text-secondary">{carrier.hook}</p>
          </div>
          <MarketTags carrier={carrier} />
        </div>
      </div>

      <dl className="flex shrink-0 gap-6 border-border-default lg:w-[300px] lg:border-l lg:pl-6">
        {detailRows(carrier).map(([label, value]) => (
          <div key={label} className="flex flex-col">
            <dt className="text-xs leading-4 whitespace-nowrap text-text-secondary">{label}</dt>
            <dd className="text-sm leading-5 font-medium whitespace-nowrap text-text-primary">{value}</dd>
          </div>
        ))}
      </dl>

      <MarketAction action={action} onAction={onAction} className="shrink-0 lg:w-[220px]" />
    </article>
  )
}

function MarketCard({ carrier, layout = "grid", appointed = false, status, onAction }) {
  const action = resolveAction(carrier, { appointed, status })
  const handleAction = (kind) => onAction?.(kind, carrier)
  return layout === "compact" ? (
    <CompactMarketCard carrier={carrier} action={action} onAction={handleAction} />
  ) : (
    <GridMarketCard carrier={carrier} action={action} onAction={handleAction} />
  )
}

export { MarketCard, MarketLogo }
