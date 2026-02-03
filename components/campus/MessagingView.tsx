import { useState } from 'react';
import {
  Mail,
  Send,
  Inbox,
  FileText,
  Bell,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Clock,
  User,
  Building,
  ChevronRight,
  X,
  Paperclip,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';
import { toast } from 'sonner';

type MessageType = 'request-response' | 'institutional' | 'direct' | 'notification';
type MessageStatus = 'approved' | 'rejected' | 'info' | 'warning';

interface Message {
  id: string;
  type: MessageType;
  from: {
    name: string;
    role: 'administration' | 'student' | 'system';
  };
  to: {
    name: string;
    role: 'administration' | 'student';
  };
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
  status?: MessageStatus;
  requestId?: string;
  attachments?: Array<{
    name: string;
    size: string;
    url: string;
  }>;
}

interface MessagingViewProps {
  userRole?: 'student' | 'administration' | 'admin' | 'superadmin';
  userName?: string;
  initialFilter?: 'all' | MessageType;
}

export function MessagingView({ userRole = 'student', userName = 'Usuario', initialFilter = 'all' }: MessagingViewProps) {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | MessageType>(initialFilter);
  const [showUnreadOnly, setShowUnreadOnly] = useState(true);
  const [dateFilter, setDateFilter] = useState({
    startDate: '',
    endDate: ''
  });
  const [newMessage, setNewMessage] = useState({
    subject: '',
    content: '',
    recipient: '',
    messageType: 'direct' as MessageType,
    targetCourse: '',
    targetStudent: '',
    requestId: ''
  });
  const [showCompose, setShowCompose] = useState(false);

  // Solicitudes en proceso del estudiante (mock data)
  const activeRequests = [
    {
      id: 'REQ-2024-001',
      type: 'Constancia de estudios',
      program: 'Diplomado en Arbitraje Comercial Internacional',
      date: '25/11/2024',
      status: 'En proceso'
    },
    {
      id: 'REQ-2024-015',
      type: 'Certificado de notas',
      program: 'Diplomado en Contratación Pública',
      date: '01/12/2024',
      status: 'En proceso'
    },
    {
      id: 'REQ-2024-023',
      type: 'Constancia de matrícula',
      program: 'Curso de Especialización en Controversias',
      date: '05/12/2024',
      status: 'En proceso'
    },
    {
      id: 'REQ-2024-028',
      type: 'Duplicado de certificado',
      program: 'Diplomado en Arbitraje Comercial Internacional',
      date: '08/12/2024',
      status: 'En proceso'
    }
  ];

  // Mock data - En producción vendría de la API
  const messages: Message[] = [
    {
      id: 'MSG-001',
      type: 'request-response',
      from: {
        name: 'Administración CEAR',
        role: 'administration'
      },
      to: {
        name: 'María González Pérez',
        role: 'student'
      },
      subject: 'Constancia de estudios',
      content: `Estimada María González,

Su solicitud de Constancia de Estudios (REQ-2024-001) ha sido APROBADA.

El documento solicitado está disponible para descarga en el sistema. Puede acceder a él desde la sección "Mis Solicitudes" o haciendo clic en el botón de descarga adjunto.

Detalles de la solicitud:
- Tipo: Constancia de Estudios
- Curso: Diplomado en Arbitraje Comercial Internacional
- Fecha de solicitud: 25/11/2024
- Fecha de aprobación: 28/11/2024
- Aprobado por: Admin. Carlos Ruiz

Si tiene alguna consulta, no dude en contactarnos.

Saludos cordiales,
Área de Administración
CEAR LATINOAMERICANO`,
      timestamp: '2024-11-28T10:30:00',
      read: false,
      status: 'approved',
      requestId: 'REQ-2024-001',
      attachments: [
        {
          name: 'Constancia_Estudios_Maria_Gonzalez.pdf',
          size: '245 KB',
          url: '#'
        }
      ]
    },
    {
      id: 'MSG-002',
      type: 'request-response',
      from: {
        name: 'Administración CEAR',
        role: 'administration'
      },
      to: {
        name: 'Carlos Mendoza Silva',
        role: 'student'
      },
      subject: 'Baja de curso',
      content: `Estimado Carlos Mendoza,

Su solicitud de Baja de Curso (REQ-2024-004) ha sido RECHAZADA.

Motivo del rechazo:
El estudiante ha superado el 50% del avance del curso y según las políticas institucionales no es posible procesar la baja en este momento. Para poder solicitar la baja, el estudiante debe tener menos del 40% de avance del curso.

Avance actual: 65%
Límite permitido: 40%

Si considera que existe algún error en esta evaluación o desea discutir su caso particular, puede solicitar una reunión con el área académica.

Saludos cordiales,
Área de Administración
CEAR Latinoamericano`,
      timestamp: '2024-11-27T16:45:00',
      read: true,
      status: 'rejected',
      requestId: 'REQ-2024-004'
    },
    {
      id: 'MSG-003',
      type: 'institutional',
      from: {
        name: 'CEAR LATINOAMERICANO',
        role: 'system'
      },
      to: {
        name: 'Todos los estudiantes',
        role: 'student'
      },
      subject: 'Actualización de políticas institucionales 2025',
      content: `Estimados estudiantes,

Nos complace informarles sobre las actualizaciones en nuestras políticas institucionales que entrarán en vigencia a partir del 1 de enero de 2025:

📚 POLÍTICAS ACADÉMICAS:
- Se mantiene el requisito de 70% de asistencia mínima para diploma
- Los controles de lectura ahora incluirán documentos de hasta 100 páginas
- Se implementará un nuevo sistema de evaluación continua

💳 POLÍTICAS DE PAGO:
- Nueva modalidad de pago en cuotas flexibles
- Descuentos por pago anticipado del 15%
- Plazos de gracia extendidos a 5 días

📋 SOLICITUDES Y TRÁMITES:
- Todos los trámites ahora son 100% digitales
- Tiempo de respuesta reducido a 48 horas hábiles
- Notificaciones automáticas vía mensajería interna

Les invitamos a revisar el documento completo adjunto.

Atentamente,
Dirección Académica
CEAR Latinoamericano`,
      timestamp: '2024-11-26T09:00:00',
      read: false,
      status: 'info',
      attachments: [
        {
          name: 'Politicas_Institucionales_2025.pdf',
          size: '1.2 MB',
          url: '#'
        }
      ]
    },
    {
      id: 'MSG-004',
      type: 'notification',
      from: {
        name: 'Sistema CEAR',
        role: 'system'
      },
      to: {
        name: 'María González Pérez',
        role: 'student'
      },
      subject: 'Recordatorio: Próximo pago vence en 3 días',
      content: `Estimada María González,

Le recordamos que tiene un pago próximo a vencer:

💰 DETALLES DEL PAGO:
- Curso: Diplomado en Arbitraje Comercial Internacional
- Cuota: 5 de 6
- Monto: S/ 600.00
- Fecha de vencimiento: 05/12/2024
- Días restantes: 3 días

Para realizar su pago, ingrese a la sección "Mis Pagos" en el campus virtual.

Métodos de pago disponibles:
✓ Tarjeta de crédito/débito
✓ Transferencia bancaria
✓ Yape/Plin
✓ Pago en agencia

Este es un mensaje automático del sistema.

CEAR Latinoamericano`,
      timestamp: '2024-12-01T08:00:00',
      read: true,
      status: 'warning'
    },
    {
      id: 'MSG-005',
      type: 'direct',
      from: {
        name: 'Administración CEAR',
        role: 'administration'
      },
      to: {
        name: 'Ana Rodríguez Torres',
        role: 'student'
      },
      subject: 'Felicitaciones - Diploma aprobado',
      content: `Estimada Ana Rodríguez,

¡Felicitaciones! Nos complace informarle que ha cumplido satisfactoriamente con todos los requisitos del curso y su diploma ha sido aprobado.

📜 INFORMACIÓN DEL DIPLOMA:
- Curso: Especialización en Resolución de Controversias
- Asistencia: 95% (Requerido: 70%)
- Promedio final: 18.5
- Control de lectura: Aprobado
- Evaluaciones: Todas aprobadas

Su diploma estará disponible para recojo en 15 días hábiles. Le enviaremos un correo con las instrucciones de recojo.

También puede solicitar el envío del diploma a domicilio con un costo adicional.

¡Nuevamente, felicitaciones por su excelente desempeño!

Atentamente,
Área académica
CEAR Latinoamericano`,
      timestamp: '2024-11-25T14:20:00',
      read: true,
      status: 'approved'
    },
    {
      id: 'MSG-006',
      type: 'request-response',
      from: {
        name: 'Administración CEAR',
        role: 'administration'
      },
      to: {
        name: 'Roberto Sánchez Vargas',
        role: 'student'
      },
      subject: 'Certificado modular',
      content: `Estimado Roberto Sánchez,

Su solicitud de certificado modular (REQ-2024-005) ha sido APROBADA.

El certificado correspondiente al Módulo 1 del Diplomado en Arbitraje Comercial Internacional está siendo procesado.

Detalles:
- Módulo: Módulo 1 - Fundamentos del Arbitraje
- Calificación: 17.8
- Asistencia al módulo: 88%
- Fecha de finalización: 20/11/2024

El certificado estará disponible para descarga en 3 días hábiles. Le notificaremos cuando esté listo.

Saludos cordiales,
Área de Administración
CEAR Latinoamericano`,
      timestamp: '2024-11-24T11:15:00',
      read: false,
      status: 'approved',
      requestId: 'REQ-2024-005'
    },
    {
      id: 'MSG-007',
      type: 'notification',
      from: {
        name: 'Sistema CEAR',
        role: 'system'
      },
      to: {
        name: 'María González Pérez',
        role: 'student'
      },
      subject: 'Nueva clase en vivo programada - Módulo 3',
      content: `Estimada María González,

Le informamos que se ha programado una nueva clase en vivo:

📅 DETALLES DE LA CLASE:
- Curso: Diplomado en Arbitraje Comercial Internacional
- Módulo: Módulo 3 - Procedimiento Arbitral
- Sesión: Sesión 8 - Laudos arbitrales y su ejecución
- Fecha: Viernes 08/12/2024
- Hora: 19:00 - 21:00 horas
- Plataforma: Zoom (enlace en el campus virtual)
- Docente: Dr. Alberto Mendoza

📋 RECOMENDACIONES:
✓ Revise el material previo disponible en el campus
✓ Prepare sus preguntas con anticipación
✓ Ingrese 5 minutos antes para verificar su conexión
✓ Asegúrese de tener cámara y micrófono funcionando

El enlace de acceso estará disponible 30 minutos antes del inicio.

Este es un mensaje automático del sistema.

CEAR Latinoamericano`,
      timestamp: '2024-12-02T10:00:00',
      read: false,
      status: 'info'
    },
    {
      id: 'MSG-008',
      type: 'notification',
      from: {
        name: 'Sistema CEAR',
        role: 'system'
      },
      to: {
        name: 'Carlos Mendoza Silva',
        role: 'student'
      },
      subject: 'Calificación publicada - Control de lectura Módulo 2',
      content: `Estimado Carlos Mendoza,

Le informamos que se ha publicado la calificación de su Control de lectura:

📊 RESULTADOS:
- Actividad: Control de lectura - Módulo 2
- Curso: Especialización en Contratación Pública
- Calificación obtenida: 16.5
- Estado: Aprobado
- Fecha de evaluación: 30/11/2024

📈 ESTADÍSTICAS:
- Promedio del grupo: 15.2
- Calificación más alta: 18.0
- Calificación mínima aprobatoria: 14.0

Puede revisar los detalles de su evaluación y retroalimentación del docente en la sección de actividades del curso.

¡Felicitaciones por su desempeño!

Este es un mensaje automático del sistema.

CEAR Latinoamericano`,
      timestamp: '2024-12-01T16:30:00',
      read: true,
      status: 'approved'
    },
    {
      id: 'MSG-009',
      type: 'notification',
      from: {
        name: 'Sistema CEAR',
        role: 'system'
      },
      to: {
        name: 'Ana Rodríguez Torres',
        role: 'student'
      },
      subject: 'Recordatorio: Actividad pendiente vence mañana',
      content: `Estimada Ana Rodríguez,

Le recordamos que tiene una actividad pendiente próxima a vencer:

⚠️ ACTIVIDAD PENDIENTE:
- Curso: Diplomado en Resolución de Controversias
- Módulo: Módulo 4 - Mediación y Conciliación
- Actividad: Tarea práctica - Caso de mediación empresarial
- Fecha límite: 06/12/2024 a las 23:59 horas
- Tiempo restante: 1 día
- Estado actual: No entregada

📝 INSTRUCCIONES:
Para entregar su actividad, ingrese al módulo correspondiente y cargue su archivo en formato PDF. El trabajo debe incluir:
- Análisis del caso propuesto
- Propuesta de mediación
- Conclusiones y recomendaciones

⏰ IMPORTANTE: Las entregas fuera de plazo recibirán una penalización del 30% en la calificación final de la actividad.

Este es un mensaje automático del sistema.

CEAR Latinoamericano`,
      timestamp: '2024-12-04T08:00:00',
      read: false,
      status: 'warning'
    },
    {
      id: 'MSG-010',
      type: 'notification',
      from: {
        name: 'Sistema CEAR',
        role: 'system'
      },
      to: {
        name: 'Roberto Sánchez Vargas',
        role: 'student'
      },
      subject: 'Nuevo material de estudio disponible',
      content: `Estimado Roberto Sánchez,

Se ha publicado nuevo material de estudio en su curso:

📚 MATERIAL DISPONIBLE:
- Curso: Diplomado en Arbitraje Comercial Internacional
- Módulo: Módulo 2 - Marco Normativo del Arbitraje
- Tipo: Lectura obligatoria + Video complementario
- Título: "Análisis comparativo de legislación arbitral en América Latina"
- Publicado por: Dr. Fernando Martínez
- Fecha de publicación: 04/12/2024

📖 CONTENIDO:
1. Documento PDF (45 páginas)
2. Video explicativo (28 minutos)
3. Presentación de diapositivas
4. Casos prácticos de análisis

Este material será evaluado en el próximo control de lectura programado para el 15/12/2024.

Puede acceder al material desde la sección de contenidos del módulo.

Este es un mensaje automático del sistema.

CEAR Latinoamericano`,
      timestamp: '2024-12-04T14:20:00',
      read: false,
      status: 'info'
    },
    {
      id: 'MSG-011',
      type: 'notification',
      from: {
        name: 'Sistema CEAR',
        role: 'system'
      },
      to: {
        name: 'María González Pérez',
        role: 'student'
      },
      subject: 'Confirmación de asistencia a clase en vivo',
      content: `Estimada María González,

Se ha registrado exitosamente su asistencia a la clase en vivo:

✅ CONFIRMACIÓN DE ASISTENCIA:
- Curso: Diplomado en Arbitraje Comercial Internacional
- Módulo: Módulo 3 - Procedimiento Arbitral
- Sesión: Sesión 7 - Etapa probatoria en el arbitraje
- Fecha: 03/12/2024
- Hora de conexión: 18:58 horas
- Hora de desconexión: 21:05 horas
- Tiempo de permanencia: 2 horas 7 minutos
- Estado: Asistencia completa ✓

📊 ESTADÍSTICAS DE ASISTENCIA:
- Asistencias totales: 18 de 20 sesiones
- Porcentaje de asistencia: 90%
- Requerido para diploma: 70%

La grabación de la clase estará disponible en 24 horas en la sección "Clases grabadas".

Este es un mensaje automático del sistema.

CEAR Latinoamericano`,
      timestamp: '2024-12-03T21:10:00',
      read: true,
      status: 'approved'
    },
    {
      id: 'MSG-012',
      type: 'notification',
      from: {
        name: 'Sistema CEAR',
        role: 'system'
      },
      to: {
        name: 'Carlos Mendoza Silva',
        role: 'student'
      },
      subject: 'Alerta: Porcentaje de asistencia bajo el mínimo requerido',
      content: `Estimado Carlos Mendoza,

Le informamos que su porcentaje de asistencia requiere atención:

⚠️ ESTADO DE ASISTENCIA:
- Curso: Especialización en Contratación Pública
- Asistencia actual: 65%
- Mínimo requerido para diploma: 70%
- Sesiones totales: 24
- Sesiones asistidas: 16
- Sesiones ausentes: 8
- Sesiones restantes: 8

📋 PARA CUMPLIR CON EL REQUISITO:
Debe asistir obligatoriamente a las 8 sesiones restantes del curso para alcanzar el 75% de asistencia y obtener su diploma.

Si falta a 1 sesión más, no cumplirá con el requisito mínimo del 70%.

💡 RECOMENDACIONES:
- Revise el calendario de sesiones próximas
- Configure recordatorios para cada clase
- En caso de emergencia, presente su justificación con 48 horas de anticipación

Para cualquier consulta, puede contactar al área académica.

Este es un mensaje automático del sistema.

CEAR Latinoamericano`,
      timestamp: '2024-12-02T09:00:00',
      read: false,
      status: 'warning'
    },
    {
      id: 'MSG-013',
      type: 'notification',
      from: {
        name: 'Sistema CEAR',
        role: 'system'
      },
      to: {
        name: 'Ana Rodríguez Torres',
        role: 'student'
      },
      subject: 'Certificado disponible para descarga',
      content: `Estimada Ana Rodríguez,

Su certificado ya está disponible para descarga:

📜 CERTIFICADO LISTO:
- Tipo: Certificado modular
- Curso: Diplomado en Resolución de Controversias
- Módulo: Módulo 3 - Negociación y manejo de conflictos
- Calificación final del módulo: 18.2
- Fecha de emisión: 04/12/2024
- Código de verificación: CERT-2024-RDC-M3-1547

✅ VALIDEZ:
Este certificado tiene validez oficial y puede ser verificado en nuestro sitio web mediante el código proporcionado.

📥 DESCARGA:
Puede descargar su certificado desde la sección "Mis certificados" en el campus virtual o haciendo clic en el botón de descarga en este mensaje.

El certificado incluye:
- Código QR de verificación
- Firma digital del Director Académico
- Detalle de contenidos del módulo
- Horas académicas certificadas

¡Felicitaciones por su logro!

Este es un mensaje automático del sistema.

CEAR Latinoamericano`,
      timestamp: '2024-12-04T10:15:00',
      read: false,
      status: 'approved',
      attachments: [
        {
          name: 'Certificado_Modular_M3_Ana_Rodriguez.pdf',
          size: '380 KB',
          url: '#'
        }
      ]
    }
  ];

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = 
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.from.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || msg.type === filterType;
    const matchesReadStatus = !showUnreadOnly || !msg.read;

    // Filtro por fecha
    let matchesDate = true;
    if (dateFilter.startDate || dateFilter.endDate) {
      const messageDate = new Date(msg.timestamp);
      
      if (dateFilter.startDate) {
        const startDate = new Date(dateFilter.startDate);
        startDate.setHours(0, 0, 0, 0);
        matchesDate = matchesDate && messageDate >= startDate;
      }
      
      if (dateFilter.endDate) {
        const endDate = new Date(dateFilter.endDate);
        endDate.setHours(23, 59, 59, 999);
        matchesDate = matchesDate && messageDate <= endDate;
      }
    }

    return matchesSearch && matchesType && matchesReadStatus && matchesDate;
  });

  const unreadCount = messages.filter(m => !m.read).length;

  const getMessageIcon = (type: MessageType) => {
    switch (type) {
      case 'request-response':
        return FileText;
      case 'institutional':
        return Building;
      case 'notification':
        return Bell;
      case 'direct':
        return Mail;
      default:
        return Mail;
    }
  };

  const getMessageTypeLabel = (type: MessageType) => {
    switch (type) {
      case 'request-response':
        return 'Respuesta de Solicitud';
      case 'institutional':
        return 'Comunicado Institucional';
      case 'notification':
        return 'Notificación';
      case 'direct':
        return 'Mensaje directo';
      default:
        return 'Mensaje';
    }
  };

  const getStatusBadge = (status?: MessageStatus) => {
    if (!status) return null;

    const styles = {
      approved: 'bg-green-100 text-green-700 border-green-200',
      rejected: 'bg-red-100 text-red-700 border-red-200',
      info: 'bg-blue-100 text-blue-700 border-blue-200',
      warning: 'bg-amber-100 text-amber-700 border-amber-200'
    };

    const icons = {
      approved: CheckCircle,
      rejected: XCircle,
      info: AlertCircle,
      warning: AlertCircle
    };

    const labels = {
      approved: 'Aprobado',
      rejected: 'Rechazado',
      info: 'Información',
      warning: 'Importante'
    };

    const Icon = icons[status];

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border-2 ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const markAsRead = (messageId: string) => {
    // En producción, esto haría una llamada a la API
    toast.success('Mensaje marcado como leído');
  };

  const markAsUnread = (messageId: string) => {
    // En producción, esto haría una llamada a la API
    toast.success('Mensaje marcado como no leído');
  };

  const handleSendMessage = () => {
    if (!newMessage.recipient || !newMessage.subject || !newMessage.content) {
      toast.error('Por favor complete todos los campos');
      return;
    }

    toast.success('Mensaje enviado correctamente');
    setShowCompose(false);
    setNewMessage({ subject: '', content: '', recipient: '', messageType: 'direct' as MessageType, targetCourse: '', targetStudent: '', requestId: '' });
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return `Hoy ${date.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (days === 1) {
      return 'Ayer';
    } else if (days < 7) {
      return `Hace ${days} días`;
    } else {
      return date.toLocaleDateString('es-PE', { day: '2-digit', month: 'numeric', year: 'numeric' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Mensajería</h1>
            <p className="text-xl opacity-90">Gestiona tus comunicaciones institucionales</p>
          </div>
          <button
            onClick={() => setShowCompose(true)}
            className="px-6 py-3 bg-white text-[#0B95BA] hover:bg-white/90 rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg"
          >
            <Send className="w-5 h-5" />
            Redactar mensaje
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar mensajes"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B95BA]"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B95BA] appearance-none bg-white"
            >
              <option value="all">Todos los tipos</option>
              <option value="request-response">Respuestas de Solicitudes</option>
              <option value="institutional">Comunicados Institucionales</option>
              <option value="notification">Notificaciones</option>
              <option value="direct">Mensajes Directos</option>
            </select>
          </div>

          <button
            onClick={() => setShowUnreadOnly(!showUnreadOnly)}
            className={`px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
              showUnreadOnly
                ? 'bg-[#0B95BA] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {showUnreadOnly ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            {showUnreadOnly ? 'Solo no leídos' : 'Ver todos'}
          </button>
        </div>

        {/* Filtros por fecha */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Desde
            </label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={dateFilter.startDate}
                onChange={(e) => setDateFilter({ ...dateFilter, startDate: e.target.value })}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B95BA]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hasta
            </label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={dateFilter.endDate}
                onChange={(e) => setDateFilter({ ...dateFilter, endDate: e.target.value })}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B95BA]"
              />
            </div>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setDateFilter({ startDate: '', endDate: '' })}
              className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Limpiar fechas
            </button>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="grid grid-cols-1 gap-3">
        {filteredMessages.map((message) => {
          const Icon = getMessageIcon(message.type);
          
          return (
            <div
              key={message.id}
              onClick={() => {
                setSelectedMessage(message);
                if (!message.read) {
                  markAsRead(message.id);
                }
              }}
              className={`bg-white rounded-2xl p-6 border-2 transition-all cursor-pointer hover:shadow-lg ${
                !message.read
                  ? 'border-[#0B95BA] bg-blue-50/30'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${
                  message.type === 'request-response' ? 'bg-[#0B95BA]/10' :
                  message.type === 'institutional' ? 'bg-[#0B95BA]/15' :
                  message.type === 'notification' ? 'bg-[#0B95BA]/10' :
                  'bg-[#0B95BA]/10'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    message.type === 'request-response' ? 'text-[#0B95BA]' :
                    message.type === 'institutional' ? 'text-[#084F6B]' :
                    message.type === 'notification' ? 'text-[#0B95BA]' :
                    'text-[#0B95BA]'
                  }`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className={`font-bold text-gray-900 ${!message.read ? 'text-[#0B95BA]' : ''}`}>
                          {message.subject}
                        </h3>
                        {!message.read && (
                          <span className="px-2 py-1 bg-[#0B95BA] text-white rounded-full text-xs font-medium">
                            NUEVO
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>De:</strong> {message.from.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {getMessageTypeLabel(message.type)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-2">{formatTimestamp(message.timestamp)}</p>
                      {message.status && getStatusBadge(message.status)}
                    </div>
                  </div>

                  <p className="text-gray-700 line-clamp-2 mb-3">
                    {message.content}
                  </p>

                  {message.attachments && message.attachments.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-[#0B95BA] text-white rounded-full text-xs font-bold">
                          {message.attachments.length}
                        </span>
                        archivo(s) adjunto(s)
                      </span>
                    </div>
                  )}
                </div>

                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          );
        })}
      </div>

      {filteredMessages.length === 0 && (
        <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
          <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No se encontraron mensajes</p>
        </div>
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] px-8 py-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold">{selectedMessage.subject}</h2>
                    {selectedMessage.status && getStatusBadge(selectedMessage.status)}
                  </div>
                  <p className="opacity-90 text-sm">
                    {getMessageTypeLabel(selectedMessage.type)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {/* Message Info */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">De:</p>
                    <p className="font-medium text-gray-900">{selectedMessage.from.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Para:</p>
                    <p className="font-medium text-gray-900">{selectedMessage.to.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Fecha:</p>
                    <p className="font-medium text-gray-900">
                      {new Date(selectedMessage.timestamp).toLocaleString('es-PE', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  {selectedMessage.requestId && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">ID Solicitud:</p>
                      <p className="font-medium text-gray-900">{selectedMessage.requestId}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Message Content */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Contenido del Mensaje</h3>
                <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {selectedMessage.content}
                  </p>
                </div>
              </div>

              {/* Attachments */}
              {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Archivos Adjuntos</h3>
                  <div className="space-y-2">
                    {selectedMessage.attachments.map((file, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Paperclip className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-500">{file.size}</p>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-[#0B95BA] text-white rounded-xl hover:bg-[#087A98] transition-colors flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Descargar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    if (selectedMessage.read) {
                      markAsUnread(selectedMessage.id);
                    } else {
                      markAsRead(selectedMessage.id);
                    }
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  {selectedMessage.read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  Marcar como {selectedMessage.read ? 'no leído' : 'leído'}
                </button>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-6 py-3 bg-[#0B95BA] text-white rounded-xl font-medium hover:bg-[#087A98] transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compose Message Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] px-8 py-6 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Nuevo mensaje</h2>
                <button
                  onClick={() => setShowCompose(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {/* Tipo de mensaje */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría del mensaje
                </label>
                <select
                  value={newMessage.messageType}
                  onChange={(e) => {
                    const messageType = e.target.value as MessageType;
                    setNewMessage({ 
                      ...newMessage, 
                      messageType, 
                      targetCourse: '', 
                      targetStudent: '',
                      recipient: messageType === 'direct' ? 'Área Académica' : ''
                    });
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B95BA]"
                >
                  {userRole === 'student' ? (
                    <>
                      <option value="direct">Mensaje directo al Área Académica</option>
                      <option value="request-response">Consulta sobre solicitud</option>
                    </>
                  ) : (
                    <>
                      <option value="direct">Mensaje directo a estudiante</option>
                      <option value="institutional">Comunicado institucional</option>
                      <option value="notification">Notificación</option>
                      <option value="request-response">Respuesta a solicitud</option>
                    </>
                  )}
                </select>
              </div>

              {/* Destinatario condicional */}
              {userRole !== 'student' && (
                <>
                  {/* Si es mensaje institucional, mostrar selector de programa */}
                  {newMessage.messageType === 'institutional' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enviar a programa
                      </label>
                      <select
                        value={newMessage.targetCourse}
                        onChange={(e) => setNewMessage({ ...newMessage, targetCourse: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B95BA]"
                      >
                        <option value="">Seleccione un programa</option>
                        <option value="all">Todos los estudiantes</option>
                        <option value="ARB-001">Diplomado en Arbitraje Comercial Internacional</option>
                        <option value="ARB-002">Especialización en Arbitraje Comercial Internacional</option>
                        <option value="CON-001">Diplomado en Contratación Pública</option>
                        <option value="RES-001">Especialización en Resolución de Controversias</option>
                        <option value="MED-001">Curso de Mediación y Conciliación</option>
                        <option value="NEG-001">Taller de Negociación Avanzada</option>
                      </select>
                      <p className="mt-2 text-sm text-gray-500">
                        Este mensaje se enviará a todos los estudiantes del programa seleccionado
                      </p>
                    </div>
                  )}

                  {/* Si es mensaje directo o respuesta a solicitud, mostrar selector de estudiante */}
                  {(newMessage.messageType === 'direct' || newMessage.messageType === 'request-response' || newMessage.messageType === 'notification') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estudiante destinatario
                      </label>
                      <select
                        value={newMessage.targetStudent}
                        onChange={(e) => setNewMessage({ ...newMessage, targetStudent: e.target.value, recipient: e.target.options[e.target.selectedIndex].text })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B95BA]"
                      >
                        <option value="">Seleccione un estudiante</option>
                        <option value="EST-001">María González Pérez - DNI 72345678</option>
                        <option value="EST-002">Carlos Mendoza Silva - DNI 45678912</option>
                        <option value="EST-003">Ana Rodríguez Torres - DNI 89012345</option>
                        <option value="EST-004">Roberto Sánchez Vargas - DNI 56789123</option>
                        <option value="EST-005">Patricia López Ramírez - DNI 34567891</option>
                        <option value="EST-006">Jorge Martínez Castro - DNI 78901234</option>
                        <option value="EST-007">Carmen Flores Díaz - DNI 23456789</option>
                        <option value="EST-008">Luis Torres Morales - DNI 67890123</option>
                        <option value="EST-009">Sofía Vargas Ruiz - DNI 12345678</option>
                        <option value="EST-010">Diego Castillo Herrera - DNI 90123456</option>
                      </select>
                    </div>
                  )}
                </>
              )}

              {/* Si es estudiante */}
              {userRole === 'student' && (
                <>
                  {/* Solo mostrar selector de destinatario si NO es mensaje directo (que ya tiene destinatario predeterminado) */}
                  {newMessage.messageType !== 'direct' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Destinatario
                      </label>
                      <select
                        value={newMessage.recipient}
                        onChange={(e) => setNewMessage({ ...newMessage, recipient: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B95BA]"
                      >
                        <option value="">Seleccione un destinatario</option>
                        <option value="Coordinador Académico">Coordinador Académico</option>
                        <option value="Área de Administración">Área de Administración</option>
                        <option value="Área Académica">Área Académica</option>
                        <option value="Soporte Técnico">Soporte Técnico</option>
                        <option value="Dirección General">Dirección General</option>
                      </select>
                    </div>
                  )}

                  {/* Selector de solicitud - solo para consulta sobre solicitud */}
                  {newMessage.messageType === 'request-response' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Seleccione la solicitud
                      </label>
                      <select
                        value={newMessage.requestId}
                        onChange={(e) => setNewMessage({ ...newMessage, requestId: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B95BA]"
                        required
                      >
                        <option value="">Seleccione una solicitud</option>
                        {activeRequests.map((request) => (
                          <option key={request.id} value={request.id}>
                            {request.id} - {request.type} - {request.program} - {request.date}
                          </option>
                        ))}
                      </select>
                      <p className="mt-2 text-sm text-gray-500">
                        Seleccione la solicitud sobre la cual tiene una consulta
                      </p>
                    </div>
                  )}
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asunto
                </label>
                <input
                  type="text"
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                  placeholder="Asunto del mensaje"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B95BA]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                  placeholder="Escribe tu mensaje aquí"
                  rows={10}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B95BA] resize-none"
                />
              </div>
            </div>

            <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowCompose(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-3 bg-[#0B95BA] text-white rounded-xl font-medium hover:bg-[#087A98] transition-colors flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Enviar mensaje
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}