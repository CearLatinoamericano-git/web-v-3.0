import { useState } from 'react';
import { 
  ArrowLeft, 
  Users, 
  Calendar, 
  Clock, 
  FileText, 
  Upload, 
  MessageSquare,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { GroupActivityChat } from './GroupActivityChat';
import { toast } from 'sonner';

type ActivityStatus = 'completed' | 'submitted' | 'pending' | 'not-started';

interface Activity {
  id: number | string;
  title: string;
  type: 'assignment' | 'quiz' | 'forum' | 'reading';
  status: ActivityStatus;
  dueDate?: string;
  startDate?: string;
  grade?: number;
  maxGrade?: number;
  description?: string;
  minComments?: number;
  isGroupWork?: boolean;
  allowChat?: boolean;
  submittedDate?: string;
  reviewedDate?: string;
}

interface GroupActivityViewProps {
  activity: Activity;
  onBack: () => void;
  courseName?: string;
}

export function GroupActivityView({
  activity,
  onBack,
  courseName
}: GroupActivityViewProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'submission' | 'chat'>('details');
  const [submissionFiles, setSubmissionFiles] = useState<Array<{
    name: string;
    size: string;
    url: string;
  }>>([]);
  const [submissionText, setSubmissionText] = useState('');

  // Mock data
  const groupInfo = {
    id: 'group-1',
    name: 'Grupo 3 - Equipo Delta',
    members: [
      { id: '1', name: 'Juan Pérez', role: 'Líder', avatar: '' },
      { id: '2', name: 'María González', role: 'Miembro', avatar: '' },
      { id: '3', name: 'Carlos Torres', role: 'Miembro', avatar: '' },
      { id: '4', name: 'Ana López', role: 'Miembro', avatar: '' }
    ]
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = files.map(file => ({
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      url: URL.createObjectURL(file)
    }));
    setSubmissionFiles([...submissionFiles, ...newFiles]);
    toast.success(`${files.length} archivo(s) agregado(s)`);
  };

  const handleSubmit = () => {
    if (submissionFiles.length === 0 && !submissionText.trim()) {
      toast.error('Debes agregar al menos un archivo o comentario');
      return;
    }

    toast.success('Entrega enviada exitosamente');
  };

  const getActivityTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'assignment': 'Tarea',
      'reading': 'Lectura',
      'forum': 'Foro',
      'case-study': 'Caso práctico'
    };
    return labels[type] || type;
  };

  const getActivityTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'assignment': 'bg-blue-100 text-blue-700',
      'reading': 'bg-green-100 text-green-700',
      'forum': 'bg-amber-100 text-amber-700',
      'case-study': 'bg-red-100 text-red-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700'
  };

  // Helper function to format date properly
  const formatDueDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString; // Return original if invalid
      }
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] text-white p-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver al programa</span>
        </button>
        
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-lg text-sm font-medium bg-white/30 text-white border border-white/40`}>
                {getActivityTypeLabel(activity.type)}
              </span>
              <span className="px-3 py-1 bg-white/30 text-white border border-white/40 rounded-lg text-sm font-medium">
                Trabajo en grupo
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{activity.title}</h1>
            <div className="flex items-center gap-6 text-sm text-white">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Vence: {formatDueDate(activity.dueDate || '')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{groupInfo.members.length} miembros</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === 'details'
                      ? 'bg-[#0B95BA] text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Detalles
                </button>
                <button
                  onClick={() => setActiveTab('submission')}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === 'submission'
                      ? 'bg-[#0B95BA] text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Entrega
                </button>
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === 'chat'
                      ? 'bg-[#0B95BA] text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Chat del grupo
                  </div>
                </button>
              </div>

              <div className="p-6">
                {/* Details Tab */}
                {activeTab === 'details' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Instrucciones</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {activity.description}
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-900 mb-1">Actividad grupal</p>
                          <p className="text-sm text-blue-700">
                            Esta actividad debe ser realizada en conjunto con tu grupo. Utiliza el chat interno para coordinar y colaborar con tus compañeros.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">Materiales de apoyo</h3>
                      <div className="space-y-2">
                        <a
                          href="#"
                          className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200"
                        >
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">Caso de estudio - Arbitraje internacional</p>
                            <p className="text-sm text-gray-600">PDF • 3.2 MB</p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200"
                        >
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">Marco legal aplicable</p>
                            <p className="text-sm text-gray-600">PDF • 1.8 MB</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submission Tab */}
                {activeTab === 'submission' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Entrega del grupo</h3>
                      <p className="text-gray-600 mb-4">
                        Sube los archivos del trabajo grupal. Cualquier miembro del grupo puede hacer la entrega.
                      </p>

                      {/* File Upload */}
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#0B95BA] transition-colors">
                        <input
                          type="file"
                          id="submission-upload"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <label htmlFor="submission-upload" className="cursor-pointer">
                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <p className="font-medium text-gray-700 mb-1">
                            Click para subir archivos
                          </p>
                          <p className="text-sm text-gray-500">
                            PDF, Word, PowerPoint, Excel (máx. 50MB por archivo)
                          </p>
                        </label>
                      </div>

                      {/* Uploaded Files */}
                      {submissionFiles.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <h4 className="font-medium text-gray-900">Archivos adjuntos:</h4>
                          {submissionFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <FileText className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                  <p className="text-xs text-gray-500">{file.size}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => setSubmissionFiles(submissionFiles.filter((_, i) => i !== index))}
                                className="text-red-600 hover:text-red-700 text-sm font-medium"
                              >
                                Eliminar
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Comments */}
                    <div>
                      <label className="block font-medium text-gray-900 mb-2">
                        Comentarios (opcional)
                      </label>
                      <textarea
                        value={submissionText}
                        onChange={(e) => setSubmissionText(e.target.value)}
                        placeholder="Agrega comentarios sobre tu entrega..."
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent resize-none"
                      />
                    </div>

                    <button
                      onClick={handleSubmit}
                      className="w-full px-6 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Enviar entrega del grupo
                    </button>
                  </div>
                )}

                {/* Chat Tab */}
                {activeTab === 'chat' && (
                  <div className="h-[600px]">
                    <GroupActivityChat
                      activityId={activity.id.toString()}
                      activityTitle={activity.title}
                      groupId={groupInfo.id}
                      groupName={groupInfo.name}
                      currentUserId="1"
                      currentUserName="Juan Pérez"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Combined Group Info and Status */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#0B95BA]" />
                {groupInfo.name}
              </h3>
              
              {/* Group Members */}
              <div className="space-y-3 mb-6">
                {groupInfo.members.map(member => (
                  <div key={member.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-[#0B95BA] rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">{member.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-600">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Activity Status */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Entrega</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium">
                    Pendiente
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Calificable</span>
                  <span className="font-medium text-gray-900">Sí</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Fecha límite</span>
                  <span className="font-medium text-gray-900">{formatDueDate(activity.dueDate || '')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}