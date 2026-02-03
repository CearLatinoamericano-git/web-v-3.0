import { 
  BookOpen, 
  Clock, 
  Calendar,
  ArrowRight,
  AlertCircle,
  Target,
  Video,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  X
} from 'lucide-react';
import { useState } from 'react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  thumbnail: string;
  nextActivity?: string;
  status: 'active' | 'completed' | 'upcoming';
}

interface StudentDashboardProps {
  onNavigateToCourse: (courseId: string) => void;
  onNavigateToLiveClass: () => void;
  onNavigateToActivities?: () => void;
  onNavigateToPayments?: () => void;
  onNavigateToRecordings?: () => void;
  onNavigateToCourses?: () => void;
}

export function StudentDashboard({ onNavigateToCourse, onNavigateToLiveClass, onNavigateToActivities, onNavigateToPayments, onNavigateToRecordings, onNavigateToCourses }: StudentDashboardProps) {
  // Estados
  const [showActivitiesModal, setShowActivitiesModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Mock data - en producción vendría de una API
  const activeCourses: Course[] = [
    {
      id: '1',
      title: 'Diplomado en Arbitraje',
      instructor: 'Dr. Carlos Méndez',
      progress: 65,
      thumbnail: 'arbitraje',
      nextActivity: 'Quiz: Marco Legal del Arbitraje - Vence mañana, 06/12 a las 23:59',
      status: 'active'
    },
    {
      id: '2',
      title: 'Contratación Pública',
      instructor: 'Dra. María González',
      progress: 45,
      thumbnail: 'contratacion',
      nextActivity: 'Examen parcial - Vence mañana, 06/12 a las 18:00',
      status: 'active'
    },
    {
      id: '3',
      title: 'Resolución de Controversias',
      instructor: 'Dr. Javier Torres',
      progress: 30,
      thumbnail: 'controversias',
      status: 'active'
    }
  ];

  const upcomingLiveClasses = [
    { 
      id: '1',
      title: 'Fundamentos del Arbitraje Comercial',
      course: 'Diplomado en Arbitraje',
      instructor: 'Dr. Carlos Méndez',
      date: 'Hoy',
      time: '18:00 - 20:00',
      platform: 'Google Meet',
      meetLink: 'https://meet.google.com/xyz-abcd-efg',
      isToday: true,
      isTomorrow: false
    },
    { 
      id: '2',
      title: 'Procedimientos de Contratación Estatal',
      course: 'Contratación Pública',
      instructor: 'Dra. María González',
      date: 'Mañana',
      time: '19:00 - 21:00',
      platform: 'Google Meet',
      meetLink: 'https://meet.google.com/abc-defg-hij',
      isToday: false,
      isTomorrow: true
    },
    { 
      id: '3',
      title: 'Resolución de Conflictos Internacionales',
      course: 'Resolución de Controversias',
      instructor: 'Dr. Javier Torres',
      date: 'Viernes, 06/12',
      time: '10:00 - 12:00',
      platform: 'Google Meet',
      meetLink: 'https://meet.google.com/klm-nopq-rst',
      isToday: false,
      isTomorrow: false
    },
    { 
      id: '4',
      title: 'Cláusulas Arbitrales en Contratos',
      course: 'Diplomado en Arbitraje',
      instructor: 'Dr. Carlos Méndez',
      date: 'Sábado, 07/12',
      time: '15:00 - 17:00',
      platform: 'Google Meet',
      meetLink: 'https://meet.google.com/uvw-xyzz-abc',
      isToday: false,
      isTomorrow: false
    },
    { 
      id: '5',
      title: 'Evaluación de Propuestas Técnicas',
      course: 'Contratación Pública',
      instructor: 'Dra. María González',
      date: 'Lunes, 09/12',
      time: '18:30 - 20:30',
      platform: 'Google Meet',
      meetLink: 'https://meet.google.com/def-ghij-klm',
      isToday: false,
      isTomorrow: false
    }
  ];

  const weeklyDeadlines = [
    { 
      day: 'LUN',
      date: 24,
      title: 'Quiz: Marco Legal del Arbitraje', 
      course: 'Diplomado en Arbitraje', 
      time: '23:59',
      type: 'Evaluación',
      priority: 'high'
    },
    { 
      day: 'MAR',
      date: 25,
      title: 'Clase en vivo: Fundamentos del Arbitraje', 
      course: 'Diplomado en Arbitraje', 
      time: '18:00',
      type: 'Clase',
      priority: 'medium'
    },
    { 
      day: 'MIÉ',
      date: 26,
      title: 'Examen parcial', 
      course: 'Contratación Pública', 
      time: '18:00',
      type: 'Evaluación',
      priority: 'high'
    },
    { 
      day: 'JUE',
      date: 27,
      title: 'Clase en vivo: Procedimientos Estatales', 
      course: 'Contratación Pública', 
      time: '19:00',
      type: 'Clase',
      priority: 'medium'
    },
    { 
      day: 'VIE',
      date: 28,
      title: 'Foro de discusión', 
      course: 'Resolución de Controversias', 
      time: '19:00',
      type: 'Foro',
      priority: 'low'
    },
    { 
      day: 'SÁB',
      date: 29,
      title: 'Clase en vivo: Conflictos Internacionales', 
      course: 'Resolución de Controversias', 
      time: '10:00',
      type: 'Clase',
      priority: 'medium'
    }
  ];

  // Generar calendario del mes actual
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDate();

  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarDays = [];
  // Días vacíos al inicio
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  // Días del mes
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // Días con eventos (ejemplo)
  const daysWithEvents = [24, 25, 26, 27, 28, 29];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-4 sm:p-6 md:p-8 text-white">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">¡Bienvenido de nuevo!</h1>
        <p className="text-base sm:text-lg md:text-xl opacity-90">Continúa tu formación profesional</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div 
          className="bg-white rounded-2xl p-4 sm:p-6 border-2 border-gray-200 hover:shadow-lg transition-shadow cursor-pointer group"
          onClick={() => onNavigateToCourses && onNavigateToCourses()}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#0B95BA] rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{activeCourses.length}</p>
            <p className="text-sm text-gray-600">Programas activos</p>
          </div>
        </div>

        <div 
          className="bg-white rounded-2xl p-4 sm:p-6 border-2 border-gray-200 hover:shadow-lg transition-shadow cursor-pointer group"
          onClick={() => onNavigateToActivities && onNavigateToActivities()}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{weeklyDeadlines.filter(d => d.priority === 'high').length}</p>
            <p className="text-sm text-gray-600">Actividades pendientes</p>
          </div>
        </div>

        <div 
          className="bg-white rounded-2xl p-4 sm:p-6 border-2 border-gray-200 hover:shadow-lg transition-shadow cursor-pointer group"
          onClick={() => onNavigateToPayments && onNavigateToPayments()}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">S/ 350.00</p>
            <p className="text-sm text-gray-600 mb-1">Próximo pago</p>
            <p className="text-xs text-orange-600 font-medium">Vence: 15/12/2024</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Courses */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Próximas actividades</h2>
              <button
                onClick={() => onNavigateToActivities && onNavigateToActivities()}
                className="text-[#0B95BA] hover:text-[#087A98] font-medium flex items-center gap-2 w-fit"
              >
                Ver todas
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {activeCourses.map((course) => (
                <div
                  key={course.id}
                  className="border border-gray-200 rounded-2xl p-4 sm:p-5 hover:border-[#0B95BA] hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => onNavigateToCourse(course.id)}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-xl flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1">{course.title}</h3>
                      
                      <div>
                        <div className="flex justify-between text-xs sm:text-sm mb-2">
                          <span className="text-gray-600">Progreso del programa</span>
                          <span className="font-bold text-[#0B95BA]">{course.progress}%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
                          <div
                            className="h-full bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {course.nextActivity && (() => {
                        const parts = course.nextActivity.split(' - ');
                        return (
                          <div className="flex items-start gap-2 text-xs sm:text-sm text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
                            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <div className="flex flex-col">
                              <span className="font-medium">{parts[0]}</span>
                              {parts[1] && <span className="font-medium">{parts[1]}</span>}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                    <button className="hidden sm:block p-3 hover:bg-gray-100 rounded-xl transition-colors opacity-0 group-hover:opacity-100">
                      <ArrowRight className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Live Classes */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Video className="w-6 h-6 text-slate-700" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Próximas clases en vivo</h2>
              </div>
              <button
                onClick={() => onNavigateToRecordings && onNavigateToRecordings()}
                className="text-[#0B95BA] hover:text-[#087A98] font-medium flex items-center gap-2 w-fit"
              >
                Ver grabaciones
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {upcomingLiveClasses.map((liveClass) => (
                <div
                  key={liveClass.id}
                  className={`p-3 sm:p-4 rounded-xl border-2 transition-all ${
                    liveClass.isToday
                      ? 'bg-slate-50 border-slate-300'
                      : liveClass.isTomorrow
                      ? 'bg-slate-50/50 border-slate-200'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      liveClass.isToday
                        ? 'bg-slate-700'
                        : 'bg-slate-600'
                    }`}>
                      <Video className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0 w-full sm:w-auto">
                      {liveClass.isToday && (
                        <span className="inline-block px-2 py-1 bg-slate-700 text-white text-xs font-bold rounded-full mb-2">
                          HOY
                        </span>
                      )}
                      {liveClass.isTomorrow && (
                        <span className="inline-block px-2 py-1 bg-slate-600 text-white text-xs font-bold rounded-full mb-2">
                          MAÑANA
                        </span>
                      )}
                      <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-1">{liveClass.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-2">{liveClass.course}</p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600" />
                          <span>{liveClass.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600" />
                          <span>{liveClass.time}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        <span className="font-medium">Instructor:</span> {liveClass.instructor}
                      </p>
                    </div>
                    <button
                      onClick={liveClass.isToday ? () => window.open(liveClass.meetLink, '_blank') : undefined}
                      disabled={!liveClass.isToday}
                      className={`w-full sm:w-auto px-4 sm:px-6 py-2 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                        liveClass.isToday
                          ? 'bg-slate-700 hover:bg-slate-800 text-white cursor-pointer'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Ingresar
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Right Column (1/3) */}
        <div className="space-y-6">
          {/* Calendar Widget - Mejorado */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#0B95BA]" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">{monthNames[currentMonth]}</h2>
                  <p className="text-xs text-gray-500">{currentYear}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="mb-4">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`aspect-square flex items-center justify-center text-xs sm:text-sm rounded-lg transition-all ${
                      day === null
                        ? 'text-transparent'
                        : day === currentDay
                        ? 'bg-[#0B95BA] text-white font-bold shadow-lg'
                        : daysWithEvents.includes(day)
                        ? 'bg-amber-100 text-amber-900 font-medium cursor-pointer hover:bg-amber-200'
                        : 'text-gray-700 hover:bg-gray-100 cursor-pointer'
                    }`}
                    onClick={() => {
                      if (day !== null) {
                        setSelectedDay(day);
                        setShowActivitiesModal(true);
                      }
                    }}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 sm:pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-[#0B95BA] rounded"></div>
                  <span>Hoy</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-amber-100 border border-amber-300 rounded"></div>
                  <span>Con eventos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Deadlines */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Actividades pendientes</h2>
            </div>

            <div className="space-y-3">
              {weeklyDeadlines.map((deadline, index) => (
                <div 
                  key={index} 
                  className={`flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                    deadline.priority === 'high'
                      ? 'bg-orange-50 hover:bg-orange-100 border border-orange-200'
                      : deadline.priority === 'medium'
                      ? 'bg-blue-50 hover:bg-blue-100 border border-blue-200'
                      : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center text-white flex-shrink-0 mt-1 ${
                    deadline.priority === 'high'
                      ? 'bg-orange-600'
                      : deadline.priority === 'medium'
                      ? 'bg-[#0B95BA]'
                      : 'bg-gray-600'
                  }`}>
                    <span className="text-xs font-medium">{deadline.day}</span>
                    <span className="text-lg font-bold">{deadline.date}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                        deadline.priority === 'high'
                          ? 'bg-orange-200 text-orange-800'
                          : deadline.priority === 'medium'
                          ? 'bg-blue-200 text-blue-800'
                          : 'bg-gray-200 text-gray-800'
                      }`}>
                        {deadline.type}
                      </span>
                    </div>
                    <p className="font-bold text-gray-900 text-sm mb-1">{deadline.title}</p>
                    <p className="text-xs text-gray-600 mb-1">{deadline.course}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-700">
                      <Clock className="w-3 h-3" />
                      <span>{deadline.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Actividades */}
      {showActivitiesModal && (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 pr-4">Actividades para el {selectedDay} de {monthNames[currentMonth]}</h2>
              <button
                onClick={() => setShowActivitiesModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-3">
              {weeklyDeadlines
                .filter(deadline => deadline.date === selectedDay)
                .map((deadline, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start gap-2 sm:gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                      deadline.priority === 'high'
                        ? 'bg-orange-50 hover:bg-orange-100 border border-orange-200'
                        : deadline.priority === 'medium'
                        ? 'bg-blue-50 hover:bg-blue-100 border border-blue-200'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center text-white flex-shrink-0 ${
                      deadline.priority === 'high'
                        ? 'bg-orange-600'
                        : deadline.priority === 'medium'
                        ? 'bg-[#0B95BA]'
                        : 'bg-gray-600'
                    }`}>
                      <span className="text-xs font-medium">{deadline.day}</span>
                      <span className="text-lg font-bold">{deadline.date}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                          deadline.priority === 'high'
                            ? 'bg-orange-200 text-orange-800'
                            : deadline.priority === 'medium'
                            ? 'bg-blue-200 text-blue-800'
                            : 'bg-gray-200 text-gray-800'
                        }`}>
                          {deadline.type}
                        </span>
                      </div>
                      <p className="font-bold text-gray-900 text-sm mb-1">{deadline.title}</p>
                      <p className="text-xs text-gray-600 mb-1">{deadline.course}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-700">
                        <Clock className="w-3 h-3" />
                        <span>{deadline.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}