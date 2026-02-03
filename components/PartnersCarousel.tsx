import { motion } from 'motion/react';


export function PartnersCarousel() {
  // Array de logos de colaboradores
  const partners = [
    { id: 1, name: 'MEM', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop' },
    { id: 2, name: 'DGER', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop' },
    { id: 3, name: 'PROVIAS Nacional', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop' },
    { id: 4, name: 'Distriluz', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop' },
    { id: 5, name: 'UNAH', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop' },
  ];

  // Duplicar partners para efecto infinito
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 lg:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#0B95BA] text-sm uppercase tracking-wider mb-3 font-bold" style={{ marginTop: '-5px' }}>Nuestros Aliados</p>
          <h2 className="text-3xl lg:text-4xl text-gray-900">
            Colaboramos con{' '}
            <span className="text-[#0B95BA]">empresas líderes en el sector</span>
          </h2>
        </motion.div>

        {/* Carrusel infinito */}
        <div className="relative">
          {/* Gradientes laterales para efecto de fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Contenedor del carrusel */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-12 lg:gap-16"
              animate={{
                x: [0, -1200],
              }}
              transition={{
                x: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {/* Usar la imagen real de colaboradores */}
              <div className="flex items-center justify-center min-w-max">
                <img
                  src={''}
                  alt="Logos de colaboradores"
                  className="h-20 lg:h-24 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </div>
              <div className="flex items-center justify-center min-w-max">
                <img
                  src={''}
                  alt="Logos de colaboradores"
                  className="h-20 lg:h-24 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Versión estática para dispositivos móviles */}
        <div className="mt-12 lg:hidden">
          <img
            src={''}
            alt="Logos de colaboradores: MEM, DGER, PROVIAS Nacional, Distriluz, UNAH"
            className="w-full h-auto opacity-80"
          />
        </div>
      </div>
    </section>
  );
}