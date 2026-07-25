import { Link } from "react-router-dom";
import { PageHeader } from "../components";
import { useSeoMeta } from "../hooks/useSeoMeta";

export default function About() {
  useSeoMeta({
    title: "Om oss",
    description:
      "Les mer om Tak og FasadeKlatring AS og hvordan vi jobber med trygghet, kvalitet og arbeid i høyden.",
    canonicalPath: "/om-oss",
  });

  return (
    <main>
      <PageHeader
        eyebrow="Om oss"
        title="Trygt arbeid i høyden"
        description="Tak og FasadeKlatring AS leverer arbeid på tak og fasader med fokus på sikkerhet, kvalitet og ryddig gjennomføring."
        actions={
          <>
            <Link
              to="/kontakt"
              className="inline-flex text-center bg-orange text-darkblue font-headings uppercase text-sm lg:text-md px-6 py-3 rounded-sm font-bold hover:shadow-xl transition"
            >
              Bestilling
            </Link>
            <Link
              to="/tjenester"
              className="inline-flex text-center border border-neutral-100/40 text-neutral-100 font-headings tracking-wider uppercase text-sm lg:text-md px-6 py-3 rounded-sm hover:border-orange transition"
            >
              Se tjenester
            </Link>
          </>
        }
      />

      <section className="bg-neutral-100 py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 space-y-6 text-neutral-800">
          <p>
            Vi hjelper kunder med oppdrag på tak og fasader der det kreves trygg tilgang,
            fagkunnskap og god planlegging. Målet er å levere løsninger som er praktiske, sikre og
            holdbare.
          </p>
          <p>
            Arbeidet vårt passer særlig godt for vedlikehold, inspeksjon, reparasjoner og andre
            oppdrag i høyden der tradisjonelle metoder ikke er like effektive.
          </p>
          <p>
            Har du et prosjekt du vil diskutere, kan du gå videre til bestilling eller se tjenestene
            vi tilbyr.
          </p>
        </div>
      </section>
    </main>
  );
}
