import { useState } from 'react';
import { Ticket, Plus, Search, Edit2, Trash2, Copy, Check, Calendar, DollarSign, Percent, Users, X, CheckCircle2, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  description: string;
  courses: string[];
  maxUses: number;
  currentUses: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'inactive';
}

// Lista de programas disponibles en CEAR
const availableCourses = [
  { id: 'arbitraje', name: 'Diplomado en Arbitraje' },
  { id: 'contratacion', name: 'Contratación Pública' },
  { id: 'controversias', name: 'Resolución de Controversias' },
  { id: 'administrativo', name: 'Derecho Administrativo' },
  { id: 'constitucional', name: 'Derecho Constitucional' },
  { id: 'procesal', name: 'Derecho Procesal' },
  { id: 'laboral', name: 'Derecho Laboral' },
  { id: 'tributario', name: 'Derecho Tributario' }
];

interface CoursesSelectorProps {
  selectedCourses: string[];
  onCoursesChange: (courses: string[]) => void;
}

function CoursesSelector({ selectedCourses, onCoursesChange }: CoursesSelectorProps) {
  const [applyToAll, setApplyToAll] = useState(selectedCourses.includes('Todos'));

  const handleToggleAll = () => {
    if (applyToAll) {
      onCoursesChange([]);
      setApplyToAll(false);
    } else {
      onCoursesChange(['Todos']);
      setApplyToAll(true);
    }
  };

  const handleToggleCourse = (courseName: string) => {
    if (applyToAll) {
      // Si está en "Todos", al seleccionar uno individual, quitar "Todos"
      setApplyToAll(false);
      onCoursesChange([courseName]);
    } else {
      if (selectedCourses.includes(courseName)) {
        onCoursesChange(selectedCourses.filter(c => c !== courseName));
      } else {
        onCoursesChange([...selectedCourses, courseName]);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Opción "Todos los programas" */}
      <div
        onClick={handleToggleAll}
        className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
          applyToAll
            ? 'border-[#0B95BA] bg-blue-50'
            : 'border-gray-200 hover:border-gray-300 bg-white'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
            applyToAll
              ? 'border-[#0B95BA] bg-[#0B95BA]'
              : 'border-gray-300'
          }`}>
            {applyToAll && <CheckCircle2 className="w-5 h-5 text-white" />}
          </div>
          <div className="flex-1">
            <p className={`font-bold ${applyToAll ? 'text-[#0B95BA]' : 'text-gray-900'}`}>
              Todos los programas
            </p>
            <p className="text-xs text-gray-600">
              El cupón se aplicará a cualquier programa.
            </p>
          </div>
        </div>
      </div>

      {/* Separador */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-sm text-gray-500">o selecciona programas específicos</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      {/* Lista de programas individuales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {availableCourses.map((course) => {
          const isSelected = !applyToAll && selectedCourses.includes(course.name);
          return (
            <div
              key={course.id}
              onClick={() => handleToggleCourse(course.name)}
              className={`border-2 rounded-xl p-3 cursor-pointer transition-all ${
                isSelected
                  ? 'border-[#0B95BA] bg-blue-50'
                  : applyToAll
                  ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  isSelected
                    ? 'border-[#0B95BA] bg-[#0B95BA]'
                    : 'border-gray-300'
                }`}>
                  {isSelected && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                </div>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <BookOpen className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-[#0B95BA]' : 'text-gray-400'}`} />
                  <p className={`text-sm font-medium truncate ${isSelected ? 'text-[#0B95BA]' : 'text-gray-700'}`}>
                    {course.name}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contador de programas seleccionados */}
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
        <span className="text-sm text-gray-600">
          Programas seleccionados:
        </span>
        <span className="text-sm font-bold text-[#0B95BA]">
          {applyToAll ? 'Todos (8)' : `${selectedCourses.length} de 8`}
        </span>
      </div>
    </div>
  );
}

export function CouponsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const coupons: Coupon[] = [
    {
      id: '1',
      code: 'ARBITRAJE2025',
      type: 'percentage',
      value: 20,
      description: 'Descuento especial para Diplomado en Arbitraje',
      courses: ['Diplomado en Arbitraje'],
      maxUses: 50,
      currentUses: 23,
      startDate: '2025-01-01',
      endDate: '2025-03-31',
      status: 'active'
    },
    {
      id: '2',
      code: 'EARLYBIRD',
      type: 'percentage',
      value: 15,
      description: 'Descuento por inscripción anticipada - Todos los programas',
      courses: ['Todos'],
      maxUses: 100,
      currentUses: 67,
      startDate: '2025-01-01',
      endDate: '2025-02-15',
      status: 'active'
    },
    {
      id: '3',
      code: 'CONTRATACION100',
      type: 'fixed',
      value: 100,
      description: 'Descuento fijo para curso de Contratación Pública',
      courses: ['Contratación Pública'],
      maxUses: 30,
      currentUses: 30,
      startDate: '2024-11-01',
      endDate: '2024-12-31',
      status: 'expired'
    },
    {
      id: '4',
      code: 'ALUMNI25',
      type: 'percentage',
      value: 25,
      description: 'Descuento exclusivo para exalumnos',
      courses: ['Todos'],
      maxUses: 200,
      currentUses: 45,
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      status: 'active'
    },
    {
      id: '5',
      code: 'GRUPAL30',
      type: 'percentage',
      value: 30,
      description: 'Descuento para inscripciones grupales (3+ personas)',
      courses: ['Todos'],
      maxUses: 50,
      currentUses: 12,
      startDate: '2025-01-15',
      endDate: '2025-06-30',
      status: 'active'
    },
    {
      id: '6',
      code: 'PROMO50',
      type: 'fixed',
      value: 50,
      description: 'Promoción especial fin de mes',
      courses: ['Resolución de Controversias', 'Derecho Administrativo'],
      maxUses: 20,
      currentUses: 8,
      startDate: '2025-11-20',
      endDate: '2025-11-30',
      status: 'active'
    }
  ];

  const filteredCoupons = coupons.filter(coupon => 
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coupon.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Coupon['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'expired':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'inactive':
        return 'bg-red-100 text-red-700 border-red-200';
    }
  };

  const getStatusLabel = (status: Coupon['status']) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'expired':
        return 'Expirado';
      case 'inactive':
        return 'Inactivo';
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success('✓ Código copiado al portapapeles', {
      description: code,
      duration: 2000,
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setSelectedCourses([]);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCourses.length === 0) {
      toast.error('Debe seleccionar al menos un programa para el cupón');
      return;
    }
    toast.success('✓ Cupón creado exitosamente', {
      description: 'El cupón está activo y puede ser utilizado',
      duration: 4000,
    });
    handleCloseModal();
  };

  const handleEditCoupon = (couponCode: string) => {
    toast.info(`Editando cupón: ${couponCode}`);
  };

  const handleDeleteCoupon = (couponCode: string) => {
    if (confirm('¿Está seguro de eliminar este cupón? Esta acción no se puede deshacer.')) {
      toast.success('✓ Cupón eliminado correctamente', {
        description: couponCode,
        duration: 3000,
      });
    }
  };

  const activeCount = coupons.filter(c => c.status === 'active').length;
  const totalUses = coupons.reduce((sum, c) => sum + c.currentUses, 0);
  const avgDiscount = Math.round(coupons.reduce((sum, c) => {
    if (c.type === 'percentage') return sum + c.value;
    return sum + 10; // Promedio aproximado para descuentos fijos
  }, 0) / coupons.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Ticket className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Gestión de cupones</h1>
          </div>
        </div>
        <p className="text-xl opacity-90">
          Administra cupones de descuento para los programas de CEAR LATINOAMERICANO.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#0EA5E9] text-white flex items-center justify-center flex-shrink-0">
            <Ticket className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900 text-[24px]">{activeCount}</p>
            <p className="text-xs text-gray-600 whitespace-nowrap text-[15px] mx-[-7px] my-[0px]">Cupones activos</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#10B981] text-white flex items-center justify-center flex-shrink-0">
            <Users className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900 text-[24px]">{totalUses}</p>
            <p className="text-xs text-gray-600 whitespace-nowrap text-[15px] mx-[-7px] my-[0px]">Total de usos</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#EAB308] text-white flex items-center justify-center flex-shrink-0">
            <Percent className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900 text-[24px]">{avgDiscount}%</p>
            <p className="text-xs text-gray-600 whitespace-nowrap text-[15px] mx-[-7px] my-[0px]">Descuento promedio</p>
          </div>
        </div>
      </div>

      {/* Buscador y botón crear */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar cupones por código o descripción"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-xl transition-colors flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Crear nuevo cupón
          </button>
        </div>
      </div>

      {/* Lista de cupones */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Cupones Disponibles</h2>
        
        <div className="space-y-4">
          {filteredCoupons.map((coupon) => (
            <div
              key={coupon.id}
              className="border border-gray-200 rounded-2xl p-6 hover:border-[#0B95BA] hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    coupon.status === 'active' ? 'bg-gradient-to-br from-[#0B95BA] to-[#087A98]' : 'bg-gray-400'
                  }`}>
                    <Ticket className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-xl text-gray-900">{coupon.code}</h3>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(coupon.status)}`}>
                        {getStatusLabel(coupon.status)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{coupon.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 mb-1">Tipo de descuento</p>
                        <div className="flex items-center gap-1 font-medium text-gray-900">
                          {coupon.type === 'percentage' ? (
                            <>
                              <Percent className="w-4 h-4 text-[#0B95BA]" />
                              <span>{coupon.value}%</span>
                            </>
                          ) : (
                            <>
                              <DollarSign className="w-4 h-4 text-[#0B95BA]" />
                              <span>S/ {coupon.value}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-500 mb-1">Usos</p>
                        <p className="font-medium text-gray-900">
                          {coupon.currentUses} / {coupon.maxUses}
                        </p>
                        <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                          <div
                            className="h-full bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-full"
                            style={{ width: `${(coupon.currentUses / coupon.maxUses) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-500 mb-1">Fecha inicio</p>
                        <div className="flex items-center gap-1 font-medium text-gray-900">
                          <Calendar className="w-4 h-4 text-[#0B95BA]" />
                          <span>{new Date(coupon.startDate).toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-500 mb-1">Fecha fin</p>
                        <div className="flex items-center gap-1 font-medium text-gray-900">
                          <Calendar className="w-4 h-4 text-[#0B95BA]" />
                          <span>{new Date(coupon.endDate).toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Programas aplicables:</p>
                      <div className="flex flex-wrap gap-2">
                        {coupon.courses.map((course, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg border border-blue-200">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleCopyCode(coupon.code)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors group relative"
                    title="Copiar código"
                  >
                    {copiedCode === coupon.code ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-600 group-hover:text-[#0B95BA]" />
                    )}
                  </button>
                  <button
                    onClick={() => handleEditCoupon(coupon.code)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                    title="Editar cupón"
                  >
                    <Edit2 className="w-5 h-5 text-gray-600 group-hover:text-[#0B95BA]" />
                  </button>
                  <button
                    onClick={() => handleDeleteCoupon(coupon.code)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                    title="Eliminar cupón"
                  >
                    <Trash2 className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal crear cupón */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-3xl z-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Crear nuevo cupón</h2>
                <p className="text-gray-600 mt-1">Completa los datos del cupón de descuento</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <form className="p-8 space-y-6" onSubmit={handleCreateCoupon}>
              {/* Código del cupón */}
              <div>
                <label className="block font-medium text-gray-900 mb-2">
                  Código del cupón *
                </label>
                <input
                  type="text"
                  placeholder="Ej: ARBITRAJE2025"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent uppercase"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  El código debe ser único y en mayúsculas.
                </p>
              </div>

              {/* Tipo y valor */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-900 mb-2">
                    Tipo de descuento *
                  </label>
                  <select className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent">
                    <option value="percentage">Porcentaje (%)</option>
                    <option value="fixed">Monto fijo (S/)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-gray-900 mb-2">
                    Valor *
                  </label>
                  <input
                    type="number"
                    placeholder="20"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Fechas */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-900 mb-2">
                    Fecha de inicio *
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-900 mb-2">
                    Fecha de fin *
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Usos máximos */}
              <div>
                <label className="block font-medium text-gray-900 mb-2">
                  Número máximo de usos *
                </label>
                <input
                  type="number"
                  placeholder="50"
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  required
                />
              </div>

              {/* Programas aplicables - Selector mejorado */}
              <div>
                <label className="block font-medium text-gray-900 mb-3">
                  Programas aplicables *
                </label>
                <CoursesSelector 
                  selectedCourses={selectedCourses}
                  onCoursesChange={setSelectedCourses}
                />
              </div>

              {/* Botones */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-6 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-xl transition-colors shadow-lg"
                >
                  Crear cupón
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}