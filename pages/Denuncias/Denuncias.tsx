import { ComplaintFormModal } from "../../components/ComplaintFormModal";
import { useState } from "react";
import { Shield, FileText, CheckCircle, AlertCircle, Mail } from "lucide-react";
import {
  policies,
  regulations,
  getRegulationUrl,
} from "../../data/policiesAndRegulations";

export function Denuncias() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#EFF6FF]">
      {/* Hero Section */}
      <div className="relative bg-white py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Content */}
          <div className="text-center max-w-5xl mx-auto">
            {/* Main Heading */}
            <h1 className="text-gray-900 mb-8 text-5xl lg:text-7xl leading-tight tracking-tight mt-4">
              Canal de <span className="text-[#0B95BA]">denuncias</span>
            </h1>

            {/* Description Box */}
            <div className="inline-block px-8 py-6 border-2 border-[#0B95BA] rounded-3xl mb-10 max-w-3xl">
              <p className="text-[#0B95BA] text-lg lg:text-xl leading-relaxed">
                Este espacio recibe denuncias de forma confidencial y cada
                reporte será tratado con absoluta reserva por un equipo
                profesional especializado.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#0B95BA] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="white"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">
                  Confidencial
                </h3>
                <p className="text-gray-600 text-sm">
                  Su identidad y reporte están completamente protegidos
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#0B95BA] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="white"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">
                  Seguro
                </h3>
                <p className="text-gray-600 text-sm">
                  Proceso transparente con seguimiento profesional
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#0B95BA] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="white"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">
                  Rápido
                </h3>
                <p className="text-gray-600 text-sm">
                  Atención inmediata y respuesta oportuna
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1440px] mx-auto">
          {/* ¿Qué es una denuncia? Card - Full Width */}
          <div className="mb-8 lg:mb-10">
            <div className="bg-white rounded-3xl p-6 lg:p-10 border border-gray-100">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-2xl p-4 flex-shrink-0 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
                  <AlertCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0B95BA] mb-4">
                    ¿Qué es una denuncia?
                  </h2>
                  <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
                    Es la comunicación que puede establecer con nosotros para
                    reportar cualquier infracción o irregularidad relacionada
                    con nuestras políticas o reglamentos. Nuestro objetivo es
                    investigar y resolver estas situaciones, garantizando la
                    transparencia y la integridad de todas nuestras operaciones.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid - Reorganized Layout */}
          <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Left Column - Policies and Regulations (2/5 width - thinner) */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              {/* NUESTRAS POLÍTICAS Card */}
              <div className="bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-2xl p-4 lg:p-5 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white bg-opacity-25 rounded-lg p-2 flex-shrink-0">
                    <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <h2 className="text-lg lg:text-xl xl:text-2xl font-bold text-white uppercase">
                    NUESTRAS POLÍTICAS
                  </h2>
                </div>
                <p className="text-white text-xs lg:text-sm xl:text-base mb-4 opacity-95">
                  Denuncie si se cometió una infracción a nuestras políticas:
                </p>
                <div className="space-y-2">
                  {policies.map((politica) => (
                    <a
                      key={politica.id}
                      href={politica.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white rounded-lg p-2.5 lg:p-3 flex items-center gap-2 hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer"
                    >
                      <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-[#0B95BA] flex-shrink-0" />
                      <span className="text-[#0B95BA] font-medium text-xs lg:text-sm">
                        {politica.title}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* NUESTROS REGLAMENTOS Card */}
              <div className="bg-white rounded-2xl p-4 lg:p-5 shadow-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#087A98] rounded-lg p-2 flex-shrink-0">
                    <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <h2 className="text-lg lg:text-xl xl:text-2xl font-bold text-[#087A98] uppercase">
                    NUESTROS REGLAMENTOS
                  </h2>
                </div>
                <p className="text-gray-700 text-xs lg:text-sm xl:text-base mb-4">
                  Denuncie si se cometió una infracción a nuestros reglamentos:
                </p>
                <div className="space-y-2 mb-4">
                  {regulations.map((reglamento) => (
                    <a
                      key={reglamento.id}
                      href={getRegulationUrl(reglamento, false)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#0A8FB2] rounded-lg p-2.5 lg:p-3 flex items-center gap-2 hover:bg-[#087A98] hover:scale-[1.02] transition-all cursor-pointer"
                    >
                      <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-white flex-shrink-0" />
                      <span className="text-white font-medium text-xs lg:text-sm">
                        {reglamento.title}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            {/* Right Column - Illustration (3/5 width - larger) */}
            <div className="lg:col-span-2 flex flex-col">
              {/* Illustration Card */}
              <div className="flex flex-col items-center justify-center h-full sticky top-8">
                <div className="relative w-full max-w-[380px] lg:max-w-[400px] xl:max-w-[530px] mx-auto flex items-center justify-center mt-3">
                  <img
                    src="/assets/denuncias.svg"
                    alt="Ilustración de denuncia"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Botón Realizar denuncia - Moved to bottom */}
          <div className="mt-6 max-w-[600px] mx-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-[#0B95BA] text-white rounded-xl p-2 lg:p-3 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 font-bold text-base lg:text-lg group"
            >
              <Mail className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" />
              <span>Realizar denuncia</span>
            </button>
            <p className="text-center text-gray-700 text-xs lg:text-sm mt-4">
              Todas las denuncias son tratadas con estricta confidencialidad
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ComplaintFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

