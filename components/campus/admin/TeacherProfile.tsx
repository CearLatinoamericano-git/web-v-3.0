import { useState } from 'react';
import {  ArrowLeft, User, Mail, Phone, Award, Calendar, BookOpen, Clock, Upload, FileText, Download, Edit2, Save, X } from 'lucide-react';
import { toast } from 'sonner';

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  degree: string;
  status: 'active' | 'inactive';
  coursesAssigned: number;
  photo?: string;
  cvUrl?: string;
  cvFileName?: string;
  bio?: string;
  courseHistory?: CourseAssignment[];
}

interface CourseAssignment {
  id: string;
  courseCode: string;
  courseName: string;
  module: string;
  session: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed';
  hoursAssigned: number;
}

interface TeacherProfileProps {
  teacher: Teacher;
  onBack: () => void;
  onUpdate: (teacher: Teacher) => void;
}

export function TeacherProfile({ teacher, onBack, onUpdate }: TeacherProfileProps) {
  const [editMode, setEditMode] = useState(false);
  const [tempBio, setTempBio] = useState(teacher.bio || '');
  const [uploading, setUploading] = useState(false);
  const [uploadedCV, setUploadedCV] = useState<{ file: File; url: string } | null>(
    teacher.cvUrl && teacher.cvFileName 
      ? { file: new File([], teacher.cvFileName), url: teacher.cvUrl } 
      : null
  );

  // Mock data de historial de cursos
  const courseHistory: CourseAssignment[] = teacher.courseHistory || [
    {
      id: '1',
      courseCode: 'DIPARB-2024-V1',
      courseName: 'Diplomado en Arbitraje Comercial Internacional',
      module: 'Módulo 1: Fundamentos',
      session: 'Sesión 3: Marco Legal',
      startDate: '2024-01-15',
      endDate: '2024-03-20',
      status: 'completed',
      hoursAssigned: 40
    },
    {
      id: '2',
      courseCode: 'DIPARB-2024-V1',
      courseName: 'Diplomado en Arbitraje Comercial Internacional',
      module: 'Módulo 2: Práctica Arbitral',
      session: 'Sesión 1: Procedimientos',
      startDate: '2024-04-01',
      endDate: '2024-06-15',
      status: 'active',
      hoursAssigned: 35
    },
    {
      id: '3',
      courseCode: 'CONTPUB-2024-V1',
      courseName: 'Contratación Pública',
      module: 'Módulo 3: Contratos Estatales',
      session: 'Sesión 2: Normativa vigente',
      startDate: '2024-07-10',
      endDate: '2024-09-25',
      status: 'active',
      hoursAssigned: 30
    },
    {
      id: '4',
      courseCode: 'RESCONT-2023-V1',
      courseName: 'Resolución de Controversias',
      module: 'Módulo 1: Métodos alternativos',
      session: 'Sesión 4: Mediación',
      startDate: '2023-10-05',
      endDate: '2023-12-15',
      status: 'completed',
      hoursAssigned: 25
    }
  ];

  const handlePhotoUpload = () => {
    setUploading(true);
    // Simular subida
    setTimeout(() => {
      toast.success('Foto de perfil actualizada correctamente');
      setUploading(false);
    }, 1500);
  };

  const handleCVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      // Simular subida
      setTimeout(() => {
        const updatedTeacher = {
          ...teacher,
          cvUrl: 'https://example.com/cv.pdf',
          cvFileName: file.name
        };
        onUpdate(updatedTeacher);
        setUploadedCV({ file, url: 'https://example.com/cv.pdf' });
        toast.success('CV actualizado correctamente');
        setUploading(false);
      }, 1500);
    }
  };

  const handleDeleteCV = () => {
    const updatedTeacher = {
      ...teacher,
      cvUrl: undefined,
      cvFileName: undefined
    };
    onUpdate(updatedTeacher);
    setUploadedCV(null);
    toast.success('CV eliminado correctamente');
  };

  const handleViewCV = () => {
    if (teacher.cvUrl) {
      window.open(teacher.cvUrl, '_blank');
    }
  };

  const handleSaveBio = () => {
    const updatedTeacher = {
      ...teacher,
      bio: tempBio
    };
    onUpdate(updatedTeacher);
    setEditMode(false);
    toast.success('Biografía actualizada correctamente');
  };

  const activeCourses = courseHistory.filter(c => c.status === 'active').length;
  const completedCourses = courseHistory.filter(c => c.status === 'completed').length;
  const totalHours = courseHistory.reduce((sum, c) => sum + c.hoursAssigned, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
        <button
          onClick={onBack}
          className="mb-3 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>
        <div className="flex items-center gap-3 mb-2">
          <User className="w-10 h-10" />
          <h1 className="text-4xl font-bold">Perfil de docente</h1>
        </div>
        <p className="text-xl opacity-90">Información completa y historial académico</p>
      </div>

      {/* Perfil Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda - Foto y datos básicos */}
        <div className="lg:col-span-1 space-y-6">
          {/* Foto de perfil */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
            <div className="flex flex-col items-center">
              <div className="relative group">
                {teacher.photo ? (
                  <img
                    src={teacher.photo}
                    alt={teacher.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-[#0B95BA]"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#0B95BA] to-[#087A98] flex items-center justify-center text-white text-4xl font-bold border-4 border-[#0B95BA]">
                    {teacher.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                )}
                <label
                  htmlFor="photo-upload"
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Upload className="w-8 h-8 text-white" />
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </label>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mt-4 text-center">{teacher.name}</h2>
              <p className="text-gray-600 text-center">{teacher.degree}</p>
              <span className={`mt-3 px-4 py-1.5 rounded-full text-sm font-medium ${
                teacher.status === 'active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {teacher.status === 'active' ? 'Activo' : 'Inactivo'}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ stroke: '#0B95BA', fill: 'none' }} />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Correo</p>
                  <p className="text-sm text-gray-900 break-all">{teacher.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ stroke: '#0B95BA', fill: 'none' }} />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Celular</p>
                  <p className="text-sm text-gray-900">{teacher.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* CV Document */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#0B95BA]" />
              Curriculum Vitae
            </h3>
            
            {teacher.cvUrl ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-10 h-10 bg-[#0B95BA] rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {teacher.cvFileName || 'CV_Docente.pdf'}
                    </p>
                    <p className="text-xs text-gray-600">Documento PDF</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <a
                    href={teacher.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-[#0B95BA] hover:bg-[#087A98] text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Descargar
                  </a>
                  <label className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" />
                    Actualizar
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={handleCVUpload}
                    />
                  </label>
                  <button
                    onClick={handleDeleteCV}
                    className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Eliminar
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#0B95BA] hover:bg-blue-50 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mb-3" />
                <p className="text-sm font-medium text-gray-900 mb-1">Subir CV</p>
                <p className="text-xs text-gray-500">PDF, máximo 10MB</p>
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleCVUpload}
                />
              </label>
            )}
          </div>

          {/* Estadísticas rápidas */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 space-y-4">
            <h3 className="font-bold text-gray-900 mb-4">Estadísticas</h3>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">Programas activos</span>
              </div>
              <span className="text-xl font-bold text-green-700">{activeCourses}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#0B95BA] rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">Programas concluidos</span>
              </div>
              <span className="text-xl font-bold text-[#0B95BA]">{completedCourses}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">Número de horas totales</span>
              </div>
              <span className="text-xl font-bold text-orange-700">{totalHours}h</span>
            </div>
          </div>
        </div>

        {/* Columna derecha - Biografía e Historial */}
        <div className="lg:col-span-2 space-y-6">
          {/* Biografía */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Semblanza profesional</h3>
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-3 py-1.5 text-sm font-medium text-[#0B95BA] hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2 border-2 border-[#0B95BA] shadow-sm hover:shadow-md"
                >
                  <Edit2 className="w-4 h-4" style={{ stroke: '#0B95BA', fill: 'none' }} />
                  Editar
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveBio}
                    className="px-3 py-1.5 text-sm font-medium text-white bg-[#0B95BA] hover:bg-[#087A98] rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Guardar
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setTempBio(teacher.bio || '');
                    }}
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancelar
                  </button>
                </div>
              )}
            </div>

            {editMode ? (
              <textarea
                value={tempBio}
                onChange={(e) => setTempBio(e.target.value)}
                placeholder="Agrega una biografía profesional del docente..."
                className="w-full h-40 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent resize-none"
              />
            ) : (
              <div className="text-sm text-gray-700 leading-relaxed">
                {teacher.bio || tempBio || (
                  <p className="text-gray-400 italic">
                    No hay biografía disponible. Haz clic en "Editar" para agregar información profesional del docente.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Historial de cursos */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" style={{ stroke: '#0B95BA', fill: 'none' }} />
              Historial de asignaciones
            </h3>

            <div className="space-y-3">
              {courseHistory.map((assignment) => (
                <div
                  key={assignment.id}
                  className="p-4 border-2 border-gray-200 rounded-xl hover:border-[#0B95BA] transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-bold text-gray-900">{assignment.courseName}</h4>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${
                          assignment.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {assignment.status === 'active' ? 'Activo' : 'Completado'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{assignment.courseCode}</p>
                      <p className="text-sm text-[#0B95BA] font-medium">
                        {assignment.module} • {assignment.session}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" style={{ stroke: '#9CA3AF', fill: 'none' }} />
                      <p className="text-sm text-gray-700">
                        <span className="text-gray-500">Inicio:</span> <span className="font-medium text-gray-900">{new Date(assignment.startDate).toLocaleDateString('es-PE')}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" style={{ stroke: '#9CA3AF', fill: 'none' }} />
                      <p className="text-sm text-gray-700">
                        <span className="text-gray-500">Fin:</span> <span className="font-medium text-gray-900">{new Date(assignment.endDate).toLocaleDateString('es-PE')}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" style={{ stroke: '#9CA3AF', fill: 'none' }} />
                      <p className="text-sm text-gray-700">
                        <span className="text-gray-500">Horas:</span> <span className="font-medium text-gray-900">{assignment.hoursAssigned}h</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {courseHistory.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">No hay asignaciones registradas</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}