function Paragraph() {
  return (
    <div className="h-[31.468px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[31.472px] left-[628.98px] not-italic text-[#1c98b7] text-[58.747px] text-center top-[-0.92px] tracking-[1.1015px] uppercase">Nuestros logros</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex h-[54.158px] items-start left-[736.13px] top-0 w-[503.139px]" data-name="Text">
      <p className="bg-clip-text font-['Inter:Regular',sans-serif] font-normal leading-[55.076px] not-italic relative shrink-0 text-[44.061px] text-[rgba(0,0,0,0)] text-center" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(173.66deg, rgb(11, 149, 186) 0%, rgb(8, 122, 152) 100%)", WebkitTextFillColor: "transparent" }}>
        formación especializada
      </p>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[55.076px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[55.076px] left-[376.74px] not-italic text-[#111827] text-[44.061px] text-center top-[-0.92px] w-[720.573px] whitespace-pre-wrap">Resultados que respaldan nuestra</p>
      <Text />
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[16.523px] items-start relative size-full" data-name="Container">
      <Paragraph />
      <Heading />
    </div>
  );
}