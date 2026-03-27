import { Link } from "react-router-dom";
import { usePopularServices } from "../hooks/usePopularServices";
import { CardItem } from "./index";

export default function ServicesPreview() {
  const { services, loading, error } = usePopularServices(3);

  if (loading) return null;
  if (error) return <div className="px-7 md:px-20">Kunne ikke laste tjenester.</div>;
  if (!services?.length) return null;

  return (
    <section id="services" className="py-16">
      <div className="max-w-7xl mx-auto px-7 md:px-20">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-headings font-bold text-darkblue">
              Mest populære tjenester
            </h2>
            <p className="text-neutral-800 md:text-lg mt-2 pb-1">
              Et lite utvalg av det vi gjør mest.
            </p>
          </div>

          <Link
            to="/tjenester"
            className="hidden sm:inline-block text-md md:text-lg border-b-3 border-orange font-bold hover:border-b-4 transition-all"
          >
            Alle tjenester →
          </Link>
        </div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <CardItem
              key={service.id}
              to={`/tjenester/${service.slug}`}
              imageUrl={service.image_url}
              imageAlt={service.image_alt || ""}
              title={service.title}
              description={service?.acf?.tjeneste_short_description}
              ctaText="Les mer →"
            />
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <Link
            to="/tjenester"
            className="inline-block border-b-3 border-orange font-semibold hover:border-b-4 transition-all"
          >
            Alle tjenester →
          </Link>
        </div>
      </div>
    </section>
  );
}
