function IsoSection() {
  return (
    <div className="absolute h-[86.053px] left-[9.21px] top-[20.47px] w-[324.58px]" data-name="ISOSection">
      <p className="absolute css-4hzbpn font-['Inter:Bold',sans-serif] font-bold leading-[28.679px] left-[167.48px] not-italic text-[#1c98b7] text-[28.679px] text-center top-[0.02px] tracking-[0.8194px] translate-x-[-50%] uppercase w-[334.926px]">Nuestras certificaciones ISO</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[22.782px] relative shrink-0 w-[159.307px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[22.777px] not-italic relative shrink-0 text-[#111827] text-[17.896px] text-center">Calidad certificada</p>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[22.782px] relative shrink-0 w-[161.726px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="bg-clip-text css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[22.777px] not-italic relative shrink-0 text-[17.896px] text-[rgba(0,0,0,0)] text-center" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(178.903deg, rgb(11, 149, 186) 5.1406%, rgb(8, 122, 152) 94.859%)" }}>
          internacionalmente
        </p>
      </div>
    </div>
  );
}

function IsoSection1() {
  return (
    <div className="absolute content-stretch flex gap-[3.65px] h-[22.533px] items-center justify-center left-[9.22px] pt-[9.218px] top-[77.84px]" data-name="ISOSection">
      <Paragraph />
      <Paragraph1 />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[115.739px] relative shrink-0 w-full" data-name="Container">
      <IsoSection />
      <IsoSection1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-center mb-[-3.073px] relative shrink-0 w-full">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[20.076px] min-h-px min-w-px not-italic relative text-[#0b95ba] text-[12.776px] tracking-[0.73px] uppercase">Experiencia y estándares internacionales</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center mb-[-3.073px] relative shrink-0 w-full">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[34.824px] min-h-px min-w-px not-italic relative text-[#111827] text-[28.679px]">Centro especializado con</p>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[34.824px] min-h-px min-w-px not-italic relative text-[#0b95ba] text-[28.679px]">respaldo internacional</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-3.073px] pr-[10.242px] relative shrink-0 w-[324.683px]">
      <Text />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[3.073px] relative shrink-0 w-full">
      <Frame2 />
      <Frame />
      <Frame1 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[18.436px] left-[0.43px] not-italic text-[#4b5563] text-[15.364px] text-justify top-[0.66px] w-[343.12px]">CEAR LATINOAMERICANO se distingue por su compromiso con la excelencia académica y la calidad metodológica en la formación profesional especializada. Nuestra propuesta formativa se desarrolla en coordinación con universidades licenciadas por SUNEDU, principalmente en las áreas de Derecho e Ingeniería, lo que permite ofrecer programas actualizados y alineados con las tendencias y exigencias del entorno profesional.</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[13.315px] items-start min-h-px min-w-px relative w-full" data-name="Container">
      <Frame3 />
      <Paragraph2 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col h-[295px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Container2 />
    </div>
  );
}

export default function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[25px] items-end relative size-full">
      <Container />
      <Container1 />
    </div>
  );
}