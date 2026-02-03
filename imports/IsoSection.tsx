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

export default function IsoSection() {
  return (
    <div className="content-stretch flex gap-[3.65px] items-center justify-center pt-[9.218px] relative size-full" data-name="ISOSection">
      <Paragraph />
      <Paragraph1 />
    </div>
  );
}