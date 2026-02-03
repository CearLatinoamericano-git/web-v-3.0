import { useState } from 'react';
import {
  Layers,
  GraduationCap,
  FileText,
  ClipboardList,
  Settings as SettingsIcon,
  ChevronRight,
  BookOpen,
  ArrowLeft
} from 'lucide-react';
import { ModulesManagement } from './ModulesManagement';
import { ProgramsManagement } from './ProgramsManagement';
import { SurveysManagement } from './SurveysManagement';
import { CoursesManagement } from './CoursesManagement';
import { CourseCreator } from './CourseCreator';
import { CourseContentBuilder } from './CourseContentBuilder';

type AdminSection = 'overview' | 'modules' | 'programs' | 'surveys' | 'forms' | 'settings' | 'courses' | 'course-creator' | 'course-builder';

export function AdminSettingsView() {
  const [currentSection, setCurrentSection] = useState<AdminSection>('overview');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const menuItems = [
    {
      id: 'modules' as AdminSection,
      label: 'Módulos',
      icon: Layers,
      description: 'Gestiona los módulos del sistema',
      color: 'blue'
    },
    {
      id: 'programs' as AdminSection,
      label: 'Programas de Estudio',
      icon: GraduationCap,
      description: 'Configura programas académicos',
      color: 'purple'
    },
    {
      id: 'surveys' as AdminSection,
      label: 'Encuestas',
      icon: ClipboardList,
      description: 'Gestiona encuestas y formularios',
      color: 'green'
    },
    {
      id: 'forms' as AdminSection,
      label: 'Solicitudes',
      icon: FileText,
      description: 'Gestiona las solicitudes académicas y administrativas del sistema',
      color: 'from-purple-600 to-purple-500'
    },
    {
      id: 'settings' as AdminSection,
      label: 'Configuración general',
      icon: SettingsIcon,
      description: 'Políticas y parámetros del sistema',
      color: 'gray'
    },
    {
      id: 'courses' as AdminSection,
      label: 'Cursos',
      icon: BookOpen,
      description: 'Administra y crea cursos',
      color: 'orange'
    }
  ];

  const renderContent = () => {
    switch (currentSection) {
      case 'modules':
        return <ModulesManagement />;
      case 'programs':
        return <ProgramsManagement />;
      case 'surveys':
        return <SurveysManagement />;
      case 'forms':
        return <FormsManagementPlaceholder />;
      case 'settings':
        return <GeneralSettingsPlaceholder />;
      case 'courses':
        return (
          <CoursesManagement
            onCreateCourse={() => setCurrentSection('course-creator')}
            onEditCourse={(id) => {
              setSelectedCourseId(id);
              setCurrentSection('course-builder');
            }}
            onViewCourse={(id) => {
              setSelectedCourseId(id);
              setCurrentSection('course-builder');
            }}
            onManageStudents={(id) => {
              setSelectedCourseId(id);
              console.log('Gestionar estudiantes del curso:', id);
            }}
            onManageSchedules={() => {
              console.log('Gestionar horarios');
            }}
            onManageContent={(id) => {
              setSelectedCourseId(id);
              setCurrentSection('course-builder');
            }}
            onManageAttendance={(id) => {
              setSelectedCourseId(id);
              console.log('Gestionar asistencia del curso:', id);
            }}
            onManageGrades={(id) => {
              setSelectedCourseId(id);
              console.log('Gestionar calificaciones del curso:', id);
            }}
            onManageCertificates={(id) => {
              setSelectedCourseId(id);
              console.log('Gestionar certificados del curso:', id);
            }}
            onBack={() => setCurrentSection('overview')}
          />
        );
      case 'course-creator':
        return (
          <CourseCreator
            onBack={() => setCurrentSection('courses')}
            onComplete={(id) => {
              setSelectedCourseId(id);
              setCurrentSection('course-builder');
            }}
          />
        );
      case 'course-builder':
        return selectedCourseId ? (
          <CourseContentBuilder
            courseId={selectedCourseId}
            onBack={() => setCurrentSection('courses')}
          />
        ) : null;
      default:
        return <OverviewSection menuItems={menuItems} onNavigate={setCurrentSection} />;
    }
  };

  if (currentSection !== 'overview') {
    return (
      <div className="space-y-6">
        {currentSection !== 'courses' && (
          <button
            onClick={() => setCurrentSection('overview')}
            className="mb-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
        )}
        {renderContent()}
      </div>
    );
  }

  return renderContent();
}

function OverviewSection({ 
  menuItems, 
  onNavigate 
}: { 
  menuItems: Array<{ id: AdminSection; label: string; icon: any; description: string; color: string }>;
  onNavigate: (section: AdminSection) => void;
}) {
  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; icon: string }> = {
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600' },
      green: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-600' },
      amber: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-600' },
      gray: { bg: 'bg-gray-50', border: 'border-gray-200', icon: 'text-gray-600' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'text-orange-600' }
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
        <div>
          <h1 className="text-4xl font-bold mb-2">Administración del Sistema</h1>
          <p className="text-lg opacity-90">Configura y gestiona todos los aspectos del campus virtual</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#0EA5E9] text-white flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900 text-[24px]">60 usuarios</p>
            <p className="text-xs text-gray-600 whitespace-nowrap text-[15px] mx-[-7px] my-[0px]">Capacidad por curso</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#10B981] text-white flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900 text-[24px]">70%</p>
            <p className="text-xs text-gray-600 whitespace-nowrap text-[15px] mx-[-7px] my-[0px]">Asistencia mínima</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#3B82F6] text-white flex items-center justify-center flex-shrink-0">
            <SettingsIcon className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900 text-[24px]">3 máximo</p>
            <p className="text-xs text-gray-600 whitespace-nowrap text-[15px] mx-[-7px] my-[0px]">Operadores por cuenta</p>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const colors = getColorClasses(item.color);
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`${colors.bg} ${colors.border} border-2 rounded-2xl p-6 text-left hover:shadow-lg transition-all group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center ${colors.border} border`}>
                  <Icon className={`w-8 h-8 ${colors.icon}`} />
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{item.label}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </button>
          );
        })}
      </div>

      {/* Configuration Summary */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-900 mb-4">Configuraciones Activas</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">Diplomas Automáticos</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Activado</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">Control de lectura</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">+1 documento (75 pág)</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">Formularios digitales</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Activado</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">Encuestas Integradas</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Activado</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormsManagementPlaceholder() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Solicitudes</h1>
        <p className="text-gray-600 mt-1">Gestiona las solicitudes académicas y administrativas del sistema</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <h2 className="font-bold text-gray-900 mb-4">Tipos de solicitudes disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-2">Certificados de estudios</h3>
            <p className="text-sm text-blue-700 mb-3">Solicitudes de certificados académicos oficiales</p>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Digital</span>
          </div>
          <div className="p-5 bg-purple-50 rounded-xl border border-purple-200">
            <h3 className="font-bold text-purple-900 mb-2">Revisión de calificaciones</h3>
            <p className="text-sm text-purple-700 mb-3">Solicitudes de revisión de evaluaciones</p>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Digital</span>
          </div>
          <div className="p-5 bg-green-50 rounded-xl border border-green-200">
            <h3 className="font-bold text-green-900 mb-2">Constancias de notas</h3>
            <p className="text-sm text-green-700 mb-3">Generación de constancias oficiales de calificaciones</p>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Digital</span>
          </div>
          <div className="p-5 bg-amber-50 rounded-xl border border-amber-200">
            <h3 className="font-bold text-amber-900 mb-2">Solicitudes de prórroga</h3>
            <p className="text-sm text-amber-700 mb-3">Extensión de plazos para entregas y evaluaciones</p>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">Digital</span>
          </div>
        </div>
        <p className="text-center text-gray-500 mt-8">Vista detallada en desarrollo...</p>
      </div>
    </div>
  );
}

function GeneralSettingsPlaceholder() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuración general</h1>
        <p className="text-gray-600 mt-1">Políticas y parámetros globales del sistema</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <h2 className="font-bold text-gray-900 mb-6">Parámetros del Sistema</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Máximo de usuarios por curso
            </label>
            <input
              type="number"
              defaultValue={60}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Porcentaje mínimo de asistencia (%)
            </label>
            <input
              type="number"
              defaultValue={70}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Operadores permitidos por cuenta
            </label>
            <input
              type="number"
              defaultValue={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nota mínima de aprobación
            </label>
            <input
              type="number"
              defaultValue={14}
              max={20}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
            />
          </div>
        </div>
        <p className="text-center text-gray-500 mt-8">Vista completa en desarrollo...</p>
      </div>
    </div>
  );
}