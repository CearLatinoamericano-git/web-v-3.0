import { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Clock,
  User,
  FileText,
  AlertCircle,
  Save,
  Edit3,
  X
} from 'lucide-react';
import { toast } from 'sonner';

interface QuizGradingViewProps {
  quizId: string;
  quizTitle: string;
  onBack: () => void;
}

interface StudentSubmission {
  id: string;
  studentName: string;
  studentId: string;
  submittedAt: string;
  timeSpent: string;
  status: 'pending' | 'graded';
  score?: number;
  answers: Array<{
    questionId: string;
    questionText: string;
    questionType: 'multiple-choice' | 'true-false' | 'essay';
    studentAnswer: string | string[];
    correctAnswer?: string | string[];
    isCorrect?: boolean;
    points: number;
    earnedPoints?: number;
    feedback?: string;
  }>;
}

export function QuizGradingView({ quizId, quizTitle, onBack }: QuizGradingViewProps) {
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([
    {
      id: '1',
      studentName: 'María García Pérez',
      studentId: 'E001',
      submittedAt: '2024-12-01 14:30',
      timeSpent: '25 min',
      status: 'pending',
      answers: [
        {
          questionId: 'q1',
          questionText: '¿Cuál es el marco legal principal del arbitraje en Perú?',
          questionType: 'multiple-choice',
          studentAnswer: 'Decreto Legislativo N° 1071',
          correctAnswer: 'Decreto Legislativo N° 1071',
          isCorrect: true,
          points: 10,
          earnedPoints: 10
        },
        {
          questionId: 'q2',
          questionText: 'El arbitraje es un método de resolución de conflictos vinculante',
          questionType: 'true-false',
          studentAnswer: 'Verdadero',
          correctAnswer: 'Verdadero',
          isCorrect: true,
          points: 5,
          earnedPoints: 5
        },
        {
          questionId: 'q3',
          questionText: 'Explique las ventajas del arbitraje sobre el proceso judicial tradicional',
          questionType: 'essay',
          studentAnswer: 'El arbitraje presenta varias ventajas significativas: 1) Rapidez en la resolución del conflicto, 2) Confidencialidad del proceso, 3) Especialización de los árbitros en la materia, 4) Flexibilidad procedimental, 5) Carácter vinculante del laudo. Además, permite a las partes elegir árbitros con experiencia específica en el área de controversia.',
          points: 15,
          earnedPoints: undefined
        }
      ]
    },
    {
      id: '2',
      studentName: 'Carlos Rodríguez Silva',
      studentId: 'E002',
      submittedAt: '2024-12-01 15:45',
      timeSpent: '30 min',
      status: 'graded',
      score: 85,
      answers: [
        {
          questionId: 'q1',
          questionText: '¿Cuál es el marco legal principal del arbitraje en Perú?',
          questionType: 'multiple-choice',
          studentAnswer: 'Código Civil',
          correctAnswer: 'Decreto Legislativo N° 1071',
          isCorrect: false,
          points: 10,
          earnedPoints: 0
        },
        {
          questionId: 'q2',
          questionText: 'El arbitraje es un método de resolución de conflictos vinculante',
          questionType: 'true-false',
          studentAnswer: 'Verdadero',
          correctAnswer: 'Verdadero',
          isCorrect: true,
          points: 5,
          earnedPoints: 5
        },
        {
          questionId: 'q3',
          questionText: 'Explique las ventajas del arbitraje sobre el proceso judicial tradicional',
          questionType: 'essay',
          studentAnswer: 'Es más rápido y los árbitros saben del tema.',
          points: 15,
          earnedPoints: 10,
          feedback: 'Respuesta muy breve. Debió desarrollar más las ventajas y dar ejemplos concretos.'
        }
      ]
    }
  ]);

  const [selectedSubmission, setSelectedSubmission] = useState<StudentSubmission | null>(null);
  const [editingAnswer, setEditingAnswer] = useState<string | null>(null);
  const [manualGrade, setManualGrade] = useState<number>(0);
  const [manualFeedback, setManualFeedback] = useState<string>('');

  const handleGradeEssay = (submissionId: string, questionId: string, points: number, feedback: string) => {
    setSubmissions(submissions.map(sub => {
      if (sub.id === submissionId) {
        const updatedAnswers = sub.answers.map(ans => 
          ans.questionId === questionId 
            ? { ...ans, earnedPoints: points, feedback } 
            : ans
        );
        
        const totalEarned = updatedAnswers.reduce((sum, ans) => sum + (ans.earnedPoints || 0), 0);
        const totalPoints = updatedAnswers.reduce((sum, ans) => sum + ans.points, 0);
        const score = Math.round((totalEarned / totalPoints) * 100);
        
        return {
          ...sub,
          answers: updatedAnswers,
          status: 'graded' as const,
          score
        };
      }
      return sub;
    }));

    setEditingAnswer(null);
    toast.success('Calificación guardada correctamente.');
  };

  const updateQuestionPoints = (questionId: string, points: number) => {
    if (!selectedSubmission) return;

    const updatedAnswers = selectedSubmission.answers.map(ans => {
      if (ans.questionId === questionId) {
        return { ...ans, earnedPoints: Math.max(0, Math.min(points, ans.points)) };
      }
      return ans;
    });

    setSelectedSubmission({
      ...selectedSubmission,
      answers: updatedAnswers
    });
  };

  const handleSaveAllGrades = () => {
    if (!selectedSubmission) return;

    const totalEarned = selectedSubmission.answers.reduce((sum, ans) => sum + (ans.earnedPoints || 0), 0);
    const totalPoints = selectedSubmission.answers.reduce((sum, ans) => sum + ans.points, 0);
    const finalScore = Math.round((totalEarned / totalPoints) * 100);

    setSubmissions(submissions.map(sub => 
      sub.id === selectedSubmission.id 
        ? { ...sub, answers: selectedSubmission.answers, status: 'graded', score: finalScore }
        : sub
    ));

    toast.success('Calificación guardada correctamente.');
    setSelectedSubmission(null);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full my-6 mx-6 shadow-2xl">
        <div className="space-y-6 p-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white -mx-8 -mt-8 mb-6">
            <button
              onClick={onBack}
              className="mb-3 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </button>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Calificar quiz</h1>
                <p className="text-white/90 text-xl mb-4">{quizTitle}</p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                    <User className="w-4 h-4" />
                    <span>{submissions.length} entregas</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                    <CheckCircle className="w-4 h-4" />
                    <span>{submissions.filter(s => s.status === 'graded').length} calificadas</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                    <Clock className="w-4 h-4" />
                    <span>{submissions.filter(s => s.status === 'pending').length} pendientes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* List View */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Entregas de estudiantes</h2>
            
            <div className="space-y-3">
              {submissions.map((submission) => {
                const hasEssayQuestions = submission.answers.some(a => a.questionType === 'essay');
                const allEssaysGraded = submission.answers
                  .filter(a => a.questionType === 'essay')
                  .every(a => a.earnedPoints !== undefined);
                
                return (
                  <div
                    key={submission.id}
                    className={`p-5 rounded-2xl border-2 ${
                      submission.status === 'graded' ? 'border-green-200 bg-green-50/30' :
                      'border-amber-200 bg-amber-50/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-full flex items-center justify-center text-white flex-shrink-0">
                          <User className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1">{submission.studentName}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {submission.studentId}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {submission.submittedAt}
                            </span>
                            <span>Tiempo: {submission.timeSpent}</span>
                          </div>
                          
                          {submission.status === 'graded' ? (
                            <div className="mt-2">
                              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium inline-flex items-center gap-1">
                                <CheckCircle className="w-4 h-4" />
                                Calificado: {submission.score}%
                              </span>
                            </div>
                          ) : hasEssayQuestions && !allEssaysGraded ? (
                            <div className="mt-2">
                              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium inline-flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                Requiere calificación manual
                              </span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 ml-4">
                        {submission.status === 'graded' && submission.score !== undefined ? (
                          <>
                            <div className="text-right">
                              <p className="text-sm text-gray-600 mb-1">Calificación</p>
                              <p className="text-3xl font-bold text-green-600">
                                {submission.score}%
                              </p>
                            </div>
                            <button
                              onClick={() => setSelectedSubmission(submission)}
                              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
                            >
                              <Edit3 className="w-5 h-5" />
                              Ver detalles
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => setSelectedSubmission(submission)}
                            className="px-6 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-xl transition-colors flex items-center gap-2"
                          >
                            <FileText className="w-5 h-5" />
                            Calificar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {submissions.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="font-bold text-gray-900 mb-2">No hay entregas aún</h3>
                  <p className="text-gray-600">Los estudiantes aún no han completado este quiz.</p>
                </div>
              )}
            </div>
          </div>

          {/* Grading Modal */}
          {selectedSubmission && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
              <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[80vh] overflow-hidden shadow-2xl flex flex-col">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] p-5 flex items-center justify-between flex-shrink-0">
                  <div>
                    <h2 className="text-xl font-bold text-white">Calificar cuestionario</h2>
                    <p className="text-white/90 text-sm">{selectedSubmission.studentName} • {selectedSubmission.studentId}</p>
                  </div>
                  <button
                    onClick={() => setSelectedSubmission(null)}
                    className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto flex-1 p-5 space-y-4">
                  {/* Summary Card */}
                  <div className="bg-[#eff6ff] rounded-xl p-4 border-2 border-[#bedbff]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[#1c398e] mb-1">Fecha de entrega</p>
                        <p className="font-medium text-gray-900 text-sm">{selectedSubmission.submittedAt}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#1c398e] mb-1">Tiempo empleado</p>
                        <p className="font-medium text-gray-900 text-sm">{selectedSubmission.timeSpent}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#1c398e] mb-1">Puntaje actual</p>
                        <p className="font-bold text-[#0B95BA] text-lg">
                          {selectedSubmission.answers.reduce((sum, a) => sum + (a.earnedPoints || 0), 0).toFixed(1)}/
                          {selectedSubmission.answers.reduce((sum, a) => sum + a.points, 0)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Questions and Answers */}
                  <div className="space-y-3">
                    {selectedSubmission.answers.map((answer, index) => (
                      <div key={answer.questionId} className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2 py-1 bg-[#0B95BA] text-white rounded-lg font-bold text-xs">
                                P{index + 1}
                              </span>
                              <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                answer.questionType === 'essay' 
                                  ? 'bg-blue-100 text-blue-700' 
                                  : answer.questionType === 'multiple-choice'
                                  ? 'bg-purple-100 text-purple-700'
                                  : 'bg-green-100 text-green-700'
                              }`}>
                                {answer.questionType === 'multiple-choice' && 'Opción múltiple'}
                                {answer.questionType === 'true-false' && 'V/F'}
                                {answer.questionType === 'essay' && 'Desarrollo'}
                              </span>
                              <span className="text-xs text-gray-600">
                                {answer.points} pts
                              </span>
                            </div>
                            <p className="font-medium text-gray-900 text-sm mb-3">{answer.questionText}</p>
                          </div>
                          {answer.isCorrect !== undefined && answer.questionType !== 'essay' && (
                            <div className="ml-2">
                              {answer.isCorrect ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-600" />
                              )}
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          {/* Student Answer */}
                          <div>
                            <p className="text-xs font-medium text-gray-700 mb-1">Respuesta del estudiante:</p>
                            <div className="bg-white rounded-lg p-3 border border-blue-200">
                              <p className="text-gray-900 text-sm">{Array.isArray(answer.studentAnswer) ? answer.studentAnswer.join(', ') : answer.studentAnswer}</p>
                            </div>
                          </div>

                          {/* Correct Answer (if not essay) */}
                          {answer.correctAnswer && answer.questionType !== 'essay' && (
                            <div>
                              <p className="text-xs font-medium text-gray-700 mb-1">Respuesta correcta:</p>
                              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                <p className="text-gray-900 text-sm">{Array.isArray(answer.correctAnswer) ? answer.correctAnswer.join(', ') : answer.correctAnswer}</p>
                              </div>
                            </div>
                          )}

                          {/* Manual Grading for Essay Questions */}
                          {answer.questionType === 'essay' && (
                            <div>
                              {editingAnswer === answer.questionId ? (
                                <div className="bg-blue-50 rounded-lg p-3 space-y-3 border border-blue-200">
                                  <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                      Puntos obtenidos (de {answer.points})
                                    </label>
                                    <input
                                      type="number"
                                      min="0"
                                      max={answer.points}
                                      step="0.5"
                                      value={manualGrade}
                                      onChange={(e) => setManualGrade(parseFloat(e.target.value) || 0)}
                                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0B95BA] text-sm"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                      Retroalimentación
                                    </label>
                                    <textarea
                                      value={manualFeedback}
                                      onChange={(e) => setManualFeedback(e.target.value)}
                                      rows={2}
                                      placeholder="Comentarios..."
                                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0B95BA] text-sm"
                                    />
                                  </div>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => {
                                        handleGradeEssay(
                                          selectedSubmission.id,
                                          answer.questionId,
                                          manualGrade,
                                          manualFeedback
                                        );
                                        updateQuestionPoints(answer.questionId, manualGrade);
                                      }}
                                      className="px-3 py-2 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-lg transition-colors text-sm"
                                    >
                                      Guardar
                                    </button>
                                    <button
                                      onClick={() => setEditingAnswer(null)}
                                      className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors text-sm"
                                    >
                                      Cancelar
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  {answer.earnedPoints !== undefined ? (
                                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                      <div className="flex items-center justify-between mb-1">
                                        <p className="text-xs font-medium text-green-700">
                                          Calificación: {answer.earnedPoints} / {answer.points} pts
                                        </p>
                                        <button
                                          onClick={() => {
                                            setEditingAnswer(answer.questionId);
                                            setManualGrade(answer.earnedPoints || 0);
                                            setManualFeedback(answer.feedback || '');
                                          }}
                                          className="p-1 hover:bg-green-200 rounded-lg transition-colors"
                                        >
                                          <Edit3 className="w-4 h-4 text-green-700" />
                                        </button>
                                      </div>
                                      {answer.feedback && (
                                        <p className="text-xs text-green-900 mt-1">{answer.feedback}</p>
                                      )}
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        setEditingAnswer(answer.questionId);
                                        setManualGrade(answer.points);
                                        setManualFeedback('');
                                      }}
                                      className="w-full px-3 py-2 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                                    >
                                      <Edit3 className="w-4 h-4" />
                                      Calificar
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Points Assignment for non-essay */}
                          {answer.questionType !== 'essay' && (
                            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                              <p className="font-medium text-gray-900 text-sm">Puntaje:</p>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuestionPoints(answer.questionId, (answer.earnedPoints || 0) - 0.5)}
                                  className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-gray-700 transition-colors text-sm"
                                >
                                  -
                                </button>
                                <div className="w-20 text-center">
                                  <input
                                    type="number"
                                    min="0"
                                    max={answer.points}
                                    step="0.5"
                                    value={answer.earnedPoints || 0}
                                    onChange={(e) => updateQuestionPoints(answer.questionId, parseFloat(e.target.value) || 0)}
                                    className="w-full px-2 py-1 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0B95BA] text-center font-bold text-sm"
                                  />
                                  <p className="text-xs text-gray-600">de {answer.points}</p>
                                </div>
                                <button
                                  onClick={() => updateQuestionPoints(answer.questionId, (answer.earnedPoints || 0) + 0.5)}
                                  className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-gray-700 transition-colors text-sm"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Actions - Fixed at bottom */}
                <div className="flex items-center justify-between p-5 border-t-2 border-gray-200 bg-white flex-shrink-0">
                  <div className="text-gray-900">
                    <p className="text-xs mb-1">Calificación final</p>
                    <p className="text-2xl font-bold text-[#0B95BA]">
                      {selectedSubmission.answers.reduce((sum, a) => sum + (a.earnedPoints || 0), 0).toFixed(1)}/
                      {selectedSubmission.answers.reduce((sum, a) => sum + a.points, 0)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedSubmission(null)}
                      className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors text-sm"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSaveAllGrades}
                      className="px-4 py-2 bg-[#0B95BA] hover:bg-[#087A98] text-white rounded-xl font-medium transition-colors flex items-center gap-2 text-sm"
                    >
                      <Save className="w-4 h-4" />
                      Guardar calificación
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}