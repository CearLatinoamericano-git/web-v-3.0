

function ImageInstalacionesCear() {
  return (
    <div className="absolute h-[290px] left-0 rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.15)] top-0 w-[438px]" data-name="Image (Instalaciones CEAR)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgImageInstalacionesCear} />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[31.5px] mb-[-3px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[31.5px] left-0 not-italic text-[#0b95ba] text-[22.5px] text-nowrap top-0">Infraestructura académica</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[22.5px] mb-[-3px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] left-0 not-italic text-[15.75px] text-[rgba(0,0,0,0.9)] text-nowrap top-[-1px]">Ambientes diseñados para formación especializada.</p>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col h-[63px] items-start left-[27px] pb-[3px] pt-0 px-0 top-[220px] w-[287.75px]" data-name="Container">
      <Paragraph />
      <Paragraph1 />
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <ImageInstalacionesCear />
      <div className="absolute bg-white h-[86px] left-0 rounded-bl-[20px] rounded-br-[20px] top-[204px] w-[438px]" />
      <Container />
    </div>
  );
}