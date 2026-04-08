export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  search,
  className = "bg-darkblue border-b",
  divClassName = "max-w-6xl mx-auto px-6 py-12",
}) {
  return (
    <section className={className}>
      <div className={`${divClassName}`}>
        {eyebrow && <p className="text-orange font-bold uppercase tracking-wide">{eyebrow}</p>}

        <h1 className="text-4xl md:text-5xl font-headings font-bold text-white mt-2">{title}</h1>

        {description && <p className="mt-4 text-neutral-200 max-w-2xl">{description}</p>}

        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}

        {/* Search */}
        {search && (
          <div className="mt-6 max-w-md">
            <label className="sr-only" htmlFor={search.id}>
              Søk
            </label>
            <input
              id={search.id}
              type="text"
              value={search.value}
              onChange={search.onChange}
              placeholder={search.placeholder}
              className="w-full rounded-sm border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/60
                         focus:outline-none focus:ring-2 focus:ring-orange"
            />
          </div>
        )}
      </div>
    </section>
  );
}
