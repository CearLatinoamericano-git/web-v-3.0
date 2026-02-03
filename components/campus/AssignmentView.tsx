import { useState } from 'react';
import {
  Upload,
  FileText,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  Download,
  X,
  Save,
  Send,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';

interface AssignmentViewProps {
  assignmentId?: number;
  onBack?: () => void;
}

export function AssignmentView({ assignmentId, onBack }: AssignmentViewProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'write'>('upload');

  // Mock data - En producción vendría de la API
  const assignment = {
    id: assignmentId || 1,
    title: 'Ensayo sobre Arbitraje Comercial Internacional',
    course: 'Diplomado en Arbitraje',
    description: 'Elaborar un ensayo de 2000 palabras sobre los principios fundamentales del arbitraje comercial internacional. Debe incluir análisis de casos prácticos y referencias bibliográficas según normas APA.',
    dueDate: '2024-12-15',
    dueTime: '23:59',
    maxGrade: 20,
    instructions: [
      'Extensión mínima: 2000 palabras',
      'Formato: PDF o DOCX',
      'Incluir portada con datos del estudiante',
      'Citar al menos 5 fuentes bibliográficas',
      'Utilizar formato APA para referencias',
      'Tamaño máximo de archivo: 10 MB'
    ],
    status: 'pending' as 'pending' | 'submitted' | 'graded',
    submittedDate: null,
    grade: null,
    feedback: null,
    attachedMaterials: [
      { name: 'Guía de elaboración.pdf', url: '#' },
      { name: 'Casos de referencia.pdf', url: '#' }
    ]
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tamaño (10 MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('El archivo supera el tamaño máximo de 10 MB');
        return;
      }
      
      // Validar tipo
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        toast.error('Solo se permiten archivos PDF o DOCX');
        return;
      }

      setUploadedFile(file);
      toast.success('Archivo cargado correctamente');
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    toast.info('Archivo eliminado');
  };

  const handleSaveDraft = () => {
    toast.success('Borrador guardado correctamente');
  };

  const handleSubmit = () => {
    if (activeTab === 'upload' && !uploadedFile) {
      toast.error('Debe cargar un archivo antes de enviar');
      return;
    }

    if (activeTab === 'write' && textContent.trim().length < 100) {
      toast.error('El contenido escrito es muy corto');
      return;
    }

    toast.success('Ensayo enviado correctamente');
    if (onBack) {
      setTimeout(() => onBack(), 1500);
    }
  };

  const getStatusBadge = () => {
    switch (assignment.status) {
      case 'graded':
        return (
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-medium flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Calificado
          </span>
        );
      case 'submitted':
        return (
          <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-medium flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Enviado
          </span>
        );
      default:
        return (
          <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-xl font-medium flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Pendiente
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver
              </button>
            )}
            <h1 className="text-4xl font-bold mb-2">{assignment.title}</h1>
            <p className="text-xl opacity-90">{assignment.course}</p>
          </div>
          {getStatusBadge()}
        </div>

        <div className="flex items-center gap-6 text-sm opacity-90">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>Vence: {assignment.dueDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{assignment.dueTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            <span>Puntaje máximo: {assignment.maxGrade} puntos</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-[#0B95BA]" />
              Descripción de la actividad
            </h2>
            <p className="text-gray-700 leading-relaxed">{assignment.description}</p>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-[#0B95BA]" />
              Instrucciones
            </h2>
            <ul className="space-y-2">
              {assignment.instructions.map((instruction, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{instruction}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Submission Area */}
          {assignment.status === 'pending' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Upload className="w-6 h-6 text-[#0B95BA]" />
                Entrega de trabajo
              </h2>

              {/* Tabs */}
              <div className="flex gap-2 mb-6 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                    activeTab === 'upload'
                      ? 'border-[#0B95BA] text-[#0B95BA]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Subir archivo
                </button>
                <button
                  onClick={() => setActiveTab('write')}
                  className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                    activeTab === 'write'
                      ? 'border-[#0B95BA] text-[#0B95BA]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Escribir texto
                </button>
              </div>

              {/* Upload Tab */}
              {activeTab === 'upload' && (
                <div className="space-y-4">
                  {!uploadedFile ? (
                    <label className="block">
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-[#0B95BA] transition-colors cursor-pointer">
                        <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="font-medium text-gray-900 mb-2">
                          Haga clic para seleccionar un archivo
                        </p>
                        <p className="text-sm text-gray-500">
                          Formatos permitidos: PDF, DOCX (máx. 10 MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="border-2 border-green-300 bg-green-50 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-200 rounded-xl flex items-center justify-center">
                            <FileText className="w-6 h-6 text-green-700" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                            <p className="text-sm text-gray-600">
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={handleRemoveFile}
                          className="w-10 h-10 bg-red-100 hover:bg-red-200 rounded-xl flex items-center justify-center transition-colors"
                        >
                          <X className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Write Tab */}
              {activeTab === 'write' && (
                <div className="space-y-4">
                  <textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Escriba su ensayo aquí..."
                    className="w-full h-96 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent resize-none"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{textContent.length} caracteres</span>
                    <span>{textContent.trim().split(/\s+/).filter(Boolean).length} palabras</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSaveDraft}
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Guardar borrador
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Enviar trabajo
                </button>
              </div>
            </div>
          )}

          {/* Submitted Info */}
          {assignment.status === 'submitted' && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-blue-900">Trabajo enviado</h3>
              </div>
              <p className="text-blue-700">
                Su trabajo ha sido enviado correctamente y está pendiente de calificación.
              </p>
            </div>
          )}

          {/* Graded Info */}
          {assignment.status === 'graded' && assignment.grade !== null && (
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-green-900">Calificación</h3>
                <span className="text-4xl font-bold text-green-600">
                  {assignment.grade}/{assignment.maxGrade}
                </span>
              </div>
              {assignment.feedback && (
                <div>
                  <h4 className="font-medium text-green-900 mb-2">Retroalimentación del docente:</h4>
                  <p className="text-green-700">{assignment.feedback}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Materials */}
          {assignment.attachedMaterials.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Download className="w-5 h-5 text-[#0B95BA]" />
                Materiales de apoyo
              </h3>
              <div className="space-y-2">
                {assignment.attachedMaterials.map((material, idx) => (
                  <a
                    key={idx}
                    href={material.url}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-[#0B95BA] hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {material.name}
                      </p>
                    </div>
                    <Download className="w-5 h-5 text-gray-400" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Important Notice */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-amber-900 mb-2">Importante</h3>
                <p className="text-sm text-amber-800">
                  Asegúrese de revisar todas las instrucciones antes de enviar su trabajo. 
                  Una vez enviado, no podrá modificarlo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
