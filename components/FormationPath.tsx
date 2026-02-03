import { motion } from 'motion/react';
import { GraduationCap, Target, Award, Briefcase, ArrowRight, CheckCircle, Star, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function FormationPath() {
  const { colorVariant } = useTheme();
  const steps = [
    {
      number: '01',
      title: 'Formación Académica',
      description: 'Brindamos programas y diplomados especializados en arbitraje y contratación pública, diseñados para abogados y profesionales del sector.',
      icon: GraduationCap,
      color: 'from-[#0B95BA] to-[#0890B0]',
      highlight: 'Programas certificados'
    },
    {
      number: '02',
      title: 'Desarrollo de Competencias',
      description: 'Los participantes adquieren experiencia práctica con casos reales, talleres y simulaciones de arbitraje y JPRD.',
      icon: Target,
      color: 'from-[#0890B0] to-[#0B95BA]',
      highlight: 'Experiencia práctica'
    },
    {
      number: '03',
      title: 'Evaluación y Certificación',
      description: 'Se realizan evaluaciones rigurosas y, al aprobar, se reciben certificaciones progresivas con validez académica.',
      icon: Award,
      color: 'from-[#0B95BA] to-[#10E7B0]',
      highlight: 'Certificación oficial'
    },
    {
      number: '04',
      title: 'Incorporación a la Nómina',
      description: 'Los egresados se integran a la nómina oficial de árbitros y adjudicadores de CEAR LATINOAMERICANO.',
      icon: Briefcase,
      color: 'from-[#10E7B0] to-[#0B95BA]',
      highlight: '¡Oportunidad laboral!',
      featured: true
    }
  ];

  return (
    <section className="hidden relative py-16 lg:py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden" data-section="linea-de-tiempo">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 text-[#0B95BA]/10"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-24 h-24" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-10 text-[#10E7B0]/10"
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <Star className="w-32 h-32" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[#0B95BA] text-sm uppercase tracking-wider mb-4 font-bold"
            style={{ marginTop: '-5px' }}
          >
            De la formación a la nómina
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl text-gray-900 mb-6"
          >
            Ruta de formación{' '}
            <span className="bg-gradient-to-r from-[#0B95BA] to-[#10E7B0] bg-clip-text text-transparent">
              CEAR LATINOAMERICANO
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            No solo te formamos, te incorporamos a nuestra nómina de profesionales
          </motion.p>
        </motion.div>

        {/* Timeline - Desktop */}
        <div className="hidden lg:block relative">
          {/* Línea conectora animada */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "calc(100% - 128px)" }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
            className="absolute left-1/2 top-[64px] w-1 bg-gradient-to-b from-[#0B95BA] via-[#10E7B0] to-[#0B95BA] opacity-20 -translate-x-1/2"
          />

          <div className="relative space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isEven ? -80 : 80, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`flex items-center gap-12 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Content Card */}
                  <div className={`flex-1 ${isEven ? 'text-right' : 'text-left'}`}>
                    <div className="relative group">
                      <div className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#0B95BA]/30 ${
                        step.featured 
                          ? (colorVariant === 'dark' ? 'ring-2 ring-[#0A8DA8]/50' : 'ring-2 ring-[#10E7B0]/50') 
                          : ''
                      }`}>
                        {/* Featured badge */}
                        {step.featured && (
                          <div className={`absolute -top-3 -right-3 px-4 py-1.5 text-white text-xs rounded-full shadow-lg flex items-center gap-1 ${
                            colorVariant === 'dark'
                              ? 'bg-gradient-to-r from-[#0A8DA8] to-[#0B9BB8]'
                              : colorVariant === 'default' 
                                ? 'bg-gradient-to-r from-[#10E7B0] to-[#0B95BA]' 
                                : 'bg-[#0B95BA]'
                          }`}>
                            <Star className="w-3 h-3 fill-white" />
                            <span>{step.highlight}</span>
                          </div>
                        )}

                        {/* Number badge */}
                        <div className={`inline-flex items-center justify-center px-4 py-2 text-white rounded-xl text-2xl mb-4 shadow-md ${
                          colorVariant === 'dark'
                            ? 'bg-gradient-to-r from-[#0A8DA8] to-[#0B9BB8]'
                            : colorVariant === 'default' 
                              ? 'bg-gradient-to-r from-[#0B95BA] to-[#10E7B0]' 
                              : 'bg-[#0B95BA]'
                        }`}>
                          {step.number}
                        </div>

                        <h3 className="text-2xl text-gray-900 mb-3">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed mb-4 text-justify">{step.description}</p>
                        
                        {!step.featured && (
                          <div className={`inline-flex items-center gap-2 text-sm text-[#0B95BA] ${isEven ? 'justify-end' : 'justify-start'}`}>
                            <CheckCircle className="w-4 h-4" />
                            <span>{step.highlight}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Center Icon */}
                  <div className="relative flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl ${
                        colorVariant === 'dark'
                          ? 'bg-gradient-to-br from-[#084F6B] to-[#0A8DA8]'
                          : colorVariant === 'default' 
                            ? 'bg-gradient-to-br from-[#0B95BA] to-[#10E7B0]' 
                            : 'bg-[#0B95BA]'
                      } ${step.featured ? (colorVariant === 'dark' ? 'ring-4 ring-[#0A8DA8]/50' : 'ring-4 ring-[#0B95BA]/30') : ''}`}>
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                      {/* Glow effect */}
                      {colorVariant !== 'dark' && (
                        <div className={`absolute inset-0 rounded-full ${colorVariant === 'default' ? 'bg-gradient-to-br from-[#0B95BA] to-[#10E7B0]' : 'bg-[#0B95BA]'} blur-xl opacity-30`} />
                      )}
                    </motion.div>
                  </div>

                  {/* Empty space for layout */}
                  <div className="flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Timeline - Mobile */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                <div className={`bg-white rounded-3xl p-6 shadow-lg border border-gray-100 ${step.featured ? (colorVariant === 'dark' ? 'ring-2 ring-[#0A8DA8]/50' : 'ring-2 ring-[#10E7B0]/50') : ''}`}>
                  {/* Featured badge */}
                  {step.featured && (
                    <div className={`absolute -top-3 -right-3 px-3 py-1 text-white text-xs rounded-full shadow-lg flex items-center gap-1 ${
                      colorVariant === 'dark'
                        ? 'bg-gradient-to-r from-[#0A8DA8] to-[#0B9BB8]'
                        : 'bg-gradient-to-r from-[#10E7B0] to-[#0B95BA]'
                    }`}>
                      <Star className="w-3 h-3 fill-white" />
                      <span>{step.highlight}</span>
                    </div>
                  )}

                  <div className="flex items-start gap-4 mb-4">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Number */}
                    <div className={`px-3 py-1 bg-gradient-to-r ${step.color} text-white rounded-lg text-xl`}>
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-xl text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-3">{step.description}</p>
                  
                  {!step.featured && (
                    <div className="inline-flex items-center gap-2 text-sm text-[#0B95BA]">
                      <CheckCircle className="w-4 h-4" />
                      <span>{step.highlight}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-[#0B95BA] to-[#10E7B0] rounded-3xl p-8 lg:p-12 shadow-2xl">
            <h3 className="text-2xl lg:text-3xl text-white mb-4">
              ¿LISTO PARA INICIAR TU CARRERA COMO ÁRBITRO, ADJUDICADOR O PERITO?
            </h3>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Completa nuestra ruta de formación y únete a la nómina oficial de CEAR LATINOAMERICANO
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0B95BA] rounded-2xl hover:bg-gray-50 transition-all shadow-xl"
            >
              <span className="text-lg">Ver programas disponibles</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}