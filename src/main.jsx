import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { PodcastProvider } from "./context/PodcastContext.jsx";

/**
 * Mounts the "App" React component to the DOM element with the ID "root"
 */
createRoot(document.getElementById("root")).render(
  <PodcastProvider>
    <App />
  </PodcastProvider>,
);
