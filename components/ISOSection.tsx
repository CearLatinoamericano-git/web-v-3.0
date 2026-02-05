import { GraduationCap, Award, Download } from 'lucide-react';
import { motion } from 'motion/react';
import styles from './ISOSection.module.css';

const professionalCearImage = "/images/about/cummila.png";
const iso9001Image = "https://cearlatinoamericano.pe/rsc/public/nosotros/archivos/iso-90012015.webp";
const iso37001Image = "https://cearlatinoamericano.pe/rsc/public/nosotros/archivos/iso-370012016.webp";
const iso27001Image = "https://cearlatinoamericano.pe/rsc/public/images/ISO27001.png";
const isoCertificationBackgroundImage = "/images/iso_1_5.jpeg";

export function ISOSection() {
  const certifications = [
    {
      id: 'iso-9001',
      number: 'ISO 9001:2015',
      title: 'Sistema de gestión de la calidad',
      image: iso9001Image,
      color: 'from-orange-500 to-red-500',
      downloadUrl: 'https://cearlatinoamericano.pe/rsc/public/nosotros/archivos/iso-90012015-pdf.pdf'
    },
    {
      id: 'iso-37001',
      number: 'ISO 37001:2016',
      title: 'Sistema de gestión antisoborno',
      image: iso37001Image,
      color: 'from-orange-500 to-red-500',
      downloadUrl: 'https://cearlatinoamericano.pe/rsc/public/nosotros/archivos/iso-370012016-pdf.pdf'
    },
    {
      id: 'iso-27001',
      number: 'ISO 27001:2013',
      title: 'Sistema de gestión de seguridad de la información',
      image: iso27001Image,
      color: 'from-[#0B95BA] to-[#10E7B0]',
      downloadUrl: 'https://cearlatinoamericano.pe/rsc/public/CONSTANCIA%20CERTIFICACION-CEAR.pdf'
    }
  ];

  const sgsDirectoryUrl = 'https://www.sgs.com/en/certified-clients-and-products/certified-client-directory';

  const handleImageClick = () => {
    window.open(sgsDirectoryUrl, '_blank');
  };

  const handleDownload = (url: string, event: React.MouseEvent) => {
    event.stopPropagation();
    window.open(url, '_blank');
  };

  const certificationsScope = 'Las certificaciones obtenidas por CEAR LATINOAMERICANO respaldan nuestros procesos institucionales vinculados al diseño, organización y ejecución de programas de formación continua. Estas certificaciones son aplicables a diplomados, cursos de especialización, capacitaciones in-house y demás actividades académicas desarrolladas en el ámbito de la contratación pública, el arbitraje, las juntas de resolución de disputas y la formación continua vinculada a las áreas del Derecho y la Ingeniería.';

  return (
    <section className={styles.isoSection}>
      <div className={styles.isoContainer}>
        {/* Header Section - Título y Subtítulo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.titleContainer}
        >
          <div className={styles.mainTitle}>
            <h2 className={styles.titleText}>
              Nuestras certificaciones ISO
            </h2>
          </div>
          
          <div className={styles.subtitleContainer}>
            <div className={styles.subtitleWrapper}>
              <span className={styles.subtitleText}>Calidad certificada</span>
              <span className={styles.subtitleGradient}>internacionalmente</span>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid - Image & Text */}
        <div className={styles.contentGrid}>
          {/* Left Column - Image with Overlay */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={styles.imageContainer}
          >
            <div className={styles.imageWrapper}>
              <img
                src={professionalCearImage}
                alt="Profesional CEAR LATINOAMERICANO"
                className={styles.image}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className={styles.imageOverlay}
              >
                <p className={styles.imageOverlayText}>
                  La adopción de estándares internacionales de calidad y gestión constituye un soporte transversal para el desarrollo de nuestra oferta académica, fortaleciendo la confianza, la transparencia y la mejora continua en los procesos formativos.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Text Content & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={styles.textContent}
          >
            {/* Text Section */}
            <div className={styles.textSection}>
              <p className={styles.sectionTitleText}>
                Experiencia y estándares internacionales
              </p>
              
              <div className={styles.mainHeadingContainer}>
                <h3 className={styles.headingText}>
                  Centro especializado con
                </h3>
                <h3 className={styles.headingTextGradient}>
                  respaldo internacional
                </h3>
              </div>
              
              <p className={styles.descriptionText}>
                CEAR LATINOAMERICANO se distingue por su compromiso con la excelencia académica y la calidad metodológica en la formación profesional especializada. Nuestra propuesta formativa se desarrolla en coordinación con universidades licenciadas por SUNEDU, principalmente en las áreas de Derecho e Ingeniería, lo que permite ofrecer programas actualizados y alineados con las tendencias y exigencias del entorno profesional.
              </p>
            </div>

            {/* Stats Cards Section */}
            <div className={styles.statsGrid}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={styles.statCard}
              >
                <div className={styles.statCardContent}>
                  <div className={styles.statHeader}>
                    <div className={styles.statInfo}>
                      <p className={styles.statLabel}>Experiencia</p>
                      <div className={styles.statValue}>
                        <span className={styles.statNumber}>+9</span>
                        <span className={styles.statUnit}>años</span>
                      </div>
                    </div>
                    <div className={styles.statIcon}>
                      <div className={styles.statIconWrapper}>
                        <GraduationCap className={styles.statIconSvg} strokeWidth="2" />
                      </div>
                    </div>
                  </div>
                  <p className={styles.statDescription}>
                    Formando profesionales
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={styles.statCard}
              >
                <div className={styles.statCardContent}>
                  <div className={styles.statHeader}>
                    <div className={styles.statInfo}>
                      <p className={styles.statLabel}>Certificaciones</p>
                      <div className={styles.statValue}>
                        <span className={styles.statNumber}>+700</span>
                      </div>
                    </div>
                    <div className={styles.statIcon}>
                      <div className={styles.statIconWrapper}>
                        <Award className={styles.statIconSvg} strokeWidth="2" />
                      </div>
                    </div>
                  </div>
                  <p className={styles.statDescription}>
                    Certificados emitidos
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Alcance de Certificaciones - Sección separada full width */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={styles.scopeSection}
      >
        <div className={styles.scopeCard}>
          {/* Título y Descripción con padding */}
          <div className={styles.scopeCardContent}>
            <div className="space-y-5 lg:space-y-8">
              {/* Título */}
              <div className="text-center">
                <h3 className={styles.scopeTitle}>
                  Alcance de
                </h3>
                <h2 className={styles.scopeTitleMain}>
                  Certificaciones
                </h2>
              </div>
              
              {/* Descripción */}
              <p className={styles.scopeDescription}>
                {certificationsScope}
              </p>
            </div>
          </div>

          {/* Layout de dos columnas: Imagen + Certificaciones - Sin padding lateral */}
          <div className={styles.certificationsLayout}>
            {/* Imagen de fondo - A sangre completa */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={styles.certificationsBackground}
            >
              <img
                src={isoCertificationBackgroundImage}
                alt="ISO Certification Background"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Overlay oscuro para mejorar contraste */}
            <div className={styles.certificationsOverlay}></div>

            {/* Certificaciones superpuestas - Grid layout */}
            <div className={styles.certificationsGrid}>
              {/* Espacio izquierdo vacío */}
              <div className={styles.certificationsLeftSpace}></div>
              
              {/* Certificaciones derecha - Superpuestas */}
              <div className={styles.certificationsRight}>
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className={styles.certificationCard}
                  >
                    <div className={styles.certificationCardContent}>
                      {/* Logo ISO */}
                      <div className={styles.certificationLogo}>
                        <div 
                          className={styles.certificationLogoWrapper}
                          onClick={handleImageClick}
                          title="Ver en directorio SGS"
                        >
                          <img
                            src={cert.image}
                            alt={cert.title}
                            className="w-[38px] h-[38px] lg:w-[45px] lg:h-[45px] object-contain"
                          />
                        </div>
                      </div>
                      
                      {/* Texto central */}
                      <div className={styles.certificationText}>
                        <h4 className={styles.certificationTitle}>
                          {cert.number}
                        </h4>
                        <p className={styles.certificationSubtitle}>
                          {cert.title}
                        </p>
                      </div>
                      
                      {/* Botón Descarga */}
                      <div className={styles.certificationDownload}>
                        <button 
                          onClick={(e) => handleDownload(cert.downloadUrl, e)}
                          className={styles.downloadButton}
                        >
                          <Download className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                          <span className={styles.downloadButtonText}>Descarga</span>
                          <span className={styles.downloadButtonTextMobile}>PDF</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}