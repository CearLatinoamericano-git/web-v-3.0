import svgPaths from "./svg-bzgeciv2rg";

function Container1() {
  return <div className="absolute bg-[rgba(255,255,255,0)] border-5 border-[#1c98b7] border-solid h-[337px] left-0 rounded-[36px] top-0 w-[426px]" data-name="Container" />;
}

function Icon() {
  return (
    <div className="absolute left-[18px] size-[63px] top-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 63 63">
        <g id="Icon">
          <path d={svgPaths.p18776990} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.25" />
          <path d={svgPaths.p399c6500} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.25" />
          <path d={svgPaths.p1023c300} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.25" />
          <path d={svgPaths.pb82b000} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.25" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bg-gradient-to-b border-2 border-[#1c98b7] border-solid from-[#0b95ba] left-[116px] rounded-[18px] size-[103px] to-[#087a98] top-[-20.28px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute h-[78.5px] left-[-22px] top-[96.72px] w-[390.756px]" data-name="Container">
      <p className="absolute css-ew64yg font-['Bricolage_Grotesque:Bold',sans-serif] font-bold leading-[78.5px] left-[195.79px] text-[#1c98b7] text-[81px] text-center top-[1.16px] translate-x-[-50%]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        700+
      </p>
    </div>
  );
}

function Paragraph() {
  return <div className="absolute h-[31.5px] left-0 top-[230.72px] w-[336px]" data-name="Paragraph" />;
}

function Container2() {
  return (
    <div className="absolute h-[247px] left-[45px] top-[45px] w-[336px]" data-name="Container">
      <Container3 />
      <Container4 />
      <Paragraph />
      <p className="absolute css-4hzbpn font-['Bricolage_Grotesque:Bold',sans-serif] font-bold leading-[26px] left-[160px] text-[28px] text-[rgba(255,255,255,0.95)] text-center top-[217.72px] translate-x-[-50%] uppercase w-[336px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        Profesionales capacitados
      </p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[337px] overflow-clip relative rounded-[27px] shrink-0 w-[426px]" data-name="Container">
      <Container1 />
      <div className="absolute bg-[#ee8a28] h-[93px] left-0 top-[243.72px] w-[426px]" />
      <Container2 />
    </div>
  );
}

function Container6() {
  return <div className="absolute border-5 border-[#1c98b7] border-solid h-[337px] left-0 rounded-[35px] top-0 w-[426px]" data-name="Container" />;
}

function Icon1() {
  return (
    <div className="absolute left-[20px] size-[63px] top-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 63 63">
        <g id="Icon">
          <path d="M31.5 18.375V55.125" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.25" />
          <path d={svgPaths.p6299500} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.25" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-gradient-to-b from-[#0b95ba] left-[116.5px] rounded-[18px] size-[103px] to-[#087a98] top-[-21.28px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute h-[81.5px] left-[-28px] top-[96.72px] w-[405.689px]" data-name="Container">
      <p className="absolute css-ew64yg font-['Bricolage_Grotesque:Bold',sans-serif] font-bold leading-[81.5px] left-[203.68px] text-[#1c98b7] text-[81.5px] text-center top-[1.21px] translate-x-[-50%]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        20+
      </p>
    </div>
  );
}

function Paragraph1() {
  return <div className="absolute h-[31.5px] left-0 top-[215.5px] w-[336px]" data-name="Paragraph" />;
}

function Container7() {
  return (
    <div className="absolute h-[247px] left-[45px] top-[45px] w-[336px]" data-name="Container">
      <Container8 />
      <Container9 />
      <Paragraph1 />
      <p className="absolute css-4hzbpn font-['Bricolage_Grotesque:Bold',sans-serif] font-bold leading-[26.857px] left-[176px] text-[28px] text-[rgba(255,255,255,0.95)] text-center top-[215.72px] translate-x-[-50%] uppercase w-[306px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        Programas especializados
      </p>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[337px] overflow-clip relative rounded-[27px] shrink-0 w-[426px]" data-name="Container">
      <Container6 />
      <div className="absolute bg-[#ee8a28] h-[93px] left-0 top-[243.72px] w-[426px]" />
      <Container7 />
    </div>
  );
}

function Container11() {
  return <div className="absolute border-5 border-[#1c98b7] border-solid h-[337px] left-0 rounded-[35px] top-0 w-[426px]" data-name="Container" />;
}

function Frame() {
  return (
    <div className="absolute content-stretch flex font-['Bricolage_Grotesque:Bold',sans-serif] font-bold gap-[4px] items-center leading-[67.5px] left-[-16.5px] text-[#1c98b7] text-center top-[130.28px] w-[154px]">
      <p className="css-ew64yg relative shrink-0 text-[81px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        95
      </p>
      <p className="css-ew64yg relative shrink-0 text-[48px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        %
      </p>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute bg-gradient-to-b from-[#0b95ba] left-[116.5px] rounded-[18px] size-[103px] to-[#087a98] top-[-21.28px]" data-name="Container">
      <Frame />
    </div>
  );
}

function Paragraph2() {
  return <div className="absolute h-[31.5px] left-0 top-[215.5px] w-[336px]" data-name="Paragraph" />;
}

function Container12() {
  return (
    <div className="absolute h-[247px] left-[45px] top-[45px] w-[336px]" data-name="Container">
      <Container13 />
      <Paragraph2 />
      <p className="absolute css-4hzbpn font-['Bricolage_Grotesque:Bold',sans-serif] font-bold leading-[31.5px] left-[176px] text-[28px] text-[rgba(255,255,255,0.95)] text-center top-[215.72px] translate-x-[-50%] uppercase w-[306px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        Reconocimiento académico
      </p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[181px] size-[63px] top-[42px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 63 63">
        <g id="Icon">
          <path d={svgPaths.p242fd280} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.25" />
          <path d={svgPaths.p1e72a180} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.25" />
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[337px] overflow-clip relative rounded-[27px] shrink-0 w-[426px]" data-name="Container">
      <Container11 />
      <div className="absolute bg-[#ee8a28] h-[93px] left-0 top-[243.72px] w-[426px]" />
      <Container12 />
      <Icon2 />
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[45px] items-start justify-center relative size-full">
      <Container />
      <Container5 />
      <Container10 />
    </div>
  );
}