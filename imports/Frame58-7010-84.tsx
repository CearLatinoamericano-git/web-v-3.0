import svgPaths from "./svg-dg4nfvpdt9";


function Text() {
  return (
    <div className="bg-[#1c98b7] h-[25px] relative rounded-[33554400px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.2)] shrink-0 w-full" data-name="Text">
      <div className="content-stretch flex items-start px-[13.5px] py-[4.5px] relative size-full">
        <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[18px] min-h-px min-w-px not-italic relative text-[13.5px] text-center text-white">Cursos</p>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[15px] pr-[10px] py-[10px] relative shrink-0 w-[140px]">
      <Text />
    </div>
  );
}

function Cursos() {
  return (
    <div className="content-stretch flex flex-col h-[207px] items-start p-[10px] relative shrink-0 w-[432px]" data-name="Cursos">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[104.83%] left-0 max-w-none top-[-0.17%] w-full" src={imgCursos} />
      </div>
      <Frame7 />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex items-start pl-0 pr-[10px] py-0 relative w-full">
        <p className="css-4hzbpn flex-[1_0_0] font-['Bricolage_Grotesque:Regular',sans-serif] font-normal h-[24px] leading-[24.75px] min-h-px min-w-px relative text-[#ee8a28] text-[20px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
          III Curso de Especialidad
        </p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative w-full">
      <p className="css-4hzbpn font-['Inter:Semi_Bold',sans-serif] font-semibold h-full leading-[29px] not-italic relative shrink-0 text-[#1c98b7] text-[30px] w-[396px]">Junta de Prevención y Resolución de Disputas</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full">
      <Frame />
      <Frame1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-[128px] relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start px-[20px] py-0 relative size-full">
        <Frame6 />
      </div>
    </div>
  );
}

function FaRegularCalendarAlt() {
  return (
    <div className="h-[22.857px] relative shrink-0 w-[20px]" data-name="fa-regular:calendar-alt">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 22.8571">
        <g clipPath="url(#clip0_7009_1564)" id="fa-regular:calendar-alt">
          <path d={svgPaths.p124d6a70} fill="var(--fill-0, #1C98B7)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_7009_1564">
            <rect fill="white" height="22.8571" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="flex-[1_0_0] h-[25.692px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7px] items-start overflow-clip relative rounded-[inherit] size-full">
        <FaRegularCalendarAlt />
        <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[25.714px] not-italic relative shrink-0 text-[#4b5563] text-[19.286px]">19/02/26 - 13/04/26</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex h-[17.984px] items-center relative shrink-0 w-full" data-name="Container">
      <Text1 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start px-[25px] py-0 relative w-full">
        <Container />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[24.557px] relative shrink-0 w-[17.736px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.7357 24.5571">
        <g id="Icon">
          <path d={svgPaths.p12a5fca0} id="Vector" stroke="var(--stroke-0, #1C98B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.04643" />
          <path d={svgPaths.p42d0980} id="Vector_2" stroke="var(--stroke-0, #1C98B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.04643" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[30.696px] not-italic relative shrink-0 text-[#4b5563] text-[21.487px]">Doble certificación</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[9px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon />
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Text2 />
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start px-[25px] py-0 relative w-full">
        <Container1 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[22.887px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.8867 22.8867">
        <g id="Icon">
          <path d="M11.4431 6.67539V20.026" id="Vector" stroke="var(--stroke-0, #1C98B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.90723" />
          <path d={svgPaths.pebf7640} id="Vector_2" stroke="var(--stroke-0, #1C98B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.90723" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <p className="css-4hzbpn font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28.608px] not-italic relative shrink-0 text-[#1c98b7] text-[20.026px] w-[221.238px]">384 horas académicas</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[5px] h-[20.197px] items-center relative shrink-0 w-[429px]" data-name="Container">
      <Icon1 />
      <Text3 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
      <div className="content-stretch flex flex-col items-start px-[24px] py-0 relative size-full">
        <Container2 />
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[82.969px] items-start relative shrink-0 w-[432px]">
      <Frame3 />
      <Frame4 />
      <Frame5 />
    </div>
  );
}

function TarjetasDeCursos() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[20px] h-[483px] items-start overflow-clip relative rounded-tl-[20px] rounded-tr-[20px] shrink-0 w-[432px]" data-name="Tarjetas de Cursos">
      <Cursos />
      <Frame2 />
      <Frame9 />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[108.516px]" data-name="Container">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[24.75px] left-0 not-italic text-[20px] text-white top-[-1px]">Inversión</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[23px] relative shrink-0 w-[76px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[24.75px] left-0 not-italic text-[20px] text-white top-[-1px]">Ver más</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M3.75 9H14.25" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9 3.75L14.25 9L9 14.25" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[9px] h-[23px] items-center relative shrink-0 w-[101px]" data-name="Container">
      <Text4 />
      <Icon2 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-center justify-between mb-[-10px] relative shrink-0 w-full">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="mb-[-10px] relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
          <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[36px] not-italic relative shrink-0 text-[41px] text-white">S/ 4,200</p>
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17px] pt-[7px] px-0 relative shrink-0 w-[367.484px]">
      <Frame10 />
      <Frame12 />
    </div>
  );
}

export default function Frame8() {
  return (
    <div className="bg-[#f08300] content-stretch flex flex-col gap-[10px] items-center relative rounded-[20px] shadow-[0px_4px_7px_0px_rgba(0,0,0,0.33)] size-full">
      <TarjetasDeCursos />
      <Frame11 />
    </div>
  );
}