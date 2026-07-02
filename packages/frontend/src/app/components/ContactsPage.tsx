import { Phone, Mail, MapPin, Clock, Building2, User } from "lucide-react";
import { TEAM } from "@/app/data/teamData";
import { usePageReveal } from "@/app/hooks/useReveal";

export function ContactsPage() {
  const { ref, isVisible } = usePageReveal();

  return (
    <div className="min-h-screen w-full pt-[200px] pb-12 px-6 md:px-10 relative z-10" style={{ fontFamily: "'Inter', sans-serif", background: "rgba(5,15,8,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
      <div
        ref={ref}
        className="max-w-7xl mx-auto text-center"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
        }}
      >
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: "#a3e635", fontFamily: "'Unbounded', sans-serif" }}>
            МАУК «Культурные пространства Липецка»
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 uppercase" style={{ color: "#ffffff", fontFamily: "'Unbounded', sans-serif", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Контакты
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Свяжитесь с нами любым удобным способом
          </p>
        </div>
      

      {/* Contact Info Card */}
        <div className="rounded-3xl p-6 md:p-10 mb-10" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(163,230,53,0.2)" }}>
          <h2 className="text-lg font-black mb-6" style={{ color: "#a3e635", fontFamily: "'Unbounded', sans-serif" }}>Основная информация</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(163,230,53,0.1)" }}>
                <Building2 size={20} style={{ color: "#a3e635" }} />
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Полное наименование</p>
                <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>Муниципальное автономное учреждение культуры «Культурные пространства Липецка»</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(163,230,53,0.1)" }}>
                <Phone size={20} style={{ color: "#a3e635" }} />
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Телефон (единая справочная)</p>
                <a href="tel:+74742566001" className="text-sm font-medium hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.8)" }}>+7 (4742) 56-60-01</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(163,230,53,0.1)" }}>
                <Mail size={20} style={{ color: "#a3e635" }} />
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Email</p>
                <a href="mailto:park48lip@ya.ru" className="text-sm font-medium hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.8)" }}>park48lip@ya.ru</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(163,230,53,0.1)" }}>
                <MapPin size={20} style={{ color: "#a3e635" }} />
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Почтовый адрес</p>
                <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>398020 г. Липецк, ул. Ленина, д. 31А</p>
              </div>
            </div>
            <div className="flex items-start gap-4 md:col-span-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(163,230,53,0.1)" }}>
                <Clock size={20} style={{ color: "#a3e635" }} />
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>График работы</p>
                <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>пн.-чт. 08:30 - 17:30, пт. 8:30 - 16:30, ПЕРЕРЫВ 13:00 - 13:48</p>
              </div>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="rounded-2xl p-5 mb-10" style={{ background: "rgba(163,230,53,0.05)", border: "1px solid rgba(163,230,53,0.15)" }}>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            <strong style={{ color: "#a3e635" }}>Личный прием граждан</strong> руководством учреждения проводится каждый рабочий вторник с 16:00 до 17:00 по адресу: г. Липецк, ул. Ленина, д. 31А. <strong style={{ color: "#ff6b6b" }}>ПРЕДВАРИТЕЛЬНАЯ ЗАПИСЬ ОБЯЗАТЕЛЬНА!</strong>
          </p>
        </div>

        {/* Map */}
        <div className="mb-10">
          YandexMap placeholder
        </div>

        {/* Write to us */}
        <div className="flex justify-center mb-16">
          <a href="mailto:park48lip@ya.ru" className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-transform hover:scale-105" style={{ background: "#a3e635", color: "#0a1e12" }}>
            <Mail size={18} /> Написать нам
          </a>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-lg font-black mb-6" style={{ color: "#a3e635", fontFamily: "'Unbounded', sans-serif" }}>Команда</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEAM.map((member) => (
              <div key={member.name} className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-3 mb-3">
                  {member.img ? (
                    <img src={member.img} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(163,230,53,0.1)" }}>
                      <User size={18} style={{ color: "#a3e635" }} />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold" style={{ color: "#e8f5e9" }}>{member.name}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{member.role}</p>
                  </div>
                </div>
                {member.phone && (
                  <a href={`tel:${member.phone}`} className="text-xs block mb-1 hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}>{member.phone}</a>
                )}
                {member.email && (
                  <a href={`mailto:${member.email}`} className="text-xs block hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}>{member.email}</a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Departments */}
        <div className="mb-16">
          <h2 className="text-lg font-black mb-6" style={{ color: "#a3e635", fontFamily: "'Unbounded', sans-serif" }}>Отделы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="text-sm font-bold mb-2" style={{ color: "#e8f5e9" }}>Отдел бухгалтерского учета и финансов</h3>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Сальникова Виктория Викторовна — Главный бухгалтер</p>
            </div>
            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="text-sm font-bold mb-2" style={{ color: "#e8f5e9" }}>Технический отдел</h3>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Жидков Вячеслав Игоревич — Главный инженер</p>
            </div>
            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="text-sm font-bold mb-2" style={{ color: "#e8f5e9" }}>Отдел материально-технического обеспечения</h3>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Грозных Анна Сергеевна — Начальник отдела</p>
            </div>
            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="text-sm font-bold mb-2" style={{ color: "#e8f5e9" }}>Отдел по содержанию территорий</h3>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Соболева Анна Павловна — Начальник отдела</p>
            </div>
          </div>
        </div>

        {/* Legal + Founder */}
        <div className="rounded-3xl p-6 md:p-10" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(163,230,53,0.2)" }}>
          <h2 className="text-lg font-black mb-6" style={{ color: "#a3e635", fontFamily: "'Unbounded', sans-serif" }}>Реквизиты</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(163,230,53,0.1)" }}>
                <Building2 size={20} style={{ color: "#a3e635" }} />
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Организация</p>
                <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>Муниципальное автономное учреждение культуры «Культурные пространства Липецка»</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(163,230,53,0.1)" }}>
                <Phone size={20} style={{ color: "#a3e635" }} />
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Телефон</p>
                <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>+7 (4742) 56-60-01</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(163,230,53,0.1)" }}>
                <Mail size={20} style={{ color: "#a3e635" }} />
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Email</p>
                <a href="mailto:park48lip@ya.ru" className="text-sm font-medium hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.8)" }}>park48lip@ya.ru</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(163,230,53,0.1)" }}>
                <MapPin size={20} style={{ color: "#a3e635" }} />
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Адрес</p>
                <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>398020 г. Липецк, ул. Ленина, д. 31А</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(163,230,53,0.1)" }}>
                <Clock size={20} style={{ color: "#a3e635" }} />
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>График работы</p>
                <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>пн.-чт. 08:30 - 17:30, пт. 8:30 - 16:30, ПЕРЕРЫВ 13:00 - 13:48</p>
              </div>
            </div>
          </div>

          <h2 className="text-lg font-black mb-6" style={{ color: "#a3e635", fontFamily: "'Unbounded', sans-serif" }}>Сведения об учредителе</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(163,230,53,0.1)" }}>
                <Building2 size={20} style={{ color: "#a3e635" }} />
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Учредитель</p>
                <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>Департамент культуры и туризма администрации города Липецка</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(163,230,53,0.1)" }}>
                <Phone size={20} style={{ color: "#a3e635" }} />
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Телефон</p>
                <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>+7 (4742) 23-97-82 (приемная)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(163,230,53,0.1)" }}>
                <Mail size={20} style={{ color: "#a3e635" }} />
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Email</p>
                <a href="mailto:petrovatv@lipetskcity.ru" className="text-sm font-medium hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.8)" }}>petrovatv@lipetskcity.ru</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(163,230,53,0.1)" }}>
                <MapPin size={20} style={{ color: "#a3e635" }} />
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Адрес</p>
                <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>г. Липецк, ул. Фрунзе, д. 1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
