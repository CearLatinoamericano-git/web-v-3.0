import { ArrowRight, Play, Users, BookOpen, Award, Star, CheckCircle, Sparkles, GraduationCap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ModelClassModal } from './modals/ModelClassModal';










interface HeroEducretProps {
  onExploreCourses?: () => void;
}

interface Student {
  id: number;
  name: string;
  photo: string;
  course: string;
  rating: number;
  timestamp?: number; // Para tracking de z-index
}

export function HeroEducret({ onExploreCourses }: HeroEducretProps) {
  const { colorVariant } = useTheme();
  const [isModelClassModalOpen, setIsModelClassModalOpen] = useState(false);
  
  // Lista de estudiantes reales
  const allStudents: Student[] = [
    {
      id: 1,
      name: 'Dr. Carlos Mendoza',
      photo:
      course: 'Diplomado en Arbitraje Internacional',
      rating: 5
    },
    {
      id: 2,
      name: 'Dr. Roberto Hernández',
      photo:
      course: 'Curso de Contratación con el Estado',
      rating: 5
    },
    {
      id: 3,
      name: 'Mg. Alberto Sánchez',
      photo:
      course: 'Diplomado en JPRD',
      rating: 5
    },
    {
      id: 4,
      name: 'Dra. María Elena Pérez',
      photo:
      course: 'Curso de Recursos Impugnativos',
      rating: 5
    },
    {
      id: 5,
      name: 'Dr. Juan Roberto López',
      photo:
      course: 'Curso de Modificaciones Contractuales',
      rating: 5
    },
    {
      id: 6,
      name: 'Mg. Luis Alberto Vargas',
      photo:
      course: 'Diplomado en Arbitraje Nacional',
      rating: 5
    },
    {
      id: 7,
      name: 'Dr. José Luis Gómez',
      photo:
      course: 'Diplomado en Arbitraje Internacional',
      rating: 5
    },
    {
      id: 8,
      name: 'Mg. Ana María Fernández',
      photo:
      course: 'Curso de Contratación con el Estado',
      rating: 5
    },
    {
      id: 9,
      name: 'Dr. Francisco Javier Ramírez',
      photo:
      course: 'Diplomado en JPRD',
      rating: 5
    }
  ];

  // Posiciones fijas para las tarjetas (4 slots)
  const cardPositions = [
    { top: '15%', right: '8%', size: 'large' }, // Top right - más margen superior
    { top: '22%', left: '8%', size: 'medium' }, // Top left - separado de top right
    { top: '52%', right: '12%', size: 'medium' }, // Middle right - bien separado
    { top: '45%', left: '15%', size: 'small' }, // Middle left - evita solapamiento
  ];

  const [visibleStudents, setVisibleStudents] = useState<(Student | null)[]>([null, null, null, null]);
  const [zIndexCounter, setZIndexCounter] = useState(0); // Contador para z-index

  // SISTEMA ROBUSTO ANTI-REPETICIÓN: Verifica por la ruta de la foto, NO por ID
  const getRandomStudent = (currentVisible: (Student | null)[]) => {
    // Extraer las RUTAS de las fotos actualmente visibles (no los IDs de estudiante)
    const visiblePhotoPaths = currentVisible
      .filter(s => s !== null)
      .map(s => s!.photo);
    
    // Filtrar estudiantes cuyas FOTOS no están actualmente visibles
    const available = allStudents.filter(s => !visiblePhotoPaths.includes(s.photo));
    
    // Si hay estudiantes disponibles con fotos diferentes, elegir uno aleatorio
    if (available.length > 0) {
      const selected = available[Math.floor(Math.random() * available.length)];
      // Asignar timestamp actual para z-index
      return { ...selected, timestamp: Date.now() };
    }
    
    // Fallback: si por alguna razón todos están visibles (no debería pasar con 9 fotos y 4 slots)
    // Devolver un estudiante aleatorio
    const selected = allStudents[Math.floor(Math.random() * allStudents.length)];
    return { ...selected, timestamp: Date.now() };
  };

  // Sistema de rotación de tarjetas - más dinámico
  useEffect(() => {
    // Inicializar con 4 estudiantes aleatorios CON FOTOS DIFERENTES
    const shuffled = [...allStudents].sort(() => Math.random() - 0.5);
    const initialStudents = [
      shuffled[0],
      shuffled[1],
      shuffled[2],
      shuffled[3]
    ];
    setVisibleStudents(initialStudents);

    // Cambiar tarjetas aleatoriamente con transición simultánea
    const interval = setInterval(() => {
      setVisibleStudents(current => {
        const newVisible = [...current];
        // Elegir una posición aleatoria para cambiar
        const positionToChange = Math.floor(Math.random() * 4);
        // Reemplazar inmediatamente con nuevo estudiante
        newVisible[positionToChange] = getRandomStudent(current);
        return newVisible;
      });
    }, 3500); // Cambiar cada 3.5 segundos para más dinamismo

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`relative text-white min-h-[calc(100vh-6rem)] flex items-center ${
      colorVariant === 'dark'
        ? 'bg-gradient-to-b from-[#052D3A] via-[#041F2D] to-[#031519]'
        : 'bg-gradient-to-br from-[#041F2D] via-[#063D4F] to-[#052D3A]'
    }`}>
      {/* Animated geometric shapes background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Stars/sparkles */}
        <motion.div
          className={`absolute top-20 left-10 ${
            colorVariant === 'dark' ? 'text-white/50' : 'text-[#0BDDB3]/20'
          }`}
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-8 h-8" />
        </motion.div>
        <motion.div
          className={`absolute top-40 right-20 ${
            colorVariant === 'dark' ? 'text-[#0B9BB8]/40' : 'text-[#10E7B0]/20'
          }`}
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>
        <motion.div
          className={`absolute bottom-32 left-1/4 ${
            colorVariant === 'dark' ? 'text-white/45' : 'text-cyan-400/20'
          }`}
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-10 h-10" />
        </motion.div>

        {/* Gradient orbs */}
        <motion.div 
          className={`absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl ${
            colorVariant === 'dark' ? 'bg-[#0B9BB8]/15' : 'bg-[#0BDDB3]/10'
          }`}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className={`absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl ${
            colorVariant === 'dark' ? 'bg-[#0A4A5C]/40' : 'bg-[#10E7B0]/10'
          }`}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-8 sm:py-10 lg:py-12 z-10">
        <div className="grid lg:grid-cols-[1fr_550px] gap-8 sm:gap-10 md:gap-12 lg:gap-20 xl:gap-28 items-center max-w-[1400px] mx-auto">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-5 sm:space-y-6 lg:space-y-8 relative z-30 w-full"
          >
            <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 items-start w-full">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white text-left w-full text-[2rem] leading-[2.5rem] sm:text-[2.2rem] sm:leading-[2.8rem] md:text-[2.5rem] md:leading-[3.2rem] lg:text-[2.8rem] lg:leading-[3.6rem]"
                style={{ 
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                Formación especializada<br />
                para la gestión y resolución<br />
                de controversias
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-full"
              >
                <p 
                  className="text-left w-full text-[1rem] leading-[1.6rem] sm:text-[1.05rem] sm:leading-[1.7rem] md:text-[1.1rem] md:leading-[1.8rem] lg:text-[1.2rem] lg:leading-[1.95rem]"
                  style={{
                    color: 'rgba(255, 255, 255, 0.85)',
                    letterSpacing: '-0.01em',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  Programas de formación continua dirigidos a profesionales que se desempeñan en áreas vinculadas al Derecho y la Ingeniería.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <motion.button
                onClick={onExploreCourses}
                className={`group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl transition-all ${
                  colorVariant === 'dark'
                    ? 'bg-white text-[#0A4A5C] hover:shadow-2xl hover:shadow-white/40'
                    : 'bg-white text-[#0B95BA] hover:shadow-2xl hover:shadow-white/50'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-base sm:text-lg">Ver programas</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                onClick={() => setIsModelClassModalOpen(true)}
                className={`inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 backdrop-blur-md text-white rounded-2xl transition-all ${
                  colorVariant === 'dark'
                    ? 'bg-[#0A4A5C] border-2 border-white/30 hover:bg-[#0B566D] hover:border-white/50'
                    : 'bg-white/10 border-2 border-white/20 hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-base sm:text-lg">Ver clase modelo</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Floating Student Cards */}
          <div className="relative h-[700px] hidden lg:block">
            {/* Contenedor con límites definidos para las tarjetas */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {/* Badge "Nuestros Egresados" - Integrado en esquina superior */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute top-0 right-0 z-[70]"
              >
                <div className={`flex items-center gap-2.5 px-5 py-2.5 rounded-bl-2xl rounded-tr-3xl shadow-xl ${
                  colorVariant === 'dark'
                    ? 'bg-gradient-to-br from-[#0B9BB8] to-[#084F6B]'
                    : 'bg-white/95'
                }`}>
                  <motion.div
                    animate={{
                      rotate: [0, 8, -8, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <GraduationCap className={`w-5 h-5 ${
                      colorVariant === 'dark' ? 'text-[#31C6F4]' : 'text-[#0B95BA]'
                    }`} />
                  </motion.div>
                  <span className={`${
                    colorVariant === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Nuestros egresados
                  </span>
                </div>
              </motion.div>
              {visibleStudents.map((student, index) => {
                const position = cardPositions[index];
                
                // Calcular z-index basado en timestamp para que las nuevas aparezcan arriba
                const zIndex = student?.timestamp ? 50 + Math.floor(student.timestamp / 1000) : 50 + index;
                
                return (
                  <div
                    key={`slot-${index}`}
                    className="absolute"
                    style={{
                      top: position.top,
                      bottom: position.bottom,
                      left: position.left,
                      right: position.right,
                      zIndex: zIndex,
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {student && (
                        <motion.div
                          key={`${student.id}-${student.timestamp || index}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 0.8,
                            ease: "easeInOut"
                          }}
                          className={`${
                            position.size === 'large' ? 'w-72' :
                            position.size === 'medium' ? 'w-64' :
                            'w-56'
                          }`}
                        >
                          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                            {/* Foto del estudiante */}
                            <div className={`relative ${
                              position.size === 'large' ? 'h-72' :
                              position.size === 'medium' ? 'h-64' :
                              'h-56'
                            }`}>
                              <ImageWithFallback
                                src={student.photo}
                                alt={student.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                              
                              {/* Badge de certificado */}
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                                className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-xl"
                              >
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  <span className="text-xs text-gray-900">Certificado</span>
                                </div>
                              </motion.div>

                              {/* Nombre y curso sobre la imagen */}
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <div className="text-white">
                                  <div className="text-lg mb-1">{student.name}</div>
                                  <div className="text-xs text-white/80 line-clamp-2">{student.course}</div>
                                </div>
                              </div>
                            </div>

                            {/* Rating */}
                            <div className="p-4 bg-white">
                              <div className="flex items-center justify-between">
                                <div className="flex gap-1">
                                  {[...Array(student.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                  <GraduationCap className="w-4 h-4 text-[#0B95BA]" />
                                  <span className="text-xs">Egresado</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Icono flotante decorativo */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  y: [0, -8, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-16 left-1/2 -translate-x-1/2 z-[60]"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  colorVariant === 'dark'
                    ? 'bg-[#0B9BB8]'
                    : 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-2xl'
                }`}>
                  <Award className={`w-7 h-7 ${
                    colorVariant === 'dark' ? 'text-white' : 'text-white'
                  }`} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-0">
        <svg className="w-full h-24 lg:h-32" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
          <path
            d="M0,64 C240,100 480,100 720,64 C960,28 1200,28 1440,64 L1440,120 L0,120 Z"
            fill="white"
            fillOpacity="0.05"
          />
          <path
            d="M0,80 C240,110 480,110 720,80 C960,50 1200,50 1440,80 L1440,120 L0,120 Z"
            fill="white"
            fillOpacity="0.03"
          />
        </svg>
      </div>

      {/* Model Class Modal */}
      <ModelClassModal
        isOpen={isModelClassModalOpen}
        onClose={() => setIsModelClassModalOpen(false)}
      />
    </section>
  );
}