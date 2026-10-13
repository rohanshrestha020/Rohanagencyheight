import { useState } from "react"
import { LoginPage } from "@/components/login-page"
import { CreateAccountPage } from "@/components/create-account-page"
import { AccountSettingsPage } from "@/components/account-settings-page"
import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"
import { QuoteRequestsPage } from "@/components/quote-requests/quote-requests-page"
import { MarketsPage } from "@/components/markets/markets-page"

// Only Dashboard, Markets, Account Settings and Quote Requests exist as real pages so
// far — other sidebar items still highlight when clicked (AppSidebar's own
// internal state) but don't navigate anywhere yet.
const NAV_PAGES = {
  dashboard: "dashboard",
  markets: "markets",
  accounts: "account-settings",
  "request-quote": "quote-requests",
}

function App() {
  const [page, setPage] = useState("sign-in")
  const [justOnboarded, setJustOnboarded] = useState(false)

  function handleSidebarNavigate(key) {
    const target = NAV_PAGES[key]
    if (target) setPage(target)
  }

  if (page === "create-account") {
    return (
      <CreateAccountPage
        onBack={() => setPage("sign-in")}
        onSignIn={() => setPage("sign-in")}
        onAccountCreated={() => setPage("onboarding")}
      />
    )
  }

  if (page === "onboarding") {
    return (
      <OnboardingFlow
        onComplete={() => {
          setJustOnboarded(true)
          setPage("dashboard")
        }}
        onExit={() => setPage("sign-in")}
      />
    )
  }

  if (page === "dashboard") {
    return (
      <DashboardPage showSetupSuccess={justOnboarded} onNavigate={handleSidebarNavigate} />
    )
  }

  if (page === "account-settings") {
    return <AccountSettingsPage onNavigate={handleSidebarNavigate} />
  }

  if (page === "markets") {
    return <MarketsPage onNavigate={handleSidebarNavigate} />
  }

  if (page === "quote-requests") {
    return <QuoteRequestsPage onNavigate={handleSidebarNavigate} />
  }

  return (
    <LoginPage
      onCreateAccount={() => setPage("create-account")}
      onSignedIn={() => setPage("onboarding")}
    />
  )
}

export default App
