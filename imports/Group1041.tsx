import svgPaths from "./svg-yigopaan4c";
import MegaphoneIcon from "./Group-3077-2367";

function Icon() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="Icon">
          <path d={svgPaths.p25667780} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d="M18 12V18" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d="M18 24H18.015" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-gradient-to-b from-[#0b95ba] relative rounded-[18px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] shrink-0 size-[72px] to-[#087a98]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[27px] left-0 not-italic text-[#0b95ba] text-[40px] text-nowrap top-px font-bold mx-[0px] my-[-7px]">¿Qué es una denuncia?</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[87.75px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[29.25px] left-0 not-italic text-[#364153] text-[18px] text-justify top-px w-[1157px]">Es la comunicación que puede establecer con nosotros para reportar cualquier infracción o irregularidad relacionada con nuestras políticas o reglamentos. Nuestro objetivo es investigar y resolver estas situaciones, garantizando la transparencia y la integridad de todas nuestras operaciones.</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="basis-0 grow h-[128.25px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[13.5px] items-start relative size-full">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[27px] h-[128.25px] items-start relative shrink-0 w-full" data-name="Container">
      <Container />
      <Container1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex flex-col h-[204.25px] items-start left-[57px] pb-[2px] pt-[38px] px-[38px] rounded-[18px] top-[42px] w-[1332px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(11,149,186,0.2)] border-solid inset-0 pointer-events-none rounded-[18px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)]" />
      <Container2 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[31.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.5 31.5">
        <g id="Icon">
          <path d={svgPaths.p21ba5080} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[#0b95ba] relative rounded-[15.25px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] shrink-0 size-[58.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[27px] relative shrink-0 w-[152.797px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[27px] left-0 not-italic text-[35px] text-nowrap text-white top-px">NUESTRAS POLÍTICAS</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[18px] h-[58.5px] items-center relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Heading1 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[27px] opacity-95 relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[27px] left-0 not-italic text-[18px] text-nowrap text-white top-px">Denuncie si se cometió una infracción a nuestras políticas:</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[27px] mt-[0px] mr-[0px] mb-[0px] ml-[19px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27">
        <g id="Icon">
          <path d={svgPaths.p18c7cae0} id="Vector" stroke="var(--stroke-0, #0B95BA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
          <path d={svgPaths.p8d41400} id="Vector_2" stroke="var(--stroke-0, #0B95BA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[27px] relative shrink-0 w-[254.813px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[27px] left-0 not-italic text-[#0b95ba] text-[18px] text-nowrap top-px">Política del Sistema de Gestión Calidad</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-white h-[63px] relative rounded-[15.25px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[18px] items-center relative size-full">
          <Icon2 />
          <Text />
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[27px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27">
        <g id="Icon">
          <path d={svgPaths.p18c7cae0} id="Vector" stroke="var(--stroke-0, #0B95BA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
          <path d={svgPaths.p8d41400} id="Vector_2" stroke="var(--stroke-0, #0B95BA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[27px] relative shrink-0 w-[371.313px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[27px] left-0 not-italic text-[#0b95ba] text-[18px] text-nowrap top-px">Política del Sistema de Gestión Antisoborno</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-white h-[63px] relative rounded-[15.25px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[18px] items-center pl-[18px] pr-0 py-0 relative size-full">
          <Icon3 />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[27px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27">
        <g id="Icon">
          <path d={svgPaths.p18c7cae0} id="Vector" stroke="var(--stroke-0, #0B95BA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
          <path d={svgPaths.p8d41400} id="Vector_2" stroke="var(--stroke-0, #0B95BA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[27px] relative shrink-0 w-[345.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[27px] left-0 not-italic text-[#0b95ba] text-[18px] text-nowrap top-px">Política de Protección a los Trabajadores</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-white h-[63px] relative rounded-[15.25px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[18px] items-center pl-[18px] pr-0 py-0 relative size-full">
          <Icon4 />
          <Text2 />
        </div>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[27px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27">
        <g id="Icon">
          <path d={svgPaths.p18c7cae0} id="Vector" stroke="var(--stroke-0, #0B95BA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
          <path d={svgPaths.p8d41400} id="Vector_2" stroke="var(--stroke-0, #0B95BA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[27px] relative shrink-0 w-[366.891px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[27px] left-0 not-italic text-[#0b95ba] text-[18px] text-nowrap top-px">Política de Regalos, Atenciones y Cortesías</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-white h-[63px] relative rounded-[15.25px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[18px] items-center pl-[18px] pr-0 py-0 relative size-full">
          <Icon5 />
          <Text3 />
        </div>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[27px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27">
        <g id="Icon">
          <path d={svgPaths.p18c7cae0} id="Vector" stroke="var(--stroke-0, #0B95BA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
          <path d={svgPaths.p8d41400} id="Vector_2" stroke="var(--stroke-0, #0B95BA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="basis-0 grow h-[54px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[27px] left-0 not-italic text-[#0b95ba] text-[18px] top-px w-[428px]">Política del Sistema de Gestión de Seguridad de la Información</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-white h-[90px] relative rounded-[15.25px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[18px] items-center px-[18px] py-0 relative size-full">
          <Icon6 />
          <Text4 />
        </div>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[27px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27">
        <g id="Icon">
          <path d={svgPaths.p18c7cae0} id="Vector" stroke="var(--stroke-0, #0B95BA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
          <path d={svgPaths.p8d41400} id="Vector_2" stroke="var(--stroke-0, #0B95BA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
        </g>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[27px] relative shrink-0 w-[263.953px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[27px] left-0 not-italic text-[#0b95ba] text-[18px] text-nowrap top-px">Política de Privacidad de Datos</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-white h-[63px] relative rounded-[15.25px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[18px] items-center pl-[18px] pr-0 py-0 relative size-full">
          <Icon7 />
          <Text5 />
        </div>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[27px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27">
        <g id="Icon">
          <path d={svgPaths.p18c7cae0} id="Vector" stroke="var(--stroke-0, #0B95BA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
          <path d={svgPaths.p8d41400} id="Vector_2" stroke="var(--stroke-0, #0B95BA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
        </g>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[27px] relative shrink-0 w-[278.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[27px] left-0 not-italic text-[#0b95ba] text-[18px] text-nowrap top-px">Política de Gestión de Incidentes</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-white h-[63px] relative rounded-[15.25px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[18px] items-center pl-[18px] pr-0 py-0 relative size-full">
          <Icon8 />
          <Text6 />
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[18px] h-[576px] items-start relative shrink-0 w-full pt-[6px] pr-[0px] pb-[0px] pl-[0px]" data-name="Container">
      <Container6 />
      <Container7 />
      <Container8 />
      <Container9 />
      <Container10 />
      <Container11 />
      <Container12 />
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-gradient-to-b from-[#0b95ba] h-[736px] relative rounded-[18px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] shrink-0 to-[#087a98] w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-start px-[20px] py-[30px] relative size-full">
          <Container5 />
          <Paragraph1 />
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[31.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.5 31.5">
        <g id="Icon">
          <path d={svgPaths.p31bc6870} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
          <path d={svgPaths.p2ad934a0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
          <path d="M13.125 11.8125H10.5" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
          <path d="M21 17.0625H10.5" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
          <path d="M21 22.3125H10.5" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-[#087a98] relative rounded-[15.25px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] shrink-0 size-[58.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[27px] relative shrink-0 w-[192.594px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[27px] left-0 not-italic text-[#087a98] text-[35px] text-nowrap top-px">NUESTROS REGLAMENTOS</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[18px] h-[58.5px] items-center relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <Heading2 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[27px] left-0 not-italic text-[#111827] text-[18px] text-nowrap top-px">Denuncie si se cometió una infracción a nuestros reglamentos:</p>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[27px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27">
        <g id="Icon">
          <path d={svgPaths.p18c7cae0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
          <path d={svgPaths.p8d41400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
        </g>
      </svg>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[27px] relative shrink-0 w-[200.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[27px] left-0 not-italic text-[18px] text-nowrap text-white top-px">Reglamento Académico</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-[#0a8fb2] h-[63px] relative rounded-[15.25px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[18px] items-center pl-[18px] pr-0 py-0 relative size-full">
          <Icon10 />
          <Text7 />
        </div>
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[27px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27">
        <g id="Icon">
          <path d={svgPaths.p18c7cae0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
          <path d={svgPaths.p8d41400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
        </g>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[27px] relative shrink-0 w-[148.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[27px] left-0 not-italic text-[18px] text-nowrap text-white top-px">Reglamento Ético</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-[#0a8fb2] h-[63px] relative rounded-[15.25px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[18px] items-center pl-[18px] pr-0 py-0 relative size-full">
          <Icon11 />
          <Text8 />
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[18px] h-[144px] items-start relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-white h-[338px] relative rounded-[18px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[18px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[27px] items-start px-[38px] py-[20px] relative size-full">
          <Container16 />
          <Paragraph2 />
          <Container19 />
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[1101px] items-start left-[57px] top-[278px] w-[648px]" data-name="Container">
      <Container14 />
      <Container20 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[40.054px]" data-name="Icon">
      <MegaphoneIcon />
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[44.311px] relative shrink-0 w-[228.891px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[44.311px] left-[115.64px] not-italic text-[29.541px] text-center text-nowrap text-white top-[1.64px] translate-x-[-50%]">Realizar denuncia</p>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex gap-[24px] h-[29.222px] items-center justify-center relative shrink-0 w-full mt-[0px] mr-[0px] mb-[20px] ml-[0px]" data-name="Text">
      <Icon12 />
      <Text9 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-gradient-to-b from-[#0b95ba] h-[68.185px] relative rounded-[16.505px] shadow-[0px_0px_27.058px_0px_rgba(0,0,0,0.3)] shrink-0 to-[#087a98] w-full" data-name="Button">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-center justify-center pb-0 pt-[19.481px] px-[29px] relative size-full py-[19px]">
          <Text10 />
        </div>
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[24.352px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24.352px] left-[350.98px] not-italic text-[#4b5563] text-[17.046px] text-center text-nowrap top-[-1.08px] translate-x-[-50%]">Todas las denuncias son tratadas con estricta confidencialidad</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[19.481px] h-[131.5px] items-start left-[372.33px] pb-0 pt-[19.481px] px-0 top-[1401px] w-[701.333px]" data-name="Container">
      <Button />
      <Paragraph3 />
    </div>
  );
}

function Vector() {
  return (
    <div className="absolute contents inset-0 mix-blend-multiply" data-name="Vector">
      <div className="absolute inset-0 mix-blend-multiply opacity-[0.28]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 428.766 247.001">
          <path d={svgPaths.p27434b10} fill="var(--fill-0, #231F20)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="h-[247.001px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Vector />
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex flex-col h-[247px] items-start left-[871.08px] top-[1101px] w-[428.767px]" data-name="Container">
      <Icon13 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[9.44%_57.57%_87.28%_30.36%]" data-name="Group_2">
      <div className="absolute inset-[9.44%_57.57%_87.28%_30.36%]" data-name="Vector_3">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51.3571 33.0137">
          <path d={svgPaths.p3b85f300} fill="var(--fill-0, #616464)" id="Vector_3" />
        </svg>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[80.74%_47.5%_10.98%_36.44%]" data-name="Group_3">
      <div className="absolute inset-[80.74%_47.5%_11.19%_38.56%]" data-name="Vector_9">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 59.3505 81.077">
          <path d={svgPaths.p2de7d180} fill="var(--fill-0, #0F1F23)" id="Vector_9" />
        </svg>
      </div>
      <div className="absolute inset-[81.08%_48.98%_10.98%_36.44%]" data-name="Vector_10">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 62.0741 79.7174">
          <path d={svgPaths.p7cb8c00} fill="var(--fill-0, #62797C)" id="Vector_10" />
        </svg>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <div className="absolute inset-[11.77%_66.99%_85.93%_27.19%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.8081 23.0803">
          <path d={svgPaths.p11dbe100} fill="var(--fill-0, #808080)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[8.93%_4.61%_10.17%_8.23%]" data-name="Vector_2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 371.088 812.916">
          <path d={svgPaths.p2f5c3000} fill="var(--fill-0, #0F1F23)" id="Vector_2" />
        </svg>
      </div>
      <Group2 />
      <div className="absolute inset-[9.44%_25.03%_77.22%_30.36%]" data-name="Vector_4">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 189.913 134.006">
          <path d={svgPaths.p39096600} fill="var(--fill-0, #62797C)" id="Vector_4" />
        </svg>
      </div>
      <div className="absolute inset-[11.06%_13.07%_10.9%_10.97%]" data-name="Vector_5">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 323.356 784.239">
          <path d={svgPaths.p2763b240} fill="var(--fill-0, #29D8FF)" id="Vector_5" />
        </svg>
      </div>
      <div className="absolute inset-[27.41%_4.22%_10.17%_83.84%]" data-name="Vector_6">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50.8234 627.186">
          <path d={svgPaths.p10eb2900} fill="var(--fill-0, #B4B4B4)" id="Vector_6" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_0.17%_2.82%]" data-name="Vector_7">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 413.732 1003.11">
          <path d={svgPaths.p25b018f0} fill="var(--fill-0, #62797C)" id="Vector_7" />
        </svg>
      </div>
      <div className="absolute inset-[1.9%_7.63%_0_0]" data-name="Vector_8">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 393.267 985.719">
          <path d={svgPaths.p3ef83b00} fill="var(--fill-0, #203B42)" id="Vector_8" />
        </svg>
      </div>
      <Group3 />
      <div className="absolute inset-[2.67%_69.87%_94.28%_19.72%]" data-name="Vector_11">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44.3111 30.7359">
          <path d={svgPaths.p2f1b4700} fill="var(--fill-0, #1B333A)" id="Vector_11" />
        </svg>
      </div>
      <div className="absolute inset-[2.22%_69.88%_95.22%_19.72%]" data-name="Vector_12">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44.287 25.6967">
          <path d={svgPaths.pf059270} fill="var(--fill-0, #A3BDC1)" id="Vector_12" />
        </svg>
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="h-[1004.821px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group />
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute content-stretch flex flex-col h-[1004.821px] items-start left-[879.16px] top-[321px] w-[425.733px]" data-name="Group">
      <Icon14 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="h-[568.864px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 264.513 568.865">
        <path d={svgPaths.p3f2d5400} fill="var(--fill-0, #1CAAD1)" id="Vector" />
      </svg>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex flex-col h-[568.864px] items-start left-[926.03px] top-[501.55px] w-[264.513px]" data-name="Container">
      <Icon15 />
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents inset-[0_0_14.98%_2.71%]" data-name="Group_3">
      <div className="absolute inset-[0_4.21%_56.08%_2.71%]" data-name="Vector_8">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 285.225 161.04">
          <path d={svgPaths.p2051a300} fill="var(--fill-0, #E2E2E2)" id="Vector_8" />
        </svg>
      </div>
      <div className="absolute inset-[41.58%_0_14.98%_90.97%]" data-name="Vector_9">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.6796 159.293">
          <path d={svgPaths.p175bb200} fill="var(--fill-0, #E2E2E2)" id="Vector_9" />
        </svg>
      </div>
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents inset-[0_0_14.98%_2.29%]" data-name="Group_2">
      <div className="absolute inset-[2.4%_97.29%_97.43%_2.29%]" data-name="Vector_7">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.28023 0.626392">
          <path d={svgPaths.p35eb9580} fill="var(--fill-0, white)" id="Vector_7" />
        </svg>
      </div>
      <Group9 />
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <div className="absolute inset-[27.59%_55.3%_50.12%_7.36%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 114.408 81.7102">
          <path d={svgPaths.p125c5200} fill="var(--fill-0, #425F68)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[61.24%_21.01%_32.13%_72.19%]" data-name="Vector_2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.8316 24.2912">
          <path d={svgPaths.p198e7300} fill="var(--fill-0, white)" id="Vector_2" />
        </svg>
      </div>
      <div className="absolute inset-[46.6%_20.96%_39.98%_72.22%]" data-name="Vector_3">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.891 49.1861">
          <path d={svgPaths.p18d400} fill="var(--fill-0, white)" id="Vector_3" />
        </svg>
      </div>
      <div className="absolute inset-[2.14%_4.82%_0_0]" data-name="Vector_4">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 291.649 358.811">
          <path d={svgPaths.p2c70d400} fill="var(--fill-0, white)" id="Vector_4" />
        </svg>
      </div>
      <div className="absolute inset-[16.41%_43.86%_55.81%_7.4%]" data-name="Vector_5">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 149.378 101.891">
          <path d={svgPaths.p1b547640} fill="var(--fill-0, #425F68)" id="Vector_5" />
        </svg>
      </div>
      <div className="absolute bottom-1/4 left-[61.22%] right-[10.42%] top-[38.77%]" data-name="Vector_6">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 86.893 132.866">
          <path d={svgPaths.p34ad4680} fill="var(--fill-0, #CC2727)" id="Vector_6" />
        </svg>
      </div>
      <Group11 />
      <div className="absolute inset-[81.6%_8.97%_0_86.15%]" data-name="Vector_10">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9459 67.4571">
          <path d={svgPaths.p4e72a00} fill="var(--fill-0, #E2E2E2)" id="Vector_10" />
        </svg>
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="h-[366.667px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group12 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[366.667px] items-start left-[848px] top-[465.9px] w-[306.43px]" data-name="Group1">
      <Icon16 />
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <div className="absolute inset-[0_0_1.64%_6.23%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 122.303 112.953">
          <path d={svgPaths.p214d0e00} fill="var(--fill-0, #CC2727)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[8.36%_12.67%_0_0]" data-name="Vector_2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 113.903 105.23">
          <path d={svgPaths.p18a0cb80} fill="var(--fill-0, white)" id="Vector_2" />
        </svg>
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="h-[114.834px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group13 />
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute content-stretch flex flex-col h-[114.835px] items-start left-[879.43px] top-[808.72px] w-[130.434px]" data-name="Group2">
      <Icon17 />
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <div className="absolute inset-[0_0_1.63%_6.23%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 122.351 113.058">
          <path d={svgPaths.p29829b80} fill="var(--fill-0, #CC2727)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[8.35%_12.68%_0_0]" data-name="Vector_2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 113.941 105.331">
          <path d={svgPaths.p32cb2f80} fill="var(--fill-0, white)" id="Vector_2" />
        </svg>
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="h-[114.934px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group15 />
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute content-stretch flex flex-col h-[114.934px] items-start left-[1057.93px] top-[906.9px] w-[130.484px]" data-name="Group3">
      <Icon18 />
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <div className="absolute inset-[0_56.81%_48.87%_4.26%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 122.323 112.973">
          <path d={svgPaths.p525fa00} fill="var(--fill-0, black)" id="Vector" opacity="0.33" />
        </svg>
      </div>
      <div className="absolute inset-[0_56.81%_48.87%_4.26%]" data-name="Vector_2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 122.323 112.973">
          <path d={svgPaths.p525fa00} fill="var(--fill-0, black)" id="Vector" opacity="0.33" />
        </svg>
      </div>
      <div className="absolute inset-[44.49%_0_4.38%_61.07%]" data-name="Vector_3">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 122.321 112.969">
          <path d={svgPaths.p7ae1d80} fill="var(--fill-0, black)" id="Vector_3" opacity="0.33" />
        </svg>
      </div>
      <div className="absolute inset-[48.02%_4.25%_0.85%_56.81%]" data-name="Vector_4">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 122.325 112.969">
          <path d={svgPaths.p24b6a680} fill="var(--fill-0, #CC2727)" id="Vector_4" />
        </svg>
      </div>
      <div className="absolute inset-[3.52%_61.07%_45.34%_0]" data-name="Vector_5">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 122.32 112.971">
          <path d={svgPaths.p3718e980} fill="var(--fill-0, #CC2727)" id="Vector_5" />
        </svg>
      </div>
      <div className="absolute inset-[48.02%_4.25%_0.85%_56.81%]" data-name="Vector_6">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 122.325 112.969">
          <path d={svgPaths.p24b6a680} fill="var(--fill-0, #CC2727)" id="Vector_4" />
        </svg>
      </div>
      <div className="absolute inset-[52.36%_9.52%_0_54.23%]" data-name="Vector_7">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 113.917 105.249">
          <path d={svgPaths.p21ced700} fill="var(--fill-0, white)" id="Vector_7" />
        </svg>
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="h-[220.93px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group17 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute content-stretch flex flex-col h-[220.93px] items-start left-[887.55px] top-[800.9px] w-[314.213px]" data-name="Group4">
      <Icon19 />
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <div className="absolute inset-[0.01%_65.09%_41.28%_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.5934 30.76">
          <path d={svgPaths.peeb2000} fill="var(--fill-0, #B02222)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[22.71%_34.19%_15.15%_38.63%]" data-name="Vector_2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.4767 32.5562">
          <path d={svgPaths.p25f43280} fill="var(--fill-0, #B02222)" id="Vector_2" />
        </svg>
      </div>
      <div className="absolute inset-[46.42%_0_0_69.39%]" data-name="Vector_3">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.302 28.0719">
          <path d={svgPaths.pde32c80} fill="var(--fill-0, #B02222)" id="Vector_3" />
        </svg>
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="h-[52.388px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group18 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute content-stretch flex flex-col h-[52.388px] items-start left-[907.99px] top-[842.51px] w-[53.262px]" data-name="Group5">
      <Icon20 />
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute contents inset-[0_0_-0.01%_0]" data-name="Group">
      <div className="absolute inset-[0.01%_54.96%_20.33%_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.1337 34.13">
          <path d={svgPaths.p2337b200} fill="var(--fill-0, #B02222)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[35.32%_0_-0.01%_53.65%]" data-name="Vector_2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.6322 27.7122">
          <path d={svgPaths.p24c1ec00} fill="var(--fill-0, #B02222)" id="Vector_2" />
        </svg>
      </div>
    </div>
  );
}

function Icon21() {
  return (
    <div className="h-[42.84px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group19 />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute content-stretch flex flex-col h-[42.84px] items-start left-[1096.12px] top-[947.15px] w-[38.042px]" data-name="Group6">
      <Icon21 />
    </div>
  );
}

function Vector1() {
  return (
    <div className="absolute contents inset-0 mix-blend-multiply" data-name="Vector">
      <div className="absolute inset-0 mix-blend-multiply opacity-[0.28]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 117.622 54.4494">
          <path d={svgPaths.p2c33f700} fill="var(--fill-0, #231F20)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon22() {
  return (
    <div className="h-[54.449px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Vector1 />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54.449px] items-start left-[792.89px] top-[1185.82px] w-[117.622px]" data-name="Container">
      <Icon22 />
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute contents inset-[85.58%_0.22%_7.44%_61.22%]" data-name="Group_2">
      <div className="absolute inset-[85.58%_0.57%_7.58%_61.22%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50.3802 25.2045">
          <path d={svgPaths.p18859600} fill="var(--fill-0, #95E6F9)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[86.95%_13.48%_10.82%_77.36%]" data-name="Vector_2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0728 8.21182">
          <path d={svgPaths.pd1ca900} fill="var(--fill-0, #203B42)" id="Vector_2" />
        </svg>
      </div>
      <div className="absolute inset-[87.18%_11.36%_10.59%_79.48%]" data-name="Vector_3">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0722 8.20992">
          <path d={svgPaths.p6deb40} fill="var(--fill-0, #203B42)" id="Vector_3" />
        </svg>
      </div>
      <div className="absolute inset-[87.56%_9.35%_10.21%_81.5%]" data-name="Vector_4">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0711 8.20973">
          <path d={svgPaths.p1cddfe00} fill="var(--fill-0, #203B42)" id="Vector_4" />
        </svg>
      </div>
      <div className="absolute inset-[88.46%_0.57%_7.88%_86.23%]" data-name="Vector_5">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.41 13.4845">
          <path d={svgPaths.p1d7ce680} fill="var(--fill-0, #D3EBEF)" id="Vector_5" />
        </svg>
      </div>
      <div className="absolute inset-[89.09%_0.22%_7.44%_62.46%]" data-name="Vector_6">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49.211 12.8039">
          <path d={svgPaths.p33141b00} fill="var(--fill-0, #203B42)" id="Vector_6" />
        </svg>
      </div>
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute contents inset-[5.93%_36.18%_79.22%_20.44%]" data-name="Group_3">
      <div className="absolute inset-[7.61%_36.18%_79.22%_27.05%]" data-name="Vector_22">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48.4832 48.5166">
          <path d={svgPaths.p32474100} fill="var(--fill-0, #EFD7CA)" id="Vector_22" />
        </svg>
      </div>
      <div className="absolute inset-[5.93%_48.93%_79.5%_20.44%]" data-name="Vector_23">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40.3874 53.6292">
          <path d={svgPaths.p35bb9f00} fill="var(--fill-0, #56230F)" id="Vector_23" />
        </svg>
      </div>
      <div className="absolute inset-[15.38%_56.29%_81.05%_32.92%]" data-name="Vector_24">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.2295 13.1626">
          <path d={svgPaths.p1e3268f0} fill="var(--fill-0, #EFD7CA)" id="Vector_24" />
        </svg>
      </div>
    </div>
  );
}

function Group22() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <Group20 />
      <div className="absolute inset-[91.89%_56.2%_0.05%_20.77%]" data-name="Vector_7">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.3709 29.6904">
          <path d={svgPaths.p1cb38b80} fill="var(--fill-0, #95E6F9)" id="Vector_7" />
        </svg>
      </div>
      <div className="absolute inset-[93.77%_63.71%_5.27%_25.31%]" data-name="Vector_8">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.4827 3.56385">
          <path d={svgPaths.p121d9e80} fill="var(--fill-0, #203B42)" id="Vector_8" />
        </svg>
      </div>
      <div className="absolute inset-[94.51%_62.91%_4.55%_26.1%]" data-name="Vector_9">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.4995 3.45193">
          <path d={svgPaths.pba19a40} fill="var(--fill-0, #203B42)" id="Vector_9" />
        </svg>
      </div>
      <div className="absolute inset-[95.25%_62.01%_3.93%_26.97%]" data-name="Vector_10">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5302 3.01793">
          <path d={svgPaths.p35b3b000} fill="var(--fill-0, #203B42)" id="Vector_10" />
        </svg>
      </div>
      <div className="absolute inset-[48.03%_18.47%_11.21%_52%]" data-name="Vector_11">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38.945 150.14">
          <path d={svgPaths.p12024900} fill="var(--fill-0, #336268)" id="Vector_11" />
        </svg>
      </div>
      <div className="absolute inset-[49.63%_33.83%_5.52%_20.32%]" data-name="Vector_12">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60.4499 165.209">
          <path d={svgPaths.p11a06300} fill="var(--fill-0, #46757F)" id="Vector_12" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_70.62%_54.51%]" data-name="Vector_13">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 59.9829 108.211">
          <path d={svgPaths.p18607500} fill="var(--fill-0, #991111)" id="Vector_13" />
        </svg>
      </div>
      <div className="absolute inset-[22.02%_18.75%_40.48%_22.91%]" data-name="Vector_14">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 76.9281 138.078">
          <path d={svgPaths.p3be96820} fill="var(--fill-0, #B51616)" id="Vector_14" />
        </svg>
      </div>
      <div className="absolute inset-[55.17%_83%_39.61%_8.22%]" data-name="Vector_15">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.5804 19.2351">
          <path d={svgPaths.p115fc300} fill="var(--fill-0, #FFE8D9)" id="Vector_15" />
        </svg>
      </div>
      <div className="absolute inset-[54.93%_86.61%_38.57%_0]" data-name="Vector_16">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.6536 23.9616">
          <path d={svgPaths.p2e9f9200} fill="var(--fill-0, #FFE8D9)" id="Vector_16" />
        </svg>
      </div>
      <div className="absolute inset-[27.6%_65.91%_43.31%_1.68%]" data-name="Vector_17">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42.7444 107.145">
          <path d={svgPaths.p1476f100} fill="var(--fill-0, #CC2727)" id="Vector_17" />
        </svg>
      </div>
      <div className="absolute inset-[96.81%_56.2%_0.05%_22.66%]" data-name="Vector_18">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.8755 11.5874">
          <path d={svgPaths.p2dbc9d80} fill="var(--fill-0, #D3EBEF)" id="Vector_18" />
        </svg>
      </div>
      <div className="absolute inset-[96.72%_56.19%_0_20.98%]" data-name="Vector_19">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.1086 12.0739">
          <path d={svgPaths.p9d70760} fill="var(--fill-0, #203B42)" id="Vector_19" />
        </svg>
      </div>
      <div className="absolute inset-[13.51%_51.88%_82.27%_40.08%]" data-name="Vector_20">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5997 15.5316">
          <path d={svgPaths.p29ac770} fill="var(--fill-0, #FFE8D9)" id="Vector_20" />
        </svg>
      </div>
      <div className="absolute inset-[15.83%_41.55%_71.93%_39.16%]" data-name="Vector_21">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.439 45.0664">
          <path d={svgPaths.p21587e00} fill="var(--fill-0, #E2C3B3)" id="Vector_21" />
        </svg>
      </div>
      <Group21 />
    </div>
  );
}

function Icon23() {
  return (
    <div className="h-[368.299px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group22 />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute content-stretch flex flex-col h-[368.299px] items-start left-[773px] top-[865.51px] w-[131.869px]" data-name="Group7">
      <Icon23 />
    </div>
  );
}

function Icon24() {
  return (
    <div className="h-[7.833px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[-0.02%_0_0.02%_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.869 7.83265">
          <path d={svgPaths.pf336300} fill="var(--fill-0, #6D0C0C)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex flex-col h-[7.833px] items-start left-[887.41px] top-[866.12px] w-[16.869px]" data-name="Container">
      <Icon24 />
    </div>
  );
}

function Icon25() {
  return (
    <div className="h-[39.559px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.9503 39.5591">
        <path d={svgPaths.p1d70c940} fill="var(--fill-0, #E8C5AC)" id="Vector" />
      </svg>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex flex-col h-[39.559px] items-start left-[889.15px] top-[834.39px] w-[27.95px]" data-name="Container">
      <Icon25 />
    </div>
  );
}

function Group23() {
  return (
    <div className="absolute contents inset-[81.48%_8.31%_2.34%_87.02%]" data-name="Group_2">
      <div className="absolute inset-[81.48%_8.31%_2.34%_87.02%] opacity-30" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9438 60.0195">
          <path d={svgPaths.p2beb9700} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group24() {
  return (
    <div className="absolute contents inset-[0_0_16.87%_6.92%]" data-name="Group_4">
      <div className="absolute inset-[0_4.03%_55.7%_6.92%] opacity-30" data-name="Vector_7">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 285.24 164.287">
          <path d={svgPaths.p21ed2280} fill="var(--fill-0, black)" id="Vector_7" />
        </svg>
      </div>
      <div className="absolute inset-[40.78%_0_16.87%_91.36%] opacity-30" data-name="Vector_8">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.6809 157.072">
          <path d={svgPaths.p2160a600} fill="var(--fill-0, black)" id="Vector_8" />
        </svg>
      </div>
    </div>
  );
}

function Group25() {
  return (
    <div className="absolute contents inset-[1.15%_4.33%_14.81%_2.59%]" data-name="Group_5">
      <div className="absolute inset-[1.15%_8.36%_55.44%_2.59%]" data-name="Vector_10">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 285.238 161.015">
          <path d={svgPaths.p1bc24400} fill="var(--fill-0, #E2E2E2)" id="Vector_10" />
        </svg>
      </div>
      <div className="absolute inset-[42.25%_4.33%_14.81%_87.03%]" data-name="Vector_11">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.6809 159.269">
          <path d={svgPaths.p22b63300} fill="var(--fill-0, #E2E2E2)" id="Vector_11" />
        </svg>
      </div>
    </div>
  );
}

function Group26() {
  return (
    <div className="absolute contents inset-[0_0_14.81%_2.19%]" data-name="Group_3">
      <Group24 />
      <div className="absolute inset-[3.52%_97.41%_96.31%_2.19%]" data-name="Vector_9">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.28029 0.626297">
          <path d={svgPaths.p3427f00} fill="var(--fill-0, white)" id="Vector_9" />
        </svg>
      </div>
      <Group25 />
    </div>
  );
}

function Group27() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <Group23 />
      <div className="absolute inset-[28.42%_57.24%_49.55%_7.04%]" data-name="Vector_2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 114.413 81.6974">
          <path d={svgPaths.p38ff6b00} fill="var(--fill-0, #425F68)" id="Vector_2" />
        </svg>
      </div>
      <div className="absolute inset-[61.69%_24.43%_31.76%_69.06%]" data-name="Vector_3">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.8326 24.2875">
          <path d={svgPaths.pa7a2700} fill="var(--fill-0, white)" id="Vector_3" />
        </svg>
      </div>
      <div className="absolute inset-[47.22%_24.39%_39.52%_69.09%]" data-name="Vector_4">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.892 49.1784">
          <path d={svgPaths.pf6c5270} fill="var(--fill-0, white)" id="Vector_4" />
        </svg>
      </div>
      <div className="absolute inset-[17.37%_46.29%_55.17%_7.08%]" data-name="Vector_5">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 149.385 101.876">
          <path d={svgPaths.p6a9cd80} fill="var(--fill-0, #425F68)" id="Vector_5" />
        </svg>
      </div>
      <div className="absolute inset-[39.47%_14.3%_24.71%_58.57%]" data-name="Vector_6">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 86.8971 132.845">
          <path d={svgPaths.p37b32880} fill="var(--fill-0, #CC2727)" id="Vector_6" />
        </svg>
      </div>
      <Group26 />
      <div className="absolute inset-[3.27%_8.95%_0_0]" data-name="Vector_12">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 291.663 358.756">
          <path d={svgPaths.p3566bbf0} fill="var(--fill-0, white)" id="Vector_12" />
        </svg>
      </div>
    </div>
  );
}

function Icon26() {
  return (
    <div className="h-[370.872px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group27 />
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute content-stretch flex flex-col h-[370.872px] items-start left-[848px] top-[461.69px] w-[320.314px]" data-name="Group10">
      <Icon26 />
    </div>
  );
}

function Group28() {
  return (
    <div className="absolute contents left-[773px] top-[321px]">
      <Container23 />
      <Group8 />
      <Container24 />
      <Group1 />
      <Group14 />
      <Group16 />
      <Group14 />
      <Group4 />
      <Group5 />
      <Group6 />
      <Container25 />
      <Group7 />
      <Container26 />
      <Container27 />
      <Group10 />
    </div>
  );
}

export default function Group29() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-white h-[1563px] left-0 rounded-[80px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] top-0 w-[1442px]" />
      <Container3 />
      <Container21 />
      <Container22 />
      <Group28 />
    </div>
  );
}