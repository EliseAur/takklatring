import {
  Hero,
  ServicesPreview,
  ProjectsPreview,
  BookingSection,
  ReviewsSection,
  PageHeader,
  ErrorAlertPage,
  PageLoader,
} from "../components";
import { useFrontPageHero } from "../hooks/useFrontPageHero";
import { useEffect } from "react";

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
    </>
  );
}
