import { FileText, Download, ExternalLink, Shield, BookOpen } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  category: 'calidad' | 'seguridad' | 'gestion' | 'privacidad' | 'academico' | 'etico';
  size?: string;
  lastUpdate?: string;
  type: 'policy' | 'regulation';
  code?: string;
  version?: string;
}

export function PoliciesView() {
  const policies: Document[] = [
    // Calidad
    {
      id: '1',
      title: 'Política de Gestión de Calidad',
      category: 'calidad',
      size: '1.2 MB',
      lastUpdate: '01/07/2025',
      type: 'policy'
    },
    // Gestión
    {
      id: '8',
      title: 'Política de Gestión de Incidentes',
      category: 'privacidad',
      size: '1.4 MB',
      lastUpdate: '05/02/2025',
      type: 'policy',
      code: 'PO-11',
      version: '01'
    },
    {
      id: '3',
      title: 'Política de Protección a los Trabajadores',
      category: 'gestion',
      size: '1.1 MB',
      lastUpdate: '01/07/2025',
      type: 'policy',
      code: 'PO-03',
      version: '02'
    },
    {
      id: '4',
      title: 'Política de Regalos, Atenciones y Cortesías',
      category: 'gestion',
      size: '740 KB',
      lastUpdate: '01/07/2025',
      type: 'policy',
      code: 'PO-04',
      version: '02'
    },
    {
      id: '2',
      title: 'Política del Sistema de Gestión Antisoborno',
      category: 'gestion',
      size: '850 KB',
      lastUpdate: '01/07/2025',
      type: 'policy',
      code: 'PO-02',
      version: '02'
    },
    // Seguridad
    {
      id: '5',
      title: 'Política del Sistema de Gestión de Seguridad de la Información',
      category: 'seguridad',
      size: '2.3 MB',
      lastUpdate: '04/02/2025',
      type: 'policy'
    },
    {
      id: '6',
      title: 'Política de Seguridad de Proveedores',
      category: 'seguridad',
      size: '950 KB',
      lastUpdate: '05/02/2025',
      type: 'policy'
    },
    // Privacidad
    {
      id: '7',
      title: 'Política de Privacidad de Datos',
      category: 'privacidad',
      size: '1.5 MB',
      lastUpdate: '05/02/2025',
      type: 'policy',
      code: 'PO-19',
      version: '01'
    },
    {
      id: '9',
      title: 'Política de Uso de Información Confidencial',
      category: 'privacidad',
      size: '1.3 MB',
      lastUpdate: '05/02/2025',
      type: 'policy',
      code: 'PO-20',
      version: '01'
    }
  ];

  const regulations: Document[] = [
    {
      id: 'r1',
      title: 'Reglamento Académico',
      category: 'academico',
      size: '2.1 MB',
      lastUpdate: '15/11/2025',
      type: 'regulation'
    },
    {
      id: 'r2',
      title: 'Reglamento Ético',
      category: 'etico',
      size: '1.8 MB',
      lastUpdate: '10/11/2025',
      type: 'regulation'
    }
  ];

  const getCategoryColor = (category: Document['category']) => {
    switch (category) {
      case 'calidad':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'seguridad':
        return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      case 'gestion':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'privacidad':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'academico':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'etico':
        return 'bg-teal-100 text-teal-700 border-teal-200';
    }
  };

  const getCategoryLabel = (category: Document['category']) => {
    switch (category) {
      case 'calidad':
        return 'Calidad';
      case 'seguridad':
        return 'Seguridad';
      case 'gestion':
        return 'Gestión';
      case 'privacidad':
        return 'Privacidad';
      case 'academico':
        return 'Académico';
      case 'etico':
        return 'Ético';
    }
  };

  const handleDownload = (documentId: string, documentTitle: string) => {
    // Simulación de descarga - en producción se conectaría con la API
    console.log(`Descargando documento: ${documentTitle}`);
    alert(`Descargando: ${documentTitle}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Políticas y reglamentos</h1>
          </div>
        </div>
        <p className="text-xl opacity-90 text-justify leading-relaxed">
          En CEAR LATINOAMERICANO aplicamos políticas y reglamentos que aseguran calidad, ética y transparencia en cada proceso, ofreciendo una experiencia formativa alineada con los más altos estándares.
        </p>
      </div>

      {/* Información adicional */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-2">Información importante</h3>
            <p className="text-gray-700 text-sm text-justify leading-relaxed">
              Todas nuestras políticas están alineadas con las normas internacionales de gestión de la calidad, antisoborno y seguridad de la información, por lo que es fundamental que toda nuestra comunidad académica las conozca y respete para mantener un entorno de excelencia y transparencia.
            </p>
          </div>
        </div>
      </div>

      {/* Sección de Políticas */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Políticas</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {policies.map((policy) => (
            <div
              key={policy.id}
              className="border border-gray-200 rounded-xl p-5 hover:border-[#0B95BA] hover:shadow-lg transition-all group cursor-pointer bg-white"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#0B95BA] transition-colors">
                    {policy.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>{policy.size}</span>
                    <span>{policy.lastUpdate}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(policy.id, policy.title);
                    }}
                    className="w-full py-2 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Descargar PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sección de Reglamentos */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Reglamentos</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {regulations.map((regulation) => (
            <div
              key={regulation.id}
              className="border border-gray-200 rounded-xl p-5 hover:border-[#0B95BA] hover:shadow-lg transition-all group cursor-pointer bg-white"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#0B95BA] mb-2 line-clamp-2">
                    {regulation.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>{regulation.size}</span>
                    <span>{regulation.lastUpdate}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(regulation.id, regulation.title);
                    }}
                    className="w-full py-2 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Descargar PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer informativo */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0 p-[0px]">
            <ExternalLink className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-2">¿Necesita más información?</h3>
            <p className="text-gray-700 text-sm text-justify pt-[0px] pr-[206px] pb-[0px] pl-[0px] leading-relaxed">
              Si tiene alguna duda o necesita información adicional, no dude en contactarnos.
            </p>
          </div>
          <div className="flex-shrink-0">
            <button className="px-6 py-2.5 bg-gray-700 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors whitespace-nowrap">
              Contactar con soporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}