import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {
  BookingSection,
  ReviewsSection,
  PageHeader,
  ErrorAlertPage,
  PageLoader,
  ProjectBeforeAfterSection,
} from "../components";
import { useProjectDetail } from "../hooks/useProjectDetail";
import { useSeoMeta } from "../hooks/useSeoMeta";
import { formatProjectDate } from "../utils/formatDate";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { project, loading, error } = useProjectDetail(slug);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const forceError = false; // For testing av error-visning
  const forceEmpty = false;

  const seoDescription =
    project?.acf?.project_short_text ||
    `Se prosjektet ${project?.title || "vårt"} innen tak- og fasadeklatring.`;

  const breadcrumbSchema = useMemo(() => {
    if (!project?.title) return null;

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Hjem",
          item: "https://takklatring.no/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Prosjekter",
          item: "https://takklatring.no/prosjekter",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: project.title,
          item: `https://takklatring.no/prosjekter/${project.slug}`,
        },
      ],
    };
  }, [project]);

  useSeoMeta({
    title: project?.title || "Prosjekt ikke funnet",
    description: seoDescription,
    canonicalPath: project?.slug ? `/prosjekter/${project.slug}` : "/prosjekter",
    image: project?.image_url || undefined,
    schema: breadcrumbSchema,
  });

  const formattedDate = formatProjectDate(project?.acf?.project_date);

  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0);
    }
  }, [loading]);

  const contentSlides = useMemo(() => {
    if (!project?.content) return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(project.content, "text/html");

    const figures = Array.from(doc.querySelectorAll(".wp-block-gallery .wp-block-image"));

    return figures.map((figure) => {
      const img = figure.querySelector("img");
      const caption = figure.querySelector("figcaption");

      return {
        src: img?.getAttribute("src") || img?.src,
        alt: img?.getAttribute("alt") || "",
        caption: caption?.textContent || "",
      };
    });
  }, [project?.content]);

  const beforeAfterSlides = useMemo(() => {
    const items = [];

    if (project?.before_image_url) {
      items.push({
        src: project.before_image_url,
        alt: project.before_image_alt || "Før-bilde",
        caption: "Før",
      });
    }

    if (project?.after_image_url) {
      items.push({
        src: project.after_image_url,
        alt: project.after_image_alt || "Etter-bilde",
        caption: "Etter",
      });
    }

    return items;
  }, [
    project?.before_image_url,
    project?.before_image_alt,
    project?.after_image_url,
    project?.after_image_alt,
  ]);

  const slides = useMemo(() => {
    return [...contentSlides, ...beforeAfterSlides];
  }, [contentSlides, beforeAfterSlides]);

  const handleContentClick = (e) => {
    const figure = e.target.closest(".wp-block-gallery .wp-block-image");
    if (!figure) return;

    const allFigures = Array.from(
      e.currentTarget.querySelectorAll(".wp-block-gallery .wp-block-image"),
    );

    const clickedIndex = allFigures.findIndex((item) => item === figure);

    if (clickedIndex >= 0) {
      e.preventDefault();
      setLightboxIndex(clickedIndex);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  if (error || forceError) {
    return (
      <main className="">
        <PageHeader eyebrow="Prosjekt" title="Prosjekt ikke funnet" />
        <ErrorAlertPage message="Kunne ikke hente prosjekt fra server. Prøv igjen senere." />
      </main>
    );
  }
  if (!project || forceEmpty) {
    return (
      <main>
        <PageHeader eyebrow="Prosjekt" title="Prosjekt ikke funnet" />
        <ErrorAlertPage message="Vi fant ikke prosjektet du prøvde å åpne." />
      </main>
    );
  }

  return (
    <>
      <section id="top" className="bg-darkblue">
        <div className="max-w-4xl  mx-auto md:px-6 md:py-12 lg:py-16 grid gap-5 lg:grid-cols-2 lg:items-center">
          <div className="w-full max-w-4xl px-5 pt-8 pb-4 mx-auto md:px-14 lg:px-4 lg:pb-5 lg:pt-0">
            <p className="text-orange font-bold uppercase tracking-wide flex-1">Prosjekt</p>
            {formattedDate && (
              <p className="text-neutral-300 text-sm mt-1">
                {formattedDate} - {project?.acf?.project_location}
              </p>
            )}
            <h1 className="text-4xl md:text-[44px] font-headings font-bold text-neutral-100 mt-2">
              {project.title}
            </h1>
            <div className="mt-4 h-1 w-20 bg-orange rounded-sm" />

            {project?.acf?.project_short_text && (
              <p className="mt-3 text-lg text-neutral-300">{project.acf.project_short_text}</p>
            )}

            <a href="#content" className="mt-3 inline-block text-white font-bold cursor-pointer">
              Les mer →
            </a>

            <div className="mt-5 flex gap-2 md:gap-3">
              <Link
                to="/kontakt"
                className="flex-1 text-center bg-orange text-darkblue font-headings uppercase text-sm lg:text-md tracking-wider font-bold py-3 px-6 rounded-sm hover:cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] hover:shadow-xl transition"
              >
                Få tilbud
              </Link>

              <Link
                to="/tjenester"
                className="flex-1 text-center border border-neutral-100/40 text-neutral-100 font-headings font-bold tracking-wider uppercase text-sm lg:text-md px-6 py-3 rounded-sm hover:cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] hover:shadow-xl hover:border-orange transition"
              >
                Alle tjenester
              </Link>
            </div>
          </div>

          {project.image_url && (
            <div className="overflow-hidden md:px-14 lg:px-4">
              <img
                src={project.image_url}
                alt={project.image_alt || ""}
                className="w-full aspect-[4/3] sm:aspect-[3/4] object-cover object-center max-h-[500px] md:rounded-md md:shadow-md"
              />
            </div>
          )}
        </div>
      </section>

      <section
        id="content"
        className="scroll-mt-[125px] lg:scroll-mt-[100px] w-full bg-neutral-100"
      >
        <div className="max-w-4xl mx-auto px-6 pt-0 lg:pt-6 pb-12">
          <article
            className="wp-content max-w-4xl mx-auto md:px-14 my-10 lg:px-4"
            onClick={handleContentClick}
          >
            <div dangerouslySetInnerHTML={{ __html: project.content }} />
          </article>

          <ProjectBeforeAfterSection
            project={project}
            contentSlidesLength={contentSlides.length}
            setLightboxIndex={setLightboxIndex}
          />
        </div>
      </section>

      <BookingSection />
      <ReviewsSection />

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        render={{
          slide: ({ slide }) => (
            <div className="flex justify-center items-center h-full w-full">
              <div className="flex flex-col items-center max-w-[90vw]">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="max-h-[80vh] w-auto object-contain rounded-t-sm"
                />

                {slide.caption && (
                  <div className="w-full bg-darkblue text-white text-sm px-4 py-2 text-center rounded-b-sm">
                    {slide.caption}
                  </div>
                )}
              </div>
            </div>
          ),
        }}
      />
    </>
  );
}
