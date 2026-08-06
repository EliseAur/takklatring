import {
  Hero,
  ServicesPreview,
  ProjectsPreview,
  BookingSection,
  ReviewsSection,
  ReviewInviteSection,
  PageHeader,
  ErrorAlertPage,
  PageLoader,
} from "../components";
import { useFrontPageHero } from "../hooks/useFrontPageHero";
import { useSeoMeta } from "../hooks/useSeoMeta";
import { useEffect } from "react";

const HOME_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tak og Fasadeklatring AS",
    url: "https://takklatring.no",
    description:
      "Tak- og Fasadeklatring tilbyr taktekking, tilkomstteknikk og håndverk i høyden med fokus på trygghet og kvalitet. Vi utfører inspeksjon, vedlikehold og spesialoppdrag på tak og fasader.",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tak og Fasadeklatring AS",
    url: "https://takklatring.no",
  },
];

/**
 * Home page component that renders the hero and other main sections of the website.
 *
 * Features:
 * - Renders Hero, ServiceSection, BlogSection, and ReviewSection components
 *
 * @component
 * @example
 * return (
 *   <Home />
 * )
 */
export default function Home() {
  const { hero, loading, error } = useFrontPageHero();

  const forceError = false; // For testing av error-visning

  useSeoMeta({
    title: "Hjem",
    description:
      "Tak- og Fasadeklatring tilbyr taktekking, tilkomstteknikk og håndverk i høyden med fokus på trygghet og kvalitet. Vi utfører inspeksjon, vedlikehold og spesialoppdrag på tak og fasader.",
    canonicalPath: "/",
    schema: HOME_SCHEMA,
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
        <PageHeader eyebrow="Hjem" title="Innhold ikke funnet" />
        <ErrorAlertPage message="Kunne ikke hente innhold fra server. Prøv igjen senere." />
      </main>
    );
  }

  return (
    <>
      <Hero hero={hero} />
      <ServicesPreview />
      <BookingSection />
      <ProjectsPreview />
      <ReviewsSection />
      <ReviewInviteSection />
    </>
  );
}
