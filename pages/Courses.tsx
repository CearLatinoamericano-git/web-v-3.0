import { useState } from 'react';
import { courses } from '../data/coursesUpdated';
import { CoursesGrid } from '../components/CoursesGrid';
import svgPathsWaves from '../imports/svg-e9ulumzys8';


const imgNaranja = "/images/courses/naranjita.png";
const backgroundImage = "/images/courses/program_back.webp";

interface CoursesProps {
  onCourseClick: (courseId: string) => void;
}

export function Courses({ onCourseClick }: CoursesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'diplomado' | 'curso' | 'taller'>('all');
  const [modalityFilter, setModalityFilter] = useState<'all' | 'presencial' | 'virtual' | 'híbrido'>('all');

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || course.type === typeFilter;
    const matchesModality = modalityFilter === 'all' || course.modality === modalityFilter;
    
    return matchesSearch && matchesType && matchesModality;
  });


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
          {/* Background Image */}
          <div 
            className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />

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
                  onChange={(e) => setTypeFilter(e.target.value as 'all' | 'diplomado' | 'curso' | 'taller')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent transition-all text-[15px] bg-white"
                >
                  <option value="all">Todos</option>
                  <option value="diplomado">Diplomados</option>
                  <option value="curso">Cursos</option>
                  <option value="taller">Talleres</option>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mb-[106px]">
        {filteredCourses.length > 0 ? (
          <CoursesGrid courses={filteredCourses} onCourseClick={onCourseClick} />
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