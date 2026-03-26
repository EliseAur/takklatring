import { Link } from "react-router-dom";
import { useFeaturedProjects } from "../hooks/useFeaturedProjects";

export default function ProjectsPreview() {
  const { projects, loading, error } = useFeaturedProjects({ limit: 3 });

  if (loading) return null;
  if (error) return <div className="px-7 md:px-20">Kunne ikke laste prosjekter.</div>;
  if (!projects?.length) return null;

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

          {/* Desktop-knapp */}
          <Link
            to="/prosjekter"
            className="hidden sm:inline-block md:text-lg border-b-3 border-orange font-bold text-neutral-100 hover:border-b-4 transition-all"
          >
            Alle prosjekter →
          </Link>
        </div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/prosjekter/${project.slug}`}
              className="group bg-white rounded-sm shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col h-full"
            >
              {project.image_url && (
                <img
                  src={project.image_url}
                  alt={project.image_alt || ""}
                  className="h-48 w-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
              )}

              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-xl text-darkblue mb-2">{project.title}</h3>

                {project?.acf?.project_short_text && (
                  <p className="text-neutral-700 break-words mb-2 line-clamp-2">
                    {project.acf.project_short_text}
                  </p>
                )}

                <p className="font-bold text-darkblue mt-auto pt-2">Se prosjekt →</p>
              </div>
            </Link>
          ))}
        </div>
        {/* Mobil-knapp */}
        <div className="mt-10 sm:hidden">
          <Link
            to="/prosjekter"
            className="inline-block md:text-lg border-b-3 border-orange font-bold text-neutral-100 hover:border-b-4 transition-all"
          >
            Alle prosjekter →
          </Link>
        </div>
      </div>
    </section>
  );
}
