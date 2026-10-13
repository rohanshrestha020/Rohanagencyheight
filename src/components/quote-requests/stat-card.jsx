function StatCard({ label, value, meta }) {
  return (
    <div className="flex flex-1 flex-col items-start gap-2 rounded-lg border border-border-default bg-surface-base p-6">
      <p className="w-full text-sm leading-5 text-text-secondary">{label}</p>
      <div className="flex items-baseline gap-2 whitespace-nowrap">
        <p className="text-[28px] leading-10 font-semibold text-text-primary">{value}</p>
        {meta ? <p className="text-sm leading-5 text-text-tertiary">{meta}</p> : null}
      </div>
    </div>
  )
}

export { StatCard }
