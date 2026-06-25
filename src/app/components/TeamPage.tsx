import { useState } from "react";
import { Mail, Phone, Briefcase } from "lucide-react";
import logoImg from "@/imports/logo.png";
import sitnikovImg from "@/imports/sitnikov.webp";
import chernikovImg from "@/imports/vladimirvladimirovich.jpg";
import zhidkovImg from "@/imports/ZhidkovVyacheslavIgorevich.jpg";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface TeamMember {
  name: string;
  role: string;
  email?: string;
  phone?: string;
  img?: string;
  initials: string;
}

const TEAM: TeamMember[] = [
  {
    name: "Ситников Олег Николаевич",
    role: "Директор",
    email: "park48lip@ya.ru",
    phone: "+7 (4742) 56-60-01",
    img: sitnikovImg,
    initials: "СО",
  },
  {
    name: "Черников Владимир Владимирович",
    role: "Первый заместитель директора",
    email: "park48lip@ya.ru",
    img: chernikovImg,
    initials: "ЧВ",
  },
  {
    name: "Меляков Алексей Васильевич",
    role: "Заместитель директора по содержанию территорий",
    email: "park48lip@ya.ru",
    initials: "МА",
  },
  {
    name: "Демин Дмитрий Александрович",
    role: "Заместитель директора по культурно-досуговой деятельности",
    email: "park48lip@ya.ru",
    initials: "ДД",
  },
  {
    name: "Сальникова Виктория Викторовна",
    role: "Главный бухгалтер",
    email: "park48lip@ya.ru",
    initials: "СВ",
  },
  {
    name: "Жидков Вячеслав Игоревич",
    role: "Главный инженер",
    email: "park48lip@ya.ru",
    img: zhidkovImg,
    initials: "ЖВ",
  },
  {
    name: "Грозных Анна Сергеевна",
    role: "Начальник отдела материально-технического обеспечения",
    email: "park48lip@ya.ru",
    initials: "ГА",
  },
  {
    name: "Соболева Анна Павловна",
    role: "Начальник отдела по содержанию территорий",
    email: "park48lip@ya.ru",
    initials: "СА",
  },
];

function AvatarPlaceholder({ initials }: { initials: string }) {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, rgba(74,222,128,0.15) 0%, rgba(45,212,191,0.08) 100%)",
      }}
    >
      <span
        className="font-black tracking-tight"
        style={{
          fontFamily: "'Unbounded', sans-serif",
          fontSize: "clamp(2rem, 3vw, 3rem)",
          color: "rgba(163,230,53,0.25)",
        }}
      >
        {initials}
      </span>
    </div>
  );
}

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl overflow-hidden transition-all duration-500 flex flex-col md:flex-row"
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: hovered ? "1px solid rgba(74,222,128,0.35)" : "1px solid rgba(255,255,255,0.08)",
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.5)" : "0 8px 30px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Photo area */}
      <div
        className="relative w-full md:w-[200px] lg:w-[240px] flex-shrink-0 overflow-hidden"
        style={{ height: "260px", minHeight: "260px" }}
      >
        {member.img ? (
          <img
            src={member.img}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
          />
        ) : (
          <AvatarPlaceholder initials={member.initials} />
        )}
        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none md:hidden"
          style={{
            background: "linear-gradient(to bottom, transparent 50%, rgba(5,15,8,0.6) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-5 md:p-6">
        <div>
          <h3
            className="font-bold leading-tight mb-2"
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontSize: "18px",
              color: "#ffffff",
              letterSpacing: "-0.01em",
            }}
          >
            {member.name}
          </h3>
          <div className="flex items-center gap-2 mb-4">
            <Briefcase size={14} style={{ color: "#a3e635" }} />
            <p
              className="text-xs font-medium"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {member.role}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="flex items-center gap-2.5 text-xs transition-colors hover:text-white group"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              <Mail size={14} className="flex-shrink-0" style={{ color: "#a3e635" }} />
              <span className="group-hover:text-[#a3e635] transition-colors">
                {member.email}
              </span>
            </a>
          )}
          {member.phone && (
            <a
              href={`tel:${member.phone.replace(/[^\d+]/g, "")}`}
              className="flex items-center gap-2.5 text-xs transition-colors hover:text-white group"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              <Phone size={14} className="flex-shrink-0" style={{ color: "#a3e635" }} />
              <span className="group-hover:text-[#a3e635] transition-colors">
                {member.phone}
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function TeamPage() {
  return (
    <div
      className="min-h-screen w-full py-24 px-6 md:px-10 relative z-10"
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "rgba(5,15,8,0.92)",
        paddingTop: "160px",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p
            className="text-xs uppercase tracking-widest font-semibold mb-3"
            style={{ color: "#a3e635", fontFamily: "'Unbounded', sans-serif" }}
          >
            МАУК «Культурные пространства Липецка»
          </p>
          <h1
            className="text-3xl md:text-4xl font-black mb-4"
            style={{
              color: "#ffffff",
              fontFamily: "'Unbounded', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Наша команда
          </h1>
          <p
            className="text-sm max-w-2xl leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.5)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Профессионалы, создающие комфортную городскую среду и культурную жизнь парков Липецка
          </p>
        </div>

        {/* Team list */}
        <div className="flex flex-col gap-4">
          {TEAM.map((member, index) => (
            <MemberCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer
        className="relative z-10 px-6 md:px-10 py-8 mt-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <ImageWithFallback
            src={logoImg}
            alt="Культурные пространства Липецка"
            className="h-16 w-auto object-contain"
            style={{ filter: "brightness(0) invert(1)", opacity: 0.4 }}
          />
          <div className="flex items-center gap-6">
            {["О проекте", "Контакты", "Волонтёрам"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs transition-colors hover:text-white/60"
                style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
