import {
  BookOpen,
  Users,
  CheckSquare,
  Video,
  Clock,
  AlertCircle,
  TrendingUp,
  FileText,
  Calendar,
  Plus
} from 'lucide-react';

interface TeacherDashboardProps {
  onNavigateToCourse: (courseId: string) => void;
  onCreateContent: () => void;
}

export function TeacherDashboard({ onNavigateToCourse, onCreateContent }: TeacherDashboardProps) {
  const myCourses = [
    {
      id: '1',
      title: 'Diplomado en Arbitraje',
      students: 45,
      nextClass: 'Hoy, 18:00',
      pendingGrades: 8,
      attendance: 92
    },
    {
      id: '2',
      title: 'Resolución de Controversias',
      students: 38,
      nextClass: 'Mañana, 19:00',
      pendingGrades: 5,
      attendance: 88
    }
  ];

  const pendingActivities = [
    { student: 'Juan Pérez García', activity: 'Ensayo sobre Arbitraje Comercial', course: 'Diplomado en Arbitraje', date: 'Hace 2 días' },
    { student: 'María López Sánchez', activity: 'Análisis de caso práctico', course: 'Diplomado en Arbitraje', date: 'Hace 1 día' },
    { student: 'Carlos Ramírez Torres', activity: 'Foro de discusión', course: 'Resolución de Controversias', date: 'Hace 3 horas' }
  ];

  const pendingAttendance = [
    { class: 'Arbitraje Internacional - Sesión 5', date: '2025-11-20', students: 45, recorded: 42 },
    { class: 'Casos prácticos avanzados', date: '2025-11-18', students: 38, recorded: 35 }
  ];

  const upcomingClasses = [
    { course: 'Diplomado en Arbitraje', topic: 'Arbitraje Internacional', date: 'Hoy', time: '18:00', students: 45 },
    { course: 'Resolución de Controversias', topic: 'Mediación empresarial', date: 'Mañana', time: '19:00', students: 38 }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Panel del Docente</h1>
        <p className="text-xl opacity-90">Gestiona tus cursos y estudiantes</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={onCreateContent}
          className="p-6 bg-white border-2 border-dashed border-[#0B95BA] rounded-2xl hover:bg-blue-50 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#0B95BA] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <p className="font-bold text-lg text-gray-900">Crear contenido</p>
              <p className="text-sm text-gray-600">Material, actividad o evaluación</p>
            </div>
          </div>
        </button>

        <button className="p-6 bg-white border-2 border-dashed border-green-500 rounded-2xl hover:bg-green-50 transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <p className="font-bold text-lg text-gray-900">Nuevo anuncio</p>
              <p className="text-sm text-gray-600">Comunicar a estudiantes</p>
            </div>
          </div>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-cyan-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">2</p>
              <p className="text-sm text-gray-600">Cursos activos</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">83</p>
              <p className="text-sm text-gray-600">Estudiantes totales</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">13</p>
              <p className="text-sm text-gray-600">Por calificar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">90%</p>
              <p className="text-sm text-gray-600">Asistencia promedio</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* My Courses */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Mis Cursos</h2>
            <div className="space-y-4">
              {myCourses.map((course) => (
                <div
                  key={course.id}
                  className="border border-gray-200 rounded-2xl p-5 hover:border-[#0B95BA] hover:shadow-md transition-all cursor-pointer"
                  onClick={() => onNavigateToCourse(course.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-xl flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{course.title}</h3>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{course.students} estudiantes</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <TrendingUp className="w-4 h-4" />
                          <span>{course.attendance}% asistencia</span>
                        </div>
                      </div>

                      {course.nextClass && (
                        <div className="flex items-center gap-2 text-sm text-[#0B95BA] mb-3">
                          <Clock className="w-4 h-4" />
                          <span>Próxima clase: {course.nextClass}</span>
                        </div>
                      )}

                      {course.pendingGrades > 0 && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                          <AlertCircle className="w-4 h-4" />
                          <span>{course.pendingGrades} actividades por calificar</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Activities to Grade */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Actividades por Calificar</h2>
              <span className="px-4 py-2 bg-amber-100 text-amber-700 font-medium rounded-full">
                {pendingActivities.length} pendientes
              </span>
            </div>

            <div className="space-y-3">
              {pendingActivities.map((item, idx) => (
                <div key={idx} className="p-4 border border-gray-200 rounded-xl hover:border-[#0B95BA] hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{item.student}</h3>
                      <p className="text-sm text-gray-600">{item.activity}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.course}</p>
                    </div>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                  <button className="w-full mt-3 py-2 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-lg transition-colors">
                    Calificar ahora
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Attendance */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Asistencia pendiente</h2>
            </div>

            <div className="space-y-4">
              {pendingAttendance.map((item, idx) => (
                <div key={idx} className="p-5 border border-gray-200 rounded-xl hover:border-[#0B95BA] transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{item.class}</h3>
                      <p className="text-sm text-gray-600">{item.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{item.recorded}/{item.students}</p>
                      <p className="text-xs text-gray-600">registrados</p>
                    </div>
                  </div>
                  <button className="w-full py-3 border border-[#0B95BA] text-[#0B95BA] hover:bg-blue-50 font-medium rounded-xl transition-colors">
                    Revisar asistencia
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Classes */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Próximas clases</h2>
            </div>

            <div className="space-y-4">
              {upcomingClasses.map((item, idx) => (
                <div key={idx} className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{item.topic}</h3>
                    <span className="px-3 py-1 bg-purple-500 text-white text-xs font-medium rounded-full">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{item.course}</p>
                  <div className="flex items-center justify-between text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{item.students}</span>
                    </div>
                  </div>
                  <button className="w-full mt-3 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors">
                    Iniciar clase
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
            <h3 className="font-bold text-lg text-gray-900 mb-3">💡 Consejo del día</h3>
            <p className="text-sm text-gray-700 text-justify">
              Programa tus clases en vivo con anticipación para que tus estudiantes puedan organizarse mejor. 
              La asistencia mejora cuando hay buena comunicación previa.
            </p>
          </div>

          {/* Calendar Widget */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Esta Semana</h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-[#0B95BA] rounded-lg flex flex-col items-center justify-center text-white flex-shrink-0">
                  <span className="text-xs">HOY</span>
                  <span className="text-lg font-bold">24</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Clase en vivo</p>
                  <p className="text-sm text-gray-600">18:00 hrs</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-[#0B95BA] rounded-lg flex flex-col items-center justify-center text-white flex-shrink-0">
                  <span className="text-xs">MIÉ</span>
                  <span className="text-lg font-bold">26</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Cierre de entregas</p>
                  <p className="text-sm text-gray-600">23:59 hrs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}