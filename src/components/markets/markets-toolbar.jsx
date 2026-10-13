import { Filter, Plus, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { COVERAGE_OPTIONS, INDUSTRY_OPTIONS, YOUR_STATES } from "@/components/markets/markets-data"
import { ALL, countAdvanced } from "@/components/markets/markets-filters"

const FILTER_GROUPS = [
  {
    key: "access",
    label: "How you get access",
    options: [
      { value: "instant", label: "Instant access" },
      { value: "wholesale", label: "Wholesale desk" },
      { value: "appointment", label: "Appointment" },
    ],
  },
  {
    key: "paper",
    label: "Paper",
    options: [
      { value: "Admitted", label: "Admitted" },
      { value: "Non-admitted", label: "Non-admitted" },
      { value: "E&S", label: "E&S" },
    ],
  },
]

// Borderless trigger so the selects sit flush inside the pill search bar.
const INLINE_TRIGGER =
  "h-12 rounded-none border-0 bg-transparent px-4 text-base font-medium hover:border-0 data-placeholder:text-text-primary focus-visible:rounded-md"

function InlineSelect({ value, onValueChange, placeholder, allLabel, options, className }) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger size="sm" className={cn(INLINE_TRIGGER, className)} aria-label={placeholder}>
        <SelectValue placeholder={placeholder}>{value === ALL ? placeholder : undefined}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>{allLabel}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function FilterPopover({ filters, onChange }) {
  const active = countAdvanced(filters)

  function toggle(key, value) {
    const current = filters[key]
    onChange({
      ...filters,
      [key]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="text" className="h-12 px-4 text-base text-text-primary">
          <Filter className="size-5" />
          Filter
          {active ? (
            <span className="rounded-full bg-primary-solid px-1.5 text-xs leading-5 text-primary-contrast">
              {active}
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="flex w-72 flex-col gap-4">
        {FILTER_GROUPS.map((group) => (
          <fieldset key={group.key} className="flex flex-col gap-2">
            <legend className="mb-2 text-xs leading-4 font-medium text-text-secondary">{group.label}</legend>
            {group.options.map((option) => {
              const id = `filter-${group.key}-${option.value}`
              return (
                <div key={option.value} className="flex items-center gap-2">
                  <Checkbox
                    id={id}
                    checked={filters[group.key].includes(option.value)}
                    onCheckedChange={() => toggle(group.key, option.value)}
                  />
                  <Label htmlFor={id} className="font-normal">
                    {option.label}
                  </Label>
                </div>
              )
            })}
          </fieldset>
        ))}
        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 text-xs leading-4 font-medium text-text-secondary">More</legend>
          <div className="flex items-center gap-2">
            <Checkbox
              id="filter-new"
              checked={filters.newOnly}
              onCheckedChange={(checked) => onChange({ ...filters, newOnly: checked === true })}
            />
            <Label htmlFor="filter-new" className="font-normal">
              New this month
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="filter-commission"
              checked={filters.commissionOnly}
              onCheckedChange={(checked) => onChange({ ...filters, commissionOnly: checked === true })}
            />
            <Label htmlFor="filter-commission" className="font-normal">
              Published commission
            </Label>
          </div>
        </fieldset>
        <Button
          variant="text"
          size="sm"
          className="self-start"
          disabled={!active}
          onClick={() => onChange({ ...filters, access: [], paper: [], newOnly: false, commissionOnly: false })}
        >
          Clear filters
        </Button>
      </PopoverContent>
    </Popover>
  )
}

function MarketsToolbar({
  summary,
  myStatesOnly,
  onMyStatesOnlyChange,
  onRequestCarrier,
  filters,
  onFiltersChange,
  onFindAppetite,
}) {
  return (
    <div className="flex flex-col gap-8 bg-primary-bg px-4 py-8 sm:px-9">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl leading-7 font-semibold text-primary-text">Find the Right Market and Quote</h1>
            <p className="text-sm leading-5 text-text-secondary">{summary}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex h-10 cursor-pointer items-center gap-2 rounded-full bg-surface-base px-4 text-sm leading-5 font-medium text-text-primary">
              <Switch checked={myStatesOnly} onCheckedChange={onMyStatesOnlyChange} />
              My states only
            </label>
            <Button variant="secondary" shape="circular" className="border-transparent" onClick={onRequestCarrier}>
              <Plus />
              Request a carrier
            </Button>
          </div>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault()
            onFindAppetite()
          }}
          className="flex flex-col gap-2 rounded-3xl border border-brand-border bg-surface-base p-2 shadow-[0_2px_10px_-1px_var(--color-black-alpha-8)] lg:flex-row lg:items-center lg:gap-0 lg:rounded-full"
        >
          <div className="flex flex-1 items-center gap-2 pl-4 lg:border-r lg:border-border-default">
            <Search className="size-5 shrink-0 text-text-tertiary" />
            <input
              type="search"
              value={filters.query}
              onChange={(event) => onFiltersChange({ ...filters, query: event.target.value })}
              placeholder="Search by carrier name, LOB or keywords"
              aria-label="Search markets"
              className="h-12 w-full min-w-0 bg-transparent text-base font-medium text-text-primary outline-none placeholder:text-text-primary"
            />
          </div>
          <div className="grid grid-cols-3 lg:flex lg:items-center">
            <InlineSelect
              value={filters.state}
              onValueChange={(state) => onFiltersChange({ ...filters, state })}
              placeholder="State"
              allLabel="All your states"
              options={YOUR_STATES.map((state) => ({ value: state, label: state }))}
              className="lg:w-32 lg:border-r lg:border-border-default"
            />
            <InlineSelect
              value={filters.coverage}
              onValueChange={(coverage) => onFiltersChange({ ...filters, coverage })}
              placeholder="Coverage"
              allLabel="All coverages"
              options={COVERAGE_OPTIONS}
              className="lg:w-36 lg:border-r lg:border-border-default"
            />
            <InlineSelect
              value={filters.industry}
              onValueChange={(industry) => onFiltersChange({ ...filters, industry })}
              placeholder="Industry"
              allLabel="All industries"
              options={INDUSTRY_OPTIONS}
              className="lg:w-36 lg:border-r lg:border-border-default"
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <FilterPopover filters={filters} onChange={onFiltersChange} />
            <Button type="submit" size="xl" shape="circular" className="px-6">
              Find Appetite
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export { MarketsToolbar }
