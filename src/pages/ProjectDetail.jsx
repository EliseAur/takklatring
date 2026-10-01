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
  DetailHero,
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
    `Se prosjektet ${project?.title || "vårt"} fra Tak- og Fasadeklatring`;

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
      <DetailHero
        eyebrow="Prosjekt"
        title={project.title}
        meta={
          formattedDate && (
            <p className="text-neutral-300 text-sm mt-1">
              {formattedDate} - {project?.acf?.project_location}
            </p>
          )
        }
        description={project?.acf?.project_short_text}
        imageUrl={project.image_url}
        imageAlt={project.image_alt || ""}
        actions={
          <>
            <Link to="/kontakt" className="btn-primary flex-1">
              Få tilbud
            </Link>

            <Link to="/tjenester" className="btn-secondary flex-1">
              Alle tjenester
            </Link>
          </>
        }
      />

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
