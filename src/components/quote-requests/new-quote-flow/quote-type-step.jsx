import { Upload } from "lucide-react"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  COVERAGE_CATALOG,
  CARRIERS_BY_COVERAGE,
} from "@/components/quote-requests/new-quote-flow/constants"

const CARRIER_COLORS = ["bg-brand-solid", "bg-info-solid", "bg-warning-solid", "bg-success-solid"]

function CarrierMark({ name, index }) {
  return (
    <span
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white",
        CARRIER_COLORS[index % CARRIER_COLORS.length]
      )}
    >
      {name.charAt(0)}
    </span>
  )
}

function QuoteTypeStep({ coverageKeys, carrierSelections, onToggleCarrier, documents, onToggleDocument }) {
  return (
    <div className="mx-auto flex w-full max-w-[720px] flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-text-primary">Quote with the rater</h1>
        <p className="text-sm text-text-secondary">
          {coverageKeys.length} coverage{coverageKeys.length === 1 ? "" : "s"} selected · bindable
          quotes back in minutes
        </p>
      </div>

      {coverageKeys.map((key) => {
        const coverage = COVERAGE_CATALOG.find((c) => c.key === key)
        const carriers = CARRIERS_BY_COVERAGE[key] ?? []
        const selected = carrierSelections[key] ?? []
        return (
          <div key={key} className="flex flex-col gap-2">
            <h2 className="text-base font-semibold text-text-primary">{coverage.label}</h2>
            <div className="overflow-hidden rounded-md border border-border-default">
              <div className="flex items-center gap-3 border-b border-border-default bg-surface-highlight px-4 py-2 text-xs text-text-secondary">
                <span className="w-6" />
                <span className="flex-1">Carrier</span>
                <span className="w-32">Type</span>
                <span className="w-24 text-right">Commission</span>
              </div>
              {carriers.map((carrier, index) => (
                <label
                  key={carrier.id}
                  className="flex cursor-pointer items-center gap-3 border-b border-border-default px-4 py-2.5 last:border-b-0 hover:bg-surface-highlight"
                >
                  <Checkbox
                    checked={selected.includes(carrier.id)}
                    onCheckedChange={() => onToggleCarrier(key, carrier.id)}
                  />
                  <CarrierMark name={carrier.name} index={index} />
                  <span className="flex-1 text-sm text-text-primary">{carrier.name}</span>
                  <span className="w-32 text-sm text-text-secondary">{carrier.type}</span>
                  <span className="w-24 text-right text-sm text-text-secondary">{carrier.commission}</span>
                </label>
              ))}
            </div>
          </div>
        )
      })}

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-text-primary">Required documents</h2>
          <Badge status="general" size="sm">
            {documents.filter((d) => d.status === "uploaded").length} of {documents.length}
          </Badge>
        </div>
        <div className="flex flex-col gap-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between gap-3 rounded-md border border-border-default bg-surface-base px-4 py-3"
            >
              <div className="flex flex-col">
                <p className="text-sm font-medium text-text-primary">{doc.name}</p>
                {doc.status === "uploaded" ? (
                  <p className="text-xs text-text-tertiary">{doc.fileName} · uploaded just now</p>
                ) : null}
              </div>
              <div className="flex shrink-0 items-center gap-3">
                {doc.status === "uploaded" ? <Badge status="success" size="sm">Uploaded</Badge> : null}
                <Button type="button" variant="secondary" size="sm" onClick={() => onToggleDocument(doc.id)}>
                  <Upload className="size-4" />
                  {doc.status === "uploaded" ? "Replace" : "Upload"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { QuoteTypeStep }
