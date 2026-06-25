import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(<App />);

function hidePreloader() {
  const preloader = document.getElementById("preloader");
  if (preloader && !preloader.classList.contains("fade-out")) {
    preloader.classList.add("fade-out");
    setTimeout(() => preloader.remove(), 600);
  }
}

// Strategy: hide preloader only after app + VK iframe video loaded
window.addEventListener("load", () => {
  // Extra 2000ms for VK iframe video to start loading
  setTimeout(() => {
    hidePreloader();
  }, 2000);
});
