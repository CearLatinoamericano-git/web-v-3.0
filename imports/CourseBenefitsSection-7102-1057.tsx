import svgPaths from "./svg-gj0k35ccvw";


function CourseBenefitsSection1() {
  return (
    <div className="h-[35.984px] relative shrink-0 w-full" data-name="CourseBenefitsSection">
      <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[684.45px] not-italic text-[#ee8a28] text-[64px] text-center top-[-0.52px] tracking-[1.2px] translate-x-[-50%] uppercase">Presentación del programa</p>
    </div>
  );
}

function CourseBenefitsSection2() {
  return (
    <div className="h-[54px] relative shrink-0 w-full" data-name="CourseBenefitsSection">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[53px] left-[684.08px] not-italic text-[#111827] text-[48px] text-center top-[-0.52px] translate-x-[-50%]">Valor y resultados profesionales</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[18px] h-[107.984px] items-start relative shrink-0 w-full" data-name="Container">
      <CourseBenefitsSection1 />
      <CourseBenefitsSection2 />
    </div>
  );
}

function CourseBenefitsSection3() {
  return <div className="absolute blur-[57.734px] left-[470.89px] rounded-[30269154px] size-[129.901px] top-[215.15px]" data-name="CourseBenefitsSection" style={{ backgroundImage: "linear-gradient(90deg, rgb(28, 152, 183) 0%, rgb(28, 152, 183) 100%), linear-gradient(90deg, rgba(8, 122, 152, 0.12) 0%, rgba(8, 122, 152, 0.12) 100%)" }} />;
}

function ImageVideoPreview() {
  return (
    <div className="absolute h-[328.813px] left-0 top-0 w-[584.556px]" data-name="Image (Video preview)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageVideoPreview} />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[40.594px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40.5941 40.5941">
        <g id="Icon">
          <path d={svgPaths.p3f46a00} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.38284" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#1c98b7] relative rounded-[30269154px] shadow-[0px_0px_22.552px_0px_rgba(0,0,0,0.3)] shrink-0 size-[81.188px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[4.059px] relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute bg-[rgba(16,24,40,0.4)] content-stretch flex h-[328.813px] items-center justify-center left-0 top-0 w-[584.556px]" data-name="Container">
      <Button />
    </div>
  );
}

function CourseBenefitsSection4() {
  return (
    <div className="absolute bg-[#101828] h-[328.813px] left-0 overflow-clip rounded-[16.238px] shadow-[0px_0px_22.552px_0px_rgba(0,0,0,0.3)] top-0 w-[584.556px]" data-name="CourseBenefitsSection">
      <ImageVideoPreview />
      <Container4 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[328.813px] left-[761.22px] top-[19.02px] w-[584.556px]" data-name="Container">
      <CourseBenefitsSection3 />
      <CourseBenefitsSection4 />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[364.5px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[32.906px] left-0 not-italic text-[#364153] text-[20.25px] text-justify top-[-29.98px] w-[511px]">El ejercicio arbitral en contratación pública exige un dominio riguroso del Derecho Administrativo, en particular para evaluar la validez de los actos y resolver controversias con sustento técnico y jurídico. Este diplomado ofrece una formación especializada orientada al análisis del acto administrativo, los procedimientos sancionadores y contenciosos, y su incidencia directa en el arbitraje. El programa está diseñado para que el participante desarrolle criterio jurídico aplicado, capaz de sustentar decisiones arbitrales, reducir riesgos de nulidad y actuar con solvencia como Árbitro Único o Presidente de Tribunal Arbitral.</p>
      <Container3 />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[616.484px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[72px] items-start px-[36px] relative size-full">
        <Container1 />
        <div className="absolute bg-[#1c98b7] h-[472px] left-[925px] top-[144.52px] w-[322px]" />
        <Container2 />
      </div>
    </div>
  );
}

export default function CourseBenefitsSection() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start pt-[58px] px-[110px] relative size-full" data-name="CourseBenefitsSection">
      <Container />
    </div>
  );
}