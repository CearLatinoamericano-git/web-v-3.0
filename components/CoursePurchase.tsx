import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Tag, CreditCard, Calendar, X, Percent, Receipt } from 'lucide-react';

interface Installment {
  label: string;
  date: string;
  amount: number;
}

interface PricingOption {
  type: 'regular' | 'corporativa' | 'comunidad' | 'pronto';
  label: string;
  installments?: Installment[];
  total: number;
  features: string[];
  badge?: string;
  discount?: number;
  promoStartDate?: string;
  promoEndDate?: string;
}

interface CoursePurchaseProps {
  courseId: string;
  courseTitle: string;
  pricingOptions: PricingOption[];
  startDate: string;
  enrollmentDeadline: string;
  onPurchase: (selectedOption: PricingOption, couponCode?: string) => void;
}

export function CoursePurchase({
  courseId,
  courseTitle,
  pricingOptions,
  startDate,
  enrollmentDeadline,
  onPurchase
}: CoursePurchaseProps) {
  const [selectedOption, setSelectedOption] = useState<PricingOption>(pricingOptions[0]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string; discount: number} | null>(null);
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = () => {
    // Mock coupon validation
    const validCoupons: {[key: string]: number} = {
      'CEAR2025': 10,
      'DESCUENTO15': 15,
      'PROMO20': 20
    };

    if (validCoupons[couponCode.toUpperCase()]) {
      setAppliedCoupon({
        code: couponCode.toUpperCase(),
        discount: validCoupons[couponCode.toUpperCase()]
      });
      setCouponError('');
    } else {
      setCouponError('Cupón inválido');
      setAppliedCoupon(null);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const calculateFinalPrice = () => {
    let finalPrice = selectedOption.total;
    
    // Apply option discount
    if (selectedOption.discount) {
      finalPrice = finalPrice * (1 - selectedOption.discount / 100);
    }
    
    // Apply coupon discount
    if (appliedCoupon) {
      finalPrice = finalPrice * (1 - appliedCoupon.discount / 100);
    }
    
    return finalPrice;
  };

  const totalDiscount = () => {
    let total = 0;
    if (selectedOption.discount) total += selectedOption.discount;
    if (appliedCoupon) total += appliedCoupon.discount;
    return total;
  };

  return (
    <section className="py-10 lg:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl lg:text-5xl text-[#EE8A28] mb-5 font-bold uppercase">
            INSCRIPCIÓN AL PROGRAMA
          </h2>
          <p className="text-xl text-gray-900 max-w-3xl mx-auto leading-relaxed">
            Elija el plan que mejor se adapte a sus necesidades
          </p>
        </motion.div>

        {/* Enrollment Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 max-w-4xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 bg-gray-50 rounded-xl border border-gray-200 px-[92px] py-[27px] pt-[27px] pr-[41px] pb-[27px] pl-[87px] mx-[136px] my-[0px]">
            {/* Fecha de inicio */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[#0B95BA] rounded-lg flex items-center justify-center shadow-sm">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-900 uppercase tracking-wide font-semibold">Fecha de inicio</p>
                <p className="text-gray-900 text-lg mt-0.5 font-bold">{startDate}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-12 bg-gray-300"></div>
            <div className="sm:hidden w-20 h-px bg-gray-300"></div>

            {/* Inscripciones hasta */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[#0B95BA] rounded-lg flex items-center justify-center shadow-sm">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-900 uppercase tracking-wide font-semibold">Inscripciones hasta</p>
                <p className="text-gray-900 text-lg mt-0.5 font-bold">{enrollmentDeadline}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pricing Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 mb-12">
          {pricingOptions.map((option, index) => {
            // Descriptions for each pricing type
            const descriptions: Record<string, string> = {
              'regular': 'Tarifa dirigida al público general, que permite acceder al programa mediante un pago fraccionado en cuotas.',
              'corporativa': 'Tarifa preferencial dirigida a participantes inscritos mediante convenios institucionales o corporativos.',
              'comunidad': 'Tarifa exclusiva dirigida a participantes que hayan cursado previamente un programa en CEAR LATINOAMERICANO.',
              'pronto': 'Tarifa especial vigente por tiempo determinado, que permite acceder a un monto preferencial mediante el pago total.'
            };

            return (
              <motion.div
                key={option.type}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedOption(option)}
                className={`relative cursor-pointer group rounded-2xl ${
                  selectedOption.type === option.type
                    ? 'ring-2 ring-[#1CB8A4]'
                    : 'hover:ring-2 hover:ring-[#1CB8A4]/50'
                }`}
              >
                {/* Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all h-full border-2 border-[#1CB8A4] flex flex-col">
                  {/* Badge - Solo para pronto pago */}
                  {option.type === 'pronto' && option.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 bg-[#0B95BA] text-white text-xs rounded-full shadow-lg font-bold">
                        ¡Tarifa reducida!
                      </span>
                    </div>
                  )}

                  {/* Label */}
                  <h3 className="text-lg text-gray-900 mb-4 text-center min-h-[3.5rem] flex items-center justify-center uppercase font-bold">
                    {option.label}
                  </h3>

                  {/* Installments or Total */}
                  {option.installments ? (
                    <div className="mb-6">
                      <p className="text-xs text-gray-700 mb-4 px-1 text-center">Esquema de pagos</p>
                      <div className="bg-gray-50 rounded-xl p-4 mb-3 border border-gray-200">
                        {option.installments.map((inst, idx) => (
                          <div key={idx} className="flex items-center justify-between py-2.5 border-b border-gray-200 last:border-0">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-gray-900 truncate">{inst.label}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{inst.date}</p>
                            </div>
                            <p className="text-sm text-gray-900 ml-3 flex-shrink-0">S/ {inst.amount.toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                      <div className="text-center pt-3 border-t-2 border-[#1CB8A4]/20">
                        <p className="text-xs text-gray-600 mb-2">Total del programa</p>
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-sm text-gray-600">S/</span>
                          <span className="text-3xl text-[#0B95BA]">
                            {option.total.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <p className="text-xs text-gray-700 mb-4 px-1 text-center">Modalidad de pago</p>
                      <div className="bg-[#0B95BA] rounded-xl p-6 mb-3">
                        {/* Promo dates for pronto pago */}
                        {option.type === 'pronto' && option.promoStartDate && option.promoEndDate && (
                          <div className="mb-4 pb-4 border-b border-white/20">
                            <div className="flex flex-col gap-2">
                              {/* Fecha inicio */}
                              <div className="flex items-center justify-center gap-2">
                                <Calendar className="w-3.5 h-3.5 text-white" />
                                <span className="text-xs text-white">Inicio:</span>
                                <span className="text-xs text-white font-medium">{option.promoStartDate}</span>
                              </div>
                              {/* Fecha fin */}
                              <div className="flex items-center justify-center gap-2">
                                <Calendar className="w-3.5 h-3.5 text-white" />
                                <span className="text-xs text-white">Fin:</span>
                                <span className="text-xs text-white font-medium">{option.promoEndDate}</span>
                              </div>
                            </div>
                          </div>
                        )}
                        <p className="text-xs text-white mb-4 text-center font-medium">Pago único</p>
                        {option.discount && (
                          <p className="text-sm text-white line-through mb-3 text-center opacity-60">
                            S/ {(option.total / (1 - option.discount / 100)).toLocaleString()}
                          </p>
                        )}
                        <div className="flex items-baseline justify-center gap-1 mb-4">
                          <span className="text-sm text-white font-medium">S/</span>
                          <span className="text-4xl text-white font-bold">
                            {option.total.toLocaleString()}
                          </span>
                        </div>
                        {option.discount && (
                          <div className="flex justify-center">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0B95BA] rounded-full text-base shadow-md font-medium">
                              <span>
                                Ahorra S/ {Math.round((option.total / (1 - option.discount / 100)) - option.total).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-center pt-3 border-t-2 border-[#1CB8A4]/20">
                        <p className="text-xs text-gray-600 mb-2">Total del programa</p>
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-sm text-gray-600">S/</span>
                          <span className="text-3xl text-[#0B95BA]">
                            {option.total.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <div className="pt-4 border-t border-gray-100 flex-grow">
                    <p className="text-xs text-gray-600 leading-relaxed text-justify">
                      {descriptions[option.type] || ''}
                    </p>
                  </div>

                  {/* Selected Indicator */}
                  {selectedOption.type === option.type && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 bg-[#0B95BA] rounded-full flex items-center justify-center shadow-md">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <button
            onClick={() => setShowCheckout(true)}
            className="px-12 py-4 bg-[#EE8A28] text-white text-lg rounded-xl hover:shadow-2xl hover:shadow-[#EE8A28]/30 transition-all hover:scale-105 font-semibold"
          >
            Proceder al pago
          </button>
        </motion.div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCheckout(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
                <h3 className="text-2xl text-gray-900">Finalizar compra</h3>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="w-10 h-10 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Course Info */}
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="text-base text-gray-900 mb-2 font-bold">{courseTitle}</h4>
                  <p className="text-sm text-gray-600">{selectedOption.label}</p>
                </div>

                {/* Installment Details */}
                {selectedOption.installments && (
                  <div className="bg-white rounded-xl p-6 border-2 border-[#0B95BA]/20 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <Receipt className="w-5 h-5 text-[#0B95BA]" />
                      <h4 className="text-base text-gray-900">Cronograma de pagos</h4>
                    </div>
                    <div className="space-y-3">
                      {selectedOption.installments.map((inst, idx) => (
                        <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                          <div>
                            <p className="text-sm text-gray-900">{inst.label}</p>
                            <p className="text-xs text-gray-600">{inst.date}</p>
                          </div>
                          <p className="text-base text-gray-900">S/ {inst.amount.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Breakdown */}
                <div className="space-y-4">
                  {selectedOption.discount && (
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200 text-green-600">
                      <span>Descuento {selectedOption.label}</span>
                      <span>-{selectedOption.discount}</span>
                    </div>
                  )}

                  {appliedCoupon && (
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200 text-green-600">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        <span>Cupón "{appliedCoupon.code}"</span>
                        <button
                          onClick={handleRemoveCoupon}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <span>-{appliedCoupon.discount}</span>
                    </div>
                  )}

                  {/* Coupon Input */}
                  {!appliedCoupon && (
                    <div className="mt-[0px] mr-[0px] mb-[28px] ml-[0px]">
                      <label className="block text-sm text-gray-700 mb-2">
                        ¿Tiene un cupón de descuento?
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Código de cupón"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent outline-none"
                        />
                        <button
                          onClick={handleApplyCoupon}
                          className="px-6 py-2 bg-[#0B95BA] text-white rounded-xl hover:bg-[#087A98] transition-colors"
                        >
                          Aplicar
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-sm text-red-600 mt-2">{couponError}</p>
                      )}
                    </div>
                  )}

                  {/* Total */}
                  <div className="flex items-center justify-between pt-4 border-t-2 border-gray-300">
                    <span className="text-lg text-gray-900">Total a pagar</span>
                    <div className="text-right">
                      {totalDiscount() > 0 && (
                        <p className="text-sm text-gray-500 line-through">
                          S/ {selectedOption.total.toLocaleString()}
                        </p>
                      )}
                      <p className="text-3xl text-[#0B95BA]">
                        S/ {calculateFinalPrice().toLocaleString()}
                      </p>
                      {totalDiscount() > 0 && (
                        <p className="text-sm text-green-600">
                          Ahorra {totalDiscount()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Button */}
                <button
                  onClick={() => onPurchase(selectedOption, appliedCoupon?.code)}
                  className="w-full py-4 bg-gradient-to-r from-[#0B95BA] to-[#0BDDB3] text-white rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Proceder al pago
                </button>

                {/* Security Notice */}
                <p className="text-xs text-gray-500 text-center">
                  Pago seguro. Sus datos están protegidos con encriptación SSL.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}