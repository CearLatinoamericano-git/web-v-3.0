

function CourseBenefitsSection() {
  return (
    <div className="h-[35.984px] relative shrink-0 w-full" data-name="CourseBenefitsSection">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[0] left-[684.95px] lowercase not-italic text-[48px] text-black text-center top-[-0.52px] translate-x-[-50%]">
        <span className="leading-[53px] uppercase">I</span>
        <span className="leading-[53px]">{`NFRAESTRUCTURA `}</span>
        <span className="leading-[53px] uppercase">A</span>
        <span className="leading-[53px]">CADÉMICA</span>
      </p>
    </div>
  );
}

function CourseBenefitsSection1() {
  return (
    <div className="h-[54px] relative shrink-0 w-full" data-name="CourseBenefitsSection">
      <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[684.58px] not-italic text-[#ee8a28] text-[64px] text-center top-[-0.52px] tracking-[1.2px] translate-x-[-50%] uppercase">ESPECIALIZADA</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] h-[107.984px] items-start relative shrink-0 w-full" data-name="Container">
      <CourseBenefitsSection />
      <CourseBenefitsSection1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#ee8a28] content-stretch flex items-center justify-center px-[42.22px] py-[13.66px] relative rounded-[32px] shrink-0 w-[472.241px]">
      <div className="css-g0mm18 font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32.638px] not-italic relative shrink-0 text-[32.638px] text-center text-white">
        <p className="css-ew64yg mb-0">{`Infraestructura `}</p>
        <p className="css-ew64yg">institucional</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[15.506px] relative w-full">
          <div className="font-['Inter:Regular',sans-serif] font-normal leading-[25.465px] not-italic relative shrink-0 text-[23.112px] text-black text-center w-[355.375px]">
            <p className="css-4hzbpn mb-0">{`Infraestructura moderna `}</p>
            <p className="css-4hzbpn mb-0">{`con ubicación estratégica `}</p>
            <p className="css-4hzbpn">en Lima.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-center py-[47.809px] relative shrink-0 w-[519.455px]">
      <Frame />
      <Frame1 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[678.178px]">
      <div className="aspect-[4096/3660] relative rounded-[20px] shrink-0 w-full" data-name="EDIFICIO VERTICE 22 prueba 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={imgEdificioVertice22Prueba1} />
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[21.465px] items-start relative shrink-0 w-full">
      <Frame2 />
      <Frame3 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute bg-[#ededed] content-stretch flex flex-col items-start left-[71px] p-[39.028px] rounded-[19.514px] top-[152px] w-[1298px]">
      <div aria-hidden="true" className="absolute border-[#ee8a28] border-[4.879px] border-solid inset-0 pointer-events-none rounded-[19.514px]" />
      <Frame4 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[44px] items-start relative shrink-0 w-full">
      <Container />
      <Frame5 />
    </div>
  );
}

export default function Section() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start pt-[50px] sm:pt-[60px] lg:pt-[72px] px-4 sm:px-8 md:px-16 lg:px-[119px] relative size-full" data-name="Section">
      <Frame6 />
    </div>
  );
}