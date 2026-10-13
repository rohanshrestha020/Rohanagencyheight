import { useState } from "react"
import { ArrowRight, Bell, Check, Plus, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MarketCard, MarketLogo } from "@/components/markets/market-card"

// Figma frame name: "Sections collapsed after 2 rows (Discover more expands
// in place)". 2 rows of 4 = 8 slots, so 7 cards + the Discover more tile.
const COLLAPSED_COUNT = 7

const GRID = "grid grid-cols-[repeat(auto-fill,minmax(256px,1fr))] gap-4"

function SectionHeader({ title, count, description, rater, expanded, onCollapse }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {rater ? (
            <span className="flex size-7 items-center justify-center rounded-md bg-primary-solid text-primary-contrast">
              <Sparkles className="size-4" />
            </span>
          ) : null}
          <h2 className="text-xl leading-7 font-semibold text-text-primary">{title}</h2>
          <Badge size="sm" shape="circular" className="font-normal">
            {count}
          </Badge>
        </div>
        <p className="text-sm leading-5 text-text-secondary">{description}</p>
      </div>
      {expanded ? (
        <Button variant="text" size="sm" onClick={onCollapse}>
          Show less
        </Button>
      ) : null}
    </div>
  )
}

// Dashed "Discover more" tile — logo stack of the hidden markets + count.
function DiscoverMoreCard({ hidden, total, label = "more markets in this section", onExpand }) {
  const stack = hidden.slice(0, 3)
  const extra = hidden.length - stack.length
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center gap-4 rounded-md border border-dashed border-border-hover bg-surface-subtle p-4 text-center">
      <div className="flex items-center -space-x-1">
        {stack.map((carrier) => (
          <MarketLogo
            key={carrier.id}
            logo={carrier.logo}
            name={carrier.name}
            className="size-10 border-surface-base p-0.5"
          />
        ))}
        {extra > 0 ? (
          <span className="flex size-10 items-center justify-center rounded-md border border-surface-base bg-info-bg text-sm leading-5 font-medium text-text-primary">
            +{extra}
          </span>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-base leading-6 font-medium text-text-primary">Discover more</p>
        <p className="text-sm leading-5 text-text-secondary">
          {hidden.length} {label}
        </p>
      </div>
      <Button variant="secondary" shape="circular" size="sm" onClick={onExpand}>
        View all {total}
        <ArrowRight />
      </Button>
    </div>
  )
}

function MarketSection({ section, carriers, layout, appointed, statuses, onAction, forceExpanded }) {
  const [expanded, setExpanded] = useState(false)
  const isExpanded = forceExpanded || expanded
  const collapsible = layout === "grid" && carriers.length > COLLAPSED_COUNT + 1
  const visible = collapsible && !isExpanded ? carriers.slice(0, COLLAPSED_COUNT) : carriers
  const hidden = carriers.slice(COLLAPSED_COUNT)

  return (
    <section id={`section-${section.id}`} className="flex scroll-mt-6 flex-col gap-6">
      <SectionHeader
        title={section.title}
        count={carriers.length}
        description={section.description}
        rater={section.rater}
        expanded={collapsible && expanded && !forceExpanded}
        onCollapse={() => setExpanded(false)}
      />
      <div className={layout === "grid" ? GRID : "flex flex-col gap-3"}>
        {visible.map((carrier) => (
          <MarketCard
            key={carrier.id}
            carrier={carrier}
            layout={layout}
            appointed={appointed.has(carrier.id)}
            status={statuses[carrier.id]}
            onAction={onAction}
          />
        ))}
        {collapsible && !isExpanded ? (
          <DiscoverMoreCard hidden={hidden} total={carriers.length} onExpand={() => setExpanded(true)} />
        ) : null}
      </div>
    </section>
  )
}

function ComingSoonCard({ carrier, notified, onNotify }) {
  const count = carrier.requestedBy + (notified ? 1 : 0)
  return (
    <article className="flex min-h-[280px] flex-col items-center gap-4 rounded-md border border-dashed border-border-default bg-surface-subtle p-4 pt-10 text-center">
      <MarketLogo logo={carrier.logo} name={carrier.name} className="size-[60px] border-0 bg-transparent p-0" />
      <div className="flex flex-col gap-1">
        <h3 className="text-base leading-6 font-medium text-text-primary">{carrier.name}</h3>
        <p className="text-sm leading-5 text-text-secondary">{carrier.lines}</p>
      </div>
      <div className="mt-auto flex w-full flex-col gap-2">
        <Button
          variant="secondary"
          shape="circular"
          className={cn("w-full border-transparent", notified && "text-success-text")}
          disabled={notified}
          onClick={() => onNotify(carrier)}
        >
          {notified ? <Check /> : <Bell />}
          {notified ? "We'll notify you" : "Notify me when live"}
        </Button>
        <p className="text-xs leading-4 text-text-secondary">Requested by {count} agents</p>
      </div>
    </article>
  )
}

function RequestCarrierCard({ onRequest }) {
  return (
    <button
      type="button"
      onClick={onRequest}
      className="flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-md border border-dashed border-border-hover bg-surface-subtle p-6 text-center transition-colors outline-none hover:bg-surface-highlight focus-visible:shadow-[0_0_0_1px_var(--color-border-focus),0_0_0_4px_var(--color-brand-a20)]"
    >
      <span className="flex size-10 items-center justify-center rounded-full border border-dashed border-border-hover text-text-secondary">
        <Plus className="size-5" />
      </span>
      <span className="text-base leading-6 font-medium text-text-primary">Request a carrier</span>
      <span className="text-sm leading-5 text-text-tertiary">
        Not seeing a market you need? Tell us and we’ll chase the appointment.
      </span>
    </button>
  )
}

function ComingSoonSection({ carriers, notified, onNotify, onRequestCarrier }) {
  return (
    <section id="section-coming-soon" className="flex scroll-mt-6 flex-col gap-6">
      <SectionHeader
        title="Coming soon"
        count={carriers.length}
        description="Signed or in final paperwork. Get an alert the day they go live."
      />
      <div className={GRID}>
        {carriers.map((carrier) => (
          <ComingSoonCard
            key={carrier.id}
            carrier={carrier}
            notified={notified.has(carrier.id)}
            onNotify={onNotify}
          />
        ))}
        <RequestCarrierCard onRequest={onRequestCarrier} />
      </div>
    </section>
  )
}

export { ComingSoonSection, MarketSection }
