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
    <main className="">
      {/* Hero / header */}
      <section className="bg-darkblue">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <p className="text-orange font-bold uppercase tracking-wide">Tjeneste</p>
          <h1 className="text-4xl md:text-5xl font-headings font-bold text-neutral-100 mt-2">{service.title}</h1>
          <div className="mt-4 h-1 w-20 bg-orange rounded-sm" />

          {service?.acf?.tjeneste_subtitle1 && <p className="mt-4 text-lg text-neutral-300 max-w-2xl">{service.acf.tjeneste_short_description}</p>}

          <div className="mt-8 flex gap-2 md:gap-3 max-w-sm">
            {/* <a className="bg-orange text-darkblue font-headings uppercase font-bold px-6 py-3 rounded-sm" href="/kontakt">
              Bestill befaring
            </a> */}
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
      </section>

      {/* Featured image */}
      {service.image_url && (
        // <section className=" mx-auto my-12 max-w-6xl px-6">
        <section className=" mx-auto">
          <div className="overflow-hidden relative">
            <img src={service.image_url} alt={service.image_alt || ""} className="w-full h-[320px] md:h-[420px] object-cover" />
            {/* subtil overlay for å gi mer “premium” look */}
            <div className="absolute inset-0 bg-gradient-to-b from-darkblue/30 via-transparent to-darkblue/20" />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="w-full bg-neutral-100">
        <div className="max-w-6xl mx-auto px-3 py-6">
          <article className="wp-content max-w-4xl mx-auto px-3 md:px-10">
            <div dangerouslySetInnerHTML={{ __html: service.content }} />
          </article>
        </div>
        <div className="w-full px-3 mx-auto bg-darkblue">
          <div className="px-3 md:px-10 max-w-4xl mx-auto py-10">
            <h2 className="text-3xl md:text-4xl font-headings font-bold text-neutral-100 mb-4">Ønsker du et uforpliktende tilbud?</h2>
            <p className="mt-2 text-neutral-300 text-lg">Send oss en kort beskrivelse, så tar vi kontakt og finner riktig løsning.</p>
            <a
              href="/kontakt"
              className="text-sm lg:text-lg mt-5 inline-block text-center bg-orange text-darkblue font-headings uppercase font-bold py-3 px-12 rounded-sm hover:cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] hover:shadow-xl hover:scale-[1.01]"
            >
              Få tilbud
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
