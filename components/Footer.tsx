import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';
import { useState } from 'react';
import Capa1Blanco from '../imports/Capa1-2854-231';
import { TermsModal } from './modals/TermsModal';
import { PrivacyModal } from './modals/PrivacyModal';
import { FAQModal } from './modals/FAQModal';
import styles from './Footer.module.css';

// TikTok icon component (custom SVG)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
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
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Sobre CEAR */}
          <div className={styles.section}>
            <div className={styles.logoContainer} style={{ ['--fill-0' as string]: '#FFFFFF' }}>
              <Capa1Blanco />
            </div>
            <p className={styles.description}>
              Programas de formación continua dirigidos a profesionales del Derecho y la Ingeniería, con certificación emitida en el marco de convenios académicos vigentes suscritos con universidades licenciadas por SUNEDU.
            </p>
            <div className={styles.socialLinks}>
              <a 
                href="https://www.facebook.com/cearlatinoamericano.edu.pe" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <Facebook className={styles.socialIcon} />
              </a>
              <a 
                href="https://www.linkedin.com/in/centro-de-arbitraje-latinoamericano/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <Linkedin className={styles.socialIcon} />
              </a>
              {/* <a 
                href="#" 
                className={styles.socialLink}
                aria-label="Twitter"
              >
                <Twitter className={styles.socialIcon} />
              </a> */}
              <a 
                href="https://www.instagram.com/cearlatinoamericano.edu.pe/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <Instagram className={styles.socialIcon} />
              </a>
              <a 
                href="https://www.youtube.com/@cear.latinoamericano" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="YouTube"
              >
                <Youtube className={styles.socialIcon} />
              </a>
              <a 
                href="https://www.tiktok.com/@cearlatinoamericano.pe" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="TikTok"
              >
                <TikTokIcon className={styles.socialIcon} />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Enlaces Rápidos</h3>
            <ul className={styles.linksList}>
              <li className={styles.linkItem}>
                <a href="/" className={styles.link}>
                  Inicio
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="/courses" className={styles.link}>
                  Programas
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="/about" className={styles.link}>
                  Nosotros
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="https://campus.cearlatinoamericano.edu.pe/" className={styles.link}>
                  Campus virtual
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="#" onClick={(e) => { e.preventDefault(); setShowFAQ(true); }} className={styles.link}>
                  Preguntas frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Contacto</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <Mail className={styles.contactIcon} />
                <div className={styles.contactText}>
                  <a href="mailto:academico@cearlatinoamericano.edu.pe" className={styles.link}>
                    academico@cearlatinoamericano.edu.pe
                  </a>
                </div>
              </li>
              <li className={styles.contactItem}>
                <Phone className={styles.contactIcon} />
                <div className={styles.contactText}>
                  <a href="tel:+51986605219" className={styles.link}>
                    (+51) 986 605 219
                  </a>
                </div>
              </li>
              <li className={styles.contactItem}>
                <MapPin className={styles.contactIcon} />
                <div className={styles.contactText}>
                  Edificio Vértice 22 oficina 306, distrito de Jesús María Lima Lima
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
              className={styles.complaintButton}
            >
              Canal de denuncias
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomContent}>
            <p>© 2026 CEAR LATINOAMERICANO. Todos los derechos reservados.</p>
            <div className={styles.bottomLinks}>
              <button onClick={(e) => { e.preventDefault(); setShowPrivacy(true); }} className={styles.bottomLink}>
                Política de Privacidad
              </button>
              <button onClick={(e) => { e.preventDefault(); setShowTerms(true); }} className={styles.bottomLink}>
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