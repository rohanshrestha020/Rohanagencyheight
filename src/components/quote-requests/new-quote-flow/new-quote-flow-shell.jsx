import { useState } from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { StepRail } from "@/components/quote-requests/new-quote-flow/step-rail"
import { FlowFooter } from "@/components/quote-requests/new-quote-flow/flow-footer"
import { AccountCoverageStep } from "@/components/quote-requests/new-quote-flow/account-coverage-step"
import { QuoteTypeStep } from "@/components/quote-requests/new-quote-flow/quote-type-step"
import { QuestionsGatingStep } from "@/components/quote-requests/new-quote-flow/questions-gating-step"
import { CoverageQuestionnaire } from "@/components/quote-requests/new-quote-flow/coverage-questionnaire"
import { ReviewSubmitStep } from "@/components/quote-requests/new-quote-flow/review-submit-step"
import { QuotesSavedModal } from "@/components/quote-requests/new-quote-flow/quotes-saved-modal"
import { BuildProposalFlow } from "@/components/quote-requests/new-quote-flow/build-proposal-flow"
import { COVERAGE_CATALOG, REQUIRED_DOCUMENTS } from "@/components/quote-requests/new-quote-flow/constants"

function formatDate(date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function buildQuotes(coverageKeys, carrierSelections, perCoverage) {
  const today = new Date()
  const validTo = new Date(today)
  validTo.setMonth(validTo.getMonth() + 6)

  const quotes = []
  let index = 0
  for (const key of coverageKeys) {
    const coverage = COVERAGE_CATALOG.find((c) => c.key === key)
    const carrierIds = carrierSelections[key] ?? []
    const targetPremium = Number(String(perCoverage[key]?.targetPremium ?? "").replace(/[^0-9.]/g, "")) || 4000

    for (const carrierId of carrierIds) {
      const status = index % 5 === 4 ? "Referred" : index % 7 === 6 ? "Declined" : "Quoted"
      const variance = 1 + (((index * 37) % 21) - 10) / 100
      const premium = Math.max(500, Math.round((targetPremium * variance) / 10) * 10)
      quotes.push({
        id: `${key}-${carrierId}`,
        coverageKey: key,
        coverageLabel: coverage.label,
        carrierName: carrierId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        addedOn: formatDate(today),
        validTo: formatDate(validTo),
        proposal:
          status === "Declined"
            ? "—"
            : premium.toLocaleString("en-US", { style: "currency", currency: "USD" }),
        premiumValue: status === "Quoted" ? premium : null,
        status,
        selectedForProposal: status === "Quoted",
      })
      index += 1
    }
  }
  return quotes
}

function NewQuoteFlowShell({ onCreateRequests, onProposalSent, onExit, onNavigate }) {
  const [step, setStep] = useState("account")
  const [completedSteps, setCompletedSteps] = useState([])

  const [account, setAccount] = useState(null)
  const [coverageKeys, setCoverageKeys] = useState([])
  const [carrierSelections, setCarrierSelections] = useState({})
  const [documents, setDocuments] = useState(
    REQUIRED_DOCUMENTS.map((doc) => ({ ...doc, status: "needed" }))
  )

  const [questionsStage, setQuestionsStage] = useState("gating")
  const [gating, setGating] = useState({ priorLoss: "", priorLapse: "" })
  const [perCoverage, setPerCoverage] = useState({})
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState({})
  const [completedCoverageQuestionnaires, setCompletedCoverageQuestionnaires] = useState([])

  const [note, setNote] = useState("")
  const [quotes, setQuotes] = useState([])
  const [createdRequestIds, setCreatedRequestIds] = useState([])
  const [quotesSavedOpen, setQuotesSavedOpen] = useState(false)
  const [proposalActive, setProposalActive] = useState(false)

  function markDone(key) {
    setCompletedSteps((prev) => (prev.includes(key) ? prev : [...prev, key]))
  }

  function toggleCarrier(coverageKey, carrierId) {
    setCarrierSelections((prev) => {
      const current = prev[coverageKey] ?? []
      return {
        ...prev,
        [coverageKey]: current.includes(carrierId)
          ? current.filter((id) => id !== carrierId)
          : [...current, carrierId],
      }
    })
  }

  function toggleDocument(docId) {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              status: doc.status === "uploaded" ? "needed" : "uploaded",
              fileName: `${doc.id}-${(account?.name ?? "account").toLowerCase().replace(/\s+/g, "-")}.pdf`,
            }
          : doc
      )
    )
  }

  function updatePerCoverage(key, patch) {
    setPerCoverage((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }))
  }

  function getQuestionnaireState(key) {
    return questionnaireAnswers[key] ?? { fields: {}, attestations: [] }
  }

  function handleFieldChange(key, fieldKey, value) {
    setQuestionnaireAnswers((prev) => ({
      ...prev,
      [key]: { ...getQuestionnaireState(key), fields: { ...getQuestionnaireState(key).fields, [fieldKey]: value } },
    }))
  }

  function handleAttestationChange(key, index, value) {
    setQuestionnaireAnswers((prev) => {
      const current = getQuestionnaireState(key)
      const attestations = [...current.attestations]
      attestations[index] = value
      return { ...prev, [key]: { ...current, attestations } }
    })
  }

  function handleNext() {
    if (step === "account") {
      if (!account || coverageKeys.length === 0) return
      markDone("account")
      setStep("quote-type")
      return
    }

    if (step === "quote-type") {
      markDone("quote-type")
      setStep("questions")
      setQuestionsStage("gating")
      return
    }

    if (step === "questions") {
      if (questionsStage === "gating") {
        setQuestionsStage(coverageKeys[0])
        return
      }
      setCompletedCoverageQuestionnaires((prev) =>
        prev.includes(questionsStage) ? prev : [...prev, questionsStage]
      )
      const currentIndex = coverageKeys.indexOf(questionsStage)
      if (currentIndex < coverageKeys.length - 1) {
        setQuestionsStage(coverageKeys[currentIndex + 1])
        return
      }
      markDone("questions")
      setQuotes(buildQuotes(coverageKeys, carrierSelections, perCoverage))
      setStep("review")
    }
  }

  function handleBack() {
    if (step === "quote-type") {
      setStep("account")
      return
    }
    if (step === "questions") {
      if (questionsStage === "gating") {
        setStep("quote-type")
        return
      }
      const currentIndex = coverageKeys.indexOf(questionsStage)
      setQuestionsStage(currentIndex === 0 ? "gating" : coverageKeys[currentIndex - 1])
      return
    }
    if (step === "review") {
      setStep("questions")
      setQuestionsStage(coverageKeys[coverageKeys.length - 1])
    }
  }

  function handleEditStep(targetStep) {
    setStep(targetStep)
    if (targetStep === "questions") setQuestionsStage("gating")
  }

  function handleSaveQuotes() {
    const rows = coverageKeys.map((key) => {
      const coverage = COVERAGE_CATALOG.find((c) => c.key === key)
      const coverageQuotes = quotes.filter((q) => q.coverageKey === key)
      const quotedCount = coverageQuotes.filter((q) => q.status === "Quoted").length
      const bestPremium = coverageQuotes.reduce(
        (min, q) => (q.premiumValue != null && (min == null || q.premiumValue < min) ? q.premiumValue : min),
        null
      )
      return {
        account: account.name,
        policyType: coverage.label,
        howQuoted: coverage.route,
        quotes: coverageQuotes.length,
        status: quotedCount > 0 ? "quoted" : "in-review",
        updated: "Just now",
        bestPremium,
        coverageKey: key,
      }
    })
    const ids = onCreateRequests(rows)
    setCreatedRequestIds(ids)
    setQuotesSavedOpen(true)
  }

  function handleSendProposal(emailFields) {
    onProposalSent(createdRequestIds, emailFields)
    onExit()
  }

  if (proposalActive) {
    return (
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar defaultCollapsed activeItem="request-quote" onNavigate={onNavigate} />
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-surface-subtle">
          <AppHeader title="Quote Requests" />
          <div className="flex flex-1 overflow-hidden">
            <StepRail currentStep="review" completedSteps={[...completedSteps, "review"]} onSelectStep={() => {}} />
            <div className="flex-1 overflow-y-auto px-10 py-10">
              <BuildProposalFlow
                account={account}
                quotes={quotes.filter((q) => q.selectedForProposal)}
                onSendProposal={handleSendProposal}
                onBack={() => setProposalActive(false)}
                onExit={onExit}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const questionsNav =
    step === "questions"
      ? {
          coverages: coverageKeys.map((key) => ({
            key,
            label: COVERAGE_CATALOG.find((c) => c.key === key).label,
            done: completedCoverageQuestionnaires.includes(key),
          })),
          activeCoverageKey: questionsStage,
          onSelectCoverage: (key) => setQuestionsStage(key),
        }
      : null

  let content = null
  let footerProps = { onExit, onBack: null, onNext: handleNext, nextLabel: "Next" }

  if (step === "account") {
    content = (
      <AccountCoverageStep
        account={account}
        onAccountChange={setAccount}
        coverageKeys={coverageKeys}
        onCoverageKeysChange={setCoverageKeys}
      />
    )
    footerProps.nextDisabled = !account || coverageKeys.length === 0
  } else if (step === "quote-type") {
    content = (
      <QuoteTypeStep
        coverageKeys={coverageKeys}
        carrierSelections={carrierSelections}
        onToggleCarrier={toggleCarrier}
        documents={documents}
        onToggleDocument={toggleDocument}
      />
    )
    footerProps.onBack = handleBack
  } else if (step === "questions") {
    if (questionsStage === "gating") {
      content = (
        <QuestionsGatingStep
          gating={gating}
          onGatingChange={(patch) => setGating((prev) => ({ ...prev, ...patch }))}
          coverageKeys={coverageKeys}
          perCoverage={perCoverage}
          onPerCoverageChange={updatePerCoverage}
        />
      )
    } else {
      const state = getQuestionnaireState(questionsStage)
      content = (
        <CoverageQuestionnaire
          coverageKey={questionsStage}
          answers={state.fields}
          onFieldChange={(fieldKey, value) => handleFieldChange(questionsStage, fieldKey, value)}
          attestations={state.attestations}
          onAttestationChange={(index, value) => handleAttestationChange(questionsStage, index, value)}
        />
      )
    }
    footerProps.onBack = handleBack
  } else if (step === "review") {
    content = (
      <ReviewSubmitStep
        note={note}
        onNoteChange={setNote}
        account={account}
        coverageKeys={coverageKeys}
        perCoverage={perCoverage}
        gating={gating}
        documents={documents}
        quotes={quotes}
        onToggleQuoteSelection={(id) =>
          setQuotes((prev) =>
            prev.map((q) => (q.id === id ? { ...q, selectedForProposal: !q.selectedForProposal } : q))
          )
        }
        onEditStep={handleEditStep}
        onAddAnotherQuote={() => {}}
      />
    )
    footerProps = { onExit, onBack: handleBack, onNext: handleSaveQuotes, nextLabel: "Save quotes" }
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AppSidebar defaultCollapsed activeItem="request-quote" onNavigate={onNavigate} />
      <div className="flex h-full flex-1 flex-col overflow-hidden bg-surface-subtle">
        <AppHeader title="Quote Requests" />
        <div className="flex flex-1 overflow-hidden">
          <StepRail
            currentStep={step}
            completedSteps={completedSteps}
            onSelectStep={setStep}
            questionsNav={questionsNav}
          />
          <div className="flex-1 overflow-y-auto px-10 py-10">{content}</div>
        </div>
        <FlowFooter {...footerProps} />
      </div>

      <QuotesSavedModal
        open={quotesSavedOpen}
        onOpenChange={setQuotesSavedOpen}
        account={account}
        lineItemCount={quotes.length}
        requestCount={coverageKeys.length}
        onContinueToProposal={() => {
          setQuotesSavedOpen(false)
          setProposalActive(true)
        }}
        onViewQuoteRequest={() => {
          setQuotesSavedOpen(false)
          onExit()
        }}
      />
    </div>
  )
}

export { NewQuoteFlowShell }
