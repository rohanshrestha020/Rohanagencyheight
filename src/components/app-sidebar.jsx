import { useState } from "react"
import {
  LayoutDashboard,
  Target,
  Landmark,
  Users,
  FilePlus2,
  TrendingUp,
  FileText,
  BookOpen,
  Megaphone,
  Store,
  Handshake,
  Sparkles,
  HelpCircle,
  Plus,
  PanelLeft,
  ArrowUpRight,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import agencyHeightLogo from "@/assets/login/agency-height-logo.svg"
import agencyHeightMark from "@/assets/shell/agency-height-mark.svg"

// Real labels/grouping sourced from the design system's own dashboard mockup
// (Figma node 8670:95442) — not invented. Icons are Lucide's closest concept
// match to Figma's Phosphor icons, per this project's Hard Rule to only use
// Lucide, not literal Phosphor asset copies.
const NAV_SECTIONS = [
  {
    label: "MAIN",
    items: [
      { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { key: "markets", label: "Markets", icon: Target },
      { key: "lead-bank", label: "Lead Bank", icon: Landmark },
      { key: "accounts", label: "Accounts", icon: Users },
    ],
  },
  {
    label: "PIPELINE",
    items: [
      { key: "request-quote", label: "Quote Requests", icon: FilePlus2 },
      { key: "sales", label: "Sales", icon: TrendingUp },
      { key: "submissions", label: "Submissions", icon: FileText },
    ],
  },
  {
    label: "BUSINESS",
    items: [
      { key: "my-book", label: "My Book", icon: BookOpen },
      { key: "campaigns", label: "Campaigns", icon: Megaphone },
    ],
  },
  {
    label: "LINKS",
    items: [
      { key: "shop", label: "Shop", icon: Store, external: true },
      { key: "agency-acquisition", label: "Agency Acquisition", icon: Handshake, external: true },
    ],
  },
]

function NavItem({ item, active, onClick }) {
  const Icon = item.icon
  return (
    <button
      type="button"
      onClick={onClick}
      data-active={active || undefined}
      className={cn(
        "group relative flex h-9 w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm leading-5 font-medium text-text-secondary hover:bg-surface-highlight hover:text-text-primary",
        active && "bg-primary-bg text-primary-text hover:bg-primary-bg hover:text-primary-text"
      )}
    >
      {active ? (
        <span className="absolute top-2 left-0 h-5 w-[3px] rounded-full bg-primary-solid" />
      ) : null}
      <Icon className="size-5 shrink-0" />
      <span className="flex-1 truncate">{item.label}</span>
      {item.external ? <ArrowUpRight className="size-4 shrink-0 text-text-tertiary" /> : null}
    </button>
  )
}

// Icon-only rail shown when collapsed — matches Figma node 366:16541. That
// frame's own nav icons are generic/anonymous Phosphor placeholders that
// don't map to real items, so this reuses NAV_SECTIONS' actual Lucide icons
// instead of importing meaningless assets; the group/divider pattern is what
// carries over from the design, not the exact icon glyphs.
function CollapsedNavItem({ item, active, onClick }) {
  const Icon = item.icon
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={onClick}
          aria-label={item.label}
          data-active={active || undefined}
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-highlight hover:text-text-primary",
            active && "bg-surface-highlight text-text-primary"
          )}
        >
          <Icon className="size-5" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">
        {item.label}
        {item.external ? " ↗" : ""}
      </TooltipContent>
    </Tooltip>
  )
}

function CollapsedFooterButton({ icon: Icon, label, showDot, onClick }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={onClick}
          aria-label={label}
          className="relative flex size-10 shrink-0 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-highlight hover:text-text-primary"
        >
          <Icon className="size-5" />
          {showDot ? (
            <span className="absolute top-2 right-2 size-2 rounded-full bg-error-solid" />
          ) : null}
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  )
}

function AppSidebar({
  activeItem = "dashboard",
  onNavigate,
  onCreateNew,
  onToggleCollapse,
  defaultCollapsed = false,
  className,
}) {
  const [internalActive, setInternalActive] = useState(activeItem)
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  function handleNavigate(key) {
    setInternalActive(key)
    onNavigate?.(key)
  }

  function toggleCollapse() {
    setCollapsed((prev) => {
      onToggleCollapse?.(!prev)
      return !prev
    })
  }

  if (collapsed) {
    return (
      <TooltipProvider>
        <aside
          className={cn(
            "flex h-full w-[72px] shrink-0 flex-col items-center justify-between border-r border-border-default bg-surface-base p-2",
            className
          )}
        >
          <div className="flex w-full flex-col items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={toggleCollapse}
                  aria-label="Expand sidebar"
                  className="flex h-14 w-full shrink-0 items-center justify-center rounded-lg hover:bg-surface-highlight"
                >
                  <img src={agencyHeightMark} alt="Agency Height" className="h-6 w-auto" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Expand sidebar</TooltipContent>
            </Tooltip>

            <button
              type="button"
              onClick={onCreateNew}
              aria-label="New"
              className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border-default bg-surface-base text-text-primary hover:bg-surface-highlight"
            >
              <Plus className="size-[18px]" />
            </button>

            <div className="h-1 w-full shrink-0" />

            {NAV_SECTIONS.map((section, index) => (
              <div key={section.label} className="flex w-full flex-col items-center gap-1">
                {index > 0 ? <div className="my-1 h-px w-6 shrink-0 bg-border-default" /> : null}
                {section.items.map((item) => (
                  <CollapsedNavItem
                    key={item.key}
                    item={item}
                    active={internalActive === item.key}
                    onClick={() => handleNavigate(item.key)}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="flex w-full flex-col items-center gap-1.5">
            <CollapsedFooterButton icon={Sparkles} label="Release notes" showDot />
            <CollapsedFooterButton icon={HelpCircle} label="Help & support" />
          </div>
        </aside>
      </TooltipProvider>
    )
  }

  return (
    <aside
      className={cn(
        "flex h-full w-[240px] shrink-0 flex-col items-start justify-between border-r border-border-default bg-surface-base p-2",
        className
      )}
    >
      <div className="flex w-full flex-col items-start gap-0.5">
        <div className="flex w-full items-center justify-between py-4 pr-1 pl-2">
          <img src={agencyHeightLogo} alt="Agency Height" className="h-6 w-auto" />
          <button
            type="button"
            onClick={toggleCollapse}
            aria-label="Collapse sidebar"
            className="flex size-10 shrink-0 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-highlight"
          >
            <PanelLeft className="size-[18px]" />
          </button>
        </div>

        <button
          type="button"
          onClick={onCreateNew}
          className="flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-border-default bg-surface-base px-3 text-sm leading-5 font-medium text-text-primary hover:bg-surface-highlight"
        >
          <Plus className="size-[18px]" />
          New
        </button>

        <div className="h-2 w-full" />

        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="flex w-full flex-col items-start">
            <div className="w-full pt-3.5 pb-1.5 pl-2.5">
              <p className="text-[11px] leading-4 text-text-tertiary">{section.label}</p>
            </div>
            {section.items.map((item) => (
              <NavItem
                key={item.key}
                item={item}
                active={internalActive === item.key}
                onClick={() => handleNavigate(item.key)}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex w-full flex-col items-start gap-1">
        <button
          type="button"
          className="relative flex h-9 w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm leading-5 font-medium text-text-secondary hover:bg-surface-highlight hover:text-text-primary"
        >
          <span className="relative shrink-0">
            <Sparkles className="size-5" />
            <span className="absolute top-0 right-0 size-2 rounded-full bg-error-solid" />
          </span>
          <span className="flex-1">Release notes</span>
        </button>
        <button
          type="button"
          className="flex h-9 w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm leading-5 font-medium text-text-secondary hover:bg-surface-highlight hover:text-text-primary"
        >
          <HelpCircle className="size-5 shrink-0" />
          <span className="flex-1">Help &amp; support</span>
        </button>
      </div>
    </aside>
  )
}

export { AppSidebar }
