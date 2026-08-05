import { useMemo, useState, useEffect } from "react";
import { PageHeader, CardsSection, CardItem, ErrorAlertPage, PageLoader } from "../components";
import { useServices } from "../hooks/useServices";
import { useSeoMeta } from "../hooks/useSeoMeta";

export default function Services() {
  const { services, loading, error } = useServices();
  const [query, setQuery] = useState("");

  const forceError = false; // For testing av error-visning

  useSeoMeta({
    title: "Tjenester",
    description: "Se hva vi tilbyr av tjenester innen tak- og fasadearbeid og arbeid i høyden.",
    canonicalPath: "/tjenester",
  });

  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0);
    }
  }, [loading]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return services;

    return services.filter((s) => {
      const title = s?.title?.toLowerCase() || "";
      const desc = s?.acf?.tjeneste_short_description?.toLowerCase() || "";
      return title.includes(q) || desc.includes(q);
    });
  }, [services, query]);

  if (loading) {
    return <PageLoader />;
  }

  if (error || forceError) {
    return (
      <main className="">
        <PageHeader eyebrow="Tjenester" title="Alle tjenester" />
        <ErrorAlertPage message="Kunne ikke hente tjenester fra server. Prøv igjen senere." />
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
        renderItems={(items) => (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {items.map((service) => (
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
        )}
        emptyMessage="Vi fant ingen tjenester akkurat nå. Ta gjerne kontakt for mer informasjon."
        noResultsMessage="Ingen treff. Prøv et annet søk."
      />
    </main>
  );
}
