import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

function hidePreloader() {
  const preloader = document.getElementById("preloader");
  if (preloader && !preloader.classList.contains("fade-out")) {
    preloader.classList.add("fade-out");
    setTimeout(() => {
      if (preloader.parentNode) preloader.remove();
    }, 700);
  }
}

function showPreloader() {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.remove("fade-out");
  }
}

// Guarantee preloader hides after 5 seconds max
const maxTimeout = setTimeout(() => hidePreloader(), 5000);

// Hide after window loads (with buffer time for React to mount)
window.addEventListener("load", () => {
  setTimeout(() => {
    clearTimeout(maxTimeout);
    hidePreloader();
  }, 2000);
});

// Catch any rendering errors and still hide preloader
try {
  createRoot(document.getElementById("root")!).render(<App />);
} catch (err) {
  console.error("App render error:", err);
  clearTimeout(maxTimeout);
  hidePreloader();
}