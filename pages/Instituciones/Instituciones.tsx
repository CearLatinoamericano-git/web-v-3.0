import { Calendar, CheckCircle2, FileText, PhoneCall, Shield, X, Loader2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { storeContacto, type ContactFormData } from '../../services/solicitudes';
import svgPathsRutas from '../../imports/svg-tyywjenkly';
import svgPathsForm from '../../imports/svg-39txb514tf';
import svgPathsBeneficios from '../../imports/svg-zhlbirmz1x';

const back_patter = "/images/institutions/back_instituciones.webp";
const banner_instituciones = "/images/institutions/banner_insti.webp";
const section_instit = "/images/institutions/section_insti.jpeg";

export function Instituciones() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    dni: '',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollToForm = () => {
    const formSection = document.getElementById('contact-form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBrochure = () => {
    window.open('https://cearlatinoamericano.edu.pe/sisdocs/brochures/BROCHURE-CORPORATIVO.pdf', '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[INSTITUCIONES FORM] Submit iniciado');
    console.log('[INSTITUCIONES FORM] Datos del formulario:', formData);
    
    if (!acceptedPrivacy) {
      alert('Debe aceptar la Política de Privacidad para continuar');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const contactoData: ContactFormData = {
        nombre: formData.fullName,
        celular: formData.phone,
        email: formData.email,
        dni: formData.dni || undefined,
        mensaje: formData.message || '',
        estado_politica: acceptedPrivacy,
      };

      console.log('[INSTITUCIONES FORM] Datos preparados para enviar:', contactoData);
      console.log('[INSTITUCIONES FORM] Llamando a storeContacto...');
      
      await storeContacto(contactoData);
      
      console.log('[INSTITUCIONES FORM] storeContacto completado exitosamente');
      setFormSubmitted(true);
      
      // Reset form
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        dni: '',
        message: ''
      });
      setAcceptedPrivacy(false);
      
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    } catch (err: any) {
      console.error('[INSTITUCIONES FORM] Error al enviar:', err);
      setError(err.message || 'Error al enviar la solicitud. Por favor, intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const arbitrosPrograms = [
    'DIPLOMADO EN CONTRATACIÓN PÚBLICA BAJO LA LEY 32069 Y SU REGLAMENTO',
    'DIPLOMADO DE ARBITRAJE EN CONTRATACIÓN PÚBLICA',
    'DIPLOMADO DE DERECHO ADMINISTRATIVO PARA ÁRBITROS',
    'CURSO DE CONTROVERSIAS EN LA EJECUCIÓN CONTRACTUAL'
  ];

  const adjudicadoresPrograms = [
    'CURSO DE JUNTA DE PREVENCIÓN Y RESOLUCIÓN DE DISPUTAS',
    'CURSO DE EJECUCIÓN CONTRACTUAL DE OBRAS PÚBLICAS',
    'CURSO DE CONTRATOS ESTANDARIZADOS: NEC Y FIDIC',
    'CURSO DE MECANISMOS DE INVERSIÓN PRIVADA: APP, OxI Y G2G'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative py-8 sm:py-12 lg:py-16 overflow-hidden rounded-b-[30px] lg:rounded-b-[50px]" style={{ background: 'linear-gradient(180deg, #561289 0%, #3954A0 50%, #1C98B7 100%)' }}>
        {/* Background Pattern - Gray Texture */}
        <div className="absolute inset-0 opacity-16 mix-blend-multiply pointer-events-none">
          <div className="w-full h-full bg-gray-200" />
        </div>

        {/* Background Pattern - Llave Texture */}
        <div className="absolute inset-0 opacity-16 mix-blend-multiply pointer-events-none">
          <img
            src={back_patter}
            alt=""
            className="w-full h-full object-cover scale-[1.2]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 pt-16 sm:pt-20 lg:pt-28 pb-0">
          {/* Contenedor común para título y video */}
          <div className="max-w-6xl mx-auto mb-8 lg:mb-10">
            {/* Hero Content - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-12 mb-8 lg:mb-10 items-start">
              {/* Left: Title */}
              <div className="space-y-2">
                <h1 className="font-['Inter'] font-bold uppercase text-white leading-[1.15] tracking-tight drop-shadow-[0_3.938px_3.938px_rgba(0,0,0,0.37)]">
                  <span className="block mb-1" style={{ fontSize: 'clamp(28px, 5vw, 42px)' }}>CAPACITACIÓN</span>
                  <span className="block" style={{ fontSize: 'clamp(26px, 4.5vw, 40px)' }}>PARA INSTITUCIONES</span>
                </h1>
              </div>

              {/* Right: Description */}
              <div className="lg:pt-2">
                <p
                  className="text-white leading-[1.6] lg:leading-[1.65] text-justify"
                  style={{ fontSize: 'clamp(14px, 1.5vw, 16px)' }}
                >
                  Diseñamos programas especializados con enfoque teórico-práctico, una plana docente de primer nivel y altos estándares de exigencia académica, orientados a brindar una formación institucional de excelencia.
                </p>
              </div>
            </div>

            {/* Hero Banner */}
            <div className="rounded-2xl sm:rounded-[20px] overflow-hidden shadow-[0px_0px_24.821px_0px_rgba(0,0,0,0.3)] h-[250px] sm:h-[380px] lg:h-[480px] relative">
              <img
                src={banner_instituciones}
                alt="Capacitación para instituciones"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)]" />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mb-0">
            <button
              onClick={scrollToForm}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-[rgb(240,131,0)] text-white rounded-xl shadow-[0px_0px_24.821px_0px_rgba(0,0,0,0.3)] hover:bg-[#159989] transition-all inline-flex items-center justify-center gap-2 font-bold"
              style={{ fontSize: 'clamp(14px, 1.5vw, 16px)' }}
            >
              <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth="2" />
              <span>Contactar a ventas</span>
            </button>

            <button
              onClick={handleBrochure}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2 font-bold"
              style={{ fontSize: 'clamp(14px, 1.5vw, 16px)' }}
            >
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth="2" />
              <span>Brochure</span>
            </button>
          </div>
        </div>
      </div>

      {/* Beneficios para tu institución */}
      <section className="bg-[#fdfdfd] pt-12 sm:pt-16 lg:pt-[75px] pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-[110px]">
        <div className="flex flex-col items-center">
          {/* Header */}
          <div className="text-center w-full mb-3 sm:mb-4 lg:mb-5">
            <p className="font-bold text-[28px] sm:text-[42px] lg:text-[64px] text-[#1C98B7]! text-center tracking-[0.8px] sm:tracking-[1px] lg:tracking-[1.2px] uppercase leading-[1.1] sm:leading-[1.15] lg:leading-[1.2]">
              BENEFICIOS EXCLUSIVOS
            </p>
          </div>

          <div className="text-center w-full mb-4 sm:mb-6 lg:mb-8">
            <p className="text-[24px] sm:text-[36px] lg:text-[48px] text-[#111827] text-center leading-[1.2] sm:leading-tight lg:leading-[1.3]">
              Propuesta de valor diferenciada
            </p>
          </div>

          {/* Description */}
          <div className="text-center pb-8 sm:pb-10 lg:pb-12 w-full">
            <p className="text-[14px] sm:text-[16px] lg:text-[18px] text-[#4b5563] text-center leading-normal sm:leading-[1.55] lg:leading-[1.6] max-w-[854px] mx-auto px-4">
              Los programas académicos están diseñados a partir de la experiencia práctica y especializada del centro, superando un enfoque exclusivamente teórico.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-[38px] items-start w-full max-w-[1400px]">
            {/* Card 1 - Experiencia Institucional */}
            <div className="bg-[#f6f6f6] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.27)] w-full min-h-[380px] sm:min-h-[420px] lg:h-[440px] flex flex-col overflow-hidden">
              {/* White top section */}
              <div className="bg-white rounded-tl-[18px] rounded-tr-[18px] pt-6 sm:pt-8 lg:pt-[33px] px-6 sm:px-8 lg:px-[39px] pb-4 sm:pb-5 lg:pb-[20px]">
                <div className="flex gap-4 sm:gap-5 lg:gap-[23px] items-center">
                  {/* Icon container */}
                  <div className="bg-[#1cb8a4] rounded-[15.25px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] lg:w-[72px] lg:h-[72px] flex items-center justify-center shrink-0">
                    <svg className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] lg:w-[36px] lg:h-[36px]" fill="none" viewBox="0 0 36 36">
                      <path d={svgPathsBeneficios.p39cf8500} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                      <path d={svgPathsBeneficios.p3302ea00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                      <path d={svgPathsBeneficios.p142b4100} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    </svg>
                  </div>
                  {/* Title */}
                  <div className="flex flex-col flex-1">
                    <p className="font-bold text-[20px] sm:text-[26px] lg:text-[33.099px] text-[#1c98b7]! text-center tracking-[0.4px] sm:tracking-[0.5px] lg:tracking-[0.6206px] uppercase leading-[1.2] sm:leading-tight lg:leading-[1.3] mb-1">
                      experiencia
                    </p>
                    <p className="text-[22px] sm:text-[28px] lg:text-[37.091px] text-[#111827] text-center leading-[1.2] sm:leading-tight lg:leading-[1.3]">
                      Institucional
                    </p>
                  </div>
                </div>
              </div>
              {/* Description section */}
              <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-6 py-4 sm:py-5 lg:py-6">
                <p className="font-medium text-[14px] sm:text-[16px] lg:text-[17px] text-black text-justify leading-[1.6] sm:leading-[1.65] lg:leading-[1.7] w-full max-w-[356px]">
                  Los programas académicos se construyen a partir de la experiencia práctica y especializada del centro, integrando criterios reales, casos aplicados y conocimientos derivados de su ejercicio institucional, lo que permite una formación alineada con la realidad profesional.
                </p>
              </div>
            </div>

            {/* Card 2 - Enfoque Profesional */}
            <div className="bg-[#f6f6f6] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.27)] w-full min-h-[380px] sm:min-h-[420px] lg:h-[440px] flex flex-col overflow-hidden border-2 border-[rgba(246,246,246,0.44)]">
              {/* White top section */}
              <div className="bg-white rounded-tl-[18px] rounded-tr-[18px] pt-6 sm:pt-8 lg:pt-[33px] px-6 sm:px-8 lg:px-[39px] pb-4 sm:pb-5 lg:pb-[20px]">
                <div className="flex gap-4 sm:gap-5 lg:gap-[23px] items-center">
                  {/* Icon container */}
                  <div className="bg-[#1cb8a4] rounded-[15.25px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] lg:w-[72px] lg:h-[72px] flex items-center justify-center shrink-0">
                    <svg className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] lg:w-[36px] lg:h-[36px]" fill="none" viewBox="0 0 36 36">
                      <path d={svgPathsBeneficios.p362db340} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                      <path d={svgPathsBeneficios.p3fe49e00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                      <path d="M10.5 31.8682H25.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                      <path d="M18 4.86816V31.8682" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                      <path d={svgPathsBeneficios.p19f7a0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    </svg>
                  </div>
                  {/* Title */}
                  <div className="flex flex-col flex-1">
                    <p className="font-bold text-[20px] sm:text-[26px] lg:text-[33.099px] text-[#1c98b7]! text-center tracking-[0.4px] sm:tracking-[0.5px] lg:tracking-[0.6206px] uppercase leading-[1.2] sm:leading-tight lg:leading-[1.3] mb-1">
                      ENFOQUE
                    </p>
                    <p className="text-[22px] sm:text-[28px] lg:text-[37.091px] text-[#111827] text-center leading-[1.2] sm:leading-tight lg:leading-[1.3]">
                      Profesional
                    </p>
                  </div>
                </div>
              </div>
              {/* Description section */}
              <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-6 py-4 sm:py-5 lg:py-6">
                <p className="font-medium text-[14px] sm:text-[16px] lg:text-[17px] text-black text-justify leading-[1.6] sm:leading-[1.65] lg:leading-[1.7] w-full max-w-[356px]">
                  La formación prioriza la aplicación práctica del conocimiento, orientando los contenidos académicos al desarrollo de competencias útiles para el ejercicio profesional, la toma de decisiones y la resolución de problemas reales en el entorno laboral.
                </p>
              </div>
            </div>

            {/* Card 3 - Estándares de Calidad */}
            <div className="bg-[#f6f6f6] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.27)] w-full min-h-[380px] sm:min-h-[420px] lg:h-[440px] flex flex-col overflow-hidden">
              {/* White top section */}
              <div className="bg-white rounded-tl-[18px] rounded-tr-[18px] pt-6 sm:pt-8 lg:pt-[33px] px-6 sm:px-8 lg:px-[39px] pb-4 sm:pb-5 lg:pb-[20px]">
                <div className="flex gap-4 sm:gap-5 lg:gap-[23px] items-center">
                  {/* Icon container */}
                  <div className="bg-[#1cb8a4] rounded-[15.25px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] lg:w-[72px] lg:h-[72px] flex items-center justify-center shrink-0">
                    <svg className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] lg:w-[36px] lg:h-[36px]" fill="none" viewBox="0 0 36 36">
                      <path d="M24 10.8682H33V19.8682" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                      <path d={svgPathsBeneficios.p36a68e80} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    </svg>
                  </div>
                  {/* Title */}
                  <div className="flex flex-col flex-1">
                    <p className="font-bold text-[20px] sm:text-[26px] lg:text-[33.099px] text-[#1c98b7]! text-center tracking-[0.4px] sm:tracking-[0.5px] lg:tracking-[0.6206px] uppercase leading-[1.2] sm:leading-tight lg:leading-[1.3] mb-1">
                      estándares
                    </p>
                    <p className="text-[22px] sm:text-[28px] lg:text-[37.091px] text-[#111827] text-center leading-[1.2] sm:leading-tight lg:leading-[1.3]">
                      de Calidad
                    </p>
                  </div>
                </div>
              </div>
              {/* Description section */}
              <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-6 py-4 sm:py-5 lg:py-6">
                <p className="font-medium text-[14px] sm:text-[16px] lg:text-[17px] text-black text-justify leading-[1.6] sm:leading-[1.65] lg:leading-[1.7] w-full max-w-[356px]">
                  La oferta académica se desarrolla bajo estándares institucionales certificados, garantizando coherencia académica, rigor metodológico y confianza en cada programa, respaldados por procesos formales de calidad y buenas prácticas institucionales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programas Section - RUTAS DE FORMACIÓN */}
      <section className="bg-white py-8 sm:py-10 lg:py-[48px]">
        <div className="px-4 sm:px-6 lg:px-[110px]">
          {/* Header */}
          <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5 items-start pb-8 sm:pb-10 lg:pb-12">
            <div className="w-full flex items-center justify-center">
              <p className="font-bold text-[28px] sm:text-[42px] lg:text-[64px] text-[#1C98B7]! text-center tracking-[0.8px] sm:tracking-[1px] lg:tracking-[1.2px] uppercase leading-[1.1] sm:leading-[1.15] lg:leading-[1.2]">
                RUTAS DE FORMACIÓN
              </p>
            </div>
            <div className="w-full flex items-center justify-center">
              <p className="text-[24px] sm:text-[36px] lg:text-[48px] text-[#111827] text-center leading-[1.2] sm:leading-tight lg:leading-[1.3]">
                Formación especializada para el desarrollo profesional.
              </p>
            </div>
          </div>

          {/* Cards Container */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-[32px] items-stretch justify-center">
            {/* Card 1 - Para Árbitros (White background) */}
            <div className="bg-white relative rounded-[20px] w-full lg:w-[589px] border-4 sm:border-6 lg:border-8 border-[#1c98b7]">
              <div className="flex flex-col gap-2 sm:gap-3 lg:gap-[10px] items-start overflow-hidden rounded-[-5px] h-full">
                {/* Header azul */}
                <div className="bg-[#1c98b7] relative rounded-tl-[5px] rounded-tr-[5px] shadow-[0px_10px_40px_0px_rgba(11,149,186,0.15)] w-full">
                  <div className="flex flex-col items-start px-4 sm:px-6 lg:px-[39px] py-4 sm:py-6 lg:py-[33px]">
                    <div className="flex items-center justify-center w-full gap-2 sm:gap-3">
                      <div className="flex items-center shrink-0">
                        <div className="bg-white flex items-center justify-center shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] w-[48px] h-[48px] sm:w-[60px] sm:h-[60px] lg:w-[72px] lg:h-[72px] rounded-[12px] sm:rounded-[14px] lg:rounded-[15px]">
                          <svg className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] lg:w-[36px] lg:h-[36px]" fill="none" viewBox="0 0 36 36">
                            <path d={svgPathsRutas.p3b305f00} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                            <path d={svgPathsRutas.p151b3800} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                            <path d="M10.5 31.5469H25.5" stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                            <path d="M18 4.54688V31.5469" stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                            <path d={svgPathsRutas.p1d594720} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                          </svg>
                        </div>
                      </div>
                      <p className="font-bold text-[18px] sm:text-[24px] lg:text-[33.099px] text-center text-white! tracking-[0.4px] sm:tracking-[0.5px] lg:tracking-[0.6206px] uppercase leading-[1.2] sm:leading-tight lg:leading-[1.3]">
                        para árbitros
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content area */}
                <div className="flex flex-col gap-2 sm:gap-2.5 lg:gap-[10px] flex-1 items-start py-4 sm:py-6 lg:py-[9px] px-4 sm:px-6 lg:px-[25px] w-full">
                  {arbitrosPrograms.map((program, index) => (
                    <div key={index}>
                      <div className="flex gap-3 sm:gap-4 lg:gap-[18px] items-center w-full py-2 sm:py-3 lg:py-4">
                        <div className="shrink-0 w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] lg:w-[41px] lg:h-[41px]">
                          <svg className="block w-full h-full" fill="none" viewBox="0 0 41 41">
                            <path d={svgPathsRutas.p2c776580} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.41667" />
                            <path d={svgPathsRutas.p18a557e0} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.41667" />
                          </svg>
                        </div>
                        <p className="font-normal leading-normal sm:leading-[1.55] lg:leading-[1.6] text-[14px] sm:text-[16px] lg:text-[17px] text-black flex-1">
                          {program}
                        </p>
                      </div>
                      {index < arbitrosPrograms.length - 1 && (
                        <div className="h-[2px] sm:h-[2.5px] lg:h-[3px] w-full bg-[#1C98B7] rounded-full"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2 - Para Adjudicadores (Blue background) */}
            <div className="bg-[#1c98b7] relative rounded-[20px] w-full lg:w-[589px] border-4 sm:border-6 lg:border-8 border-[#1c98b7]">
              <div className="flex flex-col gap-2 sm:gap-3 lg:gap-[10px] items-start overflow-hidden rounded-[inherit] h-full">
                {/* Header blanco */}
                <div className="bg-white relative rounded-tl-[18px] rounded-tr-[18px] shadow-[0px_10px_40px_0px_rgba(11,149,186,0.15)] w-full">
                  <div className="flex flex-col items-start px-4 sm:px-6 lg:px-[39px] py-4 sm:py-6 lg:py-[33px]">
                    <div className="flex items-center justify-center w-full gap-2 sm:gap-3">
                      <div className="flex items-center shrink-0">
                        <div className="bg-[#1c98b7] flex items-center justify-center rounded-[12px] sm:rounded-[14px] lg:rounded-[15.25px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] w-[48px] h-[48px] sm:w-[60px] sm:h-[60px] lg:w-[72px] lg:h-[72px]">
                          <svg className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] lg:w-[36px] lg:h-[36px]" fill="none" viewBox="0 0 36 36">
                            <path d={svgPathsRutas.p178e2f00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                            <path d={svgPathsRutas.p34263300} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                          </svg>
                        </div>
                      </div>
                      <p className="flex-1 font-bold text-[18px] sm:text-[24px] lg:text-[33.099px] text-black text-center tracking-[0.4px] sm:tracking-[0.5px] lg:tracking-[0.6206px] uppercase leading-[1.2] sm:leading-tight lg:leading-[1.3]">
                        para adjudicadores
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content area */}
                <div className="flex flex-col gap-2 sm:gap-2.5 lg:gap-[10px] flex-1 items-start py-4 sm:py-6 lg:py-[9px] px-4 sm:px-6 lg:px-[25px] w-full">
                  {adjudicadoresPrograms.map((program, index) => (
                    <div key={index}>
                      <div className="flex gap-3 sm:gap-4 lg:gap-[18px] items-center w-full py-2 sm:py-3 lg:py-4">
                        <div className="shrink-0 w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] lg:w-[41px] lg:h-[41px]">
                          <svg className="block w-full h-full" fill="none" viewBox="0 0 41 41">
                            <path d={svgPathsRutas.p2c776580} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.41667" />
                            <path d={svgPathsRutas.p18a557e0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.41667" />
                          </svg>
                        </div>
                        <p className="font-normal leading-normal sm:leading-[1.55] lg:leading-[1.6] text-[14px] sm:text-[16px] lg:text-[17px] text-white flex-1">
                          {program}
                        </p>
                      </div>
                      {index < adjudicadoresPrograms.length - 1 && (
                        <div className="h-[2px] sm:h-[2.5px] lg:h-[3px] w-full bg-white rounded-full"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trabajamos con instituciones */}
      <section className="relative overflow-hidden m-0 px-0 py-8 sm:py-10 lg:py-12 bg-[#1C98B7]">
        {/* Background image - only visible on lg screens and up */}
        <div 
          className="hidden lg:block absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${section_instit})` }}
        />
        {/* Contenido principal */}
        <div className="max-w-[1800px] mx-auto px-8 sm:px-12 lg:px-16 xl:px-20 relative z-10">
          <div className="flex justify-end items-center rounded-[20px] sm:rounded-[30px] lg:rounded-[34px] border-2 sm:border-[3px] lg:border-4 border-white p-6 sm:p-8 lg:p-10 xl:p-12">
            {/* Contenido de texto */}
            <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5 w-full max-w-[600px] lg:max-w-[700px]">
              <p className="font-light! text-[20px] sm:text-[24px] lg:text-[28px] text-white! tracking-[0.5177px] uppercase leading-[1.3]">
                alianzas estratégicas
              </p>

              <p className="font-bold sm:text-[36px] lg:text-[40.167px] text-white leading-[1.2] sm:leading-tight lg:leading-[1.3] text-[36px]">
                Trabajamos con instituciones
              </p>

              <p className="text-white sm:text-[24px] lg:text-[27.532px] leading-normal sm:leading-[1.55] lg:leading-[1.6] text-justify text-[20px]">
                Ofrecemos servicios de capacitación especializada dirigidos a instituciones públicas y privadas, orientados al fortalecimiento de las competencias profesionales de sus equipos, mediante programas formativos rigurosos, actualizados y alineados con la práctica arbitral y la contratación pública.
              </p>

              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#1CB8A4] text-white rounded-[14px] shadow-[0px_0px_22.524px_0px_rgba(0,0,0,0.3)] hover:bg-[#17a08e] hover:scale-105 active:scale-95 transition-all inline-flex items-center justify-center gap-3 mt-2 cursor-pointer">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold text-[14px] sm:text-[16px] lg:text-[16.217px]">Agendar reunión</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Agenda una llamada informativa */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white" id="contact-form-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-[54px] lg:justify-items-center">
            {/* Left Side - Benefits Card */}
            <div className="bg-[#1c98b7] rounded-[20px] sm:rounded-[24px] lg:rounded-[27px] shadow-[0px_4px_16.9px_0px_rgba(0,0,0,0.09)] w-full lg:w-[677px] min-h-[700px] sm:min-h-[850px] lg:min-h-[988px] lg:h-full lg:self-stretch flex flex-col overflow-hidden">
              {/* Orange Header */}
              <div className="bg-[#ee8a28] rounded-tl-[20px] sm:rounded-tl-[24px] lg:rounded-tl-[28px] rounded-tr-[20px] sm:rounded-tr-[24px] lg:rounded-tr-[28px]">
                <div className="flex items-center justify-center p-3 sm:p-4 lg:p-[16.094px]">
                  <p className="font-semibold leading-[42px] sm:leading-[60px] lg:leading-[81.475px] text-[36px] sm:text-[52px] lg:text-[65.18px] text-white text-center" style={{ textShadow: '0px 4px 4px rgba(0,0,0,0.61)' }}>
                    OFERTA ESPECIAL
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 px-6 sm:px-8 lg:px-8 py-4 sm:py-6 lg:py-6 flex-1">
                <div className="flex items-center justify-start w-full mb-2">
                  <h2 className="text-white font-bold text-[28px] sm:text-[38px] lg:text-[50.956px] leading-[1.2] sm:leading-tight lg:leading-[1.3]">
                    ¡Obtén<br />
                    la mejor propuesta<br />
                    para tu institución!
                  </h2>
                </div>

                <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
                  <p className="text-white font-normal text-[14px] sm:text-[17px] lg:text-[18px] leading-normal sm:leading-[1.55] lg:leading-[1.6]">
                    Programa una cita con un asesor especialista para armar la oferta especial que mejor se adapte a las necesidades de su institución. Además, podrá gozar de los siguientes beneficios:
                  </p>

                  <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
                    {/* Benefit 1 */}
                    <div className="flex gap-3 sm:gap-4 lg:gap-4 items-center">
                      <div className="bg-white rounded-[12px] sm:rounded-[14px] lg:rounded-[15.505px] shadow-[0px_0px_25.419px_0px_rgba(0,0,0,0.3)] w-[42px] h-[42px] sm:w-[48px] sm:h-[48px] lg:w-[54.904px] lg:h-[54.904px] flex items-center justify-center shrink-0">
                        <svg className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] lg:w-[27.452px] lg:h-[27.452px]" fill="none" viewBox="0 0 27.4521 27.4521">
                          <path d={svgPathsForm.p283fee00} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.28767" />
                          <path d={svgPathsForm.p3729b118} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.28767" />
                        </svg>
                      </div>
                      <p className="text-white font-normal text-[14px] sm:text-[17px] lg:text-[18px] leading-normal sm:leading-[1.55] lg:leading-[1.6]">
                        Precio corporativo preferencial
                      </p>
                    </div>

                    {/* Benefit 2 */}
                    <div className="flex gap-3 sm:gap-4 lg:gap-4 items-center">
                      <div className="bg-white rounded-[12px] sm:rounded-[14px] lg:rounded-[15.505px] shadow-[0px_0px_25.419px_0px_rgba(0,0,0,0.3)] w-[42px] h-[42px] sm:w-[48px] sm:h-[48px] lg:w-[54.904px] lg:h-[54.904px] flex items-center justify-center shrink-0">
                        <svg className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] lg:w-[27.452px] lg:h-[27.452px]" fill="none" viewBox="0 0 27.4521 27.4521">
                          <path d={svgPathsForm.p23e2db00} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.28767" />
                          <path d={svgPathsForm.p1b960e00} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.28767" />
                          <path d={svgPathsForm.p30195d00} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.28767" />
                        </svg>
                      </div>
                      <p className="text-white font-normal text-[14px] sm:text-[17px] lg:text-[18px] leading-normal sm:leading-[1.55] lg:leading-[1.6]">
                        Programa académico a medida
                      </p>
                    </div>

                    {/* Benefit 3 */}
                    <div className="flex gap-3 sm:gap-4 lg:gap-4 items-center">
                      <div className="bg-white rounded-[12px] sm:rounded-[14px] lg:rounded-[15.505px] shadow-[0px_0px_25.419px_0px_rgba(0,0,0,0.3)] w-[42px] h-[42px] sm:w-[48px] sm:h-[48px] lg:w-[54.904px] lg:h-[54.904px] flex items-center justify-center shrink-0">
                        <svg className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] lg:w-[27.452px] lg:h-[27.452px]" fill="none" viewBox="0 0 27.4521 27.4521">
                          <path d={svgPathsForm.p1f64c6c0} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.28767" />
                          <path d={svgPathsForm.p287a0c00} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.28767" />
                        </svg>
                      </div>
                      <p className="text-white font-normal text-[14px] sm:text-[17px] lg:text-[18px] leading-normal sm:leading-[1.55] lg:leading-[1.6]">
                        Certificación universitaria
                      </p>
                    </div>

                    {/* Benefit 4 */}
                    <div className="flex gap-3 sm:gap-4 lg:gap-4 items-center">
                      <div className="bg-white rounded-[12px] sm:rounded-[14px] lg:rounded-[15.505px] shadow-[0px_0px_25.419px_0px_rgba(0,0,0,0.3)] w-[42px] h-[42px] sm:w-[48px] sm:h-[48px] lg:w-[54.904px] lg:h-[54.904px] flex items-center justify-center shrink-0">
                        <svg className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] lg:w-[27.452px] lg:h-[27.452px]" fill="none" viewBox="0 0 27.4521 27.4521">
                          <path d={svgPathsForm.p342ff1c0} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.28767" />
                          <path d={svgPathsForm.p1d6f5000} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.28767" />
                          <path d={svgPathsForm.p108a2480} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.28767" />
                          <path d={svgPathsForm.p21a87ff0} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.28767" />
                        </svg>
                      </div>
                      <p className="text-white font-normal text-[14px] sm:text-[17px] lg:text-[18px] leading-normal sm:leading-[1.55] lg:leading-[1.6]">
                        Docentes de primer nivel
                      </p>
                    </div>

                    {/* Benefit 5 */}
                    <div className="flex gap-3 sm:gap-4 lg:gap-4 items-center">
                      <div className="bg-white rounded-[12px] sm:rounded-[14px] lg:rounded-[15.505px] shadow-[0px_0px_25.419px_0px_rgba(0,0,0,0.3)] w-[42px] h-[42px] sm:w-[48px] sm:h-[48px] lg:w-[54.904px] lg:h-[54.904px] flex items-center justify-center shrink-0">
                        <svg className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] lg:w-[27.452px] lg:h-[27.452px]" fill="none" viewBox="0 0 27.4521 27.4521">
                          <path d="M13.7266 8.00659V24.0203" stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.28767" />
                          <path d={svgPathsForm.p2c3b2270} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.28767" />
                        </svg>
                      </div>
                      <p className="text-white font-normal text-[14px] sm:text-[17px] lg:text-[18px] leading-normal sm:leading-[1.55] lg:leading-[1.6]">
                        Contenidos actualizados y aplicables
                      </p>
                    </div>

                    {/* Benefit 6 */}
                    <div className="flex gap-3 sm:gap-4 lg:gap-4 items-center">
                      <div className="bg-white rounded-[12px] sm:rounded-[14px] lg:rounded-[15.505px] shadow-[0px_0px_25.419px_0px_rgba(0,0,0,0.3)] w-[42px] h-[42px] sm:w-[48px] sm:h-[48px] lg:w-[54.904px] lg:h-[54.904px] flex items-center justify-center shrink-0">
                        <svg className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] lg:w-[27.452px] lg:h-[27.452px]" fill="none" viewBox="0 0 27.4521 27.4521">
                          <path d={svgPathsForm.p19629900} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.28767" />
                          <path d="M25.165 11.4385V18.3015" stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.28767" />
                          <path d={svgPathsForm.p3d158da0} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.28767" />
                        </svg>
                      </div>
                      <p className="text-white font-normal text-[14px] sm:text-[17px] lg:text-[18px] leading-normal sm:leading-[1.55] lg:leading-[1.6]">
                        Beca por mérito académico
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white rounded-[20px] sm:rounded-[24px] lg:rounded-[27px] shadow-[0px_4px_16.9px_0px_rgba(0,0,0,0.09)] w-full lg:w-[677px] min-h-[700px] sm:min-h-[850px] lg:min-h-[988px] lg:h-full lg:self-stretch border-2 sm:border-3 lg:border-4 border-[#d7d7d7] flex flex-col">
              <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 px-6 sm:px-8 lg:px-10 pt-6 sm:pt-8 lg:pt-10 pb-6 sm:pb-8 lg:pb-8 flex-1">
                <div className="flex flex-col gap-2 mb-2">
                  <div className="flex items-center justify-start">
                    <p className="font-medium text-[#ee8a28] text-[16px] sm:text-[19px] lg:text-[20px] tracking-[0.8px] sm:tracking-[1px] lg:tracking-[1.1732px] uppercase leading-[1.4] sm:leading-[1.45] lg:leading-normal">
                      Solicite información
                    </p>
                  </div>
                  <div className="flex items-center justify-start w-full">
                    <h2 className="text-[#111827] font-bold text-[28px] sm:text-[38px] lg:text-[48px] leading-[1.2] sm:leading-tight lg:leading-[1.3]">
                      Agenda una llamada informativa
                    </h2>
                  </div>
                </div>

                <div className="flex items-center justify-start mb-2">
                  <p className="text-black font-normal text-[14px] sm:text-[18px] lg:text-[18px] leading-normal sm:leading-[1.55] lg:leading-[1.6] w-full">
                    Complete el formulario y un asesor especializado se pondrá en contacto a la brevedad.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 lg:gap-5">
                  {/* Full Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="fullName" className="font-medium text-[#364153] text-[12px] sm:text-[13px] lg:text-[14px] leading-[1.4] sm:leading-[1.45] lg:leading-normal">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 lg:px-[16.614px] py-2.5 sm:py-3 lg:py-[12.461px] bg-[#f9fafb] rounded-[10px] sm:rounded-[12px] lg:rounded-[14.076px] border border-[#e5e7eb] text-[14px] sm:text-[15px] lg:text-[16.614px] placeholder:text-[15px] outline-none focus:ring-2 focus:ring-[#1c98b7]"
                      placeholder="Escriba sus nombres y apellidos"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-5">
                    {/* Phone */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="font-medium text-[#364153] text-[12px] sm:text-[13px] lg:text-[14px] leading-[1.4] sm:leading-[1.45] lg:leading-normal">
                        Celular *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-[16.614px] py-[12.461px] bg-[#f9fafb] rounded-[14.076px] border-[0.923px] border-[#e5e7eb] text-[16.614px] placeholder:text-[15px] outline-none focus:ring-2 focus:ring-[#1c98b7]"
                        placeholder="(+51) 999 999 999"
                      />
                    </div>

                    {/* DNI */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="dni" className="font-medium text-[#364153] text-[12px] sm:text-[13px] lg:text-[14px] leading-[1.4] sm:leading-[1.45] lg:leading-normal">
                        DNI *
                      </label>
                      <input
                        type="text"
                        id="dni"
                        name="dni"
                        value={formData.dni}
                        onChange={handleChange}
                        required
                        maxLength={8}
                        className="w-full px-[16.614px] py-[12.461px] bg-[#f9fafb] rounded-[14.076px] border-[0.923px] border-[#e5e7eb] text-[16.614px] placeholder:text-[15px] outline-none focus:ring-2 focus:ring-[#1c98b7]"
                        placeholder="12345678"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-medium text-[#364153] text-[12px] sm:text-[13px] lg:text-[14px] leading-[1.4] sm:leading-[1.45] lg:leading-normal">
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-[16.614px] py-[12.461px] bg-[#f9fafb] rounded-[14.076px] border-[0.923px] border-[#e5e7eb] text-[16.614px] placeholder:text-[15px] outline-none focus:ring-2 focus:ring-[#1c98b7]"
                      placeholder="ejemplo@correo.com"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-medium text-[#364153] text-[12px] sm:text-[13px] lg:text-[14px] leading-[1.4] sm:leading-[1.45] lg:leading-normal">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-[16.614px] py-[12.461px] bg-[#f9fafb] rounded-[14.076px] border-[0.923px] border-[#e5e7eb] text-[16.614px] placeholder:text-[15px] leading-[24.921px] outline-none focus:ring-2 focus:ring-[#1c98b7] resize-none"
                      placeholder="Indique brevemente el tipo de programa de capacitación que requiere su institución."
                    />
                  </div>

                  {/* Privacy Policy */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacy"
                      checked={acceptedPrivacy}
                      onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                      className="mt-1 w-[14.364px] h-[16.614px] text-[#1c98b7] border-gray-300 rounded focus:ring-[#1c98b7]"
                    />
                    <label htmlFor="privacy" className="text-[#4b5563] text-[12px] sm:text-[13px] lg:text-[14px] leading-normal sm:leading-[1.55] lg:leading-[1.6]">
                      Al enviar este formulario, declaro que he leído y acepto la{' '}
                      <button
                        type="button"
                        onClick={() => setShowPrivacyModal(true)}
                        className="text-[#1c98b7] font-medium hover:underline"
                      >
                        Política de Privacidad
                      </button>
                      .
                    </label>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !acceptedPrivacy}
                    className="w-full h-[50px] sm:h-[54px] lg:h-[58px] bg-[#1c98b7] text-white rounded-[14.076px] shadow-[0px_0px_23.075px_0px_rgba(0,0,0,0.3)] hover:bg-[#087A98] transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        <span className="font-semibold text-[14px] sm:text-[15px] lg:text-[16px] leading-normal">Enviando...</span>
                      </>
                    ) : (
                      <span className="font-semibold text-[14px] sm:text-[15px] lg:text-[16px] leading-normal">Enviar solicitud</span>
                    )}
                  </button>

                  {formSubmitted && (
                    <div className="flex items-center gap-2 text-green-700 bg-green-50 p-4 rounded-xl border border-green-200">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Solicitud enviada exitosamente</span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-linear-to-r from-[#0B95BA] to-[#087A98] p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-[#0B95BA]" />
                </div>
                <h2 className="text-white text-2xl font-bold">
                  Política de privacidad
                </h2>
              </div>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 text-sm text-gray-700 space-y-4 leading-[1.6]">
              <p className="text-justify">
                CEAR LATINOAMERICANO, en su calidad de responsable del tratamiento de datos personales, garantiza que la información proporcionada por los usuarios será tratada conforme a los principios de legalidad, consentimiento, finalidad, proporcionalidad y seguridad. El tratamiento de los datos se realiza exclusivamente para fines académicos, institucionales, administrativos e informativos relacionados con sus programas de capacitación y servicios arbitrales. En ningún caso los datos personales serán utilizados para finalidades distintas o incompatibles con aquellas para las cuales fueron recopilados.
              </p>

              <p className="text-justify">
                Los datos personales recopilados a través de formularios fsicos o digitales pueden incluir nombres y apellidos, documento de identidad, número telefónico, correo electrónico y cualquier otra información proporcionada voluntariamente por el titular. El suministro de dicha información es facultativo; sin embargo, la negativa a proporcionarla puede impedir la atención de solicitudes de información o la prestación de determinados servicios institucionales. El titular declara que los datos proporcionados son veraces, actualizados y exactos, liberando a CEAR LATINOAMERICANO de responsabilidad por información incorrecta o inexacta.
              </p>

              <p className="text-justify">
                CEAR LATINOAMERICANO no transfiere, comunica ni cede datos personales a terceros, salvo cuando exista una obligación legal, mandato de autoridad competente o consentimiento previo, expreso e informado del titular. En caso de encargos de tratamiento, estos se realizarán bajo acuerdos que garanticen el cumplimiento de la normativa vigente en materia de protección de datos personales. Asimismo, podrán realizarse transferencias cuando sean necesarias para el cumplimiento de obligaciones contractuales o institucionales debidamente informadas.
              </p>

              <p className="text-justify">
                CEAR LATINOAMERICANO implementa medidas técnicas, organizativas y legales razonables para garantizar la confidencialidad, integridad y disponibilidad de los datos personales. No obstante, el usuario reconoce que ningún sistema de seguridad es infalible y que CEAR LATINOAMERICANO no será responsable por accesos no autorizados derivados de causas ajenas a su control razonable. En caso de incidentes de seguridad, se adoptarán las acciones correctivas conforme a la normativa aplicable.
              </p>

              <p className="text-justify">
                El titular de los datos personales podrá ejercer sus derechos de acceso, rectificación, cancelación y oposición, conforme a los procedimientos y plazos previstos en la legislación vigente. Dichos derechos podrán ejercerse mediante comunicación dirigida al correo administracion@cearlatinoamericano.pe, acompañando la información necesaria para acreditar su identidad. CEAR LATINOAMERICANO se reserva el derecho de verificar la identidad del solicitante antes de atender cualquier requerimiento.
              </p>

              <p className="text-justify">
                El tratamiento de los datos personales se rige por la Ley Nº 29733, Ley de Protección de Datos Personales, su Reglamento aprobado por el Decreto Supremo Nº 016-2024-JUS, y las normas complementarias que resulten aplicables. Asimismo, se aplica lo dispuesto en el numeral 6 del artículo 2 de la Constitución Política del Perú, relativo a la protección de datos personales. El uso del sitio web y el envío de información mediante sus formularios implican la aceptación expresa de la presente Política de Privacidad.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}