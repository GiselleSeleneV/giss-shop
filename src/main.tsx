import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { GissShopApp } from "./GissShopApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GissShopApp />
  </StrictMode>,
);
