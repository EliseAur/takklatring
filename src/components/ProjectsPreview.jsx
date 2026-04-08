import { Link } from "react-router-dom";
import { useFeaturedProjects } from "../hooks/useFeaturedProjects";
import { CardItem, ErrorAlertSection } from "./index";

export default function ProjectsPreview() {
  const { projects, loading, error } = useFeaturedProjects({ limit: 3 });

  const forceError = false; // For testing av error state

  if (loading) return null;
  if (!projects?.length && !error && !forceError) return null;

  return (
    <section id="projects" className="py-16 bg-darkblue">
      <div className="max-w-7xl mx-auto px-7 md:px-20">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-neutral-100 font-headings text-3xl md:text-4xl font-bold">
              Utførte prosjekter
            </h2>
            <p className="text-neutral-300 md:text-lg mt-2 pb-1">
              Se noen eksempler på arbeid vi har gjort.
            </p>
          </div>
          {!error && !forceError && (
            <Link
              to="/prosjekter"
              className="hidden sm:inline-block md:text-lg border-b-3 border-orange font-bold text-neutral-100 duration-200 transition-all hover:border-b-4"
            >
              Alle prosjekter →
            </Link>
          )}
        </div>

        {error || forceError ? (
          <ErrorAlertSection message="Kunne ikke hente prosjekter fra server. Prøv igjen senere." />
        ) : (
          <>
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <CardItem
                  key={project.id}
                  to={`/prosjekter/${project.slug}`}
                  imageUrl={project.image_url}
                  imageAlt={project.image_alt || ""}
                  date={project?.acf?.project_date}
                  location={project?.acf?.project_location}
                  title={project.title}
                  description={project?.acf?.project_short_text}
                  ctaText="Se prosjekt →"
                />
              ))}
            </div>

            <div className="mt-10 sm:hidden">
              <Link
                to="/prosjekter"
                className="inline-block md:text-lg border-b-3 border-orange font-bold text-neutral-100 duration-200 transition-all hover:border-b-4"
              >
                Alle prosjekter →
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
