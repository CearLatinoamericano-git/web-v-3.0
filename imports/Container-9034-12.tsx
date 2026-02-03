function Paragraph() {
  return (
    <div className="h-[35.789px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[34.1px] left-[680.79px] not-italic text-[#1c98b7] text-[63.653px] text-center top-[-1px] tracking-[1.1935px] uppercase">Malla curricular</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[44.756px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[52.713px] left-[680.77px] not-italic text-[#111827] text-[47.74px] text-center top-0">Contenido del programa académico</p>
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[13.427px] items-start relative size-full" data-name="Container">
      <Paragraph />
      <Heading />
    </div>
  );
}