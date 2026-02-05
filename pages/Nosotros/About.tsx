import svgPathsBeneficios from '../../imports/svg-d94wy60n8k';
import svgPathsAbout from '../../imports/svg-e9ulumzys8';
import svgPathsAboutIcons from '../../imports/svg-cyx5481t1p';
import svgPathsVision from '../../imports/svg-4j74ddf892';
import svgPathsInfra from '../../imports/svg-s4m8i8kato';

const sede_lima = '/images/about/sede_lima.webp';
const equipo_vanguardia = '/images/about/equipo_vanguardia.webp';
const aula_especializada = '/images/about/aula_especializada.webp';
const profesional_capacitado = '/images/about/profesional_capacitado.webp';
const docentes_hero = '/images/about/docentes_hero_image.webp';
const fondo_contacto = '/images/contact/contacto_fondo.png'

import { ArrowRight, Download, Shield, Award } from 'lucide-react';
import styles from './About.module.css';

export function About() {
  const handleBrochure = () => {
    window.open('https://cearlatinoamericano.edu.pe/sisdocs/brochures/BROCHURE-CORPORATIVO.pdf', '_blank');
  };

  return (
    <div className={styles.aboutPage}>
      {/* Hero Section - CEAR FORMACIÓN CONTINUA */}
      <section className={styles.heroSection}>
        {/* Background Image with Low Opacity */}
        <div className={styles.heroBackgroundImage}>
          <img 
            src={fondo_contacto}
            alt="Fondo contacto background"
          />
        </div>

        {/* Students Image - Right side, visible on larger screens */}
        <div className={styles.heroStudentsImage}>
          <img 
            src={docentes_hero}
            alt="Profesionales CEAR"
          />
        </div>

        {/* Decorative Wave SVGs at bottom */}
        <div className={styles.heroWavesContainer}>
          <svg className={`${styles.heroWave} ${styles.heroWave1}`} fill="none" preserveAspectRatio="none" viewBox="0 0 1662 99.6">
            <path d={svgPathsAbout.p13d44600} fill="white" fillOpacity="0.1" />
          </svg>
          <svg className={`${styles.heroWave} ${styles.heroWave2}`} fill="none" preserveAspectRatio="none" viewBox="0 0 1662 75">
            <path d={svgPathsAbout.p330bc00} fill="white" fillOpacity="0.03" />
          </svg>
        </div>

        {/* Text Content */}
        <div className={styles.heroTextContent}>
          <div className={styles.heroTextWrapper}>
            {/* Title Section */}
            <div className={styles.heroTitleSection}>
              <div className={styles.heroTitleContainer}>
                <div className={styles.heroTitleMain}>
                  <p className={styles.heroTitleMainText}>
                    CEAR
                  </p>
                </div>
                <div className={styles.heroTitleSub}>
                  <p className={styles.heroTitleSubText}>
                    FORMACIÓN CONTINUA
                  </p>
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <div className={styles.heroSubtitle}>
              <p className={styles.heroSubtitleText}>
                Formación académica especializada
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className={styles.heroButtonsContainer}>
            {/* Explorar programas - Orange button */}
            <a
              href="/courses"
              className={styles.heroButtonPrimary}
            >
              <span className={styles.heroButtonPrimaryText}>
                Explorar programas
              </span>
              <ArrowRight className={styles.heroButtonIcon} strokeWidth={1.74184} />
            </a>

            {/* Descargar brochure - Transparent button */}
            <button
              onClick={handleBrochure}
              className={styles.heroButtonSecondary}
              type="button"
            >
              <Download className={styles.heroButtonIcon} strokeWidth={1.74184} />
              <span className={styles.heroButtonSecondaryText}>
                Descargar brochure
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Sección Quiénes Somos - Diseño Asimétrico Moderno */}
      <section className={styles.quienesSomosSection}>
        <div className={styles.quienesSomosContainer}>
          <div className={styles.quienesSomosGrid}>
            {/* Columna Izquierda - Contenido */}
            <div className={styles.quienesSomosContent}>
              <div className={styles.quienesSomosBadge}>
                <div className={styles.quienesSomosBadgeDot}></div>
                <span className={styles.quienesSomosBadgeText}>Quienes somos</span>
              </div>

              <h2 className={styles.quienesSomosTitle}>
                Sobre<br />Nosotros
              </h2>

              <p className={styles.quienesSomosDescription}>
                CEAR Formación Continua es el área académica de CEAR LATINOAMERICANO, orientada a la capacitación especializada de profesionales vinculados al arbitraje, la contratación pública y la resolución de controversias. A través de programas, diplomados y talleres de actualización, promueve una formación rigurosa, práctica y alineada con los estándares nacionales e internacionales, respaldada por una plana docente con sólida experiencia académica y profesional.
              </p>

              {/* Lista de características */}
              <div className={styles.quienesSomosFeatures}>
                <div className={styles.quienesSomosFeature}>
                  <div className={styles.quienesSomosFeatureIcon}>
                    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                      <g clipPath="url(#clip0_check1)">
                        <path d={svgPathsAboutIcons.p3dc49580} stroke="#1CB8A4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
                        <path d="M6.75 9L8.25 10.5L11.25 7.5" stroke="#1CB8A4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
                      </g>
                      <defs>
                        <clipPath id="clip0_check1">
                          <rect fill="white" height="18" width="18" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className={styles.quienesSomosFeatureContent}>
                    <p className={styles.quienesSomosFeatureTitle}>Excelencia académica certificada</p>
                    <p className={styles.quienesSomosFeatureDescription}>Programas respaldados por certificaciones internacionales ISO</p>
                  </div>
                </div>

                <div className={styles.quienesSomosFeature}>
                  <div className={styles.quienesSomosFeatureIcon}>
                    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                      <g clipPath="url(#clip0_check2)">
                        <path d={svgPathsAboutIcons.p3dc49580} stroke="#1CB8A4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
                        <path d="M6.75 9L8.25 10.5L11.25 7.5" stroke="#1CB8A4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
                      </g>
                      <defs>
                        <clipPath id="clip0_check2">
                          <rect fill="white" height="18" width="18" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className={styles.quienesSomosFeatureContent}>
                    <p className={styles.quienesSomosFeatureTitle}>Metodología innovadora</p>
                    <p className={styles.quienesSomosFeatureDescription}>Plataforma virtual moderna con recursos interactivos</p>
                  </div>
                </div>

                <div className={styles.quienesSomosFeature}>
                  <div className={styles.quienesSomosFeatureIcon}>
                    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                      <g clipPath="url(#clip0_check3)">
                        <path d={svgPathsAboutIcons.p3dc49580} stroke="#1CB8A4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
                        <path d="M6.75 9L8.25 10.5L11.25 7.5" stroke="#1CB8A4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
                      </g>
                      <defs>
                        <clipPath id="clip0_check3">
                          <rect fill="white" height="18" width="18" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className={styles.quienesSomosFeatureContent}>
                    <p className={styles.quienesSomosFeatureTitle}>Reconocimiento internacional</p>
                    <p className={styles.quienesSomosFeatureDescription}>Convenios universitarios y alianzas estratégicas</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha - Imagen con diseño moderno */}
            <div className={styles.quienesSomosImageContainer}>
              <div className={styles.quienesSomosImageWrapper}>
                {/* Imagen principal */}
                <div className={styles.quienesSomosImage}>
                  <div className={styles.quienesSomosImageContent}>
                    <img
                      src="https://cearlatinoamericano.pe/images/logo-white.webp"
                      alt="Equipo CEAR"
                    />
                  </div>
                  <div className={styles.quienesSomosImageGradient}></div>
                </div>

                {/* Badge flotante moderno */}
                <div className={styles.quienesSomosBadgeFloating}>
                  <div className={styles.quienesSomosBadgeFloatingContent}>
                    <div className={styles.quienesSomosBadgeFloatingIcon}>
                      <svg className="w-[31.5px] h-[31.5px]" fill="none" viewBox="0 0 31.5 31.5">
                        <g>
                          <path d={svgPathsAboutIcons.p1dedb9c} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                          <path d={svgPathsAboutIcons.pdceed00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.625" />
                        </g>
                      </svg>
                    </div>
                    <div className={styles.quienesSomosBadgeFloatingText}>
                      <p className={styles.quienesSomosBadgeFloatingTitle}>Certificación ISO</p>
                      <p className={styles.quienesSomosBadgeFloatingSubtitle}>Calidad internacional</p>
                    </div>
                  </div>
                </div>

                {/* Elemento decorativo */}
                <div className={styles.quienesSomosDecorative}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Visión y Misión - Diseño Limpio */}
      <section className={styles.visionMisionSection}>
        <div className={styles.visionMisionContainer}>
          {/* Header */}
          <div className={styles.visionMisionHeader}>
            <div className={styles.visionMisionBadge}>
              <div className={styles.visionMisionBadgeDot}></div>
              <span className={styles.visionMisionBadgeText}>Nuestro propósito</span>
            </div>
            <h2 className={styles.visionMisionTitle}>
              Comprometidos con la excelencia
            </h2>
            <p className={styles.visionMisionSubtitle}>
              Transformamos profesionales a través de formación continua de alta calidad
            </p>
          </div>

          <div className={styles.visionMisionGrid}>
            {/* Visión */}
            <div className={styles.visionMisionCard}>
              <div className={styles.visionMisionCardIcon}>
                <svg className="w-9 h-9" fill="none" viewBox="0 0 36 36">
                  <g>
                    <path d={svgPathsVision.p25667780} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    <path d={svgPathsVision.p1747f000} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    <path d={svgPathsVision.p3ee2f100} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  </g>
                </svg>
              </div>
              <h3 className={styles.visionMisionCardTitle}>Nuestra visión</h3>
              <p className={styles.visionMisionCardDescription}>
                Consolidarnos como institución líder a nivel nacional e internacional en formación continua especializada en mecanismos de solución de controversias
              </p>
            </div>

            {/* Misión */}
            <div className={styles.visionMisionCard}>
              <div className={styles.visionMisionCardIcon}>
                <svg className="w-9 h-9" fill="none" viewBox="0 0 36 36">
                  <g>
                    <path d={svgPathsVision.pcddb400} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    <path d={svgPathsVision.pf1ed7e0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    <path d={svgPathsVision.p2aed0e00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    <path d={svgPathsVision.p2d4d6480} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  </g>
                </svg>
              </div>
              <h3 className={styles.visionMisionCardTitle}>Nuestra misión</h3>
              <p className={styles.visionMisionCardDescription}>
                Brindar programas de actualización profesional de calidad que fortalezcan competencias técnicas y prácticas en resolución de controversias
              </p>
            </div>
          </div>

          {/* CTA */}

        </div>
      </section>

      {/* Sección Instalaciones - Grid Moderno */}
      <section className={styles.instalacionesSection}>
        <div className={styles.instalacionesContainer}>
          {/* Header */}
          <div className={styles.instalacionesHeader}>
            <div className={styles.instalacionesBadge}>
              <div className={styles.instalacionesBadgeDot}></div>
              <span className={styles.instalacionesBadgeText}>Instalaciones</span>
            </div>
            <h2 className={styles.instalacionesTitle}>
              Infraestructura de primer nivel
            </h2>
            <p className={styles.instalacionesSubtitle}>
              Espacios equipados con tecnología de vanguardia
            </p>
          </div>

          {/* Grid asimétrico */}
          <div className={styles.instalacionesGrid}>
            {/* Card 1 - Grande */}
            <div className={`${styles.instalacionesCard} ${styles.instalacionesCardLarge}`}>
              <div className={styles.instalacionesCardImage}>
                <img
                  src={sede_lima}
                  alt="Infraestructura institucional"
                />
                <div className={styles.instalacionesCardGradient}></div>

                {/* Contenido sobre la imagen */}
                <div className={styles.instalacionesCardContent}>
                  <div className={styles.instalacionesCardBadge}>
                    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                      <g>
                        <path d="M7.5 9H10.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d="M7.5 6H10.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d={svgPathsInfra.p2fd90cc0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d={svgPathsInfra.p34612000} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d={svgPathsInfra.p982eec0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </g>
                    </svg>
                    <span className={styles.instalacionesCardBadgeText}>Institucional</span>
                  </div>
                  <h3 className={styles.instalacionesCardTitle}>
                    Sede principal en Lima
                  </h3>
                  <p className={styles.instalacionesCardDescription}>
                    Ubicación estratégica con instalaciones modernas y accesibles
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className={styles.instalacionesCard}>
              <div className={styles.instalacionesCardImage}>
                <img
                  src={equipo_vanguardia}
                  alt="Tecnología"
                />
                <div className={styles.instalacionesCardGradient}></div>

                <div className={styles.instalacionesCardContent}>
                  <div className={styles.instalacionesCardBadge}>
                    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                      <g>
                        <path d={svgPathsInfra.p2055d300} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d="M15.04 11.9902H2.95898" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </g>
                    </svg>
                    <span className={styles.instalacionesCardBadgeText}>Tecnología</span>
                  </div>
                  <h3 className={styles.instalacionesCardTitleSmall}>
                    Equipos de vanguardia
                  </h3>
                  <p className={styles.instalacionesCardDescriptionSmall}>
                    Última tecnología educativa
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className={styles.instalacionesCard}>
              <div className={styles.instalacionesCardImage}>
                <img
                  src={aula_especializada}
                  alt="Aulas"
                />
                <div className={styles.instalacionesCardGradient}></div>

                <div className={styles.instalacionesCardContent}>
                  <div className={styles.instalacionesCardBadge}>
                    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                      <g>
                        <path d="M9 5.25V15.75" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d={svgPathsInfra.p2044ea00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </g>
                    </svg>
                    <span className={styles.instalacionesCardBadgeText}>Académico</span>
                  </div>
                  <h3 className={styles.instalacionesCardTitleSmall}>
                    Aulas especializadas
                  </h3>
                  <p className={styles.instalacionesCardDescriptionSmall}>
                    Espacios de aprendizaje óptimos
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 - Grande horizontal */}
            <div className={`${styles.instalacionesCard} ${styles.instalacionesCardLarge}`}>
              <div className={styles.instalacionesCardImage}>
                <img
                  src={profesional_capacitado}
                  alt="Profesionales"
                />
                <div className={styles.instalacionesCardGradient}></div>

                <div className={styles.instalacionesCardContent}>
                  <div className={styles.instalacionesCardBadge}>
                    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                      <g>
                        <path d={svgPathsInfra.pd2eb480} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d={svgPathsInfra.p2aacd880} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d={svgPathsInfra.p12ace100} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d={svgPathsInfra.p19685c00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </g>
                    </svg>
                    <span className={styles.instalacionesCardBadgeText}>Equipo</span>
                  </div>
                  <h3 className={styles.instalacionesCardTitle}>
                    Profesionales altamente capacitados
                  </h3>
                  <p className={styles.instalacionesCardDescription}>
                    Docentes con experiencia comprobada en el sector
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Beneficios - Cards Minimalistas */}
      <section className={styles.beneficiosSection}>
        <div className={styles.beneficiosContainer}>
          {/* Header centrado */}
          <div className={styles.beneficiosHeader}>
            <p className={styles.beneficiosHeaderLabel}>
              <span className="uppercase">B</span>
              <span className="lowercase">eneficios </span>
              <span className="uppercase">E</span>
              <span className="lowercase">xclusivos</span>
            </p>
            <h2 className={styles.beneficiosTitle}>
              ¿Por qué elegirnos?
            </h2>
            <p className={styles.beneficiosSubtitle}>
              Ventajas que nos posicionan como líderes en formación continua
            </p>
          </div>

          {/* Grid de beneficios - 2x2 en desktop, 1 columna en responsive */}
          <div className={styles.beneficiosGrid}>
            {/* Beneficio 1 */}
            <div className={styles.beneficioItem}>
              <div className={styles.beneficioIcon}>
                <svg className={styles.beneficioIconSvg} fill="none" viewBox="0 0 53.788 53.788">
                  <g>
                    <path d="M26.8945 22.4116H26.9165" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
                    <path d="M26.8945 31.376H26.9165" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
                    <path d="M26.8945 13.4473H26.9165" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
                    <path d="M35.8592 22.4116H35.8811" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
                    <path d="M35.8592 31.376H35.8811" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
                    <path d="M35.8592 13.447H35.8811" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
                    <path d="M17.9297 22.4116H17.9517" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
                    <path d="M17.9297 31.376H17.9517" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
                    <path d="M17.9297 13.4473H17.9517" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
                    <path d={svgPathsBeneficios.p3ec8e600} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
                    <path d={svgPathsBeneficios.p5c65b00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4823" />
                  </g>
                </svg>
              </div>
              <div className={styles.beneficioContent}>
                <h3 className={styles.beneficioTitle}>Trayectoria sólida</h3>
                <p className={styles.beneficioDescription}>
                  Experiencia respaldada por convenios universitarios
                </p>
              </div>
            </div>

            {/* Separador */}
            <div className={styles.beneficioSeparator}>
              <svg className="w-full h-[3px]" fill="none" preserveAspectRatio="none" viewBox="0 0 486.329 3">
                <path d="M0 1.5H486.329" stroke="#EE8A28" strokeWidth="3" />
              </svg>
            </div>

            {/* Beneficio 2 */}
            <div className={styles.beneficioItem}>
              <div className={styles.beneficioIcon}>
                <svg className={styles.beneficioIconSvg} fill="none" viewBox="0 0 66.804 66.804">
                  <g>
                    <path d={svgPathsBeneficios.p3fee3a17} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.56699" />
                    <path d={svgPathsBeneficios.p24596580} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.56699" />
                    <path d={svgPathsBeneficios.p277fc5f0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.56699" />
                    <path d={svgPathsBeneficios.pd908a00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.56699" />
                  </g>
                </svg>
              </div>
              <div className={styles.beneficioContent}>
                <h3 className={styles.beneficioTitle}>Docentes expertos</h3>
                <p className={styles.beneficioDescription}>
                  Docentes con amplia experiencia profesional comprobrada
                </p>
              </div>
            </div>

            {/* Separador */}
            <div className={styles.beneficioSeparator}>
              <svg className="w-full h-[3px]" fill="none" preserveAspectRatio="none" viewBox="0 0 486.329 3">
                <path d="M0 1.5H486.329" stroke="#EE8A28" strokeWidth="3" />
              </svg>
            </div>

            {/* Beneficio 3 */}
            <div className={styles.beneficioItem}>
              <div className={styles.beneficioIcon}>
                <svg className={styles.beneficioIconSvg} fill="none" viewBox="0 0 66.895 66.895">
                  <g>
                    <path d={svgPathsBeneficios.p12e7a200} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.57456" />
                    <path d="M33.4473 47.3838V58.5329" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.57456" />
                    <path d="M22.2988 58.5327H44.5971" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.57456" />
                    <path d={svgPathsBeneficios.p2fa2d600} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.57456" />
                  </g>
                </svg>
              </div>
              <div className={styles.beneficioContent}>
                <h3 className={styles.beneficioTitle}>Formación virtual</h3>
                <p className={styles.beneficioDescription}>
                  Plataforma virtual moderna para formación profesional
                </p>
              </div>
            </div>

            {/* Separador */}
            <div className={styles.beneficioSeparator}>
              <svg className="w-full h-[3px]" fill="none" preserveAspectRatio="none" viewBox="0 0 486.329 3">
                <path d="M0 1.5H486.329" stroke="#EE8A28" strokeWidth="3" />
              </svg>
            </div>

            {/* Beneficio 4 */}
            <div className={styles.beneficioItem}>
              <div className={styles.beneficioIcon}>
                <svg className={styles.beneficioIconSvg} fill="none" viewBox="0 0 73.512 73.512">
                  <g>
                    <path d={svgPathsBeneficios.p3f4b0d00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6.12599" />
                    <path d={svgPathsBeneficios.pd280200} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6.12599" />
                  </g>
                </svg>
              </div>
              <div className={styles.beneficioContent}>
                <h3 className={styles.beneficioTitle}>Flexibilidad total</h3>
                <p className={styles.beneficioDescription}>
                  Horarios flexibles adaptables a profesionales en actividad
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Certificaciones ISO - Diseño Premium */}
      <section className={styles.certificacionesSection}>
        <div className={styles.certificacionesContainer}>
          {/* Header */}
          <div className={styles.certificacionesHeader}>
            <div className={styles.certificacionesBadge}>
              <Shield className="w-4 h-4 text-[#1c98b7]" strokeWidth={2.5} />
              <span className={styles.certificacionesBadgeText}>Certificaciones ISO</span>
            </div>
            <h2 className={styles.certificacionesTitle}>
              Certificados por SGS para garantizar excelencia académica
            </h2>
            <p className={styles.certificacionesSubtitle}>
              SGS es la empresa líder mundial en inspección, verificación y certificación. Nuestras certificaciones garantizan estándares internacionales en todos nuestros procesos institucionales.
            </p>
          </div>

          {/* Grid de 3 certificaciones */}
          <div className={styles.certificacionesGrid}>
            {/* ISO 9001 */}
            <div className={styles.certificacionCard}>
              <a
                href="https://www.sgs.com/en/certified-clients-and-products/certified-client-directory"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.certificacionCardLink}
              >
                <div className={styles.certificacionCardImageWrapper}>
                  <img
                    src="https://cearlatinoamericano.pe/rsc/public/nosotros/archivos/iso-90012015.webp"
                    alt="ISO 9001:2015"
                    className={styles.certificacionCardImage}
                  />
                </div>
              </a>
              <h3 className={styles.certificacionCardTitle}>
                ISO 9001:2015
              </h3>
              <a
                href="https://cearlatinoamericano.pe/rsc/public/nosotros/archivos/iso-90012015-pdf.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.certificacionDownloadButton}
              >
                <Download className="w-4.5 h-4.5" strokeWidth={2.5} />
                <span>Descargar certificado</span>
              </a>
            </div>

            {/* ISO 37001 */}
            <div className={styles.certificacionCard}>
              <a
                href="https://www.sgs.com/en/certified-clients-and-products/certified-client-directory"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.certificacionCardLink}
              >
                <div className={styles.certificacionCardImageWrapper}>
                  <img
                    src="https://cearlatinoamericano.pe/rsc/public/nosotros/archivos/iso-370012016.webp"
                    alt="ISO 37001:2016"
                    className={styles.certificacionCardImage}
                  />
                </div>
              </a>
              <h3 className={styles.certificacionCardTitle}>
                ISO 37001:2016
              </h3>
              <a
                href="https://cearlatinoamericano.pe/rsc/public/nosotros/archivos/iso-370012016-pdf.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.certificacionDownloadButton}
              >
                <Download className="w-4.5 h-4.5" strokeWidth={2.5} />
                <span>Descargar certificado</span>
              </a>
            </div>

            {/* ISO 27001 */}
            <div className={styles.certificacionCard}>
              <a
                href="https://www.sgs.com/en/certified-clients-and-products/certified-client-directory"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.certificacionCardLink}
              >
                <div className={styles.certificacionCardImageWrapper}>
                  <img
                    src="https://cearlatinoamericano.pe/rsc/public/images/ISO27001.png"
                    alt="ISO 27001:2013"
                    className={styles.certificacionCardImage}
                  />
                </div>
              </a>
              <h3 className={styles.certificacionCardTitle}>
                ISO 27001:2013
              </h3>
              <a
                href="https://cearlatinoamericano.pe/rsc/public/CONSTANCIA%20CERTIFICACION-CEAR.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.certificacionDownloadButton}
              >
                <Download className="w-4.5 h-4.5" strokeWidth={2.5} />
                <span>Descargar certificado</span>
              </a>
            </div>
          </div>

          {/* Banner informativo inferior */}
          <div className={styles.certificacionesBanner}>
            <div className={styles.certificacionesBannerDecorative1}></div>
            <div className={styles.certificacionesBannerDecorative2}></div>

            <div className={styles.certificacionesBannerContent}>
              <div className={styles.certificacionesBannerIcon}>
                <Award className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className={styles.certificacionesBannerTitle}>
                Alcance de certificaciones
              </h3>
              <p className={styles.certificacionesBannerDescription}>
                Estas certificaciones son aplicables a diplomados, cursos de especialización, capacitaciones in-house y demás actividades académicas desarrolladas en el ámbito de la contratación pública, el arbitraje, las juntas de resolución de disputas y la formación continua vinculada a las áreas del Derecho y la Ingeniería.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}