import svgPaths from "./svg-9bvvjpnjq6";

function Paragraph() {
  return (
    <div className="h-[35.984px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[684.16px] not-italic text-[#ee8a28] text-[64px] text-center top-[-1px] tracking-[1.2px] translate-x-[-50%] uppercase">Malla curricular</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[45px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[53px] left-[684.28px] not-italic text-[#111827] text-[48px] text-center top-0 translate-x-[-50%]">Contenido del programa académico</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[13.5px] h-[94.484px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph />
      <Heading />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[27px] relative shrink-0 w-[89.703px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] left-0 not-italic text-[#111827] text-[18px] top-px w-[90px]">MÓDULO I</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[35.984px] relative shrink-0 w-[9.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[36px] left-0 not-italic text-[#111827] text-[27px] top-[-1px]">›</p>
      </div>
    </div>
  );
}

function CourseSyllabus1() {
  return (
    <div className="absolute content-stretch flex h-[35.984px] items-center justify-between left-[27px] top-[18px] w-[294px]" data-name="CourseSyllabus">
      <Text />
      <Text1 />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-white border-2 border-[#1c98b7] border-solid h-[75.984px] left-0 rounded-[15.25px] top-0 w-[352px]" data-name="Button">
      <CourseSyllabus1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[27px] relative shrink-0 w-[94.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] left-0 not-italic text-[#111827] text-[18px] top-px w-[95px]">MÓDULO II</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[35.984px] relative shrink-0 w-[9.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[36px] left-0 not-italic text-[#111827] text-[27px] top-[-1px]">›</p>
      </div>
    </div>
  );
}

function CourseSyllabus2() {
  return (
    <div className="absolute content-stretch flex h-[35.984px] items-center justify-between left-[27px] top-[18px] w-[294px]" data-name="CourseSyllabus">
      <Text2 />
      <Text3 />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-white border-2 border-[#1c98b7] border-solid h-[75.984px] left-0 rounded-[15.25px] top-[89.48px] w-[352px]" data-name="Button">
      <CourseSyllabus2 />
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[28.35px] relative shrink-0 w-[104.655px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] left-0 not-italic text-[18px] text-white top-[1.15px] w-[105px]">MÓDULO III</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[10.155px] relative w-[37.784px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[36px] min-h-px min-w-px not-italic relative text-[27px] text-white">›</p>
      </div>
    </div>
  );
}

function CourseSyllabus3() {
  return (
    <div className="absolute content-stretch flex h-[37.784px] items-center justify-between left-[28.35px] pr-[-13.814px] top-[18.9px] w-[312.9px]" data-name="CourseSyllabus">
      <Text4 />
      <div className="flex h-[37.784px] items-center justify-center relative shrink-0 w-[10.155px]" style={{ "--transform-inner-width": "5.0625", "--transform-inner-height": "42" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <Text5 />
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[#1c98b7] h-[75.583px] left-[-8.8px] rounded-[15.25px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] top-[177.17px] w-[369.6px]" data-name="Button">
      <CourseSyllabus3 />
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[27px] relative shrink-0 w-[102.813px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] left-0 not-italic text-[#111827] text-[18px] top-px w-[103px]">MÓDULO IV</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[35.984px] relative shrink-0 w-[9.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[36px] left-0 not-italic text-[#111827] text-[27px] top-[-1px]">›</p>
      </div>
    </div>
  );
}

function CourseSyllabus4() {
  return (
    <div className="absolute content-stretch flex h-[35.984px] items-center justify-between left-[27px] top-[18px] w-[294px]" data-name="CourseSyllabus">
      <Text6 />
      <Text7 />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-white border-2 border-[#1c98b7] border-solid h-[75.984px] left-0 rounded-[15.25px] top-[264.45px] w-[352px]" data-name="Button">
      <CourseSyllabus4 />
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[27px] relative shrink-0 w-[97.828px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] left-0 not-italic text-[#111827] text-[18px] top-px w-[98px]">MÓDULO V</p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[35.984px] relative shrink-0 w-[9.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[36px] left-0 not-italic text-[#111827] text-[27px] top-[-1px]">›</p>
      </div>
    </div>
  );
}

function CourseSyllabus5() {
  return (
    <div className="absolute content-stretch flex h-[35.984px] items-center justify-between left-[27px] top-[18px] w-[294px]" data-name="CourseSyllabus">
      <Text8 />
      <Text9 />
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-white border-2 border-[#1c98b7] border-solid h-[75.984px] left-0 rounded-[15.25px] top-[353.94px] w-[352px]" data-name="Button">
      <CourseSyllabus5 />
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[27px] relative shrink-0 w-[102.813px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] left-0 not-italic text-[#111827] text-[18px] top-px w-[103px]">MÓDULO VI</p>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[35.984px] relative shrink-0 w-[9.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[36px] left-0 not-italic text-[#111827] text-[27px] top-[-1px]">›</p>
      </div>
    </div>
  );
}

function CourseSyllabus6() {
  return (
    <div className="absolute content-stretch flex h-[35.984px] items-center justify-between left-[27px] top-[18px] w-[294px]" data-name="CourseSyllabus">
      <Text10 />
      <Text11 />
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute bg-white border-2 border-[#1c98b7] border-solid h-[75.984px] left-0 rounded-[15.25px] top-[443.42px] w-[352px]" data-name="Button">
      <CourseSyllabus6 />
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[27px] relative shrink-0 w-[107.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] left-0 not-italic text-[#111827] text-[18px] top-px w-[108px]">MÓDULO VII</p>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[35.984px] relative shrink-0 w-[9.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[36px] left-0 not-italic text-[#111827] text-[27px] top-[-1px]">›</p>
      </div>
    </div>
  );
}

function CourseSyllabus7() {
  return (
    <div className="absolute content-stretch flex h-[35.984px] items-center justify-between left-[27px] top-[18px] w-[294px]" data-name="CourseSyllabus">
      <Text12 />
      <Text13 />
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute bg-white border-2 border-[#1c98b7] border-solid h-[75.984px] left-0 rounded-[15.25px] top-[532.91px] w-[352px]" data-name="Button">
      <CourseSyllabus7 />
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[27px] relative shrink-0 w-[112.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] left-0 not-italic text-[#111827] text-[18px] top-px w-[113px]">MÓDULO VIII</p>
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[35.984px] relative shrink-0 w-[9.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[36px] left-0 not-italic text-[#111827] text-[27px] top-[-1px]">›</p>
      </div>
    </div>
  );
}

function CourseSyllabus8() {
  return (
    <div className="absolute content-stretch flex h-[35.984px] items-center justify-between left-[27px] top-[18px] w-[294px]" data-name="CourseSyllabus">
      <Text14 />
      <Text15 />
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute bg-white border-2 border-[#1c98b7] border-solid h-[75.984px] left-0 rounded-[15.25px] top-[622.39px] w-[352px]" data-name="Button">
      <CourseSyllabus8 />
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[27px] relative shrink-0 w-[102.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] left-0 not-italic text-[#111827] text-[18px] top-px w-[103px]">MÓDULO IX</p>
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[35.984px] relative shrink-0 w-[9.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[36px] left-0 not-italic text-[#111827] text-[27px] top-[-1px]">›</p>
      </div>
    </div>
  );
}

function CourseSyllabus9() {
  return (
    <div className="absolute content-stretch flex h-[35.984px] items-center justify-between left-[27px] top-[18px] w-[294px]" data-name="CourseSyllabus">
      <Text16 />
      <Text17 />
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute bg-white border-2 border-[#1c98b7] border-solid h-[75.984px] left-0 rounded-[15.25px] top-[711.88px] w-[352px]" data-name="Button">
      <CourseSyllabus9 />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[787.859px] relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
      <Button7 />
      <Button8 />
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-white h-[500px] relative rounded-[18px] shrink-0 w-[420px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pb-[2px] pl-[29px] pr-[39px] pt-[29px] relative rounded-[inherit] size-full">
        <Container4 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#ee8a28] border-solid inset-0 pointer-events-none rounded-[18px]" />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[40.5px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[40.5px] left-0 not-italic text-[#111827] text-[33.75px] top-[-1px]">Procedimiento Administrativo General</p>
    </div>
  );
}

function CourseSyllabus10() {
  return (
    <div className="content-stretch flex flex-col h-[69.5px] items-start pb-[2px] relative shrink-0 w-full" data-name="CourseSyllabus">
      <div aria-hidden="true" className="absolute border-[#1c98b7] border-b-2 border-solid inset-0 pointer-events-none" />
      <Heading1 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[31.5px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[31.5px] left-0 not-italic text-[#111827] text-[20.25px] top-0">Contenido:</p>
    </div>
  );
}

function Text18() {
  return (
    <div className="absolute h-[29.25px] left-0 top-[0.09px] w-[371.484px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[29.25px] left-0 not-italic text-[18px] text-white top-px">Procedimientos especiales en contratación pública</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[29px] relative shrink-0 w-[638px]" data-name="Container">
      <Text18 />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[13px] items-center relative">
        <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[29.25px] not-italic relative shrink-0 text-[18px] text-white">10.</p>
        <Container9 />
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="flex-[1_0_0] h-[17.984px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[13.5px] text-[rgba(255,255,255,0.8)] text-center">Ver más</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[22.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]" style={{ "--stroke-0": "rgba(28, 152, 183, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.125 7.5">
            <path d={svgPaths.p1e013880} id="Vector" stroke="var(--stroke-0, #1C98B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-white relative rounded-[33554400px] shrink-0 size-[31.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4.5px] px-[4.5px] relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[31.5px] relative shrink-0 w-[92.031px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[9px] items-center relative size-full">
        <Text19 />
        <Container11 />
      </div>
    </div>
  );
}

function CourseSyllabus12() {
  return (
    <div className="bg-[#1c98b7] h-[67.5px] relative shrink-0 w-full" data-name="CourseSyllabus">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[18px] relative size-full">
          <Frame />
          <Container10 />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[69.5px] relative rounded-[11.25px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <CourseSyllabus12 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#1c98b7] border-solid inset-0 pointer-events-none rounded-[11.25px]" />
    </div>
  );
}

function Text20() {
  return (
    <div className="absolute h-[29.25px] left-0 top-[0.09px] w-[371.484px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[29.25px] left-0 not-italic text-[18px] text-white top-px">Análisis arbitral de actos administrativos especiales</p>
    </div>
  );
}

function Text21() {
  return <div className="absolute h-[29.25px] left-0 top-[0.09px] w-[371.484px]" data-name="Text" />;
}

function Container13() {
  return (
    <div className="h-[29px] relative shrink-0 w-[638px]" data-name="Container">
      <Text20 />
      <Text21 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[13px] items-center relative">
        <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[29.25px] not-italic relative shrink-0 text-[18px] text-white">11.</p>
        <Container13 />
      </div>
    </div>
  );
}

function Text22() {
  return (
    <div className="flex-[1_0_0] h-[17.984px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[13.5px] text-[rgba(255,255,255,0.8)] text-center">Ver más</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[22.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]" style={{ "--stroke-0": "rgba(28, 152, 183, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.125 7.5">
            <path d={svgPaths.p1e013880} id="Vector" stroke="var(--stroke-0, #1C98B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-white relative rounded-[33554400px] shrink-0 size-[31.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4.5px] px-[4.5px] relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[31.5px] relative shrink-0 w-[92.031px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[9px] items-center relative size-full">
        <Text22 />
        <Container15 />
      </div>
    </div>
  );
}

function CourseSyllabus13() {
  return (
    <div className="bg-[#1c98b7] h-[67.5px] relative shrink-0 w-full" data-name="CourseSyllabus">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[18px] relative size-full">
          <Frame1 />
          <Container14 />
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[69.5px] relative rounded-[11.25px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <CourseSyllabus13 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#1c98b7] border-solid inset-0 pointer-events-none rounded-[11.25px]" />
    </div>
  );
}

function Text23() {
  return (
    <div className="absolute h-[29.25px] left-0 top-[0.09px] w-[371.484px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[29.25px] left-0 not-italic text-[18px] text-white top-px">Casos prácticos sobre actividades reguladas</p>
    </div>
  );
}

function Text24() {
  return <div className="absolute h-[29.25px] left-0 top-[0.09px] w-[371.484px]" data-name="Text" />;
}

function Container17() {
  return (
    <div className="h-[29px] relative shrink-0 w-[638px]" data-name="Container">
      <Text23 />
      <Text24 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[13px] items-center relative">
        <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[29.25px] not-italic relative shrink-0 text-[18px] text-white">12.</p>
        <Container17 />
      </div>
    </div>
  );
}

function Text25() {
  return (
    <div className="flex-[1_0_0] h-[17.984px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[13.5px] text-[rgba(255,255,255,0.8)] text-center">Ver más</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[22.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]" style={{ "--stroke-0": "rgba(28, 152, 183, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.125 7.5">
            <path d={svgPaths.p1e013880} id="Vector" stroke="var(--stroke-0, #1C98B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-white relative rounded-[33554400px] shrink-0 size-[31.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4.5px] px-[4.5px] relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[31.5px] relative shrink-0 w-[92.031px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[9px] items-center relative size-full">
        <Text25 />
        <Container19 />
      </div>
    </div>
  );
}

function CourseSyllabus14() {
  return (
    <div className="bg-[#1c98b7] h-[67.5px] relative shrink-0 w-full" data-name="CourseSyllabus">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[18px] relative size-full">
          <Frame2 />
          <Container18 />
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[69.5px] relative rounded-[11.25px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <CourseSyllabus14 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#1c98b7] border-solid inset-0 pointer-events-none rounded-[11.25px]" />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[13.5px] h-[318.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container12 />
      <Container16 />
    </div>
  );
}

function CourseSyllabus11() {
  return (
    <div className="content-stretch flex flex-col gap-[18px] h-[368px] items-start relative shrink-0 w-full" data-name="CourseSyllabus">
      <Heading2 />
      <Container7 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[36px] h-[473.5px] items-start relative shrink-0 w-full" data-name="Container">
      <CourseSyllabus10 />
      <CourseSyllabus11 />
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-white flex-[1_0_0] h-[500px] min-h-px min-w-px relative rounded-[18px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[2px] pl-[47px] pr-[57px] pt-[47px] relative size-full">
          <Container6 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#ee8a28] border-solid inset-0 pointer-events-none rounded-[18px]" />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[36px] h-[500px] items-start relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Container5 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[54px] h-[648.484px] items-start relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container2 />
    </div>
  );
}

export default function CourseSyllabus() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-col items-start pt-[63px] px-[146px] relative size-full" data-name="CourseSyllabus">
      <Container />
    </div>
  );
}