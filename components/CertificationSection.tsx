import { motion } from 'motion/react';
import { Award, Shield } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import CearLogoWhite from '../imports/Capa1-2854-459';
import styles from './CertificationSection.module.css';

interface CertificationSectionProps {
  certification: string | {
    issuedBy: string;
    partnerInstitution: string;
    requirements: string[];
  };
  certificationImage?: string;
  institutionLogos?: string[];
}

export function CertificationSection({
  certification: _certification, // eslint-disable-line @typescript-eslint/no-unused-vars
  certificationImage,
  institutionLogos = []
}: CertificationSectionProps) {
  // Use provided certification image (no default to preserve placeholder behavior)
  const displayCertImage = certificationImage;
  const displayLogos = institutionLogos.length > 0 ? institutionLogos : [];

  return (
    <section className={styles.section}>
      {/* Decorative Elements */}
      <div className={styles.decorativeContainer}>
        <div className={styles.blurCircle1} />
        <div className={styles.blurCircle2} />
      </div>

      {/* White Border */}
      <div className={styles.whiteBorder} />

      <div className={styles.contentContainer}>
        <div className={styles.grid}>
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.leftContent}
          >
            {/* Title */}
            <div className={styles.titleSection}>
              <h2 className={styles.title}>
                Certificado oficial
              </h2>

              <p className={styles.description}>
                El certificado se otorga al finalizar satisfactoriamente el programa, siempre que el participante cumpla con los requisitos académicos y administrativos establecidos. Para ello, deberá aprobar el programa con una calificación final igual o superior a 14, contar con una asistencia mínima del 70% y encontrarse al día en el cumplimiento de sus obligaciones de pago. El certificado es emitido por CEAR LATINOAMERICANO y cuenta con certificación conjunta de una universidad licenciada por SUNEDU, lo que garantiza su validez académica y respaldo institucional.
              </p>
            </div>

            {/* Institution Logos */}
            {displayLogos.length > 0 && (
              <div className={styles.logosSection}>
                <p className={styles.logosLabel}>Avalado por:</p>
                <div className={styles.logosContainer}>
                  {/* CEAR Logo - Always shown */}
                  <div className={styles.logoBox}>
                    <div className={styles.logoWrapper}>
                      <CearLogoWhite />
                    </div>
                  </div>
                  
                  {/* Additional Institution Logos */}
                  {displayLogos.map((logo, index) => (
                    <div
                      key={index}
                      className={styles.logoBoxAdditional}
                    >
                      <ImageWithFallback
                        src={logo}
                        alt="Institution logo"
                        className={styles.logoImage}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right: Certificate Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.rightContent}
          >
            {displayCertImage ? (
              <div className={styles.certificateWrapper}>
                {/* Certificate Image */}
                <div className={styles.certificateContainer}>
                  <div className={styles.certificateImageWrapper}>
                    <ImageWithFallback
                      src={displayCertImage}
                      alt="Certificado CEAR LATINOAMERICANO"
                      className={styles.certificateImage}
                    />
                  </div>
                </div>

                {/* Decorative Badge - Shield Icon from Figma */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                  className={styles.decorativeBadge}
                >
                  <Shield className={styles.badgeIcon} strokeWidth="5.00645" />
                </motion.div>
              </div>
            ) : (
              // Placeholder if no image
              <div className={styles.placeholder}>
                <div className={styles.placeholderContent}>
                  <Award className={styles.placeholderIcon} />
                  <p className={styles.placeholderText}>Muestra de certificado</p>
                </div>
              </div>
            )}

            {/* Floating Elements - Removed blur circle */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}