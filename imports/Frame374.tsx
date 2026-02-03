import svgPaths from "./svg-2v446xmn32";

function Icon1() {
  return (
    <div className="absolute contents inset-[12.5%_8.33%]" data-name="Icon">
      <div className="absolute inset-[62.5%_33.33%_12.5%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.5777 12.7888">
            <path d={svgPaths.p3a334480} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.19721" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[13.03%_20.85%_54.7%_66.67%]" data-name="Vector_2">
        <div className="absolute inset-[-12.92%_-33.38%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.98731 15.5776">
            <path d={svgPaths.p3d693400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.19721" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[63.04%_8.33%_12.5%_79.17%]" data-name="Vector_3">
        <div className="absolute inset-[-17.04%_-33.33%_-17.04%_-33.34%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.99341 12.5813">
            <path d={svgPaths.p2b1c3b00} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.19721" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_45.84%_54.16%_20.83%]" data-name="Vector_4">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.986 15.986">
            <path d={svgPaths.p31285800} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.19721" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[38.366px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="content-stretch flex flex-col h-[38.366px] items-start relative shrink-0 w-full" data-name="Icon7">
      <Icon />
    </div>
  );
}

function Container() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#0b95ba] items-start pb-[1.169px] pl-[12.125px] pr-[12.034px] pt-[12.125px] relative rounded-[10.967px] shrink-0 size-[62.526px] to-[#087a98]" data-name="Container5">
      <div aria-hidden="true" className="absolute border-[#1c98b7] border-[1.169px] border-solid inset-0 pointer-events-none rounded-[10.967px]" />
      <Icon2 />
    </div>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex h-[75.966px] items-start left-0 top-[-4.67px] w-[115.884px]" data-name="Text">
      <p className="flex-[1_0_0] font-['Bricolage_Grotesque:Bold',sans-serif] font-bold leading-[61.361px] min-h-px min-w-px relative text-[#1c98b7] text-[63.315px] text-center whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        700
      </p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute content-stretch flex h-[85.315px] items-start left-[115.88px] top-[-12.86px] w-[37.563px]" data-name="Text">
      <p className="font-['Bricolage_Grotesque:Bold',sans-serif] font-bold leading-[61.361px] relative shrink-0 text-[#1c98b7] text-[71.132px] text-center" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        +
      </p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[64.863px] relative shrink-0 w-[153.447px]" data-name="Paragraph">
      <Text />
      <Text1 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[58.947px] relative shrink-0 w-[226.674px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Bricolage_Grotesque:Bold',sans-serif] font-bold leading-[29.469px] left-[116.77px] text-[#0a0a0a] text-[27.655px] text-center top-[-0.34px] uppercase w-[233px] whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        Profesionales capacitados
      </p>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white content-start flex flex-wrap gap-[11px_17px] items-start px-[92px] py-[28px] relative rounded-[34.493px] shadow-[0px_3.538px_3.538px_0px_rgba(0,0,0,0.25)] size-full">
      <Container />
      <Paragraph />
      <Paragraph1 />
    </div>
  );
}