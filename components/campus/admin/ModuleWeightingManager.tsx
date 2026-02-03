import { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  AlertCircle, 
  CheckCircle, 
  BarChart3,
  Info,
  Calculator,
  Save,
  X,
  Users,
  Check,
  FileText,
  Video,
  Calendar,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { QuizQuestionBuilder } from './activity-wizard/QuizQuestionBuilder';

type ActivityType = 'quiz' | 'assignment' | 'reading' | 'forum' | 'case-study' | 'reading-control' | 'survey' | 'exam';

interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'multiple-answer' | 'essay' | 'multiple-choice-grid';
  question: string;
  options: string[];
  correctAnswer?: number | number[];
  points: number;
  explanation?: string;
  gridRows?: string[];
  gridColumns?: string[];
  gridAnswers?: { [rowIndex: number]: number };
}

interface Activity {
  id: string;
  name: string;
  type: ActivityType;
  weight: number;
  // Campos adicionales para actividades completas
  graded?: boolean;
  passingScore?: number;
  attempts?: number;
  publishDate?: string;
  dueDate?: string;
  duration?: number;
  description?: string;
  isGroupWork?: boolean;
  totalStudents?: number;
  suggestedGroupSize?: number;
  allowChat?: boolean;
  questions?: Question[];
  timeLimit?: number;
  shuffleQuestions?: boolean;
  questionsToShow?: number;
  showCorrectAnswers?: boolean;
  attachments?: Array<{
    name: string;
    size: string;
    type: string;
    url: string;
  }>;
}

interface Session {
  id: string;
  name: string;
  activities: Activity[];
  hasLiveClass?: boolean;
  liveClass?: {
    date: string;
    time: string;
    duration: string;
    meetLink?: string;
    teacherId?: string;
    teacherName?: string;
  };
}

interface Module {
  id: string;
  name: string;
  weight: number;
  sessions: Session[];
  isExpanded: boolean;
}

interface ModuleWeightingManagerProps {
  courseId?: string;
  courseName?: string;
  onSave?: (modules: Module[]) => void;
}

export function ModuleWeightingManager({ courseId, courseName = 'Nuevo curso', onSave }: ModuleWeightingManagerProps) {
  const [modules, setModules] = useState<Module[]>([
    {
      id: '1',
      name: 'Módulo 1: Fundamentos',
      weight: 40,
      isExpanded: true,
      sessions: [
        {
          id: '1-1',
          name: 'Sesión 1: Introducción',
          activities: [
            { id: '1-1-1', name: 'Quiz: Conceptos Básicos', type: 'quiz', weight: 50 },
            { id: '1-1-2', name: 'Foro: Presentación', type: 'forum', weight: 50 }
          ]
        },
        {
          id: '1-2',
          name: 'Sesión 2: Marco Teórico',
          activities: [
            { id: '1-2-1', name: 'Control de lectura', type: 'reading', weight: 100 }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Módulo 2: Aplicación práctica',
      weight: 35,
      isExpanded: false,
      sessions: [
        {
          id: '2-1',
          name: 'Sesión 3: Casos Prácticos',
          activities: [
            { id: '2-1-1', name: 'Análisis de Caso', type: 'assignment', weight: 100 }
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'Módulo 3: Evaluación final',
      weight: 25,
      isExpanded: false,
      sessions: [
        {
          id: '3-1',
          name: 'Sesión final',
          activities: [
            { id: '3-1-1', name: 'Examen final', type: 'exam', weight: 100 }
          ]
        }
      ]
    }
  ]);

  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [editingWeight, setEditingWeight] = useState<string>('');
  
  // Modal states
  const [showAddModuleModal, setShowAddModuleModal] = useState(false);
  const [newModuleName, setNewModuleName] = useState('');
  const [newModuleWeight, setNewModuleWeight] = useState('');
  
  const [showAddSessionModal, setShowAddSessionModal] = useState(false);
  const [selectedModuleForSession, setSelectedModuleForSession] = useState<string | null>(null);
  const [newSessionName, setNewSessionName] = useState('');
  const [newSessionHasLiveClass, setNewSessionHasLiveClass] = useState(false);
  const [newSessionLiveClassDate, setNewSessionLiveClassDate] = useState('');
  const [newSessionLiveClassTime, setNewSessionLiveClassTime] = useState('');
  const [newSessionLiveClassDuration, setNewSessionLiveClassDuration] = useState('');
  const [newSessionTeacherId, setNewSessionTeacherId] = useState('');
  const [newSessionMeetLink, setNewSessionMeetLink] = useState('');
  
  // Lista de profesores disponibles
  const availableTeachers = [
    { id: 'T1', name: 'Dr. Juan Pérez', specialty: 'Arbitraje Internacional' },
    { id: 'T2', name: 'Dra. María González', specialty: 'Contratación Pública' },
    { id: 'T3', name: 'Dr. Carlos Ramírez', specialty: 'Resolución de Controversias' },
    { id: 'T4', name: 'Dra. Ana Martínez', specialty: 'Derecho Comercial' }
  ];
  
  // Activity Wizard states
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [selectedSessionForActivity, setSelectedSessionForActivity] = useState<{moduleId: string, sessionId: string} | null>(null);
  const [activityWizardStep, setActivityWizardStep] = useState(1);
  const [newActivity, setNewActivity] = useState<Partial<Activity>>({
    name: '',
    type: 'quiz',
    weight: 100,
    graded: true,
    passingScore: 14,
    attempts: 2,
    publishDate: '',
    dueDate: '',
    description: '',
    isGroupWork: false,
    totalStudents: 0,
    suggestedGroupSize: 5,
    allowChat: true,
    questions: [],
    timeLimit: undefined,
    shuffleQuestions: false,
    questionsToShow: undefined,
    showCorrectAnswers: true,
    attachments: []
  });

  // Calculate totals
  const totalModulesWeight = modules.reduce((sum, mod) => sum + mod.weight, 0);
  const isValidTotal = Math.abs(totalModulesWeight - 100) < 0.01;

  const getActivityTypeLabel = (type: string) => {
    const types = {
      quiz: 'Cuestionario',
      assignment: 'Trabajo',
      forum: 'Foro',
      reading: 'Lectura',
      'reading-control': 'Control de lectura',
      'case-study': 'Caso práctico',
      survey: 'Encuesta',
      exam: 'Examen'
    };
    return types[type as keyof typeof types] || type;
  };

  const getActivityTypeColor = (type: string) => {
    const colors = {
      quiz: 'bg-blue-100 text-blue-700 border-blue-200',
      assignment: 'bg-purple-100 text-purple-700 border-purple-200',
      forum: 'bg-green-100 text-green-700 border-green-200',
      reading: 'bg-amber-100 text-amber-700 border-amber-200',
      'reading-control': 'bg-orange-100 text-orange-700 border-orange-200',
      'case-study': 'bg-indigo-100 text-indigo-700 border-indigo-200',
      survey: 'bg-teal-100 text-teal-700 border-teal-200',
      exam: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const calculateModuleActivitiesTotal = (module: Module): number => {
    return module.sessions.reduce((sum, session) => sum + session.activities.length, 0);
  };

  const calculateSessionWeight = (module: Module, session: Session): number => {
    const totalActivities = calculateModuleActivitiesTotal(module);
    const sessionActivities = session.activities.length;
    return totalActivities > 0 ? (sessionActivities / totalActivities) * 100 : 0;
  };

  const calculateActivityActualWeight = (module: Module, session: Session, activity: Activity): number => {
    const totalActivities = calculateModuleActivitiesTotal(module);
    const sessionWeight = calculateSessionWeight(module, session);
    return totalActivities > 0 ? (activity.weight / 100) * (sessionWeight) : 0;
  };

  const calculateActivityFinalWeight = (module: Module, session: Session, activity: Activity): number => {
    const moduleWeight = module.weight;
    const activityWeight = calculateActivityActualWeight(module, session, activity);
    return (activityWeight / 100) * moduleWeight;
  };

  const handleModuleWeightChange = (moduleId: string, newWeight: number) => {
    setModules(modules.map(mod => 
      mod.id === moduleId ? { ...mod, weight: newWeight } : mod
    ));
  };

  const toggleModule = (moduleId: string) => {
    setModules(modules.map(mod => 
      mod.id === moduleId ? { ...mod, isExpanded: !mod.isExpanded } : mod
    ));
  };

  const addModule = () => {
    setNewModuleName(`Módulo ${modules.length + 1}`);
    setNewModuleWeight('');
    setShowAddModuleModal(true);
  };

  const handleCreateModule = () => {
    const weight = parseFloat(newModuleWeight);
    if (!newModuleName.trim()) {
      toast.error('El nombre del módulo es requerido');
      return;
    }
    if (isNaN(weight) || weight < 0 || weight > 100) {
      toast.error('El peso debe ser un número entre 0 y 100');
      return;
    }

    const newModule: Module = {
      id: `module-${Date.now()}`,
      name: newModuleName,
      weight: weight,
      isExpanded: true,
      sessions: []
    };
    
    setModules([...modules, newModule]);
    setShowAddModuleModal(false);
    setNewModuleName('');
    setNewModuleWeight('');
    toast.success('Módulo creado exitosamente');
  };

  const handleAddSession = (moduleId: string) => {
    setSelectedModuleForSession(moduleId);
    const module = modules.find(m => m.id === moduleId);
    setNewSessionName(`Sesión ${(module?.sessions.length || 0) + 1}`);
    setNewSessionHasLiveClass(false);
    setNewSessionLiveClassDate('');
    setNewSessionLiveClassTime('');
    setNewSessionLiveClassDuration('120');
    setNewSessionTeacherId('');
    setNewSessionMeetLink('');
    setShowAddSessionModal(true);
  };

  const handleCreateSession = () => {
    if (!newSessionName.trim()) {
      toast.error('El nombre de la sesión es requerido');
      return;
    }
    
    if (newSessionHasLiveClass) {
      if (!newSessionLiveClassDate) {
        toast.error('La fecha de la clase en vivo es requerida');
        return;
      }
      if (!newSessionLiveClassTime) {
        toast.error('La hora de la clase en vivo es requerida');
        return;
      }
      if (!newSessionTeacherId) {
        toast.error('Debe seleccionar un docente');
        return;
      }
    }
    
    if (!selectedModuleForSession) return;

    const selectedTeacher = availableTeachers.find(t => t.id === newSessionTeacherId);
    
    const newSession: Session = {
      id: `session-${Date.now()}`,
      name: newSessionName,
      activities: [],
      hasLiveClass: newSessionHasLiveClass,
      liveClass: newSessionHasLiveClass ? {
        date: newSessionLiveClassDate,
        time: newSessionLiveClassTime,
        duration: newSessionLiveClassDuration,
        meetLink: newSessionMeetLink || undefined,
        teacherId: newSessionTeacherId,
        teacherName: selectedTeacher?.name
      } : undefined
    };

    setModules(modules.map(mod => 
      mod.id === selectedModuleForSession
        ? { ...mod, sessions: [...mod.sessions, newSession] }
        : mod
    ));

    setShowAddSessionModal(false);
    setNewSessionName('');
    setSelectedModuleForSession(null);
    toast.success('Sesión agregada exitosamente');
  };

  const handleAddActivity = (moduleId: string, sessionId: string) => {
    setSelectedSessionForActivity({ moduleId, sessionId });
    setActivityWizardStep(1);
    setNewActivity({
      name: '',
      type: 'quiz',
      weight: 100,
      graded: true,
      passingScore: 14,
      attempts: 2,
      publishDate: '',
      dueDate: '',
      description: '',
      isGroupWork: false,
      totalStudents: 0,
      suggestedGroupSize: 5,
      allowChat: true,
      questions: [],
      timeLimit: undefined,
      shuffleQuestions: false,
      questionsToShow: undefined,
      showCorrectAnswers: true,
      attachments: []
    });
    setShowAddActivityModal(true);
  };

  const handleCreateActivity = () => {
    if (!selectedSessionForActivity) return;

    const activity: Activity = {
      id: `activity-${Date.now()}`,
      name: newActivity.name || '',
      type: newActivity.type || 'quiz',
      weight: newActivity.weight || 100,
      graded: newActivity.graded,
      passingScore: newActivity.passingScore,
      attempts: newActivity.attempts,
      publishDate: newActivity.publishDate,
      dueDate: newActivity.dueDate,
      description: newActivity.description,
      isGroupWork: newActivity.isGroupWork,
      totalStudents: newActivity.totalStudents,
      suggestedGroupSize: newActivity.suggestedGroupSize,
      allowChat: newActivity.allowChat,
      questions: newActivity.questions,
      timeLimit: newActivity.timeLimit,
      shuffleQuestions: newActivity.shuffleQuestions,
      questionsToShow: newActivity.questionsToShow,
      showCorrectAnswers: newActivity.showCorrectAnswers,
      attachments: newActivity.attachments
    };

    setModules(modules.map(mod => 
      mod.id === selectedSessionForActivity.moduleId
        ? {
            ...mod,
            sessions: mod.sessions.map(sess =>
              sess.id === selectedSessionForActivity.sessionId
                ? { ...sess, activities: [...sess.activities, activity] }
                : sess
            )
          }
        : mod
    ));

    setShowAddActivityModal(false);
    setActivityWizardStep(1);
    setSelectedSessionForActivity(null);
    toast.success('Actividad agregada exitosamente');
  };

  const removeModule = (moduleId: string) => {
    if (confirm('¿Estás seguro de eliminar este módulo?')) {
      setModules(modules.filter(mod => mod.id !== moduleId));
      toast.success('Módulo eliminado');
    }
  };

  const removeSession = (moduleId: string, sessionId: string) => {
    if (confirm('¿Estás seguro de eliminar esta sesión?')) {
      setModules(modules.map(mod =>
        mod.id === moduleId
          ? { ...mod, sessions: mod.sessions.filter(s => s.id !== sessionId) }
          : mod
      ));
      toast.success('Sesión eliminada');
    }
  };

  const removeActivity = (moduleId: string, sessionId: string, activityId: string) => {
    if (confirm('¿Estás seguro de eliminar esta actividad?')) {
      setModules(modules.map(mod =>
        mod.id === moduleId
          ? {
              ...mod,
              sessions: mod.sessions.map(sess =>
                sess.id === sessionId
                  ? { ...sess, activities: sess.activities.filter(a => a.id !== activityId) }
                  : sess
              )
            }
          : mod
      ));
      toast.success('Actividad eliminada');
    }
  };

  const handleSaveWeighting = () => {
    if (!isValidTotal) {
      toast.error('La suma de pesos de los módulos debe ser 100%');
      return;
    }
    
    toast.success('Sistema de ponderación guardado exitosamente');
    onSave?.(modules);
  };

  const distributeWeightEvenly = () => {
    const equalWeight = 100 / modules.length;
    setModules(modules.map(mod => ({ ...mod, weight: parseFloat(equalWeight.toFixed(2)) })));
    toast.success('Pesos distribuidos equitativamente');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Sistema de ponderación de módulos</h2>
            <p className="text-lg opacity-90">{courseName}</p>
          </div>
          <div className="text-right">
            <div className={`text-5xl font-bold ${isValidTotal ? 'text-white' : 'text-red-300'}`}>
              {totalModulesWeight.toFixed(1)}%
            </div>
            <div className="text-sm opacity-90">Total asignado</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-4 bg-white/20 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${
              isValidTotal ? 'bg-green-400' : 
              totalModulesWeight > 100 ? 'bg-red-400' : 
              'bg-amber-400'
            }`}
            style={{ width: `${Math.min(totalModulesWeight, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2 text-sm">
          <span>0%</span>
          <span className="font-bold">
            {isValidTotal ? '✓ Configuración válida' : 
             totalModulesWeight > 100 ? '⚠ Excede 100%' : 
             '⚠ Falta asignar peso'}
          </span>
          <span>100%</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 relative z-10">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addModule();
          }}
          className="px-6 py-3 bg-[#0B95BA] text-white rounded-xl font-medium hover:bg-[#087A98] transition-colors flex items-center gap-2 cursor-pointer"
          style={{ pointerEvents: 'auto' }}
        >
          <Plus className="w-5 h-5" />
          Agregar módulo
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            distributeWeightEvenly();
          }}
          className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors flex items-center gap-2 cursor-pointer"
          style={{ pointerEvents: 'auto' }}
        >
          <Calculator className="w-5 h-5" />
          Distribuir Equitativamente
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSaveWeighting();
          }}
          disabled={!isValidTotal}
          className={`px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 ml-auto ${
            isValidTotal 
              ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          style={{ pointerEvents: 'auto' }}
        >
          <Save className="w-5 h-5" />
          Guardar configuración
        </button>
      </div>

      {/* Info Panel */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Info className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-blue-900 mb-2">Cómo funciona el sistema de ponderación</h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>• <strong>Peso del Módulo:</strong> Cada módulo tiene un % del total del curso (la suma debe ser 100%)</p>
              <p>• <strong>Distribución de Actividades:</strong> Las actividades dentro de cada módulo se distribuyen automáticamente de forma equitativa</p>
              <p>• <strong>Cálculo Automático:</strong> Si un módulo vale 40% y tiene 2 actividades, cada actividad vale 20% de la nota final</p>
              <p>• <strong>Peso Final:</strong> El sistema calcula automáticamente cuánto vale cada actividad en la nota total del curso</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {modules.map((module, moduleIndex) => {
          const activitiesTotal = calculateModuleActivitiesTotal(module);
          
          return (
            <div key={module.id} className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
              {/* Module Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      {module.isExpanded ? '−' : '+'}
                    </button>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-gray-900">{module.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {module.sessions.length} sesiones • {activitiesTotal} actividades
                      </p>
                    </div>
                  </div>

                  {/* Weight Control */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white rounded-xl p-3 border-2 border-[#0B95BA]">
                      <div className="text-right">
                        <label className="block text-xs text-gray-600 mb-1 font-medium">
                          Peso del Módulo
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.1"
                            value={module.weight}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              if (!isNaN(value) && value >= 0 && value <= 100) {
                                handleModuleWeightChange(module.id, value);
                              }
                            }}
                            className="w-24 px-3 py-2 border-2 border-gray-300 rounded-lg font-bold text-center text-2xl text-[#0B95BA] focus:border-[#0B95BA] focus:outline-none"
                          />
                          <span className="font-bold text-2xl text-gray-700">%</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeModule(module.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                      title="Eliminar módulo"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Module Content */}
              {module.isExpanded && (
                <div className="p-6">
                  {/* Add Session Button */}
                  <button
                    onClick={() => handleAddSession(module.id)}
                    className="mb-4 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar sesión
                  </button>

                  {module.sessions.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Info className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No hay sesiones en este módulo</p>
                      <p className="text-sm mt-1">Agrega sesiones para poder asignar actividades</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {module.sessions.map((session) => {
                        const sessionWeight = calculateSessionWeight(module, session);
                        
                        return (
                          <div key={session.id} className="border-2 border-gray-200 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex-1">
                                <h4 className="font-bold text-lg text-gray-900">{session.name}</h4>
                                {session.hasLiveClass && session.liveClass && (
                                  <div className="mt-2 flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1.5 text-purple-700 bg-purple-50 px-3 py-1.5 rounded-lg">
                                      <Video className="w-4 h-4" />
                                      <span className="font-medium">Clase en vivo</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-gray-600">
                                      <Calendar className="w-4 h-4" />
                                      <span>{new Date(session.liveClass.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-gray-600">
                                      <Clock className="w-4 h-4" />
                                      <span>{session.liveClass.time}</span>
                                    </div>
                                    <div className="text-gray-500">
                                      ({session.liveClass.duration} min)
                                    </div>
                                    {session.liveClass.teacherName && (
                                      <div className="flex items-center gap-1.5 text-gray-600">
                                        <Users className="w-4 h-4" />
                                        <span>{session.liveClass.teacherName}</span>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <div className="text-lg font-bold text-purple-600">
                                    {sessionWeight.toFixed(1)}%
                                  </div>
                                  <div className="text-xs text-gray-600">del módulo</div>
                                </div>
                                <button
                                  onClick={() => removeSession(module.id, session.id)}
                                  className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                                  title="Eliminar sesión"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Add Activity Button */}
                            <button
                              onClick={() => handleAddActivity(module.id, session.id)}
                              className="mb-3 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                              <Plus className="w-3 h-3" />
                              Agregar actividad
                            </button>

                            {session.activities.length === 0 ? (
                              <div className="text-center py-4 text-gray-400 text-sm">
                                No hay actividades en esta sesión
                              </div>
                            ) : (
                              <div className="overflow-x-auto">
                                <table className="w-full">
                                  <thead className="bg-gray-50">
                                    <tr>
                                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Actividad</th>
                                      <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Tipo</th>
                                      <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Peso en Sesión</th>
                                      <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Peso en Módulo</th>
                                      <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Peso Final</th>
                                      <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Acciones</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-200">
                                    {session.activities.map((activity) => {
                                      const activityModuleWeight = calculateActivityActualWeight(module, session, activity);
                                      const activityFinalWeight = calculateActivityFinalWeight(module, session, activity);
                                      
                                      return (
                                        <tr key={activity.id} className="hover:bg-gray-50">
                                          <td className="px-4 py-3">
                                            <p className="font-medium text-gray-900">{activity.name}</p>
                                          </td>
                                          <td className="px-4 py-3 text-center">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getActivityTypeColor(activity.type)}`}>
                                              {getActivityTypeLabel(activity.type)}
                                            </span>
                                          </td>
                                          <td className="px-4 py-3 text-center">
                                            <span className="font-bold text-gray-700">{activity.weight}%</span>
                                          </td>
                                          <td className="px-4 py-3 text-center">
                                            <span className="font-bold text-purple-600">{activityModuleWeight.toFixed(2)}%</span>
                                          </td>
                                          <td className="px-4 py-3 text-center">
                                            <div className="inline-flex flex-col items-center bg-[#0B95BA]/10 px-3 py-2 rounded-lg">
                                              <span className="font-bold text-[#0B95BA] text-lg">{activityFinalWeight.toFixed(2)}%</span>
                                              <span className="text-xs text-gray-600">del curso</span>
                                            </div>
                                          </td>
                                          <td className="px-4 py-3 text-center">
                                            <button
                                              onClick={() => removeActivity(module.id, session.id, activity.id)}
                                              className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 inline-flex"
                                              title="Eliminar actividad"
                                            >
                                              <Trash2 className="w-4 h-4" />
                                            </button>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}</div>

      {/* Summary Panel */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h3 className="font-bold text-xl text-gray-900 mb-6">Resumen de ponderación</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Módulos */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-3xl font-bold text-gray-900">{modules.length}</p>
                <p className="text-sm text-gray-600 mt-1">Total módulos</p>
              </div>
            </div>
          </div>

          {/* Sesiones */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Video className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-3xl font-bold text-gray-900">
                  {modules.reduce((sum, mod) => sum + mod.sessions.length, 0)}
                </p>
                <p className="text-sm text-gray-600 mt-1">Sesiones</p>
              </div>
            </div>
          </div>

          {/* Actividades */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-3xl font-bold text-gray-900">
                  {modules.reduce((sum, mod) => sum + calculateModuleActivitiesTotal(mod), 0)}
                </p>
                <p className="text-sm text-gray-600 mt-1">Actividades</p>
              </div>
            </div>
          </div>

          {/* Ponderación Total */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 ${isValidTotal ? 'bg-green-500' : 'bg-amber-500'} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                <Calculator className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-3xl font-bold ${isValidTotal ? 'text-gray-900' : 'text-red-600'}`}>
                  {totalModulesWeight.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600 mt-1">Ponderación</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje solo cuando falta porcentaje */}
        {totalModulesWeight < 100 && (
          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-red-600">
              Suma total de pesos: <span className="text-lg font-bold">{totalModulesWeight.toFixed(1)}%</span>
            </p>
          </div>
        )}
      </div>

      {/* Add Module Modal */}
      {showAddModuleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="font-bold text-xl mb-4">Agregar nuevo módulo</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Módulo
                </label>
                <input
                  type="text"
                  value={newModuleName}
                  onChange={(e) => setNewModuleName(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#0B95BA] focus:outline-none"
                  placeholder="Ej: Módulo 1: Fundamentos"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peso del Módulo (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={newModuleWeight}
                  onChange={(e) => setNewModuleWeight(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#0B95BA] focus:outline-none"
                  placeholder="Ej: 30"
                />
              </div>
              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => setShowAddModuleModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateModule}
                  className="px-4 py-2 bg-[#0B95BA] text-white rounded-lg font-medium hover:bg-[#087A98] transition-colors"
                >
                  Crear módulo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Session Modal */}
      {showAddSessionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-xl mb-4">Agregar nueva sesión</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la Sesión <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newSessionName}
                  onChange={(e) => setNewSessionName(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#0B95BA] focus:outline-none"
                  placeholder="Ej: Sesión 1: Introducción"
                />
              </div>

              {/* Clase en vivo */}
              <div className="border-t pt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newSessionHasLiveClass}
                    onChange={(e) => setNewSessionHasLiveClass(e.target.checked)}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <div className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-gray-700">Incluir clase en vivo</span>
                  </div>
                </label>
              </div>

              {newSessionHasLiveClass && (
                <div className="p-4 bg-purple-50 rounded-xl border-2 border-purple-200 space-y-4">
                  <h4 className="font-bold text-purple-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Configuración de clase en vivo
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={newSessionLiveClassDate}
                        onChange={(e) => setNewSessionLiveClassDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hora <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        value={newSessionLiveClassTime}
                        onChange={(e) => setNewSessionLiveClassTime(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duración (minutos)
                    </label>
                    <input
                      type="number"
                      min="30"
                      step="15"
                      value={newSessionLiveClassDuration}
                      onChange={(e) => setNewSessionLiveClassDuration(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="120"
                    />
                    <p className="text-xs text-gray-500 mt-1">Por defecto: 120 minutos (2 horas)</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Docente asignado <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={newSessionTeacherId}
                      onChange={(e) => setNewSessionTeacherId(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Seleccione un profesor</option>
                      {availableTeachers.map(teacher => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.name} - {teacher.specialty}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link de clase (opcional)
                    </label>
                    <input
                      type="url"
                      value={newSessionMeetLink}
                      onChange={(e) => setNewSessionMeetLink(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="https://meet.google.com/xxx-xxxx-xxx"
                    />
                    <p className="text-xs text-gray-500 mt-1">Se generará automáticamente si se deja en blanco</p>
                  </div>

                  <div className="p-3 bg-purple-100 rounded-lg">
                    <p className="text-xs text-purple-800 flex items-center gap-2">
                      <Info className="w-4 h-4 flex-shrink-0" />
                      <span>
                        {newSessionLiveClassDate && newSessionLiveClassTime ? (
                          <>La clase en vivo se realizará el <strong>{new Date(newSessionLiveClassDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong> a las <strong>{newSessionLiveClassTime}</strong></>
                        ) : (
                          'Configure la fecha y hora de la clase en vivo'
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 justify-end mt-6 pt-4 border-t">
                <button
                  onClick={() => setShowAddSessionModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateSession}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Crear sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Activity Wizard Modal */}
      {showAddActivityModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-8 max-h-[90vh] overflow-y-auto">
            {/* Header con indicador de pasos */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Nueva actividad</h3>
              
              {/* Stepper */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center flex-1">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${activityWizardStep >= 1 ? 'bg-[#0B95BA] text-white' : 'bg-gray-200 text-gray-600'}`}>
                    1
                  </div>
                  <div className={`flex-1 h-1 mx-2 ${activityWizardStep > 1 ? 'bg-[#0B95BA]' : 'bg-gray-200'}`}></div>
                </div>
                
                {(['quiz', 'reading-control', 'survey'].includes(newActivity.type || '')) && (
                  <>
                    <div className="flex items-center flex-1">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${activityWizardStep >= 2 ? 'bg-[#0B95BA] text-white' : 'bg-gray-200 text-gray-600'}`}>
                        2
                      </div>
                      <div className={`flex-1 h-1 mx-2 ${activityWizardStep > 2 ? 'bg-[#0B95BA]' : 'bg-gray-200'}`}></div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${activityWizardStep >= 3 ? 'bg-[#0B95BA] text-white' : 'bg-gray-200 text-gray-600'}`}>
                        3
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {/* Títulos de los pasos */}
              <div className="flex items-center justify-between text-sm">
                <span className={activityWizardStep === 1 ? 'font-bold text-[#0B95BA]' : 'text-gray-600'}>
                  Información básica
                </span>
                {(['quiz', 'reading-control', 'survey'].includes(newActivity.type || '')) && (
                  <>
                    <span className={activityWizardStep === 2 ? 'font-bold text-[#0B95BA]' : 'text-gray-600'}>
                      Configurar preguntas
                    </span>
                    <span className={activityWizardStep === 3 ? 'font-bold text-[#0B95BA]' : 'text-gray-600'}>
                      Confirmación
                    </span>
                  </>
                )}
              </div>
            </div>
            
            {/* PASO 1: Información básica */}
            {activityWizardStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de actividad <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newActivity.type}
                    onChange={(e) => {
                      const newType = e.target.value as ActivityType;
                      setNewActivity({ 
                        ...newActivity, 
                        type: newType, 
                        questions: [],
                        graded: newType === 'survey' ? false : newActivity.graded
                      });
                    }}
                    className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
                  >
                    <option value="quiz">Cuestionario (Quiz)</option>
                    <option value="assignment">Tarea (Informe/Trabajo)</option>
                    <option value="reading">Lectura</option>
                    <option value="reading-control">Control de lectura</option>
                    <option value="forum">Foro de discusión</option>
                    <option value="case-study">Caso práctico</option>
                    <option value="survey">Encuesta</option>
                    <option value="exam">Examen</option>
                  </select>
                </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newActivity.name}
                  onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                  placeholder="Ej: Quiz sobre Marco Legal del Arbitraje"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción / Instrucciones
                </label>
                <textarea
                  value={newActivity.description || ''}
                  onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                  placeholder="Instrucciones para el estudiante..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de publicación <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={newActivity.publishDate}
                    onChange={(e) => setNewActivity({ ...newActivity, publishDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Fecha en que la actividad estará disponible.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de fin (opcional)
                  </label>
                  <input
                    type="date"
                    value={newActivity.dueDate}
                    onChange={(e) => setNewActivity({ ...newActivity, dueDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Dejar vacío si no tiene fecha límite.
                  </p>
                </div>
              </div>

              {newActivity.type !== 'survey' && (
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newActivity.graded}
                      onChange={(e) => setNewActivity({ ...newActivity, graded: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium text-gray-700">¿Es calificable?</span>
                  </label>
                </div>
              )}
              
              {newActivity.type === 'survey' && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-xs text-blue-800">
                    Las encuestas no son calificables. Se usan para recopilar opiniones y retroalimentación.
                  </p>
                </div>
              )}

              {newActivity.graded && (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ponderación (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={newActivity.weight || ''}
                      onChange={(e) => setNewActivity({ ...newActivity, weight: parseFloat(e.target.value) || 0 })}
                      placeholder="100"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Puntaje mínimo
                    </label>
                    <input
                      type="number"
                      value={newActivity.passingScore || ''}
                      onChange={(e) => setNewActivity({ ...newActivity, passingScore: parseInt(e.target.value) })}
                      placeholder="14"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Intentos permitidos
                    </label>
                    <input
                      type="number"
                      value={newActivity.attempts || ''}
                      onChange={(e) => setNewActivity({ ...newActivity, attempts: parseInt(e.target.value) })}
                      placeholder="2"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
                    />
                  </div>
                </div>
              )}

              {/* Group Work Configuration */}
              {(['assignment', 'reading', 'forum', 'case-study'].includes(newActivity.type || '')) && (
                <div className="p-4 bg-amber-50 rounded-xl border-2 border-amber-200">
                  <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Configuración de trabajo en grupo
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="isGroupWork"
                        checked={newActivity.isGroupWork || false}
                        onChange={(e) => setNewActivity({ 
                          ...newActivity, 
                          isGroupWork: e.target.checked,
                          allowChat: e.target.checked
                        })}
                        className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
                      />
                      <label htmlFor="isGroupWork" className="text-sm font-medium text-gray-700 cursor-pointer">
                        Esta actividad se realiza en grupo
                      </label>
                    </div>

                    {newActivity.isGroupWork && (
                      <div className="ml-8 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Total de estudiantes
                            </label>
                            <input
                              type="number"
                              value={newActivity.totalStudents || ''}
                              onChange={(e) => setNewActivity({ ...newActivity, totalStudents: parseInt(e.target.value) || 0 })}
                              min="1"
                              placeholder="Ej: 30"
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Tamaño de grupo (sugerido)
                            </label>
                            <input
                              type="number"
                              value={newActivity.suggestedGroupSize || ''}
                              onChange={(e) => setNewActivity({ ...newActivity, suggestedGroupSize: parseInt(e.target.value) || 0 })}
                              min="2"
                              placeholder="Ej: 5"
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                            />
                          </div>
                        </div>

                        {newActivity.totalStudents && newActivity.suggestedGroupSize && newActivity.totalStudents > 0 && newActivity.suggestedGroupSize > 0 && (
                          <div className="p-3 bg-amber-100 rounded-lg">
                            <p className="text-xs text-amber-800 flex items-center gap-2">
                              <Info className="w-4 h-4 flex-shrink-0" />
                              <span><strong>Sugerencia:</strong> Con {newActivity.totalStudents} estudiantes y grupos de {newActivity.suggestedGroupSize} personas, se formarían aproximadamente {Math.ceil(newActivity.totalStudents / newActivity.suggestedGroupSize)} grupos.</span>
                            </p>
                          </div>
                        )}

                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id="allowChat"
                            checked={newActivity.allowChat !== false}
                            onChange={(e) => setNewActivity({ ...newActivity, allowChat: e.target.checked })}
                            className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
                          />
                          <label htmlFor="allowChat" className="text-sm font-medium text-gray-700 cursor-pointer">
                            Habilitar chat interno para el grupo
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Configuración adicional de Quiz/Control de lectura/Encuesta */}
              {(['quiz', 'reading-control', 'survey'].includes(newActivity.type || '')) && (
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h4 className="font-bold text-gray-900 mb-4">
                    Configuración de {newActivity.type === 'quiz' ? 'evaluación' : newActivity.type === 'reading-control' ? 'control de lectura' : 'encuesta'}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tiempo límite (minutos)
                      </label>
                      <input
                        type="number"
                        value={newActivity.timeLimit || ''}
                        onChange={(e) => setNewActivity({ ...newActivity, timeLimit: parseInt(e.target.value) || undefined })}
                        placeholder="60"
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
                      />
                      <p className="text-xs text-gray-500 mt-1">Dejar vacío para sin límite.</p>
                    </div>
                    
                    <div className="flex items-center">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newActivity.shuffleQuestions || false}
                          onChange={(e) => setNewActivity({ 
                            ...newActivity, 
                            shuffleQuestions: e.target.checked,
                            questionsToShow: e.target.checked ? (newActivity.questionsToShow || 1) : undefined
                          })}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-700">Aleatorizar preguntas</span>
                      </label>
                    </div>

                    {newActivity.shuffleQuestions && (
                      <div className="flex items-center gap-3 pl-6">
                        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                          Mostrar:
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={newActivity.questionsToShow || 1}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 1;
                            setNewActivity({ 
                              ...newActivity, 
                              questionsToShow: Math.max(1, value)
                            });
                          }}
                          className="w-16 px-2 py-1 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-[#0B95BA] focus:border-[#0B95BA]"
                        />
                        <span className="text-sm text-gray-600">
                          pregunta(s) aleatorias
                        </span>
                      </div>
                    )}

                    {newActivity.graded && (
                      <div className="flex items-center">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newActivity.showCorrectAnswers !== false}
                            onChange={(e) => setNewActivity({ ...newActivity, showCorrectAnswers: e.target.checked })}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-gray-700">Mostrar respuestas correctas</span>
                        </label>
                      </div>
                    )}
                  </div>
                  
                  {newActivity.shuffleQuestions && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl mt-4">
                      <p className="text-xs text-blue-800 flex items-center gap-2">
                        <Info className="w-4 h-4 flex-shrink-0" />
                        <span>En el siguiente paso deberá configurar al menos {newActivity.questionsToShow || 1} pregunta(s) para crear el pool de preguntas. Cada estudiante recibirá {newActivity.questionsToShow || 1} pregunta(s) aleatoria(s) de este pool.</span>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

            {/* PASO 2: Configurar preguntas (quiz/reading-control/survey) */}
            {activityWizardStep === 2 && (['quiz', 'reading-control', 'survey'].includes(newActivity.type || '')) && (
              <QuizQuestionBuilder 
                questions={newActivity.questions || []}
                onQuestionsChange={(questions) => setNewActivity({ ...newActivity, questions })}
                activityType={newActivity.type}
                shuffleQuestions={newActivity.shuffleQuestions}
                questionsToShow={newActivity.questionsToShow}
              />
            )}

            {/* PASO 3: Confirmación (quiz/reading-control/survey) */}
            {activityWizardStep === 3 && (['quiz', 'reading-control', 'survey'].includes(newActivity.type || '')) && (
              <div className="space-y-6">
                <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-green-900 mb-2">Actividad lista para crear</h4>
                      <p className="text-sm text-green-800 mb-4">
                        Revise el resumen de la actividad antes de crearla. Podrá editarla posteriormente desde la vista del programa.
                      </p>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex gap-2">
                          <span className="font-medium text-green-900">Tipo:</span>
                          <span className="text-green-800">
                            {newActivity.type === 'quiz' && 'Cuestionario (Quiz)'}
                            {newActivity.type === 'reading-control' && 'Control de Lectura'}
                            {newActivity.type === 'survey' && 'Encuesta'}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-medium text-green-900">Título:</span>
                          <span className="text-green-800">{newActivity.name}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-medium text-green-900">Fecha de publicación:</span>
                          <span className="text-green-800">{newActivity.publishDate ? new Date(newActivity.publishDate).toLocaleDateString('es-ES') : 'No definida'}</span>
                        </div>
                        {newActivity.dueDate && (
                          <div className="flex gap-2">
                            <span className="font-medium text-green-900">Fecha de fin:</span>
                            <span className="text-green-800">{new Date(newActivity.dueDate).toLocaleDateString('es-ES')}</span>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <span className="font-medium text-green-900">Pool de preguntas:</span>
                          <span className="text-green-800">{newActivity.questions?.length || 0} preguntas configuradas</span>
                        </div>
                        {newActivity.shuffleQuestions && (
                          <div className="flex gap-2">
                            <span className="font-medium text-green-900">Aleatorización:</span>
                            <span className="text-green-800 flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5" />
                              Cada estudiante recibirá {newActivity.questionsToShow || newActivity.questions?.length || 0} pregunta(s) aleatoria(s) del pool
                            </span>
                          </div>
                        )}
                        {!newActivity.shuffleQuestions && (
                          <div className="flex gap-2">
                            <span className="font-medium text-green-900">Preguntas a mostrar:</span>
                            <span className="text-green-800">Todas las preguntas ({newActivity.questions?.length || 0}) en orden</span>
                          </div>
                        )}
                        {newActivity.type !== 'survey' && (
                          <div className="flex gap-2">
                            <span className="font-medium text-green-900">Puntaje total:</span>
                            <span className="text-green-800">
                              {newActivity.shuffleQuestions 
                                ? `${Math.round((newActivity.questions?.reduce((sum, q) => sum + q.points, 0) || 0) / (newActivity.questions?.length || 1) * (newActivity.questionsToShow || 1))} puntos (promedio basado en preguntas aleatorias)`
                                : `${newActivity.questions?.reduce((sum, q) => sum + q.points, 0) || 0} puntos`
                              }
                            </span>
                          </div>
                        )}
                        {newActivity.type === 'survey' && (
                          <div className="flex gap-2">
                            <span className="font-medium text-green-900">Tipo de evaluación:</span>
                            <span className="text-green-800">No calificable (retroalimentación)</span>
                          </div>
                        )}
                        {newActivity.timeLimit && (
                          <div className="flex gap-2">
                            <span className="font-medium text-green-900">Tiempo límite:</span>
                            <span className="text-green-800">{newActivity.timeLimit} minutos</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Botones de navegación */}
            <div className="flex gap-3 mt-6">
              {activityWizardStep > 1 && (
                <button
                  onClick={() => setActivityWizardStep(activityWizardStep - 1)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-xl transition-colors"
                >
                  Anterior
                </button>
              )}
              
              <button
                onClick={() => {
                  // Validaciones según el paso
                  if (activityWizardStep === 1) {
                    if (!newActivity.name) {
                      toast.error('El título es obligatorio.');
                      return;
                    }
                    if (!newActivity.publishDate) {
                      toast.error('La fecha de publicación es obligatoria.');
                      return;
                    }
                    
                    // Si es quiz, reading-control o survey, ir a paso 2
                    if (['quiz', 'reading-control', 'survey'].includes(newActivity.type || '')) {
                      setActivityWizardStep(2);
                    } else {
                      // Otros tipos: crear directamente
                      handleCreateActivity();
                    }
                  } else if (activityWizardStep === 2) {
                    // Validar que haya al menos una pregunta
                    if (!newActivity.questions || newActivity.questions.length === 0) {
                      toast.error('Debe agregar al menos una pregunta.');
                      return;
                    }
                    
                    // Validar configuración de aleatorización
                    if (newActivity.shuffleQuestions) {
                      const questionsToShow = newActivity.questionsToShow || newActivity.questions.length;
                      if (questionsToShow > newActivity.questions.length) {
                        toast.error(`Debe configurar al menos ${questionsToShow} preguntas en el pool para mostrar ${questionsToShow} pregunta(s) aleatoria(s). Actualmente tiene ${newActivity.questions.length} pregunta(s).`);
                        return;
                      }
                      if (questionsToShow < 1) {
                        toast.error('Debe mostrar al menos 1 pregunta.');
                        return;
                      }
                    }
                    
                    setActivityWizardStep(3);
                  } else if (activityWizardStep === 3) {
                    // Crear la actividad
                    handleCreateActivity();
                  }
                }}
                className="flex-1 px-6 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-xl transition-colors"
              >
                {activityWizardStep === 1 && !['quiz', 'reading-control', 'survey'].includes(newActivity.type || '') && 'Crear actividad'}
                {activityWizardStep === 1 && ['quiz', 'reading-control', 'survey'].includes(newActivity.type || '') && 'Siguiente: Configurar preguntas'}
                {activityWizardStep === 2 && 'Siguiente: Revisión'}
                {activityWizardStep === 3 && 'Crear actividad'}
              </button>
              
              <button
                onClick={() => {
                  setShowAddActivityModal(false);
                  setActivityWizardStep(1);
                }}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-xl transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
