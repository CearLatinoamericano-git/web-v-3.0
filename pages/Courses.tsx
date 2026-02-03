import { useState } from 'react';
import { courses } from '../data/coursesUpdated';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import svgPathsWaves from '../imports/svg-e9ulumzys8';
import svgPathsCards from '../imports/svg-28ql4kj9ro';

const imgNaranja = "/images/courses/naranjita.png";

interface CoursesProps {
  onCourseClick: (courseId: string) => void;
}

export function Courses({ onCourseClick }: CoursesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'diplomado' | 'curso'>('all');
  const [modalityFilter, setModalityFilter] = useState<'all' | 'presencial' | 'virtual' | 'híbrido'>('all');

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || course.type === typeFilter;
    const matchesModality = modalityFilter === 'all' || course.modality === modalityFilter;
    
    return matchesSearch && matchesType && matchesModality;
  });

  // Ordenar por fecha de inicio y tomar los primeros 6
  const displayedCourses = [...filteredCourses]
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 6);

  // Mapeo de títulos según el diseño - 3 niveles de lectura
  const courseTitles: { [key: string]: { subtitle: string; mainTitle: string; thirdLevel: string } } = {
    'diplomado-derecho-administrativo-ii': {
      subtitle: 'II Diplomado de Posgrado',
      mainTitle: 'Derecho Administrativo',
      thirdLevel: 'para Árbitros'
    },
    'diplomado-jprd-ii': {
      subtitle: 'II Diplomado de Posgrado',
      mainTitle: 'Junta de Prevención<br />y Resolución de Disputas',
      thirdLevel: ''
    },
    'curso-inversion-privada': {
      subtitle: 'Curso de Especialidad',
      mainTitle: 'Mecanismos<br />de Inversión Privada',
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
      mainTitle: 'Contratos Estandarizados',
      thirdLevel: 'bajo la Ley General N°32069'
    },
    'curso-controversias-ejecucion-contractual': {
      subtitle: 'III Curso de Especialidad',
      mainTitle: 'Controversias en la Ejecución<br />Contractual de Obras Públicas',
      thirdLevel: ''
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#1c98b7] h-[500px] sm:h-[600px] lg:h-[750px] overflow-hidden relative w-full rounded-b-[50px]">
        {/* Wave Background */}
        <div className="absolute content-stretch flex flex-col h-[100px] sm:h-[144px] items-start left-0 bottom-0 w-full">
          <div className="h-[100px] sm:h-[144px] overflow-clip relative shrink-0 w-full">
            <div className="absolute inset-[30.83%_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1662 99.6">
                <path d={svgPathsWaves.p13d44600} fill="white" fillOpacity="0.1" />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="absolute h-full left-0 top-0 w-full rounded-b-[50px] overflow-hidden" style={{ background: 'linear-gradient(180deg, #561289 0%, #3954A0 50%, #1C98B7 100%)' }}>
          {/* Background Pattern - Gray Texture */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
            <div className="w-full h-full bg-gray-200" />
          </div>

          {/* Content Container - Responsive */}
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-full relative z-10" style={{ paddingTop: '140px' }}>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 h-full items-center pb-20">
              {/* Left Content */}
              <div className="space-y-2 z-10 pt-[89px]">
                {/* Main Title */}
                <div className="space-y-[2px]">
                  <h1 
                    className="font-['Inter'] font-bold text-white"
                    style={{
                      fontSize: 'clamp(32px, 6vw, 70px)',
                      textShadow: '0 4px 12px rgba(0, 0, 0, 0.37)',
                      letterSpacing: '-0.02em',
                      lineHeight: '0.95'
                    }}
                  >
                    DESCUBRE
                  </h1>
                  <h2 
                    className="font-['Inter'] font-bold text-white"
                    style={{
                      fontSize: 'clamp(36px, 7.5vw, 90px)',
                      textShadow: '0 4px 12px rgba(0, 0, 0, 0.37)',
                      letterSpacing: '-0.025em',
                      lineHeight: '1'
                    }}
                  >
                    NUESTRAS
                  </h2>
                  <h2 
                    className="font-['Inter'] font-bold text-white"
                    style={{
                      fontSize: 'clamp(36px, 7.5vw, 90px)',
                      textShadow: '0 4px 12px rgba(0, 0, 0, 0.37)',
                      letterSpacing: '-0.015em',
                      lineHeight: '1'
                    }}
                  >
                    ESPECIALIDADES
                  </h2>
                </div>

                {/* Description */}
                <p 
                  className="text-white/85 leading-relaxed max-w-[760px] font-bold pt-[9px]"
                  style={{
                    fontSize: 'clamp(14px, 1.5vw, 22px)'
                  }}
                >
                  Explora nuestra oferta completa de diplomados y cursos.
                </p>
              </div>

              {/* Right Image - Professional with certificate */}
              <div className="hidden lg:flex justify-end items-center relative h-[550px]">
                <div className="relative w-full max-w-[600px] h-full p-0 mt-[120px]">
                  <img 
                    alt="Profesional con certificado" 
                    className="absolute bottom-0 right-0 h-full w-auto object-contain object-bottom" 
                    src={imgNaranja} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters Section */}
      <div className="py-8 sm:py-12 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[30px] shadow-[0px_8px_40px_rgba(0,0,0,0.15)] p-8 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Search */}
              <div>
                <label className="block text-[14px] text-gray-700 mb-2 font-medium">
                  Buscar programa
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por nombre o descripción..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent transition-all text-[15px]"
                />
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-[14px] text-gray-700 mb-2 font-medium">
                  Tipo de programa
                </label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as 'all' | 'diplomado' | 'curso')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent transition-all text-[15px] bg-white"
                >
                  <option value="all">Todos</option>
                  <option value="diplomado">Diplomados</option>
                  <option value="curso">Cursos</option>
                </select>
              </div>

              {/* Modality Filter */}
              <div>
                <label className="block text-[14px] text-gray-700 mb-2 font-medium">
                  Modalidad
                </label>
                <select
                  value={modalityFilter}
                  onChange={(e) => setModalityFilter(e.target.value as 'all' | 'presencial' | 'virtual' | 'híbrido')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent transition-all text-[15px] bg-white"
                >
                  <option value="all">Todas</option>
                  <option value="virtual">Virtual</option>
                  <option value="presencial">Presencial</option>
                  <option value="híbrido">Híbrido</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="max-w-7xl mx-auto">
        {displayedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 px-4 sm:px-6 md:px-8 lg:px-12 mb-[106px]">
            {displayedCourses.map((course) => {
              const { subtitle, mainTitle } = courseTitles[course.id] || {
                subtitle: course.type === 'diplomado' ? 'Diplomado de Posgrado' : 'Curso de Especialidad',
                mainTitle: course.title
              };

              return (
                <div
                  key={course.id}
                  className="group cursor-pointer h-full flex"
                  onClick={() => onCourseClick(course.id)}
                >
                  {/* Card - Frame principal con altura fija */}
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
                          <div className="bg-[#1c98b7] h-[22px] rounded-full shadow-[0px_2px_8px_0px_rgba(0,0,0,0.2)] px-3.5 py-1">
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
                            <p className="font-semibold leading-[22px] text-[#1c98b7] text-[18px] line-clamp-3" dangerouslySetInnerHTML={{ __html: mainTitle }} />
                          </div>
                        </div>
                      </div>

                      {/* Info Section - Compacta */}
                      <div className="flex flex-col gap-2 w-full px-4 pb-4">
                        {/* Date */}
                        <div className="flex items-center gap-2">
                          <div className="h-[16px] w-[16px] shrink-0">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 22.8571">
                              <path d={svgPathsCards.p266f1500} fill="#1E397E" />
                            </svg>
                          </div>
                          <p className="font-medium leading-[18px] text-[#1e397e] text-[13px] truncate">
                            {course.duration}
                          </p>
                        </div>

                        {/* Certification y Hours en una fila */}
                        <div className="flex items-center justify-between gap-3">
                          {/* Certification */}
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className="h-[14px] w-[10px] shrink-0">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.325 22.5098">
                                <path d={svgPathsCards.p204cb000} stroke="#1E397E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.04643" />
                              </svg>
                            </div>
                            <p className="font-medium leading-[16px] text-[#1e397e] text-[12px] truncate">
                              Doble certificación
                            </p>
                          </div>

                          {/* Hours */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            <div className="h-[14px] w-[14px] shrink-0">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.0723 19.165">
                                <path d={svgPathsCards.p151628c0} stroke="#074A97" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
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
        ) : (
          <div className="text-center py-12">
            <h3 className="text-gray-900 mb-2 text-[20px] font-semibold">
              No se encontraron programas
            </h3>
            <p className="text-gray-600">
              Intente ajustar sus filtros de búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  );
}