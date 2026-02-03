import svgPaths from "./svg-lyayekpngu";

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center p-[10px] relative shrink-0">
      <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] not-italic relative shrink-0 text-[#111827] text-[64px] text-center tracking-[1.2px] uppercase">¡Su opinión es</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-center justify-center p-[10px] relative shrink-0">
      <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] not-italic relative shrink-0 text-[#ee8a28] text-[64px] text-center tracking-[1.2px] uppercase">importante!</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 w-full">
      <Frame />
      <Frame4 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-center p-[10px] relative shrink-0">
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[31.5px] not-italic relative shrink-0 text-[#4b5563] text-[22.5px] text-center">Trabajamos constantemente para mejorar y ofrecer una mejor experiencia</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <Frame1 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-start py-[24px] relative shrink-0 w-full">
      <Frame5 />
      <Frame2 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[131.625px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[32.906px] left-0 not-italic text-[#364153] text-[20.25px] text-justify top-[-0.42px] w-[657px]">Este espacio ha sido habilitado para que pueda remitir sus sugerencias o reclamos de manera directa, segura y confidencial. Cada comunicación será analizada cuidadosamente en el marco de nuestro compromiso con la mejora continua de nuestros servicios.</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[31.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.5 31.5">
        <g id="Icon">
          <path d={svgPaths.p8ece400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[#0b95ba] relative rounded-[15.25px] shrink-0 size-[63px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[31.5px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[31.5px] left-0 not-italic text-[22.5px] text-white top-[0.58px]">Sugerencia</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[87.75px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[29.25px] left-0 not-italic text-[18px] text-white top-[1.58px] w-[510px]">Propuesta o recomendación orientada a optimizar la calidad de nuestros servicios y fortalecer la experiencia de quienes interactúan con nuestra institución.</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="flex-[1_0_0] h-[128.25px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[9px] items-start relative size-full">
        <Heading />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[18px] h-[128.25px] items-start relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Container7 />
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-gradient-to-b from-[#0b95ba] h-[186.25px] relative rounded-[18px] shrink-0 to-[#087a98] w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#0b95ba] border-solid inset-0 pointer-events-none rounded-[18px]" />
      <div className="content-stretch flex flex-col items-start pb-[2px] pt-[29px] px-[29px] relative size-full">
        <Container5 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[31.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.5 31.5">
        <g id="Icon">
          <path d={svgPaths.p2944a700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
          <path d="M15.75 11.0774V16.3274" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
          <path d="M15.75 21.5774H15.7631" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[#ff6900] relative rounded-[15.25px] shrink-0 size-[63px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[31.5px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[31.5px] left-0 not-italic text-[#111827] text-[22.5px] top-[0.58px]">Reclamo</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[87.75px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[29.25px] left-0 not-italic text-[#4b5563] text-[18px] top-[1.58px] w-[497px]">Manifestación de insatisfacción relacionada con nuestros servicios, respecto de la cual nos comprometemos brindar una respuesta en un plazo de 7 días hábiles.</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="flex-[1_0_0] h-[128.25px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[9px] items-start relative size-full">
        <Heading1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[18px] h-[128.25px] items-start relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[186.25px] relative rounded-[18px] shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(164.173deg, rgba(255, 105, 0, 0.05) 0%, rgba(255, 105, 0, 0.1) 100%)" }}>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,105,0,0.2)] border-solid inset-0 pointer-events-none rounded-[18px]" />
      <div className="content-stretch flex flex-col items-start pb-[2px] pt-[29px] px-[29px] relative size-full">
        <Container9 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[18px] h-[390.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Container8 />
    </div>
  );
}

function Container2() {
  return (
    <div className="col-[1] content-stretch css-vsca90 flex flex-col gap-[36px] items-start relative row-[1] self-stretch shrink-0" data-name="Container">
      <Paragraph />
      <Container3 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[#ee8a28] h-[74px] relative rounded-[15.191px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[15.191px] py-[22.786px] relative size-full">
          <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[18.681px] not-italic relative shrink-0 text-[34.871px] text-center text-white">NOMBRE DE FORMULARIO</p>
        </div>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#364153] text-[15.75px] top-[-0.42px]">Tipo *</p>
    </div>
  );
}

function Option() {
  return (
    <div className="absolute left-[-896px] size-0 top-[-2704.42px]" data-name="Option">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[#111827] text-[18px] top-0 w-0">Seleccione el tipo de comunicación</p>
    </div>
  );
}

function Option1() {
  return (
    <div className="absolute left-[-896px] size-0 top-[-2704.42px]" data-name="Option">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[#111827] text-[18px] top-0 w-0">Sugerencia</p>
    </div>
  );
}

function Option2() {
  return (
    <div className="absolute left-[-896px] size-0 top-[-2704.42px]" data-name="Option">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[#111827] text-[18px] top-0 w-0">Reclamo</p>
    </div>
  );
}

function Dropdown() {
  return (
    <div className="bg-[#f9fafb] h-[58.5px] relative rounded-[15.25px] shrink-0 w-full" data-name="Dropdown">
      <div aria-hidden="true" className="absolute border-2 border-[#0b95ba] border-solid inset-0 pointer-events-none rounded-[15.25px]" />
      <Option />
      <Option1 />
      <Option2 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[9px] h-[90px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <Dropdown />
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#364153] text-[15.75px] top-[-0.42px]">Nombre completo *</p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="bg-[#f9fafb] h-[62.5px] relative rounded-[15.25px] shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[18px] py-[15.75px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[18px]">Ingrese su nombre completo</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#0b95ba] border-solid inset-0 pointer-events-none rounded-[15.25px]" />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col gap-[9px] h-[94px] items-start relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <TextInput />
    </div>
  );
}

function Label2() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#364153] text-[15.75px] top-[-0.42px]">Correo electrónico *</p>
    </div>
  );
}

function EmailInput() {
  return (
    <div className="bg-[#f9fafb] h-[62.5px] relative rounded-[15.25px] shrink-0 w-full" data-name="Email Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[18px] py-[15.75px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[18px]">ejemplo@correo.com</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#0b95ba] border-solid inset-0 pointer-events-none rounded-[15.25px]" />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col gap-[9px] h-[94px] items-start relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <EmailInput />
    </div>
  );
}

function Label3() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#364153] text-[15.75px] top-[-0.42px]">Mensaje *</p>
    </div>
  );
}

function TextArea() {
  return (
    <div className="bg-[#f9fafb] h-[170.5px] relative rounded-[15.25px] shrink-0 w-full" data-name="Text Area">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[18px] py-[15.75px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#99a1af] text-[18px]">Detalle su sugerencia o reclamo de manera clara y precisa</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#0b95ba] border-solid inset-0 pointer-events-none rounded-[15.25px]" />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col gap-[9px] h-[209px] items-start relative shrink-0 w-full" data-name="Container">
      <Label3 />
      <TextArea />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#0b95ba] h-[63px] relative rounded-[15.25px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] shrink-0 w-full" data-name="Button">
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] left-[290.81px] not-italic text-[18px] text-center text-white top-[19.58px] translate-x-[-50%]">Enviar</p>
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex flex-col gap-[27px] h-[658px] items-start relative shrink-0 w-full" data-name="Form">
      <Container13 />
      <Container14 />
      <Container15 />
      <Container16 />
      <Button />
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-white h-[734px] relative rounded-[27px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(11,149,186,0.2)] border-solid inset-0 pointer-events-none rounded-[27px] shadow-[0px_10px_40px_0px_rgba(11,149,186,0.15)]" />
      <div className="content-stretch flex flex-col items-start pb-[2px] pt-[38px] px-[38px] relative size-full">
        <Form />
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="col-[2] content-stretch flex flex-col gap-[14px] items-start relative row-[1] self-start shrink-0 w-[657px]">
      <Frame6 />
      <Container12 />
    </div>
  );
}

function Container1() {
  return (
    <div className="gap-[54px] grid grid-cols-[repeat(2,_minmax(0,_1fr))] grid-rows-[repeat(1,_minmax(0,_1fr))] h-[822px] relative shrink-0 w-[1368px]" data-name="Container">
      <Container2 />
      <Frame7 />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[822px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[36px] relative size-full">
        <Container1 />
      </div>
    </div>
  );
}

export default function Section() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start pt-[20px] sm:pt-[25px] lg:pt-[30px] px-4 sm:px-8 md:px-16 lg:px-[111px] relative size-full" data-name="Section">
      <Frame3 />
      <Container />
    </div>
  );
}