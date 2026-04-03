import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import { Home, Services, ServiceDetail, Projects } from "./pages";
import { useEffect, useState } from "react";
import { getFooterData, getFrontPageHero } from "./api/wp";

/**
 * App component sets up the main application structure and routing.
 *
 * Features:
 * - Provides routing for Home and ServiceDetail pages
 * - Renders Header and Footer on all pages
 * - Wraps content in a Router for navigation
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
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex flex-col flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tjenester" element={<Services />} />
            <Route path="/tjenester/:slug" element={<ServiceDetail />} />
            <Route path="/prosjekter" element={<Projects />} />
          </Routes>
        </main>
        <Footer footer={footer} hero={hero} />
      </div>
    </Router>
  );
}

export default App;
