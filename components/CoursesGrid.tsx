import { ImageWithFallback } from './figma/ImageWithFallback';
import svgPaths from '../imports/svg-ta8gmq8oyb';

interface Course {
  id: string;
  title: string;
  shortDescription: string;
  type: 'diplomado' | 'curso';
  modality: 'presencial' | 'virtual' | 'híbrido';
  duration: string;
  price: number;
  certification: string;
  image: string;
  hours?: string;
  startDate: string;
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

  // Ordenar por fecha de inicio (más cercana primero) y tomar solo los primeros 6
  const sortedCourses = [...courses]
    .sort((a, b) => {
      const dateA = parseDate(a.startDate);
      const dateB = parseDate(b.startDate);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 6);

  // Mapeo manual de títulos basado en el diseño de Figma
  const courseTitles: { [key: string]: { subtitle: string; mainTitle: string; thirdLevel: string } } = {
    'diplomado-derecho-administrativo-ii': {
      subtitle: 'II Diplomado de Posgrado',
      mainTitle: 'Derecho Administrativo',
      thirdLevel: 'para Árbitros'
    },
    'diplomado-jprd-ii': {
      subtitle: 'II Diplomado de Posgrado',
      mainTitle: 'Junta de Prevención y Resolución de Disputas',
      thirdLevel: ''
    },
    'curso-inversion-privada': {
      subtitle: 'Curso de Especialidad',
      mainTitle: 'Mecanismos\nde Inversión Privada',
      thirdLevel: '(APP, Oxl y G2G)'
    },
    'curso-contratacion-publica-ii': {
      subtitle: 'Curso de Especialidad',
      mainTitle: 'Contratación Pública',
      thirdLevel: 'Ley N° 32069 y su Reglamento'
    },
    'diplomado-arbitraje-iv': {
      subtitle: 'IV Diplomado de Posgrado',
      mainTitle: 'Arbitraje',
      thirdLevel: 'en Contratación Pública'
    },
    'diplomado-contratacion-publica-ii': {
      subtitle: 'II Diplomado de Posgrado',
      mainTitle: 'Contratación Pública',
      thirdLevel: 'bajo la Ley General N° 32069'
    },
    'curso-contratos-estandarizados-iii': {
      subtitle: 'III Curso de Especialidad',
      mainTitle: 'Contratos\nEstandarizados',
      thirdLevel: 'bajo la Ley General N°32069'
    },
    'curso-controversias-ejecucion-contractual': {
      subtitle: 'III Curso de Especialidad',
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {sortedCourses.map((course) => {
        const { subtitle, mainTitle } = courseTitles[course.id] || {
          subtitle: course.type === 'diplomado' ? 'Diplomado de Posgrado' : 'Curso de Especialidad',
          mainTitle: course.title
        };
        const formattedDuration = formatDuration(course.duration);
        
        return (
          <div
            key={course.id}
            onClick={() => onCourseClick(course.id)}
            className="group cursor-pointer h-full flex"
          >
            {/* Card - Altura uniforme */}
            <div className="bg-[#1c98b7] flex flex-col h-full relative rounded-[16px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)] hover:shadow-2xl transition-all duration-500 overflow-hidden w-full">
              {/* Parte superior blanca */}
              <div className="bg-white flex flex-col flex-1 items-start overflow-hidden relative rounded-tl-[16px] rounded-tr-[16px] w-full">
                {/* Image with Badge */}
                <div className="relative h-[170px] w-full overflow-hidden">
                  <div className="absolute inset-0">
                    <ImageWithFallback
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  {/* Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <div className={`h-[22px] rounded-full shadow-[0px_2px_8px_0px_rgba(0,0,0,0.2)] px-3.5 py-1 ${course.type === 'diplomado' ? 'bg-[#1cb8a4]' : 'bg-[#1c98b7]'}`}>
                      <p className="font-bold leading-[18px] text-[12px] text-center text-white whitespace-nowrap">
                        {course.type === 'diplomado' ? 'Diplomado' : 'Curso'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Title Section - Altura fija */}
                <div className="flex-1 flex flex-col px-4 py-3 w-full min-h-[100px]">
                  <div className="flex flex-col gap-1 w-full flex-1">
                    {/* Subtitle */}
                    <div className="w-full">
                      <p className="font-semibold leading-[20px] text-black text-[14px] line-clamp-1">
                        {subtitle}
                      </p>
                    </div>
                    {/* Main Title */}
                    <div className="w-full flex-1 flex items-start">
                      <p className="font-semibold leading-[22px] text-[#1c98b7] text-[18px] line-clamp-3 whitespace-pre-line">
                        {mainTitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info Section - Compacta */}
                <div className="flex flex-col gap-2 w-full px-4 pb-4">
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
                    <p className="font-medium leading-[18px] text-[#1e397e] text-[13px] truncate">
                      {formattedDuration}
                    </p>
                  </div>

                  {/* Certification y Hours en una fila */}
                  <div className="flex items-center justify-between gap-3">
                    {/* Certification */}
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="h-[14px] w-[14px] shrink-0">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                          <g>
                            <path d={svgPaths.p38e49ae0} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                            <path d={svgPaths.p23bfda80} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                          </g>
                        </svg>
                      </div>
                      <p className="font-medium leading-[16px] text-[#1e397e] text-[12px] truncate">
                        Doble certificación
                      </p>
                    </div>

                    {/* Hours */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="h-[14px] w-[14px] shrink-0">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                          <g>
                            <path d="M9 5.25V15.75" stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                            <path d={svgPaths.p2044ea00} stroke="#1C98B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                          </g>
                        </svg>
                      </div>
                      <p className="font-semibold leading-[16px] text-[#0f2c76] text-[12px] whitespace-nowrap">
                        {course.hours?.split(' ')[0] || '120'}h
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Parte inferior turquesa - Inversión */}
              <div className="flex flex-col items-start py-3 px-4 w-full bg-[#1c98b7]">
                <div className="flex items-center justify-between w-full mb-2">
                  <div>
                    <p className="font-normal leading-[18px] text-[14px] text-white">
                      Inversión
                    </p>
                  </div>
                  <div className="flex gap-2 items-center group-hover:gap-2.5 transition-all">
                    <p className="font-normal leading-[18px] text-[14px] text-white">
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
                <div className="w-full">
                  <p className="font-bold leading-[28px] text-[28px] text-white">
                    S/ {course.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}