

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-center pr-[11.891px] py-[11.891px] relative shrink-0">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[36.09px] not-italic relative shrink-0 text-[#1c98b7] text-[67.368px] text-center tracking-[1.2632px] uppercase">Plana docente</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[63.021px] not-italic relative shrink-0 text-[#111827] text-[57.076px] text-center">Especialistas en la materia</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[10.702px] items-start relative shrink-0 w-full">
      <Frame2 />
      <Frame1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#1cb8a4] content-stretch flex items-center justify-center p-[11.891px] relative rounded-[10.702px] shrink-0 w-[460.175px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[42.807px] not-italic relative shrink-0 text-[32.105px] text-center text-white">Jimmy Pisfil Chafloque</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[35.789px] items-start relative shrink-0 w-[712.261px]">
      <Frame3 />
      <Frame />
      <p className="font-['Inter:Regular',sans-serif] font-normal h-[265.263px] leading-[30.433px] not-italic relative shrink-0 text-[18.728px] text-[rgba(0,0,0,0.95)] w-[712.632px] whitespace-pre-wrap">Abogado y especialista con más de 18 años de trayectoria profesional. Ha ocupado cargos estratégicos en entidades destacadas y cuenta con amplia experiencia en arbitraje nacional e internacional, participando en más de 600 arbitrajes como presidente de tribunal arbitral, árbitro único e integrante de tribunales arbitrales. Actualmente es árbitro del Registro Nacional de Árbitros (RNA), consultor especializado y docente.</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex gap-[59px] items-end left-[238px] top-[80px]">
      <div className="h-[574.327px] relative rounded-[234.158px] shrink-0 w-[405.478px]" data-name="janeyri boyer 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[234.158px]">
          <img alt="" className="absolute h-[106%] left-[-0.03%] max-w-none top-[-6%] w-[100.06%]" src={imgJaneyriBoyer1} />
        </div>
      </div>
      <Frame4 />
    </div>
  );
}

export default function CourseSyllabus() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-col items-start pt-[63px] px-[105.5px] relative size-full" data-name="CourseSyllabus">
      <Frame5 />
    </div>
  );
}