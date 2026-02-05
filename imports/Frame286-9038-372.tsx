import { FileText, BookOpen, AlertCircle } from 'lucide-react';
import { policies, regulations } from '../data/policiesAndRegulations';

// Imágenes - usando rutas de imágenes reales
const imgUniversitarios1 = "/images/denuncias/reglamento1.webp"; // Reglamento Académico
const imgUniversitarios2 = "/images/denuncias/reglamento2.webp"; // Reglamento Ético

// Sección de Políticas
function PoliticasSection() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 lg:mt-24">
      {/* Título de la sección */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div className="bg-[#0b95ba] p-4 sm:p-5 rounded-2xl shadow-lg">
          <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1c98b7] uppercase tracking-wide text-center sm:text-left">
          NUESTRAS POLÍTICAS
        </h2>
      </div>

      {/* Subtítulo */}
      <p className="text-center text-base sm:text-lg lg:text-xl text-gray-800 mb-8 sm:mb-12 px-4">
        Denuncie si se cometió una infracción a nuestras políticas:
      </p>

      {/* Grid de políticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-12">
        {policies.map((politica) => (
          <div
            key={politica.id}
            onClick={() => window.open(politica.url, '_blank')}
            className="bg-white border-3 border-[#1c98b7] rounded-3xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group relative overflow-hidden"
          >
            {/* Círculo con flecha */}
            <div className="absolute top-4 right-4 bg-[#087a98] rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 sm:w-9 sm:h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.22 19.03a.75.75 0 0 1 0-1.06L18.19 13H3.75a.75.75 0 0 1 0-1.5h14.44l-4.97-4.97a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l6.25 6.25a.75.75 0 0 1 0 1.06l-6.25 6.25a.75.75 0 0 1-1.06 0Z" />
              </svg>
            </div>

            {/* Texto */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-900 leading-snug pr-16 sm:pr-20">
              {politica.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Sección de Reglamentos
function ReglamentosSection() {
  const reglamentosConImagenes = [
    {
      ...regulations.find(r => r.id === 'REG-ACADEMICO')!,
      descripcion: "Normativa integral que regula los procesos formativos, evaluación y certificación de los participantes en todos nuestros programas académicos.",
      imagen: imgUniversitarios1
    },
    {
      ...regulations.find(r => r.id === 'REG-ETICO')!,
      descripcion: "Marco normativo que establece los principios éticos y conductuales que rigen las relaciones entre estudiantes, docentes y personal académico.",
      imagen: imgUniversitarios2
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Título de la sección */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12 mb-8 sm:mb-12">
        <div className="bg-[#087a98] p-4 sm:p-5 rounded-2xl shadow-lg">
          <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1c98b7] uppercase tracking-wide text-center sm:text-left">
          NUESTROS REGLAMENTOS
        </h2>
      </div>

      {/* Subtítulo */}
      <p className="text-center text-base sm:text-lg lg:text-xl text-gray-800 mb-8 sm:mb-12 px-4">
        Denuncie si se cometió una infracción a nuestros reglamentos:
      </p>

      {/* Tarjetas de reglamentos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mb-12">
        {reglamentosConImagenes.map((reglamento) => (
          <div
            key={reglamento.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
          >
            {/* Imagen */}
            <div className="w-full h-48 sm:h-56 overflow-hidden">
              <img
                src={reglamento.imagen}
                alt={reglamento.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Contenido */}
            <div className="p-6 sm:p-8">
              {/* Título con icono */}
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-[#1c98b7] shrink-0" strokeWidth={2} />
                <h3 className="text-lg sm:text-xl font-medium text-[#1c98b7]">
                  {reglamento.title}
                </h3>
              </div>

              {/* Descripción */}
              <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-6">
                {reglamento.descripcion}
              </p>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => window.open(reglamento.url, '_blank')}
                  className="w-full sm:w-auto bg-[#087a98] hover:bg-[#0a90b0] text-white px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-lg sm:text-xl font-medium">Revisar</span>
                </button>
                {/* Botón Versión 2024 comentado para Reglamento Académico
                {reglamento.variant && (
                  <button 
                    onClick={() => window.open(reglamento.variant!.url, '_blank')}
                    className="w-full sm:w-auto bg-[#0b95ba] hover:bg-[#0ca5c5] text-white px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-lg sm:text-xl font-medium">Versión {reglamento.variant.year}</span>
                  </button>
                )}
                */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Botón de denuncia
function DenunciaButton({ onClick }: { onClick?: () => void }) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
      <button 
        onClick={onClick}
        className="w-full bg-[#F08300] hover:bg-[#d97400] text-white py-4 sm:py-5 px-8 rounded-2xl shadow-xl flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-95 group"
      >
        <svg className="w-8 h-8 sm:w-9 sm:h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span className="text-lg sm:text-xl font-semibold group-hover:tracking-wide transition-all">
          Realizar denuncia
        </span>
      </button>
      <p className="text-center text-gray-600 text-base sm:text-lg mt-4 sm:mt-6">
        Todas las denuncias son tratadas con estricta confidencialidad
      </p>
    </div>
  );
}

// Componente principal
export default function Frame5({ onDenunciaClick }: { onDenunciaClick?: () => void }) {
  return (
    <div className="bg-[#f2f3f5] w-full py-12 sm:py-16 lg:py-20">
      <div className="max-w-[1920px] mx-auto">
        <ReglamentosSection />
        <PoliticasSection />
        <DenunciaButton onClick={onDenunciaClick} />
      </div>
    </div>
  );
}
