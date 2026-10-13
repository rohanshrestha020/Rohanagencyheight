function MarketCard({ logo, name, caption, tags = [], extraCount, onRequest }) {
  return (
    <div className="flex items-center gap-4 border-b border-border-default px-5 py-4 last:border-b-0">
      <img src={logo} alt="" className="size-9 shrink-0 rounded-md object-contain" />
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-sm leading-5 font-medium text-text-primary">{name}</p>
        <p className="text-xs leading-4 text-text-secondary">{caption}</p>
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-4 px-2 py-0.5 text-[11px] leading-4 text-text-primary"
            >
              {tag}
            </span>
          ))}
          {extraCount ? (
            <span className="rounded-full bg-[#bee6fa] px-2 py-0.5 text-[11px] leading-4 text-text-primary">
              +{extraCount}
            </span>
          ) : null}
        </div>
      </div>
      <button
        type="button"
        onClick={onRequest}
        className="shrink-0 rounded-full bg-surface-base px-3.5 py-1.5 text-sm leading-5 font-medium text-text-primary shadow-[0px_0px_0px_1px_var(--color-black-alpha-16),0px_1px_2px_0px_var(--color-black-alpha-8)] hover:bg-surface-highlight"
      >
        Request
      </button>
    </div>
  )
}

export { MarketCard }
