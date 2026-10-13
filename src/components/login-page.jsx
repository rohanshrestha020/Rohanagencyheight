import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FloatingLabelInput } from "@/components/ui/floating-label-input"

import agencyHeightLogo from "@/assets/login/agency-height-logo.svg"
import googleIcon from "@/assets/login/google.svg"
import appleIcon from "@/assets/login/apple.svg"
import loginSideImage from "@/assets/login/loginsideimage.png"

// Figma's field spec on this screen (bg-surface-subtle + a 2-layer "Base"
// elevation shadow standing in for a border) differs from the flatter
// bg-surface-base/plain-border treatment on the dedicated Inputs page —
// this screen's own spec wins here since the ask was pixel fidelity.
const FIELD_SHADOW =
  "shadow-[0px_0px_0px_1px_var(--color-black-alpha-16),0px_1px_2px_0px_var(--color-black-alpha-8)]"

function LoginPage({ onCreateAccount, onSignedIn }) {
  const [email, setEmail] = useState("marcus@whitfieldins.com")
  const [password, setPassword] = useState("password123")
  const [showPassword, setShowPassword] = useState(false)
  const [keepSignedIn, setKeepSignedIn] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    // No backend exists yet (see CLAUDE.md) — this just simulates a request
    // so the loading state has something to demonstrate.
    setSubmitting(true)
    window.setTimeout(() => {
      setSubmitting(false)
      onSignedIn?.()
    }, 1200)
  }

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-surface-base p-5">
      <img
        src={agencyHeightLogo}
        alt="Agency Height"
        className="absolute top-4 left-4 h-[60px] w-[153px]"
      />

      <div className="flex h-full w-full">
        {/* Left column — form */}
        <div className="flex h-full flex-1 flex-col items-center justify-center gap-[10px]">
          <div className="flex w-full flex-1 items-center justify-center p-8">
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-[420px] flex-col gap-8"
            >
              <div className="flex flex-col gap-2">
                <h2 className="m-0 text-[28px] leading-[40px] font-semibold tracking-normal text-text-primary">
                  Sign In
                </h2>
                <p className="text-sm leading-5 text-text-secondary">
                  Please provide your details
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex w-full items-start gap-5">
                  <Button
                    type="button"
                    variant="secondary"
                    size="default"
                    className={cn(
                      "flex-1 border-transparent text-base leading-6",
                      FIELD_SHADOW
                    )}
                  >
                    <img src={googleIcon} alt="" className="size-5" />
                    Continue with Google
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="default"
                    className={cn(
                      "flex-1 border-transparent text-base leading-6",
                      FIELD_SHADOW
                    )}
                  >
                    <img src={appleIcon} alt="" className="size-5" />
                    Continue with Apple
                  </Button>
                </div>

                <div className="flex w-full items-center gap-3">
                  <div className="h-px flex-1 bg-border-disabled" />
                  <span className="text-xs whitespace-nowrap text-text-tertiary">OR</span>
                  <div className="h-px flex-1 bg-border-disabled" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <FloatingLabelInput
                  id="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn("border-transparent bg-surface-subtle", FIELD_SHADOW)}
                />
                <div className="relative">
                  <FloatingLabelInput
                    id="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={cn(
                      "border-transparent bg-surface-subtle pr-10",
                      FIELD_SHADOW
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-text-tertiary hover:text-text-secondary"
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </div>

              <div className="flex w-full items-center justify-between">
                <label className="flex items-center gap-2">
                  <Checkbox
                    checked={keepSignedIn}
                    onCheckedChange={(v) => setKeepSignedIn(v === true)}
                  />
                  <span className="text-[13px] leading-[18px] text-text-secondary">
                    Keep me signed in
                  </span>
                </label>
                <a href="#forgot-password" className="text-sm leading-5 font-medium text-info-text">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={submitting}
                className="relative w-full overflow-hidden shadow-[0px_0px_0px_1px_rgba(14,50,189,0.16),0px_1px_2px_0px_rgba(65,134,228,0.08)]"
              >
                {submitting ? "Signing in…" : "Sign in"}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_0px_1px_rgba(255,255,255,0.08),inset_0px_-2px_0px_1px_rgba(0,0,0,0.08),inset_0px_4px_20px_0px_rgba(255,255,255,0.25),inset_0px_-4px_20px_0px_rgba(0,0,0,0.25)]"
                />
              </Button>

              <div className="flex w-full items-center justify-center gap-1 text-sm">
                <span className="text-text-secondary">New to Agency Height?</span>
                <button
                  type="button"
                  onClick={onCreateAccount}
                  className="font-medium text-primary-text"
                >
                  Create an account
                </button>
              </div>
            </form>
          </div>

          <div className="flex w-full items-center justify-center py-3">
            <p className="text-sm leading-5 text-text-secondary">
              Are you a customer? Login to your{" "}
              <a href="#customer-portal" className="text-info-text">
                Customer Portal
              </a>
            </p>
          </div>
        </div>

        {/* Right column — dashboard preview panel */}
        <div className="relative flex h-full flex-1 flex-col overflow-hidden">
          <div className="relative h-full w-full overflow-hidden rounded-[24px]">
            <img
              src={loginSideImage}
              alt=""
              className="pointer-events-none absolute inset-0 size-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export { LoginPage }
