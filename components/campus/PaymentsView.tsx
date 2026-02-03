import {
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Search,
  Filter,
  AlertTriangle,
  CreditCard,
  FileText,
  Calendar,
  TrendingUp,
  TrendingDown,
  User,
  Bell,
  UserX
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function PaymentsView() {
  const [selectedPayment, setSelectedPayment] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [accountStatus, setAccountStatus] = useState<{ [key: number]: boolean }>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true
  });

  const handleNotifyDelay = (paymentId: number, userName: string) => {
    toast.success(`Notificación de atraso enviada a ${userName}`);
  };

  const handleToggleAccount = (paymentId: number, userName: string, isActive: boolean) => {
    setAccountStatus(prev => ({ ...prev, [paymentId]: !isActive }));
    if (isActive) {
      toast.error(`Cuenta de ${userName} desactivada`);
    } else {
      toast.success(`Cuenta de ${userName} activada`);
    }
  };

  // Función para verificar si un pago está próximo a vencer (dentro de 3 días) o atrasado
  const isPaymentNearOrOverdue = (nextPaymentDate: string): boolean => {
    const [day, month, year] = nextPaymentDate.split('/').map(Number);
    const paymentDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const diffTime = paymentDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Retorna true si el pago vence en 3 días o menos, o si ya está atrasado
    return diffDays <= 3;
  };

  const stats = {
    cancelled: 124,
    cancelledChange: '-8%',
    inProgress: 124,
    inProgressChange: '+8%',
    completed: 124,
    completedChange: '+8%'
  };

  const transactionData = [
    { month: 'Ene', amount: 32000 },
    { month: 'Feb', amount: 35000 },
    { month: 'Mar', amount: 38000 },
    { month: 'Abr', amount: 36000 },
    { month: 'May', amount: 40000 },
    { month: 'Jun', amount: 42000 },
    { month: 'Jul', amount: 41580 },
  ];

  const maxAmount = Math.max(...transactionData.map(d => d.amount));

  const payments = [
    {
      id: 1,
      user: {
        name: 'Luis Rodríguez',
        email: 'luis.rodriguez@email.com',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        code: 'DIP-CP'
      },
      courses: [
        {
          name: 'Diplomado en Contratación Pública bajo la Ley 32090',
          price: 2000
        },
        {
          name: 'Especialización en Arbitraje Comercial Internacional',
          price: 1800
        }
      ],
      income: 3800,
      nextPayment: '24/11/2025',
      status: 'completed' as const,
      transactionId: '41004569',
      paymentDate: '26/10/2025',
      paymentMethod: 'Visa',
      discount: -10,
      total: 3420
    },
    {
      id: 2,
      user: {
        name: 'María González',
        email: 'maria.gonzalez@email.com',
        avatar: 'https://images.unsplash.com/photo-1522199899308-2eef382e2158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        code: 'ARB-CP'
      },
      courses: [
        {
          name: 'Diplomado en Contratación Pública bajo la Ley 32090',
          price: 2000
        }
      ],
      income: 2000,
      nextPayment: '25/11/2025',
      status: 'warning' as const,
      transactionId: '41004570',
      paymentDate: '28/10/2025',
      paymentMethod: 'Mastercard',
      discount: 0,
      total: 2000
    },
    {
      id: 3,
      user: {
        name: 'Carlos Méndez',
        email: 'carlos.mendez@email.com',
        avatar: 'https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        code: 'ESP-ARB'
      },
      courses: [
        {
          name: 'Especialización en Arbitraje Comercial Internacional',
          price: 1800
        },
        {
          name: 'Curso de Resolución de Controversias en Construcción',
          price: 1500
        },
        {
          name: 'Jurisprudencia y Procedimientos Arbitrales',
          price: 1200
        }
      ],
      income: 4500,
      nextPayment: '30/11/2025',
      status: 'pending' as const,
      transactionId: '41004571',
      paymentDate: '15/10/2025',
      paymentMethod: 'Visa',
      discount: -15,
      total: 3825
    },
    {
      id: 4,
      user: {
        name: 'Ana Torres',
        email: 'ana.torres@email.com',
        avatar: 'https://images.unsplash.com/photo-1607286908165-b8b6a2874fc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        code: 'DIP-CP'
      },
      courses: [
        {
          name: 'Diplomado en Contratación Pública bajo la Ley 32090',
          price: 2000
        }
      ],
      income: 2000,
      nextPayment: '28/11/2025',
      status: 'pending' as const,
      transactionId: '41004572',
      paymentDate: '20/10/2025',
      paymentMethod: 'Yape',
      discount: 0,
      total: 2000
    },
    {
      id: 5,
      user: {
        name: 'Roberto Sánchez',
        email: 'roberto.sanchez@email.com',
        avatar: 'https://images.unsplash.com/photo-1758599543154-76ec1c4257df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        code: 'CUR-CON'
      },
      courses: [
        {
          name: 'Curso de Resolución de Controversias en Construcción',
          price: 1500
        },
        {
          name: 'Elaboración de Contratos y Obligaciones Previas',
          price: 1400
        }
      ],
      income: 2900,
      nextPayment: '01/12/2025',
      status: 'completed' as const,
      transactionId: '41004573',
      paymentDate: '22/10/2025',
      paymentMethod: 'Transferencia',
      discount: 0,
      total: 2900
    },
    {
      id: 6,
      user: {
        name: 'Patricia López',
        email: 'patricia.lopez@email.com',
        avatar: 'https://images.unsplash.com/photo-1585554414787-09b821c321c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        code: 'MULT-CUR'
      },
      courses: [
        {
          name: 'Diplomado en Contratación Pública bajo la Ley 32090',
          price: 2000
        },
        {
          name: 'Especialización en Arbitraje Comercial Internacional',
          price: 1800
        },
        {
          name: 'Jurisprudencia y Procedimientos Arbitrales',
          price: 1200
        },
        {
          name: 'Curso de Resolución de Controversias en Construcción',
          price: 1500
        }
      ],
      income: 6500,
      nextPayment: '26/11/2025',
      status: 'completed' as const,
      transactionId: '41004574',
      paymentDate: '18/10/2025',
      paymentMethod: 'Visa',
      discount: -20,
      total: 5200
    },
    {
      id: 7,
      user: {
        name: 'Jorge Ramírez',
        email: 'jorge.ramirez@email.com',
        avatar: 'https://images.unsplash.com/photo-1736939681295-bb2e6759dddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        code: 'ESP-MIP'
      },
      courses: [
        {
          name: 'Especialización en contrataciones del Estado peruano',
          price: 1600
        }
      ],
      income: 1600,
      nextPayment: '29/11/2025',
      status: 'warning' as const,
      transactionId: '41004575',
      paymentDate: '25/10/2025',
      paymentMethod: 'Plin',
      discount: 0,
      total: 1600
    }
  ];

  const selectedPaymentData = payments.find(p => p.id === selectedPayment);

  const handleExport = () => {
    toast.success('Exportando reporte de pagos...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Gestión de pagos</h1>
            <p className="text-xl opacity-90">Control de cronogramas y estados de pago de estudiantes</p>
          </div>
          <button 
            onClick={handleExport}
            className="px-6 py-3 bg-white text-[#0B95BA] rounded-xl font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Exportar
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 bg-[#0EA5E9] rounded-xl flex items-center justify-center flex-shrink-0">
            <User className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900">4</p>
            <p className="text-sm text-gray-600">Total estudiantes</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 bg-[#10B981] rounded-xl flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900">S/ 9,000</p>
            <p className="text-sm text-gray-600">Total recaudado</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 bg-[#EAB308] rounded-xl flex items-center justify-center flex-shrink-0">
            <Clock className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900">S/ 5,400</p>
            <p className="text-sm text-gray-600">Total pendiente</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 bg-[#EF4444] rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900">2</p>
            <p className="text-sm text-gray-600">Con Pagos Vencidos</p>
          </div>
        </div>
      </div>

      {/* Main Content: Cronograma + Detallado */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cronograma de Pagos - 2 columns */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cronograma de pagos</h2>
            
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Escribe..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                />
              </div>
              <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[500px]">
            {payments.map((payment) => {
              const isActive = accountStatus[payment.id];
              
              return (
                <div
                  key={payment.id}
                  className={`p-6 border-b border-gray-100 transition-colors ${
                    selectedPayment === payment.id ? 'bg-blue-50 border-l-4 border-l-[#0B95BA]' : ''
                  } ${!isActive ? 'opacity-60 bg-gray-50' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      onClick={() => setSelectedPayment(payment.id)}
                      className="flex items-center gap-3 flex-1 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <div className="relative">
                        <ImageWithFallback
                          src={payment.user.avatar}
                          alt={payment.user.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
                          payment.status === 'completed' ? 'bg-[#0B95BA]' :
                          payment.status === 'warning' ? 'bg-amber-500' :
                          'bg-gray-400'
                        }`}>
                          {payment.status === 'completed' && <CheckCircle className="w-3 h-3 text-white" />}
                          {payment.status === 'warning' && <AlertTriangle className="w-3 h-3 text-white" />}
                          {payment.status === 'pending' && <Clock className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-gray-500">Usuario</span>
                          <span className="px-2 py-0.5 bg-[#0B95BA] text-white text-xs rounded-full font-medium">
                            {payment.user.code}
                          </span>
                          {!isActive && (
                            <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-medium">
                              Desactivada
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-gray-900">{payment.user.name}</h3>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1">Ingreso (S/.)</p>
                      <p className="font-bold text-gray-900">S/. {payment.income.toLocaleString()}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1">Siguiente pago</p>
                      <p className="font-bold text-gray-900">{payment.nextPayment}</p>
                    </div>

                    {/* Estado y Botones de Control */}
                    <div className="flex items-center gap-3">
                      {payment.status === 'warning' && (
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-amber-600" />
                        </div>
                      )}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        payment.status === 'completed' ? 'bg-[#0B95BA]' : 'bg-gray-300'
                      }`}>
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>

                      {/* Botones de acción */}
                      <div className="flex items-center gap-1.5 ml-2">
                        {isPaymentNearOrOverdue(payment.nextPayment) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNotifyDelay(payment.id, payment.user.name);
                            }}
                            className="w-8 h-8 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-lg transition-colors flex items-center justify-center group relative"
                            title="Notificar Atraso"
                          >
                            <Bell className="w-4 h-4" />
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              Notificar Atraso
                            </span>
                          </button>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleAccount(payment.id, payment.user.name, isActive);
                          }}
                          className={`w-8 h-8 rounded-lg transition-colors flex items-center justify-center border group relative ${
                            isActive 
                              ? 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200' 
                              : 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200'
                          }`}
                          title={isActive ? 'Desactivar Cuenta' : 'Activar Cuenta'}
                        >
                          <UserX className="w-4 h-4" />
                          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {isActive ? 'Desactivar' : 'Activar'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detallado de Pago - 1 column */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] p-6">
            <h2 className="text-xl font-bold text-white">Detallado de pago</h2>
          </div>

          {selectedPaymentData ? (
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <ImageWithFallback
                    src={selectedPaymentData.user.avatar}
                    alt={selectedPaymentData.user.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{selectedPaymentData.user.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-[#0B95BA] text-white text-xs rounded-full">
                        {selectedPaymentData.user.code}
                      </span>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                        Estado: {
                          selectedPaymentData.status === 'completed' ? 'Completado' :
                          selectedPaymentData.status === 'warning' ? 'Advertencia' :
                          'Pendiente'
                        }
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      ID transacción
                    </span>
                    <span className="font-medium text-gray-900">{selectedPaymentData.transactionId}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Fecha
                    </span>
                    <span className="font-medium text-gray-900">{selectedPaymentData.paymentDate}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <h3 className="font-bold text-gray-900 mb-3 text-sm">Cursos inscritos</h3>
                <div className="space-y-2">
                  {selectedPaymentData.courses.map((course, idx) => (
                    <div key={idx} className="p-3 bg-[#0B95BA] text-white rounded-lg">
                      <p className="text-sm font-medium mb-1">{course.name}</p>
                      <p className="font-bold">S/. {course.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <button className="flex-1 px-4 py-2 border border-[#0B95BA] text-[#0B95BA] rounded-lg text-sm font-medium hover:bg-[#0B95BA] hover:text-white transition-colors">
                    Resumen
                  </button>
                  <button className="flex-1 ml-2 px-4 py-2 bg-[#0B95BA] text-white rounded-lg text-sm font-medium hover:bg-[#087A98] transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Descargar
                  </button>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tipo de pago</span>
                    <span className="font-medium text-gray-900">{selectedPaymentData.paymentMethod}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Monto a pagar</span>
                    <span className="font-bold text-gray-900">S/. {selectedPaymentData.income.toLocaleString()}</span>
                  </div>
                  {selectedPaymentData.discount !== 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Descuento</span>
                      <span className="font-medium text-red-600">{selectedPaymentData.discount}%</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-[#0B95BA] text-lg">S/. {selectedPaymentData.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>Selecciona un pago para ver los detalles</p>
            </div>
          )}
        </div>
      </div>

      {/* Transacciones - Full width */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Transacciones</h2>
            <p className="text-3xl font-bold text-gray-900">S/ 41,580</p>
            <p className="text-sm text-gray-500 mt-1">
              <span className="text-green-600 font-medium">↑ 6.5%</span> vs mes anterior
            </p>
          </div>
          <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 font-medium bg-white hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0B95BA]">
            <option>Mensual</option>
            <option>Semanal</option>
            <option>Anual</option>
          </select>
        </div>

        <div className="relative" style={{ height: '280px' }}>
          {/* Grid de fondo */}
          <div className="absolute inset-0 flex flex-col justify-between pb-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full border-t border-gray-100"></div>
            ))}
          </div>

          {/* Contenedor del gráfico */}
          <div className="absolute inset-0 pb-8">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0B95BA" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#0B95BA" stopOpacity="0.02" />
                </linearGradient>
                
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0B95BA" />
                  <stop offset="50%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#0B95BA" />
                </linearGradient>
              </defs>

              {/* Área bajo la curva */}
              <path
                d={(() => {
                  const points = transactionData.map((data, idx) => {
                    const x = (idx / (transactionData.length - 1)) * 100;
                    const y = 100 - ((data.amount / maxAmount) * 70 + 15);
                    return `${x},${y}`;
                  }).join(' L ');
                  return `M ${points} L 100,100 L 0,100 Z`;
                })()}
                fill="url(#areaGradient)"
              />

              {/* Línea principal */}
              <polyline
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={transactionData.map((data, idx) => {
                  const x = (idx / (transactionData.length - 1)) * 100;
                  const y = 100 - ((data.amount / maxAmount) * 70 + 15);
                  return `${x},${y}`;
                }).join(' ')}
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Puntos interactivos */}
            <div className="absolute inset-0 flex">
              {transactionData.map((data, idx) => {
                const xPercent = (idx / (transactionData.length - 1)) * 100;
                const yPercent = 100 - ((data.amount / maxAmount) * 70 + 15);
                
                return (
                  <div 
                    key={idx} 
                    className="flex-1 relative group cursor-pointer"
                  >
                    {/* Punto en la línea */}
                    <div 
                      className="absolute left-1/2 -translate-x-1/2"
                      style={{ top: `${yPercent}%` }}
                    >
                      <div className="relative">
                        <div className="w-3 h-3 bg-white border-2 border-[#0B95BA] rounded-full transition-transform group-hover:scale-150"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#0B95BA] rounded-full"></div>
                      </div>
                      
                      {/* Tooltip */}
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl whitespace-nowrap font-medium">
                          S/ {data.amount.toLocaleString()}
                        </div>
                        <div className="w-2 h-2 bg-gray-900 absolute left-1/2 -translate-x-1/2 -bottom-1 rotate-45"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Labels de meses */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between">
            {transactionData.map((data, idx) => (
              <span key={idx} className="text-xs text-gray-500 font-medium flex-1 text-center">
                {data.month}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}