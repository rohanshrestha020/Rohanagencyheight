import { useState } from "react"
import { ChevronUp, ChevronDown, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const CHECKLIST = [
  { key: "npn", label: "Verify your NPN", body: "Profile live in the public directory", done: true },
  {
    key: "appointments",
    label: "Set up market appointments",
    body: "We handle the carrier paperwork for you",
    locked: true,
    lockedHint: "Upload your compliance documents to unlock",
  },
  { key: "lead", label: "Claim your first lead", body: "2 free leads are waiting for you" },
  { key: "intake", label: "Share your intake form", body: "Bring your own leads into the system" },
  { key: "submission", label: "Make your first submission", body: "Needs an appointment first" },
]

function ProgressRing({ percent }) {
  const radius = 16
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - percent / 100)
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className="-rotate-90">
      <circle cx="20" cy="20" r={radius} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
      <circle
        cx="20"
        cy="20"
        r={radius}
        fill="none"
        stroke="#58c070"
        strokeWidth="4"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
      <text
        x="20"
        y="20"
        textAnchor="middle"
        dominantBaseline="central"
        transform="rotate(90 20 20)"
        fontSize="10"
        fill="white"
      >
        {percent}%
      </text>
    </svg>
  )
}

function GetStartedWidget() {
  const [open, setOpen] = useState(true)
  const doneCount = CHECKLIST.filter((i) => i.done).length
  const percent = Math.round((doneCount / CHECKLIST.length) * 100)
  const stepsLeft = CHECKLIST.length - doneCount

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-6 bottom-6 flex items-center gap-2 rounded-full bg-primary-solid px-4 py-3 text-sm leading-5 font-medium text-white shadow-lg"
      >
        <ProgressRing percent={percent} />
        Get started {doneCount + 1} of {CHECKLIST.length}
        <ChevronUp className="size-4" />
      </button>
    )
  }

  return (
    <TooltipProvider>
      <div className="fixed right-6 bottom-6 flex w-[400px] flex-col overflow-hidden rounded-xl bg-surface-base shadow-[0px_24px_64px_-16px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-3 bg-primary-solid px-5 py-4 text-white">
          <div className="flex items-center justify-between">
            <p className="text-base leading-6 font-semibold">Get started</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Collapse">
              <ChevronDown className="size-4" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm leading-5 text-white/80">
              {stepsLeft} steps left · about {stepsLeft * 2 + 2} minutes
            </p>
            <ProgressRing percent={percent} />
          </div>
        </div>

        <ul className="flex flex-col divide-y divide-border-default">
          {CHECKLIST.map((item) => (
            <li key={item.key} className="flex items-center gap-3 px-5 py-3">
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-full",
                  item.done ? "bg-success-icon text-white" : "border border-border-default"
                )}
              >
                {item.done ? <Check className="size-3" /> : null}
              </span>
              <div className="flex flex-1 flex-col">
                <span className="text-sm leading-5 font-medium text-text-primary">{item.label}</span>
                <span className="text-xs leading-4 text-text-secondary">{item.body}</span>
              </div>
              {item.done ? (
                <span className="shrink-0 rounded-full bg-success-bg px-2.5 py-1 text-xs leading-4 font-medium text-success-text">
                  Done
                </span>
              ) : item.locked ? (
                <Tooltip open>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      disabled
                      className="shrink-0 rounded-full bg-surface-subtle px-3 py-1 text-xs leading-4 font-medium text-text-tertiary"
                    >
                      View
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">{item.lockedHint}</TooltipContent>
                </Tooltip>
              ) : (
                <button
                  type="button"
                  className="shrink-0 rounded-full bg-surface-base px-3 py-1 text-xs leading-4 font-medium text-text-primary shadow-[0px_0px_0px_1px_var(--color-black-alpha-16),0px_1px_2px_0px_var(--color-black-alpha-8)] hover:bg-surface-highlight"
                >
                  View
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </TooltipProvider>
  )
}

export { GetStartedWidget }
