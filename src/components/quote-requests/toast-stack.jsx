import { Alert, AlertDescription } from "@/components/ui/alert"

function ToastStack({ toasts }) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed right-6 bottom-6 z-50 flex w-full max-w-sm flex-col gap-2">
      {toasts.map((toast) => (
        <Alert key={toast.id} status={toast.status ?? "success"} className="shadow-lg">
          <AlertDescription className="text-text-primary">{toast.message}</AlertDescription>
        </Alert>
      ))}
    </div>
  )
}

export { ToastStack }
