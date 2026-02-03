import { useState } from 'react';
import { ArrowLeft, Users, Plus, Edit, Trash2, Search, UserCheck, Mail, Phone, Award, Eye, Upload, FileText, Download, X, Calendar, BookOpen, Clock } from 'lucide-react';
import { TeacherProfile } from './TeacherProfile';

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  degree: string;
  status: 'active' | 'inactive';
  coursesAssigned: number;
  photo?: string;
  cvUrl?: string;
  bio?: string;
  courseHistory?: CourseAssignment[];
}

interface CourseAssignment {
  id: string;
  courseCode: string;
  courseName: string;
  module: string;
  session: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed';
  hoursAssigned: number;
}

interface TeacherRegistrationProps {
  onBack: () => void;
}

export function TeacherRegistration({ onBack }: TeacherRegistrationProps) {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    degree: '',
    status: 'active' as 'active' | 'inactive'
  });

  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: '1',
      name: 'Dr. Carlos Méndez',
      email: 'carlos.mendez@cear.edu.pe',
      phone: '+51 987 654 321',
      specialization: 'Arbitraje Comercial Internacional',
      degree: 'Doctor en Derecho',
      status: 'active',
      coursesAssigned: 3
    },
    {
      id: '2',
      name: 'Dra. María González',
      email: 'maria.gonzalez@cear.edu.pe',
      phone: '+51 987 654 322',
      specialization: 'Contratación Pública',
      degree: 'Doctora en Derecho Administrativo',
      status: 'active',
      coursesAssigned: 2
    },
    {
      id: '3',
      name: 'Dr. Javier Torres',
      email: 'javier.torres@cear.edu.pe',
      phone: '+51 987 654 323',
      specialization: 'Resolución de Controversias',
      degree: 'Doctor en Derecho Internacional',
      status: 'active',
      coursesAssigned: 2
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTeacher: Teacher = {
      id: String(teachers.length + 1),
      ...formData,
      coursesAssigned: 0
    };
    
    setTeachers([...teachers, newTeacher]);
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialization: '',
      degree: '',
      status: 'active'
    });
    setShowForm(false);
  };

  const deleteTeacher = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este docente?')) {
      setTeachers(teachers.filter(t => t.id !== id));
    }
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateTeacher = (updatedTeacher: Teacher) => {
    setTeachers(teachers.map(t => t.id === updatedTeacher.id ? updatedTeacher : t));
  };

  // Si hay un docente seleccionado, mostrar su perfil
  if (selectedTeacher) {
    return (
      <TeacherProfile
        teacher={selectedTeacher}
        onBack={() => setSelectedTeacher(null)}
        onUpdate={handleUpdateTeacher}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-8 text-white">
        <button
          onClick={onBack}
          className="mb-3 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-10 h-10" />
          <h1 className="text-4xl font-bold">Gestión de docentes</h1>
        </div>
        <p className="text-xl opacity-90">Registra y administra la plana docente</p>
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
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Registrar docente
          </button>
        </div>

        {/* Teachers List */}
        <div className="bg-white rounded-2xl border border-gray-200">
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 px-[0px] py-[13px] mt-[0px] mr-[0px] mb-[18px] ml-[22px]">
              Docentes registrados ({filteredTeachers.length})
            </h3>

            {filteredTeachers.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No se encontraron docentes</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTeachers.map((teacher) => (
                  <div
                    key={teacher.id}
                    className="p-5 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            {teacher.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{teacher.name}</h4>
                            <p className="text-sm text-gray-600">{teacher.degree}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            teacher.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {teacher.status === 'active' ? 'Activo' : 'Inactivo'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Mail className="w-5 h-5 flex-shrink-0" style={{ stroke: '#0B95BA', fill: 'none' }} />
                            <span>{teacher.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone className="w-5 h-5 flex-shrink-0" style={{ stroke: '#0B95BA', fill: 'none' }} />
                            <span>{teacher.phone}</span>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-900">{teacher.coursesAssigned}</span> curso(s) asignado(s)
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => setSelectedTeacher(teacher)}
                          className="p-2 bg-[#0B95BA] hover:bg-[#087A98] rounded-lg transition-colors group"
                          title="Editar información"
                        >
                          <Edit className="w-5 h-5 text-white" />
                        </button>
                        <button
                          onClick={() => deleteTeacher(teacher.id)}
                          className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors group"
                          title="Eliminar docente"
                        >
                          <Trash2 className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de registro */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Plus className="w-6 h-6" />
                  <h2 className="text-2xl font-bold">Registrar nuevo docente</h2>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dr. Juan Pérez"
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="juan.perez@cear.edu.pe"
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+51 987 654 321"
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grado académico *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    placeholder="Doctor en Derecho"
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Especialización *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    placeholder="Arbitraje Comercial"
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Guardar docente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}