import { useState } from "react"
import { AlertTriangle, X, Plus, Megaphone, Pencil, Heart, Users } from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { MoveYourBookBanner } from "@/components/dashboard/move-your-book-banner"
import { MoveYourBookModal } from "@/components/dashboard/move-your-book-modal"
import { MarketCard } from "@/components/dashboard/market-card"
import { GetStartedWidget } from "@/components/dashboard/get-started-widget"
import { SuccessModal } from "@/components/onboarding/success-modal"

import carrierCovertree from "@/assets/dashboard/carrier-covertree.png"
import carrierBlitz from "@/assets/dashboard/carrier-blitz.png"
import carrierCoterie from "@/assets/dashboard/carrier-coterie.png"

const MARKETS = [
  {
    logo: carrierCovertree,
    name: "Covertree Insurance",
    caption: "Admitted, Non-Admitted",
    tags: ["High-Wind", "No-Prior-Claims"],
    extraCount: 3,
  },
  {
    logo: carrierBlitz,
    name: "Blitz Insurance",
    caption: "Admitted, Non-Admitted",
    tags: ["High-Wind", "No-Prior-Claims"],
    extraCount: 3,
  },
  {
    logo: carrierCoterie,
    name: "Coterie Insurance",
    caption: "Commercial Business",
    tags: [],
  },
]

const QUICK_ACTIONS = [
  { icon: Plus, label: "Add Account" },
  { icon: Megaphone, label: "Create/Share Campaign" },
  { icon: Pencil, label: "Update Profile" },
]

function EmptyPanel({ title, icon: Icon, message }) {
  return (
    <div className="flex flex-1 flex-col rounded-xl border border-border-default bg-surface-base">
      <div className="flex items-center justify-between border-b border-border-default px-5 py-4">
        <p className="text-base leading-6 font-semibold text-text-primary">{title}</p>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-3 py-12">
        <span className="flex size-12 items-center justify-center rounded-full bg-surface-subtle text-text-tertiary">
          <Icon className="size-5" />
        </span>
        <p className="text-sm leading-5 text-text-tertiary">{message}</p>
      </div>
    </div>
  )
}

function DashboardPage({ showSetupSuccess = false, onNavigate }) {
  const [alertOpen, setAlertOpen] = useState(true)
  const [moveBookOpen, setMoveBookOpen] = useState(false)
  const [setupSuccessOpen, setSetupSuccessOpen] = useState(showSetupSuccess)

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AppSidebar activeItem="dashboard" onNavigate={onNavigate} />
      <div className="flex h-full flex-1 flex-col overflow-hidden bg-surface-subtle">
        <AppHeader title="Dashboard" />

        {alertOpen ? (
          <div className="flex items-center gap-2 bg-warning-bg px-6 py-3">
            <AlertTriangle className="size-4 shrink-0 text-warning-icon" />
            <p className="flex-1 text-sm leading-5 text-text-primary">
              Compliance documents are pending, this blocks access to markets appointments and
              submission{" "}
              <a href="#upload" className="font-medium text-info-text">
                Upload
              </a>
            </p>
            <button type="button" onClick={() => setAlertOpen(false)} aria-label="Dismiss">
              <X className="size-4 text-text-tertiary" />
            </button>
          </div>
        ) : null}

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 py-6">
          <p className="text-2xl leading-7 text-text-secondary">
            Welcome <span className="font-semibold text-text-primary">John,</span>
          </p>

          <MoveYourBookBanner onAssignManager={() => setMoveBookOpen(true)} />

          <div className="flex items-center gap-3">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.label}
                type="button"
                className="flex items-center gap-2 rounded-full bg-surface-base px-4 py-2 text-sm leading-5 font-medium text-text-primary shadow-[0px_0px_0px_1px_var(--color-black-alpha-16),0px_1px_2px_0px_var(--color-black-alpha-8)] hover:bg-surface-highlight"
              >
                <action.icon className="size-4" />
                {action.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col rounded-xl border border-border-default bg-surface-base">
              <div className="flex items-center justify-between border-b border-border-default px-5 py-4">
                <p className="text-base leading-6 font-semibold text-text-primary">Markets</p>
                <a href="#markets" className="text-sm leading-5 font-medium text-primary-text">
                  View More →
                </a>
              </div>
              <div className="flex flex-col">
                {MARKETS.map((market) => (
                  <MarketCard key={market.name} {...market} />
                ))}
              </div>
            </div>

            <EmptyPanel
              title="Submissions"
              icon={Megaphone}
              message="Quotes you submit will show up here."
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <EmptyPanel
              title="Active Campaigns"
              icon={Heart}
              message="Campaigns you launch will show up here."
            />
            <EmptyPanel
              title="Accounts"
              icon={Users}
              message="Accounts you add will show up here."
            />
          </div>
        </div>
      </div>

      <GetStartedWidget />
      <MoveYourBookModal open={moveBookOpen} onOpenChange={setMoveBookOpen} />
      <SuccessModal
        open={setupSuccessOpen}
        onOpenChange={setSetupSuccessOpen}
        onGoToMarkets={() => setSetupSuccessOpen(false)}
      />
    </div>
  )
}

export { DashboardPage }
