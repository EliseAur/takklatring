import { useMemo, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import { useServices } from "../hooks/useServices";

export default function Services() {
  const { services, error } = useServices();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return services;

    return services.filter((s) => {
      const title = s?.title?.toLowerCase() || "";
      const desc = s?.acf?.tjeneste_short_description?.toLowerCase() || "";
      return title.includes(q) || desc.includes(q);
    });
  }, [services, query]);

  if (error) {
    return (
      <main className="min-h-[50vh]">
        <section className="bg-neutral-100 border-b">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <h1 className="text-4xl md:text-5xl font-headings font-bold text-darkblue">Tjenester</h1>
            <p className="mt-3 text-red-600 max-w-2xl">Feil: {error}</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* Header/intro */}
      <section className="bg-darkblue border-b">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <p className="text-orange font-bold uppercase tracking-wide">Tjenester</p>
          <h1 className="text-4xl md:text-5xl font-headings font-bold text-white mt-2">Alle tjenester</h1>
          <p className="mt-4 text-neutral-200 max-w-2xl">Se oversikt over hva vi tilbyr. Trykk på en tjeneste for å lese mer.</p>

          {/* Søk */}
          <div className="mt-6 max-w-md">
            <label className="sr-only" htmlFor="service-search">
              Søk
            </label>
            <input
              id="service-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Søk i tjenester…"
              className="w-full rounded-sm border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/60
                         focus:outline-none focus:ring-2 focus:ring-orange"
            />
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 bg-neutral-100">
        <div className="max-w-6xl mx-auto px-6">
          {/* Liten “empty state” om services ikke er kommet ennå (global loader vises uansett) */}
          {services.length === 0 ? (
            <div className="bg-white rounded-md border p-8 text-neutral-700">Ingen tjenester funnet (enda). Sjekk at du har publiserte tjenester i WordPress.</div>
          ) : filtered.length > 0 ? (
            <ServiceCard services={filtered} />
          ) : (
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-sm border-l-4 border-orange">
              <p className="text-neutral-800 md:text-lg">Ingen treff. Prøv et annet søk.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
