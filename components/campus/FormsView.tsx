import { useState } from 'react';
import { FileText, Plus, Search, Download, Clock, CheckCircle, XCircle, AlertCircle, Calendar, User, CalendarClock, UserX } from 'lucide-react';
import { toast } from 'sonner';

type FormType = 
  | 'rescheduling-request'
  | 'grade-review' 
  | 'absence-justification'
  | 'certificate' 
  | 'participation-certificate' 
  | 'withdrawal';

type RequestStatus = 'pending' | 'approved' | 'rejected' | 'processing';

interface FormRequest {
  id: string;
  requestCode: string;
  type: FormType;
  title: string;
  courseCode: string;
  courseName: string;
  submittedDate: string;
  status: RequestStatus;
  comments?: string;
  responseDate?: string;
  downloadUrl?: string;
}

export function FormsView() {
  const [selectedFormType, setSelectedFormType] = useState<FormType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<RequestStatus | 'all'>('all');
  const [newRequest, setNewRequest] = useState({
    course: '',
    module: '',
    evaluationType: '',
    subject: '',
    description: '',
    requestedDate: '',
    originalDate: '',
    absenceDate: '',
    activityType: '',
    file: null as File | null
  });

  // Lista de actividades vencidas/no completadas disponibles para reprogramación
  const overdueActivities = [
    {
      id: 'act-1',
      name: 'Quiz: Conceptos básicos de arbitraje',
      module: 'Módulo 1: Introducción al Arbitraje',
      session: 'Sesión 1: Fundamentos del Arbitraje',
      course: 'Diplomado en Arbitraje Comercial Internacional',
      dueDate: '20/10/2024',
      type: 'Quiz'
    },
    {
      id: 'act-2',
      name: 'Foro: Casos de arbitraje nacional',
      module: 'Módulo 1: Introducción al Arbitraje',
      session: 'Sesión 2: Tipos de Arbitraje',
      course: 'Diplomado en Arbitraje Comercial Internacional',
      dueDate: '27/10/2024',
      type: 'Foro'
    },
    {
      id: 'act-3',
      name: 'Tarea: Análisis de cláusulas arbitrales',
      module: 'Módulo 2: Arbitraje Comercial',
      session: 'Sesión 1: Contratos Comerciales y Cláusulas Arbitrales',
      course: 'Diplomado en Arbitraje Comercial Internacional',
      dueDate: '10/11/2024',
      type: 'Tarea'
    },
    {
      id: 'act-4',
      name: 'Examen del Módulo 2 - Arbitraje Comercial',
      module: 'Módulo 2: Arbitraje Comercial',
      session: 'Evaluación de módulo',
      course: 'Diplomado en Arbitraje Comercial Internacional',
      dueDate: '20/12/2024',
      type: 'Examen'
    }
  ];

  const [requests, setRequests] = useState<FormRequest[]>([
    {
      id: '1',
      requestCode: 'CER-001',
      type: 'certificate',
      title: 'Certificado de estudios',
      courseCode: 'DIPARB-2024-V1',
      courseName: 'Diplomado en arbitraje comercial internacional',
      submittedDate: '2024-11-25T10:30:00',
      status: 'approved',
      responseDate: '2024-11-26T14:00:00',
      downloadUrl: '#',
      comments: 'Su certificado ha sido aprobado y está disponible para descarga'
    },
    {
      id: '2',
      requestCode: 'RVC-002',
      type: 'grade-review',
      title: 'Revisión de calificación',
      courseCode: 'CONTPUB-2024-V1',
      courseName: 'Contratación pública',
      submittedDate: '2024-11-28T16:45:00',
      status: 'processing',
      comments: 'Su solicitud está siendo revisada por el Área Académica'
    },
    {
      id: '3',
      requestCode: 'RSP-003',
      type: 'rescheduling-request',
      title: 'Solicitud de reprogramación',
      courseCode: 'RESCONT-2024-V1',
      courseName: 'Resolución de controversias',
      submittedDate: '2024-11-20T09:15:00',
      status: 'pending',
      comments: 'Su solicitud está pendiente de revisión por el área académica'
    },
    {
      id: '4',
      requestCode: 'JFA-004',
      type: 'absence-justification',
      title: 'Justificación de falta',
      courseCode: 'DIPARB-2024-V1',
      courseName: 'Diplomado en arbitraje comercial internacional',
      submittedDate: '2024-11-15T14:20:00',
      status: 'rejected',
      responseDate: '2024-11-18T10:00:00',
      comments: 'Su solicitud ha sido rechazada. La documentación presentada no cumple con los requisitos establecidos en el reglamento académico. La justificación médica debe ser emitida por una institución de salud oficial y presentarse dentro de las 48 horas posteriores a la inasistencia.'
    }
  ]);

  const formTypes = [
    {
      type: 'rescheduling-request' as FormType,
      title: 'Solicitud de reprogramación',
      description: 'Solicite la reprogramación de una evaluación o actividad.',
      icon: CalendarClock,
      color: 'purple'
    },
    {
      type: 'grade-review' as FormType,
      title: 'Revisión de calificación',
      description: 'Solicite la revisión formal de una evaluación o calificación.',
      icon: AlertCircle,
      color: 'amber'
    },
    {
      type: 'absence-justification' as FormType,
      title: 'Justificación de inasistencia',
      description: 'Solicite la justificación de su inasistencia a una clase o actividad programada.',
      icon: UserX,
      color: 'orange'
    },
    {
      type: 'certificate' as FormType,
      title: 'Certificado de estudios',
      description: 'Solicite la emisión de un certificado oficial de estudios del programa.',
      icon: FileText,
      color: 'blue'
    },
    {
      type: 'participation-certificate' as FormType,
      title: 'Constancia de participación',
      description: 'Solicite una constancia que acredite su participación en el programa.',
      icon: CheckCircle,
      color: 'green'
    },
    {
      type: 'withdrawal' as FormType,
      title: 'Solicitud de retiro',
      description: 'Solicite el retiro formal del programa.',
      icon: XCircle,
      color: 'red'
    }
  ];

  const courses = [
    { code: 'DIPARB-2024-V1', name: 'Diplomado en arbitraje comercial internacional' },
    { code: 'CONTPUB-2024-V1', name: 'Contratación pública' },
    { code: 'RESCONT-2024-V1', name: 'Resolución de controversias' }
  ];

  const getRequestCodePrefix = (type: FormType): string => {
    const prefixes = {
      'rescheduling-request': 'RSP',
      'grade-review': 'RVC',
      'absence-justification': 'JIN',
      'certificate': 'CER',
      'participation-certificate': 'CPA',
      'withdrawal': 'RET'
    };
    return prefixes[type];
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newRequest.course || !newRequest.subject.trim()) {
      toast.error('Complete todos los campos obligatorios');
      return;
    }

    const formType = formTypes.find(f => f.type === newRequest.type);
    const course = courses.find(c => c.code === newRequest.course);

    const newFormRequest: FormRequest = {
      id: String(Date.now()),
      requestCode: `${getRequestCodePrefix(newRequest.type)}-${String(Date.now()).slice(-3)}`,
      type: newRequest.type,
      title: formType?.title || '',
      courseCode: newRequest.course,
      courseName: course?.name || '',
      submittedDate: new Date().toISOString(),
      status: 'pending',
      comments: 'Su solicitud ha sido recibida y será procesada en las próximas 48 horas'
    };

    setRequests([newFormRequest, ...requests]);
    setNewRequest({
      course: '',
      module: '',
      evaluationType: '',
      subject: '',
      description: '',
      requestedDate: '',
      originalDate: '',
      absenceDate: '',
      activityType: '',
      file: null
    });
    setSelectedFormType(null);
    toast.success('Solicitud enviada exitosamente');
  };

  const getStatusBadge = (status: RequestStatus) => {
    const badges = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', iconColor: 'text-yellow-700', label: 'Pendiente', icon: Clock },
      processing: { bg: 'bg-blue-100', text: 'text-blue-700', iconColor: 'text-blue-700', label: 'En proceso', icon: AlertCircle },
      approved: { bg: 'bg-green-100', text: 'text-green-700', iconColor: 'text-green-700', label: 'Aprobado', icon: CheckCircle },
      rejected: { bg: 'bg-red-100', text: 'text-red-700', iconColor: 'text-red-700', label: 'Rechazado', icon: XCircle }
    };
    return badges[status];
  };

  const getFormTypeColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-600',
      green: 'bg-green-600',
      amber: 'bg-amber-600',
      purple: 'bg-purple-600',
      red: 'bg-red-600',
      orange: 'bg-orange-600',
      gray: 'bg-gray-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          req.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          req.requestCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getCountByStatus = (status: RequestStatus) => {
    return requests.filter(req => req.status === status).length;
  };

  const getTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (selectedFormType) {
    const formType = formTypes.find(f => f.type === selectedFormType);
    if (!formType) return null;

    const Icon = formType.icon;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
          <button
            onClick={() => setSelectedFormType(null)}
            className="text-white/90 hover:text-white mb-4 transition-colors"
          >
            ← Volver a solicitudes
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Icon className="w-10 h-10" />
            <h1 className="text-4xl font-bold">{formType.title}</h1>
          </div>
          <p className="text-xl opacity-90">{formType.description}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmitRequest} className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete el formulario</h2>

          <div className="space-y-6">
            {/* Course Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Programa *
              </label>
              <select
                required
                value={newRequest.course}
                onChange={(e) => setNewRequest({ ...newRequest, course: e.target.value })}
                className="w-full px-4 py-2 pr-12 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
              >
                <option value="">Seleccione un programa</option>
                {courses.map(course => (
                  <option key={course.code} value={course.code}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Module and Evaluation Type for grade-review and rescheduling-request */}
            {(selectedFormType === 'grade-review' || selectedFormType === 'rescheduling-request') && (
              <>
                {selectedFormType === 'rescheduling-request' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Actividad a reprogramar *
                    </label>
                    <select
                      required
                      value={newRequest.evaluationType}
                      onChange={(e) => {
                        const selectedActivity = overdueActivities.find(act => act.id === e.target.value);
                        if (selectedActivity) {
                          setNewRequest({ 
                            ...newRequest, 
                            evaluationType: e.target.value,
                            module: selectedActivity.module 
                          });
                        }
                      }}
                      className="w-full px-4 py-2 pr-12 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                    >
                      <option value="">Seleccione la actividad que no completó</option>
                      {overdueActivities.map(activity => (
                        <option key={activity.id} value={activity.id}>
                          {activity.name} ({activity.type})
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-600 mt-1">
                      Solo se muestran actividades vencidas que no fueron completadas en el tiempo establecido.
                    </p>
                  </div>
                )}

                {selectedFormType === 'grade-review' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Módulo *
                      </label>
                      <input
                        type="text"
                        required
                        value={newRequest.module}
                        onChange={(e) => setNewRequest({ ...newRequest, module: e.target.value })}
                        placeholder="Ej: Módulo 2"
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de evaluación *
                      </label>
                      <select
                        required
                        value={newRequest.evaluationType}
                        onChange={(e) => setNewRequest({ ...newRequest, evaluationType: e.target.value })}
                        className="w-full px-4 py-2 pr-12 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                      >
                        <option value="">Seleccione el tipo de evaluación</option>
                        <option value="foro">Foro</option>
                        <option value="examen-practico">Examen práctico</option>
                        <option value="control-lectura">Control de lectura</option>
                        <option value="otros">Otros</option>
                      </select>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Asunto *
              </label>
              <input
                type="text"
                required
                value={newRequest.subject}
                onChange={(e) => setNewRequest({ ...newRequest, subject: e.target.value })}
                placeholder="Resuma brevemente el asunto de la solicitud"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
              />
            </div>

            {/* Reason (optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivo (opcional)
              </label>
              <textarea
                value={newRequest.description}
                onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                placeholder="Proporcione información adicional que respalde la solicitud"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent resize-none"
                rows={6}
              />
            </div>

            {/* Attachments - for all types except absence-justification */}
            {selectedFormType !== 'absence-justification' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adjuntar documentos (opcional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.png,.doc,.docx"
                    multiple
                    className="hidden"
                    id="general-file-upload"
                  />
                  <label
                    htmlFor="general-file-upload"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-[#0B95BA] focus-within:border-transparent cursor-pointer flex items-center gap-3 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span className="px-4 py-2 bg-[#0B95BA] text-white rounded-lg text-sm font-medium hover:bg-[#087A98] transition-colors">
                      Elegir archivo
                    </span>
                    <span className="text-gray-500 text-sm">
                      No se ha seleccionado ningún archivo
                    </span>
                  </label>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Puede adjuntar documentos que respalden su solicitud (PDF, JPG, PNG, DOC, DOCX).
                </p>
              </div>
            )}

            {/* Specific fields for rescheduling-request */}
            {selectedFormType === 'rescheduling-request' && (
              <div className="p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                <h3 className="font-bold text-purple-900 mb-3">Información adicional de reprogramación</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha original
                    </label>
                    <input
                      type="date"
                      value={newRequest.originalDate}
                      onChange={(e) => setNewRequest({ ...newRequest, originalDate: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha propuesta
                    </label>
                    <input
                      type="date"
                      value={newRequest.requestedDate}
                      onChange={(e) => setNewRequest({ ...newRequest, requestedDate: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Specific fields for absence-justification */}
            {selectedFormType === 'absence-justification' && (
              <div className="p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
                <h3 className="font-bold text-orange-900 mb-3">Información de la inasistencia</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de la inasistencia
                    </label>
                    <input
                      type="date"
                      value={newRequest.absenceDate}
                      onChange={(e) => setNewRequest({ ...newRequest, absenceDate: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de actividad
                    </label>
                    <select
                      value={newRequest.activityType}
                      onChange={(e) => setNewRequest({ ...newRequest, activityType: e.target.value })}
                      className="w-full px-4 py-2 pr-10 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option>Clase en vivo</option>
                      <option>Tutoría programada</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adjuntar documento de justificación (opcional)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.png"
                      className="hidden"
                      id="absence-file-upload"
                    />
                    <label
                      htmlFor="absence-file-upload"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-transparent cursor-pointer flex items-center gap-3 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <span className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
                        Elegir archivo
                      </span>
                      <span className="text-gray-500 text-sm">
                        No se ha seleccionado ningún archivo
                      </span>
                    </label>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Certificado médico, carta de trabajo, u otro documento que respalde su inasistencia.
                  </p>
                </div>
              </div>
            )}

            {selectedFormType === 'certificate' && (
              <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <h3 className="font-bold text-blue-900 mb-3">Información del certificado</h3>
                <div className="space-y-3">
                  <p className="text-sm text-gray-700">
                    Se emitirá un certificado oficial de estudios que acredita su participación y aprobación del programa.
                  </p>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <p className="text-sm text-blue-900">
                      <strong>Requisitos:</strong> 70% de participación, nota mínima 14 y no tener deuda pendiente.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedFormType === 'participation-certificate' && (
              <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
                <h3 className="font-bold text-green-900 mb-3">Información de la constancia</h3>
                <div className="space-y-3">
                  <p className="text-sm text-gray-700">
                    Se emitirá una constancia que acredita su participación en el programa.
                  </p>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <p className="text-sm text-green-900">
                      <strong>Requisitos:</strong> 70% de participación, nota mínima 14 y no tener deuda pendiente.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Terms */}
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Declaro que la información proporcionada es verídica y acepto que CEAR LATINOAMERICANO no asume responsabilidad por los datos consignados.
                  </span>
                </label>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Declaro que acepto los términos y condiciones del proceso de solicitud establecidos por CEAR LATINOAMERICANO.
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="px-8 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-xl transition-colors"
              >
                Enviar solicitud
              </button>
              <button
                type="button"
                onClick={() => setSelectedFormType(null)}
                className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-xl transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <FileText className="w-10 h-10" />
          <h1 className="text-4xl font-bold">Solicitudes</h1>
        </div>
        <p className="text-xl opacity-90">Solicite certificados, constancias y gestione sus peticiones académicas de manera formal y eficiente.</p>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 px-[0px] py-[8px]">Tipos de solicitudes disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formTypes.map((formType) => {
            const Icon = formType.icon;
            return (
              <button
                key={formType.type}
                onClick={() => {
                  setSelectedFormType(formType.type);
                  setNewRequest({ ...newRequest, type: formType.type });
                }}
                className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-[#0B95BA] transition-all text-left group"
              >
                <div className={`w-14 h-14 rounded-xl ${getFormTypeColor(formType.color)} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{formType.title}</h3>
                <p className="text-sm text-gray-600">{formType.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* My Requests */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Historial de solicitudes</h2>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar solicitudes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors relative ${
                filterStatus === 'pending'
                  ? 'bg-[#0B95BA] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pendientes
              {getCountByStatus('pending') > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {getCountByStatus('pending')}
                </span>
              )}
            </button>
            <button
              onClick={() => setFilterStatus('processing')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors relative ${
                filterStatus === 'processing'
                  ? 'bg-[#0B95BA] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              En proceso
              {getCountByStatus('processing') > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {getCountByStatus('processing')}
                </span>
              )}
            </button>
            <button
              onClick={() => setFilterStatus('approved')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors relative ${
                filterStatus === 'approved'
                  ? 'bg-[#0B95BA] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Aprobadas
              {getCountByStatus('approved') > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {getCountByStatus('approved')}
                </span>
              )}
            </button>
            <button
              onClick={() => setFilterStatus('rejected')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'rejected'
                  ? 'bg-[#0B95BA] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Rechazadas
            </button>
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-[#0B95BA] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todas
            </button>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 border-2 border-gray-200 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No hay solicitudes</p>
            </div>
          ) : (
            filteredRequests.map((request) => {
              const statusBadge = getStatusBadge(request.status);
              const StatusIcon = statusBadge.icon;

              return (
                <div
                  key={request.id}
                  className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-[#0B95BA] transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-3 mb-2">
                        <span className="px-3 py-1 bg-[#0B95BA] text-white rounded-lg text-sm font-bold">
                          {request.requestCode}
                        </span>
                        <h3 className="font-bold text-gray-900">{request.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadge.bg} ${statusBadge.text}`}>
                          {statusBadge.label}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{request.courseName}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <span>Solicitado: {formatDate(request.submittedDate)}</span>
                        </div>
                        {request.responseDate && (
                          <div className="flex items-center gap-1.5">
                            <CheckCircle className="w-4 h-4" />
                            <span>Respondido: {formatDate(request.responseDate)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {request.status === 'approved' && request.downloadUrl && (
                      <a
                        href={request.downloadUrl}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Descargar
                      </a>
                    )}
                  </div>

                  {request.comments && (
                    <div className={`p-4 rounded-xl border-2 ${
                      request.status === 'approved' ? 'bg-green-50 border-green-200' :
                      request.status === 'rejected' ? 'bg-red-50 border-red-200' :
                      request.status === 'processing' ? 'bg-blue-50 border-blue-200' :
                      'bg-yellow-50 border-yellow-200'
                    }`}>
                      <p className="text-sm text-gray-700">{request.comments}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}