import svgPaths from "./svg-tyywjenkly";

function Frame() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
          <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] not-italic relative shrink-0 text-[#ee8a28] text-[64px] text-center tracking-[1.2px] uppercase">RUTAS DE FORMACIÓN</p>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
          <div className="css-g0mm18 font-['Inter:Regular',sans-serif] font-normal leading-[53px] not-italic relative shrink-0 text-[#111827] text-[48px] text-center">
            <p className="css-ew64yg mb-0">{`Formación especializada `}</p>
            <p className="css-ew64yg">para el desarrollo profesional.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start px-0 py-[48px] relative shrink-0 w-full">
      <Frame />
      <Frame3 />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="Icon">
          <path d={svgPaths.p3b305f00} id="Vector" stroke="var(--stroke-0, #1C98B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d={svgPaths.p151b3800} id="Vector_2" stroke="var(--stroke-0, #1C98B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d="M10.5 31.5469H25.5" id="Vector_3" stroke="var(--stroke-0, #1C98B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d="M18 4.54688V31.5469" id="Vector_4" stroke="var(--stroke-0, #1C98B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d={svgPaths.p1d594720} id="Vector_5" stroke="var(--stroke-0, #1C98B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center relative rounded-[15.25px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] shrink-0 size-[72px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 size-[92px]">
      <Container1 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame6 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-center justify-center p-[10px] relative shrink-0">
      <p className="css-ew64yg font-['Bricolage_Grotesque:Bold',sans-serif] font-bold leading-[28px] relative shrink-0 text-[33.099px] text-center text-white tracking-[0.6206px] uppercase" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        para árbitros
      </p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <Frame7 />
      <Frame8 />
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#1c98b7] relative rounded-tl-[18px] rounded-tr-[18px] shadow-[0px_10px_40px_0px_rgba(11,149,186,0.15)] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[39px] py-[33px] relative w-full">
        <Frame9 />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[58.5px] left-[59.5px] top-[19.05px] w-[484.5px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[29.25px] left-0 not-italic text-[18px] text-black top-px w-[472px]">DIPLOMADO EN CONTRATACIÓN PÚBLICA BAJO LA LEY 32069 Y SU REGLAMENTO</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[5px] size-[41px] top-[27.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 41">
        <g id="Icon">
          <path d={svgPaths.p2c776580} id="Vector" stroke="var(--stroke-0, #1C98B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.41667" />
          <path d={svgPaths.p18a557e0} id="Vector_2" stroke="var(--stroke-0, #1C98B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.41667" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[96.5px] relative rounded-[15.25px] shrink-0 w-full" data-name="Container">
      <Paragraph />
      <Icon1 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[58.5px] left-[59.5px] top-[19.05px] w-[484.5px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[29.25px] left-0 not-italic text-[18px] text-black top-px w-[435px]">DIPLOMADO DE ARBITRAJE EN CONTRATACIÓN PÚBLICA</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[5px] size-[41px] top-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 41">
        <g id="Icon">
          <path d={svgPaths.p2c776580} id="Vector" stroke="var(--stroke-0, #1C98B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.41667" />
          <path d={svgPaths.p18a557e0} id="Vector_2" stroke="var(--stroke-0, #1C98B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.41667" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[96.5px] relative rounded-[15.25px] shrink-0 w-full" data-name="Container">
      <Paragraph1 />
      <Icon2 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[58.5px] left-[59.5px] top-[19.05px] w-[484.5px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[29.25px] left-0 not-italic text-[18px] text-black top-px w-[438px]">DIPLOMADO DE DERECHO ADMINISTRATIVO PARA ÁRBITROS</p>
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[5px] size-[41px] top-[27.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 41">
        <g id="Icon">
          <path d={svgPaths.p2c776580} id="Vector" stroke="var(--stroke-0, #1C98B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.41667" />
          <path d={svgPaths.p18a557e0} id="Vector_2" stroke="var(--stroke-0, #1C98B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.41667" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[96.5px] relative rounded-[15.25px] shrink-0 w-full" data-name="Container">
      <Paragraph2 />
      <Icon3 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[58.5px] left-[59.5px] top-[19.05px] w-[484.5px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[29.25px] left-0 not-italic text-[18px] text-black top-px w-[480px]">CURSO DE CONTROVERSIAS EN LA EJECUCIÓN CONTRACTUAL</p>
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[5px] size-[41px] top-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 41">
        <g id="Icon">
          <path d={svgPaths.p2c776580} id="Vector" stroke="var(--stroke-0, #1C98B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.41667" />
          <path d={svgPaths.p18a557e0} id="Vector_2" stroke="var(--stroke-0, #1C98B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.41667" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[96.5px] relative rounded-[15.25px] shrink-0 w-full" data-name="Container">
      <Paragraph3 />
      <Icon4 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[440px] items-start pb-0 pt-[9px] px-[25px] relative shrink-0 w-[589px]" data-name="Container">
      <Container3 />
      <div className="h-0 relative shrink-0 w-[539px]">
        <div className="absolute inset-[-1.5px_-0.28%]" style={{ "--stroke-0": "rgba(28, 152, 183, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 542 3">
            <path d="M1.5 1.5H540.5" id="Vector 5" stroke="var(--stroke-0, #1C98B7)" strokeLinecap="round" strokeWidth="3" />
          </svg>
        </div>
      </div>
      <Container4 />
      <div className="h-0 relative shrink-0 w-[539px]">
        <div className="absolute inset-[-1.5px_-0.28%]" style={{ "--stroke-0": "rgba(28, 152, 183, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 542 3">
            <path d="M1.5 1.5H540.5" id="Vector 5" stroke="var(--stroke-0, #1C98B7)" strokeLinecap="round" strokeWidth="3" />
          </svg>
        </div>
      </div>
      <Container5 />
      <div className="h-0 relative shrink-0 w-[539px]">
        <div className="absolute inset-[-1.5px_-0.28%]" style={{ "--stroke-0": "rgba(28, 152, 183, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 542 3">
            <path d="M1.5 1.5H540.5" id="Vector 5" stroke="var(--stroke-0, #1C98B7)" strokeLinecap="round" strokeWidth="3" />
          </svg>
        </div>
      </div>
      <Container6 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-white h-[637px] relative rounded-[20px] shrink-0 w-[589px]">
      <div className="content-stretch flex flex-col gap-[10px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Container />
        <Container2 />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-[#1c98b7] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="Icon">
          <path d={svgPaths.p178e2f00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d={svgPaths.p34263300} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#1c98b7] content-stretch flex items-center justify-center relative rounded-[15.25px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] shrink-0 size-[72px]" data-name="Container">
      <Icon5 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-center mr-[-92px] p-[10px] relative shrink-0 size-[92px]">
      <Container8 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px mr-[-92px] relative">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
          <p className="css-4hzbpn flex-[1_0_0] font-['Bricolage_Grotesque:Bold',sans-serif] font-bold leading-[28px] min-h-px min-w-px relative text-[33.099px] text-black text-center tracking-[0.6206px] uppercase" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>{`para  ádjudicadores`}</p>
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex items-center pl-0 pr-[92px] py-0 relative shrink-0 w-[599px]">
      <Frame13 />
      <Frame5 />
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-white relative rounded-tl-[18px] rounded-tr-[18px] shadow-[0px_10px_40px_0px_rgba(11,149,186,0.15)] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[39px] py-[33px] relative w-full">
        <Frame12 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[5px] size-[41px] top-[27.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 41">
        <g id="Icon">
          <path d={svgPaths.p2c776580} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.41667" />
          <path d={svgPaths.p18a557e0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.41667" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[58.5px] left-[59.5px] top-[19.05px] w-[484.5px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[29.25px] left-0 not-italic text-[18px] text-white top-px w-[472px]">CURSO DE JUNTA DE PREVENCIÓN Y RESOLUCIÓN DE DISPUTAS</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[96.5px] relative rounded-[15.25px] shrink-0 w-full" data-name="Container">
      <Icon6 />
      <Paragraph4 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute left-[5px] size-[41px] top-[27.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 41">
        <g id="Icon">
          <path d={svgPaths.p7e8a300} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.41667" />
          <path d={svgPaths.p18a557e0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.41667" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[58.5px] left-[59.5px] top-[19.05px] w-[484.5px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[29.25px] left-0 not-italic text-[18px] text-white top-px w-[435px]">CURSO DE EJECUCIÓN CONTRACTUAL DE OBRAS PÚBLICAS</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[96.5px] relative rounded-[15.25px] shrink-0 w-full" data-name="Container">
      <Icon7 />
      <Paragraph5 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-[5px] size-[41px] top-[27.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 41">
        <g id="Icon">
          <path d={svgPaths.p7e8a300} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.41667" />
          <path d={svgPaths.p18a557e0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.41667" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="absolute h-[58.5px] left-[59.5px] top-[19.05px] w-[484.5px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[29.25px] left-0 not-italic text-[18px] text-white top-px w-[438px]">CURSO DE CONTRATOS ESTANDARIZADOS: NEC Y FIDIC</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[96.5px] relative rounded-[15.25px] shrink-0 w-full" data-name="Container">
      <Icon8 />
      <Paragraph6 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute left-[5px] size-[41px] top-[27.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 41">
        <g id="Icon">
          <path d={svgPaths.p7e8a300} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.41667" />
          <path d={svgPaths.p18a557e0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.41667" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute h-[58.5px] left-[59.5px] top-[19.05px] w-[484.5px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[29.25px] left-0 not-italic text-[18px] text-white top-px w-[480px]">CURSO DE MECANISMOS DE INVERSIÓN PRIVADA: APP, OxI Y G2G</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[96.5px] relative rounded-[15.25px] shrink-0 w-full" data-name="Container">
      <Icon9 />
      <Paragraph7 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[440px] items-start pb-0 pt-[9px] px-[25px] relative shrink-0 w-[589px]" data-name="Container">
      <Container10 />
      <div className="h-0 relative shrink-0 w-[539px]">
        <div className="absolute inset-[-1.5px_-0.28%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 542 3">
            <path d="M1.5 1.5H540.5" id="Vector 7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="3" />
          </svg>
        </div>
      </div>
      <Container11 />
      <div className="h-0 relative shrink-0 w-[539px]">
        <div className="absolute inset-[-1.5px_-0.28%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 542 3">
            <path d="M1.5 1.5H540.5" id="Vector 7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="3" />
          </svg>
        </div>
      </div>
      <Container12 />
      <div className="h-0 relative shrink-0 w-[539px]">
        <div className="absolute inset-[-1.5px_-0.28%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 542 3">
            <path d="M1.5 1.5H540.5" id="Vector 7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="3" />
          </svg>
        </div>
      </div>
      <Container13 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#1c98b7] h-[637px] relative rounded-[20px] shrink-0 w-[589px]">
      <div className="content-stretch flex flex-col gap-[10px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Container7 />
        <Container9 />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-[#1c98b7] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[32px] items-center justify-center relative shrink-0 w-full">
      <Frame2 />
      <Frame1 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[10px] relative w-full">
          <Frame10 />
        </div>
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="bg-white h-[737px] relative shrink-0 w-full" data-name="Section">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-4 sm:px-8 md:px-16 lg:px-[110px] py-0 relative size-full">
          <Frame11 />
        </div>
      </div>
    </div>
  );
}

export default function Frame14() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full">
      <Frame4 />
      <Section />
    </div>
  );
}