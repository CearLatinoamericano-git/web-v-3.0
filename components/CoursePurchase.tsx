import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tag, CreditCard, Calendar, X, Receipt } from 'lucide-react';
import styles from './CoursePurchase.module.css';
import PaymentMethod from './PaymentMethod';

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
  courseType?: string;
  onPurchase: (selectedOption: PricingOption, couponCode?: string) => void;
}

export function CoursePurchase({
  courseTitle,
  pricingOptions,
  startDate,
  enrollmentDeadline,
  courseType,
  onPurchase
}: CoursePurchaseProps) {
  const [selectedOption] = useState<PricingOption>(pricingOptions[0]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = () => {
    // Mock coupon validation
    const validCoupons: { [key: string]: number } = {
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
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h2 className={styles.title}>
            INSCRIPCIÓN AL PROGRAMA
          </h2>
          {courseType !== 'taller' && (
            <p className={styles.subtitle}>
              Elija el plan que mejor se adapte a sus necesidades
            </p>
          )}
        </motion.div>

        {/* Enrollment Info - Solo para cursos normales */}
        {courseType !== 'taller' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={styles.enrollmentInfo}
          >
            <div className={styles.enrollmentCard}>
              {/* Inscripciones hasta */}
              <div className={styles.dateItem}>
                <div className={styles.dateIcon}>
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className={styles.dateTextContainer}>
                  <p className={styles.dateLabel}>Inscripciones hasta</p>
                  <p className={styles.dateValue}>{enrollmentDeadline}</p>
                </div>
              </div>

              {/* Divider */}
              <div className={styles.divider}></div>
              <div className={styles.dividerHorizontal}></div>

              {/* Fecha de inicio */}
              <div className={styles.dateItem}>
                <div className={styles.dateIcon}>
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className={styles.dateTextContainer}>
                  <p className={styles.dateLabel}>Fecha de inicio</p>
                  <p className={styles.dateValue}>{startDate}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Pricing Options */}
        <div className={`${styles.pricingGrid} ${courseType === 'taller' ? styles.pricingGridSingle : ''}`}>
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
                className={styles.pricingCardWrapper}
              >
                {/* Card */}
                <div className={styles.pricingCard}>
                  {/* Badge - Solo para pronto pago */}
                  {option.type === 'pronto' && option.badge && (
                    <div className={styles.badge}>
                      <span className={styles.badgeText}>
                        ¡Tarifa reducida!
                      </span>
                    </div>
                  )}

                  {/* Label - Más compacto para talleres */}
                  {courseType !== 'taller' && (
                    <h3 className={styles.cardLabel}>
                      {option.label}
                    </h3>
                  )}

                  {/* Installments or Total */}
                  {option.installments ? (
                    <div className={styles.installmentsSection}>
                      <p className={styles.installmentsLabel}>Esquema de pagos</p>
                      <div className={styles.installmentsList}>
                        {option.installments.map((inst, idx) => (
                          <div key={idx} className={styles.installmentItem}>
                            <div className={styles.installmentInfo}>
                              <p className={styles.installmentLabel}>{inst.label}</p>
                              <p className={styles.installmentDate}>{inst.date}</p>
                            </div>
                            <p className={styles.installmentAmount}>S/ {inst.amount.toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                      <div className={styles.totalSection}>
                        <p className={styles.totalLabel}>Total del programa</p>
                        <div className={styles.totalPrice}>
                          <span className={styles.totalCurrency}>S/</span>
                          <span className={styles.totalAmount}>
                            {option.total.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.paymentSection}>
                      {courseType === 'taller' ? (
                        /* Versión unificada para talleres con fecha y precio */
                        <div className={styles.tallerUnifiedCard}>
                          {/* Fecha de inicio */}
                          <div className={styles.tallerDateSection}>
                            <div className={styles.tallerDateIcon}>
                              <Calendar className="w-5 h-5 text-white" />
                            </div>
                            <div className={styles.tallerDateInfo}>
                              <p className={styles.tallerDateLabel}>Fecha de inicio</p>
                              <p className={styles.tallerDateValue}>{startDate}</p>
                            </div>
                          </div>

                          {/* Divider */}
                          <div className={styles.tallerDivider}></div>

                          {/* Precio */}
                          <div className={styles.tallerPriceSection}>
                            <span className={styles.tallerPriceLabel}>Precio del taller</span>
                            <div className={styles.tallerPrice}>
                              <span className={styles.tallerCurrency}>S/</span>
                              <span className={styles.tallerAmount}>
                                {option.total.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Versión normal para otros cursos */
                        <>
                          <p className={styles.paymentLabel}>Modalidad de pago</p>
                          <div className={styles.paymentBox}>
                            {/* Promo dates for pronto pago */}
                            {option.type === 'pronto' && option.promoStartDate && option.promoEndDate && (
                              <div className={styles.promoDates}>
                                <div className={styles.promoDateRow}>
                                  {/* Fecha inicio */}
                                  <div className={styles.promoDateItem}>
                                    <Calendar className="w-3.5 h-3.5 text-white" />
                                    <span className={styles.promoDateText}>Inicio:</span>
                                    <span className={styles.promoDateValue}>{option.promoStartDate}</span>
                                  </div>
                                  {/* Fecha fin */}
                                  <div className={styles.promoDateItem}>
                                    <Calendar className="w-3.5 h-3.5 text-white" />
                                    <span className={styles.promoDateText}>Fin:</span>
                                    <span className={styles.promoDateValue}>{option.promoEndDate}</span>
                                  </div>
                                </div>
                              </div>
                            )}
                            <p className={styles.paymentType}>Pago único</p>
                            {option.discount && (
                              <p className={styles.originalPrice}>
                                S/ {(option.total / (1 - option.discount / 100)).toLocaleString()}
                              </p>
                            )}
                            <div className={styles.paymentPrice}>
                              <span className={styles.paymentCurrency}>S/</span>
                              <span className={styles.paymentAmount}>
                                {option.total.toLocaleString()}
                              </span>
                            </div>
                            {option.discount && (
                              <div className={styles.savingsBadge}>
                                <div className={styles.savingsBadgeInner}>
                                  <span>
                                    Ahorra S/ {Math.round((option.total / (1 - option.discount / 100)) - option.total).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className={styles.totalSection}>
                            <p className={styles.totalLabel}>Total del programa</p>
                            <div className={styles.totalPrice}>
                              <span className={styles.totalCurrency}>S/</span>
                              <span className={styles.totalAmount}>
                                {option.total.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Description - Omitir para talleres */}
                  {courseType !== 'taller' && (
                    <div className={styles.description}>
                      <p className={styles.descriptionText}>
                        {descriptions[option.type] || ''}
                      </p>
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
          className={styles.ctaContainer}
        >
          <button
            onClick={() => setShowPaymentMethod(true)}
            className={styles.ctaButton}
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
            className={styles.modalOverlay}
            onClick={() => setShowCheckout(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={styles.modalContent}
            >
              {/* Header */}
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>Finalizar compra</h3>
                <button
                  onClick={() => setShowCheckout(false)}
                  className={styles.modalCloseButton}
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div className={styles.modalBody}>
                {/* Course Info */}
                <div className={styles.courseInfo}>
                  <h4 className={styles.courseTitle}>{courseTitle}</h4>
                  <p className={styles.courseSubtitle}>{selectedOption.label}</p>
                </div>

                {/* Installment Details */}
                {selectedOption.installments && (
                  <div className={styles.installmentDetails}>
                    <div className={styles.installmentDetailsHeader}>
                      <Receipt className="w-5 h-5 text-[#0B95BA]" />
                      <h4 className={styles.installmentDetailsTitle}>Cronograma de pagos</h4>
                    </div>
                    <div className={styles.installmentDetailsList}>
                      {selectedOption.installments.map((inst, idx) => (
                        <div key={idx} className={styles.installmentDetailsItem}>
                          <div>
                            <p className={styles.installmentDetailsLabel}>{inst.label}</p>
                            <p className={styles.installmentDetailsDate}>{inst.date}</p>
                          </div>
                          <p className={styles.installmentDetailsAmount}>S/ {inst.amount.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Breakdown */}
                <div className={styles.priceBreakdown}>
                  {selectedOption.discount && (
                    <div className={styles.discountRow}>
                      <span>Descuento {selectedOption.label}</span>
                      <span>-{selectedOption.discount}%</span>
                    </div>
                  )}

                  {appliedCoupon && (
                    <div className={styles.couponRow}>
                      <div className={styles.couponInfo}>
                        <Tag className="w-4 h-4" />
                        <span>Cupón "{appliedCoupon.code}"</span>
                        <button
                          onClick={handleRemoveCoupon}
                          className={styles.couponRemoveButton}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <span>-{appliedCoupon.discount}%</span>
                    </div>
                  )}

                  {/* Coupon Input */}
                  {!appliedCoupon && (
                    <div className={styles.couponSection}>
                      <label className={styles.couponLabel}>
                        ¿Tiene un cupón de descuento?
                      </label>
                      <div className={styles.couponInputGroup}>
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Código de cupón"
                          className={styles.couponInput}
                        />
                        <button
                          onClick={handleApplyCoupon}
                          className={styles.couponApplyButton}
                        >
                          Aplicar
                        </button>
                      </div>
                      {couponError && (
                        <p className={styles.couponError}>{couponError}</p>
                      )}
                    </div>
                  )}

                  {/* Total */}
                  <div className={styles.totalRow}>
                    <span className={styles.totalLabel}>Total a pagar</span>
                    <div className={styles.totalValue}>
                      {totalDiscount() > 0 && (
                        <p className={styles.totalOriginal}>
                          S/ {selectedOption.total.toLocaleString()}
                        </p>
                      )}
                      <p className={styles.totalFinal}>
                        S/ {calculateFinalPrice().toLocaleString()}
                      </p>
                      {totalDiscount() > 0 && (
                        <p className={styles.totalSavings}>
                          Ahorra {totalDiscount()}%
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Button */}
                <button
                  onClick={() => onPurchase(selectedOption, appliedCoupon?.code)}
                  className={styles.paymentButton}
                >
                  <CreditCard className="w-5 h-5" />
                  Proceder al pago
                </button>

                {/* Security Notice */}
                <p className={styles.securityNotice}>
                  Pago seguro. Sus datos están protegidos con encriptación SSL.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Method Modal */}
      <PaymentMethod
        isOpen={showPaymentMethod}
        onClose={() => setShowPaymentMethod(false)}
      />
    </section>
  );
}