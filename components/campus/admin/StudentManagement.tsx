import { useState } from 'react';
import { ArrowLeft, Users, Plus, Search, Mail, Phone, UserCheck, X, Check, Calendar, BookOpen, CheckSquare, Download, AtSign, Smartphone, Award } from 'lucide-react';
import { toast } from 'sonner';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  enrollmentDate: string;
  status: 'active' | 'inactive';
  attendance: number;
  grade: number;
}

interface Course {
  id: string;
  name: string;
  code: string;
  maxStudents: number;
  enrolledStudents: number;
}

interface AvailableUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'student' | 'teacher' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
}

interface StudentManagementProps {
  courseId?: string;
  onBack: () => void;
}

export function StudentManagement({ courseId, onBack }: StudentManagementProps) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(courseId || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [userSearchTerm, setUserSearchTerm] = useState('');

  // Mock de usuarios disponibles (desde Gestión de Usuarios)
  const availableUsers: AvailableUser[] = [
    {
      id: 'u1',
      name: 'Ana García Pérez',
      email: 'ana.garcia@example.com',
      phone: '+51 999 888 777',
      role: 'student',
      status: 'active'
    },
    {
      id: 'u2',
      name: 'Carlos Mendoza Silva',
      email: 'carlos.mendoza@example.com',
      phone: '+51 988 777 666',
      role: 'student',
      status: 'active'
    },
    {
      id: 'u3',
      name: 'María López Torres',
      email: 'maria.lopez@example.com',
      phone: '+51 977 666 555',
      role: 'student',
      status: 'active'
    },
    {
      id: 'u4',
      name: 'Pedro Sánchez Ramos',
      email: 'pedro.sanchez@example.com',
      phone: '+51 955 444 333',
      role: 'student',
      status: 'active'
    },
    {
      id: 'u5',
      name: 'Laura Díaz Rojas',
      email: 'laura.diaz@example.com',
      phone: '+51 944 333 222',
      role: 'student',
      status: 'active'
    },
    {
      id: 'u6',
      name: 'Roberto Castro Vega',
      email: 'roberto.castro@example.com',
      phone: '+51 933 222 111',
      role: 'student',
      status: 'active'
    }
  ];

  // Mock de cursos disponibles
  const courses: Course[] = [
    {
      id: '1',
      name: 'III Diplomado en Especialización de Derecho Administrativo para Árbitros',
      code: 'DIPDERAD-2024-III',
      maxStudents: 60,
      enrolledStudents: 45
    },
    {
      id: '2',
      name: 'Curso de Especialización en Mecanismos de Inversión Privada: APP, OXI y G2G',
      code: 'CEMEIP-2024-V1',
      maxStudents: 60,
      enrolledStudents: 52
    },
    {
      id: '3',
      name: 'Diplomado en Resolución de Controversias',
      code: 'RESCONT-2024-V1',
      maxStudents: 60,
      enrolledStudents: 38
    }
  ];

  // Mock de estudiantes por curso
  const [students, setStudents] = useState<{ [courseId: string]: Student[] }>({
    '1': [
      {
        id: '1',
        name: 'Juan Pérez García',
        email: 'juan.perez@email.com',
        phone: '+51 987 654 321',
        enrollmentDate: '2024-01-15',
        status: 'active',
        attendance: 95,
        grade: 18
      },
      {
        id: '2',
        name: 'María González López',
        email: 'maria.gonzalez@email.com',
        phone: '+51 987 654 322',
        enrollmentDate: '2024-01-16',
        status: 'active',
        attendance: 88,
        grade: 16
      },
      {
        id: '3',
        name: 'Carlos Ramírez Torres',
        email: 'carlos.ramirez@email.com',
        phone: '+51 987 654 323',
        enrollmentDate: '2024-01-17',
        status: 'active',
        attendance: 92,
        grade: 17
      }
    ],
    '2': [
      {
        id: '4',
        name: 'Ana Martínez Silva',
        email: 'ana.martinez@email.com',
        phone: '+51 987 654 324',
        enrollmentDate: '2024-01-18',
        status: 'active',
        attendance: 90,
        grade: 19
      }
    ],
    '3': [
      {
        id: '5',
        name: 'Luis Fernández Castro',
        email: 'luis.fernandez@email.com',
        phone: '+51 987 654 325',
        enrollmentDate: '2024-01-19',
        status: 'active',
        attendance: 85,
        grade: 15
      }
    ]
  });

  const handleEnrollStudent = (userId: string) => {
    if (selectedCourse) {
      const newStudent: Student = {
        id: userId,
        name: availableUsers.find(u => u.id === userId)?.name || '',
        email: availableUsers.find(u => u.id === userId)?.email || '',
        phone: availableUsers.find(u => u.id === userId)?.phone || '',
        enrollmentDate: new Date().toISOString().split('T')[0],
        status: 'active',
        attendance: 100,
        grade: 0
      };

      setStudents({
        ...students,
        [selectedCourse]: [...(students[selectedCourse] || []), newStudent]
      });

      toast.success('Estudiante matriculado exitosamente');
    }
  };

  const exportStudentsToCSV = () => {
    if (!selectedCourse || !selectedCourseData) {
      toast.error('Selecciona un curso primero');
      return;
    }

    const headers = ['ID', 'Nombre', 'Email', 'Teléfono', 'Fecha de inscripción', 'Estado', 'Asistencia', 'Nota'];
    const data = currentStudents.map(student => [
      student.id,
      student.name,
      student.email,
      student.phone,
      student.enrollmentDate,
      student.status === 'active' ? 'Activo' : 'Inactivo',
      `${student.attendance}%`,
      student.grade.toFixed(1)
    ]);

    const csvContent = [headers.join(','), ...data.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `estudiantes_${selectedCourseData.code}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Lista de estudiantes exportada exitosamente');
  };

  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const filteredAvailableUsers = availableUsers.filter(user => {
    // Solo mostrar estudiantes activos
    if (user.role !== 'student' || user.status !== 'active') return false;
    
    // No mostrar usuarios ya matriculados en este curso
    const currentCourseStudents = selectedCourse ? (students[selectedCourse] || []) : [];
    if (currentCourseStudents.some(s => s.id === user.id)) return false;
    
    // Filtrar por búsqueda
    const matchesSearch = user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(userSearchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const removeStudent = (courseId: string, studentId: string) => {
    if (confirm('¿Estás seguro de eliminar este estudiante del curso?')) {
      setStudents({
        ...students,
        [courseId]: students[courseId].filter(s => s.id !== studentId)
      });
      toast.success('Estudiante eliminado del curso');
    }
  };

  const currentStudents = selectedCourse ? (students[selectedCourse] || []) : [];
  const filteredStudents = currentStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCourseData = courses.find(c => c.id === selectedCourse);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#0BDDB3] rounded-3xl p-8 text-white">
        <button
          onClick={onBack}
          className="mb-3 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-10 h-10" />
          <h1 className="text-4xl font-bold">Gestión de estudiantes</h1>
        </div>
      </div>

      {/* Course Selection */}
      {!selectedCourse ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Selecciona un Curso</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => setSelectedCourse(course.id)}
                className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-[#0B95BA] transition-all text-left group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#0B95BA]/10 rounded-xl flex items-center justify-center group-hover:bg-[#0B95BA] transition-colors">
                    <BookOpen className="w-6 h-6 text-[#0B95BA] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-mono font-medium">
                      {course.code}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-3 line-clamp-2">{course.name}</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Matriculados:</span>
                    <span className="font-bold text-gray-900">
                      {course.enrolledStudents} / {course.maxStudents}
                    </span>
                  </div>
                  
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        course.enrolledStudents >= course.maxStudents
                          ? 'bg-red-500'
                          : course.enrolledStudents >= course.maxStudents * 0.8
                          ? 'bg-amber-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${(course.enrolledStudents / course.maxStudents) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Course Info Bar */}
          <div className="bg-white rounded-2xl p-6 border-2 border-[#0B95BA]/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-mono font-medium">
                    {selectedCourseData?.code}
                  </span>
                  <h2 className="text-xl font-bold text-gray-900 mt-2">{selectedCourseData?.name}</h2>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Cupos disponibles</p>
                <p className="text-3xl font-bold text-gray-900">
                  {selectedCourseData ? selectedCourseData.maxStudents - selectedCourseData.enrolledStudents : 0}
                </p>
              </div>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={exportStudentsToCSV}
                  className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap border-2 border-gray-300 hover:border-gray-400"
                >
                  <Download className="w-5 h-5" />
                  Exportar
                </button>
                <button
                  onClick={() => setShowEnrollModal(true)}
                  className="px-6 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-xl transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Matricular estudiante
                </button>
              </div>
            </div>

            {/* Enrollment Form */}
            {showEnrollModal && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Seleccionar estudiantes</h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Selecciona los estudiantes que deseas matricular en {selectedCourseData?.name}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setShowEnrollModal(false);
                        setSelectedUsers([]);
                        setUserSearchTerm('');
                      }}
                      className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>

                  <div className="p-6">
                    {/* Search Bar */}
                    <div className="mb-6">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Buscar estudiantes por nombre o email..."
                          value={userSearchTerm}
                          onChange={(e) => setUserSearchTerm(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Selected Counter - Fixed Height */}
                    <div className="mb-4 h-14">
                      {selectedUsers.length > 0 && (
                        <div className="p-4 bg-gradient-to-r from-[#0B95BA] to-[#0BDDB3] rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckSquare className="w-5 h-5 text-white" />
                            <span className="font-medium text-white">
                              {selectedUsers.length} estudiante(s) seleccionado(s)
                            </span>
                          </div>
                          <button
                            onClick={() => setSelectedUsers([])}
                            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg transition-colors border border-white/30"
                          >
                            Limpiar selección
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Users List */}
                    <div className="space-y-3 mb-6">
                      {filteredAvailableUsers.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                          <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                          <p className="font-medium">No hay estudiantes disponibles</p>
                          <p className="text-sm">Todos los estudiantes activos ya están matriculados en este curso</p>
                        </div>
                      ) : (
                        filteredAvailableUsers.map((user) => {
                          const isSelected = selectedUsers.includes(user.id);
                          return (
                            <button
                              key={user.id}
                              onClick={() => toggleUserSelection(user.id)}
                              className={`w-full p-5 rounded-xl transition-all text-left ${
                                isSelected
                                  ? 'border-[3px] border-[#0B95BA] bg-white shadow-[0_0_0_3px_rgba(11,149,186,0.2)]'
                                  : 'border-2 border-gray-200 hover:border-[#0B95BA]/50'
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                {/* Checkbox */}
                                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                  isSelected
                                    ? 'bg-[#0B95BA] border-[#0B95BA]'
                                    : 'border-gray-300'
                                }`}>
                                  {isSelected && <Check className="w-4 h-4 text-white" />}
                                </div>

                                {/* Avatar */}
                                <div className="w-12 h-12 bg-gradient-to-br from-[#0B95BA] to-[#0BDDB3] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                  {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </div>

                                {/* User Info */}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-bold text-gray-900">{user.name}</h4>
                                  <div className="flex items-center gap-4 mt-1">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                      <Mail className="w-4 h-4" />
                                      <span className="truncate">{user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                      <Phone className="w-4 h-4" />
                                      <span>{user.phone}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Status Badge */}
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex-shrink-0">
                                  Activo
                                </span>
                              </div>
                            </button>
                          );
                        })
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => {
                          setShowEnrollModal(false);
                          setSelectedUsers([]);
                          setUserSearchTerm('');
                        }}
                        className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleEnrollStudent}
                        disabled={selectedUsers.length === 0}
                        className={`flex-1 px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                          selectedUsers.length === 0
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-[#0B95BA] text-white hover:bg-[#0B95BA]/90'
                        }`}
                      >
                        <UserCheck className="w-5 h-5" />
                        Matricular {selectedUsers.length > 0 && `(${selectedUsers.length})`}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Students List */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900">
                Estudiantes Matriculados ({filteredStudents.length})
              </h3>

              {filteredStudents.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>No se encontraron estudiantes</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className="p-5 border-2 border-gray-200 rounded-xl hover:border-[#0B95BA] transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#0B95BA] to-[#0BDDB3] rounded-full flex items-center justify-center text-white font-bold">
                            {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{student.name}</h4>
                            <p className="text-sm text-gray-600">
                              Matriculado: {new Date(student.enrollmentDate).toLocaleDateString('es-PE')}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            student.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {student.status === 'active' ? 'Activo' : 'Inactivo'}
                          </span>
                          <button
                            onClick={() => removeStudent(selectedCourse, student.id)}
                            className="p-2 bg-[#0B95BA] hover:bg-red-600 rounded-lg transition-colors border-2 border-[#0B95BA] hover:border-red-600"
                          >
                            <X className="w-5 h-5 text-white" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600 whitespace-nowrap">
                          <AtSign className="w-4 h-4 flex-shrink-0" style={{ color: '#0B95BA', stroke: '#0B95BA' }} />
                          <span><span className="text-gray-600">Correo:</span> <span className="text-gray-900">{student.email}</span></span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 whitespace-nowrap">
                          <Smartphone className="w-4 h-4 flex-shrink-0" style={{ color: '#0B95BA', stroke: '#0B95BA' }} />
                          <span><span className="text-gray-600">Celular:</span> <span className="text-gray-900">{student.phone}</span></span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 whitespace-nowrap">
                          <UserCheck className="w-4 h-4 flex-shrink-0" style={{ color: '#0B95BA', stroke: '#0B95BA' }} />
                          <span><span className="text-gray-600">Asistencia:</span> <span className="font-bold text-gray-900">{student.attendance}%</span></span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 whitespace-nowrap">
                          <Award className="w-4 h-4 flex-shrink-0" style={{ color: '#0B95BA', stroke: '#0B95BA' }} />
                          <span><span className="text-gray-600">Nota:</span> <span className="font-bold text-gray-900">{student.grade}/20</span></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}