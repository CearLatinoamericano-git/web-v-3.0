import { useState } from 'react';
import {
  CreditCard,
  AlertCircle,
  CheckCircle,
  Calendar,
  FileText,
  Download,
  HelpCircle,
  MessageCircle,
  ArrowRight,
  Receipt,
  DollarSign,
  X
} from 'lucide-react';
import { toast } from 'sonner';

type VoucherType = 'boleta' | 'factura';
type PaymentStatus = 'pending' | 'paid';

interface Quota {
  number: number;
  total: number;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
  paidDate?: string;
  transactionId?: string;
}

export function StudentPaymentsView() {
  const [activeTab, setActiveTab] = useState<PaymentStatus>('pending');
  const [voucherType, setVoucherType] = useState<VoucherType>('boleta');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedQuota, setSelectedQuota] = useState<Quota | null>(null);
  const [selectedQuotas, setSelectedQuotas] = useState<Set<number>>(new Set()); // Pago múltiple
  const [ruc, setRuc] = useState(''); // RUC para factura
  const [isMultiPayment, setIsMultiPayment] = useState(false); // Modo pago múltiple

  // Helper functions
  const isOverdue = (dueDate: string): boolean => {
    const [day, month, year] = dueDate.split('/').map(Number);
    const due = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return due < today;
  };

  const getDaysUntilDue = (dueDate: string): number => {
    const [day, month, year] = dueDate.split('/').map(Number);
    const due = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Mock data - En producción vendría de la API
  const courseEnrollment = {
    courseName: 'Diplomado en Arbitraje Comercial Internacional',
    totalAmount: 3150,
    quotasTotal: 9,
    quotasPaid: 3,
    quotasPending: 6,
  };

  const quotas: Quota[] = [
    { number: 1, total: 9, amount: 350, dueDate: '15/10/2024', status: 'paid', paidDate: '12/10/2024', transactionId: 'TXN001' },
    { number: 2, total: 9, amount: 350, dueDate: '15/11/2024', status: 'paid', paidDate: '14/11/2024', transactionId: 'TXN002' },
    { number: 3, total: 9, amount: 350, dueDate: '15/12/2024', status: 'paid', paidDate: '13/12/2024', transactionId: 'TXN003' },
    { number: 4, total: 9, amount: 350, dueDate: '02/12/2025', status: 'pending' }, // Atrasado (hace 2 días)
    { number: 5, total: 9, amount: 350, dueDate: '10/12/2025', status: 'pending' }, // Vence pronto (en 6 días)
    { number: 6, total: 9, amount: 350, dueDate: '15/01/2026', status: 'pending' }, // Pendiente normal
    { number: 7, total: 9, amount: 350, dueDate: '15/02/2026', status: 'pending' }, // Pendiente normal
    { number: 8, total: 9, amount: 350, dueDate: '15/03/2026', status: 'pending' }, // Pendiente normal
    { number: 9, total: 9, amount: 350, dueDate: '15/04/2026', status: 'pending' }, // Pendiente normal
  ];

  const pendingQuotas = quotas.filter(q => q.status === 'pending');
  const paidQuotas = quotas.filter(q => q.status === 'paid');
  
  // Ordenar pendientes: primero atrasadas, luego las demás por número
  const sortedPendingQuotas = [...pendingQuotas].sort((a, b) => {
    const aOverdue = isOverdue(a.dueDate);
    const bOverdue = isOverdue(b.dueDate);
    if (aOverdue && !bOverdue) return -1;
    if (!aOverdue && bOverdue) return 1;
    return a.number - b.number;
  });
  
  const nextQuota = sortedPendingQuotas[0];

  const displayQuotas = activeTab === 'pending' ? sortedPendingQuotas : paidQuotas;

  const handlePayQuota = (quota: Quota) => {
    setSelectedQuota(quota);
    setIsMultiPayment(false);
    setSelectedQuotas(new Set());
    setShowPaymentModal(true);
  };

  const handleToggleQuotaSelection = (quotaNumber: number) => {
    setSelectedQuotas(prev => {
      const newSet = new Set(prev);
      if (newSet.has(quotaNumber)) {
        newSet.delete(quotaNumber);
      } else {
        newSet.add(quotaNumber);
      }
      return newSet;
    });
  };

  const handleStartMultiPayment = () => {
    if (selectedQuotas.size === 0) {
      toast.error('Debe seleccionar al menos una cuota para pagar');
      return;
    }
    setIsMultiPayment(true);
    setSelectedQuota(null);
    setShowPaymentModal(true);
  };

  const handleCancelMultiSelect = () => {
    setSelectedQuotas(new Set());
  };

  const getSelectedQuotasTotal = () => {
    return pendingQuotas
      .filter(q => selectedQuotas.has(q.number))
      .reduce((sum, q) => sum + q.amount, 0);
  };

  const getSelectedQuotasDetails = () => {
    return pendingQuotas
      .filter(q => selectedQuotas.has(q.number))
      .sort((a, b) => a.number - b.number);
  };

  const handleContinuePayment = () => {
    if (isMultiPayment && selectedQuotas.size > 0) {
      const quotasText = Array.from(selectedQuotas).sort((a, b) => a - b).join(', ');
      toast.success(`Redirigiendo al pago de las cuotas: ${quotasText}`);
    } else if (selectedQuota) {
      toast.success(`Redirigiendo al pago de la cuota ${selectedQuota.number}/${selectedQuota.total}`);
    }
    // Aquí se redirigiría a la pasarela de pago
    setShowPaymentModal(false);
    setSelectedQuotas(new Set());
    setRuc('');
  };

  const handleDownloadVoucher = (quota: Quota) => {
    toast.success(`Descargando ${voucherType} de la cuota ${quota.number}/${quota.total}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Pagos y cuotas</h1>
        <p className="text-xl opacity-90">Gestiona los pagos de tus programas</p>
      </div>

      {/* Course Info Card */}
      <div className="bg-white rounded-2xl p-6 border-2 border-[#0B95BA]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{courseEnrollment.courseName}</h2>
            <div className="flex items-center gap-4 text-sm">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                {courseEnrollment.quotasPaid}/{courseEnrollment.quotasTotal} Cuotas pagadas
              </span>
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">
                {courseEnrollment.quotasPending} Pendientes
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">Monto total</p>
            <p className="text-3xl font-bold text-[#0B95BA]">S/ {courseEnrollment.totalAmount.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Progreso de pagos</span>
            <span className="font-bold text-[#0B95BA]">
              {Math.round((courseEnrollment.quotasPaid / courseEnrollment.quotasTotal) * 100)}%
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-full transition-all"
              style={{ width: `${(courseEnrollment.quotasPaid / courseEnrollment.quotasTotal) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 px-6 py-4 font-medium transition-all ${
              activeTab === 'pending'
                ? 'bg-[#0B95BA] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>Cuotas pendientes ({pendingQuotas.length})</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('paid')}
            className={`flex-1 px-6 py-4 font-medium transition-all ${
              activeTab === 'paid'
                ? 'bg-[#0B95BA] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Pagados ({paidQuotas.length})</span>
            </div>
          </button>
        </div>

        {/* Quotas List */}
        <div className="p-6">
          {/* Multi-payment controls - solo en pestaña de pendientes */}
          {activeTab === 'pending' && pendingQuotas.length > 0 && (
            <div className="mb-6 flex items-center justify-between p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
              <div className="flex items-center gap-3">
                {selectedQuotas.size > 0 ? (
                  <>
                    <div className="w-10 h-10 bg-[#0B95BA] rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{selectedQuotas.size} cuota{selectedQuotas.size !== 1 ? 's' : ''} seleccionada{selectedQuotas.size !== 1 ? 's' : ''}</p>
                      <p className="text-sm text-gray-600">Total: S/ {getSelectedQuotasTotal().toFixed(2)}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Pago múltiple disponible</p>
                      <p className="text-sm text-gray-600">Seleccione las cuotas que desea pagar</p>
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                {selectedQuotas.size > 0 && (
                  <>
                    <button
                      onClick={handleCancelMultiSelect}
                      className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleStartMultiPayment}
                      className="px-6 py-2 bg-[#0B95BA] hover:bg-[#087A98] text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      Pagar {selectedQuotas.size} cuota{selectedQuotas.size !== 1 ? 's' : ''}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="space-y-4">
            {displayQuotas.map((quota) => {
              const overdue = quota.status === 'pending' && isOverdue(quota.dueDate);
              const dueSoon = quota.status === 'pending' && !overdue && getDaysUntilDue(quota.dueDate) <= 7;
              const paid = quota.status === 'paid';
              const isSelected = selectedQuotas.has(quota.number);
              
              return (
                <div
                  key={quota.number}
                  className={`rounded-2xl p-5 border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 border-[#0B95BA] shadow-lg scale-[1.02]'
                      : overdue
                      ? 'bg-red-50 border-red-500'
                      : paid
                      ? 'bg-white border-gray-200'
                      : 'bg-white border-gray-200 hover:border-[#0B95BA] hover:shadow-lg hover:bg-blue-50/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Checkbox para selección múltiple - solo en pendientes */}
                    {!paid && activeTab === 'pending' && (
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleQuotaSelection(quota.number)}
                        className="w-5 h-5 text-[#0B95BA] bg-white border-gray-300 rounded focus:ring-[#0B95BA] focus:ring-2 cursor-pointer"
                      />
                    )}

                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                      paid
                        ? 'bg-[#0B95BA] text-white'
                        : overdue
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      <Receipt className="w-7 h-7" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-600">Cuota {quota.number}/{quota.total}</span>
                        <span className="text-gray-400">•</span>
                        <h3 className="font-bold text-gray-900 text-lg">S/ {quota.amount.toFixed(2)}</h3>
                        {paid && (
                          <span className="px-2 py-1 bg-[#0B95BA] text-white text-xs rounded-full font-medium">
                            Pagado
                          </span>
                        )}
                        {overdue && (
                          <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full font-medium">
                            Atrasado
                          </span>
                        )}
                        {dueSoon && (
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">
                            Vence pronto
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {paid ? 'Pagado: ' : 'Vence: '}
                            {paid ? quota.paidDate : quota.dueDate}
                          </span>
                        </div>
                        {quota.transactionId && (
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            <span>ID: {quota.transactionId}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {paid ? (
                        <button
                          onClick={() => handleDownloadVoucher(quota)}
                          className="px-4 py-2 bg-[#0B95BA] hover:bg-[#087A98] text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Descargar
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePayQuota(quota)}
                          className={`px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 ${
                            overdue
                              ? 'bg-red-600 hover:bg-red-700 text-white'
                              : 'bg-[#0B95BA] hover:bg-[#087A98] text-white'
                          }`}
                        >
                          <CreditCard className="w-4 h-4" />
                          Pagar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Support Contact */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-amber-200 rounded-full flex items-center justify-center">
            <HelpCircle className="w-7 h-7 text-amber-700" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg mb-1">¿Necesita ayuda?</h3>
            <p className="text-gray-700">Nuestro equipo está disponible para resolver sus dudas.</p>
          </div>
          <button className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Contactar soporte
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (selectedQuota || isMultiPayment) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full">
            <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] p-6 rounded-t-3xl">
              <h2 className="text-2xl font-bold text-white">Confirmar Pago</h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Quota Info */}
              {isMultiPayment ? (
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-600">Cuotas seleccionadas</span>
                    <span className="font-bold text-xl text-gray-900">
                      {selectedQuotas.size}/{courseEnrollment.quotasTotal}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-600">Total a pagar</span>
                    <span className="font-medium text-gray-900">S/ {getSelectedQuotasTotal().toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <span className="font-bold text-gray-900 block mb-2">Detalles de cuotas</span>
                    <div className="space-y-1">
                      {getSelectedQuotasDetails().map(q => (
                        <div key={q.number} className="flex items-center justify-between text-sm">
                          <span className="text-gray-700">Cuota {q.number}</span>
                          <span className="font-medium text-gray-900">S/ {q.amount.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-600">Cuota a pagar</span>
                    <span className="font-bold text-xl text-gray-900">
                      {selectedQuota!.number}/{selectedQuota!.total}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-600">Fecha de vencimiento</span>
                    <span className="font-medium text-gray-900">{selectedQuota!.dueDate}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <span className="font-bold text-gray-900">Monto a pagar</span>
                    <span className="font-bold text-2xl text-[#0B95BA]">
                      S/ {selectedQuota!.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              {/* Voucher Type Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tipo de comprobante
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setVoucherType('boleta')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      voucherType === 'boleta'
                        ? 'border-[#0B95BA] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Receipt className={`w-6 h-6 mx-auto mb-2 ${
                      voucherType === 'boleta' ? 'text-[#0B95BA]' : 'text-gray-400'
                    }`} />
                    <span className={`font-medium ${
                      voucherType === 'boleta' ? 'text-[#0B95BA]' : 'text-gray-700'
                    }`}>
                      Boleta
                    </span>
                  </button>
                  <button
                    onClick={() => setVoucherType('factura')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      voucherType === 'factura'
                        ? 'border-[#0B95BA] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <FileText className={`w-6 h-6 mx-auto mb-2 ${
                      voucherType === 'factura' ? 'text-[#0B95BA]' : 'text-gray-400'
                    }`} />
                    <span className={`font-medium ${
                      voucherType === 'factura' ? 'text-[#0B95BA]' : 'text-gray-700'
                    }`}>
                      Factura
                    </span>
                  </button>
                </div>
              </div>

              {/* RUC Field - solo aparece cuando se selecciona Factura */}
              {voucherType === 'factura' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    RUC
                  </label>
                  <input
                    type="text"
                    value={ruc}
                    onChange={(e) => setRuc(e.target.value)}
                    placeholder="Ingrese su RUC (11 dígitos)"
                    maxLength={11}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Ingrese su número de RUC de 11 dígitos para emitir la factura
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleContinuePayment}
                  className="flex-1 px-6 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  Continuar
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}