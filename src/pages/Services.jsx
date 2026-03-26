import { useMemo, useState } from "react";
import { ServiceCard, PageHeader, CardsSection, ErrorAlert } from "../components";
import { useServices } from "../hooks/useServices";

export default function Services() {
  const { services, error } = useServices();
  const forceError = false; // For testing av error-visning
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

  if (error || forceError) {
    return (
      <main className="">
        <PageHeader eyebrow="Tjenester" title="Alle tjenester" />
        <section className="py-12 bg-neutral-100">
          <div className="max-w-6xl mx-auto px-6">
            <ErrorAlert message="Kunne ikke hente tjenester fra server. Prøv igjen senere." />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <PageHeader
        eyebrow="Tjenester"
        title="Alle tjenester"
        description="Se oversikt over hva vi tilbyr. Trykk på en tjeneste for å lese mer."
        search={{
          id: "service-search",
          value: query,
          onChange: (e) => setQuery(e.target.value),
          placeholder: "Søk i tjenester…",
        }}
      />
      <CardsSection
        items={services}
        filteredItems={filtered}
        renderItems={(items) => <ServiceCard services={items} />}
        emptyMessage="Ingen tjenester funnet (enda). Sjekk at du har publiserte tjenester i WordPress."
        noResultsMessage="Ingen treff. Prøv et annet søk."
      />
    </main>
  );
}
