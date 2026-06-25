import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

const preloader = document.getElementById("preloader")!;
const progressBar = document.getElementById("progressBar")!;
const progressPercent = document.getElementById("progressPercent")!;
const progressStatus = document.getElementById("progressStatus")!;

let progress = 0;
let statusText = "Подготовка...";

function updateProgress(value: number, status: string) {
  progress = Math.min(value, 100);
  progressBar.style.width = `${progress}%`;
  progressPercent.textContent = `${Math.round(progress)}%`;
  progressStatus.textContent = status;
}

function hidePreloader() {
  updateProgress(100, "Готово");
  setTimeout(() => {
    preloader.classList.add("fade-out");
    setTimeout(() => preloader.remove(), 700);
  }, 400);
}

function showPreloader() {
  preloader.classList.remove("fade-out");
}

// Guarantee preloader hides after 10 seconds max
const maxTimeout = setTimeout(() => {
  console.warn("Max load time exceeded, hiding preloader");
  hidePreloader();
}, 10000);

// Real progress tracking
updateProgress(10, "Загрузка данных...");

// Track document ready state
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    updateProgress(30, "Обработка стилей...");
  });
} else {
  updateProgress(30, "Обработка стилей...");
}

// Simulate progressive loading with realistic stages
setTimeout(() => updateProgress(50, "Загрузка компонентов..."), 100);
setTimeout(() => updateProgress(70, "Инициализация..."), 300);
setTimeout(() => updateProgress(85, "Подключение данных..."), 600);

// Hide after window loads with buffer time
window.addEventListener("load", () => {
  setTimeout(() => {
    updateProgress(95, "Финальные штрихи...");
    setTimeout(() => {
      clearTimeout(maxTimeout);
      hidePreloader();
    }, 400);
  }, 300);
});

// Catch any rendering errors and still hide preloader
try {
  const root = createRoot(document.getElementById("root")!);
  root.render(<App />);
  updateProgress(92, "Отрисовка интерфейса...");
} catch (err) {
  console.error("App render error:", err);
  clearTimeout(maxTimeout);
  hidePreloader();
}