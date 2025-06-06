import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import "./styles/index.css";
// import App from "./App.jsx";
import { Home } from "./pages";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <Home />
  </StrictMode>
);
