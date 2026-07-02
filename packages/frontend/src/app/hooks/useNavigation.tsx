import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import { getPageFromPath } from "@/app/hooks/usePageSetup";

type PageKey = 
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

interface NavigationContextType {
  activePage: PageKey;
  selectedParkId: string | null;
  navigateTo: (page: PageKey) => void;
  selectPark: (parkId: string) => void;
  goBackToParks: () => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activePage, setActivePage] = useState<PageKey>("Главная");
  const [selectedParkId, setSelectedParkId] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Sync with URL on mount and route changes
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/park/")) {
      const parkId = path.split("/")[2];
      if (parkId) {
        setSelectedParkId(parkId);
        setActivePage("Парки");
      }
    } else {
      const { page } = getPageFromPath(path);
      setActivePage(page);
      setSelectedParkId(null);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const navigateTo = useCallback((page: PageKey) => {
    setActivePage(page);
    setSelectedParkId(null);
    
    const paths: Record<PageKey, string> = {
      "Главная": "/",
      "Документы": "/documents",
      "Контакты": "/contacts",
      "Команда": "/team",
      "Маршруты": "/routes",
      "События": "/events",
      "Парки": "/parks",
      "О проекте": "#about",
      "Волонтёрам": "#volunteer",
      "Новости": "#news",
    };
    
    const path = paths[page];
    if (path.startsWith("#")) {
      // Anchor link - just scroll
      const element = document.querySelector(path);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(path);
    }
  }, [navigate]);

  const selectPark = useCallback((parkId: string) => {
    setSelectedParkId(parkId);
    navigate(`/park/${parkId}`);
  }, [navigate]);

  const goBackToParks = useCallback(() => {
    setSelectedParkId(null);
    navigate("/parks");
  }, [navigate]);

  return (
    <NavigationContext.Provider value={{
      activePage,
      selectedParkId,
      navigateTo,
      selectPark,
      goBackToParks,
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}