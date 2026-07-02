import { useState, useMemo } from "react";
import { Search, MapPin, ArrowRight, Filter, Trees, Clock, Accessibility, Map, Wifi, Coffee, Bike, Baby } from "lucide-react";
import { useScrollReveal } from "@/app/hooks/useReveal";
import { useParks } from "@/app/hooks/useParks";

const ALL_FILTERS = [
  { key: "parking", label: "Парковка", icon: MapPin },
  { key: "cafe", label: "Кафе", icon: Coffee },
  { key: "playground", label: "Детская площадка", icon: Baby },
  { key: "wifi", label: "Wi-Fi", icon: Wifi },
  { key: "bicycle", label: "Велопрокат", icon: Bike },
  { key: "accessible", label: "Доступность", icon: Accessibility },
];

type AmenityKey = "parking" | "cafe" | "playground" | "wifi" | "bicycle" | "accessible";

interface ParkUI {
  id: string;
  name: string;
  description: string;
  tag: string;
  area: string;
  image: string;
  features: string[];
  amenities: Record<AmenityKey, boolean>;
  hours: string;
  color: string;
}

function mapParkToUI(park: any): ParkUI {
  const amenities: Record<AmenityKey, boolean> = {
    parking: false,
    cafe: false,
    playground: false,
    wifi: false,
    bicycle: false,
    accessible: false,
  };
  
  return {
    id: park.id,
    name: park.name,
    description: park.shortDescription || park.description || '',
    tag: park.category || 'Парк',
    area: park.area || '',
    image: park.images?.[0]?.url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format',
    features: [],
    amenities,
    hours: '06:00 – 22:00',
    color: park.color || '#a3e635',
  };
}

interface ParksPageProps {
  onSelectPark: (id: string) => void;
}

export function ParksPage({ onSelectPark }: ParksPageProps) {
  const { data: parksData, isLoading, error } = useParks();
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<AmenityKey[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (key: AmenityKey) => {
    setActiveFilters(prev =>
      prev.includes(key) ? prev.filter(f => f !== key) : [...prev, key]
    );
  };

  const parks = useMemo(() => (parksData || []).map(mapParkToUI), [parksData]);

  const filteredParks = useMemo(() => {
    return parks.filter(park => {
      const matchesSearch =
        park.name.toLowerCase().includes(search.toLowerCase()) ||
        park.description.toLowerCase().includes(search.toLowerCase()) ||
        park.features.some(f => f.toLowerCase().includes(search.toLowerCase()));

      const matchesFilters =
        activeFilters.length === 0 ||
        activeFilters.every(key => park.amenities[key as AmenityKey]);

      return matchesSearch && matchesFilters;
    });
  }, [search, activeFilters, parks]);

  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal(0);
  const { ref: filtersRef, isVisible: filtersVisible } = useScrollReveal(100);
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal(200);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full pt-[200px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#a3e635] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Загрузка парков...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full pt-[200px] flex items-center justify-center">
        <div className="text-center">
          <Trees size={48} style={{ color: "rgba(255,255,255,0.2)", margin: "0 auto 16px" }} />
          <p style={{ color: "rgba(255,255,255,0.4)" }}>Ошибка загрузки парков</p>
        </div>
      </div>
    );
  }

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
        ref={headerRef}
        className="relative z-10 px-6 md:px-10 transition-all duration-700 ease-out"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(30px)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
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
              Парки Липецка
            </h1>
            <p
              className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Откройте для себя зелёные уголки города — от исторических садов до современных парковых зон.
            </p>
          </div>

          {/* Поиск и фильтры */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div
              className="flex items-center rounded-2xl px-5 py-4 gap-3 flex-1"
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <Search size={18} style={{ color: "rgba(255,255,255,0.4)", flexShrink: 0 }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск по паркам, особенностям..."
                className="flex-1 bg-transparent text-base outline-none"
                style={{ color: "#e8f5e9", fontFamily: "'Inter', sans-serif" }}
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-5 py-4 rounded-2xl text-xs font-medium transition-all"
              style={{
                background: showFilters ? "#a3e635" : "rgba(255,255,255,0.08)",
                color: showFilters ? "#0a1f0a" : "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Filter size={16} />
              Фильтры {activeFilters.length > 0 && `(${activeFilters.length})`}
            </button>
          </div>

          {/* Фильтры */}
          {showFilters && (
            <div className="flex flex-wrap gap-2 mb-8 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              {ALL_FILTERS.map(filter => {
                const isActive = activeFilters.includes(filter.key as AmenityKey);
                return (
                  <button
                    key={filter.key}
                    onClick={() => toggleFilter(filter.key as AmenityKey)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all"
                    style={{
                      background: isActive ? "#a3e635" : "rgba(255,255,255,0.08)",
                      color: isActive ? "#0a1f0a" : "rgba(255,255,255,0.6)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <filter.icon size={14} />
                    {filter.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Список парков */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredParks.map((park) => (
              <div
                key={park.id}
                className="rounded-3xl overflow-hidden transition-all duration-300 group"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Фото */}
                <div className="relative overflow-hidden" style={{ height: "240px" }}>
                  <img
                    src={park.image}
                    alt={park.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(5,15,8,0.9) 100%)" }} />
                  
                  {/* Тег */}
                  <span
                    className="absolute top-4 left-4 text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full font-semibold"
                    style={{
                      background: "rgba(0,0,0,0.5)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "rgba(255,255,255,0.8)",
                      fontFamily: "'Unbounded', sans-serif",
                    }}
                  >
                    {park.tag}
                  </span>

                  {/* Инфо снизу */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-black mb-1" style={{ color: "#ffffff", fontFamily: "'Unbounded', sans-serif" }}>
                      {park.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <MapPin size={12} style={{ color: "#a3e635" }} />
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {park.area}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Контент */}
                <div className="p-6">
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {park.description}
                  </p>

                  {/* Удобства */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {park.features.map(feature => (
                      <span
                        key={feature}
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          background: "rgba(163,230,53,0.1)",
                          color: "#a3e635",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Ряды инфраструктуры */}
                  <div className="flex items-center gap-3 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{park.hours}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Trees size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{park.area}</span>
                    </div>
                  </div>

                  {/* Кнопка */}
                  <button
                    className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
                    onClick={() => onSelectPark(park.id)}
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    Подробнее о парке <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredParks.length === 0 && (
            <div
              className="rounded-3xl p-12 text-center"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Trees size={48} style={{ color: "rgba(255,255,255,0.2)", margin: "0 auto 16px" }} />
              <p style={{ color: "rgba(255,255,255,0.4)" }}>
                Парки не найдены. Попробуйте изменить фильтры поиска.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}