import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"

function AccountSettingsPage({ onNavigate }) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AppSidebar activeItem="accounts" onNavigate={onNavigate} />
      <div className="flex h-full flex-1 flex-col items-center overflow-hidden bg-surface-subtle">
        <AppHeader title="Account Settings" />
      </div>
    </div>
  )
}

export { AccountSettingsPage }
