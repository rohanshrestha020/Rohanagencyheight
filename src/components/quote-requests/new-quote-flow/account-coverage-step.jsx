import { useState } from "react"
import { ChevronDown, Search, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ACCOUNTS_DIRECTORY, COVERAGE_CATALOG } from "@/components/quote-requests/new-quote-flow/constants"

function AccountCoverageStep({ account, onAccountChange, coverageKeys, onCoverageKeysChange }) {
  const [accountQuery, setAccountQuery] = useState("")
  const [accountPickerOpen, setAccountPickerOpen] = useState(false)
  const [coverageQuery, setCoverageQuery] = useState("")
  const [coverageListExpanded, setCoverageListExpanded] = useState(true)

  const filteredAccounts = ACCOUNTS_DIRECTORY.filter((a) =>
    a.name.toLowerCase().includes(accountQuery.toLowerCase())
  )

  const filteredCoverages = COVERAGE_CATALOG.filter((c) =>
    c.label.toLowerCase().includes(coverageQuery.toLowerCase())
  )

  function toggleCoverage(key) {
    onCoverageKeysChange(
      coverageKeys.includes(key) ? coverageKeys.filter((k) => k !== key) : [...coverageKeys, key]
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-text-primary">New Quote Request</h1>
        <p className="text-sm text-text-secondary">
          Search for an existing commercial account, or create a new one, to start this quote
          request.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Popover open={accountPickerOpen} onOpenChange={setAccountPickerOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex h-14 w-full items-center justify-between rounded-md border border-border-default bg-surface-base px-3 text-left text-sm text-text-primary hover:border-border-hover"
            >
              <span className={account ? "text-text-primary" : "text-text-tertiary"}>
                {account ? `${account.name} — Commercial` : "Search or add an account"}
              </span>
              <ChevronDown className="size-4 text-text-tertiary" />
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-(--radix-popover-trigger-width) p-0">
            <div className="flex items-center gap-2 border-b border-border-default px-3 py-2">
              <Search className="size-4 text-text-tertiary" />
              <input
                autoFocus
                value={accountQuery}
                onChange={(event) => setAccountQuery(event.target.value)}
                placeholder="Search accounts…"
                className="h-8 w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-tertiary"
              />
            </div>
            <div className="max-h-64 overflow-y-auto p-1 scrollbar-thin">
              {filteredAccounts.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => {
                    onAccountChange(a)
                    setAccountPickerOpen(false)
                    setAccountQuery("")
                  }}
                  className="flex w-full flex-col items-start gap-0.5 rounded-md px-2 py-2 text-left hover:bg-surface-highlight"
                >
                  <span className="text-sm font-medium text-text-primary">{a.name}</span>
                  <span className="text-xs text-text-tertiary">{a.email}</span>
                </button>
              ))}
              {filteredAccounts.length === 0 ? (
                <p className="px-2 py-3 text-sm text-text-tertiary">No accounts match "{accountQuery}".</p>
              ) : null}
            </div>
          </PopoverContent>
        </Popover>

        {account ? (
          <div className="flex items-center justify-between gap-3 rounded-md border border-border-default bg-surface-base p-4">
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarFallback>{account.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-text-primary">{account.name}</p>
                <p className="text-xs text-text-tertiary">
                  {account.phone} · {account.email}
                </p>
                <p className="text-xs text-text-tertiary">{account.address}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAccountPickerOpen(true)}
              className="shrink-0 text-sm font-medium text-primary-text hover:underline"
            >
              Change
            </button>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-text-primary">Coverages</h2>
          <p className="text-sm text-text-secondary">
            Pick every coverage this account needs. Coverages our rater supports come back in
            minutes; everything else goes to the wholesale desk — you do not choose the route, the
            coverage does.
          </p>
        </div>

        {coverageKeys.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2">
            {coverageKeys.map((key) => {
              const coverage = COVERAGE_CATALOG.find((c) => c.key === key)
              return (
                <span
                  key={key}
                  className="flex items-center gap-1.5 rounded-full border border-border-default bg-surface-highlight py-1 pr-2 pl-3 text-sm text-text-primary"
                >
                  <coverage.icon className="size-4 text-text-tertiary" />
                  {coverage.label}
                  <span className="text-xs text-text-tertiary">· {coverage.route}</span>
                  <button type="button" onClick={() => toggleCoverage(key)} aria-label={`Remove ${coverage.label}`}>
                    <X className="size-3.5 text-text-tertiary hover:text-text-primary" />
                  </button>
                </span>
              )
            })}
            <button
              type="button"
              onClick={() => setCoverageListExpanded((prev) => !prev)}
              aria-label={coverageListExpanded ? "Collapse coverage list" : "Expand coverage list"}
              className="flex size-6 shrink-0 items-center justify-center rounded-full text-text-tertiary hover:bg-surface-highlight hover:text-text-primary"
            >
              <ChevronDown className={cn("size-4 transition-transform", coverageListExpanded && "rotate-180")} />
            </button>
          </div>
        ) : null}

        {coverageListExpanded ? (
          <div className="rounded-md border border-border-default bg-surface-base">
            <div className="flex items-center gap-2 border-b border-border-default px-3 py-2">
              <Search className="size-4 text-text-tertiary" />
              <input
                value={coverageQuery}
                onChange={(event) => setCoverageQuery(event.target.value)}
                placeholder="Search coverages…"
                className="h-8 w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-tertiary"
              />
            </div>
            <div className="max-h-72 overflow-y-auto p-1 scrollbar-thin">
              {filteredCoverages.map((coverage) => {
                const checked = coverageKeys.includes(coverage.key)
                return (
                  <label
                    key={coverage.key}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-md px-2 py-2 hover:bg-surface-highlight"
                  >
                    <Checkbox checked={checked} onCheckedChange={() => toggleCoverage(coverage.key)} />
                    <coverage.icon className="size-4 text-text-tertiary" />
                    <span className="flex-1 text-sm text-text-primary">{coverage.label}</span>
                    <span className="text-xs text-text-tertiary">{coverage.route}</span>
                  </label>
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export { AccountCoverageStep }
