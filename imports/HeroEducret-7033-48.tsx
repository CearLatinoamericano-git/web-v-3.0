import svgPaths from "./svg-w5f5at1h4o";



function Icon() {
  return (
    <div className="h-[142.372px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[30.83%_0_0_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1643.21 98.4742">
          <path d={svgPaths.p21097b90} fill="var(--fill-0, white)" fillOpacity="0.1" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[47.92%_0_0_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1643.21 74.1523">
          <path d={svgPaths.p3cb85d00} fill="var(--fill-0, white)" fillOpacity="0.03" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col h-[142.372px] items-start left-0 top-[700px] w-[1643.215px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Container2() {
  return <div className="size-[32.986px]" data-name="Container" />;
}

function Container3() {
  return <div className="size-[57.316px]" data-name="Container" />;
}

function HeroEducret1() {
  return (
    <div className="h-[29.661px] relative shrink-0 w-[148.305px]" data-name="HeroEducret">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28.932px] left-[64.43px] not-italic text-[18.599px] text-center text-white top-[0.36px] translate-x-[-50%]">Explorar programas</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20.666px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.6658 20.6658">
        <g id="Icon">
          <path d="M4.30457 10.3331H16.3596" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.72215" />
          <path d={svgPaths.p1bb92a00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.72215" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#ee8a28] content-stretch flex gap-[12.4px] h-[65.254px] items-center justify-center relative rounded-[16.533px] shrink-0 w-[327.259px]" data-name="Button">
      <HeroEducret1 />
      <Icon1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20.666px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.6658 20.6658">
        <g id="Icon">
          <path d={svgPaths.p11053d40} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.72215" />
        </g>
      </svg>
    </div>
  );
}

function HeroEducret2() {
  return (
    <div className="h-[28.932px] relative shrink-0 w-[150.832px]" data-name="HeroEducret">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28.932px] left-[83.63px] not-italic text-[18.599px] text-center text-white top-0 translate-x-[-50%]">Descargar brochure</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex gap-[12.4px] h-[65.254px] items-center justify-center p-[1.837px] relative rounded-[16.533px] shrink-0 w-[327.259px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[1.837px] border-solid border-white inset-0 pointer-events-none rounded-[16.533px]" />
      <Icon2 />
      <HeroEducret2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex gap-[29.661px] items-center left-[122.6px] top-[624.86px]">
      <Button />
      <Button1 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex h-[174.011px] items-center relative shrink-0 w-full">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[87.005px] min-h-px min-w-px not-italic relative text-[62.288px] text-white tracking-[-0.9258px]">¿Desea comunicarse con nosotros?</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[9.887px] relative w-full">
          <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[53.854px] min-h-px min-w-px not-italic relative text-[30.867px] text-[rgba(255,255,255,0.85)] tracking-[-0.4156px]">Estamos a su disposición para atender todas sus dudas, consultas y preguntas, brindándole una orientación clara y oportuna a través de nuestro equipo especializado.</p>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame1 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[122.6px] top-[194.77px] w-[724.715px]">
      <Frame3 />
      <Frame2 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[842.37px] left-0 overflow-clip top-0 w-[1643.215px]" data-name="Container">
      <div className="absolute h-[650.698px] left-[15.82px] top-[39.55px] w-[1124.903px]" data-name="prueba gris 1">
        <div className="absolute inset-0 mix-blend-multiply opacity-55 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-full left-[0.01%] max-w-none top-[0.07%] w-[100.07%]" src={imgPruebaGris1} />
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[1524.39px] size-[39.852px] top-[167.02px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[346.32deg]">
          <Container2 />
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[348.2px] size-[67.515px] top-[581.58px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[191.4deg]">
          <Container3 />
        </div>
      </div>
      <div className="absolute flex h-[536.868px] items-center justify-center left-[897.74px] top-[153.25px] w-[641.658px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="h-[536.868px] relative rounded-[19.774px] w-[641.658px]" data-name="luis villavicencio 1">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[19.774px]">
              <img alt="" className="absolute h-[103.24%] left-[-1.6%] max-w-none top-[-1.68%] w-[115.17%]" src={imgLuisVillavicencio1} />
            </div>
          </div>
        </div>
      </div>
      <Frame />
      <Frame4 />
    </div>
  );
}

export default function HeroEducret() {
  return (
    <div className="bg-[#1c98b7] relative size-full" data-name="HeroEducret">
      <Container />
      <Container1 />
    </div>
  );
}