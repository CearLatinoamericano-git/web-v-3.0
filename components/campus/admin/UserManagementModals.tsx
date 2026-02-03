import {
  X,
  CheckCircle,
  AlertCircle,
  Calendar,
  TrendingUp,
  Users,
  BookOpen,
  FileText,
  Award,
  BarChart3
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AttendanceModalProps {
  user: User | null;
  onClose: () => void;
}

interface WeightedGradesModalProps {
  user: User | null;
  onClose: () => void;
}

export function AttendanceModal({ user, onClose }: AttendanceModalProps) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Registro de asistencias - {user.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{user.email}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Attendance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 border-2 border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-900">49</p>
                  <p className="text-sm text-green-700">Asistencias</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-4 border-2 border-red-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                  <X className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-900">4</p>
                  <p className="text-sm text-red-700">Faltas</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-4 border-2 border-yellow-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-900">1</p>
                  <p className="text-sm text-yellow-700">Tardanzas</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border-2 border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-900">91%</p>
                  <p className="text-sm text-blue-700">% Asistencia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Attendance */}
          <div className="space-y-4">
            {/* Course 1 */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">Diplomado en Arbitraje Comercial Internacional</h3>
                    <p className="text-sm text-gray-600 mt-1">Total de sesiones: 30 • 4 módulos</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">87%</div>
                    <div className="text-sm text-gray-600">Asistencia</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
                    <span>26 asistencias • 3 faltas • 1 tardanza</span>
                    <span className="font-medium text-green-600">✓ Cumple requisito (70%)</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="font-bold text-gray-900 mb-4">Detalle de sesiones por módulo</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Módulo / Sesión</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Fecha</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Hora</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tema</th>
                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {/* MÓDULO 1 */}
                      <tr className="bg-gradient-to-r from-[#0B95BA] to-[#087A98]">
                        <td colSpan={5} className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                              <BookOpen className="w-4 h-4 text-[#0B95BA]" />
                            </div>
                            <p className="font-bold text-white">Módulo 1: Introducción al arbitraje comercial</p>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 1</td>
                        <td className="px-4 py-3 text-sm text-gray-700">15/10/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Introducción al arbitraje</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 2</td>
                        <td className="px-4 py-3 text-sm text-gray-700">17/10/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Ventajas del arbitraje</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 3</td>
                        <td className="px-4 py-3 text-sm text-gray-700">22/10/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Tipos de arbitraje</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 4</td>
                        <td className="px-4 py-3 text-sm text-gray-700">24/10/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Conceptos fundamentales</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 5</td>
                        <td className="px-4 py-3 text-sm text-gray-700">29/10/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Principios del arbitraje</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 6</td>
                        <td className="px-4 py-3 text-sm text-gray-700">31/10/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Diferencias con mediación</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 7</td>
                        <td className="px-4 py-3 text-sm text-gray-700">05/11/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Clase en vivo: Casos iniciales</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>

                      {/* MÓDULO 2 */}
                      <tr className="bg-gradient-to-r from-[#0B95BA] to-[#087A98]">
                        <td colSpan={5} className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                              <BookOpen className="w-4 h-4 text-[#0B95BA]" />
                            </div>
                            <p className="font-bold text-white">Módulo 2: Marco legal y regulación</p>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 8</td>
                        <td className="px-4 py-3 text-sm text-gray-700">07/11/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Normativa internacional</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 9</td>
                        <td className="px-4 py-3 text-sm text-gray-700">12/11/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Ley de arbitraje nacional</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-600 text-white">
                            <X className="w-3 h-3" /> Falta
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 10</td>
                        <td className="px-4 py-3 text-sm text-gray-700">14/11/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Cláusulas arbitrales</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-600 text-white">
                            <AlertCircle className="w-3 h-3" /> Tardanza
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 11</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19/11/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Convenios internacionales</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 12</td>
                        <td className="px-4 py-3 text-sm text-gray-700">21/11/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Jurisprudencia relevante</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 13</td>
                        <td className="px-4 py-3 text-sm text-gray-700">26/11/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Clase en vivo: Análisis legal</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>

                      {/* MÓDULO 3 */}
                      <tr className="bg-gradient-to-r from-[#0B95BA] to-[#087A98]">
                        <td colSpan={5} className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                              <BookOpen className="w-4 h-4 text-[#0B95BA]" />
                            </div>
                            <p className="font-bold text-white">Módulo 3: Procedimiento arbitral</p>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 14</td>
                        <td className="px-4 py-3 text-sm text-gray-700">28/11/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Inicio del procedimiento</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 15</td>
                        <td className="px-4 py-3 text-sm text-gray-700">03/12/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Etapas procesales</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 16</td>
                        <td className="px-4 py-3 text-sm text-gray-700">05/12/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Nombramiento de árbitros</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 17</td>
                        <td className="px-4 py-3 text-sm text-gray-700">10/12/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Presentación de pruebas</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-600 text-white">
                            <X className="w-3 h-3" /> Falta
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 18</td>
                        <td className="px-4 py-3 text-sm text-gray-700">12/12/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Audiencias arbitrales</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 19</td>
                        <td className="px-4 py-3 text-sm text-gray-700">17/12/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Alegatos finales</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 20</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19/12/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Clase en vivo: Procedimientos</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>

                      {/* MÓDULO 4 */}
                      <tr className="bg-gradient-to-r from-[#0B95BA] to-[#087A98]">
                        <td colSpan={5} className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                              <BookOpen className="w-4 h-4 text-[#0B95BA]" />
                            </div>
                            <p className="font-bold text-white">Módulo 4: Laudo arbitral y ejecución</p>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 21</td>
                        <td className="px-4 py-3 text-sm text-gray-700">07/01/2025</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Elaboración del laudo</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 22</td>
                        <td className="px-4 py-3 text-sm text-gray-700">09/01/2025</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Contenido del laudo</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 23</td>
                        <td className="px-4 py-3 text-sm text-gray-700">14/01/2025</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Notificación del laudo</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 24</td>
                        <td className="px-4 py-3 text-sm text-gray-700">16/01/2025</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Recursos contra el laudo</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-600 text-white">
                            <X className="w-3 h-3" /> Falta
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 25</td>
                        <td className="px-4 py-3 text-sm text-gray-700">21/01/2025</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Reconocimiento internacional</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 26</td>
                        <td className="px-4 py-3 text-sm text-gray-700">23/01/2025</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Ejecución del laudo</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 27</td>
                        <td className="px-4 py-3 text-sm text-gray-700">28/01/2025</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Convenio de Nueva York</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 28</td>
                        <td className="px-4 py-3 text-sm text-gray-700">30/01/2025</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Casos prácticos finales</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 29</td>
                        <td className="px-4 py-3 text-sm text-gray-700">04/02/2025</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Análisis de laudos reales</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 30</td>
                        <td className="px-4 py-3 text-sm text-gray-700">06/02/2025</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Clase en vivo: Cierre del curso</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Course 2 */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">Diplomado en Contratación Pública</h3>
                    <p className="text-sm text-gray-600 mt-1">Total de sesiones: 24 • 4 módulos (Completado)</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">96%</div>
                    <div className="text-sm text-gray-600">Asistencia</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
                    <span>23 asistencias • 1 falta</span>
                    <span className="font-medium text-green-600">✓ Diploma aprobado</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="font-bold text-gray-900 mb-4">Detalle de sesiones por módulo</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Módulo / Sesión</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Fecha</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Hora</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tema</th>
                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {/* MÓDULO 1 */}
                      <tr className="bg-gradient-to-r from-[#0B95BA] to-[#087A98]">
                        <td colSpan={5} className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                              <BookOpen className="w-4 h-4 text-[#0B95BA]" />
                            </div>
                            <p className="font-bold text-white">Módulo 1: Fundamentos de contratación pública</p>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 1</td>
                        <td className="px-4 py-3 text-sm text-gray-700">01/08/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Introducción a la contratación</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 2</td>
                        <td className="px-4 py-3 text-sm text-gray-700">03/08/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Principios de la contratación</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 3</td>
                        <td className="px-4 py-3 text-sm text-gray-700">08/08/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Marco normativo</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 4</td>
                        <td className="px-4 py-3 text-sm text-gray-700">10/08/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Clase en vivo: Casos iniciales</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>

                      {/* MÓDULO 2 */}
                      <tr className="bg-gradient-to-r from-[#0B95BA] to-[#087A98]">
                        <td colSpan={5} className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                              <BookOpen className="w-4 h-4 text-[#0B95BA]" />
                            </div>
                            <p className="font-bold text-white">Módulo 2: Procedimientos de selección</p>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 5</td>
                        <td className="px-4 py-3 text-sm text-gray-700">15/08/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Licitación pública</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 6</td>
                        <td className="px-4 py-3 text-sm text-gray-700">17/08/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Concurso público</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 7</td>
                        <td className="px-4 py-3 text-sm text-gray-700">22/08/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Adjudicación simplificada</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 8</td>
                        <td className="px-4 py-3 text-sm text-gray-700">24/08/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Contratación directa</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 9</td>
                        <td className="px-4 py-3 text-sm text-gray-700">29/08/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Subasta inversa</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 10</td>
                        <td className="px-4 py-3 text-sm text-gray-700">31/08/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Clase en vivo: Procedimientos</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>

                      {/* MÓDULO 3 */}
                      <tr className="bg-gradient-to-r from-[#0B95BA] to-[#087A98]">
                        <td colSpan={5} className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                              <BookOpen className="w-4 h-4 text-[#0B95BA]" />
                            </div>
                            <p className="font-bold text-white">Módulo 3: Ejecución contractual</p>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 11</td>
                        <td className="px-4 py-3 text-sm text-gray-700">05/09/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Perfeccionamiento del contrato</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 12</td>
                        <td className="px-4 py-3 text-sm text-gray-700">07/09/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Garantías contractuales</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 13</td>
                        <td className="px-4 py-3 text-sm text-gray-700">12/09/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Modificaciones contractuales</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 14</td>
                        <td className="px-4 py-3 text-sm text-gray-700">14/09/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Ampliaciones y adendas</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 15</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19/09/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Resolución de contratos</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 16</td>
                        <td className="px-4 py-3 text-sm text-gray-700">21/09/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Clase en vivo: Ejecución</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>

                      {/* MÓDULO 4 */}
                      <tr className="bg-gradient-to-r from-[#0B95BA] to-[#087A98]">
                        <td colSpan={5} className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                              <BookOpen className="w-4 h-4 text-[#0B95BA]" />
                            </div>
                            <p className="font-bold text-white">Módulo 4: Control y fiscalización</p>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 17</td>
                        <td className="px-4 py-3 text-sm text-gray-700">26/09/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Órganos de control</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 18</td>
                        <td className="px-4 py-3 text-sm text-gray-700">28/09/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Tribunal de contrataciones</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 19</td>
                        <td className="px-4 py-3 text-sm text-gray-700">03/10/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Sanciones y penalidades</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 20</td>
                        <td className="px-4 py-3 text-sm text-gray-700">05/10/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Medios impugnatorios</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-600 text-white">
                            <X className="w-3 h-3" /> Falta
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 21</td>
                        <td className="px-4 py-3 text-sm text-gray-700">10/10/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Transparencia y publicidad</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 22</td>
                        <td className="px-4 py-3 text-sm text-gray-700">12/10/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Buenas prácticas</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 23</td>
                        <td className="px-4 py-3 text-sm text-gray-700">17/10/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Casos prácticos finales</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 pl-12 text-sm text-gray-900 font-medium">Sesión 24</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19/10/2024</td>
                        <td className="px-4 py-3 text-sm text-gray-700">19:00 - 21:00</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Clase en vivo: Cierre del curso</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3" /> Asistió
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
            <h4 className="font-bold text-gray-900 mb-4">Leyenda</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </span>
                <div>
                  <p className="font-medium text-gray-900">Asistió</p>
                  <p className="text-xs text-gray-600">Presente en la sesión completa</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <X className="w-5 h-5 text-red-600" />
                </span>
                <div>
                  <p className="font-medium text-gray-900">Falta</p>
                  <p className="text-xs text-gray-600">Ausencia no justificada</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </span>
                <div>
                  <p className="font-medium text-gray-900">Tardanza</p>
                  <p className="text-xs text-gray-600">Ingreso después de 15 minutos</p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-800 text-center">
                <strong>Nota:</strong> Se requiere un mínimo de 70% de asistencia para obtener el diploma.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WeightedGradesModal({ user, onClose }: WeightedGradesModalProps) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Criterios de calificación - {user.name}</h2>
            <p className="text-sm text-gray-600 mt-1">Desglose detallado del cálculo de notas</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Course 1 Weighted Grades */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xl">Diplomado en Arbitraje Comercial Internacional</h3>
                  <p className="text-sm opacity-90 mt-1">Cálculo de nota ponderada</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">16.1</div>
                  <div className="text-sm opacity-90">Nota final</div>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Weighted Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-gray-900">Módulo / Actividad</th>
                      <th className="px-4 py-3 text-center font-bold text-gray-900">Peso</th>
                      <th className="px-4 py-3 text-center font-bold text-gray-900">Calificación</th>
                      <th className="px-4 py-3 text-center font-bold text-gray-900">Puntaje obtenido</th>
                      <th className="px-4 py-3 text-center font-bold text-gray-900">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {/* MÓDULO 1 */}
                    <tr className="bg-gradient-to-r from-[#0B95BA] to-[#087A98]">
                      <td colSpan={5} className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-[#0B95BA]" />
                          </div>
                          <p className="font-bold text-white">Módulo 1: Introducción al arbitraje comercial</p>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Actividades Módulo 1 */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-4 pl-12">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">Cuestionario: Conceptos básicos</p>
                            <p className="text-xs text-gray-500">Módulo 1</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-blue-600 text-white">
                          10%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="text-lg font-bold text-gray-900">18</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">1.8</div>
                        <div className="text-xs text-gray-500">18 × 0.10</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                          <CheckCircle className="w-3 h-3" /> Entregado
                        </span>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-4 pl-12">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#0B95BA] rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">Ensayo: Ventajas del arbitraje</p>
                            <p className="text-xs text-gray-500">Módulo 1</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-[#0B95BA] text-white">
                          8%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="text-lg font-bold text-gray-900">19</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="text-2xl font-bold text-[#0B95BA]">1.52</div>
                        <div className="text-xs text-gray-500">19 × 0.08</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                          <CheckCircle className="w-3 h-3" /> Entregado
                        </span>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-4 pl-12">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">Foro: Casos prácticos iniciales</p>
                            <p className="text-xs text-gray-500">Módulo 1</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-600 text-white">
                          7%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="text-lg font-bold text-gray-900">20</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="text-2xl font-bold text-green-600">1.4</div>
                        <div className="text-xs text-gray-500">20 × 0.07</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                          <CheckCircle className="w-3 h-3" /> Entregado
                        </span>
                      </td>
                    </tr>

                    {/* MÓDULO 2 */}
                    <tr className="bg-gradient-to-r from-[#0B95BA] to-[#087A98]">
                      <td colSpan={5} className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-[#0B95BA]" />
                          </div>
                          <p className="font-bold text-white">Módulo 2: Marco legal y regulación</p>
                        </div>
                      </td>
                    </tr>

                    {/* Actividades Módulo 2 */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-4 pl-12">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">Cuestionario: Normativa aplicable</p>
                            <p className="text-xs text-gray-500">Módulo 2</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-blue-600 text-white">
                          10%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="text-lg font-bold text-gray-900">17</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">1.7</div>
                        <div className="text-xs text-gray-500">17 × 0.10</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                          <CheckCircle className="w-3 h-3" /> Entregado
                        </span>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-4 pl-12">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#0BDDB3] rounded-lg flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">Control de lectura: Ley de arbitraje</p>
                            <p className="text-xs text-gray-500">Módulo 2 - 85 páginas</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-[#0BDDB3] text-white">
                          10%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="text-lg font-bold text-gray-900">18</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="text-2xl font-bold text-[#0BDDB3]">1.8</div>
                        <div className="text-xs text-gray-500">18 × 0.10</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#0B95BA] text-white">
                          <AlertCircle className="w-3 h-3" /> En revisión
                        </span>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-4 pl-12">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">Foro: Análisis jurisprudencial</p>
                            <p className="text-xs text-gray-500">Módulo 2</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-600 text-white">
                          8%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="text-lg font-bold text-gray-900">20</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="text-2xl font-bold text-green-600">1.6</div>
                        <div className="text-xs text-gray-500">20 × 0.08</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                          <CheckCircle className="w-3 h-3" /> Entregado
                        </span>
                      </td>
                    </tr>

                    {/* MÓDULO 3 */}
                    <tr className="bg-gradient-to-r from-[#0B95BA] to-[#087A98]">
                      <td colSpan={5} className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-[#0B95BA]" />
                          </div>
                          <p className="font-bold text-white">Módulo 3: Procedimiento arbitral</p>
                        </div>
                      </td>
                    </tr>

                    {/* Actividades Módulo 3 */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-4 pl-12">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">Cuestionario: Etapas del proceso</p>
                            <p className="text-xs text-gray-500">Módulo 3</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-blue-600 text-white">
                          10%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="text-lg font-bold text-gray-900">19</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">1.9</div>
                        <div className="text-xs text-gray-500">19 × 0.10</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                          <CheckCircle className="w-3 h-3" /> Entregado
                        </span>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-4 pl-12">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#0B95BA] rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">Trabajo práctico: Redacción de escritos</p>
                            <p className="text-xs text-gray-500">Módulo 3</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-[#0B95BA] text-white">
                          12%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="text-lg font-bold text-gray-900">-</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="text-2xl font-bold text-gray-400">-</div>
                        <div className="text-xs text-gray-500">Pendiente</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-600 text-white">
                          <X className="w-3 h-3" /> No entregado
                        </span>
                      </td>
                    </tr>

                    {/* MÓDULO 4 */}
                    <tr className="bg-gradient-to-r from-[#0B95BA] to-[#087A98]">
                      <td colSpan={5} className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-[#0B95BA]" />
                          </div>
                          <p className="font-bold text-white">Módulo 4: Laudo arbitral y ejecución</p>
                        </div>
                      </td>
                    </tr>

                    {/* Actividades Módulo 4 */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-4 pl-12">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#0B95BA] rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">Análisis de laudos arbitrales</p>
                            <p className="text-xs text-gray-500">Módulo 4</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-[#0B95BA] text-white">
                          10%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="text-lg font-bold text-gray-900">-</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="text-2xl font-bold text-gray-400">-</div>
                        <div className="text-xs text-gray-500">Pendiente</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#0BDDB3] text-white">
                          <AlertCircle className="w-3 h-3" /> Pendiente
                        </span>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-4 pl-12">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                            <Award className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">Examen final integrador</p>
                            <p className="text-xs text-gray-500">Módulo 4 - Evaluación integral</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-red-600 text-white">
                          15%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="text-lg font-bold text-gray-900">17</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="text-2xl font-bold text-red-600">2.55</div>
                        <div className="text-xs text-gray-500">17 × 0.15</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                          <CheckCircle className="w-3 h-3" /> Entregado
                        </span>
                      </td>
                    </tr>

                    {/* Total Row */}
                    <tr className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] font-bold">
                      <td className="px-4 py-4">
                        <p className="text-lg font-bold text-white">NOTA FINAL CALCULADA</p>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-white text-[#0B95BA]">
                          100%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="text-xs text-white/90">Suma ponderada</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="text-4xl font-bold text-white">16.07</div>
                        <div className="text-xs text-white/90">1.8 + 1.52 + 1.4 + 1.7 + 1.8 + 1.6 + 1.9 + 0 + 0 + 2.55</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
                          <Award className="w-3 h-3" /> Aprobado
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Course 2 Summary */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xl text-gray-900">Diplomado en Contratación Pública</h3>
                  <p className="text-sm text-gray-600 mt-1">Curso completado</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-green-600">19.0</div>
                  <div className="text-sm text-gray-600">Nota final</div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white rounded-xl border-2 border-green-200">
                <p className="text-sm text-gray-700">
                  <strong className="text-green-600">✓ Diploma aprobado</strong> - El estudiante cumplió con todos los requisitos del curso: 96% asistencia, todas las evaluaciones completadas y nota final superior a 14.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
