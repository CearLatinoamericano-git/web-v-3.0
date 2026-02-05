import { ImageWithFallback } from './figma/ImageWithFallback';
import svgPaths from '../imports/svg-ta8gmq8oyb';

interface Course {
  id: string;
  title: string;
  shortDescription: string;
  type: 'diplomado' | 'curso' | 'taller';
  modality: 'presencial' | 'virtual' | 'híbrido';
  duration: string;
  price: number;
  certification: string;
  image: string;
  hours?: string;
  startDate: string;
  credits?: string;
}

interface CoursesGridProps {
  courses: Course[];
  onCourseClick: (courseId: string) => void;
}

export function CoursesGrid({ courses, onCourseClick }: CoursesGridProps) {
  // Convertir fecha de formato DD-MM-YYYY a Date
  const parseDate = (dateStr: string) => {
    // Si el formato es DD-MM-YYYY
    if (dateStr.includes('-') && dateStr.split('-')[0].length <= 2) {
      const [day, month, year] = dateStr.split('-');
      return new Date(`${year}-${month}-${day}`);
    }
    // Si el formato es YYYY-MM-DD
    return new Date(dateStr);
  };

  // Ordenar por fecha de inicio: cursos futuros primero (más cercana primero), cursos pasados al final (más reciente primero)
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Resetear horas para comparar solo fechas
  
  const sortedCourses = [...courses]
    .sort((a, b) => {
      const dateA = parseDate(a.startDate);
      const dateB = parseDate(b.startDate);
      
      // Resetear horas para comparar solo fechas
      dateA.setHours(0, 0, 0, 0);
      dateB.setHours(0, 0, 0, 0);
      
      const isAPast = dateA < now;
      const isBPast = dateB < now;
      
      // Si ambos son futuros o ambos son pasados, ordenar por fecha
      if (isAPast === isBPast) {
        if (isAPast) {
          // Ambos pasados: más reciente primero (orden descendente)
          return dateB.getTime() - dateA.getTime();
        } else {
          // Ambos futuros: más cercana primero (orden ascendente)
          return dateA.getTime() - dateB.getTime();
        }
      }
      
      // Si uno es pasado y otro futuro, el futuro va primero
      return isAPast ? 1 : -1;
    });

  // Mapeo manual de títulos basado en el diseño de Figma
  const courseTitles: { [key: string]: { subtitle: string; mainTitle: string; thirdLevel: string } } = {
    'diplomado-derecho-administrativo-ii': {
      subtitle: 'Diplomado de Especialización',
      mainTitle: 'Derecho Administrativo',
      thirdLevel: 'para Árbitros'
    },
    'diplomado-jprd-ii': {
      subtitle: 'Diplomado de Especialización',
      mainTitle: 'Junta de Prevención y Resolución de Disputas',
      thirdLevel: ''
    },
    'curso-inversion-privada': {
      subtitle: 'Curso de Especialización',
      mainTitle: 'Mecanismos\nde Inversión Privada',
      thirdLevel: '(APP, Oxl y G2G)'
    },
    'curso-contratacion-publica-ii': {
      subtitle: 'Curso de Especialización',
      mainTitle: 'Contratación Pública',
      thirdLevel: 'Ley N° 32069 y su Reglamento'
    },
    'diplomado-arbitraje-iv': {
      subtitle: 'Diplomado de Especialización',
      mainTitle: 'Arbitraje',
      thirdLevel: 'en Contratación Pública'
    },
    'diplomado-contratacion-publica-ii': {
      subtitle: 'Diplomado de Especialización',
      mainTitle: 'Contratación Pública',
      thirdLevel: 'bajo la Ley General N° 32069'
    },
    'curso-contratos-estandarizados-iii': {
      subtitle: 'Curso de Especialización',
      mainTitle: 'Contratos\nEstandarizados',
      thirdLevel: 'bajo la Ley General N°32069'
    },
    'curso-controversias-ejecucion-contractual': {
      subtitle: 'Curso de Especialización',
      mainTitle: 'Controversias\nen la Ejecución Contractual\nde Obras Públicas',
      thirdLevel: ''
    }
  };

  // Función para formatear las fechas de duración
  const formatDuration = (duration: string) => {
    // Si ya viene en formato DD/MM/YY - DD/MM/YY, retornarlo
    if (duration.includes('/') && duration.includes('-')) {
      return duration;
    }
    // Si no, retornarlo como está
    return duration;
  };

  // Función para extraer horas académicas del string de hours
  const getAcademicHours = (hours?: string) => {
    if (!hours) return '120 horas académicas';
    // Extraer el número de horas
    const match = hours.match(/(\d+)/);
    if (match) {
      return `${match[1]} horas académicas`;
    }
    return hours.includes('horas') ? hours : `${hours} horas académicas`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {sortedCourses.map((course) => {
        const { subtitle, mainTitle, thirdLevel } = courseTitles[course.id] || {
          subtitle: course.type === 'diplomado' ? 'Diplomado de Especialización' : course.type === 'curso' ? 'Curso de Especialización' : 'Taller de Especialización',
          mainTitle: course.title,
          thirdLevel: ''
        };
        const formattedDuration = formatDuration(course.duration);

        const academicHours = getAcademicHours(course.hours);

        return (
          <div
            key={course.id}
            onClick={() => onCourseClick(course.id)}
            className="group cursor-pointer h-full w-full min-w-0"
          >
            {/* Card - Todo blanco con bordes redondeados */}
            <div className="bg-white flex flex-col h-full relative rounded-[16px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)] hover:shadow-2xl transition-all duration-500 overflow-hidden w-full">
              {/* Image with Badge */}
              <div className="relative h-[220px] w-full overflow-hidden">
                <div className="absolute inset-0">
                  <ImageWithFallback
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                {/* Badge - Color según tipo */}
                <div className="absolute top-3 left-3 z-10">
                  <div
                    className={`rounded-full shadow-[0px_2px_8px_0px_rgba(0,0,0,0.2)] px-4 py-1 ${course.type === 'diplomado'
                        ? 'bg-[#F18B01]'
                        : course.type === 'curso'
                          ? 'bg-[#7C37FE]'
                          : course.type === 'taller'
                            ? 'bg-[#2fca2a]'
                            : 'bg-[#F18B01]'
                      }`}
                  >
                    <span className="text-white text-xs font-bold flex items-center justify-center">
                      {course.type === 'diplomado'
                        ? 'Diplomado'
                        : course.type === 'curso'
                          ? 'Curso'
                          : 'Taller'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Title Section */}
              <div className="flex flex-col px-4 pt-3 w-full">
                <div className="flex flex-col gap-1.5 w-full">
                  {/* Subtitle */}
                  <div className="w-full">
                    <p className="font-semibold leading-[20px] text-black text-[14px] line-clamp-1">
                      {subtitle}
                    </p>
                  </div>
                  {/* Main Title with Third Level combined */}
                  <div className="w-full flex items-start">
                    <p className="font-semibold leading-[26px] text-[#1c98b7] text-[20px] line-clamp-5 whitespace-pre-line">
                      {thirdLevel ? `${mainTitle} ${thirdLevel}` : mainTitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="flex flex-col gap-2 w-full px-4 pt-3">
                {/* Date */}
                <div className="flex items-center gap-2">
                  <div className="h-[16px] w-[16px] shrink-0">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.75 15.75">
                      <g clipPath="url(#clip0_7009_265)">
                        <path d={svgPaths.p35490d00} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3125" />
                        <path d={svgPaths.p13e28cc0} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3125" />
                      </g>
                      <defs>
                        <clipPath id="clip0_7009_265">
                          <rect fill="white" height="15.75" width="15.75" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <p className="font-bold leading-[18px] text-[#1e397e] text-[15px]">
                    {formattedDuration}
                  </p>
                </div>

                {/* Certification */}
                <div className="flex items-center gap-2">
                  <div className="h-[14px] w-[14px] shrink-0">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                      <g>
                        <path d={svgPaths.p38e49ae0} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d={svgPaths.p23bfda80} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </g>
                    </svg>
                  </div>
                  <p className="font-bold leading-[16px] text-[#1e397e] text-[15px]">
                    {course.certification}
                  </p>
                </div>

                {/* Academic Hours - Book icon */}
                <div className="flex items-center gap-2">
                  <div className="h-[14px] w-[14px] shrink-0">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                      <g>
                        <path d={svgPaths.p2044ea00} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </g>
                    </svg>
                  </div>
                  <p className="font-bold leading-[16px] text-[#1e397e] text-[15px]">
                    {academicHours}
                  </p>
                </div>

                {/* Credits - Clock icon (only for diplomados) */}
                {course.type === 'diplomado' && (
                  <div className="flex items-center gap-2">
                    <div className="h-[14px] w-[14px] shrink-0">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                        <g>
                          <path d="M9 5.25V15.75" stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                          <path d="M9 9L12 12" stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                          <circle cx="9" cy="9" r="7.5" stroke="#1C98B7" strokeWidth="1.5" />
                        </g>
                      </svg>
                    </div>
                    <p className="font-bold leading-[16px] text-[#1e397e] text-[17px]">
                      24 créditos
                    </p>
                  </div>
                )}
              </div>

              {/* Ver más Button - Teal */}
              <div className="px-4 pb-4 pt-4 w-full mt-auto">
                <div className="flex items-center justify-center gap-2 bg-[#1c98b7] rounded-lg py-2.5 px-4 group-hover:bg-[#1aa5c4] transition-colors">
                  <p className="font-medium leading-[18px] text-[14px] text-white">
                    Ver más
                  </p>
                  <div className="relative shrink-0 size-[14px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                      <g>
                        <path d="M3.75 9H14.25" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d="M9 3.75L14.25 9L9 14.25" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}