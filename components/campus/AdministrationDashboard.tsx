import { 
  BookOpen, 
  Users, 
  Calendar, 
  TrendingUp,
  FileText,
  Video,
  Clock,
  UserCog,
  ClipboardCheck,
  Award,
  FileBadge
} from 'lucide-react';

interface AdministrationDashboardProps {
  onNavigate: (view: string) => void;
}

export function AdministrationDashboard({ onNavigate }: AdministrationDashboardProps) {
  const stats = [
    { label: 'Programas activos', value: '12', icon: BookOpen, color: 'cyan', trend: '+3 este mes' },
    { label: 'Estudiantes activos', value: '645', icon: Users, color: 'green', trend: '+45 este mes' },
    { label: 'Docentes activos', value: '8', icon: Users, color: 'purple', trend: 'Activos' },
    { label: 'Solicitudes pendientes', value: '4', icon: FileText, color: 'orange', trend: 'Pendientes' }
  ];

  const quickActions = [
    {
      title: 'Gestionar contenido',
      description: 'Crear, editar y administrar programas',
      icon: BookOpen,
      color: 'bg-[#0B95BA]',
      size: 'large',
      action: () => onNavigate('content-management')
    },
    {
      title: 'Registrar docentes',
      description: 'Agregar y gestionar docentes',
      icon: Users,
      color: 'bg-slate-600',
      size: 'normal',
      action: () => onNavigate('register-teachers')
    },
    {
      title: 'Gestión de usuarios',
      description: 'Administrar cuentas',
      icon: UserCog,
      color: 'bg-purple-600',
      size: 'normal',
      action: () => onNavigate('users')
    },
    {
      title: 'Gestión de asistencias',
      description: 'Registrar y controlar asistencia de estudiantes',
      icon: ClipboardCheck,
      color: 'bg-green-600',
      size: 'normal',
      action: () => onNavigate('attendance-management')
    },
    {
      title: 'Gestión de calificaciones',
      description: 'Calificar y revisar desempeño de estudiantes',
      icon: Award,
      color: 'bg-indigo-600',
      size: 'normal',
      action: () => onNavigate('grades')
    },
    {
      title: 'Emisión de certificados',
      description: 'Generar y administrar certificados',
      icon: FileBadge,
      color: 'bg-teal-600',
      size: 'normal',
      action: () => onNavigate('certificates')
    }
  ];

  const recentCourses = [
    {
      id: '1',
      name: 'Diplomado en Arbitraje Comercial Internacional',
      code: 'DIPARB-2024-V1',
      teacher: 'Dr. Carlos Méndez',
      students: 45,
      maxStudents: 60,
      status: 'active'
    },
    {
      id: '2',
      name: 'Curso de Especialización en Contratación Pública',
      code: 'CONTPUB-2024-V1',
      teacher: 'Dra. María González',
      students: 52,
      maxStudents: 60,
      status: 'active'
    },
    {
      id: '3',
      name: 'Diplomado en Resolución de Controversias',
      code: 'RESCONT-2024-V1',
      teacher: 'Dr. Javier Torres',
      students: 38,
      maxStudents: 60,
      status: 'draft'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
        <h1 className="text-4xl font-bold">Área Académica</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            cyan: 'bg-[#0EA5E9] text-white',
            green: 'bg-[#10B981] text-white',
            purple: 'bg-[#3B82F6] text-white',
            orange: 'bg-[#EAB308] text-white'
          }[stat.color];

          return (
            <div key={index} className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl ${colorClasses} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-7 h-7" />
              </div>
              <div className="flex-1 text-center">
                <p className="text-2xl font-bold text-gray-900 text-[24px]">{stat.value}</p>
                <p className="text-xs text-gray-600 whitespace-nowrap text-[15px] mx-[-7px] my-[0px]">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="">
        <h2 className="text-2xl font-bold text-gray-900 mb-[35px] mt-[0px] mr-[0px] ml-[0px]">Acciones rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#0B95BA] transition-all text-left group"
              >
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 rounded-2xl ${action.color} text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-9 h-9" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-[16px]">{action.title}</h3>
                    <p className="text-gray-600 text-[16px]">{action.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Upcoming Classes */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-[35px] mt-[0px] mr-[0px] ml-[0px]">Próximas sesiones</h2>
        
        {/* Sessions List */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Fecha y hora</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Programa</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Sesión</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Docente</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* Today - Session 1 */}
                <tr className="hover:bg-red-50 transition-colors bg-red-50/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-red-600 text-white rounded-lg text-xs font-bold">HOY</span>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">Lunes, 1 de Diciembre</p>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          18:00 - 20:00
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-gray-600 font-medium">DIPARB-2024-V1</p>
                    <p className="font-bold text-gray-900 text-sm">Diplomado en Arbitraje</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 text-sm">Sesión 3</p>
                    <p className="text-xs text-gray-600">Introducción al Arbitraje Internacional</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">Dr. Carlos Méndez</p>
                  </td>
                </tr>

                {/* Today - Session 2 */}
                <tr className="hover:bg-red-50 transition-colors bg-red-50/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-red-600 text-white rounded-lg text-xs font-bold">HOY</span>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">Lunes, 1 de Diciembre</p>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          19:00 - 21:00
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-gray-600 font-medium">CONTPUB-2024-V1</p>
                    <p className="font-bold text-gray-900 text-sm">Contratación Pública</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 text-sm">Sesión 5</p>
                    <p className="text-xs text-gray-600">Marco Legal de Contratación Pública</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">Dra. María González</p>
                  </td>
                </tr>

                {/* Today - Session 3 */}
                <tr className="hover:bg-red-50 transition-colors bg-red-50/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-red-600 text-white rounded-lg text-xs font-bold">HOY</span>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">Lunes, 1 de Diciembre</p>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          18:30 - 20:30
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-gray-600 font-medium">RESCONT-2024-V1</p>
                    <p className="font-bold text-gray-900 text-sm">Resolución de Controversias</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 text-sm">Sesión 2</p>
                    <p className="text-xs text-gray-600">Métodos Alternativos de Resolución</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">Dr. Javier Torres</p>
                  </td>
                </tr>

                {/* Tomorrow - Session 1 */}
                <tr className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-orange-600 text-white rounded-lg text-xs font-bold">MAR 2</span>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">Martes, 2 de Diciembre</p>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          18:00 - 20:00
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-gray-600 font-medium">DIPARB-2024-V1</p>
                    <p className="font-bold text-gray-900 text-sm">Diplomado en Arbitraje</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 text-sm">Sesión 4</p>
                    <p className="text-xs text-gray-600">Principios del Arbitraje Comercial</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">Dr. Carlos Méndez</p>
                  </td>
                </tr>

                {/* Tomorrow - Session 2 */}
                <tr className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-orange-600 text-white rounded-lg text-xs font-bold">MAR 2</span>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">Martes, 2 de Diciembre</p>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          19:00 - 21:00
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-gray-600 font-medium">CONTPUB-2024-V1</p>
                    <p className="font-bold text-gray-900 text-sm">Contratación Pública</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 text-sm">Sesión 6</p>
                    <p className="text-xs text-gray-600">Procedimientos de Licitación</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">Dra. María González</p>
                  </td>
                </tr>

                {/* This Week - Session 1 */}
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-[#0B95BA] text-white rounded-lg text-xs font-bold">MIÉ 3</span>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">Miércoles, 3 de Diciembre</p>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          18:30 - 20:30
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-gray-600 font-medium">RESCONT-2024-V1</p>
                    <p className="font-bold text-gray-900 text-sm">Resolución de Controversias</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 text-sm">Sesión 3</p>
                    <p className="text-xs text-gray-600">Mediación y Conciliación</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">Dr. Javier Torres</p>
                  </td>
                </tr>

                {/* This Week - Session 2 */}
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-[#0B95BA] text-white rounded-lg text-xs font-bold">MIÉ 3</span>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">Miércoles, 3 de Diciembre</p>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          18:00 - 20:00
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-gray-600 font-medium">DIPARB-2024-V1</p>
                    <p className="font-bold text-gray-900 text-sm">Diplomado en Arbitraje</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 text-sm">Sesión 5</p>
                    <p className="text-xs text-gray-600">Cláusulas Arbitrales</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">Dr. Carlos Méndez</p>
                  </td>
                </tr>

                {/* This Week - Session 3 */}
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-[#0B95BA] text-white rounded-lg text-xs font-bold">JUE 4</span>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">Jueves, 4 de Diciembre</p>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          19:00 - 21:00
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-gray-600 font-medium">CONTPUB-2024-V1</p>
                    <p className="font-bold text-gray-900 text-sm">Contratación Pública</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 text-sm">Sesión 7</p>
                    <p className="text-xs text-gray-600">Contratos Administrativos</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">Dra. María González</p>
                  </td>
                </tr>

                {/* This Week - Session 4 */}
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-[#0B95BA] text-white rounded-lg text-xs font-bold">JUE 4</span>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">Jueves, 4 de Diciembre</p>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          18:30 - 20:30
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-gray-600 font-medium">RESCONT-2024-V1</p>
                    <p className="font-bold text-gray-900 text-sm">Resolución de Controversias</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 text-sm">Sesión 4</p>
                    <p className="text-xs text-gray-600">Negociación Efectiva</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">Dr. Javier Torres</p>
                  </td>
                </tr>

                {/* This Week - Session 5 */}
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-[#0B95BA] text-white rounded-lg text-xs font-bold">VIE 5</span>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">Viernes, 5 de Diciembre</p>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          18:00 - 20:00
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-gray-600 font-medium">DIPARB-2024-V1</p>
                    <p className="font-bold text-gray-900 text-sm">Diplomado en Arbitraje</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 text-sm">Sesión 6</p>
                    <p className="text-xs text-gray-600">Procedimiento Arbitral</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">Dr. Carlos Méndez</p>
                  </td>
                </tr>

                {/* This Week - Session 6 */}
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-[#0B95BA] text-white rounded-lg text-xs font-bold">VIE 5</span>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">Viernes, 5 de Diciembre</p>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          19:00 - 21:00
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-gray-600 font-medium">CONTPUB-2024-V1</p>
                    <p className="font-bold text-gray-900 text-sm">Contratación Pública</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 text-sm">Sesión 8</p>
                    <p className="text-xs text-gray-600">Supervisión de Contratos</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">Dra. María González</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 rounded-2xl border-2 border-blue-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-blue-900 mb-2">Próximos pasos recomendados</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                Revisa los cursos en borrador y publícalos cuando estén listos
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                Verifica los horarios de clases de la semana
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                Asegúrate de que todos los docentes tengan acceso a sus cursos asignados
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}