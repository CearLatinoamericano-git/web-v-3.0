import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { LogoCompact } from './LogoCompact';
import { ALIAS_ROUTES } from '../routes';

interface HeaderProps {
  currentPage?: string;
}

export function Header({ currentPage = '/' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Cerrar menú al hacer clic fuera o presionar ESC
  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden'; // Prevenir scroll cuando el menú está abierto

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Verificar que el clic no sea en el botón del menú ni dentro del menú
      if (
        !target.closest('[data-mobile-menu]') && 
        !target.closest('[data-mobile-menu-button]')
      ) {
        closeMobileMenu();
      }
    };

    // Pequeño delay para evitar que se cierre inmediatamente al abrir
    const timeoutId = setTimeout(() => {
      document.addEventListener('keydown', handleEscape);
      // Usar mousedown en lugar de click para mejor detección
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);
  
  // Función para determinar si un enlace está activo
  // Soporta tanto rutas nuevas como alias (rutas antiguas)
  const isActive = (path: string) => {
    // Normalizar la ruta actual
    const normalizedCurrent = currentPage || '/';
    
    // Verificar coincidencia directa
    if (normalizedCurrent === path) return true;
    
    // Verificar si la ruta actual es un alias de la ruta objetivo
    if (ALIAS_ROUTES[normalizedCurrent] === path) return true;
    
    // Verificar si la ruta objetivo es un alias de la ruta actual
    if (ALIAS_ROUTES[path] === normalizedCurrent) return true;
    
    return false;
  };

  return (
    <header 
      className="absolute top-0 left-0 right-0 z-50"
    >
      <nav className="mx-auto px-6 lg:px-12">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between h-[88px] max-w-[1400px] mx-auto pt-[67px] pr-[0px] pb-[0px] pl-[0px]">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <LogoCompact className="h-14 w-auto" variant="white" />
          </a>

          {/* Navigation Links - Centered */}
          <div className="flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <a 
              href="/" 
              className={`text-white/90 hover:text-white transition-colors text-[15px] font-normal relative ${
                isActive('/') ? 'text-white' : ''
              }`}
            >
              Inicio
              {isActive('/') && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white"></span>
              )}
            </a>
            <a 
              href="/courses" 
              className={`text-white/90 hover:text-white transition-colors text-[15px] font-normal relative ${
                isActive('/courses') ? 'text-white' : ''
              }`}
            >
              Programas
              {isActive('/courses') && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white"></span>
              )}
            </a>
            <a 
              href="/para-instituciones" 
              className={`text-white/90 hover:text-white transition-colors text-[15px] font-normal relative ${
                isActive('/para-instituciones') || isActive('/for-institutions') ? 'text-white' : ''
              }`}
            >
              Para instituciones
              {(isActive('/para-instituciones') || isActive('/for-institutions')) && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white"></span>
              )}
            </a>
            <a 
              href="/nosotros" 
              className={`text-white/90 hover:text-white transition-colors text-[15px] font-normal relative ${
                isActive('/nosotros') || isActive('/about') ? 'text-white' : ''
              }`}
            >
              Nosotros
              {(isActive('/nosotros') || isActive('/about')) && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white"></span>
              )}
            </a>
            <a 
              href="/contacto" 
              className={`text-white/90 hover:text-white transition-colors text-[15px] font-normal relative ${
                isActive('/contacto') || isActive('/contact') ? 'text-white' : ''
              }`}
            >
              Contacto
              {(isActive('/contacto') || isActive('/contact')) && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white"></span>
              )}
            </a>
          </div>

          {/* Button */}
          <a
            href="https://campus.cearlatinoamericano.edu.pe/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1CB8A4] flex items-center gap-2 px-6 py-2.5 rounded-lg hover:bg-[#19a894] transition-colors"
          >
            <span className="font-semibold text-[14px] text-white whitespace-nowrap">
              Acceso al campus virtual
            </span>
            <ArrowRight className="w-4 h-4 text-white" />
          </a>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <LogoCompact className="h-12 w-auto" variant="white" />
          </a>

          {/* Mobile Menu Button */}
          <button
            data-mobile-menu-button
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 transition-all duration-200 active:scale-95 z-50 relative"
            onClick={(e) => {
              e.stopPropagation();
              toggleMobileMenu(e);
            }}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-white transition-transform duration-300 rotate-0" />
            ) : (
              <Menu className="w-6 h-6 text-white transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-[fadeIn_0.3s_ease-out_forwards]"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
            
            {/* Menu Panel */}
            <div 
              data-mobile-menu
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-gradient-to-br from-[#1a0b2e] via-[#16213e] to-[#0f3460] shadow-2xl z-50 lg:hidden animate-[slideInRight_0.3s_ease-out_forwards]"
            >
              {/* Header del menú */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <a href="/" onClick={closeMobileMenu} className="flex items-center">
                  <LogoCompact className="h-10 w-auto" variant="white" />
                </a>
                <button
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 transition-all duration-200 active:scale-95"
                  aria-label="Cerrar menú"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Contenido del menú */}
              <div className="flex flex-col px-6 py-6 gap-1 h-[calc(100vh-88px)] overflow-y-auto">
                <a 
                  href="/" 
                  onClick={closeMobileMenu}
                  className={`group relative text-white/90 hover:text-white transition-all duration-200 px-4 py-4 rounded-xl font-medium text-base ${
                    isActive('/') 
                      ? 'bg-white/15 text-white shadow-lg shadow-white/5' 
                      : 'hover:bg-white/10'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-between">
                    Inicio
                    {isActive('/') && (
                      <span className="w-2 h-2 rounded-full bg-[#1CB8A4] animate-pulse"></span>
                    )}
                  </span>
                  {isActive('/') && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1CB8A4] to-[#0B95BA] rounded-l-xl"></span>
                  )}
                </a>
                
                <a 
                  href="/courses" 
                  onClick={closeMobileMenu}
                  className={`group relative text-white/90 hover:text-white transition-all duration-200 px-4 py-4 rounded-xl font-medium text-base ${
                    isActive('/courses') 
                      ? 'bg-white/15 text-white shadow-lg shadow-white/5' 
                      : 'hover:bg-white/10'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-between">
                    Programas
                    {isActive('/courses') && (
                      <span className="w-2 h-2 rounded-full bg-[#1CB8A4] animate-pulse"></span>
                    )}
                  </span>
                  {isActive('/courses') && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1CB8A4] to-[#0B95BA] rounded-l-xl"></span>
                  )}
                </a>
                
                <a 
                  href="/para-instituciones" 
                  onClick={closeMobileMenu}
                  className={`group relative text-white/90 hover:text-white transition-all duration-200 px-4 py-4 rounded-xl font-medium text-base ${
                    (isActive('/para-instituciones') || isActive('/for-institutions'))
                      ? 'bg-white/15 text-white shadow-lg shadow-white/5' 
                      : 'hover:bg-white/10'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-between">
                    Para instituciones
                    {(isActive('/para-instituciones') || isActive('/for-institutions')) && (
                      <span className="w-2 h-2 rounded-full bg-[#1CB8A4] animate-pulse"></span>
                    )}
                  </span>
                  {(isActive('/para-instituciones') || isActive('/for-institutions')) && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1CB8A4] to-[#0B95BA] rounded-l-xl"></span>
                  )}
                </a>
                
                <a 
                  href="/nosotros" 
                  onClick={closeMobileMenu}
                  className={`group relative text-white/90 hover:text-white transition-all duration-200 px-4 py-4 rounded-xl font-medium text-base ${
                    (isActive('/nosotros') || isActive('/about'))
                      ? 'bg-white/15 text-white shadow-lg shadow-white/5' 
                      : 'hover:bg-white/10'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-between">
                    Nosotros
                    {(isActive('/nosotros') || isActive('/about')) && (
                      <span className="w-2 h-2 rounded-full bg-[#1CB8A4] animate-pulse"></span>
                    )}
                  </span>
                  {(isActive('/nosotros') || isActive('/about')) && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1CB8A4] to-[#0B95BA] rounded-l-xl"></span>
                  )}
                </a>
                
                <a 
                  href="/contacto" 
                  onClick={closeMobileMenu}
                  className={`group relative text-white/90 hover:text-white transition-all duration-200 px-4 py-4 rounded-xl font-medium text-base ${
                    (isActive('/contacto') || isActive('/contact'))
                      ? 'bg-white/15 text-white shadow-lg shadow-white/5' 
                      : 'hover:bg-white/10'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-between">
                    Contacto
                    {(isActive('/contacto') || isActive('/contact')) && (
                      <span className="w-2 h-2 rounded-full bg-[#1CB8A4] animate-pulse"></span>
                    )}
                  </span>
                  {(isActive('/contacto') || isActive('/contact')) && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1CB8A4] to-[#0B95BA] rounded-l-xl"></span>
                  )}
                </a>
                
                {/* Botón destacado */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <a
                    href="https://campus.cearlatinoamericano.edu.pe/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                    className="group w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#1CB8A4] via-[#19a894] to-[#0B95BA] text-white rounded-xl px-6 py-4 font-semibold text-sm shadow-lg shadow-[#1CB8A4]/30 hover:shadow-[#1CB8A4]/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Acceso al campus virtual</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
