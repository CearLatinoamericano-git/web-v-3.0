import { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { LogoCompact } from './LogoCompact';
import { ALIAS_ROUTES } from '../routes';

interface HeaderProps {
  onCampusClick?: () => void;
  currentPage?: string;
}

export function Header({ onCampusClick, currentPage = '/' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCampusAccess = () => {
    if (onCampusClick) {
      onCampusClick();
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
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
          <button
            onClick={handleCampusAccess}
            className="bg-[#1CB8A4] flex items-center gap-2 px-6 py-2.5 rounded-lg hover:bg-[#19a894] transition-colors"
          >
            <span className="font-semibold text-[14px] text-white whitespace-nowrap">
              Acceso al campus virtual
            </span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <LogoCompact className="h-12 w-auto" variant="white" />
          </a>

          {/* Mobile Menu Button */}
          <button
            className="flex items-center justify-center w-10 h-10"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[rgba(0,0,0,0.5)] backdrop-blur-lg border-t border-white/20">
            <div className="flex flex-col p-4 gap-2">
              <a 
                href="/" 
                onClick={closeMobileMenu}
                className={`text-white hover:bg-white/10 transition-colors px-4 py-3 rounded-lg relative ${
                  isActive('/') ? 'bg-white/10' : ''
                }`}
              >
                Inicio
                {isActive('/') && (
                  <span className="absolute bottom-2 left-4 right-4 h-[2px] bg-white"></span>
                )}
              </a>
              <a 
                href="/courses" 
                onClick={closeMobileMenu}
                className={`text-white hover:bg-white/10 transition-colors px-4 py-3 rounded-lg relative ${
                  isActive('/courses') ? 'bg-white/10' : ''
                }`}
              >
                Programas
                {isActive('/courses') && (
                  <span className="absolute bottom-2 left-4 right-4 h-[2px] bg-white"></span>
                )}
              </a>
              <a 
                href="/para-instituciones" 
                onClick={closeMobileMenu}
                className={`text-white hover:bg-white/10 transition-colors px-4 py-3 rounded-lg relative ${
                  isActive('/para-instituciones') || isActive('/for-institutions') ? 'bg-white/10' : ''
                }`}
              >
                Para instituciones
                {(isActive('/para-instituciones') || isActive('/for-institutions')) && (
                  <span className="absolute bottom-2 left-4 right-4 h-[2px] bg-white"></span>
                )}
              </a>
              <a 
                href="/nosotros" 
                onClick={closeMobileMenu}
                className={`text-white hover:bg-white/10 transition-colors px-4 py-3 rounded-lg relative ${
                  isActive('/nosotros') || isActive('/about') ? 'bg-white/10' : ''
                }`}
              >
                Nosotros
                {(isActive('/nosotros') || isActive('/about')) && (
                  <span className="absolute bottom-2 left-4 right-4 h-[2px] bg-white"></span>
                )}
              </a>
              <a 
                href="/contacto" 
                onClick={closeMobileMenu}
                className={`text-white hover:bg-white/10 transition-colors px-4 py-3 rounded-lg relative ${
                  isActive('/contacto') || isActive('/contact') ? 'bg-white/10' : ''
                }`}
              >
                Contacto
                {(isActive('/contacto') || isActive('/contact')) && (
                  <span className="absolute bottom-2 left-4 right-4 h-[2px] bg-white"></span>
                )}
              </a>
              
              <button
                onClick={() => {
                  closeMobileMenu();
                  handleCampusAccess();
                }}
                className="flex items-center justify-center gap-2 bg-[#1CB8A4] text-white rounded-lg px-4 py-3 mt-2 hover:bg-[#19a894] transition-colors font-semibold"
              >
                Acceso al campus virtual
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
