import { BookOpen, Clock, Award, TrendingUp, Search, Filter, Play, CheckCircle, Lock, Download, Eye } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner';

interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar: string;
  thumbnail: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  totalHours: number;
  enrolledDate: string;
  nextClass?: string;
  status: 'in-progress' | 'completed' | 'not-started';
  category: string;
  completedDate?: string;
  finalGrade?: number;
  certificateId?: string;
}

interface StudentCoursesViewProps {
  onNavigateToCourse: (courseId: string) => void;
}

export function StudentCoursesView({ onNavigateToCourse }: StudentCoursesViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'in-progress' | 'completed'>('in-progress');

  // Cursos del estudiante (esto vendría de una API o contexto)
  const studentCourses: Course[] = [
    {
      id: '1',
      title: 'Diplomado en Contratación Pública bajo la Ley 32090',
      instructor: 'Dr. Carlos Méndez Velasco',
      instructorAvatar: 'https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      progress: 65,
      totalModules: 12,
      completedModules: 8,
      totalHours: 120,
      enrolledDate: '15/10/2025',
      nextClass: 'Mañana 18:00',
      status: 'in-progress',
      category: 'Diplomado'
    },
    {
      id: '2',
      title: 'Especialización en Arbitraje Comercial Internacional',
      instructor: 'Dra. María González Ríos',
      instructorAvatar: 'https://images.unsplash.com/photo-1522199899308-2eef382e2158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      thumbnail: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      progress: 100,
      totalModules: 10,
      completedModules: 10,
      totalHours: 100,
      enrolledDate: '01/09/2025',
      completedDate: '28/11/2025',
      finalGrade: 18.5,
      certificateId: 'CERT-ARB-2025-00142',
      status: 'completed',
      category: 'Especialización'
    },
    {
      id: '3',
      title: 'Curso de Resolución de Controversias en Construcción',
      instructor: 'Dr. Jorge Ramírez Torres',
      instructorAvatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      progress: 35,
      totalModules: 8,
      completedModules: 3,
      totalHours: 80,
      enrolledDate: '20/10/2025',
      nextClass: 'Hoy 20:00',
      status: 'in-progress',
      category: 'Curso'
    },
    {
      id: '4',
      title: 'Jurisprudencia y Procedimientos Arbitrales',
      instructor: 'Dr. Roberto Sánchez Díaz',
      instructorAvatar: 'https://images.unsplash.com/photo-1758599543154-76ec1c4257df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      thumbnail: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      progress: 0,
      totalModules: 6,
      completedModules: 0,
      totalHours: 60,
      enrolledDate: '22/11/2025',
      nextClass: '26/11 19:00',
      status: 'not-started',
      category: 'Curso'
    }
  ];

  const stats = {
    totalCourses: studentCourses.length,
    inProgress: studentCourses.filter(c => c.status === 'in-progress').length,
    completed: studentCourses.filter(c => c.status === 'completed').length,
    totalHours: studentCourses.reduce((sum, c) => sum + (c.totalHours * c.progress / 100), 0)
  };

  const filteredCourses = studentCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: Course['status']) => {
    switch (status) {
      case 'in-progress':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">En Progreso</span>;
      case 'completed':
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Completado</span>;
      case 'not-started':
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">No Iniciado</span>;
    }
  };

  const handleViewCertificate = (e: React.MouseEvent, courseName: string) => {
    e.stopPropagation();
    toast.success('Abriendo vista previa del certificado...');
    // Aquí iría la lógica para abrir el certificado en un modal o nueva ventana
  };

  const handleDownloadCertificate = (e: React.MouseEvent, courseName: string, certificateId: string) => {
    e.stopPropagation();
    toast.success(`Descargando certificado ${certificateId}...`);
    // Aquí iría la lógica para descargar el certificado
  };

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Mis programas</h1>
            <p className="text-xl opacity-90">Acceda a sus programas y monitoree su avance académico</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[120px]">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm opacity-80">Programas</span>
              </div>
              <p className="text-3xl font-bold">{stats.totalCourses}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[120px]">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-5 h-5" />
                <span className="text-sm opacity-80">Horas</span>
              </div>
              <p className="text-3xl font-bold">{Math.round(stats.totalHours)}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[120px]">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-5 h-5" />
                <span className="text-sm opacity-80">Completados</span>
              </div>
              <p className="text-3xl font-bold">{stats.completed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar cursos por nombre o instructor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('in-progress')}
              className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                filterStatus === 'in-progress'
                  ? 'bg-[#0B95BA] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              En Progreso
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                filterStatus === 'completed'
                  ? 'bg-[#0B95BA] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completados
            </button>
          </div>
        </div>
      </div>

      {/* Grid de cursos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
            onClick={() => onNavigateToCourse(course.id)}
          >
            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden">
              <ImageWithFallback
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4">
                {getStatusBadge(course.status)}
              </div>
              {course.status === 'completed' && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                </div>
              )}
              {course.status === 'not-started' && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                </div>
              )}
              {course.status === 'in-progress' && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-4">
                  <button className="px-4 py-2 bg-white text-[#0B95BA] rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Continuar
                  </button>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-[#0B95BA]/10 text-[rgb(255,255,255)] text-xs font-medium rounded-full">
                  {course.category}
                </span>
                <span className="text-xs text-gray-500">
                  Inscrito: {course.enrolledDate}
                </span>
              </div>

              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#0B95BA] transition-colors">
                {course.title}
              </h3>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Progreso</span>
                  <span className="text-sm font-bold text-[#0B95BA]">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] h-2 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.completedModules}/{course.totalModules} módulos</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.totalHours}h totales</span>
                </div>
              </div>

              {/* Completed Course Info - Final Grade */}
              {course.status === 'completed' && course.finalGrade && (
                <div className="mb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Programa completado el</p>
                      <p className="font-bold text-gray-900">{course.completedDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Calificación final</p>
                      <p className="text-3xl font-bold text-green-600">{course.finalGrade.toFixed(1)}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Next class */}
              {course.nextClass && course.status === 'in-progress' && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-600">Próxima clase:</span>
                    <span className="font-medium text-gray-900">{course.nextClass}</span>
                  </div>
                </div>
              )}

              {/* Certificado - Enhanced for completed courses */}
              {course.status === 'completed' && course.certificateId && (
                <div className="pt-4 border-t-2 border-gray-200">
                  <div className="bg-gradient-to-r from-[#0B95BA]/5 to-[#087A98]/5 rounded-xl p-4 border-2 border-[#0B95BA]/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[rgb(255,255,255)]">Certificado disponible</p>
                        <p className="font-bold text-[rgb(255,255,255)] text-sm">ID: {course.certificateId}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handleViewCertificate(e, course.title)}
                        className="flex-1 px-4 py-2.5 bg-white border-2 border-[#0B95BA] text-[rgb(255,255,255)] hover:bg-[#0B95BA] hover:text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Eye className="w-4 h-4" />
                        Vista previa
                      </button>
                      <button
                        onClick={(e) => handleDownloadCertificate(e, course.title, course.certificateId)}
                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#0B95BA] to-[#087A98] hover:from-[#087A98] hover:to-[#0B95BA] text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Download className="w-4 h-4" />
                        Descargar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredCourses.length === 0 && (
        <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="font-bold text-gray-900 mb-2">No se encontraron cursos</h3>
          <p className="text-gray-600">
            {searchTerm
              ? 'Intenta con otros términos de búsqueda'
              : 'No tienes cursos con este filtro'}
          </p>
        </div>
      )}
    </div>
  );
}