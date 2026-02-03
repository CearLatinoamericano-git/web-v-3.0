

function Heading() {
  return (
    <div className="h-[40.972px] mb-[-3.035px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[40.972px] left-0 not-italic text-[#0b95ba] text-[34.144px] text-nowrap top-[-1.01px]">Infraestructura institucional</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[63.735px] mb-[-3.035px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[31.868px] left-0 not-italic text-[20.486px] text-black top-0 w-[652.525px]">Infraestructura moderna con ubicación estratégica en Lima.</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[32.37px] pb-[3.035px] pt-0 px-0 top-[483.58px] w-[704.12px]">
      <Heading />
      <Paragraph />
    </div>
  );
}

export default function ImageEdificioCear() {
  return (
    <div className="overflow-clip relative rounded-[20.233px] shadow-[0px_4.047px_20.233px_0px_rgba(0,0,0,0.15)] size-full" data-name="Image (Edificio CEAR)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20.233px] size-full" src={imgImageEdificioCear} />
      <div className="absolute bg-white h-[145.68px] left-0 rounded-bl-[20.233px] rounded-br-[20.233px] top-[461.32px] w-[913.535px]" />
      <Frame />
    </div>
  );
}