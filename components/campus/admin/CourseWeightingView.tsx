import { useState } from 'react';
import { ModuleWeightingManager } from './ModuleWeightingManager';
import { ArrowLeft, BookOpen, Save, Eye } from 'lucide-react';

interface CourseWeightingViewProps {
  onBack?: () => void;
}

export function CourseWeightingView({ onBack }: CourseWeightingViewProps) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>('DIPARB-2024-V1');
  const [showPreview, setShowPreview] = useState(false);

  // Mock courses data
  const courses = [
    {
      id: 'DIPARB-2024-V1',
      name: 'Diplomado en Arbitraje Comercial Internacional',
      status: 'active'
    },
    {
      id: 'CONTPUB-2024-V1',
      name: 'Diplomado en Contratación Pública',
      status: 'active'
    },
    {
      id: 'RESCON-2024-V1',
      name: 'Especialización en Resolución de Controversias',
      status: 'draft'
    }
  ];

  const selectedCourseData = courses.find(c => c.id === selectedCourse);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Configuración de Ponderación</h1>
            <p className="text-gray-600 mt-1">Gestiona el sistema de calificación por módulos</p>
          </div>
        </div>
      </div>

      {/* Course Selector */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
        <label className="block font-bold text-gray-900 mb-3">
          Seleccionar curso
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => setSelectedCourse(course.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                selectedCourse === course.id
                  ? 'border-[#0B95BA] bg-[#0B95BA]/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedCourse === course.id ? 'bg-[#0B95BA]' : 'bg-gray-200'
                }`}>
                  <BookOpen className={`w-5 h-5 ${
                    selectedCourse === course.id ? 'text-white' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold mb-1 ${
                    selectedCourse === course.id ? 'text-[#0B95BA]' : 'text-gray-900'
                  }`}>
                    {course.name}
                  </p>
                  <p className="text-xs text-gray-500">ID: {course.id}</p>
                  <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                    course.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {course.status === 'active' ? 'Activo' : 'Borrador'}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Weighting Manager */}
      {selectedCourse && selectedCourseData && (
        <ModuleWeightingManager
          courseId={selectedCourse}
          courseName={selectedCourseData.name}
          onSave={(modules) => {
            console.log('Módulos guardados:', modules);
          }}
        />
      )}
    </div>
  );
}
