function Frame1() {
  return (
    <div className="content-stretch flex font-normal gap-[20.429px] items-center relative shadow-[0px_4px_20px_0px_rgba(0,0,0,0.42)] shrink-0 text-center tracking-[-1.7167px] uppercase">
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[#111827] text-[0px]">
        <span className="font-['Bricolage_Grotesque:Medium',sans-serif] font-medium leading-[85.833px] text-[#ee8a28] text-[68.666px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
          Capacitación
        </span>
        <span className="font-['Bricolage_Grotesque:Medium',sans-serif] font-medium leading-[85.833px] text-[68.666px] text-white" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>{` `}</span>
        <span className="font-['Bricolage_Grotesque:Regular',sans-serif] leading-[85.833px] text-[57px] text-white" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
          para
        </span>
      </p>
      <p className="css-ew64yg font-['Bricolage_Grotesque:Regular',sans-serif] leading-[85.833px] relative shrink-0 text-[68.666px] text-white" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        instituciones
      </p>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center relative shadow-[0px_3.154px_3.154px_0px_rgba(0,0,0,0.25)] size-full">
      <Frame1 />
    </div>
  );
}