import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Video, CheckCircle2, BookOpen, User, PlayCircle, FileVideo } from 'lucide-react';

interface LiveSession {
  id: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  moduleTitle: string;
  sessionTitle: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: string;
  status: 'scheduled' | 'live' | 'recorded';
  recordingUrl?: string;
  completedDate?: string;
  instructor: string;
}

interface Course {
  id: string;
  name: string;
  code: string;
}

interface ScheduleManagementProps {
  onBack: () => void;
  initialCourseId?: string;
}

export function ScheduleManagement({ onBack, initialCourseId }: ScheduleManagementProps) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(initialCourseId || null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'completed'>('all');

  const courses: Course[] = [
    {
      id: '1',
      name: 'III Diplomado en Especialización de Derecho Administrativo para Árbitros',
      code: 'DIPDERAD-2024-III'
    },
    {
      id: '2',
      name: 'Curso de Especialización en Mecanismos de Inversión Privada: APP, OXI y G2G',
      code: 'CEMEIP-2024-V1'
    },
    {
      id: '3',
      name: 'Diplomado en Resolución de Controversias',
      code: 'RESCONT-2024-V1'
    }
  ];

  // Mock data - Sesiones en vivo de todos los módulos del curso
  const allLiveSessions: { [courseId: string]: LiveSession[] } = {
    '1': [
      {
        id: '1',
        courseId: '1',
        courseName: 'III Diplomado en Especialización de Derecho Administrativo para Árbitros',
        courseCode: 'DIPDERAD-2024-III',
        moduleTitle: 'Módulo 1: Introducción al arbitraje',
        sessionTitle: 'Sesión 1: Fundamentos del arbitraje',
        scheduledDate: '2024-12-22',
        scheduledTime: '18:00',
        duration: '2 horas',
        status: 'scheduled',
        instructor: 'Dr. Carlos Méndez'
      },
      {
        id: '2',
        courseId: '1',
        courseName: 'III Diplomado en Especialización de Derecho Administrativo para Árbitros',
        courseCode: 'DIPDERAD-2024-III',
        moduleTitle: 'Módulo 1: Introducción al arbitraje',
        sessionTitle: 'Sesión 2: Marco legal del arbitraje',
        scheduledDate: '2024-12-15',
        scheduledTime: '18:00',
        duration: '2 horas',
        status: 'recorded',
        recordingUrl: 'https://meet.google.com/recording/abc123',
        completedDate: '2024-12-15',
        instructor: 'Dr. Carlos Méndez'
      },
      {
        id: '3',
        courseId: '1',
        courseName: 'III Diplomado en Especialización de Derecho Administrativo para Árbitros',
        courseCode: 'DIPDERAD-2024-III',
        moduleTitle: 'Módulo 2: Aspectos legales',
        sessionTitle: 'Sesión 3: Procedimientos arbitrales',
        scheduledDate: '2024-12-28',
        scheduledTime: '19:00',
        duration: '2 horas',
        status: 'scheduled',
        instructor: 'Dra. María González'
      },
      {
        id: '4',
        courseId: '1',
        courseName: 'III Diplomado en Especialización de Derecho Administrativo para Árbitros',
        courseCode: 'DIPDERAD-2024-III',
        moduleTitle: 'Módulo 2: Aspectos legales',
        sessionTitle: 'Sesión 4: Laudos arbitrales',
        scheduledDate: '2024-12-10',
        scheduledTime: '19:00',
        duration: '2 horas',
        status: 'recorded',
        recordingUrl: 'https://meet.google.com/recording/def456',
        completedDate: '2024-12-10',
        instructor: 'Dra. María González'
      }
    ],
    '2': [
      {
        id: '5',
        courseId: '2',
        courseName: 'Curso de Especialización en Mecanismos de Inversión Privada',
        courseCode: 'CEMEIP-2024-V1',
        moduleTitle: 'Módulo 1: Introducción a APP',
        sessionTitle: 'Sesión 1: Fundamentos de APP',
        scheduledDate: '2024-12-25',
        scheduledTime: '19:00',
        duration: '2 horas',
        status: 'scheduled',
        instructor: 'Dr. Javier Torres'
      },
      {
        id: '6',
        courseId: '2',
        courseName: 'Curso de Especialización en Mecanismos de Inversión Privada',
        courseCode: 'CEMEIP-2024-V1',
        moduleTitle: 'Módulo 1: Introducción a APP',
        sessionTitle: 'Sesión 2: Marco regulatorio',
        scheduledDate: '2024-12-12',
        scheduledTime: '19:00',
        duration: '2 horas',
        status: 'recorded',
        recordingUrl: 'https://meet.google.com/recording/ghi789',
        completedDate: '2024-12-12',
        instructor: 'Dr. Javier Torres'
      }
    ],
    '3': [
      {
        id: '7',
        courseId: '3',
        courseName: 'Diplomado en Resolución de Controversias',
        courseCode: 'RESCONT-2024-V1',
        moduleTitle: 'Módulo 1: Fundamentos',
        sessionTitle: 'Sesión 1: Introducción a la resolución de conflictos',
        scheduledDate: '2024-12-30',
        scheduledTime: '10:00',
        duration: '2 horas',
        status: 'scheduled',
        instructor: 'Dra. Ana Martínez'
      }
    ]
  };

  const currentSessions = selectedCourse ? (allLiveSessions[selectedCourse] || []) : [];
  const selectedCourseData = courses.find(c => c.id === selectedCourse);

  // Filtrar sesiones según el estado seleccionado
  const filteredSessions = currentSessions.filter(session => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'upcoming') return session.status === 'scheduled' || session.status === 'live';
    if (filterStatus === 'completed') return session.status === 'recorded';
    return true;
  });

  // Separar sesiones en próximas y completadas
  const upcomingSessions = filteredSessions.filter(s => s.status === 'scheduled' || s.status === 'live');
  const completedSessions = filteredSessions.filter(s => s.status === 'recorded');

  // Calcular estadísticas
  const stats = {
    total: currentSessions.length,
    upcoming: currentSessions.filter(s => s.status === 'scheduled' || s.status === 'live').length,
    completed: currentSessions.filter(s => s.status === 'recorded').length
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PE', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#10E7B0] rounded-3xl p-8 text-white">
        <button
          onClick={onBack}
          className="mb-3 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>
        <div className="flex items-center gap-3 mb-2">
          <Video className="w-10 h-10" />
          <h1 className="text-4xl">Gestión de clases en vivo</h1>
        </div>
        <p className="text-white/90 mt-2">
          Visualiza todas las sesiones con clases en vivo del programa
        </p>
      </div>

      {/* Course Selection */}
      {!selectedCourse ? (
        <div className="space-y-4">
          <h2 className="text-2xl text-gray-900">Selecciona un programa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const courseStats = {
                total: allLiveSessions[course.id]?.length || 0,
                upcoming: allLiveSessions[course.id]?.filter(s => s.status === 'scheduled' || s.status === 'live').length || 0,
                completed: allLiveSessions[course.id]?.filter(s => s.status === 'recorded').length || 0
              };

              return (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourse(course.id)}
                  className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-[#0B95BA] transition-all text-left group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#0B95BA]/10 rounded-xl flex items-center justify-center group-hover:bg-[#0B95BA] transition-colors">
                      <BookOpen className="w-6 h-6 text-[#0B95BA] group-hover:text-white transition-colors" />
                    </div>
                    <span className="px-3 py-1 bg-[#0B95BA]/10 text-[#0B95BA] rounded-full text-xs font-mono">
                      {course.code}
                    </span>
                  </div>
                  <h3 className="text-gray-900 mb-4 line-clamp-2">{course.name}</h3>
                  
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-2xl text-gray-900">{courseStats.total}</p>
                      <p className="text-xs text-gray-600">Total</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-2">
                      <p className="text-2xl text-[#0B95BA]">{courseStats.upcoming}</p>
                      <p className="text-xs text-[#0B95BA]">Próximas</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-2">
                      <p className="text-2xl text-green-600">{courseStats.completed}</p>
                      <p className="text-xs text-green-600">Grabadas</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          {/* Course Info Bar */}
          <div className="bg-white rounded-2xl p-6 border-2 border-[#0B95BA]/20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <span className="px-3 py-1 bg-[#0B95BA]/10 text-[rgb(255,255,255)] rounded-full text-sm font-mono">
                  {selectedCourseData?.code}
                </span>
                <h2 className="text-xl text-gray-900 mt-2">{selectedCourseData?.name}</h2>
              </div>
              
              {/* Stats */}
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Total de sesiones</p>
                  <p className="text-3xl text-gray-900">{stats.total}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-[#0B95BA]">Próximas</p>
                  <p className="text-3xl text-[#0B95BA]">{stats.upcoming}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-green-600">Grabadas</p>
                  <p className="text-3xl text-green-600">{stats.completed}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 border-2 border-gray-200">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700">Filtrar por:</span>
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-[#0B95BA] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todas ({stats.total})
              </button>
              <button
                onClick={() => setFilterStatus('upcoming')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'upcoming'
                    ? 'bg-[#0B95BA] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Próximas ({stats.upcoming})
              </button>
              <button
                onClick={() => setFilterStatus('completed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'completed'
                    ? 'bg-[#0B95BA] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Grabadas ({stats.completed})
              </button>
            </div>
          </div>

          {/* Sessions List */}
          <div className="space-y-6">
            {/* Upcoming Sessions */}
            {(filterStatus === 'all' || filterStatus === 'upcoming') && upcomingSessions.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#0B95BA]/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#0B95BA]" />
                  </div>
                  <h3 className="text-xl text-gray-900">Clases programadas ({upcomingSessions.length})</h3>
                </div>

                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-5 border-2 border-[#0B95BA] bg-white rounded-xl hover:shadow-lg hover:border-[#0B95BA]/80 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          {/* Module and Session Title */}
                          <div className="mb-3">
                            <p className="text-sm text-[#0B95BA] mb-1">{session.moduleTitle}</p>
                            <h4 className="text-gray-900">{session.sessionTitle}</h4>
                          </div>

                          {/* Session Details */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-[#0B95BA]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-4 h-4 text-[#0B95BA]" />
                              </div>
                              <div>
                                <p className="text-gray-500">Fecha programada</p>
                                <p className="text-gray-900 capitalize">{formatDate(session.scheduledDate)}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-[#0B95BA]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Clock className="w-4 h-4 text-[#0B95BA]" />
                              </div>
                              <div>
                                <p className="text-gray-500">Horario</p>
                                <p className="text-gray-900">{session.scheduledTime} ({session.duration})</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-[#0B95BA]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <User className="w-4 h-4 text-[#0B95BA]" />
                              </div>
                              <div>
                                <p className="text-gray-500">Instructor</p>
                                <p className="text-gray-900">{session.instructor}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="flex flex-col items-end gap-2">
                          {session.status === 'live' ? (
                            <span className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 animate-pulse">
                              <PlayCircle className="w-4 h-4" />
                              En vivo
                            </span>
                          ) : (
                            <span className="px-4 py-2 bg-[#0B95BA] text-white rounded-lg text-sm font-medium flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Programada
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Sessions */}
            {(filterStatus === 'all' || filterStatus === 'completed') && completedSessions.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl text-gray-900">Clases grabadas ({completedSessions.length})</h3>
                </div>

                <div className="space-y-4">
                  {completedSessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-5 border-2 border-emerald-600 bg-white rounded-xl hover:shadow-lg hover:border-emerald-500 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          {/* Module and Session Title */}
                          <div className="mb-3">
                            <p className="text-sm text-emerald-600 mb-1">{session.moduleTitle}</p>
                            <h4 className="text-gray-900">{session.sessionTitle}</h4>
                          </div>

                          {/* Session Details */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-4 h-4 text-emerald-600" />
                              </div>
                              <div>
                                <p className="text-gray-500">Completada el</p>
                                <p className="text-gray-900 capitalize">{formatDate(session.completedDate || session.scheduledDate)}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Clock className="w-4 h-4 text-emerald-600" />
                              </div>
                              <div>
                                <p className="text-gray-500">Duración</p>
                                <p className="text-gray-900">{session.duration}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <User className="w-4 h-4 text-emerald-600" />
                              </div>
                              <div>
                                <p className="text-gray-500">Instructor</p>
                                <p className="text-gray-900">{session.instructor}</p>
                              </div>
                            </div>
                          </div>

                          {/* Recording Link */}
                          {session.recordingUrl && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <a
                                href={session.recordingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-emerald-700 hover:text-emerald-800 font-medium"
                              >
                                <FileVideo className="w-4 h-4" />
                                Ver grabación
                              </a>
                            </div>
                          )}
                        </div>

                        {/* Status Badge */}
                        <div className="flex flex-col items-end gap-2">
                          <span className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Grabada
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredSessions.length === 0 && (
              <div className="bg-white rounded-2xl p-12 border-2 border-gray-200 text-center">
                <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">No hay sesiones en vivo para mostrar</p>
                <p className="text-sm text-gray-500">
                  {filterStatus === 'upcoming' && 'No hay clases programadas próximamente'}
                  {filterStatus === 'completed' && 'No hay clases grabadas disponibles'}
                  {filterStatus === 'all' && 'Este programa no tiene sesiones en vivo configuradas'}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}