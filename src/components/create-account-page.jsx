import { useState } from "react"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FloatingLabelInput } from "@/components/ui/floating-label-input"

import agencyHeightLogo from "@/assets/login/agency-height-logo.svg"
import googleIcon from "@/assets/login/google.svg"
import appleIcon from "@/assets/login/apple.svg"
import leadsIllustration from "@/assets/create-account/leads-illustration.png"

// Same "Base" elevation shadow-as-border treatment as the Sign In screen —
// see the note there for why this differs from the dedicated Inputs page.
const FIELD_SHADOW =
  "shadow-[0px_0px_0px_1px_var(--color-black-alpha-16),0px_1px_2px_0px_var(--color-black-alpha-8)]"

function CreateAccountPage({ onBack, onSignIn, onAccountCreated }) {
  const [email, setEmail] = useState("marcus@whitfieldins.com")
  const [password, setPassword] = useState("password123")
  const [confirmPassword, setConfirmPassword] = useState("password123")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    // No backend exists yet (see CLAUDE.md) — this just simulates a request
    // so the loading state has something to demonstrate.
    setSubmitting(true)
    window.setTimeout(() => {
      setSubmitting(false)
      onAccountCreated?.()
    }, 1200)
  }

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-surface-base p-5">
      <img
        src={agencyHeightLogo}
        alt="Agency Height"
        className="absolute top-[42px] left-[44px] h-[60px] w-[153px]"
      />

      <div className="flex h-full w-full">
        {/* Left column — "leads matched" illustration panel */}
        <div className="relative flex h-full flex-1 flex-col overflow-hidden rounded-[24px] bg-surface-highlight">
          <img
            src={leadsIllustration}
            alt=""
            className="pointer-events-none absolute top-[152px] left-1/2 -translate-x-1/2 drop-shadow-[0_0_5px_white]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[614px] bg-gradient-to-b from-white/0 to-white backdrop-blur-[2px]" />
          <div className="absolute bottom-16 left-[47px] flex w-[420px] flex-col gap-16">
            <div className="flex flex-col gap-2">
              <h2 className="m-0 text-[28px] leading-[40px] font-semibold tracking-normal text-text-primary">
                Leads matched to your licenses
              </h2>
              <p className="text-sm leading-5 text-text-secondary">
                Find leads and get recommendations best suited to the licenses and lines you
                already hold.
              </p>
            </div>
            <div className="flex items-start gap-1">
              <div className="h-2 w-[106px] rounded-[12px] bg-brand-solid" />
              <div className="h-2 w-[106px] rounded-[12px] bg-brand-bg" />
              <div className="h-2 w-[106px] rounded-[12px] bg-brand-bg" />
            </div>
          </div>
        </div>

        {/* Right column — form */}
        <div className="flex h-full flex-1 flex-col items-center justify-center gap-[10px]">
          <div className="flex w-full flex-1 items-center justify-center p-8">
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-[420px] flex-col gap-8"
            >
              <button
                type="button"
                onClick={onBack}
                className={cn(
                  "flex h-7 w-fit shrink-0 items-center justify-center gap-2 rounded-full bg-surface-subtle px-3 text-sm leading-5 font-medium text-primary-text",
                  FIELD_SHADOW
                )}
              >
                <ArrowLeft className="size-4" />
                Back
              </button>

              <div className="flex flex-col gap-2">
                <h1 className="m-0 text-[28px] leading-[40px] font-semibold tracking-normal text-text-primary">
                  Create Agent account
                </h1>
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
                    autoComplete="new-password"
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
                <div className="relative">
                  <FloatingLabelInput
                    id="confirm-password"
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={cn(
                      "border-transparent bg-surface-subtle pr-10",
                      FIELD_SHADOW
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-text-tertiary hover:text-text-secondary"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={submitting}
                className="relative w-full overflow-hidden shadow-[0px_0px_0px_1px_rgba(14,50,189,0.16),0px_1px_2px_0px_rgba(65,134,228,0.08)]"
              >
                {submitting ? "Creating account…" : "Create account"}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_0px_1px_rgba(255,255,255,0.08),inset_0px_-2px_0px_1px_rgba(0,0,0,0.08),inset_0px_4px_20px_0px_rgba(255,255,255,0.25),inset_0px_-4px_20px_0px_rgba(0,0,0,0.25)]"
                />
              </Button>

              <div className="flex w-full items-center justify-center gap-1 text-sm">
                <span className="text-text-secondary">Already have an account?</span>
                <button
                  type="button"
                  onClick={onSignIn}
                  className="font-medium text-primary-text"
                >
                  Sign In
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
      </div>
    </div>
  )
}

export { CreateAccountPage }
