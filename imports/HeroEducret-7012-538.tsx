import svgPaths from "./svg-e9ulumzys8";



function Icon() {
  return (
    <div className="h-[144px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[30.83%_0_0_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1662 99.6">
          <path d={svgPaths.p13d44600} fill="var(--fill-0, white)" fillOpacity="0.1" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[47.92%_0_0_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1662 75">
          <path d={svgPaths.p330bc00} fill="var(--fill-0, white)" fillOpacity="0.03" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col h-[144px] items-start left-0 top-[608px] w-[1662px]" data-name="Container">
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
    <div className="content-stretch flex flex-col font-['Inter:Bold',sans-serif] font-bold items-start not-italic pb-[30px] pt-0 px-0 relative shadow-[0px_4px_4px_0px_rgba(0,0,0,0.37)] shrink-0 text-white w-full">
      <p className="css-ew64yg leading-[71.23px] relative shrink-0 text-[62px] tracking-[-1.108px]">DESCUBRE</p>
      <p className="css-ew64yg leading-[142.349px] relative shrink-0 text-[90px] tracking-[-2.2143px]">NUESTRAS</p>
      <p className="css-ew64yg leading-[87.296px] relative shrink-0 text-[90px] tracking-[-1.3579px]">ESPECIALIDADES</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center p-[10.073px] relative shrink-0 w-[796.996px]">
      <p className="css-4hzbpn font-['Inter:Bold',sans-serif] font-bold leading-[28.193px] not-italic relative shrink-0 text-[22px] text-[rgba(255,255,255,0.85)] tracking-[-0.2176px] w-[769.888px]">Explora nuestra oferta completa de diplomados y cursos.</p>
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
    <div className="absolute content-stretch flex flex-col gap-[4.337px] items-start left-[152px] top-[327.34px] w-[802.851px]">
      <Frame3 />
      <Frame1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[852px] left-0 overflow-clip top-[-100px] w-[1662px]" data-name="Container">
      <div className="absolute h-[677.941px] left-[62px] top-[134px] w-[1172px]" data-name="prueba gris 1">
        <div className="absolute inset-0 mix-blend-multiply opacity-55 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-full left-[0.01%] max-w-none top-[0.07%] w-[100.07%]" src={imgPruebaGris1} />
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[1541.82px] size-[40.307px] top-[168.93px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[346.32deg]">
          <Container2 />
        </div>
      </div>
      <div className="absolute flex h-[68.286px] items-center justify-center left-[352.19px] top-[588.23px] w-[68.287px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[191.4deg]">
          <Container3 />
        </div>
      </div>
      <Frame2 />
      <p className="absolute css-ew64yg font-['Bricolage_Grotesque:Bold',sans-serif] font-bold leading-[87.296px] left-[355px] text-[#ee8a28] text-[67.897px] text-shadow-[0px_4px_4px_rgba(0,0,0,0.53)] top-[134px] tracking-[-1.3579px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        FORMACIÓN ESPECIALIZADA
      </p>
      <div className="absolute h-[624px] left-[974px] top-[228px] w-[608px]" data-name="luis villavicencio 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[102.27%] left-[11.58%] max-w-none top-[-2.27%] w-[81.96%]" src={imgLuisVillavicencio1} />
        </div>
      </div>
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