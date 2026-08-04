import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  ErrorAlertPage,
  PageHeader,
  PageLoader,
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

  const title = aboutUsContent?.title || "Om oss";
  const description =
    aboutUsContent?.acf?.about_us_intro ||
    "Tak og FasadeKlatring AS leverer arbeid på tak og fasader med fokus på sikkerhet, kvalitet og ryddig gjennomføring.";

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
      <section id="top" className="bg-darkblue">
        <div className="max-w-4xl mx-auto md:px-6 md:py-12 lg:py-16 grid gap-5 lg:grid-cols-2 lg:items-center">
          <div className="w-full max-w-4xl px-5 pt-8 pb-4 mx-auto md:px-14 lg:px-4 lg:pb-5 lg:pt-0">
            <p className="text-orange font-bold uppercase tracking-wide">Tjeneste</p>
            <h1 className="text-4xl md:text-[44px] font-headings font-bold text-neutral-100 mt-2">
              {aboutUsContent.title}
            </h1>
            <div className="mt-4 h-1 w-20 bg-orange rounded-sm" />

            {aboutUsContent?.acf?.about_us_intro && (
              <p className="mt-3 text-lg text-neutral-300">{aboutUsContent.acf.about_us_intro}</p>
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

          {aboutUsContent.image_url && (
            <div className="overflow-hidden md:px-14 lg:px-4">
              <img
                src={aboutUsContent.image_url}
                alt={aboutUsContent.image_alt || ""}
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
