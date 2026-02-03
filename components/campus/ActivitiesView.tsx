import { useState } from 'react';
import {
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Calendar,
  Upload,
  Video,
  MessageSquare,
  BookOpen,
  Target,
  Filter,
  Search,
  Download,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

type ActivityType = 'assignment' | 'quiz' | 'forum' | 'reading-control' | 'live-class';
type ActivityStatus = 'pending' | 'submitted' | 'completed' | 'overdue' | 'upcoming';
type FilterType = 'all' | 'pending' | 'submitted' | 'completed' | 'overdue';

interface Activity {
  id: number;
  title: string;
  course: string;
  courseId: string;
  moduleId?: number;
  sessionId?: number;
  type: ActivityType;
  status: ActivityStatus;
  publishDate: string; // Fecha de publicación (obligatoria)
  dueDate?: string; // Fecha de vencimiento (opcional)
  dueTime?: string;
  description?: string;
  grade?: number;
  maxGrade?: number;
  submittedDate?: string;
}

interface ActivitiesViewProps {
  onNavigateToQuiz?: () => void;
  onNavigateToReading?: (data: {
    title: string;
    pdfUrl: string;
    courseName?: string;
    moduleName?: string;
  }) => void;
  onNavigateToForum?: (forumId: string, context?: {
    courseCode?: string;
    courseName?: string;
    moduleName?: string;
  }) => void;
  onNavigateToAssignment?: (activityId: number) => void;
}

export function ActivitiesView({ 
  onNavigateToQuiz, 
  onNavigateToReading,
  onNavigateToForum,
  onNavigateToAssignment 
}: ActivitiesViewProps = {}) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const activities: Activity[] = [
    {
      id: 1,
      title: 'Foro: Análisis del principio de autonomía de la voluntad',
      course: 'Diplomado en Arbitraje',
      courseId: 'arbitrage-diploma',
      type: 'forum',
      status: 'pending',
      publishDate: '25/11/2024',
      dueDate: '03/12/2024',
      dueTime: '23:59',
      description: 'Participa activamente en el foro de discusión sobre el principio de autonomía de la voluntad en el arbitraje internacional. Debes realizar al menos 2 comentarios fundamentados.'
    },
    {
      id: 2,
      title: 'Ensayo sobre Arbitraje Comercial',
      course: 'Diplomado en Arbitraje',
      courseId: 'arbitrage-diploma',
      type: 'assignment',
      status: 'overdue',
      publishDate: '15/11/2024',
      dueDate: '24/11/2024',
      dueTime: '23:59',
      description: 'Elaborar un ensayo de 2000 palabras sobre los principios del arbitraje comercial'
    },
    {
      id: 3,
      title: 'Clase en vivo: Fundamentos del Arbitraje',
      course: 'Diplomado en Arbitraje',
      courseId: 'arbitrage-diploma',
      type: 'live-class',
      status: 'upcoming',
      publishDate: '30/11/2024',
      dueDate: '01/12/2024',
      dueTime: '18:00',
      description: 'Sesión en vivo sobre los fundamentos y principios básicos del arbitraje'
    },
    {
      id: 4,
      title: 'Examen parcial - Módulo 2',
      course: 'Contratación Pública',
      courseId: 'public-contracting',
      type: 'quiz',
      status: 'pending',
      publishDate: '25/11/2024',
      dueDate: '05/12/2024',
      dueTime: '18:00',
      description: 'Evaluación de conocimientos del módulo 2'
    },
    {
      id: 5,
      title: 'Análisis de caso práctico',
      course: 'Diplomado en Arbitraje',
      courseId: 'arbitrage-diploma',
      type: 'assignment',
      status: 'submitted',
      publishDate: '10/11/2024',
      dueDate: '20/11/2024',
      dueTime: '23:59',
      description: 'Análisis detallado de un caso de arbitraje internacional',
      submittedDate: '19/11/2024'
    },
    {
      id: 6,
      title: 'Quiz: Marco legal del arbitraje',
      course: 'Diplomado en Arbitraje',
      courseId: 'arbitrage-diploma',
      type: 'quiz',
      status: 'completed',
      publishDate: '05/11/2024',
      dueDate: '15/11/2024',
      dueTime: '23:59',
      description: 'Evaluación sobre el marco legal del arbitraje en Perú',
      grade: 18,
      maxGrade: 20,
      submittedDate: '14/11/2024'
    },
    {
      id: 7,
      title: 'Foro: Casos de arbitraje nacional',
      course: 'Diplomado en Arbitraje',
      courseId: 'arbitrage-diploma',
      type: 'forum',
      status: 'completed',
      publishDate: '30/10/2024',
      dueDate: '10/11/2024',
      dueTime: '23:59',
      description: 'Participación en discusión sobre casos nacionales',
      submittedDate: '09/11/2024'
    },
    {
      id: 8,
      title: 'Control de lectura: Procedimientos de contratación',
      course: 'Contratación Pública',
      courseId: 'public-contracting',
      type: 'reading-control',
      status: 'pending',
      publishDate: '20/11/2024',
      dueDate: '08/12/2024',
      dueTime: '23:59',
      description: 'Control de lectura sobre procedimientos de contratación estatal con preguntas de comprensión'
    },
    {
      id: 9,
      title: 'Clase en vivo: Procedimientos Estatales',
      course: 'Contratación Pública',
      courseId: 'public-contracting',
      type: 'live-class',
      status: 'upcoming',
      publishDate: '25/11/2024',
      dueDate: '03/12/2024',
      dueTime: '19:00',
      description: 'Sesión en vivo sobre procedimientos de contratación del Estado'
    },
    {
      id: 10,
      title: 'Ensayo final - Arbitraje Internacional',
      course: 'Diplomado en Arbitraje',
      courseId: 'arbitrage-diploma',
      type: 'assignment',
      status: 'pending',
      publishDate: '25/11/2024',
      dueDate: '15/12/2024',
      dueTime: '23:59',
      description: 'Trabajo final sobre arbitraje internacional'
    },
    {
      id: 11,
      title: 'Control de lectura: Principios del arbitraje',
      course: 'Diplomado en Arbitraje',
      courseId: 'arbitrage-diploma',
      type: 'reading-control',
      status: 'pending',
      publishDate: '01/12/2024',
      description: 'Control de lectura sobre los principios fundamentales del arbitraje (sin fecha límite)'
    }
  ];

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'assignment':
        return <Upload className="w-5 h-5" />;
      case 'quiz':
        return <CheckCircle className="w-5 h-5" />;
      case 'forum':
        return <MessageSquare className="w-5 h-5" />;
      case 'reading-control':
        return <BookOpen className="w-5 h-5" />;
      case 'live-class':
        return <Video className="w-5 h-5" />;
    }
  };

  const getActivityTypeLabel = (type: ActivityType) => {
    const labels = {
      assignment: 'Tarea',
      quiz: 'Evaluación',
      forum: 'Foro',
      'reading-control': 'Lectura',
      'live-class': 'Clase en vivo'
    };
    return labels[type];
  };

  const getStatusBadge = (status: ActivityStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
            Completada
          </span>
        );
      case 'submitted':
        return (
          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
            Enviada
          </span>
        );
      case 'pending':
        return (
          <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium border border-amber-200">
            Pendiente
          </span>
        );
      case 'overdue':
        return (
          <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium border border-red-200">
            Atrasada
          </span>
        );
      case 'upcoming':
        return (
          <span className="px-3 py-1 bg-slate-50 text-slate-700 rounded-full text-xs font-medium border border-slate-200">
            Próximamente
          </span>
        );
    }
  };

  const getStatusColor = (status: ActivityStatus) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-white hover:bg-green-50/30';
      case 'submitted':
        return 'border-blue-200 bg-white hover:bg-blue-50/30';
      case 'pending':
        return 'border-amber-200 bg-white hover:bg-amber-50/30';
      case 'overdue':
        return 'border-red-200 bg-white hover:bg-red-50/30';
      case 'upcoming':
        return 'border-slate-200 bg-white hover:bg-slate-50/30';
      default:
        return 'border-gray-200 bg-white hover:bg-gray-50';
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesFilter = activeFilter === 'all' || activity.status === activeFilter;
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.course.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    pending: activities.filter(a => a.status === 'pending').length,
    submitted: activities.filter(a => a.status === 'submitted').length,
    completed: activities.filter(a => a.status === 'completed').length,
    overdue: activities.filter(a => a.status === 'overdue').length
  };

  const handleActivityClick = (activity: Activity) => {
    toast.success(`Abriendo: ${activity.title}`);
    if (activity.type === 'quiz' && onNavigateToQuiz) {
      onNavigateToQuiz();
    } else if (activity.type === 'forum' && onNavigateToForum) {
      onNavigateToForum(activity.id.toString(), {
        courseCode: activity.courseId,
        courseName: activity.course,
        moduleName: activity.moduleId ? `Módulo ${activity.moduleId}` : undefined
      });
    } else if (activity.type === 'reading-control' && onNavigateToReading) {
      onNavigateToReading({
        title: activity.title,
        pdfUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf',
        courseName: activity.course,
        moduleName: activity.moduleId ? `Módulo ${activity.moduleId}` : undefined
      });
    } else if (activity.type === 'assignment' && onNavigateToAssignment) {
      onNavigateToAssignment(activity.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Actividades</h1>
        <p className="text-xl opacity-90">Gestiona tus tareas, evaluaciones y clases programadas</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <div className="bg-white rounded-2xl p-3 border-2 border-amber-200 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-3xl font-bold text-amber-600">{stats.pending}</p>
              <p className="text-sm font-medium text-gray-700">Pendientes</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3 border-2 border-blue-200 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-3xl font-bold text-blue-600">{stats.submitted}</p>
              <p className="text-sm font-medium text-gray-700">Enviadas</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3 border-2 border-green-200 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
              <p className="text-sm font-medium text-gray-700">Completadas</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3 border-2 border-red-200 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-3xl font-bold text-red-600">{stats.overdue}</p>
              <p className="text-sm font-medium text-gray-700">Atrasadas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#0B95BA] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todas ({activities.length})
            </button>
            <button
              onClick={() => setActiveFilter('pending')}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                activeFilter === 'pending'
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pendientes ({stats.pending})
            </button>
            <button
              onClick={() => setActiveFilter('submitted')}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                activeFilter === 'submitted'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Enviadas ({stats.submitted})
            </button>
            <button
              onClick={() => setActiveFilter('completed')}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                activeFilter === 'completed'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completadas ({stats.completed})
            </button>
            <button
              onClick={() => setActiveFilter('overdue')}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                activeFilter === 'overdue'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Atrasadas ({stats.overdue})
            </button>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar actividades"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Activities List */}
      <div className="space-y-4">
        {filteredActivities.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No se encontraron actividades</p>
          </div>
        ) : (
          filteredActivities.map((activity) => (
            <div
              key={activity.id}
              onClick={() => handleActivityClick(activity)}
              className={`rounded-2xl p-6 border-2 transition-all cursor-pointer hover:shadow-lg ${getStatusColor(activity.status)}`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  activity.status === 'completed' ? 'bg-green-500 text-white' :
                  activity.status === 'submitted' ? 'bg-blue-500 text-white' :
                  activity.status === 'overdue' ? 'bg-red-500 text-white' :
                  activity.status === 'upcoming' ? 'bg-slate-600 text-white' :
                  'bg-amber-500 text-white'
                }`}>
                  {getActivityIcon(activity.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{activity.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{activity.course}</p>
                      {activity.description && (
                        <p className="text-sm text-gray-700 mb-3">{activity.description}</p>
                      )}
                    </div>
                    {getStatusBadge(activity.status)}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="text-gray-600">
                      <span>{getActivityTypeLabel(activity.type)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-600">
                      <Calendar className="w-4 h-4" />
                      <span>Publicado: {activity.publishDate}</span>
                    </div>
                    {activity.dueDate && (
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>Vence: {activity.dueDate} {activity.dueTime && `• ${activity.dueTime}`}</span>
                      </div>
                    )}
                    {activity.submittedDate && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Enviado: {activity.submittedDate}</span>
                      </div>
                    )}
                    {activity.grade !== undefined && (
                      <div className="flex items-center gap-1 text-green-600 font-medium">
                        <span>Nota: {activity.grade}/{activity.maxGrade}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Arrow */}
                <ArrowRight className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}