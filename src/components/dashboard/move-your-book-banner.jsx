import { ArrowRight } from "lucide-react"

import bannerImage from "@/assets/banner.png"

function MoveYourBookBanner({ onAssignManager }) {
  return (
    <div
      className="relative flex w-full shrink-0 items-center gap-6 overflow-hidden rounded-2xl bg-cover bg-left py-8 pr-4 pl-[140px]"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <p className="text-lg leading-6 font-semibold tracking-[-0.18px] text-text-primary">
          Grow your commissions
        </p>
        <p className="text-sm leading-5 text-text-secondary">
          Agency Height provides better commissions and agents feel the difference once they
          start moving their book. Your part is{" "}
          <span className="font-semibold text-text-primary">about 40 minutes total</span>, spread
          over three weeks, and you keep your AMS the whole time.
        </p>
      </div>
      <button
        type="button"
        onClick={onAssignManager}
        className="flex shrink-0 items-center gap-2.5 rounded-lg border border-border-default bg-white/85 px-5 py-2.5 text-sm leading-5 font-medium text-text-blue hover:bg-white"
      >
        Get better commissions
        <ArrowRight className="size-5" />
      </button>
    </div>
  )
}

export { MoveYourBookBanner }
