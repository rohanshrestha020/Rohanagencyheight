import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { MarketCard } from "@/components/markets/market-card"
import carrierBlitz from "@/assets/dashboard/carrier-blitz.png"
import carrierCoterie from "@/assets/dashboard/carrier-coterie.png"
import carrierCovertree from "@/assets/dashboard/carrier-covertree.png"

// Carrier copy, paper, state counts and commission figures are taken from the
// Figma Markets frame (node 4:30354). This is a preview grid for the DES-1
// card redesign only — the full Markets page (tabs, category pills, shelves)
// isn't built yet.
const MARKETS = [
  {
    name: "LIO Insurance",
    hook: "Packages for nonprofits, gyms, community associations and events",
    isNew: true,
    paper: "Admitted",
    stateMatch: "All 4 of your states",
    licensedIn: "All 50 states",
    commission: { newBusiness: "15%", renewal: "15%" },
    access: "instant",
    caption: "Sub-code appointment · no paperwork, ~2 minutes",
  },
  {
    name: "Ategrity",
    hook: "E&S commercial property, vacant, packages, excess and professional",
    isNew: true,
    amRating: "A-",
    paper: "Non-admitted",
    stateMatch: "All 4 of your states",
    licensedIn: "48 states",
    commission: { newBusiness: "17.5%", renewal: "17.5%" },
    access: "wholesale",
    caption: "No appointment needed — goes through the AH wholesale desk",
  },
  {
    name: "Coterie",
    logo: carrierCoterie,
    hook: "Bind small business in minutes — BOP, GL, cyber and professional",
    amRating: "A-",
    paper: "Admitted",
    stateMatch: "All 4 of your states",
    licensedIn: "All 50 states",
    access: "instant",
    caption: "Sub-code appointment · no paperwork, ~2 minutes",
  },
  {
    name: "Alchemy Insurance Solutions",
    hook: "Builders risk and artisan GL — admitted paper, all 50 states",
    paper: "Admitted + E&S",
    stateMatch: "All 4 of your states",
    licensedIn: "All 50 states",
    access: "appointment",
    caption: "Typically approved in 1–2 business days",
  },
  {
    name: "Blitz Insurance",
    logo: carrierBlitz,
    hook: "Cannabis, contractors, vacant property, LROs and special events",
    paper: "Non-admitted",
    stateMatch: "All 4 of your states",
    licensedIn: "47 states",
    access: "instant",
    caption: "Sub-code appointment · no paperwork, ~2 minutes",
  },
  {
    name: "CoverTree",
    logo: carrierCovertree,
    hook: "Manufactured and mobile homes, landlord and vacant dwellings",
    paper: "Admitted",
    stateMatch: "3 of your 4 states",
    licensedIn: "38 states",
    commission: { newBusiness: "15%", renewal: "12%" },
    access: "appointment",
    caption: "Typically approved in 1–2 business days",
  },
]

function MarketsPage({ onNavigate }) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AppSidebar activeItem="markets" onNavigate={onNavigate} />
      <div className="flex h-full flex-1 flex-col items-center overflow-hidden bg-surface-subtle">
        <AppHeader title="Markets" />

        <div className="flex w-full flex-1 flex-col items-center overflow-y-auto px-4 py-6 sm:px-9">
          <div className="flex w-full max-w-[1200px] flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl leading-7 font-semibold text-text-primary">
                Available markets
              </h1>
              <p className="text-sm leading-5 text-text-secondary">
                Carriers you can write in your licensed states, and how to get access.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(256px,1fr))] gap-4">
              {MARKETS.map((market) => (
                <MarketCard key={market.name} {...market} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { MarketsPage }
