export default function ProjectBeforeAfterSection({
  project,
  contentSlidesLength,
  setLightboxIndex,
}) {
  if (!project?.before_image_url && !project?.after_image_url) return null;

  return (
    <section className="max-w-4xl mx-auto md:px-14 lg:px-4 pb-10">
      <h2 className="text-2xl md:text-3xl font-headings font-bold text-darkblue mb-6">
        Før og etter-bilder
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {project?.before_image_url && (
          <button
            type="button"
            onClick={() => setLightboxIndex(contentSlidesLength)}
            className="text-left group"
          >
            <div className="relative overflow-hidden rounded-sm shadow-sm bg-white">
              <img
                src={project.before_image_url}
                alt={project.before_image_alt || "Før-bilde"}
                className="w-full aspect-[3/4] object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 text-white text-sm px-[10px] py-[6px] text-center bg-darkblue/85">
                Før
              </div>
            </div>
          </button>
        )}

        {project?.after_image_url && (
          <button
            type="button"
            onClick={() =>
              setLightboxIndex(contentSlidesLength + (project?.before_image_url ? 1 : 0))
            }
            className="text-left group"
          >
            <div className="relative overflow-hidden rounded-sm shadow-sm bg-white">
              <img
                src={project.after_image_url}
                alt={project.after_image_alt || "Etter-bilde"}
                className="w-full aspect-[3/4] object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 text-white text-sm px-[10px] py-[6px] text-center bg-darkblue/85">
                Etter
              </div>
            </div>
          </button>
        )}
      </div>
    </section>
  );
}
