import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X,
  User, 
  CreditCard, 
  CheckCircle, 
  FileText,
  Upload,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Building,
  Clock,
  Smartphone,
  Copy,
  Check,
  Users,
  Trash2,
  Plus,
  IdCard
} from 'lucide-react';
// import Descarga2 from '../imports/Descarga2';



interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  courseTitle: string;
  selectedPricing: {
    type: string;
    label: string;
    total: number;
  };
  onComplete?: (data: any) => void;
}

interface ParticipantData {
  dni: string;
  firstName: string;
  lastName: string;
  nationality: string;
  birthDate: string;
  profession: string;
  photo: File | null;
  phone: string;
  email: string;
  currentJob: string;
  position: string;
  country: string;
  department: string;
  city: string;
  district: string;
  address: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  dataVeracityAccepted: boolean;
}

interface CorporateParticipant {
  dni: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profession: string;
}

interface PaymentData {
  isRecurrent: boolean;
  paymentMode: 'pronto' | 'cuotas' | 'inscripcion' | null;
  installments: number;
  paymentMethod: 'transfer' | 'yape-plin' | 'niubiz' | null;
  transferData?: {
    medium: string;
    amount: number;
    date: string;
    operationCode: string;
    receipt: File | null;
  };
  corporateParticipants?: CorporateParticipant[];
  numberOfParticipants?: number;
}

export function EnrollmentModal({
  isOpen,
  onClose,
  courseId,
  courseTitle,
  selectedPricing,
  onComplete
}: EnrollmentModalProps) {
  // Si es pronto pago, omitimos el paso 2
  const isProntoPago = selectedPricing.type === 'pronto';
  
  const [currentStep, setCurrentStep] = useState(1);
  const [participantData, setParticipantData] = useState<ParticipantData>({
    dni: '',
    firstName: '',
    lastName: '',
    nationality: '',
    birthDate: '',
    profession: '',
    photo: null,
    phone: '',
    email: '',
    currentJob: '',
    position: '',
    country: '',
    department: '',
    city: '',
    district: '',
    address: '',
    termsAccepted: false,
    privacyAccepted: false,
    dataVeracityAccepted: false,
  });

  const [paymentData, setPaymentData] = useState<PaymentData>({
    isRecurrent: selectedPricing.type === 'comunidad',
    paymentMode: isProntoPago ? 'pronto' : (
      selectedPricing.type === 'regular' || 
      selectedPricing.type === 'corporativa' || 
      selectedPricing.type === 'comunidad'
    ) ? 'inscripcion' : null,
    installments: 2,
    paymentMethod: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const basePrice = selectedPricing.total;
  const recurrentDiscount = paymentData.isRecurrent ? 0.15 : 0;
  const prontoDiscount = paymentData.paymentMode === 'pronto' ? 0.08 : 0;
  const totalDiscount = recurrentDiscount + prontoDiscount;
  
  // Para tarifa corporativa, el precio final es basePrice * número de participantes
  const isCorporativa = selectedPricing.type === 'corporativa';
  const numberOfParticipants = isCorporativa ? (paymentData.corporateParticipants?.length || 3) : 1;
  const corporativeTotalPrice = isCorporativa ? basePrice * numberOfParticipants : basePrice * (1 - totalDiscount);
  
  const finalPrice = isCorporativa ? corporativeTotalPrice : basePrice * (1 - totalDiscount);
  const installmentAmount = paymentData.paymentMode === 'cuotas' ? finalPrice / paymentData.installments : finalPrice;

  const steps = [
    { number: 1, title: 'Datos', icon: User },
    { number: 2, title: 'Opciones', icon: CreditCard },
    { number: 3, title: 'Pago', icon: FileText },
    { number: 4, title: 'Confirmar', icon: CheckCircle },
  ];

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!participantData.dni.trim()) newErrors.dni = 'Requerido';
    else if (participantData.dni.length !== 8) newErrors.dni = 'DNI debe tener 8 dígitos';
    if (!participantData.firstName.trim()) newErrors.firstName = 'Requerido';
    if (!participantData.lastName.trim()) newErrors.lastName = 'Requerido';
    if (!participantData.nationality) newErrors.nationality = 'Requerido';
    if (!participantData.email.trim()) newErrors.email = 'Requerido';
    if (!participantData.phone.trim()) newErrors.phone = 'Requerido';
    if (!participantData.termsAccepted) newErrors.terms = 'Debe aceptar los términos';
    if (!participantData.privacyAccepted) newErrors.privacy = 'Debe aceptar la política';
    if (!participantData.dataVeracityAccepted) newErrors.veracity = 'Debe confirmar veracidad';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!paymentData.paymentMode) newErrors.paymentMode = 'Seleccione modalidad';
    
    // Validaciones especiales para tarifa corporativa
    if (selectedPricing.type === 'corporativa') {
      if (!paymentData.numberOfParticipants || paymentData.numberOfParticipants < 3) {
        newErrors.numberOfParticipants = 'Mínimo 3 participantes';
      }
      if (!paymentData.corporateParticipants || paymentData.corporateParticipants.length < (paymentData.numberOfParticipants || 3)) {
        newErrors.corporateParticipants = 'Complete los datos de todos los participantes';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!paymentData.paymentMethod) newErrors.paymentMethod = 'Seleccione método';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;
    if (currentStep === 1) isValid = validateStep1();
    else if (currentStep === 2) isValid = validateStep2();
    else if (currentStep === 3) isValid = validateStep3();
    else isValid = true;

    if (isValid && currentStep < 4) {
      // Si es pronto pago, saltamos del paso 1 al paso 3
      if (isProntoPago && currentStep === 1) {
        setCurrentStep(3);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      // Si es pronto pago y estamos en paso 3, volvemos al paso 1
      if (isProntoPago && currentStep === 3) {
        setCurrentStep(1);
      } else {
        setCurrentStep(currentStep - 1);
      }
      setErrors({});
    }
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete({
        participant: participantData,
        payment: paymentData,
        course: { id: courseId, title: courseTitle },
        pricing: { basePrice, finalPrice, totalDiscount }
      });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B95BA] to-[#0BDDB3] px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h3 className="text-xl lg:text-2xl text-white">Inscripción al programa</h3>
            <p className="text-white/90 text-sm">{courseTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper */}
        <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between gap-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center flex-1">
                  {index > 0 && (
                    <div className={`h-0.5 flex-1 ${currentStep > steps[index - 1].number ? 'bg-[#0BDDB3]' : 'bg-gray-200'}`} />
                  )}
                  <div className="flex flex-col items-center px-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isCompleted ? 'bg-[#0BDDB3]' : isActive ? 'bg-[#0B95BA]' : 'bg-gray-200'
                      } text-white`}
                    >
                      {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <p className={`text-xs mt-2 hidden sm:block text-center whitespace-nowrap ${isActive ? 'text-[#0B95BA]' : 'text-gray-500'}`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-0.5 flex-1 ${currentStep > step.number ? 'bg-[#0BDDB3]' : 'bg-gray-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentStep === 1 && (
                <Step1Compact data={participantData} onChange={setParticipantData} errors={errors} />
              )}
              {currentStep === 2 && (
                <Step2Compact 
                  data={paymentData} 
                  onChange={setPaymentData} 
                  basePrice={basePrice}
                  finalPrice={finalPrice}
                  totalDiscount={totalDiscount}
                  installmentAmount={installmentAmount}
                  errors={errors}
                  pricingType={selectedPricing.type}
                  participantData={participantData}
                />
              )}
              {currentStep === 3 && (
                <Step3Compact 
                  data={paymentData} 
                  onChange={setPaymentData}
                  finalPrice={finalPrice}
                  installmentAmount={installmentAmount}
                  errors={errors}
                  pricingType={selectedPricing.type}
                  basePrice={basePrice}
                />
              )}
              {currentStep === 4 && (
                <Step4Compact 
                  participantData={participantData}
                  paymentData={paymentData}
                  courseTitle={courseTitle}
                  finalPrice={finalPrice}
                  pricingType={selectedPricing.type}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex gap-3 flex-shrink-0">
          {currentStep > 1 && currentStep < 4 && (
            <button
              onClick={handleBack}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Volver
            </button>
          )}
          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-[#0B95BA] to-[#0BDDB3] text-white rounded-xl hover:shadow-lg transition-all"
            >
              Continuar
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-[#0B95BA] to-[#0BDDB3] text-white rounded-xl hover:shadow-lg transition-all"
            >
              {paymentData.paymentMethod === 'niubiz' ? 'Procesar pago' : 'Completar inscripción'}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// STEP 1 COMPACT
function Step1Compact({ data, onChange, errors }: any) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-lg text-gray-900 mb-4 font-bold">Información personal</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-700 mb-[10px] mt-[0px] mr-[0px] ml-[0px]">DNI *</label>
            <input
              type="text"
              value={data.dni}
              onChange={(e) => onChange({ ...data, dni: e.target.value.replace(/\D/g, '').slice(0, 8) })}
              placeholder="12345678"
              maxLength={8}
              className={`w-full px-3 py-2 text-sm rounded-lg border ${errors.dni ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-[#0B95BA]`}
            />
            {errors.dni && <p className="text-xs text-[rgb(204,28,28)] mt-1">{errors.dni}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-[10px] mt-[0px] mr-[0px] ml-[0px]">Nacionalidad *</label>
            <select
              value={data.nationality}
              onChange={(e) => onChange({ ...data, nationality: e.target.value })}
              className={`w-full px-3 py-2 text-sm rounded-lg border ${errors.nationality ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-[#0B95BA]`}
            >
              <option value="">Seleccione...</option>
              <option value="peruana">Peruana</option>
              <option value="colombiana">Colombiana</option>
              <option value="chilena">Chilena</option>
              <option value="argentina">Argentina</option>
              <option value="otra">Otra</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-[10px] mt-[0px] mr-[0px] ml-[0px]">Nombres *</label>
            <input
              type="text"
              value={data.firstName}
              onChange={(e) => onChange({ ...data, firstName: e.target.value })}
              className={`w-full px-3 py-2 text-sm rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-[#0B95BA]`}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-[10px] mt-[0px] mr-[0px] ml-[0px]">Apellidos *</label>
            <input
              type="text"
              value={data.lastName}
              onChange={(e) => onChange({ ...data, lastName: e.target.value })}
              className={`w-full px-3 py-2 text-sm rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-[#0B95BA]`}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-[10px] mt-[0px] mr-[0px] ml-[0px]">Correo electrónico *</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => onChange({ ...data, email: e.target.value })}
              className={`w-full px-3 py-2 text-sm rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-[#0B95BA]`}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-[10px] mt-[0px] mr-[0px] ml-[0px]">Celular *</label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => onChange({ ...data, phone: e.target.value })}
              className={`w-full px-3 py-2 text-sm rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-[#0B95BA]`}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm text-gray-700 mb-[10px] mt-[0px] mr-[0px] ml-[0px]">Profesión</label>
            <input
              type="text"
              value={data.profession}
              onChange={(e) => onChange({ ...data, profession: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#0B95BA]"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-[10px] mt-[0px] mr-[0px] ml-[0px]">Puesto / Cargo</label>
            <input
              type="text"
              value={data.position}
              onChange={(e) => onChange({ ...data, position: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#0B95BA]"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-[10px] mt-[0px] mr-[0px] ml-[0px]">Centro / Institución</label>
            <input
              type="text"
              value={data.currentJob}
              onChange={(e) => onChange({ ...data, currentJob: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#0B95BA]"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h5 className="text-sm text-gray-900 mb-3">Consentimientos obligatorios</h5>
        <div className="space-y-2">
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={data.termsAccepted}
              onChange={(e) => onChange({ ...data, termsAccepted: e.target.checked })}
              className="mt-0.5 w-4 h-4 text-[#0B95BA] rounded"
            />
            <span className="text-xs text-gray-700">Acepto los Términos y Condiciones *</span>
          </label>
          {errors.terms && <p className="text-xs text-red-500 ml-6">{errors.terms}</p>}

          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={data.privacyAccepted}
              onChange={(e) => onChange({ ...data, privacyAccepted: e.target.checked })}
              className="mt-0.5 w-4 h-4 text-[#0B95BA] rounded"
            />
            <span className="text-xs text-gray-700">Autorizo el tratamiento de datos personales *</span>
          </label>
          {errors.privacy && <p className="text-xs text-red-500 ml-6">{errors.privacy}</p>}

          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={data.dataVeracityAccepted}
              onChange={(e) => onChange({ ...data, dataVeracityAccepted: e.target.checked })}
              className="mt-0.5 w-4 h-4 text-[#0B95BA] rounded"
            />
            <span className="text-xs text-gray-700">Declaro que la información es veraz *</span>
          </label>
          {errors.veracity && <p className="text-xs text-red-500 ml-6">{errors.veracity}</p>}
        </div>
      </div>
    </div>
  );
}

// STEP 2 COMPACT
function Step2Compact({ data, onChange, basePrice, finalPrice, totalDiscount, installmentAmount, errors, pricingType, participantData }: any) {
  const isComunidadCear = pricingType === 'comunidad';
  const showProntoPago = pricingType === 'pronto';
  const isCorporativa = pricingType === 'corporativa';
  const inscripcionAmount = 500; // Monto fijo de inscripción
  
  // Inicializar corporateParticipants con el primer participante usando los datos del inscriptor
  if (isCorporativa && !data.corporateParticipants) {
    setTimeout(() => {
      const firstParticipant: CorporateParticipant = {
        dni: participantData.dni || '',
        firstName: participantData.firstName || '',
        lastName: participantData.lastName || '',
        email: participantData.email || '',
        phone: participantData.phone || '',
        profession: participantData.profession || ''
      };
      
      onChange({ 
        ...data, 
        corporateParticipants: [firstParticipant],
        numberOfParticipants: 3
      });
    }, 0);
  }

  const handleAddParticipant = () => {
    const newParticipant: CorporateParticipant = {
      dni: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      profession: ''
    };
    onChange({
      ...data,
      corporateParticipants: [...(data.corporateParticipants || []), newParticipant]
    });
  };

  const handleRemoveParticipant = (index: number) => {
    const updated = [...(data.corporateParticipants || [])];
    updated.splice(index, 1);
    onChange({
      ...data,
      corporateParticipants: updated
    });
  };

  const handleUpdateParticipant = (index: number, field: keyof CorporateParticipant, value: string) => {
    const updated = [...(data.corporateParticipants || [])];
    updated[index] = { ...updated[index], [field]: value };
    onChange({
      ...data,
      corporateParticipants: updated
    });
  };
  
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-lg text-gray-900 mb-4">Opciones de pago</h4>
        
        {/* Recurrent Student - Solo para Comunidad CEAR */}
        {isComunidadCear && (
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 mb-4">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={data.isRecurrent}
                onChange={(e) => onChange({ ...data, isRecurrent: e.target.checked })}
                className="mt-0.5 w-4 h-4 text-[#0B95BA] rounded"
              />
              <div>
                <span className="text-sm text-gray-900">Soy alumno recurrente (15% descuento)</span>
                <p className="text-xs text-gray-600 mt-1">Sujeto a validación administrativa</p>
              </div>
            </label>
          </div>
        )}

        {/* Corporate Registration Section */}
        {isCorporativa && (
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-300 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#0B95BA] to-[#0BDDB3] rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <h5 className="text-sm text-gray-900">Inscripción corporativa</h5>
                <p className="text-xs text-gray-600">Mínimo 3 participantes</p>
              </div>
            </div>

            {/* Número de participantes */}
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-2">Número de participantes *</label>
              <input
                type="number"
                min={3}
                value={data.numberOfParticipants || 3}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 3;
                  onChange({ ...data, numberOfParticipants: Math.max(3, value) });
                }}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${
                  errors.numberOfParticipants ? 'border-red-500' : 'border-gray-200'
                } focus:outline-none focus:border-[#0B95BA]`}
              />
              {errors.numberOfParticipants && (
                <p className="text-xs text-red-500 mt-1">{errors.numberOfParticipants}</p>
              )}
            </div>

            {/* Lista de participantes */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700">
                  Participantes ({(data.corporateParticipants || []).length} de {data.numberOfParticipants || 3})
                </label>
                <button
                  type="button"
                  onClick={handleAddParticipant}
                  disabled={(data.corporateParticipants || []).length >= (data.numberOfParticipants || 3)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-[#0B95BA] to-[#0BDDB3] text-white text-xs rounded-lg hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-3 h-3" />
                  Agregar participante
                </button>
              </div>

              {/* Info sobre envío de correos */}
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-blue-900">
                      Se enviará un correo electrónico a cada participante con sus credenciales de acceso al campus virtual.
                    </p>
                  </div>
                </div>
              </div>

              {(data.corporateParticipants || []).length === 0 && (
                <div className="bg-white rounded-lg p-4 text-center border-2 border-dashed border-gray-300">
                  <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">No hay participantes agregados</p>
                  <p className="text-xs text-gray-500 mt-1">Agregue los datos de cada participante</p>
                </div>
              )}

              {(data.corporateParticipants || []).map((participant: CorporateParticipant, index: number) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-[#0B95BA] to-[#0BDDB3] rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">{index + 1}</span>
                      </div>
                      <span className="text-sm text-gray-900">Participante {index + 1}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveParticipant(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">Nombres *</label>
                      <input
                        type="text"
                        value={participant.firstName}
                        onChange={(e) => handleUpdateParticipant(index, 'firstName', e.target.value)}
                        className="w-full px-2 py-1.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-[#0B95BA]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">Apellidos *</label>
                      <input
                        type="text"
                        value={participant.lastName}
                        onChange={(e) => handleUpdateParticipant(index, 'lastName', e.target.value)}
                        className="w-full px-2 py-1.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-[#0B95BA]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">DNI *</label>
                      <input
                        type="text"
                        value={participant.dni}
                        onChange={(e) => handleUpdateParticipant(index, 'dni', e.target.value.replace(/\D/g, '').slice(0, 8))}
                        placeholder="12345678"
                        maxLength={8}
                        className="w-full px-2 py-1.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-[#0B95BA]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">Profesión *</label>
                      <input
                        type="text"
                        value={participant.profession}
                        onChange={(e) => handleUpdateParticipant(index, 'profession', e.target.value)}
                        className="w-full px-2 py-1.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-[#0B95BA]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        value={participant.email}
                        onChange={(e) => handleUpdateParticipant(index, 'email', e.target.value)}
                        className="w-full px-2 py-1.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-[#0B95BA]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">Celular *</label>
                      <input
                        type="tel"
                        value={participant.phone}
                        onChange={(e) => handleUpdateParticipant(index, 'phone', e.target.value)}
                        className="w-full px-2 py-1.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-[#0B95BA]"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {errors.corporateParticipants && (
                <p className="text-xs text-red-500">{errors.corporateParticipants}</p>
              )}
            </div>
          </div>
        )}

        {/* Payment Mode */}
        <div className="space-y-3">
          {/* Pronto Pago - Solo para tarifa pronto */}
          {showProntoPago && (
            <label
              className={`block p-3 rounded-lg border-2 cursor-pointer transition-all ${
                data.paymentMode === 'pronto' 
                  ? 'border-[#0B95BA] bg-white shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={data.paymentMode === 'pronto'}
                  onChange={() => onChange({ ...data, paymentMode: 'pronto' })}
                  className="w-4 h-4 text-[#0B95BA]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-900">Pronto pago</span>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">-8%</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">Pago único con descuento</p>
                </div>
              </div>
            </label>
          )}

          {/* Pago de Inscripción - Para regular, corporativa y comunidad */}
          {!showProntoPago && (
            <label
              className={`block p-3 rounded-lg border-2 cursor-pointer transition-all ${
                data.paymentMode === 'inscripcion' 
                  ? 'border-[#0B95BA] bg-white shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-2">
                <input
                  type="radio"
                  checked={data.paymentMode === 'inscripcion'}
                  onChange={() => onChange({ ...data, paymentMode: 'inscripcion' })}
                  className="mt-0.5 w-4 h-4 text-[#0B95BA]"
                />
                <div className="flex-1">
                  <span className="text-sm text-gray-900">Pago de inscripción</span>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {isCorporativa ? 'Pago inicial por cada participante' : 'Primera cuota del programa'}
                  </p>
                </div>
              </div>
            </label>
          )}

          {/* Pago en Cuotas - NO disponible para tarifa corporativa */}
          {!isCorporativa && (
            <label
              className={`block p-3 rounded-lg border-2 cursor-pointer transition-all ${
                data.paymentMode === 'cuotas' 
                  ? 'border-[#0B95BA] bg-white shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-2">
                <input
                  type="radio"
                  checked={data.paymentMode === 'cuotas'}
                  onChange={() => onChange({ ...data, paymentMode: 'cuotas' })}
                  className="mt-0.5 w-4 h-4 text-[#0B95BA]"
                />
                <div className="flex-1">
                  <span className="text-sm text-gray-900">Pago múltiple disponible</span>
                  <p className="text-xs text-gray-600 mt-0.5">Seleccione las cuotas que desea pagar</p>
                  
                  {data.paymentMode === 'cuotas' && (
                    <div className="mt-3">
                      <select
                        value={data.installments}
                        onChange={(e) => onChange({ ...data, installments: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#0B95BA]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value={2}>2 cuotas</option>
                        <option value={3}>3 cuotas</option>
                        <option value={4}>4 cuotas</option>
                      </select>
                      <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-900">
                        <strong>S/ {installmentAmount.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</strong> por cuota
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </label>
          )}
        </div>
        {errors.paymentMode && <p className="text-xs text-red-500">{errors.paymentMode}</p>}
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-br from-[#0B95BA] to-[#0BDDB3] rounded-lg p-4 text-white">
        {data.paymentMode === 'inscripcion' && (
          <div>
            {isCorporativa ? (
              <>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span>Pago inicial por participante:</span>
                  <span className="text-base">S/ {inscripcionAmount.toLocaleString('es-PE')}</span>
                </div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span>Número de participantes:</span>
                  <span className="text-base">{data.numberOfParticipants || 3}</span>
                </div>
                <div className="border-t border-white/30 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-base">Total pago inicial:</span>
                    <span className="text-2xl font-medium">S/ {(inscripcionAmount * (data.numberOfParticipants || 3)).toLocaleString('es-PE')}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <span className="text-base">Pago inicial:</span>
                <span className="text-2xl font-medium">S/ {inscripcionAmount.toLocaleString('es-PE')}</span>
              </div>
            )}
          </div>
        )}
        {data.paymentMode === 'cuotas' && (
          <div>
            {isCorporativa && (
              <div className="flex justify-between items-center text-sm mb-2">
                <span>{data.numberOfParticipants || 3} participantes × S/ {basePrice.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
                <span className="text-base">S/ {finalPrice.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
              </div>
            )}
            <div className={`${isCorporativa ? 'border-t border-white/30 pt-2 mt-2' : ''} flex justify-between items-center`}>
              <span className="text-base">Monto por cuota:</span>
              <span className="text-2xl font-medium">S/ {installmentAmount.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
            </div>
            <p className="text-xs text-white/80 mt-2">
              Total: S/ {finalPrice.toLocaleString('es-PE', { minimumFractionDigits: 2 })} en {data.installments} cuotas
            </p>
          </div>
        )}
        {data.paymentMode === 'pronto' && (
          <div>
            {isCorporativa && (
              <div className="flex justify-between items-center text-sm mb-2">
                <span>{data.numberOfParticipants || 3} participantes × S/ {basePrice.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
                <span className="text-base">S/ {(basePrice * (data.numberOfParticipants || 3)).toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
              </div>
            )}
            {totalDiscount > 0 && !isCorporativa && (
              <div className="flex justify-between items-center text-sm mb-2">
                <span>Descuento:</span>
                <span>-{(totalDiscount * 100).toFixed(0)}%</span>
              </div>
            )}
            <div className={`${(totalDiscount > 0 && !isCorporativa) || isCorporativa ? 'border-t border-white/30 pt-2 mt-2' : ''}`}>
              <div className="flex justify-between items-center">
                <span className="text-base">Total a pagar:</span>
                <span className="text-xl">S/ {finalPrice.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// STEP 3 COMPACT
function Step3Compact({ data, onChange, finalPrice, installmentAmount, errors, pricingType, basePrice }: any) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  const isCorporativa = pricingType === 'corporativa';
  const numberOfParticipants = isCorporativa ? (data.corporateParticipants?.length || 3) : 1;
  
  // Para tarifa corporativa, el precio es basePrice * número de participantes
  const corporativeTotalPrice = isCorporativa ? basePrice * numberOfParticipants : finalPrice;
  
  const inscripcionAmount = 500; // Monto fijo de inscripción
  const amountToPay = data.paymentMode === 'inscripcion' 
    ? (isCorporativa ? inscripcionAmount * numberOfParticipants : inscripcionAmount)
    : (data.paymentMode === 'cuotas' ? installmentAmount : (isCorporativa ? corporativeTotalPrice : finalPrice));

  const copyToClipboard = (text: string, field: string) => {
    try {
      // Método alternativo que funciona sin permisos de clipboard
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
      } catch (err) {
        console.error('Error al copiar:', err);
      }
      
      document.body.removeChild(textArea);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 10 * 1024 * 1024) {
      alert('El archivo no debe superar los 10 MB');
      return;
    }
    onChange({
      ...data,
      transferData: {
        ...data.transferData!,
        receipt: file
      }
    });
  };

  return (
    <div className="space-y-4">
      <h4 className="text-lg text-gray-900 mb-4">Método de pago</h4>

      {/* Transferencia Bancaria */}
      <div
        className={`rounded-lg border-2 transition-all ${
          data.paymentMethod === 'transfer' ? 'border-[#0B95BA] bg-white shadow-md' : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <label className="block p-4 cursor-pointer">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              checked={data.paymentMethod === 'transfer'}
              onChange={() => onChange({
                ...data,
                paymentMethod: 'transfer',
                transferData: data.transferData || { medium: 'bcp', amount: amountToPay, date: '', operationCode: '', receipt: null }
              })}
              className="w-4 h-4 text-[#0B95BA]"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Building className="w-4 h-4 text-[#0B95BA]" />
                <span className="text-sm text-gray-900">Transferencia bancaria</span>
              </div>
            </div>
          </div>
        </label>

        {/* Transfer Details */}
        {data.paymentMethod === 'transfer' && (
          <div className="px-4 pb-4 space-y-4 border-t border-gray-200 pt-4">
            {/* Encabezado */}
            <div className="text-center">
              <p className="text-xs text-gray-600">Realiza la transferencia a cualquiera de estas cuentas</p>
            </div>

            {/* Contenedor de bancos lado a lado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* BCP */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-center mb-3">
                <div className="h-8 w-24 bg-gray-200 rounded" />
              </div>
              
              <div className="bg-white rounded-lg p-3 space-y-3">
                {/* Cuenta Corriente */}
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Cuenta corriente</label>
                  <div className="flex items-center justify-between gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                    <span className="text-sm text-gray-900 font-mono">19326687598959</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('19326687598959', 'bcp-account')}
                      className="flex items-center gap-1 px-2 py-1 text-xs text-white bg-[#0B95BA] hover:bg-[#0BDDB3] rounded transition-colors"
                    >
                      {copiedField === 'bcp-account' ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                {/* CCI */}
                <div>
                  <label className="text-xs text-gray-600 block mb-1">CCI</label>
                  <div className="flex items-center justify-between gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                    <span className="text-xs text-gray-900 font-mono">00219300266875585911</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('00219300266875585911', 'bcp-cci')}
                      className="flex items-center gap-1 px-2 py-1 text-xs text-white bg-[#0B95BA] hover:bg-[#0BDDB3] rounded transition-colors"
                    >
                      {copiedField === 'bcp-cci' ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* BanBif */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-center mb-3">
                <div className="h-8 w-auto">
                  <div className="text-center font-bold text-[#0B95BA] text-xl">BanBif</div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-3 space-y-3">
                {/* Cuenta Corriente */}
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Cuenta corriente</label>
                  <div className="flex items-center justify-between gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                    <span className="text-sm text-gray-900 font-mono">0070006685162</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('0070006685162', 'banbif-account')}
                      className="flex items-center gap-1 px-2 py-1 text-xs text-white bg-[#0B95BA] hover:bg-[#0BDDB3] rounded transition-colors"
                    >
                      {copiedField === 'banbif-account' ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                {/* CCI */}
                <div>
                  <label className="text-xs text-gray-600 block mb-1">CCI</label>
                  <div className="flex items-center justify-between gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                    <span className="text-xs text-gray-900 font-mono">03820518700060516299</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('03820518700060516299', 'banbif-cci')}
                      className="flex items-center gap-1 px-2 py-1 text-xs text-white bg-[#0B95BA] hover:bg-[#0BDDB3] rounded transition-colors"
                    >
                      {copiedField === 'banbif-cci' ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* Titular y Monto */}
            <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-3">
              {/* Titular */}
              <div>
                <label className="text-xs text-gray-600 block mb-[10px] mt-[0px] mr-[0px] ml-[0px]">Titular</label>
                <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                  <span className="text-sm text-gray-900">Centro de Arbitraje Latinoamericano E Investigaciones Jurídicas SAC</span>
                </div>
              </div>

              {/* Monto a transferir */}
              <div>
                <label className="text-xs text-gray-600 block mb-[10px] mt-[0px] mr-[0px] ml-[0px]">Monto a transferir</label>
                <div className="bg-gradient-to-r from-[#0B95BA] to-[#0BDDB3] rounded-lg px-3 py-2">
                  <span className="text-lg text-white">S/ {amountToPay.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
                </div>
                {isCorporativa && (
                  <p className="text-xs text-gray-600 mt-1">
                    {numberOfParticipants} participantes × S/ {(data.paymentMode === 'inscripcion' ? inscripcionAmount : basePrice).toLocaleString('es-PE', { minimumFractionDigits: 2 })} c/u
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-2 bg-blue-100/50 rounded-lg p-3">
              <AlertCircle className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-900 mt-[3px] mr-[0px] mb-[0px] ml-[0px]">
                Realice la transferencia y complete el formulario con los datos de la operación
              </p>
            </div>

            {/* Payment Registration */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-700 mb-[10px] mt-[0px] mr-[0px] ml-[0px]">Fecha de pago *</label>
                  <input
                    type="date"
                    value={data.transferData?.date || ''}
                    onChange={(e) => onChange({
                      ...data,
                      transferData: { ...data.transferData!, date: e.target.value, medium: 'bcp' }
                    })}
                    className={`w-full px-3 py-2 text-sm rounded-lg border ${
                      errors.date ? 'border-red-500' : 'border-gray-200'
                    } focus:outline-none focus:border-[#0B95BA]`}
                  />
                  {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label className="block text-xs text-gray-700 mb-[10px] mt-[0px] mr-[0px] ml-[0px]">Monto pagado *</label>
                  <input
                    type="number"
                    value={data.transferData?.amount || ''}
                    onChange={(e) => onChange({
                      ...data,
                      transferData: { ...data.transferData!, amount: parseFloat(e.target.value), medium: 'bcp' }
                    })}
                    placeholder={`S/ ${amountToPay.toFixed(2)}`}
                    className={`w-full px-3 py-2 text-sm rounded-lg border ${
                      errors.amount ? 'border-red-500' : 'border-gray-200'
                    } focus:outline-none focus:border-[#0B95BA]`}
                  />
                  {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-700 mb-[10px] mt-[0px] mr-[0px] ml-[0px]">Código de operación *</label>
                <input
                  type="text"
                  value={data.transferData?.operationCode || ''}
                  onChange={(e) => onChange({
                    ...data,
                    transferData: { ...data.transferData!, operationCode: e.target.value, medium: 'bcp' }
                  })}
                  className={`w-full px-3 py-2 text-sm rounded-lg border ${
                    errors.operationCode ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:border-[#0B95BA]`}
                />
                {errors.operationCode && <p className="text-xs text-red-500 mt-1">{errors.operationCode}</p>}
              </div>

              <div>
                <label className="block text-xs text-gray-700 mb-[10px] mt-[0px] mr-[0px] ml-[0px]">Comprobante de pago *</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="receipt-upload-transfer"
                  />
                  <label
                    htmlFor="receipt-upload-transfer"
                    className={`flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg border-2 border-dashed ${
                      errors.receipt ? 'border-red-500' : 'border-gray-300'
                    } cursor-pointer hover:border-[#0B95BA] transition-colors`}
                  >
                    <Upload className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-600">
                      {data.transferData?.receipt ? data.transferData.receipt.name : 'Adjuntar imagen o PDF'}
                    </span>
                  </label>
                </div>
                {errors.receipt && <p className="text-xs text-red-500 mt-1">{errors.receipt}</p>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Yape o Plin */}
      <div
        className={`rounded-lg border-2 transition-all ${
          data.paymentMethod === 'yape-plin' ? 'border-[#0B95BA] bg-white shadow-md' : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <label className="block p-4 cursor-pointer">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              checked={data.paymentMethod === 'yape-plin'}
              onChange={() => onChange({
                ...data,
                paymentMethod: 'yape-plin',
                transferData: data.transferData || { medium: '', amount: amountToPay, date: '', operationCode: '', receipt: null }
              })}
              className="w-4 h-4 text-[#0B95BA]"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Smartphone className="w-4 h-4 text-[#0B95BA]" />
                <span className="text-sm text-gray-900">Yape o Plin</span>
              </div>
            </div>
          </div>
        </label>

        {/* Yape/Plin Details */}
        {data.paymentMethod === 'yape-plin' && (
          <div className="px-4 pb-4 space-y-4 border-t border-gray-200 pt-4">
            {/* Payment Info - Mejorado */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200 shadow-sm">

              
              <div className="bg-white rounded-lg p-3 space-y-3">
                {/* QR Code */}
                <div className="flex justify-center py-3">
                  <img 
                    src={''}
                    alt="QR Yape" 
                    className="w-48 h-48 object-contain"
                  />
                </div>

                {/* Número de celular */}
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Número de celular (YAPE)</label>
                  <div className="flex items-center justify-between gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                    <span className="text-sm text-gray-900 font-mono">963 184 543</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('963184543', 'phone')}
                      className="flex items-center gap-1 px-2 py-1 text-xs text-white bg-[#0B95BA] hover:bg-[#0BDDB3] rounded transition-colors"
                    >
                      {copiedField === 'phone' ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Titular */}
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Titular</label>
                  <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                    <span className="text-sm text-gray-900">Centro de Arbitraje Latinoamericano E Investigaciones Jurídicas SAC</span>
                  </div>
                </div>

                {/* Monto a pagar */}
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Monto a pagar</label>
                  <div className="bg-gradient-to-r from-[#0B95BA] to-[#0BDDB3] rounded-lg px-3 py-2">
                    <span className="text-lg text-white">S/ {amountToPay.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
                  </div>
                  {isCorporativa && (
                    <p className="text-xs text-gray-600 mt-1">
                      {numberOfParticipants} participantes × S/ {(data.paymentMode === 'inscripcion' ? inscripcionAmount : basePrice).toLocaleString('es-PE', { minimumFractionDigits: 2 })} c/u
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-3 flex items-start gap-2 bg-purple-100/50 rounded-lg p-2">
                <AlertCircle className="w-4 h-4 text-purple-700 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-purple-900">
                  Escanee el código QR o use el número de celular para realizar el pago
                </p>
              </div>
            </div>

            {/* Payment Registration */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-700 mb-1">Medio de pago *</label>
                <select
                  value={data.transferData?.medium || ''}
                  onChange={(e) => onChange({
                    ...data,
                    transferData: { ...data.transferData!, medium: e.target.value }
                  })}
                  className={`w-full px-3 py-2 text-sm rounded-lg border ${
                    errors.medium ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:border-[#0B95BA]`}
                >
                  <option value="">Seleccione...</option>
                  <option value="yape">Yape</option>
                  <option value="plin">Plin</option>
                </select>
                {errors.medium && <p className="text-xs text-red-500 mt-1">{errors.medium}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-700 mb-1">Fecha de pago *</label>
                  <input
                    type="date"
                    value={data.transferData?.date || ''}
                    onChange={(e) => onChange({
                      ...data,
                      transferData: { ...data.transferData!, date: e.target.value }
                    })}
                    className={`w-full px-3 py-2 text-sm rounded-lg border ${
                      errors.date ? 'border-red-500' : 'border-gray-200'
                    } focus:outline-none focus:border-[#0B95BA]`}
                  />
                  {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label className="block text-xs text-gray-700 mb-1">Monto pagado *</label>
                  <input
                    type="number"
                    value={data.transferData?.amount || ''}
                    onChange={(e) => onChange({
                      ...data,
                      transferData: { ...data.transferData!, amount: parseFloat(e.target.value) }
                    })}
                    placeholder={`S/ ${amountToPay.toFixed(2)}`}
                    className={`w-full px-3 py-2 text-sm rounded-lg border ${
                      errors.amount ? 'border-red-500' : 'border-gray-200'
                    } focus:outline-none focus:border-[#0B95BA]`}
                  />
                  {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-700 mb-1">Código de operación *</label>
                <input
                  type="text"
                  value={data.transferData?.operationCode || ''}
                  onChange={(e) => onChange({
                    ...data,
                    transferData: { ...data.transferData!, operationCode: e.target.value }
                  })}
                  className={`w-full px-3 py-2 text-sm rounded-lg border ${
                    errors.operationCode ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:border-[#0B95BA]`}
                />
                {errors.operationCode && <p className="text-xs text-red-500 mt-1">{errors.operationCode}</p>}
              </div>

              <div>
                <label className="block text-xs text-gray-700 mb-1">Comprobante de pago *</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="receipt-upload-yape"
                  />
                  <label
                    htmlFor="receipt-upload-yape"
                    className={`flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg border-2 border-dashed ${
                      errors.receipt ? 'border-red-500' : 'border-gray-300'
                    } cursor-pointer hover:border-[#0B95BA] transition-colors`}
                  >
                    <Upload className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-600">
                      {data.transferData?.receipt ? data.transferData.receipt.name : 'Adjuntar imagen o PDF'}
                    </span>
                  </label>
                </div>
                {errors.receipt && <p className="text-xs text-red-500 mt-1">{errors.receipt}</p>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pago en línea - Niubiz */}
      <label
        className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
          data.paymentMethod === 'niubiz' ? 'border-[#0B95BA] bg-white shadow-md' : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <div className="flex items-center gap-3">
          <input
            type="radio"
            checked={data.paymentMethod === 'niubiz'}
            onChange={() => onChange({ ...data, paymentMethod: 'niubiz' })}
            className="w-4 h-4 text-[#0B95BA]"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <CreditCard className="w-4 h-4 text-[#0B95BA]" />
              <span className="text-sm text-gray-900">Pago en línea</span>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Inmediato</span>
            </div>
            <p className="text-xs text-gray-600">Tarjeta débito/crédito · Niubiz</p>
          </div>
        </div>
      </label>

      {errors.paymentMethod && <p className="text-xs text-red-500">{errors.paymentMethod}</p>}

      {/* Amount to Pay - Oculto para tarifa corporativa */}
      {!isCorporativa && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Monto a pagar:</span>
            <span className="text-xl text-[#0B95BA]">S/ {amountToPay.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// STEP 4 COMPACT
function Step4Compact({ participantData, paymentData, courseTitle, finalPrice, pricingType }: any) {
  const isPending = paymentData.paymentMethod === 'transfer' || paymentData.paymentMethod === 'yape-plin';
  const isCorporativa = pricingType === 'corporativa';
  const numberOfParticipants = isCorporativa ? paymentData.corporateParticipants?.length || 0 : 1;

  return (
    <div className="space-y-4">
      {/* Status */}
      <div className={`rounded-lg p-4 border-2 ${
        isPending ? 'bg-yellow-50 border-yellow-300' : 'bg-green-50 border-green-300'
      }`}>
        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          ) : (
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          )}
          <div>
            <h4 className={`text-base ${isPending ? 'text-yellow-900' : 'text-green-900'}`}>
              {isPending ? 'Inscripción registrada' : 'Pago confirmado'}
            </h4>
            <p className={`text-sm ${isPending ? 'text-yellow-700' : 'text-green-700'}`}>
              {isPending ? 'Inscripción registrada' : 'Acceso habilitado'}
            </p>
          </div>
        </div>
        {isPending && (
          <p className="text-xs text-yellow-800 mt-3 bg-white/50 rounded p-2">
            <AlertCircle className="w-3 h-3 inline mr-1" />
            Validaremos su pago en 24-48 horas
          </p>
        )}
      </div>

      {/* Summary - Resaltado */}
      <div className="bg-[#0B95BA] rounded-[20px] p-[29px] shadow-lg">
        <div className="flex items-center gap-[3px] mb-[6px]">
          <div className="relative shrink-0 size-[27.166px]">
            <div className="absolute inset-[-5.56%] pt-[0px] pr-[8px] pb-[0px] pl-[0px] p-[0px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.184 30.184">
                <g>
                  <rect height="27.1656" rx="4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.0184" width="27.1656" x="1.5092" y="1.5092" />
                  <path d="M 7.547 15.092 L 12.566 20.111 L 22.637 10.073" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.0184" />
                </g>
              </svg>
            </div>
          </div>
          <p className="font-medium text-[21.319px] text-white pt-[0px] pr-[0px] pb-[0px] pl-[16px]">Resumen de inscripción</p>
        </div>
        
        <div className="space-y-[15px] mt-[15px]">
          {/* Programa */}
          <div className="bg-white rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] px-[40px] py-[20px]">
            <div className="flex items-center gap-[99px]">
              <p className="text-[#747474] text-[21.319px] whitespace-nowrap">Programa</p>
              <p className="text-black text-[21.319px] flex-1">{courseTitle}</p>
            </div>
          </div>

          {/* Participante */}
          <div className="bg-white rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] px-[40px] py-[20px]">
            <div className="flex items-center gap-[66px]">
              <p className="text-[#747474] text-[21.319px] whitespace-nowrap">Participantes</p>
              <p className="text-black text-[21.319px] flex-1">{participantData.firstName} {participantData.lastName}</p>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] px-[40px] py-[20px]">
            <div className="flex items-center gap-[15px]">
              <p className="text-[#747474] text-[21.319px] whitespace-nowrap">Correo electrónico</p>
              <p className="text-black text-[21.319px] flex-1">{participantData.email}</p>
            </div>
          </div>

          {/* Monto pagado */}
          <div className="bg-white rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] px-[40px] py-[20px]">
            <div className="flex items-center gap-[54px]">
              <p className="text-[#747474] text-[21.319px] whitespace-nowrap">Monto pagado</p>
              <p className="text-[#0B95BA] text-[34px] font-semibold flex-1">S/ {finalPrice.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h5 className="text-sm text-gray-900 mb-2">Próximos pasos</h5>
        <ul className="space-y-1 text-xs text-gray-700">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-3 h-3 mt-0.5 text-blue-600 flex-shrink-0" />
            <span>Recibirá un correo de confirmación</span>
          </li>
          {isCorporativa ? (
            <>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3 h-3 mt-0.5 text-blue-600 flex-shrink-0" />
                <span>Se enviará un correo a cada uno de los {numberOfParticipants} participantes con sus credenciales de acceso</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3 h-3 mt-0.5 text-blue-600 flex-shrink-0" />
                <span>{isPending ? 'Acceso habilitado tras validación del pago' : 'Acceso inmediato al campus para todos los participantes'}</span>
              </li>
            </>
          ) : (
            <li className="flex items-start gap-2">
              <CheckCircle className="w-3 h-3 mt-0.5 text-blue-600 flex-shrink-0" />
              <span>{isPending ? 'Acceso habilitado tras validación' : 'Acceso inmediato al campus'}</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}