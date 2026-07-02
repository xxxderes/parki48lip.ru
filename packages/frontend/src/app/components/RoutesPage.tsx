import { useState, useEffect, useRef } from "react";
import { Map, Route, Clock, Ruler, ChevronDown, Play, X } from "lucide-react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { usePageReveal } from "@/app/hooks/useReveal";

interface RoutePoint {
  name: string;
  coords: [number, number];
  description?: string;
}

interface Route {
  id: number;
  name: string;
  description: string;
  difficulty: "Легкий" | "Средний" | "Сложный";
  duration: string;
  distance: string;
  parks: string[];
  points: RoutePoint[];
  color: string;
}

const ROUTES: Route[] = [
  {
    id: 1,
    name: "Исторический центр",
    description: "Прогулка по историческим местам Липецка от Нижнего парка через Городской сад к Парку Победы. Узнайте историю города и насладитесь природой.",
    difficulty: "Легкий",
    duration: "1.5 часа",
    distance: "3.2 км",
    parks: ["Нижний парк", "Городской сад", "Парк Победы"],
    color: "#4ade80",
    points: [
      { name: "Нижний парк", coords: [39.5998, 52.6030], description: "Исторический парк XIX века" },
      { name: "Городской сад", coords: [39.6120, 52.6080], description: "Старейший парк города" },
      { name: "Парк Победы", coords: [39.6250, 52.6150], description: "Мемориальный парк" },
    ],
  },
  {
    id: 2,
    name: "Зелёное кольцо",
    description: "Маршрут соединяет все основные парки города в единое кольцо. Идеально для велопрогулок и утренних пробежек.",
    difficulty: "Средний",
    duration: "3 часа",
    distance: "8.5 км",
    parks: ["Нижний парк", "Быханов сад", "Зоопарк", "Парк Победы"],
    color: "#a3e635",
    points: [
      { name: "Нижний парк", coords: [39.5998, 52.6030], description: "Начало маршрута" },
      { name: "Быханов сад", coords: [39.5800, 52.5950], description: "Ботанический сад" },
      { name: "Зоопарк", coords: [39.5650, 52.5900], description: "Липецкий зоопарк" },
      { name: "Парк Победы", coords: [39.6250, 52.6150], description: "Финиш маршрута" },
    ],
  },
  {
    id: 3,
    name: "Вдоль реки",
    description: "Живописный маршрут вдоль реки Липец. Красивые виды на воду, набережная и пляжные зоны летом.",
    difficulty: "Легкий",
    duration: "2 часа",
    distance: "4.1 км",
    parks: ["Нижний парк", " набережная"],
    color: "#2dd4bf",
    points: [
      { name: "Нижний парк", coords: [39.5998, 52.6030] },
      { name: "Набережная", coords: [39.6100, 52.6100] },
      { name: "Пляжная зона", coords: [39.6200, 52.6180] },
    ],
  },
  {
    id: 4,
    name: "К вершинам",
    description: "Подъём на смотровую площадку с панорамой города. Для тех кто любит активный отдых и красивые виды.",
    difficulty: "Сложный",
    duration: "4 часа",
    distance: "6.3 км",
    parks: ["Парк Победы", "Смотровая площадка"],
    color: "#f97316",
    points: [
      { name: "Парк Победы", coords: [39.6250, 52.6150] },
      { name: "Лесная тропа", coords: [39.6350, 52.6200] },
      { name: "Смотровая площадка", coords: [39.6500, 52.6300], description: "Панорама города 360°" },
    ],
  },
  {
    id: 5,
    name: "Семейный",
    description: "Маршрут для семей с детьми. Проходит через детские площадки, зоопарк и Быханов сад с прудами.",
    difficulty: "Легкий",
    duration: "2.5 часа",
    distance: "3.8 км",
    parks: ["Быханов сад", "Зоопарк", "Детский парк"],
    color: "#fbbf24",
    points: [
      { name: "Быханов сад", coords: [39.5800, 52.5950], description: "Пруды с лебедями" },
      { name: "Зоопарк", coords: [39.5650, 52.5900], description: "Животные и птицы" },
      { name: "Детский парк", coords: [39.5750, 52.5980], description: "Площадки и аттракционы" },
    ],
  },
  {
    id: 6,
    name: "Велотур",
    description: "Кольцевой маршрут для велосипедистов. Лучшие парки и достопримечательности за один день.",
    difficulty: "Средний",
    duration: "4 часа",
    distance: "12 км",
    parks: ["Нижний парк", "Городской сад", "Парк Победы", "Быханов сад"],
    color: "#a855f7",
    points: [
      { name: "Нижний парк", coords: [39.5998, 52.6030] },
      { name: "Городской сад", coords: [39.6120, 52.6080] },
      { name: "Парк Победы", coords: [39.6250, 52.6150] },
      { name: "Быханов сад", coords: [39.5800, 52.5950] },
    ],
  },
];

const DIFFICULTY_COLORS = {
  "Легкий": "#4ade80",
  "Средний": "#fbbf24",
  "Сложный": "#f97316",
};

export function RoutesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const filteredRoutes = ROUTES.filter((route) => {
    const matchesSearch =
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.parks.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDifficulty = !difficultyFilter || route.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  useEffect(() => {
    if (selectedRoute && mapContainerRef.current && !mapRef.current) {
      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: {
          version: 8,
          sources: {
            "osm": {
              type: "raster",
              tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
              tileSize: 256,
              attribution: "© OpenStreetMap contributors",
            },
            "terrain": {
              type: "raster-dem",
              tiles: [
                "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"
              ],
              encoding: "terrarium",
              tileSize: 256,
              maxzoom: 14,
            },
          },
          layers: [
            {
              id: "osm",
              type: "raster",
              source: "osm",
              minzoom: 0,
              maxzoom: 19,
            },
            {
              id: "hillshade",
              type: "hillshade",
              source: "terrain",
              maxzoom: 14,
              paint: {
                "hillshade-shadow-color": "#473B24",
                "hillshade-illumination-anchor": "map",
                "hillshade-exaggeration": 0.5,
              },
            },
          ],
          terrain: {
            source: "terrain",
            exaggeration: 1.5,
          },
        },
        center: selectedRoute.points[0].coords,
        zoom: 13,
        pitch: 60,
        bearing: -20,
        maxPitch: 85,
});
      
      map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");
      map.addControl(new maplibregl.ScaleControl({ maxWidth: 100 }), "bottom-left");

      map.on("load", () => {
        setMapLoaded(true);
      });

      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        setMapLoaded(false);
      }
    };
  }, [selectedRoute]);

  useEffect(() => {
    if (mapRef.current && mapLoaded && selectedRoute) {
      const map = mapRef.current;

      // Clear existing markers
      document.querySelectorAll(".route-marker").forEach((el) => el.remove());

      map.flyTo({
        center: selectedRoute.points[0].coords,
        zoom: 14,
        pitch: 65,
        bearing: Math.random() * 30 - 15,
        duration: 2000,
        curve: 1.4,
      });

      selectedRoute.points.forEach((point, idx) => {
        const el = document.createElement("div");
        el.className = "route-marker";
        el.innerHTML = `<div style="
          width: 28px;
          height: 28px;
          background: ${selectedRoute.color};
          border: 3px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0a1f0a;
          font-weight: bold;
          font-size: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        ">${idx + 1}</div>`;

        new maplibregl.Marker(el)
          .setLngLat(point.coords)
          .setPopup(
            new maplibregl.Popup({ offset: 25 }).setHTML(`
              <div style="padding: 8px; font-family: Inter, sans-serif;">
                <strong style="color: #0a1f0a;">${point.name}</strong>
                ${point.description ? `<p style="margin: 4px 0 0; color: #666; font-size: 12px;">${point.description}</p>` : ""}
              </div>
            `)
          )
          .addTo(map);
      });
    }
  }, [mapLoaded, selectedRoute]);

  const clearMap = () => {
    setSelectedRoute(null);
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
  };

  const { ref, isVisible } = usePageReveal();

  return (
    <div
       className="min-h-screen w-full pt-[200px] relative overflow-hidden"
       style={{
         fontFamily: "'Inter', sans-serif",
         background: "rgba(5,15,8,0.35)",
         backdropFilter: "blur(20px)",
         WebkitBackdropFilter: "blur(20px)",
       }}
      >
      <div
        ref={ref}
        className="relative z-10 px-6 md:px-10 pb-24"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
        }}
      >
      </div>
      {/* Map Overlay - shown when route is selected */}
      {selectedRoute && (
        <div className="fixed inset-0 z-50">
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Close button */}
          <button
            onClick={clearMap}
            className="absolute top-24 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: "rgba(255,255,255,0.95)",
              color: "#0a1f0a",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            <X size={24} />
          </button>

          {/* Route info card */}
          <div
            className="absolute bottom-6 left-6 right-6 md:left-auto md:w-96 rounded-3xl p-6"
            style={{
              background: "rgba(5,15,8,0.95)",
              backdropFilter: "blur(24px)",
              border: `1px solid ${selectedRoute.color}`,
              boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${selectedRoute.color}40`,
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  background: `${DIFFICULTY_COLORS[selectedRoute.difficulty]}20`,
                  color: DIFFICULTY_COLORS[selectedRoute.difficulty],
                }}
              >
                {selectedRoute.difficulty}
              </span>
            </div>
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: "#ffffff", fontFamily: "'Unbounded', sans-serif" }}
            >
              {selectedRoute.name}
            </h3>
            <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
              {selectedRoute.description}
            </p>
            <div className="flex items-center gap-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="flex items-center gap-2">
                <Clock size={14} style={{ color: selectedRoute.color }} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {selectedRoute.duration}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler size={14} style={{ color: selectedRoute.color }} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {selectedRoute.distance}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        ref={ref}
        className="relative z-10 px-6 md:px-10 pb-24"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <p
              className="text-xs uppercase tracking-widest font-semibold mb-4"
              style={{ color: "#a3e635", fontFamily: "'Unbounded', sans-serif" }}
            >
              Исследуйте город
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 uppercase"
              style={{
                color: "#ffffff",
                fontFamily: "'Unbounded', sans-serif",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Маршруты
            </h1>
            <p
              className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Прокладывайте идеальные маршруты по паркам и достопримечательностям Липецка
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-8">
            <div
              className="flex items-center rounded-2xl px-4 md:px-5 py-3 md:py-4 gap-3 flex-1"
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <Route size={18} style={{ color: "rgba(255,255,255,0.4)", flexShrink: 0 }} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по маршрутам, паркам..."
                className="flex-1 bg-transparent text-sm md:text-base outline-none min-w-0"
                style={{ color: "#e8f5e9", fontFamily: "'Inter', sans-serif" }}
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {["Легкий", "Средний", "Сложный"].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficultyFilter(difficultyFilter === diff ? null : diff)}
                  className="px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-xs font-medium transition-all flex-shrink-0"
                  style={{
                    background:
                      difficultyFilter === diff
                        ? DIFFICULTY_COLORS[diff as keyof typeof DIFFICULTY_COLORS]
                        : "rgba(255,255,255,0.08)",
                    color: difficultyFilter === diff ? "#0a1f0a" : "rgba(255,255,255,0.6)",
                    border: `1px solid ${
                      difficultyFilter === diff
                        ? DIFFICULTY_COLORS[diff as keyof typeof DIFFICULTY_COLORS]
                        : "rgba(255,255,255,0.1)"
                    }`,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredRoutes.map((route) => (
              <div
                key={route.id}
                className="rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer max-w-full"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(20px)",
                  border: `1px solid ${
                    selectedRoute?.id === route.id
                      ? route.color
                      : "rgba(255,255,255,0.08)"
                  }`,
                  transform: selectedRoute?.id === route.id ? "scale(1.02)" : "scale(1)",
                }}
                onClick={() =>
                  setSelectedRoute(selectedRoute?.id === route.id ? null : route)
                }
              >
                <div className="p-5 md:p-6">
                  <div className="flex items-start justify-between gap-3 mb-3 md:mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="text-xs px-3 py-1 rounded-full font-medium flex-shrink-0"
                          style={{
                            background: `${DIFFICULTY_COLORS[route.difficulty]}20`,
                            color: DIFFICULTY_COLORS[route.difficulty],
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {route.difficulty}
                        </span>
                      </div>
                      <h3
                        className="text-base md:text-lg font-bold mb-0 md:mb-1 break-words"
                        style={{ color: "#ffffff", fontFamily: "'Unbounded', sans-serif" }}
                      >
                        {route.name}
                      </h3>
                    </div>
                    <button
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-all flex-shrink-0"
                      style={{
                        background: selectedRoute?.id === route.id ? route.color : "rgba(255,255,255,0.08)",
                        color: selectedRoute?.id === route.id ? "#0a1f0a" : "rgba(255,255,255,0.6)",
                      }}
                    >
                      {selectedRoute?.id === route.id ? <X size={18} /> : <Play size={18} />}
                    </button>
                  </div>

                  <p className="text-sm mb-4 break-words" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {route.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {route.parks.map((park) => (
                      <span
                        key={park}
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          background: "rgba(163,230,53,0.1)",
                          color: "#a3e635",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {park}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="flex items-center gap-2">
                      <Clock size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif" }}>
                        {route.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ruler size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif" }}>
                        {route.distance}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Map size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif" }}>
                        {route.points.length} точек
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="h-2"
                  style={{
                    background: `linear-gradient(90deg, ${route.color} 0%, ${route.color}00 100%)`,
                  }}
                />
              </div>
            ))}
          </div>

          {filteredRoutes.length === 0 && (
            <div
              className="rounded-3xl p-12 text-center"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Route size={48} style={{ color: "rgba(255,255,255,0.2)", margin: "0 auto 16px" }} />
              <p style={{ color: "rgba(255,255,255,0.4)" }}>
                Маршруты не найдены. Попробуйте изменить фильтры.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}