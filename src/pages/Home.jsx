import { Hero, ServicesPreview, ProjectsPreview, BookingSection, ReviewsSection } from "../components";
import { useFrontPageHero } from "../hooks/useFrontPageHero";
// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";

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
  const { hero, error } = useFrontPageHero();

  // Sjekk om denne har en effekt på scroll-oppførselen ved innlastning av siden
  // Vurder om dette bør flyttes til App.jsx eller håndteres av en ScrollToTop-komponent
  // useLayoutEffect(() => {
  //   console.log("Home mounted, before scroll:", window.scrollY);
  //   window.scrollTo(0, 0);
  //   console.log("Home mounted, after scroll:", window.scrollY);
  // }, []);

  if (error) {
    console.error(error);
    return <div>Kunne ikke hente innhold fra WordPress.</div>;
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
