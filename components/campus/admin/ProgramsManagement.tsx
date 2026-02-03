import { useState } from 'react';
import { Plus, Edit, Trash2, Search, FileText, Settings } from 'lucide-react';
import { toast } from 'sonner';

interface Program {
  id: string;
  code: string;
  name: string;
  nameQ10: string;
  resolution: string;
  year: string;
  version: string;
  thematic: string;
  type: 'Diplomado' | 'Curso';
  status: 'active' | 'inactive';
  coursesCount: number;
  maxStudents: number;
  currentStudents: number;
}

export function ProgramsManagement() {
  const mockPrograms: Program[] = [
    {
      id: '1',
      code: 'DIPDERAD2024',
      name: 'III Diplomado en Especialización de Derecho Administrativo para Árbitros',
      nameQ10: 'DIPDERAD',
      resolution: 'R.D. N° 145-2024',
      year: '2024',
      version: 'III',
      thematic: 'DERECHO ADMINISTRATIVO PARA ÁRBITROS',
      type: 'Diplomado',
      status: 'active',
      coursesCount: 3,
      maxStudents: 60,
      currentStudents: 45
    },
    {
      id: '2',
      code: 'CEMEIP2024',
      name: 'Curso de Especialización en Mecanismos de Inversión Privada: APP, OXI y G2G',
      nameQ10: 'CEMEIP',
      resolution: 'R.D. N° 156-2024',
      year: '2024',
      version: 'V1',
      thematic: 'CONTRATACIÓN PÚBLICA',
      type: 'Curso',
      status: 'active',
      coursesCount: 2,
      maxStudents: 60,
      currentStudents: 52
    },
    {
      id: '3',
      code: 'RESCONT2024',
      name: 'Diplomado en Resolución de Controversias',
      nameQ10: 'RESCONT',
      resolution: 'R.D. N° 167-2024',
      year: '2024',
      version: 'V1',
      thematic: 'ARBITRAJE EN CONTRATACIÓN PÚBLICA',
      type: 'Diplomado',
      status: 'active',
      coursesCount: 2,
      maxStudents: 60,
      currentStudents: 38
    }
  ];

  const [programs, setPrograms] = useState<Program[]>(mockPrograms);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const filteredPrograms = programs.filter(program =>
    program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Programas de Estudio</h1>
          <p className="text-gray-600 mt-1">Gestiona los programas académicos y sus configuraciones</p>
        </div>
        <button
          className="px-6 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-xl transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Crear programa
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar programas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
        />
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredPrograms.map((program) => (
          <div key={program.id} className="bg-white rounded-2xl border-2 border-gray-200 hover:border-[#0B95BA] transition-all">
            {/* Program Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {program.code}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      program.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {program.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{program.name}</h3>
                  <p className="text-gray-600">Nombre Q10: <span className="font-medium">{program.nameQ10}</span></p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedProgram(program.id === selectedProgram ? null : program.id)}
                    className="p-2 hover:bg-blue-100 rounded-lg transition-colors group"
                    title="Ver detalles"
                  >
                    <Settings className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                  </button>
                  <button
                    className="p-2 hover:bg-blue-100 rounded-lg transition-colors group"
                    title="Editar"
                  >
                    <Edit className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                  </button>
                  <button
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
                    title="Eliminar"
                  >
                    <Trash2 className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Program Info Grid */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Resolución</p>
                <p className="font-medium text-gray-900">{program.resolution}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Año</p>
                <p className="font-medium text-gray-900">{program.year}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Versión</p>
                <p className="font-medium text-gray-900">{program.version}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Tema</p>
                <p className="font-medium text-gray-900">{program.thematic}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Tipo de Programa</p>
                <p className="font-medium text-gray-900">{program.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Máximo de Usuarios</p>
                <p className="font-medium text-gray-900">{program.maxStudents} estudiantes</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Estudiantes Actuales</p>
                <p className="font-medium text-gray-900">{program.currentStudents} estudiantes</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Cursos</p>
                <p className="font-medium text-gray-900">{program.coursesCount} cursos</p>
              </div>
            </div>

            {/* Expanded Details */}
            {selectedProgram === program.id && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <h4 className="font-bold text-gray-900 mb-4">Configuración del Programa</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pensum Configuration */}
                  <div className="bg-white rounded-xl p-5 border border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-5 h-5 text-[#0B95BA]" />
                      <h5 className="font-bold text-gray-900">Pensum Académico</h5>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">% Inasistencia permitido:</span>
                        <span className="font-medium text-gray-900">{100 - program.attendanceRequired}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Nota mínima aprobación:</span>
                        <span className="font-medium text-gray-900">14/20</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Valor máximo calificación:</span>
                        <span className="font-medium text-gray-900">20</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Horas académicas totales:</span>
                        <span className="font-medium text-gray-900">384 horas</span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Settings */}
                  <div className="bg-white rounded-xl p-5 border border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Settings className="w-5 h-5 text-[#0B95BA]" />
                      <h5 className="font-bold text-gray-900">Configuraciones Adicionales</h5>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Para preinscripciones:</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Sí</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Grupos recurrentes:</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Sí</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Diplomas automáticos:</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Sí</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Control de lectura:</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">+1 doc (75 pág)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button className="px-4 py-2 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-lg transition-colors">
                    Asignar módulos al pensum
                  </button>
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
                    Configurar horarios
                  </button>
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
                    Ver estadísticas
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredPrograms.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No se encontraron programas</p>
        </div>
      )}
    </div>
  );
}