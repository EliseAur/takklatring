import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  ErrorAlertPage,
  PageHeader,
  PageLoader,
  DetailHero,
  BookingSection,
  ReviewsSection,
} from "../components";
import { useAboutUsContent } from "../hooks/useAboutUsContent";
import { useSeoMeta } from "../hooks/useSeoMeta";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function About() {
  const { aboutUsContent, loading, error } = useAboutUsContent();
  const [lightboxIndex, setLightboxIndex] = useState(-1);

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

  const slides = useMemo(() => {
    if (!aboutUsContent?.content) return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(aboutUsContent.content, "text/html");

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
  }, [aboutUsContent?.content]);

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
    </main>
  );
}
