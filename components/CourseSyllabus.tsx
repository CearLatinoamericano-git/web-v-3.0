import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, CheckCircle, ChevronDown } from 'lucide-react';

interface SubModule {
  title: string;
  topics: string[];
}

interface Module {
  module: string;
  topics?: string[]; // Para compatibilidad con cursos existentes
  subModules?: SubModule[]; // Nueva estructura con submódulos
}

interface CourseSyllabusProps {
  modules: Module[];
  courseTitle?: string;
}

export function CourseSyllabus({ modules }: CourseSyllabusProps) {
  const safeModules = modules || [];

  const [expandedModule, setExpandedModule] = useState<number | null>(safeModules.length > 0 ? 0 : null);
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const [expandedSubModules, setExpandedSubModules] = useState<Set<string>>(new Set());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Convert number to Roman numerals
  const toRoman = (num: number): string => {
    const romanNumerals: [number, string][] = [
      [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
    ];
    let result = '';
    let remaining = num;

    for (const [value, numeral] of romanNumerals) {
      while (remaining >= value) {
        result += numeral;
        remaining -= value;
      }
    }
    return result;
  };

  const toggleSubModule = (moduleIndex: number, subModuleIndex: number) => {
    const subModuleKey = `${moduleIndex}-${subModuleIndex}`;
    setExpandedSubModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(subModuleKey)) {
        newSet.delete(subModuleKey);
      } else {
        newSet.add(subModuleKey);
      }
      return newSet;
    });
  };

  const isSubModuleExpanded = (moduleIndex: number, subModuleIndex: number) => {
    const subModuleKey = `${moduleIndex}-${subModuleIndex}`;
    return expandedSubModules.has(subModuleKey);
  };

  const toggleTopic = (moduleIndex: number, subModuleIndex: number | null, topicIndex: number) => {
    // Si hay submódulos, usar subModuleIndex, si no, usar null
    const topicKey = subModuleIndex !== null
      ? `${moduleIndex}-${subModuleIndex}-${topicIndex}`
      : `${moduleIndex}-${topicIndex}`;
    setExpandedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicKey)) {
        newSet.delete(topicKey);
      } else {
        newSet.add(topicKey);
      }
      return newSet;
    });
  };

  const isTopicExpanded = (moduleIndex: number, subModuleIndex: number | null, topicIndex: number) => {
    const topicKey = subModuleIndex !== null
      ? `${moduleIndex}-${subModuleIndex}-${topicIndex}`
      : `${moduleIndex}-${topicIndex}`;
    return expandedTopics.has(topicKey);
  };

  // Helper para obtener los datos del módulo actual
  const getCurrentModuleData = () => {
    if (expandedModule === null) return null;
    const currentModule = safeModules[expandedModule];
    if (!currentModule) return null;

    // Si tiene subModules, usar esa estructura
    if (currentModule.subModules && currentModule.subModules.length > 0) {
      return { type: 'subModules' as const, data: currentModule.subModules };
    }
    // Si tiene topics directos (estructura antigua)
    if (currentModule.topics && currentModule.topics.length > 0) {
      return { type: 'topics' as const, data: currentModule.topics };
    }
    return null;
  };


  return (
    <section className="py-6 sm:py-8 lg:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Layout: Lateral - Modules + Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <p className="text-[#1C98B7] text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-wide font-bold">
              Malla curricular
            </p>
            <div className="h-2 sm:h-3" />
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#111827] font-normal leading-tight">
              Contenido del programa académico
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6">
            {/* Left Sidebar: Module Carousel */}
            <div className="w-full lg:w-[300px] xl:w-[350px] shrink-0">
              {/* Mobile: Dropdown Selector */}
              <div className="lg:hidden relative">
                {/* Dropdown Button */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-white rounded-xl border-2 border-[#1c98b7] p-3 flex items-center justify-between transition-all duration-300 hover:shadow-lg"
                >
                  <span className="text-gray-900 font-semibold text-xs sm:text-sm">
                    {expandedModule !== null
                      ? `MÓDULO ${toRoman(expandedModule + 1)}`
                      : 'Selecciona un módulo'
                    }
                  </span>
                  <motion.div
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#1c98b7]" />
                  </motion.div>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-50 w-full mt-2 bg-white rounded-2xl border-2 border-[#1c98b7] shadow-xl max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#0B95BA] scrollbar-track-gray-100"
                    >
                      <div className="p-2">
                        {safeModules.map((_module, index) => (
                          <motion.button
                            key={index}
                            onClick={() => {
                              setExpandedModule(index === expandedModule ? null : index);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-3 rounded-xl text-left transition-all duration-300 mb-2 last:mb-0 ${expandedModule === index
                                ? 'bg-linear-to-r from-[#0B95BA] to-[#087A98] shadow-md'
                                : 'bg-gray-50 hover:bg-gray-100'
                              }`}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span className={`font-semibold text-sm ${expandedModule === index ? 'text-white' : 'text-gray-900'
                                }`}>
                                MÓDULO {toRoman(index + 1)}
                              </span>
                              {expandedModule === index && (
                                <CheckCircle className="w-4 h-4 text-white" />
                              )}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Desktop: Vertical Scrollable */}
              <div className="hidden lg:block bg-white rounded-xl border-2 border-[#1c98b7] p-4 h-[450px] xl:h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#0B95BA] scrollbar-track-gray-100">
                <div className="space-y-2">
                  {safeModules.map((_module, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setExpandedModule(index === expandedModule ? null : index)}
                      className={`w-full px-4 py-3 rounded-lg text-left transition-all duration-300 ${expandedModule === index
                          ? 'bg-gradient-to-r from-[#0B95BA] to-[#087A98] shadow-lg scale-105'
                          : 'bg-white border-2 border-gray-200 hover:border-[#0B95BA] hover:shadow-md'
                        }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`font-semibold text-sm xl:text-base ${expandedModule === index ? 'text-white' : 'text-gray-900'
                          }`}>
                          MÓDULO {toRoman(index + 1)}
                        </span>
                        <span className={`text-xl transition-transform duration-300 ${expandedModule === index ? 'rotate-90 text-white' : 'text-gray-900'
                          }`}>
                          ›
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content Panel: Module Details */}
            <div className="flex-1">
              <div className="bg-white rounded-xl border-2 border-[#1c98b7] p-4 sm:p-5 lg:p-6 xl:p-8 h-[400px] sm:h-[450px] lg:h-[450px] xl:h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#0B95BA] scrollbar-track-gray-100">
                <AnimatePresence mode="wait">
                  {expandedModule !== null && expandedModule >= 0 && expandedModule < safeModules.length ? (
                    <motion.div
                      key={expandedModule}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Module Title */}
                      <div className="mb-4 sm:mb-5 lg:mb-6 pb-3 sm:pb-4 border-b-2 border-[#0B95BA]/20">
                        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-900 font-semibold leading-tight">
                          {safeModules[expandedModule]?.module || 'Módulo sin título'}
                        </h3>
                      </div>

                      {/* Module Content */}
                      <div className="space-y-3 sm:space-y-4">
                        <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Contenido:</h4>
                        {(() => {
                          const moduleData = getCurrentModuleData();

                          if (!moduleData) {
                            return (
                              <p className="text-gray-500 text-sm lg:text-base">
                                No hay contenido disponible para este módulo.
                              </p>
                            );
                          }

                          // Si tiene subModules (nueva estructura)
                          if (moduleData.type === 'subModules') {
                            return (
                              <div className="space-y-3 sm:space-y-4">
                                {moduleData.data.map((subModule, subModuleIndex) => {
                                  const isExpanded = isSubModuleExpanded(expandedModule!, subModuleIndex);
                                  return (
                                    <motion.div
                                      key={subModuleIndex}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.3, delay: subModuleIndex * 0.05 }}
                                      className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-[#0B95BA] hover:shadow-lg transition-all bg-white"
                                    >
                                      {/* SubModule Title - Clickable Header */}
                                      <button
                                        onClick={() => toggleSubModule(expandedModule!, subModuleIndex)}
                                        className="w-full bg-gradient-to-r from-[#0B95BA] to-[#087A98] px-3 py-2.5 sm:px-4 sm:py-3 lg:px-5 lg:py-3.5 flex items-center justify-between transition-all hover:from-[#087A98] hover:to-[#065A73]"
                                      >
                                        <h5 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white text-left pr-2">
                                          {subModule.title}
                                        </h5>
                                        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                                          <span className="text-[10px] sm:text-xs text-white/90 hidden md:block">
                                            {isExpanded ? 'Ocultar' : 'Ver más'}
                                          </span>
                                          <motion.div
                                            animate={{ rotate: isExpanded ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="bg-white rounded-full p-0.5 sm:p-1"
                                          >
                                            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-[#0B95BA] shrink-0" />
                                          </motion.div>
                                        </div>
                                      </button>

                                      {/* SubModule Topics - Expandable Content */}
                                      <AnimatePresence>
                                        {isExpanded && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                          >
                                            <div className="p-3 sm:p-4 lg:p-5 bg-white">
                                              <div className="mb-2 sm:mb-3">
                                                <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-900 mb-2 sm:mb-3">
                                                  Contenido detallado del tema en desarrollo:
                                                </p>
                                              </div>
                                              <ul className="space-y-1.5 sm:space-y-2 lg:space-y-2.5">
                                                {subModule.topics.map((topic, topicIndex) => (
                                                  <motion.li
                                                    key={topicIndex}
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.2, delay: topicIndex * 0.03 }}
                                                    className="flex items-start gap-2 sm:gap-3"
                                                  >
                                                    <span className="text-[#0B95BA] mt-1 sm:mt-1.5 shrink-0 text-base sm:text-lg">•</span>
                                                    <span className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
                                                      {topic}
                                                    </span>
                                                  </motion.li>
                                                ))}
                                              </ul>
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </motion.div>
                                  );
                                })}
                              </div>
                            );
                          }

                          // Si tiene topics directos (estructura antigua - compatibilidad)
                          return (
                            <div className="space-y-2 lg:space-y-3">
                              {moduleData.data.map((topic, topicIndex) => (
                                <motion.div
                                  key={topicIndex}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: topicIndex * 0.05 }}
                                  className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#0B95BA] hover:shadow-md transition-all"
                                >
                                  {/* Topic Header - Always Clickable */}
                                  <button
                                    onClick={() => toggleTopic(expandedModule, null, topicIndex)}
                                    className={`w-full flex items-center justify-between gap-3 lg:gap-4 p-3 lg:p-4 transition-all cursor-pointer group ${isTopicExpanded(expandedModule, null, topicIndex) ? 'bg-[#0B95BA] hover:bg-[#087A98]' : 'bg-[#0B95BA] hover:bg-[#087A98]'
                                      }`}
                                  >
                                    <div className="flex items-start gap-3 lg:gap-4 flex-1 text-left">
                                      <motion.div
                                        className="w-2 h-2 rounded-full bg-white mt-2 shrink-0"
                                        animate={{ scale: isTopicExpanded(expandedModule, null, topicIndex) ? 1.3 : 1 }}
                                        transition={{ duration: 0.3 }}
                                      />
                                      <span className="leading-relaxed text-sm lg:text-base font-medium text-white transition-colors">
                                        {topic}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs text-white/80 hidden lg:block transition-colors">
                                        {isTopicExpanded(expandedModule, null, topicIndex) ? 'Ocultar' : 'Ver más'}
                                      </span>
                                      <motion.div
                                        animate={{ rotate: isTopicExpanded(expandedModule, null, topicIndex) ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-white rounded-full p-1 transition-colors"
                                      >
                                        <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5 text-[#0B95BA] shrink-0" />
                                      </motion.div>
                                    </div>
                                  </button>

                                  {/* Topic Content - Expandable */}
                                  <AnimatePresence>
                                    {isTopicExpanded(expandedModule, null, topicIndex) && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                      >
                                        <div className="px-3 lg:px-4 pb-3 lg:pb-4 pt-1 bg-white">
                                          <div className="pl-5 lg:pl-6 border-l-2 border-[#0B95BA]/30 space-y-2">
                                            <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
                                              Contenido detallado del tema en desarrollo.
                                            </p>
                                            <ul className="space-y-1 text-sm text-gray-600">
                                              <li className="flex items-start gap-2">
                                                <span className="text-[#0B95BA] mt-1">•</span>
                                                <span>Material de lectura complementario</span>
                                              </li>
                                              <li className="flex items-start gap-2">
                                                <span className="text-[#0B95BA] mt-1">•</span>
                                                <span>Ejercicios prácticos y casos de estudio</span>
                                              </li>
                                              <li className="flex items-start gap-2">
                                                <span className="text-[#0B95BA] mt-1">•</span>
                                                <span>Recursos audiovisuales de apoyo</span>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </motion.div>
                              ))}
                            </div>
                          );
                        })()}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center h-full text-center py-8 sm:py-12 lg:py-16"
                    >
                      <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-[#0B95BA]/20 mb-3 sm:mb-4 lg:mb-6" />
                      <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-900 mb-2 sm:mb-3 font-semibold">
                        Seleccione un módulo
                      </h3>
                      <p className="text-gray-500 text-sm sm:text-base lg:text-lg max-w-md px-4">
                        Elija un módulo del panel izquierdo para ver su contenido detallado
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}