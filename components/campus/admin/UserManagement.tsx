import { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Download, 
  Mail, 
  Phone, 
  Calendar, 
  Award, 
  BookOpen, 
  TrendingUp,
  Edit,
  Trash2,
  Eye,
  X,
  Check,
  AlertCircle,
  FileText,
  CheckCircle,
  ClipboardList,
  BarChart3,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';
import { AttendanceModal, WeightedGradesModal } from './UserManagementModals';
import { ImageWithFallback } from '../../figma/ImageWithFallback';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'student' | 'teacher' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  enrolledCourses: number;
  completedCourses: number;
  averageGrade: number;
  registrationDate: string;
  lastAccess: string;
  inactiveDays?: number; // Días de inactividad calculados
  avatar?: string;
}

interface CourseGrade {
  courseId: string;
  courseName: string;
  progress: number;
  grade: number;
  status: 'in-progress' | 'completed' | 'not-started';
  enrollmentDate: string;
  completionDate?: string;
  activities: {
    id: string;
    title: string;
    type: 'quiz' | 'assignment' | 'forum' | 'reading';
    grade?: number;
    maxGrade?: number;
    status: 'completed' | 'submitted' | 'pending' | 'not-started';
    submissionDate?: string;
  }[];
}

interface UserManagementProps {
  onBack?: () => void;
}

export function UserManagement({ onBack }: UserManagementProps = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'student' | 'teacher' | 'admin'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showGradesModal, setShowGradesModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showWeightedGradesModal, setShowWeightedGradesModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    firstName: '',
    paternalLastName: '',
    maternalLastName: '',
    nationality: '',
    documentType: 'DNI',
    documentNumber: '',
    birthDate: '',
    profession: '',
    currentJob: '',
    jobPosition: '',
    phone: '',
    mobile: '',
    email: '',
    address: '',
    province: '',
    department: '',
    country: 'Perú',
    role: 'student' as 'student' | 'teacher' | 'admin',
    password: ''
  });

  // Función para calcular días de inactividad
  const calculateInactiveDays = (lastAccess: string): number => {
    const lastAccessDate = new Date(lastAccess);
    const today = new Date('2024-12-04'); // Fecha actual del sistema
    const diffTime = Math.abs(today.getTime() - lastAccessDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Mock data
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Ana García Pérez',
      email: 'ana.garcia@example.com',
      phone: '+51 999 888 777',
      role: 'student',
      status: 'active',
      enrolledCourses: 3,
      completedCourses: 1,
      averageGrade: 18.5,
      registrationDate: '2024-09-15',
      lastAccess: '2024-11-30',
      avatar: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDU5MTc1MXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '2',
      name: 'Carlos Mendoza Silva',
      email: 'carlos.mendoza@example.com',
      phone: '+51 988 777 666',
      role: 'student',
      status: 'active',
      enrolledCourses: 2,
      completedCourses: 1,
      averageGrade: 16.8,
      registrationDate: '2024-09-20',
      lastAccess: '2024-11-29',
      avatar: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQ1NTA2MTR8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '3',
      name: 'María López Torres',
      email: 'maria.lopez@example.com',
      phone: '+51 977 666 555',
      role: 'student',
      status: 'active',
      enrolledCourses: 4,
      completedCourses: 2,
      averageGrade: 19.2,
      registrationDate: '2024-08-10',
      lastAccess: '2024-11-30',
      avatar: 'https://images.unsplash.com/photo-1510947565940-a38e2443c426?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHBlcnNvbnxlbnwxfHx8fDE3NjQ2MTA5ODF8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '4',
      name: 'Dr. Juan Ramírez',
      email: 'juan.ramirez@example.com',
      phone: '+51 966 555 444',
      role: 'teacher',
      status: 'active',
      enrolledCourses: 0,
      completedCourses: 0,
      averageGrade: 0,
      registrationDate: '2024-07-01',
      lastAccess: '2024-11-30',
      avatar: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2NDYxNTQ4NHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '5',
      name: 'Pedro Sánchez Ramos',
      email: 'pedro.sanchez@example.com',
      phone: '+51 955 444 333',
      role: 'student',
      status: 'inactive',
      enrolledCourses: 1,
      completedCourses: 0,
      averageGrade: 14.5,
      registrationDate: '2024-10-05',
      lastAccess: '2024-10-20',
      avatar: 'https://images.unsplash.com/photo-1762341120638-b5b9358ef571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbnxlbnwxfHx8fDE3NjQ1MzM5OTh8MA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ]);

  const userGrades: { [key: string]: CourseGrade[] } = {
    '1': [
      {
        courseId: 'DIPARB-2024-V1',
        courseName: 'Diplomado en Arbitraje Comercial Internacional',
        progress: 45,
        grade: 18.5,
        status: 'in-progress',
        enrollmentDate: '2024-10-01',
        activities: [
          {
            id: '1',
            title: 'Quiz: Conceptos básicos de arbitraje',
            type: 'quiz',
            grade: 18,
            maxGrade: 20,
            status: 'completed',
            submissionDate: '2024-10-20'
          },
          {
            id: '2',
            title: 'Tarea: Análisis de cláusulas arbitrales',
            type: 'assignment',
            grade: 19,
            maxGrade: 20,
            status: 'completed',
            submissionDate: '2024-11-10'
          },
          {
            id: '3',
            title: 'Foro: Casos de arbitraje nacional',
            type: 'forum',
            status: 'completed',
            submissionDate: '2024-10-27'
          },
          {
            id: '4',
            title: 'Ensayo: Procedimiento en arbitraje comercial',
            type: 'assignment',
            status: 'submitted',
            submissionDate: '2024-11-20'
          },
          {
            id: '5',
            title: 'Quiz: Evaluación del procedimiento',
            type: 'quiz',
            status: 'pending'
          }
        ]
      },
      {
        courseId: 'CONTPUB-2024-V1',
        courseName: 'Diplomado en Contratación Pública',
        progress: 100,
        grade: 19.0,
        status: 'completed',
        enrollmentDate: '2024-09-15',
        completionDate: '2024-11-15',
        activities: [
          {
            id: '6',
            title: 'Quiz final: Contratación pública',
            type: 'quiz',
            grade: 19,
            maxGrade: 20,
            status: 'completed',
            submissionDate: '2024-11-15'
          }
        ]
      }
    ],
    '3': [
      {
        courseId: 'DIPARB-2024-V1',
        courseName: 'Diplomado en Arbitraje Comercial Internacional',
        progress: 75,
        grade: 19.5,
        status: 'in-progress',
        enrollmentDate: '2024-09-01',
        activities: [
          {
            id: '1',
            title: 'Quiz: Conceptos básicos de arbitraje',
            type: 'quiz',
            grade: 20,
            maxGrade: 20,
            status: 'completed',
            submissionDate: '2024-10-18'
          },
          {
            id: '2',
            title: 'Tarea: Análisis de cláusulas arbitrales',
            type: 'assignment',
            grade: 19,
            maxGrade: 20,
            status: 'completed',
            submissionDate: '2024-11-08'
          }
        ]
      }
    ]
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user: User = {
      id: (users.length + 1).toString(),
      name: newUser.firstName + ' ' + newUser.paternalLastName + ' ' + newUser.maternalLastName,
      email: newUser.email,
      phone: newUser.mobile,
      role: newUser.role,
      status: 'active',
      enrolledCourses: 0,
      completedCourses: 0,
      averageGrade: 0,
      registrationDate: new Date().toISOString().split('T')[0],
      lastAccess: new Date().toISOString().split('T')[0]
    };

    setUsers([...users, user]);
    toast.success(`Usuario ${newUser.name} creado exitosamente`);
    setShowCreateModal(false);
    setNewUser({
      firstName: '',
      paternalLastName: '',
      maternalLastName: '',
      nationality: '',
      documentType: 'DNI',
      documentNumber: '',
      birthDate: '',
      profession: '',
      currentJob: '',
      jobPosition: '',
      phone: '',
      mobile: '',
      email: '',
      address: '',
      province: '',
      department: '',
      country: 'Perú',
      role: 'student',
      password: ''
    });
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      setUsers(users.filter(u => u.id !== userId));
      toast.success('Usuario eliminado exitosamente');
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    // Cargar datos del usuario en el formulario
    const names = user.name.split(' ');
    setNewUser({
      firstName: names[0] || '',
      paternalLastName: names[1] || '',
      maternalLastName: names[2] || '',
      nationality: '',
      documentType: 'DNI',
      documentNumber: '',
      birthDate: '',
      profession: '',
      currentJob: '',
      jobPosition: '',
      phone: user.phone,
      mobile: user.phone,
      email: user.email,
      address: '',
      province: '',
      department: '',
      country: 'Perú',
      role: user.role,
      password: ''
    });
    setShowEditModal(true);
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    const updatedUser: User = {
      ...selectedUser,
      name: `${newUser.firstName} ${newUser.paternalLastName} ${newUser.maternalLastName}`,
      email: newUser.email,
      phone: newUser.mobile,
      role: newUser.role
    };

    setUsers(users.map(u => u.id === selectedUser.id ? updatedUser : u));
    toast.success('Usuario actualizado exitosamente');
    setShowEditModal(false);
    setSelectedUser(null);
    setNewUser({
      firstName: '',
      paternalLastName: '',
      maternalLastName: '',
      nationality: '',
      documentType: 'DNI',
      documentNumber: '',
      birthDate: '',
      profession: '',
      currentJob: '',
      jobPosition: '',
      phone: '',
      mobile: '',
      email: '',
      address: '',
      province: '',
      department: '',
      country: 'Perú',
      role: 'student',
      password: ''
    });
  };

  const handleViewGrades = (user: User) => {
    setSelectedUser(user);
    setShowGradesModal(true);
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Nombre', 'Email', 'Teléfono', 'Rol', 'Estado', 'Cursos inscritos', 'Cursos completados', 'Promedio', 'Fecha registro', 'Último acceso'];
    const data = filteredUsers.map(user => [
      user.id,
      user.name,
      user.email,
      user.phone,
      user.role === 'student' ? 'Estudiante' : user.role === 'teacher' ? 'Docente' : 'Administrador',
      user.status === 'active' ? 'Activo' : user.status === 'inactive' ? 'Inactivo' : 'Suspendido',
      user.enrolledCourses,
      user.completedCourses,
      user.averageGrade.toFixed(1),
      user.registrationDate,
      user.lastAccess
    ]);

    const csvContent = [headers.join(','), ...data.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `usuarios_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Archivo CSV exportado exitosamente');
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'student':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Estudiante</span>;
      case 'teacher':
        return <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Docente</span>;
      case 'admin':
        return <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">Administrador</span>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Activo</span>;
      case 'inactive':
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Inactivo</span>;
      case 'suspended':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Suspendido</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            {onBack && (
              <button
                onClick={onBack}
                className="mb-3 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver
              </button>
            )}
            <h1 className="text-4xl font-bold mb-2">Gestión de usuarios</h1>
            <p className="text-lg opacity-90">Administra usuarios, roles y calificaciones</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={exportToCSV}
              className="px-6 py-3 bg-white/20 text-white rounded-xl font-medium hover:bg-white/30 transition-colors flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Exportar
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-white text-[#0B95BA] rounded-xl font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Crear usuario
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#0EA5E9] text-white flex items-center justify-center flex-shrink-0">
            <Users className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900 text-[24px]">{users.length}</p>
            <p className="text-xs text-gray-600 whitespace-nowrap text-[15px] mx-[-7px] my-[0px]">Total usuarios</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#10B981] text-white flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900 text-[24px]">{users.filter(u => u.role === 'student').length}</p>
            <p className="text-xs text-gray-600 whitespace-nowrap text-[15px] mx-[-7px] my-[0px]">Estudiantes</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#3B82F6] text-white flex items-center justify-center flex-shrink-0">
            <Award className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900 text-[24px]">{users.filter(u => u.role === 'teacher').length}</p>
            <p className="text-xs text-gray-600 whitespace-nowrap text-[15px] mx-[-7px] my-[0px]">Docentes</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#EAB308] text-white flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900 text-[24px]">{users.filter(u => u.status === 'active').length}</p>
            <p className="text-xs text-gray-600 whitespace-nowrap text-[15px] mx-[-7px] my-[0px]">Activos</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
            />
          </div>

          <div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as any)}
              className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
            >
              <option value="all">Todos los roles</option>
              <option value="student">Estudiantes</option>
              <option value="teacher">Docentes</option>
              <option value="admin">Administradores</option>
            </select>
          </div>

          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
              <option value="suspended">Suspendidos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-3 py-2.5 text-left text-xs font-bold text-gray-900">Usuario</th>
                <th className="px-3 py-2.5 text-left text-xs font-bold text-gray-900">Contacto</th>
                <th className="px-3 py-2.5 text-left text-xs font-bold text-gray-900">Rol</th>
                <th className="px-3 py-2.5 text-left text-xs font-bold text-gray-900">Estado</th>
                <th className="px-3 py-2.5 text-left text-xs font-bold text-gray-900">Programas</th>
                <th className="px-3 py-2.5 text-left text-xs font-bold text-gray-900">Actividad</th>
                <th className="px-3 py-2.5 text-left text-xs font-bold text-gray-900">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      {user.avatar ? (
                        <ImageWithFallback
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-medium text-xs text-gray-900 truncate">{user.name}</p>
                        <p className="text-[10px] text-gray-500">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-700">
                        <Mail className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        <span className="truncate max-w-[180px]">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-700">
                        <Phone className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        <span className="whitespace-nowrap">{user.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-3 py-2.5">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-3 py-2.5">
                    {user.role === 'student' ? (
                      <div className="text-[11px] space-y-0.5">
                        <p className="text-gray-900 font-medium whitespace-nowrap">{user.enrolledCourses} inscritos</p>
                        <p className="text-gray-500 whitespace-nowrap">{user.completedCourses} completados</p>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-[11px]">N/A</span>
                    )}
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-900">
                        <Calendar className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        <span className="whitespace-nowrap">{new Date(user.lastAccess).toLocaleDateString('es-PE')}</span>
                      </div>
                      {(() => {
                        const inactiveDays = calculateInactiveDays(user.lastAccess);
                        const getInactivityColor = () => {
                          if (inactiveDays === 0) return 'text-green-600 bg-green-50';
                          if (inactiveDays <= 3) return 'text-blue-600 bg-blue-50';
                          if (inactiveDays <= 7) return 'text-amber-600 bg-amber-50';
                          return 'text-red-600 bg-red-50';
                        };
                        const getInactivityText = () => {
                          if (inactiveDays === 0) return 'Hoy';
                          if (inactiveDays === 1) return '1 día';
                          return `${inactiveDays} días`;
                        };
                        return (
                          <div className={`flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${getInactivityColor()} w-fit`}>
                            <Clock className="w-2.5 h-2.5 flex-shrink-0" />
                            <span className="whitespace-nowrap">{getInactivityText()}</span>
                          </div>
                        );
                      })()}
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1">
                      {user.role === 'student' && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowWeightedGradesModal(true);
                            }}
                            className="p-1.5 hover:bg-purple-50 rounded-lg transition-colors text-purple-600"
                            title="Ver criterios de calificación"
                          >
                            <BarChart3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowAttendanceModal(true);
                            }}
                            className="p-1.5 hover:bg-green-50 rounded-lg transition-colors text-green-600"
                            title="Ver asistencias"
                          >
                            <ClipboardList className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleEditUser(user)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                        title="Editar"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">Crear nuevo usuario</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-6 space-y-6">
              {/* Nombres y Apellidos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre(s) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                    placeholder="Ej: Alex Segundo"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apellido paterno *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.paternalLastName}
                    onChange={(e) => setNewUser({ ...newUser, paternalLastName: e.target.value })}
                    placeholder="Ej: Díaz"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apellido materno *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.maternalLastName}
                    onChange={(e) => setNewUser({ ...newUser, maternalLastName: e.target.value })}
                    placeholder="Ej: Guevara"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Nacionalidad, Documento, Fecha de Nacimiento */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nacionalidad *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.nationality}
                    onChange={(e) => setNewUser({ ...newUser, nationality: e.target.value })}
                    placeholder="Ej: Peruana"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    DNI / C.E. *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.documentNumber}
                    onChange={(e) => setNewUser({ ...newUser, documentNumber: e.target.value })}
                    placeholder="Ej: 16705621"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de nacimiento *
                  </label>
                  <input
                    type="date"
                    required
                    value={newUser.birthDate}
                    onChange={(e) => setNewUser({ ...newUser, birthDate: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Profesión, Trabajo Actual, Cargo */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profesión *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.profession}
                    onChange={(e) => setNewUser({ ...newUser, profession: e.target.value })}
                    placeholder="Ej: Ingeniero civil"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trabajo actual *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.currentJob}
                    onChange={(e) => setNewUser({ ...newUser, currentJob: e.target.value })}
                    placeholder="Ej: Urci Consultores S.L."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cargo / Puesto *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.jobPosition}
                    onChange={(e) => setNewUser({ ...newUser, jobPosition: e.target.value })}
                    placeholder="Ej: Director de Producción"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Teléfono, Celular, Correo */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    placeholder="Ej: 4371841"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Celular *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newUser.mobile}
                    onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })}
                    placeholder="Ej: 966330139"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo *
                  </label>
                  <input
                    type="email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="usuario@example.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Dirección */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección actual *
                </label>
                <input
                  type="text"
                  required
                  value={newUser.address}
                  onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                  placeholder="Ej: Calle Severini 174 Interior 402 - San Borja"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                />
              </div>

              {/* Provincia, Departamento, País */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Provincia *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.province}
                    onChange={(e) => setNewUser({ ...newUser, province: e.target.value })}
                    placeholder="Ej: Lima"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departamento *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.department}
                    onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                    placeholder="Ej: Lima"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    País *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.country}
                    onChange={(e) => setNewUser({ ...newUser, country: e.target.value })}
                    placeholder="Ej: Perú"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rol *
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
                    className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  >
                    <option value="student">Estudiante</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña *
                  </label>
                  <input
                    type="password"
                    required
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Información importante:</p>
                  <ul className="list-disc list-inside space-y-1 text-blue-700">
                    <li>El usuario recibirá un email con sus credenciales</li>
                    <li>Deberá cambiar su contraseña en el primer acceso</li>
                    <li>Los estudiantes podrán inscribirse en cursos disponibles</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#0B95BA] text-white rounded-xl font-medium hover:bg-[#087A98] transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Crear usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">Editar usuario</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="p-6 space-y-6">
              {/* Nombres y Apellidos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre(s) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                    placeholder="Ej: Alex Segundo"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apellido paterno *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.paternalLastName}
                    onChange={(e) => setNewUser({ ...newUser, paternalLastName: e.target.value })}
                    placeholder="Ej: Díaz"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apellido materno *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.maternalLastName}
                    onChange={(e) => setNewUser({ ...newUser, maternalLastName: e.target.value })}
                    placeholder="Ej: Guevara"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Nacionalidad, Documento, Fecha de Nacimiento */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nacionalidad *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.nationality}
                    onChange={(e) => setNewUser({ ...newUser, nationality: e.target.value })}
                    placeholder="Ej: Peruana"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    DNI / C.E. *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.documentNumber}
                    onChange={(e) => setNewUser({ ...newUser, documentNumber: e.target.value })}
                    placeholder="Ej: 16705621"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de nacimiento *
                  </label>
                  <input
                    type="date"
                    required
                    value={newUser.birthDate}
                    onChange={(e) => setNewUser({ ...newUser, birthDate: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Profesión, Trabajo Actual, Cargo */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profesión *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.profession}
                    onChange={(e) => setNewUser({ ...newUser, profession: e.target.value })}
                    placeholder="Ej: Ingeniero civil"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trabajo actual *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.currentJob}
                    onChange={(e) => setNewUser({ ...newUser, currentJob: e.target.value })}
                    placeholder="Ej: Urci Consultores S.L."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cargo / Puesto *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.jobPosition}
                    onChange={(e) => setNewUser({ ...newUser, jobPosition: e.target.value })}
                    placeholder="Ej: Director de Producción"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Teléfono, Celular, Correo */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    placeholder="Ej: 4371841"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Celular *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newUser.mobile}
                    onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })}
                    placeholder="Ej: 966330139"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo *
                  </label>
                  <input
                    type="email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="usuario@example.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Dirección */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección actual *
                </label>
                <input
                  type="text"
                  required
                  value={newUser.address}
                  onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                  placeholder="Ej: Calle Severini 174 Interior 402 - San Borja"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                />
              </div>

              {/* Provincia, Departamento, País */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Provincia *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.province}
                    onChange={(e) => setNewUser({ ...newUser, province: e.target.value })}
                    placeholder="Ej: Lima"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departamento *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.department}
                    onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                    placeholder="Ej: Lima"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    País *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.country}
                    onChange={(e) => setNewUser({ ...newUser, country: e.target.value })}
                    placeholder="Ej: Perú"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rol *
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
                    className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  >
                    <option value="student">Estudiante</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña *
                  </label>
                  <input
                    type="password"
                    required
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Información importante:</p>
                  <ul className="list-disc list-inside space-y-1 text-blue-700">
                    <li>El usuario recibirá un email con sus credenciales</li>
                    <li>Deberá cambiar su contraseña en el primer acceso</li>
                    <li>Los estudiantes podrán inscribirse en cursos disponibles</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#0B95BA] text-white rounded-xl font-medium hover:bg-[#087A98] transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Actualizar usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grades Modal */}
      {showGradesModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Calificaciones de {selectedUser.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{selectedUser.email}</p>
              </div>
              <button
                onClick={() => setShowGradesModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border-2 border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-900">{selectedUser.enrolledCourses}</p>
                      <p className="text-sm text-blue-700">Cursos Inscritos</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 border-2 border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-900">{selectedUser.completedCourses}</p>
                      <p className="text-sm text-green-700">Cursos Completados</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border-2 border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-900">{selectedUser.averageGrade.toFixed(1)}</p>
                      <p className="text-sm text-purple-700">Promedio General</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Courses */}
              {userGrades[selectedUser.id]?.map((course) => (
                <div key={course.courseId} className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-xl text-gray-900">{course.courseName}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span>Inscrito: {course.enrollmentDate}</span>
                          {course.completionDate && (
                            <span>• Completado: {course.completionDate}</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-[#0B95BA]">{course.grade.toFixed(1)}</div>
                        <div className="text-sm text-gray-600">Promedio</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#0B95BA] rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{course.progress}% completado</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Actividades</h4>
                    <div className="space-y-3">
                      {course.activities.map((activity) => (
                        <div
                          key={activity.id}
                          className="p-4 border-2 border-gray-200 rounded-xl"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                activity.status === 'completed' ? 'bg-green-100' :
                                activity.status === 'submitted' ? 'bg-blue-100' :
                                activity.status === 'pending' ? 'bg-amber-100' :
                                'bg-gray-100'
                              }`}>
                                {activity.type === 'quiz' && <CheckCircle className="w-5 h-5 text-gray-700" />}
                                {activity.type === 'assignment' && <FileText className="w-5 h-5 text-gray-700" />}
                                {activity.type === 'forum' && <Users className="w-5 h-5 text-gray-700" />}
                                {activity.type === 'reading' && <BookOpen className="w-5 h-5 text-gray-700" />}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{activity.title}</p>
                                {activity.submissionDate && (
                                  <p className="text-xs text-gray-500">Enviado: {activity.submissionDate}</p>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              {activity.grade !== undefined ? (
                                <div className={`px-4 py-2 rounded-lg font-bold text-lg ${
                                  activity.grade >= 18 ? 'bg-green-100 text-green-700' :
                                  activity.grade >= 14 ? 'bg-blue-100 text-blue-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {activity.grade}/{activity.maxGrade}
                                </div>
                              ) : (
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  activity.status === 'completed' ? 'bg-green-100 text-green-700' :
                                  activity.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
                                  activity.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  {activity.status === 'completed' ? 'Completada' :
                                   activity.status === 'submitted' ? 'Enviada' :
                                   activity.status === 'pending' ? 'Pendiente' :
                                   'No iniciada'}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {(!userGrades[selectedUser.id] || userGrades[selectedUser.id].length === 0) && (
                <div className="text-center py-12 text-gray-500">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>Este estudiante no tiene cursos inscritos aún</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Attendance Modal */}
      {showAttendanceModal && (
        <AttendanceModal
          user={selectedUser}
          onClose={() => setShowAttendanceModal(false)}
        />
      )}

      {/* Weighted Grades Modal */}
      {showWeightedGradesModal && (
        <WeightedGradesModal
          user={selectedUser}
          onClose={() => setShowWeightedGradesModal(false)}
        />
      )}
    </div>
  );
}