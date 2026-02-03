import { useState } from 'react';
import { Plus, Edit, Trash2, Search, FileText, Star, Meh, Frown, Smile } from 'lucide-react';
import { toast } from 'sonner';

interface Survey {
  id: string;
  title: string;
  type: 'module' | 'teacher' | 'evaluation' | 'certificate';
  targetProgram: string;
  status: 'active' | 'draft' | 'closed';
  responses: number;
  createdAt: string;
}

export function SurveysManagement() {
  const [surveys, setSurveys] = useState<Survey[]>([
    {
      id: '1',
      title: 'Encuesta de Satisfacción - Módulo 1',
      type: 'module',
      targetProgram: 'Diplomado en Arbitraje',
      status: 'active',
      responses: 45,
      createdAt: '2024-11-01'
    },
    {
      id: '2',
      title: 'Evaluación del Docente - Dr. Carlos Méndez',
      type: 'teacher',
      targetProgram: 'Diplomado en Arbitraje',
      status: 'active',
      responses: 38,
      createdAt: '2024-11-15'
    },
    {
      id: '3',
      title: 'Encuesta post-evaluación parcial',
      type: 'evaluation',
      targetProgram: 'Contratación Pública',
      status: 'active',
      responses: 52,
      createdAt: '2024-11-20'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredSurveys = surveys.filter(survey =>
    survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    survey.targetProgram.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      module: 'Por Módulo',
      teacher: 'Por Docente',
      evaluation: 'Post-Evaluación',
      certificate: 'Para Certificado'
    };
    return labels[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      module: 'bg-blue-100 text-blue-700',
      teacher: 'bg-purple-100 text-purple-700',
      evaluation: 'bg-amber-100 text-amber-700',
      certificate: 'bg-green-100 text-green-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Encuestas y formularios</h1>
          <p className="text-gray-600 mt-1">Gestiona las encuestas de retroalimentación del sistema</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-xl transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Crear encuesta
        </button>
      </div>

      {/* Rating Scale Info */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-2xl p-6 text-white">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Star className="w-6 h-6" />
          Escala de calificación estándar
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="flex justify-center mb-2">
              <Star className="w-8 h-8 fill-current" />
            </div>
            <div className="font-bold mb-1">5 ⭐</div>
            <div className="text-sm opacity-90">Muy satisfecho</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="flex justify-center mb-2">
              <Smile className="w-8 h-8" />
            </div>
            <div className="font-bold mb-1">4 ⭐</div>
            <div className="text-sm opacity-90">Satisfecho</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="flex justify-center mb-2">
              <Meh className="w-8 h-8" />
            </div>
            <div className="font-bold mb-1">3 😐</div>
            <div className="text-sm opacity-90">Neutral</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="flex justify-center mb-2">
              <Frown className="w-8 h-8" />
            </div>
            <div className="font-bold mb-1">2 😕</div>
            <div className="text-sm opacity-90">Insatisfecho</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="flex justify-center mb-2">
              <Frown className="w-8 h-8" />
            </div>
            <div className="font-bold mb-1">1 😠</div>
            <div className="text-sm opacity-90">Muy insatisfecho</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar encuestas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
        />
      </div>

      {/* Surveys Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSurveys.map((survey) => (
          <div key={survey.id} className="bg-white rounded-2xl border-2 border-gray-200 hover:border-[#0B95BA] transition-all p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(survey.type)}`}>
                    {getTypeLabel(survey.type)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    survey.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : survey.status === 'draft'
                      ? 'bg-gray-100 text-gray-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {survey.status === 'active' ? 'Activa' : survey.status === 'draft' ? 'Borrador' : 'Cerrada'}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{survey.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{survey.targetProgram}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Respuestas recibidas:</span>
                <span className="font-bold text-[#0B95BA] text-xl">{survey.responses}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0B95BA] rounded-full transition-all"
                  style={{ width: `${Math.min((survey.responses / 60) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Meta: 60 respuestas</p>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span>Creada:</span>
              <span className="font-medium">
                {new Date(survey.createdAt).toLocaleDateString('es-PE', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}
              </span>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-lg transition-colors text-sm">
                Ver resultados
              </button>
              <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                <Edit className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                <Trash2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Survey Types Info */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Tipos de Encuestas Configurables</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-2">Encuesta por Módulo</h4>
            <p className="text-sm text-blue-700">Se aplica al finalizar cada módulo del programa. Evalúa contenido, metodología y materiales.</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
            <h4 className="font-bold text-purple-900 mb-2">Encuesta por Docente</h4>
            <p className="text-sm text-purple-700">Se aplica al finalizar el programa. Evalúa desempeño, claridad y atención del docente.</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
            <h4 className="font-bold text-amber-900 mb-2">Encuesta post-evaluación</h4>
            <p className="text-sm text-amber-700">Se aplica después de evaluaciones importantes. Mide percepción de dificultad y claridad.</p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <h4 className="font-bold text-green-900 mb-2">Encuesta para Certificado</h4>
            <p className="text-sm text-green-700">Obligatoria para descargar certificado. Evalúa experiencia general del programa.</p>
          </div>
        </div>
      </div>

      {filteredSurveys.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No se encontraron encuestas</p>
        </div>
      )}
    </div>
  );
}
