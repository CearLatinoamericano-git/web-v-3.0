import { X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

export interface CourseAssignment {
  programTitle: string;
  programCode: string;
  module: string;
  session: string;
  startDate: string;
  endDate: string;
  hours: string;
  status: 'Completado' | 'Activo';
}

export interface InstructorProfile {
  name: string;
  title: string;
  bio: string;
  image: string;
  email?: string;
  phone?: string;
  status?: 'Activo' | 'Inactivo';
  cvUrl?: string;
  assignments?: CourseAssignment[];
  degrees?: string[];
  masterDoctorate?: string[];
  books?: string[];
  articles?: string[];
  universityTeaching?: string[];
  teachingExperience?: string[];
  professionalExperience?: string[];
  awards?: string[];
}

interface InstructorProfileModalProps {
  instructor: InstructorProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

export function InstructorProfileModal({ instructor, isOpen, onClose }: InstructorProfileModalProps) {
  if (!instructor) return null;

  // Generar iniciales del nombre
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Mock assignments si no hay datos
  const assignments: CourseAssignment[] = instructor.assignments || [
    {
      programTitle: 'Diplomado en Arbitraje Comercial Internacional',
      programCode: 'ARB-2024-001',
      module: 'Módulo 3',
      session: 'Sesión 5',
      startDate: '15/01/2024',
      endDate: '15/03/2024',
      hours: '40 horas',
      status: 'Completado'
    },
    {
      programTitle: 'Curso de Contratación Pública',
      programCode: 'CPB-2024-003',
      module: 'Módulo 1',
      session: 'Sesión 2',
      startDate: '01/04/2024',
      endDate: '30/06/2024',
      hours: '24 horas',
      status: 'Activo'
    }
  ];

  // State para controlar la visibilidad de las secciones académicas y profesionales
  const [showAcademic, setShowAcademic] = useState(true);
  const [showProfessional, setShowProfessional] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[60] overflow-y-auto pointer-events-none">
            <div className="min-h-full flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5 text-gray-900" />
                </button>

                {/* Two Column Layout */}
                <div className="flex flex-col lg:flex-row max-h-[90vh]">
                  {/* Left Sidebar */}
                  <div className="lg:w-80 bg-gray-50 border-r border-gray-200 p-6 lg:overflow-y-auto">
                    {/* Profile Photo with Initials */}
                    <div className="flex justify-center mb-4">
                      <div className="relative w-32 h-32">
                        {instructor.image ? (
                          <ImageWithFallback
                            src={instructor.image}
                            alt={instructor.name}
                            className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-[#0B95BA] to-[#0BDDB3] flex items-center justify-center">
                            <span className="text-white text-3xl font-bold">{getInitials(instructor.name)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Name and Title */}
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 text-[24px]">{instructor.name}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{instructor.title}</p>
                    </div>

                    {/* Professional Summary */}
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <h4 className="text-sm font-bold text-gray-900 mb-3">Semblanza profesional</h4>
                      <p className="text-sm text-[rgba(0,0,0,0.95)] leading-relaxed text-justify">
                        {instructor.bio}
                      </p>
                    </div>
                  </div>

                  {/* Right Main Content */}
                  <div className="flex-1 p-6 lg:p-8 lg:overflow-y-auto">
                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Perfil profesional</h2>
                    
                    {/* Academic and Professional Information - Single Column */}
                    <div className="space-y-3">
                      {/* Grados Académicos */}
                      {instructor.degrees && instructor.degrees.length > 0 && (
                        <AcademicSection
                          title="Grados académicos"
                          items={instructor.degrees}
                        />
                      )}

                      {/* Publicaciones */}
                      {instructor.books && instructor.books.length > 0 && (
                        <AcademicSection
                          title="Publicaciones"
                          items={instructor.books}
                        />
                      )}

                      {/* Experiencia Profesional */}
                      {instructor.professionalExperience && instructor.professionalExperience.length > 0 && (
                        <AcademicSection
                          title="Experiencia profesional"
                          items={instructor.professionalExperience}
                        />
                      )}

                      {/* Experiencia en Docencia */}
                      {instructor.teachingExperience && instructor.teachingExperience.length > 0 && (
                        <AcademicSection
                          title="Experiencia en docencia"
                          items={instructor.teachingExperience}
                        />
                      )}

                      {/* Reconocimientos */}
                      {instructor.awards && instructor.awards.length > 0 && (
                        <AcademicSection
                          title="Reconocimientos"
                          items={instructor.awards}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// Assignment Card Component
interface AssignmentCardProps {
  assignment: CourseAssignment;
}

function AssignmentCard({ assignment }: AssignmentCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-base font-bold text-gray-900 mb-1">{assignment.programTitle}</h4>
          <p className="text-xs text-gray-500">{assignment.programCode}</p>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
            assignment.status === 'Completado'
              ? 'bg-gray-100 text-gray-700'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {assignment.status}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-[#0B95BA] text-white">
          {assignment.module}
        </span>
        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-[#0B95BA] text-white">
          {assignment.session}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 text-xs">
        <div>
          <p className="text-gray-500 mb-0.5">Inicio</p>
          <p className="text-gray-900 font-medium">{assignment.startDate}</p>
        </div>
        <div>
          <p className="text-gray-500 mb-0.5">Fin</p>
          <p className="text-gray-900 font-medium">{assignment.endDate}</p>
        </div>
        <div>
          <p className="text-gray-500 mb-0.5">Horas</p>
          <p className="text-gray-900 font-medium">{assignment.hours}</p>
        </div>
      </div>
    </div>
  );
}

// Academic Section Component - Collapsible
interface AcademicSectionProps {
  title: string;
  items: string[];
}

function AcademicSection({ title, items }: AcademicSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200">
      {/* Header - Clickable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#0B95BA] px-4 py-2.5 flex items-center justify-between hover:bg-[#0a7a95] transition-colors"
      >
        <h4 className="text-xs uppercase tracking-wide text-white font-bold">{title}</h4>
        <ChevronDown
          className={`w-4 h-4 text-white transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      {/* Content - Collapsible */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="bg-white p-4">
              <ul className="space-y-2">
                {items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-gray-900 mt-0.5">•</span>
                    <span className="text-sm text-gray-900 leading-relaxed flex-1 text-justify">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}