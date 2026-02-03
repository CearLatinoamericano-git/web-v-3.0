import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, CheckCircle, ChevronDown } from 'lucide-react';

interface Module {
  module: string;
  topics: string[];
}

interface CourseSyllabusProps {
  modules: Module[];
  courseTitle?: string;
}

export function CourseSyllabus({ modules }: CourseSyllabusProps) {
  const safeModules = modules || [];
  
  const [expandedModule, setExpandedModule] = useState<number | null>(safeModules.length > 0 ? 0 : null);
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
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

  const toggleTopic = (moduleIndex: number, topicIndex: number) => {
    const topicKey = `${moduleIndex}-${topicIndex}`;
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

  const isTopicExpanded = (moduleIndex: number, topicIndex: number) => {
    return expandedTopics.has(`${moduleIndex}-${topicIndex}`);
  };
  

  return (
    <section className="py-10 lg:py-14 bg-gray-50">
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
          <div className="text-center mb-12">
            <p className="text-[#1C98B7]! text-[28px] sm:text-[42px] lg:text-[63.653px] uppercase tracking-[0.8px] sm:tracking-[1px] lg:tracking-[1.1935px] font-bold leading-[34.1px]">
              Malla curricular
            </p>
            <div className="h-[13.427px]" />
            <h2 className="text-[24px] sm:text-[36px] lg:text-[47.74px] text-[#111827] font-normal leading-[1.1] sm:leading-[1.15] lg:leading-[1.1]">
              Contenido del programa académico
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            {/* Left Sidebar: Module Carousel */}
            <div className="w-full lg:w-[420px] shrink-0">
              {/* Mobile: Dropdown Selector */}
              <div className="lg:hidden relative">
                {/* Dropdown Button */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-white rounded-2xl border-2 border-[#1c98b7] p-4 flex items-center justify-between transition-all duration-300 hover:shadow-lg"
                >
                  <span className="text-gray-900 font-semibold text-sm">
                    {expandedModule !== null 
                      ? `MÓDULO ${toRoman(expandedModule + 1)}`
                      : 'Selecciona un módulo'
                    }
                  </span>
                  <motion.div
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-[#1c98b7]" />
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
                        {safeModules.map((module, index) => (
                          <motion.button
                            key={index}
                            onClick={() => {
                              setExpandedModule(index === expandedModule ? null : index);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-3 rounded-xl text-left transition-all duration-300 mb-2 last:mb-0 ${
                              expandedModule === index
                                ? 'bg-linear-to-r from-[#0B95BA] to-[#087A98] shadow-md'
                                : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span className={`font-semibold text-sm ${
                                expandedModule === index ? 'text-white' : 'text-gray-900'
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
              <div className="hidden lg:block bg-white rounded-2xl border-2 border-[#1c98b7] p-6 h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#0B95BA] scrollbar-track-gray-100">
                <div className="space-y-3">
                  {safeModules.map((module, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setExpandedModule(index === expandedModule ? null : index)}
                      className={`w-full px-6 py-4 rounded-xl text-left transition-all duration-300 ${
                        expandedModule === index
                          ? 'bg-linear-to-r from-[#0B95BA] to-[#087A98] shadow-lg scale-105'
                          : 'bg-white border-2 border-gray-200 hover:border-[#0B95BA] hover:shadow-md'
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className={`font-semibold text-base ${
                          expandedModule === index ? 'text-white' : 'text-gray-900'
                        }`}>
                          MÓDULO {toRoman(index + 1)}
                        </span>
                        <span className={`text-2xl transition-transform duration-300 ${
                          expandedModule === index ? 'rotate-90 text-white' : 'text-gray-900'
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
              <div className="bg-white rounded-2xl border-2 border-[#1c98b7] p-5 lg:p-8 lg:p-10 h-[400px] lg:h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#0B95BA] scrollbar-track-gray-100">
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
                      <div className="mb-6 lg:mb-8 pb-4 lg:pb-6 border-b-2 border-[#0B95BA]/20">
                        <h3 className="text-xl lg:text-3xl text-gray-900 font-semibold">
                          {safeModules[expandedModule]?.module || 'Módulo sin título'}
                        </h3>
                      </div>

                      {/* Module Topics */}
                      <div className="space-y-3 lg:space-y-4">
                        <h4 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Contenido:</h4>
                        <div className="space-y-2 lg:space-y-3">
                          {(safeModules[expandedModule]?.topics || []).map((topic, topicIndex) => (
                            <motion.div
                              key={topicIndex}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: topicIndex * 0.05 }}
                              className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#0B95BA] hover:shadow-md transition-all"
                            >
                              {/* Topic Header - Always Clickable */}
                              <button
                                onClick={() => toggleTopic(expandedModule, topicIndex)}
                                className={`w-full flex items-center justify-between gap-3 lg:gap-4 p-3 lg:p-4 transition-all cursor-pointer group ${
                                  isTopicExpanded(expandedModule, topicIndex) ? 'bg-[#0B95BA] hover:bg-[#087A98]' : 'bg-[#0B95BA] hover:bg-[#087A98]'
                                }`}
                              >
                                <div className="flex items-start gap-3 lg:gap-4 flex-1 text-left">
                                  <motion.div 
                                    className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0"
                                    animate={{ scale: isTopicExpanded(expandedModule, topicIndex) ? 1.3 : 1 }}
                                    transition={{ duration: 0.3 }}
                                  />
                                  <span className="leading-relaxed text-sm lg:text-base font-medium text-white transition-colors">
                                    {topic}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-white/80 hidden lg:block transition-colors">
                                    {isTopicExpanded(expandedModule, topicIndex) ? 'Ocultar' : 'Ver más'}
                                  </span>
                                  <motion.div
                                    animate={{ rotate: isTopicExpanded(expandedModule, topicIndex) ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white rounded-full p-1 transition-colors"
                                  >
                                    <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5 text-[#0B95BA] flex-shrink-0" />
                                  </motion.div>
                                </div>
                              </button>

                              {/* Topic Content - Expandable */}
                              <AnimatePresence>
                                {isTopicExpanded(expandedModule, topicIndex) && (
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
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center h-full text-center py-12 lg:py-16"
                    >
                      <BookOpen className="w-16 h-16 lg:w-20 lg:h-20 text-[#0B95BA]/20 mb-4 lg:mb-6" />
                      <h3 className="text-xl lg:text-2xl text-gray-900 mb-2 lg:mb-3 font-semibold">
                        Seleccione un módulo
                      </h3>
                      <p className="text-gray-500 text-base lg:text-lg max-w-md px-4">
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