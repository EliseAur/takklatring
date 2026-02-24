import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import Home from "./pages/Home";
import ServiceDetail from "./pages/ServiceDetail";
import { useEffect, useState } from "react";
import { getFooterData, getFrontPageHero } from "./api/wp";
// import ProjectDetail from "./pages/ProjectDetail";

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
      <Header />
      <main className="flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tjenester/:slug" element={<ServiceDetail />} />
        </Routes>
      </main>
      <Footer footer={footer} hero={hero} />
    </Router>
  );
}

export default App;
