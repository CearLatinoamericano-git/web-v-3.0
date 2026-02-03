import svgPaths from "./svg-yp8uzl2l70";


function Frame6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[915px]">
      <div className="aspect-[895/744] relative shrink-0 w-full" data-name="IMG_746522 2">
        <div className="absolute inset-0 opacity-80 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-full left-[-10.84%] max-w-none top-0 w-[110.84%]" src={''} />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[10px] relative shrink-0">
      <p className="font-['Inter:Light',sans-serif] font-light leading-[14.793px] not-italic relative shrink-0 text-[28px] text-white tracking-[0.5177px] uppercase">alianzas estratégicas</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[10px] relative w-full">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[44.351px] not-italic relative shrink-0 text-[40.167px] text-white">Trabajamos con instituciones</p>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[599px]">
      <Frame />
      <Frame1 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[33.038px] not-italic relative shrink-0 text-[27.532px] text-justify text-white w-[594.484px] whitespace-pre-wrap">Ofrecemos servicios de capacitación especializada dirigidos a instituciones públicas y privadas, orientados al fortalecimiento de las competencias profesionales de sus equipos, mediante programas formativos rigurosos, actualizados y alineados con la práctica arbitral y la contratación pública.</p>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame2 />
      <Frame3 />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[32.43px] size-[20.272px] top-[18.24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.2717 20.2717">
        <g id="Icon">
          <path d="M6.75968 1.6893V5.0681" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.68931" />
          <path d="M13.5167 1.6893V5.0681" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.68931" />
          <path d={svgPaths.p261ad200} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.68931" />
          <path d="M2.53652 8.44636H17.7411" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.68931" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[24.326px] left-[60.81px] top-[16.22px] w-[130.738px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24.326px] left-[66.4px] not-italic text-[16.217px] text-center text-white top-[0.9px]">Agendar reunión</p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#1cb8a4] h-[56.761px] relative rounded-[13.74px] shadow-[0px_0px_22.524px_0px_rgba(0,0,0,0.3)] shrink-0 w-[223.988px]" data-name="Button">
      <Icon />
      <Text />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[614.484px]">
      <Frame4 />
      <Button />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[21px] items-center relative shrink-0 w-full">
      <Frame6 />
      <Frame5 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 p-[10px] top-0 w-[1694px]" style={{ backgroundImage: "linear-gradient(-89.2266deg, rgb(28, 152, 183) 62.437%, rgb(86, 18, 137) 170.98%)" }}>
      <Frame7 />
    </div>
  );
}

export default function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start px-[54px] py-[65px] relative size-full">
      <Frame8 />
      <div className="h-[650px] relative rounded-[34px] shrink-0 w-[1586px]">
        <div aria-hidden="true" className="absolute border-4 border-solid border-white inset-0 pointer-events-none rounded-[34px]" />
      </div>
    </div>
  );
}