import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { MetaProvider } from "./context/PixelContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MetaProvider>
      <App />
    </MetaProvider>
  </StrictMode>
);
