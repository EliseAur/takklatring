import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import {
  BookingSection,
  ReviewsSection,
  PageHeader,
  ErrorAlertPage,
  PageLoader,
  DetailHero,
  ContentLightbox,
  ProjectBeforeAfterSection,
} from "../components";
import { useProjectDetail } from "../hooks/useProjectDetail";
import { useSeoMeta } from "../hooks/useSeoMeta";
import { useGalleryLightbox } from "../hooks/useGalleryLightbox";
import { formatProjectDate } from "../utils/formatDate";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { project, loading, error } = useProjectDetail(slug);

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

  const {
    contentSlides,
    slides,
    lightboxIndex,
    setLightboxIndex,
    handleContentClick,
    closeLightbox,
  } = useGalleryLightbox(project?.content, beforeAfterSlides);

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

      <ContentLightbox index={lightboxIndex} slides={slides} onClose={closeLightbox} />
    </>
  );
}
