import { Play, ArrowRight, Award, Star, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ModelClassModal } from './modals/ModelClassModal';

// Imágenes de profesionales/docentes desde hero_images
const jorgeHerrera = "/images/hero_images/jorge_herrera.png";
const carmenAlvites = "/images/hero_images/carmen_alvites.png";
const nataliaMori = "/images/hero_images/natalia_mori.png";
const leonAviles = "/images/hero_images/leon_aviles.png";
const jennyGuerrero = "/images/hero_images/jenny_guerrero.png";
const luisVillavicencio = "/images/hero_images/luis_villavicencio.png";
const graceCastroRojas = "/images/hero_images/grace_castro.png";

// Hero Background Image
const heroBackgroundImage = "/images/hero_images/hero_cum.png";

const professionals = [
  {
    name: "Grace Castro Rojas",
    title: "Abogado",
    image: graceCastroRojas,
    experience: "+11 años de experiencia",
    courses: 11,
    highlight:
      "Abogada con más de 11 años de experiencia en la gestión y administración de contratos, gestión de riesgos, prevención de conflictos y solución de controversias en megaproyectos.",
    imageScale: 1.0,
    imagePosition: 0,
  },
  {
    name: "Jorge Herrera Guerra",
    title: "Abogado y Economista",
    image: jorgeHerrera,
    experience: "+25 años de experiencia",
    courses: 14,
    highlight:
      "Abogado y economista con más de 25 años de experiencia en el sector público y privado, con especialización en contratación pública y gestión pública. ",
    imageScale: 1.0,
    imagePosition: 0,
  },
  {
    name: "Carmen Alvitez Velasco",
    title: "Ingeniera Industrial",
    image: carmenAlvites,
    experience: "+32 años de experiencia",
    courses: 15,
    highlight:
      "Ingeniera industrial con más de 32 años de experiencia en educación, procesos y planeamiento en empresas del sector minero, eléctrico y de servicios.",
    imageScale: 1.0,
    imagePosition: 0,
  },
  {
    name: "Natalia Mori Torres",
    title: "Abogada",
    image: nataliaMori,
    experience: "+16 años de experiencia",
    courses: 16,
    highlight:
      "Abogada con más de 16 años de experiencia y sólida formación en derecho administrativo, Asociaciones Público-Privadas (APPs) y arbitraje nacional e internacional.",
    imageScale: 1.0,
    imagePosition: 0,
  },
  {
    name: "León López Áviles",
    title: "Ingeniero Civil",
    image: leonAviles,
    experience: "+43 años de experiencia",
    courses: 12,
    highlight:
      "Ingeniero civil con más de 43 años de experiencia en gestión de riesgos, dirección de proyectos, gestión contractual y solución de controversias.",
    imageScale: 1.3,
    imagePosition: 0,
  },
  {
    name: "Jenny Guerrero Aquino",
    title: "Ingeniera Civil",
    image: jennyGuerrero,
    experience: "+39 años de experiencia",
    courses: 10,
    highlight:
      "Ingeniera civil con más de 39 años de experiencia en administración de contratos, programación, costos y gerencia de obras públicas y privadas.",
    imageScale: 1.0,
    imagePosition: 0,
  },
  {
    name: "Luis Villavicencio Benites",
    title: "Abogado",
    image: luisVillavicencio,
    experience: "+10 años de experiencia",
    courses: 11,
    highlight:
      "Abogado con más de 10 años de experiencia, con un Máster en Contratación Pública por la Universidad de Castilla-La Mancha y un Máster en Derecho Administrativo.",
    imageScale: 1.0,
    imagePosition: 0,
  },
];

interface HeroEducretNewProps {
  onExploreCourses?: () => void;
}

export function HeroEducretNew({ onExploreCourses }: HeroEducretNewProps) {
  const [isModelClassModalOpen, setIsModelClassModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % professionals.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentProfessional = professionals[currentIndex];

  return (
    <section 
      className="relative w-full overflow-hidden rounded-b-[40px]"
      style={{ 
        background: 'linear-gradient(180deg, #561289 0%, #3954A0 50%, #1C98B7 100%)',
        minHeight: '800px',
        paddingTop: '0'
      }}
    >
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
        <img 
          src={heroBackgroundImage} 
          alt="sadasdasd" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hero Content */}
      <div className="">
        <div className="flex gap-5 items-center justify-center mt-47 w-[70%] mx-auto">
          {/* Left Content */}
          <div className="flex-1">
            {/* Main Title */}
            <div className="space-y-2">
              <h1 
                className="font-bold text-white leading-none"
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  letterSpacing: '-0.02em',
                  fontFamily: 'var(--font-family-base)'
                }}
              >
                CEAR
              </h1>
              <h2 
                className="font-bold text-white leading-tight"
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  letterSpacing: '-0.01em',
                  fontFamily: 'var(--font-family-base)'
                }}
              >
                FORMACIÓN CONTINUA
              </h2>
            </div>

            {/* Subtitle */}
            <p className="text-white/90 text-base lg:text-lg leading-relaxed max-w-[520px] mt-4 lg:mt-6">
              Programas de formación continua orientados a profesionales del Derecho y la Ingeniería, con enfoque especializado y aplicado.
            </p>

            {/* Quote */}
            <p className="text-white text-lg lg:text-xl leading-relaxed mt-4 lg:mt-6">
              <span className="font-bold">"COMPROMETIDOS</span>
              <span className="font-normal"> con tu </span>
              <span className="font-bold">CRECIMIENTO PROFESIONAL"</span>
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 lg:mt-8">
              <button 
                onClick={onExploreCourses}
                className="bg-[rgb(240,131,0)] hover:bg-[#19a894] text-white font-semibold px-6 py-3 lg:px-8 lg:py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors text-base lg:text-lg"
              >
                Ver programas
                <ArrowRight className="w-5 h-5" />
              </button>

              <button 
                onClick={() => setIsModelClassModalOpen(true)}
                className="bg-transparent hover:bg-white/10 text-white font-semibold px-6 py-3 lg:px-8 lg:py-3.5 rounded-lg border-2 border-white flex items-center justify-center gap-2 transition-colors text-base lg:text-lg"
              >
                <Play className="w-5 h-5 fill-white" />
                Ver clase modelo
              </button>
            </div>
          </div>
          {/* Right Content - Professional Image with Animation */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-full flex items-end justify-end"
                style={{ minHeight: '520px' }}
              >
                {/* Professional Image - Full Height */}
                <div className="relative flex justify-center items-center w-full">
                  <img
                    src={currentProfessional.image}
                    alt={currentProfessional.name}
                    className="h-[520px] w-auto max-w-full object-contain object-bottom"
                    style={{
                      transform: `scale(${currentProfessional.imageScale})`,
                    }}
                  />

                  {/* Professional Info Card - Bottom */}
                  <div className="absolute bottom-6 right-0 left-0 bg-white rounded-xl shadow-2xl px-3 py-2.5 sm:px-4 sm:py-3 w-full z-10">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Certificate Badge - Top Right */}
                      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-[#0BA5C9]/10 p-1.5 sm:p-2 rounded-lg">
                        <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0BA5C9]" />
                      </div>

                      {/* Stars + Experience Row */}
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-600">
                          <Briefcase className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#0BA5C9]" />
                          <span className="font-semibold">
                            {currentProfessional.experience}
                          </span>
                        </div>
                      </div>

                      {/* Name */}
                      <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-2">
                        {currentProfessional.name}
                      </h3>

                      {/* Highlight Box */}
                      <div className="bg-linear-to-r from-[#0BA5C9]/5 to-transparent border-l-[3px] border-[#0BA5C9] px-2 py-1.5 sm:px-3 sm:py-2 rounded">
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed text-justify">
                          {currentProfessional.highlight}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Model Class Modal */}
      <ModelClassModal 
        isOpen={isModelClassModalOpen} 
        onClose={() => setIsModelClassModalOpen(false)} 
      />
    </section>
  );
}