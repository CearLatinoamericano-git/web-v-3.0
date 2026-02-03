import { useState } from 'react';
import { 
  Bell, 
  X, 
  Check, 
  AlertTriangle,
  MessageSquare,
  Users,
  CreditCard,
  Award,
  FileText,
  Calendar,
  UserX,
  Clock,
  TrendingDown,
  UserCheck,
  Flag,
  Mail,
  CheckCircle,
  DollarSign,
  Video,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

type NotificationType = 
  | 'low_activity'
  | 'evaluation_expired'
  | 'new_message'
  | 'forum_intervention'
  | 'payment_restriction'
  | 'payment_regularized'
  | 'certificate_issued'
  | 'survey_response'
  | 'evaluation_submitted'
  | 'evaluation_rescheduled'
  | 'student_request'
  | 'session_no_participation'
  | 'attendance_limit'
  | 'program_closing'
  | 'student_data_updated'
  | 'desertion_risk'
  | 'student_message'
  | 'forum_misconduct'
  | 'reschedule_approved'
  | 'attendance_registered'
  | 'forum_report'
  | 'payment_registered';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

const notificationConfig: Record<NotificationType, { icon: any; color: string; bgColor: string }> = {
  low_activity: { icon: TrendingDown, color: 'text-amber-600', bgColor: 'bg-amber-50' },
  evaluation_expired: { icon: Clock, color: 'text-red-600', bgColor: 'bg-red-50' },
  new_message: { icon: MessageSquare, color: 'text-[#0B95BA]', bgColor: 'bg-blue-50' },
  forum_intervention: { icon: Users, color: 'text-[#0B95BA]', bgColor: 'bg-blue-50' },
  payment_restriction: { icon: UserX, color: 'text-red-600', bgColor: 'bg-red-50' },
  payment_regularized: { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50' },
  certificate_issued: { icon: Award, color: 'text-green-600', bgColor: 'bg-green-50' },
  survey_response: { icon: FileText, color: 'text-[#0B95BA]', bgColor: 'bg-blue-50' },
  evaluation_submitted: { icon: FileText, color: 'text-[#0B95BA]', bgColor: 'bg-blue-50' },
  evaluation_rescheduled: { icon: Calendar, color: 'text-amber-600', bgColor: 'bg-amber-50' },
  student_request: { icon: FileText, color: 'text-amber-600', bgColor: 'bg-amber-50' },
  session_no_participation: { icon: Video, color: 'text-amber-600', bgColor: 'bg-amber-50' },
  attendance_limit: { icon: AlertTriangle, color: 'text-red-600', bgColor: 'bg-red-50' },
  program_closing: { icon: Clock, color: 'text-amber-600', bgColor: 'bg-amber-50' },
  student_data_updated: { icon: UserCheck, color: 'text-gray-600', bgColor: 'bg-gray-50' },
  desertion_risk: { icon: AlertTriangle, color: 'text-red-600', bgColor: 'bg-red-50' },
  student_message: { icon: Mail, color: 'text-[#0B95BA]', bgColor: 'bg-blue-50' },
  forum_misconduct: { icon: Flag, color: 'text-red-600', bgColor: 'bg-red-50' },
  reschedule_approved: { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50' },
  attendance_registered: { icon: Check, color: 'text-green-600', bgColor: 'bg-green-50' },
  forum_report: { icon: Flag, color: 'text-amber-600', bgColor: 'bg-amber-50' },
  payment_registered: { icon: DollarSign, color: 'text-green-600', bgColor: 'bg-green-50' }
};

// Mock data - En producción vendría de la base de datos
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'low_activity',
    title: 'Estudiante con baja actividad',
    message: 'Se ha detectado baja actividad del estudiante "María González" en el programa "Arbitraje Comercial Internacional". Le sugerimos evaluar el caso y establecer contacto de seguimiento.',
    timestamp: '2025-12-05T10:30:00',
    read: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'evaluation_expired',
    title: 'Plazo de evaluación finalizado sin intento',
    message: 'El plazo para realizar la evaluación "Evaluación Final - Módulo 3" en el programa "Contratación Pública" ha finalizado y el estudiante "Carlos Mendoza" no registró intento.',
    timestamp: '2025-12-05T09:15:00',
    read: false,
    priority: 'high'
  },
  {
    id: '3',
    type: 'new_message',
    title: 'Nuevo mensaje en el chat de actividad',
    message: 'El estudiante "Ana Martínez" ha enviado un nuevo mensaje en el chat de actividad del programa "Resolución de Controversias". Le invitamos a revisarlo y brindar respuesta cuando le sea posible.',
    timestamp: '2025-12-05T08:45:00',
    read: false,
    priority: 'medium'
  },
  {
    id: '4',
    type: 'forum_intervention',
    title: 'Nueva intervención en foro',
    message: 'Se ha registrado una nueva intervención en el foro del programa "Arbitraje Comercial Internacional" por parte del estudiante "Roberto Silva". Le invitamos a revisarla para seguimiento académico.',
    timestamp: '2025-12-04T16:20:00',
    read: false,
    priority: 'medium'
  },
  {
    id: '5',
    type: 'payment_restriction',
    title: 'Restricción por falta de pago (estudiante con acceso bloqueado)',
    message: 'El estudiante "Luis Ramírez" del programa "Contratación Pública" ha sido bloqueado por falta de pago de la cuota "Cuota 2/4".',
    timestamp: '2025-12-04T14:00:00',
    read: true,
    priority: 'high'
  },
  {
    id: '6',
    type: 'payment_regularized',
    title: 'Regularización de pago y acceso habilitado',
    message: 'El estudiante "Patricia López" ha regularizado el pago de la cuota "Cuota 3/4". Su acceso al programa "Arbitraje Comercial Internacional" ha sido restablecido.',
    timestamp: '2025-12-04T11:30:00',
    read: true,
    priority: 'medium'
  },
  {
    id: '7',
    type: 'certificate_issued',
    title: 'Certificado emitido',
    message: 'Se ha emitido el certificado del estudiante "Fernando Torres" correspondiente al programa "Resolución de Controversias".',
    timestamp: '2025-12-04T10:00:00',
    read: true,
    priority: 'low'
  },
  {
    id: '8',
    type: 'survey_response',
    title: 'Nueva respuesta en encuesta de satisfacción',
    message: 'Se ha registrado una nueva respuesta en la encuesta de satisfacción del programa "Arbitraje Comercial Internacional".',
    timestamp: '2025-12-03T15:45:00',
    read: true,
    priority: 'low'
  },
  {
    id: '9',
    type: 'evaluation_submitted',
    title: 'Evaluación entregada por el estudiante',
    message: 'El estudiante "Diana Rojas" ha realizado la entrega de la evaluación "Caso Práctico - Módulo 2". Se encuentra pendiente de revisión.',
    timestamp: '2025-12-03T14:20:00',
    read: true,
    priority: 'medium'
  },
  {
    id: '10',
    type: 'evaluation_rescheduled',
    title: 'Evaluación reprogramada',
    message: 'La evaluación "Examen Final" del estudiante "Miguel Ángel Soto" ha sido reprogramada con nueva fecha: 15 de diciembre de 2025.',
    timestamp: '2025-12-03T12:00:00',
    read: true,
    priority: 'medium'
  },
  {
    id: '11',
    type: 'student_request',
    title: 'Solicitud generada por el estudiante',
    message: 'El estudiante "Carolina Vega" ha registrado una nueva solicitud con código: SOL-2025-0847. Se encuentra pendiente de revisión.',
    timestamp: '2025-12-03T10:30:00',
    read: true,
    priority: 'medium'
  },
  {
    id: '12',
    type: 'session_no_participation',
    title: 'Sesión en vivo iniciada sin participación del estudiante',
    message: 'La sesión en vivo del programa "Contratación Pública" ha iniciado. El estudiante "Jorge Castillo" aún no registra conexión.',
    timestamp: '2025-12-02T18:00:00',
    read: true,
    priority: 'high'
  },
  {
    id: '13',
    type: 'attendance_limit',
    title: 'Estudiante con 30% o más de inasistencias',
    message: 'El estudiante "Sofía Herrera" ha alcanzado el límite permitido de inasistencias en el programa "Arbitraje Comercial Internacional".',
    timestamp: '2025-12-02T16:15:00',
    read: true,
    priority: 'high'
  },
  {
    id: '14',
    type: 'program_closing',
    title: 'Próximo cierre de programa',
    message: 'El acceso a los recursos del programa "Resolución de Controversias - Cohorte 2024" vencerá el 31 de diciembre de 2025.',
    timestamp: '2025-12-02T09:00:00',
    read: true,
    priority: 'medium'
  },
  {
    id: '15',
    type: 'student_data_updated',
    title: 'Actualización de datos del estudiante',
    message: 'El estudiante "Ricardo Morales" ha actualizado su información personal o académica.',
    timestamp: '2025-12-01T17:30:00',
    read: true,
    priority: 'low'
  },
  {
    id: '16',
    type: 'desertion_risk',
    title: 'Estudiante con riesgo de deserción',
    message: 'El estudiante "Gabriela Ortiz" del programa "Contratación Pública" presenta indicadores de riesgo académico (falta de entregas, baja participación o ausencia prolongada).',
    timestamp: '2025-12-01T15:00:00',
    read: true,
    priority: 'high'
  },
  {
    id: '17',
    type: 'student_message',
    title: 'Nuevo mensaje de estudiante',
    message: 'Ha recibido un mensaje del estudiante "Eduardo Campos" del programa "Arbitraje Comercial Internacional".',
    timestamp: '2025-12-01T13:45:00',
    read: true,
    priority: 'medium'
  },
  {
    id: '18',
    type: 'forum_misconduct',
    title: 'Reporte de conducta inapropiada en foro',
    message: 'Se ha registrado un reporte de comportamiento inapropiado por parte del estudiante "Alberto Núñez".',
    timestamp: '2025-12-01T11:20:00',
    read: true,
    priority: 'high'
  },
  {
    id: '19',
    type: 'reschedule_approved',
    title: 'Confirmación de reprogramación aprobada',
    message: 'La reprogramación de la evaluación "Caso Práctico Final" solicitada por el estudiante "Valeria Castro" ha sido aprobada.',
    timestamp: '2025-11-30T16:00:00',
    read: true,
    priority: 'low'
  },
  {
    id: '20',
    type: 'attendance_registered',
    title: 'Asistencia registrada',
    message: 'La asistencia del estudiante "Andrés Fuentes" a la sesión "Sesión 5 - Módulo 2" fue registrada correctamente.',
    timestamp: '2025-11-30T14:30:00',
    read: true,
    priority: 'low'
  },
  {
    id: '21',
    type: 'forum_report',
    title: 'Reporte de participación en foro',
    message: 'Se ha registrado un reporte sobre la intervención del estudiante "Martina Ruiz" en el foro del programa "Resolución de Controversias". Le solicitamos revisar el caso y proceder según corresponda.',
    timestamp: '2025-11-30T12:00:00',
    read: true,
    priority: 'medium'
  },
  {
    id: '22',
    type: 'payment_registered',
    title: 'Pago de cuota registrado',
    message: 'El estudiante "Sebastián Vargas" ha registrado el pago de la cuota "Cuota 1/4" correspondiente al programa "Contratación Pública".',
    timestamp: '2025-11-30T10:15:00',
    read: true,
    priority: 'low'
  }
];

export function AdminNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [showPanel, setShowPanel] = useState(false);
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [expandedNotifications, setExpandedNotifications] = useState<Set<string>>(new Set());

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(notification => {
    const matchesPriority = filterPriority === 'all' || notification.priority === filterPriority;
    const matchesUnread = !showUnreadOnly || !notification.read;
    return matchesPriority && matchesUnread;
  });

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const toggleExpanded = (id: string) => {
    setExpandedNotifications(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `Hace ${diffInMinutes} minutos`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `Hace ${days} ${days === 1 ? 'día' : 'días'}`;
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Panel */}
      {showPanel && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowPanel(false)}
          />

          {/* Panel */}
          <div className="absolute right-0 top-12 w-[480px] max-h-[600px] bg-white rounded-2xl border-2 border-gray-200 shadow-2xl z-50 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b-2 border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900">Notificaciones</h3>
                  <p className="text-sm text-gray-600">
                    {unreadCount} {unreadCount === 1 ? 'notificación nueva' : 'notificaciones nuevas'}
                  </p>
                </div>
                <button
                  onClick={() => setShowPanel(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Filters */}
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setFilterPriority('all')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filterPriority === 'all'
                      ? 'bg-[#0B95BA] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Todas
                </button>
                <button
                  onClick={() => setFilterPriority('high')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filterPriority === 'high'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Urgentes
                </button>
                <button
                  onClick={() => setFilterPriority('medium')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filterPriority === 'medium'
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Importantes
                </button>
                <button
                  onClick={() => setFilterPriority('low')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filterPriority === 'low'
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Informativas
                </button>
              </div>

              {/* Toggle Unread */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                  className={`text-sm font-medium transition-colors ${
                    showUnreadOnly ? 'text-[#0B95BA]' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {showUnreadOnly ? 'Mostrar todas' : 'Solo no leídas'}
                </button>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-[#0B95BA] hover:text-[#087A98] font-medium transition-colors"
                  >
                    Marcar todas como leídas
                  </button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">No hay notificaciones</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredNotifications.map((notification) => {
                    const config = notificationConfig[notification.type];
                    const Icon = config.icon;
                    const isExpanded = expandedNotifications.has(notification.id);

                    return (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-gray-50 transition-colors ${
                          !notification.read ? 'bg-blue-50/30' : ''
                        }`}
                      >
                        <div className="flex gap-3">
                          {/* Icon */}
                          <div className={`w-10 h-10 rounded-xl ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-5 h-5 ${config.color}`} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className={`font-medium text-sm ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                {notification.title}
                              </h4>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                {!notification.read && (
                                  <button
                                    onClick={() => markAsRead(notification.id)}
                                    className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                                    title="Marcar como leída"
                                  >
                                    <Check className="w-4 h-4 text-gray-600" />
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteNotification(notification.id)}
                                  className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                                  title="Eliminar notificación"
                                >
                                  <X className="w-4 h-4 text-gray-600" />
                                </button>
                              </div>
                            </div>
                            <p className={`text-xs text-gray-600 mb-2 text-justify pr-4 max-w-[90%] ${!isExpanded ? 'line-clamp-2' : ''}`}>
                              {notification.message}
                            </p>
                            {notification.message.length > 100 && (
                              <button
                                onClick={() => toggleExpanded(notification.id)}
                                className="flex items-center gap-1 text-xs text-[#0B95BA] hover:text-[#087A98] font-medium mb-2 transition-colors"
                              >
                                {isExpanded ? (
                                  <>
                                    <ChevronUp className="w-3 h-3" />
                                    Ver menos
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="w-3 h-3" />
                                    Ver más
                                  </>
                                )}
                              </button>
                            )}
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">
                                {formatTimestamp(notification.timestamp)}
                              </span>
                              {notification.priority === 'high' && (
                                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">
                                  Urgente
                                </span>
                              )}
                              {!notification.read && (
                                <span className="w-2 h-2 bg-[#0B95BA] rounded-full" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}