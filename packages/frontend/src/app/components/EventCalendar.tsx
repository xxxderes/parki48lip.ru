import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, MapPin, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/app/components/ui/dialog";
import { EVENTS } from "@/app/data/events";
import { MONTH_NAMES, getDaysInMonth, getFirstDayOfMonth } from "@/app/lib/calendar";

export function EventCalendar() {
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
        {["пн","вт","ср","чт","пт","сб","вс"].map(d => (
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