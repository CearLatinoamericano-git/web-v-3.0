import svgPaths from "./svg-pb87wopqmq";


function Frame5() {
  return (
    <div className="relative shadow-[0px_4px_5.3px_0px_rgba(0,0,0,0.34)] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[7.311px] relative w-full">
          <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[25.067px] not-italic relative shrink-0 text-[#ee8a28] text-[46.792px] text-center tracking-[0.8773px] uppercase">alianzas estratégicas</p>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[7.311px] px-[7.311px] relative w-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[53px] not-italic relative shrink-0 text-[48px] text-center text-white">Trabajamos con instituciones</p>
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[7.311px] items-start relative shrink-0 w-full">
      <Frame5 />
      <Frame4 />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[7.311px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[39.481px] not-italic relative shrink-0 text-[32.901px] text-white w-[627.305px]">Ofrecemos servicios de capacitación especializada dirigidos a instituciones públicas y privadas, orientados al fortalecimiento de las competencias profesionales de sus equipos, mediante programas formativos rigurosos, actualizados y alineados con la práctica arbitral y la contratación pública.</p>
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[32.71px] size-[20.446px] top-[18.4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.4463 20.4463">
        <g id="Icon">
          <path d="M6.81638 1.70416V5.11188" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.70386" />
          <path d="M13.6307 1.70416V5.11188" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.70386" />
          <path d={svgPaths.p3e0ee00} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.70386" />
          <path d="M2.55672 8.51954H17.8914" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.70386" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[24.536px] left-[61.34px] top-[16.36px] w-[131.864px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24.536px] left-[66.91px] not-italic text-[16.357px] text-center text-white top-[0.91px] translate-x-[-50%]">Agendar reunión</p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#ee8a28] h-[57.25px] relative rounded-[13.858px] shadow-[0px_0px_22.718px_0px_rgba(0,0,0,0.3)] shrink-0 w-[225.917px]" data-name="Button">
      <Icon />
      <Text />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[38.018px] items-start relative shrink-0 w-[641.927px]">
      <Frame />
      <Button />
    </div>
  );
}

function ImageCapacitacionCear() {
  return (
    <div className="h-[471.575px] pointer-events-none relative rounded-[40.943px] shrink-0 w-[613.413px]" data-name="Image (Capacitación CEAR)">
      <div className="absolute inset-0 overflow-hidden rounded-[40.943px]">
        <img alt="" className="absolute h-[108.39%] left-[-5.52%] max-w-none top-[-6.67%] w-[111.11%]" src={imgImageCapacitacionCear} />
      </div>
      <div aria-hidden="true" className="absolute border-[#ee8a28] border-[4.387px] border-solid inset-0 rounded-[40.943px]" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[90.659px] items-center relative shrink-0 w-full">
      <Frame1 />
      <ImageCapacitacionCear />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <Frame2 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[38.018px] items-start relative shrink-0 w-[1346px]">
      <Frame6 />
      <Frame3 />
    </div>
  );
}

export default function Section() {
  return (
    <div className="bg-[#0096bb] content-stretch flex flex-col items-start pt-[40px] sm:pt-[50px] lg:pt-[61px] px-4 sm:px-8 md:px-16 lg:px-[146px] relative size-full" data-name="Section">
      <Frame7 />
    </div>
  );
}