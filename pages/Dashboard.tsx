import { BookOpen, Clock, Award, TrendingUp, PlayCircle, FileText, CheckCircle, ArrowLeft, LogOut } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface DashboardProps {
  userName: string;
  onCourseAccess: (courseId: string) => void;
  onBackToMain?: () => void;
  onLogout?: () => void;
}

export function Dashboard({ userName, onCourseAccess, onBackToMain, onLogout }: DashboardProps) {
  // Mock data para el dashboard - usando imágenes representativas de los temas de los programas
  const enrolledCourses = [
    {
      id: 'diplomado-contratacion-publica',
      title: 'Diplomado en Contratación Pública bajo la Ley 2069',
      image: 'https://images.unsplash.com/photo-1759429255330-51145b170dad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdhbCUyMGNvbnRyYWN0JTIwZG9jdW1lbnRzfGVufDF8fHx8MTc2NTM4MDAyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      progress: 65,
      nextClass: '2025-02-15T18:00:00'
    },
    {
      id: 'curso-contratos-estandarizados',
      title: 'Contratos Estandarizados: NEC y FIDIC',
      image: 'https://images.unsplash.com/photo-1763621550224-6ff277b8c754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBjb250cmFjdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NTM4MDUzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      progress: 30,
      nextClass: '2025-02-16T19:00:00'
    },
    {
      id: 'diplomado-arbitraje-internacional',
      title: 'Diplomado en Arbitraje Internacional',
      image: 'https://images.unsplash.com/photo-1624638299925-6966fac6914f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmJpdHJhdGlvbiUyMGp1c3RpY2UlMjBnYXZlbHxlbnwxfHx8fDE3NjUzODA1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      progress: 85,
      nextClass: '2025-02-17T20:00:00'
    }
  ];

  const stats = [
    { label: 'Cursos activos', value: '3', icon: BookOpen, color: 'bg-cyan-500' },
    { label: 'Horas completadas', value: '72', icon: Clock, color: 'bg-green-500' },
    { label: 'Certificados', value: '3', icon: Award, color: 'bg-purple-500' },
    { label: 'Progreso promedio', value: '60%', icon: TrendingUp, color: 'bg-orange-500' }
  ];

  const recentActivities = [
    { type: 'video', title: 'Completaste: Módulo 3 - Procedimientos de Selección', time: 'Hace 2 horas' },
    { type: 'quiz', title: 'Evaluación aprobada: Quiz módulo 2', time: 'Hace 1 día' },
    { type: 'document', title: 'Descargaste: Material módulo 4', time: 'Hace 2 días' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-[#0B95BA] to-[#087A98] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-white mb-2">
            ¡Bienvenido de nuevo, {userName}!
          </h1>
          <p className="text-xl text-white/90">
            Continúa tu formación profesional donde lo dejaste
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl border-2 border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mis Cursos */}
            <div>
              <h2 className="text-gray-900 mb-6">Mis Cursos Activos</h2>
              <div className="space-y-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <ImageWithFallback
                        src={course.image}
                        alt={course.title}
                        className="w-full md:w-48 h-48 object-cover"
                      />
                      <div className="flex-1 p-6">
                        <h3 className="text-gray-900 mb-2">{course.title}</h3>
                        
                        {/* Progress */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Progreso del programa</span>
                            <span className="text-[#0B95BA]">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-[#0B95BA] h-2 rounded-full transition-all"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Next Class */}
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                          <Clock className="w-4 h-4 text-[#0B95BA]" />
                          <span>
                            Próxima clase: {new Date(course.nextClass).toLocaleDateString('es-ES', { 
                              day: 'numeric', 
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                          <button
                            onClick={() => onCourseAccess(course.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#0B95BA] text-white rounded-lg hover:bg-[#087A98] transition-colors"
                          >
                            <PlayCircle className="w-4 h-4" />
                            Continuar curso
                          </button>
                          <button className="px-4 py-2 bg-white text-[#0B95BA] border border-[#0B95BA] rounded-lg hover:bg-[#0B95BA]/5 transition-colors">
                            Ver detalles
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificados */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-gray-900 mb-6">Mis Certificados</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'Diplomado en Arbitraje', date: '2024-11-15', institution: 'UNMSM' },
                  { title: 'Curso de Ejecución Contractual', date: '2024-09-20', institution: 'UNHEVAL' },
                  { title: 'Curso de Contratos FIDIC', date: '2024-07-10', institution: 'CEAR' }
                ].map((cert, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-[#0B95BA]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-[#0B95BA]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-gray-900 mb-1 truncate">{cert.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{cert.institution}</p>
                        <p className="text-xs text-gray-500">
                          Emitido: {new Date(cert.date).toLocaleDateString('es-ES', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    <button className="w-full mt-4 py-2 text-sm text-[#0B95BA] border border-[#0B95BA] rounded-lg hover:bg-[#0B95BA]/5 transition-colors">
                      Descargar certificado
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Actividad Reciente */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-gray-900 mb-4">Actividad reciente</h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-10 h-10 bg-[#0B95BA]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      {activity.type === 'video' && <PlayCircle className="w-5 h-5 text-[#0B95BA]" />}
                      {activity.type === 'quiz' && <CheckCircle className="w-5 h-5 text-[#0B95BA]" />}
                      {activity.type === 'document' && <FileText className="w-5 h-5 text-[#0B95BA]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 mb-1">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Próximas clases */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-gray-900 mb-4">Próximas clases en vivo</h3>
              <div className="space-y-4">
                <div className="p-4 bg-[#0B95BA]/5 rounded-lg border border-[#0B95BA]/20">
                  <div className="flex items-center gap-2 text-sm text-[#0B95BA] mb-2">
                    <Clock className="w-4 h-4" />
                    <span>Hoy, 18:00</span>
                  </div>
                  <p className="text-sm text-gray-900 mb-1">Módulo 4: Ejecución Contractual</p>
                  <p className="text-xs text-gray-600">Dr. Roberto Hernández</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Clock className="w-4 h-4" />
                    <span>Mañana, 19:00</span>
                  </div>
                  <p className="text-sm text-gray-900 mb-1">Contratos NEC - Parte 2</p>
                  <p className="text-xs text-gray-600">Dr. Alberto Sánchez</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-gray-900 mb-4">Accesos Rápidos</h3>
              <div className="space-y-2">
                <a href="/courses" className="block w-full py-2 px-4 text-sm text-center text-[#0B95BA] border border-[#0B95BA] rounded-lg hover:bg-[#0B95BA]/5 transition-colors">
                  Explorar más cursos
                </a>
                <a href="/profile" className="block w-full py-2 px-4 text-sm text-center text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Mi perfil
                </a>
                <a href="/support" className="block w-full py-2 px-4 text-sm text-center text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Soporte
                </a>
                {onBackToMain && (
                  <button
                    onClick={onBackToMain}
                    className="flex items-center justify-center gap-2 w-full py-2 px-4 text-sm text-center text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Volver al inicio
                  </button>
                )}
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="flex items-center justify-center gap-2 w-full py-2 px-4 text-sm text-center text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar sesión
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}