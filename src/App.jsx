import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Footer, ScrollToTop } from "./components";
import { Home, Services, ServiceDetail, Projects, ProjectDetail, Contact, About } from "./pages";
import { useEffect, useState } from "react";
import { getFooterData, getFrontPageHero } from "./api/wp";

/**
 * App component sets up the application shell and client-side routing.
 *
 * Features:
 * - Provides routes for the home, service, project, contact, and about pages
 * - Renders the shared Header and Footer around every route
 * - Resets scroll position when the route changes
 * - Loads shared hero and footer data for the application shell
 *
 * @component
 * @example
 * return (
 *   <App />
 * )
 */
function App() {
  const [footer, setFooter] = useState(null);
  const [hero, setHero] = useState(null);

  useEffect(() => {
    (async () => {
      const [footerData, heroData] = await Promise.all([getFooterData(), getFrontPageHero()]);

      setFooter(footerData);
      setHero(heroData);
    })();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex flex-col flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tjenester" element={<Services />} />
            <Route path="/tjenester/:slug" element={<ServiceDetail />} />
            <Route path="/prosjekter" element={<Projects />} />
            <Route path="/prosjekter/:slug" element={<ProjectDetail />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/om-oss" element={<About />} />
          </Routes>
        </main>
        <Footer footer={footer} hero={hero} />
      </div>
    </Router>
  );
}

export default App;
