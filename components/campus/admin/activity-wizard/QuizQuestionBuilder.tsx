import { useState } from 'react';
import { Plus, Trash2, CheckCircle, AlertCircle, Info, Check } from 'lucide-react';
import { toast } from 'sonner';

type QuestionType = 'multiple-choice' | 'true-false' | 'multiple-answer' | 'essay' | 'multiple-choice-grid';
type ActivityType = 'quiz' | 'assignment' | 'reading' | 'forum' | 'case-study' | 'reading-control' | 'survey' | 'exam';

interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer?: number | number[];
  points: number;
  explanation?: string;
  gridRows?: string[];
  gridColumns?: string[];
  gridAnswers?: { [rowIndex: number]: number };
}

interface QuizQuestionBuilderProps {
  questions: Question[];
  onQuestionsChange: (questions: Question[]) => void;
  activityType?: ActivityType;
  shuffleQuestions?: boolean;
  questionsToShow?: number;
}

export function QuizQuestionBuilder({ 
  questions, 
  onQuestionsChange,
  activityType,
  shuffleQuestions,
  questionsToShow
}: QuizQuestionBuilderProps) {
  const [newQuestion, setNewQuestion] = useState({
    type: 'multiple-choice' as QuestionType,
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
      
      if (activityType !== 'survey' && Object.keys(newQuestion.gridAnswers).length !== validRows.length) {
        toast.error('Debe seleccionar una respuesta correcta para cada fila.');
        return;
      }
    } else if (newQuestion.type !== 'essay' && activityType !== 'survey') {
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

    const questionToAdd: Question = {
      id: `q-${Date.now()}`,
      type: newQuestion.type,
      question: newQuestion.question,
      options: newQuestion.options,
      correctAnswer: newQuestion.correctAnswer,
      points: newQuestion.points,
      explanation: newQuestion.explanation,
      gridRows: newQuestion.gridRows,
      gridColumns: newQuestion.gridColumns,
      gridAnswers: newQuestion.gridAnswers
    };

    onQuestionsChange([...questions, questionToAdd]);
    
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
    onQuestionsChange(questions.filter((_, i) => i !== index));
    toast.success('Pregunta eliminada.');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-gray-900">
          Preguntas de {activityType === 'quiz' ? 'Cuestionario' : activityType === 'reading-control' ? 'Control de Lectura' : 'Encuesta'}
        </h4>
        <span className="text-sm text-gray-600">
          {questions.length} pregunta(s)
          {activityType !== 'survey' && ` | ${questions.reduce((sum, q) => sum + q.points, 0)} puntos totales`}
        </span>
      </div>

      {/* Barra de progreso */}
      {activityType !== 'survey' && (() => {
        const totalCurrentPoints = questions.reduce((sum, q) => sum + q.points, 0);
        const currentQuestionCount = questions.length;
        
        let displayMessage = '';
        let progressPercent = 0;
        let statusColor = '';
        
        if (shuffleQuestions && questionsToShow) {
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
      {questions.length > 0 && (
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
                  type: e.target.value as QuestionType,
                  options: e.target.value === 'true-false' ? ['Verdadero', 'Falso'] : ['', '', '', ''],
                  correctAnswer: e.target.value === 'multiple-answer' ? [] : undefined
                })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA]"
              >
                <option value="multiple-choice">Opción única (seleccionar solo una)</option>
                <option value="multiple-answer">Opción múltiple (seleccionar varias)</option>
                <option value="true-false">Verdadero/Falso</option>
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

          {newQuestion.type !== 'essay' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Opciones de respuesta
                {activityType !== 'survey' && newQuestion.type === 'multiple-answer' && (
                  <span className="ml-2 text-xs text-[#0B95BA] font-normal flex items-center gap-1">
                    (marque todas las correctas <Check className="w-3 h-3" />)
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
                            className="w-5 h-5 rounded border-2 border-gray-400 text-green-600 focus:ring-2 focus:ring-green-500"
                          />
                        ) : (
                          <input
                            type="radio"
                            name="correctAnswer"
                            checked={newQuestion.correctAnswer === index}
                            onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: index })}
                            className="w-5 h-5 border-2 border-gray-400 text-green-600 focus:ring-2 focus:ring-green-500"
                          />
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
                    {newQuestion.type !== 'true-false' && newQuestion.options.length > 2 && (
                      <button
                        onClick={() => {
                          const newOptions = newQuestion.options.filter((_, i) => i !== index);
                          let newCorrectAnswer = newQuestion.correctAnswer;
                          
                          if (newQuestion.type === 'multiple-answer' && Array.isArray(newCorrectAnswer)) {
                            newCorrectAnswer = newCorrectAnswer
                              .filter(i => i !== index)
                              .map(i => i > index ? i - 1 : i);
                          } else if (newCorrectAnswer === index) {
                            newCorrectAnswer = undefined;
                          } else if (typeof newCorrectAnswer === 'number' && newCorrectAnswer > index) {
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