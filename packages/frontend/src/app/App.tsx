import { useState, useEffect, useRef, Suspense, lazy, Component, ErrorInfo, ReactNode } from "react";
import { useLocation, useNavigate, Link } from "react-router";
import { Search, MapPin, ArrowRight, Trees, Home, TreePine, Map, Calendar, Newspaper, Users, FileText, Phone, Info, HeartHandshake } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { EventCalendar } from "@/app/components/EventCalendar";
import { ParkCard } from "@/app/components/ui/ParkCard";
import { useNavigation } from "@/app/hooks/useNavigation";
import { ErrorBoundary } from "@/app/components/ErrorBoundary";
import { useParks } from "@/app/hooks/useParks";

const DocumentsPage = lazy(() => import("@/app/components/DocumentsPage").then(m => ({ default: m.DocumentsPage })));
const ContactsPage = lazy(() => import("@/app/components/ContactsPage").then(m => ({ default: m.ContactsPage })));
const TeamPage = lazy(() => import("@/app/components/TeamPage").then(m => ({ default: m.TeamPage })));
const RoutesPage = lazy(() => import("@/app/components/RoutesPage").then(m => ({ default: m.RoutesPage })));
const EventsPage = lazy(() => import("@/app/components/EventsPage").then(m => ({ default: m.default })));
const ParksPage = lazy(() => import("@/app/components/ParksPage").then(m => ({ default: m.ParksPage })));
const ParkDetailPage = lazy(() => import("@/app/components/ParkDetailPage").then(m => ({ default: m.ParkDetailPage })));

import { useScrollPosition } from "@/app/hooks/useScrollPosition";
import { useWeather } from "@/app/hooks/useWeather";
import { usePageSetup } from "@/app/hooks/usePageSetup";
import { getWeatherMessage } from "@/app/lib/weather";

import logoImg from "@/imports/logo.png";

import pravoGov from "@/imports/Pravo.gov.ru_-_герб.png";
import mkRf from "@/imports/mk_rf.png";
import logo3White from "@/imports/logo3-white.png";
import iWebp from "@/imports/i.webp";
import gosLogoMobile from "@/imports/gos_logo_mobile_.png";
import emblemCulture from "@/imports/Emblem_of_the_Ministry_of_Culture_of_Russia.svg.png";
import cuQ33RAB from "@/imports/cuQ33RAB.png";
import coatLipetskOblast from "@/imports/Coat_of_arms_of_Lipetsk_Oblast.svg.png";
import coatLipetsk from "@/imports/800px-Coat_of_arms_of_Lipetsk.svg.png";
import img3788336 from "@/imports/3788336.png";

import { NavigationProvider } from "@/app/hooks/useNavigation";

export default function App() {
  return (
    <NavigationProvider>
      <AppInner />
    </NavigationProvider>
  );
}

function mapParkToUI(park: any) {
  return {
    name: park.name,
    desc: park.shortDescription || park.description || '',
    img: park.images?.[0]?.url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format',
    tag: park.category || 'Парк',
    area: park.area || '',
    id: park.id,
  };
}

function AppInner() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [searchFlash, setSearchFlash] = useState(false);
  const weather = useWeather();
  const { activePage, selectedParkId, navigateTo, selectPark, goBackToParks } = useNavigation();
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = ["Главная", "Парки", "Маршруты", "События", "Новости", "Команда"];
  const extraNavItems = ["Документы", "Контакты"];
  const { scrolled } = useScrollPosition();
  const { data: parksData, isLoading } = useParks();

  const handleNavClick = (item: string) => {
    navigateTo(item as any);
  };

  useEffect(() => {
    if (searchFlash) {
      const timer = setTimeout(() => setSearchFlash(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [searchFlash]);

  useEffect(() => {
    if (location.state?.focusSearch) {
      setSearchFlash(true);
      const searchInput = document.querySelector('input[placeholder="Найти парк или событие..."]') as HTMLInputElement;
      if (searchInput) {
        setTimeout(() => {
          searchInput.focus({ preventScroll: true });
          searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  usePageSetup();

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative" style={{ fontFamily: "'Inter', sans-serif", background: "#050f08" }}>
      {/* VIDEO BACKGROUND */}
      <div className="fixed inset-0 z-0 overflow-hidden video-layer">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&auto=format"
          title="Парк фон"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "177.78vh",
            height: "100vh",
            minWidth: "100vw",
            minHeight: "56.25vw",
            pointerEvents: "none",
            border: "none",
            objectFit: "cover",
            display: "block",
          }}
        >
          <source src="https://cdn.jsdelivr.net/gh/xxxderes/parki48lip.ru-video@main/niznipark_1.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
        {/* Light cinematic overlay — keeps video bright but readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, transparent 0%, rgba(5,15,8,0.4) 70%, rgba(5,15,8,0.65) 100%), " +
              "linear-gradient(135deg, rgba(5,15,8,0.35) 0%, rgba(5,15,8,0.15) 40%, rgba(5,15,8,0.30) 100%)",
          }}
        />
        {/* Cinematic vignette + warm film grade */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{
            background:
              "radial-gradient(circle at 70% 20%, rgba(251,191,36,0.25) 0%, transparent 50%), " +
              "radial-gradient(circle at 30% 80%, rgba(74,222,128,0.15) 0%, transparent 40%)"
          }}
        />
        {/* Warm sunlight bokeh orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full" style={{ width: 520, height: 520, top: "-80px", left: "-60px", background: "radial-gradient(circle, rgba(251,191,36,0.30) 0%, transparent 70%)", filter: "blur(40px)" }} />
          <div className="absolute rounded-full" style={{ width: 400, height: 400, top: "30%", right: "-80px", background: "radial-gradient(circle, rgba(251,146,60,0.25) 0%, transparent 70%)", filter: "blur(50px)" }} />
          <div className="absolute rounded-full" style={{ width: 300, height: 300, bottom: "10%", left: "35%", background: "radial-gradient(circle, rgba(252,211,77,0.28) 0%, transparent 70%)", filter: "blur(40px)" }} />
          <div className="absolute rounded-full" style={{ width: 400, height: 400, top: "55%", left: "60%", background: "radial-gradient(circle, rgba(163,230,53,0.18) 0%, transparent 70%)", filter: "blur(60px)" }} />
        </div>
        {/* Scroll darkening overlay */}
        <div
          className="absolute inset-0 pointer-events-none scroll-darken"
          style={{ backgroundColor: "#050f08" }}
        />
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* NAV — original design, expands on menu open */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-3 md:top-4 md:left-4 md:right-4 md:px-10 md:py-3 transition-all duration-500 overflow-hidden rounded-b-2xl md:rounded-2xl nav-will-change"
        style={{
          background: scrolled || menuOpen ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0)",
          backdropFilter: scrolled || menuOpen ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled || menuOpen ? "blur(24px)" : "none",
          border: "1px solid " + (scrolled || menuOpen ? "rgba(255,255,255,0.1)" : "transparent"),
          boxShadow: scrolled || menuOpen ? "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)" : "none",
        }}
      >
        {/* Main nav row - always visible */}
        <div className="flex items-center justify-between">
          <ImageWithFallback
            src={logoImg}
            alt="Культурные пространства Липецка"
            className="h-12 w-auto object-contain"
          />

          <div className="hidden md:flex items-center gap-4">
            {navItems.map(item => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                data-active={activePage === item}
                className="font-semibold transition-all duration-200 tracking-widest uppercase text-[13px] text-white/55 hover:text-[15px] hover:text-white/90 data-[active=true]:text-[15px] data-[active=true]:text-[#a3e635] data-[active=true]:hover:text-[#a3e635]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  background: "transparent",
                  border: "none",
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:bg-white/10 button-will-change"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
              }}
              onClick={() => {
                if (location.pathname !== '/') {
                  setSearchFlash(true);
                  navigate('/', { state: { focusSearch: true } });
                  return;
                }
                setSearchFlash(true);
                const searchInput = document.querySelector('input[placeholder="Найти парк или событие..."]') as HTMLInputElement;
                if (searchInput) {
                  searchInput.focus({ preventScroll: true });
                  searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:bg-white/10 button-will-change"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <div className="relative w-5 h-5 flex flex-col justify-evenly items-center">
                <span
                  className="block w-5 h-[2px] rounded-full bg-white transition-all duration-300"
                  style={{
                    transform: menuOpen ? "translateY(7px) rotate(45deg)" : "translateY(0) rotate(0deg)",
                  }}
                />
                <span
                  className="block w-5 h-[2px] rounded-full bg-white transition-all duration-300"
                  style={{
                    opacity: menuOpen ? 0 : 1,
                  }}
                />
                <span
                  className="block w-5 h-[2px] rounded-full bg-white transition-all duration-300"
                  style={{
                    transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "translateY(0) rotate(0deg)",
                  }}
                />
              </div>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="pt-4 mt-4 max-h-[70vh] overflow-y-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Колонка 1 — Навигация */}
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold mb-3" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Inter', sans-serif" }}>
                  Навигация
                </p>
                <div className="flex flex-col gap-1">
                  {[
                    { label: "Главная", icon: Home, href: "/" },
                    { label: "Парки", icon: TreePine, href: "/parks" },
                    { label: "Маршруты", icon: Map, href: "/routes" },
                    { label: "События", icon: Calendar, href: "/events" },
                    { label: "Новости", icon: Newspaper, href: "#news" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.label;
                    return (
                      <button
                        key={item.label + i}
                        onClick={() => {
                          if (item.href.startsWith("#")) {
                            setMenuOpen(false);
                          } else {
                            navigate(item.href);
                            setMenuOpen(false);
                          }
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left group"
                        style={{
                          background: isActive ? "rgba(163,230,53,0.12)" : "transparent",
                        }}
                      >
                        <Icon size={16} style={{ color: isActive ? "#a3e635" : "rgba(255,255,255,0.4)" }} className="flex-shrink-0 transition-colors group-hover:text-white" />
                        <span className="text-sm font-medium" style={{ color: isActive ? "#a3e635" : "rgba(255,255,255,0.7)", fontFamily: "'Inter', sans-serif" }}>
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Колонка 2 — Сервисы */}
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold mb-3" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Inter', sans-serif" }}>
                  Сервисы
                </p>
                <div className="flex flex-col gap-1">
                  {[
                    { label: "Команда", icon: Users, href: "/team" },
                    { label: "Документы", icon: FileText, href: "/documents" },
                    { label: "Контакты", icon: Phone, href: "/contacts" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.label;
                    return (
                      <button
                        key={item.label + i}
                        onClick={() => {
                          navigate(item.href);
                          setMenuOpen(false);
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left group"
                        style={{
                          background: isActive ? "rgba(163,230,53,0.12)" : "transparent",
                        }}
                      >
                        <Icon size={16} style={{ color: isActive ? "#a3e635" : "rgba(255,255,255,0.4)" }} className="flex-shrink-0 transition-colors group-hover:text-white" />
                        <span className="text-sm font-medium" style={{ color: isActive ? "#a3e635" : "rgba(255,255,255,0.7)", fontFamily: "'Inter', sans-serif" }}>
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Колонка 3 — Информация */}
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold mb-3" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Inter', sans-serif" }}>
                  Информация
                </p>
                <div className="flex flex-col gap-1">
                  {[
                    { label: "О проекте", icon: Info, href: "#about" },
                    { label: "Волонтёрам", icon: HeartHandshake, href: "#volunteer" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.label + i}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left group"
                        style={{ background: "transparent" }}
                      >
                        <Icon size={16} style={{ color: "rgba(255,255,255,0.4)" }} className="flex-shrink-0 transition-colors group-hover:text-white" />
                        <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Inter', sans-serif" }}>
                          {item.label}
                        </span>
                      </button>
                    );
                  })}

                  {/* Заглушка для будущих ссылок — можно удалить */}
                  <div className="mt-2 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="text-[10px] px-3" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Inter', sans-serif" }}>
                      + будущие разделы...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      <Suspense
        fallback={
          <div className="fixed inset-0 z-40 flex items-center justify-center" style={{ background: "#050f08" }}>
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#a3e635] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Загрузка страницы...</p>
            </div>
          </div>
        }
      >
        <ErrorBoundary>
          {activePage === "Документы" && <DocumentsPage />}
        </ErrorBoundary>
        <ErrorBoundary>
          {activePage === "Контакты" && <ContactsPage />}
        </ErrorBoundary>
        <ErrorBoundary>
          {activePage === "Команда" && <TeamPage />}
        </ErrorBoundary>
        <ErrorBoundary>
          {activePage === "Маршруты" && <RoutesPage />}
        </ErrorBoundary>
        <ErrorBoundary>
          {activePage === "События" && <EventsPage />}
        </ErrorBoundary>
        <ErrorBoundary>
          {activePage === "Парки" && !selectedParkId && <ParksPage onSelectPark={selectPark} />}
        </ErrorBoundary>
        <ErrorBoundary>
          {selectedParkId && <ParkDetailPage parkId={selectedParkId} onBack={goBackToParks} />}
        </ErrorBoundary>
      </Suspense>
      {activePage === "Главная" && (
        <>
          {/* HERO — Adaptive height: temperature always visible */}
          <section className="relative z-10 px-6 md:px-10 pt-12 md:pt-[24vh] pb-10 overflow-hidden md:overflow-visible">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 w-full items-end">

          {/* LEFT */}
          <div className="flex flex-col justify-end min-h-[calc(100dvh-120px)] md:min-h-[0px]">
              <h1
                className="leading-tight mb-6"
                style={{
                fontFamily: "'Unbounded', sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              КУЛЬТУРНЫЕ<br />
              <span style={{ background: "linear-gradient(120deg, #a3e635 0%, #4ade80 60%, #2dd4bf 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                ПРОСТРАНСТВА
              </span><br />
              ЛИПЕЦКА
            </h1>

            {/* Search — improved with pulsing glow */}
            <div className="relative mb-8 w-full md:max-w-md">
              <div
                className={`flex items-center rounded-2xl px-5 py-4 gap-3 transition-all duration-500 ${
  searchFlash ? 'ring-[3px] ring-[#a3e635] border-[#a3e635] z-[40]' : 'border border-white/15'
}`}
style={{
  background: "rgba(0,0,0,0.4)",
  ...(searchFlash ? {
    // Равномерное затухание от центра к краям
    boxShadow: "0 0 80px 60px rgba(255, 255, 255, 0.61), 0 0 120px 60px rgba(163, 206, 114, 0.1)",
  } : {
    boxShadow: "none",
  }),
}}
              >
                <Search size={18} style={{ color: "rgba(255,255,255,0.4)", flexShrink: 0 }} />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Найти парк или событие..."
                  className="flex-1 bg-transparent text-base outline-none"
                  style={{ color: "#e8f5e9", fontFamily: "'Inter', sans-serif" }}
                />
              </div>
              {query && parksData && (
                <div
                  className="absolute top-full mt-2 left-0 right-0 rounded-2xl overflow-hidden z-30"
                  style={{
                    background: "rgba(5,15,8,0.97)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
                  }}
                >
                  {parksData
                    .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
                    .map(p => {
                      const uiPark = mapParkToUI(p);
                      return (
                        <div key={p.id} className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-all hover:bg-white/5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                          <MapPin size={12} style={{ color: "#4ade80" }} />
                          <div>
                            <p className="text-sm font-medium" style={{ color: "#e8f5e9" }}>{uiPark.name}</p>
                            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{uiPark.tag} · {uiPark.area}</p>
                          </div>
                        </div>
                      );
                    })}
                  {parksData.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).length === 0 && (
                    <div className="px-4 py-3 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Ничего не найдено</div>
                  )}
                </div>
              )}
            </div>

            {/* CTA */}
               <div className="flex gap-3 flex-col md:flex-row">
              <button
                onClick={() => navigate("/parks")}
                className="hidden md:inline-flex px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  color: "#ffffff",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  letterSpacing: "0.02em",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                НАШИ ПАРКИ
              </button>
               <a
                href="https://lipeck.go2sport.ru/clubs/zelenyy-ostrov/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95 text-center inline-flex items-center justify-center"
                style={{
                  background: "#8dc43f",
                  color: "#0a1f0a",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                }}
              >
                ЗАБРОНИРОВАТЬ ПЛОЩАДКУ
              </a>
            </div>

            {/* Weather info after button */}
            <div className="pt-6">
              <p
                className="text-sm md:text-base font-medium tracking-widest"
                style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'Unbounded', sans-serif" }}
              >
                СЕЙЧАС В ЛИПЕЦКЕ {new Date().getHours().toString().padStart(2, '0')}:{new Date().getMinutes().toString().padStart(2, '0')},
              </p>
              <p
                className="text-sm md:text-base font-medium tracking-widest mt-1"
                style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'Unbounded', sans-serif" }}
              >
                {weather ? `${weather.temp}°C, ${getWeatherMessage(weather.temp, weather.isDay, weather.rain, weather.showers, weather.snowfall, weather.weatherCode)}` : "20°C, Идеальная погода для прогулок!"}
              </p>
            </div>

          </div>

          {/* RIGHT — Calendar + weather */}
          <div className="flex flex-col gap-4 lg:mx-auto">
            <EventCalendar />
          </div>
        </div>
      </section>

      {/* PARKS GRID */}
      <section className="relative z-10 px-6 md:px-10 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-7">
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "#a3e635", fontFamily: "'Unbounded', sans-serif" }}>
                Исследуйте
              </p>
              <h2 className="text-2xl md:text-3xl font-black" style={{ color: "#ffffff", fontFamily: "'Unbounded', sans-serif", letterSpacing: "-0.02em" }}>
                Парки Липецка
              </h2>
            </div>
            <button
              className="hidden md:flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-xl transition-all hover:bg-white/5"
              style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "'Inter', sans-serif" }}
            >
              Все парки <ArrowRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {parksData?.slice(0, 4).map(park => {
              const uiPark = mapParkToUI(park);
              return (
                <ParkCard
                  key={park.id}
                  park={uiPark}
                  onClick={() => {
                    setSelectedParkId(park.id);
                    navigate(`/park/${park.id}`);
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* BANNER */}
      <section className="relative z-10 px-6 md:px-10 py-10">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative rounded-3xl overflow-hidden p-8 md:p-12"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(163,230,53,0.15)",
            }}
          >
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 25% 50%, rgba(163,230,53,0.1) 0%, transparent 60%)" }} />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl md:text-2xl font-black mb-2" style={{ color: "#ffffff", fontFamily: "'Unbounded', sans-serif" }}>
                  Фестиваль цветов<br />
                  <span style={{ color: "#a3e635" }}>«Зелёный Липецк»</span>
                </h3>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif" }}>15 июля · Нижний парк · Весь день</p>
              </div>
              <button
                className="px-6 py-3 rounded-xl text-xs font-bold flex-shrink-0 transition-all hover:opacity-90 hover:scale-105"
                style={{ background: "#a3e635", color: "#071a0e", fontFamily: "'Unbounded', sans-serif", letterSpacing: "0.03em", boxShadow: "0 0 24px rgba(163,230,53,0.25)" }}
              >
                Зарегистрироваться
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* INFORMATIONAL RESOURCES */}
      <section className="relative z-10 px-6 md:px-10 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "#a3e635", fontFamily: "'Unbounded', sans-serif" }}>
              Информационные ресурсы
            </p>
            <h2 className="text-2xl md:text-3xl font-black" style={{ color: "#ffffff", fontFamily: "'Unbounded', sans-serif", letterSpacing: "-0.02em" }}>
              Наши партнёры
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { img: pravoGov, alt: "Pravo.gov.ru" },
              { img: mkRf, alt: "Минкультуры РФ" },
              { img: logo3White, alt: "Партнёр" },
              { img: iWebp, alt: "Ресурс" },
              { img: gosLogoMobile, alt: "Госуслуги" },
              { img: emblemCulture, alt: "Минкультуры РФ" },
              { img: cuQ33RAB, alt: "Партнёр" },
              { img: coatLipetsk, alt: "Город Липецк" },
              { img: coatLipetskOblast, alt: "Липецкая область" },
              { img: img3788336, alt: "Партнёр" },
            ].map((partner, i) => (
              <div
                key={i}
                className="flex items-center justify-center rounded-2xl p-4 transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(30,60,30,0.7)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(74,222,128,0.2)",
                }}
              >
                <ImageWithFallback
                  src={partner.img}
                  alt={partner.alt}
                  className="h-16 w-auto object-contain max-w-full"
                />
              </div>
            ))}
          </div>
        </div>
</section>
        </>
      )}

    </div>
  );
}