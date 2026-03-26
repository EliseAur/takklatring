import { Link, useNavigate } from "react-router-dom";
import { usePopularServices } from "../hooks/usePopularServices";
import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";
import { ServiceCard } from "./index";

export default function ServicesPreview() {
  const navigate = useNavigate();
  const { services, error } = usePopularServices(3);
  const { setIsLoading } = useContext(LoadingContext);

  const handleServiceClick = (e, service) => {
    if (!service?.slug) return;
    setIsLoading(true); // start loader før navigasjon
    navigate(`/tjenester/${service.slug}`);
  };

  const handleAllServicesClick = () => {
    setIsLoading(true);
    navigate("/tjenester");
  };

  // if (loading) return null; // evt. legg inn loader senere
  if (error) return <div>Kunne ikke hente tjenester fra WordPress.</div>;

  return (
    <section id="services" className="py-16 ">
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

          {/* Desktop-knapp */}
          <Link
            to="/tjenester"
            onClick={handleAllServicesClick}
            className="hidden sm:inline-block text-md md:text-lg border-b-3 border-orange font-bold hover:border-b-4 transition-all"
          >
            Alle tjenester →
          </Link>
        </div>
        <ServiceCard services={services} onServiceClick={handleServiceClick} />
        {/* Mobil-knapp */}
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
