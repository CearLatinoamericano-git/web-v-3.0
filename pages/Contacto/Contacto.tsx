import { ArrowRight, Download, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { storeContacto, storeQuejas, type ContactFormData, type SuggestionComplaintData } from '../../services/solicitudes';

import svgPathsHero from '../../imports/svg-w5f5at1h4o';

import svgPathsContact from '../../imports/svg-bqxdqeyz84';
import svgPathsSuggestions from '../../imports/svg-lyayekpngu';

const contactanos_fondo_gris = '/images/contact/contactanos fondo_gris.png';
const recepcionista = '/images/contact/recepcionista.webp';
const cumaso = '/images/contact/cumaso.jpg';

export function Contacto() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
    estado_politica: false
  });

  const [suggestionForm, setSuggestionForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    type: '',
    message: '',
    estado_politica: false
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [suggestionSubmitted, setSuggestionSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingSuggestion, setIsSubmittingSuggestion] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestionError, setSuggestionError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const contactoData: ContactFormData = {
        nombre: formData.fullName,
        celular: formData.phone,
        email: formData.email,
        asunto: formData.subject,
        mensaje: formData.message,
        estado_politica: formData.estado_politica,
      };

      await storeContacto(contactoData);
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        // Reset form
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          subject: '',
          message: '',
          estado_politica: false
        });
      }, 3000);
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Error desconocido');
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuggestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuggestionError(null);
    setIsSubmittingSuggestion(true);

    try {
      const quejasData: SuggestionComplaintData = {
        nombre: suggestionForm.fullName,
        celular: suggestionForm.phone || '',
        email: suggestionForm.email,
        mensaje: suggestionForm.message,
        es_sugerencia: suggestionForm.type === 'sugerencia',
        estado_politica: suggestionForm.estado_politica,
      };

      await storeQuejas(quejasData);
      setSuggestionSubmitted(true);
      setTimeout(() => {
        setSuggestionSubmitted(false);
        // Reset form
        setSuggestionForm({
          fullName: '',
          email: '',
          phone: '',
          type: '',
          message: '',
          estado_politica: false
        });
      }, 3000);
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Error desconocido');
      setSuggestionError(error.message);
    } finally {
      setIsSubmittingSuggestion(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSuggestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setSuggestionForm({
      ...suggestionForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - CONTACTO */}
      <section
        className="relative h-[659px] md:h-[750px] lg:h-[800px] xl:h-[850px] 2xl:h-[850px] overflow-hidden rounded-b-[20px] md:rounded-b-[25px] lg:rounded-b-[30px]"
        style={{ backgroundImage: "linear-gradient(5.70811deg, rgb(28, 152, 183) 5.3068%, rgb(86, 18, 137) 90.834%)" }}
      >
        {/* Background Image - Gris con opacidad */}
        <div className="absolute h-[550px] md:h-[620px] lg:h-[680px] xl:h-[680px] 2xl:h-[750px] left-0 md:left-[40px] lg:left-[60px] xl:left-[100px] 2xl:left-[150px] top-[60px] md:top-[90px] lg:top-[90px] xl:top-[100px] 2xl:top-[110px] w-full md:w-[850px] lg:w-[850px] xl:w-[1000px] 2xl:w-[1200px] px-4 md:px-0">
          <div className="absolute inset-0 mix-blend-multiply opacity-55 overflow-hidden pointer-events-none">
            <img
              src={contactanos_fondo_gris}
              alt=""
              className="absolute h-full left-0 max-w-none top-0 w-full object-cover"
            />
          </div>
        </div>

        {/* Imagen de recepcionista - Card derecha */}
        <div className="hidden xl:block absolute right-[40px] xl:right-[60px] 2xl:right-[100px] top-[190px] lg:top-[130px] xl:top-[170px] 2xl:top-[190px] w-[420px] lg:w-[320px] xl:w-[420px] 2xl:w-[540px] h-[380px] lg:h-[300px] xl:h-[380px] 2xl:h-[487px] rounded-[20px] lg:rounded-[16px] xl:rounded-[18px] 2xl:rounded-[20px] overflow-hidden z-10">
          <div className="flex items-center justify-center size-full">
            <div className="flex-none rotate-180 scale-y-[-100%] size-full">
              <div className="relative size-full overflow-hidden rounded-[inherit]">
                <img
                  src={recepcionista}
                  alt="Recepcionista CEAR"
                  className="w-full h-full object-cover object-center pt-[-8px] pr-[0px] pb-[0px] pl-[0px] mt-[1px] mr-[0px] mb-[0px] ml-[0px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Wave SVGs at bottom */}
        <div className="absolute left-0 bottom-0 w-full h-[144px]">
          <div className="absolute inset-[30.83%_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1643.21 98.4742">
              <path d={svgPathsHero.p21097b90} fill="white" fillOpacity="0.1" />
            </svg>
          </div>
          <div className="absolute inset-[47.92%_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1643.21 74.1523">
              <path d={svgPathsHero.p3cb85d00} fill="white" fillOpacity="0.03" />
            </svg>
          </div>
        </div>

        {/* Content Container */}
        <div className="absolute left-4 sm:left-8 md:left-[80px] lg:left-[100px] xl:left-[130px] 2xl:left-[200px] top-[100px] sm:top-[120px] md:top-[160px] lg:top-[180px] xl:top-[200px] 2xl:top-[230px] w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] md:w-[520px] lg:w-[460px] xl:w-[500px] 2xl:w-[700px] z-10">
          <div className="flex flex-col gap-[13px] md:gap-[8px] lg:gap-[10px] xl:gap-[12px] 2xl:gap-[13px] items-start">
            {/* Text Content */}
            <div className="flex flex-col items-start w-full gap-[13px] md:gap-[8px] lg:gap-[10px] xl:gap-[12px] 2xl:gap-[13px]">
              {/* Title */}
              <div className="flex items-start justify-start w-full">
                <h1 className="font-bold leading-[54px] md:leading-[42px] lg:leading-[48px] xl:leading-[54px] 2xl:leading-[62px] sm:text-[52px] md:text-[38px] lg:text-[44px] xl:text-[50px] 2xl:text-[62.288px] text-white tracking-[-0.9258px] md:tracking-[-0.6px] lg:tracking-[-0.7px] xl:tracking-[-0.8px] 2xl:tracking-[-0.9258px] w-full text-[48px] drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
                  ¿Desea comunicarse con nosotros?
                </h1>
              </div>

              {/* Description */}
              <div className="flex items-start justify-start w-full">
                <p className="font-semibold leading-[28px] sm:leading-[32px] md:leading-[26px] lg:leading-[30px] xl:leading-[34px] 2xl:leading-[37px] sm:text-[24px] md:text-[18px] lg:text-[21px] xl:text-[24px] 2xl:text-[30.867px] text-[rgba(255,255,255,0.85)] tracking-[-0.4156px] md:tracking-[-0.3px] lg:tracking-[-0.35px] xl:tracking-[-0.38px] 2xl:tracking-[-0.4156px] w-full text-[20px] max-w-[90%] pt-0 pr-0 pb-0 pl-0 m-0 text-justify">
                  Estamos a su disposición para atender todas sus dudas, consultas y preguntas, brindándole una orientación clara y oportuna a través de nuestro equipo especializado.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-[29.661px] md:gap-[14px] lg:gap-[18px] xl:gap-[22px] 2xl:gap-[29.661px] items-start w-full md:mt-[12px] lg:mt-[16px] xl:mt-[20px] 2xl:mt-[24px] mt-[8px] px-0 py-[16px] md:py-[10px] lg:py-[12px] xl:py-[14px] 2xl:py-[16px]">
              {/* Enviar mensajes - Orange button */}
              <a
                href="#contact-form"
                className="bg-[#ee8a28] h-[44px] sm:h-[50px] md:h-[46px] lg:h-[50px] xl:h-[54px] 2xl:h-[58px] rounded-[12px] md:rounded-[10px] lg:rounded-[11px] xl:rounded-[12px] 2xl:rounded-[13px] w-full sm:w-[260px] md:w-[220px] lg:w-[240px] xl:w-[260px] 2xl:w-[280px] hover:bg-[#d67821] transition-colors"
              >
                <div className="flex gap-[10px] md:gap-[7px] lg:gap-[8px] xl:gap-[9px] 2xl:gap-[10px] items-center justify-center h-full px-3 md:px-2.5 lg:px-3 xl:px-3.5 2xl:px-4">
                  <span className="font-semibold leading-[22px] md:leading-[18px] lg:leading-[20px] xl:leading-[22px] 2xl:leading-[24px] text-[14px] sm:text-[15px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[17px] text-center text-white whitespace-nowrap">
                    Enviar mensajes
                  </span>
                  <div className="relative shrink-0 size-[16px] md:size-[14px] lg:size-[15px] xl:size-[16px] 2xl:size-[18px]">
                    <ArrowRight className="w-full h-full text-white" strokeWidth={1.72215} />
                  </div>
                </div>
              </a>

              {/* Descargar brochure - Transparent button */}
              <button className="bg-[rgba(255,255,255,0.1)] h-[44px] sm:h-[50px] md:h-[46px] lg:h-[50px] xl:h-[54px] 2xl:h-[58px] rounded-[12px] md:rounded-[10px] lg:rounded-[11px] xl:rounded-[12px] 2xl:rounded-[13px] w-full sm:w-[260px] md:w-[220px] lg:w-[240px] xl:w-[260px] 2xl:w-[280px] border-[1.5px] md:border-[1.3px] lg:border-[1.4px] xl:border-[1.5px] 2xl:border-[1.6px] border-solid border-white hover:bg-[rgba(255,255,255,0.2)] transition-colors">
                <div className="flex gap-[10px] md:gap-[7px] lg:gap-[8px] xl:gap-[9px] 2xl:gap-[10px] items-center justify-center h-full p-[1.837px] px-3 md:px-2.5 lg:px-3 xl:px-3.5 2xl:px-4">
                  <div className="relative shrink-0 size-[16px] md:size-[14px] lg:size-[15px] xl:size-[16px] 2xl:size-[18px]">
                    <Download className="w-full h-full text-white" strokeWidth={1.72215} />
                  </div>
                  <span className="font-semibold leading-[22px] md:leading-[18px] lg:leading-[20px] xl:leading-[22px] 2xl:leading-[24px] text-[14px] sm:text-[15px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[17px] text-center text-white whitespace-nowrap">
                    Descargar brochure
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <section id="contact-form" className="bg-white pt-[60px] md:pt-[90px] pb-[16px] px-4 sm:px-8 lg:px-[111px]">
        <div className="flex flex-col items-center w-full max-w-[1440px] mx-auto">
          <div className="flex flex-col items-start w-full">
            {/* Section Header */}
            <div className="flex flex-col items-start w-full mb-[30px] md:mb-[50px]">
              {/* Title */}
              <div className="flex items-center justify-center w-full mb-[15px] md:mb-[20px]">
                <div className="flex flex-col sm:flex-row gap-[2px] items-center justify-center">
                  <div className="flex items-center justify-center p-[10px]">
                    <p className="font-bold leading-[28px] sm:leading-[34.286px] text-[32px] sm:text-[48px] lg:text-[64px] text-[#111827] text-center tracking-[1.2px] uppercase">
                      ¿Tiene alguna
                    </p>
                  </div>
                  <div className="flex items-center justify-center p-[10px]">
                    <p className="font-bold leading-[28px] sm:leading-[34.286px] text-[32px] sm:text-[48px] lg:text-[64px] text-center tracking-[1.2px] uppercase" style={{ color: '#1c98b7' }}>
                      consulta?
                    </p>
                  </div>
                </div>
              </div>

              {/* Subtitle */}
              <div className="flex items-center justify-center w-full">
                <div className="flex items-center justify-center pb-[30px] md:pb-[50px] pt-[10px] md:pt-[20px] px-[10px] w-full">
                  <p className="font-normal leading-[28px] sm:leading-[38px] lg:leading-[53px] text-[20px] sm:text-[32px] lg:text-[48px] text-[#4b5563] text-center w-full max-w-[1125px]">
                    Complete el formulario y nos pondremos en contacto con usted a la brevedad
                  </p>
                </div>
              </div>
            </div>

            {/* Form and Contact Card Container */}
            <div className="flex flex-col lg:flex-row gap-[20.779px] items-start lg:items-stretch w-full">
              {/* Contact Form */}
              <div className="bg-white flex flex-col min-h-[659px] lg:h-[659px] items-start pb-[20px] md:pb-[25px] pt-[20px] md:pt-[25px] px-[20px] md:px-[30px] rounded-[18.701px] w-full lg:w-[1070px] relative overflow-hidden">
                <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[2.078px] border-solid inset-0 pointer-events-none rounded-[18.701px]" />
                <form onSubmit={handleSubmit} className="flex flex-col gap-[12px] md:gap-[14px] items-start w-full h-full flex-1 justify-between">
                  {/* Name and Phone Row */}
                  <div className="gap-[12px] md:gap-[14px] grid grid-cols-1 md:grid-cols-2 w-full flex-shrink-0">
                    {/* Name */}
                    <div className="flex flex-col gap-[5px] items-start">
                      <div className="h-[20px] w-full relative">
                        <p className="absolute font-semibold leading-[20px] left-0 text-[#364153] text-[14px] md:text-[15px] top-0">
                          Nombre completo *
                        </p>
                      </div>
                      <div className="bg-[#f9fafb] h-[48px] md:h-[50px] relative rounded-[12px] w-full">
                        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full h-full px-[14px] md:px-[16px] py-[10px] bg-transparent text-[#111827] text-[15px] md:text-[16px] placeholder-[#99a1af] outline-none"
                            placeholder="Juan Pérez"
                          />
                        </div>
                        <div aria-hidden="true" className="absolute border-[#0b95ba] border-[2.078px] border-solid inset-0 pointer-events-none rounded-[12px]" />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-[5px] items-start">
                      <div className="h-[20px] w-full relative">
                        <p className="absolute font-semibold leading-[20px] left-0 text-[#364153] text-[14px] md:text-[15px] top-0">
                          Teléfono *
                        </p>
                      </div>
                      <div className="bg-[#f9fafb] h-[48px] md:h-[50px] relative rounded-[12px] w-full">
                        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full h-full px-[14px] md:px-[16px] py-[10px] bg-transparent text-[#111827] text-[15px] md:text-[16px] placeholder-[#99a1af] outline-none"
                            placeholder="+51 999 999 999"
                          />
                        </div>
                        <div aria-hidden="true" className="absolute border-[#0b95ba] border-[2.078px] border-solid inset-0 pointer-events-none rounded-[12px]" />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-[5px] items-start w-full flex-shrink-0">
                    <div className="h-[20px] w-full relative">
                      <p className="absolute font-semibold leading-[20px] left-0 text-[#364153] text-[14px] md:text-[15px] top-0">
                        Correo electrónico *
                      </p>
                    </div>
                    <div className="bg-[#f9fafb] h-[48px] md:h-[50px] relative rounded-[12px] w-full">
                      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full h-full px-[14px] md:px-[16px] py-[10px] bg-transparent text-[#111827] text-[15px] md:text-[16px] placeholder-[#99a1af] outline-none"
                          placeholder="juan.perez@ejemplo.com"
                        />
                      </div>
                      <div aria-hidden="true" className="absolute border-[#0b95ba] border-[2.078px] border-solid inset-0 pointer-events-none rounded-[12px]" />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-[5px] items-start w-full flex-shrink-0">
                    <div className="h-[20px] w-full relative">
                      <p className="absolute font-semibold leading-[20px] left-0 text-[#364153] text-[14px] md:text-[15px] top-0">
                        Asunto *
                      </p>
                    </div>
                    <div className="bg-[#f9fafb] h-[48px] md:h-[50px] relative rounded-[12px] w-full">
                      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full h-full px-[14px] md:px-[16px] py-[10px] bg-transparent text-[#111827] text-[15px] md:text-[16px] placeholder-[#99a1af] outline-none"
                          placeholder="Indique el asunto de su consulta"
                        />
                      </div>
                      <div aria-hidden="true" className="absolute border-[#0b95ba] border-[2.078px] border-solid inset-0 pointer-events-none rounded-[12px]" />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-[5px] items-start w-full flex-shrink-0">
                    <div className="h-[20px] w-full relative">
                      <p className="absolute font-semibold leading-[20px] left-0 text-[#364153] text-[14px] md:text-[15px] top-0">
                        Mensaje *
                      </p>
                    </div>
                    <div className="bg-[#f9fafb] h-[100px] md:h-[110px] relative rounded-[12px] w-full">
                      <div className="overflow-clip rounded-[inherit] size-full">
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="w-full h-full px-[14px] md:px-[16px] py-[10px] bg-transparent text-[#111827] text-[15px] md:text-[16px] leading-[22px] placeholder-[#99a1af] outline-none resize-none"
                          placeholder="Describa brevemente su consulta o requerimiento"
                        />
                      </div>
                      <div aria-hidden="true" className="absolute border-[#0b95ba] border-[2.078px] border-solid inset-0 pointer-events-none rounded-[12px]" />
                    </div>
                  </div>

                  {/* Política de privacidad */}
                  <div className="flex items-start gap-2 flex-shrink-0 py-1">
                    <input
                      type="checkbox"
                      id="estado_politica"
                      checked={formData.estado_politica}
                      onChange={(e) => setFormData({ ...formData, estado_politica: e.target.checked })}
                      className="mt-0.5 w-4 h-4 text-[#0B95BA] border-gray-300 rounded focus:ring-[#0B95BA] flex-shrink-0"
                      required
                    />
                    <label htmlFor="estado_politica" className="text-xs md:text-sm text-gray-600 leading-tight">
                      Acepto la política de privacidad y tratamiento de datos personales *
                    </label>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-2 rounded-xl border-2 border-red-200 flex-shrink-0 w-full">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span className="font-semibold text-xs md:text-sm">{error}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.estado_politica}
                    className="bg-[#ee8a28] h-[56px] md:h-[64px] relative rounded-[12px] shadow-[0px_0px_25.974px_0px_rgba(0,0,0,0.3)] w-full hover:bg-[#d67821] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center gap-[10px]">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin text-white" />
                          <span className="font-semibold leading-[20px] md:leading-[24px] text-[14px] md:text-[16px] text-center text-white">
                            Enviando...
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="size-[18px] md:size-[20px]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.3766 23.3766">
                              <g>
                                <path d={svgPathsContact.p2fdf5600} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94805" />
                                <path d={svgPathsContact.p3babb700} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94805" />
                              </g>
                            </svg>
                          </div>
                          <span className="font-semibold leading-[20px] md:leading-[24px] text-[14px] md:text-[16px] text-center text-white">
                            Enviar mensaje
                          </span>
                        </>
                      )}
                    </div>
                  </button>

                  {formSubmitted && (
                    <div className="flex items-center gap-2 text-[#0BDDB3] bg-[#0BDDB3]/10 p-2 rounded-xl border-2 border-[#0BDDB3]/30 animate-[fadeIn_0.3s_ease-in-out] flex-shrink-0 w-full">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span className="font-semibold text-xs md:text-sm">¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.</span>
                    </div>
                  )}
                </form>
              </div>

              {/* Contact Info Card - Blue CEAR */}
              <div className="bg-[#0b95ba] flex flex-col min-h-[659px] lg:h-[659px] items-center justify-between py-[28.052px] rounded-[18.701px] shadow-[0px_0px_25.974px_0px_rgba(0,0,0,0.3)] w-full lg:w-[349px] flex-shrink-0">
                {/* Email Section */}
                <div className="w-full flex flex-col items-center px-4 flex-shrink-0">
                  <div className="bg-[rgba(255,255,255,0.2)] flex items-center justify-center rounded-full size-[65.455px] mb-4 flex-shrink-0">
                    <div className="size-[28.052px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.0519 28.0519">
                        <g>
                          <path d={svgPathsContact.p11764500} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33766" />
                          <path d={svgPathsContact.pae7a000} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33766" />
                        </g>
                      </svg>
                    </div>
                  </div>
                  <h4 className="font-semibold text-[18.701px] text-white mb-3 text-center">
                    Correo electrónico
                  </h4>
                  <div className="flex flex-col gap-1 w-full">
                    <a
                      href="mailto:academico@cearlatinoamericano.edu.pe"
                      className="font-normal text-[14px] text-[rgba(255,255,255,0.9)] text-center hover:text-white transition-colors break-words px-2"
                    >
                      academico@cearlatinoamericano.edu.pe
                    </a>
                    <a
                      href="mailto:area_academica@cearlatinoamericano.pe"
                      className="font-normal text-[14px] text-[rgba(255,255,255,0.9)] text-center hover:text-white transition-colors break-words px-2"
                    >
                      area_academica@cearlatinoamericano.pe
                    </a>
                  </div>
                </div>

                {/* Phone Section */}
                <div className="w-full flex flex-col items-center px-4 flex-shrink-0">
                  <div className="bg-[rgba(255,255,255,0.2)] flex items-center justify-center rounded-full size-[65.455px] mb-4 flex-shrink-0">
                    <div className="size-[28.052px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.0519 28.0519">
                        <g>
                          <path d={svgPathsContact.p3e95e680} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33766" />
                        </g>
                      </svg>
                    </div>
                  </div>
                  <h4 className="font-semibold text-[18.701px] text-white mb-3 text-center">
                    Teléfonos
                  </h4>
                  <div className="flex flex-col gap-1 w-full">
                    <a
                      href="tel:+5113978586"
                      className="font-normal text-[16.364px] text-[rgba(255,255,255,0.9)] text-center hover:text-white transition-colors"
                    >
                      (01) 397 8586 - Anexo 103
                    </a>
                    <a
                      href="https://wa.me/51986605219"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-normal text-[16.364px] text-[rgba(255,255,255,0.9)] text-center hover:text-white transition-colors"
                    >
                      (+51) 986 605 219
                    </a>
                  </div>
                </div>

                {/* Location Section */}
                <div className="w-full flex flex-col items-center px-4 flex-shrink-0">
                  <div className="bg-[rgba(255,255,255,0.2)] flex items-center justify-center rounded-full size-[65.455px] mb-4 flex-shrink-0">
                    <div className="size-[28.052px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.0519 28.0519">
                        <g>
                          <path d={svgPathsContact.p164a4a00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33766" />
                          <path d={svgPathsContact.p19151180} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33766" />
                        </g>
                      </svg>
                    </div>
                  </div>
                  <h4 className="font-semibold text-[18.701px] text-white mb-3 text-center">
                    Ubicación de oficina
                  </h4>
                  <div className="text-center font-normal text-[16.364px] text-[rgba(255,255,255,0.9)]">
                    <p>Av. Faustino Sánchez Carrión</p>
                    <p>615, Jesús María - Oficina 306</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div id="map" className="mt-16 rounded-2xl overflow-hidden shadow-xl border-2 border-gray-200 w-full" style={{ height: '450px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.3076267890234!2d-77.05286!3d-12.07425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8c89e5e5e5f%3A0x1234567890abcdef!2sAv.%20Faustino%20S%C3%A1nchez%20Carri%C3%B3n%20615%2C%20Jes%C3%BAs%20Mar%C3%ADa%2C%20Lima%2C%20Peru!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación CEAR Latinoamericano"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Suggestions Section */}
      <section className="bg-white pt-[30px] sm:pt-[50px] px-4 sm:px-8 lg:px-[111px] pb-[60px] sm:pb-[90px]">
        <div className="flex flex-col items-center w-full max-w-[1440px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col items-start py-[20px] sm:py-[39px] w-full px-[0px]">
            {/* Title - ¡Su opinión es IMPORTANTE! */}
            <div className="flex flex-col sm:flex-row gap-[5px] sm:gap-[10px] items-center justify-center w-full">
              <div className="flex items-center justify-center p-[5px] sm:p-[10px]">
                <p className="font-bold leading-[28px] sm:leading-[34.286px] text-[36px] sm:text-[48px] lg:text-[64px] text-[#111827] text-center tracking-[1.2px] uppercase">
                  ¡Su opinión es
                </p>
              </div>
              <div className="flex items-center justify-center p-[5px] sm:p-[10px]">
                <p className="font-bold leading-[28px] sm:leading-[34.286px] text-[36px] sm:text-[48px] lg:text-[64px] text-[#ee8a28] text-center tracking-[1.2px] uppercase">
                  importante!
                </p>
              </div>
            </div>

            {/* Subtitle */}
            <div className="flex flex-col items-center w-full">
              <div className="flex items-center justify-center p-[10px]">
                <p className="font-normal leading-[24px] sm:leading-[31.5px] text-[16px] sm:text-[18px] lg:text-[22.5px] text-[#4b5563] text-center px-4">
                  Trabajamos constantemente para mejorar y ofrecer una mejor experiencia
                </p>
              </div>
            </div>
          </div>

          {/* Main Content Container */}
          <div className="flex flex-col items-start px-0 sm:px-[20px] lg:px-[36px] w-full">
            <div className="gap-[30px] lg:gap-[54px] grid grid-cols-1 lg:grid-cols-2 w-full">
              {/* Left Column - Info */}
              <div className="flex flex-col gap-[24px] sm:gap-[36px] items-start">
                {/* Paragraph */}
                <div className="w-full">
                  <p className="font-normal leading-[28px] sm:leading-[32.906px] text-[#364153] text-[16px] sm:text-[18px] lg:text-[20.25px] text-justify">
                    Este espacio ha sido habilitado para que pueda remitir sus sugerencias o reclamos de manera directa, segura y confidencial. Cada comunicación será analizada cuidadosamente en el marco de nuestro compromiso con la mejora continua de nuestros servicios.
                  </p>
                </div>

                {/* Cards Container */}
                <div className="flex flex-col gap-[18px] items-start w-full">
                  {/* Sugerencia Card - Blue Gradient */}
                  <div className="bg-gradient-to-b from-[#0b95ba] to-[#087a98] relative rounded-[18px] w-full">
                    <div aria-hidden="true" className="absolute border-2 border-[#0b95ba] border-solid inset-0 pointer-events-none rounded-[18px]" />
                    <div className="flex flex-col items-start pb-[18px] sm:pt-[29px] px-[20px] sm:px-[29px] pt-[20px] pr-[20px] pl-[20px]">
                      <div className="flex flex-col sm:flex-row gap-[18px] items-start w-full">
                        {/* Icon */}
                        <div className="bg-[#0b95ba] relative rounded-[15.25px] shrink-0 size-[50px] sm:size-[63px]">
                          <div className="flex items-center justify-center size-full">
                            <div className="size-[25px] sm:size-[31.5px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.5 31.5">
                                <g>
                                  <path d={svgPathsSuggestions.p8ece400} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                        {/* Text Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col gap-[9px] items-start">
                            <h4 className="font-semibold leading-[28px] sm:leading-[31.5px] text-[20px] sm:text-[22.5px] text-white">
                              Sugerencia
                            </h4>
                            <p className="font-normal leading-[24px] sm:leading-[29.25px] text-[15px] sm:text-[18px] text-white">
                              Propuesta o recomendación orientada a optimizar la calidad de nuestros servicios y fortalecer la experiencia de quienes interactúan con nuestra institución.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reclamo Card - Orange Gradient */}
                  <div className="relative rounded-[18px] w-full" style={{ backgroundImage: "linear-gradient(164.173deg, rgba(255, 105, 0, 0.05) 0%, rgba(255, 105, 0, 0.1) 100%)" }}>
                    <div aria-hidden="true" className="absolute border-2 border-[rgba(255,105,0,0.2)] border-solid inset-0 pointer-events-none rounded-[18px]" />
                    <div className="flex flex-col items-start pb-[18px] sm:pt-[29px] px-[20px] sm:px-[29px] pt-[20px] pr-[20px] pl-[20px]">
                      <div className="flex flex-col sm:flex-row gap-[18px] items-start w-full">
                        {/* Icon */}
                        <div className="bg-[#ff6900] relative rounded-[15.25px] shrink-0 size-[50px] sm:size-[63px]">
                          <div className="flex items-center justify-center size-full">
                            <div className="size-[25px] sm:size-[31.5px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.5 31.5">
                                <g>
                                  <path d={svgPathsSuggestions.p2944a700} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                                  <path d="M15.75 11.0774V16.3274" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                                  <path d="M15.75 21.5774H15.7631" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                        {/* Text Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col gap-[9px] items-start">
                            <h4 className="font-semibold leading-[28px] sm:leading-[31.5px] text-[#111827] text-[20px] sm:text-[22.5px]">
                              Reclamo
                            </h4>
                            <p className="font-normal leading-[24px] sm:leading-[29.25px] text-[#4b5563] text-[15px] sm:text-[18px]">
                              Manifestación de insatisfacción relacionada con nuestros servicios, respecto de la cual nos comprometemos brindar una respuesta en un plazo de 7 días hábiles.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="flex flex-col gap-[14px] items-start w-full">
                {/* Form Container */}
                <div className="bg-white relative rounded-[27px] w-full">
                  <div aria-hidden="true" className="absolute border-2 border-[rgba(11,149,186,0.2)] border-solid inset-0 pointer-events-none rounded-[27px] shadow-[0px_10px_40px_0px_rgba(11,149,186,0.15)]" />
                  <div className="flex flex-col items-start pb-[33px] sm:pt-[38px] px-[24px] sm:px-[38px] pt-[38px] pr-[38px] pl-[38px]">
                    <form onSubmit={handleSuggestionSubmit} className="flex flex-col gap-[20px] sm:gap-[27px] items-start w-full">
                      {/* Tipo Dropdown */}
                      <div className="flex flex-col gap-[9px] items-start w-full">
                        <div className="w-full">
                          <p className="font-semibold leading-[22.5px] text-[#364153] text-[14px] sm:text-[15.75px]">
                            Tipo *
                          </p>
                        </div>
                        <div className="bg-[#f9fafb] h-[50px] sm:h-[58.5px] relative rounded-[15.25px] w-full">
                          <div aria-hidden="true" className="absolute border-2 border-[#0b95ba] border-solid inset-0 pointer-events-none rounded-[15.25px]" />
                          <select
                            name="type"
                            value={suggestionForm.type}
                            onChange={handleSuggestionChange}
                            required
                            className="w-full h-full px-[15px] sm:px-[18px] py-[12px] sm:py-[15.75px] bg-transparent text-[#111827] text-[16px] sm:text-[18px] outline-none appearance-none cursor-pointer"
                            style={{ color: suggestionForm.type ? '#111827' : '#99a1af' }}
                          >
                            <option value="" disabled>Seleccione el tipo de comunicación</option>
                            <option value="sugerencia">Sugerencia</option>
                            <option value="reclamo">Reclamo</option>
                          </select>
                        </div>
                      </div>

                      {/* Nombre completo */}
                      <div className="flex flex-col gap-[9px] items-start w-full">
                        <div className="w-full">
                          <p className="font-semibold leading-[22.5px] text-[#364153] text-[14px] sm:text-[15.75px]">
                            Nombre completo *
                          </p>
                        </div>
                        <div className="bg-[#f9fafb] h-[50px] sm:h-[62.5px] relative rounded-[15.25px] w-full">
                          <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                            <input
                              type="text"
                              name="fullName"
                              value={suggestionForm.fullName}
                              onChange={handleSuggestionChange}
                              required
                              className="w-full h-full px-[15px] sm:px-[18px] py-[12px] sm:py-[15.75px] bg-transparent text-[#111827] text-[16px] sm:text-[18px] placeholder-[#99a1af] outline-none"
                              placeholder="Ingrese su nombre completo"
                            />
                          </div>
                          <div aria-hidden="true" className="absolute border-2 border-[#0b95ba] border-solid inset-0 pointer-events-none rounded-[15.25px]" />
                        </div>
                      </div>

                      {/* Correo electrónico */}
                      <div className="flex flex-col gap-[9px] items-start w-full">
                        <div className="w-full">
                          <p className="font-semibold leading-[22.5px] text-[#364153] text-[14px] sm:text-[15.75px]">
                            Correo electrónico *
                          </p>
                        </div>
                        <div className="bg-[#f9fafb] h-[50px] sm:h-[62.5px] relative rounded-[15.25px] w-full">
                          <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                            <input
                              type="email"
                              name="email"
                              value={suggestionForm.email}
                              onChange={handleSuggestionChange}
                              required
                              className="w-full h-full px-[15px] sm:px-[18px] py-[12px] sm:py-[15.75px] bg-transparent text-[#111827] text-[16px] sm:text-[18px] placeholder-[#99a1af] outline-none"
                              placeholder="ejemplo@correo.com"
                            />
                          </div>
                          <div aria-hidden="true" className="absolute border-2 border-[#0b95ba] border-solid inset-0 pointer-events-none rounded-[15.25px]" />
                        </div>
                      </div>

                      {/* Teléfono */}
                      <div className="flex flex-col gap-[9px] items-start w-full">
                        <div className="w-full">
                          <p className="font-semibold leading-[22.5px] text-[#364153] text-[14px] sm:text-[15.75px]">
                            Teléfono
                          </p>
                        </div>
                        <div className="bg-[#f9fafb] h-[50px] sm:h-[62.5px] relative rounded-[15.25px] w-full">
                          <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                            <input
                              type="tel"
                              name="phone"
                              value={suggestionForm.phone}
                              onChange={handleSuggestionChange}
                              className="w-full h-full px-[15px] sm:px-[18px] py-[12px] sm:py-[15.75px] bg-transparent text-[#111827] text-[16px] sm:text-[18px] placeholder-[#99a1af] outline-none"
                              placeholder="+51 999 999 999"
                            />
                          </div>
                          <div aria-hidden="true" className="absolute border-2 border-[#0b95ba] border-solid inset-0 pointer-events-none rounded-[15.25px]" />
                        </div>
                      </div>

                      {/* Mensaje */}
                      <div className="flex flex-col gap-[9px] items-start w-full">
                        <div className="w-full">
                          <p className="font-semibold leading-[22.5px] text-[#364153] text-[14px] sm:text-[15.75px]">
                            Mensaje *
                          </p>
                        </div>
                        <div className="bg-[#f9fafb] h-[140px] sm:h-[170.5px] relative rounded-[15.25px] w-full">
                          <div className="overflow-clip rounded-[inherit] size-full">
                            <textarea
                              name="message"
                              value={suggestionForm.message}
                              onChange={handleSuggestionChange}
                              required
                              className="w-full h-full px-[15px] sm:px-[18px] py-[12px] sm:py-[15.75px] bg-transparent text-[#111827] text-[16px] sm:text-[18px] leading-[24px] sm:leading-[27px] placeholder-[#99a1af] outline-none resize-none"
                              placeholder="Detalle su sugerencia o reclamo de manera clara y precisa"
                            />
                          </div>
                          <div aria-hidden="true" className="absolute border-2 border-[#0b95ba] border-solid inset-0 pointer-events-none rounded-[15.25px]" />
                        </div>
                      </div>

                      {/* Política de privacidad */}
                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          id="suggestion_estado_politica"
                          checked={suggestionForm.estado_politica}
                          onChange={(e) => setSuggestionForm({ ...suggestionForm, estado_politica: e.target.checked })}
                          className="mt-1 w-4 h-4 text-[#0B95BA] border-gray-300 rounded focus:ring-[#0B95BA]"
                          required
                        />
                        <label htmlFor="suggestion_estado_politica" className="text-sm text-gray-600">
                          Acepto la política de privacidad y tratamiento de datos personales *
                        </label>
                      </div>

                      {/* Error Message */}
                      {suggestionError && (
                        <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-xl border-2 border-red-200">
                          <AlertCircle className="w-6 h-6 flex-shrink-0" />
                          <span className="font-semibold text-sm">{suggestionError}</span>
                        </div>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmittingSuggestion || !suggestionForm.estado_politica}
                        className="bg-[#0b95ba] h-[54px] sm:h-[63px] relative rounded-[15.25px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] w-full hover:bg-[#087a98] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmittingSuggestion ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin text-white" />
                            <p className="font-semibold leading-[24px] sm:leading-[27px] text-[16px] sm:text-[18px] text-center text-white">
                              Enviando...
                            </p>
                          </>
                        ) : (
                          <p className="font-semibold leading-[24px] sm:leading-[27px] text-[16px] sm:text-[18px] text-center text-white">
                            Enviar
                          </p>
                        )}
                      </button>

                      {suggestionSubmitted && (
                        <div className="flex items-center gap-3 text-[#0BDDB3] bg-[#0BDDB3]/10 p-4 rounded-xl border-2 border-[#0BDDB3]/30 animate-[fadeIn_0.3s_ease-in-out]">
                          <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                          <span className="font-semibold">Su {suggestionForm.type} ha sido enviada exitosamente</span>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA with Lima Image */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={cumaso}
            alt="Lima - Perú"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/80 to-gray-900/90" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-white mb-6 text-4xl lg:text-5xl leading-tight">
            ¿Listo para dar el siguiente paso en su{' '}
            <span className="text-[#0B95BA]">desarrollo profesional?</span>
          </h2>
          <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
            Descubra nuestros programas de formación especializada
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/courses"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0B95BA] text-white rounded-xl shadow-xl hover:bg-[#087A98] hover:scale-105 transition-all font-semibold"
            >
              Ver programas
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl shadow-xl hover:scale-105 transition-all font-semibold"
            >
              Agendar asesoría
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

