import svgPaths from "../imports/svg-x4qmp13nyv";
import styles from "./CourseHeroSection.module.css";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CourseHeroSectionProps {
    title: string;
    description: string;
    image: string;
    type: "diplomado" | "curso" | "taller";
    stats: {
        certification: string | {
            issuedBy: string;
            partnerInstitution: string;
            requirements: string[];
        };
        modality: string;
        duration: string;
        frequency: string;
        schedule: string;
        hours: string;
    };
    onEnroll: () => void;
    onBrochure?: () => void;
    onContactAdvisor?: () => void;
    startDate?: string;
}

export function CourseHeroSection({
    title,
    description,
    image,
    type,
    stats,
    onEnroll,
    onBrochure,
    onContactAdvisor,
    startDate,
}: CourseHeroSectionProps) {
    const isTaller = type === "taller";

    // Formatear fecha para mostrar en formato DD/MM/YY
    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        try {
            let date: Date;

            // Detectar formato DD-MM-YY o DD/MM/YY
            const dashMatch = dateString.match(
                /^(\d{2})[-/](\d{2})[-/](\d{2,4})$/,
            );
            if (dashMatch) {
                const [, day, month, year] = dashMatch;
                // Si el año tiene 2 dígitos, asumir 20XX
                const fullYear =
                    year.length === 2 ? parseInt(`20${year}`) : parseInt(year);
                const monthNum = parseInt(month);
                const dayNum = parseInt(day);
                // Crear fecha usando constructor con números para evitar problemas de zona horaria
                date = new Date(fullYear, monthNum - 1, dayNum);
            } else {
                // Intentar parsear como fecha estándar
                date = new Date(dateString);
            }

            // Verificar que la fecha sea válida
            if (isNaN(date.getTime())) {
                return dateString; // Retornar el string original si no se puede parsear
            }

            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = String(date.getFullYear()).slice(-2);
            return `${day}/${month}/${year}`;
        } catch {
            return dateString;
        }
    };

    return (
        <section className={styles.heroSection}>
            {/* Background Image with Low Opacity */}
            <div className={styles.backgroundImage}>
                <ImageWithFallback alt={title} src={image} />
            </div>

            {/* Content Container */}
            <div className={styles.contentContainer}>
                {/* Type Badge - DIPLOMADO/CURSO/TALLER */}
                <div className={styles.badgeContainer}>
                    <div
                        className={isTaller ? styles.badgeTaller : styles.badge}
                    >
                        <p className={styles.badgeText}>
                            {isTaller
                                ? "Taller"
                                : type === "diplomado"
                                  ? "Diplomado"
                                  : "Curso"}
                        </p>
                    </div>
                </div>

                {/* Title */}
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>{title}</h1>

                    {/* Description */}
                    <p className={styles.description}>{description}</p>
                </div>

                {/* Stats Container - White Semi-transparent Box */}
                <div className={styles.statsContainer}>
                    <div
                        className={
                            isTaller ? styles.statsGridTaller : styles.statsGrid
                        }
                    >
                        {/* Certification */}
                        <div className={styles.statItem}>
                            <div className={styles.statIconContainer}>
                                <div className={styles.statIcon}>
                                    <svg
                                        fill="none"
                                        preserveAspectRatio="none"
                                        viewBox="0 0 31.5 31.5"
                                    >
                                        <g>
                                            <path
                                                d={svgPaths.p14175300}
                                                stroke="white"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2.625"
                                            />
                                            <path
                                                d={svgPaths.pdceed00}
                                                stroke="white"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2.625"
                                            />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <div className={styles.statContent}>
                                <p className={styles.statLabel}>
                                    Certificación
                                </p>
                                <p className={styles.statValue}>
                                    {typeof stats.certification === 'string' 
                                      ? stats.certification 
                                      : `${stats.certification.issuedBy}${stats.certification.partnerInstitution ? ` - ${stats.certification.partnerInstitution}` : ''}`}
                                </p>
                            </div>
                        </div>

                        {/* Modality */}
                        <div className={styles.statItem}>
                            <div className={styles.statIconContainer}>
                                <div className={styles.statIcon}>
                                    <svg
                                        fill="none"
                                        preserveAspectRatio="none"
                                        viewBox="0 0 31.5 31.5"
                                    >
                                        <g>
                                            <path
                                                d={svgPaths.p1263b2f0}
                                                stroke="white"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2.625"
                                            />
                                            <path
                                                d="M10.5 27.5625H21"
                                                stroke="white"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2.625"
                                            />
                                            <path
                                                d="M15.75 22.3125V27.5625"
                                                stroke="white"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2.625"
                                            />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <div className={styles.statContent}>
                                <p className={styles.statLabel}>Modalidad</p>
                                <p
                                    className={`${styles.statValue} ${styles.statValueCapitalize}`}
                                >
                                    {stats.modality}
                                </p>
                            </div>
                        </div>

                        {/* Date (solo para talleres) o Duration (para otros tipos) */}
                        {isTaller ? (
                            <div className={styles.statItem}>
                                <div className={styles.statIconContainer}>
                                    <div className={styles.statIcon}>
                                        <svg
                                            fill="none"
                                            preserveAspectRatio="none"
                                            viewBox="0 0 31.5 31.5"
                                        >
                                            <g>
                                                <path
                                                    d="M10.5 2.625V7.875"
                                                    stroke="white"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2.625"
                                                />
                                                <path
                                                    d="M21 2.625V7.875"
                                                    stroke="white"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2.625"
                                                />
                                                <path
                                                    d={svgPaths.p2a7f12c0}
                                                    stroke="white"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2.625"
                                                />
                                                <path
                                                    d="M3.9375 13.125H27.5625"
                                                    stroke="white"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2.625"
                                                />
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                                <div className={styles.statContent}>
                                    <p className={styles.statLabel}>Fecha</p>
                                    <p className={styles.statValueSmall}>
                                        {formatDate(startDate)}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Duration */}
                                <div className={styles.statItem}>
                                    <div className={styles.statIconContainer}>
                                        <div className={styles.statIcon}>
                                            <svg
                                                fill="none"
                                                preserveAspectRatio="none"
                                                viewBox="0 0 31.5 31.5"
                                            >
                                                <g>
                                                    <path
                                                        d="M15.75 9.1875V27.5625"
                                                        stroke="white"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2.625"
                                                    />
                                                    <path
                                                        d={svgPaths.p2c4a5900}
                                                        stroke="white"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2.625"
                                                    />
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className={styles.statContent}>
                                        <p className={styles.statLabel}>
                                            Duración
                                        </p>
                                        <p className={styles.statValueSmall}>
                                            {stats.duration}
                                        </p>
                                    </div>
                                </div>

                                {/* Frequency */}
                                <div className={styles.statItem}>
                                    <div className={styles.statIconContainer}>
                                        <div className={styles.statIcon}>
                                            <svg
                                                fill="none"
                                                preserveAspectRatio="none"
                                                viewBox="0 0 31.5 31.5"
                                            >
                                                <g>
                                                    <path
                                                        d="M10.5 2.625V7.875"
                                                        stroke="white"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2.625"
                                                    />
                                                    <path
                                                        d="M21 2.625V7.875"
                                                        stroke="white"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2.625"
                                                    />
                                                    <path
                                                        d={svgPaths.p2a7f12c0}
                                                        stroke="white"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2.625"
                                                    />
                                                    <path
                                                        d="M3.9375 13.125H27.5625"
                                                        stroke="white"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2.625"
                                                    />
                                                    <path
                                                        d="M10.5 18.375H10.5131"
                                                        stroke="white"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2.625"
                                                    />
                                                    <path
                                                        d="M15.75 18.375H15.7631"
                                                        stroke="white"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2.625"
                                                    />
                                                    <path
                                                        d="M21 18.375H21.0131"
                                                        stroke="white"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2.625"
                                                    />
                                                    <path
                                                        d="M10.5 23.625H10.5131"
                                                        stroke="white"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2.625"
                                                    />
                                                    <path
                                                        d="M15.75 23.625H15.7631"
                                                        stroke="white"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2.625"
                                                    />
                                                    <path
                                                        d="M21 23.625H21.0131"
                                                        stroke="white"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2.625"
                                                    />
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className={styles.statContent}>
                                        <p className={styles.statLabel}>
                                            Frecuencia
                                        </p>
                                        <p className={styles.statValueSmall}>
                                            {stats.frequency}
                                        </p>
                                    </div>
                                </div>

                                {/* Hours */}
                                <div className={styles.statItem}>
                                    <div className={styles.statIconContainer}>
                                        <div className={styles.statIcon}>
                                            <svg
                                                fill="none"
                                                preserveAspectRatio="none"
                                                viewBox="0 0 31.5 31.5"
                                            >
                                                <g>
                                                    <path
                                                        d="M15.75 7.875V15.75L21 18.375"
                                                        stroke="white"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2.625"
                                                    />
                                                    <path
                                                        d={svgPaths.p5a064f0}
                                                        stroke="white"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2.625"
                                                    />
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className={styles.statContent}>
                                        <p className={styles.statLabel}>
                                            Horas
                                        </p>
                                        <p className={styles.statValue}>
                                            {stats.hours}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Schedule */}
                        <div className={styles.statItem}>
                            <div className={styles.statIconContainer}>
                                <div className={styles.statIcon}>
                                    <svg
                                        fill="none"
                                        preserveAspectRatio="none"
                                        viewBox="0 0 31.5 31.5"
                                    >
                                        <g>
                                            <path
                                                d="M10.5 2.625V7.875"
                                                stroke="white"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2.625"
                                            />
                                            <path
                                                d="M21 2.625V7.875"
                                                stroke="white"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2.625"
                                            />
                                            <path
                                                d={svgPaths.p2a7f12c0}
                                                stroke="white"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2.625"
                                            />
                                            <path
                                                d="M3.9375 13.125H27.5625"
                                                stroke="white"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2.625"
                                            />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <div className={styles.statContent}>
                                <p className={styles.statLabel}>Horario</p>
                                <p className={styles.statValueSmall}>
                                    {stats.schedule}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className={styles.buttonsContainer}>
                    {/* Enroll Button - Orange for taller, Turquoise for others */}
                    <button
                        onClick={onEnroll}
                        className={
                            isTaller
                                ? styles.enrollButtonTaller
                                : styles.enrollButton
                        }
                    >
                        <span className={styles.enrollButtonText}>
                            Inscríbete ahora
                        </span>
                    </button>

                    {/* Brochure Button - Light blue for taller, transparent for others */}
                    {onBrochure && (
                        <button
                            onClick={onBrochure}
                            className={
                                isTaller
                                    ? styles.brochureButtonTaller
                                    : styles.brochureButton
                            }
                        >
                            <div className={styles.brochureButtonIcon}>
                                <svg
                                    fill="none"
                                    preserveAspectRatio="none"
                                    viewBox="0 0 22.5 22.5"
                                >
                                    <g>
                                        <path
                                            d="M11.25 14.0625V2.8125"
                                            stroke="white"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.875"
                                        />
                                        <path
                                            d={svgPaths.p31db5900}
                                            stroke="white"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.875"
                                        />
                                        <path
                                            d={svgPaths.p11947300}
                                            stroke="white"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.875"
                                        />
                                    </g>
                                </svg>
                            </div>
                            <span className={styles.brochureButtonText}>
                                Descargar brochure
                            </span>
                        </button>
                    )}

                    {/* Contact Advisor Button - For all course types */}
                    {onContactAdvisor && (
                        <button
                            onClick={onContactAdvisor}
                            className={
                                isTaller
                                    ? styles.contactButtonTaller
                                    : styles.contactButton
                            }
                        >
                            <div className={styles.contactButtonIcon}>
                                <svg
                                    fill="none"
                                    preserveAspectRatio="none"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                                        fill="white"
                                        stroke="none"
                                    />
                                </svg>
                            </div>
                            <span className={styles.contactButtonText}>
                                Contactar asesor
                            </span>
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
