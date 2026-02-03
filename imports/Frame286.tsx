import svgPaths from "./svg-usw0p0rg8j";
import svgPathsReglamentos from "./svg-3twnh5a3kc";
import { imgVector } from "./svg-bspcy";

// Sección de Políticas
function Icon2() {
  return (
    <div className="absolute contents inset-[8.33%_16.66%_8.32%_16.67%]" data-name="Icon">
      <div className="absolute inset-[8.33%_16.66%_8.32%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.2944 34.5873">
            <path d={svgPaths.p2b27bb00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.14382" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[24px] sm:h-[30px] md:h-[37.726px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon2 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[10px] sm:left-[13px] md:left-[16.17px] size-[24px] sm:size-[30px] md:size-[37.726px] top-[10px] sm:top-[13px] md:top-[16.17px]" data-name="Icon1">
      <Icon />
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#0b95ba] relative rounded-[12px] md:rounded-[18.264px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.3)] md:shadow-[0px_0px_29.941px_0px_rgba(0,0,0,0.3)] shrink-0 size-[45px] sm:size-[55px] md:size-[70.062px]" data-name="Container4">
      <Icon1 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="shrink-0" data-name="Paragraph">
      <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[20px] sm:leading-[28px] md:leading-[39.004px] not-italic text-[#1c98b7] text-[16px] sm:text-[28px] md:text-[50.56px]">NUESTRAS POLÍTICAS</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[14px] sm:gap-[20px] md:gap-[26.002px] items-center">
      <Container1 />
      <Paragraph />
    </div>
  );
}

function Container2() {
  return (
    <div className="w-full py-[12px] sm:py-[18px] md:py-[22.75px] flex items-center justify-center" data-name="Container5">
      <Frame />
    </div>
  );
}

function Frame1() {
  return (
    <div className="w-full">
      <div className="content-stretch flex items-center justify-center p-[10px] sm:p-[12px] md:p-[14.446px] w-full">
        <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[22px] sm:leading-[30px] md:leading-[39.004px] not-italic text-[16px] sm:text-[20px] md:text-[26.002px] text-black text-center">Denuncie si se cometió una infracción a nuestras políticas:</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-start w-full">
      <Container2 />
      <Frame1 />
    </div>
  );
}

// Componentes de íconos de check para las políticas
function Icon4() {
  return (
    <div className="absolute contents inset-[8.32%_8.33%_8.35%_8.34%]" data-name="Icon">
      <div className="absolute inset-[8.32%_8.33%_8.35%_8.34%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35.7534 35.7535">
            <path d={svgPaths.p3ef71580} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.25031" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[16.67%_8.34%_41.67%_37.49%]" data-name="Vector_2">
        <div className="absolute inset-[-10%_-7.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.3773 19.5019">
            <path d={svgPaths.pc91400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.25031" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[28px] sm:h-[32px] md:h-[39.004px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon4 />
    </div>
  );
}

function Icon22() {
  return (
    <div className="content-stretch flex flex-col items-start shrink-0 size-[28px] sm:size-[32px] md:size-[39.004px]" data-name="Icon22">
      <Icon3 />
    </div>
  );
}

function PolicyCard({ text }: { text: string }) {
  return (
    <div className="bg-[#1c98b7] rounded-[16px] md:rounded-[24.558px] w-full">
      <div className="content-stretch flex flex-col items-start p-[10px] sm:p-[12px] md:p-[14.446px] w-full">
        <div className="content-stretch flex items-center justify-center w-full">
          <div className="content-stretch flex gap-[8px] sm:gap-[10px] md:gap-[11.557px] items-center">
            <Icon22 />
            <div className="content-stretch flex items-center justify-center p-[10px] sm:p-[12px] md:p-[14.446px]">
              <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] sm:leading-[28px] md:leading-[39.004px] not-italic text-[14px] sm:text-[18px] md:text-[26.002px] text-white">{text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame24() {
  const policies = [
    "Política del Sistema de Gestión Calidad",
    "Política del Sistema de Gestión Antisoborno",
    "Política de Protección a los Trabajadores",
    "Política de Regalos, Atenciones y Cortesías",
    "Política del Sistema de Gestión de Seguridad de la Información",
    "Política de Privacidad de Datos",
    "Política de Gestión de Incidentes"
  ];

  return (
    <div className="content-stretch flex flex-col gap-[16px] sm:gap-[20px] md:gap-[26.002px] items-center justify-center w-full">
      {policies.map((policy, index) => (
        <PolicyCard key={index} text={policy} />
      ))}
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] sm:gap-[20px] md:gap-[23.113px] items-start w-full px-4 sm:px-6 md:px-0">
      <Frame2 />
      <Frame24 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-4 sm:px-6 md:px-[28.892px] py-[24px] sm:py-[34px] md:py-[47.448px] rounded-[20px] sm:rounded-[28px] md:rounded-[36.189px] w-full">
      <Frame28 />
    </div>
  );
}

// Sección de Reglamentos
function Icon26() {
  return (
    <div className="absolute contents inset-[8.33%_16.67%_8.33%_16.66%]" data-name="Icon">
      <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.3375 32.1903">
            <path d={svgPaths.p24ea0b80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.92639" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_16.67%_66.67%_58.33%]" data-name="Vector_2">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.7056 11.7056">
            <path d={svgPaths.p21073a00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.92639" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_58.33%_62.5%_33.33%]" data-name="Vector_3">
        <div className="absolute inset-[-1.46px_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.85278 2.92639">
            <path d="M4.38959 1.4632H1.4632" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.92639" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[54.17%_33.33%_45.83%_33.33%]" data-name="Vector_4">
        <div className="absolute inset-[-1.46px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.632 2.92639">
            <path d="M13.1688 1.4632H1.4632" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.92639" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70.83%_33.33%_29.17%_33.33%]" data-name="Vector_5">
        <div className="absolute inset-[-1.46px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.632 2.92639">
            <path d="M13.1688 1.4632H1.4632" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.92639" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon25() {
  return (
    <div className="h-[24px] sm:h-[28px] md:h-[35.117px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon26 />
    </div>
  );
}

function Icon24() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[10px] sm:left-[12px] md:left-[15.05px] size-[24px] sm:size-[28px] md:size-[35.117px] top-[10px] sm:top-[12px] md:top-[15.05px]" data-name="Icon9">
      <Icon25 />
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#087a98] relative rounded-[12px] md:rounded-[17.001px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.3)] md:shadow-[0px_0px_27.87px_0px_rgba(0,0,0,0.3)] shrink-0 size-[45px] sm:size-[55px] md:size-[65.217px]" data-name="Container15">
      <Icon24 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex items-center justify-center p-[8px] sm:p-[10px] md:p-[11.148px]">
      <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[22px] sm:leading-[26px] md:leading-[30.1px] not-italic text-[22px] sm:text-[30px] md:text-[39.019px] text-white text-center">NUESTROS REGLAMENTOS</p>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex gap-[14px] sm:gap-[30px] md:gap-[50.167px] items-center justify-center w-full">
      <Container3 />
      <Frame30 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center w-full">
      <Frame31 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-col items-center w-full">
      <Frame32 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[8px] sm:p-[10px] md:p-[11.148px] w-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] sm:leading-[24px] md:leading-[30.1px] not-italic text-[14px] sm:text-[16px] md:text-[20.067px] text-white text-center w-full">Denuncie si se cometió una infracción a nuestros reglamentos:</p>
        </div>
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col items-center w-full">
      <Frame33 />
      <Frame34 />
    </div>
  );
}

// Íconos de check para reglamentos
function Icon29() {
  return (
    <div className="absolute contents inset-[8.32%_8.33%_8.35%_8.34%]" data-name="Icon">
      <div className="absolute inset-[8.32%_8.32%_8.35%_8.34%]" data-name="Vector">
        <div className="absolute inset-[-5%]" style={{ "--stroke-0": "rgba(28, 152, 183, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.5917 27.5917">
            <path d={svgPathsReglamentos.p9360100} id="Vector" stroke="var(--stroke-0, #1C98B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.50834" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[16.67%_8.33%_41.67%_37.51%]" data-name="Vector_2">
        <div className="absolute inset-[-10%_-7.69%]" style={{ "--stroke-0": "rgba(28, 152, 183, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.8125 15.05">
            <path d={svgPathsReglamentos.p3cba9500} id="Vector_2" stroke="var(--stroke-0, #1C98B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.50834" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon28() {
  return (
    <div className="h-[24px] sm:h-[26px] md:h-[30.1px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon29 />
    </div>
  );
}

function RegulationCard({ text }: { text: string }) {
  return (
    <div className="bg-white flex-1 min-w-0 rounded-[12px] md:rounded-[17.001px] p-[12px] sm:p-[16px] md:p-[20.07px] flex gap-[10px] sm:gap-[14px] md:gap-[18px] items-center justify-center">
      <div className="shrink-0 size-[24px] sm:size-[26px] md:size-[30.1px]">
        <Icon28 />
      </div>
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] sm:leading-[24px] md:leading-[30.1px] not-italic text-[#1c98b7] text-[14px] sm:text-[17px] md:text-[20.067px]">{text}</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col md:flex-row gap-[12px] sm:gap-[16px] md:gap-[20.067px] items-stretch w-full" data-name="Container19">
      <RegulationCard text="Reglamento Académico" />
      <RegulationCard text="Reglamento Ético" />
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] sm:gap-[11px] md:gap-[11.148px] items-center w-full px-4 sm:px-6 md:px-[24.53px] py-[16px] sm:py-[22px] md:py-[30.1px]">
      <Frame35 />
      <Container7 />
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#1c98b7] rounded-[16px] sm:rounded-[20px] md:rounded-[22.296px] w-full" data-name="Container">
      <Frame36 />
    </div>
  );
}

// Botón de denuncia
function Group1() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <div className="absolute bottom-0 left-[0.01%] mask-alpha mask-intersect mask-no-clip mask-no-repeat right-0 top-1/4" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-4.16%_-3.75%_-5%_-3.75%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40.0396 30.5003">
            <path d={svgPaths.p84fd480} id="Vector" stroke="var(--stroke-0, white)" strokeLinejoin="round" strokeWidth="2.79398" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[40%_0_32.5%_0]" data-name="Vector_2" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-11.69%_-1.93%_-13.64%_-1.93%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38.6893 12.8398">
            <path d={svgPaths.p31b34300} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinejoin="round" strokeWidth="2.79398" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[15%] right-[15%] top-0" data-name="Vector_3" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-7.5%_-5.36%_0_-5.36%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.8703 20.0241">
            <path d={svgPaths.p17e92c00} id="Vector_3" stroke="var(--stroke-0, white)" strokeWidth="2.79398" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20%_39.99%_60%_40.01%]" data-name="Vector_4" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-18.75%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2444 10.2449">
            <path d={svgPaths.pf65400} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.79398" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group1 />
    </div>
  );
}

function Icon33() {
  return (
    <div className="h-[24px] sm:h-[30px] md:h-[37.252px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#ee8a28] content-stretch flex flex-col items-center justify-center rounded-[12px] sm:rounded-[14px] md:rounded-[15.353px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.3)] md:shadow-[0px_0px_25.17px_0px_rgba(0,0,0,0.3)] w-full py-[14px] sm:py-[16px] md:py-[17.877px] px-[20px] sm:px-[24px] md:px-[26.976px] cursor-pointer hover:bg-[#d77821] transition-colors" data-name="Button">
      <div className="flex items-center gap-[10px] sm:gap-[14px] md:gap-[18px]">
        <div className="size-[24px] sm:size-[30px] md:size-[37.252px]">
          <Icon33 />
        </div>
        <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[24px] sm:leading-[32px] md:leading-[41.218px] not-italic text-[18px] sm:text-[22px] md:text-[27.479px] text-center text-white">Realizar denuncia</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="w-full flex flex-col gap-[16px] sm:gap-[20px] md:gap-[24px] items-center" data-name="Container22">
      <Button />
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] sm:leading-[24px] md:leading-[26px] text-[14px] sm:text-[17px] md:text-[20px] text-center text-[#4b5563] px-4">Todas las denuncias son tratadas con estricta confidencialidad</p>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] sm:gap-[32px] md:gap-[39.069px] items-center w-full max-w-[1303.219px] mx-auto">
      <Frame29 />
      <Container />
      <Container8 />
    </div>
  );
}

export default function Frame38() {
  return (
    <div className="bg-[#f2f3f5] content-stretch flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[181.39px] py-[32px] sm:py-[44px] md:py-[57px] w-full">
      <Frame37 />
    </div>
  );
}