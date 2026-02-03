import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter, Instagram, Youtube, BookOpen } from 'lucide-react';
import { useState } from 'react';
import Capa1Blanco from '../imports/Capa1-2854-231';
import { TermsModal } from './modals/TermsModal';
import { PrivacyModal } from './modals/PrivacyModal';
import { FAQModal } from './modals/FAQModal';

// TikTok icon component (custom SVG)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  );
}

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps = {}) {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Sobre CEAR */}
          <div>
            <div className="mb-4" style={{ height: '64px', width: 'auto', ['--fill-0' as string]: '#FFFFFF' }}>
              <Capa1Blanco />
            </div>
            <p className="text-sm mb-4 text-justify">
              Programas de formación continua dirigidos a profesionales del Derecho y la Ingeniería, con certificación emitida en el marco de convenios académicos vigentes suscritos con universidades licenciadas por SUNEDU.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#0B95BA] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#0B95BA] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#0B95BA] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#0B95BA] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#0B95BA] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#0B95BA] transition-colors">
                <TikTokIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-white mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-[#0B95BA] transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/courses" className="hover:text-[#0B95BA] transition-colors">
                  Programas
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-[#0B95BA] transition-colors">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="/campus" className="hover:text-[#0B95BA] transition-colors">
                  Campus virtual
                </a>
              </li>
              <li>
                <button onClick={(e) => { e.preventDefault(); setShowFAQ(true); }} className="hover:text-[#0B95BA] transition-colors cursor-pointer">
                  Preguntas frecuentes
                </button>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-white mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ stroke: '#0B95BA', fill: 'none' }} />
                <div>
                  <a href="mailto:academico@cearlatinoamericano.edu.pe" className="hover:text-[#0B95BA] transition-colors">
                    academico@cearlatinoamericano.edu.pe
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ stroke: '#0B95BA', fill: 'none' }} />
                <div>
                  <a href="tel:+51986605219" className="hover:text-[#0B95BA] transition-colors">
                    (+51) 986 605 219
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ stroke: '#0B95BA', fill: 'none' }} />
                <div>
                  Av. Faustino Sánchez Carrión 615, Jesús María - Oficina 306
                </div>
              </li>
            </ul>
            <button
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) {
                  onNavigate('/complaint-channel');
                }
                window.scrollTo(0, 0);
              }}
              className="mt-4 block w-full bg-[#0B95BA] text-white px-4 py-2 rounded text-sm text-center hover:bg-[#0a7a94] transition-colors cursor-pointer"
            >
              Canal de denuncias
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© 2026 CEAR LATINOAMERICANO. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <button onClick={(e) => { e.preventDefault(); setShowPrivacy(true); }} className="hover:text-[#0B95BA] transition-colors cursor-pointer">
                Política de Privacidad
              </button>
              <button onClick={(e) => { e.preventDefault(); setShowTerms(true); }} className="hover:text-[#0B95BA] transition-colors cursor-pointer">
                Términos y Condiciones
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
      <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <FAQModal isOpen={showFAQ} onClose={() => setShowFAQ(false)} />
    </footer>
  );
}