// ============================================
// ASSETS - LOGOS
// ============================================
const cearLogo = '/logos/cear-logo.png';

// ============================================
// ASSETS - CERTIFICADOS
// ============================================
const diplomadoCertificate = '/certificates/diplomado-certificate.png';

// ============================================
// ASSETS - INSTRUCTORES
// ============================================
const lawyer2 = '/images/instructors/lawyer-2.png';
const lawyer3 = '/images/instructors/lawyer-3.png';
const lawyer4 = '/images/instructors/lawyer-4.png';
const lawyer5 = '/images/instructors/lawyer-5.png';
const lawyer8 = '/images/instructors/lawyer-8.png';
const lawyer9 = '/images/instructors/lawyer-9.png';

const erickCubaMeneses = '/images/instructors/erick-cuba-meneses.png';
const ernestoMendozaFlores = '/images/instructors/ernesto-mendoza-flores.png';
const jorgeDanosOrdonez = '/images/instructors/jorge-danos-ordonez.png';
const karinaAlvarado = '/images/instructors/karina-alvarado.png';
const marcoAntonioMachadoHerrera = '/images/instructors/marco-antonio-machado-herrera.png';
const marthaWarthonCastaneda = '/images/instructors/martha-warthon-castaneda.png';
const nataliaMoriTorres = '/images/instructors/natalia-mori-torres.png';
const paulVillegas = '/images/instructors/paul-villegas.png';
const rubenMarques = '/images/instructors/ruben-marques.png';
const jhonMalca = '/images/instructors/jhon-malca.png';
const jimmyPisfil = '/images/instructors/jimmy-alt.png';
const raulSalazar = '/images/instructors/raul-alt.png';
const giancarloVignolo = '/images/instructors/lawyer-1.png'; // TODO: Reemplazar con imagen real cuando esté disponible
const janeyriBoyer = '/images/instructors/lawyer-1.png'; // TODO: Reemplazar con imagen real cuando esté disponible
const jennyGuerrero = '/images/instructors/lawyer-1.png'; // TODO: Reemplazar con imagen real cuando esté disponible
const rosaRivera = '/images/instructors/lawyer-1.png'; // TODO: Reemplazar con imagen real cuando esté disponible
const leonLopez = '/images/instructors/lucio-paredes.png';
const christianChocano = '/images/instructors/lawyer-1.png'; // TODO: Reemplazar con imagen real cuando esté disponible
const erickMendoza = '/images/instructors/lawyer-1.png'; // TODO: Reemplazar con imagen real cuando esté disponible
const luisVillavicencio = '/images/instructors/lawyer-1.png'; // TODO: Reemplazar con imagen real cuando esté disponible
const stevenFlores = '/images/instructors/lawyer-1.png'; // TODO: Reemplazar con imagen real cuando esté disponible

// ============================================
// ASSETS - TESTIMONIOS
// ============================================
const carlaPeceros = '/images/testimonials/carla-peceros.png';
const nadiaChihuan = '/images/testimonials/testimonial-woman.png'; // TODO: Reemplazar con imagen real cuando esté disponible
const karinaAlvaradoTestimonial = '/assets/karina-alvarado.jpeg';
const manuelChacaltana = '/images/testimonials/manuel-chacaltana-alt.png';

// ============================================
// ASSETS - PORTADAS DE CURSOS
// ============================================
const derechoAdministrativoPortada = '/images/courses/derecho-administrativo.jpg';
const jprdPortada = '/images/courses/portada-generic.jpg'; // TODO: Reemplazar con imagen real cuando esté disponible
const contratacionPublicaPortada = '/images/courses/contratacion-publica.jpg';
const inversionPrivadaPortada = '/images/courses/mip.jpg';

export interface Course {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  type: 'diplomado' | 'curso';
  modality: 'presencial' | 'virtual' | 'híbrido';
  duration: string;
  price: number;
  certification: string;
  image: string;
  frequency: string;
  schedule: string;
  hours: string;
  category?: string;
  benefits?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  certificationImage?: string;
  institutionLogos?: string[];
  enrollmentDeadline?: string;
  syllabus: {
    module: string;
    topics: string[];
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
}

export const courses: Course[] = [
  {
    id: 'diplomado-derecho-administrativo-ii',
    title: 'II Diplomado de Especialización en Derecho Administrativo para Árbitros',
    shortDescription: 'Profundiza en la aplicación del Derecho Administrativo en procesos arbitrales.',
    fullDescription: 'El Derecho Administrativo constituye la columna vertebral de toda controversia en la que participa el Estado como parte contractual. Este diplomado especializado proporciona a los árbitros y profesionales del derecho los fundamentos sólidos necesarios para comprender y aplicar correctamente los principios, normas y procedimientos del Derecho Administrativo en el contexto del arbitraje. Aprenderás a analizar la validez y eficacia de los actos administrativos, dominar el procedimiento administrativo general y especial, identificar las potestades y limitaciones de la administración pública, y aplicar los principios de legalidad, debido procedimiento y tutela jurisdiccional efectiva. El programa incluye el estudio exhaustivo de la jurisprudencia constitucional y contencioso-administrativa relevante, análisis de casos emblemáticos de responsabilidad del Estado, y talleres prácticos de redacción de resoluciones administrativas y laudos arbitrales.',
    type: 'diplomado',
    modality: 'virtual',
    duration: '02/02/26 - 21/04/26',
    price: 4200,
    certification: 'CEAR - UNHEVAL',
    image: derechoAdministrativoPortada,
    frequency: 'Lun - Mié - Vie',
    schedule: '07:00 p.m. - 10:00 p.m.',
    hours: '384 horas académicas',
    category: 'Derecho Administrativo',
    benefits: 'El ejercicio arbitral en contratación pública exige un dominio riguroso del Derecho Administrativo, en particular para evaluar la validez de los actos y resolver controversias con sustento técnico y jurídico. Este diplomado ofrece una formación especializada orientada al análisis del acto administrativo, los procedimientos sancionadores y contenciosos, y su incidencia directa en el arbitraje. El programa está diseñado para que el participante desarrolle criterio jurídico aplicado, capaz de sustentar decisiones arbitrales, reducir riesgos de nulidad y actuar con solvencia como Árbitro Único o Presidente de Tribunal Arbitral.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoThumbnail: derechoAdministrativoPortada,
    certificationImage: diplomadoCertificate,
    institutionLogos: [cearLogo],
    enrollmentDeadline: '2026-01-25',
    syllabus: [
      {
        module: 'Fundamentos del Derecho Administrativo',
        topics: ['Principios del Derecho Administrativo', 'Fuentes del Derecho Administrativo', 'Organización administrativa del Estado', 'Potestad administrativa y sus límites']
      },
      {
        module: 'Acto administrativo y silencio administrativo',
        topics: ['Elementos del acto administrativo', 'Validez y eficacia del acto administrativo', 'Nulidad y anulabilidad', 'Silencio administrativo positivo y negativo']
      },
      {
        module: 'Procedimiento Administrativo General',
        topics: ['Principios del procedimiento administrativo', 'Etapas del procedimiento', 'Recursos administrativos', 'Plazos y términos procedimentales']
      },
      {
        module: 'Procedimientos Administrativos Especiales',
        topics: ['Procedimientos de contratación pública', 'Procedimientos de licencias y autorizaciones', 'Procedimientos disciplinarios', 'Procedimientos de fiscalización']
      },
      {
        module: 'Derecho Administrativo Sancionador (DAS)',
        topics: ['Principios del derecho sancionador', 'Infracciones y sanciones administrativas', 'Procedimiento sancionador', 'Garantías del administrado']
      },
      {
        module: 'Responsabilidad patrimonial del Estado',
        topics: ['Fundamentos de la responsabilidad estatal', 'Responsabilidad por falta de servicio', 'Responsabilidad objetiva y subjetiva', 'Procedimiento de reclamación']
      },
      {
        module: 'Contratación pública y control administrativo',
        topics: ['Régimen de contratación estatal', 'Órganos de control', 'Sistema Nacional de Control', 'Auditorías y fiscalización administrativa']
      },
      {
        module: 'La ética en la función pública',
        topics: ['Código de ética de la función pública', 'Principios éticos del servidor público', 'Conflictos de interés', 'Transparencia y probidad']
      },
      {
        module: 'Taller Práctico para árbitros',
        topics: ['Análisis de casos arbitrales en Derecho Administrativo', 'Redacción de laudos con enfoque administrativo', 'Valoración de pruebas administrativas', 'Simulación de audiencias arbitrales']
      }
    ],
    instructors: [
      {
        name: 'Erick Cuba Meneses',
        title: 'Especialista en Derecho Administrativo y Regulación',
        bio: 'Abogado por la Universidad Nacional Mayor de San Marcos, con maestrías en Regulación de Servicios Públicos y Gestión de Infraestructuras y en Derecho de la Empresa. Posee amplia experiencia, habiendo asesorado a empresas y entidades públicas en procedimientos administrativos, servicios públicos y solución de controversias, así como desempeñado funciones en organismos como la Contraloría, INDECOPI, OEFA y diversos ministerios.',
        image: erickCubaMeneses,
        degrees: ['Abogado - Universidad Nacional Mayor de San Marcos'],
        masterDoctorate: ['Maestría en Regulación de Servicios Públicos y Gestión de Infraestructuras', 'Maestría en Derecho de la Empresa', 'Formación avanzada en Derecho Administrativo - Universidad Paris Panthéon Assas'],
        books: [],
        articles: ['Publicaciones especializadas en Derecho Administrativo y Regulación'],
        universityTeaching: [],
        teachingExperience: ['Profesor en temas de Derecho Administrativo y Regulación'],
        professionalExperience: ['Asociado Senior en Rubio Leguía Normand', 'Árbitro y adjudicador', 'Experiencia en Contraloría, INDECOPI, OEFA y ministerios', 'Asesor en contrataciones públicas y APP'],
        awards: []
      },
      {
        name: 'Ernesto Mendoza Flores',
        title: 'Especialista en Derecho Administrativo y Regulación',
        bio: 'Abogado por la Pontificia Universidad Católica del Perú y Magíster por la Universidad de Buenos Aires. Su experiencia profesional comprende la asesoría en la contratación y ejecución de proyectos de infraestructura, el patrocinio de empresas en procedimientos sancionadores ante entidades como el OECE, OEFA, OSIPTEL y ANA, así como la consultoría en materia administrativa para distintos sectores productivos.',
        image: ernestoMendozaFlores,
        degrees: ['Abogado - Pontificia Universidad Católica del Perú'],
        masterDoctorate: ['Magíster - Universidad de Buenos Aires'],
        books: [],
        articles: [],
        universityTeaching: [],
        teachingExperience: [],
        professionalExperience: ['Asociado en CMS Grau', 'Asesoría en contratación y ejecución de proyectos de infraestructura', 'Patrocinio en procedimientos sancionadores ante OECE, OEFA, OSIPTEL y ANA', 'Consultoría en materia administrativa', 'Especialista en regulación de recursos hídricos'],
        awards: []
      },
      {
        name: 'Jorge Danós Ordóñez',
        title: 'Especialista en Arbitraje y Resolución de Controversias',
        bio: 'Abogado por la Pontificia Universidad Católica del Perú con Maestría y Doctorado en Derecho Constitucional en la Universidad Complutense de Madrid. Cuenta con más de 30 años de experiencia asesorando en materias vinculadas al derecho administrativo, regulación, procedimientos administrativos y promoción de la inversión privada, habiendo participado en la elaboración de importantes normas del ordenamiento peruano.',
        image: jorgeDanosOrdonez,
        degrees: ['Doctorado en Derecho'],
        masterDoctorate: ['Maestría en Arbitraje Internacional', 'Maestría en Contratación Pública'],
        books: ['El Arbitraje en el Perú: Teoría y Práctica', 'Análisis del Sistema Arbitral Peruano'],
        articles: ['Innovaciones en Arbitraje de Contratación Pública', 'El Laudo Arbitral y su Ejecutoriedad'],
        universityTeaching: ['Pontificia Universidad Católica del Perú', 'Universidad de Lima'],
        teachingExperience: ['Catedrático de Arbitraje'],
        professionalExperience: ['Árbitro nacional e internacional', 'Presidente de Tribunal Arbitral'],
        awards: ['Reconocimiento por Contribución al Arbitraje Peruano']
      },
      {
        name: 'Janeyri Boyer Carrera',
        title: 'Especialista en Derecho Administrativo y Servicio Civil',
        bio: 'Abogada por la Pontificia Universidad Católica del Perú y Doctora en Derecho por la Universidad de Valladolid. Se desempeña como consultora del Banco Mundial y el Centro Latinoamericano de Administración para el Desarrollo. Ha sido Presidenta Ejecutiva de la Autoridad Nacional del Servicio Civil (SERVIR) y profesora invitada en universidades nacionales y extranjeras, destacando su participación en la reforma del servicio civil.',
        image: janeyriBoyer,
        degrees: ['Abogada - Pontificia Universidad Católica del Perú'],
        masterDoctorate: ['Doctora en Derecho - Universidad de Valladolid'],
        books: [],
        articles: [],
        universityTeaching: ['Profesora invitada en universidades nacionales y extranjeras'],
        teachingExperience: ['Profesora invitada en universidades nacionales y extranjeras'],
        professionalExperience: ['Consultora del Banco Mundial', 'Consultora del Centro Latinoamericano de Administración para el Desarrollo', 'Ex Presidenta Ejecutiva de SERVIR', 'Participación en la reforma del servicio civil'],
        awards: []
      },
      {
        name: 'Karina Merle Alvarado León',
        title: 'Especialista en Contratación Pública y Arbitraje',
        bio: 'Abogada por la Universidad Nacional Federico Villarreal, con más de 20 años de trayectoria profesional. Ha brindado asesoría legal en instituciones clave y cuenta con amplia experiencia como capacitadora, expositora y docente en prestigiosas universidades, así como en diversas entidades públicas a nivel nacional. Actualmente se desempeña como consultora y árbitra.',
        image: karinaAlvarado,
        degrees: ['Abogada - Universidad Nacional Federico Villarreal'],
        masterDoctorate: [],
        books: [],
        articles: [],
        universityTeaching: ['Docente en prestigiosas universidades'],
        teachingExperience: ['Capacitadora y expositora en entidades públicas a nivel nacional'],
        professionalExperience: ['Consultora y árbitro en contratación pública', 'Asesora legal en Ministerio del Interior', 'Asesora legal en Banco de la Nación', 'Asesora legal en Ministerio de Salud', 'Asesora legal en Instituto Peruano del Deporte'],
        awards: []
      },
      {
        name: 'Marco Antonio Machado Herrera',
        title: 'Especialista en Gestión Pública y Servicio Civil',
        bio: 'Abogado con estudios de Maestría en Gestión del Talento Humano, especializado en procesos de tránsito al Régimen del Servicio Civil. Su trayectoria profesional incluye la enseñanza en diversas entidades públicas, labor que complementa con la gestión estratégica y operativa de proyectos, el diseño de instrumentos de planificación y monitoreo, y la implementación de herramientas vinculadas a la Administración Pública.',
        image: marcoAntonioMachadoHerrera,
        degrees: ['Abogado'],
        masterDoctorate: ['Maestría en Gestión del Talento Humano'],
        books: [],
        articles: [],
        universityTeaching: [],
        teachingExperience: ['Enseñanza del Procedimiento Administrativo Disciplinario de SERVIR'],
        professionalExperience: ['Funcionario de la Oficina de Normalización Previsional', 'Consultor en Recursos Humanos', 'Especialista en Servicio Civil', 'Gestor de capacitación y desarrollo organizacional'],
        awards: []
      },
      {
        name: 'Martha Warthon Castañeda',
        title: 'Especialista en Derecho Administrativo',
        bio: 'Abogada y Magíster en Derecho de la Empresa por la Pontificia Universidad Católica del Perú, con segunda especialidad en Derecho Administrativo. Ejerce la docencia universitaria y se desempeña en la Quinta Sala de Derecho Constitucional y Social Transitoria de la Corte Suprema de Justicia de la República, función que complementa con experiencia en análisis normativo, soporte jurisdiccional y aplicación del derecho laboral y administrativo.',
        image: marthaWarthonCastaneda,
        degrees: [],
        masterDoctorate: [],
        books: [],
        articles: [],
        universityTeaching: [],
        teachingExperience: [],
        professionalExperience: [],
        awards: []
      },
      {
        name: 'Natalia Mori Torres',
        title: 'Especialista en Derecho Administrativo',
        bio: 'Abogada por la Pontificia Universidad Católica del Perú y profesora de Derecho Administrativo en la Universidad del Pacífico. LL.M. en International Business Regulation, Litigation and Arbitration por la New York University School of Law, ha participado en arbitrajes comerciales y de inversión, interviniendo en controversias complejas vinculadas a proyectos de infraestructura pública.',
        image: nataliaMoriTorres,
        degrees: [],
        masterDoctorate: [],
        books: [],
        articles: [],
        universityTeaching: [],
        teachingExperience: [],
        professionalExperience: [],
        awards: []
      },
      {
        name: 'Paul Villegas',
        title: 'Especialista en Derecho Administrativo',
        bio: 'Abogado por la Pontificia Universidad Católica del Perú y profesor de Derecho Administrativo en la misma universidad. Máster en Economía, Regulación y Competencia en los Servicios Públicos por la Universidad de Barcelona, es autor de 33 publicaciones y cuenta con una sólida experiencia profesional en fiscalización administrativa, defensa en procedimientos administrativos y procesos judiciales.',
        image: paulVillegas,
        degrees: [],
        masterDoctorate: [],
        books: [],
        articles: [],
        universityTeaching: [],
        teachingExperience: [],
        professionalExperience: [],
        awards: []
      },
      {
        name: 'Rubén Marquéz García',
        title: 'Especialista en Derecho Administrativo',
        bio: 'Abogado con título de segunda especialidad en Derecho Administrativo por la Pontificia Universidad Católica del Perú y estudios culminados de Maestría en Derecho Constitucional. Ha escrito diversos artículos sobre la materia, es expositor a nivel nacional y cuenta con experiencia en procedimientos administrativos, con especial incidencia en procedimientos sancionadores y disciplinarios.',
        image: rubenMarques,
        degrees: ['Abogado - Universidad Nacional de San Agustín (UNSA)', 'Segunda especialidad en Derecho Administrativo - Pontificia Universidad Católica del Perú (PUCP)'],
        masterDoctorate: ['Estudios culminados de Maestría en Derecho Constitucional - UNSA'],
        books: [],
        articles: ['Diversos artículos sobre Derecho Administrativo'],
        universityTeaching: [],
        teachingExperience: ['Expositor a nivel nacional'],
        professionalExperience: ['Asesor legal en Ministerio del Interior', 'Asesor legal en Ministerio de Cultura', 'Asesor legal en Municipalidad Metropolitana de Lima', 'Asesor legal en Municipalidad Provincial de Pisco', 'Asesor legal en Municipalidad de Surco', 'Asesor legal en Municipalidad de Ate', 'Asesor legal en UNAT', 'Asesor legal en INABIF', 'Asesor legal en SUTRAN', 'Patrocinio de procedimientos administrativos sancionadores y disciplinarios'],
        awards: []
      },
      {
        name: 'Jimmy Pisfil Chafloque',
        title: 'Especialista en Arbitraje y Resolución de Controversias',
        bio: 'Abogado y especialista con más de 18 años de trayectoria profesional. Ha ocupado cargos estratégicos en entidades destacadas y cuenta con amplia experiencia en arbitraje nacional e internacional, participando en más de 600 arbitrajes como presidente de tribunal arbitral, árbitro único e integrante de tribunales arbitrales. Actualmente es árbitro del Registro Nacional de Árbitros (RNA), consultor especializado y docente.',
        image: jimmyPisfil,
        degrees: ['Abogado'],
        masterDoctorate: [],
        books: [],
        articles: [],
        universityTeaching: [],
        teachingExperience: ['Docente en programas de formación en arbitraje'],
        professionalExperience: ['Árbitro del Registro Nacional de Árbitros (RNA)', 'Presidente de Tribunal Arbitral en más de 600 procesos', 'Árbitro Único', 'Integrante de tribunales arbitrales', 'Consultor especializado en arbitraje'],
        awards: []
      },
      {
        name: 'Raúl Salazar Rivera',
        title: 'Especialista en Arbitraje y Derecho Administrativo',
        bio: 'Abogado por la Pontificia Universidad Católica del Perú, con más de 20 años de trayectoria profesional. Árbitro inscrito en el Registro Nacional de Árbitros, con experiencia como presidente, árbitro único y árbitro de parte en más de cien procesos arbitrales a nivel nacional. Autor de diversas obras jurídicas, conferencista en instituciones especializadas y docente en programas de formación y actualización profesional.',
        image: raulSalazar,
        degrees: ['Abogado - Pontificia Universidad Católica del Perú'],
        masterDoctorate: [],
        books: ['Diversas obras jurídicas'],
        articles: [],
        universityTeaching: [],
        teachingExperience: ['Docente en programas de formación y actualización profesional', 'Conferencista en instituciones especializadas'],
        professionalExperience: ['Árbitro del Registro Nacional de Árbitros', 'Presidente de Tribunal Arbitral en más de 100 procesos', 'Árbitro Único', 'Árbitro de parte', 'Autor de obras jurídicas'],
        awards: []
      }
    ],
    startDate: '2026-02-02',
    featured: true
  },
  {
    id: 'diplomado-arbitraje-iv',
    title: 'IV Diplomado de Especialización de Arbitraje en Contratación Pública',
    shortDescription: 'Domina las técnicas de arbitraje especializadas en conflictos de contratación estatal.',
    fullDescription: 'El arbitraje en contratación pública representa uno de los campos más dinámicos y especializados del derecho administrativo contemporáneo. Este diplomado proporciona una formación integral que combina teoría y práctica, permitiendo a los participantes dominar las técnicas y procedimientos del arbitraje especializado en controversias derivadas de contratos con el Estado. Aprenderás a conducir procesos arbitrales con total autonomía, aplicando los principios fundamentales del debido proceso y las particularidades del derecho público. El programa incluye análisis profundo de la jurisprudencia relevante, estudio de casos complejos resueltos por tribunales arbitrales de prestigio, y talleres prácticos de redacción de laudos arbitrales.',
    type: 'diplomado',
    modality: 'virtual',
    duration: '27/04/26 – 01/07/26',
    price: 4200,
    certification: 'CEAR - UNMSM',
    image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800',
    frequency: 'Lun - Mié - Vie',
    schedule: '07:00 p.m. - 10:00 p.m.',
    hours: '384 horas académicas',
    category: 'Arbitraje',
    benefits: 'La entrada en vigencia de la Ley N° 32069 y su Reglamento ha introducido cambios sustantivos en el arbitraje en contratación pública, elevando los estándares técnicos, éticos y de control del sistema arbitral peruano. Este diplomado ofrece una formación especializada orientada a comprender y aplicar el nuevo marco normativo en aspectos clave como el convenio arbitral, la designación y recusación de árbitros, el procedimiento arbitral y el rol del Estado y de las instituciones arbitrales. El programa está diseñado para que el participante desarrolle criterio jurídico sólido para intervenir en arbitrajes complejos, minimizar riesgos de nulidad del laudo y desempeñarse con solvencia técnica en controversias vinculadas a la contratación pública.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoThumbnail: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=400',
    certificationImage: diplomadoCertificate,
    institutionLogos: [cearLogo],
    enrollmentDeadline: '2026-08-25',
    syllabus: [
      {
        module: 'Módulo I: Fundamentos del Arbitraje',
        topics: ['Naturaleza jurídica del arbitraje', 'Convenio arbitral y sus modalidades', 'Constitución del tribunal arbitral', 'Principios rectores del arbitraje']
      },
      {
        module: 'Módulo II: Procedimiento Arbitral',
        topics: ['Etapas del proceso arbitral', 'Medios probatorios en arbitraje', 'Audiencias arbitrales', 'Redacción y emisión de laudos arbitrales']
      },
      {
        module: 'Módulo III: Arbitraje en Contratación Pública',
        topics: ['Particularidades del arbitraje administrativo', 'Controversias frecuentes en contratación estatal', 'Jurisprudencia relevante del Tribunal Constitucional', 'Análisis de laudos paradigmáticos']
      },
      {
        module: 'Módulo IV: Recursos y Ejecución',
        topics: ['Recurso de anulación de laudo', 'Ejecución judicial de laudos', 'Medidas cautelares en arbitraje', 'Controversias post-laudo']
      }
    ],
    instructors: [
      {
        name: 'Dra. Patricia Montenegro Fernández',
        title: 'Árbitra certificada - Centro de Arbitraje PUCP',
        bio: 'Experta en resolución de controversias contractuales con más de 12 años de experiencia. Ha participado como árbitra en más de 80 casos comerciales y de contratación pública.',
        image: lawyer4,
        degrees: ['Abogada por la Pontificia Universidad Católica del Perú'],
        masterDoctorate: ['Maestría en Arbitraje', 'Doctorado en Derecho Administrativo'],
        books: ['Manual de Arbitraje en Contratación Pública'],
        articles: ['La independencia e imparcialidad en el arbitraje', 'Laudos arbitrales: criterios de motivación'],
        universityTeaching: ['Pontificia Universidad Católica del Perú', 'Universidad del Pacífico'],
        teachingExperience: ['Docente de Arbitraje en PUCP', 'Coordinadora Académica del Centro de Arbitraje PUCP'],
        professionalExperience: ['Árbitra certificada con más de 80 casos resueltos', 'Miembro del panel de árbitros del Centro de Arbitraje PUCP'],
        awards: ['Reconocimiento como Árbitra Destacada 2024', 'Premio a la Excelencia Profesional en Arbitraje']
      },
      {
        name: 'Dr. Alejandro Vega Morales',
        title: 'Presidente del Centro de Arbitraje de la CCL',
        bio: 'Reconocido árbitro internacional especializado en controversias de alta complejidad. Miembro del panel de árbitros de la CCI.',
        image: lawyer5,
        degrees: ['Abogado por la Universidad Nacional Mayor de San Marcos'],
        masterDoctorate: ['Maestría en Arbitraje Internacional', 'Doctorado en Derecho Comercial Internacional'],
        books: ['Arbitraje Comercial Internacional: Teoría y Práctica', 'El Convenio Arbitral en el Perú'],
        articles: ['Tendencias del arbitraje internacional', 'La ejecución de laudos arbitrales extranjeros'],
        universityTeaching: ['Universidad Nacional Mayor de San Marcos', 'Universidad de Lima'],
        teachingExperience: ['Catedrático de Arbitraje Comercial', 'Director del Programa de Arbitraje de la CCL'],
        professionalExperience: ['Presidente del Centro de Arbitraje de la Cámara de Comercio de Lima', 'Miembro del panel de árbitros de la CCI', 'Árbitro en más de 150 casos comerciales'],
        awards: ['Premio Nacional de Arbitraje 2023', 'Distinción al Mérito Arbitral por la CCI']
      }
    ],
    startDate: '2026-04-27',
    featured: true
  },
  {
    id: 'diplomado-contratacion-publica-ii',
    title: 'II Diplomado de Especialización en Contratación Pública bajo la Ley N° 32069 y su Reglamento',
    shortDescription: 'Formación especializada en los procedimientos y normativa actual de la contratación pública.',
    fullDescription: 'La entrada en vigencia de la Ley N° 32069 y su Reglamento ha transformado de manera integral el sistema de contratación pública en el Perú, incorporando nuevos enfoques, actores y herramientas de gestión. En este escenario, el diplomado ofrece una formación especializada que abarca desde los fundamentos normativos hasta la ejecución contractual y la resolución de controversias mediante el arbitraje y la junta de prevención y resolución de disputas. El programa busca que el participante adquiera criterios técnicos para planificar, conducir y supervisar procesos de contratación pública, reduciendo riesgos legales y mejorando la toma de decisiones en cada etapa del procedimiento.',
    type: 'diplomado',
    modality: 'virtual',
    duration: '27/04/26 – 14/07/26',
    price: 4200,
    certification: 'CEAR - UNMSM',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    frequency: 'Lun - Mié - Vie',
    schedule: '07:00 p.m. - 10:00 p.m.',
    hours: '384 horas académicas',
    category: 'Contratación Pública',
    benefits: 'La entrada en vigencia de la Ley N° 32069 y su Reglamento ha transformado de manera integral el sistema de contratación pública en el Perú, incorporando nuevos enfoques, actores y herramientas de gestión. En este escenario, el diplomado ofrece una formación especializada que abarca desde los fundamentos normativos hasta la ejecución contractual y la resolución de controversias mediante el arbitraje y la junta de prevención y resolución de disputas. El programa busca que el participante adquiera criterios técnicos para planificar, conducir y supervisar procesos de contratación pública, reduciendo riesgos legales y mejorando la toma de decisiones en cada etapa del procedimiento.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoThumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400',
    certificationImage: diplomadoCertificate,
    institutionLogos: [cearLogo],
    enrollmentDeadline: '2026-10-15',
    syllabus: [
      {
        module: 'Módulo I: Introducción a la Contratacin Pública en el Perú',
        topics: ['La regulación de la contratación pública en el Perú', 'Importancia de la contratación pública en la economía', 'Marco normativo actual']
      },
      {
        module: 'Módulo II: Fundamentos de la Ley N° 32069 y su Reglamento',
        topics: ['Objeto, finalidad y ámbito de aplicación', 'Principios rectores de la Contratación Pública', 'Enfoques y gestión por resultados']
      },
      {
        module: 'Módulo III: Procedimientos de Selección',
        topics: ['Fase de selección', 'Evaluación de ofertas', 'Otorgamiento de la buena pro', 'Perfeccionamiento del contrato']
      },
      {
        module: 'Módulo IV: Ejecución Contractual',
        topics: ['Cláusulas obligatorias en contratos', 'Modificaciones contractuales', 'Incumplimiento del contrato', 'Solución de controversias']
      }
    ],
    instructors: [
      {
        name: 'Erick Mendoza Merino',
        title: 'Miembro de la Cuarta Sala del Tribunal del OECE',
        bio: 'Abogado por la Universidad Nacional Mayor de San Marcos, con más de 15 años de experiencia en contrataciones con el Estado. Actualmente, forma parte de la Cuarta Sala del Tribunal del Organismo Especializado para las Contrataciones Públicas Eficientes (OECE).',
        image: erickMendoza,
        degrees: ['Abogado por la Universidad Nacional Mayor de San Marcos'],
        masterDoctorate: ['Máster en Contrataciones Públicas', 'Maestría en Gestión Pública'],
        books: [],
        articles: [],
        universityTeaching: [],
        teachingExperience: [],
        professionalExperience: ['Miembro de la Cuarta Sala del Tribunal del OECE', 'Consultor legal en contratación pública', 'Más de 15 años de experiencia en contrataciones con el Estado'],
        awards: []
      },
      {
        name: 'Steven Flores Olivera',
        title: 'Presidente de la Segunda Sala del Tribunal del OECE',
        bio: 'Abogado por la Universidad Nacional Mayor de San Marcos, con más de 15 años de experiencia. Actualmente, es presidente de la Segunda Sala del Tribunal del Organismo Especializado para las Contrataciones Públicas Eficientes (OECE).',
        image: stevenFlores,
        degrees: ['Abogado por la Universidad Nacional Mayor de San Marcos'],
        masterDoctorate: ['Maestría en Gestión de Políticas Públicas', 'Estudios de especialización en Contrataciones del Estado'],
        books: [],
        articles: [],
        universityTeaching: [],
        teachingExperience: [],
        professionalExperience: ['Presidente de la Segunda Sala del Tribunal del OECE', 'Más de 15 años de experiencia en contrataciones públicas', 'Especialista en Contrataciones del Estado'],
        awards: []
      },
      {
        name: 'Christian Chocano Davis',
        title: 'Presidente de la Quinta Sala del Tribunal del OECE',
        bio: 'Abogado por la Pontificia Universidad Católica del Perú, con Máster en Seguridad Social Europea por la Universidad Católica de Lovaina y Máster en Gestión Pública por la Universidad de Castilla-La Mancha. Actualmente se desempeña como Presidente de la Quinta Sala del Tribunal del OECE.',
        image: christianChocano,
        degrees: ['Abogado por la Pontificia Universidad Católica del Perú'],
        masterDoctorate: ['Máster en Seguridad Social Europea por la Universidad Católica de Lovaina', 'Máster en Gestión Pública por la Universidad de Castilla-La Mancha'],
        books: [],
        articles: [],
        universityTeaching: ['Docente universitario'],
        teachingExperience: ['Amplia experiencia en docencia universitaria', 'Asesor y jurado de tesis'],
        professionalExperience: ['Presidente de la Quinta Sala del Tribunal del OECE', 'Especialista en contrataciones públicas'],
        awards: []
      },
      {
        name: 'Luis Villavicencio Benites',
        title: 'Especialista en Contratación Pública',
        bio: 'Abogado por la Pontificia Universidad Católica del Perú, con Máster en Contratación Pública por la Universidad de Castilla-La Mancha y Máster en Derecho Administrativo por la misma casa de estudios. Cuenta con una sólida trayectoria profesional en el ámbito de las contrataciones del Estado.',
        image: luisVillavicencio,
        degrees: ['Abogado por la Pontificia Universidad Católica del Perú'],
        masterDoctorate: ['Máster en Contratación Pública por la Universidad de Castilla-La Mancha', 'Máster en Derecho Administrativo por la Universidad de Castilla-La Mancha'],
        books: [],
        articles: [],
        universityTeaching: ['Docente universitario'],
        teachingExperience: ['Docente universitario en contrataciones del Estado'],
        professionalExperience: ['Sólida trayectoria profesional en contrataciones del Estado', 'Árbitro en contratación pública', 'Adjudicador en juntas de resolución de disputas'],
        awards: []
      }
    ],
    startDate: '2026-04-27',
    featured: true
  },
  {
    id: 'curso-contratos-estandarizados-iii',
    title: 'IV Curso de Especialización en Contratos Estandarizados bajo la nueva Ley General de Contrataciones Públicas: NEC y FIDIC',
    shortDescription: 'Domina los contratos estandarizados NEC y FIDIC en contratación pública.',
    fullDescription: 'Los contratos estandarizados internacionales FIDIC y NEC representan los sistemas contractuales más utilizados a nivel mundial para la ejecución de proyectos de infraestructura de gran envergadura. Este curso especializado proporciona formación profunda en la estructura, cláusulas principales y aplicación práctica de ambos sistemas contractuales. Aprenderás las características distintivas de los diferentes libros FIDIC, el sistema de gestión de riesgos del contrato NEC, las obligaciones y derechos de las partes bajo cada modalidad contractual, y las mejores prácticas para la administración efectiva de estos contratos complejos.',
    type: 'curso',
    modality: 'virtual',
    duration: '28/04/26 – 23/06/26',
    price: 2200,
    certification: 'CEAR',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
    frequency: 'Mar - Jue',
    schedule: '07:00 p.m. - 10:00 p.m.',
    hours: '120 horas académicas',
    category: 'Contratos Estandarizados',
    benefits: 'La incorporación del artículo 59 en la nueva Ley General de Contrataciones Públicas ha habilitado el uso de contratos estandarizados internacionales como NEC y FIDIC en proyectos de infraestructura pública en el Perú. Este curso especializado brinda una formación técnica y normativa orientada a comprender la estructura, lógica operativa y compatibilidad de estos modelos contractuales con el sistema de control estatal y los lineamientos de la Contraloría. El programa está diseñado para que el participante aplique criterios jurídicos y técnicos en la gestión de riesgos, tiempo, costos y mecanismos de prevención y solución de controversias en proyectos complejos de obras públicas.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoThumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400',
    certificationImage: diplomadoCertificate,
    institutionLogos: [cearLogo],
    enrollmentDeadline: '2026-04-21',
    syllabus: [
      {
        module: 'Módulo I: Sistema Contractual FIDIC',
        topics: ['Libros FIDIC y sus diferencias', 'Cláusulas principales del contrato', 'Rol del ingeniero en FIDIC', 'Aplicación práctica en proyectos']
      },
      {
        module: 'Módulo II: Sistema Contractual NEC',
        topics: ['Características del sistema NEC', 'Gestión de riesgos y early warnings', 'Opciones principales y secundarias', 'Casos de aplicación internacional']
      },
      {
        module: 'Módulo III: Comparativa y Controversias',
        topics: ['FIDIC vs NEC vs sistema peruano', 'Claims management', 'Dispute resolution boards', 'Talleres prácticos']
      }
    ],
    instructors: [
      {
        name: 'Dr. Alberto José Sánchez Villar',
        title: 'Consultor Internacional en Contratos - Experto FIDIC',
        bio: 'Abogado especializado en contratación internacional con más de 16 años de experiencia. Asesor en grandes proyectos de infraestructura bajo estándares FIDIC y NEC.',
        image: lawyer8,
        degrees: ['Abogado por la Universidad de Lima'],
        masterDoctorate: ['Maestría en Contratación Internacional', 'Doctorado en Derecho Empresarial'],
        books: ['Contratos FIDIC: Guía Práctica para Proyectos de Infraestructura', 'Gestión de Riesgos en Contratos NEC'],
        articles: ['Aplicación de FIDIC en proyectos latinoamericanos', 'NEC vs FIDIC: análisis comparativo'],
        universityTeaching: ['Universidad del Pacífico', 'Universidad ESAN'],
        teachingExperience: ['Docente de Contratos Internacionales', 'Consultor académico en proyectos de infraestructura'],
        professionalExperience: ['Consultor Internacional en más de 20 proyectos FIDIC', 'Asesor en proyectos de infraestructura por más de US$ 5,000 millones'],
        awards: ['Reconocimiento Internacional FIDIC 2022', 'Premio a la Excelencia en Consultoría de Proyectos']
      },
      {
        name: 'Ing. Roberto Castillo Méndez',
        title: 'Project Manager Certificado - Especialista en NEC',
        bio: 'Ingeniero con certificación internacional en gestión de proyectos NEC. Ha dirigido la implementación de contratos NEC en proyectos de infraestructura.',
        image: lawyer9,
        degrees: ['Ingeniero Civil por la Universidad Nacional de Ingeniería'],
        masterDoctorate: ['Maestría en Gestión de Proyectos', 'MBA en Dirección de Empresas'],
        books: ['Implementación Práctica de Contratos NEC'],
        articles: ['Early warnings en contratos NEC', 'Gestión colaborativa de proyectos de infraestructura'],
        universityTeaching: ['Universidad Nacional de Ingeniería', 'Universidad Peruana de Ciencias Aplicadas'],
        teachingExperience: ['Docente de Gestión de Proyectos de Infraestructura'],
        professionalExperience: ['Project Manager Certificado NEC', 'Director de más de 15 proyectos de infraestructura'],
        awards: ['Certificación Internacional NEC Project Manager', 'Premio Nacional de Ingeniería Civil 2023']
      }
    ],
    startDate: '2026-04-28',
    featured: true
  },
  {
    id: 'curso-inversion-privada',
    title: 'Curso de Especialidad en Mecanismos de Inversión Privada (APP, OxI y G2G)',
    shortDescription: 'Domina los mecanismos de inversión privada en proyectos públicos.',
    fullDescription: 'Los mecanismos alternativos de inversión en infraestructura pública han cobrado relevancia fundamental como instrumentos para cerrar la brecha de infraestructura en el país. Este curso especializado proporciona formación integral en las Asociaciones Público-Privadas (APP), el mecanismo de Obras por Impuestos (OxI), y los contratos Gobierno a Gobierno (G2G), analizando su marco legal, estructuración, ventajas y desventajas. Aprenderás el procedimiento completo para la promoción y adjudicación de proyectos APP, los beneficios tributarios y el proceso de inversión bajo el esquema de Obras por Impuestos, las particularidades de los contratos G2G y su régimen jurídico especial.',
    type: 'curso',
    modality: 'virtual',
    duration: '03/03/26 – 05/05/26',
    price: 2200,
    certification: 'Doble certificación',
    image: inversionPrivadaPortada,
    frequency: 'Mar - Jue',
    schedule: '07:00 p.m. - 10:00 p.m.',
    hours: '120 horas académicas',
    category: 'Inversión Privada',
    benefits: 'Los mecanismos de inversión privada como las Asociaciones Público-Privadas (APP), las Obras por Impuestos (OxI) y los Acuerdos de Gobierno a Gobierno (G2G) se han consolidado como herramientas estratégicas para el desarrollo de infraestructura pública en el Perú. Este curso de especialización ofrece una formación integral para comprender su marco normativo, lógica de estructuración, modelos de financiamiento y roles institucionales involucrados en cada esquema. El programa está orientado a que el participante adquiera criterios técnicos y jurídicos para evaluar, gestionar y supervisar proyectos de inversión privada, tomando decisiones informadas y alineadas al interés público.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoThumbnail: inversionPrivadaPortada,
    certificationImage: diplomadoCertificate,
    institutionLogos: [cearLogo],
    enrollmentDeadline: '2026-02-12',
    syllabus: [
      {
        module: 'Módulo I: Asociaciones Público-Privadas',
        topics: ['Marco legal de las APP', 'Estructuración de proyectos APP', 'Contratos de concesión', 'Garantías y riesgos en APP']
      },
      {
        module: 'Módulo II: Obras por Impuestos',
        topics: ['Procedimiento de OxI', 'Ventajas fiscales para empresas', 'Ejecución y supervisión', 'Casos exitosos de OxI']
      },
      {
        module: 'Módulo III: Contratos Gobierno a Gobierno',
        topics: ['Convenios internacionales G2G', 'Régimen jurídico especial', 'Casos de aplicación', 'Controversias y solución']
      },
      {
        module: 'Módulo IV: Análisis Comparativo y Casos Prácticos',
        topics: ['Ventajas y desventajas de cada mecanismo', 'Estructuración financiera', 'Evaluación de proyectos', 'Talleres prácticos']
      }
    ],
    instructors: [
      {
        name: 'Giancarlo Vignolo Cueva',
        title: 'Especialista en Regulación de Servicios Públicos y APP',
        bio: 'Abogado por la Universidad de Piura y profesor universitario en la Universidad San Ignacio de Loyola. Magíster en Finanzas y Derecho Corporativo, con especialización en Regulación de Servicios Públicos y Gestión de Asociaciones Pública Privadas. Cuenta con más de 10 años de experiencia, con énfasis en sectores regulados (hidrocarburos, electricidad y gas natural) y contratos de concesión.',
        image: giancarloVignolo,
        degrees: ['Abogado - Universidad de Piura'],
        masterDoctorate: ['Magíster en Finanzas y Derecho Corporativo', 'Especialización en Regulación de Servicios Públicos', 'Especialización en Gestión de Asociaciones Pública Privadas'],
        books: [],
        articles: [],
        universityTeaching: ['Universidad San Ignacio de Loyola'],
        teachingExperience: ['Profesor universitario en Universidad San Ignacio de Loyola'],
        professionalExperience: ['Especialista en sectores regulados (hidrocarburos, electricidad y gas natural)', 'Especialista en contratos de concesión', 'Más de 10 años de experiencia en APP'],
        awards: []
      },
      {
        name: 'Natalia Mori Torres',
        title: 'Especialista en Arbitraje Internacional y Proyectos de Infraestructura',
        bio: 'Abogada por la Pontificia Universidad Católica del Perú y profesora en la Universidad del Pacífico. LL.M. en International Business Regulation, Litigation and Arbitration por la New York University School of Law, ha participado en arbitrajes comerciales y de inversión, interviniendo en controversias complejas vinculadas a proyectos de infraestructura pública y brindando asesoría a concesionarios e inversionistas.',
        image: nataliaMoriTorres,
        degrees: ['Abogada - Pontificia Universidad Católica del Perú'],
        masterDoctorate: ['LL.M. en International Business Regulation, Litigation and Arbitration - New York University School of Law'],
        books: [],
        articles: [],
        universityTeaching: ['Universidad del Pacífico'],
        teachingExperience: ['Profesora en Universidad del Pacífico'],
        professionalExperience: ['Participación en arbitrajes comerciales y de inversión', 'Intervención en controversias complejas vinculadas a proyectos de infraestructura pública', 'Asesoría a concesionarios e inversionistas'],
        awards: []
      }
    ],
    startDate: '2026-02-19',
    featured: true
  },
  {
    id: 'curso-controversias-ejecucion-contractual',
    title: 'III Curso de Especialidad en Controversias en la Ejecución Contractual de Obras Públicas',
    shortDescription: 'Gestiona y resuelve controversias durante la fase de ejecución de contratos públicos.',
    fullDescription: 'La ejecución contractual de obras públicas constituye la etapa más sensible del proceso de contratación estatal, donde se concentran los principales riesgos legales, técnicos y económicos del contrato. Este curso de especialidad brinda una formación normativa y práctica sobre la gestión de la ejecución contractual conforme a la Ley N° 32069 y su Reglamento, abordando aspectos críticos como modificaciones contractuales, penalidades, resolución, recepción y liquidación de obra. El programa está orientado a que el participante adquiera criterios técnicos y jurídicos para tomar decisiones informadas, prevenir contingencias y gestionar contratos de obra con solvencia frente a escenarios de control y eventual controversia.',
    type: 'curso',
    modality: 'virtual',
    duration: '28/04/26 – 23/06/26',
    price: 2200,
    certification: 'Doble certificación',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    frequency: 'Mar - Jue',
    schedule: '07:00 p.m. - 10:00 p.m.',
    hours: '120 horas académicas',
    category: 'Controversias',
    benefits: 'La ejecución contractual de obras públicas constituye la etapa más sensible del proceso de contratación estatal, donde se concentran los principales riesgos legales, técnicos y económicos del contrato. Este curso de especialidad brinda una formación normativa y práctica sobre la gestión de la ejecución contractual conforme a la Ley N° 32069 y su Reglamento, abordando aspectos críticos como modificaciones contractuales, penalidades, resolución, recepción y liquidación de obra. El programa está orientado a que el participante adquiera criterios técnicos y jurídicos para tomar decisiones informadas, prevenir contingencias y gestionar contratos de obra con solvencia frente a escenarios de control y eventual controversia.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoThumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
    certificationImage: diplomadoCertificate,
    institutionLogos: [cearLogo],
    enrollmentDeadline: '2026-04-27',
    syllabus: [
      {
        module: 'Módulo I: Controversias Comunes en Ejecución Contractual',
        topics: ['Ampliaciones de plazo y sus causales', 'Prestaciones adicionales de obra', 'Aplicación de penalidades', 'Valorizaciones y pagos']
      },
      {
        module: 'Módulo II: Documentación y Sustentación',
        topics: ['Elaboración de expedientes técnicos', 'Cartas notariales y comunicaciones', 'Pruebas y evidencias', 'Informes técnicos y legales']
      },
      {
        module: 'Módulo III: Mecanismos de Solución de Controversias',
        topics: ['Negociación directa', 'Conciliación extrajudicial', 'Arbitraje', 'Trato directo en sede arbitral']
      }
    ],
    instructors: [
      {
        name: 'Dr. Carlos Alberto Mendoza Rivera',
        title: 'Especialista en Gestión Contractual - Ex Director de OSCE',
        bio: 'Más de 18 años de experiencia en gestión y supervisión de contratos públicos de infraestructura.',
        image: lawyer2,
        degrees: ['Abogado por la Universidad Nacional Mayor de San Marcos'],
        masterDoctorate: ['Maestría en Gestión Pública', 'Doctorado en Derecho Administrativo'],
        books: ['Gestión Contractual en Obras Públicas', 'Controversias en la Ejecución de Contratos'],
        articles: ['Ampliaciones de plazo: análisis jurisprudencial', 'Penalidades en contratos de obra pública'],
        universityTeaching: ['Universidad Nacional Mayor de San Marcos', 'Universidad de Lima'],
        teachingExperience: ['Docente de Gestión Contractual y Contrataciones'],
        professionalExperience: ['Ex Director de Operaciones del OSCE', 'Consultor en gestión contractual para entidades públicas', 'Supervisor de contratos de infraestructura por más de US$ 500 millones'],
        awards: ['Reconocimiento del OSCE por gestión administrativa destacada']
      },
      {
        name: 'Ing. Ricardo Salinas Paredes',
        title: 'Supervisor de Obras - Experto en Ejecución Contractual',
        bio: 'Ingeniero civil especializado en supervisión de obras públicas con más de 15 años de experiencia.',
        image: lawyer3,
        degrees: ['Ingeniero Civil por la Universidad Nacional de Ingeniería'],
        masterDoctorate: ['Maestría en Gestión de Proyectos de Construcción', 'MBA en Dirección de Proyectos'],
        books: ['Supervisión de Obras Públicas: Guía Práctica'],
        articles: ['Valorización de obras adicionales', 'Control de calidad en obras de infraestructura'],
        universityTeaching: ['Universidad Nacional de Ingeniería', 'Universidad Peruana de Ciencias Aplicadas'],
        teachingExperience: ['Docente de Supervisión y Control de Obras'],
        professionalExperience: ['Supervisor en más de 30 proyectos de infraestructura vial', 'Consultor en ejecución contractual'],
        awards: ['Reconocimiento del Colegio de Ingenieros del Perú', 'Premio a la Excelencia en Supervisión de Obras 2023']
      }
    ],
    startDate: '2026-04-28',
    featured: true
  },
  {
    id: 'diplomado-jprd-ii',
    title: 'II Diplomado de Posgrado en Junta de Prevención y Resolución de Disputas',
    shortDescription: 'Mecanismo especializado para intervenir de manera preventiva y decisoria en controversias de contratos públicos de obras.',
    fullDescription: 'La Junta de Prevención y Resolución de Disputas constituye un mecanismo especializado para intervenir de manera preventiva y decisoria en las controversias que se presentan durante la ejecución de contratos públicos de obras. En el marco de la Ley N° 32069 y su Reglamento, este programa desarrolla de forma integral el régimen normativo, el proceso de diseño e instalación, el funcionamiento operativo de la JPRD y el ejercicio del rol técnico y ético del adjudicador. Su enfoque aplicado permite trasladar criterios jurídicos y técnicos a escenarios reales de ejecución contractual, contribuyendo a una gestión continua, transparente y orientada a evitar retrasos, sobrecostos y paralizaciones de obras públicas.',
    type: 'diplomado',
    modality: 'virtual',
    duration: '02/02/26 - 21/04/26',
    price: 4200,
    certification: 'Doble certificación',
    image: jprdPortada,
    frequency: 'Lun - Mié - Vie',
    schedule: '07:00 p.m. - 10:00 p.m.',
    hours: '384 horas académicas',
    category: 'Junta de Prevención y Resolución de Disputas',
    benefits: 'La Junta de Prevención y Resolución de Disputas constituye un mecanismo especializado para intervenir de manera preventiva y decisoria en las controversias que se presentan durante la ejecución de contratos públicos de obras. En el marco de la Ley N° 32069 y su Reglamento, este programa desarrolla de forma integral el régimen normativo, el proceso de diseño e instalación, el funcionamiento operativo de la JPRD y el ejercicio del rol técnico y ético del adjudicador. Su enfoque aplicado permite trasladar criterios jurídicos y técnicos a escenarios reales de ejecución contractual, contribuyendo a una gestión continua, transparente y orientada a evitar retrasos, sobrecostos y paralizaciones de obras públicas.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoThumbnail: jprdPortada,
    certificationImage: diplomadoCertificate,
    institutionLogos: [cearLogo],
    enrollmentDeadline: '2026-02-23',
    syllabus: [
      {
        module: 'Módulo I: Marco Normativo de las JPRD',
        topics: ['Ley 32069 y su reglamento', 'Aplicación en contratos de obra', 'Naturaleza jurídica de las recomendaciones', 'Diferencias con otros mecanismos ADR']
      },
      {
        module: 'Módulo II: Diseño e Instalación de la JPRD',
        topics: ['Conformación de la junta', 'Requisitos y calificaciones', 'Proceso de designación', 'Instalación y funcionamiento inicial']
      },
      {
        module: 'Módulo III: Funcionamiento Operativo',
        topics: ['Procedimientos internos', 'Sesiones y visitas de obra', 'Emisión de recomendaciones', 'Decisiones vinculantes']
      },
      {
        module: 'Módulo IV: Rol Técnico y Ético del Adjudicador',
        topics: ['Responsabilidades del adjudicador', 'Principios éticos', 'Análisis técnico-legal', 'Casos prácticos y simulaciones']
      }
    ],
    instructors: [
      {
        name: 'León López Avilés',
        title: 'Ingeniero Civil - Consultor en Gestión Contractual',
        bio: 'Ingeniero civil por la Pontificia Universidad Católica del Perú, con más de 43 años de experiencia en gestión de riesgos, dirección de proyectos, gestión contractual y solución de controversias. Está certificado como Project Management Professional (PMP) y posee un Magíster en Administración de Empresas con mención en Gestión.',
        image: leonLopez,
        degrees: ['Ingeniero civil por la Pontificia Universidad Católica del Perú'],
        masterDoctorate: ['Magíster en Administración de Empresas con mención en Gestión', 'Project Management Professional (PMP)'],
        books: [],
        articles: [],
        universityTeaching: [],
        teachingExperience: [],
        professionalExperience: ['Consultor en gestión contractual', 'Más de 43 años de experiencia en gestión de riesgos y dirección de proyectos', 'Especialista en solución de controversias'],
        awards: []
      },
      {
        name: 'Jenny Guerrero Aquino',
        title: 'Ingeniera Civil - Experta en Juntas de Resolución de Disputas',
        bio: 'Ingeniera civil por la Universidad Nacional de Ingeniería, con más de 39 años de experiencia en administración de contratos, programación, costos y gerencia de obras públicas y privadas. Es experta en la Ley de Contrataciones del Estado y miembro de Juntas de Resolución de Disputas. Ha sido reconocida por Leaders League como experta en apoyo en litigios en construcción e ingeniería (2020-2024).',
        image: jennyGuerrero,
        degrees: ['Ingeniera civil por la Universidad Nacional de Ingeniería'],
        masterDoctorate: [],
        books: [],
        articles: [],
        universityTeaching: [],
        teachingExperience: [],
        professionalExperience: ['Miembro de Juntas de Resolución de Disputas', 'Más de 39 años de experiencia en administración de contratos y gerencia de obras', 'Experta en la Ley de Contrataciones del Estado'],
        awards: ['Reconocida por Leaders League como experta en apoyo en litigios en construcción e ingeniería (2020-2024)']
      },
      {
        name: 'Rosa Rivera Robles',
        title: 'Ingeniera Civil - Especialista en Gestión de Obras',
        bio: 'Ingeniera civil con 34 años de experiencia en el sector construcción, con una sólida trayectoria en supervisión, gestión y ejecución de obras de ingeniería. Posee estudios de doctorado en Ingeniería Ambiental, una maestría en Gerencia de Proyectos y otra en Gestión Pública, además de especializaciones en diseño estructural, tendencias modernas en edificaciones y Lean Construction.',
        image: rosaRivera,
        degrees: ['Ingeniera civil'],
        masterDoctorate: ['Estudios de doctorado en Ingeniería Ambiental', 'Maestría en Gerencia de Proyectos', 'Maestría en Gestión Pública', 'Especialización en diseño estructural', 'Especialización en tendencias modernas en edificaciones', 'Especialización en Lean Construction'],
        books: [],
        articles: [],
        universityTeaching: [],
        teachingExperience: [],
        professionalExperience: ['34 años de experiencia en el sector construcción', 'Sólida trayectoria en supervisión, gestión y ejecución de obras de ingeniería'],
        awards: []
      }
    ],
    startDate: '2026-02-02',
    featured: true
  },
  {
    id: 'curso-contratacion-publica-ii',
    title: 'II Curso de Especialidad en Contratación Pública bajo la Ley N° 32069 y su Reglamento',
    shortDescription: 'Curso especializado en los procedimientos y normativa actual de la contratación pública.',
    fullDescription: 'La entrada en vigencia de la Ley N° 32069 y su Reglamento ha transformado de manera integral el sistema de contratación pública en el Perú, incorporando nuevos enfoques, actores y herramientas de gestión. Este curso ofrece una formación práctica y especializada que abarca desde los fundamentos normativos hasta la ejecución contractual. El programa busca que el participante adquiera criterios técnicos para planificar, conducir y supervisar procesos de contratación pública, reduciendo riesgos legales y mejorando la toma de decisiones en cada etapa del procedimiento.',
    type: 'curso',
    modality: 'virtual',
    duration: '19/02/26 – 21/04/26',
    price: 2200,
    certification: 'Certificado por CEAR LATINOAMERICANO',
    image: contratacionPublicaPortada,
    frequency: 'Mar - Jue',
    schedule: '07:00 p.m. - 10:00 p.m.',
    hours: '120 horas académicas',
    category: 'Contratación Pública',
    benefits: 'La entrada en vigor de la Ley N° 32069 y su Reglamento ha transformado de manera integral el sistema de contratación pública en el Perú, incorporando nuevos enfoques, actores y herramientas de gestión. En este escenario, el curso ofrece una formación especializada que abarca desde los fundamentos normativos hasta la ejecución contractual y la resolución de controversias mediante el arbitraje y la junta de prevención y resolución de disputas. El programa busca que el participante adquiera criterios técnicos para planificar, conducir y supervisar procesos de contratación pública, reduciendo riesgos legales y mejorando la toma de decisiones en cada etapa del procedimiento',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoThumbnail: contratacionPublicaPortada,
    certificationImage: diplomadoCertificate,
    institutionLogos: [cearLogo],
    enrollmentDeadline: '2026-02-12',
    syllabus: [
      {
        module: 'Módulo I: Marco Normativo de la Contratación Pública',
        topics: ['Ley N° 32069 y su Reglamento', 'Principios rectores', 'Ámbito de aplicación y excepciones']
      },
      {
        module: 'Módulo II: Planificación y Programación',
        topics: ['Plan Anual de Contrataciones', 'Estudios de mercado', 'Requerimientos técnicos mínimos']
      },
      {
        module: 'Módulo III: Procedimientos de Selección',
        topics: ['Tipos de procedimientos', 'Evaluación de ofertas', 'Otorgamiento de buena pro']
      },
      {
        module: 'Módulo IV: Ejecución y Gestión Contractual',
        topics: ['Perfeccionamiento del contrato', 'Modificaciones contractuales', 'Penalidades y resolución de contratos']
      }
    ],
    instructors: [
      {
        name: 'Erick Mendoza Merino',
        title: 'Miembro de la Cuarta Sala del Tribunal del OECE',
        bio: 'Abogado por la Universidad Nacional Mayor de San Marcos, con más de 15 años de experiencia en contrataciones con el Estado. Actualmente, forma parte de la Cuarta Sala del Tribunal del Organismo Especializado para las Contrataciones Públicas Eficientes (OECE).',
        image: erickMendoza,
        degrees: ['Abogado por la Universidad Nacional Mayor de San Marcos'],
        masterDoctorate: ['Máster en Contrataciones Públicas', 'Maestría en Gestión Pública'],
        books: [],
        articles: [],
        universityTeaching: [],
        teachingExperience: [],
        professionalExperience: ['Miembro de la Cuarta Sala del Tribunal del OECE', 'Consultor legal en contratación pública', 'Más de 15 años de experiencia en contrataciones con el Estado'],
        awards: []
      },
      {
        name: 'Steven Flores Olivera',
        title: 'Presidente de la Segunda Sala del Tribunal del OECE',
        bio: 'Abogado por la Universidad Nacional Mayor de San Marcos, con más de 15 años de experiencia. Actualmente, es presidente de la Segunda Sala del Tribunal del Organismo Especializado para las Contrataciones Públicas Eficientes (OECE).',
        image: stevenFlores,
        degrees: ['Abogado por la Universidad Nacional Mayor de San Marcos'],
        masterDoctorate: ['Maestría en Gestión de Políticas Públicas', 'Estudios de especialización en Contrataciones del Estado'],
        books: [],
        articles: [],
        universityTeaching: [],
        teachingExperience: [],
        professionalExperience: ['Presidente de la Segunda Sala del Tribunal del OECE', 'Más de 15 años de experiencia en contrataciones públicas', 'Especialista en Contrataciones del Estado'],
        awards: []
      },
      {
        name: 'Christian Chocano Davis',
        title: 'Presidente de la Quinta Sala del Tribunal del OECE',
        bio: 'Abogado por la Pontificia Universidad Católica del Perú, con Máster en Seguridad Social Europea por la Universidad Católica de Lovaina y Máster en Gestión Pública por la Universidad de Castilla-La Mancha. Actualmente se desempeña como Presidente de la Quinta Sala del Tribunal del OECE.',
        image: christianChocano,
        degrees: ['Abogado por la Pontificia Universidad Católica del Perú'],
        masterDoctorate: ['Máster en Seguridad Social Europea por la Universidad Católica de Lovaina', 'Máster en Gestión Pública por la Universidad de Castilla-La Mancha'],
        books: [],
        articles: [],
        universityTeaching: ['Docente universitario'],
        teachingExperience: ['Amplia experiencia en docencia universitaria', 'Asesor y jurado de tesis'],
        professionalExperience: ['Presidente de la Quinta Sala del Tribunal del OECE', 'Especialista en contrataciones públicas'],
        awards: []
      },
      {
        name: 'Luis Villavicencio Benites',
        title: 'Especialista en Contratación Pública',
        bio: 'Abogado por la Pontificia Universidad Católica del Perú, con Máster en Contratación Pública por la Universidad de Castilla-La Mancha y Máster en Derecho Administrativo por la misma casa de estudios. Cuenta con una sólida trayectoria profesional en el ámbito de las contrataciones del Estado.',
        image: luisVillavicencio,
        degrees: ['Abogado por la Pontificia Universidad Católica del Perú'],
        masterDoctorate: ['Máster en Contratación Pública por la Universidad de Castilla-La Mancha', 'Máster en Derecho Administrativo por la Universidad de Castilla-La Mancha'],
        books: [],
        articles: [],
        universityTeaching: ['Docente universitario'],
        teachingExperience: ['Docente universitario en contrataciones del Estado'],
        professionalExperience: ['Sólida trayectoria profesional en contrataciones del Estado', 'Árbitro en contratación pública', 'Adjudicador en juntas de resolución de disputas'],
        awards: []
      }
    ],
    startDate: '2026-02-19',
    featured: true
  }
];

export const testimonials = [
  {
    name: 'Dra. Nadia Chihuán Reyes',
    role: 'Gerente General de A&COP – Arbitraje & Construcción Pública',
    course: 'III Diplomado de Especialización de Arbitraje en Contratación Pública',
    text: 'CEAR LATINOAMERICANO es un centro de arbitraje de reconocido prestigio y, además, la primera institución arbitral inscrita en el REGAJU, lo que refleja su liderazgo. Actualmente formo parte del "Programa de Formación de Árbitros", lo que me ha permitido consolidar una formación alineada con la práctica arbitral actual.',
    rating: 5,
    image: nadiaChihuan
  },
  {
    name: 'Dra. Carla Peceros Silva',
    role: 'Asesora Parlamentaria en el Congreso de la República',
    course: 'II Curso de Especialización en Ejecución Contractual de Obras Públicas',
    text: 'Mi experiencia en la especialización fue altamente satisfactoria, ya que los contenidos fueron claros, actualizados y alineados con la normativa vigente. Los docentes demostraron amplio conocimiento y experiencia práctica, lo que se traduce en una formación que fortalece significativamente el ejercicio profesional.',
    rating: 5,
    image: carlaPeceros
  },
  {
    name: 'Dr. Jhon Malca Saavedra',
    role: 'Abogado en el Seguro Social de Salud (EsSalud)',
    course: 'Curso de Especialización en Contratación Pública',
    text: 'La formación académica permite a los profesionales actualizar sus conocimientos y desarrollar nuevas competencias. CEAR LATINOAMERICANO ha estructurado especialidades con temas de alto impacto y debate normativo, dictadas por docentes calificados, por lo que me complace haber optado por formarme en esta institución.',
    rating: 5,
    image: jhonMalca
  },
  {
    name: 'Dra. Karina Alvarado León',
    role: 'Árbitra inscrita en el Registro Nacional de Árbitros (RNA)',
    course: 'Curso de Especialización en Habilidades Blandas',
    text: 'La formación académica permite a los profesionales actualizar sus conocimientos y desarrollar nuevas competencias. CEAR LATINOAMERICANO ha estructurado especialidades con temas de alto impacto y debate normativo, dictadas por docentes calificados, por lo que me complace haber optado por formarme en esta institución.',
    rating: 5,
    image: karinaAlvaradoTestimonial
  },
  {
    name: 'Dr. Manuel Chacaltana McMillan',
    role: 'Árbitro en materia de contratación pública',
    course: 'Curso de Especialización en Contratación Pública',
    text: 'El Centro de Formación Continua de CEAR LATINOAMERICANO ofrece una experiencia formativa de calidad, con docentes altamente preparados y un sólido enfoque práctico. Además, cuenta con un equipo administrativo siempre atento y dispuesto a brindar apoyo oportuno. Totalmente recomendable.',
    rating: 5,
    image: manuelChacaltana
  }
];
