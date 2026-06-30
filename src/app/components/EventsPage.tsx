import { useState, useMemo } from "react";
import { Search, Calendar, MapPin, Clock, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/app/components/ui/dialog";
import demo1 from "@/imports/demo1.jpg";
import { usePageReveal } from "@/app/hooks/useReveal";

interface EventItem {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  fullDescription: string;
  date: string;
  time: string;
  location: string;
  park: string;
  category: string;
  price: string | null;
  registration: boolean;
  registrationLink: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

const CATEGORIES = ["Все", "Концерты", "Выставки", "Детям", "Спорт", "Экскурсии", "Фестивали", "Мастер-классы"];

const DATE_FILTERS = [
  { label: "Все", value: "all" },
  { label: "Сегодня", value: "today" },
  { label: "Завтра", value: "tomorrow" },
  { label: "Эта неделя", value: "week" },
  { label: "Месяц", value: "month" },
];

const EVENTS: EventItem[] = [
  {
    id: "zeleny-jubilee",
    title: "Фестиваль уличного кино «Зелёный»",
    shortTitle: "Фестиваль уличного кино",
    description: "Бесплатный показ лучших отечественных и международных фильмов под открытым небом.",
    fullDescription: "Фестиваль уличного кино «Зелёный» — это ежегодное мероприятие, на котором демонстрируются лучшие отечественные и международные фильмы под открытым небом. В программе пять вечеров, конкурсная программа, интерактивные инсталяции и зона фудкорта. Пристигнуте собственное одеяло и плед, чтобы комфортно расположиться перед экраном. ",
    date: "2026-07-15",
    time: "19:00",
    location: "Нижний парк, сцена у набережной",
    park: "Нижний парк",
    category: "Фестивали",
    price: null,
    registration: false,
    registrationLink: "#",
    image: demo1,
    tags: ["Кино", "Бесплатно", "Вечер"],
    featured: true,
  },
  {
    id: "lipetsk-sound",
    title: "Музыкальный фестиваль «Lipetsk Sound»",
    shortTitle: "Lipetsk Sound",
    description: "Двухдневный open-air фестиваль с участием известных российских и региональных музыкантов.",
    fullDescription: "«Lipetsk Sound» — крупнейший музыкальный open-air в регионе. На двух сценах Нижнего парка выступят известные исполнители инди, рока и электроники. Площадка рассчитана на пять тысяч гостей, программа растянута на два дня: 20 июля — инди/рок, 21 июля — электроника.",
    date: "2026-07-20",
    time: "15:00 – 00:00",
    location: "Нижний парк, центральная поляна",
    park: "Нижний парк",
    category: "Концерты",
    price: "от 1 200 ₽",
    registration: true,
    registrationLink: "https://lipeck.go2sport.ru/events/lipetsk-sound",
    image: demo1,
    tags: ["Музыка", "Билеты", "Парк"],
    featured: true,
  },
  {
    id: "park-sketching",
    title: "Пленэр в Городском саду",
    shortTitle: "Пленэр",
    description: "Открытый мастер-класс по городскому скетчингу под руководством местных художников.",
    fullDescription: "Приглашаем всех желающих принять участие в пленэре в Городском саду. Под руководством известных липецких художников вы научитесь рисовать архитектурные и пейзажные скетчи в тетради. Материалы предоставляются. Продолжительность 3 часа. Для участников предусмотреть чай-пause в уютной зоне с верандой.",
    date: "2026-07-05",
    time: "10:00",
    location: "Городской сад, возле фонтана",
    park: "Городской сад",
    category: "Мастер-классы",
    price: "500 ₽",
    registration: true,
    registrationLink: "#",
    image: demo1,
    tags: ["Рисование", "Сад", "Обучение"],
  },
  {
    id: "sunset-yoga",
    title: "Йога на закате у набережной",
    shortTitle: "Йога на закате",
    description: "Практика под открытым небом с просмотром заката. П Anchored йога-instructor события.",
    fullDescription: "Присоединитесь к ежenedельной практике йоги на берегу реки Воронеж. В программе хатха-йога, дыхательные практики и медитация. Занятие открыто для участников любого уровня. Необходимо взять мат и удобную одежду. В случае плохой погоды мероприятие переносится.",
    date: "2026-07-08",
    time: "19:00 – 20:30",
    location: "Нижний парк, набережная",
    park: "Нижний парк",
    category: "Спорт",
    price: null,
    registration: false,
    registrationLink: "#",
    image: demo1,
    tags: ["Йога", "Бесплатно", "Спорт"],
  },
  {
    id: "history-tour",
    title: "Экскурсия «Тайны Нижнего парка»",
    shortTitle: "Тайны Нижнего парка",
    description: "Пешая экскурсия по историческим местам Нижнего парка с рассказом об архитектурных памятниках.",
    fullDescription: "Профессиональный экскурсовод проводит пешую экскурсию по Нижнему парку. Посетителям расскажут о создании парка в XIX века, о редких деревьях в дендрарии и о иcтории знаменитой Челушкинской площадки. Маршрут не сложный, подойдет для семей с детьми. Возможно видеосъемка.",
    date: "2026-07-12",
    time: "14:00",
    location: "Нижний парк, центральный вход",
    park: "Нижний парк",
    category: "Экскурсии",
    price: "300 ₽",
    registration: true,
    registrationLink: "#",
    image: demo1,
    tags: ["История", "Экскурсия", "Парк"],
  },
  {
    id: "sundenga-jazz-2026",
    title: "Вечер джаза в Bykhannov Garden",
    shortTitle: "Вечер джаза",
    description: "Акустический концерт джазового квартета в атмосфере старинного парка.",
    fullDescription: "Джаз-квартет локальный концерт в особняке Быханова. Акустика, приглушённый свет и старинный парк создают уникальную атмосферу. Билеты ограничены, рекомендуется приобретать заранее. В программе выступления четыре композиции собственного репертуара.",
    date: "2026-07-18",
    time: "19:00",
    location: "Bykhannov Garden, террасная зона",
    park: "Bykhannov Garden",
    category: "Концерты",
    price: "800 ₽",
    registration: true,
    registrationLink: "#",
    image: demo1,
    tags: ["Джаз", "Тickets", "Вечер"],
  },
  {
    id: "kids-nature",
    title: "Детский экологический квест",
    shortTitle: "Экологический квест",
    description: "Интерактивная игра для детей с элементами природоведения и экологии.",
    fullDescription: "Квест «Природа рядом» для детей 6–12 лет. Участники исследуют парк, реша精心设计 задания связанные с экологией, природоведением и сортировкой мусора. От замечательных находок до интерактивных станций — дети будут в восторге! Все участники получают памятные призы.",
    date: "2026-07-09",
    time: "11:00 – 14:00",
    location: "Городской сад",
    park: "Городской сад",
    category: "Детям",
    price: "200 ₽",
    registration: true,
    registrationLink: "#",
    image: demo1,
    tags: ["Детям", "Квест", "Экология"],
  },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long", weekday: "short" });
}

function isToday(dateStr: string) {
  const today = new Date();
  const d = new Date(dateStr + "T12:00:00");
  return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate();
}

function isTomorrow(dateStr: string) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const d = new Date(dateStr + "T12:00:00");
  return tomorrow.toDateString() === d.toDateString();
}

function getDayLabel(dateStr: string) {
  if (isToday(dateStr)) return "Сегодня";
  if (isTomorrow(dateStr)) return "Завтра";
  return formatDate(dateStr);
}

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [dateFilter, setDateFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selected, setSelected] = useState<EventItem | null>(null);

  const hasFilters = dateFilter !== "all" || activeCategory !== "Все" || searchQuery.trim().length > 0;
  const resetFilters = () => {
    setDateFilter("all");
    setActiveCategory("Все");
    setSearchQuery("");
  };

  const filteredEvents = useMemo(() => {
    let result = [...EVENTS];

    if (activeCategory !== "Все") {
      result = result.filter((e) => e.category === activeCategory);
    }

    if (dateFilter === "today") {
      result = result.filter((e) => isToday(e.date));
    } else if (dateFilter === "tomorrow") {
      result = result.filter((e) => isTomorrow(e.date));
    } else if (dateFilter === "week") {
      const today = new Date();
      const in7Days = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      result = result.filter((e) => {
        const d = new Date(e.date + "T12:00:00");
        return d >= today && d <= in7Days;
      });
    } else if (dateFilter === "month") {
      const today = new Date();
      result = result.filter((e) => {
        const d = new Date(e.date + "T12:00:00");
        return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return result;
  }, [activeCategory, dateFilter, searchQuery]);

  const featured = useMemo(() => EVENTS.filter((e) => e.featured), []);

  const { ref, isVisible } = usePageReveal();

  return (
    <div className="relative z-10 min-h-screen pt-[200px]" style={{ fontFamily: "'Inter', sans-serif", background: "rgba(5,15,8,0.35)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
      <div
        ref={ref}
        className="relative z-10"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
        }}
      >
      {/* HERO */}
      <section className="relative z-10 px-6 md:px-10 pb-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: "#a3e635", fontFamily: "'Unbounded', sans-serif" }}>
              Культурная жизнь
            </p>
            <h1
               className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 uppercase break-words"
              style={{
                color: "#ffffff",
                fontFamily: "'Unbounded', sans-serif",
                letterSpacing: "-0.02AHnore",
                lineHeight: 1.1,
              }}
            >
              События Липецка
            </h1>
            <p
              className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Концерты, выставки, фестивали и экскурсии в парках города
            </p>
          </div>

          {/* ===== DESKTOP ===== */}
          <div className="hidden md:block">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              {DATE_FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setDateFilter((prev) => (prev === f.value ? "all" : f.value))}
                  className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
                  style={{
                    background: dateFilter === f.value ? "#a3e635" : "rgba(255,255,255,0.05)",
                    color: dateFilter === f.value ? "#071a0e" : "rgba(255,255,255,0.5)",
                    border: dateFilter === f.value ? "1px solid rgba(163,230,53,0.3)" : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {f.label}
                </button>
              ))}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/10 ml-2"
                style={{
                  background: searchOpen ? "rgba(163,230,53,0.15)" : "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Search size={16} style={{ color: searchOpen ? "#a3e635" : "rgba(255,255,255,0.5)" }} />
              </button>
            </div>
            <div
              className="transition-all duration-300 ease-in-out overflow-hidden"
              style={{
                maxHeight: searchOpen ? "60px" : "0px",
                opacity: searchOpen ? 1 : 0,
                marginBottom: searchOpen ? "16px" : "0px",
              }}
            >
              <div className="relative max-w-md mx-auto">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.4)" }} />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Найти событие..."
                  className="w-full rounded-2xl px-5 py-3 text-sm outline-none"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#ffffff",
                    paddingLeft: "48px",
                  }}
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pb-2 scrollbar-hide mx-auto" style={{ maxWidth: "100%" }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory((prev) => (prev === cat ? "Все" : cat))}
                  className="whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                  style={{
                    background: activeCategory === cat ? "#a3e635" : "rgba(255,255,255,0.05)",
                    color: activeCategory === cat ? "#071a0e" : "rgba(255,255,255,0.5)",
                    border: activeCategory === cat ? "none" : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ===== MOBILE ===== */}
          <div className="flex flex-col md:hidden text-left">
            <div className="relative mb-4">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.4)" }} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Найти событие..."
                className="w-full rounded-2xl px-5 py-3 text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#ffffff",
                  paddingLeft: "48px",
                }}
              />
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                {(() => {
                  const parts: string[] = [];
                  const df = DATE_FILTERS.find((f) => f.value === dateFilter);
                  if (df && dateFilter !== "all") parts.push(df.label);
                  if (activeCategory !== "Все") parts.push(activeCategory);
                  return parts.length > 0 ? parts.join(" · ") : "Все события";
                })()}
              </span>
              {hasFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-medium transition-all hover:opacity-80"
                  style={{ color: "#a3e635" }}
                >
                  Сбросить
                </button>
              )}
            </div>

            <button
              onClick={() => setMobileFiltersOpen((prev) => !prev)}
              className="flex items-center justify-center gap-2 w-full rounded-2xl py-3 mb-3 text-sm font-medium transition-all"
              style={{
                background: mobileFiltersOpen ? "rgba(163,230,53,0.1)" : "rgba(255,255,255,0.05)",
                color: mobileFiltersOpen ? "#a3e635" : "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span>Фильтры</span>
              <span className="transition-transform duration-200" style={{ transform: mobileFiltersOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                ▼
              </span>
            </button>

            <div
              className="transition-all duration-300 ease-in-out overflow-hidden"
              style={{
                maxHeight: mobileFiltersOpen ? "400px" : "0px",
                opacity: mobileFiltersOpen ? 1 : 0,
              }}
            >
              <div className="rounded-2xl p-4 mb-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Дата
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {DATE_FILTERS.filter((f) => f.value !== "all").map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setDateFilter((prev) => (prev === f.value ? "all" : f.value))}
                      className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                      style={{
                        background: dateFilter === f.value ? "#a3e635" : "rgba(255,255,255,0.05)",
                        color: dateFilter === f.value ? "#071a0e" : "rgba(255,255,255,0.5)",
                        border: dateFilter === f.value ? "1px solid rgba(163,230,53,0.3)" : "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Категория
                </p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.filter((c) => c !== "Все").map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory((prev) => (prev === cat ? "Все" : cat))}
                      className="whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                      style={{
                        background: activeCategory === cat ? "#a3e635" : "rgba(255,255,255,0.05)",
                        color: activeCategory === cat ? "#071a0e" : "rgba(255,255,255,0.5)",
                        border: activeCategory === cat ? "none" : "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {featured.length > 0 && !searchQuery && dateFilter === "all" && activeCategory === "Все" && (
        <section className="relative z-10 px-6 md:px-10 pb-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-4">
              <h2 className="text-lg font-bold" style={{ color: "#ffffff", fontFamily: "'Unbounded', sans-serif" }}>
                Главное событие
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featured.map((ev) => (
                <motion.div
                  key={ev.id}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelected(ev)}
                  className="relative rounded-3xl overflow-hidden cursor-pointer group aspect-[3/4] sm:aspect-[16/10] md:aspect-video"
                >
                  <img src={ev.image} alt={ev.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 30%, rgba(5,15,8,0.85) 100%)" }} />

                  <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8">
                    <span
                      className="inline-flex items-center gap-1 w-fit px-3 py-1 rounded-full text-xs font-semibold mb-3"
                      style={{ background: "rgba(163,230,53,0.15)", color: "#a3e635", border: "1px solid rgba(163,230,53,0.2)" }}
                    >
                      {ev.category}
                    </span>
                    <h3 className="text-base sm:text-xl md:text-2xl font-black mb-2 break-words" style={{ color: "#ffffff", fontFamily: "'Unbounded', sans-serif" }}>
                      {ev.title}
                    </h3>
                    <div className="flex items-center gap-2 sm:gap-4 text-xs font-medium flex-wrap" style={{ color: "rgba(255,255,255,0.6)" }}>
                      <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(ev.date)}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {ev.time}</span>
                      {ev.price === null ? (
                        <span className="items-center gap-1 flex" style={{ color: "#a3e635" }}>Бесплатно</span>
                      ) : (
                        <span>{ev.price}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EVENTS GRID */}
      <section className="relative z-10 px-6 md:px-10 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold" style={{ color: "#ffffff", fontFamily: "'Unbounded', sans-serif" }}>
                {activeCategory === "Все" ? "Все события" : activeCategory}
              </h2>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                {filteredEvents.length} {filteredEvents.length === 1 ? "событие" : (
                  filteredEvents.length <= 4 && filteredEvents.length !== 0 ? "события" : "событий"
                )}
              </p>
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="py-20 text-center rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>Нет событий для выбранных фильтров</p>
              <button onClick={() => { setActiveCategory("Все"); setDateFilter("all"); setSearchQuery(""); }} className="mt-3 text-xs font-semibold" style={{ color: "#a3e635" }}>
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEvents.map((ev) => (
                <motion.div
                  key={ev.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelected(ev)}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col"
                  style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={ev.image} alt={ev.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050f08] via-transparent to-transparent" />
                    <span
                      className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                      style={{ background: "rgba(163,230,53,0.15)", color: "#a3e635", border: "1px solid rgba(163,230,53,0.25)" }}
                    >
                      {ev.category}
                    </span>
                    <span
                      className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold"
                      style={{ background: "rgba(0,0,0,0.4)", color: "#ffffff", backdropFilter: "blur(8px)" }}
                    >
                      {getDayLabel(ev.date)}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-sm font-bold mb-2 leading-snug group-hover:text-[#a3e635] transition-colors" style={{ color: "#ffffff", fontFamily: "'Unbounded', sans-serif" }}>
                      {ev.title}
                    </h3>
                    <p className="text-xs mb-3 line-clamp-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                      {ev.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                      <span className="flex items-center gap-1"><Clock size={12} /> {ev.time}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {ev.park}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      {ev.price === null ? (
                        <span className="text-xs font-semibold" style={{ color: "#a3e635" }}>Бесплатно</span>
                      ) : (
                        <span className="text-xs font-semibold" style={{ color: "#ffffff" }}>{ev.price}</span>
                      )}
                      {ev.registration && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
                          Регистрация
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selected && (
          <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
            <DialogContent showCloseButton={false} className="max-w-2xl p-0 overflow-hidden border-none bg-transparent" style={{ background: "transparent" }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative rounded-3xl overflow-hidden"
                style={{ background: "rgba(5,15,8,0.98)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(24px)" }}
              >
                <div className="relative h-64 md:h-80">
                  <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050f08] to-transparent" />
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}
                  >
                    <X size={18} color="#ffffff" />
                  </button>
                </div>
                <div className="p-6 md:p-8">
                  <span className="inline-flex items-center gap-1 w-fit px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ background: "rgba(163,230,53,0.15)", color: "#a3e635", border: "1px solid rgba(163,230,53,0.2)" }}>
                    {selected.category}
                  </span>
                  <h2 className="text-xl md:text-2xl font-black mb-4" style={{ color: "#ffffff", fontFamily: "'Unbounded', sans-serif" }}>
                    {selected.title}
                  </h2>
                  <div className="flex flex-col gap-2 mb-4 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <span className="flex items-center gap-2"><Calendar size={16} /> {formatDate(selected.date)}</span>
                    <span className="flex items-center gap-2"><Clock size={16} /> {selected.time}</span>
                    <span className="flex items-center gap-2"><MapPin size={16} /> {selected.location}</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
                    {selected.fullDescription}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    {selected.registration && selected.registrationLink !== "#" ? (
                      <a
                        href={selected.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90 hover:scale-105"
                        style={{ background: "#a3e635", color: "#071a0e", fontFamily: "'Unbounded', sans-serif" }}
                      >
                        Зарегистрироваться <ArrowRight size={16} />
                      </a>
                    ) : null}
                    {!selected.registration && (
                      <span className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold" style={{ background: "rgba(255,255,255,0.08)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.15)" }}>
                        Свободный вход
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
