import { useState } from 'react';
import { CheckCircle, CreditCard, Building, Smartphone, ArrowLeft, Mail, Lock, Copy, ExternalLink } from 'lucide-react';
import { courses } from '../data/coursesUpdated';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface EnrollmentProps {
  courseId: string;
  onBack: () => void;
  onComplete: () => void;
}

export function Enrollment({ courseId, onBack, onComplete }: EnrollmentProps) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'yape'>('card');
  const [email, setEmail] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const course = courses.find(c => c.id === courseId);

  if (!course) return null;

  const steps = [
    { number: 1, title: 'Información personal', completed: step > 1 },
    { number: 2, title: 'Método de pago', completed: step > 2 },
    { number: 3, title: 'Confirmación', completed: step > 3 }
  ];

  const generatePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let password = '';
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      // Generar credenciales antes de pasar al paso 3
      const newPassword = generatePassword();
      setGeneratedPassword(newPassword);
      setStep(3);
    } else {
      // Completar y redirigir
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-[#0B95BA] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al curso
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                      s.completed || step === s.number
                        ? 'bg-[#0B95BA] border-[#0B95BA] text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    {s.completed ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <span>{s.number}</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-600 mt-2 text-center">{s.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-4 transition-colors ${
                      s.completed ? 'bg-[#0B95BA]' : 'bg-gray-300'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-gray-900 mb-6">Información personal</h2>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Nombres *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                        placeholder="Tus nombres"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Apellidos *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                        placeholder="Tus apellidos"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        DNI / Documento de identidad *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                        placeholder="12345678"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                        placeholder="+51 999 999 999"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Correo *
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                      placeholder="tu@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Profesión / Ocupación
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                      placeholder="Abogado, Ingeniero, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Institución / Empresa
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                      placeholder="Nombre de tu institución"
                    />
                  </div>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-gray-900 mb-6">Método de Pago</h2>
                
                {/* Payment Method Selection */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-lg transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-[#0B95BA] bg-[#0B95BA]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className={`w-8 h-8 mx-auto mb-2 ${paymentMethod === 'card' ? 'text-[#0B95BA]' : 'text-gray-400'}`} />
                    <div className="text-sm text-gray-900">Tarjeta</div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-4 border-2 rounded-lg transition-colors ${
                      paymentMethod === 'bank'
                        ? 'border-[#0B95BA] bg-[#0B95BA]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Building className={`w-8 h-8 mx-auto mb-2 ${paymentMethod === 'bank' ? 'text-[#0B95BA]' : 'text-gray-400'}`} />
                    <div className="text-sm text-gray-900">Transferencia</div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('yape')}
                    className={`p-4 border-2 rounded-lg transition-colors ${
                      paymentMethod === 'yape'
                        ? 'border-[#0B95BA] bg-[#0B95BA]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Smartphone className={`w-8 h-8 mx-auto mb-2 ${paymentMethod === 'yape' ? 'text-[#0B95BA]' : 'text-gray-400'}`} />
                    <div className="text-sm text-gray-900">Yape / Plin</div>
                  </button>
                </div>

                {/* Payment Form */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Número de tarjeta
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Fecha de vencimiento
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                          placeholder="MM/AA"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Nombre en la tarjeta
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                        placeholder="NOMBRE APELLIDO"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'bank' && (
                  <div className="bg-[#0B95BA]/5 border border-[#0B95BA]/20 rounded-lg p-6">
                    <h3 className="text-gray-900 mb-4">Datos para transferencia</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Banco:</span>
                        <span className="text-gray-900">BCP</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cuenta corriente:</span>
                        <span className="text-gray-900">123-456789-0-12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Titular:</span>
                        <span className="text-gray-900">CEAR LATINOAMERICANO SAC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">RUC:</span>
                        <span className="text-gray-900">20123456789</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#0B95BA]/20">
                      <p className="text-sm text-gray-700">
                        Después de realizar la transferencia, envía el comprobante a <strong>pagos@cearlatinoamericano.com</strong>
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === 'yape' && (
                  <div className="bg-[#0B95BA]/5 border border-[#0B95BA]/20 rounded-lg p-6 text-center">
                    <div className="w-48 h-48 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <div className="text-gray-400">Código QR de Yape</div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      Escanea este código con tu app Yape o Plin
                    </p>
                    <p className="text-sm text-gray-600">
                      O envía al número: <strong>999 999 999</strong>
                    </p>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                {/* Success Message */}
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h2 className="text-gray-900 mb-4">¡Matrícula confirmada!</h2>
                  <p className="text-gray-600 mb-4 max-w-md mx-auto text-justify">
                    Tu pago ha sido procesado exitosamente. Tu cuenta en el campus virtual ha sido creada automáticamente con las siguientes credenciales de acceso:
                  </p>
                </div>

                {/* Credentials Card */}
                <div className="bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-xl shadow-lg p-8 text-white">
                  <div className="flex items-center gap-2 mb-6">
                    <Lock className="w-6 h-6" />
                    <h3 className="text-white">Tus Credenciales de Acceso</h3>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    {/* Email */}
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-white/80" />
                        <span className="text-sm text-white/80">Usuario (Email)</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-lg font-mono break-all">{email || 'tu@email.com'}</span>
                        <button 
                          onClick={() => navigator.clipboard.writeText(email || 'tu@email.com')}
                          className="p-2 hover:bg-white/10 rounded transition-colors flex-shrink-0"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Password */}
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="w-4 h-4 text-white/80" />
                        <span className="text-sm text-white/80">Contraseña</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-lg font-mono break-all">{generatedPassword}</span>
                        <button 
                          onClick={() => navigator.clipboard.writeText(generatedPassword)}
                          className="p-2 hover:bg-white/10 rounded transition-colors flex-shrink-0"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-sm text-white/90 text-justify">
                      <strong>Importante:</strong> Guarda estas credenciales en un lugar seguro. También hemos enviado esta información a tu correo. Podrás cambiar tu contraseña desde tu perfil una vez que inicies sesión en el campus virtual.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => window.open('/campus-login', '_blank')}
                      className="flex items-center justify-center gap-2 px-8 py-3 bg-[#0B95BA] text-white rounded-lg hover:bg-[#087A98] transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Ir al campus virtual
                    </button>
                    <p className="text-sm text-gray-600 text-center">
                      El campus virtual se abrirá en una nueva pestaña donde podrás iniciar sesión con tus credenciales
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="text-gray-900 mb-4">Resumen de la compra</h3>
              <div className="mb-4">
                <ImageWithFallback
                  src={course.image}
                  alt={course.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <p className="text-sm text-gray-900">{course.title}</p>
              </div>
              
              <div className="space-y-3 py-4 border-y border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Precio del programa</span>
                  <span className="text-gray-900">S/ {course.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Descuento</span>
                  <span className="text-green-600">- S/ 0</span>
                </div>
              </div>

              <div className="flex justify-between pt-4 mb-6">
                <span className="text-gray-900">Total</span>
                <span className="text-[#0B95BA]">S/ {course.price.toLocaleString()}</span>
              </div>

              {step < 3 && (
                <button
                  onClick={handleContinue}
                  className="w-full py-3 bg-[#0B95BA] text-white rounded-lg hover:bg-[#087A98] transition-colors"
                >
                  {step === 1 && 'Continuar al pago'}
                  {step === 2 && 'Confirmar y pagar'}
                </button>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0B95BA] flex-shrink-0 mt-0.5" />
                    <span>Certificación universitaria incluida</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0B95BA] flex-shrink-0 mt-0.5" />
                    <span>Acceso inmediato al campus virtual</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0B95BA] flex-shrink-0 mt-0.5" />
                    <span>Todos los materiales descargables</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}