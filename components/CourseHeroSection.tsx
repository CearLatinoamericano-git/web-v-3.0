import svgPaths from '../imports/svg-x4qmp13nyv';


interface CourseHeroSectionProps {
  title: string;
  description: string;
  image: string;
  type: 'diplomado' | 'curso';
  stats: {
    certification: string;
    modality: string;
    duration: string;
    frequency: string;
    schedule: string;
    hours: string;
  };
  onEnroll: () => void;
  onBrochure?: () => void;
}

export function CourseHeroSection({
  title,
  description,
  type,
  stats,
  onEnroll,
  onBrochure
}: CourseHeroSectionProps) {
  return (
    <section
      className="relative min-h-[880px] sm:min-h-[920px] md:min-h-[960px] lg:min-h-[900px] overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] m-[0px] rounded-bl-[50px] rounded-br-[50px]"
      style={{ backgroundImage: "linear-gradient(5.70811deg, rgb(28, 152, 183) 5.3068%, rgb(86, 18, 137) 90.834%)" }}
    >
      {/* Background Image with Low Opacity */}
      <div className="absolute inset-0 mix-blend-multiply opacity-14 overflow-hidden pointer-events-none rounded-bl-[50px] rounded-br-[50px]">
        <img
          alt=""
          className="absolute h-[139.1%] left-0 max-w-none top-[-21.73%] w-full object-cover"
          src={''}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1368px] mx-auto px-6 sm:px-8 md:px-12 lg:px-[108px] pt-16 sm:pt-20 md:pt-24 lg:pt-[90px] pb-12 sm:pb-16 md:pb-20 lg:pb-0">
        {/* Type Badge - DIPLOMADO/CURSO */}
        <div className="pt-12 md:pt-16 lg:pt-20 mb-4 md:mb-5 lg:mb-6">
          <div className="inline-flex h-[33px] items-center px-[14.5px] py-[7.75px] rounded-[11.25px] bg-[rgba(59,181,217,0.1)] border-2 border-[rgba(16,231,176,0.3)] border-solid text-[rgb(255,255,255)]">
            <p className="font-normal leading-[18px] text-[13.5px] text-[rgb(255,255,255)] tracking-[0.675px] uppercase">
              {type === 'diplomado' ? 'Diplomado' : 'Curso'}
            </p>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6 md:mb-8 lg:mb-10">
          <h1 className="font-normal leading-[1.3] md:leading-tight lg:leading-tight text-[32px] sm:text-[40px] md:text-[56px] lg:text-[67.5px] text-white mb-4 md:mb-5 lg:mb-6 wrap-break-word">
            {title}
          </h1>

          {/* Description */}
          <p className="font-normal leading-[1.6] md:leading-[1.55] lg:leading-[1.6] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20.25px] text-white">
            {description}
          </p>
        </div>

        {/* Stats Container - White Semi-transparent Box */}
        <div className="bg-[rgba(255,255,255,0.95)] rounded-[18px] border border-[rgba(255,255,255,0.2)] border-solid shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] px-4 sm:px-6 md:px-8 lg:px-[37px] py-5 sm:py-6 md:py-7 lg:py-[28px] mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 lg:gap-0">

            {/* Certification */}
            <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-3.5 lg:gap-[13.5px] lg:border-r-2 lg:border-[#f3f4f6] lg:pr-4">
              <div className="bg-gradient-to-b from-[#0b95ba] to-[#087a98] rounded-[15.25px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] size-[48px] sm:size-[56px] md:size-[60px] lg:size-[63px] flex items-center justify-center">
                <div className="size-[24px] sm:size-[28px] md:size-[30px] lg:size-[31.5px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.5 31.5">
                    <g>
                      <path d={svgPaths.p14175300} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                      <path d={svgPaths.pdceed00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="flex flex-col items-center gap-0 md:gap-0">
                <p className="font-normal leading-[16px] sm:leading-[18px] text-[11px] sm:text-[13.5px] text-center text-[#6a7282] tracking-[0.675px] uppercase">
                  Certificación
                </p>
                <p className="font-normal leading-[17px] sm:leading-[19.688px] text-[13px] sm:text-[15.75px] text-center text-[#111827]">
                  {stats.certification}
                </p>
              </div>
            </div>

            {/* Modality */}
            <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-3.5 lg:gap-[13.5px] lg:border-r-2 lg:border-[#f3f4f6] lg:pr-4">
              <div className="bg-gradient-to-b from-[#0b95ba] to-[#087a98] rounded-[15.25px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] size-[48px] sm:size-[56px] md:size-[60px] lg:size-[63px] flex items-center justify-center">
                <div className="size-[24px] sm:size-[28px] md:size-[30px] lg:size-[31.5px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.5 31.5">
                    <g>
                      <path d={svgPaths.p1263b2f0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                      <path d="M10.5 27.5625H21" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                      <path d="M15.75 22.3125V27.5625" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-normal leading-[16px] sm:leading-[18px] text-[11px] sm:text-[13.5px] text-center text-[#6a7282] tracking-[0.675px] uppercase">
                  Modalidad
                </p>
                <p className="capitalize font-normal leading-[17px] sm:leading-[19.688px] text-[13px] sm:text-[15.75px] text-center text-[#111827]">
                  {stats.modality}
                </p>
              </div>
            </div>

            {/* Duration */}
            <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-3.5 lg:gap-[13.5px] lg:border-r-2 lg:border-[#f3f4f6] lg:pr-4">
              <div className="bg-gradient-to-b from-[#0b95ba] to-[#087a98] rounded-[15.25px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] size-[48px] sm:size-[56px] md:size-[60px] lg:size-[63px] flex items-center justify-center">
                <div className="size-[24px] sm:size-[28px] md:size-[30px] lg:size-[31.5px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.5 31.5">
                    <g>
                      <path d="M15.75 9.1875V27.5625" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                      <path d={svgPaths.p2c4a5900} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-normal leading-[16px] sm:leading-[18px] text-[11px] sm:text-[13.5px] text-center text-[#6a7282] tracking-[0.675px] uppercase">
                  Duración
                </p>
                <p className="font-normal leading-[15px] sm:leading-[16.875px] text-[11px] sm:text-[13.5px] text-center text-[#111827] px-1">
                  {stats.duration}
                </p>
              </div>
            </div>

            {/* Frequency */}
            <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-3.5 lg:gap-[13.5px] lg:border-r-2 lg:border-[#f3f4f6] lg:pr-4">
              <div className="bg-gradient-to-b from-[#0b95ba] to-[#087a98] rounded-[15.25px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] size-[48px] sm:size-[56px] md:size-[60px] lg:size-[63px] flex items-center justify-center">
                <div className="size-[24px] sm:size-[28px] md:size-[30px] lg:size-[31.5px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.5 31.5">
                    <g>
                      <path d="M10.5 2.625V7.875" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                      <path d="M21 2.625V7.875" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                      <path d={svgPaths.p2a7f12c0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                      <path d="M3.9375 13.125H27.5625" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                      <path d="M10.5 18.375H10.5131" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                      <path d="M15.75 18.375H15.7631" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                      <path d="M21 18.375H21.0131" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                      <path d="M10.5 23.625H10.5131" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                      <path d="M15.75 23.625H15.7631" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                      <path d="M21 23.625H21.0131" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-normal leading-[16px] sm:leading-[18px] text-[11px] sm:text-[13.5px] text-center text-[#6a7282] tracking-[0.675px] uppercase">
                  Frecuencia
                </p>
                <p className="font-normal leading-[15px] sm:leading-[16.875px] text-[11px] sm:text-[13.5px] text-center text-[#111827] px-1">
                  {stats.frequency}
                </p>
              </div>
            </div>

            {/* Schedule */}
            <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-3.5 lg:gap-[13.5px] lg:border-r-2 lg:border-[#f3f4f6] lg:pr-4">
              <div className="bg-gradient-to-b from-[#0b95ba] to-[#087a98] rounded-[15.25px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] size-[48px] sm:size-[56px] md:size-[60px] lg:size-[63px] flex items-center justify-center">
                <div className="size-[24px] sm:size-[28px] md:size-[30px] lg:size-[31.5px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.5 31.5">
                    <g>
                      <path d="M10.5 2.625V7.875" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                      <path d="M21 2.625V7.875" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                      <path d={svgPaths.p2a7f12c0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                      <path d="M3.9375 13.125H27.5625" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-normal leading-[16px] sm:leading-[18px] text-[11px] sm:text-[13.5px] text-center text-[#6a7282] tracking-[0.675px] uppercase">
                  Horario
                </p>
                <p className="font-normal leading-[15px] sm:leading-[16.875px] text-[11px] sm:text-[13.5px] text-center text-[#111827] px-1">
                  {stats.schedule}
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-3.5 lg:gap-[13.5px]">
              <div className="bg-gradient-to-b from-[#0b95ba] to-[#087a98] rounded-[15.25px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] size-[48px] sm:size-[56px] md:size-[60px] lg:size-[63px] flex items-center justify-center">
                <div className="size-[24px] sm:size-[28px] md:size-[30px] lg:size-[31.5px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.5 31.5">
                    <g>
                      <path d="M15.75 7.875V15.75L21 18.375" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                      <path d={svgPaths.p5a064f0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-normal leading-[16px] sm:leading-[18px] text-[11px] sm:text-[13.5px] text-center text-[#6a7282] tracking-[0.675px] uppercase">
                  Horas
                </p>
                <p className="font-normal leading-[17px] sm:leading-[19.688px] text-[13px] sm:text-[15.75px] text-center text-[#111827]">
                  {stats.hours}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-5 lg:gap-6 md:mb-16 lg:mb-20 mt-[0px] mr-[0px] mb-[21px] ml-[0px]">
          {/* Enroll Button - Turquoise Gradient */}
          <button
            onClick={onEnroll}
            className="bg-[#F08300] flex items-center justify-center h-[54px] md:h-[56px] lg:h-[58px] px-7 md:px-8 lg:px-9 rounded-[12px] md:rounded-[14px] lg:rounded-[15.25px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] hover:bg-[#d67400] transition-all w-full sm:w-auto text-[rgb(255,255,255)]"
          >
            <span className="font-medium leading-[22px] md:leading-[24px] lg:leading-[27px] text-[14px] md:text-[16px] lg:text-[18px] text-center text-white">
              Inscríbete ahora
            </span>
          </button>

          {/* Brochure Button - Transparent with white border */}
          {onBrochure && (
            <button
              onClick={onBrochure}
              className="bg-[rgba(255,255,255,0.1)] border-2 border-[rgba(255,255,255,0.3)] border-solid flex items-center justify-center gap-2 md:gap-2.5 lg:gap-3 h-[54px] md:h-[56px] lg:h-[58px] px-7 md:px-8 lg:px-9 rounded-[12px] md:rounded-[14px] lg:rounded-[15.25px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] hover:bg-[rgba(255,255,255,0.15)] transition-all w-full sm:w-auto"
            >
              <div className="size-[18px] md:size-[20px] lg:size-[22.5px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                  <g>
                    <path d="M11.25 14.0625V2.8125" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
                    <path d={svgPaths.p31db5900} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
                    <path d={svgPaths.p11947300} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
                  </g>
                </svg>
              </div>
              <span className="font-medium leading-[22px] md:leading-[24px] lg:leading-[27px] text-[14px] md:text-[16px] lg:text-[18px] text-center text-white">
                Descargar brochure
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}