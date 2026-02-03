import { useState } from 'react';
import {
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  AlertTriangle,
  Calendar,
  User,
  Eye,
  Download,
  FileText,
  TrendingUp,
  ChevronRight,
  Mail,
  X,
  List
} from 'lucide-react';
import { toast } from 'sonner';

type PaymentStatus = 'paid' | 'pending' | 'overdue' | 'upcoming';

interface PaymentInstallment {
  number: number;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: PaymentStatus;
  paymentMethod?: string;
  transactionId?: string;
  voucherType?: 'Boleta' | 'Factura';
}

interface StudentPayment {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentCode: string;
  courseName: string;
  courseCode: string;
  totalAmount: number;
  totalInstallments: number;
  paidInstallments: number;
  nextPaymentDate: string;
  installments: PaymentInstallment[];
  enrollmentDate: string;
  discount?: number;
}

export function PaymentsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'on-time' | 'upcoming' | 'overdue'>('all');
  const [selectedStudent, setSelectedStudent] = useState<StudentPayment | null>(null);
  const [viewMode, setViewMode] = useState<'timeline' | 'table'>('timeline');

  // Mock data - En producción vendría de la API
  const studentsPayments: StudentPayment[] = [
    {
      id: 'PAY-001',
      studentId: 'EST-001',
      studentName: 'María González Pérez',
      studentEmail: 'maria.gonzalez@email.com',
      studentCode: 'EST-2024-001',
      courseName: 'Diplomado en Arbitraje Comercial Internacional',
      courseCode: 'DACI-2024-02',
      totalAmount: 3600,
      totalInstallments: 6,
      paidInstallments: 3,
      nextPaymentDate: '05/12/2024',
      enrollmentDate: '01/08/2024',
      discount: 10,
      installments: [
        {
          number: 1,
          amount: 600,
          dueDate: '05/08/2024',
          paidDate: '03/08/2024',
          status: 'paid',
          paymentMethod: 'Visa',
          transactionId: 'TXN-001-001',
          voucherType: 'Boleta'
        },
        {
          number: 2,
          amount: 600,
          dueDate: '05/09/2024',
          paidDate: '04/09/2024',
          status: 'paid',
          paymentMethod: 'Mastercard',
          transactionId: 'TXN-001-002',
          voucherType: 'Boleta'
        },
        {
          number: 3,
          amount: 600,
          dueDate: '05/10/2024',
          paidDate: '05/10/2024',
          status: 'paid',
          paymentMethod: 'Yape',
          transactionId: 'TXN-001-003',
          voucherType: 'Factura'
        },
        {
          number: 4,
          amount: 600,
          dueDate: '05/11/2024',
          paidDate: '06/11/2024',
          status: 'paid',
          paymentMethod: 'Transferencia',
          transactionId: 'TXN-001-004',
          voucherType: 'Factura'
        },
        {
          number: 5,
          amount: 600,
          dueDate: '05/12/2024',
          status: 'upcoming'
        },
        {
          number: 6,
          amount: 600,
          dueDate: '05/01/2025',
          status: 'pending'
        }
      ]
    },
    {
      id: 'PAY-002',
      studentId: 'EST-002',
      studentName: 'Carlos Mendoza Silva',
      studentEmail: 'carlos.mendoza@email.com',
      studentCode: 'EST-2024-002',
      courseName: 'Diplomado en Contratación Pública',
      courseCode: 'DCP-2024-02',
      totalAmount: 2400,
      totalInstallments: 4,
      paidInstallments: 2,
      nextPaymentDate: '28/11/2024',
      enrollmentDate: '15/08/2024',
      installments: [
        {
          number: 1,
          amount: 600,
          dueDate: '20/08/2024',
          paidDate: '18/08/2024',
          status: 'paid',
          paymentMethod: 'Visa',
          transactionId: 'TXN-002-001',
          voucherType: 'Boleta'
        },
        {
          number: 2,
          amount: 600,
          dueDate: '20/09/2024',
          paidDate: '22/09/2024',
          status: 'paid',
          paymentMethod: 'Visa',
          transactionId: 'TXN-002-002',
          voucherType: 'Boleta'
        },
        {
          number: 3,
          amount: 600,
          dueDate: '28/11/2024',
          status: 'overdue'
        },
        {
          number: 4,
          amount: 600,
          dueDate: '20/12/2024',
          status: 'pending'
        }
      ]
    },
    {
      id: 'PAY-003',
      studentId: 'EST-003',
      studentName: 'Ana Rodríguez Torres',
      studentEmail: 'ana.rodriguez@email.com',
      studentCode: 'EST-2024-003',
      courseName: 'Especialización en Resolución de Controversias',
      courseCode: 'ERC-2024-02',
      totalAmount: 4800,
      totalInstallments: 8,
      paidInstallments: 8,
      nextPaymentDate: '-',
      enrollmentDate: '01/06/2024',
      discount: 15,
      installments: Array.from({ length: 8 }, (_, i) => ({
        number: i + 1,
        amount: 600,
        dueDate: `05/${(6 + i).toString().padStart(2, '0')}/2024`,
        paidDate: `04/${(6 + i).toString().padStart(2, '0')}/2024`,
        status: 'paid' as PaymentStatus,
        paymentMethod: i % 2 === 0 ? 'Visa' : 'Transferencia',
        transactionId: `TXN-003-00${i + 1}`,
        voucherType: 'Factura' as const
      }))
    },
    {
      id: 'PAY-004',
      studentId: 'EST-004',
      studentName: 'Roberto Sánchez Vargas',
      studentEmail: 'roberto.sanchez@email.com',
      studentCode: 'EST-2024-004',
      courseName: 'Diplomado en Arbitraje Comercial Internacional',
      courseCode: 'DACI-2024-02',
      totalAmount: 3600,
      totalInstallments: 6,
      paidInstallments: 1,
      nextPaymentDate: '15/11/2024',
      enrollmentDate: '10/09/2024',
      installments: [
        {
          number: 1,
          amount: 600,
          dueDate: '15/09/2024',
          paidDate: '14/09/2024',
          status: 'paid',
          paymentMethod: 'Yape',
          transactionId: 'TXN-004-001',
          voucherType: 'Boleta'
        },
        {
          number: 2,
          amount: 600,
          dueDate: '15/10/2024',
          status: 'overdue'
        },
        {
          number: 3,
          amount: 600,
          dueDate: '15/11/2024',
          status: 'overdue'
        },
        {
          number: 4,
          amount: 600,
          dueDate: '15/12/2024',
          status: 'pending'
        },
        {
          number: 5,
          amount: 600,
          dueDate: '15/01/2025',
          status: 'pending'
        },
        {
          number: 6,
          amount: 600,
          dueDate: '15/02/2025',
          status: 'pending'
        }
      ]
    }
  ];

  const getPaymentProgress = (payment: StudentPayment) => {
    return (payment.paidInstallments / payment.totalInstallments) * 100;
  };

  const hasOverduePayments = (payment: StudentPayment) => {
    return payment.installments.some(inst => inst.status === 'overdue');
  };

  const hasUpcomingPayments = (payment: StudentPayment) => {
    return payment.installments.some(inst => inst.status === 'upcoming');
  };

  const getStudentStatus = (payment: StudentPayment): 'on-time' | 'upcoming' | 'overdue' | 'completed' => {
    if (payment.paidInstallments === payment.totalInstallments) return 'completed';
    if (hasOverduePayments(payment)) return 'overdue';
    if (hasUpcomingPayments(payment)) return 'upcoming';
    return 'on-time';
  };

  const filteredPayments = studentsPayments.filter(payment => {
    const matchesSearch = 
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.studentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && getStudentStatus(payment) === statusFilter;
  });

  const stats = {
    totalStudents: studentsPayments.length,
    onTime: studentsPayments.filter(p => getStudentStatus(p) === 'on-time').length,
    upcoming: studentsPayments.filter(p => getStudentStatus(p) === 'upcoming').length,
    overdue: studentsPayments.filter(p => getStudentStatus(p) === 'overdue').length,
    completed: studentsPayments.filter(p => getStudentStatus(p) === 'completed').length,
    totalCollected: studentsPayments.reduce((sum, p) => {
      const paid = p.installments
        .filter(inst => inst.status === 'paid')
        .reduce((s, inst) => s + inst.amount, 0);
      return sum + paid;
    }, 0),
    totalPending: studentsPayments.reduce((sum, p) => {
      const pending = p.installments
        .filter(inst => inst.status !== 'paid')
        .reduce((s, inst) => s + inst.amount, 0);
      return sum + pending;
    }, 0)
  };

  const getStatusBadge = (status: PaymentStatus) => {
    const styles = {
      paid: 'bg-green-100 text-green-700',
      pending: 'bg-gray-100 text-gray-700',
      overdue: 'bg-red-100 text-red-700',
      upcoming: 'bg-amber-100 text-amber-700'
    };

    const labels = {
      paid: 'Pagado',
      pending: 'Pendiente',
      overdue: 'Vencido',
      upcoming: 'Por vencer'
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const sendPaymentReminder = (student: StudentPayment) => {
    toast.success(`Recordatorio de pago enviado a ${student.studentName}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <DollarSign className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Gestión de pagos</h1>
          </div>
        </div>
        <p className="text-xl opacity-90">Control de cronogramas y estados de pago de estudiantes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#0EA5E9] text-white flex items-center justify-center flex-shrink-0">
            <User className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900 text-[24px]">{stats.totalStudents}</p>
            <p className="text-xs text-gray-600 whitespace-nowrap text-[15px] mx-[-7px] my-[0px]">Total estudiantes</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#10B981] text-white flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900 text-[24px]">S/ {stats.totalCollected.toLocaleString()}</p>
            <p className="text-xs text-gray-600 whitespace-nowrap text-[15px] mx-[-7px] my-[0px]">Total recaudado</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#EAB308] text-white flex items-center justify-center flex-shrink-0">
            <Clock className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900 text-[24px]">S/ {stats.totalPending.toLocaleString()}</p>
            <p className="text-xs text-gray-600 whitespace-nowrap text-[15px] mx-[-7px] my-[0px]">Total pendiente</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#EF4444] text-white flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-gray-900 text-[24px]">{stats.overdue}</p>
            <p className="text-xs text-gray-600 whitespace-nowrap text-[15px] mx-[-7px] my-[0px]">Con pagos vencidos</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por estudiante, código o curso..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B95BA]"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B95BA] appearance-none bg-white"
            >
              <option value="all">Todos los estados</option>
              <option value="on-time">Al día</option>
              <option value="upcoming">Próximos a vencer</option>
              <option value="overdue">Con pagos vencidos</option>
              <option value="completed">Completados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Payment List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredPayments.map((payment) => {
          const status = getStudentStatus(payment);
          const progress = getPaymentProgress(payment);

          return (
            <div
              key={payment.id}
              className={`bg-white rounded-2xl p-6 border-2 transition-all hover:shadow-lg ${
                status === 'overdue' ? 'border-red-200' :
                status === 'upcoming' ? 'border-amber-200' :
                status === 'completed' ? 'border-green-200' :
                'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{payment.studentName}</h3>
                    {status === 'overdue' && (
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                        Pagos Vencidos
                      </span>
                    )}
                    {status === 'upcoming' && (
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                        Por vencer
                      </span>
                    )}
                    {status === 'completed' && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        Completado
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-1">{payment.studentCode} • {payment.studentEmail}</p>
                  <p className="font-medium text-gray-800">{payment.courseName}</p>
                  <p className="text-sm text-gray-500">Código: {payment.courseCode}</p>
                </div>

                <button
                  onClick={() => setSelectedStudent(payment)}
                  className="p-2.5 bg-[#0B95BA] text-white hover:bg-[#087A98] rounded-xl transition-colors"
                  title="Ver cronograma completo"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>

              {/* Payment Stats */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Cuotas Pagadas</p>
                  <p className="text-xl font-bold text-gray-900">
                    {payment.paidInstallments}/{payment.totalInstallments}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total curso</p>
                  <p className="text-xl font-bold text-gray-900">S/ {payment.totalAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Próximo pago</p>
                  <p className="text-xl font-bold text-gray-900">{payment.nextPaymentDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Progreso</p>
                  <p className="text-xl font-bold text-gray-900">{progress.toFixed(0)}%</p>
                </div>
                <div className="flex items-end">
                  {status === 'overdue' && (
                    <button
                      onClick={() => sendPaymentReminder(payment)}
                      className="w-full px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Enviar recordatorio
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    status === 'completed' ? 'bg-green-600' :
                    status === 'overdue' ? 'bg-red-600' :
                    status === 'upcoming' ? 'bg-amber-600' :
                    'bg-[#0B95BA]'
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {filteredPayments.length === 0 && (
        <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
          <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No se encontraron pagos</p>
        </div>
      )}

      {/* Payment Schedule Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] px-8 py-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Cronograma de Pagos</h2>
                  <p className="opacity-90">{selectedStudent.studentName} • {selectedStudent.studentCode}</p>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* View Mode Tabs */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
                    viewMode === 'table'
                      ? 'bg-white text-[#0B95BA]'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <List className="w-5 h-5" />
                  Vista de Tabla
                </button>
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
                    viewMode === 'timeline'
                      ? 'bg-white text-[#0B95BA]'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  Vista timeline
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {/* Course Info */}
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Información del Curso</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Curso</p>
                    <p className="font-medium text-gray-900">{selectedStudent.courseName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Código</p>
                    <p className="font-medium text-gray-900">{selectedStudent.courseCode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Fecha de Inscripción</p>
                    <p className="font-medium text-gray-900">{selectedStudent.enrollmentDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total del Curso</p>
                    <p className="font-medium text-gray-900">S/ {selectedStudent.totalAmount.toLocaleString()}</p>
                  </div>
                  {selectedStudent.discount && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Descuento aplicado</p>
                      <p className="font-medium text-green-600">{selectedStudent.discount}%</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Table View */}
              {viewMode === 'table' && (
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Tabla de Pagos Detallada</h3>
                  <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-100 border-b-2 border-gray-200">
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">#</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Estado</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Monto</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Fecha vencimiento</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Fecha pago</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Método</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">ID Transacción</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Comprobante</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedStudent.installments.map((installment) => (
                            <tr
                              key={installment.number}
                              className={`border-b border-gray-200 ${
                                installment.status === 'paid' ? 'bg-green-50/30' :
                                installment.status === 'overdue' ? 'bg-red-50/30' :
                                installment.status === 'upcoming' ? 'bg-amber-50/30' :
                                'hover:bg-gray-50'
                              }`}
                            >
                              <td className="px-6 py-4">
                                <span className="font-bold text-gray-900">
                                  Cuota {installment.number}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                {getStatusBadge(installment.status)}
                              </td>
                              <td className="px-6 py-4">
                                <span className="font-bold text-gray-900">
                                  S/ {installment.amount}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-gray-500" />
                                  <span className="font-medium text-gray-900">
                                    {installment.dueDate}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                {installment.paidDate ? (
                                  <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span className="font-medium text-gray-900">
                                      {installment.paidDate}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-gray-400 italic">-</span>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                {installment.paymentMethod ? (
                                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                                    {installment.paymentMethod}
                                  </span>
                                ) : (
                                  <span className="text-gray-400 italic">-</span>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                {installment.transactionId ? (
                                  <span className="font-mono text-sm text-gray-700">
                                    {installment.transactionId}
                                  </span>
                                ) : (
                                  <span className="text-gray-400 italic">-</span>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                {installment.voucherType ? (
                                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                                    {installment.voucherType}
                                  </span>
                                ) : (
                                  <span className="text-gray-400 italic">-</span>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                {installment.status === 'paid' ? (
                                  <button className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" title="Descargar comprobante">
                                    <Download className="w-4 h-4" />
                                  </button>
                                ) : (
                                  <span className="text-gray-400 italic">-</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="bg-gray-50 border-t-2 border-gray-300">
                            <td colSpan={2} className="px-6 py-4 font-bold text-gray-900">
                              TOTAL
                            </td>
                            <td className="px-6 py-4">
                              <span className="font-bold text-xl text-gray-900">
                                S/ {selectedStudent.totalAmount.toLocaleString()}
                              </span>
                            </td>
                            <td colSpan={6} className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-700">
                                  Pagado: S/ {selectedStudent.installments
                                    .filter(i => i.status === 'paid')
                                    .reduce((sum, i) => sum + i.amount, 0)
                                    .toLocaleString()}
                                </span>
                                <span className="text-gray-400">|</span>
                                <span className="font-medium text-gray-700">
                                  Pendiente: S/ {selectedStudent.installments
                                    .filter(i => i.status !== 'paid')
                                    .reduce((sum, i) => sum + i.amount, 0)
                                    .toLocaleString()}
                                </span>
                              </div>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Timeline View */}
              {viewMode === 'timeline' && (
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Cronograma de Cuotas</h3>
                  <div className="space-y-3">
                    {selectedStudent.installments.map((installment) => (
                      <div
                        key={installment.number}
                        className={`rounded-2xl p-6 border-2 ${
                          installment.status === 'paid' ? 'bg-green-50 border-green-200' :
                          installment.status === 'overdue' ? 'bg-red-50 border-red-200' :
                          installment.status === 'upcoming' ? 'bg-amber-50 border-amber-200' :
                          'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-lg font-bold text-gray-900">
                                Cuota {installment.number} de {selectedStudent.totalInstallments}
                              </span>
                              {getStatusBadge(installment.status)}
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div>
                                <p className="text-sm text-gray-600 mb-1">Monto</p>
                                <p className="font-bold text-gray-900">S/ {installment.amount}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600 mb-1">Fecha de Vencimiento</p>
                                <p className="font-medium text-gray-900">{installment.dueDate}</p>
                              </div>
                              {installment.paidDate && (
                                <>
                                  <div>
                                    <p className="text-sm text-gray-600 mb-1">Fecha de Pago</p>
                                    <p className="font-medium text-gray-900">{installment.paidDate}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600 mb-1">Método de Pago</p>
                                    <p className="font-medium text-gray-900">{installment.paymentMethod}</p>
                                  </div>
                                </>
                              )}
                            </div>

                            {installment.status === 'paid' && (
                              <div className="mt-3 pt-3 border-t border-green-200">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-600">
                                      <strong>ID Transacción:</strong> {installment.transactionId}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                      <strong>Comprobante:</strong> {installment.voucherType}
                                    </span>
                                  </div>
                                  <button className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2">
                                    <Download className="w-4 h-4" />
                                    Descargar comprobante
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Estado del Pago</p>
                  <p className="text-xl font-bold text-gray-900">
                    {selectedStudent.paidInstallments} de {selectedStudent.totalInstallments} cuotas pagadas
                  </p>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="px-6 py-3 bg-[#0B95BA] text-white rounded-xl font-medium hover:bg-[#087A98] transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}