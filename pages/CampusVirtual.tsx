import { useState } from 'react';
import { CampusLayout } from '../components/campus/CampusLayout';
import { StudentDashboard } from '../components/campus/StudentDashboard';
import { TeacherDashboard } from '../components/campus/TeacherDashboard';
import { AdminDashboard } from '../components/campus/AdminDashboard';
import { AdministrationDashboard } from '../components/campus/AdministrationDashboard';
import { CourseView } from '../components/campus/CourseView';
import { PaymentsView } from '../components/campus/PaymentsView';
import { StudentPaymentsView } from '../components/campus/StudentPaymentsView';
import { StudentCoursesView } from '../components/campus/StudentCoursesView';
import { PoliciesView } from '../components/campus/PoliciesView';
import { CouponsView } from '../components/campus/CouponsView';
import { ActivitiesView } from '../components/campus/ActivitiesView';
import { QuizView } from '../components/campus/QuizView';
import { AssignmentView } from '../components/campus/AssignmentView';
import { AdminSettingsView } from '../components/campus/admin/AdminSettingsView';
import { ContentManagement } from '../components/campus/admin/ContentManagement';
import { TeacherRegistration } from '../components/campus/admin/TeacherRegistration';
import { UserManagement } from '../components/campus/admin/UserManagement';
import { RequestsManagement } from '../components/campus/admin/RequestsManagement';
import { PaymentsManagement } from '../components/campus/admin/PaymentsManagement';
import { CourseWeightingView } from '../components/campus/admin/CourseWeightingView';
import { AttendanceManagement } from '../components/campus/admin/AttendanceManagement';
import { GradesManagement } from '../components/campus/admin/GradesManagement';
import { CertificatesManagement } from '../components/campus/admin/CertificatesManagement';
import { ProgramsManagement } from '../components/campus/admin/ProgramsManagement';
import { ForumView } from '../components/campus/ForumView';
import { FormsView } from '../components/campus/FormsView';
import { MessagingView } from '../components/campus/MessagingView';
import { RecordedClassesView } from '../components/campus/RecordedClassesView';
import { StudentProfileView } from '../components/campus/student/StudentProfileView';
import { ReadingView } from '../components/campus/ReadingView';
import { toast } from 'sonner';

interface CampusVirtualProps {
  userRole: 'student' | 'teacher' | 'admin' | 'superadmin' | 'administration';
  userName: string;
  userEmail: string;
  onLogout: () => void;
}

export function CampusVirtual({ userRole, userName, userEmail, onLogout }: CampusVirtualProps) {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedForumId, setSelectedForumId] = useState<string | null>(null);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<number | null>(null);
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
  const [messagingInitialFilter, setMessagingInitialFilter] = useState<'all' | 'notification' | 'request-response' | 'institutional' | 'direct'>('all');
  const [readingData, setReadingData] = useState<{
    title: string;
    pdfUrl: string;
    courseName?: string;
    moduleName?: string;
  } | null>(null);
  const [forumContext, setForumContext] = useState<{
    courseCode?: string;
    courseName?: string;
    moduleName?: string;
  }>({});

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    setSelectedCourseId(null);
    setSelectedForumId(null);
    setSelectedActivityId(null);
    setSelectedModuleId(null);
    setSelectedSessionId(null);
    setReadingData(null);
    setForumContext({});
    setMessagingInitialFilter('all');
  };

  const handleNavigateToMessaging = (filter: 'all' | 'notification' | 'request-response' | 'institutional' | 'direct' = 'all') => {
    setMessagingInitialFilter(filter);
    setCurrentView('messages');
  };

  const handleNavigateToCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setSelectedActivityId(null);
    setSelectedModuleId(null);
    setSelectedSessionId(null);
    setReadingData(null);
    setCurrentView('course-view');
  };

  const handleNavigateToActivity = (courseId: string, activityId: number, moduleId?: number, sessionId?: number) => {
    setSelectedCourseId(courseId);
    setSelectedActivityId(activityId);
    setSelectedModuleId(moduleId || null);
    setSelectedSessionId(sessionId || null);
    setReadingData(null);
    setCurrentView('course-view');
  };

  const handleNavigateToReading = (data: {
    title: string;
    pdfUrl: string;
    courseName?: string;
    moduleName?: string;
  }) => {
    setReadingData(data);
    setCurrentView('reading');
    // Mark reading as accessed (progress tracking)
    toast.success('Lectura iniciada');
  };

  const handleBackFromReading = () => {
    setReadingData(null);
    if (selectedCourseId) {
      setCurrentView('course-view');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleBackFromQuiz = () => {
    if (selectedCourseId) {
      setCurrentView('course-view');
    } else if (currentView === 'quiz') {
      setCurrentView('activities');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleNavigateToForum = (forumId: string, context?: {
    courseCode?: string;
    courseName?: string;
    moduleName?: string;
  }) => {
    setSelectedForumId(forumId);
    setForumContext(context || {});
    setCurrentView('forum');
  };

  const handleBackFromCourse = () => {
    setCurrentView('courses');
    setSelectedCourseId(null);
  };

  const handleBackFromForum = () => {
    if (selectedCourseId) {
      setCurrentView('course-view');
    } else {
      setCurrentView('dashboard');
    }
    setSelectedForumId(null);
    setForumContext({});
  };

  const renderContent = () => {
    // Reading View (full-screen, no layout)
    if (currentView === 'reading' && readingData) {
      return null; // Rendered outside of CampusLayout
    }

    // Forum View
    if (currentView === 'forum' && selectedForumId) {
      return (
        <ForumView 
          forumId={selectedForumId} 
          onBack={handleBackFromForum}
          courseCode={forumContext.courseCode}
          courseName={forumContext.courseName}
          moduleName={forumContext.moduleName}
          userRole={userRole}
        />
      );
    }

    // Course View (for all roles when viewing a specific course)
    if (currentView === 'course-view' && selectedCourseId) {
      return (
        <CourseView 
          courseId={selectedCourseId} 
          onBack={handleBackFromCourse} 
          onNavigateToQuiz={() => handleNavigate('quiz')}
          onNavigateToReading={handleNavigateToReading}
          onNavigateToForum={handleNavigateToForum}
        />
      );
    }

    // Dashboard views by role
    if (currentView === 'dashboard') {
      switch (userRole) {
        case 'student':
          return (
            <StudentDashboard
              onNavigateToCourse={handleNavigateToCourse}
              onNavigateToLiveClass={() => handleNavigate('live-classes')}
              onNavigateToActivities={() => handleNavigate('activities')}
              onNavigateToPayments={() => handleNavigate('payments')}
              onNavigateToRecordings={() => handleNavigate('recorded-classes')}
              onNavigateToCourses={() => handleNavigate('courses')}
            />
          );
        case 'teacher':
          return (
            <TeacherDashboard
              onNavigateToCourse={handleNavigateToCourse}
              onCreateContent={() => handleNavigate('create-content')}
            />
          );
        case 'admin':
        case 'superadmin':
          return <AdminDashboard onNavigate={handleNavigate} />;
        case 'administration':
          return <AdministrationDashboard onNavigate={handleNavigate} />;
        default:
          return <StudentDashboard 
            onNavigateToCourse={handleNavigateToCourse} 
            onNavigateToLiveClass={() => {}}
            onNavigateToCourses={() => handleNavigate('courses')}
          />; 
      }
    }

    // Other views (placeholders for now)
    if (currentView === 'courses') {
      // Students see their subscribed courses
      if (userRole === 'student') {
        return <StudentCoursesView onNavigateToCourse={handleNavigateToCourse} />;
      }
      
      // Administration sees content management (same as "Gestionar contenido" button)
      if (userRole === 'administration') {
        return <ContentManagement />;
      }
      
      // Other roles see generic view (to be developed)
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">Todos los Cursos</h1>
            <p className="text-xl opacity-90">Explora y gestiona los cursos disponibles</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <p className="text-gray-600 text-center py-12">
              Vista de listado completo de cursos en desarrollo...
            </p>
            <div className="text-center">
              <button
                onClick={() => handleNavigateToCourse('1')}
                className="px-6 py-3 bg-[#0B95BA] text-white font-medium rounded-xl hover:bg-[#087A98] transition-colors"
              >
                Ver curso de ejemplo
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (currentView === 'live-classes') {
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-3xl p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">Clases en Vivo</h1>
            <p className="text-xl opacity-90">Participa en sesiones en tiempo real</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <p className="text-gray-600 text-center py-12">
              Vista de clases en vivo integradas con Google Meet en desarrollo...
            </p>
          </div>
        </div>
      );
    }

    if (currentView === 'activities') {
      return (
        <ActivitiesView 
          onNavigateToQuiz={() => handleNavigate('quiz')}
          onNavigateToReading={handleNavigateToReading}
          onNavigateToForum={handleNavigateToForum}
          onNavigateToAssignment={(activityId) => {
            setSelectedAssignmentId(activityId);
            setCurrentView('assignment');
          }}
        />
      );
    }

    if (currentView === 'assignment' && selectedAssignmentId) {
      return (
        <AssignmentView 
          assignmentId={selectedAssignmentId}
          onBack={() => {
            setSelectedAssignmentId(null);
            setCurrentView('activities');
          }}
        />
      );
    }

    if (currentView === 'library') {
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">Biblioteca de Recursos</h1>
            <p className="text-xl opacity-90">Accede a todos los materiales educativos</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <p className="text-gray-600 text-center py-12">
              Vista de biblioteca en desarrollo...
            </p>
          </div>
        </div>
      );
    }

    if (currentView === 'grades') {
      return <GradesManagement onBack={() => handleNavigate('dashboard')} />;
    }

    if (currentView === 'certificates') {
      return <CertificatesManagement onBack={() => handleNavigate('dashboard')} />;
    }

    if (currentView === 'attendance') {
      return <AttendanceManagement onBack={() => handleNavigate('dashboard')} />;
    }

    if (currentView === 'attendance-management') {
      return <AttendanceManagement onBack={() => handleNavigate('dashboard')} />;
    }

    if (currentView === 'news') {
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">Novedades</h1>
            <p className="text-xl opacity-90">Mantente informado de las últimas actualizaciones</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <p className="text-gray-600 text-center py-12">
              Vista de novedades en desarrollo...
            </p>
          </div>
        </div>
      );
    }

    if (currentView === 'messages') {
      return <MessagingView userRole={userRole} userName={userName} initialFilter={messagingInitialFilter} />;
    }

    if (currentView === 'users') {
      return <UserManagement onBack={() => handleNavigate('dashboard')} />;
    }

    if (currentView === 'weighting') {
      return <CourseWeightingView onBack={() => handleNavigate('dashboard')} />;
    }

    if (currentView === 'requests') {
      return <RequestsManagement />;
    }

    if (currentView === 'forum') {
      return <ForumView userRole={userRole} />;
    }

    if (currentView === 'settings') {
      return (userRole === 'admin' || userRole === 'superadmin' || userRole === 'administration') ? <AdminSettingsView /> : (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">Configuración</h1>
            <p className="text-xl opacity-90">Personaliza tu experiencia en el campus</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <p className="text-gray-600 text-center py-12">
              Vista de configuración en desarrollo...
            </p>
          </div>
        </div>
      );
    }

    if (currentView === 'profile') {
      // Para estudiantes, usamos la vista completa de perfil
      if (userRole === 'student') {
        return <StudentProfileView />;
      }
      
      // Para otros roles, vista genérica
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">Mi perfil</h1>
            <p className="text-xl opacity-90">Gestiona tu información personal</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-1">{userName}</h2>
                  <p className="text-gray-600">{userEmail}</p>
                </div>
              </div>
              <p className="text-gray-600 text-center py-8">
                Vista completa de perfil en desarrollo...
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (currentView === 'payments') {
      if (userRole === 'student') {
        return <StudentPaymentsView />;
      } else if (userRole === 'admin' || userRole === 'superadmin' || userRole === 'administration') {
        return <PaymentsManagement />;
      }
      return <PaymentsView />;
    }

    if (currentView === 'policies') {
      return <PoliciesView />;
    }

    if (currentView === 'coupons') {
      return <CouponsView />;
    }

    if (currentView === 'quiz') {
      return <QuizView onBack={handleBackFromQuiz} />;
    }

    if (currentView === 'content-management') {
      return <ContentManagement onBack={() => handleNavigate('dashboard')} />;
    }

    if (currentView === 'create-content') {
      return <ContentManagement onBack={() => handleNavigate('dashboard')} />;
    }

    if (currentView === 'register-teachers') {
      return <TeacherRegistration onBack={() => handleNavigate('dashboard')} />;
    }

    if (currentView === 'forms') {
      return <FormsView />;
    }

    if (currentView === 'recorded-classes') {
      return <RecordedClassesView />;
    }

    // Default fallback
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-200">
        <p className="text-gray-600 text-center">Vista en desarrollo...</p>
      </div>
    );
  };

  return (
    <>
      {currentView === 'reading' && readingData ? (
        <ReadingView
          title={readingData.title}
          pdfUrl={readingData.pdfUrl}
          courseName={readingData.courseName}
          moduleName={readingData.moduleName}
          onClose={handleBackFromReading}
        />
      ) : (
        <CampusLayout
          userRole={userRole}
          userName={userName}
          userEmail={userEmail}
          currentView={currentView}
          onNavigate={handleNavigate}
          onNavigateToMessaging={handleNavigateToMessaging}
          onLogout={onLogout}
        >
          {renderContent()}
        </CampusLayout>
      )}
    </>
  );
}