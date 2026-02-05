import { apiClient, API_BASE_URL } from './config';

/**
 * Tipos de datos para solicitudes (mantenidos para compatibilidad)
 */
export interface ContactFormData {
  nombre: string;
  celular: string;
  email: string;
  dni?: string;
  mensaje: string;
  asunto?: string;
  es_curso?: boolean;
  estado_politica: boolean;
}

export interface CourseSolicitationData {
  curso_id?: string;
  curso_nombre?: string;
  nombre: string;
  celular: string;
  correo: string;
  profesion?: string;
  motivo?: string;
  ingresos?: string;
  acuerdo_inversion?: string;
  acuerdo_virtual?: string;
  fecha_solicitud?: string;
  estado?: string;
  ip_usuario?: string;
  user_agent?: string;
  origen?: string;
}

export interface SuggestionComplaintData {
  nombre: string;
  celular: string;
  email: string;
  mensaje: string;
  estado_politica: boolean;
  es_sugerencia: boolean;
}

/**
 * Envía un mensaje de contacto al endpoint /contacto
 * @param data Datos del formulario de contacto
 * @returns Promise con la respuesta del servidor
 */
export async function storeContacto(data: ContactFormData): Promise<any> {
  console.log('[storeContacto] Función llamada con datos:', data);
  try {
    // Si el asunto viene directamente en los datos, usarlo
    // Si no, intentar extraerlo del mensaje (formato: "Asunto: ...\n\nMensaje")
    let asunto = data.asunto || '';
    let mensaje = data.mensaje;
    
    if (!asunto && data.mensaje.includes('Asunto:')) {
      const partes = data.mensaje.split('\n\n');
      if (partes.length > 0) {
        asunto = partes[0].replace('Asunto:', '').trim();
        mensaje = partes.slice(1).join('\n\n').trim();
      }
    }

    // Preparar datos según lo que espera el backend
    const contactoData = {
      nombre_completo: data.nombre,
      celular: data.celular,
      email: data.email,
      asunto: asunto || undefined,
      mensaje: mensaje,
      dni: data.dni || undefined,
      estado_politica: data.estado_politica,
    };

    const rutaCompleta = `${API_BASE_URL}/contacto`;
    console.log(`[API] Llamando a la ruta del backend: ${rutaCompleta}`);
    console.log(`[API] Método: POST`);
    console.log(`[API] Endpoint: /contacto`);
    console.log(`[API] API_BASE_URL:`, API_BASE_URL);
    console.log(`[API] Datos a enviar:`, contactoData);

    console.log(`[API] Realizando petición POST...`);
    const response = await apiClient.post('/contacto', contactoData);
    console.log(`[API] Respuesta recibida:`, response);
    return response.data;
  } catch (error: any) {
    console.error('Error al enviar contacto:', error);
    if (error.response) {
      const errorMessage = error.response.data?.message || `Error ${error.response.status}: ${error.response.statusText}`;
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error('No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.');
    } else {
      throw new Error(error.message || 'Error al enviar el mensaje de contacto');
    }
  }
}

/**
 * Envía una queja o sugerencia al endpoint /quejas
 * @param data Datos del formulario de queja/sugerencia
 * @returns Promise con la respuesta del servidor
 */
export async function storeQuejas(data: SuggestionComplaintData): Promise<any> {
  console.log('[storeQuejas] Función llamada con datos:', data);
  try {
    // Convertir es_sugerencia (boolean) a tipo_queja (string)
    const tipo_queja = data.es_sugerencia ? 'Sugerencia' : 'Reclamo';

    // Preparar datos según lo que espera el backend
    const quejasData = {
      tipo_queja: tipo_queja,
      nombre_completo: data.nombre,
      email: data.email,
      celular: data.celular,
      mensaje: data.mensaje,
      estado_politica: data.estado_politica,
    };

    const rutaCompleta = `${API_BASE_URL}/quejas`;
    console.log(`[API] Llamando a la ruta del backend: ${rutaCompleta}`);
    console.log(`[API] Método: POST`);
    console.log(`[API] Endpoint: /quejas`);
    console.log(`[API] API_BASE_URL:`, API_BASE_URL);
    console.log(`[API] Datos a enviar:`, quejasData);

    console.log(`[API] Realizando petición POST...`);
    const response = await apiClient.post('/quejas', quejasData);
    console.log(`[API] Respuesta recibida:`, response);
    return response.data;
  } catch (error: any) {
    console.error('Error al enviar queja/sugerencia:', error);
    if (error.response) {
      const errorMessage = error.response.data?.message || `Error ${error.response.status}: ${error.response.statusText}`;
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error('No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.');
    } else {
      throw new Error(error.message || 'Error al enviar la queja/sugerencia');
    }
  }
}

/**
 * Obtiene la IP del usuario y el User-Agent para tracking
 */
export function getTrackingData() {
  return {
    ip_usuario: '', // Se puede obtener desde un servicio externo si es necesario
    user_agent: navigator.userAgent,
  };
}

