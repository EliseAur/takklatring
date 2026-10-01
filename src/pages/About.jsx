import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  ErrorAlertPage,
  PageHeader,
  PageLoader,
  DetailHero,
  ContentLightbox,
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

      <section
        id="content"
        className="scroll-mt-[125px] lg:scroll-mt-[100px] w-full bg-neutral-100"
      >
        <div className="max-w-4xl mx-auto px-6 pt-0 lg:pt-6 pb-6">
          <article
            className="wp-content max-w-4xl mx-auto md:px-14 my-10 lg:px-4"
            onClick={handleContentClick}
          >
            <div dangerouslySetInnerHTML={{ __html: aboutUsContent.content }} />
          </article>
        </div>
      </section>

      <BookingSection />
      <ReviewsSection />

      <ContentLightbox index={lightboxIndex} slides={slides} onClose={closeLightbox} />
    </main>
  );
}
