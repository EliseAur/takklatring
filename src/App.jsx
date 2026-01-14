import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components";
import Home from "./pages/Home";
// import ProjectDetail from "./pages/ProjectDetail";

/**
 * App component sets up the main application structure and routing.
 *
 * Features:
 * - Provides routing for the Home and ProjectDetail pages
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
  return (
    <Router>
      <Header />
      <main className="flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/projects/:id" element={<ProjectDetail />} /> */}
        </Routes>
      </main>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
