import { useMemo, useRef, useState } from "react"
import { CircleCheck, Info, LayoutGrid, List, SearchX, X, Zap } from "lucide-react"

import { cn } from "@/lib/utils"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { Alert, AlertAction, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ToastStack } from "@/components/quote-requests/toast-stack"
import { MarketCard } from "@/components/markets/market-card"
import { ComingSoonSection, MarketSection } from "@/components/markets/market-section"
import { MarketsToolbar } from "@/components/markets/markets-toolbar"
import { RequestCarrierDialog, SubmitRiskDialog } from "@/components/markets/markets-dialogs"
import { CARRIERS, COMING_SOON, INITIAL_APPOINTED, SECTIONS } from "@/components/markets/markets-data"
import { EMPTY_FILTERS, hasAnyFilter, matchesFilters } from "@/components/markets/markets-filters"

const PILL_ICONS = { "my-markets": CircleCheck, "start-writing": Zap }

const REQUEST_STATUS = {
  granted: { label: "Access granted", status: "success" },
  desk: { label: "With wholesale desk", status: "info" },
  pending: { label: "Pending approval", status: "warning" },
  review: { label: "Under review", status: "general" },
  subscribed: { label: "Alert on", status: "brand" },
}

const GRID = "grid grid-cols-[repeat(auto-fill,minmax(256px,1fr))] gap-4"

function maxCommission(carriers) {
  const rates = carriers
    .map((carrier) => carrier.commission?.newBusiness)
    .filter((rate) => rate?.endsWith("%"))
    .map((rate) => Number.parseFloat(rate))
  return Math.max(...rates)
}

function CategoryPill({ label, count, icon: Icon, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 text-sm leading-5 whitespace-nowrap transition-colors outline-none focus-visible:shadow-[0_0_0_1px_var(--color-border-focus),0_0_0_4px_var(--color-brand-a20)]",
        active
          ? "border-primary-solid bg-primary-solid text-primary-contrast"
          : "border-border-default bg-surface-base text-text-primary hover:bg-surface-highlight"
      )}
    >
      {Icon ? <Icon className="size-4" /> : null}
      {label}
      <span className={cn("text-xs", active ? "text-primary-contrast/70" : "text-text-tertiary")}>{count}</span>
    </button>
  )
}

function ViewToggle({ layout, onChange }) {
  const options = [
    { value: "grid", label: "Grid view", icon: LayoutGrid },
    { value: "compact", label: "List view", icon: List },
  ]
  return (
    <div className="flex items-center gap-1 rounded-full border border-border-default bg-surface-base p-1">
      {options.map(({ value, label, icon: Icon }) => (
        <Button
          key={value}
          variant={layout === value ? "tertiary" : "text"}
          size="icon-sm"
          shape="circular"
          aria-label={label}
          aria-pressed={layout === value}
          onClick={() => onChange(value)}
        >
          <Icon />
        </Button>
      ))}
    </div>
  )
}

function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-md border border-dashed border-border-default bg-surface-base px-6 py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-surface-highlight text-text-secondary">
        <Icon className="size-6" />
      </span>
      <p className="text-base leading-6 font-medium text-text-primary">{title}</p>
      <p className="max-w-md text-sm leading-5 text-text-secondary">{description}</p>
      {action}
    </div>
  )
}

function CarrierList({ carriers, layout, appointed, statuses, onAction }) {
  return (
    <div className={layout === "grid" ? GRID : "flex flex-col gap-3"}>
      {carriers.map((carrier) => (
        <MarketCard
          key={carrier.id}
          carrier={carrier}
          layout={layout}
          appointed={appointed.has(carrier.id)}
          status={statuses[carrier.id]}
          onAction={onAction}
        />
      ))}
    </div>
  )
}

function RequestsTable({ requests }) {
  return (
    <div className="overflow-hidden rounded-md border border-border-default bg-surface-base">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Carrier</TableHead>
            <TableHead>Request</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => {
            const meta = REQUEST_STATUS[request.status]
            return (
              <TableRow key={request.id}>
                <TableCell className="font-medium text-text-primary">{request.carrier}</TableCell>
                <TableCell>{request.type}</TableCell>
                <TableCell className="max-w-xs truncate text-text-secondary">{request.detail || "—"}</TableCell>
                <TableCell className="text-text-secondary">{request.submitted}</TableCell>
                <TableCell>
                  <Badge status={meta.status} size="sm" shape="circular">
                    {meta.label}
                  </Badge>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

function MarketsPage({ onNavigate }) {
  const [tab, setTab] = useState("available")
  const [pill, setPill] = useState("all")
  const [layout, setLayout] = useState("grid")
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [myStatesOnly, setMyStatesOnly] = useState(true)
  const [showAlert, setShowAlert] = useState(true)
  const [appointed, setAppointed] = useState(() => new Set(INITIAL_APPOINTED))
  const [statuses, setStatuses] = useState({})
  const [notified, setNotified] = useState(() => new Set())
  const [requests, setRequests] = useState([])
  const [riskCarrier, setRiskCarrier] = useState(null)
  const [requestCarrierOpen, setRequestCarrierOpen] = useState(false)
  const [toasts, setToasts] = useState([])
  const resultsRef = useRef(null)

  function pushToast(message, status = "success") {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, message, status }])
    setTimeout(() => setToasts((prev) => prev.filter((toast) => toast.id !== id)), 4000)
  }

  function addRequest(request) {
    setRequests((prev) => [{ id: crypto.randomUUID(), submitted: "Just now", ...request }, ...prev])
  }

  function scrollToResults() {
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const visibleCarriers = useMemo(
    () => CARRIERS.filter((carrier) => matchesFilters(carrier, EMPTY_FILTERS, { myStatesOnly })),
    [myStatesOnly]
  )
  const filtered = useMemo(
    () => CARRIERS.filter((carrier) => matchesFilters(carrier, filters, { myStatesOnly })),
    [filters, myStatesOnly]
  )
  const sections = useMemo(
    () =>
      SECTIONS.map((section) => ({
        section,
        carriers: visibleCarriers.filter((carrier) => section.match(carrier, { appointed })),
      })),
    [visibleCarriers, appointed]
  )
  const myMarkets = CARRIERS.filter((carrier) => appointed.has(carrier.id))
  const filtering = hasAnyFilter(filters)
  const instantCount = visibleCarriers.filter((carrier) => carrier.access === "instant").length
  const summary = `${visibleCarriers.length} markets can write in your licensed states — ${instantCount} with instant access, commissions up to ${maxCommission(CARRIERS)}%.`
  const newCarriers = CARRIERS.filter((carrier) => carrier.isNew)

  function handleAction(kind, carrier) {
    if (kind === "grant") {
      setAppointed((prev) => new Set(prev).add(carrier.id))
      addRequest({ carrier: carrier.name, type: "Instant access", detail: "Sub-code appointment", status: "granted" })
      pushToast(`You now have access to ${carrier.name}. Find it under My markets.`)
    } else if (kind === "submit") {
      setRiskCarrier(carrier)
    } else if (kind === "request") {
      setStatuses((prev) => ({ ...prev, [carrier.id]: "requested" }))
      addRequest({ carrier: carrier.name, type: "Appointment", detail: "Typically approved in 1–2 business days", status: "pending" })
      pushToast(`Appointment requested with ${carrier.name}.`)
    }
  }

  function handleSubmitRisk({ carrier, account, line, notes }) {
    addRequest({ carrier: carrier.name, type: "Risk submission", detail: [account, line, notes].filter(Boolean).join(" · "), status: "desk" })
    setRiskCarrier(null)
    pushToast(`${account} sent to the wholesale desk for ${carrier.name}.`)
  }

  function handleNotify(carrier) {
    setNotified((prev) => new Set(prev).add(carrier.id))
    addRequest({ carrier: carrier.name, type: "Go-live alert", detail: carrier.lines, status: "subscribed" })
    pushToast(`We'll let you know the day ${carrier.name} goes live.`)
  }

  function handleRequestCarrier({ carrierName, reason }) {
    addRequest({ carrier: carrierName, type: "Carrier request", detail: reason, status: "review" })
    setRequestCarrierOpen(false)
    pushToast(`Thanks — we'll chase an appointment with ${carrierName}.`)
  }

  function selectPill(id) {
    setPill(id)
    setTab("available")
  }

  const pills = [
    { id: "all", label: "All", count: visibleCarriers.length },
    ...sections.map(({ section, carriers }) => ({
      id: section.id,
      label: section.pill,
      count: carriers.length,
      icon: PILL_ICONS[section.id],
    })),
    { id: "coming-soon", label: "Coming soon", count: COMING_SOON.length },
  ]

  const shownSections = sections.filter(
    ({ section, carriers }) => carriers.length > 0 && (pill === "all" || pill === section.id)
  )

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AppSidebar activeItem="markets" onNavigate={onNavigate} />
      <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden bg-surface-subtle">
        <AppHeader title="Markets" />

        <div className="flex w-full flex-1 flex-col overflow-y-auto">
          {showAlert ? (
            <Alert status="info" className="rounded-none border-x-0 border-t-0 pl-6">
              <Info />
              <AlertDescription className="text-text-secondary">
                <span className="font-medium text-info-text">New this month: </span>
                {newCarriers.map((carrier) => carrier.name.split(" ")[0]).sort().join(" · ")} just went live{" "}
                <button
                  type="button"
                  className="font-medium text-info-text hover:underline"
                  onClick={() => {
                    selectPill("new")
                    scrollToResults()
                  }}
                >
                  See what’s new
                </button>
              </AlertDescription>
              <AlertAction>
                <Button variant="text" size="icon-sm" aria-label="Dismiss" onClick={() => setShowAlert(false)}>
                  <X />
                </Button>
              </AlertAction>
            </Alert>
          ) : null}

          <MarketsToolbar
            summary={summary}
            myStatesOnly={myStatesOnly}
            onMyStatesOnlyChange={setMyStatesOnly}
            onRequestCarrier={() => setRequestCarrierOpen(true)}
            filters={filters}
            onFiltersChange={setFilters}
            onFindAppetite={() => {
              setTab("available")
              scrollToResults()
            }}
          />

          <div ref={resultsRef} className="flex w-full scroll-mt-4 justify-center px-4 py-8 sm:px-9">
            <Tabs value={tab} onValueChange={setTab} className="w-full max-w-[1200px] gap-8">
              <div className="flex items-end justify-between gap-4 border-b border-border-default">
                <TabsList variant="line" className="h-auto justify-start gap-6 rounded-none bg-transparent p-0">
                  {[
                    { value: "available", label: "Available markets" },
                    { value: "mine", label: "My markets" },
                    { value: "requests", label: "My requests", count: requests.length },
                  ].map((item) => (
                    <TabsTrigger
                      key={item.value}
                      value={item.value}
                      className="h-auto flex-none gap-2 rounded-none border-none bg-transparent px-0 pb-3 text-base font-medium text-text-secondary shadow-none after:-bottom-px after:h-0.5 after:bg-primary-solid data-active:bg-transparent data-active:text-primary-text data-active:shadow-none"
                    >
                      {item.label}
                      {item.count ? (
                        <span className="rounded-full bg-primary-bg px-2 py-0.5 text-xs text-primary-text">
                          {item.count}
                        </span>
                      ) : null}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <div className="pb-2">
                  <ViewToggle layout={layout} onChange={setLayout} />
                </div>
              </div>

              <TabsContent value="available" className="flex flex-col gap-12">
                {filtering ? (
                  <section className="flex flex-col gap-6">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm leading-5 text-text-secondary">
                        <span className="font-medium text-text-primary">{filtered.length}</span>{" "}
                        {filtered.length === 1 ? "market matches" : "markets match"} your search
                      </p>
                      <Button variant="text" size="sm" onClick={() => setFilters(EMPTY_FILTERS)}>
                        Clear search
                      </Button>
                    </div>
                    {filtered.length ? (
                      <CarrierList carriers={filtered} layout={layout} appointed={appointed} statuses={statuses} onAction={handleAction} />
                    ) : (
                      <EmptyState
                        icon={SearchX}
                        title="No markets match"
                        description="Try a different keyword, widen the state or coverage, or ask us to bring a carrier on."
                        action={
                          <Button variant="secondary" shape="circular" onClick={() => setRequestCarrierOpen(true)}>
                            Request a carrier
                          </Button>
                        }
                      />
                    )}
                  </section>
                ) : (
                  <>
                    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
                      {pills.map((item) => (
                        <CategoryPill
                          key={item.id}
                          label={item.label}
                          count={item.count}
                          icon={item.icon}
                          active={pill === item.id}
                          onClick={() => selectPill(item.id)}
                        />
                      ))}
                    </div>

                    {shownSections.map(({ section, carriers }) => (
                      <MarketSection
                        key={section.id}
                        section={section}
                        carriers={carriers}
                        layout={layout}
                        appointed={appointed}
                        statuses={statuses}
                        onAction={handleAction}
                        forceExpanded={pill !== "all"}
                      />
                    ))}

                    {pill !== "all" && pill !== "coming-soon" && shownSections.length === 0 ? (
                      <EmptyState
                        icon={SearchX}
                        title="Nothing here yet"
                        description="No markets in this category match your states. Turn off “My states only” to see more."
                      />
                    ) : null}

                    {pill === "all" || pill === "coming-soon" ? (
                      <ComingSoonSection
                        carriers={COMING_SOON}
                        notified={notified}
                        onNotify={handleNotify}
                        onRequestCarrier={() => setRequestCarrierOpen(true)}
                      />
                    ) : null}
                  </>
                )}
              </TabsContent>

              <TabsContent value="mine" className="flex flex-col gap-6">
                <p className="text-sm leading-5 text-text-secondary">
                  Appointed and sub-coded — quote these without asking anyone.
                </p>
                <CarrierList carriers={myMarkets} layout={layout} appointed={appointed} statuses={statuses} onAction={handleAction} />
              </TabsContent>

              <TabsContent value="requests" className="flex flex-col gap-6">
                {requests.length ? (
                  <RequestsTable requests={requests} />
                ) : (
                  <EmptyState
                    icon={Info}
                    title="No requests yet"
                    description="Appointment requests, risks sent to the wholesale desk, carrier requests and go-live alerts will show up here."
                    action={
                      <Button variant="secondary" shape="circular" onClick={() => setTab("available")}>
                        Browse markets
                      </Button>
                    }
                  />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <SubmitRiskDialog
        carrier={riskCarrier}
        onOpenChange={(open) => {
          if (!open) setRiskCarrier(null)
        }}
        onSubmit={handleSubmitRisk}
      />
      <RequestCarrierDialog open={requestCarrierOpen} onOpenChange={setRequestCarrierOpen} onSubmit={handleRequestCarrier} />
      <ToastStack toasts={toasts} />
    </div>
  )
}

export { MarketsPage }
