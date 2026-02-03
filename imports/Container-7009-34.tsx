function PartnersSection() {
  return (
    <div className="h-[34.281px] relative shrink-0 w-[1368px]" data-name="PartnersSection">
      <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[684.53px] not-italic text-[#1c98b7] text-[64px] text-center top-[0.22px] tracking-[1.2px] translate-x-[-50%] uppercase">Lorem ipsum dolor sit amet</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex h-[51px] items-start left-[757.78px] top-[1.22px] w-[526.375px]" data-name="Text">
      <p className="bg-clip-text css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[52.5px] not-italic relative shrink-0 text-[42px] text-[rgba(0,0,0,0)] text-center" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(172.319deg, rgb(11, 149, 186) 0%, rgb(8, 122, 152) 100%)" }}>
        Lorem ipsum dolote
      </p>
    </div>
  );
}

function PartnersSection1() {
  return (
    <div className="h-[52px] relative shrink-0 w-[1230px]" data-name="PartnersSection">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[52.5px] left-[406px] not-italic text-[#111827] text-[42px] text-center top-[0.53px] translate-x-[-50%] w-[674px]">Lorem ipsum dolor sit amet conse</p>
      <Text />
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center pb-[51px] pt-[20px] px-0 relative size-full" data-name="Container">
      <PartnersSection />
      <PartnersSection1 />
    </div>
  );
}