function CourseBenefitsSection() {
  return (
    <div className="h-[35.984px] relative shrink-0 w-full" data-name="CourseBenefitsSection">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[156.45px] not-italic text-[#1c98b7] text-[64px] top-[-0.52px] tracking-[1.2px] uppercase">Presentación del programa</p>
    </div>
  );
}

function CourseBenefitsSection1() {
  return (
    <div className="h-[54px] relative shrink-0 w-full" data-name="CourseBenefitsSection">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[53px] left-[322.08px] not-italic text-[#111827] text-[48px] top-[-0.52px]">Valor y resultados profesionales</p>
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[18px] items-start relative size-full" data-name="Container">
      <CourseBenefitsSection />
      <CourseBenefitsSection1 />
    </div>
  );
}