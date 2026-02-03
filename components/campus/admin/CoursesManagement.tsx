import { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Users, Calendar, BookOpen, Eye, Settings, ArrowLeft, ClipboardCheck, BarChart3, Award, UserCog } from 'lucide-react';
import { toast } from 'sonner';

interface Course {
  id: string;
  code: string;
  name: string;
  program: string;
  year: string;
  version: string;
  status: 'draft' | 'active' | 'completed' | 'archived';
  students: number;
  maxStudents: number;
  startDate: string;
  endDate: string;
  modules: number;
  hours: number;
}

interface CoursesManagementProps {
  onCreateCourse: () => void;
  onEditCourse: (courseId: string) => void;
  onViewCourse: (courseId: string) => void;
  onManageStudents: (courseId: string) => void;
  onManageSchedules: (courseId: string) => void;
  onManageContent: (courseId: string) => void;
  onManageAttendance: (courseId: string) => void;
  onManageGrades: (courseId: string) => void;
  onManageCertificates: (courseId: string) => void;
  onBack?: () => void;
}

export function CoursesManagement({ onCreateCourse, onEditCourse, onViewCourse, onManageStudents, onManageSchedules, onManageContent, onManageAttendance, onManageGrades, onManageCertificates, onBack }: CoursesManagementProps) {
  const allCourses: Course[] = [
    {
      id: '1',
      code: 'DIPDERAD-2024-III',
      name: 'III Diplomado en Especialización de Derecho Administrativo para Árbitros',
      program: 'Diplomado en Derecho Administrativo',
      year: '2024',
      version: 'III',
      status: 'active',
      students: 45,
      maxStudents: 60,
      startDate: '2024-01-15',
      endDate: '2024-06-15',
      modules: 6,
      hours: 120
    },
    {
      id: '2',
      code: 'CEMEIP-2024-V1',
      name: 'Curso de Especialización en Mecanismos de Inversión Privada: APP, OXI y G2G',
      program: 'Curso de Especialización',
      year: '2024',
      version: 'V1',
      status: 'active',
      students: 52,
      maxStudents: 60,
      startDate: '2024-01-20',
      endDate: '2024-06-20',
      modules: 5,
      hours: 100
    },
    {
      id: '3',
      code: 'RESCONT-2024-V1',
      name: 'Diplomado en Resolución de Controversias',
      program: 'Diplomado en Resolución de Controversias',
      year: '2024',
      version: 'V1',
      status: 'active',
      students: 38,
      maxStudents: 60,
      startDate: '2024-02-01',
      endDate: '2024-07-01',
      modules: 6,
      hours: 120
    }
  ];

  const [courses, setCourses] = useState<Course[]>(allCourses);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterYear, setFilterYear] = useState<string>('all');

  // Obtener años únicos de los cursos
  const uniqueYears = Array.from(new Set(courses.map(c => c.year))).sort().reverse();

  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
    const matchesYear = filterYear === 'all' || course.year === filterYear;
    
    return matchesSearch && matchesStatus && matchesYear;
  });

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      draft: 'Borrador',
      active: 'Activo',
      completed: 'Completado',
      archived: 'Archivado'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-700',
      active: 'bg-green-100 text-green-700',
      completed: 'bg-blue-100 text-blue-700',
      archived: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este curso? Esta acción no se puede deshacer.')) {
      setCourses(courses.filter(c => c.id !== id));
      toast.success('Curso eliminado');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header con fondo celeste */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            {onBack && (
              <button
                onClick={onBack}
                className="mb-3 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver
              </button>
            )}
            <h1 className="text-4xl font-bold mb-2">Gestión de programas</h1>
            <p className="text-lg opacity-90">Crea y administra todos los programas del sistema</p>
          </div>
          <button
            onClick={onCreateCourse}
            className="px-6 py-3 bg-white text-[#0B95BA] rounded-xl font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Crear nuevo programa
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#0EA5E9] text-white flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900 text-[24px]">{courses.length}</p>
            <p className="text-xs text-gray-600 whitespace-nowrap text-[15px] mx-[-7px] my-[0px]">Total de programas</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#10B981] text-white flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900 text-[24px]">{courses.filter(c => c.status === 'active').length}</p>
            <p className="text-xs text-gray-600 whitespace-nowrap text-[15px] mx-[-7px] my-[0px]">Programas activos</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#3B82F6] text-white flex items-center justify-center flex-shrink-0">
            <Users className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900 text-[24px]">{courses.reduce((acc, c) => acc + c.students, 0)}</p>
            <p className="text-xs text-gray-600 whitespace-nowrap text-[15px] mx-[-7px] my-[0px]">Total estudiantes</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#EAB308] text-white flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900 text-[24px]">{courses.filter(c => c.status === 'draft').length}</p>
            <p className="text-xs text-gray-600 whitespace-nowrap text-[15px] mx-[-7px] my-[0px]">Borradores</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, código o docente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
          />
        </div>

        {/* Filter Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="draft">Borrador</option>
              <option value="active">Activo</option>
              <option value="completed">Completado</option>
              <option value="archived">Archivado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
            >
              <option value="all">Todos los años</option>
              {uniqueYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters Indicator */}
        {(filterStatus !== 'all' || filterYear !== 'all') && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600">Filtros activos:</span>
            {filterStatus !== 'all' && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2">
                Estado: {getStatusLabel(filterStatus)}
                <button
                  onClick={() => setFilterStatus('all')}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}
            {filterYear !== 'all' && (
              <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm flex items-center gap-2">
                Año: {filterYear}
                <button
                  onClick={() => setFilterYear('all')}
                  className="hover:bg-cyan-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setFilterStatus('all');
                setFilterYear('all');
              }}
              className="text-sm text-[#0B95BA] hover:text-[#087A98] font-medium"
            >
              Limpiar todos
            </button>
          </div>
        )}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl border-2 border-gray-200 hover:border-[#0B95BA] transition-all overflow-hidden"
          >
            {/* Course Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-mono font-medium">
                      {course.code}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(course.status)}`}>
                      {getStatusLabel(course.status)}
                    </span>
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                      {course.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>Programa: <span className="font-medium text-gray-900">{course.program}</span></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onViewCourse(course.id)}
                    className="p-2 hover:bg-blue-100 rounded-lg transition-colors group"
                    title="Ver contenido"
                  >
                    <Eye className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                  </button>
                  <button
                    onClick={() => onEditCourse(course.id)}
                    className="p-2 hover:bg-blue-100 rounded-lg transition-colors group"
                    title="Editar"
                  >
                    <Edit className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
                    title="Eliminar"
                  >
                    <Trash2 className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Course Info Grid */}
            <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Fecha de inicio</p>
                <p className="font-medium text-gray-900">
                  {(() => {
                    if (!course.startDate) return 'No definido';
                    const date = new Date(course.startDate);
                    return isNaN(date.getTime()) ? 'No definido' : date.toLocaleDateString('es-PE', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    });
                  })()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Fecha de fin</p>
                <p className="font-medium text-gray-900">
                  {(() => {
                    if (!course.endDate) return 'No definido';
                    const date = new Date(course.endDate);
                    return isNaN(date.getTime()) ? 'No definido' : date.toLocaleDateString('es-PE', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    });
                  })()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Estudiantes</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900">{course.students} / {course.maxStudents}</p>
                  {course.students >= course.maxStudents ? (
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">Lleno</span>
                  ) : course.students >= course.maxStudents * 0.8 ? (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">Casi lleno</span>
                  ) : null}
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                  <div
                    className={`h-full rounded-full transition-all ${
                      course.students >= course.maxStudents 
                        ? 'bg-red-500'
                        : course.students >= course.maxStudents * 0.8
                        ? 'bg-amber-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${(course.students / course.maxStudents) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => onViewCourse(course.id)}
                className="flex-1 px-4 py-2 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Editar programa
              </button>
              <button
                onClick={() => onManageStudents(course.id)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Matricular estudiantes
              </button>
              <button
                onClick={() => onManageSchedules(course.id)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Horarios
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No se encontraron cursos</p>
          <button
            onClick={onCreateCourse}
            className="px-6 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-xl transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Crear primer curso
          </button>
        </div>
      )}
    </div>
  );
}