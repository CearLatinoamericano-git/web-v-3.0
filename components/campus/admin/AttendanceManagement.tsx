import { useState } from 'react';
import { 
  ArrowLeft, 
  Users, 
  CheckCircle, 
  X, 
  AlertCircle,
  Calendar,
  Search,
  Download,
  Save,
  Clock,
  Check,
  ChevronDown,
  ChevronUp,
  Edit,
  TrendingUp,
  TrendingDown,
  BarChart3,
  FileSpreadsheet
} from 'lucide-react';
import { toast } from 'sonner';

interface AttendanceManagementProps {
  onBack: () => void;
}

interface Course {
  id: string;
  code: string;
  name: string;
  students: number;
}

interface Session {
  id: string;
  moduleNumber: number;
  moduleName: string;
  sessionNumber: number;
  sessionName: string;
  date: string;
  time: string;
  type: 'virtual' | 'presencial';
  teacher: string;
  attendanceRecorded: boolean; // Nuevo campo para indicar si ya se calificó
  recordedDate?: string; // Fecha en que se calificó
  recordedBy?: string; // Quién registró la asistencia
}

interface Student {
  id: string;
  name: string;
  email: string;
  code: string;
}

type AttendanceStatus = 'present' | 'absent' | 'late' | 'justified';

interface AttendanceRecord {
  studentId: string;
  status: AttendanceStatus;
  notes: string;
}

export function AttendanceManagement({ onBack }: AttendanceManagementProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, AttendanceRecord>>({});
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set([1, 2, 3]));
  const [viewMode, setViewMode] = useState<'register' | 'summary'>('register'); // Nueva vista
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'at-risk' | 'failed'>('all'); // Filtro de resumen
  const [selectedStudentDetail, setSelectedStudentDetail] = useState<Student | null>(null); // Para ver detalle del estudiante

  // Mock data
  const courses: Course[] = [
    { id: '1', code: 'DIPDERAD-2024-III', name: 'III Diplomado en Especialización de Derecho Administrativo para Árbitros', students: 45 },
    { id: '2', code: 'CEMEIP-2024-V1', name: 'Curso de Especialización en Mecanismos de Inversión Privada: APP, OXI y G2G', students: 52 },
    { id: '3', code: 'RESCONT-2024-V1', name: 'Diplomado en Resolución de Controversias', students: 38 }
  ];

  const sessions: Session[] = [
    {
      id: '1',
      moduleNumber: 1,
      moduleName: 'Fundamentos del Arbitraje',
      sessionNumber: 1,
      sessionName: 'Introducción al Sistema Arbitral',
      date: '2024-11-25',
      time: '18:00 - 20:00',
      type: 'virtual',
      teacher: 'Dr. Carlos Méndez',
      attendanceRecorded: true,
      recordedDate: '2024-11-25',
      recordedBy: 'Admin Principal'
    },
    {
      id: '2',
      moduleNumber: 1,
      moduleName: 'Fundamentos del Arbitraje',
      sessionNumber: 2,
      sessionName: 'Marco Legal del Arbitraje',
      date: '2024-11-27',
      time: '18:00 - 20:00',
      type: 'virtual',
      teacher: 'Dr. Carlos Méndez',
      attendanceRecorded: true,
      recordedDate: '2024-11-27',
      recordedBy: 'Admin Principal'
    },
    {
      id: '3',
      moduleNumber: 1,
      moduleName: 'Fundamentos del Arbitraje',
      sessionNumber: 3,
      sessionName: 'Cláusulas Arbitrales',
      date: '2024-11-29',
      time: '18:00 - 20:00',
      type: 'presencial',
      teacher: 'Dra. María González',
      attendanceRecorded: false
    },
    {
      id: '4',
      moduleNumber: 1,
      moduleName: 'Fundamentos del Arbitraje',
      sessionNumber: 4,
      sessionName: 'Arbitraje Nacional e Internacional',
      date: '2024-12-01',
      time: '18:00 - 20:00',
      type: 'virtual',
      teacher: 'Dr. Carlos Méndez',
      attendanceRecorded: false
    },
    {
      id: '5',
      moduleNumber: 2,
      moduleName: 'Procedimiento Arbitral',
      sessionNumber: 1,
      sessionName: 'Inicio del Procedimiento',
      date: '2024-12-02',
      time: '18:00 - 20:00',
      type: 'virtual',
      teacher: 'Dr. Javier Torres',
      attendanceRecorded: false
    },
    {
      id: '6',
      moduleNumber: 2,
      moduleName: 'Procedimiento Arbitral',
      sessionNumber: 2,
      sessionName: 'Etapa Probatoria',
      date: '2024-12-04',
      time: '18:00 - 20:00',
      type: 'presencial',
      teacher: 'Dr. Javier Torres',
      attendanceRecorded: false
    },
    {
      id: '7',
      moduleNumber: 2,
      moduleName: 'Procedimiento Arbitral',
      sessionNumber: 3,
      sessionName: 'Audiencias Arbitrales',
      date: '2024-12-06',
      time: '18:00 - 20:00',
      type: 'virtual',
      teacher: 'Dra. María González',
      attendanceRecorded: false
    },
    {
      id: '8',
      moduleNumber: 3,
      moduleName: 'Laudo Arbitral',
      sessionNumber: 1,
      sessionName: 'Elaboración del Laudo',
      date: '2024-12-09',
      time: '18:00 - 20:00',
      type: 'virtual',
      teacher: 'Dr. Carlos Méndez',
      attendanceRecorded: false
    },
    {
      id: '9',
      moduleNumber: 3,
      moduleName: 'Laudo Arbitral',
      sessionNumber: 2,
      sessionName: 'Recursos contra el Laudo',
      date: '2024-12-11',
      time: '18:00 - 20:00',
      type: 'presencial',
      teacher: 'Dr. Javier Torres',
      attendanceRecorded: false
    }
  ];

  const students: Student[] = [
    { id: '1', name: 'Juan Carlos Pérez García', email: 'juan.perez@email.com', code: 'EST-2024-001' },
    { id: '2', name: 'María Fernanda López Rodríguez', email: 'maria.lopez@email.com', code: 'EST-2024-002' },
    { id: '3', name: 'Carlos Alberto Ramírez Torres', email: 'carlos.ramirez@email.com', code: 'EST-2024-003' },
    { id: '4', name: 'Ana Patricia González Martínez', email: 'ana.gonzalez@email.com', code: 'EST-2024-004' },
    { id: '5', name: 'Roberto José Silva Hernández', email: 'roberto.silva@email.com', code: 'EST-2024-005' },
    { id: '6', name: 'Laura Isabel Morales Cruz', email: 'laura.morales@email.com', code: 'EST-2024-006' },
    { id: '7', name: 'Diego Fernando Castro Ruiz', email: 'diego.castro@email.com', code: 'EST-2024-007' },
    { id: '8', name: 'Gabriela Sofía Vargas Díaz', email: 'gabriela.vargas@email.com', code: 'EST-2024-008' }
  ];

  // Agrupar sesiones por módulo
  const groupedSessions = sessions.reduce((acc, session) => {
    if (!acc[session.moduleNumber]) {
      acc[session.moduleNumber] = {
        moduleName: session.moduleName,
        sessions: []
      };
    }
    acc[session.moduleNumber].sessions.push(session);
    return acc;
  }, {} as Record<number, { moduleName: string; sessions: Session[] }>);

  const toggleModule = (moduleNumber: number) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleNumber)) {
        newSet.delete(moduleNumber);
      } else {
        newSet.add(moduleNumber);
      }
      return newSet;
    });
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAttendanceChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        studentId,
        status,
        notes: prev[studentId]?.notes || ''
      }
    }));
  };

  const handleNotesChange = (studentId: string, notes: string) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        studentId,
        status: prev[studentId]?.status || 'absent',
        notes
      }
    }));
  };

  const handleMarkAll = (status: AttendanceStatus) => {
    const newRecords: Record<string, AttendanceRecord> = {};
    filteredStudents.forEach(student => {
      newRecords[student.id] = {
        studentId: student.id,
        status,
        notes: attendanceRecords[student.id]?.notes || ''
      };
    });
    setAttendanceRecords(newRecords);
    toast.success(`Todos los estudiantes marcados como ${
      status === 'present' ? 'presentes' : 
      status === 'absent' ? 'ausentes' : 
      status === 'late' ? 'tardanzas' : 'justificados'
    }`);
  };

  const handleSave = () => {
    const recordedCount = Object.keys(attendanceRecords).length;
    const pendingCount = students.length - recordedCount;
    
    if (pendingCount > 0) {
      const confirmed = window.confirm(
        `Hay ${pendingCount} estudiante(s) sin registro de asistencia.\n\n¿Desea continuar guardando?`
      );
      if (!confirmed) return;
    } else {
      const confirmed = window.confirm(
        selectedSession?.attendanceRecorded 
          ? `¿Confirma que desea actualizar la asistencia de esta sesión?\n\nSe modificarán ${recordedCount} registros.`
          : `¿Confirma que desea guardar la asistencia de esta sesión?\n\nSe guardarán ${recordedCount} registros.`
      );
      if (!confirmed) return;
    }
    
    if (selectedSession?.attendanceRecorded) {
      toast.success(`Asistencia actualizada exitosamente (${recordedCount} registros)`);
    } else {
      toast.success(`Asistencia registrada exitosamente (${recordedCount} registros)`);
    }
  };

  const getAttendanceStats = () => {
    const stats = {
      present: 0,
      absent: 0,
      late: 0,
      justified: 0,
      pending: students.length
    };

    Object.values(attendanceRecords).forEach(record => {
      stats[record.status]++;
      stats.pending--;
    });

    return stats;
  };

  const stats = getAttendanceStats();

  if (!selectedCourse) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
          <button
            onClick={onBack}
            className="mb-3 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
          <h1 className="text-4xl font-bold mb-2">Gestión de asistencias</h1>
          <p className="text-xl opacity-90">Seleccione un programa para registrar asistencias</p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <button
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              className="bg-white rounded-2xl border-2 border-gray-200 hover:border-[#0B95BA] p-6 text-left transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[#0B95BA] font-medium mb-1">{course.code}</p>
                  <h3 className="font-bold text-gray-900 mb-2">{course.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{course.students} estudiantes</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (!selectedSession) {
    const totalSessions = sessions.length;
    const recordedSessions = sessions.filter(s => s.attendanceRecorded).length;

    // Mock data para resumen de asistencias - EN PRODUCCIÓN vendría de la BD
    const attendanceSummary = students.map(student => {
      // Simulación de asistencias
      const totalSessions = sessions.length; // 9 sesiones
      const attended = student.id === '1' ? 9 : 
                      student.id === '2' ? 8 :
                      student.id === '3' ? 7 :
                      student.id === '4' ? 6 :
                      student.id === '5' ? 5 :
                      student.id === '6' ? 7 :
                      student.id === '7' ? 8 :
                      9;
      const percentage = Math.round((attended / totalSessions) * 100);
      const minRequired = 70; // Pensum del programa
      
      let status: 'approved' | 'at-risk' | 'failed';
      if (percentage >= minRequired) {
        status = 'approved';
      } else if (percentage >= minRequired - 10) {
        status = 'at-risk';
      } else {
        status = 'failed';
      }

      return {
        ...student,
        totalSessions,
        attended,
        percentage,
        status,
        absences: totalSessions - attended
      };
    });

    const summaryStats = {
      total: students.length,
      approved: attendanceSummary.filter(s => s.status === 'approved').length,
      atRisk: attendanceSummary.filter(s => s.status === 'at-risk').length,
      failed: attendanceSummary.filter(s => s.status === 'failed').length,
      averageAttendance: Math.round(attendanceSummary.reduce((sum, s) => sum + s.percentage, 0) / students.length)
    };

    const filteredSummary = attendanceSummary.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Vista de Resumen General
    if (viewMode === 'summary') {
      // Si hay un estudiante seleccionado, mostrar vista de detalle
      if (selectedStudentDetail) {
        // Mock data de asistencia por sesión - EN PRODUCCIÓN vendría de la BD
        const studentAttendanceDetail = sessions.map(session => {
          // Simulación de estados de asistencia por estudiante y sesión
          const getStatus = (): AttendanceStatus | null => {
            if (!session.attendanceRecorded) return null; // Sesión sin calificar
            
            // Patrones simulados diferentes por estudiante
            if (selectedStudentDetail.id === '1') return 'present'; // Siempre presente
            if (selectedStudentDetail.id === '2') return session.id === '2' ? 'absent' : 'present'; // 1 falta
            if (selectedStudentDetail.id === '3') return ['2', '8'].includes(session.id) ? 'absent' : 'present'; // 2 faltas
            if (selectedStudentDetail.id === '4') return ['2', '3', '7'].includes(session.id) ? 'absent' : 'present'; // 3 faltas
            if (selectedStudentDetail.id === '5') return ['1', '2', '4', '8'].includes(session.id) ? 'absent' : 'present'; // 4 faltas
            if (selectedStudentDetail.id === '6') return ['3', '6'].includes(session.id) ? 'late' : 'present'; // 2 tardanzas
            if (selectedStudentDetail.id === '7') return session.id === '5' ? 'justified' : 'present'; // 1 justificado
            return 'present';
          };

          return {
            ...session,
            attendanceStatus: getStatus()
          };
        });

        // Calcular estadísticas del estudiante
        const totalSessions = sessions.length;
        const recordedSessions = sessions.filter(s => s.attendanceRecorded).length;
        const present = studentAttendanceDetail.filter(s => s.attendanceStatus === 'present').length;
        const absent = studentAttendanceDetail.filter(s => s.attendanceStatus === 'absent').length;
        const late = studentAttendanceDetail.filter(s => s.attendanceStatus === 'late').length;
        const justified = studentAttendanceDetail.filter(s => s.attendanceStatus === 'justified').length;
        const percentage = recordedSessions > 0 ? Math.round((present / recordedSessions) * 100) : 0;

        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedStudentDetail(null)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">Detalle de asistencia</h1>
                <p className="text-gray-600 mt-1">{selectedCourse.name}</p>
              </div>
            </div>

            {/* Student Info Card */}
            <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">Estudiante</p>
                  <h2 className="text-2xl font-bold mb-1">{selectedStudentDetail.name}</h2>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="opacity-90">{selectedStudentDetail.email}</span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg font-medium">
                      {selectedStudentDetail.code}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90 mb-1">Asistencia general</p>
                  <p className="text-4xl font-bold">{percentage}%</p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white rounded-2xl p-4 border-2 border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <FileSpreadsheet className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{totalSessions}</p>
                    <p className="text-xs text-gray-600">Total sesiones</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 border-2 border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-900">{present}</p>
                    <p className="text-xs text-green-700">Presente</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-4 border-2 border-red-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                    <X className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-900">{absent}</p>
                    <p className="text-xs text-red-700">Ausente</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-4 border-2 border-amber-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-amber-900">{late}</p>
                    <p className="text-xs text-amber-700">Tardanza</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 border-2 border-gray-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-400 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{justified}</p>
                    <p className="text-xs text-gray-600">Justificado</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sessions Detail Table */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
              <div className="p-4 border-b-2 border-gray-200">
                <h3 className="font-bold text-gray-900">Historial de asistencia por sesión</h3>
                <p className="text-sm text-gray-600 mt-1">Registro detallado de todas las sesiones del programa</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Módulo</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Sesión</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Fecha</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Tipo</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {studentAttendanceDetail.map((session, index) => {
                      const statusConfig = {
                        present: {
                          bg: 'bg-green-100',
                          text: 'text-green-700',
                          border: 'border-green-200',
                          label: 'Presente',
                          icon: CheckCircle
                        },
                        absent: {
                          bg: 'bg-red-100',
                          text: 'text-red-700',
                          border: 'border-red-200',
                          label: 'Ausente',
                          icon: X
                        },
                        late: {
                          bg: 'bg-amber-100',
                          text: 'text-amber-700',
                          border: 'border-amber-200',
                          label: 'Tardanza',
                          icon: AlertCircle
                        },
                        justified: {
                          bg: 'bg-gray-100',
                          text: 'text-gray-700',
                          border: 'border-gray-300',
                          label: 'Justificado',
                          icon: Clock
                        }
                      };

                      const config = session.attendanceStatus ? statusConfig[session.attendanceStatus] : null;
                      const StatusIcon = config?.icon;

                      return (
                        <tr key={session.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-xs">{session.moduleNumber}</span>
                              </div>
                              <span className="text-sm text-gray-900 font-medium">{session.moduleName}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-gray-900">Sesión {session.sessionNumber}</p>
                              <p className="text-sm text-gray-600">{session.sessionName}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(session.date).toLocaleDateString('es-PE', { 
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center">
                              <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                                session.type === 'virtual' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-orange-100 text-orange-700'
                              }`}>
                                {session.type === 'virtual' ? 'Virtual' : 'Presencial'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center">
                              {session.attendanceStatus && config && StatusIcon ? (
                                <span className={`px-4 py-2 rounded-xl border-2 ${config.bg} ${config.text} ${config.border} font-medium text-sm flex items-center gap-2`}>
                                  <StatusIcon className="w-4 h-4" />
                                  {config.label}
                                </span>
                              ) : (
                                <span className="px-4 py-2 rounded-xl border-2 bg-gray-100 text-gray-600 border-gray-200 font-medium text-sm">
                                  Por registrar
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Export Button */}
            <div className="flex justify-end">
              <button
                onClick={() => toast.success('Exportando detalle de asistencia...')}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Exportar detalle del estudiante
              </button>
            </div>
          </div>
        );
      }

      return (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedCourse(null)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Resumen general de asistencias</h1>
                <p className="text-gray-600 mt-1">{selectedCourse.name}</p>
              </div>
            </div>
            <button
              onClick={() => setViewMode('register')}
              className="px-6 py-2 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-xl transition-colors flex items-center gap-2"
            >
              <FileSpreadsheet className="w-5 h-5" />
              Ver registro por sesión
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por nombre, código o correo"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                />
              </div>
              
              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                    statusFilter === 'all'
                      ? 'bg-[#0B95BA] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setStatusFilter('approved')}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                    statusFilter === 'approved'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Aprobados
                </button>
                <button
                  onClick={() => setStatusFilter('at-risk')}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                    statusFilter === 'at-risk'
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  En riesgo
                </button>
                <button
                  onClick={() => setStatusFilter('failed')}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                    statusFilter === 'failed'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Reprobados
                </button>
              </div>
            </div>
          </div>

          {/* Summary Table */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
            <div className="p-4 border-b-2 border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Haga clic en cualquier estudiante</span> para ver el detalle completo de asistencia por sesión.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">Estudiante</th>
                    <th className="px-3 py-4 text-left text-sm font-bold text-gray-900">Código</th>
                    <th className="px-3 py-4 text-center text-sm font-bold text-gray-900 whitespace-nowrap">Sesiones totales</th>
                    <th className="px-3 py-4 text-center text-sm font-bold text-gray-900">Asistencias</th>
                    <th className="px-3 py-4 text-center text-sm font-bold text-gray-900">Inasistencias</th>
                    <th className="px-3 py-4 text-center text-sm font-bold text-gray-900 whitespace-nowrap">% Asistencia</th>
                    <th className="px-3 py-4 text-center text-sm font-bold text-gray-900">Estado</th>
                    <th className="px-3 py-4 text-center text-sm font-bold text-gray-900">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSummary.map((student, index) => {
                    const statusConfig = {
                      approved: {
                        bg: 'bg-green-50',
                        text: 'text-green-700',
                        badge: 'bg-green-100 border-green-200',
                        label: 'Aprobado',
                        icon: CheckCircle
                      },
                      'at-risk': {
                        bg: 'bg-amber-50',
                        text: 'text-amber-700',
                        badge: 'bg-amber-100 border-amber-200',
                        label: 'En riesgo',
                        icon: AlertCircle
                      },
                      failed: {
                        bg: 'bg-red-50',
                        text: 'text-red-700',
                        badge: 'bg-red-100 border-red-200',
                        label: 'Reprobado',
                        icon: X
                      }
                    };
                    
                    const config = statusConfig[student.status];
                    const StatusIcon = config.icon;

                    return (
                      <tr 
                        key={student.id} 
                        onClick={() => setSelectedStudentDetail(student)}
                        className="cursor-pointer transition-colors hover:bg-gray-100 bg-white border-b border-gray-100"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="min-w-0">
                              <p className="font-medium text-gray-900 whitespace-nowrap">{student.name}</p>
                              <p className="text-xs text-gray-600 whitespace-nowrap">{student.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <span className="font-mono text-sm text-gray-600 whitespace-nowrap">{student.code}</span>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <span className="font-bold text-gray-900 whitespace-nowrap">{student.totalSessions}</span>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <span className="font-bold text-green-600 whitespace-nowrap">{student.attended}</span>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <span className="font-bold text-red-600 whitespace-nowrap">{student.absences}</span>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className={`text-xl font-bold ${config.text} whitespace-nowrap`}>
                              {student.percentage}%
                            </span>
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  student.status === 'approved' ? 'bg-green-600' :
                                  student.status === 'at-risk' ? 'bg-amber-600' :
                                  'bg-red-600'
                                }`}
                                style={{ width: `${student.percentage}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex justify-center">
                            <span className={`px-3 py-1.5 rounded-lg border ${config.badge} ${config.text} font-medium text-xs flex items-center gap-1.5 whitespace-nowrap`} >
                              <StatusIcon className="w-3.5 h-3.5" />
                              {config.label}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex justify-center">
                            <span className="text-[#0B95BA] font-medium text-sm flex items-center gap-1.5 whitespace-nowrap">
                              Ver detalle
                              <ArrowLeft className="w-4 h-4 rotate-180" />
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Export Button */}
          <div className="flex justify-end">
            <button
              onClick={() => toast.success('Exportando resumen de asistencias...')}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Exportar resumen completo
            </button>
          </div>
        </div>
      );
    }

    // Vista de Registro por Sesión (original)
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedCourse(null)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{selectedCourse.name}</h1>
              <p className="text-gray-600 mt-1">Seleccione una sesión para registrar asistencia</p>
            </div>
          </div>
          <button
            onClick={() => setViewMode('summary')}
            className="px-8 py-2 bg-gradient-to-r from-[#0B95BA] to-[#087A98] hover:opacity-90 text-white font-medium rounded-xl transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <BarChart3 className="w-5 h-5" />
            Ver resumen general
          </button>
        </div>

        {/* Progress Stats */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Progreso de registro de asistencias</h3>
            <span className="text-sm text-gray-600">
              {recordedSessions} de {totalSessions} sesiones registradas
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
              style={{ width: `${(recordedSessions / totalSessions) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-right">
            <span className="font-bold text-green-600">
              {Math.round((recordedSessions / totalSessions) * 100)}% completado
            </span>
          </div>
        </div>

        {/* Sessions grouped by Module */}
        <div className="space-y-4">
          {Object.entries(groupedSessions)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([moduleNumber, moduleData]) => {
              const isExpanded = expandedModules.has(Number(moduleNumber));
              const moduleSessions = moduleData.sessions;
              const recordedCount = moduleSessions.filter(s => s.attendanceRecorded).length;

              return (
                <div key={moduleNumber} className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
                  {/* Module Header */}
                  <button
                    onClick={() => toggleModule(Number(moduleNumber))}
                    className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">{moduleNumber}</span>
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-gray-900 text-lg">
                          Módulo {moduleNumber}: {moduleData.moduleName}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {moduleSessions.length} sesiones • {recordedCount} registradas
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {recordedCount}/{moduleSessions.length}
                        </div>
                        <div className="text-xs text-gray-600">completadas</div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-6 h-6 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {/* Module Sessions */}
                  {isExpanded && (
                    <div className="border-t-2 border-gray-200">
                      {moduleSessions.map(session => (
                        <div
                          key={session.id}
                          className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                        >
                          <button
                            onClick={() => setSelectedSession(session)}
                            className="w-full p-5 text-left"
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">
                                    Sesión {session.sessionNumber}
                                  </span>
                                  <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                                    session.type === 'virtual' 
                                      ? 'bg-green-100 text-green-700' 
                                      : 'bg-orange-100 text-orange-700'
                                  }`}>
                                    {session.type === 'virtual' ? 'Virtual' : 'Presencial'}
                                  </span>
                                  {session.attendanceRecorded && (
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium flex items-center gap-1">
                                      <Check className="w-3 h-3" />
                                      Asistencia registrada
                                    </span>
                                  )}
                                  {!session.attendanceRecorded && (
                                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-medium">
                                      Pendiente
                                    </span>
                                  )}
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">{session.sessionName}</h4>
                                <div className="flex items-center gap-6 text-sm text-gray-600">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(session.date).toLocaleDateString('es-PE', { 
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric'
                                    })}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{session.time}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    <span>{session.teacher}</span>
                                  </div>
                                </div>
                                {session.attendanceRecorded && session.recordedDate && (
                                  <p className="text-xs text-gray-500 mt-2">
                                    Registrado el {new Date(session.recordedDate).toLocaleDateString('es-PE')} por {session.recordedBy}
                                  </p>
                                )}
                              </div>
                              {session.attendanceRecorded ? (
                                <div className="flex items-center gap-2 text-sm text-blue-600">
                                  <Edit className="w-4 h-4" />
                                  <span className="font-medium">Modificar</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 text-sm text-[#0B95BA]">
                                  <Check className="w-4 h-4" />
                                  <span className="font-medium">Registrar</span>
                                </div>
                              )}
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSelectedSession(null)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold text-gray-900">
                {selectedSession.attendanceRecorded ? 'Modificar asistencia' : 'Registrar asistencia'}
              </h1>
              {selectedSession.attendanceRecorded && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Modo edición
                </span>
              )}
            </div>
            <p className="text-gray-600">
              {selectedSession.sessionName} - {new Date(selectedSession.date).toLocaleDateString('es-PE')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {/* Export functionality */}}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Exportar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-xl transition-colors flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            {selectedSession.attendanceRecorded ? 'Actualizar asistencia' : 'Guardar asistencia'}
          </button>
        </div>
      </div>

      {/* Attendance Already Recorded Alert */}
      {selectedSession.attendanceRecorded && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-blue-900 mb-1">Asistencia previamente registrada</h3>
              <p className="text-sm text-blue-700">
                Esta sesión ya tiene asistencia registrada el {new Date(selectedSession.recordedDate!).toLocaleDateString('es-PE')} por {selectedSession.recordedBy}. 
                Puede modificar los registros y guardar los cambios.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Session Info Card */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium">
                Módulo {selectedSession.moduleNumber}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium">
                Sesión {selectedSession.sessionNumber}
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-1">{selectedSession.sessionName}</h2>
            <p className="text-white/90">{selectedSession.moduleName}</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Docente</p>
            <p className="font-bold text-lg">{selectedSession.teacher}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl p-4 border-2 border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{students.length}</p>
              <p className="text-xs text-gray-600">Total</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 border-2 border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-900">{stats.present}</p>
              <p className="text-xs text-green-700">Presentes</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-4 border-2 border-red-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
              <X className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-900">{stats.absent}</p>
              <p className="text-xs text-red-700">Ausentes</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-4 border-2 border-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-900">{stats.late}</p>
              <p className="text-xs text-amber-700">Tardanzas</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border-2 border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-900">{stats.pending}</p>
              <p className="text-xs text-blue-700">Pendientes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Acciones rápidas</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleMarkAll('present')}
              className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 font-medium rounded-lg transition-colors text-sm"
            >
              Marcar todos presentes
            </button>
            <button
              onClick={() => handleMarkAll('absent')}
              className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-lg transition-colors text-sm"
            >
              Marcar todos ausentes
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, código o correo"
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
          />
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Estudiante</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Código</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Observaciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student, index) => {
                const record = attendanceRecords[student.id];
                const status = record?.status;

                return (
                  <tr key={student.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{student.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-gray-600">{student.code}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleAttendanceChange(student.id, 'present')}
                          className={`p-2 rounded-lg transition-all ${
                            status === 'present'
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-600'
                          }`}
                          title="Presente"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleAttendanceChange(student.id, 'absent')}
                          className={`p-2 rounded-lg transition-all ${
                            status === 'absent'
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-600'
                          }`}
                          title="Ausente"
                        >
                          <X className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleAttendanceChange(student.id, 'late')}
                          className={`p-2 rounded-lg transition-all ${
                            status === 'late'
                              ? 'bg-amber-600 text-white'
                              : 'bg-gray-100 text-gray-400 hover:bg-amber-100 hover:text-amber-600'
                          }`}
                          title="Tardanza"
                        >
                          <AlertCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleAttendanceChange(student.id, 'justified')}
                          className={`p-2 rounded-lg transition-all ${
                            status === 'justified'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-400 hover:bg-blue-100 hover:text-blue-600'
                          }`}
                          title="Justificado"
                        >
                          <Clock className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={record?.notes || ''}
                        onChange={(e) => handleNotesChange(student.id, e.target.value)}
                        placeholder="Agregar observación..."
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save Button Bottom */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-xl transition-colors flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          {selectedSession.attendanceRecorded ? 'Actualizar asistencia' : 'Guardar asistencia'}
        </button>
      </div>
    </div>
  );
}