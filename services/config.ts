import axios from "axios";

/**
 * Configuración de la API
 * Obtiene la URL base desde las variables de entorno o usa un valor por defecto
 * En producción, si VITE_API_URL no está definida, usa URL relativa para mismo servidor
 */
const getApiBaseUrl = (): string => {
  // Si hay una variable de entorno definida, usarla
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // En desarrollo, usar localhost
  if (import.meta.env.DEV) {
    return "http://localhost:3005/api";
  }
  
  // En producción, usar la URL del servidor de producción
  return "https://cearlatinoamericano.edu.pe/app/api";
};

export const API_BASE_URL = getApiBaseUrl();

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
  (config: any) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Si es FormData, eliminar Content-Type para que axios lo establezca automáticamente
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor para manejar errores de respuesta, incluyendo CORS
 */
apiClient.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    // Manejar errores de CORS específicamente
    if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
      // Si es un error de CORS, puede ser que withCredentials esté causando el problema
      // Intentar sin credenciales si el error persiste
    }
    return Promise.reject(error);
  }
);

