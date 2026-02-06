// ============================================
// ASSETS - LOGOS
// ============================================
const cearLogo = "/logos/cear-logo.png";

// ============================================
// ASSETS - CERTIFICADOS
// ============================================
const cpCertificate = "/certificates/CERTIFICADO_C_CP.jpg";
const mipCertificate = "/certificates/CERTIFICADO_C_MIP.jpg";
const dapaCertificate = "/certificates/CERTIFICADO_D_DAPA.jpg";
const jprdCertificate = "/certificates/CERTIFICADO_D_JPRD.jpg";

// ============================================
// ASSETS - INSTRUCTORES
// ============================================

const erickCubaMeneses = "/images/docentes/DAPA/Erick Cuba Meneses.png";
const ernestoMendozaFlores = "/images/docentes/DAPA/Ernesto Mendoza Flores.png";
const jorgeDanosOrdonez = "/images/docentes/DAPA/Jorge Danós Ordóñez.png";
const karinaAlvarado = "/images/docentes/DAPA/Karina Albarado.png";
const marcoAntonioMachadoHerrera =
    "/images/docentes/DAPA/Marco Antonio Machado Herrera.png";
const marthaWarthonCastaneda =
    "/images/docentes/DAPA/Martha Warthon Castañeda.png";
const nataliaMoriTorres = "/images/docentes/DAPA/Natalia Mori Torres.png";
const paulVillegas = "/images/docentes/DAPA/Paul Villegas.png";
const rubenMarques = "/images/docentes/DAPA/Ruben Marques.png";
const jhonMalca = "/images/instructors/jhon-malca.png";
const jimmyPisfil = "/images/docentes/DAPA/Dr Jimmy.png";
const raulSalazar = "/images/docentes/DAPA/Raul Salazar.png";
// MIP
const mipZulema = "/images/docentes/MIP/zulema.png";
const mipMariaVeiga = "/images/docentes/MIP/maria-veiga.png";
const mipGuillermo = "/images/docentes/MIP/guillermo.png";
const mipJoseLeon = "/images/docentes/MIP/jose-leon.png";
const mipYacoRosas = "/images/docentes/MIP/yaco-rosas.png";
const janeyriBoyer = "/images/docentes/DAPA/Janeyri Boyer Carrera.png";
const jennyGuerrero = "/images/docentes/JPRD/JENNY GUERRERO.png";
const rosaRivera = "/images/docentes/JPRD/rosa rivera.png";
const leonLopez = "/images/docentes/JPRD/LEÓN LÓPEZ AVILÉS_2.png";
// const christianChocano = "/images/docentes/CP/Christian Chocano Davis_.png";
const erickMendoza = "/images/docentes/CP/Erick Mendoza Merino_.png";
const luisVillavicencio = "/images/docentes/CP/Luis Villavicencio Benites_.png";
const stevenFlores = "/images/docentes/CP/Steven Flores Olivera_.png";
// const Mandujano = "/images/docentes/DAPA/Mandujano.png";
const joseGonzalesCucho = "/images/docentes/DAPA/gonzales_cucho.png";

// ============================================
// ASSETS - TESTIMONIOS
// ============================================
const carlaPeceros = "/images/testimonials/carla-peceros.png";
const nadiaChihuan = "/images/testimonials/testimonial-woman.png"; // TODO: Reemplazar con imagen real cuando esté disponible
const karinaAlvaradoTestimonial = "/assets/karina-alvarado.jpeg";
const manuelChacaltana = "/images/testimonials/manuel-chacaltana-alt.png";

// ============================================
// ASSETS - PORTADAS DE CURSOS
// ============================================
const derechoAdministrativoPortada =
    "/images/courses/derecho-administrativo.jpg";
const jprdPortada = "/images/courses/portada-generic.jpg"; // TODO: Reemplazar con imagen real cuando esté disponible
const contratacionPublicaPortada = "/images/courses/contratacion-publica.jpg";
const inversionPrivadaPortada = "/images/courses/mip.jpeg";

// ============================================
// ASSETS - TALLERES
// ============================================
const taller1 = "/images/courses/taller-abogado.jpeg";
const certificadoTaller = "/images/courses/taller_certificado.jpeg";

const taller4 = "/images/courses/taller-4.jpeg";
const certificadoTaller4 = "/certificates/Certificado_taller_4.jpeg";

const hugoVallejos = "/images/instructors/hugo_vallejos.png";

export interface Course {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    type: "diplomado" | "curso" | "taller";
    modality: "presencial" | "virtual" | "híbrido";
    platform?: string;
    duration: string;
    price: number;
    certification: string | {
        issuedBy: string;
        partnerInstitution: string;
        requirements: string[];
    };
    image: string;
    frequency: string;
    schedule: string;
    hours: string;
    sessions?: number;
    category?: string;
    benefits?: string | string[];
    videoUrl?: string;
    videoThumbnail?: string;
    certificationImage?: string;
    institutionLogos?: string[];
    enrollmentDeadline?: string;
    brochure?: string;
    /**
     * Enlace (por curso) al calendario/cronograma de actividades.
     * Si está vacío o no existe, NO se mostrará el botón CTA "Calendario de actividades".
     */
    activityCalendarUrl?: string;
    syllabus: {
        module: string;
        topics?: string[]; // Para compatibilidad con cursos existentes
        subModules?: {
            title: string;
            topics: string[];
        }[]; // Nueva estructura con submódulos
    }[];
    instructors: {
        name: string;
        title: string;
        bio: string;
        image: string;
        degrees?: string[];
        masterDoctorate?: string[];
        books?: string[];
        articles?: string[];
        universityTeaching?: string[];
        teachingExperience?: string[];
        professionalExperience?: string[];
        awards?: string[];
    }[];
    startDate: string;
    featured: boolean;
    materials?: string[];
}

export const courses: Course[] = [
    {
        id: "curso-cp",
        title: "Curso de Especialización en Contratación Pública bajo la Ley N° 32069 y su Reglamento",
        shortDescription:
            "Formación especializada y actual sobre contrataciones con   el Estado.",
        fullDescription:
            "La entrada en vigencia de la Ley N° 32069 y su Reglamento ha transformado de manera integral el sistema de contratación pública en el Perú, incorporando nuevos enfoques, actores y herramientas de gestión. Este curso ofrece una formación práctica y especializada que abarca desde los fundamentos normativos hasta la ejecución contractual. El programa busca que el participante adquiera criterios técnicos para planificar, conducir y supervisar procesos de contratación pública, reduciendo riesgos legales y mejorando la toma de decisiones en cada etapa del procedimiento.",
        type: "curso",
        modality: "virtual",
        duration: "19/02/26 – 21/04/26",
        price: 2600,
        certification: "Doble certificación",
        image: contratacionPublicaPortada,
        frequency: "Mar - Jue",
        schedule: "07:00 p.m. - 10:00 p.m.",
        hours: "120 horas académicas",
        category: "Contratación Pública",
        benefits:
            "La entrada en vigor de la Ley N° 32069 y su Reglamento ha transformado de manera integral el sistema de contratación pública en el Perú, incorporando nuevos enfoques, actores y herramientas de gestión. En este escenario, el curso ofrece una formación especializada que abarca desde los fundamentos normativos hasta la ejecución contractual y la resolución de controversias mediante el arbitraje y la junta de prevención y resolución de disputas. El programa busca que el participante adquiera criterios técnicos para planificar, conducir y supervisar procesos de contratación pública, reduciendo riesgos legales y mejorando la toma de decisiones en cada etapa del procedimiento.",
        videoUrl:
            "https://www.youtube.com/embed/FyxAb0dZJiA?si=PpOufiTTyLtutC6o",
        videoThumbnail: contratacionPublicaPortada,
        certificationImage: cpCertificate,
        institutionLogos: [cearLogo],
        enrollmentDeadline: "16-02-2026",
        brochure:
            "https://cearlatinoamericano.edu.pe/sisdocs/brochures/BROCHURE%20CP.pdf",
        syllabus: [
            {
                module: "MÓDULO I: INTRODUCCIÓN A LA CONTRATACIÓN PÚBLICA EN EL PERÚ",
                subModules: [
                    {
                        title: "1. Fundamentos básicos de la contratación pública",
                        topics: [
                            "Regulación de la contratación pública en el Perú",
                            "Importancia de la contratación pública en la economía",
                            "Contexto histórico y evolución normativa",
                            "Marco normativo actual de la contratación pública",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO II: FUNDAMENTOS DE LA LEY N° 32069 Y SU REGLAMENTO",
                subModules: [
                    {
                        title: "2. Fundamentos normativos de la Ley N° 32069 y su Reglamento",
                        topics: [
                            "Objeto, finalidad y ámbito de aplicación",
                            "Principios rectores de la contratación pública",
                            "Valor por dinero",
                            "Enfoques de la contratación pública",
                            "Gestión por resultados",
                            "Supuestos excluidos",
                            "Regímenes especiales",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO III: ACTORES INVOLUCRADOS EN LA CONTRATACIÓN PÚBLICA",
                subModules: [
                    {
                        title: "3. Actores en la contratación pública (I)",
                        topics: [
                            "Dirección General de Abastecimiento (DGA)",
                            "Organismo Especializado para las Contrataciones Públicas Eficientes (OECE)",
                            "Rol del OECE",
                            "Funciones del OECE",
                            "Plan Anual de Supervisión y Asistencia Técnica",
                            "Acciones de supervisión",
                            "Asistencia técnica y orientación",
                            "Absolución de consultas",
                        ],
                    },
                    {
                        title: "4. Actores en la contratación pública (II)",
                        topics: [
                            "Central de Compras Públicas (Perú Compras)",
                            "Rol de Perú Compras",
                            "Obligación de atención por parte de las entidades",
                            "Acompañamiento en pilotos",
                            "Entidades contratantes",
                            "Titular de la Entidad",
                            "Autoridad de la gestión normativa",
                            "Área usuaria",
                            "Área técnica estratégica",
                            "Registro de Entidades Contratantes (REC)",
                            "Compradores públicos: Certificación y registro",
                            "Proveedores",
                            "Registro Nacional de Proveedores (RNP)",
                            "Ficha Única de Proveedor (FUP)",
                            "Evaluación del desempeño",
                            "Impedimentos para contratar con el Estado",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO IV: MODALIDADES Y HERRAMIENTAS EN LA CONTRATACIÓN PÚBLICA",
                subModules: [
                    {
                        title: "5. Modalidades y herramientas de contratación pública",
                        topics: [
                            "Modalidades de contratación pública eficiente",
                            "Contratos menores",
                            "Compra por encargo",
                            "Compra centralizada",
                            "Compra corporativa",
                            "Compra pública de innovación",
                            "Acuerdos marco",
                            "Contrataciones por emergencia",
                            "Herramientas facilitadoras",
                            "Plataforma Digital para las Contrataciones Públicas (Pladicop)",
                            "Estandarización de requerimientos",
                            "Catálogos electrónicos de acuerdos marco",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO V: ACTUACIONES PREPARATORIAS",
                subModules: [
                    {
                        title: "6. Actuaciones preparatorias (I)",
                        topics: [
                            "Elaboración del requerimiento",
                            "Segmentación",
                            "Anuncio de contratación futura",
                            "Contenido del requerimiento",
                            "Fraccionamiento",
                            "Estrategias de contratación",
                            "Variables de análisis",
                            "Asignación de riesgos",
                            "Estrategia para obras y consultoría de obras",
                            "Sistema de entrega de obra",
                            "Contratos estandarizados internacionales",
                            "Metodologías colaborativas: BIM",
                        ],
                    },
                    {
                        title: "7. Actuaciones preparatorias (II)",
                        topics: [
                            "Interacción con el mercado",
                            "Indagación y consulta",
                            "Criterios de interacción",
                            "Cuantía de la contratación",
                            "Expediente de contratación",
                            "Tipos de evaluadores: Oficial de compra, Comité y Jurado",
                            "Perfil del experto",
                            "Impedimentos",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO VI: FASE DE SELECCIÓN",
                subModules: [
                    {
                        title: "8. Fase de selección (I)",
                        topics: [
                            "Procedimientos de selección",
                            "Etapas y plazos",
                            "Convocatoria y requisitos",
                            "Publicidad",
                            "Registro de participantes",
                            "Tipos de registro: Lista abierta, abierta con invitación y cerrada",
                        ],
                    },
                    {
                        title: "9. Fase de selección (II)",
                        topics: [
                            "Cuestionamiento a las bases",
                            "Evaluación de ofertas",
                            "Tipos de evaluación",
                            "Evaluación sin precalificación",
                            "Admisión",
                            "Requisitos de calificación",
                            "Evaluación técnica y económica",
                            "Subsanación",
                            "Otorgamiento de la buena pro",
                            "Publicación",
                            "Consentimiento",
                            "Declaración de desierto",
                            "Cancelación del procedimiento",
                        ],
                    },
                    {
                        title: "10. Fase de selección (III)",
                        topics: [
                            "Procedimientos competitivos",
                            "Licitación pública",
                            "Concurso público",
                            "Modalidades mixtas",
                            "Subasta inversa electrónica",
                            "Comparación de precios",
                            "Compra pública de innovación",
                            "Procedimientos no competitivos",
                            "Condiciones para contratar directamente",
                            "Actuaciones preparatorias",
                            "Aprobación",
                            "Ejecución contractual",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO VII: EJECUCIÓN CONTRACTUAL",
                subModules: [
                    {
                        title: "11. Ejecución contractual",
                        topics: [
                            "El contrato",
                            "Obligación de contratar",
                            "Perfeccionamiento del contrato",
                            "Contratos estandarizados",
                            "Cláusulas obligatorias y garantías",
                            "Prestaciones adicionales",
                            "Adelantos",
                            "Incumplimiento contractual",
                            "Penalidades",
                            "Nulidad de actos procedimentales y del contrato",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO VIII: SOLUCIÓN DE CONTROVERSIAS EN LA CONTRATACIÓN PÚBLICA",
                subModules: [
                    {
                        title: "12. Controversias previas al perfeccionamiento del contrato",
                        topics: [
                            "Recurso de apelación",
                            "Trámite del recurso",
                            "Plazos del recurso",
                            "Garantías",
                            "Órganos competentes",
                            "Efectos del recurso",
                        ],
                    },
                    {
                        title: "13. Controversias desde el perfeccionamiento del contrato",
                        topics: [
                            "Mecanismos de solución de controversias",
                            "Junta de Prevención y Resolución de Disputas (JPRD)",
                            "Arbitraje",
                            "Centros acreditados por el OECE",
                            "Nulidad por incumplimiento",
                            "Materias arbitrables",
                            "Requisitos para resolver controversias",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO IX: TALLER PRÁCTICO",
                subModules: [
                    {
                        title: "14. Casos prácticos (I)",
                        topics: [
                            "Impedimentos para contratar con el Estado",
                            "Evaluación de ofertas en obras",
                        ],
                    },
                    {
                        title: "15. Casos prácticos (II)",
                        topics: [
                            "Redacción de recurso de apelación",
                            "Caso ante el Tribunal de Contrataciones Públicas (TCP)",
                        ],
                    },
                ],
            },
        ],
        instructors: [
            {
                name: "Erick Mendoza Merino",
                title: "Miembro de la Cuarta Sala del Tribunal del OECE",
                bio: "Abogado por la Universidad Nacional Mayor de San Marcos, con más de 15 años de experiencia en contrataciones con el Estado. Actualmente, forma parte de la Cuarta Sala del Tribunal del Organismo Especializado para las Contrataciones Públicas Eficientes (OECE).",
                image: erickMendoza,
                degrees: [
                    "Abogado por la Universidad Nacional Mayor de San Marcos",
                ],
                masterDoctorate: [
                    "Máster en Contrataciones Públicas",
                    "Maestría en Gestión Pública",
                ],
                books: [],
                articles: [],
                universityTeaching: [],
                teachingExperience: [],
                professionalExperience: [
                    "Miembro de la Cuarta Sala del Tribunal del OECE",
                    "Consultor legal en contratación pública",
                    "Más de 15 años de experiencia en contrataciones con el Estado",
                ],
                awards: [],
            },
            {
                name: "Steven Flores Olivera",
                title: "Presidente de la Segunda Sala del Tribunal del OECE",
                bio: "Abogado por la Universidad Nacional Mayor de San Marcos, con más de 15 años de experiencia. Actualmente, es presidente de la Segunda Sala del Tribunal del Organismo Especializado para las Contrataciones Públicas Eficientes (OECE).",
                image: stevenFlores,
                degrees: [
                    "Abogado por la Universidad Nacional Mayor de San Marcos",
                ],
                masterDoctorate: [
                    "Maestría en Gestión de Políticas Públicas",
                    "Estudios de especialización en Contrataciones del Estado",
                ],
                books: [],
                articles: [],
                universityTeaching: [],
                teachingExperience: [],
                professionalExperience: [
                    "Presidente de la Segunda Sala del Tribunal del OECE",
                    "Más de 15 años de experiencia en contrataciones públicas",
                    "Especialista en Contrataciones del Estado",
                ],
                awards: [],
            },
            {
                name: "Jimmy Pisfil",
                title: "Árbitro y Especialista en Arbitraje",
                bio: "Abogado y especialista con más de 18 años de trayectoria profesional. Ha ocupado cargos estratégicos en entidades destacadas y cuenta con amplia experiencia en arbitraje nacional e internacional, participando en más de 600 arbitrajes como presidente de tribunal arbitral, árbitro único e integrante de tribunales arbitrales. Actualmente es árbitro del Registro Nacional de Árbitros (RNA), consultor especializado y docente.",
                image: jimmyPisfil,
                degrees: ["Abogado"],
                masterDoctorate: [],
                books: [],
                articles: [],
                universityTeaching: ["Docente"],
                teachingExperience: [
                    "Experiencia en docencia en arbitraje y derecho",
                ],
                professionalExperience: [
                    "Árbitro del Registro Nacional de Árbitros (RNA)",
                    "Más de 600 arbitrajes como presidente, árbitro único e integrante de tribunales",
                    "Experiencia en arbitraje nacional e internacional",
                    "Consultor especializado en arbitraje y derecho administrativo",
                    "Más de 18 años de trayectoria profesional",
                ],
                awards: [],
            },
            {
                name: "Luis Villavicencio Benites",
                title: "Especialista en Contratación Pública",
                bio: "Abogado por la Pontificia Universidad Católica del Perú, con Máster en Contratación Pública por la Universidad de Castilla-La Mancha y Máster en Derecho Administrativo por la misma casa de estudios. Cuenta con una sólida trayectoria profesional en el ámbito de las contrataciones del Estado.",
                image: luisVillavicencio,
                degrees: [
                    "Abogado por la Pontificia Universidad Católica del Perú",
                ],
                masterDoctorate: [
                    "Máster en Contratación Pública por la Universidad de Castilla-La Mancha",
                    "Máster en Derecho Administrativo por la Universidad de Castilla-La Mancha",
                ],
                books: [],
                articles: [],
                universityTeaching: ["Docente universitario"],
                teachingExperience: [
                    "Docente universitario en contrataciones del Estado",
                ],
                professionalExperience: [
                    "Sólida trayectoria profesional en contrataciones del Estado",
                    "Árbitro en contratación pública",
                    "Adjudicador en juntas de resolución de disputas",
                ],
                awards: [],
            },
        ],
        startDate: "19-02-2026",
        featured: true,
    },
    {
        id: "diplomado-jprd-ii",
        title: "II Diplomado de Especialización en Junta de Prevención y Resolución de Disputas",
        shortDescription:
            "Mecanismo especializado para intervenir de manera preventiva y decisoria en controversias de contratos públicos de obras.",
        fullDescription:
            "La Junta de Prevención y Resolución de Disputas constituye un mecanismo especializado para intervenir de manera preventiva y decisoria en las controversias que se presentan durante la ejecución de contratos públicos de obras. En el marco de la Ley N° 32069 y su Reglamento, este programa desarrolla de forma integral el régimen normativo, el proceso de diseño e instalación, el funcionamiento operativo de la JPRD y el ejercicio del rol técnico y ético del adjudicador. Su enfoque aplicado permite trasladar criterios jurídicos y técnicos a escenarios reales de ejecución contractual, contribuyendo a una gestión continua, transparente y orientada a evitar retrasos, sobrecostos y paralizaciones de obras públicas.",
        type: "diplomado",
        modality: "virtual",
        duration: "02/03/26 - 19/05/26",
        price: 4200,
        certification: "Doble certificación",
        image: jprdPortada,
        frequency: "Lun - Mié - Vie",
        schedule: "07:00 p.m. - 10:00 p.m.",
        hours: "384 horas académicas",
        category: "Junta de Prevención y Resolución de Disputas",
        benefits:
            "La Junta de Prevención y Resolución de Disputas constituye un mecanismo especializado para intervenir de manera preventiva y decisoria en las controversias que se presentan durante la ejecución de contratos públicos de obras. En el marco de la Ley N° 32069 y su Reglamento, este programa desarrolla de forma integral el régimen normativo, el proceso de diseño e instalación, el funcionamiento operativo de la JPRD y el ejercicio del rol técnico y ético del adjudicador. Su enfoque aplicado permite trasladar criterios jurídicos y técnicos a escenarios reales de ejecución contractual, contribuyendo a una gestión continua, transparente y orientada a evitar retrasos, sobrecostos y paralizaciones de obras públicas.",
        videoUrl:
            "https://www.youtube.com/embed/HJTIYfzgnw4?si=r5TunfUXjqSkTr7B",
        videoThumbnail: jprdPortada,
        certificationImage: jprdCertificate,
        institutionLogos: [cearLogo],
        enrollmentDeadline: "27-02-2026",
        brochure:
            "https://cearlatinoamericano.edu.pe/sisdocs/brochures/BROCHURE%20JPRD.pdf",
        syllabus: [
            {
                module: "MÓDULO I: MARCO CONCEPTUAL DE LA JPRD",
                subModules: [
                    {
                        title: "1. Historia y evolución de la JPRD",
                        topics: [
                            "Introducción y orígenes de la JPRD",
                            "Contexto inicial y primeros usos",
                            "Evolución de la JPRD",
                            "Incorporación en estándares y contratos",
                            "La JPRD en el Perú",
                            "Desarrollo e incorporación normativa",
                            "Impacto en la legislación peruana",
                            "Casos emblemáticos",
                        ],
                    },
                    {
                        title: "2. Tipos de JPRD",
                        topics: ["JPRD decisoria", "JPRD consultiva"],
                    },
                    {
                        title: "3. Modalidades de la JPRD",
                        topics: ["JPRD ad hoc", "JPRD permanente"],
                    },
                ],
            },
            {
                module: "MÓDULO II: MARCO NORMATIVO DE LA JPRD",
                subModules: [
                    {
                        title: "4. Marco normativo y regulación de la JPRD",
                        topics: [
                            "Ley General de Contrataciones Públicas",
                            "Reglamento de la Ley General de Contrataciones Públicas",
                            "Directiva N° 002-2025-OECE-CD",
                        ],
                    },
                    {
                        title: "5. Análisis comparado de la JPRD",
                        topics: [
                            "Dispute Boards en el ámbito internacional",
                            "Dispute Boards en Latinoamérica",
                            "La JPRD en el Perú",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO III: CONSTITUCIÓN Y COMPOSICIÓN DE LA JPRD",
                subModules: [
                    {
                        title: "6. Composición de la JPRD",
                        topics: [
                            "Criterios de elegibilidad y selección",
                            "Requisitos profesionales y experiencia",
                            "Imparcialidad e independencia",
                            "Diversidad y competencia técnica",
                            "Estructura organizativa",
                            "Número de miembros",
                            "Roles (Presidente, Miembros, Secretario Técnico)",
                            "Ventajas y desventajas de cada estructura",
                            "Aspectos contractuales",
                            "Contratos y términos de servicio",
                            "Duración del mandato y compensaciones",
                            "Confidencialidad y ética profesional",
                        ],
                    },
                    {
                        title: "7. Roles y responsabilidades de los miembros",
                        topics: [
                            "Funciones principales",
                            "Análisis y evaluación de disputas",
                            "Redacción de informes y decisiones",
                            "Supervisión del cumplimiento",
                            "Colaboración y comunicación interna",
                            "Estrategias de trabajo colaborativo",
                            "Importancia de la comunicación",
                            "Herramientas tecnológicas",
                            "Capacitación y desarrollo profesional",
                            "Formación continua",
                            "Evaluación del desempeño",
                        ],
                    },
                    {
                        title: "8. Designación y reemplazo de miembros",
                        topics: [
                            "Proceso de nombramiento",
                            "Nominación y selección",
                            "Participación de las partes",
                            "Aceptación de miembros",
                            "Reemplazo de miembros",
                            "Causales de reemplazo",
                            "Procedimiento de sustitución",
                            "Transición de funciones",
                            "Gestión de conflictos internos",
                            "Resolución y mediación interna",
                        ],
                    },
                    {
                        title: "9. Funcionamiento de la JPRD",
                        topics: [
                            "Procedimientos operativos",
                            "Convocatoria y sesiones",
                            "Registro y actas",
                            "Toma de decisiones y votación",
                            "Herramientas y tecnología",
                            "Plataformas digitales",
                            "Gestión documental",
                            "Evaluación del desempeño de la JPRD",
                        ],
                    },
                    {
                        title: "10. Ética y transparencia en la JPRD",
                        topics: [
                            "Código de ética (CEAR LATINOAMERICANO)",
                            "Conflictos de intereses",
                            "Transparencia en las actuaciones",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO IV: PROCEDIMIENTOS DE LA JPRD",
                subModules: [
                    {
                        title: "11. Inicio de actividades de la JPRD",
                        topics: [
                            "Solicitud de intervención",
                            "Formalización de la disputa",
                            "Plazos y alcance",
                            "Conformación del expediente",
                            "Documentación requerida",
                            "Resumen del conflicto",
                            "Secretario técnico",
                            "Notificación y preparación",
                            "Comunicación a las partes",
                            "Programación de reuniones",
                        ],
                    },
                    {
                        title: "12. Audiencias y reuniones",
                        topics: [
                            "Tipos de reuniones",
                            "Procedimiento en audiencias",
                            "Agendas y actas",
                            "Participación de expertos y testigos",
                            "Presentación de pruebas y argumentos",
                            "Técnicas de moderación y control",
                        ],
                    },
                    {
                        title: "13. Técnicas de negociación",
                        topics: [
                            "Negociación colaborativa",
                            "Negociación competitiva",
                            "Estrategias y tácticas",
                        ],
                    },
                    {
                        title: "14. Métodos y herramientas de resolución de disputas",
                        topics: [
                            "Facilitación y mediación",
                            "Decisiones recomendatorias",
                            "Decisiones vinculantes",
                            "Elaboración y formalización de acuerdos",
                        ],
                    },
                    {
                        title: "15. Derechos y obligaciones de las partes",
                        topics: [
                            "Derechos fundamentales",
                            "Obligaciones contractuales y procedimentales",
                        ],
                    },
                    {
                        title: "16. Elaboración de informes y decisiones",
                        topics: [
                            "Estructura de informes",
                            "Hechos y antecedentes",
                            "Argumentos de las partes",
                            "Evaluación preliminar",
                            "Redacción de decisiones",
                            "Estructura estándar",
                            "Argumentación jurídica y técnica",
                            "Informe final",
                            "Conclusiones",
                            "Cronología",
                            "Anexos",
                            "Comunicación y notificación",
                        ],
                    },
                    {
                        title: "17. Manejo de evidencias",
                        topics: [
                            "Recolección y presentación",
                            "Testigos y expertos",
                            "Evaluación probatoria",
                        ],
                    },
                    {
                        title: "18. Seguimiento y cumplimiento de decisiones",
                        topics: [
                            "Supervisión del cumplimiento",
                            "Informes de seguimiento",
                            "Medidas correctivas",
                            "Resolución de conflictos derivados",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO V: ASPECTOS TÉCNICOS Y FINANCIEROS DE LA JPRD",
                subModules: [
                    {
                        title: "19. Evaluación técnica de conflictos",
                        topics: [
                            "Cronograma y plazos",
                            "Problemas técnicos y de calidad",
                            "Cambios de alcance",
                        ],
                    },
                    {
                        title: "20. Evaluación financiera de conflictos",
                        topics: [
                            "Daños y perjuicios",
                            "Costos adicionales",
                            "Variaciones y cambios contractuales",
                        ],
                    },
                    {
                        title: "21. Honorarios y acuerdos de pago",
                        topics: [
                            "Modelos de honorarios",
                            "Factores determinantes",
                            "Comparación con otros mecanismos",
                            "Condiciones y gestión de pagos",
                        ],
                    },
                    {
                        title: "22. Impactos financieros y operativos",
                        topics: [
                            "Consecuencias financieras",
                            "Análisis costo-beneficio",
                            "Flujo de caja",
                            "Compensaciones",
                            "Impactos operativos",
                            "Evaluación de riesgos post-decisión",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO VI: TENDENCIAS ACTUALES Y FUTURAS EN LA JPRD",
                subModules: [
                    {
                        title: "23. Casuística I",
                        topics: [
                            "Selección de casos",
                            "Análisis de experiencias reales",
                            "Discusión crítica",
                        ],
                    },
                    {
                        title: "24. Casuística II",
                        topics: [
                            "Estudio comparado de casos",
                            "Análisis práctico",
                            "Reflexión técnica",
                        ],
                    },
                    {
                        title: "25. Tendencias futuras",
                        topics: [
                            "Uso de tecnología en la JPRD",
                            "JPRD virtuales",
                            "Proyección de la JPRD en el Perú",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO VII: PARTE PRÁCTICA",
                subModules: [
                    {
                        title: "26. Simulación de JPRD – Taller práctico I",
                        topics: [
                            "Asignación de roles",
                            "Redacción de consultas",
                            "Oralización de consultas",
                            "Redacción de opiniones",
                        ],
                    },
                    {
                        title: "27. Simulación de JPRD – Taller práctico II",
                        topics: [
                            "Redacción de controversias",
                            "Contestación de controversias",
                            "Audiencia de disputa",
                        ],
                    },
                    {
                        title: "28. Disputa sobre alcance – Caso práctico I",
                        topics: [
                            "Análisis de cambios de alcance",
                            "Resolución de controversias",
                        ],
                    },
                    {
                        title: "29. Disputa sobre calidad – Caso práctico II",
                        topics: [
                            "Análisis de problemas de calidad",
                            "Resolución del caso",
                        ],
                    },
                    {
                        title: "30. Disputa sobre ampliación de plazo – Caso práctico III",
                        topics: [
                            "Análisis de ampliaciones de plazo",
                            "Resolución integral del conflicto",
                        ],
                    },
                ],
            },
        ],
        instructors: [
            {
                name: "León López Avilés",
                title: "Ingeniero Civil - Consultor en Gestión Contractual",
                bio: "Ingeniero civil por la Pontificia Universidad Católica del Perú, con más de 43 años de experiencia en gestión de riesgos, dirección de proyectos, gestión contractual y solución de controversias. Está certificado como Project Management Professional (PMP) y posee un Magíster en Administración de Empresas con mención en Gestión.",
                image: leonLopez,
                degrees: [
                    "Ingeniero civil por la Pontificia Universidad Católica del Perú",
                ],
                masterDoctorate: [
                    "Magíster en Administración de Empresas con mención en Gestión",
                    "Project Management Professional (PMP)",
                ],
                books: [],
                articles: [],
                universityTeaching: [],
                teachingExperience: [],
                professionalExperience: [
                    "Consultor en gestión contractual",
                    "Más de 43 años de experiencia en gestión de riesgos y dirección de proyectos",
                    "Especialista en solución de controversias",
                ],
                awards: [],
            },
            {
                name: "Jenny Guerrero Aquino",
                title: "Ingeniera Civil - Experta en Juntas de Resolución de Disputas",
                bio: "Ingeniera civil por la Universidad Nacional de Ingeniería, con más de 39 años de experiencia en administración de contratos, programación, costos y gerencia de obras públicas y privadas. Es experta en la Ley de Contrataciones del Estado y miembro de Juntas de Resolución de Disputas. Ha sido reconocida por Leaders League como experta en apoyo en litigios en construcción e ingeniería (2020-2024).",
                image: jennyGuerrero,
                degrees: [
                    "Ingeniera civil por la Universidad Nacional de Ingeniería",
                ],
                masterDoctorate: [],
                books: [],
                articles: [],
                universityTeaching: [],
                teachingExperience: [],
                professionalExperience: [
                    "Miembro de Juntas de Resolución de Disputas",
                    "Más de 39 años de experiencia en administración de contratos y gerencia de obras",
                    "Experta en la Ley de Contrataciones del Estado",
                ],
                awards: [
                    "Reconocida por Leaders League como experta en apoyo en litigios en construcción e ingeniería (2020-2024)",
                ],
            },
            {
                name: "Rosa Rivera Robles",
                title: "Ingeniera Civil - Especialista en Gestión de Obras",
                bio: "Ingeniera civil con 34 años de experiencia en el sector construcción, con una sólida trayectoria en supervisión, gestión y ejecución de obras de ingeniería. Posee estudios de doctorado en Ingeniería Ambiental, una maestría en Gerencia de Proyectos y otra en Gestión Pública, además de especializaciones en diseño estructural, tendencias modernas en edificaciones y Lean Construction.",
                image: rosaRivera,
                degrees: ["Ingeniera civil"],
                masterDoctorate: [
                    "Estudios de doctorado en Ingeniería Ambiental",
                    "Maestría en Gerencia de Proyectos",
                    "Maestría en Gestión Pública",
                    "Especialización en diseño estructural",
                    "Especialización en tendencias modernas en edificaciones",
                    "Especialización en Lean Construction",
                ],
                books: [],
                articles: [],
                universityTeaching: [],
                teachingExperience: [],
                professionalExperience: [
                    "34 años de experiencia en el sector construcción",
                    "Sólida trayectoria en supervisión, gestión y ejecución de obras de ingeniería",
                ],
                awards: [],
            },
        ],
        startDate: "02-03-2026",
        featured: true,
    },
    {
        id: "curso-inversion-privada",
        title: "Curso de Especialización en Mecanismos de Inversión Privada: APP, OxI y G2G",
        shortDescription:
            "Domina los mecanismos de inversión privada en proyectos públicos.",
        fullDescription:
            "Los mecanismos alternativos de inversión en infraestructura pública han cobrado relevancia fundamental como instrumentos para cerrar la brecha de infraestructura en el país. Este curso especializado proporciona formación integral en las Asociaciones Público-Privadas (APP), el mecanismo de Obras por Impuestos (OxI), y los contratos Gobierno a Gobierno (G2G), analizando su marco legal, estructuración, ventajas y desventajas. Aprenderás el procedimiento completo para la promoción y adjudicación de proyectos APP, los beneficios tributarios y el proceso de inversión bajo el esquema de Obras por Impuestos, las particularidades de los contratos G2G y su régimen jurídico especial.",
        type: "curso",
        modality: "virtual",
        duration: "03/03/26 – 05/05/26",
        price: 2600,
        certification: "Doble certificación",
        image: inversionPrivadaPortada,
        frequency: "Mar - Jue",
        schedule: "07:00 p.m. - 10:00 p.m.",
        hours: "120 horas académicas",
        category: "Inversión Privada",
        benefits:
            "Los mecanismos de inversión privada como las Asociaciones Público-Privadas (APP), las Obras por Impuestos (OxI) y los Acuerdos de Gobierno a Gobierno (G2G) se han consolidado como herramientas estratégicas para el desarrollo de infraestructura pública en el Perú. Este curso de especialización ofrece una formación integral para comprender su marco normativo, lógica de estructuración, modelos de financiamiento y roles institucionales involucrados en cada esquema. El programa está orientado a que el participante adquiera criterios técnicos y jurídicos para evaluar, gestionar y supervisar proyectos de inversión privada, tomando decisiones informadas y alineadas al interés público.",
        videoUrl:
            "https://www.youtube.com/embed/eb_5Ldktv4A?si=Mljff-MELgwDCH3w",
        videoThumbnail: inversionPrivadaPortada,
        certificationImage: mipCertificate,
        institutionLogos: [cearLogo],
        enrollmentDeadline: "27-02-2026",
        brochure:
            "https://cearlatinoamericano.edu.pe/sisdocs/brochures/BROCHURE-MIP.pdf",
        syllabus: [
            {
                module: "MÓDULO I: INTRODUCCIÓN A LOS MECANISMOS DE INVERSIÓN PRIVADA",
                subModules: [
                    {
                        title: "1. Introducción a los mecanismos de inversión privada",
                        topics: [
                            "Contexto económico de los años 90: Liberalización de mercados y reforma del Estado",
                            "Inicio del régimen de promoción de la inversión privada: D.L. N° 757 y D.L. N° 674",
                            "Reconocimiento de la inversión privada en la Constitución Política de 1993",
                            "Definición y evolución normativa de la inversión privada",
                            "Transición de privatizaciones a concesiones",
                            "Modalidades actuales de participación privada: APP, OxI y G2G",
                        ],
                    },
                    {
                        title: "2. Marco normativo, institucionalidad y tendencias",
                        topics: [
                            "Creación del marco legal moderno de APP: D.L. N° 1224 y D.L. N° 1362",
                            "Adhesión del Perú a los Principios de Gobernanza Pública de las APP",
                            "Principios rectores e institucionalidad",
                            "Rol del Ministerio de Economía y Finanzas (ente rector)",
                            "Rol del ProInversión",
                            "Rol de la Dirección General de Política de Promoción de la Inversión Privada (DGPPIP)",
                            "Casos emblemáticos en sectores estratégicos",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO II: ASOCIACIONES PÚBLICO-PRIVADAS (APP)",
                subModules: [
                    {
                        title: "3. Fundamentos, definición y clasificación de las APP",
                        topics: [
                            "Marco normativo actual: Ley N° 32441",
                            "Modalidades contractuales permitidas",
                            "Clasificación de las APP por origen y financiamiento",
                            "APP por origen: Iniciativa Estatal (IE) e Iniciativa Privada (IP)",
                            "APP por financiamiento: Cofinanciadas y autofinanciadas",
                            "Proyectos típicos y proyectos emblemáticos ejecutados bajo APP",
                        ],
                    },
                    {
                        title: "4. Ciclo de vida de un proyecto APP",
                        topics: [
                            "Fases del mecanismo APP",
                            "Planeamiento y programación (IMIAPP)",
                            "Formulación, estructuración, transacción y ejecución contractual",
                            "Requisitos y plazos por fase",
                            "Medios de solución de controversias: Amigable componedor, JPRD y arbitraje",
                        ],
                    },
                    {
                        title: "5. Institucionalidad y competencias del Estado en APP",
                        topics: [
                            "Rol de ProInversión como OPIP",
                            "Función del Ministerio de Economía y Finanzas como ente rector del sistema",
                            "Competencias de las Entidades Públicas Titulares del Proyecto (EPTP)",
                            "Coordinación interinstitucional y asignación de responsabilidades",
                            "Funciones del MEF",
                            "Competencias de las Entidades Públicas Titulares del Proyecto (EPTP)",
                            "Instrumentos clave: Informe Multianual de Inversiones en Asociaciones Público-Privadas",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO III: OBRAS POR IMPUESTOS (OxI)",
                subModules: [
                    {
                        title: "6. Fundamentos, actores y base legal del OxI",
                        topics: [
                            "Concepto de OxI como modalidad de ejecución de inversión pública",
                            "Antecedentes y evolución histórica del mecanismo en el Perú",
                            "Marco normativo vigente: Ley Nº 29230, D.S. Nº 210-2022-EF y D.S. Nº 011-2024-EF",
                            "Certificados de Inversión Pública Regional y Local (CIPRL)",
                            "Certificados de Inversión Pública Gobierno Nacional (CIPGN)",
                            "Principales actores involucrados en el mecanismo",
                        ],
                    },
                    {
                        title: "7. Procedimiento operativo y ejecución de proyectos OxI",
                        topics: [
                            "Pasos operativos del mecanismo OxI",
                            "Responsabilidades de la entidad pública y privada en cada etapa",
                            "Aspectos clave de la supervisión y control",
                            "Aplicación del Invierte.pe y articulación con el Sistema Nacional de Abastecimiento",
                            "Alternativas para ejecución por Inversiones de Optimización, de Ampliación Marginal, de Rehabilitación y de Reposición (IOARR) y Operación y Mantenimiento (O&M)",
                        ],
                    },
                    {
                        title: "8. Beneficios, riesgos y controversias en OxI",
                        topics: [
                            "Beneficios para el Estado, la empresa y la sociedad",
                            "Riesgos y desafíos: Técnicos, presupuestales y reputacionales",
                            "Solución de controversias: Trato directo, conciliación y arbitraje",
                            "Proyectos típicos y proyectos emblemáticos ejecutados bajo OxI",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO IV: GOBIERNO A GOBIERNO (G2G)",
                subModules: [
                    {
                        title: "9. Fundamentos y evolución de los G2G",
                        topics: [
                            "Contexto de surgimiento y primeros usos: Juegos Panamericanos Lima 2019",
                            "Definición, características y marco legal actual de los G2G",
                            "Marco normativo aplicable: Constitución, Ley N° 30556 y otros aplicables",
                            "Principios aplicables: Comercio internacional, Derecho Internacional Público y cooperación entre Estados",
                            "Comparación entre G2G y APP: Ventajas, limitaciones y riesgos fiscales",
                            "Rol del Project Management Office (PMO)",
                        ],
                    },
                    {
                        title: "10. Estructura y gestión contractual en G2G",
                        topics: [
                            "Modalidades de implementación: Ejecución directa, vía terceros o mediante PMO",
                            "Uso de contratos estandarizados (NEC y FIDIC) en los proyectos G2G",
                            "Proceso de procura internacional: Selección de contratistas, transparencia y políticas de contratación",
                            "Cláusulas de resolución de controversias: Dispute Boards y mecanismos aplicables a cada contrato estandarizado.",
                            "Casos emblemáticos: Reconstrucción con Cambios, Aeropuerto de Chinchero, Carretera Central, Hospitales Antonio Lorena y Sergio Bernales",
                        ],
                    },
                    {
                        title: "11. Evaluación crítica y perspectivas de los G2G",
                        topics: [
                            "Ventajas prácticas: Agilidad, transferencia de conocimiento, reducción de riesgos técnicos.",
                            "Críticas recurrentes: Costo elevado, concentración de riesgos en el Estado peruano, sostenibilidad post obra.",
                            "Riesgos legales y presupuestales: ¿“Obra pública internacionalizada”?",
                            "Criterios técnicos para decidir el uso de G2G vs. APP u obra pública tradicional.",
                            "Recomendaciones de la Organización para la Cooperación y el Desarrollo Económicos (OCDE) y mejores prácticas internacionales.",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO V: COMPARACIÓN ESTRATÉGICA Y GESTIÓN DE CONTROVERSIAS",
                subModules: [
                    {
                        title: "12. Análisis comparativo APP, OxI y G2G",
                        topics: [
                            "Comparación estructural y operativa de los tres mecanismos: APP, OxI y G2G.",
                            "Principales diferencias normativas, contractuales e institucionales",
                            "Tipos de contratos aplicables (estandarizados, propios, internacionales).",
                            "Formas de solución de controversias dependiendo del mecanismo.",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO VI: TALLER PRÁCTICO",
                subModules: [
                    {
                        title: "13. Taller práctico I – Aplicación de APP",
                        topics: [
                            "Análisis de contrato y matriz de riesgos",
                            "Simulación ante JPRD",
                            "Elaboración de acta de conciliación o controversia",
                        ],
                    },
                    {
                        title: "14. Taller práctico II – Aplicación de OxI",
                        topics: [
                            "Análisis de valorizaciones y documentación",
                            "Reunión tripartita",
                            "Respuesta institucional o inicio de arbitraje",
                        ],
                    },
                    {
                        title: "15. Taller práctico III – Aplicación de G2G",
                        topics: [
                            "Gestión de cambios contractuales",
                            'Activación de "early warning"',
                            "Presentación ante Dispute Board",
                            "Evaluación técnica y contractual del caso",
                        ],
                    },
                ],
            },
        ],
        instructors: [
            {
                name: "Zulema Pacheco López",
                title: "Abogada | Magíster en Regulación de Servicios Públicos y Gestión de Infraestructura",
                bio: "Abogada y Magíster en Regulación de Servicios Públicos y Gestión de Infraestructura, con más de trece años de experiencia profesional. Especializada en planificación estratégica, control concurrente y gestión de proyectos de inversión. Ha participado en proyectos de alta complejidad del sector público.",
                image: mipZulema,
                degrees: ["Abogada"],
                masterDoctorate: [
                    "Magíster en Regulación de Servicios Públicos y Gestión de Infraestructura",
                ],
                professionalExperience: [
                    "Más de 13 años de experiencia profesional",
                    "Planificación estratégica",
                    "Control concurrente",
                    "Gestión de proyectos de inversión",
                    "Participación en proyectos de alta complejidad del sector público",
                ],
            },
            {
                name: "María Veiga Manrique",
                title: "Ingeniera Civil | Especialista en Gestión de la Construcción",
                bio: "Ingeniera civil por la Pontificia Universidad Católica del Perú, con especialidad en Gestión de la Construcción. Cuenta con experiencia en el sector público y privado en proyectos de inversión de gran envergadura. Se especializa en Obras por Impuestos y en la gestión de proyectos bajo contratos estandarizados.",
                image: mipMariaVeiga,
                degrees: [
                    "Ingeniera civil - Pontificia Universidad Católica del Perú",
                ],
                masterDoctorate: ["Especialidad en Gestión de la Construcción"],
                professionalExperience: [
                    "Experiencia en el sector público y privado en proyectos de inversión de gran envergadura",
                    "Especialización en Obras por Impuestos",
                    "Gestión de proyectos bajo contratos estandarizados",
                ],
            },
            {
                name: "Guillermo Torrejón Vásquez",
                title: "Abogado | Especialista en Derecho Administrativo y Regulatorio",
                bio: "Abogado por la Pontificia Universidad Católica del Perú, con más de quince años de experiencia en derecho administrativo y regulatorio. Se especializa en la asesoría a empresas nacionales y extranjeras en procedimientos administrativos y proyectos de infraestructura. Complementa su práctica profesional con la docencia universitaria.",
                image: mipGuillermo,
                degrees: ["Abogado - Pontificia Universidad Católica del Perú"],
                professionalExperience: [
                    "Más de 15 años de experiencia en derecho administrativo y regulatorio",
                    "Asesoría a empresas nacionales y extranjeras en procedimientos administrativos",
                    "Asesoría en proyectos de infraestructura",
                    "Docencia universitaria",
                ],
            },
            {
                name: "José León Pacheco",
                title: "Abogado | Especialista en Derecho Administrativo y Regulatorio",
                bio: "Abogado por la Pontificia Universidad Católica del Perú, con Maestría en Regulación y más de diecisiete años de experiencia profesional. Especializado en derecho administrativo y regulatorio, con énfasis en infraestructura, contratación estatal y Asociaciones Público-Privadas. Desarrolla asesoría especializada en materias regulatorias.",
                image: mipJoseLeon,
                degrees: ["Abogado - Pontificia Universidad Católica del Perú"],
                masterDoctorate: ["Maestría en Regulación"],
                professionalExperience: [
                    "Más de 17 años de experiencia profesional",
                    "Especialización en derecho administrativo y regulatorio",
                    "Énfasis en infraestructura, contratación estatal y Asociaciones Público-Privadas",
                    "Asesoría especializada en materias regulatorias",
                ],
            },
            {
                name: "Yaco Rosas Romero",
                title: "Economista | Especialista en APP e Infraestructura",
                bio: "Economista por la Universidad Nacional Mayor de San Marcos y Magíster en Administración de Empresas por la Universidad del Pacífico. Cuenta con amplia experiencia en estructuración y gestión de proyectos de infraestructura bajo Asociaciones Público-Privadas. Ha participado en procesos de promoción de la inversión privada y en la gestión de proyectos en el sector público.",
                image: mipYacoRosas,
                degrees: [
                    "Economista - Universidad Nacional Mayor de San Marcos",
                ],
                masterDoctorate: [
                    "Magíster en Administración de Empresas - Universidad del Pacífico",
                ],
                professionalExperience: [
                    "Estructuración y gestión de proyectos de infraestructura bajo Asociaciones Público-Privadas",
                    "Participación en procesos de promoción de la inversión privada",
                    "Gestión de proyectos en el sector público",
                ],
            },
        ],
        startDate: "03-03-2026",
        featured: true,
    },
    {
        id: "como-elaborar-las-bases-de-contratacion-publica",
        title: "¿Como elaborar las bases de contratación pública?",
        shortDescription:
            "En este taller especializado, el participante aprenderá a descifrar la naturaleza de las bases y su correcta redacción de forma clara, completa y coherente al requerimiento del proceso.",
        fullDescription:
            "La presentación explica que la oferta es el acto central del procedimiento de contratación pública, ya que expresa la voluntad del postor de contratar con el Estado y asumir obligaciones técnicas, económicas y legales conforme a las bases del proceso. Su correcta presentación y evaluación, regulada por los artículos 68 al 79 del Reglamento de la Ley N.° 32069, es clave para asegurar la validez del procedimiento, elegir adecuadamente al postor ganador y evitar controversias durante la ejecución del contrato.\n\nEl taller especializado tiene como objetivo analizar las principales características de la oferta, abarcando la integración de bases, admisión, contenido, tipos y requisitos de calificación, así como la evaluación técnica y económica y los mecanismos de subsanación. El enfoque combina análisis normativo y casos prácticos, con la finalidad de brindar un aprendizaje completo y aplicado.",
        type: "taller",
        modality: "virtual",
        duration: "21/02/26",
        price: 200,
        certification: "Certificado por UNHEVAL",
        image: taller1,
        frequency: "Mar - Jue",
        schedule: "09:00 a.m. - 04:00 p.m.",
        hours: "10 horas académicas",
        category: "Contratación Pública",
        benefits:
            "La presentación explica que la oferta es el acto central del procedimiento de contratación pública, ya que expresa la voluntad del postor de contratar con el Estado y asumir obligaciones técnicas, económicas y legales conforme a las bases del proceso. Su correcta presentación y evaluación, regulada por los artículos 68 al 79 del Reglamento de la Ley N.° 32069, es clave para asegurar la validez del procedimiento, elegir adecuadamente al postor ganador y evitar controversias durante la ejecución del contrato.\n\nEl taller especializado tiene como objetivo analizar las principales características de la oferta, abarcando la integración de bases, admisión, contenido, tipos y requisitos de calificación, así como la evaluación técnica y económica y los mecanismos de subsanación. El enfoque combina análisis normativo y casos prácticos, con la finalidad de brindar un aprendizaje completo y aplicado.",
        // videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        videoThumbnail: contratacionPublicaPortada,
        certificationImage: certificadoTaller,
        institutionLogos: [cearLogo],
        enrollmentDeadline: "27-02-2026",
        brochure:
            "https://cearlatinoamericano.edu.pe/sisdocs/brochures/TALLER_CP.pdf",
        syllabus: [
            {
                module: "MÓDULO I. Presentación de ofertas y reglas de admisión (arts. 68 y 69)",
                topics: [
                    "Forma, oportunidad y condiciones para la presentación de ofertas",
                    "Contenido mínimo de la oferta técnica y económica",
                    "Principio de igualdad de trato y prohibición de exigencias no previstas en bases",
                    "Supuestos de no admisión de ofertas",
                    "Responsabilidad de la DEC o del órgano evaluador",
                ],
            },
            {
                module: "MÓDULO II. Verificación de requisitos y subsanación de ofertas (arts. 70 y 71)",
                topics: [
                    "Diferencia entre defectos formales y sustanciales en la presentación de la oferta",
                    "Supuestos permitidos para la subsanación de la oferta",
                    "Plazos y procedimiento de subsanación",
                    "Límites legales a la subsanación de ofertas",
                    "Riesgos frecuentes por indebida admisión o exclusión",
                ],
            },
            {
                module: "MÓDULO III. Evaluación técnica de las ofertas (arts. 72 al 74)",
                topics: [
                    "Aplicación de los factores técnicos previstos en las bases",
                    "Evaluación de experiencia, metodología, personal clave y equipamiento",
                    "Prohibición de criterios subjetivos o discrecionales",
                    "Uso correcto de matrices y cuadros comparativos",
                    "Casos de evaluación incorrecta y sus consecuencias jurídicas",
                ],
            },
            {
                module: "MÓDULO IV. Evaluación económica y razonabilidad de la oferta (arts. 75 al 77)",
                topics: [
                    "Análisis de precios ofertados y consistencia económica",
                    "Comparación con el valor estimado o referencial",
                    "Identificación de ofertas no razonables o inviables",
                    "Reglas para la evaluación económica objetiva",
                    "Integración del puntaje técnico y económico",
                ],
            },
            {
                module: "MÓDULO V. Calificación final, orden de prelación y otorgamiento de la buena pro (arts. 78 y 79)",
                topics: [
                    "Determinación del orden de prelación",
                    "Criterio de desempate",
                    "Elaboración del acta y del informe de evaluación",
                    "Motivación técnica y legal de la buena pro",
                    "Riesgo de nulidad y control posterior del procedimiento",
                ],
            },
        ],
        instructors: [
            {
                name: "Ignacio Hugo Vallejos Campbell",
                title: "Consultor en Gestión Pública",
                bio: "Licenciado en Administración, con más de 20 años de experiencia en gestión pública, logística, contratación estatal, planeamiento estratégico, presupuesto, entre otros temas. Ha ocupado cargos directivos en entidades como el Ministerio de Justicia y Derechos Humanos, el Ministerio de Transportes y Comunicaciones, el Ministerio de Cultura y el OECE. Actualmente se desempeña como consultor, capacitador y docente en temas de gestión pública y contrataciones del Estado.",
                image: hugoVallejos,
                degrees: ["Licenciado en Administración"],
                masterDoctorate: [
                    "Magíster en Regulación de Servicios Públicos y Gestión de Infraestructura",
                ],
                professionalExperience: [
                    "Más de 13 años de experiencia profesional",
                    "Planificación estratégica",
                    "Control concurrente",
                    "Gestión de proyectos de inversión",
                    "Participación en proyectos de alta complejidad del sector público",
                ],
            },
        ],
        startDate: "21-02-26",
        featured: true,
    },
    {
        id: "presentacion-y-evaluacion-de-ofertas-contratacion-publica",
        title: "Presentación y evaluación de ofertas en la contratación pública",
        shortDescription:
          "Taller especializado orientado a fortalecer las capacidades técnicas para la correcta presentación, admisión y evaluación de ofertas en los procesos de contratación pública, conforme a la Ley N.° 32069 y su Reglamento.",
        fullDescription:
          "Durante el procedimiento de contratación pública, la oferta constituye el eje central de la fase de selección, al expresar la voluntad del postor de contratar con el Estado y someterse a las bases del proceso, asumiendo obligaciones técnicas, económicas y legales. Su adecuada presentación y evaluación, conforme a los artículos 68 al 79 del Reglamento de la Ley N.° 32069, resulta esencial para la validez del procedimiento, la correcta selección del adjudicatario y la prevención de controversias durante la ejecución contractual.\n\nEl taller especializado tiene como finalidad identificar y analizar los aspectos esenciales vinculados a la presentación y evaluación de la oferta, desde la integración de bases y la admisión, hasta su contenido, tipos, requisitos de calificación, evaluación técnica y económica, así como los mecanismos de subsanación. El enfoque combina análisis normativo y estudio de casos reales, garantizando un aprendizaje integral y aplicado.",
        type: "taller",
        modality: "virtual",
        platform: "Google Meet",
        startDate: "28-02-2026",
        schedule: "09:00 a.m. - 04:00 p.m.",
        duration: "28/02/2026",
        hours: "10 horas académicas",
        sessions: 1,
        brochure:
            "https://cearlatinoamericano.edu.pe/sisdocs/brochures/BROCHURE_EVALUACION_TALLER.pdf",
        price: 200,
        frequency: "Sesión única",
        image: taller4,
        certificationImage: certificadoTaller4,
        category: "Contratación Pública",
        certification: {
          issuedBy: "CEAR LATINOAMERICANO",
          partnerInstitution: "UNHEVAL",
          requirements: [
            "Registro correcto en la ficha de inscripción",
            "Asistencia a la sesión del taller",
            "No mantener obligaciones administrativas o económicas pendientes con la institución"
          ]
        },
        benefits: [
          "Aplicación correcta de las reglas de presentación, admisión y evaluación de ofertas",
          "Análisis técnico y económico objetivo de las ofertas",
          "Reducción de riesgos de observaciones y nulidades",
          "Sustento adecuado del otorgamiento de la buena pro",
          "Fortalecimiento de la seguridad jurídica en la contratación pública"
        ],
        syllabus: [
          {
            module: "MÓDULO I. Presentación de ofertas y reglas de admisión (arts. 68 y 69)",
            topics: [
              "Forma, oportunidad y condiciones para la presentación de ofertas",
              "Contenido mínimo de la oferta técnica y económica",
              "Principio de igualdad de trato y prohibición de exigencias no previstas en bases",
              "Supuestos de no admisión de ofertas",
              "Responsabilidad de la DEC o del órgano evaluador"
            ]
          },
          {
            module: "MÓDULO II. Verificación de requisitos y subsanación de ofertas (arts. 70 y 71)",
            topics: [
              "Diferencia entre defectos formales y sustanciales",
              "Supuestos permitidos para la subsanación",
              "Plazos y procedimiento de subsanación",
              "Límites legales a la subsanación de ofertas",
              "Riesgos frecuentes por indebida admisión o exclusión"
            ]
          },
          {
            module: "MÓDULO III. Evaluación técnica de las ofertas (arts. 72 al 74)",
            topics: [
              "Aplicación de los factores técnicos previstos en las bases",
              "Evaluación de experiencia, metodología, personal clave y equipamiento",
              "Prohibición de criterios subjetivos o discrecionales",
              "Uso correcto de matrices y cuadros comparativos",
              "Casos de evaluación incorrecta y consecuencias jurídicas"
            ]
          },
          {
            module: "MÓDULO IV. Evaluación económica y razonabilidad de la oferta (arts. 75 al 77)",
            topics: [
              "Análisis de precios ofertados y consistencia económica",
              "Comparación con el valor estimado o referencial",
              "Identificación de ofertas no razonables o inviables",
              "Reglas para la evaluación económica objetiva",
              "Integración del puntaje técnico y económico"
            ]
          },
          {
            module: "MÓDULO V. Calificación final, orden de prelación y otorgamiento de la buena pro (arts. 78 y 79)",
            topics: [
              "Determinación del orden de prelación",
              "Criterios de desempate",
              "Elaboración del acta y del informe de evaluación",
              "Motivación técnica y legal de la buena pro",
              "Riesgos de nulidad y control posterior del procedimiento"
            ]
          }
        ],
        instructors: [
          {
            name: "Ignacio Hugo Vallejos Campbell",
            title: "Consultor en Gestión Pública",
            bio:
              "Licenciado en Administración, con más de 20 años de experiencia en gestión pública, logística, contratación estatal, planeamiento estratégico y presupuesto. Ha ocupado cargos directivos en el Ministerio de Justicia y Derechos Humanos, el Ministerio de Transportes y Comunicaciones, el Ministerio de Cultura y el OECE. Actualmente se desempeña como consultor, capacitador y docente en temas de gestión pública y contrataciones del Estado.",
            image: hugoVallejos,
            degrees: ["Licenciado en Administración"],
            professionalExperience: [
              "Gestión pública",
              "Contratación estatal",
              "Planeamiento estratégico",
              "Evaluación de ofertas",
              "Capacitación y docencia especializada"
            ]
          }
        ],
        materials: [
          "Opinión Nº D000049-2025-OECE-DTN",
          "Opinión Nº D000014-2025-OECE-DTN"
        ],
        featured: true
    },  
    {
        id: "diplomado-derecho-administrativo-ii",
        title: "II Diplomado de Especialización en Derecho Administrativo para Árbitros",
        shortDescription:
            "Profundiza en la aplicación del Derecho Administrativo en procesos arbitrales.",
        fullDescription:
            "El Derecho Administrativo constituye la columna vertebral de toda controversia en la que participa el Estado como parte contractual. Este diplomado especializado proporciona a los árbitros y profesionales del derecho los fundamentos sólidos necesarios para comprender y aplicar correctamente los principios, normas y procedimientos del Derecho Administrativo en el contexto del arbitraje. Aprenderás a analizar la validez y eficacia de los actos administrativos, dominar el procedimiento administrativo general y especial, identificar las potestades y limitaciones de la administración pública, y aplicar los principios de legalidad, debido procedimiento y tutela jurisdiccional efectiva. El programa incluye el estudio exhaustivo de la jurisprudencia constitucional y contencioso-administrativa relevante, análisis de casos emblemáticos de responsabilidad del Estado, y talleres prácticos de redacción de resoluciones administrativas y laudos arbitrales.",
        type: "diplomado",
        modality: "virtual",
        duration: "02/02/26 - 21/04/26",
        price: 4200,
        certification: "Doble certificación",
        image: derechoAdministrativoPortada,
        frequency: "Lun - Mié - Vie",
        schedule: "07:00 p.m. - 10:00 p.m.",
        hours: "384 horas académicas",
        category: "Derecho Administrativo",
        benefits:
            "El ejercicio arbitral en contratación pública exige un dominio riguroso del Derecho Administrativo, en particular para evaluar la validez de los actos y resolver controversias con sustento técnico y jurídico. Este diplomado ofrece una formación especializada orientada al análisis del acto administrativo, los procedimientos sancionadores y contenciosos, y su incidencia directa en el arbitraje. El programa está diseñado para que el participante desarrolle criterio jurídico aplicado, capaz de sustentar decisiones arbitrales, reducir riesgos de nulidad y actuar con solvencia como Árbitro Único o Presidente de Tribunal Arbitral.",
        videoUrl:
            "https://www.youtube.com/embed/d3DwVwS72uM?si=HCu1Du9F-PilKb_A",
        videoThumbnail: derechoAdministrativoPortada,
        certificationImage: dapaCertificate,
        institutionLogos: [cearLogo],
        enrollmentDeadline: "30-01-2026",
        brochure:
            "https://cearlatinoamericano.edu.pe/sisdocs/brochures/BROCHURE-DAA.pdf",
        syllabus: [
            {
                module: "MÓDULO I: FUNDAMENTOS DEL DERECHO ADMINISTRATIVO",
                subModules: [
                    {
                        title: "1. Concepto, objeto y función del Derecho Administrativo",
                        topics: [
                            "Concepto y orígenes del Derecho Administrativo",
                            "Teoría general del Estado y Poder Constitucional",
                            "Definición del Derecho Administrativo y su autonomía",
                            "Relación con otras ramas del Derecho",
                            "Función organizadora, reguladora y controladora del poder público",
                            "Rol en la solución de controversias contractuales con el Estado",
                        ],
                    },
                    {
                        title: "2. Principios constitucionales y fuentes del Derecho Administrativo",
                        topics: [
                            "Principios rectores del Derecho Administrativo",
                            "Jerarquía normativa",
                            "Fuentes del procedimiento administrativo",
                            "Precedentes administrativos: obligatoriedad e interpretación",
                            "Función de las disposiciones generales",
                        ],
                    },
                    {
                        title: "3. El poder público, la legalidad y el rol de la Administración Pública",
                        topics: [
                            "Potestades administrativas, límites y control",
                            "Principio de legalidad",
                            "Clasificación de entidades y órganos administrativos",
                            "Actuación administrativa y razonamiento arbitral",
                            "Control de la arbitrariedad y conceptos jurídicos indeterminados",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO II: ACTO ADMINISTRATIVO Y SILENCIO ADMINISTRATIVO",
                subModules: [
                    {
                        title: "4. Elementos, clases y efectos del acto administrativo",
                        topics: [
                            "Definición e importancia del acto administrativo",
                            "Requisitos de validez",
                            "Clasificación del acto administrativo",
                            "Efectos jurídicos: ejecutoriedad, presunción de veracidad y ejecutividad",
                        ],
                    },
                    {
                        title: "5. Nulidad, revocación, eficacia y ejecución del acto administrativo",
                        topics: [
                            "Nulidad y anulabilidad",
                            "Revocación y límites por derechos adquiridos",
                            "Eficacia y suspensión del acto",
                            "Conservación del acto administrativo",
                            "Ejecución y responsabilidad administrativa",
                        ],
                    },
                    {
                        title: "6. El silencio administrativo",
                        topics: [
                            "Naturaleza jurídica",
                            "Silencio positivo y negativo",
                            "Efectos sobre derechos e intereses del administrado",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO III: PROCEDIMIENTO ADMINISTRATIVO GENERAL",
                subModules: [
                    {
                        title: "7. Estructura del procedimiento administrativo",
                        topics: [
                            "Fases del procedimiento (Ley N° 27444)",
                            "Derecho de petición y legitimación",
                            "Actuaciones de instrucción",
                            "Decisión administrativa y motivación",
                        ],
                    },
                    {
                        title: "8. Pruebas, plazos, notificaciones y medidas cautelares",
                        topics: [
                            "Principios probatorios",
                            "Admisibilidad y valoración de pruebas",
                            "Régimen de plazos",
                            "Notificaciones administrativas",
                            "Medidas cautelares administrativas",
                        ],
                    },
                    {
                        title: "9. Recursos administrativos",
                        topics: [
                            "Principios y finalidad",
                            "Teoría de la impugnación administrativa",
                            "Recurso de reconsideración",
                            "Recurso de apelación",
                            "Recurso de revisión",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO IV: PROCEDIMIENTOS ADMINISTRATIVOS ESPECIALES",
                subModules: [
                    {
                        title: "10. Procedimientos especiales en contratación pública",
                        topics: [
                            "Diferencias con el procedimiento común",
                            "Procedimientos vinculados a ejecución contractual",
                            "Licencias, autorizaciones y permisos",
                            "Fiscalización y control",
                            "Procedimientos trilaterales",
                            "Procedimiento concurrencial",
                            "Normativa especial y aplicación supletoria",
                        ],
                    },
                    {
                        title: "11. Análisis arbitral de actos administrativos especiales",
                        topics: [
                            "Legalidad, razonabilidad y motivación",
                            "Valor probatorio en arbitraje",
                            "Casuística (licencias, sanciones, intervenciones de entidades)",
                            "Delimitación de competencias administrativa y arbitral",
                        ],
                    },
                    {
                        title: "12. Casos prácticos sobre actividades reguladas",
                        topics: [
                            "Naturaleza jurídica de licencias y permisos",
                            "Actos administrativos en obras públicas",
                            "Controversias arbitrales en concesiones",
                            "Desarrollo de casos prácticos",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO V: DERECHO ADMINISTRATIVO SANCIONADOR (PAS)",
                subModules: [
                    {
                        title: "13. PAS por responsabilidad funcional",
                        topics: [
                            "Objeto y principios",
                            "Autonomía de la potestad sancionadora",
                            "Órganos competentes",
                            "Etapas del procedimiento sancionador",
                        ],
                    },
                    {
                        title: "14. Sanciones por responsabilidad administrativa funcional",
                        topics: [
                            "Finalidad y alcances",
                            "Principio de conducta procedimental",
                            "Graduación de sanciones",
                            "Registro Nacional de Sanciones",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO VI: RESPONSABILIDAD PATRIMONIAL DEL ESTADO",
                subModules: [
                    {
                        title: "15. Responsabilidad del Estado",
                        topics: [
                            "Fundamentos constitucionales y legales",
                            "Requisitos de la responsabilidad patrimonial",
                            "Responsabilidad por actividad lícita e ilícita",
                            "Criterios jurisprudenciales",
                        ],
                    },
                    {
                        title: "16. Daños derivados de actos administrativos",
                        topics: [
                            "Responsabilidad contractual y extracontractual",
                            "Nexo causal",
                            "Rol del árbitro",
                            "Casos prácticos",
                        ],
                    },
                    {
                        title: "17. Discrecionalidad vs. arbitrariedad",
                        topics: [
                            "Naturaleza de la discrecionalidad",
                            "Límites y control",
                            "Técnicas de control",
                            "Casuística relevante",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO VII: CONTRATACIÓN PÚBLICA Y CONTROL ADMINISTRATIVO",
                subModules: [
                    {
                        title: "18. Fases de la contratación pública",
                        topics: [
                            "Principios de la contratación pública",
                            "Actos preparatorios, fase de selección y ejecución contractual",
                            "Actos administrativos por fase",
                            "Rol del árbitro",
                        ],
                    },
                    {
                        title: "19. Control difuso en sede arbitral",
                        topics: [
                            "Fundamento constitucional",
                            "Aplicación en arbitraje",
                            "Jurisprudencia del Tribunal Constitucional",
                            "Interpretación conforme",
                        ],
                    },
                    {
                        title: "20. Control previo, simultáneo y posterior",
                        topics: [
                            "Tipos de control administrativo",
                            "Control previo",
                            "Control simultáneo",
                            "Control posterior",
                            "Incidencia en el arbitraje",
                        ],
                    },
                    {
                        title: "21. Controversias administrativas frecuentes en arbitraje",
                        topics: [
                            "Nulidad de actos administrativos",
                            "Plazos, penalidades y ampliaciones",
                            "Rol del supervisor e inspector",
                            "Casuística arbitral",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO VIII: ÉTICA EN LA FUNCIÓN PÚBLICA",
                subModules: [
                    {
                        title: "22. Principios y deberes éticos",
                        topics: [
                            "Finalidad del Código de Ética",
                            "Principios éticos del servidor público",
                            "Obligaciones y prohibiciones",
                            "Ética del árbitro frente al Estado",
                        ],
                    },
                    {
                        title: "23. Aplicación práctica del Código de Ética",
                        topics: [
                            "Conflictos de interés",
                            "Deber de abstención",
                            "Sanciones éticas",
                            "Casos prácticos",
                        ],
                    },
                ],
            },
            {
                module: "MÓDULO IX: TALLER PRÁCTICO PARA ÁRBITROS",
                subModules: [
                    {
                        title: "24. Nulidades en el proceso de selección",
                        topics: [
                            "Análisis de casos con documentación falsa",
                            "Discusión sobre la validez del acto administrativo",
                            "Resolución del caso y emisión de criterio arbitral",
                        ],
                    },
                    {
                        title: "25. Nulidades en la etapa de contratación",
                        topics: [
                            "Garantías, consorcios y condiciones esenciales",
                            "Actos inválidos posteriores a la buena pro",
                        ],
                    },
                    {
                        title: "26. Resolución de contrato y notificaciones",
                        topics: [
                            "Validez de causales",
                            "Formalidades y contradicción",
                            "Simulación de audiencia",
                        ],
                    },
                    {
                        title: "27. Permisos y licencias en obras públicas",
                        topics: [
                            "Procedimientos administrativos vinculados",
                            "Tratamiento arbitral",
                            "Resolución de casos",
                        ],
                    },
                    {
                        title: "28. Medidas cautelares administrativas",
                        topics: [
                            "Requisitos y validez",
                            "Interacción con el arbitraje",
                            "Impacto en el procedimiento",
                        ],
                    },
                    {
                        title: "29. Procedimientos trilaterales",
                        topics: [
                            "Controversias con múltiples partes",
                            "Errores procedimentales",
                            "Estrategias arbitrales",
                        ],
                    },
                    {
                        title: "30. Audiencia de controversia de fondo (caso integral)",
                        topics: [
                            "Nulidad del acto administrativo",
                            "Penalidades indebidas",
                            "Silencio administrativo positivo",
                            "Intervención de Contraloría y OECE",
                            "Audiencia simulada y deliberación",
                        ],
                    },
                ],
            },
        ],
        instructors: [
            // {
            //     name: "José Luis Mandujano Rubín",
            //     title: "Especialista en Derecho Administrativo y Regulación",
            //     bio: "Abogado con más de 15 años de trayectoria profesional y Doctor en Derecho. Ha cursado diversas maestrías internacionales y cuenta con experiencia como árbitro único, árbitro de parte y presidente en más de 70 procesos arbitrales a nivel nacional. Es miembro de reconocidas instituciones jurídicas, así como docente e investigador, con distinciones honoríficas otorgadas por diversos colegios de abogados del país.",
            //     image: Mandujano,
            //     degrees: [],
            //     masterDoctorate: [],
            //     books: [],
            //     articles: [],
            //     universityTeaching: [],
            //     teachingExperience: [],
            //     professionalExperience: [],
            //     awards: [],
            // },
            {
                name: "Erick Cuba Meneses",
                title: "Especialista en Derecho Administrativo y Regulación",
                bio: "Abogado por la Universidad Nacional Mayor de San Marcos, con maestrías en Regulación de Servicios Públicos y Gestión de Infraestructuras y en Derecho de la Empresa. Posee amplia experiencia, habiendo asesorado a empresas y entidades públicas en procedimientos administrativos, servicios públicos y solución de controversias, así como desempeñado funciones en organismos como la Contraloría, INDECOPI, OEFA y diversos ministerios.",
                image: erickCubaMeneses,
                degrees: ["Abogado - Universidad Nacional Mayor de San Marcos"],
                masterDoctorate: [
                    "Maestría en Regulación de Servicios Públicos y Gestión de Infraestructuras",
                    "Maestría en Derecho de la Empresa",
                    "Formación avanzada en Derecho Administrativo - Universidad Paris Panthéon Assas",
                ],
                books: [],
                articles: [
                    "Publicaciones especializadas en Derecho Administrativo y Regulación",
                ],
                universityTeaching: [],
                teachingExperience: [
                    "Profesor en temas de Derecho Administrativo y Regulación",
                ],
                professionalExperience: [
                    "Asociado Senior en Rubio Leguía Normand",
                    "Árbitro y adjudicador",
                    "Experiencia en Contraloría, INDECOPI, OEFA y ministerios",
                    "Asesor en contrataciones públicas y APP",
                ],
                awards: [],
            },
            {
                name: "Ernesto Mendoza Flores",
                title: "Especialista en Derecho Administrativo y Regulación",
                bio: "Abogado por la Pontificia Universidad Católica del Perú y Magíster por la Universidad de Buenos Aires. Su experiencia profesional comprende la asesoría en la contratación y ejecución de proyectos de infraestructura, el patrocinio de empresas en procedimientos sancionadores ante entidades como el OECE, OEFA, OSIPTEL y ANA, así como la consultoría en materia administrativa para distintos sectores productivos.",
                image: ernestoMendozaFlores,
                degrees: ["Abogado - Pontificia Universidad Católica del Perú"],
                masterDoctorate: ["Magíster - Universidad de Buenos Aires"],
                books: [],
                articles: [],
                universityTeaching: [],
                teachingExperience: [],
                professionalExperience: [
                    "Asociado en CMS Grau",
                    "Asesoría en contratación y ejecución de proyectos de infraestructura",
                    "Patrocinio en procedimientos sancionadores ante OECE, OEFA, OSIPTEL y ANA",
                    "Consultoría en materia administrativa",
                    "Especialista en regulación de recursos hídricos",
                ],
                awards: [],
            },
            {
                name: "Jorge Danós Ordóñez",
                title: "Especialista en Arbitraje y Resolución de Controversias",
                bio: "Abogado por la Pontificia Universidad Católica del Perú con Maestría y Doctorado en Derecho Constitucional en la Universidad Complutense de Madrid. Cuenta con más de 30 años de experiencia asesorando en materias vinculadas al derecho administrativo, regulación, procedimientos administrativos y promoción de la inversión privada, habiendo participado en la elaboración de importantes normas del ordenamiento peruano.",
                image: jorgeDanosOrdonez,
                degrees: ["Doctorado en Derecho"],
                masterDoctorate: [
                    "Maestría en Arbitraje Internacional",
                    "Maestría en Contratación Pública",
                ],
                books: [
                    "El Arbitraje en el Perú: Teoría y Práctica",
                    "Análisis del Sistema Arbitral Peruano",
                ],
                articles: [
                    "Innovaciones en Arbitraje de Contratación Pública",
                    "El Laudo Arbitral y su Ejecutoriedad",
                ],
                universityTeaching: [
                    "Pontificia Universidad Católica del Perú",
                    "Universidad de Lima",
                ],
                teachingExperience: ["Catedrático de Arbitraje"],
                professionalExperience: [
                    "Árbitro nacional e internacional",
                    "Presidente de Tribunal Arbitral",
                ],
                awards: [
                    "Reconocimiento por Contribución al Arbitraje Peruano",
                ],
            },
            {
                name: "Janeyri Boyer Carrera",
                title: "Especialista en Derecho Administrativo y Servicio Civil",
                bio: "Abogada por la Pontificia Universidad Católica del Perú y Doctora en Derecho por la Universidad de Valladolid. Se desempeña como consultora del Banco Mundial y el Centro Latinoamericano de Administración para el Desarrollo. Ha sido Presidenta Ejecutiva de la Autoridad Nacional del Servicio Civil (SERVIR) y profesora invitada en universidades nacionales y extranjeras, destacando su participación en la reforma del servicio civil.",
                image: janeyriBoyer,
                degrees: ["Abogada - Pontificia Universidad Católica del Perú"],
                masterDoctorate: [
                    "Doctora en Derecho - Universidad de Valladolid",
                ],
                books: [],
                articles: [],
                universityTeaching: [
                    "Profesora invitada en universidades nacionales y extranjeras",
                ],
                teachingExperience: [
                    "Profesora invitada en universidades nacionales y extranjeras",
                ],
                professionalExperience: [
                    "Consultora del Banco Mundial",
                    "Consultora del Centro Latinoamericano de Administración para el Desarrollo",
                    "Ex Presidenta Ejecutiva de SERVIR",
                    "Participación en la reforma del servicio civil",
                ],
                awards: [],
            },
            {
                name: "Karina Merle Alvarado León",
                title: "Especialista en Contratación Pública y Arbitraje",
                bio: "Abogada por la Universidad Nacional Federico Villarreal, con más de 20 años de trayectoria profesional. Ha brindado asesoría legal en instituciones clave y cuenta con amplia experiencia como capacitadora, expositora y docente en prestigiosas universidades, así como en diversas entidades públicas a nivel nacional. Actualmente se desempeña como consultora y árbitra.",
                image: karinaAlvarado,
                degrees: ["Abogada - Universidad Nacional Federico Villarreal"],
                masterDoctorate: [],
                books: [],
                articles: [],
                universityTeaching: ["Docente en prestigiosas universidades"],
                teachingExperience: [
                    "Capacitadora y expositora en entidades públicas a nivel nacional",
                ],
                professionalExperience: [
                    "Consultora y árbitro en contratación pública",
                    "Asesora legal en Ministerio del Interior",
                    "Asesora legal en Banco de la Nación",
                    "Asesora legal en Ministerio de Salud",
                    "Asesora legal en Instituto Peruano del Deporte",
                ],
                awards: [],
            },
            {
                name: "Marco Antonio Machado Herrera",
                title: "Especialista en Gestión Pública y Servicio Civil",
                bio: "Abogado con estudios de Maestría en Gestión del Talento Humano, especializado en procesos de tránsito al Régimen del Servicio Civil. Su trayectoria profesional incluye la enseñanza en diversas entidades públicas, labor que complementa con la gestión estratégica y operativa de proyectos, el diseño de instrumentos de planificación y monitoreo, y la implementación de herramientas vinculadas a la Administración Pública.",
                image: marcoAntonioMachadoHerrera,
                degrees: ["Abogado"],
                masterDoctorate: ["Maestría en Gestión del Talento Humano"],
                books: [],
                articles: [],
                universityTeaching: [],
                teachingExperience: [
                    "Enseñanza del Procedimiento Administrativo Disciplinario de SERVIR",
                ],
                professionalExperience: [
                    "Funcionario de la Oficina de Normalización Previsional",
                    "Consultor en Recursos Humanos",
                    "Especialista en Servicio Civil",
                    "Gestor de capacitación y desarrollo organizacional",
                ],
                awards: [],
            },
            {
                name: "Martha Warthon Castañeda",
                title: "Especialista en Derecho Administrativo",
                bio: "Abogada y Magíster en Derecho de la Empresa por la Pontificia Universidad Católica del Perú, con segunda especialidad en Derecho Administrativo. Ejerce la docencia universitaria y se desempeña en la Quinta Sala de Derecho Constitucional y Social Transitoria de la Corte Suprema de Justicia de la República, función que complementa con experiencia en análisis normativo, soporte jurisdiccional y aplicación del derecho laboral y administrativo.",
                image: marthaWarthonCastaneda,
                degrees: [],
                masterDoctorate: [],
                books: [],
                articles: [],
                universityTeaching: [],
                teachingExperience: [],
                professionalExperience: [],
                awards: [],
            },
            {
                name: "Natalia Mori Torres",
                title: "Especialista en Derecho Administrativo",
                bio: "Abogada por la Pontificia Universidad Católica del Perú y profesora de Derecho Administrativo en la Universidad del Pacífico. LL.M. en International Business Regulation, Litigation and Arbitration por la New York University School of Law, ha participado en arbitrajes comerciales y de inversión, interviniendo en controversias complejas vinculadas a proyectos de infraestructura pública.",
                image: nataliaMoriTorres,
                degrees: [],
                masterDoctorate: [],
                books: [],
                articles: [],
                universityTeaching: [],
                teachingExperience: [],
                professionalExperience: [],
                awards: [],
            },
            {
                name: "Paul Villegas",
                title: "Especialista en Derecho Administrativo",
                bio: "Abogado por la Pontificia Universidad Católica del Perú y profesor de Derecho Administrativo en la misma universidad. Máster en Economía, Regulación y Competencia en los Servicios Públicos por la Universidad de Barcelona, es autor de 33 publicaciones y cuenta con una sólida experiencia profesional en fiscalización administrativa, defensa en procedimientos administrativos y procesos judiciales.",
                image: paulVillegas,
                degrees: [],
                masterDoctorate: [],
                books: [],
                articles: [],
                universityTeaching: [],
                teachingExperience: [],
                professionalExperience: [],
                awards: [],
            },
            {
                name: "Rubén Marquéz García",
                title: "Especialista en Derecho Administrativo",
                bio: "Abogado con título de segunda especialidad en Derecho Administrativo por la Pontificia Universidad Católica del Perú y estudios culminados de Maestría en Derecho Constitucional. Ha escrito diversos artículos sobre la materia, es expositor a nivel nacional y cuenta con experiencia en procedimientos administrativos, con especial incidencia en procedimientos sancionadores y disciplinarios.",
                image: rubenMarques,
                degrees: [
                    "Abogado - Universidad Nacional de San Agustín (UNSA)",
                    "Segunda especialidad en Derecho Administrativo - Pontificia Universidad Católica del Perú (PUCP)",
                ],
                masterDoctorate: [
                    "Estudios culminados de Maestría en Derecho Constitucional - UNSA",
                ],
                books: [],
                articles: ["Diversos artículos sobre Derecho Administrativo"],
                universityTeaching: [],
                teachingExperience: ["Expositor a nivel nacional"],
                professionalExperience: [
                    "Asesor legal en Ministerio del Interior",
                    "Asesor legal en Ministerio de Cultura",
                    "Asesor legal en Municipalidad Metropolitana de Lima",
                    "Asesor legal en Municipalidad Provincial de Pisco",
                    "Asesor legal en Municipalidad de Surco",
                    "Asesor legal en Municipalidad de Ate",
                    "Asesor legal en UNAT",
                    "Asesor legal en INABIF",
                    "Asesor legal en SUTRAN",
                    "Patrocinio de procedimientos administrativos sancionadores y disciplinarios",
                ],
                awards: [],
            },
            {
                name: "Jimmy Pisfil Chafloque",
                title: "Especialista en Arbitraje y Resolución de Controversias",
                bio: "Abogado y especialista con más de 18 años de trayectoria profesional. Ha ocupado cargos estratégicos en entidades destacadas y cuenta con amplia experiencia en arbitraje nacional e internacional, participando en más de 600 arbitrajes como presidente de tribunal arbitral, árbitro único e integrante de tribunales arbitrales. Actualmente es árbitro del Registro Nacional de Árbitros (RNA), consultor especializado y docente.",
                image: jimmyPisfil,
                degrees: ["Abogado"],
                masterDoctorate: [],
                books: [],
                articles: [],
                universityTeaching: [],
                teachingExperience: [
                    "Docente en programas de formación en arbitraje",
                ],
                professionalExperience: [
                    "Árbitro del Registro Nacional de Árbitros (RNA)",
                    "Presidente de Tribunal Arbitral en más de 600 procesos",
                    "Árbitro Único",
                    "Integrante de tribunales arbitrales",
                    "Consultor especializado en arbitraje",
                ],
                awards: [],
            },
            {
                name: "Raúl Salazar Rivera",
                title: "Especialista en Arbitraje y Derecho Administrativo",
                bio: "Abogado por la Pontificia Universidad Católica del Perú, con más de 20 años de trayectoria profesional. Árbitro inscrito en el Registro Nacional de Árbitros, con experiencia como presidente, árbitro único y árbitro de parte en más de cien procesos arbitrales a nivel nacional. Autor de diversas obras jurídicas, conferencista en instituciones especializadas y docente en programas de formación y actualización profesional.",
                image: raulSalazar,
                degrees: ["Abogado - Pontificia Universidad Católica del Perú"],
                masterDoctorate: [],
                books: ["Diversas obras jurídicas"],
                articles: [],
                universityTeaching: [],
                teachingExperience: [
                    "Docente en programas de formación y actualización profesional",
                    "Conferencista en instituciones especializadas",
                ],
                professionalExperience: [
                    "Árbitro del Registro Nacional de Árbitros",
                    "Presidente de Tribunal Arbitral en más de 100 procesos",
                    "Árbitro Único",
                    "Árbitro de parte",
                    "Autor de obras jurídicas",
                ],
                awards: [],
            },
            {
                name: "José Gonzáles Cucho",
                title: "Especialista en Derecho Administrativo Regulatorio",
                bio: "Abogado por la Pontificia Universidad Católica del Perú, con formación como Magíster en Regulación de los Servicios Públicos y Magíster en Economía y Derecho de Consumo por la Universidad de Castilla-La Mancha. Se ha desempeñado en la Sala de Defensa de la Competencia del Tribunal del INDECOPI, en la Sala de Protección al Consumidor del mismo Tribunal y en la Secretaría Técnica de los Órganos Colegiados del OSIPTEL, desarrollando una sólida experiencia en derecho administrativo regulatorio.",
                image: joseGonzalesCucho,
                degrees: ["Abogado - Pontificia Universidad Católica del Perú"],
                masterDoctorate: [
                    "Magíster en Regulación de los Servicios Públicos",
                    "Magíster en Economía y Derecho de Consumo - Universidad de Castilla-La Mancha",
                ],
                books: [],
                articles: [],
                universityTeaching: [],
                teachingExperience: [],
                professionalExperience: [
                    "Sala de Defensa de la Competencia del Tribunal del INDECOPI",
                    "Sala de Protección al Consumidor del Tribunal del INDECOPI",
                    "Secretaría Técnica de los Órganos Colegiados del OSIPTEL",
                    "Especialista en derecho administrativo regulatorio",
                ],
                awards: [],
            },
        ],
        startDate: "02-02-2026",
        featured: true,
    },
];

export const testimonials = [
    {
        name: "Dra. Nadia Chihuán Reyes",
        role: "Gerente General de A&COP – Arbitraje & Construcción Pública",
        course: "III Diplomado de Especialización de Arbitraje en Contratación Pública",
        text: 'CEAR LATINOAMERICANO es un centro de arbitraje de reconocido prestigio y, además, la primera institución arbitral inscrita en el REGAJU, lo que refleja su liderazgo. Actualmente formo parte del "Programa de Formación de Árbitros", lo que me ha permitido consolidar una formación alineada con la práctica arbitral actual.',
        rating: 5,
        image: nadiaChihuan,
    },
    {
        name: "Dra. Carla Peceros Silva",
        role: "Asesora Parlamentaria en el Congreso de la República",
        course: "II Curso de Especialización en Ejecución Contractual de Obras Públicas",
        text: "Mi experiencia en la especialización fue altamente satisfactoria, ya que los contenidos fueron claros, actualizados y alineados con la normativa vigente. Los docentes demostraron amplio conocimiento y experiencia práctica, lo que se traduce en una formación que fortalece significativamente el ejercicio profesional.",
        rating: 5,
        image: carlaPeceros,
    },
    {
        name: "Dr. Jhon Malca Saavedra",
        role: "Abogado en el Seguro Social de Salud (EsSalud)",
        course: "Curso de Especialización en Contratación Pública",
        text: "La formación académica permite a los profesionales actualizar sus conocimientos y desarrollar nuevas competencias. CEAR LATINOAMERICANO ha estructurado especialidades con temas de alto impacto y debate normativo, dictadas por docentes calificados, por lo que me complace haber optado por formarme en esta institución.",
        rating: 5,
        image: jhonMalca,
    },
    {
        name: "Dra. Karina Alvarado León",
        role: "Árbitra inscrita en el Registro Nacional de Árbitros (RNA)",
        course: "Curso de Especialización en Habilidades Blandas",
        text: "La formación académica permite a los profesionales actualizar sus conocimientos y desarrollar nuevas competencias. CEAR LATINOAMERICANO ha estructurado especialidades con temas de alto impacto y debate normativo, dictadas por docentes calificados, por lo que me complace haber optado por formarme en esta institución.",
        rating: 5,
        image: karinaAlvaradoTestimonial,
    },
    {
        name: "Dr. Manuel Chacaltana McMillan",
        role: "Árbitro en materia de contratación pública",
        course: "Curso de Especialización en Contratación Pública",
        text: "El Centro de Formación Continua de CEAR LATINOAMERICANO ofrece una experiencia formativa de calidad, con docentes altamente preparados y un sólido enfoque práctico. Además, cuenta con un equipo administrativo siempre atento y dispuesto a brindar apoyo oportuno. Totalmente recomendable.",
        rating: 5,
        image: manuelChacaltana,
    },
];
