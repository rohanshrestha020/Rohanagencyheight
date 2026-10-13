import { useState } from "react"
import { CheckCircle2, TrendingUp, FileCheck, ClipboardCheck, Phone, Info } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import carrierCovertree from "@/assets/dashboard/carrier-covertree.png"
import carrierBlitz from "@/assets/dashboard/carrier-blitz.png"

// Fork's inspection flagged several raw Inter-font / near-token hex values
// in this flow (uplift card bg, list labels, one inconsistent market row) as
// bleed from an older design iteration — mapped to the closest real tokens
// here rather than hardcoded, per that recommendation. Logos: Figma showed
// Progressive/Travelers, substituted with this app's existing carrier logo
// assets (Covertree/Blitz) rather than fetching two more one-off images.
const MARKET_ROWS = [
  { logo: carrierCovertree, name: "Covertree Insurance", from: "10%", to: "14%", gain: 5100 },
  { logo: carrierBlitz, name: "Blitz Insurance", from: "12%", to: "15%", gain: 4260 },
  { logo: carrierCovertree, name: "Covertree Insurance", from: "9%", to: "13%", gain: 3940 },
  { logo: carrierBlitz, name: "Blitz Insurance", from: "11%", to: "14%", gain: 2880 },
  { logo: carrierCovertree, name: "Covertree Insurance", from: "8%", to: "11%", gain: 2220 },
]

function Chip({ selected, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg border px-3 py-2 text-sm leading-5 font-medium",
        selected
          ? "border-brand-border bg-brand-bg text-brand-text"
          : "border-border-default bg-surface-highlight text-text-secondary"
      )}
    >
      {children}
    </button>
  )
}

function StepValueProp({ onNext }) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Move your book</DialogTitle>
      </DialogHeader>
      <div className="flex max-h-[600px] flex-col gap-4 overflow-y-auto px-1">
        <div className="flex flex-col gap-1">
          <p className="text-xl leading-7 font-semibold text-text-primary">
            You&apos;re leaving money on the table
          </p>
          <p className="text-sm leading-5 text-text-secondary">
            312 agencies moved 1,240 policies to Agency Height last quarter.
          </p>
        </div>

        <div className="flex flex-col gap-1 rounded-2xl bg-brand-bg p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-5 text-brand-text" />
            <span className="text-2xl leading-8 font-semibold text-text-primary">+$18,400</span>
          </div>
          <p className="text-sm leading-5 text-text-secondary">estimated extra commission a year</p>
          <p className="text-xs leading-4 text-text-tertiary">
            Based on the 5 carriers already on your licence and the premium you told us you
            place.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs leading-4 font-medium tracking-wide text-text-tertiary">
            YOUR MARKETS · WHAT WE&apos;D PAY
          </p>
          <div className="flex flex-col rounded-xl shadow-[0px_0px_0px_1px_var(--color-black-alpha-16),0px_1px_2px_0px_var(--color-black-alpha-8)]">
            {MARKET_ROWS.map((row, i) => (
              <div
                key={i}
                className="flex items-center gap-3 border-b border-border-default p-3 last:border-b-0"
              >
                <img src={row.logo} alt="" className="size-8 shrink-0 rounded-md object-contain" />
                <div className="flex flex-1 flex-col">
                  <span className="text-base leading-6 font-semibold text-text-primary">
                    {row.name}
                  </span>
                  <span className="text-sm leading-5 font-medium text-text-secondary">
                    Commission <span className="line-through">{row.from}</span> → {row.to}
                  </span>
                </div>
                <span className="shrink-0 text-sm leading-5 font-medium text-success-text">
                  +${row.gain.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="primary" className="w-full" onClick={onNext}>
          Request callback
        </Button>
      </DialogFooter>
    </>
  )
}

function StepContactPreferences({ onNext }) {
  const [day, setDay] = useState("Tomorrow")
  const [time, setTime] = useState("Morning 8–12")

  return (
    <>
      <DialogHeader>
        <DialogTitle>Move your book</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4 px-1">
        <div className="flex flex-col gap-1">
          <p className="text-xl leading-7 font-semibold text-text-primary">When can we reach you?</p>
          <p className="text-sm leading-5 text-text-secondary">
            A specialist walks you through the numbers and files the broker-of-record letters
            for you.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl px-3 py-3 shadow-[0px_0px_0px_1px_var(--color-black-alpha-16),0px_1px_2px_0px_var(--color-black-alpha-8)]">
          <Phone className="size-5 text-text-tertiary" />
          <span className="text-base leading-6 text-text-primary">+1 (512) 555-0134</span>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm leading-5 font-medium text-text-primary">Preferred by</p>
          <div className="flex flex-wrap gap-2">
            {["Today", "Tomorrow", "This week", "Next week"].map((option) => (
              <Chip key={option} selected={day === option} onClick={() => setDay(option)}>
                {option}
              </Chip>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm leading-5 font-medium text-text-primary">Preferred Time</p>
          <div className="flex flex-wrap gap-2">
            {["Morning 8–12", "Afternoon 12–5", "Evening 5–8"].map((option) => (
              <Chip key={option} selected={time === option} onClick={() => setTime(option)}>
                {option}
              </Chip>
            ))}
          </div>
        </div>

        <textarea
          placeholder="Anything we should know? Optional — e.g. best after 10am"
          rows={3}
          className="w-full resize-none rounded-md border border-border-default bg-surface-base p-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary"
        />

        <div className="flex items-start gap-2 text-sm leading-5 text-text-primary">
          <Info className="mt-0.5 size-4 shrink-0 text-text-tertiary" />
          No obligation. Nothing is filed until you say so.
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="primary" className="w-full" onClick={() => onNext({ day, time })}>
          Request callback
        </Button>
      </DialogFooter>
    </>
  )
}

function StepSuccess({ day, time, onDone }) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Move your book</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col items-center gap-4 px-1 py-4 text-center">
        <CheckCircle2 className="size-16 text-success-icon" />
        <div className="flex flex-col gap-1">
          <p className="text-2xl leading-9 font-semibold text-text-primary">You&apos;re booked in</p>
          <p className="text-base leading-6 text-text-tertiary">
            We&apos;ll call you {day?.toLowerCase()} ({time}) on +1 (512) 555-0134.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 text-left">
          <p className="text-xs leading-4 font-medium tracking-wide text-text-tertiary">
            WHAT HAPPENS NEXT
          </p>
          <div className="flex flex-col rounded-xl shadow-[0px_0px_0px_1px_var(--color-black-alpha-16),0px_1px_2px_0px_var(--color-black-alpha-8)]">
            {[
              {
                icon: FileCheck,
                title: "We pull your carrier data",
                body: "Your NIPR record and markets are already on file.",
              },
              {
                icon: ClipboardCheck,
                title: "A specialist confirms the numbers",
                body: "You'll see exactly what each carrier pays you here",
              },
              {
                icon: TrendingUp,
                title: "We file the paperwork",
                body: "Broker-of-record letters go out on your behalf.",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 border-b border-border-default p-4 last:border-b-0">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-bg text-brand-text">
                  <item.icon className="size-[18px]" />
                </span>
                <div className="flex flex-col">
                  <span className="text-base leading-6 font-semibold text-text-primary">{item.title}</span>
                  <span className="text-sm leading-5 text-text-secondary">{item.body}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="primary" className="w-full" onClick={onDone}>
          Back to dashboard
        </Button>
      </DialogFooter>
    </>
  )
}

function MoveYourBookModal({ open, onOpenChange }) {
  const [step, setStep] = useState(0)
  const [preferences, setPreferences] = useState({})

  function handleOpenChange(next) {
    onOpenChange(next)
    if (!next) {
      window.setTimeout(() => setStep(0), 200)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        {step === 0 && <StepValueProp onNext={() => setStep(1)} />}
        {step === 1 && (
          <StepContactPreferences
            onNext={(prefs) => {
              setPreferences(prefs)
              setStep(2)
            }}
          />
        )}
        {step === 2 && (
          <StepSuccess
            day={preferences.day}
            time={preferences.time}
            onDone={() => handleOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export { MoveYourBookModal }
