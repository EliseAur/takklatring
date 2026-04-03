import { useMemo, useState, useEffect } from "react";
import { PageHeader, CardsSection, CardItem, ErrorAlertPage, PageLoader } from "../components";
import { useProjects } from "../hooks/useProjects";

export default function Projects() {
  const { projects, loading, error } = useProjects();
  const [query, setQuery] = useState("");

  const forceError = false; // For testing av error-visning

  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0);
    }
  }, [loading]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;

    return projects.filter((project) => {
      const title = project?.title?.toLowerCase() || "";
      const desc = project?.acf?.project_short_text?.toLowerCase() || "";
      return title.includes(q) || desc.includes(q);
    });
  }, [projects, query]);

  if (loading) {
    return <PageLoader />;
  }

  if (error || forceError) {
    return (
      <main>
        <PageHeader eyebrow="Prosjekter" title="Alle prosjekter" />
        <ErrorAlertPage message="Kunne ikke hente prosjekter fra server. Prøv igjen senere." />
      </main>
    );
  }

  return (
    <main>
      <PageHeader
        eyebrow="Prosjekter"
        title="Alle prosjekter"
        description="Se eksempler på arbeid vi har utført. Trykk på et prosjekt for å lese mer."
        search={{
          id: "project-search",
          value: query,
          onChange: (e) => setQuery(e.target.value),
          placeholder: "Søk i prosjekter…",
        }}
      />

      <CardsSection
        items={projects}
        filteredItems={filtered}
        renderItems={(items) => (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {items.map((project) => (
              <CardItem
                key={project.id}
                to={`/prosjekter/${project.slug}`}
                imageUrl={project.image_url}
                imageAlt={project.image_alt || ""}
                title={project.title}
                date={project?.acf?.project_date}
                description={project?.acf?.project_short_text}
                ctaText="Se prosjekt →"
              />
            ))}
          </div>
        )}
        emptyMessage="Vi fant ingen prosjekter akkurat nå. Ta gjerne kontakt for mer informasjon."
        noResultsMessage="Ingen treff. Prøv et annet søk."
      />
    </main>
  );
}
