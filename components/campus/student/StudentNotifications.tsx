import { useState } from 'react';
import { 
  Bell, 
  X, 
  Check, 
  AlertTriangle,
  MessageSquare,
  Calendar,
  Clock,
  CheckCircle,
  Award,
  FileText,
  Video,
  CreditCard,
  BookOpen,
  Mail,
  AlertCircle,
  TrendingUp,
  MessageCircle,
  DollarSign,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

type NotificationType = 
  | 'date_change'
  | 'new_evaluation'
  | 'deadline_reminder'
  | 'grade_available'
  | 'teacher_feedback'
  | 'teacher_message'
  | 'course_announcement'
  | 'live_class_starting'
  | 'live_class_recorded'
  | 'payment_due'
  | 'payment_confirmed'
  | 'certificate_available'
  | 'program_completion'
  | 'forum_response'
  | 'material_uploaded'
  | 'schedule_change'
  | 'evaluation_rescheduled';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  metadata?: {
    courseName?: string;
    evaluationName?: string;
    dueDate?: string;
    grade?: number;
    teacherName?: string;
  };
}

const notificationConfig: Record<NotificationType, { icon: any; color: string; bgColor: string }> = {
  date_change: { icon: Calendar, color: 'text-orange-600', bgColor: 'bg-orange-50' },
  new_evaluation: { icon: FileText, color: 'text-amber-600', bgColor: 'bg-amber-50' },
  deadline_reminder: { icon: AlertCircle, color: 'text-red-600', bgColor: 'bg-red-50' },
  grade_available: { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50' },
  teacher_feedback: { icon: MessageSquare, color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
  teacher_message: { icon: Mail, color: 'text-purple-600', bgColor: 'bg-purple-50' },
  course_announcement: { icon: MessageSquare, color: 'text-cyan-600', bgColor: 'bg-cyan-50' },
  live_class_starting: { icon: Video, color: 'text-red-600', bgColor: 'bg-red-50' },
  live_class_recorded: { icon: Video, color: 'text-[#0B95BA]', bgColor: 'bg-blue-50' },
  payment_due: { icon: CreditCard, color: 'text-amber-600', bgColor: 'bg-amber-50' },
  payment_confirmed: { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50' },
  certificate_available: { icon: Award, color: 'text-green-600', bgColor: 'bg-green-50' },
  program_completion: { icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-50' },
  forum_response: { icon: MessageSquare, color: 'text-[#0B95BA]', bgColor: 'bg-blue-50' },
  material_uploaded: { icon: BookOpen, color: 'text-[#0B95BA]', bgColor: 'bg-blue-50' },
  schedule_change: { icon: Calendar, color: 'text-amber-600', bgColor: 'bg-amber-50' },
  evaluation_rescheduled: { icon: Calendar, color: 'text-amber-600', bgColor: 'bg-amber-50' }
};

// Mock data - En producción vendría de la base de datos
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'live_class_starting',
    title: 'Clase en vivo iniciando',
    message: 'La clase "Etapas del procedimiento arbitral" está comenzando. Únase ahora para no perder contenido importante.',
    timestamp: '2025-12-10T18:00:00',
    read: false,
    priority: 'high',
    metadata: {
      courseName: 'Arbitraje Comercial Internacional'
    }
  },
  {
    id: '2',
    type: 'deadline_reminder',
    title: 'Recordatorio de fecha límite',
    message: 'Le recordamos que la fecha de entrega de su actividad "Quiz: Evaluación del procedimiento" está próxima a vencer.',
    timestamp: '2025-12-10T15:00:00',
    read: false,
    priority: 'high',
    metadata: {
      courseName: 'Arbitraje Comercial Internacional',
      dueDate: '2024-11-25'
    }
  },
  {
    id: '3',
    type: 'payment_due',
    title: 'Recordatorio de cuota pendiente',
    message: 'Le recordamos que tiene una cuota pendiente de pago. Para evitar restricciones en su acceso, le sugerimos regularizar su situación a la brevedad.',
    timestamp: '2025-12-10T10:00:00',
    read: false,
    priority: 'high',
    metadata: {
      dueDate: '2024-12-15'
    }
  },
  {
    id: '4',
    type: 'new_evaluation',
    title: 'Evaluación disponible',
    message: 'Se ha asignado una nueva actividad "Examen del Módulo 2 - Arbitraje Comercial". Le recomendamos revisarla a la brevedad.',
    timestamp: '2025-12-10T09:00:00',
    read: false,
    priority: 'medium',
    metadata: {
      courseName: 'Arbitraje Comercial Internacional',
      evaluationName: 'Examen del Módulo 2',
      dueDate: '2024-12-20'
    }
  },
  {
    id: '5',
    type: 'teacher_feedback',
    title: 'Retroalimentación del docente',
    message: 'Su docente ha dejado un comentario sobre su entrega "Tarea: Análisis de cláusulas arbitrales". Puede revisarlo en la plataforma.',
    timestamp: '2025-12-09T16:30:00',
    read: false,
    priority: 'medium',
    metadata: {
      courseName: 'Arbitraje Comercial Internacional',
      teacherName: 'Dr. Roberto Sánchez'
    }
  },
  {
    id: '6',
    type: 'grade_available',
    title: 'Calificación disponible',
    message: 'Su calificación de "Tarea: Análisis de cláusulas arbitrales" ya se encuentra disponible para consulta.',
    timestamp: '2025-12-09T14:00:00',
    read: false,
    priority: 'medium',
    metadata: {
      courseName: 'Arbitraje Comercial Internacional',
      evaluationName: 'Tarea: Análisis de cláusulas arbitrales',
      grade: 19
    }
  },
  {
    id: '7',
    type: 'date_change',
    title: 'Cambio de fecha',
    message: 'Se ha actualizado la fecha de la sesión "Sesión 3: Audiencias arbitrales". Por favor, consulte la información correspondiente.',
    timestamp: '2025-12-09T12:00:00',
    read: true,
    priority: 'medium',
    metadata: {
      courseName: 'Arbitraje Comercial Internacional'
    }
  },
  {
    id: '8',
    type: 'live_class_recorded',
    title: 'Clase grabada disponible',
    message: 'La clase "Redacción de cláusulas arbitrales" ya se encuentra disponible para visualización. Puede acceder a ella desde el contenido del programa.',
    timestamp: '2025-12-08T20:00:00',
    read: true,
    priority: 'low',
    metadata: {
      courseName: 'Arbitraje Comercial Internacional'
    }
  },
  {
    id: '9',
    type: 'teacher_message',
    title: 'Mensaje del docente',
    message: 'Ha recibido un nuevo mensaje por parte de su docente Dr. Carlos Méndez.',
    timestamp: '2025-12-08T17:00:00',
    read: true,
    priority: 'medium',
    metadata: {
      teacherName: 'Dr. Carlos Méndez',
      courseName: 'Arbitraje Comercial Internacional'
    }
  },
  {
    id: '10',
    type: 'course_announcement',
    title: 'Anuncio general del programa',
    message: 'Se ha publicado un anuncio importante en el programa. Le invitamos a revisarlo para mantenerse informado.',
    timestamp: '2025-12-08T10:00:00',
    read: true,
    priority: 'medium'
  },
  {
    id: '11',
    type: 'forum_response',
    title: 'Respuesta en foro',
    message: 'Su docente ha respondido a su intervención en el foro "Autonomía de la voluntad en contratos comerciales".',
    timestamp: '2025-12-07T15:30:00',
    read: true,
    priority: 'low',
    metadata: {
      courseName: 'Arbitraje Comercial Internacional'
    }
  },
  {
    id: '12',
    type: 'material_uploaded',
    title: 'Nuevo material disponible',
    message: 'Se ha cargado nuevo material de estudio en el programa. Le recomendamos revisarlo antes de la próxima sesión.',
    timestamp: '2025-12-07T11:00:00',
    read: true,
    priority: 'low',
    metadata: {
      courseName: 'Arbitraje Comercial Internacional'
    }
  },
  {
    id: '13',
    type: 'payment_confirmed',
    title: 'Pago confirmado',
    message: 'Su pago ha sido confirmado exitosamente. Su acceso al programa continúa sin restricciones.',
    timestamp: '2025-12-06T14:20:00',
    read: true,
    priority: 'low'
  },
  {
    id: '14',
    type: 'evaluation_rescheduled',
    title: 'Evaluación reprogramada',
    message: 'Su solicitud de reprogramación para la evaluación ha sido aprobada. La nueva fecha límite es: 2024-12-22.',
    timestamp: '2025-12-05T16:00:00',
    read: true,
    priority: 'medium',
    metadata: {
      dueDate: '2024-12-22'
    }
  },
  {
    id: '15',
    type: 'certificate_available',
    title: 'Certificado disponible',
    message: 'Su certificado de finalización del programa ya está disponible para descarga.',
    timestamp: '2025-12-04T10:00:00',
    read: true,
    priority: 'low'
  }
];

export function StudentNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(
    // Ordenar por prioridad: high > medium > low, y luego por fecha
    mockNotifications.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    })
  );
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
                            <div className="flex items-center justify-between gap-2 mb-1">
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
                            {notification.message.length > 80 && (
                              <button
                                onClick={() => toggleExpanded(notification.id)}
                                className={`flex items-center gap-1 text-xs text-[#0B95BA] hover:text-[#087A98] font-medium transition-colors ${
                                  notification.metadata && (
                                    notification.metadata.dueDate || 
                                    notification.metadata.grade !== undefined || 
                                    notification.metadata.evaluationName || 
                                    notification.metadata.teacherName
                                  ) ? 'mb-2' : 'mb-1'
                                }`}
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
                            
                            {/* Metadata */}
                            {notification.metadata && (
                              notification.metadata.dueDate || 
                              notification.metadata.grade !== undefined || 
                              notification.metadata.evaluationName || 
                              notification.metadata.teacherName
                            ) && (
                              <div className="flex items-center gap-2 flex-wrap mb-2">
                                {notification.metadata.dueDate && (
                                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                                    <Clock className="w-3 h-3" />
                                    Vence {notification.metadata.dueDate}
                                  </span>
                                )}
                                {notification.metadata.grade !== undefined && (
                                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                    <Award className="w-3 h-3" />
                                    Nota: {notification.metadata.grade}
                                  </span>
                                )}
                                {notification.metadata.evaluationName && (
                                  <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                                    {notification.metadata.evaluationName}
                                  </span>
                                )}
                                {notification.metadata.teacherName && (
                                  <span className="inline-flex px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                                    {notification.metadata.teacherName}
                                  </span>
                                )}
                              </div>
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