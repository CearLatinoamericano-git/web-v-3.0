/**
 * Configuración de rutas principales de la aplicación (SPA)
 * 
 * Este archivo centraliza todas las rutas públicas de la aplicación
 * para facilitar su mantenimiento y organización.
 */

// Tipos de páginas disponibles
export type PageType = 
  | 'home'
  | 'courses'
  | 'courseDetail'
  | 'about'
  | 'contact'
  | 'forInstitutions'
  | 'complaintChannel'
  | 'dashboard'
  | 'campus'
  | 'enrollment'
  | 'profile'
  | 'campusLogin'
  | 'campusVirtual';

// Interfaz para definir una ruta
export interface Route {
  path: string;
  pageType: PageType;
  title: string;
  description?: string;
  requiresAuth?: boolean;
  isPublic?: boolean;
}

/**
 * 🏠 Rutas Internas de la Aplicación (SPA)
 * 
 * Rutas principales públicas accesibles desde el menú de navegación
 */
export const PUBLIC_ROUTES: Route[] = [
  {
    path: '/',
    pageType: 'home',
    title: 'Inicio',
    description: 'Página de inicio',
    isPublic: true,
  },
  {
    path: '/courses',
    pageType: 'courses',
    title: 'Programas',
    description: 'Catálogo de cursos',
    isPublic: true,
  },
  {
    path: '/nosotros',
    pageType: 'about',
    title: 'Nosotros',
    description: 'Página "Nosotros"',
    isPublic: true,
  },
  {
    path: '/contacto',
    pageType: 'contact',
    title: 'Contacto',
    description: 'Página de contacto',
    isPublic: true,
  },
  {
    path: '/para-instituciones',
    pageType: 'forInstitutions',
    title: 'Para Instituciones',
    description: 'Página para instituciones',
    isPublic: true,
  },
  {
    path: '/denuncias',
    pageType: 'complaintChannel',
    title: 'Canal de Denuncias',
    description: 'Canal de denuncias',
    isPublic: true,
  },
];

/**
 * Rutas alternativas/compatibilidad
 * Mantiene compatibilidad con rutas antiguas
 */
export const ALIAS_ROUTES: Record<string, string> = {
  '/about': '/nosotros',
  '/contact': '/contacto',
  '/for-institutions': '/para-instituciones',
  '/complaint-channel': '/denuncias',
};

/**
 * Rutas que requieren autenticación
 */
export const PROTECTED_ROUTES: Route[] = [
  {
    path: '/dashboard',
    pageType: 'dashboard',
    title: 'Dashboard',
    description: 'Panel de control del usuario',
    requiresAuth: true,
  },
  {
    path: '/profile',
    pageType: 'profile',
    title: 'Perfil',
    description: 'Perfil de usuario',
    requiresAuth: true,
  },
  {
    path: '/campus',
    pageType: 'campusLogin',
    title: 'Campus Virtual',
    description: 'Acceso al campus virtual',
    requiresAuth: false, // Tiene su propia página de login
  },
];

/**
 * Función helper para obtener el tipo de página desde una ruta
 */
export function getPageTypeFromPath(path: string): PageType | null {
  // Normalizar la ruta
  const normalizedPath = path.toLowerCase().trim();
  
  // Buscar en rutas públicas
  const publicRoute = PUBLIC_ROUTES.find(route => 
    route.path === normalizedPath || route.path === path
  );
  if (publicRoute) {
    return publicRoute.pageType;
  }
  
  // Buscar en alias
  if (ALIAS_ROUTES[normalizedPath] || ALIAS_ROUTES[path]) {
    const aliasPath = ALIAS_ROUTES[normalizedPath] || ALIAS_ROUTES[path];
    const aliasRoute = PUBLIC_ROUTES.find(route => route.path === aliasPath);
    if (aliasRoute) {
      return aliasRoute.pageType;
    }
  }
  
  // Buscar en rutas protegidas
  const protectedRoute = PROTECTED_ROUTES.find(route => 
    route.path === normalizedPath || route.path === path
  );
  if (protectedRoute) {
    return protectedRoute.pageType;
  }
  
  // Manejar rutas de detalle de curso
  if (path.startsWith('/course/')) {
    return 'courseDetail';
  }
  
  return null;
}

/**
 * Función helper para obtener la ruta desde un tipo de página
 */
export function getPathFromPageType(pageType: PageType, params?: Record<string, string>): string {
  // Buscar en rutas públicas
  const publicRoute = PUBLIC_ROUTES.find(route => route.pageType === pageType);
  if (publicRoute) {
    return publicRoute.path;
  }
  
  // Buscar en rutas protegidas
  const protectedRoute = PROTECTED_ROUTES.find(route => route.pageType === pageType);
  if (protectedRoute) {
    return protectedRoute.path;
  }
  
  // Casos especiales
  if (pageType === 'courseDetail' && params?.courseId) {
    return `/course/${params.courseId}`;
  }
  
  if (pageType === 'campus' && params?.courseId) {
    return `/campus/${params.courseId}`;
  }
  
  if (pageType === 'enrollment' && params?.courseId) {
    return `/enrollment/${params.courseId}`;
  }
  
  // Por defecto, retornar home
  return '/';
}

/**
 * Función helper para verificar si una ruta requiere autenticación
 */
export function requiresAuth(path: string): boolean {
  const pageType = getPageTypeFromPath(path);
  if (!pageType) return false;
  
  const route = [...PUBLIC_ROUTES, ...PROTECTED_ROUTES].find(
    r => r.pageType === pageType
  );
  
  return route?.requiresAuth === true;
}

/**
 * Función helper para verificar si una ruta es pública
 */
export function isPublicRoute(path: string): boolean {
  const pageType = getPageTypeFromPath(path);
  if (!pageType) return false;
  
  const route = PUBLIC_ROUTES.find(r => r.pageType === pageType);
  return route?.isPublic === true;
}

/**
 * Obtener todas las rutas públicas para navegación
 */
export function getPublicRoutesForNavigation(): Route[] {
  return PUBLIC_ROUTES.filter(route => route.isPublic);
}

