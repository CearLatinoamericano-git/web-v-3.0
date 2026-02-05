import { Play, ArrowRight, Award, Star, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ModelClassModal } from './modals/ModelClassModal';
import styles from './HeroEducretNew.module.css';

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
    <section className={styles.heroSection}>
      {/* Background Texture */}
      <div className={styles.backgroundTexture}>
        <img 
          src={heroBackgroundImage} 
          alt="Hero background" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hero Content */}
      <div className={styles.heroContent}>
        <div className={styles.heroContainer}>
          {/* Left Content */}
          <div className={styles.leftContent}>
            {/* Main Title */}
            <div className={styles.titleContainer}>
              <h1 className={styles.mainTitle}>
                CEAR
              </h1>
              <h2 className={styles.subTitle}>
                FORMACIÓN CONTINUA
              </h2>
            </div>

            {/* Subtitle */}
            <p className={styles.subtitleText}>
              Programas de formación continua orientados a profesionales del Derecho y la Ingeniería, con enfoque especializado y aplicado.
            </p>

            {/* Quote */}
            <p className={styles.quoteText}>
              <span className={styles.quoteBold}>"COMPROMETIDOS</span>
              <span className={styles.quoteNormal}> con tu </span>
              <span className={styles.quoteBold}>CRECIMIENTO PROFESIONAL"</span>
            </p>

            {/* Buttons */}
            <div className={styles.buttonsContainer}>
              <button 
                onClick={onExploreCourses}
                className={styles.primaryButton}
              >
                Ver programas
                <ArrowRight className="w-5 h-5" />
              </button>

              <button 
                onClick={() => setIsModelClassModalOpen(true)}
                className={styles.secondaryButton}
              >
                <Play className="w-5 h-5 fill-white" />
                Ver clase modelo
              </button>
            </div>
          </div>
          {/* Right Content - Professional Image with Animation */}
          <div className={styles.rightContent}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className={styles.professionalImageContainer}
              >
                {/* Professional Image - Full Height */}
                <div className={styles.professionalImageWrapper}>
                  <img
                    src={currentProfessional.image}
                    alt={currentProfessional.name}
                    className={styles.professionalImage}
                    style={{
                      transform: `scale(${currentProfessional.imageScale})`,
                    }}
                  />

                  {/* Professional Info Card - Bottom */}
                  <div className={styles.professionalInfoCard}>
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Certificate Badge - Top Right */}
                      <div className={styles.certificateBadge}>
                        <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0BA5C9]" />
                      </div>

                      {/* Stars + Experience Row */}
                      <div className={styles.starsRow}>
                        <div className={styles.starsContainer}>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <div className={styles.experienceRow}>
                          <Briefcase className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-[#0BA5C9]" />
                          <span className="font-semibold">
                            {currentProfessional.experience}
                          </span>
                        </div>
                      </div>

                      {/* Name */}
                      <h3 className={styles.professionalName}>
                        Docente: {currentProfessional.name}
                      </h3>

                      {/* Highlight Box */}
                      <div className={styles.highlightBox}>
                        <p className={styles.highlightText}>
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