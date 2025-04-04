import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { MetaProvider } from "./context/PixelContext.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MetaProvider>
        <App />
      </MetaProvider>
    </BrowserRouter>
  </StrictMode>
);
