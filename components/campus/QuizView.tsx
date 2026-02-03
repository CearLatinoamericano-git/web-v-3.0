import { useState } from 'react';
import {
  Clock,
  CheckCircle,
  Circle,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Flag,
  FileText,
  Award,
  TrendingUp,
  X,
  Edit,
  Send
} from 'lucide-react';
import { toast } from 'sonner';

type QuestionType = 'multiple-choice' | 'true-false' | 'multiple-answer' | 'long-answer';

interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: number | number[];
  points: number;
  explanation?: string;
}

interface QuizViewProps {
  quizId?: string;
  onBack?: () => void;
}

export function QuizView({ quizId, onBack }: QuizViewProps) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number | number[] }>({});
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutos en segundos
  const [showResults, setShowResults] = useState(false);

  // Mock quiz data
  const quizData = {
    title: 'Quiz: Marco Legal del Arbitraje',
    course: 'Diplomado en Arbitraje Comercial Internacional',
    module: 'Módulo 1: Introducción al Arbitraje',
    session: 'Sesión 2: Tipos de Arbitraje',
    description: 'Evaluación de conocimientos sobre el marco legal del arbitraje en Perú y aspectos internacionales',
    totalQuestions: 10,
    totalPoints: 20,
    passingScore: 14,
    timeLimit: 60, // minutos
    attempts: 2,
    attemptsUsed: 0,
    dueDate: '15 de Diciembre, 2024',
    dueTime: '23:59'
  };

  const questions: Question[] = [
    {
      id: 1,
      type: 'multiple-choice',
      question: '¿Cuál es la principal normativa que regula el arbitraje en el Perú?',
      options: [
        'Decreto Legislativo N° 1071',
        'Código Civil Peruano',
        'Ley de Contrataciones del Estado',
        'Código Procesal Civil'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'El Decreto Legislativo N° 1071 es la Ley de Arbitraje que regula el arbitraje en el Perú desde el año 2008.'
    },
    {
      id: 2,
      type: 'true-false',
      question: 'El arbitraje es un método alternativo de resolución de conflictos de carácter voluntario.',
      options: ['Verdadero', 'Falso'],
      correctAnswer: 0,
      points: 2,
      explanation: 'Verdadero. El arbitraje es un mecanismo voluntario donde las partes acuerdan someter sus controversias a un tribunal arbitral.'
    },
    {
      id: 3,
      type: 'multiple-choice',
      question: '¿Cuál de las siguientes características NO corresponde al arbitraje?',
      options: [
        'Confidencialidad',
        'Publicidad obligatoria',
        'Celeridad',
        'Especialización'
      ],
      correctAnswer: 1,
      points: 2,
      explanation: 'La publicidad obligatoria NO es característica del arbitraje. Una de sus ventajas es precisamente la confidencialidad del proceso.'
    },
    {
      id: 4,
      type: 'multiple-answer',
      question: 'Selecciona todas las materias que pueden ser sometidas a arbitraje según la legislación peruana:',
      options: [
        'Controversias contractuales patrimoniales',
        'Derecho de familia (divorcio)',
        'Disputas comerciales internacionales',
        'Procesos penales',
        'Contratos de construcción'
      ],
      correctAnswer: [0, 2, 4],
      points: 3,
      explanation: 'Pueden someterse a arbitraje las materias de libre disposición, principalmente de carácter patrimonial y comercial. El derecho de familia y los procesos penales no son arbitrables.'
    },
    {
      id: 5,
      type: 'multiple-choice',
      question: '¿Qué tipo de laudo arbitral tiene la misma eficacia que una sentencia judicial?',
      options: [
        'Laudo en conciencia',
        'Laudo definitivo',
        'Laudo provisional',
        'Laudo parcial'
      ],
      correctAnswer: 1,
      points: 2,
      explanation: 'El laudo definitivo tiene la misma eficacia que una sentencia judicial y constituye cosa juzgada.'
    },
    {
      id: 6,
      type: 'true-false',
      question: 'El Convenio de Nueva York regula el reconocimiento y ejecución de laudos arbitrales extranjeros.',
      options: ['Verdadero', 'Falso'],
      correctAnswer: 0,
      points: 2,
      explanation: 'Verdadero. El Convenio de Nueva York de 1958 es el principal instrumento internacional para el reconocimiento y ejecución de laudos arbitrales extranjeros.'
    },
    {
      id: 7,
      type: 'multiple-choice',
      question: '¿Cuál es el número mínimo de árbitros que puede conformar un tribunal arbitral?',
      options: [
        '1 árbitro',
        '2 árbitros',
        '3 árbitros',
        '5 árbitros'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'El tribunal arbitral puede estar conformado por un árbitro único o por un número impar de árbitros, siendo el mínimo 1.'
    },
    {
      id: 8,
      type: 'multiple-answer',
      question: 'Identifica las ventajas del arbitraje frente al proceso judicial:',
      options: [
        'Mayor celeridad en la resolución',
        'Menor costo económico',
        'Especialización de los árbitros',
        'Confidencialidad del proceso',
        'Posibilidad de apelación ilimitada'
      ],
      correctAnswer: [0, 2, 3],
      points: 3,
      explanation: 'Las principales ventajas son: celeridad, especialización y confidencialidad. El arbitraje no necesariamente es más económico y tiene recursos limitados.'
    },
    {
      id: 9,
      type: 'multiple-choice',
      question: '¿Qué institución es reconocida internacionalmente para la administración de arbitrajes comerciales internacionales?',
      options: [
        'ONU',
        'CCI (Cámara de Comercio Internacional)',
        'OEA',
        'FMI'
      ],
      correctAnswer: 1,
      points: 2,
      explanation: 'La CCI (Cámara de Comercio Internacional) es una de las instituciones más prestigiosas en la administración de arbitrajes comerciales internacionales.'
    },
    {
      id: 10,
      type: 'true-false',
      question: 'En el arbitraje ad hoc, las partes deben seguir necesariamente un reglamento institucional.',
      options: ['Verdadero', 'Falso'],
      correctAnswer: 1,
      points: 2,
      explanation: 'Falso. En el arbitraje ad hoc las partes tienen libertad para establecer sus propias reglas de procedimiento, sin necesidad de seguir un reglamento institucional.'
    }
  ];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId: number, answer: number) => {
    const question = questions.find(q => q.id === questionId);
    
    if (question?.type === 'multiple-answer') {
      const currentAnswers = (selectedAnswers[questionId] as number[]) || [];
      const newAnswers = currentAnswers.includes(answer)
        ? currentAnswers.filter(a => a !== answer)
        : [...currentAnswers, answer];
      
      setSelectedAnswers({
        ...selectedAnswers,
        [questionId]: newAnswers
      });
    } else {
      setSelectedAnswers({
        ...selectedAnswers,
        [questionId]: answer
      });
    }
  };

  const isAnswerSelected = (questionId: number, answer: number): boolean => {
    const selected = selectedAnswers[questionId];
    if (Array.isArray(selected)) {
      return selected.includes(answer);
    }
    return selected === answer;
  };

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach((question) => {
      const userAnswer = selectedAnswers[question.id];
      if (Array.isArray(question.correctAnswer)) {
        // Multiple answer question - puntaje parcial
        const correctAnswers = question.correctAnswer as number[];
        const userAnswers = (userAnswer as number[]) || [];
        
        // Contar respuestas correctas marcadas
        const correctMarked = userAnswers.filter(ans => correctAnswers.includes(ans)).length;
        // Contar respuestas incorrectas marcadas
        const incorrectMarked = userAnswers.filter(ans => !correctAnswers.includes(ans)).length;
        
        // Si marcó respuestas incorrectas, no obtiene puntos
        if (incorrectMarked > 0) {
          totalScore += 0;
        } else if (correctMarked > 0) {
          // Puntaje parcial: (correctas marcadas / total correctas) * puntos
          totalScore += (correctMarked / correctAnswers.length) * question.points;
        }
      } else {
        // Single answer question
        if (userAnswer === question.correctAnswer) {
          totalScore += question.points;
        }
      }
    });
    return totalScore;
  };

  // Nueva función para calcular puntos por pregunta individual
  const calculateQuestionScore = (question: Question): { earned: number; total: number } => {
    const userAnswer = selectedAnswers[question.id];
    const total = question.points;
    
    if (Array.isArray(question.correctAnswer)) {
      // Multiple answer question
      const correctAnswers = question.correctAnswer as number[];
      const userAnswers = (userAnswer as number[]) || [];
      
      const correctMarked = userAnswers.filter(ans => correctAnswers.includes(ans)).length;
      const incorrectMarked = userAnswers.filter(ans => !correctAnswers.includes(ans)).length;
      
      if (incorrectMarked > 0) {
        return { earned: 0, total };
      } else if (correctMarked > 0) {
        return { earned: (correctMarked / correctAnswers.length) * total, total };
      }
      return { earned: 0, total };
    } else {
      // Single answer question
      if (userAnswer === question.correctAnswer) {
        return { earned: total, total };
      }
      return { earned: 0, total };
    }
  };

  const handleSubmitQuiz = () => {
    const score = calculateScore();
    setQuizCompleted(true);
    setShowResults(true);
    
    if (score >= quizData.passingScore) {
      toast.success(`¡Felicidades! Has aprobado con ${score}/${quizData.totalPoints} puntos`);
    } else {
      toast.error(`Has obtenido ${score}/${quizData.totalPoints} puntos. Necesitas ${quizData.passingScore} para aprobar.`);
    }
  };

  const getQuestionStatus = (questionId: number): 'answered' | 'unanswered' => {
    return selectedAnswers[questionId] !== undefined ? 'answered' : 'unanswered';
  };

  const getQuestionTypeLabel = (type: QuestionType): { text: string; color: string } => {
    switch (type) {
      case 'multiple-choice':
        return { text: 'Opción única', color: 'bg-blue-100 text-blue-700' };
      case 'multiple-answer':
        return { text: 'Opción múltiple', color: 'bg-indigo-100 text-indigo-700' };
      case 'true-false':
        return { text: 'Verdadero/Falso', color: 'bg-cyan-100 text-cyan-700' };
      case 'long-answer':
        return { text: 'Pregunta larga', color: 'bg-teal-100 text-teal-700' };
      default:
        return { text: 'Pregunta', color: 'bg-gray-100 text-gray-700' };
    }
  };

  // Pre-Quiz View
  if (!quizStarted && !quizCompleted) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
          {onBack && (
            <button
              onClick={onBack}
              className="mb-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
            >
              ← Volver al curso
            </button>
          )}
          <h1 className="text-4xl font-bold mb-2">{quizData.title}</h1>
          <p className="text-xl opacity-90">{quizData.course}</p>
          <div className="flex items-center gap-4 mt-3 text-sm">
            <span>{quizData.module}</span>
            <span>•</span>
            <span>{quizData.session}</span>
          </div>
        </div>

        {/* Quiz Information */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Instrucciones del quiz</h2>
          <p className="text-gray-700 mb-6">{quizData.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-5 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-6 h-6 text-blue-600" />
                <span className="font-bold text-gray-900">Preguntas</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">{quizData.totalQuestions}</p>
            </div>

            <div className="p-5 bg-purple-50 rounded-xl border border-purple-200">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-6 h-6 text-purple-600" />
                <span className="font-bold text-gray-900">Puntaje total</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">{quizData.totalPoints} puntos</p>
            </div>

            <div className="p-5 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <span className="font-bold text-gray-900">Puntaje mínimo</span>
              </div>
              <p className="text-2xl font-bold text-green-600">{quizData.passingScore} puntos</p>
            </div>

            <div className="p-5 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-6 h-6 text-amber-600" />
                <span className="font-bold text-gray-900">Tiempo límite</span>
              </div>
              <p className="text-2xl font-bold text-amber-600">{quizData.timeLimit} minutos</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              Importante
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#0B95BA] mt-1">•</span>
                <span>Una vez iniciado el quiz, el cronómetro comenzará a contar.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0B95BA] mt-1">•</span>
                <span>Podrás navegar entre preguntas y modificar tus respuestas antes de enviar.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0B95BA] mt-1">•</span>
                <span>Tiene <strong>{quizData.attempts}</strong> intentos disponibles. Ha usado <strong>{quizData.attemptsUsed}</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0B95BA] mt-1">•</span>
                <span>Fecha límite: <strong>{quizData.dueDate} a las {quizData.dueTime}</strong></span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setQuizStarted(true)}
            className="w-full py-4 bg-[#0B95BA] hover:bg-[#087A98] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-6 h-6" />
            Iniciar quiz
          </button>
        </div>
      </div>
    );
  }

  // Quiz in Progress
  if (quizStarted && !quizCompleted && !showSummary) {
    const currentQ = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const answeredCount = Object.keys(selectedAnswers).length;

    return (
      <div className="space-y-6">
        {/* Fixed Header with Timer */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 sticky top-0 z-10 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-xl text-gray-900">{quizData.title}</h2>
              <p className="text-sm text-gray-600">
                Pregunta {currentQuestion + 1} de {questions.length}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="px-5 py-3 bg-amber-100 rounded-xl border border-amber-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-900" style={{ stroke: '#78350f' }} />
                  <span className="font-bold text-xl text-amber-900">{formatTime(timeRemaining)}</span>
                </div>
              </div>
              
              <button
                onClick={() => {
                  if (confirm('¿Estás seguro de que deseas salir? Tu progreso se perderá.')) {
                    setQuizStarted(false);
                  }
                }}
                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-red-600" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0B95BA] rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between mt-3 text-sm">
            <span className="text-gray-600">
              {answeredCount} de {questions.length} respondidas
            </span>
            <span className="font-medium text-[#0B95BA]">{Math.round(progress)}% completado</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-[#0B95BA] rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">{currentQuestion + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {currentQ.points} {currentQ.points === 1 ? 'punto' : 'puntos'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getQuestionTypeLabel(currentQ.type).color}`}>
                      {getQuestionTypeLabel(currentQ.type).text}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">{currentQ.question}</h3>

                  {/* Options */}
                  <div className="space-y-3">
                    {currentQ.options.map((option, index) => {
                      const isSelected = isAnswerSelected(currentQ.id, index);
                      
                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(currentQ.id, index)}
                          className={`w-full p-5 rounded-xl border-2 transition-all text-left flex items-center gap-4 ${
                            isSelected
                              ? 'border-[#0B95BA] bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? 'border-[#0B95BA] bg-[#0B95BA]'
                              : 'border-gray-300'
                          }`}>
                            {isSelected && <CheckCircle className="w-5 h-5 text-white" />}
                          </div>
                          <span className={`font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                            {option}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Anterior
                </button>

                {currentQuestion === questions.length - 1 ? (
                  <button
                    onClick={() => {
                      const answeredCount = Object.keys(selectedAnswers).length;
                      const allAnswered = answeredCount === questions.length;
                      
                      if (allAnswered) {
                        handleSubmitQuiz();
                      } else {
                        setShowSummary(true);
                      }
                    }}
                    className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors flex items-center gap-2"
                  >
                    <Flag className="w-5 h-5" />
                    Finalizar quiz
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                    className="px-6 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-xl transition-colors flex items-center gap-2"
                  >
                    Siguiente
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Question Navigator */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-32">
              <h3 className="font-bold text-gray-900 mb-4">Navegación</h3>
              <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
                {questions.map((q, index) => {
                  const status = getQuestionStatus(q.id);
                  const isCurrent = index === currentQuestion;
                  
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestion(index)}
                      className={`aspect-square rounded-lg font-bold text-sm transition-all ${
                        isCurrent
                          ? 'bg-[#0B95BA] text-white ring-2 ring-[#0B95BA] ring-offset-2'
                          : status === 'answered'
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#0B95BA] rounded"></div>
                  <span className="text-gray-600">Actual</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 rounded"></div>
                  <span className="text-gray-600">Respondida</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 rounded"></div>
                  <span className="text-gray-600">Sin responder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results View
  if (showResults) {
    const score = calculateScore();
    const percentage = (score / quizData.totalPoints) * 100;
    const passed = score >= quizData.passingScore;

    return (
      <div className="space-y-6">
        {/* Results Header */}
        <div className={`rounded-3xl p-8 text-white ${
          passed
            ? 'bg-gradient-to-r from-green-600 to-green-700'
            : 'bg-gradient-to-r from-red-600 to-red-700'
        }`}>
          <div className="flex items-center gap-4 mb-4">
            {passed ? (
              <CheckCircle className="w-16 h-16" />
            ) : (
              <AlertCircle className="w-16 h-16" />
            )}
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {passed ? '¡Felicidades!' : 'Quiz completado'}
              </h1>
              <p className="text-xl opacity-90">
                {passed
                  ? 'Has aprobado el quiz exitosamente'
                  : 'No has alcanzado el puntaje mínimo'}
              </p>
            </div>
          </div>
        </div>

        {/* Score Summary */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumen de resultados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className={`p-6 rounded-2xl border-2 ${
              passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}>
              <p className="text-sm font-medium text-gray-700 mb-2">Tu Puntaje</p>
              <p className={`text-4xl font-bold ${passed ? 'text-green-700' : 'text-red-700'}`}>
                {score}/{quizData.totalPoints}
              </p>
              <p className="text-sm text-gray-600 mt-1">{percentage.toFixed(1)}%</p>
            </div>

            <div className="p-6 bg-blue-50 rounded-2xl border-2 border-blue-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Puntaje mínimo</p>
              <p className="text-4xl font-bold text-blue-700">{quizData.passingScore}/{quizData.totalPoints}</p>
              <p className="text-sm text-gray-600 mt-1">{((quizData.passingScore / quizData.totalPoints) * 100).toFixed(1)}%</p>
            </div>

            <div className="p-6 bg-purple-50 rounded-2xl border-2 border-purple-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Respuestas Correctas</p>
              <p className="text-4xl font-bold text-purple-700">
                {questions.filter((q) => {
                  const userAnswer = selectedAnswers[q.id];
                  if (Array.isArray(q.correctAnswer)) {
                    const correctAnswers = q.correctAnswer as number[];
                    const userAnswers = (userAnswer as number[]) || [];
                    return correctAnswers.length === userAnswers.length &&
                           correctAnswers.every(ans => userAnswers.includes(ans));
                  }
                  return userAnswer === q.correctAnswer;
                }).length}/{questions.length}
              </p>
            </div>
          </div>

          {!passed && quizData.attemptsUsed < quizData.attempts && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-900 mb-1">Tienes más intentos disponibles</p>
                  <p className="text-sm text-amber-800">
                    Has usado {quizData.attemptsUsed + 1} de {quizData.attempts} intentos. Puedes volver a intentarlo para mejorar tu calificación.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
              >
                Volver a actividades
              </button>
            )}
            {!passed && quizData.attemptsUsed < quizData.attempts && (
              <button
                onClick={() => {
                  setQuizStarted(false);
                  setQuizCompleted(false);
                  setShowResults(false);
                  setSelectedAnswers({});
                  setCurrentQuestion(0);
                }}
                className="flex-1 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-xl transition-colors"
              >
                Intentar Nuevamente
              </button>
            )}
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Revisión Detallada</h3>
          
          <div className="space-y-6">
            {questions.map((question, qIndex) => {
              const userAnswer = selectedAnswers[question.id];
              let isCorrect = false;
              const questionScore = calculateQuestionScore(question);

              if (Array.isArray(question.correctAnswer)) {
                const correctAnswers = question.correctAnswer as number[];
                const userAnswers = (userAnswer as number[]) || [];
                isCorrect = correctAnswers.length === userAnswers.length &&
                           correctAnswers.every(ans => userAnswers.includes(ans));
              } else {
                isCorrect = userAnswer === question.correctAnswer;
              }

              return (
                <div key={question.id} className={`p-6 rounded-xl border-2 ${
                  isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCorrect ? 'bg-green-600' : 'bg-red-600'
                    }`}>
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <X className="w-6 h-6 text-white" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-gray-900">Pregunta {qIndex + 1}</span>
                        {question.type === 'multiple-answer' && questionScore.earned > 0 && questionScore.earned < questionScore.total ? (
                          // Mostrar puntaje parcial para preguntas de opción múltiple
                          <span className="px-2 py-1 bg-amber-100 border border-amber-300 rounded-full text-xs font-medium text-amber-800">
                            {questionScore.earned.toFixed(1)}/{questionScore.total} puntos (parcial)
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-white rounded-full text-xs font-medium">
                            {questionScore.earned}/{questionScore.total} puntos
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQuestionTypeLabel(question.type).color}`}>
                          {getQuestionTypeLabel(question.type).text}
                        </span>
                      </div>
                      
                      <p className="font-medium text-gray-900 mb-3">{question.question}</p>
                      
                      {/* Display all options */}
                      <div className="space-y-2 mb-3">
                        {question.options.map((option, optionIndex) => {
                          const isUserAnswer = Array.isArray(selectedAnswers[question.id])
                            ? (selectedAnswers[question.id] as number[]).includes(optionIndex)
                            : selectedAnswers[question.id] === optionIndex;
                          
                          return (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-lg border-2 flex items-center gap-3 ${
                                isUserAnswer
                                  ? 'bg-blue-100 border-blue-300'
                                  : 'bg-white border-gray-200'
                              }`}
                            >
                              <div className="flex-shrink-0">
                                {isUserAnswer ? (
                                  <CheckCircle className="w-5 h-5 text-blue-600" />
                                ) : (
                                  <Circle className="w-5 h-5 text-gray-300" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{option}</p>
                                {isUserAnswer && (
                                  <p className="text-xs text-blue-600 mt-1">Su respuesta</p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {question.explanation && (
                        <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-700">
                            <strong>Explicación:</strong> {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Summary View (Before Submit)
  if (showSummary && !quizCompleted) {
    const answeredCount = Object.keys(selectedAnswers).length;
    const unansweredCount = questions.length - answeredCount;

    const getAnswerText = (questionId: number): string => {
      const question = questions.find(q => q.id === questionId);
      const answer = selectedAnswers[questionId];
      
      if (!question || answer === undefined) return 'Sin responder';
      
      if (Array.isArray(answer)) {
        return answer.map(idx => question.options[idx]).join(', ');
      }
      
      return question.options[answer as number];
    };

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">Resumen de respuestas</h1>
          <p className="text-xl opacity-90">Revise sus respuestas antes de enviar el quiz</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border-2 border-green-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <span className="font-bold text-gray-900">Respondidas</span>
              </div>
              <p className="text-4xl font-bold text-green-600">{answeredCount}</p>
            </div>
          </div>

          {unansweredCount > 0 && (
            <div className="bg-white rounded-2xl border-2 border-amber-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-8 h-8 text-amber-600" />
                  <span className="font-bold text-gray-900">Sin responder</span>
                </div>
                <p className="text-4xl font-bold text-amber-600">{unansweredCount}</p>
              </div>
            </div>
          )}
        </div>

        {/* Warning for unanswered questions */}
        {unansweredCount > 0 && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-amber-900 mb-2">Atención: Preguntas sin responder</h3>
                <p className="text-amber-800">
                  Tiene {unansweredCount} {unansweredCount === 1 ? 'pregunta' : 'preguntas'} sin responder. 
                  Puede regresar y completarlas o enviar el quiz con las respuestas actuales.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Questions Summary */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumen completo</h2>
          
          <div className="space-y-4">
            {questions.map((question, index) => {
              const isAnswered = selectedAnswers[question.id] !== undefined;
              
              return (
                <div
                  key={question.id}
                  className={`p-5 rounded-xl border-2 transition-all ${
                    isAnswered
                      ? 'border-green-200 bg-green-50 hover:bg-green-100'
                      : 'border-amber-200 bg-amber-50 hover:bg-amber-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-gray-900">Pregunta {index + 1}</span>
                        <span className="px-2 py-1 bg-white rounded-full text-xs font-medium">
                          {question.points} puntos
                        </span>
                        {isAnswered ? (
                          <span className="px-2 py-1 bg-green-600 text-white rounded-full text-xs font-medium">
                            Respondida
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-amber-600 text-white rounded-full text-xs font-medium">
                            Sin responder
                          </span>
                        )}
                      </div>
                      
                      <p className="font-medium text-gray-900 mb-3">{question.question}</p>
                      
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">Su respuesta:</p>
                        <p className={`text-sm ${isAnswered ? 'text-gray-900' : 'text-amber-700 italic'}`}>
                          {getAnswerText(question.id)}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setShowSummary(false);
                        setCurrentQuestion(index);
                      }}
                      className="px-4 py-2 bg-[#0B95BA] hover:bg-[#087A98] text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Editar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <div className="flex gap-4">
            <button
              onClick={() => setShowSummary(false)}
              className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Seguir respondiendo
            </button>
            
            <button
              onClick={handleSubmitQuiz}
              className="flex-1 px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Confirmar y enviar quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}