function Frame2() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
          <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-['Inter:Semi_Bold',sans-serif] font-bold font-semibold leading-[0] lowercase not-italic relative shrink-0 text-[0px] text-[48px] text-center text-white tracking-[1.2px]">
            <span className="leading-[34.286px] uppercase">n</span>
            <span className="leading-[34.286px]">{`uestro `}</span>
            <span className="leading-[34.286px] uppercase">C</span>
            <span className="leading-[34.286px]">OMPROMISO</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
      <Frame2 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col h-[59px] items-start relative shrink-0 w-full" data-name="Container">
      <Frame3 />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center px-[9.29px] relative w-full">
          <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[81.199px] not-italic relative shrink-0 text-[63.155px] text-shadow-[0px_4px_4px_rgba(0,0,0,0.88)] text-white tracking-[-1.2631px]">CEAR FORMACIÓN CONTINUA</p>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[1688px]">
      <Frame />
    </div>
  );
}

export default function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-center relative size-full">
      <Container />
      <Frame1 />
    </div>
  );
}