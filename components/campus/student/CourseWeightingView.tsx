import { BarChart3, Info } from 'lucide-react';

// Mock data - En producción vendría de la API
const mockCourseWeighting = {
  courseName: 'Diplomado en Arbitraje Comercial Internacional',
  modules: [
    {
      id: '1',
      name: 'Módulo 1: Fundamentos',
      weight: 40,
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
  ]
};

interface Activity {
  id: string;
  name: string;
  type: 'quiz' | 'assignment' | 'forum' | 'reading' | 'exam';
  weight: number;
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
  sessions: Session[];
}

export function CourseWeightingView() {
  const { courseName, modules } = mockCourseWeighting;

  const getActivityTypeLabel = (type: string) => {
    const types = {
      quiz: 'Cuestionario',
      assignment: 'Trabajo',
      forum: 'Foro',
      reading: 'Lectura',
      exam: 'Examen'
    };
    return types[type as keyof typeof types] || type;
  };

  const getActivityTypeColor = (type: string) => {
    const colors = {
      quiz: 'bg-blue-100 text-blue-800 border-blue-300',
      assignment: 'bg-purple-100 text-purple-800 border-purple-300',
      forum: 'bg-green-100 text-green-800 border-green-300',
      reading: 'bg-amber-100 text-amber-800 border-amber-300',
      exam: 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[type as keyof typeof types] || 'bg-gray-100 text-gray-800 border-gray-300';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-1">Tabla de Ponderación del Programa</h2>
            <p className="text-lg opacity-90">{courseName}</p>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Info className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-blue-900 mb-2">¿Cómo se calcula tu nota final?</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• Cada <strong>módulo</strong> tiene un peso específico sobre la nota final (la suma es 100%)</p>
              <p>• Cada <strong>actividad</strong> dentro del módulo contribuye a la nota del módulo</p>
              <p>• El <strong>Peso Final</strong> indica cuánto vale cada actividad en tu nota final del programa</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Table */}
      <div className="space-y-4">
        {modules.map((module) => {
          const activitiesTotal = calculateModuleActivitiesTotal(module);
          
          return (
            <div key={module.id} className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
              {/* Module Header */}
              <div className="bg-gradient-to-r from-[#0B95BA]/10 to-[#087A98]/10 px-6 py-4 border-b-2 border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">{module.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {module.sessions.length} sesiones • {activitiesTotal} actividades
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-[#0B95BA]">{module.weight}%</div>
                    <div className="text-xs text-gray-600">del programa</div>
                  </div>
                </div>
              </div>

              {/* Module Content */}
              <div className="p-6">
                <div className="space-y-6">
                  {module.sessions.map((session) => {
                    const sessionWeight = calculateSessionWeight(module, session);
                    
                    return (
                      <div key={session.id}>
                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                          <h4 className="font-bold text-lg text-gray-800">{session.name}</h4>
                          <div className="text-right">
                            <div className="text-sm font-bold text-purple-600">
                              {sessionWeight.toFixed(1)}% del módulo
                            </div>
                          </div>
                        </div>

                        {/* Activities Table */}
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
                                  Peso en Módulo
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">
                                  Peso Final
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              {session.activities.map((activity) => {
                                const activityModuleWeight = calculateActivityActualWeight(module, session, activity);
                                const activityFinalWeight = calculateActivityFinalWeight(module, session, activity);
                                
                                return (
                                  <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-4">
                                      <p className="font-bold text-gray-900">{activity.name}</p>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                      <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold border-2 ${getActivityTypeColor(activity.type)}`}>
                                        {getActivityTypeLabel(activity.type)}
                                      </span>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                      <span className="font-bold text-lg text-purple-700">
                                        {activityModuleWeight.toFixed(2)}%
                                      </span>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                      <div className="inline-flex flex-col items-center bg-[#0B95BA] px-5 py-2.5 rounded-lg shadow-sm">
                                        <span className="font-bold text-white text-xl">
                                          {activityFinalWeight.toFixed(2)}%
                                        </span>
                                        <span className="text-xs text-white/90 font-medium">del programa</span>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200">
        <h3 className="font-bold text-xl text-gray-900 mb-4">Resumen del Programa</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
            <div className="text-3xl font-bold text-[#0B95BA]">{modules.length}</div>
            <div className="text-sm text-gray-600 mt-1">Módulos</div>
          </div>
          <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
            <div className="text-3xl font-bold text-purple-600">
              {modules.reduce((sum, mod) => sum + mod.sessions.length, 0)}
            </div>
            <div className="text-sm text-gray-600 mt-1">Sesiones</div>
          </div>
          <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
            <div className="text-3xl font-bold text-blue-600">
              {modules.reduce((sum, mod) => sum + calculateModuleActivitiesTotal(mod), 0)}
            </div>
            <div className="text-sm text-gray-600 mt-1">Actividades Evaluadas</div>
          </div>
        </div>
      </div>
    </div>
  );
}