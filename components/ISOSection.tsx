import { GraduationCap, Award, Download } from 'lucide-react';
import { motion } from 'motion/react';

const professionalCearImage = "/images/about/cummila.png";
const iso9001Image = "https://cearlatinoamericano.pe/rsc/public/nosotros/archivos/iso-90012015.webp";
const iso37001Image = "https://cearlatinoamericano.pe/rsc/public/nosotros/archivos/iso-370012016.webp";
const iso27001Image = "https://cearlatinoamericano.pe/rsc/public/images/ISO27001.png";
const isoCertificationBackgroundImage = "/images/iso_1_5.jpeg";

export function ISOSection() {
  const certifications = [
    {
      id: 'iso-9001',
      number: 'ISO 9001:2015',
      title: 'Sistema de gestión de la calidad',
      image: iso9001Image,
      color: 'from-orange-500 to-red-500',
      downloadUrl: 'https://cearlatinoamericano.pe/rsc/public/nosotros/archivos/iso-90012015-pdf.pdf'
    },
    {
      id: 'iso-37001',
      number: 'ISO 37001:2016',
      title: 'Sistema de gestión antisoborno',
      image: iso37001Image,
      color: 'from-orange-500 to-red-500',
      downloadUrl: 'https://cearlatinoamericano.pe/rsc/public/nosotros/archivos/iso-370012016-pdf.pdf'
    },
    {
      id: 'iso-27001',
      number: 'ISO 27001:2013',
      title: 'Sistema de gestión de seguridad de la información',
      image: iso27001Image,
      color: 'from-[#0B95BA] to-[#10E7B0]',
      downloadUrl: 'https://cearlatinoamericano.pe/rsc/public/CONSTANCIA%20CERTIFICACION-CEAR.pdf'
    }
  ];

  const sgsDirectoryUrl = 'https://www.sgs.com/en/certified-clients-and-products/certified-client-directory';

  const handleImageClick = () => {
    window.open(sgsDirectoryUrl, '_blank');
  };

  const handleDownload = (url: string, event: React.MouseEvent) => {
    event.stopPropagation();
    window.open(url, '_blank');
  };

  const certificationsScope = 'Las certificaciones obtenidas por CEAR LATINOAMERICANO respaldan nuestros procesos institucionales vinculados al diseño, organización y ejecución de programas de formación continua. Estas certificaciones son aplicables a diplomados, cursos de especialización, capacitaciones in-house y demás actividades académicas desarrolladas en el ámbito de la contratación pública, el arbitraje, las juntas de resolución de disputas y la formación continua vinculada a las áreas del Derecho y la Ingeniería.';

  return (
    <section className="w-full lg:pb-24 bg-linear-to-b from-white to-gray-50 pt-[30px] lg:pt-[60px] pr-0 pb-0 pl-0 px-0 py-[30px] lg:py-[60px] overflow-x-hidden overflow-y-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        {/* Título y Subtítulo de la sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center pb-[20px] pt-[20px] px-2 lg:px-0 mb-3 lg:mb-4 w-full"
        >
          {/* Título principal */}
          <div className="relative w-full">
            <div 
              className="font-bold leading-tight not-italic text-2xl sm:text-3xl lg:text-5xl xl:text-6xl text-center tracking-wide uppercase wrap-break-word"
              style={{ color: '#1c98b7' }}
            >
              Nuestras certificaciones ISO
            </div>
          </div>
          
          {/* Subtítulo con texto combinado */}
          <div className="relative flex items-center justify-center w-full mt-2 lg:mt-4">
            <div className="flex gap-2 items-center justify-center flex-wrap">
              <p className="font-normal leading-relaxed not-italic text-[#111827] text-xl sm:text-2xl lg:text-3xl text-center">
                Calidad certificada
              </p>
              <p 
                className="bg-clip-text font-normal leading-relaxed not-italic text-xl sm:text-2xl lg:text-3xl text-[rgba(0,0,0,0)] text-center"
                style={{ 
                  WebkitTextFillColor: "transparent", 
                  backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(178.903deg, rgb(11, 149, 186) 5.1406%, rgb(8, 122, 152) 94.859%)" 
                }}
              >
                internacionalmente
              </p>
            </div>
          </div>
        </motion.div>

        {/* ISO Certification Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 xl:gap-16 items-start w-full overflow-hidden">
          {/* Right - Image & Certifications */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-full order-2 lg:order-1 w-full"
          >
            {/* Contenedor principal con la imagen y certificaciones */}
            <div className="relative w-full h-[400px] sm:h-[500px] lg:h-full rounded-[27px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] overflow-hidden">
              {/* Imagen de fondo */}
              <img
                src={professionalCearImage}
                alt="Profesional CEAR LATINOAMERICANO"
                className="absolute inset-0 w-full h-full object-cover object-top rounded-[27px]"
              />

              {/* Texto superior superpuesto */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute left-0 bottom-0 w-full bg-[#1c98b7] shadow-[0px_0px_23.236px_0px_rgba(0,0,0,0.3)] border border-[#1c98b7] p-[16px] sm:p-[20px] lg:p-[22.828px]"
              >
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-white text-justify">
                  La adopción de estándares internacionales de calidad y gestión constituye un soporte transversal para el desarrollo de nuestra oferta académica, fortaleciendo la confianza, la transparencia y la mejora continua en los procesos formativos.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-9 order-1 lg:order-2 w-full max-w-[850px]"
          >
            {/* Título y descripción */}
            <div className="flex flex-col gap-[6px] w-full">
              {/* Título superior */}
              <div className="flex items-center justify-start w-full text-[rgb(28,152,183)]">
                <p className="font-bold leading-tight not-italic text-sm sm:text-base lg:text-lg tracking-wide uppercase wrap-break-word"
                  style={{
                    color: '#1c98b7 !important',
                    WebkitTextFillColor: '#1c98b7 !important'
                  } as React.CSSProperties}
                >
                  Experiencia y estándares internacionales
                </p>
              </div>
              
              {/* Título principal en dos líneas */}
              <div className="flex flex-col w-full mt-2 lg:mt-4">
                <div className="flex items-center justify-start w-full">
                  <p className="font-normal leading-tight not-italic text-[#111827] text-2xl sm:text-3xl lg:text-4xl whitespace-nowrap">
                    Centro especializado con
                  </p>
                </div>
                <div className="flex items-center justify-start w-full">
                  <p className="font-normal leading-tight not-italic text-[#0b95ba] text-2xl sm:text-3xl lg:text-4xl wrap-break-word">
                    respaldo internacional
                  </p>
                </div>
              </div>
              
              {/* Párrafo descriptivo */}
              <div className="w-full mt-4 lg:mt-6">
                <p className="font-normal leading-relaxed not-italic text-[#4b5563] text-base sm:text-lg lg:text-xl text-justify w-full wrap-break-word">
                  CEAR LATINOAMERICANO se distingue por su compromiso con la excelencia académica y la calidad metodológica en la formación profesional especializada. Nuestra propuesta formativa se desarrolla en coordinación con universidades licenciadas por SUNEDU, principalmente en las áreas de Derecho e Ingeniería, lo que permite ofrecer programas actualizados y alineados con las tendencias y exigencias del entorno profesional.
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-[31.5px] w-full max-w-[900px] lg:max-w-full mx-auto lg:mx-0 lg:px-0 py-0 mt-0 mr-0 mb-23px ml-0 pt-0 pr-11px pb-0 pl-0 px-7px">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-[15.25px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.2)] border-l-4 border-[#1c98b7] w-full"
              >
                <div className="content-stretch flex flex-col items-start justify-between pl-[24px] lg:pl-[35.5px] pr-[20px] lg:pr-[31.5px] pt-[20px] lg:pt-[31.5px] pb-[20px] lg:pb-[24px] relative w-full min-h-[140px] lg:min-h-[160px]">
                  <div className="content-stretch flex gap-[18px] items-center w-full mb-[12px] lg:mb-0">
                    <div className="flex-1 min-w-0 relative">
                      <div className="mb-[8px] lg:mb-[17.16px]">
                        <p className="font-normal leading-tight text-[#4b5563] text-xs sm:text-sm lg:text-base tracking-wide uppercase">
                          Experiencia
                        </p>
                      </div>
                      <div className="mb-2 lg:mb-4">
                        <div className="flex items-baseline gap-2">
                          <p className="font-bold leading-none text-[#1c98b7] text-4xl sm:text-5xl lg:text-6xl" style={{ fontFamily: 'inherit' }}>
                            +9
                          </p>
                          <p className="font-normal leading-tight text-[#6a7282] text-lg sm:text-xl lg:text-2xl">
                            años
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 self-start">
                      <div className="w-[45px] lg:w-[52px] h-[45px] lg:h-[52px] bg-[#1cb8a4] rounded-[11.25px] flex items-center justify-center">
                        <GraduationCap className="w-[22px] lg:w-[31.5px] h-[22px] lg:h-[31.5px] text-white" strokeWidth="2" />
                      </div>
                    </div>
                  </div>
                  <p className="font-normal leading-relaxed text-[#6a7282] text-xs sm:text-sm lg:text-base">
                    Formando profesionales
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-[15.25px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.2)] border-l-4 border-[#1c98b7] w-full"
              >
                <div className="content-stretch flex flex-col items-start justify-between pl-[24px] lg:pl-[35.5px] pr-[20px] lg:pr-[31.5px] pt-[20px] lg:pt-[31.5px] pb-[20px] lg:pb-[24px] relative w-full min-h-[140px] lg:min-h-[160px]">
                  <div className="content-stretch flex gap-[18px] items-center w-full mb-[12px] lg:mb-0">
                    <div className="flex-1 min-w-0 relative">
                      <div className="mb-[8px] lg:mb-[15.16px]">
                        <p className="font-normal leading-tight text-[#4b5563] text-xs sm:text-sm lg:text-base tracking-wide uppercase">
                          Certificaciones
                        </p>
                      </div>
                      <div className="mb-2 lg:mb-4">
                        <p className="font-bold leading-none text-[#1c98b7] text-4xl sm:text-5xl lg:text-6xl" style={{ fontFamily: 'inherit' }}>
                          +700
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 self-start">
                      <div className="w-[45px] lg:w-[54px] h-[45px] lg:h-[54px] bg-[#1cb8a4] rounded-[11.25px] flex items-center justify-center">
                        <Award className="w-[22px] lg:w-[31.5px] h-[22px] lg:h-[31.5px] text-white" strokeWidth="2" />
                      </div>
                    </div>
                  </div>
                  <p className="font-normal leading-relaxed text-[#6a7282] text-xs sm:text-sm lg:text-base">
                    Certificados emitidos
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Alcance de Certificaciones - Sección separada full width */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12 lg:mt-16 xl:mt-20 w-full px-4 sm:px-6 overflow-x-hidden"
      >
        <div className="bg-white rounded-[20px] lg:rounded-[40px] shadow-lg border-2 lg:border-4 border-[#1c98b7] mx-auto max-w-[1400px] overflow-hidden w-full">
          {/* Título y Descripción con padding */}
          <div className="p-6 sm:p-8 lg:p-12">
            <div className="space-y-5 lg:space-y-8">
              {/* Título */}
              <div className="text-center">
                <h3 className="text-[#1c98b7] text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wide font-bold leading-tight wrap-break-word">
                  Alcance de
                </h3>
                <h2 className="text-[#1c98b7] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl uppercase tracking-wide font-bold leading-tight wrap-break-word">
                  Certificaciones
                </h2>
              </div>
              
              {/* Descripción */}
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-[rgba(17,24,39,0.95)] text-justify wrap-break-word">
                {certificationsScope}
              </p>
            </div>
          </div>

          {/* Layout de dos columnas: Imagen + Certificaciones - Sin padding lateral */}
          <div className="relative min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] overflow-hidden">
            {/* Imagen de fondo - A sangre completa */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute inset-0 w-full h-full hidden lg:block"
            >
              <img
                src={isoCertificationBackgroundImage}
                alt="ISO Certification Background"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Overlay oscuro para mejorar contraste */}
            <div className="absolute inset-0 bg-black/30 hidden lg:block"></div>

            {/* Certificaciones superpuestas - Grid layout */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 items-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] px-4 sm:px-6 lg:px-8 xl:px-12 py-6 lg:py-8 w-full">
              {/* Espacio izquierdo vacío */}
              <div className="hidden lg:block"></div>
              
              {/* Certificaciones derecha - Superpuestas */}
              <div className="space-y-4 lg:space-y-5 flex flex-col justify-center w-full">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="bg-white/95 backdrop-blur-sm rounded-[16px] lg:rounded-[20px] p-4 lg:p-5 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.3)] border-2 border-[#1c98b7] hover:shadow-[0px_0px_30px_0px_rgba(28,152,183,0.5)] transition-all duration-300 w-full"
                  >
                    <div className="flex items-center gap-3 lg:gap-4 w-full">
                      {/* Logo ISO */}
                      <div className="shrink-0">
                        <div 
                          className="w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] rounded-full bg-linear-to-br from-[#f9fafb] to-[#e5e7eb] flex items-center justify-center p-2 shadow-sm border border-gray-300 cursor-pointer hover:shadow-md transition-shadow"
                          onClick={handleImageClick}
                          title="Ver en directorio SGS"
                        >
                          <img
                            src={cert.image}
                            alt={cert.title}
                            className="w-[38px] h-[38px] lg:w-[45px] lg:h-[45px] object-contain"
                          />
                        </div>
                      </div>
                      
                      {/* Texto central */}
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <h4 className="text-base lg:text-lg leading-tight text-[#111827] font-semibold mb-1 wrap-break-word">
                          {cert.number}
                        </h4>
                        <p className="text-sm lg:text-base leading-relaxed text-[#6b7280] wrap-break-word">
                          {cert.title}
                        </p>
                      </div>
                      
                      {/* Botón Descarga */}
                      <div className="shrink-0">
                        <button 
                          onClick={(e) => handleDownload(cert.downloadUrl, e)}
                          className="bg-[#F08300] hover:bg-[#d67821] text-white text-xs sm:text-sm lg:text-base leading-normal py-2 lg:py-2.5 px-4 lg:px-5 xl:px-6 rounded-[10px] lg:rounded-[12px] transition-colors shadow-md hover:shadow-lg flex items-center gap-1.5 lg:gap-2 whitespace-nowrap"
                        >
                          <Download className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                          <span className="hidden sm:inline">Descarga</span>
                          <span className="sm:hidden">PDF</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}