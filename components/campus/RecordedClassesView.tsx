import { useState } from 'react';
import {
  Video,
  BookOpen,
  Calendar,
  Clock,
  Search,
  Play,
  Download,
  Eye,
  CheckCircle,
  ChevronDown,
  Folder
} from 'lucide-react';

interface RecordedClass {
  id: string;
  courseId: string;
  courseName: string;
  moduleId: string;
  moduleName: string;
  moduleNumber: number;
  sessionTitle: string;
  sessionNumber: number;
  recordingDate: string;
  duration: string;
  instructor: string;
  thumbnail: string;
  views: number;
  isWatched: boolean;
}

interface Module {
  id: string;
  name: string;
  number: number;
  recordingsCount: number;
}

interface Course {
  id: string;
  name: string;
  code: string;
  recordedClassesCount: number;
  modules: Module[];
}

export function RecordedClassesView() {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - cursos con grabaciones
  const courses: Course[] = [
    {
      id: 'DACI-2024-02',
      name: 'Diplomado en Arbitraje Comercial Internacional',
      code: 'DACI-2024-02',
      recordedClassesCount: 12,
      modules: [
        { id: 'MOD-1', name: 'Introducción al arbitraje', number: 1, recordingsCount: 4 },
        { id: 'MOD-2', name: 'Marco legal y normativo', number: 2, recordingsCount: 4 },
        { id: 'MOD-3', name: 'Procedimientos arbitrales', number: 3, recordingsCount: 4 }
      ]
    },
    {
      id: 'CONT-2024-01',
      name: 'Curso de Especialización en Contratación Pública',
      code: 'CONT-2024-01',
      recordedClassesCount: 8,
      modules: [
        { id: 'MOD-4', name: 'Fundamentos de contratación', number: 1, recordingsCount: 4 },
        { id: 'MOD-5', name: 'Normativa aplicable', number: 2, recordingsCount: 4 }
      ]
    },
    {
      id: 'RESC-2024-01',
      name: 'Diplomado en Resolución de Controversias',
      code: 'RESC-2024-01',
      recordedClassesCount: 10,
      modules: [
        { id: 'MOD-6', name: 'Métodos alternativos', number: 1, recordingsCount: 3 },
        { id: 'MOD-7', name: 'Mediación y conciliación', number: 2, recordingsCount: 4 },
        { id: 'MOD-8', name: 'Arbitraje institucional', number: 3, recordingsCount: 3 }
      ]
    },
    {
      id: 'LICIT-2024-01',
      name: 'Gestión de Licitaciones Públicas',
      code: 'LICIT-2024-01',
      recordedClassesCount: 6,
      modules: [
        { id: 'MOD-9', name: 'Proceso de licitación', number: 1, recordingsCount: 3 },
        { id: 'MOD-10', name: 'Evaluación de propuestas', number: 2, recordingsCount: 3 }
      ]
    }
  ];

  // Mock data - grabaciones organizadas por módulos
  const allRecordedClasses: RecordedClass[] = [
    {
      id: 'REC-001',
      courseId: 'DACI-2024-02',
      courseName: 'Diplomado en Arbitraje Comercial Internacional',
      moduleId: 'MOD-1',
      moduleName: 'Introducción al arbitraje',
      moduleNumber: 1,
      sessionTitle: 'Conceptos básicos del arbitraje',
      sessionNumber: 1,
      recordingDate: '15/09/2024',
      duration: '2h 15min',
      instructor: 'Dr. Carlos Méndez',
      thumbnail: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&auto=format&fit=crop',
      views: 145,
      isWatched: true
    },
    {
      id: 'REC-002',
      courseId: 'DACI-2024-02',
      courseName: 'Diplomado en Arbitraje Comercial Internacional',
      moduleId: 'MOD-1',
      moduleName: 'Introducción al arbitraje',
      moduleNumber: 1,
      sessionTitle: 'Historia y evolución del arbitraje',
      sessionNumber: 2,
      recordingDate: '18/09/2024',
      duration: '2h 00min',
      instructor: 'Dr. Carlos Méndez',
      thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop',
      views: 138,
      isWatched: true
    },
    {
      id: 'REC-003',
      courseId: 'DACI-2024-02',
      courseName: 'Diplomado en Arbitraje Comercial Internacional',
      moduleId: 'MOD-2',
      moduleName: 'Marco legal y normativo',
      moduleNumber: 2,
      sessionTitle: 'Legislación nacional en arbitraje',
      sessionNumber: 1,
      recordingDate: '22/09/2024',
      duration: '2h 30min',
      instructor: 'Dr. Carlos Méndez',
      thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop',
      views: 132,
      isWatched: true
    },
    {
      id: 'REC-004',
      courseId: 'DACI-2024-02',
      courseName: 'Diplomado en Arbitraje Comercial Internacional',
      moduleId: 'MOD-2',
      moduleName: 'Marco legal y normativo',
      moduleNumber: 2,
      sessionTitle: 'Convenios internacionales',
      sessionNumber: 2,
      recordingDate: '25/09/2024',
      duration: '2h 10min',
      instructor: 'Dr. Carlos Méndez',
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
      views: 128,
      isWatched: false
    },
    {
      id: 'REC-005',
      courseId: 'CONT-2024-01',
      courseName: 'Curso de Especialización en Contratación Pública',
      moduleId: 'MOD-4',
      moduleName: 'Fundamentos de contratación',
      moduleNumber: 1,
      sessionTitle: 'Principios de la contratación pública',
      sessionNumber: 1,
      recordingDate: '01/10/2024',
      duration: '1h 45min',
      instructor: 'Dra. María González',
      thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop',
      views: 98,
      isWatched: true
    },
    {
      id: 'REC-006',
      courseId: 'CONT-2024-01',
      courseName: 'Curso de Especialización en Contratación Pública',
      moduleId: 'MOD-5',
      moduleName: 'Normativa aplicable',
      moduleNumber: 2,
      sessionTitle: 'Marco regulatorio nacional',
      sessionNumber: 1,
      recordingDate: '08/10/2024',
      duration: '2h 10min',
      instructor: 'Dra. María González',
      thumbnail: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop',
      views: 87,
      isWatched: false
    },
    {
      id: 'REC-007',
      courseId: 'RESC-2024-01',
      courseName: 'Diplomado en Resolución de Controversias',
      moduleId: 'MOD-6',
      moduleName: 'Métodos alternativos',
      moduleNumber: 1,
      sessionTitle: 'Introducción a los MARC',
      sessionNumber: 1,
      recordingDate: '01/11/2024',
      duration: '2h 20min',
      instructor: 'Dr. Roberto Fernández',
      thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop',
      views: 76,
      isWatched: true
    }
  ];

  // Filtrar grabaciones por curso seleccionado y búsqueda
  const filteredRecordedClasses = allRecordedClasses.filter(recording => {
    const matchesCourse = selectedCourseId ? recording.courseId === selectedCourseId : true;
    const matchesSearch = recording.sessionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recording.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recording.moduleName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  // Agrupar grabaciones por curso y módulo cuando se selecciona "Todos"
  const recordingsByCourse = filteredRecordedClasses.reduce((acc, recording) => {
    if (!acc[recording.courseId]) {
      acc[recording.courseId] = {
        courseId: recording.courseId,
        courseName: recording.courseName,
        modules: {}
      };
    }
    const moduleKey = `${recording.moduleId}-${recording.moduleNumber}`;
    if (!acc[recording.courseId].modules[moduleKey]) {
      acc[recording.courseId].modules[moduleKey] = {
        moduleId: recording.moduleId,
        moduleName: recording.moduleName,
        moduleNumber: recording.moduleNumber,
        recordings: []
      };
    }
    acc[recording.courseId].modules[moduleKey].recordings.push(recording);
    return acc;
  }, {} as Record<string, { 
    courseId: string; 
    courseName: string; 
    modules: Record<string, { moduleId: string; moduleName: string; moduleNumber: number; recordings: RecordedClass[] }> 
  }>);

  // Convertir a array y ordenar
  const sortedCourses = Object.values(recordingsByCourse).map(course => ({
    ...course,
    modules: Object.values(course.modules).sort((a, b) => a.moduleNumber - b.moduleNumber)
  }));

  // Agrupar grabaciones por módulo (cuando hay un curso seleccionado)
  const recordingsByModule = filteredRecordedClasses.reduce((acc, recording) => {
    const key = `${recording.moduleId}-${recording.moduleNumber}`;
    if (!acc[key]) {
      acc[key] = {
        moduleId: recording.moduleId,
        moduleName: recording.moduleName,
        moduleNumber: recording.moduleNumber,
        recordings: []
      };
    }
    acc[key].recordings.push(recording);
    return acc;
  }, {} as Record<string, { moduleId: string; moduleName: string; moduleNumber: number; recordings: RecordedClass[] }>);

  // Convertir a array y ordenar por número de módulo
  const sortedModules = Object.values(recordingsByModule).sort((a, b) => a.moduleNumber - b.moduleNumber);

  const selectedCourse = courses.find(c => c.id === selectedCourseId);

  const handlePlayRecording = (recordingId: string, sessionTitle: string) => {
    // Aquí se implementaría la reproducción de la grabación
    console.log(`Reproduciendo: ${sessionTitle}`);
  };

  const handleDownloadRecording = (recordingId: string, sessionTitle: string) => {
    // Aquí se implementaría la descarga de la grabación
    console.log(`Descargando: ${sessionTitle}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Clases grabadas</h1>
        <p className="text-xl opacity-90">Acceda a las grabaciones de todas sus clases en vivo</p>
      </div>

      {/* Course Filter and Search */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Course Selector - Dropdown */}
          <div className="relative">
            <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full pl-12 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B95BA] appearance-none bg-white cursor-pointer font-medium"
            >
              <option value="">Todos los cursos</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name} ({course.recordedClassesCount} grabaciones)
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por título de sesión o módulo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B95BA]"
            />
          </div>
        </div>

        {/* Course Info Card when selected */}
        {selectedCourse && (
          <div className="p-4 bg-[#0B95BA] rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white mb-1">{selectedCourse.name}</h3>
                <p className="text-sm text-white/80 mb-2">{selectedCourse.code}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-white font-medium">
                    {selectedCourse.modules.length} módulos
                  </span>
                  <span className="text-white/90">
                    {selectedCourse.recordedClassesCount} grabaciones
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recorded Classes by Module */}
      {filteredRecordedClasses.length > 0 ? (
        <div className="space-y-8">
          {!selectedCourseId ? (
            // Vista "Todos los cursos" - Agrupa por curso y luego por módulo
            sortedCourses.map((course) => (
              <div key={course.courseId} className="space-y-6">
                {/* Course Header */}
                <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold mb-1">{course.courseName}</h2>
                      <p className="text-white/90">
                        {course.modules.length} {course.modules.length === 1 ? 'módulo' : 'módulos'} • {' '}
                        {course.modules.reduce((sum, mod) => sum + mod.recordings.length, 0)} {' '}
                        {course.modules.reduce((sum, mod) => sum + mod.recordings.length, 0) === 1 ? 'grabación' : 'grabaciones'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Modules dentro del curso */}
                {course.modules.map((module) => (
                  <div key={module.moduleId} className="bg-white rounded-2xl p-6 border border-gray-200 ml-4">
                    {/* Module Header */}
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                      <div className="w-12 h-12 bg-white border-2 border-gray-300 rounded-xl flex items-center justify-center">
                        <Folder className="w-6 h-6 text-[#0B95BA]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900">Módulo {module.moduleNumber}: {module.moduleName}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {module.recordings.length} {module.recordings.length === 1 ? 'grabación' : 'grabaciones'} disponibles
                        </p>
                      </div>
                    </div>

                    {/* Recordings Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {module.recordings.map((recording) => (
                        <div
                          key={recording.id}
                          className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
                        >
                          {/* Thumbnail */}
                          <div className="relative aspect-video bg-gray-200 overflow-hidden">
                            <img
                              src={recording.thumbnail}
                              alt={recording.sessionTitle}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {recording.isWatched && (
                              <div className="absolute top-3 right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-white" />
                              </div>
                            )}
                            <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs font-medium rounded">
                              {recording.duration}
                            </div>
                            
                            {/* Play Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button
                                onClick={() => handlePlayRecording(recording.id, recording.sessionTitle)}
                                className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                              >
                                <Play className="w-8 h-8 text-[#0B95BA] ml-1" />
                              </button>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                                Sesión {recording.sessionNumber}
                              </span>
                              {recording.isWatched && (
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                  Vista
                                </span>
                              )}
                            </div>

                            <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3rem]">{recording.sessionTitle}</h3>

                            <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>{recording.recordingDate}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Eye className="w-4 h-4" />
                                <span>{recording.views} visualizaciones</span>
                              </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-4">
                              <span className="font-medium">Docente:</span> {recording.instructor}
                            </p>

                            {/* Actions */}
                            <div className="flex gap-2">
                              <button
                                onClick={() => handlePlayRecording(recording.id, recording.sessionTitle)}
                                className="flex-1 px-4 py-2.5 bg-[#0B95BA] hover:bg-[#087A98] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                              >
                                <Play className="w-4 h-4" />
                                Reproducir
                              </button>
                              <button
                                onClick={() => handleDownloadRecording(recording.id, recording.sessionTitle)}
                                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                              >
                                <Download className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            // Vista de curso específico - Solo muestra módulos
            sortedModules.map((module) => (
              <div key={module.moduleId} className="bg-white rounded-2xl p-6 border border-gray-200">
                {/* Module Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                  <div className="w-12 h-12 bg-white border-2 border-gray-300 rounded-xl flex items-center justify-center">
                    <Folder className="w-6 h-6 text-[#0B95BA]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">Módulo {module.moduleNumber}: {module.moduleName}</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {module.recordings.length} {module.recordings.length === 1 ? 'grabación' : 'grabaciones'} disponibles
                    </p>
                  </div>
                </div>

                {/* Recordings Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {module.recordings.map((recording) => (
                    <div
                      key={recording.id}
                      className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
                    >
                      {/* Thumbnail */}
                      <div className="relative aspect-video bg-gray-200 overflow-hidden">
                        <img
                          src={recording.thumbnail}
                          alt={recording.sessionTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {recording.isWatched && (
                          <div className="absolute top-3 right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                        )}
                        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs font-medium rounded">
                          {recording.duration}
                        </div>
                        
                        {/* Play Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            onClick={() => handlePlayRecording(recording.id, recording.sessionTitle)}
                            className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                          >
                            <Play className="w-8 h-8 text-[#0B95BA] ml-1" />
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                            Sesión {recording.sessionNumber}
                          </span>
                          {recording.isWatched && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                              Vista
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3rem]">{recording.sessionTitle}</h3>

                        <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{recording.recordingDate}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Eye className="w-4 h-4" />
                            <span>{recording.views} visualizaciones</span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-4">
                          <span className="font-medium">Docente:</span> {recording.instructor}
                        </p>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handlePlayRecording(recording.id, recording.sessionTitle)}
                            className="flex-1 px-4 py-2.5 bg-[#0B95BA] hover:bg-[#087A98] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                          >
                            <Play className="w-4 h-4" />
                            Reproducir
                          </button>
                          <button
                            onClick={() => handleDownloadRecording(recording.id, recording.sessionTitle)}
                            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-16 border border-gray-200 text-center">
          <Video className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No se encontraron grabaciones</h3>
          <p className="text-gray-600">
            {searchTerm || selectedCourseId
              ? 'Intente con otros filtros de búsqueda'
              : 'Las grabaciones de clases aparecerán aquí cuando estén disponibles'}
          </p>
        </div>
      )}
    </div>
  );
}