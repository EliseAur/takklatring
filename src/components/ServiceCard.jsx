import { Link } from "react-router-dom";

export default function ServiceCard({ services = [], onServiceClick }) {
  return (
    <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => {
        const hasSlug = Boolean(service?.slug);
        const to = hasSlug ? `/tjenester/${service.slug}` : "#";

        return (
          <Link
            key={service.id}
            to={to}
            onClick={(e) => {
              if (!hasSlug) {
                e.preventDefault();
                return;
              }
              onServiceClick?.(service);
            }}
            className="group bg-white rounded-sm shadow-md overflow-hidden hover:shadow-lg transition flex flex-col h-full"
          >
            {service.image_url && <img src={service.image_url} alt={service.image_alt || ""} className="h-48 w-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />}

            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-bold text-xl text-darkblue mb-2">{service.title}</h3>

              {service?.acf?.tjeneste_short_description && <p className="text-neutral-800 break-words mb-2 line-clamp-2">{service.acf.tjeneste_short_description}</p>}

              <p className="font-bold text-darkblue mt-auto pt-2">Les mer →</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
