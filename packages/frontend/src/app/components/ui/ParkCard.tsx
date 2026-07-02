import { useState, memo } from "react";
import { Trees, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import type { ParkCard as ParkCardType } from '@lipetsk-parks/shared';

interface ParkCardProps {
  park: ParkCardType;
  onClick?: () => void;
}

function mapParkForUI(park: ParkCardType) {
  return {
    name: park.name,
    desc: park.shortDescription ?? park.description ?? '',
    img: park.images?.[0]?.url ?? 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format',
    tag: park.category ?? 'Парк',
    area: park.area ?? '',
    id: park.id,
  };
}

export const ParkCard = memo(function ParkCard({ park, onClick }: ParkCardProps) {
  const [hovered, setHovered] = useState(false);
  const uiPark = mapParkForUI(park);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={`
        rounded-2xl overflow-hidden cursor-pointer transition-all duration-500
        bg-white/5 backdrop-blur-xl
        border border-white/8 hover:border-green-400/35
        shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]
        hover:-translate-y-1
      `}
    >
      <div className="relative overflow-hidden h-40 bg-[#0a1f10]">
        <ImageWithFallback
          src={uiPark.img}
          alt={uiPark.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent 40% to-[#050f0d] 100%" />
        <span className="absolute top-3 left-3 text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full font-semibold
          bg-black/40 backdrop-blur-sm border border-white/12 text-white/75 font-unbounded">
          {uiPark.tag}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-1.5">
          <h3 className="font-bold leading-tight text-[#e8f5e9] font-unbounded text-[12px]">
            {uiPark.name}
          </h3>
          <span className="flex items-center gap-1 text-[10px] flex-shrink-0 ml-2 mt-0.5 text-white/35">
            <Trees size={10} /> {uiPark.area}
          </span>
        </div>
        <p className="text-xs leading-relaxed mb-3 text-white/45 font-inter">
          {uiPark.desc}
        </p>
        <button
          className="flex items-center gap-1.5 text-xs font-medium transition-all duration-200 font-inter
            hover:text-green-400
            text-white/35"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          Подробнее <ArrowRight size={11} />
        </button>
      </div>
    </div>
  );
});