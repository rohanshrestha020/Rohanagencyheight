import { useState } from "react"
import { ArrowRight, Check, Zap } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Figma "Market Card - proposed" (DES-1, node 14:4059). One card, three
// access types — each maps to a Button hierarchy from the design system.
const ACCESS = {
  instant: {
    label: "Get instant access",
    doneLabel: "Access granted",
    variant: "primary",
    leadingIcon: Zap,
  },
  wholesale: {
    label: "Submit a risk",
    doneLabel: "Risk submitted",
    variant: "tertiary",
    trailingIcon: ArrowRight,
  },
  appointment: {
    label: "Request appointment",
    doneLabel: "Appointment requested",
    variant: "secondary",
  },
}

// Figma "Elevation/Card" (resting) and "Elevation/Card-Hover" effect styles.
const ELEVATION =
  "shadow-[0_1px_2px_-1px_var(--color-black-alpha-8),0_0_0_1px_var(--color-black-alpha-16)] hover:shadow-[0_2px_10px_-1px_var(--color-black-alpha-8),0_1px_2px_-1px_var(--color-black-alpha-16),0_0_0_1px_var(--color-black-alpha-12)]"

function MarketLogo({ logo, name }) {
  return (
    <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border-default bg-surface-base p-2">
      {logo ? (
        <img src={logo} alt="" className="size-12 object-contain" />
      ) : (
        // Assumption: no logo asset in the repo for this carrier — fall back
        // to initials on a neutral tile rather than a broken image.
        <span className="text-sm leading-5 font-semibold text-text-secondary">
          {name.slice(0, 3).toUpperCase()}
        </span>
      )}
    </div>
  )
}

function AmRating({ value }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-border-default bg-surface-base py-1 pr-1 pl-2">
      <span className="text-[11px] leading-4 text-text-secondary">AM Rating</span>
      <span className="rounded-full bg-success-solid px-2 py-1 text-sm leading-5 font-medium text-success-contrast">
        {value}
      </span>
    </div>
  )
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt className="text-xs leading-4 text-text-secondary">{label}</dt>
      <dd className="text-sm leading-5 font-medium text-text-primary">{value}</dd>
    </div>
  )
}

function MarketCard({
  logo,
  name,
  hook,
  isNew = false,
  amRating,
  paper,
  stateMatch,
  licensedIn,
  commission,
  access = "appointment",
  caption,
}) {
  const [requested, setRequested] = useState(false)
  const action = ACCESS[access]
  const LeadingIcon = requested ? Check : action.leadingIcon
  const TrailingIcon = requested ? null : action.trailingIcon

  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-md bg-surface-base p-4 transition-shadow",
        ELEVATION
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <MarketLogo logo={logo} name={name} />
          {isNew || amRating ? (
            <div className="flex flex-col items-end gap-2">
              {isNew ? (
                <Badge status="info" size="sm" shape="circular">
                  New this month
                </Badge>
              ) : null}
              {amRating ? <AmRating value={amRating} /> : null}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-0.5">
          <h3 className="text-base leading-6 font-medium text-text-primary">{name}</h3>
          <p className="line-clamp-2 text-sm leading-5 text-text-secondary">{hook}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        <Badge status={paper === "Admitted" ? "info" : "warning"} size="sm" className="font-normal">
          {paper}
        </Badge>
        <Badge status="success" size="sm" className="font-normal">
          {stateMatch}
        </Badge>
      </div>

      <dl className="flex flex-col gap-2 border-t border-border-default pt-3">
        <DetailRow label="Licensed in" value={licensedIn} />
        {commission ? (
          <>
            <DetailRow label="New business" value={commission.newBusiness} />
            <DetailRow label="Renewal" value={commission.renewal} />
          </>
        ) : (
          <DetailRow label="Commission" value="On appointment" />
        )}
      </dl>

      {/* mt-auto pins the CTA to the bottom so buttons line up across a grid row */}
      <div className="mt-auto flex flex-col gap-2">
        <Button
          variant={action.variant}
          shape="circular"
          className="w-full"
          disabled={requested}
          onClick={() => setRequested(true)}
        >
          {LeadingIcon ? <LeadingIcon /> : null}
          {requested ? action.doneLabel : action.label}
          {TrailingIcon ? <TrailingIcon /> : null}
        </Button>
        <p className="text-center text-xs leading-4 text-text-secondary">{caption}</p>
      </div>
    </article>
  )
}

export { MarketCard }
