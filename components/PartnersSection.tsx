import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { GraduationCap, CheckCircle } from 'lucide-react';
const unahLogo = '/logos/unah-logo.png';
const proviasLogo = '/logos/provias-logo.png';
const cipLogo = '/logos/cip-logo.jpeg'; // TODO: Reemplazar con logo CIP cuando esté disponible
const dgerLogo = '/logos/dger-logo.png';
const unhevalImage = '/assets/universidad2.jpg';
const unmsmImage = '/images/partners/cum_lima.png';

export function PartnersSection() {
  // Partners data
  const partners = [
    {
      name: 'UNMSM',
      subtitle: 'Universidad Nacional Mayor de San Marcos',
      description: 'Decana de América',
      image: unmsmImage
    },
    {
      name: 'UNHEVAL',
      subtitle: 'Universidad Nacional Hermilio Valdizán',
      description: 'El Alma Máter de Huánuco',
      image: unhevalImage,
    },
  ];

  // Instituciones capacitadas
  const trainedInstitutions = [
    { id: 1, name: 'Universidad Nacional Autónoma de Huanta', logo: unahLogo },
    { id: 2, name: 'PROVIAS Nacional', logo: proviasLogo },
    { id: 3, name: 'Colegio de Ingenieros del Perú', logo: cipLogo },
    { id: 4, name: 'Dirección General de Electrificación Rural', logo: dgerLogo },
  ];

  return (
    <section className="pb-12 lg:pb-20 bg-gray-100 overflow-hidden pt-12 lg:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div
            className="font-bold leading-tight not-italic text-2xl sm:text-3xl lg:text-5xl xl:text-6xl text-center tracking-wide uppercase mb-4 lg:mb-6"
            style={{
              color: '#1c98b7',
              background: 'transparent',
              backgroundImage: 'none',
              WebkitBackgroundClip: 'border-box',
              backgroundClip: 'border-box',
              WebkitTextFillColor: '#1c98b7',
              textFillColor: '#1c98b7'
            } as React.CSSProperties}
          >
            Alianzas estratégicas
          </div>
          <h2 className="text-lg sm:text-xl lg:text-3xl text-gray-900 mb-4 lg:mb-6 leading-relaxed px-2 lg:px-4">
            Certificación académica respaldada por{' '}
            <span className="text-[rgb(28,152,183)]">
              instituciones universitarias
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-2 lg:px-4 text-justify">
            La certificación de nuestros programas se emite conforme a convenios académicos vigentes con universidades licenciadas por SUNEDU.
          </p>
        </motion.div>

        {/* Partners Grid - Contenedor con borde turquesa */}
        <div className="relative max-w-6xl mx-auto mb-16">
          {/* Borde turquesa redondeado contenedor */}
          <div className="border-4 border-[#1cb8a4] rounded-[40px] p-6 lg:p-8 bg-white/80 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group relative"
                >
                  <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
                    {/* Image with overlay */}
                    <div className="relative h-64 lg:h-72 overflow-hidden">
                      <ImageWithFallback
                        src={partner.image}
                        alt={partner.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-gray-900/90 via-gray-900/60 to-transparent" />

                      {/* Decorative gradient glow */}
                      <div className="absolute inset-0 bg-linear-to-t from-[#1c98b7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full mb-3 border border-white/30">
                        <GraduationCap className="w-4 h-4 text-white" />
                        <span className="text-xs text-white">{partner.description}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">{partner.name}</h3>
                      <p className="text-white/90 mb-4 text-sm sm:text-base lg:text-lg leading-relaxed">{partner.subtitle}</p>

                      {/* Features */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-white">
                          <div className="w-5 h-5 rounded-full bg-[#1c98b7] flex items-center justify-center shrink-0">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <span>Certificación oficial</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-white">
                          <div className="w-5 h-5 rounded-full bg-[#1c98b7] flex items-center justify-center shrink-0">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <span>Respaldo académico</span>
                        </div>
                      </div>
                    </div>

                    {/* Floating badge - Icono turquesa */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                      className="absolute top-4 right-4 sm:top-6 sm:right-6"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-[#1cb8a4] flex items-center justify-center shadow-lg border-2 border-white">
                        <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" strokeWidth={2.5} />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Instituciones capacitadas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 lg:mt-20"
        >
          {/* Card contenedor blanco con sombra sutil */}
          <div className="bg-linear-to-br from-gray-50 to-white rounded-3xl shadow-lg p-6 sm:p-8 lg:p-12 border border-[#1cb8a4]/20 hover:shadow-xl transition-shadow duration-500">
            <div className="text-center mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-bold leading-tight not-italic uppercase mb-6 lg:mb-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wide"
                style={{ color: '#1c98b7' }}
              >
                INSTITUCIONES CAPACITADAS
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-normal leading-relaxed not-italic text-center text-lg sm:text-xl md:text-2xl lg:text-3xl"
              >
                <span className="text-[#111827]">Formación brindada por </span>
                <span className="text-[#1c98b7]">CEAR LATINOAMERICANO</span>
              </motion.div>
            </div>

            {/* Partners Logos - Carrusel infinito desktop */}
            <div className="hidden lg:block relative overflow-hidden py-8 bg-white/50 rounded-2xl">
              {/* Gradientes laterales para efecto fade */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-white/90 via-white/60 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-white/90 via-white/60 to-transparent z-10 pointer-events-none" />

              {/* Animación infinita con logos individuales */}
              <motion.div
                className="flex items-center gap-12"
                animate={{
                  x: ['0%', '-50%'],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {/* Primer set de logos */}
                {trainedInstitutions.map((institution) => (
                  <div
                    key={`first-${institution.id}`}
                    className="shrink-0 flex items-center justify-center w-56 h-28 px-6 bg-white rounded-2xl transition-all hover:scale-105 shadow-sm hover:shadow-lg group"
                  >
                    <img
                      src={institution.logo}
                      alt={institution.name}
                      className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}

                {/* Segundo set de logos (duplicado para efecto infinito) */}
                {trainedInstitutions.map((institution) => (
                  <div
                    key={`second-${institution.id}`}
                    className="shrink-0 flex items-center justify-center w-56 h-28 px-6 bg-white rounded-2xl transition-all hover:scale-105 shadow-sm hover:shadow-lg group"
                  >
                    <img
                      src={institution.logo}
                      alt={institution.name}
                      className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Versión estática para móviles y tablets con grid */}
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
              {trainedInstitutions.map((institution, index) => (
                <motion.div
                  key={institution.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-center h-28 px-6 bg-white rounded-2xl transition-all hover:scale-105 shadow-sm hover:shadow-lg"
                >
                  <img
                    src={institution.logo}
                    alt={institution.name}
                    className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}