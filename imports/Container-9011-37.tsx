function Paragraph() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[629.69px] not-italic text-[#1c98b7] text-[44px] text-center top-0 tracking-[1.2px] uppercase">INSTITUCIONES CAPACITADAS</p>
    </div>
  );
}

function PartnersSection() {
  return (
    <div className="absolute content-stretch flex h-[49px] items-start left-[640.45px] top-0 w-[505.906px]" data-name="PartnersSection">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[45px] not-italic relative shrink-0 text-[#1c98b7] text-[40.5px] text-center">CEAR LATINOAMERICANO</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[45px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[45px] left-[397.5px] not-italic text-[#111827] text-[40.5px] text-center top-0 w-[573px] whitespace-pre-wrap">Formación brindada por</p>
      <PartnersSection />
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[33px] items-start relative size-full" data-name="Container">
      <Paragraph />
      <Heading />
    </div>
  );
}