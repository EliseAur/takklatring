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
  WpContentSection,
} from "../components";
import { useServiceDetail } from "../hooks/useServiceDetail";
import { useSeoMeta } from "../hooks/useSeoMeta";
import { useGalleryLightbox } from "../hooks/useGalleryLightbox";

export default function ServiceDetail() {
  const { slug } = useParams();
  const { service, loading, error } = useServiceDetail(slug);
  const { slides, lightboxIndex, handleContentClick, closeLightbox } = useGalleryLightbox(
    service?.content,
  );

  const forceError = false; // For testing av error-visning

  const seoDescription =
    service?.acf?.tjeneste_short_description ||
    `Les mer om ${service?.title || "denne tjenesten"} som tilbys av Tak- og Fasadeklatring`;

  const breadcrumbSchema = useMemo(() => {
    if (!service?.title) return null;

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
          name: "Tjenester",
          item: "https://takklatring.no/tjenester",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: service.title,
          item: `https://takklatring.no/tjenester/${service.slug}`,
        },
      ],
    };
  }, [service]);

  useSeoMeta({
    title: service?.title || "Tjeneste ikke funnet",
    description: seoDescription,
    canonicalPath: service?.slug ? `/tjenester/${service.slug}` : "/tjenester",
    image: service?.image_url || undefined,
    schema: breadcrumbSchema,
  });

  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0);
    }
  }, [loading]);

  if (loading) {
    return <PageLoader />;
  }

  if (error || forceError) {
    return (
      <main className="">
        <PageHeader eyebrow="Tjeneste" title="Tjeneste ikke funnet" />
        <ErrorAlertPage message="Kunne ikke hente tjeneste fra server. Prøv igjen senere." />
      </main>
    );
  }
  if (!service) {
    return (
      <main>
        <PageHeader eyebrow="Tjeneste" title="Tjeneste ikke funnet" />
        <ErrorAlertPage message="Vi fant ikke tjenesten du prøvde å åpne." />
      </main>
    );
  }

  return (
    <main>
      <DetailHero
        eyebrow="Tjeneste"
        title={service.title}
        description={service?.acf?.tjeneste_short_description}
        imageUrl={service.image_url}
        imageAlt={service.image_alt || ""}
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

      <WpContentSection content={service.content} onContentClick={handleContentClick} />

      <BookingSection />
      <ReviewsSection />

      <ContentLightbox index={lightboxIndex} slides={slides} onClose={closeLightbox} />
    </main>
  );
}
