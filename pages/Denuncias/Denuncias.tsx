import { ComplaintFormModal } from "../../components/ComplaintFormModal";
import { useState } from "react";
import svgPathsDenuncias from "../../imports/svg-iuf63vznk4";
import svgPathsSeguro from "../../imports/svg-vrcgs3on2l";
import PoliticasReglamentosSection from "../../imports/Frame286-9038-372";
import styles from "./Denuncias.module.css";

// Imágenes - usando rutas de imágenes reales
const imgDenuncias = "/images/denuncias/denuncias.webp"; // Ajustar según la ruta real
const imgFondoDenuncias = "/images/denuncias/banner_denuncias.webp"; // Ajustar según la ruta real

export function Denuncias() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.denunciasPage}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        {/* Imagen de fondo */}
        <img 
          src={imgFondoDenuncias}
          alt="" 
          className={styles.heroBackgroundImage}
        />

        {/* Contenido */}
        <div className={styles.heroContentContainer}>
          {/* Título */}
          <div className={styles.titleSection}>
            <div className={styles.titleContainer}>
              <h1 className={styles.titleWhite}>
                Canal de
              </h1>
              <h1 className={styles.titleOrange}>
                denuncias
              </h1>
            </div>
            <p className={styles.description}>
              Este espacio recibe denuncias de forma confidencial y cada reporte será tratado con absoluta reserva por un equipo profesional especializado.
            </p>
          </div>

          {/* Contenido principal */}
          <div className={styles.mainContentGrid}>
            {/* Imagen */}
            <div className={styles.imageContainer}>
              <div className={styles.imageWrapper}>
                <img 
                  src={imgDenuncias}
                  alt="Denuncias" 
                />
              </div>
            </div>

            {/* Contenido de texto */}
            <div className={styles.textContentContainer}>
              {/* ¿Qué es una denuncia? */}
              <div className={styles.whatIsComplaint}>
                <h2 className={styles.whatIsComplaintTitle}>
                  ¿Qué es una denuncia?
                </h2>
                <p className={styles.whatIsComplaintText}>
                  Es la comunicación que puede establecer con nosotros para reportar cualquier infracción o irregularidad relacionada con nuestras políticas o reglamentos. Nuestro objetivo es investigar y resolver estas situaciones, garantizando la transparencia y la integridad de todas nuestras operaciones.
                </p>
              </div>

              {/* Características */}
              <div className={styles.featuresContainer}>
                {/* Confidencial */}
                <div className={styles.featureItem}>
                  <div className={styles.featureIconContainer}>
                    <svg fill="none" viewBox="0 0 50.1505 51.3041">
                      <path d={svgPathsDenuncias.p1f09c740} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.227" />
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <h3 className={styles.featureTitle}>
                      Confidencial
                    </h3>
                    <p className={styles.featureDescription}>
                      Su identidad y reporte están completamente protegidos
                    </p>
                  </div>
                </div>

                {/* Seguro */}
                <div className={styles.featureItem}>
                  <div className={styles.featureIconContainer}>
                    <svg fill="none" viewBox="0 0 42.6691 43.5515">
                      <path d={svgPathsSeguro.p2358a300} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.31078" />
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <h3 className={styles.featureTitle}>
                      Seguro
                    </h3>
                    <p className={styles.featureDescription}>
                      Proceso transparente con seguimiento profesional
                    </p>
                  </div>
                </div>

                {/* Rápido */}
                <div className={styles.featureItem}>
                  <div className={styles.featureIconContainer}>
                    <svg fill="none" viewBox="0 0 58.4988 59.8445">
                      <path d={svgPathsDenuncias.p2dc7db00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.93065" />
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <h3 className={styles.featureTitle}>
                      Rápido
                    </h3>
                    <p className={styles.featureDescription}>
                      Atención inmediata y respuesta oportuna
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className={styles.policiesSectionContainer}>
        {/* Nueva sección de Políticas y Reglamentos */}
        <PoliticasReglamentosSection onDenunciaClick={() => setIsModalOpen(true)} />
      </div>

      {/* Modal */}
      <ComplaintFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
