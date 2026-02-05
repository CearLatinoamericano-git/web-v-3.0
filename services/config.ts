import axios, { type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError } from "axios";

/**
 * Configuración de la API
 * Obtiene la URL base desde las variables de entorno o usa un valor por defecto
 * En producción, si VITE_API_URL no está definida, usa URL relativa para mismo servidor
 */
const getApiBaseUrl = (): string => {
  // Si hay una variable de entorno definida, usarla
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // En desarrollo, usar localhost
  if (import.meta.env.DEV) {
    return "http://localhost:3005/api";
  }
  
  // En producción, usar la URL del servidor de producción
  return "https://cearlatinoamericano.edu.pe/app/api";
};

export const API_BASE_URL = getApiBaseUrl();

// Log de la URL base configurada
console.log('[API CONFIG] URL Base configurada:', API_BASE_URL);
console.log('[API CONFIG] Modo desarrollo:', import.meta.env.DEV);
console.log('[API CONFIG] VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);

/**
 * Obtiene el token de autenticación del localStorage
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};

/**
 * Instancia de axios configurada con la URL base
 *
 * NOTA: Si tienes problemas de CORS, prueba cambiar withCredentials a false
 * El servidor debe estar configurado para aceptar credenciales si withCredentials es true
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false, // Cambia a true si el servidor acepta credenciales cross-origin
});

/**
 * Interceptor para agregar el token de autenticación a las peticiones
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log('[AXIOS REQUEST] Petición interceptada:', {
      method: config.method,
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      headers: config.headers,
      hasData: !!config.data,
      dataType: config.data instanceof FormData ? 'FormData' : typeof config.data
    });
    
    const token = getAuthToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Si es FormData, eliminar Content-Type para que axios lo establezca automáticamente
    if (config.data instanceof FormData && config.headers) {
      delete config.headers["Content-Type"];
      console.log('[AXIOS REQUEST] FormData detectado, Content-Type eliminado');
    }

    return config;
  },
  (error: AxiosError) => {
    console.error('[AXIOS REQUEST ERROR] Error en interceptor de request:', error);
    return Promise.reject(error);
  }
);

/**
 * Interceptor para manejar errores de respuesta, incluyendo CORS
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('[AXIOS RESPONSE] Respuesta exitosa:', {
      status: response.status,
      statusText: response.statusText,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error: AxiosError) => {
    console.error('[AXIOS RESPONSE ERROR] Error en respuesta:', {
      message: error.message,
      code: error.code,
      response: error.response ? {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      } : null,
      request: error.request ? {
        url: error.config?.url,
        method: error.config?.method
      } : null
    });
    
    // Manejar errores de CORS específicamente
    if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
      console.error('[AXIOS RESPONSE ERROR] Error de red detectado - posible problema de CORS o servidor no disponible');
      // Si es un error de CORS, puede ser que withCredentials esté causando el problema
      // Intentar sin credenciales si el error persiste
    }
    return Promise.reject(error);
  }
);

