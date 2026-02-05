import { Link } from "react-router-dom";
import { usePopularServices } from "../hooks/usePopularServices";

export default function ServicesPreview() {
  const { services, loading, error } = usePopularServices(3);

  if (loading) return null; // evt. legg inn loader senere
  if (error) return <div>Kunne ikke hente tjenester fra WordPress.</div>;

  return (
    <section id="services" className="py-16 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-7 md:px-20">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-headings font-bold text-darkblue">Mest populære tjenester</h2>
            <p className="text-neutral-800 md:text-lg mt-2 pb-1">Et lite utvalg av det vi gjør mest.</p>
          </div>

          {/* Desktop-knapp */}
          <Link to="/tjenester" className="hidden sm:inline-block text-md md:text-lg border-b-3 border-orange font-bold hover:border-b-4 transition-all">
            Alle tjenester →
          </Link>
        </div>
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.id} to={`/tjenester/${service.slug}`} className="group bg-white rounded-sm shadow-md overflow-hidden hover:shadow-lg transition flex flex-col h-full">
              {service.image_url && <img src={service.image_url} alt={service.image_alt || ""} className="h-48 w-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />}

              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-xl text-darkblue mb-2">{service.title}</h3>

                {/* {service?.acf?.tjeneste_subtitle1 && <p className="text-neutral-800 font-bold mb-2">{service.acf.tjeneste_subtitle1}</p>} */}

                {service?.acf?.tjeneste_short_description && <p className="text-neutral-800 break-words mb-2 line-clamp-2">{service.acf.tjeneste_short_description}</p>}

                <p className="font-bold text-darkblue mt-auto pt-2">Les mer →</p>
              </div>
            </Link>
          ))}
        </div>
        {/* Mobil-knapp */}
        <div className="mt-10 sm:hidden">
          <Link to="/tjenester" className="inline-block border-b-3 border-orange font-semibold hover:border-b-4 transition-all">
            Alle tjenester →
          </Link>
        </div>
      </div>
    </section>
  );
}
