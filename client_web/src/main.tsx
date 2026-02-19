import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SiteContentProvider } from "./context/SiteContentContext";
import { ComicsProvider } from "./context/ComicsContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SiteContentProvider>
        <ComicsProvider>
          <App />
        </ComicsProvider>
      </SiteContentProvider>
    </BrowserRouter>
  </StrictMode>
);
