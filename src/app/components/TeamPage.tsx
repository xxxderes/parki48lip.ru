import { useState, useEffect, useRef } from "react";
import { Mail, Phone } from "lucide-react";
import logoImg from "@/imports/logo.png";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { TEAM } from "@/app/data/teamData";
import type { TeamMember } from "@/app/data/teamData";

function useScrollReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return { ref, isVisible };
}

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

function MemberCard({ member }: { member: TeamMember }) {
  const [hovered, setHovered] = useState(false);
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className="transition-all duration-500"
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        opacity: isVisible ? 1 : 0,
      }}
    >
      {/* Photo area — портретный формат, крупный */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative w-full overflow-hidden cursor-pointer"
        style={{
          paddingBottom: "130%",
          borderRadius: "12px",
          background: "rgba(15, 25, 18, 0.5)",
        }}
      >
        {member.img ? (
          <img
            src={member.img}
            alt={member.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
            style={{
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.7s ease",
              borderRadius: "12px",
            }}
          />
        ) : (
          <div className="absolute inset-0">
            <AvatarPlaceholder initials={member.initials} />
          </div>
        )}
        {/* Hover overlay */}
        <div
          className="absolute inset-0 transition-all duration-500 pointer-events-none"
          style={{
            background: hovered
              ? "linear-gradient(to bottom, transparent 0%, rgba(163,230,53,0.08) 100%)"
              : "transparent",
          }}
        />
      </div>

      {/* Info BELOW the photo */}
      <div className="pt-4">
        <h3
          className="font-bold uppercase tracking-wide"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            color: "#ffffff",
            lineHeight: 1.3,
            marginBottom: "6px",
            height: "18px",
            overflow: "hidden",
          }}
        >
          {member.name}
        </h3>
        <p
          className="text-sm"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.4,
            marginBottom: "6px",
            height: "20px",
            overflow: "hidden",
          }}
        >
          {member.role}
        </p>
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="block text-sm"
            style={{
              color: "#ffffff",
              textDecoration: "underline",
              fontFamily: "'Inter', sans-serif",
              marginBottom: "2px",
              height: "18px",
              overflow: "hidden",
            }}
          >
            {member.email}
          </a>
        )}
        {member.phone && (
          <a
            href={`tel:${member.phone.replace(/[^\d+]/g, "")}`}
            className="block text-sm hover:no-underline"
            style={{
              color: "#ffffff",
              textDecoration: "underline",
              fontFamily: "'Inter', sans-serif",
              height: "18px",
              overflow: "hidden",
            }}
          >
            {member.phone}
          </a>
        )}
      </div>
    </div>
  );
}

export function TeamPage() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal(0);
  const { ref: photoRef, isVisible: photoVisible } = useScrollReveal(200);
  const { ref: quoteRef, isVisible: quoteVisible } = useScrollReveal(400);
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal(600);

  return (
    <div
      className="min-h-screen w-full pt-[200px] pb-24 relative z-10"
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "rgba(5,15,8,0.35)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* HEADER: Заголовок + Слоган */}
      <div
        ref={headerRef}
        className="px-6 md:px-10 mb-12 transition-all duration-700 ease-out"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(30px)",
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <p
            className="text-xs uppercase tracking-widest font-semibold mb-4"
            style={{ color: "#a3e635", fontFamily: "'Unbounded', sans-serif" }}
          >
            МАУК «Культурные пространства Липецка»
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
            Наша команда
          </h1>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.5)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Создаём комфортную городскую среду и культурную жизнь парков Липецка
          </p>
        </div>
      </div>

      {/* FULL-WIDTH PHOTO */}
      <div
        ref={photoRef}
        className="px-6 md:px-10 mb-8 transition-all duration-700 ease-out"
        style={{
          opacity: photoVisible ? 1 : 0,
          transform: photoVisible ? "translateY(0)" : "translateY(30px)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className="relative w-full overflow-hidden rounded-2xl flex items-center justify-center"
            style={{
              height: "clamp(200px, 30vw, 400px)",
              background: "linear-gradient(135deg, rgba(74,222,128,0.1) 0%, rgba(45,212,191,0.05) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p
              className="text-sm uppercase tracking-widest font-semibold"
              style={{
                color: "rgba(255,255,255,0.3)",
                fontFamily: "'Unbounded', sans-serif",
              }}
            >
              Общее фото команды
            </p>
          </div>
        </div>
      </div>

      {/* QUOTE */}
      <div
        ref={quoteRef}
        className="px-6 md:px-10 mb-16 transition-all duration-700 ease-out"
        style={{
          opacity: quoteVisible ? 1 : 0,
          transform: quoteVisible ? "translateY(0)" : "translateY(30px)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="w-full flex justify-end">
            <p
              className="text-lg md:text-xl lg:text-2xl leading-relaxed font-medium"
              style={{
                color: "#ffffff",
                fontFamily: "'Inter', sans-serif",
                maxWidth: "600px",
              }}
            >
              Мы верим, что парки — это места, где рождаются эмоции. И делаем всё, чтобы каждый визит оставил светлые воспоминания
            </p>
          </div>
        </div>
      </div>

      {/* TEAM GRID */}
      <div
        ref={cardsRef}
        className="px-6 md:px-10 mb-16 transition-all duration-700 ease-out"
        style={{
          opacity: cardsVisible ? 1 : 0,
          transform: cardsVisible ? "translateY(0)" : "translateY(30px)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Grid: 4 на ПК, 3 на lg, 2 на md, 1 на мобильном */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {TEAM.map((member, index) => (
              <MemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer
        className="relative z-10 px-6 md:px-10 py-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
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
