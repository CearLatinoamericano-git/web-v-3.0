import { useState } from 'react';
import { X, Mail, Lock, User, Phone } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => boolean;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (isRegistering) {
      // Simulate registration
      alert('Registro exitoso. Por favor, inicia sesión.');
      setIsRegistering(false);
      setEmail('');
      setPassword('');
      setName('');
      setPhone('');
    } else {
      const success = onLogin(email, password);
      if (success) {
        onClose();
        setEmail('');
        setPassword('');
      } else {
        setError('Credenciales incorrectas. Por favor, verifica tu email y contraseña.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-gray-900 mb-2">
              {isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}
            </h2>
            <p className="text-gray-600">
              {isRegistering
                ? 'Regístrese para acceder a todos nuestros programas'
                : 'Acceda a su cuenta de CEAR'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                      placeholder="+51 999 999 999"
                      required
                    />
                  </div>
                </div>
              </>
            )}

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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {!isRegistering && (
              <div className="flex justify-end">
                <a href="#" className="text-sm text-[#0B95BA] hover:text-[#087A98]">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            )}

            {error && (
              <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            {!isRegistering && (
              <div className="mt-2 p-4 bg-[#0B95BA]/5 border border-[#0B95BA]/20 rounded-lg">
                <p className="text-xs text-gray-700 mb-2">Credenciales de prueba:</p>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span className="text-[#0B95BA]">estudiante@cear.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contraseña:</span>
                    <span className="text-[#0B95BA]">cear2025</span>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#0B95BA] text-white rounded-lg hover:bg-[#087A98] transition-colors"
            >
              {isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isRegistering ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
              <button
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-[#0B95BA] hover:text-[#087A98]"
              >
                {isRegistering ? 'Inicia sesión' : 'Regístrate'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}