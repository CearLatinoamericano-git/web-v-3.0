import { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, Check, BookOpen, Calendar, Users, Settings, FileText, Scale, Save, Send, AlertCircle, Upload, Image as ImageIcon, X } from 'lucide-react';
import { toast } from 'sonner';
import { ModuleWeightingManager } from './ModuleWeightingManager';

interface CourseCreatorProps {
  onBack: () => void;
  onComplete: (courseId: string) => void;
}

type CourseCreationStep = 'basic' | 'template' | 'weighting' | 'review';

export function CourseCreator({ onBack, onComplete }: CourseCreatorProps) {
  const [currentStep, setCurrentStep] = useState<CourseCreationStep>('basic');
  const [coverImage, setCoverImage] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [courseData, setCourseData] = useState({
    // Información básica
    courseNumber: '', // Nuevo: Código numérico (01, 02, 03...)
    code: '',
    name: '',
    year: new Date().getFullYear().toString(),
    thematic: '',
    programType: 'Diplomado',
    sede: 'Virtual',
    turno: 'Noche',
    maxStudents: 60,
    startDate: '',
    endDate: '',
    
    // Configuración del Pensum (Nuevos campos)
    minAttendancePercentage: 70, // % mínimo de asistencia
    passingGrade: 14, // Nota mínima de aprobación
    maxGrade: 20, // Valor máximo de calificación
    weeklyHours: '', // Horas semanales
    academicHours: '', // Horas académicas
    credits: '', // Créditos del curso
    moduleEvaluation: true, // Evaluación al cerrar módulo
    
    // Publicación
    publicationDate: '', // Fecha de publicación programada
    status: 'draft' as 'draft' | 'published' | 'scheduled', // Estado del curso
    
    // Horarios
    schedules: [] as Array<{
      day: string;
      time: string;
      type: 'virtual' | 'presencial';
      sede: string;
      aula: string;
    }>,
    
    // Plantilla
    useTemplate: true,
    templateId: '',
    
    // Recursos predeterminados removido según solicitud del usuario
    resources: {
      announcements: true,
      courseContent: true,
      liveClasses: true,
      users: true,
      settings: true,
      studentView: true
    }
  });

  const programs = [
    'III Diplomado en Especialización de Derecho Administrativo para Árbitros',
    'Curso de Especialización en Mecanismos de Inversión Privada: APP, OXI y G2G',
    'Diplomado en Resolución de Controversias'
  ];

  const teachers = [
    'Dr. Carlos Méndez',
    'Dra. María González',
    'Dr. Javier Torres',
    'Dra. Ana Martínez',
    'Dr. Luis Ramírez'
  ];

  const modules = [
    'Módulo 1: Fundamentos',
    'Módulo 2: Aspectos Legales',
    'Módulo 3: Procedimientos',
    'Módulo 4: Casos Prácticos',
    'Módulo 5: Especialización'
  ];

  const templates = [
    { id: 'arbitraje', name: 'Plantilla: Arbitraje (5 módulos, 384 horas)' },
    { id: 'contratacion', name: 'Plantilla: Contratación Pública (4 módulos, 320 horas)' },
    { id: 'controversias', name: 'Plantilla: Resolución de Controversias (5 módulos, 384 horas)' }
  ];

  const handleNext = () => {
    // Validaciones por paso
    if (currentStep === 'basic') {
      if (!courseData.code || !courseData.name || !courseData.year || !courseData.thematic || !courseData.programType) {
        toast.error('Por favor completa todos los campos obligatorios');
        return;
      }
      setCurrentStep('template');
    } else if (currentStep === 'template') {
      if (courseData.useTemplate && !courseData.templateId) {
        toast.error('Por favor selecciona una plantilla');
        return;
      }
      setCurrentStep('weighting');
    } else if (currentStep === 'weighting') {
      setCurrentStep('review');
    }
  };

  const handleBack = () => {
    if (currentStep === 'basic') {
      onBack();
    } else if (currentStep === 'template') {
      setCurrentStep('basic');
    } else if (currentStep === 'weighting') {
      setCurrentStep('template');
    } else if (currentStep === 'review') {
      setCurrentStep('weighting');
    }
  };

  const handleSaveDraft = () => {
    setCourseData({ ...courseData, status: 'draft' });
    toast.success('Borrador guardado correctamente');
    onComplete('new-course-id');
  };

  const handlePublishNow = () => {
    setCourseData({ ...courseData, status: 'published' });
    toast.success('Curso publicado exitosamente');
    onComplete('new-course-id');
  };

  const handleSchedulePublish = () => {
    if (!courseData.publicationDate) {
      toast.error('Por favor seleccione una fecha de publicación');
      return;
    }
    setCourseData({ ...courseData, status: 'scheduled' });
    toast.success(`Curso programado para publicarse el ${new Date(courseData.publicationDate).toLocaleDateString('es-PE')}`);
    onComplete('new-course-id');
  };

  const addSchedule = () => {
    setCourseData({
      ...courseData,
      schedules: [
        ...courseData.schedules,
        { day: '', time: '', type: 'virtual', sede: 'Virtual', aula: '' }
      ]
    });
  };

  const updateSchedule = (index: number, field: string, value: string) => {
    const newSchedules = [...courseData.schedules];
    newSchedules[index] = { ...newSchedules[index], [field]: value };
    setCourseData({ ...courseData, schedules: newSchedules });
  };

  const removeSchedule = (index: number) => {
    setCourseData({
      ...courseData,
      schedules: courseData.schedules.filter((_, i) => i !== index)
    });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tamaño (máx 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('La imagen es demasiado grande', {
          description: 'El tamaño máximo permitido es 5MB'
        });
        return;
      }

      // Validar tipo
      if (!file.type.startsWith('image/')) {
        toast.error('Formato no válido', {
          description: 'Solo se permiten archivos de imagen'
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCoverImage(result);
        toast.success('Portada cargada correctamente');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setCoverImage(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('Portada eliminada');
  };

  const steps = [
    { id: 'basic', label: 'General', icon: BookOpen },
    { id: 'template', label: 'Recursos', icon: FileText },
    { id: 'weighting', label: 'Evaluación', icon: Scale },
    { id: 'review', label: 'Resumen', icon: Check }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Crear nuevo programa</h1>
          <p className="text-gray-600 mt-1">Configura un nuevo programa paso a paso</p>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
        >
          Cancelar
        </button>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
            
            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-[#0B95BA] text-white shadow-lg shadow-[#0B95BA]/30'
                      : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <p className={`mt-2 text-sm font-medium ${
                    isActive ? 'text-[#0B95BA]' : isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-4 rounded-full transition-all ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        {/* Step 1: Información básica */}
        {currentStep === 'basic' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Información básica del programa</h2>
            
            {/* Identificación del programa */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Código numérico del programa <span className="text-red-500">*</span>
                  </label>
                <input
                  type="text"
                  value={courseData.courseNumber}
                  onChange={(e) => setCourseData({ ...courseData, courseNumber: e.target.value })}
                  placeholder="01"
                  maxLength={2}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                />
              </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Código del programa <span className="text-red-500">*</span>
                  </label>
                <input
                  type="text"
                  value={courseData.code}
                  onChange={(e) => setCourseData({ ...courseData, code: e.target.value })}
                  placeholder="DIPARB"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                />
              </div>

              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del programa <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={courseData.name}
                  onChange={(e) => setCourseData({ ...courseData, name: e.target.value })}
                  placeholder="Diplomado en Arbitraje Comercial Internacional"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                />
              </div>
            </div>

            {/* Imagen de portada */}
            <div className="pt-8 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagen de portada del programa
              </label>
              <p className="text-xs text-gray-500 mb-4">
                Esta imagen aparecerá como portada del programa para los estudiantes (máx. 5MB)
              </p>
                
                {!coverImage ? (
                  <div 
                    onClick={handleImageClick}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#0B95BA] hover:bg-blue-50 transition-all group"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-[#0B95BA] text-white rounded-full flex items-center justify-center mb-4 group-hover:bg-[#087A98] transition-colors">
                        <Upload className="w-8 h-8" />
                      </div>
                      <p className="font-medium text-gray-900 mb-1">
                        Haz clic para cargar la portada
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG o JPEG (Tamaño máximo: 5MB)
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative group">
                    <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                      <img 
                        src={coverImage} 
                        alt="Portada del curso" 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={handleImageClick}
                        className="p-2 bg-[#0B95BA] hover:bg-[#087A98] text-white rounded-lg transition-colors shadow-lg"
                        type="button"
                      >
                        <Upload className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleRemoveImage}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-lg"
                        type="button"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
            </div>

            {/* Agrupación de programas */}
            <div className="pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Agrupación de programas</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Año <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={courseData.year}
                    onChange={(e) => setCourseData({ ...courseData, year: e.target.value })}
                    placeholder="2024"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de programa <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={courseData.programType}
                    onChange={(e) => setCourseData({ ...courseData, programType: e.target.value })}
                    className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  >
                    <option value="Diplomado">Diplomado</option>
                    <option value="Curso">Curso</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sede <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={courseData.sede}
                    onChange={(e) => setCourseData({ ...courseData, sede: e.target.value })}
                    className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  >
                    <option value="Virtual">Virtual</option>
                    <option value="Lima Centro">Lima Centro</option>
                    <option value="Lima Norte">Lima Norte</option>
                    <option value="Lima Sur">Lima Sur</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temática <span className="text-red-500">*</span>
                </label>
                <select
                  value={courseData.thematic}
                  onChange={(e) => setCourseData({ ...courseData, thematic: e.target.value })}
                  className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                >
                  <option value="">Seleccionar temática...</option>
                  <option value="ARBITRAJE EN CONTRATACIÓN PÚBLICA">ARBITRAJE EN CONTRATACIÓN PÚBLICA</option>
                  <option value="DERECHO ADMINISTRATIVO PARA ÁRBITROS">DERECHO ADMINISTRATIVO PARA ÁRBITROS</option>
                  <option value="CONTRATACIÓN PÚBLICA">CONTRATACIÓN PÚBLICA</option>
                  <option value="CONTRATOS ESTANDARIZADOS">CONTRATOS ESTANDARIZADOS</option>
                  <option value="GESTIÓN DE OBRAS PÚBLICAS Y SOLUCIÓN DE CONTROVERSIAS">GESTIÓN DE OBRAS PÚBLICAS Y SOLUCIÓN DE CONTROVERSIAS</option>
                  <option value="JUNTA DE PREVENCIÓN Y RESOLUCIÓN DE DISPUTAS">JUNTA DE PREVENCIÓN Y RESOLUCIÓN DE DISPUTAS</option>
                  <option value="EJECUCIÓN CONTRACTUAL DE OBRAS PÚBLICAS">EJECUCIÓN CONTRACTUAL DE OBRAS PÚBLICAS</option>
                  <option value="DISPUTE BOARDS Y/O JPRD">DISPUTE BOARDS Y/O JPRD</option>
                </select>
              </div>
            </div>

            {/* Parámetros del programa */}
            <div className="pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Parámetros del programa</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de inicio <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={courseData.startDate}
                    onChange={(e) => setCourseData({ ...courseData, startDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de fin <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={courseData.endDate}
                    onChange={(e) => setCourseData({ ...courseData, endDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cupo máximo de estudiantes
                  </label>
                  <input
                    type="number"
                    value={courseData.maxStudents}
                    onChange={(e) => setCourseData({ ...courseData, maxStudents: parseInt(e.target.value) })}
                    max={60}
                    placeholder="60"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Configuración del pensum */}
            <div className="pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Configuración del pensum</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Asistencia mínima (%)
                  </label>
                  <input
                    type="number"
                    value={courseData.minAttendancePercentage}
                    onChange={(e) => setCourseData({ ...courseData, minAttendancePercentage: parseInt(e.target.value) })}
                    min={0}
                    max={100}
                    placeholder="75"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nota mínima de aprobación
                  </label>
                  <input
                    type="number"
                    value={courseData.passingGrade}
                    onChange={(e) => setCourseData({ ...courseData, passingGrade: parseInt(e.target.value) })}
                    min={0}
                    max={20}
                    placeholder="14"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Calificación máxima
                  </label>
                  <input
                    type="number"
                    value={courseData.maxGrade}
                    onChange={(e) => setCourseData({ ...courseData, maxGrade: parseInt(e.target.value) })}
                    min={0}
                    max={20}
                    placeholder="20"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horas semanales
                  </label>
                  <input
                    type="number"
                    value={courseData.weeklyHours}
                    onChange={(e) => setCourseData({ ...courseData, weeklyHours: e.target.value })}
                    placeholder="8"
                    min={0}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horas académicas totales
                  </label>
                  <input
                    type="number"
                    value={courseData.academicHours}
                    onChange={(e) => setCourseData({ ...courseData, academicHours: e.target.value })}
                    placeholder="384"
                    min={0}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Créditos académicos
                  </label>
                  <input
                    type="number"
                    value={courseData.credits}
                    onChange={(e) => setCourseData({ ...courseData, credits: e.target.value })}
                    placeholder="4"
                    min={0}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Plantilla y Recursos */}
        {currentStep === 'template' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Plantilla y recursos del programa</h2>
            
            {/* Selección de plantilla */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                ¿Usar plantilla predefinida? <span className="text-red-500">*</span>
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setCourseData({ ...courseData, useTemplate: true })}
                  className={`p-4 border-2 rounded-xl transition-all ${
                    courseData.useTemplate
                      ? 'border-[#0B95BA] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      courseData.useTemplate ? 'bg-[#0B95BA]' : 'bg-gray-200'
                    }`}>
                      <FileText className={`w-5 h-5 ${courseData.useTemplate ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-gray-900">Usar plantilla</h4>
                      <p className="text-xs text-gray-600">Estructura predefinida</p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => setCourseData({ ...courseData, useTemplate: false })}
                  className={`p-4 border-2 rounded-xl transition-all ${
                    !courseData.useTemplate
                      ? 'border-[#0B95BA] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      !courseData.useTemplate ? 'bg-[#0B95BA]' : 'bg-gray-200'
                    }`}>
                      <Settings className={`w-5 h-5 ${!courseData.useTemplate ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-gray-900">Crear desde cero</h4>
                      <p className="text-xs text-gray-600">Completamente personalizado</p>
                    </div>
                  </div>
                </button>
              </div>

              {courseData.useTemplate && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Seleccionar plantilla <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {templates.map(template => (
                      <button
                        key={template.id}
                        onClick={() => setCourseData({ ...courseData, templateId: template.id })}
                        className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                          courseData.templateId === template.id
                            ? 'border-[#0B95BA] bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                            courseData.templateId === template.id
                              ? 'bg-[#0B95BA] text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900">{template.name}</h4>
                          </div>
                          {courseData.templateId === template.id && (
                            <Check className="w-5 h-5 text-[#0B95BA]" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Criterios de evaluación */}
        {currentStep === 'weighting' && (
          <div className="space-y-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Criterios de evaluación</h2>
              <p className="text-gray-600 mt-1">
                Define el peso de cada módulo y actividad para el cálculo de calificaciones
              </p>
            </div>
            
            <ModuleWeightingManager
              courseId="new-course"
              courseName={courseData.name || 'Nuevo programa'}
              onSave={(weightingData) => {
                console.log('Ponderación guardada:', weightingData);
                toast.success('Ponderación configurada correctamente');
              }}
            />
          </div>
        )}

        {/* Step 4: Revisión */}
        {currentStep === 'review' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Revisión final</h2>
              <p className="text-gray-600">Verifique que toda la información sea correcta antes de crear el programa</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Información básica */}
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#0B95BA]" />
                  Información básica
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Código:</p>
                    <p className="font-medium text-gray-900">{courseData.code}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Nombre:</p>
                    <p className="font-medium text-gray-900">{courseData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Cupo máximo:</p>
                    <p className="font-medium text-gray-900">{courseData.maxStudents} estudiantes</p>
                  </div>
                </div>
              </div>

              {/* Agrupación */}
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#0B95BA]" />
                  Agrupación del programa
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Año:</p>
                    <p className="font-medium text-gray-900">{courseData.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Temática:</p>
                    <p className="font-medium text-gray-900">{courseData.thematic || 'No definido'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tipo de programa:</p>
                    <p className="font-medium text-gray-900">{courseData.programType}</p>
                  </div>
                </div>
              </div>

              {/* Fechas y ubicación */}
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#0B95BA]" />
                  Fechas y ubicación
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Inicio:</p>
                    <p className="font-medium text-gray-900">
                      {courseData.startDate ? new Date(courseData.startDate).toLocaleDateString('es-PE') : 'No definido'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fin:</p>
                    <p className="font-medium text-gray-900">
                      {courseData.endDate ? new Date(courseData.endDate).toLocaleDateString('es-PE') : 'No definido'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sede:</p>
                    <p className="font-medium text-gray-900">{courseData.sede}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Horarios configurados:</p>
                    <p className="font-medium text-gray-900">{courseData.schedules.length} horarios</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-blue-900 mb-2">¿Listo para crear el programa?</h3>
              <p className="text-sm text-blue-700">
                Una vez creado, podrá configurar el contenido, agregar materiales y gestionar estudiantes.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      {currentStep === 'review' ? (
        <div className="space-y-6">
          {/* Opciones de publicación */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#0B95BA]" />
              Opciones de publicación
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Programar fecha de publicación
                </label>
                <input
                  type="datetime-local"
                  value={courseData.publicationDate}
                  onChange={(e) => setCourseData({ ...courseData, publicationDate: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  El curso se publicará automáticamente en la fecha seleccionada
                </p>
              </div>
              <div className="flex items-end">
                <div className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl">
                  <p className="text-sm font-medium text-gray-900 mb-1">Estado actual del curso</p>
                  <div className="flex items-center gap-2">
                    {courseData.status === 'draft' && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        Borrador
                      </span>
                    )}
                    {courseData.status === 'published' && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        Publicado
                      </span>
                    )}
                    {courseData.status === 'scheduled' && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        Programado
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-900 font-medium mb-1">
                    Importante
                  </p>
                  <p className="text-xs text-amber-700">
                    Estos parámetros se aplican automáticamente a todos los estudiantes inscritos y el sistema los utiliza para calcular la asistencia y el promedio requerido para la emisión del certificado.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Anterior
            </button>
            
            <div className="flex flex-col md:flex-row gap-3">
              <button
                onClick={handleSaveDraft}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Guardar como borrador
              </button>
              
              {courseData.publicationDate && (
                <button
                  onClick={handleSchedulePublish}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Programar publicación
                </button>
              )}
              
              <button
                onClick={handlePublishNow}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Publicar ahora
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            {currentStep === 'basic' ? 'Cancelar' : 'Anterior'}
          </button>
          
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-xl transition-colors flex items-center gap-2"
          >
            Siguiente
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}