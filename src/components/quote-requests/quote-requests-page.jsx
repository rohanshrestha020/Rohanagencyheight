import { useMemo, useState } from "react"
import { ArrowUpDown, Plus, Search, SlidersHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatCard } from "@/components/quote-requests/stat-card"
import { StatusBadge, STATUS_META } from "@/components/quote-requests/status-badge"
import { RowActionsMenu } from "@/components/quote-requests/row-actions-menu"
import { NewQuoteFlowShell } from "@/components/quote-requests/new-quote-flow/new-quote-flow-shell"
import { QuoteRequestDetailsDialog } from "@/components/quote-requests/quote-request-details-dialog"
import { AddQuoteDialog } from "@/components/quote-requests/add-quote-dialog"
import { DeleteQuoteRequestDialog } from "@/components/quote-requests/delete-quote-request-dialog"
import { ToastStack } from "@/components/quote-requests/toast-stack"

// The 8 rows and stat-card values below are exactly what the linked Figma
// frame (node 675:22480, "Quote request (Updated page)") showed for the
// "All" tab. The frame's tab counts (14/3/6/5) don't reconcile with those 8
// rows' statuses, and no "Draft" row was shown at all — so 2 draft rows were
// added here and every tab's count is computed live from this data instead
// of hardcoding the mismatched design numbers. This is a UX assumption, not
// something the design specified.
const INITIAL_REQUESTS = [
  {
    id: "QR-0000007",
    account: "Doe LLC",
    policyType: "General Liability",
    howQuoted: "Rater + Wholesale",
    quotes: 4,
    status: "quoted",
    updated: "4h ago",
    bestPremium: 3240,
  },
  {
    id: "QR-0000008",
    account: "Doe LLC",
    policyType: "Business Owners",
    howQuoted: "Rater",
    quotes: 3,
    status: "quoted",
    updated: "4h ago",
    bestPremium: 2180,
  },
  {
    id: "QR-0000205",
    account: "Northwind Logistics",
    policyType: "Aviation",
    howQuoted: "Wholesale",
    quotes: 3,
    status: "proposal-sent",
    updated: "12d ago",
    bestPremium: 18600,
  },
  {
    id: "QR-0000206",
    account: "Northwind Logistics",
    policyType: "Business Owners",
    howQuoted: "Rater",
    quotes: 2,
    status: "quoted",
    updated: "12d ago",
    bestPremium: 4410,
  },
  {
    id: "QR-0000188",
    account: "Cedar & Vine Hospitality",
    policyType: "Property",
    howQuoted: "Wholesale",
    quotes: 1,
    status: "info-needed",
    updated: "1d ago",
    bestPremium: 9120,
  },
  {
    id: "QR-0000189",
    account: "Cedar & Vine Hospitality",
    policyType: "General Liability",
    howQuoted: "Rater",
    quotes: 2,
    status: "quoted",
    updated: "1d ago",
    bestPremium: 2940,
  },
  {
    id: "QR-0000156",
    account: "Harbor Point Cafe",
    policyType: "Aviation",
    howQuoted: "Wholesale",
    quotes: null,
    status: "in-review",
    updated: "2d ago",
    bestPremium: null,
  },
  {
    id: "QR-0000142",
    account: "Sable Freight Co",
    policyType: "Commercial Auto",
    howQuoted: "Rater",
    quotes: 0,
    status: "declined",
    updated: "6d ago",
    bestPremium: null,
  },
  {
    id: "QR-0000210",
    account: "Meridian Autobody",
    policyType: "Garage Liability",
    howQuoted: null,
    quotes: null,
    status: "draft",
    updated: "3h ago",
    bestPremium: null,
  },
  {
    id: "QR-0000211",
    account: "Fenwick & Co",
    policyType: "Umbrella",
    howQuoted: null,
    quotes: null,
    status: "draft",
    updated: "1d ago",
    bestPremium: null,
  },
]

const TABS = [
  { key: "all", label: "All" },
  { key: "draft", label: "Draft" },
  { key: "in-market", label: "In market" },
  { key: "quoted", label: "Quoted" },
]

const STATUS_OPTIONS = Object.entries(STATUS_META).map(([value, meta]) => ({
  value,
  label: meta.label,
}))

function formatCurrency(value) {
  if (value == null) return "—"
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" })
}

function nextQuoteRequestId(requests) {
  const max = requests.reduce((acc, req) => {
    const n = Number(req.id.replace("QR-", ""))
    return Number.isFinite(n) ? Math.max(acc, n) : acc
  }, 0)
  return `QR-${String(max + 1).padStart(7, "0")}`
}

function QuoteRequestsPage({ onNavigate }) {
  const [requests, setRequests] = useState(INITIAL_REQUESTS)
  const [activeTab, setActiveTab] = useState("all")
  const [search, setSearch] = useState("")
  const [statusFilters, setStatusFilters] = useState([])
  const [sortAsc, setSortAsc] = useState(true)

  const [flowOpen, setFlowOpen] = useState(false)
  const [detailsRequest, setDetailsRequest] = useState(null)
  const [addQuoteRequest, setAddQuoteRequest] = useState(null)
  const [deleteRequest, setDeleteRequest] = useState(null)
  const [toasts, setToasts] = useState([])

  function pushToast(message, status = "success") {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, message, status }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 3200)
  }

  const counts = useMemo(() => {
    const base = { all: requests.length, draft: 0, "in-market": 0, quoted: 0 }
    for (const req of requests) {
      base[STATUS_META[req.status].category] += 1
    }
    return base
  }, [requests])

  const visibleRequests = useMemo(() => {
    let rows = requests
    if (activeTab !== "all") {
      rows = rows.filter((req) => STATUS_META[req.status].category === activeTab)
    }
    if (statusFilters.length > 0) {
      rows = rows.filter((req) => statusFilters.includes(req.status))
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      rows = rows.filter(
        (req) => req.account.toLowerCase().includes(q) || req.id.toLowerCase().includes(q)
      )
    }
    return [...rows].sort((a, b) =>
      sortAsc ? a.account.localeCompare(b.account) : b.account.localeCompare(a.account)
    )
  }, [requests, activeTab, statusFilters, search, sortAsc])

  function updateRequest(id, updates) {
    setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, ...updates } : req)))
  }

  function handleCreateRequests(rows) {
    const startingMax = requests.reduce((acc, req) => {
      const n = Number(req.id.replace("QR-", ""))
      return Number.isFinite(n) ? Math.max(acc, n) : acc
    }, 0)
    const created = rows.map((row, index) => ({
      ...row,
      id: `QR-${String(startingMax + index + 1).padStart(7, "0")}`,
    }))
    setRequests((prev) => [...created, ...prev])
    pushToast(
      `${created.length} quote request${created.length === 1 ? "" : "s"} created for ${created[0]?.account}.`
    )
    return created.map((request) => request.id)
  }

  function handleProposalSent(requestIds) {
    setRequests((prev) =>
      prev.map((req) =>
        requestIds.includes(req.id) ? { ...req, status: "proposal-sent", updated: "Just now" } : req
      )
    )
    pushToast("Proposal sent.")
  }

  function handleRequote(request) {
    updateRequest(request.id, { status: "in-review", updated: "Just now" })
    pushToast(`Requoting ${request.account} · ${request.policyType}.`)
  }

  function handleCreateProposal(request) {
    updateRequest(request.id, { status: "proposal-sent", updated: "Just now" })
    pushToast(`Proposal created for ${request.account}.`)
  }

  function handleAddQuote(value) {
    const request = addQuoteRequest
    updateRequest(request.id, {
      quotes: (request.quotes ?? 0) + 1,
      bestPremium:
        request.bestPremium == null ? value : Math.min(request.bestPremium, value),
      status: request.status === "draft" || request.status === "in-review" ? "quoted" : request.status,
      updated: "Just now",
    })
    setAddQuoteRequest(null)
    pushToast(`Quote of ${formatCurrency(value)} added to ${request.account}.`)
  }

  function handleDuplicate(request) {
    const duplicate = {
      ...request,
      id: nextQuoteRequestId(requests),
      status: "draft",
      howQuoted: null,
      quotes: null,
      bestPremium: null,
      updated: "Just now",
    }
    setRequests((prev) => {
      const index = prev.findIndex((req) => req.id === request.id)
      const next = [...prev]
      next.splice(index + 1, 0, duplicate)
      return next
    })
    pushToast(`Duplicated ${request.id} as ${duplicate.id}.`)
  }

  function handleDeleteConfirm() {
    setRequests((prev) => prev.filter((req) => req.id !== deleteRequest.id))
    pushToast(`${deleteRequest.account} · ${deleteRequest.id} deleted.`, "error")
    setDeleteRequest(null)
  }

  function toggleStatusFilter(value) {
    setStatusFilters((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  if (flowOpen) {
    return (
      <NewQuoteFlowShell
        onCreateRequests={handleCreateRequests}
        onProposalSent={handleProposalSent}
        onExit={() => setFlowOpen(false)}
        onNavigate={onNavigate}
      />
    )
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AppSidebar activeItem="request-quote" onNavigate={onNavigate} />
      <div className="flex h-full flex-1 flex-col items-center overflow-hidden bg-surface-subtle">
        <AppHeader title="Quote Requests" />

        <div className="flex w-full flex-1 flex-col items-center overflow-y-auto px-9 py-6">
          <div className="flex w-full max-w-[1200px] flex-col gap-6">
            <div className="flex w-full items-stretch gap-4">
              <StatCard
                label="Active quote requests"
                value={counts["in-market"] + counts.quoted}
                meta={`· across ${new Set(requests.map((r) => r.account)).size} accounts`}
              />
              <StatCard
                label="Info needed"
                value={requests.filter((r) => r.status === "info-needed").length}
                meta="· UW awaiting your reply"
              />
              <StatCard label="Awaiting bind" value={0} />
              <StatCard
                label="Bound premium · September 2026"
                value={formatCurrency(0)}
              />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full gap-0">
              <TabsList
                variant="line"
                className="h-auto w-full justify-start gap-6 rounded-none border-b border-border-default bg-transparent p-0"
              >
                {TABS.map((tab) => (
                  <TabsTrigger
                    key={tab.key}
                    value={tab.key}
                    className="h-auto flex-none gap-2 rounded-none border-none bg-transparent px-0 pb-3 text-base font-medium text-text-secondary shadow-none after:-bottom-px after:h-0.5 after:bg-primary-solid data-active:bg-transparent data-active:text-text-primary data-active:shadow-none"
                  >
                    {tab.label}
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs",
                        activeTab === tab.key
                          ? "bg-primary-bg text-primary-text"
                          : "bg-surface-highlight text-text-tertiary"
                      )}
                    >
                      {counts[tab.key]}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="flex w-full items-center gap-4">
              <Button
                type="button"
                shape="circular"
                size="lg"
                onClick={() => setFlowOpen(true)}
              >
                <Plus className="size-5" />
                New Quote Request
              </Button>

              <div className="flex-1" />

              <div className="relative w-[420px] shrink-0">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-text-tertiary" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by account name or quote request number"
                  size="sm"
                  className="h-11 rounded-full pl-10"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    shape="rounded"
                    className={cn(
                      "relative border-primary-border",
                      statusFilters.length > 0 && "bg-primary-bg"
                    )}
                    aria-label="Filters"
                  >
                    <SlidersHorizontal className="size-5" />
                    {statusFilters.length > 0 ? (
                      <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary-solid" />
                    ) : null}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {STATUS_OPTIONS.map((option) => (
                    <DropdownMenuCheckboxItem
                      key={option.value}
                      checked={statusFilters.includes(option.value)}
                      onCheckedChange={() => toggleStatusFilter(option.value)}
                      onSelect={(event) => event.preventDefault()}
                    >
                      {option.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                  {statusFilters.length > 0 ? (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={() => setStatusFilters([])}>
                        Clear filters
                      </DropdownMenuItem>
                    </>
                  ) : null}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="w-full overflow-hidden rounded-2xl bg-surface-base shadow-[0px_0px_0px_1px_var(--color-black-alpha-12),0px_1px_2px_-1px_var(--color-black-alpha-16),0px_2px_10px_-1px_var(--color-black-alpha-8)]">
              <Table>
                <TableHeader>
                  <TableRow className="border-none bg-surface-highlight hover:bg-surface-highlight">
                    <TableHead className="h-[50px] px-4 text-[13px] leading-[18px] font-normal text-text-secondary">
                      <button
                        type="button"
                        onClick={() => setSortAsc((prev) => !prev)}
                        className="flex items-center gap-1.5"
                      >
                        Quote request
                        <ArrowUpDown className="size-4" />
                      </button>
                    </TableHead>
                    <TableHead className="px-4 text-[13px] leading-[18px] font-normal text-text-secondary">
                      Policy type
                    </TableHead>
                    <TableHead className="px-4 text-[13px] leading-[18px] font-normal text-text-secondary">
                      How quoted
                    </TableHead>
                    <TableHead className="px-4 text-[13px] leading-[18px] font-normal text-text-secondary">
                      Quotes
                    </TableHead>
                    <TableHead className="px-4 text-[13px] leading-[18px] font-normal text-text-secondary">
                      Status
                    </TableHead>
                    <TableHead className="px-4 text-[13px] leading-[18px] font-normal text-text-secondary">
                      Updated
                    </TableHead>
                    <TableHead className="px-4 text-[13px] leading-[18px] font-normal text-text-secondary">
                      Best premium
                    </TableHead>
                    <TableHead className="px-4 text-[13px] leading-[18px] font-normal text-text-secondary">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visibleRequests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-32 whitespace-normal p-4 text-center text-sm text-text-tertiary">
                        No quote requests match your search and filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    visibleRequests.map((request) => (
                      <TableRow key={request.id} className="h-[68px] border-border-default">
                        <TableCell className="px-4 py-0 whitespace-normal">
                          <div className="flex flex-col gap-0.5">
                            <p className="text-sm font-medium text-text-primary">{request.account}</p>
                            <p className="text-xs text-text-tertiary">{request.id}</p>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 text-sm text-text-primary">
                          {request.policyType}
                        </TableCell>
                        <TableCell className="px-4">
                          {request.howQuoted ? (
                            <Badge status="general" size="sm" className="border-transparent bg-surface-highlight">
                              {request.howQuoted}
                            </Badge>
                          ) : (
                            <span className="text-sm text-text-tertiary">—</span>
                          )}
                        </TableCell>
                        <TableCell className="px-4 text-sm text-text-primary">
                          {request.quotes ?? "—"}
                        </TableCell>
                        <TableCell className="px-4">
                          <StatusBadge status={request.status} />
                        </TableCell>
                        <TableCell className="px-4 text-sm text-text-secondary">
                          {request.updated}
                        </TableCell>
                        <TableCell
                          className={cn(
                            "px-4 text-sm font-medium",
                            request.bestPremium != null ? "text-success-text" : "text-text-secondary"
                          )}
                        >
                          {formatCurrency(request.bestPremium)}
                        </TableCell>
                        <TableCell className="px-4">
                          <RowActionsMenu
                            onViewDetails={() => setDetailsRequest(request)}
                            onRequote={() => handleRequote(request)}
                            onCreateProposal={() => handleCreateProposal(request)}
                            onAddQuoteManually={() => setAddQuoteRequest(request)}
                            onDuplicate={() => handleDuplicate(request)}
                            onDelete={() => setDeleteRequest(request)}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      <QuoteRequestDetailsDialog
        open={detailsRequest != null}
        onOpenChange={(open) => !open && setDetailsRequest(null)}
        request={detailsRequest}
      />
      <AddQuoteDialog
        open={addQuoteRequest != null}
        onOpenChange={(open) => !open && setAddQuoteRequest(null)}
        request={addQuoteRequest}
        onAdd={handleAddQuote}
      />
      <DeleteQuoteRequestDialog
        open={deleteRequest != null}
        onOpenChange={(open) => !open && setDeleteRequest(null)}
        request={deleteRequest}
        onConfirm={handleDeleteConfirm}
      />
      <ToastStack toasts={toasts} />
    </div>
  )
}

export { QuoteRequestsPage }
