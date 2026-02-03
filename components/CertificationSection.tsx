import { motion } from 'motion/react';
import { Award, Shield } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import CearLogoWhite from '../imports/Capa1-2854-459';

interface CertificationSectionProps {
  certification: string;
  certificationImage?: string;
  institutionLogos?: string[];
}

export function CertificationSection({
  certification: _certification,
  certificationImage,
  institutionLogos = []
}: CertificationSectionProps) {
  // Use provided certification image (no default to preserve placeholder behavior)
  const displayCertImage = certificationImage;
  const displayLogos = institutionLogos.length > 0 ? institutionLogos : [];

  return (
    <section className="py-16 lg:py-20 xl:py-24 relative overflow-hidden" style={{ backgroundImage: "linear-gradient(-90deg, rgb(36, 137, 178) 8.5542%, rgb(84, 45, 174) 205.31%)" }}>
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bg-[#1c98b7] blur-[71.203px] right-0 top-[94.73px] w-[698.678px] h-[698.678px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[432px] h-[432px] bg-[rgba(8,122,152,0.12)] rounded-full blur-[64px]" />
      </div>

      {/* White Border */}
      <div className="absolute inset-0 m-6 lg:m-10 xl:m-[43px] border-[3px] lg:border-4 border-solid border-white rounded-[28px] lg:rounded-[34px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-[70px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-1 flex flex-col justify-between min-h-full"
          >
            {/* Title */}
            <div className="mb-4 sm:mb-5 lg:mb-8">
              <h2 
                className="text-xl sm:text-2xl lg:text-4xl xl:text-[50.296px] xl:leading-[60px] text-white font-bold uppercase tracking-[0.943px] text-left mb-3 sm:mb-4 lg:mb-8"
                style={{ textShadow: "0px 3.143px 3.143px rgba(0,0,0,0.55)" }}
              >
                Certificado oficial
              </h2>

              <p className="text-xs sm:text-sm lg:text-lg xl:text-[20.083px] xl:leading-[32.634px] text-[rgba(255,255,255,0.9)] leading-relaxed text-justify">
                El certificado se otorga al finalizar satisfactoriamente el programa, siempre que el participante cumpla con los requisitos académicos y administrativos establecidos. Para ello, deberá aprobar el programa con una calificación final igual o superior a 14, contar con una asistencia mínima del 70 % y encontrarse al día en el cumplimiento de sus obligaciones de pago. El certificado es emitido por CEAR LATINOAMERICANO y cuenta con certificación conjunta de una universidad licenciada por SUNEDU, lo que garantiza su validez académica y respaldo institucional.
              </p>
            </div>

            {/* Institution Logos */}
            {displayLogos.length > 0 && (
              <div className="pt-3 sm:pt-4 lg:pt-8 border-t border-[rgba(255,255,255,0.2)] mt-auto">
                <p className="text-[rgba(255,255,255,0.7)] text-[10px] sm:text-xs lg:text-[15.62px] leading-[22.314px] mb-2 sm:mb-3 lg:mb-6">Avalado por:</p>
                <div className="flex flex-row items-center gap-2 sm:gap-3 lg:gap-6">
                  {/* CEAR Logo - Always shown */}
                  <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-sm rounded-[10px] sm:rounded-[12px] lg:rounded-[15.124px] hover:bg-white/20 transition-colors h-[55px] sm:h-[70px] lg:h-[107.107px] flex items-center justify-center p-2 sm:p-2.5 lg:p-4 w-[140px] sm:w-[180px] lg:w-[320px]">
                    <div className="w-[110px] sm:w-[140px] lg:w-[240px] h-auto">
                      <CearLogoWhite />
                    </div>
                  </div>
                  
                  {/* Additional Institution Logos */}
                  {displayLogos.map((logo, index) => (
                    <div
                      key={index}
                      className="bg-[rgba(255,255,255,0.1)] backdrop-blur-sm rounded-[10px] sm:rounded-[12px] lg:rounded-[15.124px] hover:bg-white/20 transition-colors h-[55px] sm:h-[70px] lg:h-[107.107px] flex items-center justify-center px-2 sm:px-3 lg:px-[17.851px] py-3 sm:py-4 lg:py-[26.777px] w-[110px] sm:w-[140px] lg:w-[236.342px]"
                    >
                      <ImageWithFallback
                        src={logo}
                        alt="Institution logo"
                        className="h-[28px] sm:h-[35px] lg:h-[53.554px] w-auto object-contain opacity-90"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right: Certificate Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-2"
          >
            {displayCertImage ? (
              <div className="relative">
                {/* Certificate Image */}
                <div className="bg-white rounded-[12px] sm:rounded-[16px] lg:rounded-[20.026px] p-3 sm:p-4 lg:p-[30.039px] shadow-[0px_0px_27.814px_0px_rgba(0,0,0,0.3)] hover:shadow-[0px_0px_35px_0px_rgba(0,0,0,0.4)] transition-shadow">
                  <div className="rounded-[8px] sm:rounded-[12px] lg:rounded-[16.966px] overflow-hidden">
                    <ImageWithFallback
                      src={displayCertImage}
                      alt="Certificado CEAR LATINOAMERICANO"
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                {/* Decorative Badge - Shield Icon from Figma */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                  className="absolute -top-[15px] sm:-top-[25px] lg:-top-[41.17px] -right-[12px] sm:-right-[18px] lg:-right-[30px] w-[60px] sm:w-[85px] lg:w-[120.155px] h-[60px] sm:h-[85px] lg:h-[120.155px] rounded-full bg-[#1c98b7] flex items-center justify-center shadow-[0px_0px_27.814px_0px_rgba(0,0,0,0.3)]"
                >
                  <Shield className="w-[30px] sm:w-[42px] lg:w-[60.077px] h-[30px] sm:h-[42px] lg:h-[60.077px] text-white" strokeWidth="5.00645" />
                </motion.div>
              </div>
            ) : (
              // Placeholder if no image
              <div className="bg-white rounded-[20.026px] p-8 shadow-[0px_0px_27.814px_0px_rgba(0,0,0,0.3)] aspect-[4/3] flex items-center justify-center">
                <div className="text-center">
                  <Award className="w-20 h-20 text-[#0B95BA] mx-auto mb-4" />
                  <p className="text-gray-600">Muestra de certificado</p>
                </div>
              </div>
            )}

            {/* Floating Elements - Removed blur circle */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}