import { 
  Users, 
  BookOpen, 
  DollarSign, 
  Award,
  CreditCard,
  BarChart3,
  ArrowUpRight,
  ShoppingCart,
  Send,
  Bell,
  Scale,
  FileText,
  GraduationCap,
  MessageSquare,
  Calculator,
  TrendingUp,
  ClipboardCheck,
  FileBadge
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface AdminDashboardProps {
  onNavigate: (view: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [showPaymentNotificationModal, setShowPaymentNotificationModal] = useState(false);

  const stats = {
    totalStudents: 342,
    studentsGrowth: '+8.5%',
    certificatesIssued: 287,
    certificatesGrowth: '+12.3%',
    revenueGrowth: 80,
    revenueGrowthPercent: '+6.8%',
    monthlyRevenue: 41580
  };

  const salesData = [
    { month: 'Ene', amount: 28 },
    { month: 'Feb', amount: 35 },
    { month: 'Mar', amount: 32 },
    { month: 'Abr', amount: 38 },
    { month: 'May', amount: 42 },
    { month: 'Jun', amount: 45 },
    { month: 'Jul', amount: 52 },
    { month: 'Ago', amount: 48 }
  ];

  const courseDistribution = [
    { name: 'CUR-ESP-CEC', percentage: 30, color: '#8B5CF6' },
    { name: 'CUR-ESP-JPRD', percentage: 25, color: '#0B95BA' },
    { name: 'CUR-ESP-ECOP', percentage: 20, color: '#F97316' },
    { name: 'CUR-ESP-CEP', percentage: 15, color: '#10B981' },
    { name: 'CUR-ESP-MIP', percentage: 10, color: '#F59E0B' }
  ];

  const recentEnrollments = [
    { 
      name: 'Luis Rodríguez', 
      course: 'Diplomado en Contratación Pública',
      amount: 2000,
      date: 'Hace 2 horas',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
    },
    { 
      name: 'María González', 
      course: 'Arbitraje en Contratación Pública',
      amount: 2000,
      date: 'Hace 4 horas',
      avatar: 'https://images.unsplash.com/photo-1522199899308-2eef382e2158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
    },
    { 
      name: 'Carlos Méndez', 
      course: 'Especialización en Arbitraje',
      amount: 1800,
      date: 'Hace 6 horas',
      avatar: 'https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
    }
  ];

  const coursesSold = [
    { 
      name: 'Diplomado en Contratación Pública bajo la Ley 32090',
      count: 9,
      icon: Scale
    },
    { 
      name: 'Especialización en Arbitraje Comercial',
      count: 7,
      icon: FileText
    },
    { 
      name: 'Curso de Resolución de Controversias',
      count: 5,
      icon: GraduationCap
    }
  ];

  // Usuarios con pagos próximos
  const upcomingPayments = [
    { 
      id: 1, 
      name: 'Ana María Torres', 
      email: 'ana.torres@email.com',
      course: 'Diplomado en Contratación Pública',
      dueDate: '2025-11-28',
      amount: 2000,
      installment: 2,
      totalInstallments: 3
    },
    { 
      id: 2, 
      name: 'Roberto Sánchez', 
      email: 'roberto.sanchez@email.com',
      course: 'Arbitraje en Contratación Pública',
      dueDate: '2025-11-29',
      amount: 1500,
      installment: 1,
      totalInstallments: 2
    },
    { 
      id: 3, 
      name: 'Patricia López', 
      email: 'patricia.lopez@email.com',
      course: 'Especialización en Arbitraje',
      dueDate: '2025-11-30',
      amount: 1800,
      installment: 3,
      totalInstallments: 4
    }
  ];

  const maxSales = Math.max(...salesData.map(d => d.amount));

  const handleSendPaymentNotifications = () => {
    setShowPaymentNotificationModal(true);
  };

  const handleConfirmSendNotifications = () => {
    toast.success(`Notificaciones enviadas a ${upcomingPayments.length} usuarios`);
    setShowPaymentNotificationModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Inicio</h1>
          <p className="text-gray-600">Panel de administración - CEAR LATINOAMERICANO</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-gray-600 text-sm mb-2">Estudiantes inscritos</p>
              <p className="text-4xl font-bold text-gray-900">{stats.totalStudents}</p>
            </div>
            <div className="w-16 h-16 bg-[#0B95BA] rounded-2xl flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600 font-medium flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" />
              {stats.studentsGrowth}
            </span>
            <span className="text-gray-500">vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-gray-600 text-sm mb-2">Certificados emitidos</p>
              <p className="text-4xl font-bold text-gray-900">{stats.certificatesIssued}</p>
            </div>
            <div className="w-16 h-16 bg-[#0B95BA] rounded-2xl flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600 font-medium flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" />
              {stats.certificatesGrowth}
            </span>
            <span className="text-gray-500">vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-gray-600 text-sm mb-2">Crecimiento de ingresos</p>
              <p className="text-4xl font-bold text-gray-900">{stats.revenueGrowth}%</p>
            </div>
            <div className="w-16 h-16 bg-[#0B95BA] rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600 font-medium flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" />
              {stats.revenueGrowthPercent}
            </span>
            <span className="text-gray-500">vs mes anterior</span>
          </div>
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Acciones rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigate('users')}
            className="bg-gradient-to-br from-[#0B95BA] to-[#087A98] hover:from-[#087A98] hover:to-[#0B95BA] text-white p-5 rounded-xl transition-all flex items-center justify-between group"
          >
            <div className="text-left">
              <p className="font-bold mb-1">Gestionar usuarios</p>
              <p className="text-sm text-white/80">Ver todos</p>
            </div>
            <Users className="w-7 h-7 opacity-80 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('courses')}
            className="bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-5 rounded-xl transition-all flex items-center justify-between group"
          >
            <div className="text-left">
              <p className="font-bold mb-1">Gestionar cursos</p>
              <p className="text-sm text-white/80">Administrar</p>
            </div>
            <BookOpen className="w-7 h-7 opacity-80 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('weighting')}
            className="bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white p-5 rounded-xl transition-all flex items-center justify-between group"
          >
            <div className="text-left">
              <p className="font-bold mb-1">Ponderación</p>
              <p className="text-sm text-white/80">Configurar módulos</p>
            </div>
            <Calculator className="w-7 h-7 opacity-80 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('forum')}
            className="bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-5 rounded-xl transition-all flex items-center justify-between group"
          >
            <div className="text-left">
              <p className="font-bold mb-1">Foros</p>
              <p className="text-sm text-white/80">Ver todos</p>
            </div>
            <MessageSquare className="w-7 h-7 opacity-80 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('payments')}
            className="bg-gradient-to-br from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white p-5 rounded-xl transition-all flex items-center justify-between group"
          >
            <div className="text-left">
              <p className="font-bold mb-1">Pagos</p>
              <p className="text-sm text-white/80">Ver gestión</p>
            </div>
            <CreditCard className="w-7 h-7 opacity-80 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('grades')}
            className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-5 rounded-xl transition-all flex items-center justify-between group"
          >
            <div className="text-left">
              <p className="font-bold mb-1">Gestión de calificaciones</p>
              <p className="text-sm text-white/80">Calificar estudiantes</p>
            </div>
            <ClipboardCheck className="w-7 h-7 opacity-80 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('certificates')}
            className="bg-gradient-to-br from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white p-5 rounded-xl transition-all flex items-center justify-between group"
          >
            <div className="text-left">
              <p className="font-bold mb-1">Emisión de certificados</p>
              <p className="text-sm text-white/80">Generar certificados</p>
            </div>
            <FileBadge className="w-7 h-7 opacity-80 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={handleSendPaymentNotifications}
            className="bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-5 rounded-xl transition-all flex items-center justify-between group relative"
          >
            <div className="text-left">
              <p className="font-bold mb-1">Notificar pagos</p>
              <p className="text-sm text-white/80">{upcomingPayments.length} pendientes</p>
            </div>
            <div className="relative">
              <Bell className="w-7 h-7 opacity-80 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-red-600 rounded-full text-xs font-bold flex items-center justify-center">
                {upcomingPayments.length}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ventas Totales - 2 columns */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Ventas Totales</h2>
              <p className="text-3xl font-bold text-[#0B95BA] mt-2">S/ {stats.monthlyRevenue.toLocaleString()}</p>
            </div>
            <select className="px-4 py-2 pr-10 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
              <option>Mensual</option>
              <option>Semanal</option>
              <option>Anual</option>
            </select>
          </div>

          <div className="h-64 flex items-end justify-between gap-3">
            {salesData.map((data, idx) => {
              const heightPercentage = (data.amount / maxSales) * 100;
              
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-gray-100 rounded-t-lg overflow-hidden relative group" style={{ height: '220px' }}>
                    <div 
                      className="absolute bottom-0 w-full bg-gradient-to-t from-[#0B95BA] to-[#0891B2] transition-all hover:from-[#087A98] hover:to-[#0B95BA]"
                      style={{ height: `${heightPercentage}%` }}
                    >
                      <span className="absolute top-2 left-1/2 -translate-x-1/2 text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        {data.amount}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-600">{data.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Total de Inscritos - 1 column */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Total de Inscritos</h2>
          
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {courseDistribution.map((course, idx) => {
                const totalPrev = courseDistribution.slice(0, idx).reduce((sum, c) => sum + c.percentage, 0);
                const circumference = 2 * Math.PI * 40;
                const strokeDasharray = `${(course.percentage / 100) * circumference} ${circumference}`;
                const strokeDashoffset = -((totalPrev / 100) * circumference);
                
                return (
                  <circle
                    key={idx}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={course.color}
                    strokeWidth="20"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all hover:opacity-80"
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
            </div>
          </div>

          <div className="space-y-2">
            {courseDistribution.map((course, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: course.color }}></div>
                  <span className="text-gray-700">{course.name}</span>
                </div>
                <span className="font-medium text-gray-900">{course.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nuevos Ingresos y Cursos Vendidos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nuevos Ingresos */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Nuevos Ingresos</h2>
            <select className="px-3 py-1 pr-10 border border-gray-200 rounded-lg text-sm text-gray-700 cursor-pointer">
              <option>Por tipo</option>
              <option>Por fecha</option>
              <option>Por monto</option>
            </select>
          </div>

          <div className="space-y-4">
            {recentEnrollments.map((enrollment, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-[#0B95BA] transition-colors cursor-pointer">
                <ImageWithFallback
                  src={enrollment.avatar}
                  alt={enrollment.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900">{enrollment.name}</h3>
                  <p className="text-sm text-gray-600 truncate">{enrollment.course}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-[#0B95BA]">S/ {enrollment.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{enrollment.date}</p>
                </div>
                <ShoppingCart className="w-5 h-5 text-[#0B95BA] flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Cursos Vendidos */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Cursos Vendidos</h2>
            <select className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-700 cursor-pointer">
              <option>Por tipo</option>
              <option>Por popularidad</option>
              <option>Por ingresos</option>
            </select>
          </div>

          <div className="space-y-4">
            {coursesSold.map((course, idx) => {
              const IconComponent = course.icon;
              return (
                <div key={idx} className="p-5 border border-gray-200 rounded-xl hover:border-[#0B95BA] transition-colors cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 text-sm mb-2 line-clamp-2">{course.name}</p>
                      <div className="px-4 py-2 bg-[#0B95BA] text-white rounded-lg text-sm font-medium inline-block">
                        {course.count} cursos vendidos
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal de Notificación de Pagos */}
      {showPaymentNotificationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Notificar pagos próximos</h2>
              <p className="text-gray-600 mt-2">Enviar recordatorio de pago a usuarios con cuotas próximas a vencer</p>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-bold text-gray-900">{upcomingPayments.length} usuarios</span> tienen pagos próximos en los siguientes 7 días.
                  </p>
                </div>

                <h3 className="font-bold text-gray-900 mb-3">Usuarios a notificar:</h3>
                <div className="space-y-3">
                  {upcomingPayments.map((payment) => (
                    <div key={payment.id} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-gray-900">{payment.name}</h4>
                          <p className="text-sm text-gray-600">{payment.email}</p>
                        </div>
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                          Cuota {payment.installment}/{payment.totalInstallments}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Curso:</p>
                          <p className="font-medium text-gray-900">{payment.course}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Fecha de vencimiento:</p>
                          <p className="font-medium text-gray-900">{new Date(payment.dueDate).toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Monto:</p>
                          <p className="font-bold text-[#0B95BA]">S/ {payment.amount.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 mb-2">Vista previa del mensaje:</h3>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-700 text-justify">
                    Estimado(a) estudiante, le recordamos que tiene una cuota próxima a vencer. 
                    Por favor, realice su pago antes de la fecha límite para continuar con su formación sin interrupciones. 
                    Para más información sobre métodos de pago, ingrese a su campus virtual.
                  </p>
                  <p className="text-xs text-gray-500 mt-3">
                    Atentamente,<br />
                    CEAR LATINOAMERICANO
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowPaymentNotificationModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmSendNotifications}
                className="flex-1 px-6 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Enviar notificaciones
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}