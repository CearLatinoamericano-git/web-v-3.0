import { ReactNode, useState } from 'react';
import { 
  Home, 
  BookOpen, 
  Video, 
  CheckSquare, 
  Library, 
  BarChart3, 
  Users, 
  MessageSquare, 
  Bell, 
  Mail, 
  Settings, 
  User,
  Menu,
  X,
  LogOut,
  ChevronDown,
  CreditCard,
  Shield,
  Ticket,
  DollarSign,
  FileText,
  MessageCircle,
  Clock,
  ClipboardCheck,
  UserCog,
  Calendar,
  CheckCircle,
  Award,
  AlertTriangle,
  TrendingDown,
  Send,
  AlertCircle,
  Lock,
  Star,
  Key,
  CalendarPlus,
  UserCheck,
  Flag
} from 'lucide-react';
import CearLogo from '../CearLogo';
import { AdminNotifications } from './admin/AdminNotifications';
import { StudentNotifications } from './student/StudentNotifications';

interface CampusLayoutProps {
  children: ReactNode;
  userRole: 'student' | 'teacher' | 'admin' | 'superadmin' | 'administration';
  userName: string;
  userEmail: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onNavigateToMessaging?: (filter: 'all' | 'notification' | 'request-response' | 'institutional' | 'direct') => void;
  onLogout: () => void;
}

export function CampusLayout({ 
  children, 
  userRole, 
  userName, 
  userEmail, 
  currentView,
  onNavigate,
  onNavigateToMessaging,
  onLogout 
}: CampusLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Inicio', icon: Home, roles: ['student', 'teacher', 'admin', 'superadmin', 'administration'] },
    { 
      id: 'courses', 
      label: userRole === 'administration' ? 'Gestionar contenido' : 'Programas', 
      icon: BookOpen, 
      roles: ['student', 'teacher', 'admin', 'superadmin', 'administration'] 
    },
    { id: 'forum', label: 'Foros', icon: MessageSquare, roles: ['student', 'teacher', 'admin', 'superadmin', 'administration'] },
    { id: 'messages', label: 'Mensajería', icon: Mail, roles: ['student', 'teacher', 'admin', 'superadmin', 'administration'] },
    { id: 'requests', label: 'Solicitudes', icon: FileText, roles: ['admin', 'superadmin', 'administration'] },
    { id: 'payments', label: 'Pagos', icon: CreditCard, roles: ['student', 'admin', 'superadmin', 'administration'] },
    { id: 'coupons', label: 'Cupones', icon: Ticket, roles: ['admin', 'superadmin', 'administration'] },
    { id: 'users', label: 'Gestión de usuarios', icon: UserCog, roles: ['admin', 'superadmin', 'administration'] },
  ];

  const visibleMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  const getRoleName = (role: string) => {
    const roles: Record<string, string> = {
      student: 'Estudiante',
      teacher: 'Docente',
      admin: 'Administrador',
      superadmin: 'Super Administrador',
      administration: 'Administración'
    };
    return roles[role] || role;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-gray-200 z-40">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Left side - Logo and Menu Toggle */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <div className="flex items-center gap-3">
              <div className="text-[#0B95BA] w-[160px] h-10">
                <CearLogo />
              </div>
            </div>
          </div>

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center gap-4">
            {/* Políticas y Reglamentos (solo para estudiantes) */}
            {userRole === 'student' && (
              <>
                <button
                  onClick={() => onNavigate('policies')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                    currentView === 'policies'
                      ? 'bg-[#0B95BA] text-white shadow-lg shadow-[#0B95BA]/20'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Shield className="w-5 h-5" />
                  <span className="hidden lg:inline">Políticas y reglamentos</span>
                  <span className="lg:hidden">Políticas</span>
                </button>

                <button
                  onClick={() => onNavigate('forms')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                    currentView === 'forms'
                      ? 'bg-[#0B95BA] text-white shadow-lg shadow-[#0B95BA]/20'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span className="hidden lg:inline">Solicitudes</span>
                  <span className="lg:hidden">Solicitudes</span>
                </button>
              </>
            )}

            {/* Notifications */}
            {(userRole === 'admin' || userRole === 'superadmin' || userRole === 'administration') ? (
              <AdminNotifications />
            ) : (
              <StudentNotifications />
            )}

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{userName.charAt(0).toUpperCase()}</span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">{userRole === 'admin' || userRole === 'teacher' ? 'Área Académica' : userName}</p>
                  <p className="text-xs text-gray-500">{getRoleName(userRole)}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {/* Dropdown Menu */}
              {profileMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-medium text-gray-900">{userName}</p>
                    <p className="text-sm text-gray-500">{userEmail}</p>
                  </div>
                  <button
                    onClick={() => {
                      onNavigate('profile');
                      setProfileMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
                  >
                    <User className="w-5 h-5 text-gray-600" />
                    <span>Mi perfil</span>
                  </button>
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button
                      onClick={onLogout}
                      className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Cerrar sesión</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-20 left-0 bottom-0 w-72 bg-white border-r border-gray-200 z-30 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto py-6 px-4">
          <nav className="space-y-2">
            {visibleMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#0B95BA] text-white shadow-lg shadow-[#0B95BA]/20'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="font-medium text-lg">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Stats Card (for students) */}
          {userRole === 'student' && (
            <div className="mt-8 p-5 bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-2xl text-white shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Video className="w-4 h-4" />
                <h3 className="font-bold text-sm">Clases de hoy</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 bg-[rgba(255,255,255,0.1)]">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] opacity-75 mb-0.5">Curso</p>
                      <p className="text-xs font-medium leading-tight">Arbitraje Comercial Internacional</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] opacity-75 mb-0.5">Fecha y hora</p>
                      <p className="text-xs font-medium">15/12/2024</p>
                      <p className="text-xs font-medium">18:00 hrs</p>
                    </div>
                  </div>
                </div>

                <button className="w-full py-2.5 bg-white text-[#0B95BA] hover:bg-white/90 text-sm font-medium rounded-xl transition-all hover:shadow-lg flex items-center justify-center gap-2">
                  <Video className="w-4 h-4" />
                  Ingresar
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-20 min-h-screen transition-all duration-300 ${
          sidebarOpen ? 'lg:pl-72' : 'pl-0'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 py-8">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}