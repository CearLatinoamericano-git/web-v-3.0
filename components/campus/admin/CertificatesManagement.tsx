import { useState } from 'react';
import {
  Search,
  User,
  FileText,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  FileBadge,
  BookOpen,
  Eye,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';

type CertificateStatus = 'generated' | 'pending' | 'not-available';
type CourseStatus = 'approved' | 'disapproved' | 'in-progress';

interface Certificate {
  certificateId?: string;
  status: CertificateStatus;
  generatedDate?: string;
  certificateUrl?: string;
}

interface Course {
  courseId: string;
  courseName: string;
  courseCode: string;
  finalGrade: number;
  status: CourseStatus;
  startDate: string;
  endDate?: string;
  totalHours: number;
  certificate: Certificate;
}

interface Student {
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentCode: string;
  studentPhoto?: string;
  courses: Course[];
}

interface CertificatesManagementProps {
  onBack?: () => void;
}

export function CertificatesManagement({ onBack }: CertificatesManagementProps = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Mock data - estudiantes con sus cursos y certificados
  const students: Student[] = [
    {
      studentId: 'EST-001',
      studentName: 'María González Pérez',
      studentEmail: 'maria.gonzalez@email.com',
      studentCode: 'EST-2024-001',
      courses: [
        {
          courseId: 'DACI-2024-02',
          courseName: 'Diplomado en Arbitraje Comercial Internacional',
          courseCode: 'DACI-2024-02',
          finalGrade: 16.5,
          status: 'approved',
          startDate: '15/09/2024',
          endDate: '15/12/2024',
          totalHours: 120,
          certificate: {
            certificateId: 'CERT-2024-001',
            status: 'generated',
            generatedDate: '20/12/2024',
            certificateUrl: '#'
          }
        },
        {
          courseId: 'CONT-2024-01',
          courseName: 'Curso de Especialización en Contratación Pública',
          courseCode: 'CONT-2024-01',
          finalGrade: 15.2,
          status: 'approved',
          startDate: '01/10/2024',
          endDate: '30/11/2024',
          totalHours: 80,
          certificate: {
            status: 'pending'
          }
        },
        {
          courseId: 'RESC-2024-01',
          courseName: 'Diplomado en Resolución de Controversias',
          courseCode: 'RESC-2024-01',
          finalGrade: 12.8,
          status: 'in-progress',
          startDate: '01/11/2024',
          totalHours: 100,
          certificate: {
            status: 'not-available'
          }
        }
      ]
    },
    {
      studentId: 'EST-002',
      studentName: 'Carlos Mendoza Silva',
      studentEmail: 'carlos.mendoza@email.com',
      studentCode: 'EST-2024-002',
      courses: [
        {
          courseId: 'DACI-2024-02',
          courseName: 'Diplomado en Arbitraje Comercial Internacional',
          courseCode: 'DACI-2024-02',
          finalGrade: 14.8,
          status: 'approved',
          startDate: '15/09/2024',
          endDate: '15/12/2024',
          totalHours: 120,
          certificate: {
            certificateId: 'CERT-2024-002',
            status: 'generated',
            generatedDate: '21/12/2024',
            certificateUrl: '#'
          }
        },
        {
          courseId: 'CONT-2024-01',
          courseName: 'Curso de Especialización en Contratación Pública',
          courseCode: 'CONT-2024-01',
          finalGrade: 10.5,
          status: 'disapproved',
          startDate: '01/10/2024',
          endDate: '30/11/2024',
          totalHours: 80,
          certificate: {
            status: 'not-available'
          }
        }
      ]
    },
    {
      studentId: 'EST-003',
      studentName: 'Ana Patricia Rojas',
      studentEmail: 'ana.rojas@email.com',
      studentCode: 'EST-2024-003',
      courses: [
        {
          courseId: 'DACI-2024-02',
          courseName: 'Diplomado en Arbitraje Comercial Internacional',
          courseCode: 'DACI-2024-02',
          finalGrade: 17.3,
          status: 'approved',
          startDate: '15/09/2024',
          endDate: '15/12/2024',
          totalHours: 120,
          certificate: {
            status: 'pending'
          }
        }
      ]
    },
    {
      studentId: 'EST-004',
      studentName: 'Roberto Fernández López',
      studentEmail: 'roberto.fernandez@email.com',
      studentCode: 'EST-2024-004',
      courses: [
        {
          courseId: 'DACI-2024-02',
          courseName: 'Diplomado en Arbitraje Comercial Internacional',
          courseCode: 'DACI-2024-02',
          finalGrade: 13.2,
          status: 'in-progress',
          startDate: '15/09/2024',
          totalHours: 120,
          certificate: {
            status: 'not-available'
          }
        },
        {
          courseId: 'RESC-2024-01',
          courseName: 'Diplomado en Resolución de Controversias',
          courseCode: 'RESC-2024-01',
          finalGrade: 16.5,
          status: 'approved',
          startDate: '01/08/2024',
          endDate: '30/10/2024',
          totalHours: 100,
          certificate: {
            certificateId: 'CERT-2024-003',
            status: 'generated',
            generatedDate: '05/11/2024',
            certificateUrl: '#'
          }
        }
      ]
    },
    {
      studentId: 'EST-005',
      studentName: 'Laura Martínez Castro',
      studentEmail: 'laura.martinez@email.com',
      studentCode: 'EST-2024-005',
      courses: [
        {
          courseId: 'CONT-2024-01',
          courseName: 'Curso de Especialización en Contratación Pública',
          courseCode: 'CONT-2024-01',
          finalGrade: 18.5,
          status: 'approved',
          startDate: '01/10/2024',
          endDate: '30/11/2024',
          totalHours: 80,
          certificate: {
            status: 'pending'
          }
        }
      ]
    }
  ];

  const filteredStudents = students.filter(student =>
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCourseStatusBadge = (status: CourseStatus) => {
    const styles = {
      approved: 'bg-green-100 text-green-700',
      disapproved: 'bg-red-100 text-red-700',
      'in-progress': 'bg-amber-100 text-amber-700'
    };

    const labels = {
      approved: 'Aprobado',
      disapproved: 'Desaprobado',
      'in-progress': 'En progreso'
    };

    const icons = {
      approved: CheckCircle,
      disapproved: XCircle,
      'in-progress': Clock
    };

    const Icon = icons[status];

    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-medium ${styles[status]}`}>
        <Icon className="w-4 h-4" />
        {labels[status]}
      </span>
    );
  };

  const getCertificateStatusBadge = (certificate: Certificate) => {
    if (certificate.status === 'generated') {
      return (
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
          <CheckCircle className="w-4 h-4" />
          Certificado generado
        </span>
      );
    } else if (certificate.status === 'pending') {
      return (
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">
          <Clock className="w-4 h-4" />
          Se generará automáticamente
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
          <XCircle className="w-4 h-4" />
          No disponible
        </span>
      );
    }
  };

  const handleDownloadCertificate = (courseName: string, certificateId: string) => {
    toast.success(`Descargando certificado de ${courseName}`);
    // Aquí se implementaría la descarga real del certificado
  };

  const handleViewCertificate = (courseName: string) => {
    toast.info(`Abriendo vista previa del certificado de ${courseName}`);
    // Aquí se abriría un modal con la vista previa del certificado
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
            <h1 className="text-4xl font-bold mb-2">Emisión de certificados</h1>
            <p className="text-xl opacity-90">Administre y descargue certificados de los estudiantes</p>
          </div>
          {selectedStudent && (
            <button
              onClick={() => setSelectedStudent(null)}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-medium transition-colors backdrop-blur-sm"
            >
              Volver al listado
            </button>
          )}
        </div>
      </div>

      {/* Student Selector */}
      {!selectedStudent && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Seleccionar estudiante</h2>
          
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, código o correo"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B95BA]"
            />
          </div>

          <div className="space-y-3">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <button
                  key={student.studentId}
                  onClick={() => setSelectedStudent(student)}
                  className="w-full p-5 rounded-xl border-2 border-gray-200 hover:border-[#0B95BA] hover:shadow-md transition-all text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-full flex items-center justify-center text-white flex-shrink-0">
                      <User className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{student.studentName}</h3>
                      <p className="text-sm text-gray-600">{student.studentCode} • {student.studentEmail}</p>
                    </div>
                    <FileBadge className="w-8 h-8 text-[#0B95BA] group-hover:scale-110 transition-transform" />
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No se encontraron estudiantes</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Student Courses and Certificates */}
      {selectedStudent && (
        <div className="space-y-6">
          {/* Student Info Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-full flex items-center justify-center text-white">
                  <User className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedStudent.studentName}</h2>
                  <p className="text-gray-600">{selectedStudent.studentCode} • {selectedStudent.studentEmail}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium"
              >
                Volver al listado
              </button>
            </div>
          </div>

          {/* Courses List */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Cursos y certificados</h3>
            
            <div className="space-y-4">
              {selectedStudent.courses.map((course) => (
                <div
                  key={course.courseId}
                  className={`p-6 rounded-2xl border-2 ${
                    course.status === 'approved' ? 'border-green-200 bg-green-50/30' :
                    course.status === 'disapproved' ? 'border-red-200 bg-red-50/30' :
                    'border-gray-200 bg-gray-50/30'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-[#0B95BA] rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      <BookOpen className="w-7 h-7" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 mb-1">{course.courseName}</h4>
                          <p className="text-sm text-gray-600">{course.courseCode}</p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-sm text-gray-600 mb-1">Calificación final</p>
                          <p className="text-3xl font-bold text-[#0B95BA]">{course.finalGrade.toFixed(1)}</p>
                        </div>
                      </div>

                      {/* Course Details */}
                      <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b-2 border-gray-200">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Estado del curso</p>
                          {getCourseStatusBadge(course.status)}
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Horas académicas</p>
                          <p className="font-medium text-gray-900">{course.totalHours} horas</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Fecha de inicio</p>
                          <p className="font-medium text-gray-900">{course.startDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Fecha de finalización</p>
                          <p className="font-medium text-gray-900">{course.endDate || 'En curso'}</p>
                        </div>
                      </div>

                      {/* Certificate Status and Actions */}
                      <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-700 mb-2">Estado del certificado</p>
                            {getCertificateStatusBadge(course.certificate)}
                            
                            {course.certificate.status === 'generated' && course.certificate.generatedDate && (
                              <p className="text-sm text-gray-600 mt-2">
                                Generado el {course.certificate.generatedDate}
                              </p>
                            )}
                            {course.certificate.status === 'generated' && course.certificate.certificateId && (
                              <p className="text-xs text-gray-500 mt-1">
                                ID: {course.certificate.certificateId}
                              </p>
                            )}
                            {course.certificate.status === 'pending' && course.status === 'approved' && (
                              <p className="text-sm text-gray-600 mt-2">
                                El certificado se generará automáticamente al finalizar el proceso de evaluación
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-3 ml-4">
                            {course.certificate.status === 'generated' ? (
                              <>
                                <button
                                  onClick={() => handleViewCertificate(course.courseName)}
                                  className="px-5 py-3 bg-white border-2 border-[#0B95BA] text-[rgb(255,255,255)] hover:bg-[#0B95BA] hover:text-white rounded-xl font-medium transition-all flex items-center gap-2"
                                >
                                  <Eye className="w-5 h-5" />
                                  Vista previa
                                </button>
                                <button
                                  onClick={() => handleDownloadCertificate(course.courseName, course.certificate.certificateId!)}
                                  className="px-5 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                                >
                                  <Download className="w-5 h-5" />
                                  Descargar
                                </button>
                              </>
                            ) : course.certificate.status === 'pending' && course.status === 'approved' ? (
                              <div className="text-center px-6 py-3 bg-amber-50 border-2 border-amber-200 text-amber-700 rounded-xl">
                                <p className="text-sm font-medium">Certificado en proceso</p>
                                <p className="text-xs mt-1">Se generará automáticamente</p>
                              </div>
                            ) : course.status === 'disapproved' ? (
                              <div className="text-center px-6 py-3 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl">
                                <p className="text-sm font-medium">Curso desaprobado</p>
                                <p className="text-xs mt-1">No se puede emitir certificado</p>
                              </div>
                            ) : (
                              <div className="text-center px-6 py-3 bg-gray-50 border-2 border-gray-200 text-gray-600 rounded-xl">
                                <p className="text-sm font-medium">Curso en progreso</p>
                                <p className="text-xs mt-1">Complete el curso para obtener certificado</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {selectedStudent.courses.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>Este estudiante no tiene cursos inscritos</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}