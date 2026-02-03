import { useState } from 'react';
import {
  Search,
  ChevronDown,
  ChevronRight,
  User,
  BookOpen,
  Award,
  CheckCircle,
  X,
  Save,
  FileText,
  Edit3,
  Clock,
  Users,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';

type ActivityType = 'quiz' | 'evaluation' | 'assignment';
type GradeStatus = 'graded' | 'pending' | 'submitted';
type QuestionType = 'open' | 'multiple-choice' | 'true-false' | 'multiple-select' | 'essay';

interface QuizAnswer {
  questionNumber: number;
  question: string;
  questionType: QuestionType;
  options?: string[]; // Para preguntas de opción múltiple
  studentAnswer: string | string[]; // String para la mayoría, array para multiple-select
  correctAnswer: string | string[];
  isCorrect?: boolean;
  points: number;
  maxPoints: number;
  feedback?: string; // Comentario del profesor
}

interface StudentSubmission {
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentCode: string;
  score?: number;
  status: GradeStatus;
  submittedDate?: string;
  quizAnswers?: QuizAnswer[];
}

interface Activity {
  id: string;
  name: string;
  type: ActivityType;
  maxScore: number;
  weight: number;
  moduleId: string;
  moduleName: string;
  submissions: StudentSubmission[];
}

interface Module {
  id: string;
  name: string;
  weight: number;
  activities: Activity[];
}

interface Course {
  courseId: string;
  courseName: string;
  courseCode: string;
  modules: Module[];
}

interface GradesManagementProps {
  onBack?: () => void;
}

export function GradesManagement({ onBack }: GradesManagementProps = {}) {
  const [searchCourse, setSearchCourse] = useState('');
  const [searchActivity, setSearchActivity] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [gradingStudent, setGradingStudent] = useState<StudentSubmission | null>(null);
  const [gradeInput, setGradeInput] = useState('');

  // Mock data - cursos con actividades y submissions de estudiantes
  const courses: Course[] = [
    {
      courseId: 'DACI-2024-02',
      courseName: 'Diplomado en Arbitraje Comercial Internacional',
      courseCode: 'DACI-2024-02',
      modules: [
        {
          id: 'MOD-001',
          name: 'Módulo 1: Introducción al arbitraje',
          weight: 20,
          activities: [
            {
              id: 'ACT-001',
              name: 'Cuestionario: Conceptos básicos',
              type: 'quiz',
              maxScore: 20,
              weight: 30,
              moduleId: 'MOD-001',
              moduleName: 'Módulo 1: Introducción al arbitraje',
              submissions: [
                {
                  studentId: 'EST-001',
                  studentName: 'María González Pérez',
                  studentEmail: 'maria.gonzalez@email.com',
                  studentCode: 'EST-2024-001',
                  score: 18,
                  status: 'graded',
                  submittedDate: '15/10/2024',
                  quizAnswers: [
                    {
                      questionNumber: 1,
                      question: '¿Qué es el arbitraje?',
                      questionType: 'open',
                      studentAnswer: 'Es un método alternativo de resolución de conflictos donde un tercero neutral toma una decisión vinculante.',
                      correctAnswer: 'Es un método alternativo de resolución de conflictos donde un tercero neutral toma una decisión vinculante.',
                      isCorrect: true,
                      points: 5,
                      maxPoints: 5
                    },
                    {
                      questionNumber: 2,
                      question: '¿Cuáles son las características principales del arbitraje comercial?',
                      questionType: 'multiple-choice',
                      options: ['Voluntariedad, confidencialidad y flexibilidad procesal.', 'Voluntariedad, confidencialidad, flexibilidad procesal y especialización.', 'Es rápido y económico.'],
                      studentAnswer: 'Voluntariedad, confidencialidad y flexibilidad procesal.',
                      correctAnswer: 'Voluntariedad, confidencialidad, flexibilidad procesal y especialización.',
                      isCorrect: false,
                      points: 3,
                      maxPoints: 5
                    },
                    {
                      questionNumber: 3,
                      question: '¿Qué diferencia al arbitraje de la mediación?',
                      questionType: 'open',
                      studentAnswer: 'En el arbitraje el árbitro toma una decisión vinculante, mientras que en la mediación el mediador solo facilita el acuerdo.',
                      correctAnswer: 'En el arbitraje el árbitro toma una decisión vinculante, mientras que en la mediación el mediador solo facilita el acuerdo.',
                      isCorrect: true,
                      points: 5,
                      maxPoints: 5
                    },
                    {
                      questionNumber: 4,
                      question: '¿Qué es una cláusula arbitral?',
                      questionType: 'open',
                      studentAnswer: 'Es un acuerdo mediante el cual las partes establecen que las controversias serán resueltas mediante arbitraje.',
                      correctAnswer: 'Es un acuerdo mediante el cual las partes establecen que las controversias futuras serán resueltas mediante arbitraje.',
                      isCorrect: true,
                      points: 5,
                      maxPoints: 5
                    }
                  ]
                },
                {
                  studentId: 'EST-002',
                  studentName: 'Carlos Mendoza Silva',
                  studentEmail: 'carlos.mendoza@email.com',
                  studentCode: 'EST-2024-002',
                  score: 15,
                  status: 'graded',
                  submittedDate: '16/10/2024'
                },
                {
                  studentId: 'EST-003',
                  studentName: 'Ana Patricia Rojas',
                  studentEmail: 'ana.rojas@email.com',
                  studentCode: 'EST-2024-003',
                  status: 'submitted',
                  submittedDate: '14/10/2024',
                  quizAnswers: [
                    {
                      questionNumber: 1,
                      question: '¿Qué es el arbitraje?',
                      questionType: 'open',
                      studentAnswer: 'Es un proceso donde las partes acuerdan que un tercero resuelva su disputa.',
                      correctAnswer: 'Es un método alternativo de resolución de conflictos donde un tercero neutral toma una decisión vinculante.',
                      points: 0,
                      maxPoints: 5
                    },
                    {
                      questionNumber: 2,
                      question: '¿Cuáles son las características principales del arbitraje comercial?',
                      questionType: 'multiple-choice',
                      options: ['Voluntariedad, confidencialidad y flexibilidad procesal.', 'Voluntariedad, confidencialidad, flexibilidad procesal y especialización.', 'Es rápido y económico.'],
                      studentAnswer: 'Es rápido y económico.',
                      correctAnswer: 'Voluntariedad, confidencialidad, flexibilidad procesal y especialización.',
                      points: 0,
                      maxPoints: 5
                    },
                    {
                      questionNumber: 3,
                      question: '¿Qué diferencia al arbitraje de la mediación?',
                      questionType: 'open',
                      studentAnswer: 'El arbitraje es obligatorio y la mediación es voluntaria.',
                      correctAnswer: 'En el arbitraje el árbitro toma una decisión vinculante, mientras que en la mediación el mediador solo facilita el acuerdo.',
                      points: 0,
                      maxPoints: 5
                    },
                    {
                      questionNumber: 4,
                      question: '¿Qué es una cláusula arbitral?',
                      questionType: 'open',
                      studentAnswer: 'Es una cláusula que establece el arbitraje como método de solución.',
                      correctAnswer: 'Es un acuerdo mediante el cual las partes establecen que las controversias futuras serán resueltas mediante arbitraje.',
                      points: 0,
                      maxPoints: 5
                    }
                  ]
                },
                {
                  studentId: 'EST-004',
                  studentName: 'Roberto Fernández López',
                  studentEmail: 'roberto.fernandez@email.com',
                  studentCode: 'EST-2024-004',
                  status: 'submitted',
                  submittedDate: '17/10/2024',
                  quizAnswers: [
                    {
                      questionNumber: 1,
                      question: '¿Qué es el arbitraje?',
                      questionType: 'open',
                      studentAnswer: 'Es un método alternativo de resolución de conflictos donde un tercero neutral toma una decisión vinculante.',
                      correctAnswer: 'Es un método alternativo de resolución de conflictos donde un tercero neutral toma una decisión vinculante.',
                      points: 0,
                      maxPoints: 5
                    },
                    {
                      questionNumber: 2,
                      question: '¿Cuáles son las características principales del arbitraje comercial?',
                      questionType: 'multiple-choice',
                      options: ['Voluntariedad, confidencialidad y flexibilidad procesal.', 'Voluntariedad, confidencialidad, flexibilidad procesal y especialización.', 'Es rápido y económico.'],
                      studentAnswer: 'Voluntariedad, confidencialidad, flexibilidad procesal y especialización.',
                      correctAnswer: 'Voluntariedad, confidencialidad, flexibilidad procesal y especialización.',
                      points: 0,
                      maxPoints: 5
                    },
                    {
                      questionNumber: 3,
                      question: '¿Qué diferencia al arbitraje de la mediación?',
                      questionType: 'open',
                      studentAnswer: 'En el arbitraje el árbitro toma una decisión vinculante, mientras que en la mediación el mediador solo facilita el acuerdo.',
                      correctAnswer: 'En el arbitraje el árbitro toma una decisión vinculante, mientras que en la mediación el mediador solo facilita el acuerdo.',
                      points: 0,
                      maxPoints: 5
                    },
                    {
                      questionNumber: 4,
                      question: '¿Qué es una cláusula arbitral?',
                      questionType: 'open',
                      studentAnswer: 'Es un acuerdo mediante el cual las partes establecen que las controversias futuras serán resueltas mediante arbitraje.',
                      correctAnswer: 'Es un acuerdo mediante el cual las partes establecen que las controversias futuras serán resueltas mediante arbitraje.',
                      points: 0,
                      maxPoints: 5
                    }
                  ]
                },
                {
                  studentId: 'EST-005',
                  studentName: 'Laura Martínez Castro',
                  studentEmail: 'laura.martinez@email.com',
                  studentCode: 'EST-2024-005',
                  status: 'pending'
                }
              ]
            },
            {
              id: 'ACT-002',
              name: 'Evaluación: Historia del arbitraje',
              type: 'evaluation',
              maxScore: 20,
              weight: 40,
              moduleId: 'MOD-001',
              moduleName: 'Módulo 1: Introducción al arbitraje',
              submissions: [
                {
                  studentId: 'EST-001',
                  studentName: 'María González Pérez',
                  studentEmail: 'maria.gonzalez@email.com',
                  studentCode: 'EST-2024-001',
                  score: 16,
                  status: 'graded',
                  submittedDate: '20/10/2024'
                },
                {
                  studentId: 'EST-002',
                  studentName: 'Carlos Mendoza Silva',
                  studentEmail: 'carlos.mendoza@email.com',
                  studentCode: 'EST-2024-002',
                  status: 'submitted',
                  submittedDate: '21/10/2024'
                },
                {
                  studentId: 'EST-003',
                  studentName: 'Ana Patricia Rojas',
                  studentEmail: 'ana.rojas@email.com',
                  studentCode: 'EST-2024-003',
                  status: 'submitted',
                  submittedDate: '19/10/2024'
                },
                {
                  studentId: 'EST-004',
                  studentName: 'Roberto Fernández López',
                  studentEmail: 'roberto.fernandez@email.com',
                  studentCode: 'EST-2024-004',
                  status: 'pending'
                },
                {
                  studentId: 'EST-005',
                  studentName: 'Laura Martínez Castro',
                  studentEmail: 'laura.martinez@email.com',
                  studentCode: 'EST-2024-005',
                  status: 'pending'
                }
              ]
            },
            {
              id: 'ACT-003',
              name: 'Trabajo: Análisis de caso',
              type: 'assignment',
              maxScore: 20,
              weight: 30,
              moduleId: 'MOD-001',
              moduleName: 'Módulo 1: Introducción al arbitraje',
              submissions: [
                {
                  studentId: 'EST-001',
                  studentName: 'María González Pérez',
                  studentEmail: 'maria.gonzalez@email.com',
                  studentCode: 'EST-2024-001',
                  status: 'submitted',
                  submittedDate: '25/10/2024'
                },
                {
                  studentId: 'EST-002',
                  studentName: 'Carlos Mendoza Silva',
                  studentEmail: 'carlos.mendoza@email.com',
                  studentCode: 'EST-2024-002',
                  status: 'pending'
                },
                {
                  studentId: 'EST-003',
                  studentName: 'Ana Patricia Rojas',
                  studentEmail: 'ana.rojas@email.com',
                  studentCode: 'EST-2024-003',
                  status: 'pending'
                },
                {
                  studentId: 'EST-004',
                  studentName: 'Roberto Fernández López',
                  studentEmail: 'roberto.fernandez@email.com',
                  studentCode: 'EST-2024-004',
                  status: 'pending'
                },
                {
                  studentId: 'EST-005',
                  studentName: 'Laura Martínez Castro',
                  studentEmail: 'laura.martinez@email.com',
                  studentCode: 'EST-2024-005',
                  status: 'pending'
                }
              ]
            }
          ]
        },
        {
          id: 'MOD-002',
          name: 'Módulo 2: Marco normativo',
          weight: 25,
          activities: [
            {
              id: 'ACT-004',
              name: 'Cuestionario: Legislación aplicable',
              type: 'quiz',
              maxScore: 20,
              weight: 35,
              moduleId: 'MOD-002',
              moduleName: 'Módulo 2: Marco normativo',
              submissions: [
                {
                  studentId: 'EST-001',
                  studentName: 'María González Pérez',
                  studentEmail: 'maria.gonzalez@email.com',
                  studentCode: 'EST-2024-001',
                  status: 'submitted',
                  submittedDate: '01/11/2024',
                  quizAnswers: [
                    {
                      questionNumber: 1,
                      question: '¿Qué es la Ley Modelo de la CNUDMI sobre Arbitraje Comercial Internacional?',
                      questionType: 'open',
                      studentAnswer: 'Es un marco legal internacional que armoniza las legislaciones nacionales sobre arbitraje.',
                      correctAnswer: 'Es un marco legal internacional que armoniza las legislaciones nacionales sobre arbitraje comercial internacional.',
                      points: 0,
                      maxPoints: 5
                    },
                    {
                      questionNumber: 2,
                      question: '¿Qué establece la Convención de Nueva York de 1958?',
                      questionType: 'open',
                      studentAnswer: 'Establece el reconocimiento y ejecución de laudos arbitrales extranjeros.',
                      correctAnswer: 'Establece el reconocimiento y ejecución de laudos arbitrales extranjeros.',
                      points: 0,
                      maxPoints: 5
                    },
                    {
                      questionNumber: 3,
                      question: '¿Cuál es el principio de autonomía de la voluntad en el arbitraje?',
                      questionType: 'open',
                      studentAnswer: 'Permite a las partes determinar libremente las reglas del procedimiento arbitral.',
                      correctAnswer: 'Permite a las partes determinar libremente las reglas del procedimiento arbitral.',
                      points: 0,
                      maxPoints: 5
                    },
                    {
                      questionNumber: 4,
                      question: '¿Qué es el principio de kompetenz-kompetenz?',
                      questionType: 'open',
                      studentAnswer: 'Es la facultad del tribunal arbitral para decidir sobre su propia competencia.',
                      correctAnswer: 'Es la facultad del tribunal arbitral para decidir sobre su propia competencia.',
                      points: 0,
                      maxPoints: 5
                    }
                  ]
                },
                {
                  studentId: 'EST-002',
                  studentName: 'Carlos Mendoza Silva',
                  studentEmail: 'carlos.mendoza@email.com',
                  studentCode: 'EST-2024-002',
                  status: 'submitted',
                  submittedDate: '02/11/2024',
                  quizAnswers: [
                    {
                      questionNumber: 1,
                      question: 'El laudo arbitral es de obligatorio cumplimiento para las partes.',
                      questionType: 'true-false',
                      options: ['Verdadero', 'Falso'],
                      studentAnswer: 'Verdadero',
                      correctAnswer: 'Verdadero',
                      points: 0,
                      maxPoints: 2
                    },
                    {
                      questionNumber: 2,
                      question: 'Seleccione cuál de las siguientes instituciones arbitrales es de carácter internacional:',
                      questionType: 'multiple-choice',
                      options: [
                        'Cámara de Comercio Internacional (CCI)',
                        'Centro de Arbitraje Local de Lima',
                        'Tribunal Municipal de Arbitraje',
                        'Juzgado Civil Especializado'
                      ],
                      studentAnswer: 'Cámara de Comercio Internacional (CCI)',
                      correctAnswer: 'Cámara de Comercio Internacional (CCI)',
                      points: 0,
                      maxPoints: 3
                    },
                    {
                      questionNumber: 3,
                      question: 'Seleccione todas las características que corresponden al arbitraje (puede haber más de una respuesta correcta):',
                      questionType: 'multiple-select',
                      options: [
                        'Es un método heterocompositivo',
                        'El laudo es vinculante para las partes',
                        'Es obligatorio para resolver cualquier controversia',
                        'Garantiza la confidencialidad del proceso',
                        'Los árbitros son siempre abogados'
                      ],
                      studentAnswer: ['Es un método heterocompositivo', 'El laudo es vinculante para las partes', 'Garantiza la confidencialidad del proceso'],
                      correctAnswer: ['Es un método heterocompositivo', 'El laudo es vinculante para las partes', 'Garantiza la confidencialidad del proceso'],
                      points: 0,
                      maxPoints: 5
                    },
                    {
                      questionNumber: 4,
                      question: 'Explique brevemente la diferencia entre arbitraje ad hoc y arbitraje institucional.',
                      questionType: 'essay',
                      studentAnswer: 'El arbitraje ad hoc es aquel que las partes organizan libremente sin seguir reglas predeterminadas, mientras que el arbitraje institucional se administra por una institución arbitral que proporciona reglas y servicios administrativos.',
                      correctAnswer: 'El arbitraje ad hoc es aquel donde las partes diseñan las reglas del procedimiento sin recurrir a una institución, mientras que el arbitraje institucional se realiza bajo las reglas y administración de un centro arbitral establecido.',
                      points: 0,
                      maxPoints: 5
                    },
                    {
                      questionNumber: 5,
                      question: 'La jurisdicción arbitral puede resolver cualquier tipo de controversia, incluyendo materias de derecho penal.',
                      questionType: 'true-false',
                      options: ['Verdadero', 'Falso'],
                      studentAnswer: 'Falso',
                      correctAnswer: 'Falso',
                      points: 0,
                      maxPoints: 2
                    },
                    {
                      questionNumber: 6,
                      question: '¿Cuál es el plazo general para laudar en un arbitraje según la legislación peruana?',
                      questionType: 'multiple-choice',
                      options: [
                        '30 días hábiles',
                        '60 días hábiles',
                        '20 días hábiles',
                        '90 días calendario'
                      ],
                      studentAnswer: '30 días hábiles',
                      correctAnswer: '20 días hábiles',
                      points: 0,
                      maxPoints: 3
                    }
                  ]
                },
                {
                  studentId: 'EST-003',
                  studentName: 'Ana Patricia Rojas',
                  studentEmail: 'ana.rojas@email.com',
                  studentCode: 'EST-2024-003',
                  status: 'pending'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      courseId: 'CONT-2024-01',
      courseName: 'Curso de Especialización en Contratación Pública',
      courseCode: 'CONT-2024-01',
      modules: [
        {
          id: 'MOD-101',
          name: 'Módulo 1: Marco legal de la contratación pública',
          weight: 30,
          activities: [
            {
              id: 'ACT-101',
              name: 'Cuestionario: Normativa básica',
              type: 'quiz',
              maxScore: 20,
              weight: 40,
              moduleId: 'MOD-101',
              moduleName: 'Módulo 1: Marco legal de la contratación pública',
              submissions: [
                {
                  studentId: 'EST-001',
                  studentName: 'María González Pérez',
                  studentEmail: 'maria.gonzalez@email.com',
                  studentCode: 'EST-2024-001',
                  score: 16,
                  status: 'graded',
                  submittedDate: '10/10/2024'
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(searchCourse.toLowerCase()) ||
    course.courseCode.toLowerCase().includes(searchCourse.toLowerCase())
  );

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const getActivityTypeLabel = (type: ActivityType): string => {
    const labels = {
      quiz: 'Cuestionario',
      evaluation: 'Evaluación',
      assignment: 'Trabajo'
    };
    return labels[type];
  };

  const getActivityTypeColor = (type: ActivityType): string => {
    const colors = {
      quiz: 'bg-blue-100 text-blue-700',
      evaluation: 'bg-purple-100 text-purple-700',
      assignment: 'bg-amber-100 text-amber-700'
    };
    return colors[type];
  };

  const getStatusBadge = (status: GradeStatus) => {
    const styles = {
      graded: 'bg-green-100 text-green-700',
      pending: 'bg-gray-100 text-gray-700',
      submitted: 'bg-amber-100 text-amber-700'
    };

    const labels = {
      graded: 'Calificado',
      pending: 'Pendiente',
      submitted: 'Entregado'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const handleSelectActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    setExpandedModules(new Set());
  };

  const handleGradeStudent = (student: StudentSubmission) => {
    setGradingStudent(student);
    setGradeInput(student.score?.toString() || '');
  };

  const handleSaveGrade = () => {
    if (!gradingStudent) return;

    const grade = parseFloat(gradeInput);

    if (isNaN(grade) || grade < 0 || grade > (selectedActivity?.maxScore || 20)) {
      toast.error(`La calificación debe estar entre 0 y ${selectedActivity?.maxScore || 20}`);
      return;
    }

    toast.success(`Calificación guardada para ${gradingStudent.studentName}`);
    setGradingStudent(null);
    setGradeInput('');
    
    // Aquí se actualizaría la calificación en el backend
  };

  const handleSaveQuizGrade = () => {
    if (!gradingStudent || !gradingStudent.quizAnswers) return;

    const totalPoints = gradingStudent.quizAnswers.reduce((sum, answer) => sum + answer.points, 0);
    
    toast.success(`Calificación guardada para ${gradingStudent.studentName}: ${totalPoints}/${selectedActivity?.maxScore}`);
    setGradingStudent(null);
    
    // Aquí se actualizaría la calificación en el backend
  };

  const updateQuizAnswerPoints = (questionNumber: number, points: number) => {
    if (!gradingStudent || !gradingStudent.quizAnswers) return;

    const updatedAnswers = gradingStudent.quizAnswers.map(answer => {
      if (answer.questionNumber === questionNumber) {
        return { ...answer, points: Math.max(0, Math.min(points, answer.maxPoints)) };
      }
      return answer;
    });

    setGradingStudent({
      ...gradingStudent,
      quizAnswers: updatedAnswers
    });
  };

  const updateQuizAnswerFeedback = (questionNumber: number, feedback: string) => {
    if (!gradingStudent || !gradingStudent.quizAnswers) return;

    const updatedAnswers = gradingStudent.quizAnswers.map(answer => {
      if (answer.questionNumber === questionNumber) {
        return { ...answer, feedback };
      }
      return answer;
    });

    setGradingStudent({
      ...gradingStudent,
      quizAnswers: updatedAnswers
    });
  };

  // Filtrar actividades de todos los módulos
  const getAllActivities = (course: Course) => {
    const activities: Activity[] = [];
    course.modules.forEach(module => {
      activities.push(...module.activities);
    });
    return activities;
  };

  const filteredActivities = selectedCourse 
    ? getAllActivities(selectedCourse).filter(activity =>
        activity.name.toLowerCase().includes(searchActivity.toLowerCase()) ||
        activity.moduleName.toLowerCase().includes(searchActivity.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
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
          <h1 className="text-4xl font-bold mb-2">Gestión de calificaciones</h1>
          <p className="text-xl opacity-90">Seleccione un programa y actividad para calificar a los estudiantes</p>
        </div>
      </div>

      {/* Course Selector */}
      {!selectedCourse && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Seleccionar curso</h2>
          
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar curso por nombre o código..."
              value={searchCourse}
              onChange={(e) => setSearchCourse(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B95BA]"
            />
          </div>

          <div className="space-y-3">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => {
                const totalActivities = course.modules.reduce((sum, m) => sum + m.activities.length, 0);
                const totalSubmissions = course.modules.reduce((sum, m) => 
                  sum + m.activities.reduce((actSum, a) => 
                    actSum + a.submissions.filter(s => s.status === 'submitted').length, 0
                  ), 0
                );

                return (
                  <button
                    key={course.courseId}
                    onClick={() => setSelectedCourse(course)}
                    className="w-full p-5 rounded-xl border-2 border-gray-200 hover:border-[#0B95BA] hover:shadow-md transition-all text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[#0B95BA] rounded-xl flex items-center justify-center text-white flex-shrink-0">
                        <BookOpen className="w-7 h-7" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{course.courseName}</h3>
                        <p className="text-sm text-gray-600 mb-2">{course.courseCode}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-600">
                            {totalActivities} {totalActivities === 1 ? 'actividad' : 'actividades'}
                          </span>
                          {totalSubmissions > 0 && (
                            <>
                              <span className="text-gray-400">•</span>
                              <span className="text-amber-600 font-medium">
                                {totalSubmissions} {totalSubmissions === 1 ? 'entrega' : 'entregas'} por calificar
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-[#0B95BA] transition-colors" />
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="text-center py-12 text-gray-500">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No se encontraron cursos</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Activity Selector */}
      {selectedCourse && !selectedActivity && (
        <div className="space-y-6">
          {/* Course Header */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedCourse.courseName}</h2>
                <p className="text-gray-600">{selectedCourse.courseCode}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedCourse(null);
                  setSearchActivity('');
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors border-2 border-gray-200 bg-white shadow-sm hover:shadow-md"
              >
                Cambiar curso
              </button>
            </div>
          </div>

          {/* Activities List */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Seleccionar actividad para calificar</h3>
            
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar actividad por nombre o módulo..."
                value={searchActivity}
                onChange={(e) => setSearchActivity(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B95BA]"
              />
            </div>

            <div className="space-y-4">
              {selectedCourse.modules.map((module) => {
                const isExpanded = expandedModules.has(module.id);
                const moduleActivities = searchActivity 
                  ? module.activities.filter(a => 
                      a.name.toLowerCase().includes(searchActivity.toLowerCase())
                    )
                  : module.activities;

                if (searchActivity && moduleActivities.length === 0) return null;

                return (
                  <div key={module.id} className="border-2 border-gray-200 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-[#0B95BA]" />
                        <div className="text-left">
                          <h4 className="font-bold text-gray-900">{module.name}</h4>
                          <p className="text-sm text-gray-600">
                            {module.activities.length} {module.activities.length === 1 ? 'actividad' : 'actividades'}
                          </p>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="p-4 space-y-3">
                        {moduleActivities.map((activity) => {
                          const gradedCount = activity.submissions.filter(s => s.status === 'graded').length;
                          const submittedCount = activity.submissions.filter(s => s.status === 'submitted').length;
                          const pendingCount = activity.submissions.filter(s => s.status === 'pending').length;
                          const totalStudents = activity.submissions.length;

                          return (
                            <button
                              key={activity.id}
                              onClick={() => handleSelectActivity(activity)}
                              className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-[#0B95BA] hover:shadow-md transition-all text-left group"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getActivityTypeColor(activity.type)}`}>
                                      {getActivityTypeLabel(activity.type)}
                                    </span>
                                  </div>
                                  <h5 className="font-bold text-gray-900 mb-2">{activity.name}</h5>
                                  <div className="flex items-center gap-4 text-sm mt-2">
                                    <span className="text-green-600">✓ {gradedCount} calificados</span>
                                    <span className="text-amber-600">⏱ {submittedCount} entregados</span>
                                    <span className="text-gray-500">○ {pendingCount} pendientes</span>
                                  </div>
                                </div>
                                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-[#0B95BA] transition-colors flex-shrink-0 mt-2" />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Students List for Selected Activity */}
      {selectedCourse && selectedActivity && (
        <div className="space-y-6">
          {/* Activity Header */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-lg font-medium ${getActivityTypeColor(selectedActivity.type)}`}>
                    {getActivityTypeLabel(selectedActivity.type)}
                  </span>
                  <span className="text-sm text-gray-600">{selectedActivity.moduleName}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedActivity.name}</h2>
                <p className="text-gray-600">{selectedCourse.courseName} • {selectedCourse.courseCode}</p>
              </div>
              <button
                onClick={() => setSelectedActivity(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors border-2 border-gray-200 bg-white shadow-sm hover:shadow-md"
              >
                Volver a actividades
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4 border-t-2 border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-1">Puntaje máximo</p>
                <p className="text-2xl font-bold text-[#0B95BA]">{selectedActivity.maxScore}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Ponderación</p>
                <p className="text-2xl font-bold text-gray-900">{selectedActivity.weight}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total estudiantes</p>
                <p className="text-2xl font-bold text-gray-900">{selectedActivity.submissions.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Calificados</p>
                <p className="text-2xl font-bold text-green-600">
                  {selectedActivity.submissions.filter(s => s.status === 'graded').length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Por calificar</p>
                <p className="text-2xl font-bold text-amber-600">
                  {selectedActivity.submissions.filter(s => s.status === 'submitted').length}
                </p>
              </div>
            </div>
          </div>

          {/* Students Submissions */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Entregas de estudiantes</h3>
            
            <div className="space-y-3">
              {selectedActivity.submissions.map((student) => (
                <div
                  key={student.studentId}
                  className={`p-5 rounded-xl border-2 ${
                    student.status === 'graded' ? 'border-green-200 bg-green-50/30' :
                    student.status === 'submitted' ? 'border-amber-200 bg-amber-50/30' :
                    'border-gray-200 bg-gray-50/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-full flex items-center justify-center text-white flex-shrink-0">
                        <User className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">{student.studentName}</h4>

                        <div className="flex items-center gap-3">
                          {getStatusBadge(student.status)}
                          {student.submittedDate && (
                            <span className="text-sm text-gray-600">
                              Entregado: {student.submittedDate}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 ml-4">
                      {student.status === 'graded' && student.score !== undefined ? (
                        <>
                          <div className="text-right">
                            <p className="text-sm text-gray-600 mb-1">Calificación</p>
                            <p className="text-3xl font-bold text-green-600">
                              {student.score}/{selectedActivity.maxScore}
                            </p>
                          </div>
                          <button
                            onClick={() => handleGradeStudent(student)}
                            className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
                            title="Editar calificación"
                          >
                            <Edit3 className="w-5 h-5" />
                          </button>
                        </>
                      ) : student.status === 'submitted' ? (
                        <button
                          onClick={() => handleGradeStudent(student)}
                          className="px-6 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                        >
                          <FileText className="w-5 h-5" />
                          Calificar
                        </button>
                      ) : (
                        <div className="text-center text-gray-500 px-6 py-3 bg-gray-200 rounded-xl flex items-center gap-2">
                          <Clock className="w-5 h-5" />
                          <span>No entregado</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Grading Modal - Quiz with Multiple Choice Questions */}
      {gradingStudent && gradingStudent.quizAnswers && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] p-6 rounded-t-3xl flex items-center justify-between sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Calificar cuestionario</h2>
                <p className="text-white/90">{gradingStudent.studentName}</p>
              </div>
              <button
                onClick={() => setGradingStudent(null)}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Summary Card */}
              <div className="bg-blue-50 rounded-2xl p-5">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Estudiante</p>
                    <p className="font-medium text-gray-900">{gradingStudent.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Fecha de entrega</p>
                    <p className="font-medium text-gray-900">{gradingStudent.submittedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total de preguntas</p>
                    <p className="font-bold text-gray-900">{gradingStudent.quizAnswers.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Puntaje total</p>
                    <p className="font-bold text-[#0B95BA] text-xl">
                      {gradingStudent.quizAnswers.reduce((sum, a) => sum + a.points, 0)}/{selectedActivity?.maxScore}
                    </p>
                  </div>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900">Respuestas del estudiante</h3>
                {gradingStudent.quizAnswers.map((answer) => {
                  const getQuestionTypeLabel = (type: QuestionType) => {
                    const labels = {
                      'open': 'Pregunta abierta',
                      'multiple-choice': 'Opción múltiple',
                      'true-false': 'Verdadero o Falso',
                      'multiple-select': 'Selección múltiple',
                      'essay': 'Pregunta de desarrollo'
                    };
                    return labels[type];
                  };

                  const getQuestionTypeColor = (type: QuestionType) => {
                    const colors = {
                      'open': 'bg-blue-100 text-blue-700',
                      'multiple-choice': 'bg-purple-100 text-purple-700',
                      'true-false': 'bg-teal-100 text-teal-700',
                      'multiple-select': 'bg-indigo-100 text-indigo-700',
                      'essay': 'bg-amber-100 text-amber-700'
                    };
                    return colors[type];
                  };

                  const renderStudentAnswer = () => {
                    // Para preguntas de selección múltiple (multiple-select)
                    if (answer.questionType === 'multiple-select' && Array.isArray(answer.studentAnswer)) {
                      return (
                        <div className="bg-white rounded-xl p-4 border-2 border-blue-200">
                          <ul className="space-y-2">
                            {answer.studentAnswer.map((ans, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-900">{ans}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }

                    // Para preguntas con opciones (multiple-choice, true-false)
                    if (answer.questionType === 'multiple-choice' || answer.questionType === 'true-false') {
                      const isCorrect = answer.studentAnswer === answer.correctAnswer;
                      return (
                        <div>
                          {answer.options && (
                            <div className="space-y-2">
                              {answer.options.map((option, idx) => {
                                const isSelected = option === answer.studentAnswer;
                                const isCorrectOption = option === answer.correctAnswer;
                                return (
                                  <div
                                    key={idx}
                                    className={`p-3 rounded-lg border-2 ${
                                      isSelected && isCorrectOption
                                        ? 'bg-green-50 border-green-300'
                                        : isSelected
                                        ? 'bg-red-50 border-red-300'
                                        : isCorrectOption
                                        ? 'bg-green-50/30 border-green-200'
                                        : 'bg-white border-gray-200'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      {isSelected && (
                                        <CheckCircle className={`w-5 h-5 ${isCorrect ? 'text-green-600' : 'text-red-600'}`} />
                                      )}
                                      {!isSelected && isCorrectOption && (
                                        <div className="w-5 h-5 rounded-full border-2 border-green-600 flex items-center justify-center">
                                          <div className="w-2 h-2 rounded-full bg-green-600"></div>
                                        </div>
                                      )}
                                      <span className={`${isSelected ? 'font-medium' : ''} text-gray-900`}>
                                        {option}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    }

                    // Para preguntas abiertas y de desarrollo (open, essay)
                    return (
                      <div className="bg-white rounded-xl p-4 border-2 border-blue-200">
                        <p className="text-gray-900 whitespace-pre-wrap">{answer.studentAnswer as string}</p>
                      </div>
                    );
                  };

                  const renderCorrectAnswer = () => {
                    // Para preguntas de selección múltiple
                    if (answer.questionType === 'multiple-select' && Array.isArray(answer.correctAnswer)) {
                      return (
                        <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                          <ul className="space-y-2">
                            {answer.correctAnswer.map((ans, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-900">{ans}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }

                    // Para preguntas con opciones ya se muestra en renderStudentAnswer
                    if (answer.questionType === 'multiple-choice' || answer.questionType === 'true-false') {
                      return null;
                    }

                    // Para preguntas abiertas y de desarrollo
                    return (
                      <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                        <p className="text-gray-900 whitespace-pre-wrap">{answer.correctAnswer as string}</p>
                      </div>
                    );
                  };

                  return (
                    <div key={answer.questionNumber} className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-[#0B95BA] text-white rounded-lg font-bold text-sm">
                              Pregunta {answer.questionNumber}
                            </span>
                            <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getQuestionTypeColor(answer.questionType)}`}>
                              {getQuestionTypeLabel(answer.questionType)}
                            </span>
                            <span className="text-sm text-gray-600">
                              {answer.maxPoints} {answer.maxPoints === 1 ? 'punto' : 'puntos'}
                            </span>
                          </div>
                          <p className="font-medium text-gray-900 mb-4">{answer.question}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {/* Student Answer */}
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            {answer.questionType === 'multiple-choice' || answer.questionType === 'true-false' 
                              ? 'Opciones (la seleccionada está marcada):' 
                              : 'Respuesta del estudiante:'}
                          </p>
                          {renderStudentAnswer()}
                        </div>

                        {/* Correct Answer - Solo para preguntas abiertas y de desarrollo */}
                        {renderCorrectAnswer() && (
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Respuesta correcta/esperada:</p>
                            {renderCorrectAnswer()}
                          </div>
                        )}

                        {/* Feedback - Solo para preguntas abiertas y de desarrollo */}
                        {(answer.questionType === 'open' || answer.questionType === 'essay') && (
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                              Comentario (opcional):
                            </label>
                            <textarea
                              value={answer.feedback || ''}
                              onChange={(e) => updateQuizAnswerFeedback(answer.questionNumber, e.target.value)}
                              placeholder="Agregue un comentario para el estudiante..."
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B95BA] resize-none"
                              rows={3}
                            />
                          </div>
                        )}

                        {/* Points Assignment */}
                        <div className="flex items-center gap-4 pt-3 border-t-2 border-gray-200">
                          <p className="font-medium text-gray-900">Asignar puntaje:</p>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuizAnswerPoints(answer.questionNumber, answer.points - 0.5)}
                              className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-gray-700 transition-colors"
                            >
                              -
                            </button>
                            <div className="w-32 text-center">
                              <input
                                type="number"
                                min="0"
                                max={answer.maxPoints}
                                step="0.5"
                                value={answer.points}
                                onChange={(e) => updateQuizAnswerPoints(answer.questionNumber, parseFloat(e.target.value) || 0)}
                                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#0B95BA] text-center font-bold text-xl"
                              />
                              <p className="text-xs text-gray-600 mt-1">de {answer.maxPoints}</p>
                            </div>
                            <button
                              onClick={() => updateQuizAnswerPoints(answer.questionNumber, answer.points + 0.5)}
                              className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-gray-700 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t-2 border-gray-200">
                <div className="text-gray-900">
                  <p className="text-sm mb-1">Calificación final</p>
                  <p className="text-3xl font-bold text-[#0B95BA]">
                    {gradingStudent.quizAnswers.reduce((sum, a) => sum + a.points, 0).toFixed(1)}/{selectedActivity?.maxScore}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGradingStudent(null)}
                    className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveQuizGrade}
                    className="px-6 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Guardar calificación
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grading Modal - Standard (Evaluations/Assignments) */}
      {gradingStudent && !gradingStudent.quizAnswers && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full">
            <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] p-6 rounded-t-3xl flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Calificar actividad</h2>
                <p className="text-white/90">{gradingStudent.studentName}</p>
              </div>
              <button
                onClick={() => {
                  setGradingStudent(null);
                  setGradeInput('');
                }}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-blue-50 rounded-2xl p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Estudiante</p>
                    <p className="font-medium text-gray-900">{gradingStudent.studentName}</p>
                    <p className="text-sm text-gray-600">{gradingStudent.studentCode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Actividad</p>
                    <p className="font-medium text-gray-900">{selectedActivity?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tipo</p>
                    <span className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${selectedActivity ? getActivityTypeColor(selectedActivity.type) : ''}`}>
                      {selectedActivity ? getActivityTypeLabel(selectedActivity.type) : ''}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Fecha de entrega</p>
                    <p className="font-medium text-gray-900">{gradingStudent.submittedDate || 'No entregado'}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Calificación (0 - {selectedActivity?.maxScore})
                </label>
                <input
                  type="number"
                  min="0"
                  max={selectedActivity?.maxScore}
                  step="0.5"
                  value={gradeInput}
                  onChange={(e) => setGradeInput(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B95BA] text-2xl font-bold text-center"
                  placeholder="0"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-gray-200">
                <button
                  onClick={() => {
                    setGradingStudent(null);
                    setGradeInput('');
                  }}
                  className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveGrade}
                  className="px-6 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Guardar calificación
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}