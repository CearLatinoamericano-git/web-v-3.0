import { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  ChevronDown, 
  ChevronRight,
  BookOpen,
  Video,
  FileText,
  CheckSquare,
  Users,
  MessageSquare,
  Clock,
  Calendar,
  Settings,
  CheckCircle,
  User,
  Save,
  Send,
  AlertCircle,
  Bell,
  Search,
  Upload,
  Mail,
  X,
  ArrowLeft,
  Info,
  Check
} from 'lucide-react';
import { toast } from 'sonner';
import { QuizCreator } from './QuizCreator';
import { QuizGradingView } from './QuizGradingView';

interface CourseContentBuilderProps {
  courseId: string;
  onBack: () => void;
}

type ActivityType = 'quiz' | 'assignment' | 'reading' | 'forum' | 'case-study' | 'reading-control' | 'survey';

interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  publishDate: string; // Fecha de publicación (obligatoria)
  dueDate?: string; // Fecha de vencimiento (opcional)
  duration?: number;
  graded: boolean;
  weight?: number; // Peso porcentual de la actividad
  passingScore?: number;
  attempts?: number;
  description?: string;
  attachments?: Array<{
    name: string;
    size: string;
    type: string;
    url: string;
  }>;
  isGroupWork?: boolean;
  maxGroupSize?: number;
  minGroupSize?: number;
  allowChat?: boolean;
  groupAssignmentMethod?: 'automatic' | 'manual';
  manualGroups?: Array<{
    id: string;
    name: string;
    studentIds: string[];
  }>;
  // Configuración integrada de quiz/control de lectura
  questions?: Array<{
    id: string;
    type: 'multiple-choice' | 'true-false' | 'multiple-answer' | 'essay' | 'multiple-choice-grid';
    question: string;
    options: string[];
    correctAnswer?: number | number[];
    points: number;
    explanation?: string;
    // Para cuadrículas (grid)
    gridRows?: string[];
    gridColumns?: string[];
    gridAnswers?: { [rowIndex: number]: number }; // rowIndex -> columnIndex
  }>;
  timeLimit?: number;
  shuffleQuestions?: boolean;
  questionsToShow?: number; // Cuántas preguntas mostrar del pool (cuando shuffle está activo)
  shuffleOptions?: boolean;
  showCorrectAnswers?: boolean;
  showExplanations?: boolean;
}

interface Session {
  id: string;
  title: string;
  liveClass?: {
    date: string;
    time: string;
    duration: string;
    meetLink?: string;
    teacherId?: string;
    teacherName?: string;
    recordedVideo?: {
      url: string;
      uploadedAt: string;
      uploadedBy: string;
      thumbnailUrl?: string;
    };
  };
  activities: Activity[];
  materials: Array<{ title: string; type: string; url?: string; size?: string }>;
  expanded: boolean;
}

interface Module {
  id: string;
  title: string;
  description: string;
  weight?: number; // Peso porcentual del módulo
  sessions: Session[];
  evaluations?: Activity[]; // Evaluaciones a nivel de módulo (exámenes que cubren múltiples sesiones)
  expanded: boolean;
}

// Componente para configurar preguntas de quiz/control de lectura
function QuizQuestionBuilder({ 
  questions, 
  onQuestionsChange,
  activityType,
  shuffleQuestions,
  questionsToShow
}: { 
  questions: Activity['questions'];
  onQuestionsChange: (questions: Activity['questions']) => void;
  activityType?: ActivityType;
  shuffleQuestions?: boolean;
  questionsToShow?: number;
}) {
  const [editingQuestion, setEditingQuestion] = useState<number | null>(null);
  const [newQuestion, setNewQuestion] = useState({
    type: 'multiple-choice' as 'multiple-choice' | 'true-false' | 'multiple-answer' | 'essay' | 'multiple-choice-grid',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: undefined as number | number[] | undefined,
    points: 1,
    explanation: '',
    gridRows: ['', '', ''],
    gridColumns: ['', '', ''],
    gridAnswers: {} as { [rowIndex: number]: number }
  });

  const addQuestion = () => {
    if (!newQuestion.question.trim()) {
      toast.error('La pregunta no puede estar vacía.');
      return;
    }

    // Validaciones específicas por tipo
    if (newQuestion.type === 'multiple-choice-grid') {
      const validRows = newQuestion.gridRows.filter(r => r.trim() !== '');
      const validCols = newQuestion.gridColumns.filter(c => c.trim() !== '');
      
      if (validRows.length === 0 || validCols.length === 0) {
        toast.error('Debe agregar al menos una fila y una columna.');
        return;
      }
      
      // Solo validar respuestas correctas si NO es encuesta
      if (activityType !== 'survey' && Object.keys(newQuestion.gridAnswers).length !== validRows.length) {
        toast.error('Debe seleccionar una respuesta correcta para cada fila.');
        return;
      }
    } else if (newQuestion.type !== 'essay' && activityType !== 'survey') {
      // Solo validar respuestas correctas si NO es encuesta
      if (newQuestion.type === 'multiple-answer') {
        if (!Array.isArray(newQuestion.correctAnswer) || newQuestion.correctAnswer.length === 0) {
          toast.error('Debe seleccionar al menos una respuesta correcta.');
          return;
        }
      } else if (newQuestion.correctAnswer === undefined) {
        toast.error('Debe seleccionar la respuesta correcta.');
        return;
      }
    }

    const questionToAdd = {
      id: `q-${Date.now()}`,
      ...newQuestion
    };

    onQuestionsChange([...(questions || []), questionToAdd]);
    
    // Reset form
    setNewQuestion({
      type: 'multiple-choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: undefined,
      points: 1,
      explanation: '',
      gridRows: ['', '', ''],
      gridColumns: ['', '', ''],
      gridAnswers: {}
    });
    
    toast.success('Pregunta agregada.');
  };

  const removeQuestion = (index: number) => {
    onQuestionsChange(questions?.filter((_, i) => i !== index) || []);
    toast.success('Pregunta eliminada.');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-gray-900">
          Preguntas de {activityType === 'quiz' ? 'Cuestionario' : activityType === 'reading-control' ? 'Control de Lectura' : 'Encuesta'}
        </h4>
        <span className="text-sm text-gray-600">
          {questions?.length || 0} pregunta(s)
          {activityType !== 'survey' && ` | ${questions?.reduce((sum, q) => sum + q.points, 0) || 0} puntos totales`}
        </span>
      </div>

      {/* Barra de progreso inteligente */}
      {activityType !== 'survey' && (() => {
        const totalCurrentPoints = questions?.reduce((sum, q) => sum + q.points, 0) || 0;
        const currentQuestionCount = questions?.length || 0;
        
        let displayMessage = '';
        let progressPercent = 0;
        let statusColor = '';
        
        if (shuffleQuestions && questionsToShow) {
          // Modo sorteo: necesitamos al menos questionsToShow preguntas
          const questionsNeeded = questionsToShow;
          const questionsMissing = Math.max(0, questionsNeeded - currentQuestionCount);
          
          progressPercent = Math.min(100, (currentQuestionCount / questionsNeeded) * 100);
          
          if (currentQuestionCount === 0) {
            displayMessage = `Inicie agregando preguntas para el pool (se necesitan ${questionsNeeded} preguntas para el sorteo)`;
            statusColor = 'bg-gray-400';
          } else if (currentQuestionCount < questionsNeeded) {
            displayMessage = `Faltan ${questionsMissing} pregunta(s) para completar el pool (${questionsNeeded} necesarias para el sorteo)`;
            statusColor = 'bg-yellow-500';
          } else {
            displayMessage = `Pool completo: ${currentQuestionCount} preguntas disponibles para sorteo (se mostrarán ${questionsNeeded} por evaluación)`;
            statusColor = 'bg-green-500';
          }
        } else {
          // Modo normal: mostrar progreso de preguntas agregadas
          if (currentQuestionCount === 0) {
            displayMessage = 'Inicie agregando preguntas para el cuestionario';
            statusColor = 'bg-gray-400';
            progressPercent = 0;
          } else if (currentQuestionCount < 5) {
            displayMessage = `${currentQuestionCount} pregunta(s) agregada(s) - Se recomienda agregar más preguntas`;
            statusColor = 'bg-yellow-500';
            progressPercent = (currentQuestionCount / 5) * 100;
          } else {
            displayMessage = `${currentQuestionCount} pregunta(s) agregada(s) - ${totalCurrentPoints} puntos totales`;
            statusColor = 'bg-green-500';
            progressPercent = 100;
          }
        }
        
        return (
          <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">{displayMessage}</p>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span>Preguntas: {currentQuestionCount}</span>
                  {!shuffleQuestions && (
                    <>
                      <span>•</span>
                      <span>Puntos actuales: {totalCurrentPoints}</span>
                    </>
                  )}
                  {shuffleQuestions && questionsToShow && (
                    <>
                      <span>•</span>
                      <span>Se mostrarán: {questionsToShow}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${statusColor}`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        );
      })()}

      {/* Lista de preguntas agregadas */}
      {questions && questions.length > 0 && (
        <div className="space-y-3">
          {questions.map((q, index) => (
            <div key={q.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold text-[#0B95BA]">Pregunta {index + 1}</span>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      {q.type === 'multiple-choice' && 'Opción única'}
                      {q.type === 'true-false' && 'Verdadero/Falso'}
                      {q.type === 'multiple-answer' && 'Opción múltiple'}
                      {q.type === 'essay' && 'Desarrollo'}
                      {q.type === 'multiple-choice-grid' && 'Cuadrícula'}
                    </span>
                    {activityType !== 'survey' && <span className="text-xs text-gray-600">{q.points} pts</span>}
                  </div>
                  <p className="text-sm text-gray-900 mb-2">{q.question}</p>
                  
                  {/* Vista para cuadrícula */}
                  {q.type === 'multiple-choice-grid' && q.gridRows && q.gridColumns && (
                    <div className="mt-3 overflow-x-auto">
                      <table className="min-w-full text-xs border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-3 py-2 text-left font-medium"></th>
                            {q.gridColumns.filter(c => c.trim()).map((col, i) => (
                              <th key={i} className="border border-gray-300 px-3 py-2 text-center font-medium">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {q.gridRows.filter(r => r.trim()).map((row, rowIdx) => (
                            <tr key={rowIdx}>
                              <td className="border border-gray-300 px-3 py-2 font-medium bg-gray-50">
                                {row}
                              </td>
                              {q.gridColumns.filter(c => c.trim()).map((_, colIdx) => (
                                <td key={colIdx} className="border border-gray-300 px-3 py-2 text-center">
                                  {q.gridAnswers?.[rowIdx] === colIdx ? (
                                    <CheckCircle className="w-4 h-4 text-green-600 mx-auto" />
                                  ) : (
                                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 mx-auto" />
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  
                  {/* Vista para otros tipos */}
                  {q.type !== 'essay' && q.type !== 'multiple-choice-grid' && (
                    <div className="space-y-1">
                      {q.options.map((opt, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          {activityType !== 'survey' && (
                            <>
                              {Array.isArray(q.correctAnswer) ? (
                                q.correctAnswer.includes(i) ? (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                ) : (
                                  <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                                )
                              ) : (
                                q.correctAnswer === i ? (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                ) : (
                                  <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                                )
                              )}
                            </>
                          )}
                          {activityType === 'survey' && (
                            <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                          )}
                          <span className={activityType !== 'survey' && (q.correctAnswer === i || (Array.isArray(q.correctAnswer) && q.correctAnswer.includes(i))) ? 'text-green-700 font-medium' : 'text-gray-600'}>
                            {opt}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeQuestion(index)}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Formulario para nueva pregunta */}
      <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
        <h5 className="font-bold text-blue-900 mb-4">Agregar nueva pregunta</h5>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de pregunta
              </label>
              <select
                value={newQuestion.type}
                onChange={(e) => setNewQuestion({ 
                  ...newQuestion, 
                  type: e.target.value as any,
                  options: e.target.value === 'true-false' ? ['Verdadero', 'Falso'] : ['', '', '', ''],
                  correctAnswer: e.target.value === 'multiple-answer' ? [] : undefined,
                  gridRows: ['', '', ''],
                  gridColumns: ['', '', ''],
                  gridAnswers: {}
                })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
              >
                <option value="multiple-choice">Opción única (seleccionar solo una)</option>
                <option value="multiple-answer">Opción múltiple (seleccionar varias)</option>
                <option value="true-false">Verdadero/Falso</option>
                <option value="multiple-choice-grid">Cuadrícula de opción única</option>
                <option value="essay">Desarrollo (respuesta abierta)</option>
              </select>
            </div>
            
            {activityType !== 'survey' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Puntaje
                </label>
                <input
                  type="number"
                  min="1"
                  value={newQuestion.points}
                  onChange={(e) => setNewQuestion({ ...newQuestion, points: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pregunta <span className="text-red-500">*</span>
            </label>
            <textarea
              value={newQuestion.question}
              onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
              placeholder="Escriba la pregunta..."
              rows={2}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
            />
          </div>

          {/* Editor de cuadrícula */}
          {newQuestion.type === 'multiple-choice-grid' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Columnas (encabezados) <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {newQuestion.gridColumns.map((col, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 w-20">Columna {index + 1}:</span>
                      <input
                        type="text"
                        value={col}
                        onChange={(e) => {
                          const newCols = [...newQuestion.gridColumns];
                          newCols[index] = e.target.value;
                          setNewQuestion({ ...newQuestion, gridColumns: newCols });
                        }}
                        placeholder={`Ej: Opción ${index + 1}`}
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
                      />
                      {index >= 2 && (
                        <button
                          onClick={() => {
                            const newCols = newQuestion.gridColumns.filter((_, i) => i !== index);
                            setNewQuestion({ ...newQuestion, gridColumns: newCols });
                          }}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-600" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => setNewQuestion({ 
                      ...newQuestion, 
                      gridColumns: [...newQuestion.gridColumns, ''] 
                    })}
                    className="text-sm text-[#0B95BA] hover:text-[#087A98] flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar columna
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filas (opciones) <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {newQuestion.gridRows.map((row, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 w-20">Fila {index + 1}:</span>
                      <input
                        type="text"
                        value={row}
                        onChange={(e) => {
                          const newRows = [...newQuestion.gridRows];
                          newRows[index] = e.target.value;
                          setNewQuestion({ ...newQuestion, gridRows: newRows });
                        }}
                        placeholder={`Ej: Ítem ${index + 1}`}
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
                      />
                      {index >= 2 && (
                        <button
                          onClick={() => {
                            const newRows = newQuestion.gridRows.filter((_, i) => i !== index);
                            const newAnswers = { ...newQuestion.gridAnswers };
                            delete newAnswers[index];
                            setNewQuestion({ ...newQuestion, gridRows: newRows, gridAnswers: newAnswers });
                          }}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-600" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => setNewQuestion({ 
                      ...newQuestion, 
                      gridRows: [...newQuestion.gridRows, ''] 
                    })}
                    className="text-sm text-[#0B95BA] hover:text-[#087A98] flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar fila
                  </button>
                </div>
              </div>

              {/* Preview de la cuadrícula con respuestas correctas */}
              {newQuestion.gridRows.some(r => r.trim()) && newQuestion.gridColumns.some(c => c.trim()) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {activityType !== 'survey' ? (
                      <>Respuestas correctas (seleccione una opción por fila) <span className="text-red-500">*</span></>
                    ) : (
                      <>Vista previa de la cuadrícula <span className="text-xs text-blue-600 font-normal ml-1">(sin respuestas correctas)</span></>
                    )}
                  </label>
                  <div className="overflow-x-auto border border-gray-300 rounded-xl">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-2 text-left font-medium"></th>
                          {newQuestion.gridColumns.filter(c => c.trim()).map((col, i) => (
                            <th key={i} className="border border-gray-300 px-4 py-2 text-center font-medium">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {newQuestion.gridRows.filter(r => r.trim()).map((row, rowIdx) => (
                          <tr key={rowIdx} className="hover:bg-blue-50">
                            <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">
                              {row}
                            </td>
                            {newQuestion.gridColumns.filter(c => c.trim()).map((_, colIdx) => (
                              <td key={colIdx} className="border border-gray-300 px-4 py-2 text-center">
                                {activityType !== 'survey' ? (
                                  <label className="flex items-center justify-center cursor-pointer">
                                    <input
                                      type="radio"
                                      name={`grid-row-${rowIdx}`}
                                      checked={newQuestion.gridAnswers[rowIdx] === colIdx}
                                      onChange={() => {
                                        setNewQuestion({
                                          ...newQuestion,
                                          gridAnswers: {
                                            ...newQuestion.gridAnswers,
                                            [rowIdx]: colIdx
                                          }
                                        });
                                      }}
                                      className="w-5 h-5 cursor-pointer"
                                    />
                                  </label>
                                ) : (
                                  <span className="text-gray-400">○</span>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {activityType !== 'survey' 
                      ? 'Seleccione la respuesta correcta para cada fila'
                      : 'Los estudiantes podrán seleccionar una opción por fila'
                    }
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Editor de opciones normales */}
          {newQuestion.type !== 'essay' && newQuestion.type !== 'multiple-choice-grid' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Opciones de respuesta
                {activityType !== 'survey' && newQuestion.type === 'multiple-answer' && (
                  <span className="ml-2 text-xs text-[#0B95BA] font-normal flex items-center gap-1">
                    (marque todas las correctas <Check className="w-3 h-3" />)
                  </span>
                )}
                {activityType === 'survey' && (
                  <span className="ml-2 text-xs text-blue-600 font-normal">
                    (opciones para que el estudiante elija, sin calificación)
                  </span>
                )}
              </label>
              <div className="space-y-2">
                {newQuestion.options.map((option, index) => (
                  <div key={index} className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                    activityType !== 'survey' && ((newQuestion.type === 'multiple-answer' && Array.isArray(newQuestion.correctAnswer) && newQuestion.correctAnswer.includes(index)) ||
                    (newQuestion.type !== 'multiple-answer' && newQuestion.correctAnswer === index))
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}>
                    {activityType !== 'survey' && (
                      <div className="flex items-center justify-center w-10">
                        {newQuestion.type === 'multiple-answer' ? (
                          <label className="relative cursor-pointer">
                            <input
                              type="checkbox"
                              checked={Array.isArray(newQuestion.correctAnswer) && newQuestion.correctAnswer.includes(index)}
                              onChange={(e) => {
                                const current = Array.isArray(newQuestion.correctAnswer) ? newQuestion.correctAnswer : [];
                                setNewQuestion({
                                  ...newQuestion,
                                  correctAnswer: e.target.checked
                                    ? [...current, index]
                                    : current.filter(i => i !== index)
                                });
                              }}
                              className="w-5 h-5 rounded border-2 border-gray-400 text-green-600 focus:ring-2 focus:ring-green-500 cursor-pointer"
                            />
                          </label>
                        ) : (
                          <label className="relative cursor-pointer">
                            <input
                              type="radio"
                              name="correctAnswer"
                              checked={newQuestion.correctAnswer === index}
                              onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: index })}
                              className="w-5 h-5 border-2 border-gray-400 text-green-600 focus:ring-2 focus:ring-green-500 cursor-pointer"
                            />
                          </label>
                        )}
                      </div>
                    )}
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...newQuestion.options];
                        newOptions[index] = e.target.value;
                        setNewQuestion({ ...newQuestion, options: newOptions });
                      }}
                      placeholder={`Opción ${index + 1}`}
                      disabled={newQuestion.type === 'true-false'}
                      className="flex-1 px-4 py-2 border-0 bg-transparent focus:outline-none disabled:bg-transparent"
                    />
                    {((newQuestion.type === 'multiple-answer' && Array.isArray(newQuestion.correctAnswer) && newQuestion.correctAnswer.includes(index)) ||
                      (newQuestion.type !== 'multiple-answer' && newQuestion.correctAnswer === index)) && activityType !== 'survey' && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    {newQuestion.type !== 'true-false' && newQuestion.options.length > 2 && (
                      <button
                        onClick={() => {
                          const newOptions = newQuestion.options.filter((_, i) => i !== index);
                          let newCorrectAnswer = newQuestion.correctAnswer;
                          
                          // Ajustar respuesta correcta si es necesario
                          if (newQuestion.type === 'multiple-answer' && Array.isArray(newCorrectAnswer)) {
                            // Remover el índice eliminado y ajustar los índices mayores
                            newCorrectAnswer = newCorrectAnswer
                              .filter(i => i !== index)
                              .map(i => i > index ? i - 1 : i);
                          } else if (newCorrectAnswer === index) {
                            // Si se eliminó la respuesta correcta, resetear
                            newCorrectAnswer = undefined;
                          } else if (typeof newCorrectAnswer === 'number' && newCorrectAnswer > index) {
                            // Ajustar el índice si es mayor
                            newCorrectAnswer = newCorrectAnswer - 1;
                          }
                          
                          setNewQuestion({ 
                            ...newQuestion, 
                            options: newOptions,
                            correctAnswer: newCorrectAnswer
                          });
                        }}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-600" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {newQuestion.type !== 'true-false' && (
                <button
                  onClick={() => setNewQuestion({ 
                    ...newQuestion, 
                    options: [...newQuestion.options, ''] 
                  })}
                  className="mt-2 text-sm text-[#0B95BA] hover:text-[#087A98] flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Agregar opción
                </button>
              )}
              <p className="text-xs text-gray-500 mt-3 flex items-center gap-2">
                {newQuestion.type === 'multiple-answer' ? (
                  <span className="font-medium text-[#0B95BA] flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    Puede seleccionar múltiples respuestas correctas
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Solo puede seleccionar una respuesta correcta
                  </span>
                )}
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Explicación (opcional)
            </label>
            <textarea
              value={newQuestion.explanation}
              onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
              placeholder="Explicación de la respuesta correcta..."
              rows={2}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
            />
          </div>

          <button
            onClick={addQuestion}
            className="w-full px-6 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Agregar pregunta
          </button>
        </div>
      </div>
    </div>
  );
}

export function CourseContentBuilder({ courseId, onBack }: CourseContentBuilderProps) {
  // Estado del programa (Mock - en producción vendría de la API)
  const [courseStatus, setCourseStatus] = useState<'draft' | 'published' | 'scheduled'>('draft');
  const [publicationDate, setPublicationDate] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  
  // Configuración de frecuencia a nivel de programa
  const [courseFrequency, setCourseFrequency] = useState<'unica' | 'semanal' | 'quincenal' | 'mensual'>('semanal');
  const [courseRecurringDays, setCourseRecurringDays] = useState<string[]>(['lunes', 'miercoles']);
  const [showFrequencyModal, setShowFrequencyModal] = useState(false);

  // Lista de profesores disponibles
  const availableTeachers = [
    { id: 't1', name: 'Dr. Carlos Méndez', specialty: 'Arbitraje Internacional' },
    { id: 't2', name: 'Dra. María Rodríguez', specialty: 'Contratación Pública' },
    { id: 't3', name: 'Dr. Juan Pérez', specialty: 'Resolución de Controversias' },
    { id: 't4', name: 'Dra. Ana Gómez', specialty: 'Derecho Comercial' },
    { id: 't5', name: 'Dr. Luis Torres', specialty: 'Arbitraje Comercial' }
  ];

  const [modules, setModules] = useState<Module[]>([
    {
      id: '1',
      title: 'Módulo 1: Introducción al Arbitraje',
      description: 'Fundamentos y conceptos básicos del arbitraje comercial',
      weight: 25,
      expanded: true,
      sessions: [
        {
          id: '1-1',
          title: 'Sesión 1: Fundamentos del Arbitraje',
          liveClass: {
            date: '2024-11-28',
            time: '18:00',
            duration: '2 horas',
            meetLink: 'https://meet.google.com/abc-defg-hij',
            teacherName: 'Dr. Carlos Mendoza',
            recordedVideo: {
              url: 'https://example.com/recordings/session-1-1.mp4',
              uploadedAt: '2024-11-28T22:30:00',
              uploadedBy: 'Dr. Carlos Mendoza'
            }
          },
          activities: [
            {
              id: 'q1',
              title: 'Quiz: Conceptos básicos',
              type: 'quiz',
              dueDate: '2024-12-08',
              duration: 30,
              graded: true,
              weight: 60,
              passingScore: 14,
              attempts: 2
            },
            {
              id: 'r1',
              title: 'Lectura: Marco legal del arbitraje',
              type: 'reading',
              graded: false
            }
          ],
          materials: [
            { title: 'Presentación - Introducción', type: 'PDF' },
            { title: 'Ley de Arbitraje', type: 'PDF' }
          ],
          expanded: true
        },
        {
          id: '1-2',
          title: 'Sesión 2: Principios y Características del Arbitraje',
          liveClass: {
            date: '2024-12-02',
            time: '19:00',
            duration: '2 horas',
            meetLink: 'https://meet.google.com/klm-nopq-rst',
            teacherName: 'Dra. María Torres'
          },
          activities: [],
          materials: [
            { title: 'Presentación - Principios', type: 'PDF' }
          ],
          expanded: false
        }
      ]
    },
    {
      id: '2',
      title: 'Módulo 2: Procedimientos y Práctica',
      description: 'Aplicación práctica de procedimientos arbitrales',
      weight: 35,
      expanded: true,
      evaluations: [
        {
          id: 'module-exam-1',
          title: 'Examen del Módulo 2 - Procedimientos Arbitrales',
          type: 'quiz',
          publishDate: '2024-12-20',
          dueDate: '2024-12-23',
          duration: 90,
          graded: true,
          weight: 40,
          passingScore: 75,
          attempts: 1,
          description: 'Examen integral que cubre todos los contenidos de las sesiones del Módulo 2'
        }
      ],
      sessions: [
        {
          id: '2-1',
          title: 'Sesión 1: Análisis de Casos y Procedimientos',
          liveClass: {
            date: '2024-12-12',
            time: '18:00',
            duration: '2 horas',
            meetLink: 'https://meet.google.com/xyz-abcd-efg'
          },
          activities: [
            {
              id: 'assignment-1',
              title: 'Tarea: Análisis de Convenio Arbitral',
              type: 'assignment',
              dueDate: '2024-12-15',
              graded: true,
              weight: 20,
              passingScore: 14,
              description: 'Redactar un análisis crítico de un convenio arbitral'
            },
            {
              id: 'forum-1',
              title: 'Foro: discusión sobre Procedimientos',
              type: 'forum',
              dueDate: '2024-12-16',
              graded: false,
              description: 'Debatir sobre las mejores prácticas en procedimientos arbitrales'
            },
            {
              id: 'case-study-1',
              title: 'Caso de Estudio: Controversia Comercial Internacional',
              type: 'case-study',
              dueDate: '2024-12-18',
              graded: true,
              weight: 30,
              passingScore: 75,
              isGroupWork: true,
              minGroupSize: 3,
              maxGroupSize: 4,
              allowChat: true,
              description: 'Análisis integral de una controversia comercial internacional'
            },
            {
              id: 'reading-control-1',
              title: 'Control de Lectura: Reglamento de Arbitraje',
              type: 'reading-control',
              dueDate: '2024-12-17',
              duration: 20,
              graded: true,
              weight: 15,
              passingScore: 14,
              attempts: 1
            },
            {
              id: 'survey-1',
              title: 'Encuesta: Evaluación del Módulo',
              type: 'survey',
              dueDate: '2024-12-19',
              graded: false,
              description: 'Evaluación de satisfacción y aprendizaje del módulo'
            }
          ],
          materials: [
            { title: 'Reglamento CCI de Arbitraje', type: 'PDF' },
            { title: 'Casos Prácticos Resueltos', type: 'PDF' },
            { title: 'Guía de Redacción', type: 'DOCX' }
          ],
          expanded: true
        }
      ]
    }
  ]);

  const [showAddModule, setShowAddModule] = useState(false);
  const [showAddSession, setShowAddSession] = useState<string | null>(null);
  const [showAddActivity, setShowAddActivity] = useState<{ moduleId: string; sessionId: string } | null>(null);
  const [showAddMaterial, setShowAddMaterial] = useState<{ moduleId: string; sessionId: string } | null>(null);
  const [showQuizCreator, setShowQuizCreator] = useState<{ moduleId: string; sessionId: string } | null>(null);
  const [showQuizGrading, setShowQuizGrading] = useState<{ quizId: string; quizTitle: string } | null>(null);
  const [showActivityLog, setShowActivityLog] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState<string | null>(null);
  const [uploadingThumbnail, setUploadingThumbnail] = useState<string | null>(null);
  const [showAddModuleEvaluation, setShowAddModuleEvaluation] = useState<string | null>(null); // Para evaluaciones a nivel de módulo
  
  // Estados para el registro de acciones
  const [activitySearchTerm, setActivitySearchTerm] = useState('');
  const [activityDateFrom, setActivityDateFrom] = useState('');
  const [activityDateTo, setActivityDateTo] = useState('');
  const [activityTypeFilter, setActivityTypeFilter] = useState<'all' | 'content' | 'student' | 'system'>('all');

  const [newModule, setNewModule] = useState({ title: '', description: '', weight: 0 });
  const [newSession, setNewSession] = useState({ title: '', hasLiveClass: false, teacherId: '' });
  const [newActivity, setNewActivity] = useState<Partial<Activity>>({
    title: '',
    type: 'quiz',
    publishDate: '', // Fecha de publicación obligatoria
    graded: true,
    weight: 0,
    passingScore: 14,
    attempts: 2,
    dueDate: '',
    duration: undefined,
    description: '',
    isGroupWork: false,
    maxGroupSize: 5,
    minGroupSize: 2,
    allowChat: true,
    questions: []
  });
  const [activityWizardStep, setActivityWizardStep] = useState(1); // 1: Info básica, 2: Preguntas (quiz/control), 3: Confirmación
  const [newMaterial, setNewMaterial] = useState({ 
    title: '', 
    type: 'PDF', 
    url: '', 
    uploadType: 'file' as 'file' | 'link',
    file: null as File | null,
    size: ''
  });

  // Mock data para registro de acciones del programa
  const courseActivities = [
    {
      id: 1,
      type: 'content',
      icon: 'upload',
      title: 'Nuevo contenido publicado',
      description: 'Se publicó el material "Introducción al Arbitraje.pdf" en Módulo 1 - Sesión 1',
      author: 'Dr. Carlos Méndez',
      timestamp: '2024-12-04 14:30',
      date: '2024-12-04'
    },
    {
      id: 2,
      type: 'student',
      icon: 'file',
      title: 'Entrega de tarea',
      description: 'Juan Pérez García envió la tarea "Análisis de caso práctico"',
      author: 'Juan Pérez García',
      timestamp: '2024-12-04 13:15',
      date: '2024-12-04'
    },
    {
      id: 3,
      type: 'content',
      icon: 'video',
      title: 'Clase en vivo finalizada',
      description: 'Se completó la clase "Fundamentos del Arbitraje" y la grabación está disponible',
      author: 'Sistema',
      timestamp: '2024-12-03 20:00',
      date: '2024-12-03'
    },
    {
      id: 4,
      type: 'student',
      icon: 'message',
      title: 'Nueva publicación en foro',
      description: 'María González publicó en el foro "Debate sobre arbitraje comercial"',
      author: 'María González',
      timestamp: '2024-12-03 16:45',
      date: '2024-12-03'
    },
    {
      id: 5,
      type: 'system',
      icon: 'bell',
      title: 'Anuncio publicado',
      description: 'Se publicó el anuncio "Importante: Fechas de evaluación final"',
      author: 'Dra. Ana Martínez',
      timestamp: '2024-12-03 10:00',
      date: '2024-12-03'
    },
    {
      id: 6,
      type: 'student',
      icon: 'file',
      title: 'Múltiples entregas',
      description: '12 estudiantes enviaron la tarea "Quiz: Conceptos básicos"',
      author: 'Sistema',
      timestamp: '2024-12-02 23:59',
      date: '2024-12-02'
    },
    {
      id: 7,
      type: 'content',
      icon: 'calendar',
      title: 'Clase programada',
      description: 'Nueva clase "Marco Legal del Arbitraje" programada para el 10 de diciembre',
      author: 'Dr. Carlos Méndez',
      timestamp: '2024-12-02 15:30',
      date: '2024-12-02'
    },
    {
      id: 8,
      type: 'system',
      icon: 'users',
      title: 'Nuevos estudiantes matriculados',
      description: '3 estudiantes fueron matriculados en el programa',
      author: 'Área Académica',
      timestamp: '2024-12-01 12:00',
      date: '2024-12-01'
    },
    {
      id: 9,
      type: 'student',
      icon: 'chat',
      title: 'Actividad en grupo',
      description: 'El Grupo 2 inició colaboración en "Análisis de resolución de controversias"',
      author: 'Grupo 2',
      timestamp: '2024-12-01 09:20',
      date: '2024-12-01'
    },
    {
      id: 10,
      type: 'content',
      icon: 'edit',
      title: 'Contenido actualizado',
      description: 'Se actualizó el syllabus del Módulo 2',
      author: 'Dra. Ana Martínez',
      timestamp: '2024-11-30 18:45',
      date: '2024-11-30'
    },
    {
      id: 11,
      type: 'student',
      icon: 'file',
      title: 'Nueva entrega de trabajo grupal',
      description: 'El Grupo 4 envió el trabajo "Análisis comparativo de sistemas de arbitraje"',
      author: 'Grupo 4',
      timestamp: '2024-11-30 15:20',
      date: '2024-11-30'
    },
    {
      id: 12,
      type: 'system',
      icon: 'calendar',
      title: 'Recordatorio automático enviado',
      description: 'Se envió recordatorio de próxima clase en vivo a 45 estudiantes',
      author: 'Sistema',
      timestamp: '2024-11-29 18:00',
      date: '2024-11-29'
    },
    {
      id: 13,
      type: 'content',
      icon: 'upload',
      title: 'Material complementario agregado',
      description: 'Se publicó "Casos prácticos de arbitraje internacional.pdf" en Módulo 3 - Sesión 2',
      author: 'Dr. Roberto Fernández',
      timestamp: '2024-11-29 11:45',
      date: '2024-11-29'
    },
    {
      id: 14,
      type: 'student',
      icon: 'message',
      title: 'Consulta respondida en foro',
      description: 'Dr. Carlos Méndez respondió la consulta de Pedro Ramírez sobre laudos arbitrales',
      author: 'Dr. Carlos Méndez',
      timestamp: '2024-11-28 16:30',
      date: '2024-11-28'
    },
    {
      id: 15,
      type: 'system',
      icon: 'bell',
      title: 'Configuración actualizada',
      description: 'Se actualizaron los criterios de evaluación del programa',
      author: 'Área Académica',
      timestamp: '2024-11-28 09:00',
      date: '2024-11-28'
    }
  ];

  // Filtrar actividades
  const filteredActivities = courseActivities.filter(activity => {
    const matchesSearch = activitySearchTerm === '' ||
      activity.title.toLowerCase().includes(activitySearchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(activitySearchTerm.toLowerCase()) ||
      activity.author.toLowerCase().includes(activitySearchTerm.toLowerCase());

    const matchesType = activityTypeFilter === 'all' || activity.type === activityTypeFilter;
    const matchesDateFrom = activityDateFrom === '' || activity.date >= activityDateFrom;
    const matchesDateTo = activityDateTo === '' || activity.date <= activityDateTo;

    return matchesSearch && matchesType && matchesDateFrom && matchesDateTo;
  });

  // Helper para verificar si una clase ya pasó
  const isClassFinished = (session: Session): boolean => {
    if (!session.liveClass || !session.liveClass.date || !session.liveClass.time) {
      return false;
    }
    
    const [hours, minutes] = session.liveClass.time.split(':').map(Number);
    const classDateTime = new Date(session.liveClass.date);
    classDateTime.setHours(hours, minutes, 0, 0);
    
    // Extraer duración en horas
    const durationMatch = session.liveClass.duration.match(/(\d+)/);
    const durationHours = durationMatch ? parseInt(durationMatch[1]) : 2;
    
    // Agregar la duración a la fecha/hora de inicio
    classDateTime.setHours(classDateTime.getHours() + durationHours);
    
    // Verificar si ya pasó
    return new Date() > classDateTime;
  };

  // Funciones para manejar la publicación del programa
  const handleSaveDraft = () => {
    setCourseStatus('draft');
    toast.success('Programa guardado como borrador.');
  };

  const handlePublishNow = () => {
    setCourseStatus('published');
    toast.success('Programa publicado exitosamente.');
  };

  const handleSchedulePublish = () => {
    if (!publicationDate) {
      toast.error('Por favor seleccione una fecha de publicación.');
      return;
    }
    setCourseStatus('scheduled');
    toast.success(`Programa programado para publicarse el ${new Date(publicationDate).toLocaleDateString('es-PE')}.`);
  };

  const toggleModule = (moduleId: string) => {
    setModules(modules.map(m =>
      m.id === moduleId ? { ...m, expanded: !m.expanded } : m
    ));
  };

  const toggleSession = (moduleId: string, sessionId: string) => {
    setModules(modules.map(m =>
      m.id === moduleId
        ? {
            ...m,
            sessions: m.sessions.map(s =>
              s.id === sessionId ? { ...s, expanded: !s.expanded } : s
            )
          }
        : m
    ));
  };

  const addModule = () => {
    if (!newModule.title) {
      toast.error('Ingrese un título para el módulo.');
      return;
    }

    const module: Module = {
      id: String(modules.length + 1),
      title: newModule.title,
      description: newModule.description,
      weight: newModule.weight,
      sessions: [],
      expanded: true
    };

    setModules([...modules, module]);
    setNewModule({ title: '', description: '', weight: 0 });
    setShowAddModule(false);
    toast.success('Módulo agregado.');
  };

  const addSession = (moduleId: string) => {
    if (!newSession.title) {
      toast.error('Ingrese un título para la sesión.');
      return;
    }

    if (newSession.hasLiveClass && !newSession.teacherId) {
      toast.error('Seleccione un docente para la clase en vivo.');
      return;
    }

    const selectedTeacher = availableTeachers.find(t => t.id === newSession.teacherId);

    const session: Session = {
      id: `${moduleId}-${Date.now()}`,
      title: newSession.title,
      liveClass: newSession.hasLiveClass ? {
        date: '',
        time: '',
        duration: '2 horas',
        teacherId: newSession.teacherId,
        teacherName: selectedTeacher?.name
      } : undefined,
      activities: [],
      materials: [],
      expanded: true
    };

    setModules(modules.map(m =>
      m.id === moduleId
        ? { ...m, sessions: [...m.sessions, session] }
        : m
    ));

    setNewSession({ title: '', hasLiveClass: false, teacherId: '' });
    setShowAddSession(null);
    toast.success('Sesión agregada.');
  };

  const addActivity = (moduleId: string, sessionId: string) => {
    if (!newActivity.title || !newActivity.type) {
      toast.error('Complete los campos requeridos.');
      return;
    }

    const activity: Activity = {
      id: `act-${Date.now()}`,
      title: newActivity.title!,
      type: newActivity.type!,
      publishDate: newActivity.publishDate!,
      graded: newActivity.graded || false,
      weight: newActivity.weight,
      passingScore: newActivity.passingScore,
      attempts: newActivity.attempts,
      dueDate: newActivity.dueDate,
      duration: newActivity.duration,
      description: newActivity.description,
      attachments: newActivity.attachments,
      isGroupWork: newActivity.isGroupWork,
      maxGroupSize: newActivity.maxGroupSize,
      minGroupSize: newActivity.minGroupSize,
      allowChat: newActivity.allowChat,
      groupAssignmentMethod: newActivity.groupAssignmentMethod,
      manualGroups: newActivity.manualGroups,
      questions: newActivity.questions,
      timeLimit: newActivity.timeLimit,
      shuffleQuestions: newActivity.shuffleQuestions,
      questionsToShow: newActivity.questionsToShow,
      shuffleOptions: newActivity.shuffleOptions,
      showCorrectAnswers: newActivity.showCorrectAnswers,
      showExplanations: newActivity.showExplanations
    };

    setModules(modules.map(m =>
      m.id === moduleId
        ? {
            ...m,
            sessions: m.sessions.map(s =>
              s.id === sessionId
                ? { ...s, activities: [...s.activities, activity] }
                : s
            )
          }
        : m
    ));

    setNewActivity({
      title: '',
      type: 'quiz',
      publishDate: '',
      graded: true,
      weight: 0,
      passingScore: 14,
      attempts: 2,
      dueDate: '',
      duration: undefined,
      description: '',
      isGroupWork: false,
      maxGroupSize: 5,
      minGroupSize: 2,
      allowChat: true,
      questions: []
    });
    setShowAddActivity(null);
    setActivityWizardStep(1);
    toast.success('Actividad agregada.');
  };

  const addModuleEvaluation = (moduleId: string) => {
    if (!newActivity.title || !newActivity.type) {
      toast.error('Complete los campos requeridos.');
      return;
    }

    const evaluation: Activity = {
      id: `module-eval-${Date.now()}`,
      title: newActivity.title!,
      type: newActivity.type!,
      publishDate: newActivity.publishDate!,
      graded: newActivity.graded || false,
      weight: newActivity.weight,
      passingScore: newActivity.passingScore,
      attempts: newActivity.attempts,
      dueDate: newActivity.dueDate,
      duration: newActivity.duration,
      description: newActivity.description,
      questions: newActivity.questions
    };

    setModules(modules.map(m =>
      m.id === moduleId
        ? { ...m, evaluations: [...(m.evaluations || []), evaluation] }
        : m
    ));

    setNewActivity({
      title: '',
      type: 'quiz',
      publishDate: '',
      graded: true,
      weight: 0,
      passingScore: 14,
      attempts: 2,
      dueDate: '',
      duration: undefined,
      description: '',
      isGroupWork: false,
      maxGroupSize: 5,
      minGroupSize: 2,
      allowChat: true,
      questions: []
    });
    setShowAddModuleEvaluation(null);
    setActivityWizardStep(1);
    toast.success('Evaluación de módulo agregada.');
  };

  const deleteModuleEvaluation = (moduleId: string, evaluationId: string) => {
    if (confirm('¿Está seguro de eliminar esta evaluación de módulo?')) {
      setModules(modules.map(m =>
        m.id === moduleId
          ? { ...m, evaluations: (m.evaluations || []).filter(e => e.id !== evaluationId) }
          : m
      ));
      toast.success('Evaluación eliminada.');
    }
  };

  const addMaterial = (moduleId: string, sessionId: string) => {
    if (!newMaterial.title) {
      toast.error('Ingrese un título para el material.');
      return;
    }

    if (newMaterial.uploadType === 'file' && !newMaterial.file) {
      toast.error('Seleccione un archivo para subir.');
      return;
    }

    if (newMaterial.uploadType === 'link' && !newMaterial.url) {
      toast.error('Ingrese la URL del material.');
      return;
    }

    const material = {
      title: newMaterial.title,
      type: newMaterial.type,
      url: newMaterial.uploadType === 'file' && newMaterial.file 
        ? URL.createObjectURL(newMaterial.file) 
        : newMaterial.url,
      size: newMaterial.size
    };

    setModules(modules.map(m =>
      m.id === moduleId
        ? {
            ...m,
            sessions: m.sessions.map(s =>
              s.id === sessionId
                ? { ...s, materials: [...s.materials, material] }
                : s
            )
          }
        : m
    ));

    setNewMaterial({ 
      title: '', 
      type: 'PDF', 
      url: '', 
      uploadType: 'file',
      file: null,
      size: ''
    });
    setShowAddMaterial(null);
    toast.success('Material agregado.');
  };

  const deleteModule = (moduleId: string) => {
    if (confirm('¿Eliminar este módulo y todo su contenido?')) {
      setModules(modules.filter(m => m.id !== moduleId));
      toast.success('Módulo eliminado.');
    }
  };

  const deleteSession = (moduleId: string, sessionId: string) => {
    if (confirm('¿Eliminar esta sesión?')) {
      setModules(modules.map(m =>
        m.id === moduleId
          ? { ...m, sessions: m.sessions.filter(s => s.id !== sessionId) }
          : m
      ));
      toast.success('Sesión eliminada.');
    }
  };

  const handleUploadRecordedVideo = (moduleId: string, sessionId: string) => {
    setUploadingVideo(sessionId);
    
    // Simular subida de video
    setTimeout(() => {
      setModules(modules.map(m =>
        m.id === moduleId
          ? {
              ...m,
              sessions: m.sessions.map(s =>
                s.id === sessionId && s.liveClass
                  ? {
                      ...s,
                      liveClass: {
                        ...s.liveClass,
                        recordedVideo: {
                          url: 'https://example.com/recordings/uploaded-video.mp4',
                          uploadedAt: new Date().toISOString(),
                          uploadedBy: 'Área Académica'
                        }
                      }
                    }
                  : s
              )
            }
          : m
      ));
      
      setUploadingVideo(null);
      toast.success('Video de clase grabada subido exitosamente.');
    }, 2000);
  };

  const handleDeleteRecordedVideo = (moduleId: string, sessionId: string) => {
    if (confirm('¿Está seguro de que desea eliminar la grabación de esta clase?')) {
      setModules(modules.map(m =>
        m.id === moduleId
          ? {
              ...m,
              sessions: m.sessions.map(s =>
                s.id === sessionId && s.liveClass
                  ? {
                      ...s,
                      liveClass: {
                        ...s.liveClass,
                        recordedVideo: undefined
                      }
                    }
                  : s
              )
            }
          : m
      ));
      toast.success('Grabación eliminada exitosamente.');
    }
  };

  const handleUploadThumbnail = (moduleId: string, sessionId: string) => {
    setUploadingThumbnail(sessionId);
    
    // Simular subida de miniatura
    setTimeout(() => {
      setModules(modules.map(m =>
        m.id === moduleId
          ? {
              ...m,
              sessions: m.sessions.map(s =>
                s.id === sessionId && s.liveClass?.recordedVideo
                  ? {
                      ...s,
                      liveClass: {
                        ...s.liveClass,
                        recordedVideo: {
                          ...s.liveClass.recordedVideo,
                          thumbnailUrl: 'https://example.com/thumbnails/thumbnail-' + sessionId + '.jpg'
                        }
                      }
                    }
                  : s
              )
            }
          : m
      ));
      
      setUploadingThumbnail(null);
      toast.success('Miniatura subida exitosamente.');
    }, 1500);
  };

  const handleDeleteThumbnail = (moduleId: string, sessionId: string) => {
    if (confirm('¿Está seguro de que desea eliminar la miniatura?')) {
      setModules(modules.map(m =>
        m.id === moduleId
          ? {
              ...m,
              sessions: m.sessions.map(s =>
                s.id === sessionId && s.liveClass?.recordedVideo
                  ? {
                      ...s,
                      liveClass: {
                        ...s.liveClass,
                        recordedVideo: {
                          ...s.liveClass.recordedVideo,
                          thumbnailUrl: undefined
                        }
                      }
                    }
                  : s
              )
            }
          : m
      ));
      toast.success('Miniatura eliminada exitosamente.');
    }
  };

  const deleteActivity = (moduleId: string, sessionId: string, activityId: string) => {
    if (confirm('¿Eliminar esta actividad?')) {
      setModules(modules.map(m =>
        m.id === moduleId
          ? {
              ...m,
              sessions: m.sessions.map(s =>
                s.id === sessionId
                  ? { ...s, activities: s.activities.filter(a => a.id !== activityId) }
                  : s
              )
            }
          : m
      ));
      toast.success('Actividad eliminada.');
    }
  };

  const deleteMaterial = (moduleId: string, sessionId: string, materialIndex: number) => {
    if (confirm('¿Eliminar este material?')) {
      setModules(modules.map(m =>
        m.id === moduleId
          ? {
              ...m,
              sessions: m.sessions.map(s =>
                s.id === sessionId
                  ? { ...s, materials: s.materials.filter((_, i) => i !== materialIndex) }
                  : s
              )
            }
          : m
      ));
      toast.success('Material eliminado.');
    }
  };

  const getActivityIcon = (type: ActivityType) => {
    const icons: Record<ActivityType, any> = {
      'quiz': CheckSquare,
      'assignment': FileText,
      'reading': BookOpen,
      'forum': MessageSquare,
      'case-study': Users,
      'reading-control': BookOpen,
      'survey': CheckSquare
    };
    return icons[type] || FileText;
  };

  const getActivityColor = (type: ActivityType) => {
    const colors: Record<ActivityType, string> = {
      'quiz': 'bg-blue-50 text-[#0B95BA]',
      'assignment': 'bg-blue-50 text-[#0B95BA]',
      'reading': 'bg-blue-50 text-[#0B95BA]',
      'forum': 'bg-blue-50 text-[#0B95BA]',
      'case-study': 'bg-blue-50 text-[#0B95BA]',
      'reading-control': 'bg-blue-50 text-[#0B95BA]',
      'survey': 'bg-gray-100 text-gray-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const getActivityLabel = (type: ActivityType) => {
    const labels: Record<ActivityType, string> = {
      'quiz': 'Cuestionario',
      'assignment': 'Tarea',
      'reading': 'Lectura',
      'forum': 'Foro',
      'case-study': 'Caso práctico',
      'reading-control': 'Control de lectura',
      'survey': 'Encuesta'
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={onBack}
            className="mb-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Constructor de Contenido</h1>
          <p className="text-gray-600 mt-1">Módulos → Sesiones → Actividades</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowFrequencyModal(true)}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Frecuencia
          </button>
          <button
            onClick={() => setShowActivityLog(!showActivityLog)}
            className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
          >
            <Bell className="w-5 h-5" />
            Registro de acciones
          </button>
          <button
            onClick={() => setShowAddModule(true)}
            className="px-6 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-xl transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Agregar módulo
          </button>
        </div>
      </div>

      {/* Course Info */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Diplomado en Arbitraje Comercial Internacional</h2>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>{modules.length} módulos</span>
          </div>
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            <span>{modules.reduce((acc, m) => acc + m.sessions.length, 0)} sesiones</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4" />
            <span>
              {modules.reduce((acc, m) => 
                acc + m.sessions.reduce((acc2, s) => acc2 + s.activities.length, 0), 0
              )} actividades
            </span>
          </div>
        </div>
      </div>

      {/* Activity Log Modal */}
      {showActivityLog && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
          onClick={() => setShowActivityLog(false)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Registro de acciones del programa</h2>
                  <p className="text-sm text-purple-100">Este historial registra de forma automática las acciones relevantes del programa —como la publicación de contenido, las actividades y entregas de estudiantes, las clases completadas, los anuncios, las matrículas y las modificaciones del curso— y permite filtrar la información por fecha.</p>
                </div>
              </div>
              <button
                onClick={() => setShowActivityLog(false)}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <div className="space-y-6">
              {/* Filtros */}
              <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                {/* Buscador */}
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar por título, descripción o autor..."
                      value={activitySearchTerm}
                      onChange={(e) => setActivitySearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Filtros de fecha y tipo */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Desde
                </label>
                <input
                  type="date"
                  value={activityDateFrom}
                  onChange={(e) => setActivityDateFrom(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hasta
                </label>
                <input
                  type="date"
                  value={activityDateTo}
                  onChange={(e) => setActivityDateTo(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registro de acciones
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActivityTypeFilter('all')}
                    className={`flex-1 px-4 py-2 rounded-xl font-medium transition-colors ${
                      activityTypeFilter === 'all'
                        ? 'bg-[#0B95BA] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setActivityTypeFilter('content')}
                    className={`flex-1 px-4 py-2 rounded-xl font-medium transition-colors ${
                      activityTypeFilter === 'content'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Contenido
                  </button>
                  <button
                    onClick={() => setActivityTypeFilter('student')}
                    className={`flex-1 px-4 py-2 rounded-xl font-medium transition-colors ${
                      activityTypeFilter === 'student'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Estudiantes
                  </button>
                  <button
                    onClick={() => setActivityTypeFilter('system')}
                    className={`flex-1 px-4 py-2 rounded-xl font-medium transition-colors ${
                      activityTypeFilter === 'system'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Sistema
                  </button>
                </div>
                </div>
              </div>

                {/* Estadísticas rápidas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t-2 border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {courseActivities.filter(n => n.type === 'content').length}
                </div>
                <div className="text-sm text-gray-600">Contenido</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {courseActivities.filter(n => n.type === 'student').length}
                </div>
                <div className="text-sm text-gray-600">Estudiantes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {courseActivities.filter(n => n.type === 'system').length}
                </div>
                <div className="text-sm text-gray-600">Sistema</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0B95BA]">
                  {filteredActivities.length}
                </div>
                  <div className="text-sm text-gray-600">Resultados</div>
                </div>
              </div>
              </div>

              {/* Lista de actividades */}
              <div className="bg-white rounded-2xl border-2 border-gray-200 divide-y-2 divide-gray-200">
                {filteredActivities.length === 0 ? (
                  <div className="p-12 text-center">
                    <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">No se encontraron registros</h3>
                    <p className="text-gray-600">
                      No hay actividad que coincida con los filtros seleccionados
                    </p>
                  </div>
                ) : (
                  filteredActivities.map((activity) => {
                    const getIconComponent = (iconType: string) => {
                      switch (iconType) {
                        case 'upload': return Upload;
                        case 'file': return FileText;
                        case 'video': return Video;
                        case 'message': return Mail;
                        case 'bell': return Bell;
                        case 'calendar': return Calendar;
                        case 'users': return Users;
                        case 'chat': return Mail;
                        case 'edit': return FileText;
                        default: return Bell;
                      }
                    };

                    const getTypeColor = (type: string) => {
                      switch (type) {
                        case 'content': return 'bg-blue-100 text-blue-700';
                        case 'student': return 'bg-green-100 text-green-700';
                        case 'system': return 'bg-purple-100 text-purple-700';
                        default: return 'bg-gray-100 text-gray-700';
                      }
                    };

                    const getTypeLabel = (type: string) => {
                      switch (type) {
                        case 'content': return 'Contenido';
                        case 'student': return 'Estudiante';
                        case 'system': return 'Sistema';
                        default: return 'General';
                      }
                    };

                    const IconComponent = getIconComponent(activity.icon);

                    return (
                      <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getTypeColor(activity.type)}`}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h3 className="font-bold text-gray-900">{activity.title}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getTypeColor(activity.type)}`}>
                                {getTypeLabel(activity.type)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 mb-3">{activity.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span>{activity.author}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{activity.timestamp}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Información adicional */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-blue-900 mb-1">
                      Registro automático de actividad
                    </h3>
                    <p className="text-sm text-blue-700">
                      Este historial registra automáticamente todas las acciones relevantes del programa: 
                      publicación de contenido, entregas de estudiantes, clases completadas, anuncios, 
                      matrículas y cambios en el programa. Use los filtros de fecha para consultar períodos específicos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      )}

      {/* Frequency Configuration Modal */}
      {showFrequencyModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
          onClick={() => setShowFrequencyModal(false)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Configuración de frecuencia del programa</h2>
                    <p className="text-sm text-purple-100 mt-1">Configure la frecuencia y días de las clases en vivo para todo el programa</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowFrequencyModal(false)}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Frecuencia de clases
                    </label>
                    <select
                      value={courseFrequency}
                      onChange={(e) => {
                        setCourseFrequency(e.target.value as 'unica' | 'semanal' | 'quincenal' | 'mensual');
                        if (e.target.value === 'unica') {
                          setCourseRecurringDays([]);
                        }
                      }}
                      className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    >
                      <option value="unica">Clase única</option>
                      <option value="semanal">Semanal</option>
                      <option value="quincenal">Quincenal</option>
                      <option value="mensual">Mensual</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-2">
                      Esta configuración aplicará a todas las clases en vivo del programa
                    </p>
                  </div>

                  {courseFrequency !== 'unica' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Días de la semana
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: 'Lun', value: 'lunes' },
                          { label: 'Mar', value: 'martes' },
                          { label: 'Mié', value: 'miercoles' },
                          { label: 'Jue', value: 'jueves' },
                          { label: 'Vie', value: 'viernes' },
                          { label: 'Sáb', value: 'sabado' },
                          { label: 'Dom', value: 'domingo' }
                        ].map(day => {
                          const isSelected = courseRecurringDays.includes(day.value);
                          return (
                            <button
                              key={day.value}
                              type="button"
                              onClick={() => {
                                if (isSelected) {
                                  setCourseRecurringDays(courseRecurringDays.filter(d => d !== day.value));
                                } else {
                                  setCourseRecurringDays([...courseRecurringDays, day.value]);
                                }
                              }}
                              className={`px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
                                isSelected
                                  ? 'bg-purple-600 text-white border-purple-600'
                                  : 'bg-white text-gray-700 border-gray-200 hover:border-purple-600'
                              }`}
                            >
                              {day.label}
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Seleccione los días en los que se impartirán las clases del programa
                      </p>
                    </div>
                  )}
                </div>

                {courseFrequency !== 'unica' && courseRecurringDays.length > 0 && (
                  <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-purple-900">
                        <p className="font-medium">Configuración actual:</p>
                        <p className="mt-1">
                          Las clases se impartirán de forma <span className="font-bold">{courseFrequency}</span> los días:{' '}
                          <span className="font-bold">
                            {courseRecurringDays.map(day => day.charAt(0).toUpperCase() + day.slice(1)).join(', ')}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t-2 border-gray-200 p-6 flex justify-end gap-3 flex-shrink-0">
              <button
                onClick={() => setShowFrequencyModal(false)}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowFrequencyModal(false);
                  toast.success('Configuración de frecuencia guardada correctamente.');
                }}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                Guardar configuración
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modules List */}
      <div className="space-y-4">
        {modules.map((module) => (
          <div key={module.id} className="bg-white rounded-2xl border border-[#DBDBDB] overflow-hidden">
            {/* Module Header */}
            <div className="bg-[#0B95BA] p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="p-2 hover:bg-[#0995B0] rounded-lg transition-colors"
                  >
                    {module.expanded ? (
                      <ChevronDown className="w-6 h-6 text-white" />
                    ) : (
                      <ChevronRight className="w-6 h-6 text-white" />
                    )}
                  </button>
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-7 h-7 text-[#0B95BA]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-white">{module.title}</h3>
                      {module.weight !== undefined && module.weight > 0 && (
                        <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium">
                          {module.weight}% del programa
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddSession(module.id)}
                    className="px-4 py-2 bg-white hover:bg-gray-100 text-[#0B95BA] font-medium rounded-lg transition-colors text-sm"
                  >
                    + Sesión
                  </button>
                  <button
                    onClick={() => deleteModule(module.id)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-white hover:text-red-200" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sessions */}
            {module.expanded && (
              <div className="p-6 space-y-4">
                {/* Evaluaciones de Módulo */}
                <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-5 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                        <CheckSquare className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-orange-900">Evaluaciones del Módulo</h4>
                        <p className="text-sm text-orange-700">Exámenes que cubren múltiples sesiones</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowAddModuleEvaluation(module.id)}
                      className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors text-sm flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Agregar evaluación
                    </button>
                  </div>

                  {module.evaluations && module.evaluations.length > 0 ? (
                    <div className="space-y-3">
                      {module.evaluations.map((evaluation) => (
                        <div key={evaluation.id} className="bg-white border border-orange-200 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h5 className="font-bold text-gray-900">{evaluation.title}</h5>
                                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                                  {evaluation.type === 'quiz' ? 'Examen' : evaluation.type}
                                </span>
                                {evaluation.graded && evaluation.weight && (
                                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                    {evaluation.weight}% del módulo
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                {evaluation.publishDate && (
                                  <span>Fecha de inicio: {new Date(evaluation.publishDate).toLocaleDateString('es-PE')}</span>
                                )}
                                {evaluation.dueDate && (
                                  <span>Fecha de fin: {new Date(evaluation.dueDate).toLocaleDateString('es-PE')}</span>
                                )}
                                {evaluation.duration && (
                                  <span>Duración: {evaluation.duration} min</span>
                                )}
                                {evaluation.attempts && (
                                  <span>Intentos: {evaluation.attempts}</span>
                                )}
                              </div>
                              {evaluation.description && (
                                <p className="text-sm text-gray-600 mt-2">{evaluation.description}</p>
                              )}
                            </div>
                            <button
                              onClick={() => deleteModuleEvaluation(module.id, evaluation.id)}
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors ml-4"
                            >
                              <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-600" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-orange-600 text-center py-3">
                      No hay evaluaciones de módulo. Agrega exámenes que evalúen contenido de múltiples sesiones.
                    </p>
                  )}
                </div>

                {/* Sesiones */}
                {module.sessions.map((session) => (
                  <div key={session.id} className="rounded-xl border border-[#DBDBDB] overflow-hidden">
                    {/* Session Header */}
                    <div className="p-5 bg-white border-l-8 border-l-[#0B95BA]">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <button
                            onClick={() => toggleSession(module.id, session.id)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            {session.expanded ? (
                              <ChevronDown className="w-5 h-5 text-gray-600" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-600" />
                            )}
                          </button>
                          <div className="w-12 h-12 bg-[#0B95BA] rounded-full flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-2">{session.title}</h4>
                            {session.liveClass && (
                              <div className="space-y-3">
                                <div className="flex flex-wrap items-center gap-4 text-sm">
                                  <div className="flex items-center gap-1 text-gray-600">
                                    <Video className={`w-4 h-4 ${session.liveClass.recordedVideo ? 'text-[#0B95BA]' : 'text-red-600'}`} />
                                    <span className={`font-medium ${session.liveClass.recordedVideo ? 'text-[#0B95BA]' : 'text-red-600'}`}>
                                      {session.liveClass.recordedVideo ? 'Clase grabada' : 'Clase en vivo'}
                                    </span>
                                  </div>
                                  {session.liveClass.teacherName && (
                                    <div className="flex items-center gap-1 text-gray-600">
                                      <User className="w-4 h-4 text-[#0B95BA]" />
                                      <span className="font-medium text-[#0B95BA]">{session.liveClass.teacherName}</span>
                                    </div>
                                  )}
                                  {session.liveClass.date && (
                                    <div className="flex items-center gap-1 text-gray-600">
                                      <Calendar className="w-4 h-4" />
                                      <span>{new Date(session.liveClass.date).toLocaleDateString('es-PE', {
                                        weekday: 'short',
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                      })}</span>
                                    </div>
                                  )}
                                  {session.liveClass.time && (
                                    <div className="flex items-center gap-1 text-gray-600">
                                      <Clock className="w-4 h-4" />
                                      <span>{session.liveClass.time} ({session.liveClass.duration})</span>
                                    </div>
                                  )}
                                </div>
                                
                                {/* Estado de video grabado */}
                                {isClassFinished(session) && (
                                  <div className="flex items-center gap-3 flex-wrap">
                                    {session.liveClass.recordedVideo ? (
                                      <>
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                                          <CheckCircle className="w-4 h-4 text-green-600" />
                                          <span className="text-sm text-green-700 font-medium">
                                            Video subido el {new Date(session.liveClass.recordedVideo.uploadedAt).toLocaleDateString('es-PE')}
                                          </span>
                                        </div>
                                        {session.liveClass.recordedVideo.thumbnailUrl ? (
                                          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg">
                                            <CheckCircle className="w-4 h-4 text-blue-600" />
                                            <span className="text-sm text-blue-700 font-medium">
                                              Miniatura configurada
                                            </span>
                                          </div>
                                        ) : null}
                                        <button
                                          onClick={() => handleDeleteRecordedVideo(module.id, session.id)}
                                          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                          Eliminar grabación
                                        </button>
                                        {session.liveClass.recordedVideo.thumbnailUrl ? (
                                          <button
                                            onClick={() => handleDeleteThumbnail(module.id, session.id)}
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-medium"
                                          >
                                            <Trash2 className="w-4 h-4" />
                                            Eliminar miniatura
                                          </button>
                                        ) : (
                                          <button
                                            onClick={() => handleUploadThumbnail(module.id, session.id)}
                                            disabled={uploadingThumbnail === session.id}
                                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                          >
                                            <Upload className="w-4 h-4" />
                                            {uploadingThumbnail === session.id ? 'Subiendo miniatura...' : 'Subir miniatura'}
                                          </button>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        {!session.liveClass.recordedVideo && session.liveClass.meetLink && (
                                          <a
                                            href={session.liveClass.meetLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                                          >
                                            <Video className="w-4 h-4" />
                                            Iniciar reunión
                                          </a>
                                        )}
                                        <button
                                          onClick={() => handleUploadRecordedVideo(module.id, session.id)}
                                          disabled={uploadingVideo === session.id}
                                          className="flex items-center gap-2 px-4 py-2 bg-[#0B95BA] hover:bg-[#087A98] text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                          <Upload className="w-4 h-4" />
                                          {uploadingVideo === session.id ? 'Subiendo video...' : 'Subir video grabado'}
                                        </button>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setShowAddActivity({ moduleId: module.id, sessionId: session.id })}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm"
                          >
                            + Actividad
                          </button>
                          <button
                            onClick={() => setShowAddMaterial({ moduleId: module.id, sessionId: session.id })}
                            className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors text-sm"
                          >
                            + Material
                          </button>
                          <button
                            onClick={() => deleteSession(module.id, session.id)}
                            className="p-1.5 hover:bg-red-100 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Session Content */}
                    {session.expanded && (
                      <div className="p-5 space-y-4">
                        {/* Live Class Configuration */}
                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="font-bold text-blue-900 flex items-center gap-2">
                              <Video className="w-5 h-5" />
                              Programación de Clase en vivo
                            </h5>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-blue-900 mb-2">
                                Docente
                              </label>
                              <select
                                value={session.liveClass?.teacherId || ''}
                                onChange={(e) => {
                                  const selectedTeacher = availableTeachers.find(t => t.id === e.target.value);
                                  setModules(modules.map(m =>
                                    m.id === module.id
                                      ? {
                                          ...m,
                                          sessions: m.sessions.map(s =>
                                            s.id === session.id
                                              ? {
                                                  ...s,
                                                  liveClass: {
                                                    ...s.liveClass,
                                                    date: s.liveClass?.date || '',
                                                    time: s.liveClass?.time || '',
                                                    duration: s.liveClass?.duration || '2 horas',
                                                    meetLink: s.liveClass?.meetLink,
                                                    teacherId: e.target.value,
                                                    teacherName: selectedTeacher?.name
                                                  }
                                                }
                                              : s
                                          )
                                        }
                                      : m
                                  ));
                                }}
                                className="w-full px-4 py-2 pr-10 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                              >
                                <option value="">Seleccione un profesor</option>
                                {availableTeachers.map(teacher => (
                                  <option key={teacher.id} value={teacher.id}>
                                    {teacher.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-blue-900 mb-2">
                                Fecha de la clase
                              </label>
                              <input
                                type="date"
                                value={session.liveClass?.date || ''}
                                onChange={(e) => {
                                  setModules(modules.map(m =>
                                    m.id === module.id
                                      ? {
                                          ...m,
                                          sessions: m.sessions.map(s =>
                                            s.id === session.id
                                              ? {
                                                  ...s,
                                                  liveClass: {
                                                    ...s.liveClass,
                                                    date: e.target.value,
                                                    time: s.liveClass?.time || '',
                                                    duration: s.liveClass?.duration || '2 horas',
                                                    meetLink: s.liveClass?.meetLink
                                                  }
                                                }
                                              : s
                                          )
                                        }
                                      : m
                                  ));
                                }}
                                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-blue-900 mb-2">
                                Hora de inicio
                              </label>
                              <input
                                type="time"
                                value={session.liveClass?.time || ''}
                                onChange={(e) => {
                                  setModules(modules.map(m =>
                                    m.id === module.id
                                      ? {
                                          ...m,
                                          sessions: m.sessions.map(s =>
                                            s.id === session.id
                                              ? {
                                                  ...s,
                                                  liveClass: {
                                                    date: s.liveClass?.date || '',
                                                    time: e.target.value,
                                                    duration: s.liveClass?.duration || '2 horas',
                                                    meetLink: s.liveClass?.meetLink
                                                  }
                                                }
                                              : s
                                          )
                                        }
                                      : m
                                  ));
                                }}
                                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                              <label className="block text-sm font-medium text-blue-900 mb-2">
                                Duración
                              </label>
                              <select
                                value={session.liveClass?.duration || '2 horas'}
                                onChange={(e) => {
                                  setModules(modules.map(m =>
                                    m.id === module.id
                                      ? {
                                          ...m,
                                          sessions: m.sessions.map(s =>
                                            s.id === session.id
                                              ? {
                                                  ...s,
                                                  liveClass: {
                                                    date: s.liveClass?.date || '',
                                                    time: s.liveClass?.time || '',
                                                    duration: e.target.value,
                                                    meetLink: s.liveClass?.meetLink
                                                  }
                                                }
                                              : s
                                          )
                                        }
                                      : m
                                  ));
                                }}
                                className="w-full px-4 py-2 pr-10 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                              >
                                <option value="1 hora">1 hora</option>
                                <option value="1.5 horas">1.5 horas</option>
                                <option value="2 horas">2 horas</option>
                                <option value="2.5 horas">2.5 horas</option>
                                <option value="3 horas">3 horas</option>
                                <option value="4 horas">4 horas</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-blue-900 mb-2">
                                Link de clase
                              </label>
                              <input
                                type="url"
                                value={session.liveClass?.meetLink || ''}
                                onChange={(e) => {
                                  setModules(modules.map(m =>
                                    m.id === module.id
                                      ? {
                                          ...m,
                                          sessions: m.sessions.map(s =>
                                            s.id === session.id
                                              ? {
                                                  ...s,
                                                  liveClass: {
                                                    date: s.liveClass?.date || '',
                                                    time: s.liveClass?.time || '',
                                                    duration: s.liveClass?.duration || '2 horas',
                                                    meetLink: e.target.value
                                                  }
                                                }
                                              : s
                                          )
                                        }
                                      : m
                                  ));
                                }}
                                placeholder="https://meet.google.com/xxx-xxxx-xxx"
                                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                              />
                            </div>
                          </div>

                          <div className="mt-3 flex items-center gap-2 text-sm text-blue-700">
                            <Video className="w-4 h-4" />
                            <span>La clase cambiará a "Grabada" automáticamente después de la fecha programada.</span>
                          </div>
                        </div>

                        {/* Activities Section */}
                        <div>
                          <h5 className="font-bold text-gray-900 mb-3">Actividades</h5>
                          {session.activities.length === 0 ? (
                            <p className="text-gray-500 text-sm text-center py-4">
                              No hay actividades. Haz clic en "+ Actividad" para agregar.
                            </p>
                          ) : (
                            <div className="space-y-2">
                              {session.activities.map((activity) => {
                                const Icon = getActivityIcon(activity.type);
                                return (
                                  <div
                                    key={activity.id}
                                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#0B95BA] transition-colors"
                                  >
                                    <div className="flex items-center gap-3 flex-1">
                                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getActivityColor(activity.type)}`}>
                                        <Icon className="w-5 h-5" />
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <h6 className="font-medium text-gray-900">{activity.title}</h6>
                                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getActivityColor(activity.type)}`}>
                                            {getActivityLabel(activity.type)}
                                          </span>
                                          {activity.graded && (
                                            <span className="px-2 py-0.5 bg-blue-50 text-[#0B95BA] rounded-full text-xs font-medium">
                                              Calificable
                                            </span>
                                          )}
                                          {activity.graded && activity.weight !== undefined && activity.weight > 0 && (
                                            <span className="px-2 py-0.5 bg-blue-100 text-[#087A98] rounded-full text-xs font-medium">
                                              {activity.weight}% del módulo
                                            </span>
                                          )}
                                          {activity.isGroupWork && (
                                            <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium flex items-center gap-1">
                                              <Users className="w-3 h-3" />
                                              Trabajo en Grupo
                                            </span>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-gray-600">
                                          {activity.dueDate && (
                                            <span>Vence: {new Date(activity.dueDate).toLocaleDateString('es-PE')}</span>
                                          )}
                                          {activity.duration && <span>Duración: {activity.duration} min</span>}
                                          {activity.passingScore && <span>Puntaje mín: {activity.passingScore}</span>}
                                          {activity.attempts && <span>Intentos: {activity.attempts}</span>}
                                          {activity.attachments && activity.attachments.length > 0 && (
                                            <span className="flex items-center gap-1">
                                              <FileText className="w-3 h-3" />
                                              {activity.attachments.length} archivo(s)
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {activity.type === 'quiz' && activity.graded && (
                                        <button 
                                          onClick={() => {
                                            setShowQuizGrading({ quizId: activity.id, quizTitle: activity.title });
                                          }}
                                          className="px-3 py-2 bg-[#0B95BA] hover:bg-[#087A98] text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                                        >
                                          <CheckCircle className="w-4 h-4" />
                                          Calificar
                                        </button>
                                      )}
                                      <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                                        <Edit className="w-4 h-4 text-gray-600" />
                                      </button>
                                      <button
                                        onClick={() => deleteActivity(module.id, session.id, activity.id)}
                                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                                      >
                                        <Trash2 className="w-4 h-4 text-gray-600" />
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* Materials Section */}
                        <div>
                          <h5 className="font-bold text-gray-900 mb-3">Materiales</h5>
                          {session.materials.length === 0 ? (
                            <p className="text-gray-500 text-sm text-center py-4">
                              No hay materiales. Haz clic en "+ Material" para agregar.
                            </p>
                          ) : (
                            <div className="space-y-2">
                              {session.materials.map((material, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#0B95BA] transition-colors"
                                >
                                  <div className="flex items-center gap-3 flex-1">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                      <FileText className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <h6 className="font-medium text-gray-900">{material.title}</h6>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700`}>
                                          {material.type}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-4 text-xs text-gray-600">
                                        {material.size && (
                                          <span>{material.size}</span>
                                        )}
                                        {material.url && (
                                          <a
                                            href={material.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-700 underline"
                                          >
                                            Abrir archivo
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => deleteMaterial(module.id, session.id, index)}
                                      className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4 text-gray-600" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Add Session Form */}
                {showAddSession === module.id && (
                  <div className="p-5 border-2 border-dashed border-[#0B95BA] rounded-xl bg-blue-50">
                    <h4 className="font-bold text-gray-900 mb-4">Nueva sesión</h4>
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={newSession.title}
                        onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
                        placeholder="Título de la sesión"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B95BA]"
                      />
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={newSession.hasLiveClass}
                          onChange={(e) => setNewSession({ ...newSession, hasLiveClass: e.target.checked, teacherId: '' })}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-700">Incluir clase en vivo</span>
                      </label>
                      
                      {newSession.hasLiveClass && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Docente asignado *
                          </label>
                          <select
                            value={newSession.teacherId}
                            onChange={(e) => setNewSession({ ...newSession, teacherId: e.target.value })}
                            className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B95BA]"
                          >
                            <option value="">Seleccione un profesor</option>
                            {availableTeachers.map(teacher => (
                              <option key={teacher.id} value={teacher.id}>
                                {teacher.name} - {teacher.specialty}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => addSession(module.id)}
                          className="px-4 py-2 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-lg transition-colors"
                        >
                          Agregar
                        </button>
                        <button
                          onClick={() => setShowAddSession(null)}
                          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Add Module Form */}
        {showAddModule && (
          <div className="bg-white rounded-2xl border-2 border-dashed border-[#0B95BA] p-6">
            <h3 className="font-bold text-gray-900 mb-4">Nuevo módulo</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={newModule.title}
                onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
                placeholder="Título del módulo"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ponderación del Módulo (%) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newModule.weight || ''}
                  onChange={(e) => setNewModule({ ...newModule, weight: parseFloat(e.target.value) || 0 })}
                  placeholder="Ej: 25"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Peso porcentual de este módulo en la nota final del programa.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={addModule}
                  className="px-6 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-xl transition-colors"
                >
                  Agregar módulo
                </button>
                <button
                  onClick={() => setShowAddModule(false)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-xl transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Activity Modal - Wizard paso a paso */}
        {showAddActivity && (
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
                          graded: newType === 'survey' ? false : newActivity.graded // Las encuestas no son calificables
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
                    </select>
                  </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newActivity.title}
                    onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
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
                        Ponderación (%) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={newActivity.weight || ''}
                        onChange={(e) => setNewActivity({ ...newActivity, weight: parseFloat(e.target.value) || 0 })}
                        placeholder="15"
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
                            minGroupSize: e.target.checked ? 2 : undefined,
                            maxGroupSize: e.target.checked ? 5 : undefined,
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

                          {newActivity.totalStudents > 0 && newActivity.suggestedGroupSize > 0 && (
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

                          {/* Group Assignment Method */}
                          <div className="border-t border-amber-200 pt-4 mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                              Método de asignación de grupos
                            </label>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  id="automatic"
                                  name="groupAssignment"
                                  value="automatic"
                                  checked={!newActivity.groupAssignmentMethod || newActivity.groupAssignmentMethod === 'automatic'}
                                  onChange={() => setNewActivity({ 
                                    ...newActivity, 
                                    groupAssignmentMethod: 'automatic',
                                    manualGroups: undefined
                                  })}
                                  className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                                />
                                <label htmlFor="automatic" className="text-sm text-gray-700 cursor-pointer">
                                  Automático (los estudiantes forman sus propios grupos)
                                </label>
                              </div>
                              <div className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  id="manual"
                                  name="groupAssignment"
                                  value="manual"
                                  checked={newActivity.groupAssignmentMethod === 'manual'}
                                  onChange={() => setNewActivity({ 
                                    ...newActivity, 
                                    groupAssignmentMethod: 'manual',
                                    manualGroups: []
                                  })}
                                  className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                                />
                                <label htmlFor="manual" className="text-sm text-gray-700 cursor-pointer">
                                  Manual (asignar estudiantes a grupos específicos)
                                </label>
                              </div>
                            </div>
                          </div>

                          {/* Manual Group Configuration */}
                          {newActivity.groupAssignmentMethod === 'manual' && (
                            <ManualGroupAssignment 
                              activity={newActivity}
                              onUpdate={(updatedActivity) => setNewActivity(updatedActivity)}
                            />
                          )}

                          {newActivity.groupAssignmentMethod !== 'manual' && (
                            <div className="p-3 bg-amber-100 rounded-lg">
                              <p className="text-xs text-amber-800 flex items-center gap-2">
                                <Info className="w-4 h-4 flex-shrink-0" />
                                <span><strong>Tip:</strong> El chat interno permite a los miembros del grupo comunicarse y colaborar en tiempo real dentro de la actividad.</span>
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* File Upload Section */}
                {(['reading', 'reading-control', 'assignment', 'case-study'].includes(newActivity.type || '')) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Archivos adjuntos
                      {newActivity.type === 'reading' && <span className="text-red-500"> *</span>}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#0B95BA] transition-colors">
                      <input
                        type="file"
                        id="file-upload"
                        multiple
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          const attachments = files.map(file => ({
                            name: file.name,
                            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                            type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
                            url: URL.createObjectURL(file)
                          }));
                          setNewActivity({ 
                            ...newActivity, 
                            attachments: [...(newActivity.attachments || []), ...attachments]
                          });
                          toast.success(`${files.length} archivo(s) agregado(s).`);
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer inline-flex flex-col items-center"
                      >
                        <FileText className="w-12 h-12 text-gray-400 mb-3" />
                        <span className="text-sm font-medium text-gray-700 mb-1">
                          Click para subir archivos
                        </span>
                        <span className="text-xs text-gray-500">
                          PDF, Word, PowerPoint, Excel (Máx: 50MB por archivo)
                        </span>
                      </label>
                    </div>

                    {/* Uploaded Files List */}
                    {newActivity.attachments && newActivity.attachments.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {newActivity.attachments.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                <p className="text-xs text-gray-500">{file.size}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setNewActivity({
                                  ...newActivity,
                                  attachments: newActivity.attachments?.filter((_, i) => i !== index)
                                });
                                toast.success('Archivo eliminado.');
                              }}
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-600" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
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
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
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
                            <span className="text-green-800">{newActivity.title}</span>
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
                      if (!newActivity.title) {
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
                        addActivity(showAddActivity.moduleId, showAddActivity.sessionId);
                        setActivityWizardStep(1);
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
                      addActivity(showAddActivity.moduleId, showAddActivity.sessionId);
                      setActivityWizardStep(1);
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
                    setShowAddActivity(null);
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

        {/* Add Module Evaluation Modal - Similar al de actividades pero para evaluaciones de módulo */}
        {showAddModuleEvaluation && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full p-8 max-h-[90vh] overflow-y-auto">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Nueva evaluación de módulo</h3>
                <p className="text-gray-600">Crea un examen que evalúe contenido de múltiples sesiones</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de evaluación <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newActivity.type}
                    onChange={(e) => {
                      const newType = e.target.value as ActivityType;
                      setNewActivity({ 
                        ...newActivity, 
                        type: newType, 
                        questions: [],
                        graded: true
                      });
                    }}
                    className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
                  >
                    <option value="quiz">Examen (Quiz)</option>
                    <option value="reading-control">Control de lectura</option>
                    <option value="assignment">Trabajo final</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newActivity.title}
                    onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                    placeholder="Ej: Examen del Módulo 2 - Procedimientos Arbitrales"
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
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de vencimiento <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={newActivity.dueDate}
                      onChange={(e) => setNewActivity({ ...newActivity, dueDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ponderación de la evaluación (%) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={newActivity.weight || ''}
                      onChange={(e) => setNewActivity({ ...newActivity, weight: parseFloat(e.target.value) || 0 })}
                      placeholder="Ej: 40"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Peso porcentual de esta evaluación dentro del módulo.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
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
                        Duraci��n (min)
                      </label>
                      <input
                        type="number"
                        value={newActivity.duration || ''}
                        onChange={(e) => setNewActivity({ ...newActivity, duration: parseInt(e.target.value) })}
                        placeholder="90"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Intentos
                      </label>
                      <input
                        type="number"
                        value={newActivity.attempts || ''}
                        onChange={(e) => setNewActivity({ ...newActivity, attempts: parseInt(e.target.value) })}
                        placeholder="1"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción / Instrucciones
                  </label>
                  <textarea
                    value={newActivity.description || ''}
                    onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                    placeholder="Describe qué sesiones cubre este examen y qué contenidos se evaluarán..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
                  />
                </div>

                <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                  <h4 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Nota importante
                  </h4>
                  <p className="text-sm text-orange-800">
                    Esta evaluación se aplicará a nivel de módulo y cubrirá contenido de múltiples sesiones. Los estudiantes la verán como una actividad del módulo completo, no de una sesión específica.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => addModuleEvaluation(showAddModuleEvaluation)}
                  className="flex-1 px-6 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-xl transition-colors"
                >
                  Crear evaluación
                </button>
                
                <button
                  onClick={() => {
                    setShowAddModuleEvaluation(null);
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

        {/* Add Material Modal */}
        {showAddMaterial && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Nuevo material</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newMaterial.title}
                    onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                    placeholder="Ej: Presentación - Introducción"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
                  />
                </div>

                {/* Upload Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    ¿Cómo deseas agregar el material? <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setNewMaterial({ ...newMaterial, uploadType: 'file', url: '' })}
                      className={`p-4 border-2 rounded-xl transition-all ${
                        newMaterial.uploadType === 'file'
                          ? 'border-[#0B95BA] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <FileText className={`w-8 h-8 mx-auto mb-2 ${
                        newMaterial.uploadType === 'file' ? 'text-[#0B95BA]' : 'text-gray-400'
                      }`} />
                      <p className={`font-medium ${
                        newMaterial.uploadType === 'file' ? 'text-[#0B95BA]' : 'text-gray-700'
                      }`}>
                        Subir archivo
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Desde su computadora.</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewMaterial({ ...newMaterial, uploadType: 'link', file: null, size: '' })}
                      className={`p-4 border-2 rounded-xl transition-all ${
                        newMaterial.uploadType === 'link'
                          ? 'border-[#0B95BA] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <FileText className={`w-8 h-8 mx-auto mb-2 ${
                        newMaterial.uploadType === 'link' ? 'text-[#0B95BA]' : 'text-gray-400'
                      }`} />
                      <p className={`font-medium ${
                        newMaterial.uploadType === 'link' ? 'text-[#0B95BA]' : 'text-gray-700'
                      }`}>
                        Agregar link
                      </p>
                      <p className="text-xs text-gray-500 mt-1">URL externa.</p>
                    </button>
                  </div>
                </div>

                {/* File Upload */}
                {newMaterial.uploadType === 'file' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seleccionar archivo <span className="text-red-500">*</span>
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#0B95BA] transition-colors">
                      <input
                        type="file"
                        id="material-file-upload"
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const fileExtension = file.name.split('.').pop()?.toUpperCase() || 'FILE';
                            setNewMaterial({ 
                              ...newMaterial, 
                              file,
                              type: fileExtension,
                              size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
                            });
                            toast.success('Archivo seleccionado.');
                          }
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor="material-file-upload"
                        className="cursor-pointer inline-flex flex-col items-center"
                      >
                        <FileText className="w-12 h-12 text-gray-400 mb-3" />
                        {newMaterial.file ? (
                          <div className="text-center">
                            <p className="text-sm font-medium text-green-700 mb-1 flex items-center gap-1.5 justify-center">
                              <Check className="w-4 h-4" />
                              {newMaterial.file.name}
                            </p>
                            <p className="text-xs text-gray-500">{newMaterial.size}</p>
                            <p className="text-xs text-[#0B95BA] mt-2 underline">Haga clic para cambiar archivo.</p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <p className="text-sm font-medium text-gray-700 mb-1">
                              Haga clic para seleccionar archivo.
                            </p>
                            <p className="text-xs text-gray-500">
                              PDF, Word, PowerPoint, Excel (máx. 50MB).
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                )}

                {/* URL Input */}
                {newMaterial.uploadType === 'link' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL del Material <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      value={newMaterial.url}
                      onChange={(e) => setNewMaterial({ ...newMaterial, url: e.target.value })}
                      placeholder="https://example.com/material.pdf"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
                    />
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Archivo
                      </label>
                      <select
                        value={newMaterial.type}
                        onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value })}
                        className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
                      >
                        <option value="PDF">PDF</option>
                        <option value="DOC">DOC</option>
                        <option value="DOCX">DOCX</option>
                        <option value="PPT">PPT</option>
                        <option value="PPTX">PPTX</option>
                        <option value="XLS">XLS</option>
                        <option value="XLSX">XLSX</option>
                        <option value="VIDEO">VIDEO</option>
                        <option value="LINK">LINK</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => addMaterial(showAddMaterial.moduleId, showAddMaterial.sessionId)}
                  className="flex-1 px-6 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-xl transition-colors"
                >
                  Agregar material
                </button>
                <button
                  onClick={() => {
                    setNewMaterial({ 
                      title: '', 
                      type: 'PDF', 
                      url: '', 
                      uploadType: 'file',
                      file: null,
                      size: ''
                    });
                    setShowAddMaterial(null);
                  }}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-xl transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Creator */}
        {showQuizCreator && (
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
            <QuizCreator
              onBack={() => setShowQuizCreator(null)}
              onSave={(quizData: any) => {
                // Save quiz as activity
                const activity: Activity = {
                  id: `act-${Date.now()}`,
                  title: quizData.title,
                  type: 'quiz',
                  graded: true,
                  passingScore: quizData.passingScore,
                  attempts: quizData.attempts,
                  dueDate: quizData.hasDueDate ? quizData.dueDate : undefined,
                  duration: quizData.hasTimeLimit ? quizData.timeLimit : undefined,
                  description: quizData.description
                };

                setModules(modules.map(m =>
                  m.id === showQuizCreator.moduleId
                    ? {
                        ...m,
                        sessions: m.sessions.map(s =>
                          s.id === showQuizCreator.sessionId
                            ? { ...s, activities: [...s.activities, activity] }
                            : s
                        )
                      }
                    : m
                ));

                setShowQuizCreator(null);
                toast.success('Quiz creado exitosamente.');
              }}
            />
          </div>
        )}

        {/* Quiz Grading View */}
        {showQuizGrading && (
          <QuizGradingView
            onBack={() => setShowQuizGrading(null)}
            quizId={showQuizGrading.quizId}
            quizTitle={showQuizGrading.quizTitle}
          />
        )}
      </div>

      {/* Publication Controls */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200 p-6">
        {/* Modal de Programar Publicación */}
        {showScheduleModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
              <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#0B95BA]" />
                  Programar fecha de publicación
                </h3>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Fecha de inicio
                  </label>
                  <input
                    type="date"
                    value={publicationDate}
                    onChange={(e) => setPublicationDate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    El programa se publicará automáticamente en la fecha seleccionada.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowScheduleModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      if (!publicationDate) {
                        toast.error('Debe seleccionar una fecha de publicación.');
                        return;
                      }
                      handleSchedulePublish();
                      setShowScheduleModal(false);
                    }}
                    disabled={!publicationDate}
                    className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex flex-col md:flex-row gap-3 justify-end">
          <button
            onClick={() => setShowScheduleModal(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Programar publicación
          </button>

          <button
            onClick={handleSaveDraft}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Guardar como borrador
          </button>
          
          <button
            onClick={handlePublishNow}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Publicar ahora
          </button>
        </div>
      </div>
    </div>
  );
}

// Manual Group Assignment Component
interface ManualGroupAssignmentProps {
  activity: any;
  onUpdate: (activity: any) => void;
}

function ManualGroupAssignment({ activity, onUpdate }: ManualGroupAssignmentProps) {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [draggingStudent, setDraggingStudent] = useState<string | null>(null);

  // Simulated enrolled students
  const enrolledStudents = [
    { id: 'st-1', name: 'Ana García Mendoza', code: 'EST-2024-001' },
    { id: 'st-2', name: 'Carlos Rodríguez López', code: 'EST-2024-002' },
    { id: 'st-3', name: 'María Fernández Silva', code: 'EST-2024-003' },
    { id: 'st-4', name: 'José Martínez Torres', code: 'EST-2024-004' },
    { id: 'st-5', name: 'Laura Sánchez Díaz', code: 'EST-2024-005' },
    { id: 'st-6', name: 'Pedro González Cruz', code: 'EST-2024-006' },
    { id: 'st-7', name: 'Carmen Pérez Rojas', code: 'EST-2024-007' },
    { id: 'st-8', name: 'Luis Ramírez Vega', code: 'EST-2024-008' },
    { id: 'st-9', name: 'Elena Morales Castro', code: 'EST-2024-009' },
    { id: 'st-10', name: 'Roberto Vargas Flores', code: 'EST-2024-010' },
    { id: 'st-11', name: 'Patricia Herrera Luna', code: 'EST-2024-011' },
    { id: 'st-12', name: 'Diego Castillo Ríos', code: 'EST-2024-012' },
  ];

  const groups = activity.manualGroups || [];
  
  // Get assigned student IDs
  const assignedStudentIds = new Set(
    groups.flatMap((g: any) => g.studentIds)
  );
  
  // Get unassigned students
  const unassignedStudents = enrolledStudents.filter(
    student => !assignedStudentIds.has(student.id)
  );

  const addGroup = () => {
    const newGroup = {
      id: `group-${Date.now()}`,
      name: `Grupo ${groups.length + 1}`,
      studentIds: []
    };
    
    onUpdate({
      ...activity,
      manualGroups: [...groups, newGroup]
    });
    
    toast.success('Grupo creado.');
  };

  const removeGroup = (groupId: string) => {
    onUpdate({
      ...activity,
      manualGroups: groups.filter((g: any) => g.id !== groupId)
    });
    toast.success('Grupo eliminado.');
  };

  const renameGroup = (groupId: string, newName: string) => {
    onUpdate({
      ...activity,
      manualGroups: groups.map((g: any) => 
        g.id === groupId ? { ...g, name: newName } : g
      )
    });
  };

  const assignStudentToGroup = (studentId: string, groupId: string) => {
    // Remove student from any existing group
    const updatedGroups = groups.map((g: any) => ({
      ...g,
      studentIds: g.studentIds.filter((id: string) => id !== studentId)
    }));
    
    // Add student to new group
    const finalGroups = updatedGroups.map((g: any) => 
      g.id === groupId 
        ? { ...g, studentIds: [...g.studentIds, studentId] }
        : g
    );
    
    onUpdate({
      ...activity,
      manualGroups: finalGroups
    });
  };

  const removeStudentFromGroup = (studentId: string, groupId: string) => {
    onUpdate({
      ...activity,
      manualGroups: groups.map((g: any) => 
        g.id === groupId
          ? { ...g, studentIds: g.studentIds.filter((id: string) => id !== studentId) }
          : g
      )
    });
  };

  const handleDragStart = (studentId: string) => {
    setDraggingStudent(studentId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, groupId: string) => {
    e.preventDefault();
    if (draggingStudent) {
      assignStudentToGroup(draggingStudent, groupId);
      setDraggingStudent(null);
    }
  };

  return (
    <div className="border-t border-amber-200 pt-4 mt-4">
      <div className="bg-white rounded-lg border-2 border-amber-300 p-4">
        <div className="flex items-center justify-between mb-4">
          <h5 className="font-bold text-amber-900">Configuración manual de grupos</h5>
          <button
            onClick={addGroup}
            className="px-3 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            Crear grupo
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Unassigned Students */}
          <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
            <h6 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Estudiantes sin asignar ({unassignedStudents.length})
            </h6>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {unassignedStudents.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  Todos los estudiantes están asignados
                </p>
              ) : (
                unassignedStudents.map(student => (
                  <div
                    key={student.id}
                    draggable
                    onDragStart={() => handleDragStart(student.id)}
                    className={`bg-white p-3 rounded-lg border border-gray-200 cursor-move hover:border-amber-400 hover:shadow-md transition-all ${
                      draggingStudent === student.id ? 'opacity-50' : ''
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-900">{student.name}</p>
                    <p className="text-xs text-gray-500">{student.code}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Groups */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {groups.length === 0 ? (
              <div className="bg-amber-50 rounded-lg p-6 border-2 border-amber-200 text-center">
                <Users className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                <p className="text-sm text-amber-800">
                  Crea grupos para comenzar a asignar estudiantes
                </p>
              </div>
            ) : (
              groups.map((group: any) => {
                const groupStudents = enrolledStudents.filter(s => 
                  group.studentIds.includes(s.id)
                );
                const minSize = activity.minGroupSize || 2;
                const maxSize = activity.maxGroupSize || 5;
                const isValid = groupStudents.length >= minSize && groupStudents.length <= maxSize;
                
                return (
                  <div
                    key={group.id}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, group.id)}
                    className={`bg-white rounded-lg border-2 p-3 ${
                      isValid ? 'border-green-300' : 'border-red-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <input
                        type="text"
                        value={group.name}
                        onChange={(e) => renameGroup(group.id, e.target.value)}
                        className="flex-1 px-2 py-1 border border-gray-200 rounded text-sm font-medium focus:ring-2 focus:ring-amber-500"
                      />
                      <button
                        onClick={() => removeGroup(group.id)}
                        className="ml-2 p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2 text-xs">
                      <span className={`px-2 py-1 rounded ${
                        isValid 
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {groupStudents.length} / {minSize}-{maxSize} miembros
                      </span>
                    </div>

                    <div className="space-y-2">
                      {groupStudents.length === 0 ? (
                        <p className="text-xs text-gray-500 text-center py-3 border-2 border-dashed border-gray-200 rounded">
                          Arrastre estudiantes aquí.
                        </p>
                      ) : (
                        groupStudents.map(student => (
                          <div
                            key={student.id}
                            className="bg-gray-50 p-2 rounded border border-gray-200 flex items-center justify-between group"
                          >
                            <div>
                              <p className="text-xs font-medium text-gray-900">{student.name}</p>
                              <p className="text-xs text-gray-500">{student.code}</p>
                            </div>
                            <button
                              onClick={() => removeStudentFromGroup(student.id, group.id)}
                              className="opacity-0 group-hover:opacity-100 p-1 text-red-600 hover:bg-red-50 rounded transition-all"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Summary */}
        {groups.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-800">
              <strong>Resumen:</strong> {groups.length} grupo(s) creado(s), {enrolledStudents.length - unassignedStudents.length} de {enrolledStudents.length} estudiantes asignados.
              {unassignedStudents.length > 0 && (
                <span className="text-amber-700"> {unassignedStudents.length} estudiante(s) sin asignar.</span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}