import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import SmoothScrollProvider from "./context/SmoothScrollProvider.jsx";

createRoot(document.getElementById("root")).render(
  <SmoothScrollProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </SmoothScrollProvider>
);
