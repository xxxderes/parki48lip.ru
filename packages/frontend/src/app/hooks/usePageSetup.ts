import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export type PageKey =
  | "Главная"
  | "Документы"
  | "Контакты"
  | "Команда"
  | "Маршруты"
  | "События"
  | "Парки"
  | "О проекте"
  | "Волонтёрам"
  | "Новости";

export interface NavigationState {
  page: PageKey;
  title: string;
}

export function getPageFromPath(path: string): NavigationState {
  switch (path) {
    case "/documents":
      return { page: "Документы", title: "Документы — Парки Липецка" };
    case "/events":
      return { page: "События", title: "События — Парки Липецка" };
    case "/contacts":
      return { page: "Контакты", title: "Контакты — Парки Липецка" };
    case "/team":
      return { page: "Команда", title: "Команда — Парки Липецка" };
    case "/routes":
      return { page: "Маршруты", title: "Маршруты — Парки Липецка" };
    case "/parks":
      return { page: "Парки", title: "Парки — Парки Липецка" };
    default:
      return path.startsWith("/park/")
        ? { page: "Парки", title: path.split("/")[2] + " — Парки Липецка" }
        : {
            page: "Главная",
            title:
              "Парки Липецка — культурные пространства и события города",
          };
  }
}

export function getPathForPage(item: PageKey): string {
  switch (item) {
    case "Документы":
      return "/documents";
    case "Контакты":
      return "/contacts";
    case "Команда":
      return "/team";
    case "Маршруты":
      return "/routes";
    case "События":
      return "/events";
    case "Парки":
      return "/parks";
    case "Новости":
      return "#news";
    default:
      return "/";
  }
}

export function usePageSetup() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
}
