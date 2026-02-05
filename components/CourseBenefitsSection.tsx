import { motion } from 'motion/react';
import { Play, Clock, Calendar, CalendarCheck, Monitor, Award } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface CourseBenefitsSectionProps {
  description: string;
  videoUrl?: string;
  videoThumbnail?: string;
  hours?: string;
  sessions?: string;
  startDate?: string;
  modality?: string;
  certification?: string;
}

export function CourseBenefitsSection({
  description,
  videoUrl,
  videoThumbnail,
  hours,
  sessions,
  startDate,
  modality,
  certification
}: CourseBenefitsSectionProps) {
  const { colorVariant } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);

  // Función para formatear fecha correctamente
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      let date: Date;
      
      // Detectar formato DD-MM-YY o DD/MM/YY
      const dashMatch = dateString.match(/^(\d{2})[-/](\d{2})[-/](\d{2,4})$/);
      if (dashMatch) {
        const [, day, month, year] = dashMatch;
        // Si el año tiene 2 dígitos, asumir 20XX
        const fullYear = year.length === 2 ? parseInt(`20${year}`) : parseInt(year);
        const monthNum = parseInt(month);
        const dayNum = parseInt(day);
        // Crear fecha usando constructor con números para evitar problemas de zona horaria
        date = new Date(fullYear, monthNum - 1, dayNum);
      } else {
        // Intentar parsear como fecha estándar
        date = new Date(dateString);
      }
      
      // Verificar que la fecha sea válida
      if (isNaN(date.getTime())) {
        return dateString; // Retornar el string original si no se puede parsear
      }
      
      return date.toLocaleDateString('es-PE', { 
        day: '2-digit', 
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  // Extract YouTube video ID
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = videoUrl ? getYouTubeId(videoUrl) : null;

  return (
    <section className="pt-10 lg:pt-14 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-[#1c98b7] text-3xl md:text-4xl lg:text-5xl xl:text-[64px] uppercase tracking-[1.2px] md:mb-5 lg:mb-[18px] font-bold leading-tight mt-[0px] mr-[0px] mb-[8px] ml-[0px]">
            Presentación del programa
          </h2>
          <p className="text-[#111827] text-2xl md:text-3xl lg:text-4xl xl:text-[48px] leading-tight font-normal">
            Valor y resultados profesionales
          </p>
        </motion.div>

        <div className={`grid grid-cols-1 ${videoUrl ? 'lg:grid-cols-2' : ''} gap-8 lg:gap-12 xl:gap-16 items-center`}>
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={videoUrl ? '' : 'max-w-4xl mx-auto'}
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-base lg:text-lg xl:text-[20.25px] text-[#364153] leading-relaxed text-justify">
                {description}
              </p>
            </div>
          </motion.div>

          {/* Video Player - Only show if videoUrl exists */}
          {videoUrl && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900 shadow-2xl" style={{ zIndex: 1 }}>
                {!isPlaying && videoThumbnail ? (
                  <>
                    {/* Thumbnail with Play Button */}
                    <img
                      src={videoThumbnail}
                      alt="Video preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gray-900/40 flex items-center justify-center">
                      <motion.button
                        onClick={handlePlayVideo}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-16 h-16 md:w-20 md:h-20 lg:w-[81px] lg:h-[81px] bg-[#1c98b7] rounded-full flex items-center justify-center shadow-[0px_0px_22.552px_0px_rgba(0,0,0,0.3)] pl-1"
                      >
                        <Play className="w-8 h-8 md:w-10 md:h-10 text-white" fill="white" />
                      </motion.button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* YouTube Embed */}
                    {videoId && (
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}`}
                        title="Course Introduction Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    )}
                  </>
                )}
              </div>

              {/* Decorative Blur Elements */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-24 md:w-28 md:h-28 lg:w-[130px] lg:h-[130px] bg-[#1c98b7]/30 rounded-full blur-[57px]" style={{ zIndex: 0 }} />
            </motion.div>
          )}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Hours */}
            {hours && (
              <div className={`flex items-center gap-4 rounded-2xl p-6 transition-all ${
                colorVariant === 'dark'
                  ? 'bg-gradient-to-br from-[#084F6B] to-[#0A8DA8] shadow-lg'
                  : 'bg-gradient-to-br from-[#0B95BA]/5 to-[#10E7B0]/5 border border-[#0B95BA]/10 hover:border-[#0B95BA]/30'
              }`}>
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                  colorVariant === 'dark'
                    ? 'bg-white/20'
                    : 'bg-gradient-to-br from-[#0B95BA] to-[#10E7B0] shadow-lg shadow-[#0B95BA]/20'
                }`}>
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className={`text-2xl mb-1 ${colorVariant === 'dark' ? 'text-white/80' : 'text-gray-500'}`}>Duración</p>
                  <p className={colorVariant === 'dark' ? 'text-white' : 'text-gray-900'}>{hours}</p>
                </div>
              </div>
            )}

            {/* Sessions */}
            {sessions && (
              <div className={`flex items-center gap-4 rounded-2xl p-6 transition-all ${
                colorVariant === 'dark'
                  ? 'bg-gradient-to-br from-[#084F6B] to-[#0A8DA8] shadow-lg'
                  : 'bg-gradient-to-br from-[#0B95BA]/5 to-[#10E7B0]/5 border border-[#0B95BA]/10 hover:border-[#0B95BA]/30'
              }`}>
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                  colorVariant === 'dark'
                    ? 'bg-white/20'
                    : 'bg-gradient-to-br from-[#0B95BA] to-[#10E7B0] shadow-lg shadow-[#0B95BA]/20'
                }`}>
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className={`text-2xl mb-1 ${colorVariant === 'dark' ? 'text-white/80' : 'text-gray-500'}`}>Sesiones</p>
                  <p className={colorVariant === 'dark' ? 'text-white' : 'text-gray-900'}>{sessions}</p>
                </div>
              </div>
            )}

            {/* Start Date */}
            {startDate && (
              <div className={`flex items-center gap-4 rounded-2xl p-6 transition-all ${
                colorVariant === 'dark'
                  ? 'bg-gradient-to-br from-[#084F6B] to-[#0A8DA8] shadow-lg'
                  : 'bg-gradient-to-br from-[#0B95BA]/5 to-[#10E7B0]/5 border border-[#0B95BA]/10 hover:border-[#0B95BA]/30'
              }`}>
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                  colorVariant === 'dark'
                    ? 'bg-white/20'
                    : 'bg-gradient-to-br from-[#0B95BA] to-[#10E7B0] shadow-lg shadow-[#0B95BA]/20'
                }`}>
                  <CalendarCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className={`text-2xl mb-1 ${colorVariant === 'dark' ? 'text-white/80' : 'text-gray-500'}`}>Inicio</p>
                  <p className={colorVariant === 'dark' ? 'text-white' : 'text-gray-900'}>
                    {formatDate(startDate)}
                  </p>
                </div>
              </div>
            )}

            {/* Modality */}
            {modality && (
              <div className={`flex items-center gap-4 rounded-2xl p-6 transition-all ${
                colorVariant === 'dark'
                  ? 'bg-gradient-to-br from-[#084F6B] to-[#0A8DA8] shadow-lg'
                  : 'bg-gradient-to-br from-[#0B95BA]/5 to-[#10E7B0]/5 border border-[#0B95BA]/10 hover:border-[#0B95BA]/30'
              }`}>
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                  colorVariant === 'dark'
                    ? 'bg-white/20'
                    : 'bg-gradient-to-br from-[#0B95BA] to-[#10E7B0] shadow-lg shadow-[#0B95BA]/20'
                }`}>
                  <Monitor className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className={`text-2xl mb-1 ${colorVariant === 'dark' ? 'text-white/80' : 'text-gray-500'}`}>Modalidad</p>
                  <p className={colorVariant === 'dark' ? 'text-white' : 'text-gray-900'}>{modality}</p>
                </div>
              </div>
            )}

            {/* Certification */}
            {certification && (
              <div className={`flex items-center gap-4 rounded-2xl p-6 transition-all sm:col-span-2 lg:col-span-1 ${
                colorVariant === 'dark'
                  ? 'bg-gradient-to-br from-[#084F6B] to-[#0A8DA8] shadow-lg'
                  : 'bg-gradient-to-br from-[#0B95BA]/5 to-[#10E7B0]/5 border border-[#0B95BA]/10 hover:border-[#0B95BA]/30'
              }`}>
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                  colorVariant === 'dark'
                    ? 'bg-white/20'
                    : 'bg-gradient-to-br from-[#0B95BA] to-[#10E7B0] shadow-lg shadow-[#0B95BA]/20'
                }`}>
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className={`text-2xl mb-1 ${colorVariant === 'dark' ? 'text-white/80' : 'text-gray-500'}`}>Certificación</p>
                  <p className={colorVariant === 'dark' ? 'text-white' : 'text-gray-900'}>{certification}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}