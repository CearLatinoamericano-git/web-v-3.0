import { useState, useEffect } from 'react';
import styles from './CoursePopup.module.css';

const pop_up = '/images/popup_image.webp';

interface CoursePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (path: string) => void;
  courseId?: string;
}

export function CoursePopup({ isOpen, onClose, onNavigate, courseId = 'curso-cp' }: CoursePopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.popup} ${isVisible ? styles.popupVisible : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.popupContent}>
          {/* Left Section */}
          <div className={styles.leftSection}>
            <img
              alt="Contratación Pública"
              className={styles.backgroundImage}
              src={pop_up}
            />
            {!isMobile && (
              <>
                <div className={styles.gradientOverlay}></div>
                <div className={styles.blurEffect}></div>
                <div className={styles.imageOverlay}>
                  <img
                    src={pop_up}
                    alt="Curso de Especialización - Contratación Pública"
                    className={styles.overlayImage}
                  />
                </div>
              </>
            )}
          </div>

          {/* Right Section */}
          {!isMobile && (
          <div className={styles.rightSection}>
            <div className={styles.rightContent}>
              {/* Banner */}
              <div className={styles.registrationsBanner}>
                <span>Inscripciones abiertas</span>
              </div>

              {/* Title */}
              <h3 className={styles.mainTitle}>
                Domina las Contrataciones con el Estado
              </h3>

              {/* Description */}
              <p className={styles.description}>
                El programa busca que el participante adquiera criterios técnicos para planificar,
                conducir y supervisar procesos de contratación pública, reduciendo riesgos legales
                y mejorando la toma de decisiones en cada etapa del procedimiento.
              </p>

              {/* Benefits List */}
              <div className={styles.benefitsList}>
                <div className={styles.benefitItem}>
                  <div className={styles.checkIcon}>
                    <svg className={styles.checkSvg} fill="none" viewBox="0 0 15.75 15.75">
                      <path
                        d="M12.7969 3.9375L5.90625 10.8281L2.95312 7.875"
                        stroke="#1CB8A4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.96875"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className={styles.benefitTitle}>Doble certificación</p>
                    <p className={styles.benefitDescription}>
                      Avalado por CEAR LATINOAMERICANO y UNHEVAL
                    </p>
                  </div>
                </div>

                <div className={styles.benefitItem}>
                  <div className={styles.checkIcon}>
                    <svg className={styles.checkSvg} fill="none" viewBox="0 0 15.75 15.75">
                      <path
                        d="M12.7969 3.9375L5.90625 10.8281L2.95312 7.875"
                        stroke="#1CB8A4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.96875"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className={styles.benefitTitle}>Modalidad 100% virtual</p>
                    <p className={styles.benefitDescription}>
                      Accede desde cualquier lugar y dispositivo
                    </p>
                  </div>
                </div>

                <div className={styles.benefitItem}>
                  <div className={styles.checkIcon}>
                    <svg className={styles.checkSvg} fill="none" viewBox="0 0 15.75 15.75">
                      <path
                        d="M12.7969 3.9375L5.90625 10.8281L2.95312 7.875"
                        stroke="#1CB8A4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.96875"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className={styles.benefitTitle}>Docentes especializados</p>
                    <p className={styles.benefitDescription}>
                      Expertos con trayectoria en el OECE y tribunales
                    </p>
                  </div>
                </div>

                <div className={styles.benefitItem}>
                  <div className={styles.checkIcon}>
                    <svg className={styles.checkSvg} fill="none" viewBox="0 0 15.75 15.75">
                      <path
                        d="M12.7969 3.9375L5.90625 10.8281L2.95312 7.875"
                        stroke="#1CB8A4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.96875"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className={styles.benefitTitle}>Facilidades de pago</p>
                    <p className={styles.benefitDescription}>Modalidad en cuotas</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={styles.actionButtons}>
                <button
                  onClick={() => {
                    onClose();
                    if (onNavigate) {
                      onNavigate(`/course/${courseId}`);
                    }
                  }}
                  className={styles.viewProgramButton}
                >
                  <span>Ver programa completo</span>
                  <svg className={styles.arrowIcon} fill="none" viewBox="0 0 18 18">
                    <path
                      d="M3.75 9H14.25"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.875"
                    />
                    <path
                      d="M9 3.75L14.25 9L9 14.25"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.875"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    window.open(
                      'https://api.whatsapp.com/send/?phone=51944004447&text=Hola,%20necesito%20contactar%20con%20un%20asesor%20sobre%20el%20Curso%20de%20Especialización%20en%20Contratación%20Pública&type=phone_number&app_absent=0',
                      '_blank',
                      'noopener,noreferrer'
                    );
                  }}
                  className={styles.enrollButton}
                >
                  <span>Contactar asesor</span>
                </button>
              </div>

              {/* Social Proof */}
              <div className={styles.socialProof}>
                <svg className={styles.usersIcon} fill="none" viewBox="0 0 15.75 15.75">
                  <g clipPath="url(#clip0_9102_2363)">
                    <path
                      d="M10.5 13.7812V12.4688C10.5 11.7726 10.2234 11.1049 9.73116 10.6126C9.23887 10.1203 8.57119 9.84375 7.875 9.84375H3.9375C3.24131 9.84375 2.57363 10.1203 2.08134 10.6126C1.58906 11.1049 1.3125 11.7726 1.3125 12.4688V13.7812"
                      stroke="#4B5563"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.3125"
                    />
                    <path
                      d="M10.5 2.05274C11.0629 2.19867 11.5614 2.52739 11.9173 2.98728C12.2732 3.44718 12.4663 4.01223 12.4663 4.59374C12.4663 5.17525 12.2732 5.7403 11.9173 6.2002C11.5614 6.6601 11.0629 6.98881 10.5 7.13474"
                      stroke="#4B5563"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.3125"
                    />
                    <path
                      d="M14.4375 13.7813V12.4688C14.4371 11.8871 14.2435 11.3221 13.8871 10.8625C13.5308 10.4028 13.0319 10.0745 12.4688 9.92907"
                      stroke="#4B5563"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.3125"
                    />
                    <path
                      d="M5.90625 7.21875C7.356 7.21875 8.53125 6.0435 8.53125 4.59375C8.53125 3.144 7.356 1.96875 5.90625 1.96875C4.4565 1.96875 3.28125 3.144 3.28125 4.59375C3.28125 6.0435 4.4565 7.21875 5.90625 7.21875Z"
                      stroke="#4B5563"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.3125"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_9102_2363">
                      <rect fill="white" height="15.75" width="15.75" />
                    </clipPath>
                  </defs>
                </svg>
                <p className={styles.socialProofText}>
                  <span className={styles.socialProofBold}>+500 profesionales</span> ya certificados
                </p>
              </div>
            </div>
          </div>
          )}
        </div>

        {/* Close Button */}
        <button onClick={onClose} className={styles.closeButton} aria-label="Cerrar">
          <svg className={styles.closeIcon} fill="none" viewBox="0 0 20.25 20.25">
            <path
              d="M15.1875 5.0625L5.0625 15.1875"
              stroke="#364153"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.10938"
            />
            <path
              d="M5.0625 5.0625L15.1875 15.1875"
              stroke="#364153"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.10938"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
