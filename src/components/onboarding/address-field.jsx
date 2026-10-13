import { useState } from "react"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { FloatingLabelInput } from "@/components/ui/floating-label-input"

const FIELD_SHADOW =
  "shadow-[0px_0px_0px_1px_var(--color-black-alpha-16),0px_1px_2px_0px_var(--color-black-alpha-8)]"

// Search-mode only, matching what this Figma screen actually shows. Figma
// documents a separate "Manual" entry mode (grouped street/apt/city/state/
// zip fields) that isn't shown on this screen — out of scope here.
function AddressField({ id, value, onChange }) {
  const [manualNotice, setManualNotice] = useState(false)

  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-text-tertiary" />
        <FloatingLabelInput
          id={id}
          label="Business address"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn("border-transparent bg-surface-subtle pl-10", FIELD_SHADOW)}
        />
      </div>
      <p className="text-xs leading-4 text-text-secondary">
        Can&apos;t find it?{" "}
        <button
          type="button"
          onClick={() => setManualNotice(true)}
          className="text-text-blue underline underline-offset-2"
        >
          Enter it manually
        </button>
        {manualNotice ? " — manual entry isn't built yet in this prototype." : null}
      </p>
    </div>
  )
}

export { AddressField }
