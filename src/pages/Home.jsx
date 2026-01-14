import { Hero } from "../components";
import { useFrontPageHero } from "../hooks/useFrontPageHero";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const { hero, loading, error } = useFrontPageHero();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.state]);

  // Viktig: ikke render Hero før data finnes
  if (loading) return null; // evt. en loader
  if (error) {
    console.error(error);
    return <div>Kunne ikke hente innhold fra WordPress.</div>;
  }

  return (
    <>
      <Hero hero={hero} />
      {/* <ServicesSection />
      <BlogSection />
      <ReviewSection /> */}
    </>
  );
}
