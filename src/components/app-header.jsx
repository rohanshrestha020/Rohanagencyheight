import { ArrowLeft, ChevronDown } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import avatarImage from "@/assets/shell/avatar.png"

// The dropdown's own menu items weren't captured in the Figma frame (only
// the closed trigger state was shown) — this set is a reasonable stand-in,
// not sourced from the design.
function AppHeader({ title, onBack, userName = "Ayush", userInitial = "A" }) {
  return (
    <header className="flex w-full shrink-0 items-center justify-between border-b border-border-default bg-surface-base px-6 py-4">
      <div className="flex flex-1 items-center gap-2.5">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-text-primary hover:bg-surface-highlight"
          >
            <ArrowLeft className="size-4" />
          </button>
        ) : null}
        <p className="text-base leading-6 font-medium text-text-primary">{title}</p>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex h-9 items-center gap-3 rounded-full bg-surface-base px-5 text-base leading-6 font-semibold text-text-primary shadow-[0px_0px_0px_1px_var(--color-black-alpha-16),0px_1px_2px_0px_var(--color-black-alpha-8)] hover:bg-surface-highlight"
            >
              Help
              <ChevronDown className="size-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Help Center</DropdownMenuItem>
            <DropdownMenuItem>Documentation</DropdownMenuItem>
            <DropdownMenuItem>Contact Support</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Avatar className="size-9">
          <AvatarImage src={avatarImage} alt={userName} />
          <AvatarFallback>{userInitial}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

export { AppHeader }
