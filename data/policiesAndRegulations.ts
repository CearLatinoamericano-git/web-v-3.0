/**
 * Políticas y Reglamentos de CEAR Latinoamericano
 * 
 * Este archivo centraliza todos los enlaces a políticas, reglamentos y certificaciones
 * utilizados en el proyecto para mantener la escalabilidad y facilitar el mantenimiento.
 */

export interface Policy {
  id: string;
  title: string;
  url: string;
}

export interface Regulation {
  id: string;
  title: string;
  url: string;
  variant?: {
    year?: string; // Versión con año específico (ej: "2024")
    url: string;
  };
}

/**
 * Políticas de CEAR Latinoamericano
 */
export const policies: Policy[] = [
  {
    id: 'PO-01',
    title: 'Política de Gestión de Calidad',
    url: 'https://cearlatinoamericano.edu.pe/sisdocs/docs/politicas/PO-01-Politica-SGC-V1-18.11.22.pdf'
  },
  {
    id: 'PO-02',
    title: 'Política del Sistema de Gestión AntiSoborno',
    url: 'https://cearlatinoamericano.edu.pe/sisdocs/docs/politicas/PO-02-Politica-SGAS-V1-18.11.22.pdf'
  },
  {
    id: 'PO-03',
    title: 'Política de Protección a los Trabajadores',
    url: 'https://cearlatinoamericano.edu.pe/sisdocs/docs/politicas/PO-03-Politica-de-Proteccion.pdf'
  },
  {
    id: 'PO-04',
    title: 'Política de Regalos, Atenciones y Cortesías',
    url: 'https://cearlatinoamericano.edu.pe/sisdocs/docs/politicas/PO-04-Política-de-Regalos-22.11.pdf'
  },
  {
    id: 'PO-05',
    title: 'Política del Sistema de Gestión de Seguridad de la Información',
    url: 'https://cearlatinoamericano.edu.pe/sisdocs/docs/politicas/PO-05 Politica SGSI.pdf'
  },
  {
    id: 'PO-14',
    title: 'Política de Seguridad de Proveedores',
    url: 'https://cearlatinoamericano.edu.pe/sisdocs/docs/politicas/PO-14 Politica de seguridad de proveedores.pdf'
  },
  {
    id: 'PO-19',
    title: 'Política de Privacidad de Datos',
    url: 'https://cearlatinoamericano.edu.pe/sisdocs/docs/politicas/PO-19 Politica de Privacidad de Datos.pdf'
  },
  {
    id: 'PO-11',
    title: 'Política de Gestión de Incidentes',
    url: 'https://cearlatinoamericano.edu.pe/sisdocs/docs/politicas/PO-11 Política de gestión de incidentes.pdf'
  },
  {
    id: 'CODIGO-ETICA',
    title: 'Código de Ética',
    url: 'https://cearlatinoamericano.edu.pe/sisdocs/docs/politicas/Código de Ética.pdf'
  }
];

/**
 * Reglamentos de CEAR Latinoamericano
 */
export const regulations: Regulation[] = [
  {
    id: 'REG-ACADEMICO',
    title: 'Reglamento Académico',
    url: 'https://cearlatinoamericano.edu.pe/sisdocs/docs/reglamentos/REGLAMENTO ACADÉMICO.pdf',
    variant: {
      year: '2024',
      url: 'https://cearlatinoamericano.edu.pe/sisdocs/docs/reglamentos/REGLAMENTO ACADÉMICO 2024.pdf'
    }
  },
  {
    id: 'REG-ETICO',
    title: 'Reglamento Ético',
    url: 'https://cearlatinoamericano.edu.pe/sisdocs/docs/reglamentos/REGLAMENTO-ETICO.pdf'
  }
];

/**
 * Función helper para obtener la URL de un reglamento
 * @param regulation - El reglamento del cual obtener la URL
 * @param useVariant - Si es true y existe una variante, devuelve la URL de la variante (por ejemplo, con año)
 * @returns La URL del reglamento
 */
export function getRegulationUrl(regulation: Regulation, useVariant: boolean = false): string {
  if (useVariant && regulation.variant) {
    return regulation.variant.url;
  }
  return regulation.url;
}

/**
 * Función helper para obtener una política por ID
 */
export function getPolicyById(id: string): Policy | undefined {
  return policies.find(policy => policy.id === id);
}

/**
 * Función helper para obtener un reglamento por ID
 */
export function getRegulationById(id: string): Regulation | undefined {
  return regulations.find(regulation => regulation.id === id);
}

