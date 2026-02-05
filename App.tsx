import { useState, useEffect, useLayoutEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ViewportFix } from './components/ViewportFix';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Home } from './pages/Home/Home';
import { Courses } from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import { Dashboard } from './pages/Dashboard';
import { Enrollment } from './pages/Enrollment';
import { Profile } from './pages/ProfilePage';
import { About } from './pages/Nosotros/About';
import { Contacto } from './pages/Contacto/Contacto';
import { Instituciones } from './pages/Instituciones/Instituciones';
import { Denuncias } from './pages/Denuncias/Denuncias';
import { courses } from './data/coursesUpdated';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { 
  getPageTypeFromPath, 
  requiresAuth, 
  ALIAS_ROUTES 
} from './routes';

// Mapeo de slugs estáticos a IDs de cursos
const staticSlugToCourseId: Record<string, string> = {
    "DIPLOMADO-CONTRATACION-PUBLICA-BAJO-LEY-32069-SU-REGLAMENTO":
        "curso-cp",
    "DIPLOMADO-ESPECIALIZACION-ARBITRAJE-CONTRATACION-PUBLICA":
        "diplomado-arbitraje-iv",
    "DIPLOMADO-ESPECIALIZACION-DERECHO-ADMINISTRATIVO-ARBITROS":
        "diplomado-derecho-administrativo-ii",
    "CURSO-ESPECIALIZACION-CONTROVERSIAS-EJECUCIÓN-CONTRACTUAL":
        "curso-controversias-ejecucion-contractual",
    "DIPLOMADO-ESPECIALIZACION-JUNTA-PREVENCION-RESOLUCION-DISPUTAS-LEY-32069-REGLAMENTO":
        "diplomado-jprd-ii",
    "II-CURSO-ESPECIALIZACION-EJECUCION-CONTRACTUAL":
        "curso-controversias-ejecucion-contractual",
    "CURSO-ESPECIALIZACION-MECANISMOS-INVERSION-PRIVADA":
        "curso-inversion-privada",
    "III-CURSO-ESPECIALIZACION-CONTRATOS-ESTANDARIZADOS-NEC-FIDIC":
        "curso-contratos-estandarizados-iii",
};

// Mapeo inverso: IDs de cursos a slugs estáticos
// Si hay múltiples slugs para el mismo curso, se usa el primero encontrado
const courseIdToStaticSlug: Record<string, string> = Object.entries(
    staticSlugToCourseId,
).reduce(
    (acc, [slug, courseId]) => {
        // Solo asignar si no existe ya un slug para este curso
        if (!acc[courseId]) {
            acc[courseId] = slug;
        }
        return acc;
    },
    {} as Record<string, string>,
);

type Page = 
  | { type: 'home' }
  | { type: 'courses' }
  | { type: 'courseDetail'; courseId: string }
  | { type: 'dashboard' }
  | { type: 'enrollment'; courseId: string }
  | { type: 'profile' }
  | { type: 'about' }
  | { type: 'contact' }
  | { type: 'forInstitutions' }
  | { type: 'complaintChannel' };

// Helper function to get path from page type
const getPathFromPage = (page: Page): string => {
  switch (page.type) {
    case 'home':
      return '/';
    case 'courses':
      return '/courses';
    case 'courseDetail':
      // Solo curso-cp usa la ruta estándar /course/{id}
      // Los demás cursos usan sus slugs estáticos
      if (page.courseId === 'curso-cp') {
        return `/course/${page.courseId}`;
      }
      // Para otros cursos, usar slug estático si existe
      const staticSlug = courseIdToStaticSlug[page.courseId];
      if (staticSlug) {
        return `/${staticSlug}`;
      }
      return `/course/${page.courseId}`;
    case 'dashboard':
      return '/dashboard';
    case 'enrollment':
      return `/enrollment/${page.courseId}`;
    case 'profile':
      return '/profile';
    case 'about':
      return '/nosotros';
    case 'contact':
      return '/contacto';
    case 'forInstitutions':
      return '/para-instituciones';
    case 'complaintChannel':
      return '/denuncias';
    default:
      return '/';
  }
};

// Helper function to get page type from path
const getPageFromPath = (path: string): Page | null => {
  if (path === '/' || path === '') {
    return { type: 'home' };
  } else if (path === '/courses') {
    return { type: 'courses' };
  } else if (path === '/dashboard') {
    return { type: 'dashboard' };
  } else if (path.startsWith('/enrollment/')) {
    const courseId = path.replace('/enrollment/', '');
    return { type: 'enrollment', courseId };
  } else if (path === '/profile') {
    return { type: 'profile' };
  } else if (path === '/nosotros') {
    return { type: 'about' };
  } else if (path === '/contacto') {
    return { type: 'contact' };
  } else if (path === '/para-instituciones') {
    return { type: 'forInstitutions' };
  } else if (path === '/denuncias') {
    return { type: 'complaintChannel' };
  } else if (path.startsWith('/course/')) {
    // Rutas dinámicas para cursos que no tienen slug estático
    const courseId = path.replace('/course/', '');
    return { type: 'courseDetail', courseId };
  } else if (path.startsWith('/')) {
    // Verificar si es un slug estático (ruta sin /course/)
    const slug = path.slice(1); // Remover el '/' inicial
    if (staticSlugToCourseId[slug]) {
      const courseId = staticSlugToCourseId[slug];
      return { type: 'courseDetail', courseId };
    }
  }
  return null;
};

function AppContent() {
  const { colorVariant } = useTheme();
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    // Initialize from URL
    const initialPath = window.location.pathname;
    const page = getPageFromPath(initialPath);
    return page || { type: 'home' };
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState<'student' | 'teacher' | 'admin' | 'superadmin' | 'administration'>('student');

  // Update URL when page changes
  const navigateToPage = (page: Page, replace = false) => {
    // No hacer scroll si estamos haciendo scroll interno
    if (!(window as any).__isInternalScroll) {
      // Scroll to top immediately before state change
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    setCurrentPage(page);
    const path = getPathFromPage(page);
    if (replace) {
      window.history.replaceState({ page }, '', path);
    } else {
      window.history.pushState({ page }, '', path);
    }

    // Scroll again after state update (solo si no es scroll interno)
    if (!(window as any).__isInternalScroll) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
    }
  };

  // Disable browser scroll restoration and handle browser navigation
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Handle browser back/forward buttons
    const handlePopState = (_e: PopStateEvent) => {
      // No hacer scroll si estamos haciendo scroll interno
      if (!(window as any).__isInternalScroll) {
        // Scroll to top immediately
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }

      const path = window.location.pathname;
      const page = getPageFromPath(path);
      if (page) {
        setCurrentPage(page);

        // Scroll again after state update (solo si no es scroll interno)
        if (!(window as any).__isInternalScroll) {
          requestAnimationFrame(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
          });
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Scroll to top whenever page changes - use useLayoutEffect for immediate execution
  useLayoutEffect(() => {
    // No hacer scroll si estamos haciendo scroll interno
    if ((window as any).__isInternalScroll) {
      return;
    }

    // Scroll immediately before browser paint
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Also ensure scroll after render completes
    const timer1 = requestAnimationFrame(() => {
      if ((window as any).__isInternalScroll) {
        return;
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });

    const timer2 = setTimeout(() => {
      if ((window as any).__isInternalScroll) {
        return;
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);

    return () => {
      cancelAnimationFrame(timer1);
      clearTimeout(timer2);
    };
  }, [currentPage]);

  // Handle protected routes redirects
  useEffect(() => {
    const protectedPages: Page['type'][] = ['dashboard', 'enrollment', 'profile'];
    if (protectedPages.includes(currentPage.type) && !isLoggedIn) {
      navigateToPage({ type: 'home' }, true);
    }
  }, [currentPage.type, isLoggedIn]);

  const handleLogin = (email: string, password: string) => {
    // Sistema de login deshabilitado - campus eliminado
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setUserEmail('');
    setUserRole('student');
    navigateToPage({ type: 'home' });
  };

  const handleCourseClick = (courseId: string) => {
    navigateToPage({ type: 'courseDetail', courseId });
  };

  const handleEnroll = (courseId: string) => {
    if (!isLoggedIn) {
      navigateToPage({ type: 'home' });
      return;
    }
    navigateToPage({ type: 'enrollment', courseId });
  };

  const handleEnrollmentComplete = () => {
    navigateToPage({ type: 'dashboard' });
  };

  const handleCourseAccess = (courseId: string) => {
    navigateToPage({ type: 'enrollment', courseId });
  };

  const renderPage = () => {
    switch (currentPage.type) {
      case 'home':
        return (
          <Home
            onNavigate={(path) => {
              if (path.startsWith('/course/')) {
                const courseId = path.replace('/course/', '');
                handleCourseClick(courseId);
              } else if (path === '/courses') {
                navigateToPage({ type: 'courses' });
              }
            }}
          />
        );
      
      case 'courses':
        return <Courses onCourseClick={handleCourseClick} />;
      
      case 'courseDetail': {
        const course = courses.find(c => c.id === currentPage.courseId);
        if (!course) {
          navigateToPage({ type: 'courses' });
          return null;
        }
        
        // Get related courses - prioritize same category, then same type
        const relatedCourses = courses
          .filter(c => c.id !== course.id)
          .sort((a, b) => {
            // Priorizar cursos de la misma categoría
            const aMatchCategory = a.category === course.category ? 1 : 0;
            const bMatchCategory = b.category === course.category ? 1 : 0;
            if (aMatchCategory !== bMatchCategory) return bMatchCategory - aMatchCategory;
            
            // Luego por tipo
            const aMatchType = a.type === course.type ? 1 : 0;
            const bMatchType = b.type === course.type ? 1 : 0;
            return bMatchType - aMatchType;
          });
        
        return (
          <CourseDetail
            key={`course-${course.id}-${Date.now()}`}
            course={{ ...course, description: course.fullDescription }}
            relatedCourses={relatedCourses.map(c => ({ ...c, description: c.fullDescription }))}
            onNavigate={(path) => {
              if (path.startsWith('/course/')) {
                const courseId = path.replace('/course/', '');
                handleCourseClick(courseId);
              }
            }}
          />
        );
      }
      
      case 'dashboard':
        if (!isLoggedIn) {
          navigateToPage({ type: 'home' }, true);
          return null;
        }
        return (
          <Dashboard
            userName={userName}
            onCourseAccess={handleCourseAccess}
            onBackToMain={() => {
              navigateToPage({ type: 'home' });
            }}
            onLogout={handleLogout}
          />
        );
      
      case 'enrollment':
        if (!isLoggedIn) {
          navigateToPage({ type: 'home' }, true);
          return null;
        }
        return (
          <Enrollment
            courseId={currentPage.courseId}
            onBack={() => {
              navigateToPage({ type: 'courseDetail', courseId: currentPage.courseId });
            }}
            onComplete={handleEnrollmentComplete}
          />
        );
      
      case 'profile':
        if (!isLoggedIn) {
          navigateToPage({ type: 'home' }, true);
          return null;
        }
        return <Profile userName={userName} onLogout={handleLogout} />;
      
      case 'about':
        return <About />;
      
      case 'contact':
        return <Contacto />;
      
      case 'forInstitutions':
        return <Instituciones />;
      
      case 'complaintChannel':
        return <Denuncias />;
      
      default:
        return <Home onNavigate={() => {}} />;
    }
  };

  // Interceptar clicks en enlaces para navegación SPA
  const handleNavigation = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a');
    
    if (link && link.href) {
      const url = new URL(link.href, window.location.href);
      
      // Solo interceptar enlaces internos
      if (url.origin === window.location.origin) {
        e.preventDefault();
        
        let path = url.pathname;
        
        // Manejar alias de rutas (compatibilidad con rutas antiguas)
        if (ALIAS_ROUTES[path]) {
          path = ALIAS_ROUTES[path];
        }
        
        // Obtener el tipo de página desde la ruta
        const pageType = getPageTypeFromPath(path);
        
        if (pageType) {
          // Manejar rutas que requieren autenticación
          if (requiresAuth(path) && !isLoggedIn) {
            navigateToPage({ type: 'home' });
            return;
          }
          
          // Manejar rutas especiales con parámetros
          if (path.startsWith('/course/')) {
            const courseId = path.replace('/course/', '');
            navigateToPage({ type: 'courseDetail', courseId });
          } else if (path.startsWith('/enrollment/')) {
            const courseId = path.replace('/enrollment/', '');
            if (isLoggedIn) {
              navigateToPage({ type: 'enrollment', courseId });
            } else {
              navigateToPage({ type: 'home' });
            }
          } else {
            // Rutas normales
            const page = getPageFromPath(path);
            if (page) {
              navigateToPage(page);
            } else {
              navigateToPage({ type: 'home' });
            }
          }
        } else {
          // Si no se encuentra la ruta, redirigir a home
          navigateToPage({ type: 'home' });
        }
      }
    }
  };

  return (
    <div 
      onClick={handleNavigation} 
      data-color-variant={colorVariant}
      style={{
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
        position: 'relative'
      }}
    >
      {currentPage.type !== 'dashboard' && currentPage.type !== 'profile' && (
        <Header 
          currentPage={(() => {
            if (currentPage.type === 'home') return '/';
            if (currentPage.type === 'courses') return '/courses';
            if (currentPage.type === 'courseDetail') return '/courses';
            if (currentPage.type === 'about') return '/nosotros';
            if (currentPage.type === 'contact') return '/contacto';
            if (currentPage.type === 'forInstitutions') return '/para-instituciones';
            if (currentPage.type === 'complaintChannel') return '/denuncias';
            return '/';
          })()}
        />
      )}
      
      <main style={{ padding: 0, margin: 0 }}>
        {renderPage()}
      </main>
      
      {currentPage.type !== 'dashboard' && currentPage.type !== 'profile' && (
        <Footer onNavigate={(path) => {
          // Manejar alias de rutas
          const normalizedPath = ALIAS_ROUTES[path] || path;
          const page = getPageFromPath(normalizedPath);
          
          if (page) {
            navigateToPage(page);
          } else {
            navigateToPage({ type: 'home' });
          }
        }} />
      )}
      <ViewportFix />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}