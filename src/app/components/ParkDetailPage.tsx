import { useState, useEffect, useRef } from "react";
import { MapPin, ArrowLeft, Clock, Trees, Phone, Globe, Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface ParkDetailPageProps {
  parkId: string;
  onBack: () => void;
}

const PARKS_DATA: Record<string, any> = {
  nizhny: {
    name: "Нижний парк",
    fullDescription: "Нижний парк — одна из главных достопримечательностей Липецка. Здесь каскадные пруды, фонтаны, редкие породы деревьев, цветочные клумбы и множество беседок. Парк был заложен в 1820 году.",
    tag: "Исторический",
    area: "46 га",
    coords: [52.603, 39.5998],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d26e1?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop&auto=format",
    ],
    features: ["Пруды", "Фонтаны", "Детская площадка", "Кафе", "Wi-Fi", "Велопрокат"],
    amenities: { parking: true, cafe: true, playground: true, wifi: true, bicycle: true, accessible: false },
    hours: "06:00 – 22:00",
    phone: "+7 (4742) 22-22-22",
    website: "https://nizhny-park.lip.ru",
    history: "Заложен в 1820 году. Изначально создавался как место отдыха горожан.",
    address: "Ул. Интернациональная, 15",
    color: "#a3e635",
    zones: [
      { name: "Каскадные пруды", coords: [52.604, 39.600], description: "Центр парка", color: "#4ade80" },
      { name: "Оранжерея", coords: [52.603, 39.599], description: "Редкие растения", color: "#fbbf24" },
    ],
  },
  pobedy: {
    name: "Парк Победы",
    fullDescription: "Парк Победы — главная рекреационная зона Липецка. Здесь понтонный пляж, амфитеатр, спортивные площадки. Создан в честь Победы в Великой Отечественной войне.",
    tag: "Культурный",
    area: "73 га",
    coords: [52.615, 39.625],
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1542206395-9feb3ed6b610?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1558618047-f4b511e5d2ca?w=400&h=300&fit=crop&auto=format",
    ],
    features: ["Амфитеатр", "Пляж", "Спортзоны", "Прокат", "Кафе", "Туалеты"],
    amenities: { parking: true, cafe: true, playground: true, wifi: true, bicycle: true, accessible: true },
    hours: "05:00 – 24:00",
    phone: "+7 (4742) 33-33-33",
    website: "https://park-pobedy.lip.ru",
    history: "Создан в честь Победы в Великой Отечественной войне.",
    address: "Проспект Победы, 45",
    color: "#fbbf24",
    zones: [
      { name: "Амфитеатр", coords: [52.616, 39.626], description: "Концерты", color: "#f97316" },
      { name: "Пляж", coords: [52.614, 39.624], description: "Зона отдыха", color: "#4ade80" },
    ],
  },
  byxanov: {
    name: "Быханов сад",
    fullDescription: "Быханов сад — ботанический оазис. Известен оранжереей с экзотическими растениями, цветочными клумбами и уютными кафе.",
    tag: "Ботанический",
    area: "12 га",
    coords: [52.595, 39.58],
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&auto=format",
    ],
    features: ["Оранжерея", "Цветники", "Кафе", "Аллеи", "Wi-Fi", "Детская площадка"],
    amenities: { parking: false, cafe: true, playground: true, wifi: true, bicycle: false, accessible: true },
    hours: "08:00 – 20:00",
    phone: "+7 (4742) 44-44-44",
    website: "https://bysad.lip.ru",
    history: "Заложен в конце XIX века.",
    address: "Ул. Ленина, 32",
    color: "#f97316",
    zones: [
      { name: "Оранжерея", coords: [52.596, 39.581], description: "Растения", color: "#a855f7" },
    ],
  },
  gorodskoy: {
    name: "Городской сад",
    fullDescription: "Городской сад — центр города с летней эстрадой, фонтанами и сквером. Идеально для коротких прогулок.",
    tag: "Городской",
    area: "8 га",
    coords: [52.608, 39.612],
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop&auto=format",
    ],
    features: ["Фонтан", "Эстрада", "Газоны", "Кафе", "Детская площадка", "Wi-Fi"],
    amenities: { parking: false, cafe: true, playground: true, wifi: true, bicycle: false, accessible: true },
    hours: "07:00 – 23:00",
    phone: "+7 (4742) 55-55-55",
    website: "https://sad.lip.ru",
    history: "Создан в центре города.",
    address: "Ул. Советская, 100",
    color: "#2dd4bf",
    zones: [
      { name: "Сквер", coords: [52.609, 39.613], description: "Главный вход", color: "#4ade80" },
    ],
  },
  zoo: {
    name: "Липецкий зоопарк",
    fullDescription: "Липецкий зоопарк — уникальное место с редкими животными. Идеально для семейного отдыха.",
    tag: "Семейный",
    area: "25 га",
    coords: [52.59, 39.565],
    image: "https://images.unsplash.com/photo-1474511320723-9a56873867b3?w=800&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1546182990-d1c898c8a0f6?w=400&h=300&fit=crop&auto=format",
    ],
    features: ["Животные", "Павильоны", "Кафе", "Музей", "Игровая зона", "Сувениры"],
    amenities: { parking: true, cafe: true, playground: true, wifi: true, bicycle: false, accessible: true },
    hours: "09:00 – 18:00",
    phone: "+7 (4742) 77-77-77",
    website: "https://zoo.lip.ru",
    history: "Открыт в 2000 году.",
    address: "Ул. Зоологическая, 1",
    color: "#a855f7",
    zones: [
      { name: "Экспозиция", coords: [52.591, 39.566], description: "Животные", color: "#fbbf24" },
    ],
  },
};

const AMENITIES = [
  { key: "parking", label: "Парковка" },
  { key: "cafe", label: "Кафе" },
  { key: "playground", label: "Детская площадка" },
  { key: "wifi", label: "Wi-Fi" },
  { key: "bicycle", label: "Велопрокат" },
  { key: "accessible", label: "Доступная среда" },
];

export function ParkDetailPage({ parkId, onBack }: ParkDetailPageProps) {
  const park = PARKS_DATA[parkId];
  const [currentImage, setCurrentImage] = useState(0);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  if (!park) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center text-white">
        Парк не найден
      </div>
    );
  }

  // Слайды (заставка + галерея)
  const allImages = [park.image, ...(park.gallery || [])];

  // Авто-переключение
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % allImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [allImages.length]);

  // Логика карты
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "&copy; OpenStreetMap contributors",
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
        ],
      },
      center: [park.coords[1], park.coords[0]],
      zoom: 15,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => {
      setMapLoaded(true);
    });

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !park.zones) return;

    park.zones.forEach((zone: any, idx: number) => {
      const el = document.createElement("div");
      const markerContent = document.createElement("div");
      markerContent.style.width = "24px";
      markerContent.style.height = "24px";
      markerContent.style.background = zone.color;
      markerContent.style.border = "3px solid white";
      markerContent.style.borderRadius = "50%";
      markerContent.style.display = "flex";
      markerContent.style.alignItems = "center";
      markerContent.style.justifyContent = "center";
      markerContent.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
      el.appendChild(markerContent);

      new maplibregl.Marker({ element: el })
        .setLngLat([zone.coords[1], zone.coords[0]])
        .setPopup(
          new maplibregl.Popup({ offset: 25 }).setHTML(
            "<strong>" + zone.name + "</strong><br/><span style='color:#666'>" + zone.description + "</span>"
          )
        )
        .addTo(mapRef.current!);
    });
  }, [mapLoaded]);

  const goNext = () => setCurrentImage((prev) => (prev + 1) % allImages.length);
  const goPrev = () => setCurrentImage((prev) => (prev - 1 + allImages.length) % allImages.length);

  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Фон с блюр и затемнение */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: "linear-gradient(to bottom, rgba(5,15,8,0.7), rgba(5,15,8,0.9))",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      />

      {/* Кнопка назад */}
      <button
        onClick={onBack}
        className="fixed top-[88px] left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
        style={{
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "rgba(255,255,255,0.8)",
        }}
      >
        <ArrowLeft size={16} />
        Назад к паркам
      </button>

      <div className="relative z-10 pb-24">
        {/* Полноэкранная галерея */}
        <div className="relative w-full" style={{ height: "100dvh" }}>
          {/* Слайды */}
          {allImages.map((img, idx) => (
            <div
              key={idx}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                opacity: currentImage === idx ? 1 : 0,
                zIndex: currentImage === idx ? 1 : 0,
              }}
            >
              <img src={img} alt={`${park.name} — фото ${idx + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}

          {/* Градиент для читаемости текста */}
          <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(5,15,8,0.3) 0%, transparent 40%, rgba(5,15,8,0.85) 100%)" }} />

          {/* Стрелки переключения */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <ChevronLeft size={20} style={{ color: "rgba(255,255,255,0.8)" }} />
              </button>
              <button
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <ChevronRight size={20} style={{ color: "rgba(255,255,255,0.8)" }} />
              </button>
            </>
          )}

          {/* Название и информация — слева снизу */}
          <div className="absolute bottom-12 left-6 md:left-10 z-20 max-w-2xl">
            <span
              className="inline-block text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-semibold mb-3"
              style={{
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.9)",
                fontFamily: "'Unbounded', sans-serif",
              }}
            >
              {park.tag}
            </span>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-black leading-none"
              style={{ color: "#ffffff", fontFamily: "'Unbounded', sans-serif", letterSpacing: "-0.03em" }}
            >
              {park.name.split(' ').map((word: string, i: number) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h1>
            <div className="flex items-center gap-4 mt-4">
              <span className="flex items-center gap-1.5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                <MapPin size={14} style={{ color: "#a3e635" }} />
                {park.area}
              </span>
              <span className="flex items-center gap-1.5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                <Clock size={14} style={{ color: "#a3e635" }} />
                {park.hours}
              </span>
            </div>
          </div>

          {/* Индикаторы точки */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {allImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: currentImage === idx ? 24 : 8,
                  height: 8,
                  background: currentImage === idx ? "#ffffff" : "rgba(255,255,255,0.3)",
                  borderRadius: currentImage === idx ? 12 : "50%",
                }}
              />
            ))}
          </div>
        </div>

        <div className="px-6 md:px-10 max-w-6xl mx-auto mt-8">
          {/* Описание */}
          <div className="mb-8">
            <h2
              className="text-xl font-bold mb-3"
              style={{ color: "#ffffff", fontFamily: "'Unbounded', sans-serif" }}
            >
              О парке
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              {park.fullDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
            <div>
              {/* Удобства */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4" style={{ color: "#ffffff", fontFamily: "'Unbounded', sans-serif" }}>
                  Удобства
                </h2>
                <div className="flex flex-wrap gap-3">
                  {AMENITIES.map((amenity) => {
                    const has = park.amenities[amenity.key];
                    return (
                      <div
                        key={amenity.key}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
                        style={{
                          background: has ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.05)",
                          border: has ? "1px solid rgba(74,222,128,0.2)" : "1px solid rgba(255,255,255,0.08)",
                          color: has ? "#4ade80" : "rgba(255,255,255,0.3)",
                        }}
                      >
                        {has ? <Check size={14} /> : <X size={14} />}
                        {amenity.label}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Особенности */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4" style={{ color: "#ffffff", fontFamily: "'Unbounded', sans-serif" }}>
                  Особенности
                </h2>
                <div className="flex flex-wrap gap-2">
                  {park.features.map((feature: string) => (
                    <span
                      key={feature}
                      className="text-xs px-3 py-1.5 rounded-full"
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
              </div>
            </div>

            {/* Карта и контакты */}
            <div>
              <div
                className="rounded-3xl overflow-hidden mb-6"
                style={{ border: "1px solid rgba(255,255,255,0.1)", height: "300px" }}
              >
                <div ref={mapContainerRef} className="w-full h-full" />
              </div>

              <div
                className="rounded-3xl p-6"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ color: "#ffffff", fontFamily: "'Unbounded', sans-serif" }}
                >
                  Контакты
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <MapPin size={16} style={{ color: "rgba(255,255,255,0.4)", flexShrink: 0 }} />
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{park.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} style={{ color: "rgba(255,255,255,0.4)", flexShrink: 0 }} />
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{park.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={16} style={{ color: "rgba(255,255,255,0.4)", flexShrink: 0 }} />
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{park.hours}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe size={16} style={{ color: "rgba(255,255,255,0.4)", flexShrink: 0 }} />
                    <a
                      href={park.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:underline"
                      style={{ color: "#a3e635" }}
                    >
                      {park.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* История */}
          {park.history && (
            <div className="mt-8 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <h2 className="text-xl font-bold mb-3" style={{ color: "#ffffff", fontFamily: "'Unbounded', sans-serif" }}>
                История
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                {park.history}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
