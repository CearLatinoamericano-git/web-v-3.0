import { useState } from 'react';
import { BarChart3, Info, Award, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';

// Mock data - En producción vendría de la API
const mockGradesData = {
  courseName: 'Diplomado en Arbitraje Comercial Internacional',
  finalGrade: 16.5,
  maxGrade: 20,
  averageGrade: 85,
  completedActivities: 8,
  totalActivities: 12,
  modules: [
    {
      id: '1',
      name: 'Módulo 1: Fundamentos',
      weight: 40,
      moduleGrade: 17.2,
      sessions: [
        {
          id: '1-1',
          name: 'Sesión 1: Introducción',
          activities: [
            { 
              id: '1-1-1', 
              name: 'Quiz: Conceptos Básicos', 
              type: 'quiz', 
              weight: 50,
              score: 18,
              maxScore: 20,
              status: 'completed',
              submittedDate: '2025-11-15'
            },
            { 
              id: '1-1-2', 
              name: 'Foro: Presentación', 
              type: 'forum', 
              weight: 50,
              score: 19,
              maxScore: 20,
              status: 'completed',
              submittedDate: '2025-11-16'
            }
          ]
        },
        {
          id: '1-2',
          name: 'Sesión 2: Marco Teórico',
          activities: [
            { 
              id: '1-2-1', 
              name: 'Control de lectura', 
              type: 'reading', 
              weight: 100,
              score: 16,
              maxScore: 20,
              status: 'completed',
              submittedDate: '2025-11-20'
            }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Módulo 2: Aplicación práctica',
      weight: 35,
      moduleGrade: 15.5,
      sessions: [
        {
          id: '2-1',
          name: 'Sesión 3: Casos Prácticos',
          activities: [
            { 
              id: '2-1-1', 
              name: 'Análisis de Caso', 
              type: 'assignment', 
              weight: 100,
              score: 15.5,
              maxScore: 20,
              status: 'completed',
              submittedDate: '2025-11-25'
            }
          ]
        },
        {
          id: '2-2',
          name: 'Sesión 4: Práctica Avanzada',
          activities: [
            { 
              id: '2-2-1', 
              name: 'Quiz: Aplicación práctica', 
              type: 'quiz', 
              weight: 100,
              status: 'pending',
              dueDate: '2025-12-05'
            }
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'Módulo 3: Evaluación final',
      weight: 25,
      moduleGrade: null,
      sessions: [
        {
          id: '3-1',
          name: 'Sesión final',
          activities: [
            { 
              id: '3-1-1', 
              name: 'Examen final', 
              type: 'exam', 
              weight: 100,
              status: 'upcoming',
              dueDate: '2025-12-15'
            }
          ]
        }
      ]
    }
  ]
};

interface Activity {
  id: string;
  name: string;
  type: 'quiz' | 'assignment' | 'forum' | 'reading' | 'exam';
  weight: number;
  score?: number;
  maxScore?: number;
  status: 'completed' | 'pending' | 'upcoming';
  submittedDate?: string;
  dueDate?: string;
}

interface Session {
  id: string;
  name: string;
  activities: Activity[];
}

interface Module {
  id: string;
  name: string;
  weight: number;
  moduleGrade: number | null;
  sessions: Session[];
}

export function StudentGradesView() {
  const { courseName, finalGrade, maxGrade, averageGrade, completedActivities, totalActivities, modules } = mockGradesData;

  const getActivityTypeLabel = (type: string) => {
    const types = {
      quiz: 'Cuestionario',
      assignment: 'Trabajo',
      forum: 'Foro',
      reading: 'Control de lectura',
      exam: 'Examen'
    };
    return types[type as keyof typeof types] || type;
  };

  const getActivityTypeColor = (type: string) => {
    const colors = {
      quiz: 'bg-blue-100 text-blue-800 border-blue-300',
      assignment: 'bg-purple-100 text-purple-800 border-purple-300',
      forum: 'bg-cyan-100 text-cyan-800 border-cyan-300',
      reading: 'bg-amber-100 text-amber-800 border-amber-300',
      exam: 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[type as keyof typeof types] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getStatusBadge = (status: string) => {
    if (status === 'completed') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold border-2 border-green-300">
          <CheckCircle className="w-3 h-3" />
          Completado
        </span>
      );
    }
    if (status === 'pending') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold border-2 border-amber-300">
          <Clock className="w-3 h-3" />
          Pendiente
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-bold border-2 border-gray-300">
        <AlertCircle className="w-3 h-3" />
        Próximo
      </span>
    );
  };

  const calculateModuleActivitiesTotal = (module: Module): number => {
    return module.sessions.reduce(
      (sum, session) => sum + session.activities.length,
      0
    );
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

  const calculateActivityContribution = (module: Module, session: Session, activity: Activity): number => {
    if (!activity.score || !activity.maxScore) return 0;
    const finalWeight = calculateActivityFinalWeight(module, session, activity);
    const scorePercentage = (activity.score / activity.maxScore) * 100;
    return (scorePercentage / 100) * finalWeight;
  };

  const calculateProgressPercentage = () => {
    return (completedActivities / totalActivities) * 100;
  };

  const calculateGradeFormula = () => {
    const contributions: number[] = [];
    modules.forEach(module => {
      module.sessions.forEach(session => {
        session.activities.forEach(activity => {
          if (activity.status === 'completed' && activity.score && activity.maxScore) {
            const contribution = calculateActivityContribution(module, session, activity);
            contributions.push(contribution);
          }
        });
      });
    });
    return contributions;
  };

  const getTotalWeightCompleted = () => {
    let totalWeight = 0;
    modules.forEach(module => {
      module.sessions.forEach(session => {
        session.activities.forEach(activity => {
          if (activity.status === 'completed') {
            const weight = calculateActivityFinalWeight(module, session, activity);
            totalWeight += weight;
          }
        });
      });
    });
    return totalWeight;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-1">Mis calificaciones</h2>
            <p className="text-lg opacity-90">{courseName}</p>
          </div>
        </div>
      </div>

      {/* GRADES VIEW */}
      <div className="space-y-4">
        {/* Info Panel */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-blue-900 mb-2">Cómo interpretar sus calificaciones</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p>• La <strong>nota del módulo</strong> se calcula según los criterios de calificación establecidos.</p>
                <p>• La <strong>contribución al programa</strong> muestra cuántos puntos aporta cada actividad a su nota final.</p>
                <p>• Su <strong>nota actual</strong> se calcula sumando las contribuciones de todas las actividades completadas.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Grades by Module */}
        {modules.map((module) => {
          const activitiesTotal = calculateModuleActivitiesTotal(module);
          
          return (
            <div key={module.id} className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
              {/* Module Header */}
              <div className="bg-[#0B5B6E] px-6 py-4 border-b-2 border-[#087A98]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-xl text-white">{module.name}</h3>
                    <p className="text-sm text-white/90 mt-1 font-medium">
                      Peso: {module.weight}% del programa • {module.sessions.length} sesiones • {activitiesTotal} actividades
                    </p>
                  </div>
                  <div className="text-right">
                    {module.moduleGrade !== null ? (
                      <>
                        <div className="text-4xl font-bold text-[rgb(238,248,251)]">{module.moduleGrade.toFixed(1)}</div>
                        <div className="text-xs text-white/90 font-medium">Nota del módulo</div>
                      </>
                    ) : (
                      <div className="text-lg font-bold text-white/70">Sin calificar</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Module Content */}
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-2 border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                          Actividad
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">
                          Tipo
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">
                          Calificación
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">
                          Peso Final
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">
                          Contribución al Programa
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300 bg-white">
                      {module.sessions.map((session) => {
                        return session.activities.map((activity) => {
                          const activityFinalWeight = calculateActivityFinalWeight(module, session, activity);
                          const contribution = calculateActivityContribution(module, session, activity);
                          
                          return (
                            <tr key={activity.id} className="hover:bg-gray-100 transition-colors">
                              <td className="px-4 py-4">
                                <p className="font-bold text-gray-900">{activity.name}</p>
                                <p className="text-xs text-gray-500 mt-1">{session.name}</p>
                              </td>
                              <td className="px-4 py-4 text-center">
                                <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold border-2 ${getActivityTypeColor(activity.type)}`}>
                                  {getActivityTypeLabel(activity.type)}
                                </span>
                              </td>
                              <td className="px-4 py-4 text-center">
                                {getStatusBadge(activity.status)}
                                {activity.submittedDate && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    Entregado: {activity.submittedDate}
                                  </p>
                                )}
                                {activity.dueDate && activity.status !== 'completed' && (
                                  <p className="text-xs text-amber-600 mt-1 font-medium">
                                    Vence: {activity.dueDate}
                                  </p>
                                )}
                              </td>
                              <td className="px-4 py-4 text-center">
                                {activity.score !== undefined && activity.maxScore !== undefined ? (
                                  <div>
                                    <div className="text-2xl font-bold text-gray-900">
                                      {activity.score}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      de {activity.maxScore}
                                    </div>
                                    <div className="text-xs font-bold text-[#0B95BA] mt-1">
                                      {((activity.score / activity.maxScore) * 100).toFixed(0)}%
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-gray-400 text-sm">—</span>
                                )}
                              </td>
                              <td className="px-4 py-4 text-center">
                                <div className="inline-flex flex-col items-center bg-purple-100 px-4 py-2 rounded-lg border-2 border-purple-300">
                                  <span className="font-bold text-purple-800 text-lg">
                                    {activityFinalWeight.toFixed(2)}%
                                  </span>
                                  <span className="text-xs text-purple-700 font-medium">del programa</span>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-center">
                                {activity.status === 'completed' ? (
                                  <div className="inline-flex flex-col items-center bg-[#0B95BA] px-5 py-2.5 rounded-lg shadow-sm">
                                    <span className="font-bold text-white text-xl">
                                      +{contribution.toFixed(2)}
                                    </span>
                                    <span className="text-xs text-white/90 font-medium">puntos</span>
                                  </div>
                                ) : (
                                  <span className="text-gray-400 text-sm">Pendiente</span>
                                )}
                              </td>
                            </tr>
                          );
                        });
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })}

        {/* Final Grade Calculated Section */}
        <div className="bg-[#0B5B6E] rounded-2xl p-6 text-white border-2 border-[#087A98]">
          <div className="flex items-center justify-between gap-6">
            <div>
              <h3 className="font-bold text-2xl text-white mb-1">NOTA FINAL CALCULADA</h3>
              <p className="text-white font-medium text-sm">Suma ponderada</p>
            </div>
            <div className="text-center px-6 py-3 bg-white/20 rounded-xl border-2 border-white/30">
              <div className="font-bold text-white text-lg">
                {getTotalWeightCompleted().toFixed(0)}%
              </div>
              <div className="text-white/90 text-xs font-medium mt-1">completado</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-white mb-2">
                {finalGrade.toFixed(1)}
              </div>
              <div className="text-white font-medium text-sm">
                {calculateGradeFormula().map(c => c.toFixed(2)).join(' + ')}
              </div>
            </div>
            <div className="px-6 py-3 bg-[rgb(57,180,68)] rounded-xl">
              <span className="font-bold text-[rgb(255,255,255)] text-base">✓ Aprobado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}