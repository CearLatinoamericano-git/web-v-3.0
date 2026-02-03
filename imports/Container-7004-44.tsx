import { Star, MapPin } from 'lucide-react';
import Icon from './Icon';

export default function InstructorCard() {
  return (
    <div className="bg-white/95 backdrop-blur-sm relative rounded-[14px] shadow-[0px_25px_45px_-10px_rgba(0,0,0,0.25)] w-[420px] h-auto px-4 pt-2.5 pb-2.5 overflow-hidden">
      {/* Top Section - Rating and Experience */}
      <div className="flex items-center gap-2 mb-1.5">
        {/* Stars */}
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-3.5 h-3.5 fill-[#FDB022] text-[#FDB022]" />
          ))}
        </div>
        {/* Experience Badge */}
        <div className="flex items-center gap-1.5 bg-transparent">
          <Icon className="w-2.5 h-2.5" />
          <span className="font-['Inter'] font-normal text-[#667085] text-[12px]">16+ años</span>
        </div>
      </div>

      {/* Name */}
      <h3 className="font-['Inter'] font-bold text-[#344054] text-[15px] leading-5 mb-0.5">
        Natalia Mori Torres
      </h3>

      {/* Profession */}
      <p className="font-['Inter'] font-normal text-[#667085] text-[12px] leading-4 mb-2">
        Abogada
      </p>

      {/* Description with border */}
      <div className="relative bg-gradient-to-r from-[rgba(11,165,201,0.03)] to-transparent rounded-[6px] pl-3 pr-2.5 py-2.5 border-l-[2px] border-[#0BA5C9]">
        <p className="font-['Inter'] font-normal text-[#475467] text-[11.5px] leading-[16px]">
          Especialista en derecho administrativo, Asociaciones Público-Privadas (APPs) y arbitraje nacional e internacional
        </p>
      </div>

      {/* Pin Icon - Top Right */}
      <div className="absolute top-2.5 right-3.5 bg-[rgba(11,165,201,0.08)] rounded-[7px] p-1.5">
        <MapPin className="w-[16px] h-[16px] text-[#0BA5C9] stroke-[1.5]" />
      </div>
    </div>
  );
}