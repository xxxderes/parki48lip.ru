import { Phone, Mail, MapPin, Clock, Building2, User } from "lucide-react";
import sitnikovImg from "@/imports/sitnikov.webp";
import chernikovImg from "@/imports/vladimirvladimirovich.jpg";
import zhidkovImg from "@/imports/ZhidkovVyacheslavIgorevich.jpg";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface Person { name: string; role: string; img?: string; }
interface Dept { name: string; head: string; position: string; headImg?: string; }

const DIRECTOR: Person[] = [
  { name: "Ситников Олег Николаевич", role: "Директор", img: sitnikovImg },
  { name: "Черников Владимир Владимирович", role: "Первый заместитель директора", img: chernikovImg },
  { name: "Меляков Алексей Васильевич", role: "Заместитель директора по содержанию территорий" },
  { name: "Демин Дмитрий Александрович", role: "Заместитель директора по культурно-досуговой деятельности" },
];

const DEPARTMENTS: Dept[] = [
  { name: "Отдел бухгалтерского учета и финансов", head: "Сальникова Виктория Викторовна", position: "Главный бухгалтер" },
  { name: "Технический отдел", head: "Жидков Вячеслав Игоревич", position: "Главный инженер", headImg: zhidkovImg },
  { name: "Отдел материально-технического обеспечения", head: "Грозных Анна Сергеевна", position: "Начальник отдела" },
  { name: "Отдел по содержанию территорий", head: "Соболева Анна Павловна", position: "Начальник отдела" },
];

export function ContactsPage() {
  return (
    <div className="min-h-screen w-full py-24 px-6 md:px-10 relative z-10" style={{ fontFamily: "'Inter', sans-serif", background: "rgba(5,15,8,0.92)", paddingTop: "160px" }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#a3e635", fontFamily: "'Unbounded', sans-serif" }}>
            МАУК «Культурные пространства Липецка»
          </p>
          <h1 classators className="text-3xl md:text-4xl font-black mb-4" style={{ color: "#ffffff", fontFamily: "'Unbounded', sans-serif", letterSpacing: "-0.02em" }}>
            Контакты
          </h1>
        </div>

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

        <div className="rounded-2xl p-5 mb-10" style={{ background: "rgba(163,230,53,0.05)", border: "1px solid rgba(163,230,53,0.15)" }}>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            <strong style={{ color: "#a3e635" }}>Личный прием граждан</strong> руководством учреждения проводится каждый рабочий вторник с 16:00 до 17:00 по адресу: г. Липецк, ул. Ленина, д. 31А. <strong style={{ color: "#ff6b6b" }}>ПРЕДВАРИТЕЛЬНАЯ ЗАПИСЬ ОБЯЗАТЕЛЬНА!</strong>
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-black mb-6" style={{ color: "#a3e635", fontFamily: "'Unbounded', sans-serif" }}>Руководство</h2>
          <div className="flex flex-col gap-3">
            {DIRECTOR.map((p) => (
              <div key={p.name} className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden" style={{ background: p.img ? "transparent" : "rgba(163,230,53,0.1)" }}>
                  {p.img ? (
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <User size={22} style={{ color: "#a3e635" }} />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "#e8f5e9", fontFamily: "'Unbounded', sans-serif" }}>{p.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>{p.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-black mb-6" style={{ color: "#a3e635", fontFamily: "'Unbounded', sans-serif" }}>Структурные подразделения</h2>
          <div className="flex flex-col gap-3">
            {DEPARTMENTS.map((d) => (
              <div key={d.name} className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden" style={{ background: d.headImg ? "transparent" : "rgba(163,230,53,0.1)" }}>
                  {d.headImg ? (
                    <img src={d.headImg} alt={d.head} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <User size={18} style={{ color: "#a3e635" }} />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold mb-1" style={{ color: "#e8f5e9", fontFamily: "'Unbounded', sans-serif" }}>{d.name}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif" }}>{d.position}: <span style={{ color: "rgba(255,255,255,0.7)" }}>{d.head}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl p-6 md:p-10" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(163,230,53,0.2)" }}>
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
