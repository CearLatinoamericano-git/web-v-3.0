import svgPaths from "./svg-4fnysd0qd1";


function Paragraph() {
  return (
    <div className="h-[35.984px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[684.36px] not-italic text-[#ee8a28] text-[64px] text-center top-[-0.52px] tracking-[1.2px] translate-x-[-50%] uppercase">Plana docente</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[54px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[53px] left-[684.56px] not-italic text-[#111827] text-[48px] text-center top-[-0.52px] translate-x-[-50%]">Especialistas en la materia</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[13.5px] h-[103.484px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph />
      <Heading />
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="absolute h-[234px] left-0 top-0 w-[175.5px]" data-name="ImageWithFallback">
      <div className="absolute inset-0 bg-gray-200 size-full" />
    </div>
  );
}

function Container5() {
  return <div className="absolute border-4 border-solid border-white h-[234px] left-[-0.25px] rounded-[27px] top-0 w-[175.5px]" data-name="Container" />;
}

function Container4() {
  return (
    <div className="absolute h-[234px] left-[-87.75px] opacity-30 overflow-clip rounded-[27px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] top-[68px] w-[175.5px]" data-name="Container">
      <ImageWithFallback />
      <Container5 />
    </div>
  );
}

function ImageWithFallback1() {
  return (
    <div className="absolute h-[234px] left-0 top-0 w-[175.5px]" data-name="ImageWithFallback">
      <div className="absolute inset-0 bg-gray-200 size-full" />
    </div>
  );
}

function Container7() {
  return <div className="absolute border-4 border-solid border-white h-[234px] left-0 rounded-[27px] top-0 w-[175.5px]" data-name="Container" />;
}

function Container6() {
  return (
    <div className="absolute h-[234px] left-[1208.25px] opacity-30 overflow-clip rounded-[27px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] top-[68px] w-[175.5px]" data-name="Container">
      <ImageWithFallback1 />
      <Container7 />
    </div>
  );
}

function ImageWithFallback2() {
  return (
    <div className="absolute h-[234px] left-0 top-0 w-[175.5px]" data-name="ImageWithFallback">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute h-full left-[-16.67%] max-w-none top-0 w-[133.33%] bg-gray-200" />
      </div>
    </div>
  );
}

function Container9() {
  return <div className="absolute border-4 border-solid border-white h-[234px] left-0 rounded-[27px] top-0 w-[175.5px]" data-name="Container" />;
}

function Container8() {
  return (
    <div className="absolute h-[234px] left-[171.44px] overflow-clip rounded-[27px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] top-[68px] w-[175.5px]" data-name="Container">
      <ImageWithFallback2 />
      <Container9 />
    </div>
  );
}

function ImageWithFallback3() {
  return (
    <div className="absolute h-[234px] left-[-0.05px] top-0 w-[175.5px]" data-name="ImageWithFallback">
      <div className="absolute inset-0 bg-gray-200 size-full" />
    </div>
  );
}

function Container11() {
  return <div className="absolute border-4 border-solid border-white h-[234px] left-0 rounded-[27px] top-0 w-[175.5px]" data-name="Container" />;
}

function Container10() {
  return (
    <div className="absolute h-[234px] left-[949.05px] overflow-clip rounded-[27px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] top-[68px] w-[175.5px]" data-name="Container">
      <ImageWithFallback3 />
      <Container11 />
    </div>
  );
}

function ImageWithFallback4() {
  return (
    <div className="absolute h-[384px] left-0 top-0 w-[288px]" data-name="ImageWithFallback">
      <div className="absolute inset-0 bg-gray-200 size-full" />
    </div>
  );
}

function Container13() {
  return <div className="absolute border-6 border-solid border-white h-[384px] left-0 rounded-[27px] top-0 w-[288px]" data-name="Container" />;
}

function Container12() {
  return (
    <div className="absolute h-[384px] left-[504px] overflow-clip rounded-[27px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] top-[-7px] w-[288px]" data-name="Container">
      <ImageWithFallback4 />
      <Container13 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[370px] left-[36px] top-[25.48px] w-[1296px]" data-name="Container">
      <Container4 />
      <Container6 />
      <Container8 />
      <Container10 />
      <Container12 />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[31.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.5 31.5">
        <g id="Icon">
          <path d={svgPaths.p211ad00} id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-[36px] rounded-[33554400px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] size-[63px] top-[178.98px]" data-name="Button">
      <Icon />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[31.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.5 31.5">
        <g id="Icon">
          <path d={svgPaths.p31696290} id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-[1269px] rounded-[33554400px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] size-[63px] top-[178.98px]" data-name="Button">
      <Icon1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[420px] relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Button />
      <Button1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-[#ee8a28] content-stretch flex items-center justify-center left-[472px] p-[10px] rounded-[9px] top-[-20.45px] w-[387px]">
      <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[36px] not-italic relative shrink-0 text-[27px] text-center text-white">Jimmy Pisfil Chafloque</p>
    </div>
  );
}

function InstructorsCarousel1() {
  return (
    <div className="absolute h-[35.984px] left-[18px] top-[0.48px] w-[1332px]" data-name="InstructorsCarousel">
      <Frame />
    </div>
  );
}

function InstructorsCarousel2() {
  return (
    <div className="absolute h-[102.375px] left-[252px] top-[54.47px] w-[864px]" data-name="InstructorsCarousel">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[25.594px] left-[432px] not-italic text-[15.75px] text-[rgba(0,0,0,0.95)] text-center top-[-1px] translate-x-[-50%] w-[864px]">Abogado y especialista con más de 18 años de trayectoria profesional. Ha ocupado cargos estratégicos en entidades destacadas y cuenta con amplia experiencia en arbitraje nacional e internacional, participando en más de 600 arbitrajes como presidente de tribunal arbitral, árbitro único e integrante de tribunales arbitrales. Actualmente es árbitro del Registro Nacional de Árbitros (RNA), consultor especializado y docente.</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[156.359px] relative shrink-0 w-full" data-name="Container">
      <InstructorsCarousel1 />
      <InstructorsCarousel2 />
    </div>
  );
}

function InstructorsCarousel() {
  return (
    <div className="content-stretch flex flex-col gap-[27px] h-[675.359px] items-start relative shrink-0 w-full" data-name="InstructorsCarousel">
      <Container2 />
      <Container14 />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[823.844px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[45px] items-start px-[36px] relative size-full">
        <Container1 />
        <InstructorsCarousel />
      </div>
    </div>
  );
}

export default function Section() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start pt-[58px] px-[110px] relative size-full" data-name="Section">
      <Container />
    </div>
  );
}