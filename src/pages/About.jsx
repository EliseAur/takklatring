import { Link } from "react-router-dom";
import {
  ErrorAlertPage,
  PageHeader,
  PageLoader,
  DetailHero,
  ContentLightbox,
  WpContentSection,
  BookingSection,
  ReviewsSection,
} from "../components";
import { useAboutUsContent } from "../hooks/useAboutUsContent";
import { useSeoMeta } from "../hooks/useSeoMeta";
import { useGalleryLightbox } from "../hooks/useGalleryLightbox";

export default function About() {
  const { aboutUsContent, loading, error } = useAboutUsContent();
  const { slides, lightboxIndex, handleContentClick, closeLightbox } = useGalleryLightbox(
    aboutUsContent?.content,
  );

  const forceError = false; // For testing av error-visning

  const title = "Om oss";
  const description =
    aboutUsContent?.acf?.about_us_intro ||
    "Tak og Fasadeklatring AS leverer profesjonelt arbeid på tak og fasader med fokus på sikkerhet og kvalitet.";

  useSeoMeta({
    title,
    description,
    canonicalPath: "/om-oss",
    image: aboutUsContent?.image_url || undefined,
  });

  if (loading) {
    return <PageLoader />;
  }

  if (error || forceError) {
    return (
      <main>
        <PageHeader eyebrow="Om oss" title="Tak og fasadeklatring AS" />
        <ErrorAlertPage message="Kunne ikke hente innholdet fra WordPress. Prøv igjen senere." />
      </main>
    );
  }

  if (!aboutUsContent) {
    return (
      <main>
        <PageHeader eyebrow="Om oss" title="Tak og fasadeklatring AS" />
        <ErrorAlertPage message="Vi fant ikke innholdet for Om oss-siden." />
      </main>
    );
  }

  return (
    <main>
      <DetailHero
        eyebrow="Om oss"
        title={aboutUsContent.title}
        description={aboutUsContent?.acf?.about_us_intro}
        imageUrl={aboutUsContent.image_url}
        imageAlt={aboutUsContent.image_alt || ""}
        actions={
          <>
            <Link to="/kontakt" className="btn-primary flex-1">
              Få tilbud
            </Link>

            <Link to="/tjenester" className="btn-secondary flex-1">
              Se tjenester
            </Link>
          </>
        }
      />

      <WpContentSection content={aboutUsContent.content} onContentClick={handleContentClick} />

      <BookingSection />
      <ReviewsSection />

      <ContentLightbox index={lightboxIndex} slides={slides} onClose={closeLightbox} />
    </main>
  );
}
