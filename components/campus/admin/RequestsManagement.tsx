import { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Download,
  User,
  Calendar,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  X
} from 'lucide-react';
import { toast } from 'sonner';

type RequestStatus = 'pending' | 'in-review' | 'approved' | 'rejected';
type RequestType = 
  | 'carta-presentacion' 
  | 'constancia-estudios' 
  | 'constancia-notas' 
  | 'certificado-modular'
  | 'solicitud-baja'
  | 'solicitud-reingreso'
  | 'rectificacion-datos';

interface Request {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentCode: string;
  courseName: string;
  type: RequestType;
  typeName: string;
  status: RequestStatus;
  submittedDate: string;
  reviewedDate?: string;
  reviewedBy?: string;
  comments?: string;
  data: Record<string, any>;
  attachments?: { name: string; url: string; size: string }[];
}

export function RequestsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<RequestType | 'all'>('all');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject' | null>(null);
  const [reviewComments, setReviewComments] = useState('');

  // Mock data - En producción vendría de la API
  const [requests, setRequests] = useState<Request[]>([
    {
      id: 'REQ-2024-001',
      studentId: 'EST-001',
      studentName: 'María González Pérez',
      studentEmail: 'maria.gonzalez@email.com',
      studentCode: 'EST-2024-001',
      courseName: 'Diplomado en Arbitraje Comercial Internacional',
      type: 'constancia-estudios',
      typeName: 'Constancia de Estudios',
      status: 'pending',
      submittedDate: '2024-12-01 10:30',
      data: {
        motivo: 'Trámite bancario - Solicitud de crédito educativo',
        destinatario: 'Banco de Crédito del Perú',
        copias: 2
      },
      attachments: [
        { name: 'DNI_Maria_Gonzalez.pdf', url: '#', size: '1.2 MB' }
      ]
    },
    {
      id: 'REQ-2024-002',
      studentId: 'EST-002',
      studentName: 'Carlos Mendoza Silva',
      studentEmail: 'carlos.mendoza@email.com',
      studentCode: 'EST-2024-002',
      courseName: 'Diplomado en Contratación Pública',
      type: 'carta-presentacion',
      typeName: 'Carta de Presentación',
      status: 'in-review',
      submittedDate: '2024-11-30 15:45',
      reviewedBy: 'Admin Sistema',
      data: {
        empresa: 'Ministerio de Economía y Finanzas',
        cargo: 'Especialista en Contrataciones',
        dirigidoA: 'Dirección de Recursos Humanos',
        mencionarNotas: true
      }
    },
    {
      id: 'REQ-2024-003',
      studentId: 'EST-003',
      studentName: 'Ana Rodríguez Torres',
      studentEmail: 'ana.rodriguez@email.com',
      studentCode: 'EST-2024-003',
      courseName: 'Diplomado en Arbitraje Comercial Internacional',
      type: 'constancia-notas',
      typeName: 'Constancia de Notas',
      status: 'approved',
      submittedDate: '2024-11-28 09:15',
      reviewedDate: '2024-11-28 14:20',
      reviewedBy: 'Luz Marina Castro',
      comments: 'Solicitud aprobada. Constancia generada con notas actualizadas al 28/11/2024.',
      data: {
        periodoAcademico: '2024-2',
        incluirPromedio: true
      }
    },
    {
      id: 'REQ-2024-004',
      studentId: 'EST-004',
      studentName: 'Roberto Sánchez Vargas',
      studentEmail: 'roberto.sanchez@email.com',
      studentCode: 'EST-2024-004',
      courseName: 'Diplomado en Resolución de Controversias',
      type: 'solicitud-baja',
      typeName: 'Solicitud de Baja',
      status: 'rejected',
      submittedDate: '2024-11-25 11:00',
      reviewedDate: '2024-11-26 10:30',
      reviewedBy: 'Carmen Flores',
      comments: 'Solicitud rechazada. El estudiante tiene pagos pendientes que deben ser regularizados antes de procesar la baja. Coordinar con el área de finanzas.',
      data: {
        motivo: 'Problemas de salud',
        solicitudReembolso: true
      },
      attachments: [
        { name: 'Certificado_Medico.pdf', url: '#', size: '850 KB' }
      ]
    },
    {
      id: 'REQ-2024-005',
      studentId: 'EST-005',
      studentName: 'Patricia Vega Luna',
      studentEmail: 'patricia.vega@email.com',
      studentCode: 'EST-2024-005',
      courseName: 'Diplomado en Arbitraje Comercial Internacional',
      type: 'certificado-modular',
      typeName: 'Certificado modular',
      status: 'pending',
      submittedDate: '2024-12-01 08:00',
      data: {
        modulo: 'Módulo 1: Introducción al Arbitraje',
        motivo: 'Presentación en empresa actual para promoción interna'
      }
    }
  ]);

  const getStatusBadge = (status: RequestStatus) => {
    const styles = {
      pending: 'bg-amber-100 text-amber-700',
      'in-review': 'bg-blue-100 text-blue-700',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700'
    };

    const labels = {
      pending: 'Pendiente',
      'in-review': 'En revisión',
      approved: 'Aprobado',
      rejected: 'Rechazado'
    };

    const icons = {
      pending: Clock,
      'in-review': AlertCircle,
      approved: CheckCircle,
      rejected: XCircle
    };

    const Icon = icons[status];

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${styles[status]}`}>
        <Icon className="w-4 h-4" />
        {labels[status]}
      </span>
    );
  };

  const getTypeLabel = (type: RequestType) => {
    const labels: Record<RequestType, string> = {
      'carta-presentacion': 'Carta de Presentación',
      'constancia-estudios': 'Constancia de Estudios',
      'constancia-notas': 'Constancia de notas',
      'certificado-modular': 'Certificado modular',
      'solicitud-baja': 'Solicitud de baja',
      'solicitud-reingreso': 'Solicitud de Reingreso',
      'rectificacion-datos': 'Rectificación de Datos'
    };
    return labels[type];
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.studentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesType = typeFilter === 'all' || request.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    inReview: requests.filter(r => r.status === 'in-review').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length
  };

  const handleReview = (action: 'approve' | 'reject') => {
    if (!selectedRequest) return;

    const updatedRequests = requests.map(req => {
      if (req.id === selectedRequest.id) {
        return {
          ...req,
          status: action === 'approve' ? 'approved' as RequestStatus : 'rejected' as RequestStatus,
          reviewedDate: new Date().toLocaleString('es-PE', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          }),
          reviewedBy: 'Admin Sistema', // En producción sería el usuario actual
          comments: reviewComments
        };
      }
      return req;
    });

    setRequests(updatedRequests);
    setShowReviewModal(false);
    setReviewComments('');
    setReviewAction(null);
    
    toast.success(
      action === 'approve' 
        ? '✅ Solicitud aprobada exitosamente' 
        : '❌ Solicitud rechazada'
    );
    
    // Actualizar la solicitud seleccionada
    setSelectedRequest(updatedRequests.find(r => r.id === selectedRequest.id) || null);
  };

  const openReviewModal = (action: 'approve' | 'reject') => {
    setReviewAction(action);
    setShowReviewModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Gestión de solicitudes</h1>
          </div>
        </div>
        <p className="text-xl opacity-90">Administra actas, formularios y certificados de estudiantes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#EAB308] text-white flex items-center justify-center flex-shrink-0">
            <Clock className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900 text-[24px]">{stats.pending}</p>
            <p className="text-xs text-gray-600 whitespace-nowrap text-[15px] mx-[-7px] my-[0px]">Pendientes</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#0EA5E9] text-white flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900 text-[24px]">{stats.inReview}</p>
            <p className="text-xs text-gray-600 whitespace-nowrap text-[15px] mx-[-7px] my-[0px]">En revisión</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#10B981] text-white flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900 text-[24px]">{stats.approved}</p>
            <p className="text-xs text-gray-600 whitespace-nowrap text-[15px] mx-[-7px] my-[0px]">Aprobadas</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#EF4444] text-white flex items-center justify-center flex-shrink-0">
            <XCircle className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900 text-[24px]">{stats.rejected}</p>
            <p className="text-xs text-gray-600 whitespace-nowrap text-[15px] mx-[-7px] my-[0px]">Rechazadas</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por estudiante, código o solicitud..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B95BA]"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as RequestStatus | 'all')}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B95BA] appearance-none bg-white"
            >
              <option value="all">Todos los estados</option>
              <option value="pending">Pendiente</option>
              <option value="in-review">En revisión</option>
              <option value="approved">Aprobado</option>
              <option value="rejected">Rechazado</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="relative">
            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as RequestType | 'all')}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B95BA] appearance-none bg-white"
            >
              <option value="all">Todos los tipos</option>
              <option value="carta-presentacion">Carta de Presentación</option>
              <option value="constancia-estudios">Constancia de Estudios</option>
              <option value="constancia-notas">Constancia de notas</option>
              <option value="certificado-modular">Certificado modular</option>
              <option value="solicitud-baja">Solicitud de baja</option>
              <option value="solicitud-reingreso">Solicitud de Reingreso</option>
              <option value="rectificacion-datos">Rectificación de Datos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 w-28">Solicitud</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 w-48">Estudiante</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">Curso</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 w-44">Tipo</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 w-24">Fecha</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 w-32">Estado</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 w-20">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 text-sm">{request.id}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900 text-sm truncate max-w-[180px]">{request.studentName}</p>
                      <p className="text-xs text-gray-500">{request.studentCode}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-700 truncate max-w-[200px]" title={request.courseName}>{request.courseName}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      <FileText className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{request.typeName}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-gray-600 whitespace-nowrap">{request.submittedDate}</p>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(request.status)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="p-2 bg-[#0B95BA] text-white hover:bg-[#087A98] rounded-xl transition-colors"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No se encontraron solicitudes</p>
            </div>
          )}
        </div>
      </div>

      {/* Request Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] px-8 py-6 text-white flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">Detalle de solicitud</h2>
                <p className="opacity-90">{selectedRequest.id}</p>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                {getStatusBadge(selectedRequest.status)}
                <span className="text-sm text-gray-500">
                  Enviado: {selectedRequest.submittedDate}
                </span>
              </div>

              {/* Student Info */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#0B95BA]" />
                  Información del Estudiante
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Nombre completo</p>
                    <p className="font-medium text-gray-900">{selectedRequest.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Código</p>
                    <p className="font-medium text-gray-900">{selectedRequest.studentCode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="font-medium text-gray-900">{selectedRequest.studentEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Curso</p>
                    <p className="font-medium text-gray-900">{selectedRequest.courseName}</p>
                  </div>
                </div>
              </div>

              {/* Request Details */}
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#0B95BA]" />
                  Detalles de la Solicitud
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tipo de Solicitud</p>
                    <p className="font-medium text-gray-900">{selectedRequest.typeName}</p>
                  </div>
                  {Object.entries(selectedRequest.data).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-sm text-gray-600 mb-1 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="font-medium text-gray-900">
                        {typeof value === 'boolean' ? (value ? 'Sí' : 'No') : value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attachments */}
              {selectedRequest.attachments && selectedRequest.attachments.length > 0 && (
                <div className="bg-purple-50 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Download className="w-5 h-5 text-[#0B95BA]" />
                    Archivos Adjuntos
                  </h3>
                  <div className="space-y-2">
                    {selectedRequest.attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-500">{file.size}</p>
                          </div>
                        </div>
                        <button className="p-2 text-[#0B95BA] hover:bg-[#0B95BA]/10 rounded-lg transition-colors">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Review History */}
              {(selectedRequest.reviewedDate || selectedRequest.comments) && (
                <div className={`rounded-2xl p-6 ${
                  selectedRequest.status === 'approved' ? 'bg-green-50' : 
                  selectedRequest.status === 'rejected' ? 'bg-red-50' : 'bg-gray-50'
                }`}>
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#0B95BA]" />
                    Historial de revisión
                  </h3>
                  <div className="space-y-3">
                    {selectedRequest.reviewedDate && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Fecha de Revisión</p>
                        <p className="font-medium text-gray-900">{selectedRequest.reviewedDate}</p>
                      </div>
                    )}
                    {selectedRequest.reviewedBy && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Revisado por</p>
                        <p className="font-medium text-gray-900">{selectedRequest.reviewedBy}</p>
                      </div>
                    )}
                    {selectedRequest.comments && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Comentarios</p>
                        <p className="font-medium text-gray-900">{selectedRequest.comments}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer - Actions */}
            {(selectedRequest.status === 'pending' || selectedRequest.status === 'in-review') && (
              <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
                <div className="flex items-center justify-end gap-4">
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={() => openReviewModal('reject')}
                    className="px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    Rechazar
                  </button>
                  <button
                    onClick={() => openReviewModal('approve')}
                    className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Aprobar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && reviewAction && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {reviewAction === 'approve' ? 'Aprobar Solicitud' : 'Rechazar Solicitud'}
            </h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comentarios {reviewAction === 'reject' && <span className="text-red-600">*</span>}
              </label>
              <textarea
                value={reviewComments}
                onChange={(e) => setReviewComments(e.target.value)}
                placeholder={
                  reviewAction === 'approve'
                    ? 'Agrega comentarios adicionales (opcional)...'
                    : 'Explica el motivo del rechazo...'
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B95BA] min-h-[120px] resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-4">
              <button
                onClick={() => {
                  setShowReviewModal(false);
                  setReviewComments('');
                  setReviewAction(null);
                }}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleReview(reviewAction)}
                disabled={reviewAction === 'reject' && !reviewComments.trim()}
                className={`px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 ${
                  reviewAction === 'approve'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-red-600 text-white hover:bg-red-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {reviewAction === 'approve' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Confirmar Aprobación
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5" />
                    Confirmar Rechazo
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}