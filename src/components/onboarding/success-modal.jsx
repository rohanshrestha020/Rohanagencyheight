import { Landmark, Users, Smartphone, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import carrierWall from "@/assets/onboarding/carrier-wall.png"

const CHECKLIST = [
  {
    icon: Landmark,
    title: "Unlock Your Markets",
    body: "Access to markets for direct appointments or wholesale submissions.",
    active: true,
  },
  { icon: Users, title: "Let Clients Find You" },
  { icon: Smartphone, title: "Download Mobile App" },
]

// One of 3 near-identical Figma variants (differing only in the right-panel
// illustration) — built once as the canonical version, per the flow
// inspection notes.
function SuccessModal({ open, onOpenChange, onGoToMarkets }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="grid w-full max-w-[920px] grid-cols-1 gap-4 rounded-2xl bg-surface-base p-4 shadow-[0px_24px_64px_-16px_rgba(0,0,0,0.18)] ring-0 sm:max-w-[920px] md:grid-cols-2"
      >
        <div className="flex flex-col gap-6 rounded-3xl bg-surface-subtle p-8">
          <p className="text-base leading-6 font-medium text-brand-text">You&apos;re good to go</p>
          <h2 className="m-0 max-w-[320px] text-[28px] leading-[40px] font-semibold text-text-primary">
            Your account is set up.
          </h2>

          <ul className="flex flex-col gap-2">
            {CHECKLIST.map((item) => (
              <li
                key={item.title}
                className={cn(
                  "flex items-center gap-3 rounded-2xl p-4",
                  item.active &&
                    "bg-surface-base shadow-[0px_2px_8px_rgba(0,0,0,0.05),0px_16px_32px_-12px_rgba(0,0,0,0.1)]"
                )}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-solid text-white">
                  <item.icon className="size-[17px]" />
                </span>
                <div className="flex flex-col gap-0.5">
                  <p className="text-base leading-6 font-semibold text-text-primary">
                    {item.title}
                  </p>
                  {item.body ? (
                    <p className="text-sm leading-5 text-text-secondary">{item.body}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>

          <Button
            type="button"
            variant="primary"
            shape="circular"
            className="mt-1 w-full"
            onClick={onGoToMarkets}
          >
            Go to Markets
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="relative flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand-bg via-surface-highlight to-brand-bg">
          <span className="absolute top-6 left-1/2 -translate-x-1/2 rounded-full bg-text-blue px-3 py-1.5 text-[13px] leading-[18px] whitespace-nowrap text-text-light">
            41 of 92 markets match your licenses
          </span>
          <img src={carrierWall} alt="" className="w-[90%] object-contain" />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { SuccessModal }
