import { BookingSection, ReviewsSection, Footer } from "../components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServiceBySlug } from "../api/wp";

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getServiceBySlug(slug);
        setService(data);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, [slug]);

  if (error) return <div>Feil: {error}</div>;
  if (!service) return null;

  return (
    <main>
      {/* Hero / header */}
      <section className="bg-darkblue">
        <div className="max-w-4xl mx-auto md:px-6 md:py-12 lg:py-16 grid gap-5 lg:grid-cols-2 lg:items-center">
          {/* Text */}
          <div className="max-w-4xl px-5 pt-8 pb-4 mx-auto md:px-14 lg:px-4 lg:pb-5 lg:pt-0">
            <p className="text-orange font-bold uppercase tracking-wide">Tjeneste</p>
            <h1 className="text-4xl md:text-[44px] font-headings font-bold text-neutral-100 mt-2">{service.title}</h1>
            <div className="mt-4 h-1 w-20 bg-orange rounded-sm" />

            {service?.acf?.tjeneste_short_description && <p className="mt-3 text-lg text-neutral-300">{service.acf.tjeneste_short_description}</p>}

            <a href="#content" className="mt-3 inline-block text-white font-bold hover:pointer-cursor">
              Les mer →
            </a>

            <div className="mt-5 flex gap-2 md:gap-3">
              <a
                className="flex-1 text-center bg-orange text-darkblue font-headings uppercase text-sm lg:text-lg font-bold py-3 px-6 rounded-sm hover:cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] hover:shadow-xl hover:scale-[1.01]"
                href="/kontakt"
              >
                Få tilbud
              </a>

              <a
                className="flex-1 text-center border border-neutral-100 text-neutral-100 font-headings font-bold uppercase text-sm lg:text-lg px-6 py-3 rounded-sm hover:cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] hover:shadow-xl hover:scale-[1.01]"
                href="/tjenester"
              >
                Alle tjenester
              </a>
            </div>
          </div>
          {/* Image */}
          {service.image_url && (
            <div className="overflow-hidden md:px-14 lg:px-4">
              <img src={service.image_url} alt={service.image_alt || ""} className="w-full aspect-[4/3] sm:aspect-[3/4] object-cover object-center max-h-[500px] md:rounded-md md:shadow-md" />
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section id="content" className="scroll-mt-[125px] lg:scroll-mt-[100px] w-full bg-neutral-100">
        <div className="max-w-4xl mx-auto px-6 pt-0 lg:pt-6 pb-6">
          <article className="wp-content max-w-4xl mx-auto md:px-14 my-10 lg:px-4">
            <div dangerouslySetInnerHTML={{ __html: service.content }} />
          </article>
        </div>
      </section>
      <BookingSection />
      <ReviewsSection />
    </main>
  );
}
