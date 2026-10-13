import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import carrierCovertree from "@/assets/onboarding/carrier-covertree.png"
import carrierBlitz from "@/assets/onboarding/carrier-blitz.png"
import carrierCoterie from "@/assets/onboarding/carrier-coterie.png"

// The "+3" tag's background (#bee6fa, Figma's own "Glacier" color style) has
// no matching primitive or semantic token anywhere in this project's palette
// — used here as a literal arbitrary value rather than inventing a new token.
const GLACIER_BG = "#bee6fa"

const MARKETS = [
  {
    logo: carrierCovertree,
    name: "Covertree Insurance",
    readyIn: "Ready in TX, OK, NM",
    caption: "Admitted, Non-Admitted",
  },
  {
    logo: carrierBlitz,
    name: "Blitz Insurance",
    readyIn: "Ready in TX, AZ",
    caption: "Admitted, Non-Admitted",
  },
  {
    logo: carrierCoterie,
    name: "Coterie Insurance",
    caption: "Commercial Business",
  },
  {
    logo: carrierCovertree,
    name: "Covertree Insurance",
    readyIn: "Ready in NM, AZ",
    caption: "Admitted, Non-Admitted",
  },
  {
    logo: carrierBlitz,
    name: "Blitz Insurance",
    readyIn: "Ready in TX, OK, NM",
    caption: "Admitted, Non-Admitted",
  },
  {
    logo: carrierCoterie,
    name: "Coterie Insurance",
    caption: "Commercial Business",
  },
]

function MatchedMarketsModal({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[720px] sm:max-w-[720px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle>All markets your licences match</DialogTitle>
            <Badge status="general">View only</Badge>
          </div>
          <p className="text-sm leading-5 text-text-secondary">
            41 markets · Get direct appointment or submit through our wholesale
          </p>
        </DialogHeader>

        <div className="grid max-h-[420px] grid-cols-2 gap-3 overflow-y-auto">
          {MARKETS.map((market, i) => (
            <div key={i} className="flex flex-col gap-3 rounded-md bg-surface-subtle px-5 py-4">
              <img src={market.logo} alt="" className="h-8 w-auto object-contain object-left" />
              <div className="flex flex-col gap-0.5">
                <p className="text-sm leading-5 font-medium text-text-primary">{market.name}</p>
                {market.readyIn ? (
                  <p className="text-[13px] leading-[18px] text-text-secondary">
                    {market.readyIn}
                  </p>
                ) : null}
                <p className="text-xs leading-4 text-text-secondary">{market.caption}</p>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="rounded-full bg-neutral-4 px-2 py-0.5 text-xs text-text-primary">
                  high-wind
                </span>
                <span className="rounded-full bg-neutral-4 px-2 py-0.5 text-xs text-text-primary">
                  no-prior-claims
                </span>
                <span
                  className="rounded-full px-2 py-0.5 text-xs text-text-primary"
                  style={{ backgroundColor: GLACIER_BG }}
                >
                  +3
                </span>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="bg-surface-subtle sm:justify-between sm:items-center">
          <p className="text-[13px] leading-[18px] text-text-secondary">
            You can request quotes and appointments from Markets once you finish setup.
          </p>
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { MatchedMarketsModal }
