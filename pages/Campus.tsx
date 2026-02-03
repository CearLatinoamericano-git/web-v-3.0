import { useState } from 'react';
import { Play, FileText, CheckCircle, Clock, Download, MessageSquare, ChevronRight, Video } from 'lucide-react';

interface CampusProps {
  courseId: string;
}

export function Campus({ courseId }: CampusProps) {
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);

  // Mock data del curso
  const courseData = {
    title: 'Diplomado en Contratación Pública bajo la Ley 2069',
    progress: 65,
    modules: [
      {
        title: 'Módulo 1: Fundamentos de la Contratación Pública',
        completed: true,
        duration: '4 semanas',
        lessons: [
          { title: 'Introducción al marco legal', type: 'video', duration: '45 min', completed: true },
          { title: 'Principios rectores', type: 'video', duration: '38 min', completed: true },
          { title: 'Sujetos de contratación', type: 'video', duration: '42 min', completed: true },
          { title: 'Lectura: Ley 2069 completa', type: 'document', completed: true },
          { title: 'Evaluación módulo 1', type: 'quiz', completed: true }
        ]
      },
      {
        title: 'Módulo 2: Procedimientos de Selección',
        completed: true,
        duration: '5 semanas',
        lessons: [
          { title: 'Tipos de procedimientos', type: 'video', duration: '50 min', completed: true },
          { title: 'Documentación requerida', type: 'video', duration: '45 min', completed: true },
          { title: 'Evaluación de ofertas', type: 'video', duration: '55 min', completed: true },
          { title: 'Material descargable: Formatos', type: 'document', completed: true },
          { title: 'Evaluación módulo 2', type: 'quiz', completed: true }
        ]
      },
      {
        title: 'Módulo 3: Ejecución Contractual',
        completed: false,
        duration: '6 semanas',
        lessons: [
          { title: 'Perfeccionamiento del contrato', type: 'video', duration: '48 min', completed: true },
          { title: 'Modificaciones contractuales', type: 'video', duration: '52 min', completed: true },
          { title: 'Resolución de contratos', type: 'video', duration: '46 min', completed: false },
          { title: 'Casos prácticos', type: 'document', completed: false },
          { title: 'Evaluación módulo 3', type: 'quiz', completed: false }
        ]
      },
      {
        title: 'Módulo 4: Controversias y Solución',
        completed: false,
        duration: '5 semanas',
        lessons: [
          { title: 'Mecanismos de solución', type: 'video', duration: '50 min', completed: false },
          { title: 'Arbitraje en contratación', type: 'video', duration: '55 min', completed: false },
          { title: 'Casos prácticos resueltos', type: 'video', duration: '60 min', completed: false },
          { title: 'Simulación de arbitraje', type: 'document', completed: false },
          { title: 'Evaluación final', type: 'quiz', completed: false }
        ]
      }
    ]
  };

  const currentLesson = courseData.modules[activeModule]?.lessons[activeLesson];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Sidebar - Course Content */}
        <div className="w-full lg:w-80 bg-white border-r border-gray-200 overflow-y-auto">
          {/* Course Header */}
          <div className="p-6 border-b border-gray-200">
            <a href="/dashboard" className="text-sm text-[#0B95BA] hover:text-[#087A98] mb-3 inline-block">
              ← Volver al Dashboard
            </a>
            <h2 className="text-gray-900 mb-4">{courseData.title}</h2>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Progreso total</span>
                <span className="text-[#0B95BA]">{courseData.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#0B95BA] h-2 rounded-full transition-all"
                  style={{ width: `${courseData.progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Modules List */}
          <div className="p-4">
            {courseData.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="mb-2">
                <button
                  onClick={() => setActiveModule(moduleIndex)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    activeModule === moduleIndex
                      ? 'bg-[#0B95BA]/10 border border-[#0B95BA]'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-900">{module.title}</span>
                    {module.completed && (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Clock className="w-3 h-3" />
                    <span>{module.duration}</span>
                    <span>•</span>
                    <span>{module.lessons.length} lecciones</span>
                  </div>
                </button>

                {/* Lessons */}
                {activeModule === moduleIndex && (
                  <div className="mt-2 ml-4 space-y-1">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <button
                        key={lessonIndex}
                        onClick={() => setActiveLesson(lessonIndex)}
                        className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 ${
                          activeLesson === lessonIndex
                            ? 'bg-[#0B95BA] text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className={`flex-shrink-0 ${activeLesson === lessonIndex ? 'text-white' : 'text-gray-400'}`}>
                          {lesson.type === 'video' && <Play className="w-4 h-4" />}
                          {lesson.type === 'document' && <FileText className="w-4 h-4" />}
                          {lesson.type === 'quiz' && <CheckCircle className="w-4 h-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm truncate ${activeLesson === lessonIndex ? 'text-white' : 'text-gray-900'}`}>
                            {lesson.title}
                          </div>
                          {lesson.duration && (
                            <div className={`text-xs ${activeLesson === lessonIndex ? 'text-white/80' : 'text-gray-500'}`}>
                              {lesson.duration}
                            </div>
                          )}
                        </div>
                        {lesson.completed && activeLesson !== lessonIndex && (
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-8">
            {/* Video Player / Content */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              {currentLesson?.type === 'video' && (
                <div className="relative bg-gray-900 aspect-video flex items-center justify-center">
                  <div className="text-center text-white">
                    <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg mb-2">{currentLesson.title}</p>
                    <p className="text-sm text-gray-400">{currentLesson.duration}</p>
                    <button className="mt-6 px-6 py-3 bg-[#0B95BA] text-white rounded-lg hover:bg-[#087A98] transition-colors flex items-center gap-2 mx-auto">
                      <Play className="w-5 h-5" />
                      Reproducir clase
                    </button>
                  </div>
                </div>
              )}
              {currentLesson?.type === 'document' && (
                <div className="p-12 text-center">
                  <FileText className="w-16 h-16 text-[#0B95BA] mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">{currentLesson.title}</h3>
                  <p className="text-gray-600 mb-6">Material de lectura descargable</p>
                  <button className="px-6 py-3 bg-[#0B95BA] text-white rounded-lg hover:bg-[#087A98] transition-colors inline-flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Descargar material
                  </button>
                </div>
              )}
              {currentLesson?.type === 'quiz' && (
                <div className="p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-[#0B95BA] mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">{currentLesson.title}</h3>
                  <p className="text-gray-600 mb-6">Evaluación del módulo</p>
                  <button className="px-6 py-3 bg-[#0B95BA] text-white rounded-lg hover:bg-[#087A98] transition-colors">
                    Comenzar evaluación
                  </button>
                </div>
              )}
            </div>

            {/* Lesson Description */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h2 className="text-gray-900 mb-4">{currentLesson?.title}</h2>
              <p className="text-gray-600 mb-6">
                En esta lección aprenderás los conceptos fundamentales necesarios para comprender el marco legal
                de la contratación pública. Incluye ejemplos prácticos y casos de aplicación real.
              </p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-[#0B95BA]" />
                  <span>{currentLesson?.duration || 'N/A'}</span>
                </div>
                {currentLesson?.completed && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Completado</span>
                  </div>
                )}
              </div>

              {/* Resources */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-gray-900 mb-4">Recursos adicionales</h3>
                <div className="space-y-3">
                  <a href="#" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#0B95BA]" />
                      <span className="text-sm text-gray-900">Presentación de la clase.pdf</span>
                    </div>
                    <Download className="w-4 h-4 text-gray-400" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#0B95BA]" />
                      <span className="text-sm text-gray-900">Casos prácticos.pdf</span>
                    </div>
                    <Download className="w-4 h-4 text-gray-400" />
                  </a>
                </div>
              </div>
            </div>

            {/* Discussion / Comments */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h3 className="text-gray-900 mb-4">Foro de discusión</h3>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3 pb-4 border-b border-gray-200">
                  <div className="w-10 h-10 bg-[#0B95BA] rounded-full flex items-center justify-center text-white flex-shrink-0">
                    MF
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-gray-900">María Fernández</span>
                      <span className="text-xs text-gray-500">Hace 2 días</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Excelente explicación sobre los principios rectores. ¿Podrían compartir más casos prácticos?
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                <input
                  type="text"
                  placeholder="Escribe tu comentario..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                />
                <button className="px-6 py-2 bg-[#0B95BA] text-white rounded-lg hover:bg-[#087A98] transition-colors">
                  Enviar
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                disabled={activeModule === 0 && activeLesson === 0}
                className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Lección anterior
              </button>
              <button className="px-6 py-3 bg-[#0B95BA] text-white rounded-lg hover:bg-[#087A98] transition-colors flex items-center gap-2">
                Siguiente lección
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
