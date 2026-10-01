export default function DetailHero({
  eyebrow,
  title,
  meta,
  description,
  imageUrl,
  imageAlt = "",
  actions,
}) {
  return (
    <section id="top" className="bg-darkblue">
      <div className="max-w-4xl mx-auto md:px-6 md:py-12 lg:py-16 grid gap-5 lg:grid-cols-2 lg:items-center">
        <div className="w-full max-w-4xl px-5 pt-8 pb-4 mx-auto md:px-14 lg:px-4 lg:pb-5 lg:pt-0">
          <p className="text-orange font-bold uppercase tracking-wide">{eyebrow}</p>

          {meta}

          <h1 className="text-4xl md:text-[44px] font-headings font-bold text-neutral-100 mt-2">
            {title}
          </h1>
          <div className="mt-4 h-1 w-20 bg-orange rounded-sm" />

          {description && <p className="mt-3 text-lg text-neutral-300">{description}</p>}

          <a href="#content" className="mt-3 inline-block text-white font-bold cursor-pointer">
            Les mer →
          </a>

          {actions && <div className="mt-5 flex gap-2 md:gap-3">{actions}</div>}
        </div>

        {imageUrl && (
          <div className="overflow-hidden md:px-14 lg:px-4">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full aspect-[4/3] sm:aspect-[3/4] object-cover object-center max-h-[500px] md:rounded-md md:shadow-md"
            />
          </div>
        )}
      </div>
    </section>
  );
}
