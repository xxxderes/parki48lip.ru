import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router";
import { Search, ChevronLeft, ChevronRight, Clock, MapPin, Wind, Sun, ArrowRight, Trees, Home, TreePine, Map, Calendar, Newspaper, Users, FileText, Phone, Info, HeartHandshake } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/app/components/ui/dialog";
import { DocumentsPage } from "@/app/components/DocumentsPage";
import { ContactsPage } from "@/app/components/ContactsPage";
import { TeamPage } from "@/app/components/TeamPage";
import { RoutesPage } from "@/app/components/RoutesPage";

import EventsPage from "@/app/components/EventsPage";
import { ParksPage } from "@/app/components/ParksPage";
import { ParkDetailPage } from "@/app/components/ParkDetailPage";
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

const EVENTS: Record<number, { title: string; time: string; park: string; description: string }[]> = {
  3:  [{ title: "Экскурсия по историческим аллеям", time: "11:00", park: "Нижний парк", description: "Прогулка по историческим аллеям Нижнего парка с экскурсоводом. Вы узнаете о 200-летней истории парка, посмотрите на реликтовые деревья и услышите захватывающие истории. Продолжительность ~2 часа. Место встречи: главный вход." }],
  5:  [
      { title: "Утренняя йога на траве", time: "09:00", park: "Городской сад", description: "Занятия йогой на открытом воздухе для всех уровней подготовки." },
      { title: "Мастер-класс по акварели", time: "12:00", park: "Быханов сад", description: "Мастер-класс для начинающих художников от известного липецкого художника." },
      { title: "Лекция об экологии города", time: "14:00", park: "Городской сад", description: "Лекция эксперта по экологии о зелёных зонах города." },
      { title: "Детский экопраздник", time: "16:00", park: "Зоопарк", description: "Развлекательная программа для детей с экологической тематикой." },
      { title: "Концерт под открытым небом", time: "19:00", park: "Парк Победы", description: "Концерт классической музыки под открытым небом в Парке Победы." }
    ],
  7:  [{ title: "Концерт под открытым небом", time: "18:00", park: "Парк Победы", description: "Концерт классической музыки под открытым небом в Парке Победы. В программе: произведения П. И. Чайковского, С. В. Рахманинова и других великих композиторов. Не забудьте одеяло и хорошее настроение!" }],
  10: [{ title: "Выставка пейзажной фотографии", time: "10:00", park: "Быханов сад", description: "Выставка работ местных фотографов в Быхановом саду. В экспозиции представлены более 50 работ, снятых в парках Липецка за последний год. Вход свободный." }],
  12: [{ title: "Утренняя йога на траве", time: "09:00", park: "Городской сад", description: "Занятия йогой на открытом воздухе для всех уровней подготовки. Инструктор с опытом более 5 лет. Необходим: коврик и удобная одежда. Занятие рассчитано на 60 минут." }],
  15: [{ title: "Фестиваль цветов «Зелёный Липецк»", time: "Весь день", park: "Нижний парк", description: "Грандиозный фестиваль цветов с участием садоводов со всей области. Программа включает выступления оркестров, мастер-классы по флористике, а также фотозоны и зоны для работы в reddision." }],
  17: [{ title: "Мастер-класс по акварели", time: "14:00", park: "Быханов сад", description: "Мастер-класс для начинающих художников от известного липецкого художника. Все материалы предоставляются организаторами. Продолжительность — 3 часа." }],
  19: [{ title: "Кино под звёздами", time: "21:00", park: "Парк Победы", description: "Кинопоказ на открытом воздухе. На большом экране — культовый фильм о летних приключениях. Вход бесплатный. До начала — фотозона и анимация для детей." }],
  22: [{ title: "Детский экопраздник", time: "12:00", park: "Зоопарк", description: "Развлекательная программа для детей с экологической тематикой. Квесты, викторины, подарки от спонсоров и встреча с зоопарковыми обитателями. Для детей от 4 до 12 лет." }],
  24: [{ title: "Забег «Зелёная пятёрка»", time: "08:00", park: "Парк Победы", description: "Соревновательный забег на 5 км по парку. Дистанция проходит через самые красивые места Парка Победы. Все участники получат памятные медали и подарки от партнёров." }],
  26: [{ title: "Лекция об экологии города", time: "16:00", park: "Городской сад", description: "Лекция эксперта по экологии о зелёных зонах города. Почему важно сохранять парки и как каждый может внести вклад в экологию Липецка. Вход свободный." }],
  28: [{ title: "Велопробег по паркам", time: "09:00", park: "Нижний парк", description: "Велопробег по маршруту через все крупные парки города. Длина маршрута — 15 км. Для участников предусмотрены точки питания и технической помощи." }],
  30: [{ title: "Театр под открытым небом", time: "19:30", park: "Быханов сад", description: "Спектакль на открытой сцене в Быхановом саду. В премьере — комедия по мотивам классических произведений. Рекомендуем приходить заранее для выбора места." }],
};

const PARKS = [
  {
    name: "Нижний парк",
    desc: "Исторический парк XIX века с каскадными прудами, фонтанами и редкими породами деревьев.",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format",
    tag: "Исторический",
    area: "46 га",
    history: "Парк был основан в 19 веке и является одним из старейших в городе. Здесь растут деревья более 200 лет.",
    features: "Каскадные пруды, фонтаны, редкие виды деревьев, цветочные клумбы, детские площадки."
  },
  {
    name: "Парк Победы",
    desc: "Крупнейший парк города с аллеями боевой славы, амфитеатром и современными спортивными зонами.",
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop&auto=format",
    tag: "Культурный",
    area: "73 га",
    history: "Парк был создан в честь Победы в Великой Отечественной войне и является главным парком для городских мероприятий.",
    features: "Аллеи боевой славы, амфитеатр, спортивные площадки, лодочная станция, летние сцены."
  },
  {
    name: "Быханов сад",
    desc: "Уютный тенистый сад в центре города с оранжереей, цветниками и кафе среди зелени.",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop&auto=format",
    tag: "Ботанический",
    area: "12 га",
    history: "Сад был создан в 19 веке для нужд флористов и стал одной из главных достопримечательностей Липецка.",
    features: "Оранжерея, цветники, кафе, редкие виды растений."
  },
  {
    name: "Городской сад",
    desc: "Сердце старого Липецка: летняя эстрада, фонтан «Времена года» и вековые дубы.",
    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop&auto=format",
    tag: "Городской",
    area: "8 га",
    history: "Парк был создан в 1820 году и является любимым местом отдыха горожан уже более двух столетий.",
    features: "Летняя эстрада, фонтан «Времена года», вековые дубы, игровые площадки, прогулочные дорожки."
  },
];

const DAYS_OF_WEEK = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
const MONTH_NAMES = [
  "Январь","Февраль","Март","Апрель","Май","Июнь",
  "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function EventCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{ title: string; time: string; park: string; description: string } | null>(null);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const handleCellClick = (day: number) => {
    if (EVENTS[day]) {
      setSelectedDay(day);
      setDialogOpen(true);
    }
  };

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div
      className="rounded-3xl p-4 lg:p-6 relative w-full lg:w-[420px] mx-auto lg:mx-0"
      style={{
        background: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      <p
        className="text-xs uppercase tracking-widest font-semibold mb-4"
        style={{ color: "#a3e635", fontFamily: "'Unbounded', sans-serif" }}
      >
        Афиша
      </p>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-5">
        <button onClick={prevMonth} className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/10" style={{ color: "rgba(255,255,255,0.5)" }}>
          <ChevronLeft size={15} />
        </button>
        <h3
          className="text-2xl font-bold"
          style={{ color: "#fff", fontFamily: "'Unbounded', sans-serif", letterSpacing: "-0.02em" }}
        >
          {MONTH_NAMES[month]}
        </h3>
        <button onClick={nextMonth} className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/10" style={{ color: "rgba(255,255,255,0.5)" }}>
          <ChevronRight size={15} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2 gap-1 lg:gap-2">
        {DAYS_OF_WEEK.map(d => (
          <div key={d} className="text-center text-[11px] lg:text-[12px] font-medium py-1 lg:py-2" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Inter', sans-serif" }}>
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1.5 lg:gap-2 relative">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} className="flex items-center justify-center" style={{ height: "56px" }} />;
          const hasEvent = !!EVENTS[day];
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          const eventCount = hasEvent ? EVENTS[day].length : 0;
          return (
            <div key={day} className="flex items-center justify-center">
              <button
                onClick={() => handleCellClick(day)}
                className="flex flex-col items-center rounded-xl relative transition-all duration-200 font-medium w-full pt-2 lg:pt-3"
                style={{
                  height: "56px",
                  fontFamily: "'Inter', sans-serif",
                  background: isToday
                    ? "rgba(163,230,53,0.25)"
                    : hasEvent
                    ? "rgba(30,60,30,0.7)"
                    : "rgba(255,255,255,0.04)",
                  color: isToday ? "#a3e635" : hasEvent ? "#86efac" : "rgba(255,255,255,0.6)",
                  border: isToday
                    ? "1px solid rgba(163,230,53,0.5)"
                    : hasEvent
                    ? "1px solid rgba(74,222,128,0.2)"
                    : "1px solid rgba(255,255,255,0.06)",
                  cursor: hasEvent ? "pointer" : "default",
                }}
              >
                <span className="text-sm lg:text-base font-medium">
                  {String(day).padStart(2, "0")}
                </span>
                {/* Dots indicator */}
                <div className="flex items-center justify-center gap-0.5 mt-auto pb-1.5 lg:pb-2" style={{ minHeight: 10 }}>
                  {hasEvent ? (
                    <>
                      {eventCount <= 3 ? (
                        Array.from({ length: eventCount }).map((_, idx) => (
                          <div
                            key={idx}
                            className="rounded-full"
                            style={{ width: 4, height: 4, background: "#a3e635" }}
                          />
                        ))
                      ) : (
                        <>
                          {Array.from({ length: 3 }).map((_, idx) => (
                            <div
                              key={idx}
                              className="rounded-full"
                              style={{ width: 4, height: 4, background: "#a3e635" }}
                            />
                          ))}
                          <span className="text-[8px] font-medium ml-0.5" style={{ color: "#a3e635" }}>
                            +{eventCount - 3}
                          </span>
                        </>
                      )}
                    </>
                  ) : (
                    <div style={{ width: 4, height: 4 }} />
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Upcoming events strip */}
      <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <p className="text-[10px] uppercase tracking-widest font-semibold mb-3" style={{ color: "rgba(163,230,53,0.8)", fontFamily: "'Unbounded', sans-serif" }}>
          Ближайшие события
        </p>
        {Object.entries(EVENTS)
          .filter(([d]) => parseInt(d) >= today.getDate())
          .slice(0, 3)
          .map(([d, evs]) => (
            <div key={d} className="flex items-center gap-3 mb-2.5">
              <span
                className="text-xs font-bold w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80", fontFamily: "'Unbounded', sans-serif", fontSize: "10px" }}
              >
                {d}
              </span>
              <p className="text-xs leading-tight" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Inter', sans-serif" }}>
                {evs[0].title}
              </p>
            </div>
          ))}
      </div>

      {/* Event Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          showCloseButton={false}
          className="rounded-3xl w-full max-w-lg p-0 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            border: "1px solid rgba(163,230,53,0.2)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            maxHeight: "85vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Glass close button */}
          <button
            onClick={() => setDialogOpen(false)}
            className="absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center z-10 transition-all hover:scale-110 active:scale-95 hover:bg-white/15"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round">
              <path d="M1 1l10 10M11 1L1 11"/>
            </svg>
          </button>

          {selectedDay !== null && EVENTS[selectedDay] && (
            <div className="p-6 overflow-y-auto" style={{ flex: 1, maxHeight: "calc(85vh - 80px)" }}>
              <DialogHeader className="mb-5">
                <DialogTitle
                  className="text-xl font-black mb-1 pr-8"
                  style={{ color: "#a3e635", fontFamily: "'Unbounded', sans-serif" }}
                >
                  События {selectedDay} {MONTH_NAMES[month].toLowerCase()}
                </DialogTitle>
                <DialogDescription className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Мероприятия в парках Липецка
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-3">
                {EVENTS[selectedDay].map((ev, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl p-4 transition-all duration-300 hover:bg-white/5 cursor-pointer group"
                    style={{
                      border: "1px solid rgba(74,222,128,0.15)",
                      background: "rgba(0,0,0,0.25)",
                    }}
                    onClick={() => {
                      setSelectedEvent(ev);
                      setEventModalOpen(true);
                    }}
                  >
                    <h4 className="text-sm font-bold mb-2 leading-snug" style={{ color: "#e8f5e9", fontFamily: "'Unbounded', sans-serif" }}>
                      {ev.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-4 mb-3">
                      <span className="flex items-center gap-1.5 text-xs" style={{ color: "#4ade80" }}>
                        <Clock size={10} /> {ev.time}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs" style={{ color: "#86b892" }}>
                        <MapPin size={10} /> {ev.park}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>
                      {ev.description?.substring(0, 120)}...
                    </p>
                    <span className="text-xs font-medium flex items-center gap-1 transition-all" style={{ color: "#a3e635" }}>
                      Подробнее <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Event Detail Modal */}
      <Dialog open={eventModalOpen} onOpenChange={setEventModalOpen}>
        <DialogContent
          showCloseButton={false}
          className="rounded-3xl w-full max-w-lg p-0 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            border: "1px solid rgba(163,230,53,0.2)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            maxHeight: "85vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button
            onClick={() => setEventModalOpen(false)}
            className="absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center z-10 transition-all hover:scale-110 active:scale-95 hover:bg-white/15"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round">
              <path d="M1 1l10 10M11 1L1 11"/>
            </svg>
          </button>
          {selectedEvent && (
            <div className="p-6 overflow-y-auto" style={{ flex: 1 }}>
              <h3 className="text-xl font-black mb-2 pr-8" style={{ color: "#a3e635", fontFamily: "'Unbounded', sans-serif" }}>
                {selectedEvent.title}
              </h3>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="flex items-center gap-1.5 text-xs" style={{ color: "#4ade80" }}>
                  <Clock size={12} /> {selectedEvent.time}
                </span>
                <span className="flex items-center gap-1.5 text-xs" style={{ color: "#86b892" }}>
                  <MapPin size={12} /> {selectedEvent.park}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Inter', sans-serif" }}>
                {selectedEvent.description}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ParkCard({ park }: { park: typeof PARKS[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-500"
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: hovered ? "1px solid rgba(74,222,128,0.35)" : "1px solid rgba(255,255,255,0.08)",
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.5)" : "0 8px 30px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div className="relative overflow-hidden" style={{ height: "160px", background: "#0a1f10" }}>
        <img
          src={park.img}
          alt={park.name}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(5,15,8,0.85) 100%)" }} />
        <span
          className="absolute top-3 left-3 text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full font-semibold"
          style={{
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.75)",
            fontFamily: "'Unbounded', sans-serif",
          }}
        >
          {park.tag}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-1.5">
          <h3 className="font-bold leading-tight" style={{ color: "#e8f5e9", fontFamily: "'Unbounded', sans-serif", fontSize: "12px" }}>
            {park.name}
          </h3>
          <span className="flex items-center gap-1 text-[10px] flex-shrink-0 ml-2 mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
            <Trees size={10} /> {park.area}
          </span>
        </div>
        <p className="text-xs leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif" }}>
          {park.desc}
        </p>
        <button
          className="flex items-center gap-1.5 text-xs font-medium transition-all duration-200"
          style={{ color: hovered ? "#4ade80" : "rgba(255,255,255,0.35)", fontFamily: "'Inter', sans-serif" }}
        >
          Подробнее <ArrowRight size={11} />
        </button>
      </div>
    </div>
  );
}


function getWeatherMessage(temp: number, isDay: number, rain: number, showers: number, snowfall: number, weatherCode: number): string {
  // Приоритет 1: осадки (снег, дождь)
  if (snowfall > 0) return "ИДЁТ СНЕГ! СМОТРИТЕ ПОД НОГИ — СКОЛЬЗКО";
  if (rain > 0 || showers > 0) return "ИДЁТ ДОЖДЬ. НЕ ЗАБУДЬТЕ ЗОНТИК";
  if (weatherCode >= 95) return "ГРОЗА! ЛУЧШЕ ОСТАТЬСЯ В ПОМЕЩЕНИИ";
  if (weatherCode === 77) return "СНЕЖНЫЕ ЗЕРНА. ЗАЩИТИТЕ ГЛАЗА";
  if (weatherCode >= 51 && weatherCode <= 57) return "МОРОСТЬ. ВОЗЬМИТЕ ЗОНТ НА ВСЯКИЙ СЛУЧАЙ";

  // Приоритет 2: видимость
  if (weatherCode === 45 || weatherCode === 48) return "ТУМАН. СНИЖАЙТЕ СКОРОСТЬ";

  // Приоритет 3: температура + время суток
  if (isDay === 0) {
    if (temp < -10) return "СИЛЬНЫЙ МОРОЗ! ОЧЕНЬ ТЁПЛАЯ ОДЕЖДА НЕОБХОДИМА";
    if (temp < 0) return "МОРОЗНАЯ НОЧЬ. НАДЕНЬТЕ ШАПКУ И ШАРФ";
    if (temp < 5) return "ХОЛОДНЫЙ ВЕЧЕР. ВОЗЬМИТЕ ТЁПЛУЮ КУРТКУ";
    if (temp < 10) return "ПРОХЛАДНЫЙ ВЕЧЕР. ЛЁГКАЯ КУРТКА ПРИГОДИТСЯ";
    if (temp < 20) return "ХОРОШИЙ ВЕЧЕР ДЛЯ ПРОГУЛОК ПО ПАРКУ";
    return "ТЁПЛЫЙ ВЕЧЕР. ИДЕАЛЬНО ДЛЯ ВЕЧЕРНИХ ПРОГУЛОК";
  }

  // День
  if (temp < -10) return "СИЛЬНЫЙ МОРОЗ. ВЫХОДИТЕ ТОЛЬКО В КРАЙНЕЙ НЕОБХОДИМОСТИ";
  if (temp < 0) return "МОРОЗ. НАДЕНЬТЕ ШАПКУ, ПЕРЧАТКИ И ШАРФ";
  if (temp < 5) return "ХОЛОДНО. НУЖЕН ТЁПЛЫЙ ПУХОВИК";
  if (temp < 10) return "ПРОХЛАДНО. ВОЗЬМИТЕ КУРТКУ";
  if (temp < 15) return "ПРИЯТНАЯ ПОГОДА. ЛЁГКАЯ КУРТКА БУДЕТ УДОБНА";
  if (temp < 20) return "ОТЛИЧНАЯ ПОГОДА. ИДЕАЛЬНЫЙ ДЕНЬ ДЛЯ ПРОГУЛОК";
  if (temp < 25) return "ТЁПЛАЯ ПОГОДА. НЕ ЗАБУДЬТЕ КЕПКУ И ВОДУ";
  if (temp < 30) return "ЖАРКО! ВОЗЬМИТЕ ВОДУ И ЗАЩИТУ ОТ СОЛНЦА";
  return "ОЧЕНЬ ЖАРКО! ОСТАВАЙТЕСЬ В ТЕНИ И ПЕЙТЕ МНОГО ВОДЫ";
}

export default function App() {
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const darkenRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [navActive, setNavActive] = useState("Главная");
  const [weather, setWeather] = useState<{ temp: number; isDay: number; rain: number; showers: number; snowfall: number; weatherCode: number } | null>(null);
  const [showDocs, setShowDocs] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const [showRoutes, setShowRoutes] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showParks, setShowParks] = useState(false);
  const [selectedParkId, setSelectedParkId] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = ["Главная", "Парки", "Маршруты", "События", "Новости", "Команда"];
  const extraNavItems = ["Документы", "Контакты"];

  useEffect(() => {
    const path = location.pathname;
    if (path === "/documents") {
      setNavActive("Документы");
      setShowDocs(true);
      setShowContacts(false);
      setShowTeam(false);
      setShowRoutes(false);
      setShowEvents(false);
      setShowParks(false);
      setSelectedParkId(null);
      document.title = "Документы — Парки Липецка";
    } else if (path === "/events") {
      setNavActive("События");
      setShowDocs(false);
      setShowContacts(false);
      setShowTeam(false);
      setShowRoutes(false);
      setShowEvents(true);
      setShowParks(false);
      setSelectedParkId(null);
      document.title = "События — Парки Липецка";
    } else if (path === "/contacts") {
      setNavActive("Контакты");
      setShowDocs(false);
      setShowContacts(true);
      setShowTeam(false);
      setShowRoutes(false);
      setShowEvents(false);
      setShowParks(false);
      setSelectedParkId(null);
      document.title = "Контакты — Парки Липецка";
    } else if (path === "/team") {
      setNavActive("Команда");
      setShowDocs(false);
      setShowContacts(false);
      setShowTeam(true);
      setShowRoutes(false);
      setShowEvents(false);
      setShowParks(false);
      setSelectedParkId(null);
      document.title = "Команда — Парки Липецка";
    } else if (path === "/routes") {
      setNavActive("Маршруты");
      setShowDocs(false);
      setShowContacts(false);
      setShowTeam(false);
      setShowRoutes(true);
      setShowEvents(false);
      setShowParks(false);
      setSelectedParkId(null);
      document.title = "Маршруты — Парки Липецка";
    } else if (path === "/parks") {
      setNavActive("Парки");
      setShowDocs(false);
      setShowContacts(false);
      setShowTeam(false);
      setShowRoutes(false);
      setShowEvents(false);
      setShowParks(true);
      setSelectedParkId(null);
      document.title = "Парки — Парки Липецка";
    } else if (path.startsWith("/park/")) {
      const parkId = path.split("/")[2];
      setNavActive("Парки");
      setShowDocs(false);
      setShowContacts(false);
      setShowTeam(false);
      setShowRoutes(false);
      setShowEvents(false);
      setShowParks(false);
      setSelectedParkId(parkId || null);
      document.title = parkId ? parkId + " — Парки Липецка" : "Парки — Парки Липецka";
    } else {
      setNavActive("Главная");
      setShowDocs(false);
      setShowContacts(false);
      setShowTeam(false);
      setShowRoutes(false);
      setShowEvents(false);
      setShowParks(false);
      setSelectedParkId(null);
      document.title = "Парки Липецка — культурные пространства и события города"; }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const handleNavClick = (item: string) => {
    setNavActive(item);
    if (item === "Документы") {
      navigate("/documents");
      setShowDocs(true);
      setShowContacts(false);
      setShowTeam(false);
      setShowRoutes(false);
      setShowEvents(false);
      setShowParks(false);
      setSelectedParkId(null);
      document.title = "Документы — Парки Липецка";
    } else if (item === "Контакты") {
      navigate("/contacts");
      setShowDocs(false);
      setShowContacts(true);
      setShowTeam(false);
      setShowRoutes(false);
      setShowEvents(false);
      setShowParks(false);
      setSelectedParkId(null);
      document.title = "Контакты — Парки Лipецka";
    } else if (item === "Команда") {
      navigate("/team");
      setShowDocs(false);
      setShowContacts(false);
      setShowTeam(true);
      setShowRoutes(false);
      setShowEvents(false);
      setShowParks(false);
      setSelectedParkId(null);
      document.title = "Команда — Парки Липецка";
    } else if (item === "Маршруты") {
      navigate("/routes");
      setShowDocs(false);
      setShowContacts(false);
      setShowTeam(false);
      setShowRoutes(true);
      setShowEvents(false);
      setShowParks(false);
      setSelectedParkId(null);
      document.title = "Маршруты — Парки Липецка";
    } else if (item === "События") {
      navigate("/events");
      setShowDocs(false);
      setShowContacts(false);
      setShowTeam(false);
      setShowRoutes(false);
      setShowEvents(true);
      setShowParks(false);
      setSelectedParkId(null);
      document.title = "События — Парки Липецка";
    } else if (item === "Парки") {
      navigate("/parks");
      setShowDocs(false);
      setShowContacts(false);
      setShowTeam(false);
      setShowRoutes(false);
      setShowEvents(false);
      setShowParks(true);
      setSelectedParkId(null);
      document.title = "Парки — Парки Липецка";
    } else {
      navigate("/");
      setShowDocs(false);
      setShowContacts(false);
      setShowTeam(false);
      setShowRoutes(false);
      setShowEvents(false);
      setShowParks(false);
      setSelectedParkId(null);
      document.title = "Парки Липецка — культурные пространства и события города";
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Darken video as user scrolls past hero
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const opacity = Math.min((scrollY / (vh * 0.6)) * 0.5, 0.5);
      if (darkenRef.current) {
        darkenRef.current.style.opacity = String(opacity);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=52.6031&longitude=39.5708&current_weather=true&current=rain,showers,snowfall")
      .then(res => res.json())
      .then(data => {
        if (data?.current_weather) {
          setWeather({
            temp: Math.round(data.current_weather.temperature),
            isDay: data.current_weather.is_day,
            rain: data.current?.rain ?? 0,
            showers: data.current?.showers ?? 0,
            snowfall: data.current?.snowfall ?? 0,
            weatherCode: data.current_weather.weathercode ?? 0,
          });
        }
      })
      .catch(() => {
        // if fetch fails, keep default
      });
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative" style={{ fontFamily: "'Inter', sans-serif", background: "#050f08" }}>

      {/* VIDEO BACKGROUND */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
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
          ref={darkenRef}
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: "#050f08", opacity: 0 }}
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
        className="fixed top-0 left-0 right-0 z-50 px-6 py-3 md:top-4 md:left-4 md:right-4 md:px-10 md:py-3 transition-all duration-500 overflow-hidden rounded-b-2xl md:rounded-2xl"
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
                data-active={navActive === item}
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
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
              }}
              onClick={() => {
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
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
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
                    const isActive = navActive === item.label;
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
                    const isActive = navActive === item.label;
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

      {showDocs && <DocumentsPage />}
      {showContacts && <ContactsPage />}
      {showTeam && <TeamPage />}
      {showRoutes && <RoutesPage />}
      {showEvents && <EventsPage />}
      {showParks && <ParksPage onSelectPark={(id) => {
        setSelectedParkId(id);
        navigate(`/park/${id}`);
      }} />}
      {selectedParkId && <ParkDetailPage parkId={selectedParkId} onBack={() => {
        setSelectedParkId(null);
        navigate('/parks');
      }} />}
      {!showDocs && !showContacts && !showTeam && !showRoutes && !showEvents && !showParks && !selectedParkId && (
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
                className="flex items-center rounded-2xl px-5 py-4 gap-3 transition-all duration-300 animate-search"
                style={{
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid rgba(255,255,255,0.15)",
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
              {query && (
                <div
                  className="absolute top-full mt-2 left-0 right-0 rounded-2xl overflow-hidden z-30"
                  style={{
                    background: "rgba(5,15,8,0.97)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
                  }}
                >
                  {PARKS.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).map(p => (
                    <div key={p.name} className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-all hover:bg-white/5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <MapPin size={12} style={{ color: "#4ade80" }} />
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#e8f5e9" }}>{p.name}</p>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{p.tag} · {p.area}</p>
                      </div>
                    </div>
                  ))}
                  {PARKS.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).length === 0 && (
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
            {PARKS.map(park => <ParkCard key={park.name} park={park} />)}
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
