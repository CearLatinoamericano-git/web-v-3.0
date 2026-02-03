import svgPaths from "./svg-it77wxuxwn";



function Icon() {
  return (
    <div className="h-[144px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[3.06%_0_27.78%_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1662 99.6">
          <path d={svgPaths.p13d44600} fill="var(--fill-0, white)" fillOpacity="0.1" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[11.11%_0_27.78%_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1662 88">
          <path d={svgPaths.p30769300} fill="var(--fill-0, white)" fillOpacity="0.05" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col h-[144px] items-start left-0 top-[780px] w-[1662px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Container2() {
  return <div className="size-[33.363px]" data-name="Container" />;
}

function Container3() {
  return <div className="size-[57.972px]" data-name="Container" />;
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Bold',sans-serif] font-bold items-start not-italic pb-[29.533px] relative shadow-[0px_3.938px_3.938px_0px_rgba(0,0,0,0.37)] shrink-0 text-white w-full">
      <p className="leading-[70.122px] relative shrink-0 text-[61.035px] tracking-[-1.0908px]">DESCUBRE</p>
      <p className="leading-[140.134px] relative shrink-0 text-[88.599px] tracking-[-2.1799px]">NUESTRAS</p>
      <p className="leading-[85.938px] relative shrink-0 text-[88.599px] tracking-[-1.3368px]">ESPECIALIDADES</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center p-[9.917px] relative shrink-0 w-[784.592px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[27.754px] not-italic relative shrink-0 text-[21.658px] text-[rgba(255,255,255,0.85)] tracking-[-0.2142px] w-[757.905px] whitespace-pre-wrap">Explora nuestra oferta completa de diplomados y cursos.</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4.27px] h-[279.58px] items-start left-[177px] top-[296px] w-[759px]">
      <Frame3 />
      <Frame1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[780px] left-0 overflow-clip top-[103px] w-[1662px]" data-name="Container">
      <div className="absolute h-[756.519px] left-[177px] top-0 w-[1307.843px]" data-name="prueba gris 1">
        <div className="absolute inset-0 mix-blend-multiply opacity-49 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-full left-[0.01%] max-w-none top-[0.07%] w-[100.07%]" src={imgPruebaGris1} />
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[1541.82px] size-[40.307px] top-[168.93px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[-13.68deg]">
          <Container2 />
        </div>
      </div>
      <div className="absolute flex h-[68.286px] items-center justify-center left-[352.19px] top-[588.23px] w-[68.287px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[-168.6deg]">
          <Container3 />
        </div>
      </div>
      <Frame2 />
      <div className="absolute h-[615px] left-[886px] top-[169px] w-[598.748px]" data-name="luis villavicencio 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[102.27%] left-[11.58%] max-w-none top-[-2.27%] w-[81.96%]" src={imgLuisVillavicencio1} />
        </div>
      </div>
    </div>
  );
}

export default function HeroEducret() {
  return (
    <div className="overflow-clip relative rounded-bl-[50px] rounded-br-[50px] size-full" data-name="HeroEducret" style={{ backgroundImage: "linear-gradient(5.39727deg, rgb(28, 152, 183) 5.3068%, rgb(86, 18, 137) 90.834%)" }}>
      <Container />
      <Container1 />
    </div>
  );
}