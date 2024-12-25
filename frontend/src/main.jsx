import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Make sure this path is correct
import App from "./App.jsx"; // Ensure App.jsx exists and is in the correct path
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
