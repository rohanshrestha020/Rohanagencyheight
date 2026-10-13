// Carrier copy, paper, state coverage, commissions, CTAs, AM ratings and the
// "new this month" flags below were extracted from the Figma Markets frame
// (node 4:30354). Section membership is expressed as rules over this data
// instead of hand-copied lists, so pill counts stay in sync with what's shown.

const logoModules = import.meta.glob("../../assets/markets/*.png", {
  eager: true,
  import: "default",
})

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function logoFor(name) {
  return logoModules[`../../assets/markets/${slugify(name)}.png`]
}

const YOUR_STATES = ["TX", "AZ", "OH", "FL"]

const ACCESS_COPY = {
  instant: "Sub-code appointment · no paperwork, ~2 minutes",
  wholesale: "No appointment needed — goes through the AH wholesale desk",
  appointment: "Typically approved in 1–2 business days",
}

// categories: commercial | landlord | personal | specialty | life | ancillary
const CARRIERS = [
  { name: "LIO Insurance", hook: "Packages for nonprofits, gyms, community associations and events", paper: "Admitted", stateMatch: "All 4 of your states", licensedIn: "All 50 states", commission: { newBusiness: "15%", renewal: "15%" }, access: "instant", isNew: true, categories: ["commercial"], inRater: true },
  { name: "Neptune Flood", hook: "Primary and excess flood nationwide, plus CA earthquake — 2-min quote", paper: "Non-admitted", stateMatch: "All 4 of your states", licensedIn: "All 50 states", commission: { newBusiness: "12%", renewal: "12%" }, access: "instant", isNew: true, categories: ["specialty"], inRater: true },
  { name: "Norman Max", hook: "Parametric coverage — no deductible, fast payout, commercial and residential", paper: "Non-admitted", stateMatch: "All 4 of your states", licensedIn: "All 50 states", commission: { newBusiness: "15%", renewal: "15%" }, access: "instant", categories: ["commercial", "specialty"], inRater: true },
  { name: "Foxquilt", hook: "GL for artisan trades, personal services and e-commerce sellers — E&O Sept 1", paper: "Admitted", stateMatch: "All 4 of your states", licensedIn: "41 states", access: "instant", isNew: true, categories: ["commercial"], inRater: true },
  { name: "Coterie", hook: "Bind small business in minutes — BOP, GL, cyber and professional", paper: "Admitted", stateMatch: "All 4 of your states", licensedIn: "All 50 states", access: "instant", amRating: "A-", categories: ["commercial"], inRater: true },
  { name: "Blitz Insurance", hook: "Cannabis, contractors, vacant property, LROs and special events", paper: "Non-admitted", stateMatch: "All 4 of your states", licensedIn: "47 states", access: "instant", categories: ["commercial", "landlord"] },
  { name: "Annex Risk", hook: "Cat-exposed homeowners, $2M+ high value homes and private flood", paper: "E&S", stateMatch: "All 4 of your states", licensedIn: "16 states", access: "instant", categories: ["landlord", "personal", "specialty"], inRater: true },
  { name: "Ategrity", hook: "E&S commercial property, vacant, packages, excess and professional", paper: "Non-admitted", stateMatch: "All 4 of your states", licensedIn: "48 states", commission: { newBusiness: "17.5%", renewal: "17.5%" }, access: "wholesale", isNew: true, amRating: "A-", categories: ["commercial", "landlord"], inRater: true },
  { name: "Alchemy Insurance Solutions", hook: "Builders risk and artisan GL — admitted paper, all 50 states", paper: "Admitted + E&S", stateMatch: "All 4 of your states", licensedIn: "All 50 states", access: "appointment", categories: ["commercial"] },
  { name: "Normandy Insurance", hook: "Workers comp plus coastal property, EPLI and cyber in the Southeast", paper: "Admitted", stateMatch: "All 4 of your states", licensedIn: "4 states", access: "appointment", categories: ["commercial"] },
  { name: "Obie", hook: "Dwelling fire for landlords and rental portfolios — quote in minutes", paper: "Non-admitted", stateMatch: "All 4 of your states", licensedIn: "47 states", commission: { newBusiness: "13%", renewal: "13%" }, access: "appointment", categories: ["landlord"], inRater: true },
  { name: "CoverTree", hook: "Manufactured and mobile home program — admitted, digital-first", paper: "Admitted", stateMatch: "3 of your 4 states", licensedIn: "16 states", access: "instant", categories: ["landlord", "personal"], inRater: true },
  { name: "OpenRoad", hook: "Collector and classic vehicle insurance — admitted paper", paper: "Admitted", stateMatch: "3 of your 4 states", licensedIn: "35 states", access: "appointment", categories: ["personal", "specialty"] },
  { name: "Kemper", hook: "Personal auto with strength in specialty and nonstandard risks", paper: "Admitted", stateMatch: "Varies by product", licensedIn: "By product", access: "appointment", amRating: "A-", categories: ["personal"] },
  { name: "Commonwealth Casualty", hook: "Personal auto, home and renters — TX, AZ and OH", paper: "Admitted", stateMatch: "1 of your 4 states", licensedIn: "3 states", access: "instant", categories: ["personal"] },
  { name: "BriteCo", hook: "Jewelry and watch insurance — instant digital quotes at point of sale", paper: "Admitted", stateMatch: "All 4 of your states", licensedIn: "All 50 states", access: "instant", categories: ["specialty"] },
  { name: "WAX Insurance", hook: "Luxury assets and collectibles — watches, cards, art, wine, sneakers", paper: "Admitted + E&S", stateMatch: "All 4 of your states", licensedIn: "All 50 states", access: "appointment", categories: ["specialty"] },
  { name: "Prime Insurance", hook: "E&S for the truly hard-to-place — declined, cancelled and distressed risks", paper: "E&S", stateMatch: "All 4 of your states", licensedIn: "All 50 states", access: "appointment", amRating: "A", categories: ["commercial", "specialty"] },
  { name: "Great American", hook: "Specialty commercial across 100+ niche programs", paper: "Admitted + E&S", stateMatch: "Varies by product", licensedIn: "By product", access: "appointment", amRating: "A+", categories: ["commercial", "specialty"] },
  { name: "Omaha National", hook: "Workers comp for blue-collar risks — construction, transport, healthcare", paper: "Non-admitted", stateMatch: "3 of your 4 states", licensedIn: "34 states", commission: { newBusiness: "10%", renewal: "10%" }, access: "wholesale", amRating: "A-", categories: ["commercial"], inRater: true },
  { name: "Tokio Marine HCC", hook: "ArtisanEdge — contractors GL, professional, excess and builders risk", paper: "Admitted", stateMatch: "Varies by product", licensedIn: "By product", access: "wholesale", amRating: "A++", categories: ["commercial"] },
  { name: "THREE by Berkshire Hathaway", hook: "One 3-page policy: liability, property, auto and WC for small business", paper: "Admitted", stateMatch: "3 of your 4 states", licensedIn: "29 states", access: "instant", amRating: "A++", categories: ["commercial"], inRater: true },
  { name: "Back9", hook: "Life, annuities, DI and long-term care — full quoting platform", paper: "Admitted", stateMatch: "All 4 of your states", licensedIn: "All 50 states", access: "appointment", categories: ["life"] },
  { name: "Quility", hook: "Term life, mortgage protection, final expense and annuities", paper: "Admitted", stateMatch: "All 4 of your states", licensedIn: "4 states", access: "appointment", categories: ["life"] },
  { name: "Ethos", hook: "Term and whole life, fully digital — no medical exam for most applicants", paper: "Admitted", stateMatch: "All 4 of your states", licensedIn: "All 50 states", access: "appointment", categories: ["life"] },
  { name: "IDIQ", hook: "Identity protection and credit building — IdentityIQ and CreditBuilderIQ", stateMatch: "All 4 of your states", licensedIn: "All 50 states", commission: { newBusiness: "40%", renewal: "40%" }, access: "instant", categories: ["ancillary"] },
  { name: "Choice Home Warranty", hook: "Home systems and appliance protection plans", stateMatch: "All 4 of your states", licensedIn: "All 50 states", commission: { newBusiness: "$30", renewal: "$30" }, access: "instant", categories: ["ancillary"] },
  { name: "Teladoc Health", hook: "Healthiest YOU — virtual care memberships for every household", stateMatch: "All 4 of your states", licensedIn: "All 50 states", commission: { newBusiness: "15%", renewal: "15%" }, access: "appointment", categories: ["ancillary"] },
  { name: "Deductible Defender", hook: "Vehicle and home deductible protection plans", stateMatch: "All 4 of your states", licensedIn: "All 50 states", access: "instant", categories: ["ancillary"] },
  { name: "Aura", hook: "Digital security — identity theft, credit monitoring, VPN and parental controls", stateMatch: "All 4 of your states", licensedIn: "All 50 states", access: "instant", categories: ["ancillary"] },
  { name: "ADT", hook: "24/7 home security and smart-home monitoring", stateMatch: "All 4 of your states", licensedIn: "All 50 states", access: "appointment", categories: ["ancillary"] },
  { name: "Nation Safe Drivers", hook: "Roadside assistance — tows, winch, EV charge, lockout", stateMatch: "All 4 of your states", licensedIn: "All 50 states", access: "appointment", categories: ["ancillary"] },
  { name: "RigNation", hook: "Roadside and extended warranty for commercial trucks", stateMatch: "All 4 of your states", licensedIn: "All 50 states", access: "appointment", categories: ["ancillary"] },
].map((carrier) => ({
  ...carrier,
  id: slugify(carrier.name),
  logo: logoFor(carrier.name),
  caption: ACCESS_COPY[carrier.access],
}))

const COMING_SOON = [
  { name: "GEICO", lines: "Personal and commercial lines", requestedBy: 412 },
  { name: "Chubb", lines: "Commercial and high net worth", requestedBy: 388 },
  { name: "Travelers", lines: "Commercial lines", requestedBy: 341 },
  { name: "Next Insurance", lines: "Small business", requestedBy: 296 },
  { name: "National General", lines: "Personal lines and specialty auto", requestedBy: 203 },
  { name: "Wright Flood", lines: "NFIP and excess flood", requestedBy: 171 },
].map((carrier) => ({ ...carrier, id: slugify(carrier.name), logo: logoFor(carrier.name) }))

// Figma showed LIO, Neptune Flood and Norman Max under "My markets" — treated
// as the agent's existing appointments. Instant-access grants made on this
// page get added to the same set.
const INITIAL_APPOINTED = ["lio-insurance", "neptune-flood", "norman-max"]

// Order, titles, descriptions and pill labels from the Figma frame.
const SECTIONS = [
  { id: "my-markets", pill: "My Markets", title: "My markets", description: "Appointed and sub-coded — quote these without asking anyone.", match: (c, ctx) => ctx.appointed.has(c.id) },
  { id: "start-writing", pill: "Start writing today", title: "Start writing today", description: "Sub-code markets with zero appointment paperwork — access is granted the moment you ask.", match: (c) => c.access === "instant" },
  { id: "new", pill: "New", title: "New", description: "Live on Agency Height this month.", match: (c) => c.isNew },
  { id: "commercial", pill: "Small business and commercial", title: "Small business and commercial", description: "BOP, GL, workers comp, packages and E&S property for main-street and contractor risks.", match: (c) => c.categories.includes("commercial") },
  { id: "landlord", pill: "Landlord and REI", title: "Landlord and REI", description: "Dwelling fire, vacant property, LROs, manufactured homes and cat-exposed dwellings.", match: (c) => c.categories.includes("landlord") },
  { id: "personal", pill: "Personal lines", title: "Personal lines", description: "Auto, home, manufactured housing and cat-exposed dwellings for household accounts.", match: (c) => c.categories.includes("personal") },
  { id: "specialty", pill: "Specialty", title: "Specialty and hard-to-place", description: "Markets your competitors can’t place — collectibles, collector autos, flood, parametric.", match: (c) => c.categories.includes("specialty") },
  { id: "wholesale", pill: "Wholesale desk", title: "Wholesale desk", description: "Send us the risk. The Agency Height wholesale desk submits, negotiates and returns quotes under your name.", match: (c) => c.access === "wholesale" },
  { id: "rater", pill: "Rates in Rater", title: "Quote in the Rater", description: "Comparative rates inside the AH Rater. Your own appointments quote and bind directly; wholesale markets show live rates and route the bind to an underwriter.", match: (c) => c.inRater, rater: true },
  { id: "life", pill: "Life and benefits", title: "Life and benefits", description: "Round out households with life, DI and long-term care.", match: (c) => c.categories.includes("life") },
  { id: "ancillary", pill: "Cross-sell products", title: "Ancillary and cross-sell", description: "Non-insurance products your clients already buy. Attach at bind or at renewal — commissions stack on top of premium.", match: (c) => c.categories.includes("ancillary") },
]

const COVERAGE_OPTIONS = [
  { value: "commercial", label: "Commercial" },
  { value: "landlord", label: "Landlord and REI" },
  { value: "personal", label: "Personal lines" },
  { value: "specialty", label: "Specialty" },
  { value: "life", label: "Life and benefits" },
  { value: "ancillary", label: "Cross-sell products" },
]

// Assumption: Figma only showed the closed "Industry" dropdown. Each option
// matches carriers whose appetite copy mentions related keywords.
const INDUSTRY_OPTIONS = [
  { value: "construction", label: "Construction and trades", keywords: ["contractor", "builders", "construction", "artisan", "blue-collar"] },
  { value: "real-estate", label: "Real estate", keywords: ["landlord", "rental", "dwelling", "vacant", "property", "home"] },
  { value: "transportation", label: "Transportation", keywords: ["auto", "vehicle", "truck", "transport", "roadside"] },
  { value: "nonprofit", label: "Nonprofits and events", keywords: ["nonprofit", "events", "community"] },
  { value: "retail", label: "Retail and e-commerce", keywords: ["e-commerce", "small business", "point of sale", "sellers"] },
]

export {
  CARRIERS,
  COMING_SOON,
  COVERAGE_OPTIONS,
  INDUSTRY_OPTIONS,
  INITIAL_APPOINTED,
  SECTIONS,
  YOUR_STATES,
}
