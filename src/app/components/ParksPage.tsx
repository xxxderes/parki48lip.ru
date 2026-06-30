import { useState, useMemo } from "react";
import { Search, MapPin, ArrowRight, Filter, Trees, Clock, Accessibility, Map, Wifi, Coffee, Bike, Baby } from "lucide-react";
import { useScrollReveal } from "@/app/hooks/useReveal";

const PARKS_DATA = [
  {
    id: "nizhny",
    name: "Нижний парк",
    description: "Исторический парк XIX века с каскадными прудами, фонтанами и редкими породами деревьев. Главная достопримечательность города и место для романтических прогулок.",
    tag: "Исторический",
    area: "46 га",
    coords: [52.6030, 39.5998] as [number, number],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format",
    features: ["Пруды", "Фонтаны", "Детская площадка", "Кафе", "Wi-Fi", "Велопрокат"],
    amenities: {
      parking: true,
      cafe: true,
      playground: true,
      wifi: true,
      bicycle: true,
      accessible: false,
    },
    hours: "06:00 – 22:00",
    color: "#a3e635",
  },
  {
    id: "pobedy",
    name: "Парк Победы",
    description: "Крупнейший парк города с аллеями боевой славы, амфитеатром, пляжем и современными спортивными зонами. Идеальное место для активного отдыха.",
    tag: "Культурный",
    area: "73 га",
    coords: [52.6150, 39.6250] as [number, number],
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop&auto=format",
    features: ["Амфитеатр", "Пляж", "Спортзоны", "Прокат", "Кафе", "Туалеты"],
    amenities: {
      parking: true,
      cafe: true,
      playground: true,
      wifi: true,
      bicycle: true,
      accessible: true,
    },
    hours: "05:00 – 24:00",
    color: "#fbbf24",
  },
  {
    id: "byxanov",
    name: "Быханов сад",
    description: "Уютный тенистый сад в центре города с оранжереей, цветниками и кафе среди зелени. Идеально для тихих прогулок и любителей ботаники.",
    tag: "Ботанический",
    area: "12 га",
    coords: [52.5950, 39.5800] as [number, number],
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop&auto=format",
    features: ["Оранжерея", "Цветники", "Кафе", "Аллеи", "Wi-Fi", "Детская"],
    amenities: {
      parking: false,
      cafe: true,
      playground: true,
      wifi: true,
      bicycle: false,
      accessible: true,
    },
    hours: "08:00 – 20:00",
    color: "#f97316",
  },
  {
    id: "gorodskoy",
    name: "Городской сад",
    description: "Сердце старого Липецка: летняя эстрада, фонтан «Времена года» и вековые дубы. Живое место города для коротких отдыхов и встреч.",
    tag: "Городской",
    area: "8 га",
    coords: [52.6080, 39.6120] as [number, number],
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop&auto=format",
    features: ["Фонтан", "Эстрада", "Газоны", "Кафе", "Детская площадка", "Wi-Fi"],
    amenities: {
      parking: false,
      cafe: true,
      playground: true,
      wifi: true,
      bicycle: false,
      accessible: true,
    },
    hours: "07:00 – 23:00",
    color: "#2dd4bf",
  },
  {
    id: "zoo",
    name: "Липецкий зоопарк",
    description: "Уникальная зоология с редкими видами животных, павильонами и интерактивными зонами. Идеально для поездки с детьми и изучения фауны.",
    tag: "Семейный",
    area: "25 га",
    coords: [52.5900, 39.5650] as [number, number],
    image: "https://images.unsplash.com/photo-1564349683136-77e08c1c1535?w=600&h=400&fit=crop&auto=format",
    features: ["Авторитры", "Павильоны", "Кафе", "Музей", "Игровая зона", "Сувениры"],
    amenities: {
      parking: true,
      cafe: true,
      playground: true,
      wifi: true,
      bicycle: false,
      accessible: true,
    },
    hours: "09:00 – 18:00",
    color: "#a855f7",
  },
];

const ALL_FILTERS = [
  { key: "parking", label: "Парковка", icon: MapPin },
  { key: "cafe", label: "Кафе", icon: Coffee },
  { key: "playground", label: "Детская площадка", icon: Baby },
  { key: "wifi", label: "Wi-Fi", icon: Wifi },
  { key: "bicycle", label: "Велопрокат", icon: Bike },
  { key: "accessible", label: "Доступность", icon: Accessibility },
];

type AmenityKey = keyof typeof PARKS_DATA[0]["amenities"];

interface ParksPageProps {
  onSelectPark: (id: string) => void;
}

export function ParksPage({ onSelectPark }: ParksPageProps) {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<AmenityKey[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (key: AmenityKey) => {
    setActiveFilters(prev =>
      prev.includes(key) ? prev.filter(f => f !== key) : [...prev, key]
    );
  };

  const filteredParks = useMemo(() => {
    return PARKS_DATA.filter(park => {
      const matchesSearch =
        park.name.toLowerCase().includes(search.toLowerCase()) ||
        park.description.toLowerCase().includes(search.toLowerCase()) ||
        park.features.some(f => f.toLowerCase().includes(search.toLowerCase()));

      const matchesFilters =
        activeFilters.length === 0 ||
        activeFilters.every(key => park.amenities[key as AmenityKey]);

      return matchesSearch && matchesFilters;
    });
  }, [search, activeFilters]);

  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal(0);
  const { ref: filtersRef, isVisible: filtersVisible } = useScrollReveal(100);
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal(200);

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

                  {/* Точки/хиты на карте изначальны */}
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
