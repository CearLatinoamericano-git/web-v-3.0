import svgPathsBeneficios from '../../imports/svg-d94wy60n8k';
import svgPathsAbout from '../../imports/svg-e9ulumzys8';
import svgPathsAboutIcons from '../../imports/svg-cyx5481t1p';
import svgPathsVision from '../../imports/svg-4j74ddf892';
import svgPathsInfra from '../../imports/svg-s4m8i8kato';

const estudiantes_nosotros = '/images/about/estudiantes_nosotros.png';
const estudiante_hero = '/images/about/estudiante_hero.png';
const sede_lima = '/images/about/sede_lima.webp';
const equipo_vanguardia = '/images/about/equipo_vanguardia.webp';
const aula_especializada = '/images/about/aula_especializada.webp';
const profesional_capacitado = '/images/about/profesional_capacitado.webp';

import { ArrowRight, Download, Shield, Award } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section - CEAR FORMACIÓN CONTINUA */}
      <section className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[750px] overflow-hidden rounded-b-[50px]" style={{ backgroundImage: "linear-gradient(5.11126deg, rgb(28, 152, 183) 5.3068%, rgb(86, 18, 137) 90.834%)" }}>
        {/* Background Image Overlay - estudiante_hero */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <img
            src={estudiante_hero}
            alt="Estudiante hero background"
            className="absolute h-full w-full object-cover"
          />
        </div>

        {/* Decorative Wave SVGs at bottom */}
        <div className="absolute left-0 bottom-0 w-full h-[100px] sm:h-[144px]">
          <svg className="absolute inset-[30.83%_0_0_0] w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1662 99.6">
            <path d={svgPathsAbout.p13d44600} fill="white" fillOpacity="0.1" />
          </svg>
          <svg className="absolute inset-[47.92%_0_0_0] w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1662 75">
            <path d={svgPathsAbout.p330bc00} fill="white" fillOpacity="0.03" />
          </svg>
        </div>

        {/* Content Container - Text and Buttons */}
        <div className='flex items-center justify-center w-[80%] mx-auto mt-20'>
          <div className="flex-1">
            {/* Text Content */}
            <div className="flex flex-col items-start w-full lg:w-[550px] xl:w-[700px]">
              {/* Title Section */}
              <div className="flex flex-col items-start w-full mb-2">

                <div className="flex flex-col gap-1 w-full items-start">
                  <div className="px-[9.29px]">
                    <p className="font-bold text-[42px] sm:text-[60px] lg:text-[65px] xl:text-[90px] text-white leading-[44px] sm:leading-[62px] lg:leading-[67px] xl:leading-[90px] tracking-[-0.9364px] drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
                      CEAR
                    </p>
                  </div>
                  <div className="px-[9.37px]">
                    <p className="font-bold text-[28px] sm:text-[42px] lg:text-[45px] xl:text-[63.155px] text-white leading-[32px] sm:leading-[46px] lg:leading-[49px] xl:leading-[70px] tracking-[-1.2631px] drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
                      FORMACIÓN CONTINUA
                    </p>
                  </div>
                </div>
              </div>

              {/* Subtitle */}
              <div className="px-[10.061px] mb-6">
                <p className="font-semibold text-[18px] sm:text-[22px] lg:text-[22px] xl:text-[31.22px] text-[rgba(255,255,255,0.85)] leading-[24px] sm:leading-[28px] lg:leading-[28px] xl:leading-[40px] tracking-[-0.4204px]">
                  Formación académica especializada
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center w-full px-[10.061px]">
                {/* Explorar programas - Orange button */}
                <button
                  className="bg-[#F08300] h-[56px] sm:h-[66px] w-full sm:w-[240px] lg:w-[260px] rounded-[16.722px] flex items-center justify-center gap-[12.541px] hover:bg-[#d67821] transition-all"
                >
                  <span className="font-semibold text-[16px] sm:text-[18.812px] text-white leading-[29.263px]">
                    Explorar programas
                  </span>
                  <ArrowRight className="w-[18px] sm:w-[20.902px] h-[18px] sm:h-[20.902px] text-white" strokeWidth={1.74184} />
                </button>

                {/* Descargar brochure - Transparent button */}
                <button className="h-[56px] sm:h-[66px] w-full sm:w-[240px] lg:w-[260px] rounded-[16.722px] border-[1.858px] border-white flex items-center justify-center gap-[12.541px] hover:bg-white/10 transition-all">
                  <Download className="w-[18px] sm:w-[20.902px] h-[18px] sm:h-[20.902px] text-white" strokeWidth={1.74184} />
                  <span className="font-semibold text-[16px] sm:text-[18.812px] text-white leading-[29.263px]">
                    Descargar brochure
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Students Image - Right side, visible on larger screens */}
          <div className="flex-1">
            <div className="relative h-full w-full flex items-end justify-end pr-4 lg:pr-6 xl:pr-8">
              <img
                src={estudiantes_nosotros}
                alt="Estudiantes CEAR"
                className="h-[70%] md:h-[70%] lg:h-[75%] xl:h-[80%] w-auto object-contain object-bottom"
                style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))' }}
              />
            </div>
          </div>
        </div>

      </section>

      {/* Sección Quiénes Somos - Diseño Asimétrico Moderno */}
      <section className="py-16 sm:py-20 lg:py-28 bg-[#fafbfc] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Columna Izquierda - Contenido */}
            <div>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-5">
                <div className="w-2 h-2 bg-[#1c98b7] rounded-full"></div>
                <span className="text-[#1c98b7] font-semibold text-[13px] uppercase tracking-wider">Quienes somos</span>
              </div>

              <h2 className="font-bold text-[40px] sm:text-[52px] lg:text-[60px] text-[#1c98b7] leading-[1.1] mb-5 tracking-tight">
                Sobre<br />Nosotros
              </h2>

              <p className="text-[17px] text-gray-600 leading-[1.7] mb-6 text-justify">
                CEAR Formación Continua es el área académica de CEAR LATINOAMERICANO, orientada a la capacitación especializada de profesionales vinculados al arbitraje, la contratación pública y la resolución de controversias. A través de programas, diplomados y talleres de actualización, promueve una formación rigurosa, práctica y alineada con los estándares nacionales e internacionales, respaldada por una plana docente con sólida experiencia académica y profesional.
              </p>

              {/* Lista de características */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-[27px] h-[27px] bg-[rgba(28,184,164,0.1)] rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                      <g clipPath="url(#clip0_check1)">
                        <path d={svgPathsAboutIcons.p3dc49580} stroke="#1CB8A4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
                        <path d="M6.75 9L8.25 10.5L11.25 7.5" stroke="#1CB8A4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
                      </g>
                      <defs>
                        <clipPath id="clip0_check1">
                          <rect fill="white" height="18" width="18" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[16px] text-gray-900 mb-1">Excelencia académica certificada</p>
                    <p className="text-[14px] text-gray-600 leading-[1.625]">Programas respaldados por certificaciones internacionales ISO</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-[27px] h-[27px] bg-[rgba(28,184,164,0.1)] rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                      <g clipPath="url(#clip0_check2)">
                        <path d={svgPathsAboutIcons.p3dc49580} stroke="#1CB8A4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
                        <path d="M6.75 9L8.25 10.5L11.25 7.5" stroke="#1CB8A4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
                      </g>
                      <defs>
                        <clipPath id="clip0_check2">
                          <rect fill="white" height="18" width="18" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[16px] text-gray-900 mb-1">Metodología innovadora</p>
                    <p className="text-[14px] text-gray-600 leading-[1.625]">Plataforma virtual moderna con recursos interactivos</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-[27px] h-[27px] bg-[rgba(28,184,164,0.1)] rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                      <g clipPath="url(#clip0_check3)">
                        <path d={svgPathsAboutIcons.p3dc49580} stroke="#1CB8A4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
                        <path d="M6.75 9L8.25 10.5L11.25 7.5" stroke="#1CB8A4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
                      </g>
                      <defs>
                        <clipPath id="clip0_check3">
                          <rect fill="white" height="18" width="18" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[16px] text-gray-900 mb-1">Reconocimiento internacional</p>
                    <p className="text-[14px] text-gray-600 leading-[1.625]">Convenios universitarios y alianzas estratégicas</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha - Imagen con diseño moderno */}
            <div className="relative">
              <div className="relative">
                {/* Imagen principal */}
                <div className="relative w-full h-[480px] sm:h-[560px] rounded-[32px] overflow-hidden shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)]" style={{ backgroundColor: '#0B95BA' }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src="https://cearlatinoamericano.pe/images/logo-white.webp"
                      alt="Equipo CEAR"
                      className="max-w-[80%] max-h-[80%] object-contain"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-full bg-gradient-to-t from-[rgba(0,0,0,0.2)] h-[560px] left-[-0.5px] to-[rgba(0,0,0,0)]"></div>
                </div>

                {/* Badge flotante moderno */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-[24px] p-6 shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] max-w-[280px]">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-[63px] h-[63px] bg-gradient-to-b from-[#1c98b7] to-[#1cb8a4] rounded-[18px] flex items-center justify-center">
                      <svg className="w-[31.5px] h-[31.5px]" fill="none" viewBox="0 0 31.5 31.5">
                        <g>
                          <path d={svgPathsAboutIcons.p1dedb9c} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                          <path d={svgPathsAboutIcons.pdceed00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                        </g>
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-[15px] text-gray-900 mb-0.5">Certificación ISO</p>
                      <p className="text-[13px] text-gray-600">Calidad internacional</p>
                    </div>
                  </div>
                </div>

                {/* Elemento decorativo */}
                <div className="absolute -top-4 -right-4 w-36 h-36 bg-[rgba(8,122,152,0.12)] rounded-full blur-[64px]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Visión y Misión - Diseño Limpio */}
      <section className="bg-white relative overflow-hidden pb-10 pt-10">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-14">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#fafbfc] rounded-full border border-[#e2e2e2] mb-5">
              <div className="w-[9px] h-[9px] bg-[#1c98b7] rounded-full"></div>
              <span className="text-[#1c98b7] font-semibold text-[13px] uppercase tracking-[0.65px]">Nuestro propósito</span>
            </div>
            <h2 className="font-bold text-[40px] sm:text-[52px] lg:text-[60px] text-[#1c98b7] leading-[1.1] mb-4 tracking-tight">
              Comprometidos con la excelencia
            </h2>
            <p className="text-[17px] text-[#4b5563] leading-[1.7] max-w-2xl mx-auto">
              Transformamos profesionales a través de formación continua de alta calidad
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Visión */}
            <div className="bg-[#f5f6f7] rounded-[28px] p-10 lg:p-12 border border-[#e5e7eb]">
              <div className="inline-flex items-center justify-center w-[72px] h-[72px] bg-gradient-to-b from-[#1c98b7] to-[#1cb8a4] rounded-[20px] mb-6">
                <svg className="w-9 h-9" fill="none" viewBox="0 0 36 36">
                  <g>
                    <path d={svgPathsVision.p25667780} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    <path d={svgPathsVision.p1747f000} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    <path d={svgPathsVision.p3ee2f100} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  </g>
                </svg>
              </div>
              <h3 className="font-bold text-[24px] text-[#111827] leading-[1.5] mb-4">Nuestra visión</h3>
              <p className="text-[16px] text-[#4b5563] leading-[1.7]">
                Consolidarnos como institución líder a nivel nacional e internacional en formación continua especializada en mecanismos de solución de controversias
              </p>
            </div>

            {/* Misión */}
            <div className="bg-[#f5f6f7] rounded-[28px] p-10 lg:p-12 border border-[#e5e7eb]">
              <div className="inline-flex items-center justify-center w-[72px] h-[72px] bg-gradient-to-b from-[#1c98b7] to-[#1cb8a4] rounded-[20px] mb-6">
                <svg className="w-9 h-9" fill="none" viewBox="0 0 36 36">
                  <g>
                    <path d={svgPathsVision.pcddb400} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    <path d={svgPathsVision.pf1ed7e0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    <path d={svgPathsVision.p2aed0e00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    <path d={svgPathsVision.p2d4d6480} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  </g>
                </svg>
              </div>
              <h3 className="font-bold text-[24px] text-[#111827] leading-[1.5] mb-4">Nuestra misión</h3>
              <p className="text-[16px] text-[#4b5563] leading-[1.7]">
                Brindar programas de actualización profesional de calidad que fortalezcan competencias técnicas y prácticas en resolución de controversias
              </p>
            </div>
          </div>

          {/* CTA */}

        </div>
      </section>

      {/* Sección Instalaciones - Grid Moderno */}
      <section className="bg-[#fafbfc] relative overflow-hidden pt-10 pb-10">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-14">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white rounded-full border border-[#f3f4f6] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.15)] mb-5">
              <div className="w-[9px] h-[9px] bg-[#1c98b7] rounded-full"></div>
              <span className="text-[#1c98b7] font-semibold text-[13px] uppercase tracking-[0.65px]">Instalaciones</span>
            </div>
            <h2 className="font-bold text-[40px] sm:text-[52px] lg:text-[60px] text-[#1c98b7] leading-[1.1] mb-4 tracking-tight">
              Infraestructura de primer nivel
            </h2>
            <p className="text-[17px] text-[#4b5563] leading-[1.7]">
              Espacios equipados con tecnología de vanguardia
            </p>
          </div>

          {/* Grid asimétrico */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1 - Grande */}
            <div className="md:col-span-2 lg:col-span-2 relative bg-white rounded-[28px] overflow-hidden shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)]">
              <div className="relative h-[420px]">
                <img
                  src={sede_lima}
                  alt="Infraestructura institucional"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] via-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0)]"></div>

                {/* Contenido sobre la imagen */}
                <div className="absolute bottom-0 left-0 right-0 p-9">
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-[rgba(255,255,255,0.2)] rounded-full mb-6">
                    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                      <g>
                        <path d="M7.5 9H10.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d="M7.5 6H10.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d={svgPathsInfra.p2fd90cc0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d={svgPathsInfra.p34612000} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d={svgPathsInfra.p982eec0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </g>
                    </svg>
                    <span className="text-white text-[12px] font-semibold leading-[18px]">Institucional</span>
                  </div>
                  <h3 className="font-bold text-[28px] leading-[42px] text-white mb-3">
                    Sede principal en Lima
                  </h3>
                  <p className="text-[15px] leading-[24.375px] text-[rgba(255,255,255,0.9)] max-w-[504px]">
                    Ubicación estratégica con instalaciones modernas y accesibles
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative bg-white rounded-[28px] overflow-hidden shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)]">
              <div className="relative h-[420px]">
                <img
                  src={equipo_vanguardia}  
                  alt="Tecnología"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] via-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0)]"></div>

                <div className="absolute bottom-0 left-0 right-0 p-9">
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-[rgba(255,255,255,0.2)] rounded-full mb-6">
                    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                      <g>
                        <path d={svgPathsInfra.p2055d300} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d="M15.04 11.9902H2.95898" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </g>
                    </svg>
                    <span className="text-white text-[12px] font-semibold leading-[18px]">Tecnología</span>
                  </div>
                  <h3 className="font-bold text-[22px] leading-[33px] text-white mb-2.5">
                    Equipos de vanguardia
                  </h3>
                  <p className="text-[14px] leading-[22.75px] text-[rgba(255,255,255,0.9)]">
                    Última tecnología educativa
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative bg-white rounded-[28px] overflow-hidden shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)]">
              <div className="relative h-[420px]">
                <img
                  src={aula_especializada}
                  alt="Aulas"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] via-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0)]"></div>

                <div className="absolute bottom-0 left-0 right-0 p-9">
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-[rgba(255,255,255,0.2)] rounded-full mb-6">
                    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                      <g>
                        <path d="M9 5.25V15.75" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d={svgPathsInfra.p2044ea00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </g>
                    </svg>
                    <span className="text-white text-[12px] font-semibold leading-[18px]">Académico</span>
                  </div>
                  <h3 className="font-bold text-[22px] leading-[33px] text-white mb-2.5">
                    Aulas especializadas
                  </h3>
                  <p className="text-[14px] leading-[22.75px] text-[rgba(255,255,255,0.9)]">
                    Espacios de aprendizaje óptimos
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 - Grande horizontal */}
            <div className="md:col-span-2 relative bg-white rounded-[28px] overflow-hidden shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)]">
              <div className="relative h-[420px]">
                <img
                  src={profesional_capacitado}
                  alt="Profesionales"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] via-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0)]"></div>

                <div className="absolute bottom-0 left-0 right-0 p-9">
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-[rgba(255,255,255,0.2)] rounded-full mb-6">
                    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                      <g>
                        <path d={svgPathsInfra.pd2eb480} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d={svgPathsInfra.p2aacd880} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d={svgPathsInfra.p12ace100} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d={svgPathsInfra.p19685c00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </g>
                    </svg>
                    <span className="text-white text-[12px] font-semibold leading-[18px]">Equipo</span>
                  </div>
                  <h3 className="font-bold text-[28px] leading-[42px] text-white mb-3">
                    Profesionales altamente capacitados
                  </h3>
                  <p className="text-[15px] leading-[24.375px] text-[rgba(255,255,255,0.9)] max-w-[504px]">
                    Docentes con experiencia comprobada en el sector
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Beneficios - Cards Minimalistas */}
      <section className="bg-[#f9fafb] relative overflow-hidden pb-10">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header centrado */}
          <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
            <p className="font-bold text-[18px] sm:text-[24px] lg:text-[34.286px] leading-tight text-black tracking-[1.2px] mb-3 sm:mb-4">
              <span className="uppercase">B</span>
              <span className="lowercase">eneficios </span>
              <span className="uppercase">E</span>
              <span className="lowercase">xclusivos</span>
            </p>
            <h2 className="font-bold text-[28px] sm:text-[40px] lg:text-[60px] text-[#1c98b7] leading-tight mb-3 sm:mb-4 tracking-tight uppercase">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-black leading-[1.6]">
              Ventajas que nos posicionan como líderes en formación continua
            </p>
          </div>

          {/* Grid de beneficios - 2x2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 sm:gap-x-12 lg:gap-x-16 gap-y-6 sm:gap-y-8 lg:gap-y-10 max-w-[1169px] mx-auto">
            {/* Columna 1 */}
            <div className="flex flex-col gap-5 sm:gap-6 lg:gap-8">
              {/* Beneficio 1 */}
              <div className="flex gap-4 sm:gap-5 items-center">
                <div className="bg-[#1cb8a4] flex items-center justify-center rounded-[12px] sm:rounded-[16px] lg:rounded-[19.21px] shrink-0 w-[70px] sm:w-[90px] lg:w-[113.552px] h-[70px] sm:h-[90px] lg:h-[115.046px]">
                  <svg className="w-[32px] sm:w-[42px] lg:w-[53.788px] h-[32px] sm:h-[42px] lg:h-[53.788px]" fill="none" viewBox="0 0 53.788 53.788">
                    <g>
                      <path d="M26.8945 22.4116H26.9165" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
                      <path d="M26.8945 31.376H26.9165" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
                      <path d="M26.8945 13.4473H26.9165" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
                      <path d="M35.8592 22.4116H35.8811" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
                      <path d="M35.8592 31.376H35.8811" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
                      <path d="M35.8592 13.447H35.8811" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
                      <path d="M17.9297 22.4116H17.9517" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
                      <path d="M17.9297 31.376H17.9517" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
                      <path d="M17.9297 13.4473H17.9517" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
                      <path d={svgPathsBeneficios.p3ec8e600} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
                      <path d={svgPathsBeneficios.p5c65b00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
                    </g>
                  </svg>
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <h3 className="font-bold text-[18px] sm:text-[24px] lg:text-[32px] leading-tight text-black mb-1">Trayectoria sólida</h3>
                  <p className="text-[12px] sm:text-[16px] lg:text-[20px] leading-[1.5] text-black">
                    Experiencia respaldada por convenios universitarios
                  </p>
                </div>
              </div>

              {/* Separador */}
              <div className="px-2 sm:px-4">
                <svg className="w-full h-[2px] sm:h-[2.5px] lg:h-[3px]" fill="none" preserveAspectRatio="none" viewBox="0 0 486.329 3">
                  <path d="M0 1.5H486.329" stroke="#EE8A28" strokeWidth="3" />
                </svg>
              </div>

              {/* Beneficio 2 */}
              <div className="flex gap-4 sm:gap-5 items-center">
                <div className="bg-[#1cb8a4] flex items-center justify-center rounded-[12px] sm:rounded-[16px] lg:rounded-[19.21px] shrink-0 w-[70px] sm:w-[90px] lg:w-[113.552px] h-[70px] sm:h-[90px] lg:h-[115.046px]">
                  <svg className="w-[40px] sm:w-[52px] lg:w-[66.804px] h-[40px] sm:h-[52px] lg:h-[66.804px]" fill="none" viewBox="0 0 66.804 66.804">
                    <g>
                      <path d={svgPathsBeneficios.p3fee3a17} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.56699" />
                      <path d={svgPathsBeneficios.p24596580} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.56699" />
                      <path d={svgPathsBeneficios.p277fc5f0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.56699" />
                      <path d={svgPathsBeneficios.pd908a00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.56699" />
                    </g>
                  </svg>
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <h3 className="font-bold text-[18px] sm:text-[24px] lg:text-[32px] leading-tight text-black mb-1">Docentes expertos</h3>
                  <p className="text-[12px] sm:text-[16px] lg:text-[20px] leading-[1.5] text-black">
                    Docentes con amplia experiencia profesional comprobrada
                  </p>
                </div>
              </div>
            </div>

            {/* Columna 2 */}
            <div className="flex flex-col gap-5 sm:gap-6 lg:gap-8">
              {/* Beneficio 3 */}
              <div className="flex gap-4 sm:gap-5 items-center">
                <div className="bg-[#1cb8a4] flex items-center justify-center rounded-[12px] sm:rounded-[16px] lg:rounded-[19.21px] shrink-0 w-[70px] sm:w-[90px] lg:w-[113.552px] h-[70px] sm:h-[90px] lg:h-[115.046px]">
                  <svg className="w-[40px] sm:w-[52px] lg:w-[66.895px] h-[40px] sm:h-[52px] lg:h-[66.895px]" fill="none" viewBox="0 0 66.895 66.895">
                    <g>
                      <path d={svgPathsBeneficios.p12e7a200} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.57456" />
                      <path d="M33.4473 47.3838V58.5329" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.57456" />
                      <path d="M22.2988 58.5327H44.5971" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.57456" />
                      <path d={svgPathsBeneficios.p2fa2d600} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.57456" />
                    </g>
                  </svg>
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <h3 className="font-bold text-[18px] sm:text-[24px] lg:text-[32px] leading-tight text-black mb-1">Formación virtual</h3>
                  <p className="text-[12px] sm:text-[16px] lg:text-[20px] leading-[1.5] text-black">
                    Plataforma virtual moderna para formación profesional
                  </p>
                </div>
              </div>

              {/* Separador */}
              <div className="px-2 sm:px-4">
                <svg className="w-full h-[2px] sm:h-[2.5px] lg:h-[3px]" fill="none" preserveAspectRatio="none" viewBox="0 0 486.329 3">
                  <path d="M0 1.5H486.329" stroke="#EE8A28" strokeWidth="3" />
                </svg>
              </div>

              {/* Beneficio 4 */}
              <div className="flex gap-4 sm:gap-5 items-center">
                <div className="bg-[#1cb8a4] flex items-center justify-center rounded-[12px] sm:rounded-[16px] lg:rounded-[19.21px] shrink-0 w-[70px] sm:w-[90px] lg:w-[113.552px] h-[70px] sm:h-[90px] lg:h-[115.046px]">
                  <svg className="w-[44px] sm:w-[58px] lg:w-[73.512px] h-[44px] sm:h-[58px] lg:h-[73.512px]" fill="none" viewBox="0 0 73.512 73.512">
                    <g>
                      <path d={svgPathsBeneficios.p3f4b0d00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6.12599" />
                      <path d={svgPathsBeneficios.pd280200} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6.12599" />
                    </g>
                  </svg>
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <h3 className="font-bold text-[18px] sm:text-[24px] lg:text-[32px] leading-tight text-black mb-1">Flexibilidad total</h3>
                  <p className="text-[12px] sm:text-[16px] lg:text-[20px] leading-[1.5] text-black">
                    Horarios flexibles adaptables a profesionales en actividad
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Certificaciones ISO - Diseño Premium */}
      <section className="bg-white relative overflow-hidden mb-10 pt-10">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#fafbfc] rounded-full shadow-sm border border-gray-100 mb-5">
              <Shield className="w-4 h-4 text-[#1c98b7]" strokeWidth={2.5} />
              <span className="text-[#1c98b7] font-semibold text-[13px] uppercase tracking-wider">Certificaciones ISO</span>
            </div>
            <h2 className="font-bold text-[40px] sm:text-[52px] lg:text-[60px] text-[#1c98b7] leading-[1.1] mb-5 tracking-tight">
              Certificados por SGS para garantizar excelencia académica
            </h2>
            <p className="text-[17px] text-gray-600 leading-[1.7] max-w-3xl mx-auto">
              SGS es la empresa líder mundial en inspección, verificación y certificación. Nuestras certificaciones garantizan estándares internacionales en todos nuestros procesos institucionales.
            </p>
          </div>

          {/* Grid de 3 certificaciones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {/* ISO 9001 */}
            <div className="text-center group">
              <a
                href="https://www.sgs.com/en/certified-clients-and-products/certified-client-directory"
                target="_blank"
                rel="noopener noreferrer"
                className="block cursor-pointer"
              >
                <div className="bg-gradient-to-br from-[#fafbfc] to-white rounded-[28px] p-5 mb-6 flex items-center justify-center h-72 border-2 border-gray-300 shadow-lg group-hover:border-[#1c98b7] group-hover:shadow-2xl transition-all duration-300">
                  <img
                    src="https://cearlatinoamericano.pe/rsc/public/nosotros/archivos/iso-90012015.webp"
                    alt="ISO 9001:2015"
                    className="w-40 h-40 object-contain transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </a>
              <h3 className="font-bold text-[28px] text-gray-900 mb-3">
                ISO 9001:2015
              </h3>
              <a
                href="https://cearlatinoamericano.pe/rsc/public/nosotros/archivos/iso-90012015-pdf.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F08300] hover:bg-[#d67821] text-white font-semibold px-6 py-3 rounded-full text-[15px] transition-all shadow-md hover:shadow-lg group/btn"
              >
                <Download className="w-4.5 h-4.5 group-hover/btn:translate-y-0.5 transition-transform" strokeWidth={2.5} />
                <span>Descargar certificado</span>
              </a>
            </div>

            {/* ISO 37001 */}
            <div className="text-center group">
              <a
                href="https://www.sgs.com/en/certified-clients-and-products/certified-client-directory"
                target="_blank"
                rel="noopener noreferrer"
                className="block cursor-pointer"
              >
                <div className="bg-gradient-to-br from-[#fafbfc] to-white rounded-[28px] p-5 mb-6 flex items-center justify-center h-72 border-2 border-gray-300 shadow-lg group-hover:border-[#1CB8A4] group-hover:shadow-2xl transition-all duration-300">
                  <img
                    src="https://cearlatinoamericano.pe/rsc/public/nosotros/archivos/iso-370012016.webp"
                    alt="ISO 37001:2016"
                    className="w-40 h-40 object-contain transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </a>
              <h3 className="font-bold text-[28px] text-gray-900 mb-3">
                ISO 37001:2016
              </h3>
              <a
                href="https://cearlatinoamericano.pe/rsc/public/nosotros/archivos/iso-370012016-pdf.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F08300] hover:bg-[#d67821] text-white font-semibold px-6 py-3 rounded-full text-[15px] transition-all shadow-md hover:shadow-lg group/btn"
              >
                <Download className="w-4.5 h-4.5 group-hover/btn:translate-y-0.5 transition-transform" strokeWidth={2.5} />
                <span>Descargar certificado</span>
              </a>
            </div>

            {/* ISO 27001 */}
            <div className="text-center group">
              <a
                href="https://www.sgs.com/en/certified-clients-and-products/certified-client-directory"
                target="_blank"
                rel="noopener noreferrer"
                className="block cursor-pointer"
              >
                <div className="bg-gradient-to-br from-[#fafbfc] to-white rounded-[28px] p-5 mb-6 flex items-center justify-center h-72 border-2 border-gray-300 shadow-lg group-hover:border-[#1c98b7] group-hover:shadow-2xl transition-all duration-300">
                  <img
                    src="https://cearlatinoamericano.pe/rsc/public/images/ISO27001.png"
                    alt="ISO 27001:2013"
                    className="w-40 h-40 object-contain transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </a>
              <h3 className="font-bold text-[28px] text-gray-900 mb-3">
                ISO 27001:2013
              </h3>
              <a
                href="https://cearlatinoamericano.pe/rsc/public/CONSTANCIA%20CERTIFICACION-CEAR.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F08300] hover:bg-[#d67821] text-white font-semibold px-6 py-3 rounded-full text-[15px] transition-all shadow-md hover:shadow-lg group/btn"
              >
                <Download className="w-4.5 h-4.5 group-hover/btn:translate-y-0.5 transition-transform" strokeWidth={2.5} />
                <span>Descargar certificado</span>
              </a>
            </div>
          </div>

          {/* Banner informativo inferior */}
          <div className="relative bg-gradient-to-br from-[#1c98b7] to-[#1CB8A4] rounded-[32px] p-8 lg:p-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-[20px] mb-5">
                <Award className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className="font-bold text-[28px] sm:text-[32px] text-white mb-4 leading-tight">
                Alcance de certificaciones
              </h3>
              <p className="text-[16px] text-white/95 leading-[1.7]">
                Estas certificaciones son aplicables a diplomados, cursos de especialización, capacitaciones in-house y demás actividades académicas desarrolladas en el ámbito de la contratación pública, el arbitraje, las juntas de resolución de disputas y la formación continua vinculada a las áreas del Derecho y la Ingeniería.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}