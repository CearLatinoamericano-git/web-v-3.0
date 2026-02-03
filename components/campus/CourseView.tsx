import { useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Circle,
  CheckCircle,
  FileText,
  Download,
  Upload,
  Users,
  Clock,
  Video,
  Calendar,
  BarChart3,
  Award,
  AlertCircle,
  Play,
  Film,
  RadioTower,
  Mail,
  Phone,
  MapPin,
  Shield,
  Bell,
  Search
} from 'lucide-react';
import { toast } from 'sonner';
import { QuizView } from './QuizView';
import { GroupActivityView } from './student/GroupActivityView';
import { StudentGradesView } from './student/StudentGradesView';
import { StudentAttendanceView } from './student/StudentAttendanceView';

interface CourseViewProps {
  courseId: string;
  onBack: () => void;
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
}

type SessionStatus = 'completed' | 'in-progress' | 'upcoming' | 'locked';
type ClassStatus = 'live' | 'recorded' | 'scheduled';
type ActivityStatus = 'completed' | 'submitted' | 'pending' | 'not-started';

interface Activity {
  id: number | string;
  title: string;
  type: 'assignment' | 'quiz' | 'forum' | 'reading';
  status: ActivityStatus;
  dueDate?: string;
  startDate?: string;
  grade?: number;
  maxGrade?: number;
  description?: string;
  minComments?: number;
  isGroupWork?: boolean;
  allowChat?: boolean;
  submittedDate?: string;
  reviewedDate?: string;
}

interface LiveClass {
  id: number;
  title: string;
  status: ClassStatus;
  scheduledDate?: string;
  scheduledTime?: string;
  duration: string;
  meetLink?: string;
  recordingUrl?: string;
  completedDate?: string;
}

interface Session {
  id: number;
  title: string;
  status: SessionStatus;
  progress: number;
  instructor?: string;
  liveClass: LiveClass;
  activities: Activity[];
  materials: { title: string; type: string; url: string }[];
}

interface Module {
  id: number;
  title: string;
  description: string;
  progress: number;
  status: SessionStatus;
  sessions: Session[];
  evaluations?: Activity[];
}

export function CourseView({ courseId, onBack, onNavigateToQuiz, onNavigateToReading, onNavigateToForum }: CourseViewProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'grades' | 'attendance' | 'certificates' | 'participants'>('content');
  const [expandedModules, setExpandedModules] = useState<number[]>([1, 2]);
  const [expandedSessions, setExpandedSessions] = useState<number[]>([1, 4]);
  const [selectedGroupActivity, setSelectedGroupActivity] = useState<Activity | null>(null);

  // Determinar si el curso está completado basado en el courseId
  const isCompletedCourse = courseId === '2';

  // Mock data - En producción vendría de la API
  const course = isCompletedCourse ? {
    id: '2',
    title: 'Especialización en arbitraje comercial internacional',
    instructor: 'Dra. María González Ríos',
    progress: 100,
    isGroupCourse: true,
    modules: 10,
    duration: '4 meses',
    enrolledDate: '01/09/2025',
    completedDate: '28/11/2025',
    finalGrade: 18.5,
    certificateId: 'CERT-ARB-2025-00142',
    totalHours: 100
  } : {
    title: 'Diplomado en arbitraje comercial internacional',
    instructor: 'Dr. Carlos Méndez',
    progress: 45,
    isGroupCourse: true, // Indica si el curso es en grupo o individual
    modules: 4,
    duration: '6 meses'
  };

  const modules: Module[] = isCompletedCourse ? [
    // CURSO COMPLETADO - Todos los módulos al 100%
    {
      id: 1,
      title: 'Módulo 1: Introducción al arbitraje internacional',
      description: 'Fundamentos y marco legal del arbitraje',
      progress: 100,
      status: 'completed',
      sessions: [
        {
          id: 1,
          title: 'Sesión 1: Fundamentos del arbitraje',
          status: 'completed',
          progress: 100,
          instructor: 'Dra. María González Ríos',
          liveClass: {
            id: 1,
            title: 'Clase: Introducción y conceptos básicos',
            status: 'recorded',
            scheduledDate: '2025-09-05',
            scheduledTime: '18:00',
            duration: '2 horas',
            recordingUrl: 'https://meet.google.com/recording/abc123',
            completedDate: '2025-09-05'
          },
          activities: [
            {
              id: 1,
              title: 'Quiz: Conceptos básicos de arbitraje',
              type: 'quiz',
              status: 'completed',
              dueDate: '2025-09-10',
              grade: 19,
              maxGrade: 20,
              submittedDate: '2025-09-09',
              reviewedDate: '2025-09-11'
            },
            {
              id: 2,
              title: 'Lectura: Marco legal del arbitraje internacional',
              type: 'reading',
              status: 'completed',
              dueDate: '2025-09-12'
            }
          ],
          materials: [
            { title: 'Presentación - Introducción al Arbitraje', type: 'PDF', url: '#' },
            { title: 'Ley de Arbitraje Internacional', type: 'PDF', url: '#' }
          ]
        },
        {
          id: 2,
          title: 'Sesión 2: Tipos de arbitraje',
          status: 'completed',
          progress: 100,
          instructor: 'Dra. María González Ríos',
          liveClass: {
            id: 2,
            title: 'Clase: Arbitraje nacional vs internacional',
            status: 'recorded',
            scheduledDate: '2025-09-12',
            scheduledTime: '18:00',
            duration: '2 horas',
            recordingUrl: 'https://meet.google.com/recording/def456',
            completedDate: '2025-09-12'
          },
          activities: [
            {
              id: 3,
              title: 'Foro: Casos de arbitraje internacional',
              type: 'forum',
              status: 'completed',
              dueDate: '2025-09-17',
              grade: 20,
              maxGrade: 20,
              reviewedDate: '2025-09-18'
            }
          ],
          materials: [
            { title: 'Casos prácticos de arbitraje', type: 'PDF', url: '#' }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Módulo 2: Procedimiento arbitral',
      description: 'Etapas y desarrollo del proceso arbitral',
      progress: 100,
      status: 'completed',
      sessions: [
        {
          id: 3,
          title: 'Sesión 1: Inicio del arbitraje',
          status: 'completed',
          progress: 100,
          instructor: 'Dr. Roberto Sánchez',
          liveClass: {
            id: 3,
            title: 'Clase: Solicitud y demanda arbitral',
            status: 'recorded',
            scheduledDate: '2025-09-19',
            scheduledTime: '18:00',
            duration: '2 horas',
            recordingUrl: 'https://meet.google.com/recording/ghi789',
            completedDate: '2025-09-19'
          },
          activities: [
            {
              id: 4,
              title: 'Tarea: Análisis de demanda arbitral',
              type: 'assignment',
              status: 'completed',
              dueDate: '2025-09-24',
              grade: 18,
              maxGrade: 20,
              submittedDate: '2025-09-23',
              reviewedDate: '2025-09-26'
            }
          ],
          materials: [
            { title: 'Modelos de demandas arbitrales', type: 'PDF', url: '#' }
          ]
        }
      ]
    },
    {
      id: 3,
      title: 'Módulo 3: Laudos arbitrales',
      description: 'Elaboración y ejecución de laudos',
      progress: 100,
      status: 'completed',
      sessions: [
        {
          id: 4,
          title: 'Sesión 1: Estructura del laudo',
          status: 'completed',
          progress: 100,
          instructor: 'Dr. Fernando Castillo',
          liveClass: {
            id: 4,
            title: 'Clase: Componentes del laudo arbitral',
            status: 'recorded',
            scheduledDate: '2025-10-01',
            scheduledTime: '18:00',
            duration: '2 horas',
            recordingUrl: 'https://meet.google.com/recording/xyz123',
            completedDate: '2025-10-01'
          },
          activities: [
            {
              id: 5,
              title: 'Ensayo: Redacción de laudo arbitral',
              type: 'assignment',
              status: 'completed',
              dueDate: '2025-10-08',
              grade: 19,
              maxGrade: 20,
              submittedDate: '2025-10-07',
              reviewedDate: '2025-10-10'
            }
          ],
          materials: [
            { title: 'Ejemplos de laudos arbitrales', type: 'PDF', url: '#' }
          ]
        }
      ]
    },
    {
      id: 4,
      title: 'Módulo 4: Ejecución de laudos',
      description: 'Procedimientos de ejecución y cumplimiento',
      progress: 100,
      status: 'completed',
      evaluations: [
        {
          id: 'final-exam',
          title: 'Examen final - Arbitraje comercial internacional',
          type: 'quiz',
          status: 'completed',
          startDate: '15/11/2025',
          dueDate: '20/11/2025',
          description: 'Examen integral que cubre todos los contenidos del programa',
          maxGrade: 20,
          grade: 18,
          submittedDate: '2025-11-20',
          reviewedDate: '2025-11-22'
        }
      ],
      sessions: [
        {
          id: 5,
          title: 'Sesión 1: Ejecución nacional',
          status: 'completed',
          progress: 100,
          instructor: 'Dra. Patricia López',
          liveClass: {
            id: 5,
            title: 'Clase: Procedimientos de ejecución',
            status: 'recorded',
            scheduledDate: '2025-11-05',
            scheduledTime: '18:00',
            duration: '2 horas',
            recordingUrl: 'https://meet.google.com/recording/final123',
            completedDate: '2025-11-05'
          },
          activities: [
            {
              id: 6,
              title: 'Caso práctico: Ejecución de laudo',
              type: 'assignment',
              status: 'completed',
              dueDate: '2025-11-15',
              grade: 18,
              maxGrade: 20,
              submittedDate: '2025-11-14',
              reviewedDate: '2025-11-17'
            }
          ],
          materials: [
            { title: 'Procedimientos de ejecución', type: 'PDF', url: '#' }
          ]
        }
      ]
    }
  ] : [
    {
      id: 1,
      title: 'Módulo 1: Introducción al arbitraje',
      description: 'Fundamentos y marco legal del arbitraje',
      progress: 100,
      status: 'completed',
      sessions: [
        {
          id: 1,
          title: 'Sesión 1: Fundamentos del arbitraje',
          status: 'completed',
          progress: 100,
          instructor: 'Dr. Carlos Méndez',
          liveClass: {
            id: 1,
            title: 'Clase: Introducción y conceptos básicos',
            status: 'recorded',
            scheduledDate: '2024-10-15',
            scheduledTime: '18:00',
            duration: '2 horas',
            recordingUrl: 'https://meet.google.com/recording/abc123',
            completedDate: '2024-10-15'
          },
          activities: [
            {
              id: 1,
              title: 'Quiz: Conceptos básicos de arbitraje',
              type: 'quiz',
              status: 'completed',
              dueDate: '2024-10-20',
              grade: 18,
              maxGrade: 20,
              submittedDate: '2024-10-19',
              reviewedDate: '2024-10-21'
            },
            {
              id: 2,
              title: 'Lectura: Marco legal del arbitraje en Perú',
              type: 'reading',
              status: 'completed',
              dueDate: '2024-10-22'
            },
            {
              id: 'assignment-group-1',
              title: 'Tarea: Análisis comparativo de sistemas de arbitraje',
              type: 'assignment',
              status: 'submitted',
              dueDate: '2024-12-15',
              description: 'Realizar un análisis comparativo entre los sistemas de arbitraje de Perú, Chile y Colombia. El trabajo debe incluir: marco legal, instituciones arbitrales, y casos relevantes. Extensión: 15-20 páginas.',
              maxGrade: 20,
              isGroupWork: true,
              allowChat: true,
              submittedDate: '2024-12-14'
            }
          ],
          materials: [
            { title: 'Presentación - Introducción al arbitraje', type: 'PDF', url: '#' },
            { title: 'Ley de arbitraje peruana', type: 'PDF', url: '#' }
          ]
        },
        {
          id: 2,
          title: 'Sesión 2: Tipos de arbitraje',
          status: 'completed',
          progress: 100,
          instructor: 'Dra. María González',
          liveClass: {
            id: 2,
            title: 'Clase: Arbitraje nacional vs internacional',
            status: 'recorded',
            scheduledDate: '2024-10-22',
            scheduledTime: '18:00',
            duration: '2 horas',
            recordingUrl: 'https://meet.google.com/recording/def456',
            completedDate: '2024-10-22'
          },
          activities: [
            {
              id: 3,
              title: 'Foro: Casos de arbitraje nacional',
              type: 'forum',
              status: 'completed',
              dueDate: '2024-10-27',
              grade: 20,
              maxGrade: 20,
              reviewedDate: '2024-10-28'
            }
          ],
          materials: [
            { title: 'Casos prácticos de arbitraje', type: 'PDF', url: '#' }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Módulo 2: Arbitraje comercial',
      description: 'Procedimientos y prácticas en arbitraje comercial',
      progress: 60,
      status: 'in-progress',
      evaluations: [
        {
          id: 'module-exam-2',
          title: 'Examen del módulo 2 - Arbitraje comercial',
          type: 'quiz',
          status: 'pending',
          startDate: '15/12/2024',
          dueDate: '20/12/2024',
          description: 'Examen integral que cubre todos los contenidos de las sesiones del módulo 2',
          maxGrade: 20
        }
      ],
      sessions: [
        {
          id: 3,
          title: 'Sesión 1: Contratos Comerciales y Cláusulas Arbitrales',
          status: 'completed',
          progress: 100,
          instructor: 'Dr. Roberto Sánchez',
          liveClass: {
            id: 3,
            title: 'Clase: Redacción de cláusulas arbitrales',
            status: 'recorded',
            scheduledDate: '2024-11-05',
            scheduledTime: '18:00',
            duration: '2 horas',
            recordingUrl: 'https://meet.google.com/recording/ghi789',
            completedDate: '2024-11-05'
          },
          activities: [
            {
              id: 4,
              title: 'Tarea: Análisis de cláusulas arbitrales',
              type: 'assignment',
              status: 'completed',
              dueDate: '2024-11-10',
              grade: 19,
              maxGrade: 20,
              submittedDate: '2024-11-09',
              reviewedDate: '2024-11-12'
            },
            {
              id: 'forum-1',
              title: 'Foro: Autonomía de la voluntad en contratos comerciales',
              type: 'forum',
              status: 'pending',
              dueDate: '2024-12-03',
              description: 'Participa activamente en el foro analizando casos reales sobre el principio de autonomía de la voluntad en la celebración de contratos comerciales. Debes realizar al menos 2 comentarios fundamentados y responder a mínimo 1 compañero.',
              minComments: 2
            }
          ],
          materials: [
            { title: 'Modelos de cláusulas arbitrales', type: 'PDF', url: '#' }
          ]
        },
        {
          id: 4,
          title: 'Sesión 2: Procedimiento arbitral',
          status: 'in-progress',
          progress: 50,
          instructor: 'Dr. Alberto Vargas',
          liveClass: {
            id: 4,
            title: 'Clase: Etapas del procedimiento arbitral',
            status: 'live',
            scheduledDate: '2024-12-10',
            scheduledTime: '18:00',
            duration: '2 horas',
            meetLink: 'https://meet.google.com/abc-def-ghi'
          },
          activities: [
            {
              id: 5,
              title: 'Ensayo: Procedimiento en arbitraje comercial',
              type: 'assignment',
              status: 'submitted',
              dueDate: '2024-11-20',
              maxGrade: 20,
              submittedDate: '2024-11-19'
            },
            {
              id: 6,
              title: 'Quiz: Evaluación del procedimiento',
              type: 'quiz',
              status: 'pending',
              dueDate: '2024-11-25',
              maxGrade: 20
            }
          ],
          materials: [
            { title: 'Guía del procedimiento arbitral', type: 'PDF', url: '#' }
          ]
        },
        {
          id: 5,
          title: 'Sesión 3: Audiencias arbitrales',
          status: 'upcoming',
          progress: 0,
          instructor: 'Dra. Patricia López',
          liveClass: {
            id: 5,
            title: 'Clase: Conducción de audiencias',
            status: 'scheduled',
            scheduledDate: '2024-11-26',
            scheduledTime: '18:00',
            duration: '2 horas',
            meetLink: 'https://meet.google.com/xyz-abc-def'
          },
          activities: [],
          materials: []
        }
      ]
    },
    {
      id: 3,
      title: 'Módulo 3: Laudos Arbitrales',
      description: 'Elaboración y ejecución de laudos',
      progress: 0,
      status: 'locked',
      sessions: [
        {
          id: 6,
          title: 'Sesión 1: Estructura del laudo',
          status: 'locked',
          progress: 0,
          instructor: 'Dr. Fernando Castillo',
          liveClass: {
            id: 6,
            title: 'Clase: Componentes del laudo arbitral',
            status: 'scheduled',
            scheduledDate: '2024-12-03',
            scheduledTime: '18:00',
            duration: '2 horas'
          },
          activities: [],
          materials: []
        }
      ]
    }
  ];

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const toggleSession = (sessionId: number) => {
    setExpandedSessions(prev =>
      prev.includes(sessionId)
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const handleJoinLiveClass = (meetLink: string, className: string) => {
    toast.success(`Uniéndose a: ${className}`, {
      description: 'Se abrirá Google Meet en una nueva ventana'
    });
    window.open(meetLink, '_blank');
  };

  const handleWatchRecording = (recordingUrl: string, className: string) => {
    toast.info(`Reproduciendo: ${className}`);
    window.open(recordingUrl, '_blank');
  };

  const handleActivityClick = (activity: Activity, session: Session, module: Module) => {
    if (activity.status === 'locked') {
      toast.error('Esta actividad aún no está disponible');
      return;
    }

    if (activity.type === 'quiz' && onNavigateToQuiz) {
      onNavigateToQuiz();
    } else if (activity.type === 'reading' && onNavigateToReading) {
      onNavigateToReading({
        title: activity.title,
        pdfUrl: 'https://example.com/sample.pdf',
        courseName: course.title,
        moduleName: module.title
      });
    } else if (activity.type === 'forum' && onNavigateToForum) {
      onNavigateToForum(String(activity.id), {
        courseCode: courseId,
        courseName: course.title,
        moduleName: module.title
      });
    } else if (activity.type === 'assignment' && activity.isGroupWork) {
      setSelectedGroupActivity(activity);
    } else if (activity.type === 'assignment') {
      toast.info('Vista de tarea individual - En desarrollo');
    }
  };

  const getStatusIcon = (status: SessionStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return (
          <div className="relative w-5 h-5 flex items-center justify-center">
            <Circle className="w-5 h-5 text-blue-500 absolute" />
            <Play className="w-2.5 h-2.5 text-blue-500 fill-blue-500 relative z-10" />
          </div>
        );
      case 'upcoming':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'locked':
        return <Circle className="w-5 h-5 text-gray-300" />;
    }
  };

  const getClassStatusBadge = (status: ClassStatus) => {
    switch (status) {
      case 'live':
        return (
          <span className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg">
            <RadioTower className="w-4 h-4" />
            EN VIVO AHORA
          </span>
        );
      case 'recorded':
        return (
          <span className="px-4 py-2 bg-gradient-to-r from-[#0B95BA] to-[#087A98] text-white rounded-lg text-sm font-bold flex items-center gap-2 shadow-md">
            <Film className="w-4 h-4" />
            CLASE GRABADA
          </span>
        );
      case 'scheduled':
        return (
          <span className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg text-sm font-bold flex items-center gap-2 shadow-md">
            <Calendar className="w-4 h-4" />
            PROGRAMADA
          </span>
        );
    }
  };

  const getActivityStatusBadge = (activity: Activity) => {
    // Si tiene nota, está completado (ya calificado)
    if (activity.grade !== undefined) {
      return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Completado</span>;
    }
    
    // Si fue enviado pero no tiene nota, está en revisión
    if (activity.status === 'submitted') {
      return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">En revisión</span>;
    }
    
    // Si está pendiente y tiene fecha de vencimiento
    if (activity.status === 'pending' && activity.dueDate) {
      return <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">Vence {activity.dueDate}</span>;
    }
    
    // Otros estados
    switch (activity.status) {
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Completado</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">Pendiente</span>;
      case 'not-started':
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">No iniciada</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">No iniciada</span>;
    }
  };

  const tabs = [
    { id: 'content', label: 'Contenido', icon: BookOpen },
    { id: 'grades', label: 'Calificaciones', icon: BarChart3 },
    { id: 'attendance', label: 'Asistencias', icon: Calendar },
    { id: 'certificates', label: 'Certificados', icon: Award },
  ];

  if (selectedGroupActivity) {
    return (
      <GroupActivityView
        activity={selectedGroupActivity}
        onBack={() => setSelectedGroupActivity(null)}
        courseName={course.title}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] text-white rounded-3xl p-4 sm:p-6 md:p-8 mb-6">
        <button
          onClick={onBack}
          className="mb-4 px-3 sm:px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 text-sm sm:text-base"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
          Volver a Mis Programas
        </button>

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{course.title}</h1>
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm sm:text-base md:text-lg">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{course.modules} módulos</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{course.duration}</span>
              </div>
            </div>
          </div>

          <div className="text-left lg:text-right">
            <div className="text-4xl sm:text-5xl font-bold mb-2">{course.progress}%</div>
            <p className="text-xs sm:text-sm opacity-90">Progreso del programa</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 sm:mt-6">
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-2xl border border-gray-200 p-2 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 rounded-xl transition-all whitespace-nowrap text-sm sm:text-base ${
                  activeTab === tab.id
                    ? 'bg-[#0B95BA] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* CONTENT TAB */}
        {activeTab === 'content' && (
          <div className="space-y-8">
            {modules.map((module) => {
              const isExpanded = expandedModules.includes(module.id);
              
              return (
                <div key={module.id} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  {/* Module Header */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full bg-[#0B95BA] p-4 sm:p-6 flex items-center justify-between hover:bg-[#0995B0] transition-colors"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-[#0B95BA]" />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <h3 className="font-bold text-base sm:text-lg md:text-xl text-white">{module.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-white/70 mt-1">
                          <span>{module.sessions.length} sesiones</span>
                          {module.evaluations && module.evaluations.length > 0 && (
                            <span className="text-orange-200 font-medium">
                              {module.evaluations.length} evaluación{module.evaluations.length > 1 ? 'es' : ''} de módulo
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                      <div className="text-right hidden sm:block">
                        <div className="text-xl sm:text-2xl font-bold text-white">{module.progress}%</div>
                        <p className="text-xs text-white/70">Progreso</p>
                      </div>
                      <div className="text-white sm:hidden text-lg font-bold">{module.progress}%</div>
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      ) : (
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      )}
                    </div>
                  </button>

                  {/* Module Content */}
                  {isExpanded && (
                    <div className="p-4 sm:p-6">
                      {/* Evaluaciones de módulo */}
                      {module.evaluations && module.evaluations.length > 0 && (
                        <div className="mb-6 bg-orange-50 border-2 border-orange-200 rounded-xl p-3 sm:p-5">
                          <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-3 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                            Evaluaciones del Módulo
                          </h4>
                          <div className="space-y-3">
                            {module.evaluations.map((evaluation) => (
                              <div
                                key={evaluation.id}
                                onClick={() => handleActivityClick(evaluation, module.sessions[0], module)}
                                className="bg-white p-3 sm:p-4 rounded-xl cursor-pointer hover:shadow-md transition-shadow border border-orange-200"
                              >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                  <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                      evaluation.status === 'completed'
                                        ? 'bg-green-500'
                                        : evaluation.status === 'submitted'
                                        ? 'bg-blue-500'
                                        : 'bg-orange-500'
                                    }`}>
                                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h6 className="font-medium text-sm sm:text-base text-gray-900">{evaluation.title}</h6>
                                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-1">
                                        {evaluation.startDate && (
                                          <span className="text-xs text-gray-600">
                                            Habilitado desde {evaluation.startDate}
                                          </span>
                                        )}
                                        {evaluation.grade !== undefined && (
                                          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-md w-fit">
                                            <span className="text-xs sm:text-sm font-bold">Nota: {evaluation.grade} / {evaluation.maxGrade}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  {getActivityStatusBadge(evaluation)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Sessions */}
                      <div className="space-y-4">
                        {module.sessions.map((session) => {
                          const isSessionExpanded = expandedSessions.includes(session.id);
                          
                          return (
                            <div
                              key={session.id}
                              className={`border-2 rounded-xl overflow-hidden transition-all ${
                                session.status === 'locked'
                                  ? 'border-gray-200 bg-gray-50 opacity-60'
                                  : 'border-gray-200 bg-white hover:border-[#0B95BA]'
                              }`}
                            >
                              {/* Session Header */}
                              <button
                                onClick={() => session.status !== 'locked' && toggleSession(session.id)}
                                disabled={session.status === 'locked'}
                                className="w-full p-3 sm:p-5 flex items-center justify-between"
                              >
                                <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                                  {getStatusIcon(session.status)}
                                  <div className="text-left flex-1 min-w-0">
                                    <h4 className="font-bold text-sm sm:text-base text-gray-900">{session.title}</h4>
                                    {session.instructor && (
                                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                        Docente: {session.instructor}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                                  {session.status !== 'locked' && (
                                    <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline">{session.progress}% completado</span>
                                  )}
                                  {isSessionExpanded ? (
                                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                  )}
                                </div>
                              </button>

                              {/* Session Content */}
                              {isSessionExpanded && session.status !== 'locked' && (
                                <div className="px-3 sm:px-5 pb-3 sm:pb-5 space-y-4 sm:space-y-6">
                                  {/* Live Class */}
                                  <div className="bg-white rounded-xl p-3 sm:p-5 border-2 border-[#0B95BA] shadow-sm">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-3">
                                      <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                                          <Video className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <h5 className="font-bold text-sm sm:text-base text-gray-900">{session.liveClass.title}</h5>
                                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mt-1">
                                            {session.liveClass.scheduledDate && (
                                              <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                                {session.liveClass.scheduledDate}
                                              </span>
                                            )}
                                            {session.liveClass.scheduledTime && (
                                              <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                                {session.liveClass.scheduledTime}
                                              </span>
                                            )}
                                            <span>{session.liveClass.duration}</span>
                                          </div>
                                        </div>
                                      </div>
                                      {getClassStatusBadge(session.liveClass.status)}
                                    </div>

                                    {session.liveClass.status === 'live' && session.liveClass.meetLink && (
                                      <button
                                        onClick={() => handleJoinLiveClass(session.liveClass.meetLink!, session.liveClass.title)}
                                        className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all flex items-center justify-center gap-2"
                                      >
                                        <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                                        Unirse a la clase en vivo
                                      </button>
                                    )}

                                    {session.liveClass.status === 'recorded' && session.liveClass.recordingUrl && (
                                      <button
                                        onClick={() => handleWatchRecording(session.liveClass.recordingUrl!, session.liveClass.title)}
                                        className="w-full bg-[#0B95BA] hover:bg-[#0995B0] text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                                      >
                                        <Play className="w-5 h-5" />
                                        Ver clase grabada
                                      </button>
                                    )}

                                    {session.liveClass.status === 'scheduled' && (
                                      <div className="bg-white rounded-lg p-4 text-center">
                                        <p className="text-sm text-gray-600">
                                          La clase está programada para el{' '}
                                          <span className="font-medium text-gray-900">
                                            {session.liveClass.scheduledDate} a las {session.liveClass.scheduledTime}
                                          </span>
                                        </p>
                                      </div>
                                    )}
                                  </div>

                                  {/* Activities */}
                                  {session.activities.length > 0 && (
                                    <div>
                                      <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-gray-700" />
                                        Actividades
                                      </h5>
                                      <div className="space-y-3">
                                        {session.activities.map((activity) => (
                                          <div
                                            key={activity.id}
                                            onClick={() => handleActivityClick(activity, session, module)}
                                            className="p-4 border border-gray-200 rounded-xl hover:border-[#0B95BA] hover:shadow-md transition-all cursor-pointer"
                                          >
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                              <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                                                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                  activity.status === 'completed' || activity.grade !== undefined
                                                    ? 'bg-green-500'
                                                    : activity.status === 'submitted'
                                                    ? 'bg-blue-500'
                                                    : activity.status === 'pending'
                                                    ? 'bg-amber-500'
                                                    : 'bg-gray-400'
                                                }`}>
                                                  {activity.type === 'assignment' && <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                                                  {activity.type === 'quiz' && <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                                                  {activity.type === 'forum' && <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                                                  {activity.type === 'reading' && <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                  <h6 className="font-medium text-sm sm:text-base text-gray-900">{activity.title}</h6>
                                                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1">
                                                    {activity.isGroupWork && (
                                                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium flex items-center gap-1">
                                                        <Users className="w-3 h-3" />
                                                        Trabajo en Grupo
                                                      </span>
                                                    )}
                                                    {activity.grade !== undefined && (
                                                      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-md">
                                                        <span className="text-xs sm:text-sm font-bold">Nota: {activity.grade} / {activity.maxGrade}</span>
                                                      </div>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                              {getActivityStatusBadge(activity)}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Materials */}
                                  {session.materials.length > 0 && (
                                    <div>
                                      <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <Download className="w-5 h-5 text-gray-700" />
                                        Materiales
                                      </h5>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {session.materials.map((material, idx) => (
                                          <div
                                            key={idx}
                                            className="p-4 border border-gray-200 rounded-xl hover:border-[#0B95BA] transition-colors cursor-pointer flex items-center justify-between"
                                          >
                                            <div className="flex items-center gap-3">
                                              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                <FileText className="w-5 h-5 text-gray-600" />
                                              </div>
                                              <div>
                                                <p className="font-medium text-gray-900 text-sm">{material.title}</p>
                                                <p className="text-xs text-gray-500">{material.type}</p>
                                              </div>
                                            </div>
                                            <Download className="w-5 h-5 text-[#0B95BA]" />
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* GRADES TAB */}
        {activeTab === 'grades' && (
          <StudentGradesView modules={modules} />
        )}

        {/* ATTENDANCE TAB */}
        {activeTab === 'attendance' && (
          <StudentAttendanceView modules={modules} />
        )}

        {/* CERTIFICATES TAB */}
        {activeTab === 'certificates' && (
          isCompletedCourse && course.certificateId ? (
            // Certificado disponible para curso completado
            <div className="space-y-6">
              {/* Certificado completado */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Felicitaciones!</h3>
                  <p className="text-lg text-gray-600">Ha completado exitosamente el programa</p>
                </div>

                {/* Información del programa completado */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white rounded-xl p-6 border-2 border-green-100">
                    <p className="text-sm text-gray-600 mb-1">Programa completado</p>
                    <p className="text-xl font-bold text-gray-900">{course.completedDate}</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 border-2 border-green-100">
                    <p className="text-sm text-gray-600 mb-1">Calificación final</p>
                    <p className="text-4xl font-bold text-green-600">{course.finalGrade?.toFixed(1)}</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 border-2 border-green-100">
                    <p className="text-sm text-gray-600 mb-1">Total de horas académicas</p>
                    <p className="text-xl font-bold text-gray-900">{course.totalHours} horas</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 border-2 border-green-100">
                    <p className="text-sm text-gray-600 mb-1">Módulos completados</p>
                    <p className="text-xl font-bold text-gray-900">{modules.length} / {modules.length}</p>
                  </div>
                </div>

                {/* Sección del certificado */}
                <div className="bg-white rounded-2xl p-8 border-2 border-[#0B95BA]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-1">Certificado disponible</h4>
                      <p className="text-sm text-gray-600">Su certificado ha sido generado y está listo para descargar</p>
                      <p className="text-sm font-bold text-gray-900 mt-2">ID: {course.certificateId}</p>
                    </div>
                  </div>

                  {/* Preview del certificado */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-6 border-2 border-gray-200">
                    <div className="bg-white rounded-lg p-6 shadow-md border-4 border-[#0B95BA]">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-2">CENTRO DE ESTUDIOS EN ARBITRAJE Y RESOLUCIÓN DE CONTROVERSIAS</p>
                        <h2 className="text-3xl font-bold text-[#0B95BA] mb-4">CERTIFICADO</h2>
                        <p className="text-sm text-gray-600 mb-4">Se otorga el presente certificado a:</p>
                        <p className="text-2xl font-bold text-gray-900 mb-4">ESTUDIANTE CEAR</p>
                        <p className="text-sm text-gray-600 mb-2">Por haber completado satisfactoriamente el programa:</p>
                        <p className="text-lg font-bold text-gray-900 mb-4">{course.title}</p>
                        <div className="flex justify-center gap-8 text-sm text-gray-600 mb-4">
                          <div>
                            <p className="font-medium text-gray-900">Calificación</p>
                            <p className="text-2xl font-bold text-green-600">{course.finalGrade?.toFixed(1)}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Horas académicas</p>
                            <p className="text-2xl font-bold text-[#0B95BA]">{course.totalHours}</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mb-4">Fecha de emisión: {course.completedDate}</p>
                        <p className="text-xs text-gray-400">Código de verificación: {course.certificateId}</p>
                      </div>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        toast.success('Abriendo vista previa del certificado...');
                      }}
                      className="px-6 py-4 bg-white border-2 border-[#0B95BA] text-[rgb(255,255,255)] hover:bg-[#0B95BA] hover:text-white rounded-xl font-medium transition-all flex items-center justify-center gap-3 shadow-sm"
                    >
                      <Download className="w-5 h-5" />
                      Vista previa del certificado
                    </button>
                    <button
                      onClick={() => {
                        toast.success(`Descargando certificado ${course.certificateId}...`);
                      }}
                      className="px-6 py-4 bg-gradient-to-r from-[#0B95BA] to-[#087A98] hover:from-[#087A98] hover:to-[#0B95BA] text-white rounded-xl font-medium transition-all flex items-center justify-center gap-3 shadow-lg"
                    >
                      <Download className="w-5 h-5" />
                      Descargar certificado
                    </button>
                  </div>

                  {/* Información adicional */}
                  <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-gray-700">
                      <strong>Nota:</strong> Este certificado es válido y verificable mediante el código {course.certificateId}. 
                      Puede compartirlo con empleadores o instituciones educativas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Certificado no disponible aún
            <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center">
              <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Certificados</h3>
              <p className="text-gray-600 mb-6">
                Los certificados estarán disponibles al completar el programa
              </p>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                  <BarChart3 className="w-5 h-5" />
                  <span className="font-medium">Progreso actual: {course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] h-2 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}