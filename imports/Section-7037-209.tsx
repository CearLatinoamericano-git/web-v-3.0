import svgPaths from "./svg-bqxdqeyz84";

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-center p-[10px] relative shrink-0">
      <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] not-italic relative shrink-0 text-[#111827] text-[64px] text-center tracking-[1.2px] uppercase">¿Tiene alguna</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center p-[10px] relative shrink-0">
      <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] not-italic relative shrink-0 text-[#ee8a28] text-[64px] text-center tracking-[1.2px] uppercase">consulta?</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[2px] items-center justify-center relative shrink-0 w-full">
      <Frame1 />
      <Frame />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col h-[55px] items-start relative shrink-0 w-full" data-name="Container">
      <Frame2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[50px] pt-[20px] px-[10px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[53px] not-italic relative shrink-0 text-[#4b5563] text-[48px] text-center w-[1125px]">Complete el formulario y nos pondremos en contacto con usted a la brevedad</p>
        </div>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="h-[23.377px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[23.377px] left-0 not-italic text-[#364153] text-[16.364px] top-[-0.34px]">Nombre completo *</p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="bg-[#f9fafb] h-[55.584px] relative rounded-[15.844px] shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[18.701px] py-[11.688px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[18.701px]">Juan Pérez</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#0b95ba] border-[2.078px] border-solid inset-0 pointer-events-none rounded-[15.844px]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="col-[1] content-stretch css-vsca90 flex flex-col gap-[7.013px] items-start relative row-[1] self-stretch shrink-0" data-name="Container">
      <Label />
      <TextInput />
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[23.377px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[23.377px] left-0 not-italic text-[#364153] text-[16.364px] top-[-0.34px]">Teléfono *</p>
    </div>
  );
}

function PhoneInput() {
  return (
    <div className="bg-[#f9fafb] h-[55.584px] relative rounded-[15.844px] shrink-0 w-full" data-name="Phone Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[18.701px] py-[11.688px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[18.701px]">+51 999 999 999</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#0b95ba] border-[2.078px] border-solid inset-0 pointer-events-none rounded-[15.844px]" />
    </div>
  );
}

function Container4() {
  return (
    <div className="col-[2] content-stretch css-vsca90 flex flex-col gap-[7.013px] items-start relative row-[1] self-stretch shrink-0" data-name="Container">
      <Label1 />
      <PhoneInput />
    </div>
  );
}

function Container2() {
  return (
    <div className="gap-[18.7012996673584px] grid grid-cols-[repeat(2,_minmax(0,_1fr))] grid-rows-[repeat(1,_minmax(0,_1fr))] h-[85.974px] relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Label2() {
  return (
    <div className="h-[23.377px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[23.377px] left-0 not-italic text-[#364153] text-[16.364px] top-[-0.34px]">Correo electrónico *</p>
    </div>
  );
}

function EmailInput() {
  return (
    <div className="bg-[#f9fafb] h-[55.584px] relative rounded-[15.844px] shrink-0 w-full" data-name="Email Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[18.701px] py-[11.688px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[18.701px]">juan.perez@ejemplo.com</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#0b95ba] border-[2.078px] border-solid inset-0 pointer-events-none rounded-[15.844px]" />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[7.013px] h-[85.974px] items-start relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <EmailInput />
    </div>
  );
}

function Label3() {
  return (
    <div className="h-[23.377px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[23.377px] left-0 not-italic text-[#364153] text-[16.364px] top-[-0.34px]">Asunto *</p>
    </div>
  );
}

function TextInput1() {
  return (
    <div className="bg-[#f9fafb] h-[55.584px] relative rounded-[15.844px] shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[18.701px] py-[11.688px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[18.701px]">Indique el asunto de su consulta</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#0b95ba] border-[2.078px] border-solid inset-0 pointer-events-none rounded-[15.844px]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[7.013px] h-[85.974px] items-start relative shrink-0 w-full" data-name="Container">
      <Label3 />
      <TextInput1 />
    </div>
  );
}

function Label4() {
  return (
    <div className="h-[23.377px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[23.377px] left-0 not-italic text-[#364153] text-[16.364px] top-[-0.34px]">Mensaje *</p>
    </div>
  );
}

function TextArea() {
  return (
    <div className="bg-[#f9fafb] h-[139.74px] relative rounded-[15.844px] shrink-0 w-full" data-name="Text Area">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[18.701px] py-[11.688px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[28.052px] not-italic relative shrink-0 text-[#99a1af] text-[18.701px]">Describa brevemente su consulta o requerimiento</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#0b95ba] border-[2.078px] border-solid inset-0 pointer-events-none rounded-[15.844px]" />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[7.013px] h-[177.403px] items-start relative shrink-0 w-full" data-name="Container">
      <Label4 />
      <TextArea />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[370.42px] size-[23.377px] top-[24.57px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.3766 23.3766">
        <g id="Icon">
          <path d={svgPaths.p2fdf5600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94805" />
          <path d={svgPaths.p3babb700} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94805" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#ee8a28] h-[76px] relative rounded-[15.844px] shadow-[0px_0px_25.974px_0px_rgba(0,0,0,0.3)] shrink-0 w-full" data-name="Button">
      <Icon />
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28.052px] left-[472.14px] not-italic text-[18.701px] text-center text-white top-[23.27px] translate-x-[-50%]">Enviar mensaje</p>
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex flex-col gap-[18.701px] h-[566.234px] items-start relative shrink-0 w-full" data-name="Form">
      <Container2 />
      <Container5 />
      <Container6 />
      <Container7 />
      <Button />
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[659px] items-start pb-[2.078px] pt-[39.481px] px-[39.481px] relative rounded-[18.701px] shrink-0 w-[1070px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[2.078px] border-solid inset-0 pointer-events-none rounded-[18.701px]" />
      <Form />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[28.052px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.0519 28.0519">
        <g id="Icon">
          <path d={svgPaths.p11764500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33766" />
          <path d={svgPaths.pae7a000} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33766" />
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.2)] content-stretch flex items-center justify-center left-[127.86px] rounded-[34861716px] size-[65.455px] top-[0.58px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[28.052px] left-0 top-[80.06px] w-[321.185px]" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28.052px] left-[160.85px] not-italic text-[18.701px] text-center text-white top-[1.04px] translate-x-[-50%]">Correo electrónico</p>
    </div>
  );
}

function Link() {
  return (
    <div className="absolute content-stretch flex h-[45.714px] items-start left-0 top-0 w-[321.185px]" data-name="Link">
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20.455px] not-italic relative shrink-0 text-[16.364px] text-[rgba(255,255,255,0.9)] text-center">academico@cearlatinoamericano.edu.pe</p>
    </div>
  );
}

function Link1() {
  return (
    <div className="absolute content-stretch flex h-[45.714px] items-start left-0 top-[28.05px] w-[321.185px]" data-name="Link">
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20.455px] not-italic relative shrink-0 text-[16.364px] text-[rgba(255,255,255,0.9)] text-center">area_academica@cearlatinoamericano.pe</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute h-[73.766px] left-0 top-[117.46px] w-[321.185px]" data-name="Container">
      <Link />
      <Link1 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[190.649px] relative shrink-0 w-[321.185px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container10 />
        <Heading />
        <Container11 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[28.052px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.0519 28.0519">
        <g id="Icon">
          <path d={svgPaths.p3e95e680} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33766" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.2)] content-stretch flex items-center justify-center left-[70.57px] rounded-[34861716px] size-[65.455px] top-[0.58px]" data-name="Container">
      <Icon2 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[28.052px] left-0 top-[80.06px] w-[206.591px]" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28.052px] left-[103.19px] not-italic text-[18.701px] text-center text-white top-[1.04px] translate-x-[-50%]">Teléfonos</p>
    </div>
  );
}

function Link2() {
  return (
    <div className="absolute content-stretch flex h-[45.714px] items-start left-0 top-0 w-[206.591px]" data-name="Link">
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20.455px] not-italic relative shrink-0 text-[16.364px] text-[rgba(255,255,255,0.9)] text-center">(01) 397 8586 - Anexo 103</p>
    </div>
  );
}

function Link3() {
  return (
    <div className="absolute content-stretch flex h-[45.714px] items-start left-0 top-[28.05px] w-[206.591px]" data-name="Link">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20.455px] min-h-px min-w-px not-italic relative text-[16.364px] text-[rgba(255,255,255,0.9)] text-center">(+51) 986 605 219</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute h-[73.766px] left-0 top-[117.46px] w-[206.591px]" data-name="Container">
      <Link2 />
      <Link3 />
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[190.649px] relative shrink-0 w-[206.591px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container13 />
        <Heading1 />
        <Container14 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[28.052px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.0519 28.0519">
        <g id="Icon">
          <path d={svgPaths.p164a4a00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33766" />
          <path d={svgPaths.p19151180} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33766" />
        </g>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.2)] content-stretch flex items-center justify-center left-[84.95px] rounded-[34861716px] size-[65.455px] top-[0.58px]" data-name="Container">
      <Icon3 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute h-[28.052px] left-0 top-[80.06px] w-[235.357px]" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28.052px] left-[118.45px] not-italic text-[18.701px] text-center text-white top-[1.04px] translate-x-[-50%]">Ubicación de oficina</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute font-['Inter:Regular',sans-serif] font-normal h-[40.909px] leading-[20.455px] left-0 not-italic text-[16.364px] text-[rgba(255,255,255,0.9)] text-center top-[117.46px] w-[235.357px]" data-name="Paragraph">
      <p className="absolute css-ew64yg left-[117.76px] top-[-1.04px] translate-x-[-50%]">Av. Faustino Sánchez Carrión</p>
      <p className="absolute css-ew64yg left-[118px] top-[19.42px] translate-x-[-50%]">615, Jesús María - Oficina 306</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[157.792px] relative shrink-0 w-[235.357px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container16 />
        <Heading2 />
        <Paragraph />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#0b95ba] content-stretch flex flex-col h-[659px] items-center justify-between py-[28.052px] relative rounded-[18.701px] shadow-[0px_0px_25.974px_0px_rgba(0,0,0,0.3)] shrink-0 w-[349px]" data-name="Container">
      <Container9 />
      <Container12 />
      <Container15 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[20.779px] items-center relative shrink-0 w-full">
      <Container1 />
      <Container8 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Container />
      <Frame3 />
      <Frame4 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[1440px]">
      <Frame5 />
    </div>
  );
}

export default function Section() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start pt-[60px] sm:pt-[75px] lg:pt-[90px] px-4 sm:px-8 md:px-16 lg:px-[111px] relative size-full" data-name="Section">
      <Frame6 />
    </div>
  );
}