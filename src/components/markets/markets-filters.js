import { INDUSTRY_OPTIONS, YOUR_STATES } from "@/components/markets/markets-data"

const ALL = "all"

const EMPTY_FILTERS = {
  query: "",
  state: ALL,
  coverage: ALL,
  industry: ALL,
  access: [],
  paper: [],
  newOnly: false,
  commissionOnly: false,
}

function countAdvanced(filters) {
  return (
    filters.access.length +
    filters.paper.length +
    (filters.newOnly ? 1 : 0) +
    (filters.commissionOnly ? 1 : 0)
  )
}

function hasAnyFilter(filters) {
  return (
    filters.query.trim() !== "" ||
    filters.state !== ALL ||
    filters.coverage !== ALL ||
    filters.industry !== ALL ||
    countAdvanced(filters) > 0
  )
}

// The design only gives "N of your 4 states", not which ones. Assumption:
// partial matches cover your states in YOUR_STATES order (so "3 of your 4"
// = TX, AZ, OH), which is enough to make the State filter behave sensibly.
function coversState(carrier, state) {
  const match = carrier.stateMatch
  if (match.startsWith("All") || match.startsWith("Varies")) return true
  const covered = Number.parseInt(match, 10)
  return YOUR_STATES.indexOf(state) < covered
}

function matchesFilters(carrier, filters, { myStatesOnly }) {
  // Assumption: "My states only" hides markets whose state fit can't be
  // confirmed up front ("Varies by product").
  if (myStatesOnly && carrier.stateMatch.startsWith("Varies")) return false

  const query = filters.query.trim().toLowerCase()
  if (query) {
    const haystack = [carrier.name, carrier.hook, carrier.paper, ...carrier.categories]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
    if (!haystack.includes(query)) return false
  }
  if (filters.state !== ALL && !coversState(carrier, filters.state)) return false
  if (filters.coverage !== ALL && !carrier.categories.includes(filters.coverage)) return false
  if (filters.industry !== ALL) {
    const industry = INDUSTRY_OPTIONS.find((option) => option.value === filters.industry)
    const hook = carrier.hook.toLowerCase()
    if (!industry.keywords.some((keyword) => hook.includes(keyword))) return false
  }
  if (filters.access.length && !filters.access.includes(carrier.access)) return false
  if (filters.paper.length && !filters.paper.some((paper) => carrier.paper?.includes(paper))) return false
  if (filters.newOnly && !carrier.isNew) return false
  if (filters.commissionOnly && !carrier.commission) return false
  return true
}

export { ALL, EMPTY_FILTERS, countAdvanced, hasAnyFilter, matchesFilters }
