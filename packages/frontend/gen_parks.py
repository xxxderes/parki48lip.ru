import os

os.makedirs('src/app/components', exist_ok=True)

page = '''import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Clock, Trees, Phone, Globe, Check, X } from "lucide-react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface Props { parkId: string; onBack: () => void; }

const DATA: Record<string, any> = {
  nizhny: { name: "Нижний парк", desc: "Главная достопримечательность Липецка. Каскадные пруды, фонтаны.", tag: "Исторический", area: "46 га", coords: [52.603, 39.5998], image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format", gallery: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format","https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop&auto=format"], features: ["Пруды","Фонтаны","Детская площадка","Кафе"], amenities: { parking: true, cafe: true, playground: true, wifi: true, bicycle: true, accessible: false }, hours: "06:00 – 22:00", phone: "+7 (4742) 22-22-22", website: "https://nizhny.lip.ru", history: "Заложен в 1820 году.", address: "Ул. Интернациональная, 15", color: "#a3e635", zones: [{ name: "Каскадные пруды", coords: [52.604, 39.600], description: "Центр парка", color: "#4ade80" }] },
  pobedy: { name: "Парк Победы", desc: "Главная рекреационная зона. Пляж, амфитеатр.", tag: "Культурный", area: "73 га", coords: [52.615, 39.625], image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&auto=format", gallery: ["https://images.unsplash.com/photo-1542206395-9feb3ed6b610?w=400&h=300&fit=crop&auto=format"], features: ["Амфитеатр","Пляж","Спортзоны","Кафе"], amenities: { parking: true, cafe: true, playground: true, wifi: true, bicycle: true, accessible: true }, hours: "05:00 – 24:00", phone: "+7 (4742) 33-33-33", website: "https://pobedy.lip.ru", history: "Создан в честь Победы.", address: "Пр. Победы, 45", color: "#fbbf24", zones: [{ name: "Амфитеатр", coords: [52.616, 39.626], description: "Концерты", color: "#f97316" }] },
  byxanov: { name: "Быханов сад", desc: "Ботанический оазис с оранжереей.", tag: "Ботанический", area: "12 га", coords: [52.595, 39.58], image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop&auto=format", gallery: [], features: ["Оранжерея","Цветники","Кафе"], amenities: { parking: false, cafe: true, playground: true, wifi: true, bicycle: false, accessible: true }, hours: "08:00 – 20:00", phone: "+7 (4742) 44-44-44", website: "https://byxanov.lip.ru", history: "Заложен в XIX веке.", address: "Ул. Ленина, 32", color: "#f97316", zones: [] },
  gorodskoy: { name: "Городской сад", desc: "Центр города с фонтанами.", tag: "Городской", area: "8 га", coords: [52.608, 39.612], image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop&auto=format", gallery: [], features: ["Фонтан","Эстрада","Кафе"], amenities: { parking: false, cafe: true, playground: true, wifi: true, bicycle: false, accessible: true }, hours: "07:00 – 23:00", phone: "+7 (4742) 55-55-55", website: "https://gorodskoy.lip.ru", history: "Создан в центре.", address: "Ул. Советская, 100", color: "#2dd4bf", zones: [] },
  zoo: { name: "Липецкий зоопарк", desc: "Зоопарк с редкими животными.", tag: "Семейный", area: "25 га", coords: [52.59, 39.565], image: "https://images.unsplash.com/photo-1474511320723-9a56873867b3?w=800&h=600&fit=crop&auto=format", gallery: [], features: ["Животные","Павильоны","Кафе"], amenities: { parking: true, cafe: true, playground: true, wifi: true, bicycle: false, accessible: true }, hours: "09:00 – 18:00", phone: "+7 (4742) 77-77-77", website: "https://zoo.lip.ru", history: "Открыт в 2000 году.", address: "Ул. Зоологическая, 1", color: "#a855f7", zones: [] },
}

const AMENITIES = [
  { key: "parking", label: "Парковка" },
  { key: "cafe", label: "Кафе" },
  { key: "playground", label: "Детская площадка" },
  { key: "wifi", label: "Wi-Fi" },
  { key: "bicycle", label: "Велопрокат" },
  { key: "accessible", label: "Доступная среда" },
]

export function ParkDetailPage({ parkId, onBack }: Props) {
  const park = DATA[parkId]
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [showContacts, setShowContacts] = useState(false)

  if (!park) {
    return <div className="min-h-screen w-full flex items-center justify-center text-white">Парк не найден</div>
  }

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "OpenStreetMap contributors",
          },
        },
        layers: [{ id: "osm", type: "raster", source: "osm", minzoom: 0, maxzoom: 19 }],
      },
      center: [park.coords[1], park.coords[0]],
      zoom: 15,
    })
    map.addControl(new maplibregl.NavigationControl(), "top-right")
    map.on("load", () => setMapLoaded(true))
    mapRef.current = map
    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null } }
  }, [parkId])

  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !park.zones) return
    park.zones.forEach((zone: any, idx: number) => {
      const el = document.createElement("div")
      el.innerHTML = \`<div style="width:24px;height:24px;background:\${zone.color};border:3px solid white;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#0a1f0a;font-weight:bold;font-size:12px;box-shadow:0 2px 10px rgba(0,0,0,0.3);">\${idx + 1}</div>\`
      new maplibregl.Marker(el)
        .setLngLat([zone.coords[1], zone.coords[0]])
        .setPopup(new maplibregl.Popup({ offset: 25 }).setHTML(\`<div style="padding:8px;"><strong>\${zone.name}</strong><p>\${zone.description}</p></div>\`))
        .addTo(mapRef.current!)
    })
  }, [mapLoaded, park.zones])

  return (
    <div className="min-h-screen w-full pt-[120px] pb-24 relative" style={{ fontFamily: "'Inter', sans-serif", background: "rgba(5,15,8,0.35)" }}>
      <div className="relative z-10 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <button onClick={onBack} className="flex items-center gap-2 mb-6 text-white/50 hover:text-[#a3e635] transition-all text-sm"><ArrowLeft size={18} /> Вернуться к списку</button>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="relative rounded-3xl overflow-hidden h-80 lg:h-auto">
              <img src={park.image} alt classname="w-full h-full object-cover absolute inset-0" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(5,15,8,0.8) 100%)" }} />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: park.color, fontFamily: "'Unbounded', sans-serif" }}>{park.tag}</p>
              <h1 className="text-3xl md:text-5xl font-black mb-6 text-white" style={{ fontFamily: "'Unbounded', sans-serif" }}>{park.name}</h1>
              <p className="text-base leading-relaxed mb-6 text-white/70">{park.desc}</p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="flex items-center gap-2 text-xs text-white/50"><Clock size={14} /> {park.hours}</span>
                <span className="flex items-center gap-2 text-xs text-white/50"><Trees size={14} /> {park.area}</span>
              </div>
              <button onClick={() => setShowContacts(!showContacts)} className="self-start px-6 py-3 rounded-2xl text-sm font-medium transition-all hover:scale-105" style={{ background: park.color, color: "#0a1f0a" }}>Контакты</button>
              {showContacts && (
                <div className="mt-4 p-4 rounded-2xl" style={{ background: "rg
