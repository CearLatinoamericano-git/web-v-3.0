import svgPaths from "./svg-kpmh4ln24k";

function Heading() {
  return (
    <div className="absolute h-[54px] left-0 top-[85px] w-[1368px]" data-name="Heading 2">
      <p className="absolute css-4hzbpn font-['Inter:Bold',sans-serif] font-bold h-[134px] leading-[63.823px] left-[674px] not-italic text-[#ee8a28] text-[63.823px] text-center top-[-17px] translate-x-[-50%] uppercase w-[732px]">¿Por qué elegirnos?</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[66px] left-[252px] top-[147px] w-[864px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[33px] left-[432px] not-italic text-[28px] text-black text-center top-0 translate-x-[-50%] w-[930px]">Ventajas que nos posicionan como líderes en formación continua</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[235px] relative shrink-0 w-[1368px]" data-name="Container">
      <Heading />
      <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-['Inter:Regular',sans-serif] font-bold font-normal leading-[0] left-[684.5px] lowercase not-italic text-[0px] text-[48px] text-black text-center top-[23px] tracking-[1.2px] translate-x-[-50%]">
        <span className="leading-[34.286px] uppercase">B</span>
        <span className="leading-[34.286px]">{`ENEFICIOS `}</span>
        <span className="leading-[34.286px] uppercase">E</span>
        <span className="leading-[34.286px]">XCLUSIVOS</span>
      </p>
      <Paragraph />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[53.788px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53.7876 53.7876">
        <g id="Icon">
          <path d="M26.8945 22.4116H26.9165" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
          <path d="M26.8945 31.376H26.9165" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
          <path d="M26.8945 13.447H26.9165" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
          <path d="M35.8592 22.4116H35.8811" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
          <path d="M35.8592 31.376H35.8811" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
          <path d="M35.8592 13.447H35.8811" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
          <path d="M17.9297 22.4116H17.9517" id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
          <path d="M17.9297 31.376H17.9517" id="Vector_8" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
          <path d="M17.9297 13.447H17.9517" id="Vector_9" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
          <path d={svgPaths.p29eec80} id="Vector_10" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
          <path d={svgPaths.p5c65b00} id="Vector_11" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[#1c98b7] content-stretch flex h-[115.046px] items-center justify-center relative rounded-[19.21px] shrink-0 w-[113.552px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[54.765px] not-italic relative shrink-0 text-[32px] text-black text-center">Trayectoria sólida</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-end relative shrink-0 w-[367.548px]">
      <Frame />
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[26px] not-italic relative shrink-0 text-[20px] text-black w-full">
        <p className="css-4hzbpn mb-0">{`Experiencia respaldada `}</p>
        <p className="css-4hzbpn">por convenios universitarios</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[13.447px] items-center relative shrink-0 w-full">
      <Container2 />
      <Frame1 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start p-[14.941px] relative w-full">
        <div className="h-0 relative shrink-0 w-[486.329px]">
          <div className="absolute inset-[-1.5px_0]" style={{ "--stroke-0": "rgba(238, 138, 40, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 486.329 3">
              <path d="M0 1.5H486.329" id="Vector 8" stroke="var(--stroke-0, #EE8A28)" strokeWidth="3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[66.804px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66.8039 66.8039">
        <g id="Icon">
          <path d={svgPaths.p3fee3a17} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.56699" />
          <path d={svgPaths.p24596580} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.56699" />
          <path d={svgPaths.p2b409000} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.56699" />
          <path d={svgPaths.p28dcbb00} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.56699" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#1c98b7] content-stretch flex h-[115.046px] items-center justify-center relative rounded-[19.21px] shrink-0 w-[113.552px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[54.765px] not-italic relative shrink-0 text-[32px] text-black text-center">Docentes expertos</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col items-start justify-end relative shrink-0 w-[367.548px]">
      <Frame9 />
      <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[26px] not-italic relative shrink-0 text-[20px] text-black w-full">Docentes con amplia experiencia profesional comprobrada</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[13.447px] items-center relative shrink-0 w-[494.547px]">
      <Container3 />
      <Frame6 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[516.211px]">
      <Frame2 />
      <Frame4 />
      <Frame3 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[66.895px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66.8947 66.8947">
        <g id="Icon">
          <path d={svgPaths.p12e7a200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.57456" />
          <path d="M33.4473 47.3835V58.5327" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.57456" />
          <path d="M22.298 58.5328H44.5963" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.57456" />
          <path d={svgPaths.p37c58740} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.57456" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[#1c98b7] content-stretch flex h-[115.046px] items-center justify-center relative rounded-[19.21px] shrink-0 w-[113.552px]" data-name="Container">
      <Icon2 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[54.765px] not-italic relative shrink-0 text-[32px] text-black text-center">Formación virtual</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col items-start justify-end relative shrink-0 w-[367.548px]">
      <Frame13 />
      <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[26px] not-italic relative shrink-0 text-[20px] text-black w-full">Plataforma virtual moderna para formación profesional</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[13.447px] items-center relative shrink-0 w-full">
      <Container4 />
      <Frame12 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start p-[14.941px] relative w-full">
        <div className="h-0 relative shrink-0 w-[486.329px]">
          <div className="absolute inset-[-1.5px_0]" style={{ "--stroke-0": "rgba(238, 138, 40, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 486.329 3">
              <path d="M0 1.5H486.329" id="Vector 8" stroke="var(--stroke-0, #EE8A28)" strokeWidth="3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[73.512px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 73.5119 73.5119">
        <g id="Icon">
          <path d={svgPaths.p3f4b0d00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6.12599" />
          <path d={svgPaths.p15399a00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6.12599" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#1c98b7] content-stretch flex h-[115.046px] items-center justify-center relative rounded-[19.21px] shrink-0 w-[113.552px]" data-name="Container">
      <Icon3 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[54.765px] not-italic relative shrink-0 text-[32px] text-black text-center">Flexibilidad total</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col items-start justify-end relative shrink-0 w-[367.548px]">
      <Frame18 />
      <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[26px] not-italic relative shrink-0 text-[20px] text-black w-full">Horarios flexibles adaptables a profesionales en actividad</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex gap-[13.447px] items-center relative shrink-0 w-[494.547px]">
      <Container5 />
      <Frame16 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[516.211px]">
      <Frame11 />
      <Frame14 />
      <Frame15 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[137px] items-center relative shrink-0">
      <Frame5 />
      <Frame10 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[1116px]">
      <Frame7 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col items-start px-4 sm:px-8 md:px-16 lg:px-[144px] relative shrink-0">
      <Frame8 />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] h-[620px] items-start left-[119px] px-[36px] top-[48px] w-[1440px]" data-name="Container">
      <Container1 />
      <Frame17 />
    </div>
  );
}

export default function Section() {
  return (
    <div className="bg-[#f9fafb] relative size-full" data-name="Section">
      <Container />
    </div>
  );
}