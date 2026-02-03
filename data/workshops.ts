export interface Workshop {
  id: string;
  title: string;
  description: string;
  date: string; // Formato: DD/MM/YYYY
  time: string; // Formato: HH:MM
  duration: string; // Ejemplo: "2 horas"
  instructor: {
    name: string;
    title: string;
    image: string;
  };
  category: string;
  isToday: boolean;
  backgroundImage: string;
  registrationLink?: string;
}

export const workshops: Workshop[] = [
  {
    id: 'workshop-1',
    title: 'Introducción al Arbitraje en Contratación Pública',
    description: 'Conozca los fundamentos del arbitraje como mecanismo de resolución de controversias en contratos públicos.',
    date: '26/12/2024',
    time: '18:00',
    duration: '2 horas',
    instructor: {
      name: 'Dr. Luis Martínez Cáceres',
      title: 'Árbitro especializado en contratación pública',
      image: '',
    category: 'Arbitraje',
    isToday: true,
    backgroundImage: 'https://images.unsplash.com/photo-1568092806323-8ec13dfa9b92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBjb3VydHJvb20lMjBhcmJpdHJhdGlvbnxlbnwxfHx8fDE3NjY3Nzg4ODl8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'workshop-2',
    title: 'Novedades de la Ley N° 32069 de Contrataciones Públicas',
    description: 'Análisis de las principales modificaciones introducidas por la nueva normativa de contratación pública.',
    date: '27/12/2024',
    time: '19:00',
    duration: '1.5 horas',
    instructor: {
      name: 'Dra. Patricia Alvarado Rojas',
      title: 'Ex Directora de Contrataciones del OSCE',
      image: '',
    category: 'Contratación Pública',
    isToday: false,
    backgroundImage: 'https://images.unsplash.com/photo-1764106813759-9ef7bf42a0af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdhbCUyMGRvY3VtZW50cyUyMGNvbnRyYWN0fGVufDF8fHx8MTc2Njc1MTI1MXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'workshop-3',
    title: 'Juntas de Prevención y Resolución de Disputas en Proyectos',
    description: 'Mecanismos preventivos para evitar controversias en la ejecución de obras públicas.',
    date: '28/12/2024',
    time: '17:30',
    duration: '2 horas',
    instructor: {
      name: 'Ing. Carlos Mendoza Silva',
      title: 'Miembro de JPRD en proyectos de infraestructura',
      image: '',
    category: 'JPRD',
    isToday: false,
    backgroundImage: 'https://images.unsplash.com/photo-1765378025264-ca795700291f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBlbmdpbmVlcmluZyUyMHByb2plY3R8ZW58MXx8fHwxNzY2Nzc4ODkwfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'workshop-4',
    title: 'Contratos Estandarizados: FIDIC y NEC',
    description: 'Introducción a los sistemas contractuales internacionales más utilizados en infraestructura.',
    date: '29/12/2024',
    time: '18:30',
    duration: '2 horas',
    instructor: {
      name: 'Dr. Roberto Hernández Sánchez',
      title: 'Especialista en Contratación Pública',
      image: '',
    category: 'Contratos',
    isToday: false,
    backgroundImage: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBjb25mZXJlbmNlfGVufDF8fHx8MTc2NjcxMjY0N3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'workshop-5',
    title: 'Derecho Administrativo Aplicado al Arbitraje',
    description: 'Principios del derecho administrativo en procesos arbitrales de contratación pública.',
    date: '30/12/2024',
    time: '19:00',
    duration: '1.5 horas',
    instructor: {
      name: 'Dr. Fernando García López',
      title: 'Docente de Derecho Administrativo',
      image: '',
    category: 'Derecho Administrativo',
    isToday: false,
    backgroundImage: 'https://images.unsplash.com/photo-1662728132385-11fee9b3db9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY2NzQ3NzE0fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'workshop-6',
    title: 'Mecanismos de Inversión Privada: APP y OxI',
    description: 'Análisis de las Asociaciones Público-Privadas y Obras por Impuestos en el Perú.',
    date: '31/12/2024',
    time: '17:00',
    duration: '2 horas',
    instructor: {
      name: 'Mg. Ana María Torres',
      title: 'Especialista en inversión pública',
      image: '',
    category: 'Inversión Pública',
    isToday: false,
    backgroundImage: 'https://images.unsplash.com/photo-1695548043715-feb22ef40436?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJsaWMlMjBpbmZyYXN0cnVjdHVyZSUyMGludmVzdG1lbnR8ZW58MXx8fHwxNzY2Nzc4ODkyfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'workshop-7',
    title: 'Procedimientos de Selección bajo la Nueva Ley',
    description: 'Aspectos prácticos de los procedimientos de selección según Ley N° 32069.',
    date: '02/01/2025',
    time: '18:00',
    duration: '2 horas',
    instructor: {
      name: 'Dr. Miguel Ángel Rojas',
      title: 'Consultor en contratación pública',
      image: '',
    category: 'Contratación Pública',
    isToday: false,
    backgroundImage: 'https://images.unsplash.com/photo-1758518731462-d091b0b4ed0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXd5ZXIlMjBwcm9mZXNzaW9uYWwlMjBvZmZpY2V8ZW58MXx8fHwxNzY2Nzc4ODkyfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'workshop-8',
    title: 'Resolución de Controversias en Contratos de Obras',
    description: 'Estrategias para la prevención y resolución de disputas en proyectos de construcción.',
    date: '03/01/2025',
    time: '19:30',
    duration: '1.5 horas',
    instructor: {
      name: 'Dra. Carmen Sánchez Vega',
      title: 'Árbitra especializada en construcción',
      image: '',
    category: 'Resolución de Controversias',
    isToday: false,
    backgroundImage: 'https://images.unsplash.com/photo-1646640727046-57cdf6e9a577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNwdXRlJTIwcmVzb2x1dGlvbiUyMG1lZGlhdGlvbnxlbnwxfHx8fDE3NjY3Nzg4OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

// Función para obtener el taller del día actual
export const getTodayWorkshop = (): Workshop | undefined => {
  return workshops.find(workshop => workshop.isToday);
};

// Función para obtener próximos talleres
export const getUpcomingWorkshops = (limit?: number): Workshop[] => {
  const upcoming = workshops.filter(workshop => !workshop.isToday);
  return limit ? upcoming.slice(0, limit) : upcoming;
};