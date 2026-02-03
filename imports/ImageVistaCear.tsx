

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col h-[63px] items-start left-[21px] not-italic pb-[3px] pt-0 px-0 top-[218px] w-[397px]" data-name="Container">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[31.5px] relative shrink-0 text-[#0b95ba] text-[22.5px] w-full">Infraestructura tecnológica</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] relative shrink-0 text-[15px] text-black w-full">Espacios equipados con tecnología de vanguardia.</p>
    </div>
  );
}

export default function ImageVistaCear() {
  return (
    <div className="overflow-clip relative rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.15)] size-full" data-name="Image (Vista CEAR)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgImageVistaCear} />
      <div className="absolute bg-white h-[86px] left-0 rounded-bl-[20px] rounded-br-[20px] top-[204px] w-[438px]" />
      <Container />
    </div>
  );
}