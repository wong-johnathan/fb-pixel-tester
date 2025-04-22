import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { MetaProvider } from "./context/PixelContext.jsx";
import Product from './components/Product'
import Microdata from './components/Microdata'
import { BrowserRouter, Routes, Route } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MetaProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/microdata" element={<Microdata />} />
          <Route path="/:id" element={<App />} />
          <Route path="/product/:id" element={<Product />} />
          <Route index element={<App />} />
        </Routes>
      </BrowserRouter>
    </MetaProvider>
  </StrictMode>
);
