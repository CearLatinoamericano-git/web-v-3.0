import { useState } from 'react';
import { Mail, Lock, AlertCircle, Video, HelpCircle, ArrowLeft, ChevronRight } from 'lucide-react';
import Capa1 from '../imports/Capa1';
import imgFondoLogin from "/images/fondo-login.png";
import { TermsModal } from '../components/modals/TermsModal';
import { PrivacyModal } from '../components/modals/PrivacyModal';
import { FAQModal } from '../components/modals/FAQModal';
import { ContactModal } from '../components/modals/ContactModal';
import { ForgotPasswordModal } from '../components/modals/ForgotPasswordModal';
import { VideoGuideModal } from '../components/modals/VideoGuideModal';

interface CampusLoginProps {
  onLogin: (email: string, password: string) => boolean;
  onBackToMain?: () => void;
}

// Componente del logo CEAR
function CearLogo() {
  return (
    <div 
      className="w-[280px] h-[64px]"
      style={{
        ['--fill-0' as string]: '#FFFFFF'
      }}
    >
      <Capa1 />
    </div>
  );
}

// Componente de bandera PE
function PeruFlag() {
  return (
    <div className="w-[48px] h-[35px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 56">
        <g>
          <rect x="0" y="0" width="25" height="56" fill="#D91023"/>
          <rect x="26" y="0" width="25" height="56" fill="#EEEEEE"/>
          <rect x="52" y="0" width="25" height="56" fill="#D91023"/>
        </g>
      </svg>
    </div>
  );
}

export function CampusLogin({ onLogin, onBackToMain }: CampusLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showTestAccounts, setShowTestAccounts] = useState(false);
  const [showConfirmationCode, setShowConfirmationCode] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [pendingCredentials, setPendingCredentials] = useState<{email: string, password: string} | null>(null);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showVideoGuide, setShowVideoGuide] = useState(false);
  
  // Estado para el flujo de 2 pasos en móvil
  const [mobileStep, setMobileStep] = useState<1 | 2>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      // Validar credenciales básicas
      const validCredentials = 
        (email === 'estudiante@cear.com' && password === 'cear2025') ||
        (email === 'area.academica@cear.com' && password === 'cear2025');
      
      if (validCredentials) {
        // Guardar credenciales y mostrar popup de confirmación
        setPendingCredentials({ email, password });
        setShowConfirmationCode(true);
        setIsLoading(false);
      } else {
        setError('Credenciales incorrectas. Verifique su correo electrónico y contraseña, luego intente nuevamente.');
        setIsLoading(false);
      }
    }, 500);
  };

  const handleConfirmationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCodeError('');
    setIsLoading(true);

    setTimeout(() => {
      // Código de confirmación simulado: 123456
      if (confirmationCode === '123456') {
        // Completar el login
        if (pendingCredentials) {
          onLogin(pendingCredentials.email, pendingCredentials.password);
        }
      } else {
        setCodeError('Código incorrecto. Verifique e intente nuevamente.');
        setIsLoading(false);
      }
    }, 500);
  };

  const handleResendCode = () => {
    setConfirmationCode('');
    setCodeError('');
    // Simulación de reenvío
    alert('Se ha enviado un nuevo código de confirmación a su correo.');
  };

  return (
    <>
      {/* VERSION MOBILE - 2 STEPS */}
      <div className="min-h-screen w-full lg:hidden">
        {/* STEP 1: Pantalla de Bienvenida */}
        {mobileStep === 1 && (
          <div className="relative h-screen w-full bg-[#0b95ba] overflow-hidden">
            {/* Imagen de fondo */}
            <div className="absolute inset-0 opacity-20">
              <img 
                src={''} 
                alt="" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Contenido */}
            <div className="relative z-10 flex flex-col h-full justify-between p-6">
              {/* Logo en la parte superior */}
              <div className="pt-4">
                <div className="scale-75 origin-left">
                  <CearLogo />
                </div>
              </div>

              {/* Texto central */}
              <div className="flex-1 flex items-center">
                <div className="w-full">
                  <p className="text-white text-xl font-light mb-2">
                    Bienvenido al
                  </p>
                  <h1 className="text-white text-5xl font-bold leading-tight mb-4">
                    CAMPUS<br />VIRTUAL
                  </h1>
                  <p className="text-white text-lg font-light leading-relaxed max-w-sm">
                    ¡Comprometidos con tu crecimiento profesional!
                  </p>
                </div>
              </div>

              {/* Footer con selector de país y botón de avanzar */}
              <div className="flex items-end justify-between gap-4 pb-4">
                <div className="bg-white rounded-2xl shadow-lg px-4 py-2 flex items-center gap-2 w-fit">
                  <div className="scale-75">
                    <PeruFlag />
                  </div>
                  <span className="text-xl text-black font-medium">PE</span>
                </div>

                {/* Botón de avanzar */}
                <button
                  onClick={() => setMobileStep(2)}
                  className="bg-white rounded-2xl shadow-lg w-14 h-14 flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-105"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-6 h-6 text-[#0B95BA]" />
                </button>
              </div>
            </div>

            {/* Botón de accesos de prueba */}
            <button
              onClick={() => setShowTestAccounts(!showTestAccounts)}
              className="absolute top-6 right-6 bg-white rounded-full shadow-xl w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-105 z-20"
              title="Accesos de prueba"
            >
              <svg className="w-5 h-5 text-[#0B95BA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </button>

            {/* Panel flotante de accesos de prueba */}
            {showTestAccounts && (
              <div className="absolute top-20 right-6 w-80 bg-white rounded-2xl shadow-2xl border-2 border-[#0B95BA] z-30 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#0B95BA] rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-900">Accesos de Prueba</h3>
                  </div>
                  <button
                    onClick={() => setShowTestAccounts(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-3">
                  {/* Estudiante */}
                  <div className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-gray-200 hover:border-[#0B95BA] transition-colors cursor-pointer"
                       onClick={() => { setEmail('estudiante@cear.com'); setPassword('cear2025'); setShowTestAccounts(false); setMobileStep(2); }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">👨‍🎓</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm text-gray-900">Estudiante</p>
                        <p className="text-xs text-gray-600">Juan Pérez García</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Email:</span>
                        <code className="text-gray-700 bg-white px-2 py-0.5 rounded">estudiante@cear.com</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Pass:</span>
                        <code className="text-gray-700 bg-white px-2 py-0.5 rounded">cear2025</code>
                      </div>
                    </div>
                  </div>

                  {/* Área académica */}
                  <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-gray-200 hover:border-[#0B95BA] transition-colors cursor-pointer"
                       onClick={() => { setEmail('area.academica@cear.com'); setPassword('cear2025'); setShowTestAccounts(false); setMobileStep(2); }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold text-sm">👔</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm text-gray-900">Área académica</p>
                        <p className="text-xs text-gray-600">Área Académica</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Email:</span>
                        <code className="text-gray-700 bg-white px-2 py-0.5 rounded">area.academica@cear.com</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Pass:</span>
                        <code className="text-gray-700 bg-white px-2 py-0.5 rounded">cear2025</code>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-600 text-center">
                    💡 Click en cualquier usuario para autocompletar
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Formulario de Login */}
        {mobileStep === 2 && (
          <div className="relative min-h-screen w-full bg-white flex flex-col">
            {/* Header con botones */}
            <div className="p-4 flex items-center justify-between border-b border-gray-100">
              <button 
                onClick={() => setMobileStep(1)}
                className="bg-white rounded-xl shadow-md w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                title="Volver"
              >
                <ArrowLeft className="w-5 h-5 text-[#0B95BA]" />
              </button>

              <div className="flex gap-2">
                <button 
                  className="bg-white rounded-xl shadow-md w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  title="Video de guía"
                  onClick={() => setShowVideoGuide(true)}
                >
                  <Video className="w-5 h-5 text-[#0B95BA]" />
                </button>
                <button 
                  className="bg-white rounded-xl shadow-md w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  title="Preguntas frecuentes"
                  onClick={() => setShowFAQ(true)}
                >
                  <HelpCircle className="w-5 h-5 text-[#0B95BA]" />
                </button>
              </div>
            </div>

            {/* Contenido del formulario */}
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="w-full max-w-md">
                <div className="w-full bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  {/* Título */}
                  <div className="text-center mb-6">
                    <h2 className="mb-2 text-[#0B95BA] font-bold text-xl">Inicio de sesión</h2>
                    <p className="text-gray-600 text-sm">Ingrese sus credenciales</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Correo */}
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
                          className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent transition-all text-sm"
                          placeholder="correo@ejemplo.com"
                          required
                        />
                      </div>
                    </div>

                    {/* Contraseña */}
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
                          className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent transition-all text-sm"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-red-600">{error}</p>
                      </div>
                    )}

                    {/* Recordar contraseña y olvido */}
                    <div className="flex flex-col gap-3 text-sm">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 text-[#0B95BA] rounded border-gray-300 focus:ring-[#0B95BA] flex-shrink-0"
                        />
                        <span className="text-gray-600 group-hover:text-gray-800 text-sm">Recordar contraseña</span>
                      </label>
                      <button 
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-[#0B95BA] hover:text-[#087A98] hover:underline text-sm text-left"
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>

                    {/* Botón de submit */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 bg-[#0B95BA] text-white rounded-xl hover:bg-[#087A98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-base font-medium"
                    >
                      {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </button>
                  </form>

                  {/* Footer del formulario */}
                  <div className="mt-6 pt-5 border-t border-gray-200">
                    <div className="flex flex-col gap-2 text-xs text-center text-[#0B95BA]">
                      <button 
                        type="button"
                        onClick={() => setShowContact(true)} 
                        className="hover:underline"
                      >
                        Contacto
                      </button>
                      <button 
                        type="button"
                        onClick={() => setShowTerms(true)} 
                        className="hover:underline"
                      >
                        Términos y condiciones
                      </button>
                      <button 
                        type="button"
                        onClick={() => setShowPrivacy(true)} 
                        className="hover:underline"
                      >
                        Política de Privacidad
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="p-4 text-center">
              <p className="text-gray-400 text-xs">2025 • CEAR LATINOAMERICANO</p>
            </div>
          </div>
        )}
      </div>

      {/* VERSION DESKTOP - ORIGINAL */}
      <div className="hidden lg:flex min-h-screen w-full flex-row">
        {/* Lado izquierdo - Fondo azul con imagen */}
        <div className="w-1/2 bg-[#0b95ba] relative overflow-hidden flex flex-col min-h-screen">
          {/* Imagen de fondo */}
          <div className="absolute inset-0 opacity-20">
            <img 
              src={''} 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Contenido del lado izquierdo */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Logo */}
            <div className="p-12">
              <CearLogo />
            </div>

            {/* Texto central */}
            <div className="flex-1 flex items-center px-20">
              <div className="max-w-2xl">
                <p className="text-white text-3xl xl:text-4xl font-light mb-3">
                  Bienvenido al
                </p>
                <h1 className="text-white text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                  CAMPUS<br />VIRTUAL
                </h1>
                <p className="text-white text-2xl xl:text-3xl font-light leading-relaxed max-w-lg">
                  ¡Comprometidos con tu crecimiento profesional!
                </p>
              </div>
            </div>

            {/* Footer con selector de país */}
            <div className="p-12">
              <div className="bg-white rounded-3xl shadow-lg px-5 py-3 flex items-center gap-3 w-fit">
                <PeruFlag />
                <span className="text-2xl text-black font-medium">PE</span>
              </div>
            </div>
          </div>

          {/* Elemento flotante - Accesos de prueba */}
          <button
            onClick={() => setShowTestAccounts(!showTestAccounts)}
            className="absolute bottom-8 right-8 bg-white rounded-full shadow-xl w-16 h-16 flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-105 z-20"
            title="Accesos de prueba"
          >
            <svg className="w-8 h-8 text-[#0B95BA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </button>

          {/* Panel flotante de accesos de prueba */}
          {showTestAccounts && (
            <div className="absolute bottom-28 right-8 w-96 bg-white rounded-2xl shadow-2xl border-2 border-[#0B95BA] z-30 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#0B95BA] rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900">Accesos de Prueba</h3>
                </div>
                <button
                  onClick={() => setShowTestAccounts(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-3">
                {/* Estudiante */}
                <div className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-gray-200 hover:border-[#0B95BA] transition-colors cursor-pointer"
                     onClick={() => { setEmail('estudiante@cear.com'); setPassword('cear2025'); setShowTestAccounts(false); }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">👨‍🎓</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-gray-900">Estudiante</p>
                      <p className="text-xs text-gray-600">Juan Pérez García</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Email:</span>
                      <code className="text-gray-700 bg-white px-2 py-0.5 rounded">estudiante@cear.com</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Pass:</span>
                      <code className="text-gray-700 bg-white px-2 py-0.5 rounded">cear2025</code>
                    </div>
                  </div>
                </div>

                {/* Área académica */}
                <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-gray-200 hover:border-[#0B95BA] transition-colors cursor-pointer"
                     onClick={() => { setEmail('area.academica@cear.com'); setPassword('cear2025'); setShowTestAccounts(false); }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">👔</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-gray-900">Área académica</p>
                      <p className="text-xs text-gray-600">Área Académica</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Email:</span>
                      <code className="text-gray-700 bg-white px-2 py-0.5 rounded">area.academica@cear.com</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Pass:</span>
                      <code className="text-gray-700 bg-white px-2 py-0.5 rounded">cear2025</code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-600 text-center">
                  💡 Click en cualquier usuario para autocompletar
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Lado derecho - Formulario de inicio de sesión */}
        <div className="w-1/2 bg-white relative flex flex-col min-h-screen">
          {/* Contenido del formulario centrado */}
          <div className="flex-1 flex items-center justify-center p-12">
            <div className="relative w-full max-w-xl">
              {/* Botón regresar - lado izquierdo sobre la caja */}
              <div className="absolute -top-20 left-0 z-10">
                <button 
                  onClick={onBackToMain}
                  className="bg-white rounded-2xl shadow-lg w-14 h-14 flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-100"
                  title="Regresar"
                >
                  <ArrowLeft className="w-6 h-6 text-[#0B95BA]" />
                </button>
              </div>

              {/* Botones de ayuda - lado derecho sobre la caja */}
              <div className="absolute -top-20 right-0 flex gap-3 z-10">
                <button 
                  className="bg-white rounded-2xl shadow-lg w-14 h-14 flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-100"
                  title="Video de guía"
                  onClick={() => setShowVideoGuide(true)}
                >
                  <Video className="w-6 h-6 text-[#0B95BA]" />
                </button>
                <button 
                  className="bg-white rounded-2xl shadow-lg w-14 h-14 flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-100"
                  title="Preguntas frecuentes"
                  onClick={() => setShowFAQ(true)}
                >
                  <HelpCircle className="w-6 h-6 text-[#0B95BA]" />
                </button>
              </div>

              {/* Caja con sombra que contiene todo el formulario */}
              <div className="w-full bg-white rounded-3xl shadow-[0_0_25px_rgba(0,0,0,0.3)] p-12 border border-gray-100">
                {/* Título */}
                <div className="text-center mb-8">
                  <h2 className="mb-2 text-[#0B95BA] font-bold text-[24px]">Inicio de sesión</h2>
                  <p className="text-gray-600 text-base text-[16px]">Ingrese sus credenciales</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Correo */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-2 text-[15px]">
                      Correo
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent transition-all text-base"
                        placeholder="correo@ejemplo.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Contraseña */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-2 text-[15px]">
                      Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent transition-all text-base"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  {/* Recordar contraseña y olvido */}
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 text-[#0B95BA] rounded border-gray-300 focus:ring-[#0B95BA] flex-shrink-0"
                      />
                      <span className="text-gray-600 group-hover:text-gray-800 leading-none text-[15px]">Recordar contraseña</span>
                    </label>
                    <button 
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-[#0B95BA] hover:text-[#087A98] hover:underline leading-none whitespace-nowrap flex items-center h-4 text-[15px] cursor-pointer"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>

                  {/* Botón de submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-[#0B95BA] text-white rounded-xl hover:bg-[#087A98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-base font-medium text-[20px]"
                  >
                    {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                  </button>
                </form>

                {/* Footer del formulario */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex justify-center flex-wrap gap-x-4 gap-y-2 text-xs text-[#0B95BA]">
                    <button 
                      type="button"
                      onClick={() => setShowContact(true)} 
                      className="hover:underline text-[15px] cursor-pointer"
                    >
                      Contacto
                    </button>
                    <span className="text-gray-300">•</span>
                    <button 
                      type="button"
                      onClick={() => setShowTerms(true)} 
                      className="hover:underline text-[15px] cursor-pointer"
                    >
                      Términos y condiciones
                    </button>
                    <span className="text-gray-300">•</span>
                    <button 
                      type="button"
                      onClick={() => setShowPrivacy(true)} 
                      className="hover:underline text-[15px] cursor-pointer"
                    >
                      Política de Privacidad
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright en la esquina inferior derecha */}
          <div className="absolute bottom-8 right-8">
            <p className="text-gray-400 text-sm">2025 • CEAR LATINOAMERICANO</p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
      <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <FAQModal isOpen={showFAQ} onClose={() => setShowFAQ(false)} />
      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
      <ForgotPasswordModal isOpen={showForgotPassword} onClose={() => setShowForgotPassword(false)} />
      <VideoGuideModal isOpen={showVideoGuide} onClose={() => setShowVideoGuide(false)} />

      {/* Modal de confirmación de código */}
      {showConfirmationCode && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8 relative border-2 border-[#0B95BA]">
            {/* Icono de seguridad */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#0B95BA] rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Título */}
            <h2 className="text-center text-[#0B95BA] mb-2 font-bold text-[22px]">
              Verificación de seguridad
            </h2>
            <p className="text-center text-gray-600 mb-6 text-sm">
              Ingrese el código de confirmación enviado a su correo
            </p>

            {/* Formulario */}
            <form onSubmit={handleConfirmationSubmit} className="space-y-5">
              {/* Campo de código */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Código de confirmación
                </label>
                <input
                  type="text"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
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

              {/* Error de código */}
              {codeError && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-red-700 fill-red-700 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">Código incorrecto. Verifique e intente nuevamente.</p>
                </div>
              )}

              {/* Botones */}
              <div className="space-y-3">
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

                <button
                  type="button"
                  onClick={() => {
                    setShowConfirmationCode(false);
                    setConfirmationCode('');
                    setCodeError('');
                    setPendingCredentials(null);
                    setIsLoading(false);
                  }}
                  className="w-full py-3 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
