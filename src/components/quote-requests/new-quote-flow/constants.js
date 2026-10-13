import {
  Scale,
  Building2,
  Warehouse,
  Users,
  Briefcase,
  ShieldAlert,
  Plane,
  Truck,
  Umbrella,
} from "lucide-react"

// Coverage catalog + routing exactly as shown on the Figma "Account selection"
// step (node 905:59571) of the new quote-request flow.
const COVERAGE_CATALOG = [
  { key: "general-liability", label: "General Liability", route: "Rater", icon: Scale },
  { key: "business-owners", label: "Business Owners", route: "Rater + Wholesale", icon: Building2 },
  { key: "commercial-property", label: "Commercial Property", route: "Rater", icon: Warehouse },
  { key: "workers-comp", label: "Workers' Compensation", route: "Rater", icon: Users },
  { key: "professional-liability", label: "Professional Liability", route: "Rater", icon: Briefcase },
  { key: "cyber-liability", label: "Cyber Liability", route: "Rater", icon: ShieldAlert },
  { key: "aviation", label: "Aviation", route: "Wholesale", icon: Plane },
  { key: "commercial-auto", label: "Commercial Auto", route: "Wholesale", icon: Truck },
  { key: "umbrella-excess", label: "Umbrella / Excess", route: "Wholesale", icon: Umbrella },
]

// Reasonable placeholder directory standing in for a real account search
// (the design shows a search-or-create field, not a fixed list) — reuses the
// same accounts already seeded in the Quote Requests table.
const ACCOUNTS_DIRECTORY = [
  {
    id: "doe-llc",
    name: "Doe LLC",
    phone: "(513) 442-2455",
    email: "jdoe@gmail.com",
    address: "4625 Windfern Rd, Houston, TX 77080",
  },
  {
    id: "northwind-logistics",
    name: "Northwind Logistics",
    phone: "(281) 555-0142",
    email: "ops@northwindlogistics.com",
    address: "1180 Freight Ln, Katy, TX 77494",
  },
  {
    id: "cedar-vine-hospitality",
    name: "Cedar & Vine Hospitality",
    phone: "(713) 555-0199",
    email: "accounts@cedarvine.com",
    address: "88 Vine St, Austin, TX 78701",
  },
  {
    id: "harbor-point-cafe",
    name: "Harbor Point Cafe",
    phone: "(409) 555-0110",
    email: "hello@harborpointcafe.com",
    address: "22 Harbor Point Dr, Galveston, TX 77550",
  },
  {
    id: "sable-freight-co",
    name: "Sable Freight Co",
    phone: "(214) 555-0173",
    email: "dispatch@sablefreight.com",
    address: "900 Trinity Ave, Dallas, TX 75212",
  },
]

// Placeholder carrier panel per coverage — the "Quote type" step (node
// 905:59900) only showed General Liability + Business Owners; the rest are a
// reasonable extrapolation using the same carriers/commission ranges shown.
const CARRIERS_BY_COVERAGE = {
  "general-liability": [
    { id: "next-insurance", name: "Next Insurance", type: "Rater", commission: "8-18%" },
    { id: "geico", name: "Geico", type: "Wholesale", commission: "10-15%" },
    { id: "pie", name: "Pie", type: "Rater + Wholesale", commission: "9-16%" },
    { id: "travellers", name: "Travellers", type: "Rater", commission: "8-12%" },
  ],
  "business-owners": [
    { id: "geico", name: "Geico", type: "Wholesale", commission: "10-15%" },
    { id: "next-insurance", name: "Next Insurance", type: "Rater", commission: "8-18%" },
  ],
  "commercial-property": [
    { id: "travellers", name: "Travellers", type: "Rater", commission: "8-12%" },
    { id: "pie", name: "Pie", type: "Rater + Wholesale", commission: "9-16%" },
  ],
  "workers-comp": [
    { id: "next-insurance", name: "Next Insurance", type: "Rater", commission: "8-18%" },
    { id: "pie", name: "Pie", type: "Rater + Wholesale", commission: "9-16%" },
  ],
  "professional-liability": [
    { id: "travellers", name: "Travellers", type: "Rater", commission: "8-12%" },
    { id: "next-insurance", name: "Next Insurance", type: "Rater", commission: "8-18%" },
  ],
  "cyber-liability": [
    { id: "geico", name: "Geico", type: "Wholesale", commission: "10-15%" },
    { id: "travellers", name: "Travellers", type: "Rater", commission: "8-12%" },
  ],
  aviation: [
    { id: "pie", name: "Pie", type: "Wholesale", commission: "9-16%" },
    { id: "geico", name: "Geico", type: "Wholesale", commission: "10-15%" },
  ],
  "commercial-auto": [
    { id: "geico", name: "Geico", type: "Wholesale", commission: "10-15%" },
    { id: "pie", name: "Pie", type: "Rater + Wholesale", commission: "9-16%" },
  ],
  "umbrella-excess": [
    { id: "travellers", name: "Travellers", type: "Wholesale", commission: "8-12%" },
    { id: "pie", name: "Pie", type: "Wholesale", commission: "9-16%" },
  ],
}

const REQUIRED_DOCUMENTS = [
  { id: "acord-125", name: "ACORD 125 — Commercial insurance application" },
  { id: "acord-126", name: "ACORD 126 — Commercial general liability section" },
  { id: "loss-runs", name: "Loss runs — last 3-5 years" },
  { id: "financials", name: "Prior year financial statement" },
  { id: "sov", name: "Statement of values" },
]

const FLOW_STEPS = [
  { key: "account", label: "Account selection" },
  { key: "quote-type", label: "Documents" },
  { key: "questions", label: "Questions" },
  { key: "review", label: "Review and Submit" },
]

// The generic per-coverage underwriting questionnaire template, adapted from
// the "General Liability" detail form (node 905:60046) — the file only fully
// designed that one coverage's fields, so every selected coverage reuses this
// same field set. This is a UX simplification, not something the design
// specified per-coverage.
const QUESTIONNAIRE_SECTIONS = [
  {
    key: "location",
    title: "This location",
    fields: [
      { key: "streetAddress", label: "Street address", type: "text", placeholder: "4625 Windfern Rd" },
      { key: "yearsAtLocation", label: "Years at this location", type: "text", placeholder: "3" },
      { key: "buildingType", label: "Building / occupancy type", type: "text", placeholder: "Office / retail" },
    ],
  },
  {
    key: "business-profile",
    title: "Business profile",
    fields: [
      { key: "entityType", label: "Entity type", type: "text", placeholder: "Limited Liability Company (LLC)" },
      { key: "yearsInBusiness", label: "Years in business", type: "text", placeholder: "6" },
      { key: "annualRevenue", label: "Annual revenue", type: "text", placeholder: "$850,000" },
      { key: "employeeCount", label: "Number of employees", type: "text", placeholder: "12" },
    ],
  },
  {
    key: "services-offered",
    title: "Services offered",
    fields: [{ key: "servicesOffered", label: "What services does the business offer?", type: "textarea" }],
  },
  {
    key: "operations",
    title: "Operations",
    fields: [
      { key: "subcontractors", label: "Does the business use subcontractors?", type: "yesno" },
      { key: "primaryState", label: "Primary state of operations", type: "text", placeholder: "Texas" },
    ],
  },
  {
    key: "activities",
    title: "Activities",
    fields: [
      { key: "hazardousWork", label: "Any work performed above ground level or below ground?", type: "yesno" },
      { key: "activitiesDescription", label: "Describe any excluded or unusual activities", type: "textarea" },
    ],
  },
  {
    key: "loss-history",
    title: "Loss history",
    fields: [
      { key: "priorClaims", label: "Any claims in the last 5 years?", type: "yesno" },
      { key: "priorCancellation", label: "Any prior cancellation or non-renewal?", type: "yesno" },
    ],
  },
  {
    key: "price-coverage",
    title: "Price coverage",
    fields: [
      { key: "desiredLimit", label: "Desired per-occurrence limit", type: "text", placeholder: "$1,000,000" },
      { key: "deductible", label: "Deductible", type: "text", placeholder: "$1,000" },
    ],
  },
]

const ELIGIBILITY_ATTESTATIONS = [
  "The business has no losses of $50,000 or more in the last 5 years.",
  "No open claims or ongoing litigation against the business.",
  "The business does not perform work at height above 15 feet.",
  "No prior insurance cancellations for non-payment.",
  "The business is not currently for sale or under new ownership negotiations.",
]

export {
  COVERAGE_CATALOG,
  ACCOUNTS_DIRECTORY,
  CARRIERS_BY_COVERAGE,
  REQUIRED_DOCUMENTS,
  FLOW_STEPS,
  QUESTIONNAIRE_SECTIONS,
  ELIGIBILITY_ATTESTATIONS,
}
