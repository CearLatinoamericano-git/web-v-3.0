import { useState } from 'react';
import { X, Mail, Lock, CheckCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setStep(1);
    setEmail('');
    setCode('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setIsLoading(false);
    onClose();
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      // Simulación de envío de código
      setIsLoading(false);
      setStep(2);
    }, 800);
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      // Código de prueba: 123456
      if (code === '123456') {
        setIsLoading(false);
        setStep(3);
      } else {
        setError('Código incorrecto. Intente nuevamente');
        setIsLoading(false);
      }
    }, 800);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep(4);
    }, 800);
  };

  const handleResendCode = () => {
    setCode('');
    setError('');
    alert('Se ha enviado un nuevo código de verificación a su correo.');
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 md:p-8">
          {/* Paso 1: Ingreso de email */}
          {step === 1 && (
            <div>
              {/* Icono */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[#0B95BA] rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Título */}
              <h2 className="text-center text-[#0B95BA] mb-2 font-bold text-[22px]">
                Recuperar contraseña
              </h2>
              <p className="text-center text-gray-600 mb-6 text-sm text-justify">
                Ingrese su correo para recibir un código de verificación
              </p>

              {/* Formulario */}
              <form onSubmit={handleEmailSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Correo
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent transition-all"
                      placeholder="correo@ejemplo.com"
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#0B95BA] text-white rounded-xl hover:bg-[#087A98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl font-medium"
                >
                  {isLoading ? 'Enviando...' : 'Enviar código'}
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all border-2 border-gray-200 font-medium"
                >
                  Cancelar
                </button>
              </form>
            </div>
          )}

          {/* Paso 2: Verificación de código */}
          {step === 2 && (
            <div>
              {/* Botón volver */}
              <button
                onClick={() => setStep(1)}
                className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Volver</span>
              </button>

              {/* Icono */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[#0B95BA] rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Título */}
              <h2 className="text-center text-[#0B95BA] mb-2 font-bold text-[22px]">
                Verificar código
              </h2>
              <p className="text-center text-gray-600 mb-6 text-sm">
                Ingrese el código de 6 dígitos enviado a<br />
                <span className="font-medium text-gray-800">{email}</span>
              </p>

              {/* Formulario */}
              <form onSubmit={handleCodeSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Código de verificación
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent text-center text-xl tracking-widest"
                    placeholder="000000"
                    maxLength={6}
                    required
                    autoFocus
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Código de prueba: <span className="font-mono font-bold text-[#0B95BA]">123456</span>
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-600 text-center">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#0B95BA] text-white rounded-xl hover:bg-[#087A98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl font-medium"
                >
                  {isLoading ? 'Verificando...' : 'Verificar código'}
                </button>

                <button
                  type="button"
                  onClick={handleResendCode}
                  className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium"
                >
                  Reenviar código
                </button>
              </form>
            </div>
          )}

          {/* Paso 3: Nueva contraseña */}
          {step === 3 && (
            <div>
              {/* Botón volver */}
              <button
                onClick={() => setStep(2)}
                className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Volver</span>
              </button>

              {/* Icono */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[#0B95BA] rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Título */}
              <h2 className="text-center text-[#0B95BA] mb-2 font-bold text-[22px]">
                Nueva contraseña
              </h2>
              <p className="text-center text-gray-600 mb-6 text-sm">
                Ingrese su nueva contraseña
              </p>

              {/* Formulario */}
              <form onSubmit={handlePasswordSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Nueva contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent transition-all"
                      placeholder="••••••••"
                      required
                      autoFocus
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Mínimo 8 caracteres
                  </p>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Confirmar contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent transition-all"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-600 text-center">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#0B95BA] text-white rounded-xl hover:bg-[#087A98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl font-medium"
                >
                  {isLoading ? 'Actualizando...' : 'Actualizar contraseña'}
                </button>
              </form>
            </div>
          )}

          {/* Paso 4: Confirmación */}
          {step === 4 && (
            <div>
              {/* Icono de éxito */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Título */}
              <h2 className="text-center text-green-600 mb-2 font-bold text-[22px]">
                ¡Contraseña actualizada!
              </h2>
              <p className="text-center text-gray-600 mb-8 text-sm text-justify">
                Su contraseña ha sido cambiada exitosamente.
              </p>

              <button
                onClick={handleClose}
                className="w-full py-3 bg-[#0B95BA] text-white rounded-xl hover:bg-[#087A98] transition-all shadow-lg hover:shadow-xl font-medium"
              >
                Entendido
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}