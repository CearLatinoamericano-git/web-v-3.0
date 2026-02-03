import svgPaths from "./svg-i8qbzbonn6";


function Frame() {
  return <div className="h-[35.646px] shrink-0 w-[411.646px]" />;
}

function Frame1() {
  return <div className="h-[68.646px] shrink-0 w-[662.88px]" />;
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-center left-[925px] top-[135.67px] w-[675px]">
      <Frame />
      <Frame1 />
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

function Frame4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[19px] items-start left-[-28px] top-0 w-[594.484px]">
      <p className="font-['Inter:Light',sans-serif] font-light leading-[14.793px] min-w-full not-italic relative shrink-0 text-[28px] text-white tracking-[0.5177px] uppercase w-[min-content] whitespace-pre-wrap">alianzas estratégicas</p>
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[44.351px] min-w-full not-italic relative shrink-0 text-[40.167px] text-white w-[min-content] whitespace-pre-wrap">Trabajamos con instituciones</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[33.038px] min-w-full not-italic relative shrink-0 text-[27.532px] text-justify text-white w-[min-content] whitespace-pre-wrap">Ofrecemos servicios de capacitación especializada dirigidos a instituciones públicas y privadas, orientados al fortalecimiento de las competencias profesionales de sus equipos, mediante programas formativos rigurosos, actualizados y alineados con la práctica arbitral y la contratación pública.</p>
      <Button />
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[996px] top-[159px] w-[594.484px]">
      <Frame4 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute bg-gradient-to-l from-[#1c98b7] from-[13.071%] h-[742px] left-0 to-[#561289] to-[156.28%] top-0 w-[1752px]" />
      <div className="absolute h-[744px] left-[30px] top-0 w-[865px]" data-name="IMG_746522 2">
        <div className="absolute inset-0 opacity-80 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-full left-[-14.68%] max-w-none top-0 w-[114.68%]" src={''} />
        </div>
      </div>
      <Frame2 />
      <Frame3 />
    </div>
  );
}

export default function Group1() {
  return (
    <div className="relative size-full">
      <Group />
      <div className="absolute border-4 border-solid border-white h-[650px] left-[69px] rounded-[34px] top-[46px] w-[1586px]" />
    </div>
  );
}