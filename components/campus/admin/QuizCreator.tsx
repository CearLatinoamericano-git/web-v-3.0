import { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Save, Eye, HelpCircle, Calendar, Clock, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

type QuestionType = 'multiple-choice' | 'essay' | 'true-false' | 'multiple-answer';
type GradingType = 'automatic' | 'manual';
type FeedbackTiming = 'after-submission' | 'specific-date' | 'never';

interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer?: number | number[];
  points: number;
  explanation?: string;
}

interface QuizCreatorProps {
  onBack: () => void;
  quizId?: string;
  onSave?: (quizData: any) => void;
}

export function QuizCreator({ onBack, quizId, onSave }: QuizCreatorProps) {
  const [quizForm, setQuizForm] = useState({
    title: '',
    description: '',
    gradingType: 'automatic' as GradingType,
    totalPoints: 20,
    passingScore: 14,
    timeLimit: 60,
    hasTimeLimit: true,
    attempts: 2,
    hasDueDate: false,
    dueDate: '',
    dueTime: '',
    feedbackEnabled: true,
    feedbackTiming: 'after-submission' as FeedbackTiming,
    feedbackDate: '',
    feedbackTime: '',
    showCorrectAnswers: true,
    showExplanations: true,
    shuffleQuestions: false,
    shuffleOptions: false,
    enableQuestionPool: false,
    questionsToShow: 10
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: String(Date.now()),
    type: 'multiple-choice',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    points: 2,
    explanation: ''
  });

  const [showQuestionForm, setShowQuestionForm] = useState(false);

  const handleAddQuestion = () => {
    if (!currentQuestion.question.trim()) {
      toast.error('La pregunta no puede estar vacía');
      return;
    }

    if (currentQuestion.type !== 'essay') {
      if (currentQuestion.options.filter(o => o.trim()).length < 2) {
        toast.error('Debe haber al menos 2 opciones');
        return;
      }
    }

    setQuestions([...questions, { ...currentQuestion, id: String(Date.now()) }]);
    setCurrentQuestion({
      id: String(Date.now() + 1),
      type: 'multiple-choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      points: 2,
      explanation: ''
    });
    setShowQuestionForm(false);
    toast.success('Pregunta agregada');
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
    toast.success('Pregunta eliminada');
  };

  const handleSaveQuiz = () => {
    if (!quizForm.title.trim()) {
      toast.error('El título del quiz es obligatorio');
      return;
    }

    if (questions.length === 0) {
      toast.error('Debe agregar al menos una pregunta');
      return;
    }

    // Only validate if still in automatic mode
    if (quizForm.gradingType === 'automatic') {
      const hasEssayQuestions = questions.some(q => q.type === 'essay');
      if (hasEssayQuestions) {
        toast.error('No se pueden incluir preguntas de respuesta larga con calificación automática');
        return;
      }
    }

    if (quizForm.hasDueDate && (!quizForm.dueDate || !quizForm.dueTime)) {
      toast.error('Debe especificar fecha y hora de vencimiento');
      return;
    }

    if (onSave) {
      onSave({
        ...quizForm,
        questions
      });
    } else {
      toast.success('Quiz guardado exitosamente');
      onBack();
    }
  };

  const getQuestionTypeLabel = (type: QuestionType) => {
    const labels = {
      'multiple-choice': 'Opción múltiple',
      'essay': 'Respuesta larga',
      'true-false': 'Verdadero/Falso',
      'multiple-answer': 'Selección Múltiple'
    };
    return labels[type];
  };

  return (
    <div className="space-y-6 pb-12">{/* pb-12 adds spacing at bottom */}
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
        <button
          onClick={onBack}
          className="mb-3 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>
        <h1 className="text-4xl font-bold mb-2">{quizId ? 'Editar' : 'Crear'} Quiz/Evaluación</h1>
        <p className="text-xl opacity-90">Configura las preguntas y parámetros de la evaluación</p>
      </div>

      {/* Quiz Configuration */}
      <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Configuración general</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título del Quiz *
            </label>
            <input
              type="text"
              value={quizForm.title}
              onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
              placeholder="Ej: Evaluación módulo 1 - Fundamentos"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              value={quizForm.description}
              onChange={(e) => setQuizForm({ ...quizForm, description: e.target.value })}
              placeholder="Descripción breve de la evaluación..."
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          {/* Grading Type */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Calificación *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setQuizForm({ ...quizForm, gradingType: 'automatic' })}
                className={`p-4 border-2 rounded-xl transition-all ${
                  quizForm.gradingType === 'automatic'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    quizForm.gradingType === 'automatic'
                      ? 'border-purple-500 bg-purple-500'
                      : 'border-gray-300'
                  }`}>
                    {quizForm.gradingType === 'automatic' && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Automática</p>
                    <p className="text-sm text-gray-600">Preguntas de opción múltiple</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setQuizForm({ ...quizForm, gradingType: 'manual' })}
                className={`p-4 border-2 rounded-xl transition-all ${
                  quizForm.gradingType === 'manual'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    quizForm.gradingType === 'manual'
                      ? 'border-purple-500 bg-purple-500'
                      : 'border-gray-300'
                  }`}>
                    {quizForm.gradingType === 'manual' && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Manual</p>
                    <p className="text-sm text-gray-600">Respuestas largas/abiertas</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Points and Passing Score */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Puntaje total
            </label>
            <input
              type="number"
              value={quizForm.totalPoints}
              onChange={(e) => setQuizForm({ ...quizForm, totalPoints: Number(e.target.value) })}
              min="1"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nota mínima para aprobar
            </label>
            <input
              type="number"
              value={quizForm.passingScore}
              onChange={(e) => setQuizForm({ ...quizForm, passingScore: Number(e.target.value) })}
              min="1"
              max={quizForm.totalPoints}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Time Limit */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <input
                type="checkbox"
                id="hasTimeLimit"
                checked={quizForm.hasTimeLimit}
                onChange={(e) => setQuizForm({ ...quizForm, hasTimeLimit: e.target.checked })}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="hasTimeLimit" className="font-medium text-gray-700 cursor-pointer">
                Establecer límite de tiempo
              </label>
            </div>
            {quizForm.hasTimeLimit && (
              <div className="ml-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiempo límite (minutos)
                </label>
                <input
                  type="number"
                  value={quizForm.timeLimit}
                  onChange={(e) => setQuizForm({ ...quizForm, timeLimit: Number(e.target.value) })}
                  min="1"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            )}
          </div>

          {/* Attempts */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número de Intentos
            </label>
            <input
              type="number"
              value={quizForm.attempts}
              onChange={(e) => setQuizForm({ ...quizForm, attempts: Number(e.target.value) })}
              min="1"
              max="5"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Due Date */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <input
                type="checkbox"
                id="hasDueDate"
                checked={quizForm.hasDueDate}
                onChange={(e) => setQuizForm({ ...quizForm, hasDueDate: e.target.checked })}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="hasDueDate" className="font-medium text-gray-700 cursor-pointer">
                Establecer fecha de vencimiento
              </label>
            </div>
            {quizForm.hasDueDate && (
              <div className="ml-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de Vencimiento
                  </label>
                  <input
                    type="date"
                    value={quizForm.dueDate}
                    onChange={(e) => setQuizForm({ ...quizForm, dueDate: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hora de Vencimiento
                  </label>
                  <input
                    type="time"
                    value={quizForm.dueTime}
                    onChange={(e) => setQuizForm({ ...quizForm, dueTime: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Feedback Configuration */}
          <div className="md:col-span-2 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
            <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Configuración de Retroalimentación
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="feedbackEnabled"
                  checked={quizForm.feedbackEnabled}
                  onChange={(e) => setQuizForm({ ...quizForm, feedbackEnabled: e.target.checked })}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="feedbackEnabled" className="font-medium text-gray-700 cursor-pointer">
                  Habilitar retroalimentación
                </label>
              </div>

              {quizForm.feedbackEnabled && (
                <div className="ml-8 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      ¿Cuándo mostrar la retroalimentación?
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer">
                        <input
                          type="radio"
                          name="feedbackTiming"
                          value="after-submission"
                          checked={quizForm.feedbackTiming === 'after-submission'}
                          onChange={(e) => setQuizForm({ ...quizForm, feedbackTiming: e.target.value as FeedbackTiming })}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <p className="font-medium text-gray-900">Inmediatamente después de la evaluación</p>
                          <p className="text-sm text-gray-600">El estudiante verá la retroalimentación al enviar</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer">
                        <input
                          type="radio"
                          name="feedbackTiming"
                          value="specific-date"
                          checked={quizForm.feedbackTiming === 'specific-date'}
                          onChange={(e) => setQuizForm({ ...quizForm, feedbackTiming: e.target.value as FeedbackTiming })}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <p className="font-medium text-gray-900">En una fecha específica</p>
                          <p className="text-sm text-gray-600">Define cuándo se mostrará la retroalimentación</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer">
                        <input
                          type="radio"
                          name="feedbackTiming"
                          value="never"
                          checked={quizForm.feedbackTiming === 'never'}
                          onChange={(e) => setQuizForm({ ...quizForm, feedbackTiming: e.target.value as FeedbackTiming })}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <p className="font-medium text-gray-900">No mostrar</p>
                          <p className="text-sm text-gray-600">Los estudiantes no verán la retroalimentación</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {quizForm.feedbackTiming === 'specific-date' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fecha
                        </label>
                        <input
                          type="date"
                          value={quizForm.feedbackDate}
                          onChange={(e) => setQuizForm({ ...quizForm, feedbackDate: e.target.value })}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hora
                        </label>
                        <input
                          type="time"
                          value={quizForm.feedbackTime}
                          onChange={(e) => setQuizForm({ ...quizForm, feedbackTime: e.target.value })}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}

                  {quizForm.feedbackTiming !== 'never' && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="showCorrectAnswers"
                          checked={quizForm.showCorrectAnswers}
                          onChange={(e) => setQuizForm({ ...quizForm, showCorrectAnswers: e.target.checked })}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="showCorrectAnswers" className="text-sm font-medium text-gray-700 cursor-pointer">
                          Mostrar respuestas correctas
                        </label>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="showExplanations"
                          checked={quizForm.showExplanations}
                          onChange={(e) => setQuizForm({ ...quizForm, showExplanations: e.target.checked })}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="showExplanations" className="text-sm font-medium text-gray-700 cursor-pointer">
                          Mostrar explicaciones
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Shuffle Options */}
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">Opciones de Aleatorización</h4>
                    
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="shuffleQuestions"
                        checked={quizForm.shuffleQuestions}
                        onChange={(e) => setQuizForm({ ...quizForm, shuffleQuestions: e.target.checked })}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="shuffleQuestions" className="text-sm font-medium text-gray-700 cursor-pointer">
                        Mezclar preguntas (orden aleatorio para cada estudiante)
                      </label>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="shuffleOptions"
                        checked={quizForm.shuffleOptions}
                        onChange={(e) => setQuizForm({ ...quizForm, shuffleOptions: e.target.checked })}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="shuffleOptions" className="text-sm font-medium text-gray-700 cursor-pointer">
                        Mezclar opciones de respuesta (orden aleatorio en cada pregunta)
                      </label>
                    </div>
                  </div>

                  {/* Question Pool / Random Selection */}
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">Sorteo de preguntas</h4>
                    
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="enableQuestionPool"
                        checked={quizForm.enableQuestionPool}
                        onChange={(e) => setQuizForm({ ...quizForm, enableQuestionPool: e.target.checked })}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="enableQuestionPool" className="text-sm font-medium text-gray-700 cursor-pointer">
                        Habilitar sorteo aleatorio de preguntas
                      </label>
                    </div>

                    {quizForm.enableQuestionPool && (
                      <div className="ml-8">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cantidad de preguntas a mostrar del pool
                        </label>
                        <input
                          type="number"
                          value={quizForm.questionsToShow}
                          onChange={(e) => setQuizForm({ ...quizForm, questionsToShow: Number(e.target.value) })}
                          min="1"
                          max={questions.length}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-600 mt-1">
                          El sistema mostrará aleatoriamente {quizForm.questionsToShow} pregunta(s) de un pool de {questions.length} pregunta(s)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Questions Section */}
      <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Preguntas</h2>
            <p className="text-gray-600">{questions.length} pregunta(s) agregada(s)</p>
          </div>
          <button
            onClick={() => setShowQuestionForm(!showQuestionForm)}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Agregar pregunta
          </button>
        </div>

        {/* Progress Bar - Questions and Points Status - Always Visible */}
        {(() => {
          const totalCurrentPoints = questions.reduce((sum, q) => sum + q.points, 0);
          const targetPoints = quizForm.totalPoints;
          
          // Calculate based on question pool mode
          let displayMessage = '';
          let progressPercent = 0;
          let statusColor = '';
          
          if (quizForm.enableQuestionPool) {
            // Pool mode: divide target points by questions to show
            const pointsPerQuestion = targetPoints / quizForm.questionsToShow;
            const questionsNeeded = quizForm.questionsToShow;
            const questionsMissing = Math.max(0, questionsNeeded - questions.length);
            
            progressPercent = Math.min(100, (questions.length / questionsNeeded) * 100);
            
            if (questions.length === 0) {
              displayMessage = `Inicie agregando preguntas para el pool (se necesitan ${questionsNeeded} preguntas para el sorteo)`;
              statusColor = 'bg-gray-400';
            } else if (questions.length < questionsNeeded) {
              displayMessage = `Faltan ${questionsMissing} pregunta(s) para completar el pool (${questionsNeeded} necesarias para el sorteo)`;
              statusColor = 'bg-yellow-500';
            } else {
              displayMessage = `Pool completo: ${questions.length} preguntas disponibles para sorteo (se mostrarán ${questionsNeeded} por evaluación, ${pointsPerQuestion.toFixed(1)} pts c/u)`;
              statusColor = 'bg-green-500';
            }
          } else {
            // Normal mode: need questions to add up to target points
            const pointsMissing = Math.max(0, targetPoints - totalCurrentPoints);
            progressPercent = Math.min(100, (totalCurrentPoints / targetPoints) * 100);
            
            if (questions.length === 0) {
              displayMessage = `Inicie agregando preguntas para alcanzar el puntaje objetivo de ${targetPoints} puntos`;
              statusColor = 'bg-gray-400';
            } else if (totalCurrentPoints < targetPoints) {
              displayMessage = `Faltan ${pointsMissing} punto(s) para alcanzar el puntaje objetivo de ${targetPoints} puntos`;
              statusColor = 'bg-yellow-500';
            } else if (totalCurrentPoints === targetPoints) {
              displayMessage = `Puntaje completo: ${totalCurrentPoints} puntos alcanzados`;
              statusColor = 'bg-green-500';
            } else {
              displayMessage = `Exceso de puntaje: ${totalCurrentPoints} puntos configurados (objetivo: ${targetPoints})`;
              statusColor = 'bg-orange-500';
            }
          }
          
          return (
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 mb-1">{displayMessage}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <span>Preguntas: {questions.length}</span>
                    {!quizForm.enableQuestionPool && (
                      <>
                        <span>•</span>
                        <span>Puntos actuales: {totalCurrentPoints}/{targetPoints}</span>
                      </>
                    )}
                    {quizForm.enableQuestionPool && (
                      <>
                        <span>•</span>
                        <span>Se mostrarán: {quizForm.questionsToShow}</span>
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

        {/* Question Form */}
        {showQuestionForm && (
          <div className="mb-6 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
            <h3 className="font-bold text-purple-900 mb-4">Nueva pregunta</h3>

            <div className="space-y-4">
              {/* Question Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Pregunta
                </label>
                <select
                  value={currentQuestion.type}
                  onChange={(e) => setCurrentQuestion({ 
                    ...currentQuestion, 
                    type: e.target.value as QuestionType,
                    options: e.target.value === 'essay' ? [] : ['', '', '', '']
                  })}
                  disabled={quizForm.gradingType === 'automatic' && currentQuestion.type === 'essay'}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="multiple-choice">Opción múltiple</option>
                  {quizForm.gradingType === 'manual' && <option value="essay">Respuesta larga</option>}
                  <option value="true-false">Verdadero/Falso</option>
                  <option value="multiple-answer">Selección Múltiple</option>
                </select>
              </div>

              {/* Question Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pregunta *
                </label>
                <textarea
                  value={currentQuestion.question}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                  placeholder="Escribe la pregunta aquí..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              {/* Options (not for essay) */}
              {currentQuestion.type !== 'essay' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Opciones
                  </label>
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-3 mb-2">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={currentQuestion.correctAnswer === index}
                        onChange={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: index })}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...currentQuestion.options];
                          newOptions[index] = e.target.value;
                          setCurrentQuestion({ ...currentQuestion, options: newOptions });
                        }}
                        placeholder={`Opción ${index + 1}`}
                        className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Points */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Puntos
                </label>
                <input
                  type="number"
                  value={currentQuestion.points}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, points: Number(e.target.value) })}
                  min="1"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Explanation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Explicación (opcional)
                </label>
                <textarea
                  value={currentQuestion.explanation}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, explanation: e.target.value })}
                  placeholder="Explica por qué esta es la respuesta correcta..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={2}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddQuestion}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
                >
                  Agregar pregunta
                </button>
                <button
                  onClick={() => setShowQuestionForm(false)}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Questions List */}
        {questions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>No hay preguntas agregadas</p>
            <p className="text-sm mt-2">Agrega al menos una pregunta para continuar</p>
          </div>
        ) : (
          <div className="space-y-3">
            {questions.map((question, index) => (
              <div key={question.id} className="p-4 border-2 border-gray-200 rounded-xl">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                        Pregunta {index + 1}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                        {getQuestionTypeLabel(question.type)}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                        {question.points} pts
                      </span>
                    </div>
                    <p className="font-medium text-gray-900 mb-2">{question.question}</p>
                    {question.type !== 'essay' && (
                      <div className="text-sm text-gray-600">
                        {question.options.filter(o => o).length} opciones
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemoveQuestion(question.id)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-gray-600 hover:text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleSaveQuiz}
          className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          Guardar quiz
        </button>
        <button
          onClick={onBack}
          className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-xl transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}