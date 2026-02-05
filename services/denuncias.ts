import { apiClient, API_BASE_URL } from "./config";

/**
 * Datos del formulario de denuncia
 */
export interface DenunciaFormData {
  hecho: string; // Presunto hecho irregular
  desde: string; // Fecha desde (YYYY-MM-DD)
  hasta?: string; // Fecha hasta (YYYY-MM-DD) - opcional
  continua: "1" | "0"; // Si continúa ocurriendo
  involucrados: string; // Datos de involucrados
  correo: string; // Correo del denunciante
  prueba: File[]; // Archivos de prueba (máx 5)
}

/**
 * Valida los archivos antes de enviar
 */
function validateFiles(files: File[]): { valid: boolean; error?: string } {
  if (files.length === 0) {
    return { valid: true }; // Los archivos son opcionales según la documentación
  }

  if (files.length > 5) {
    return { valid: false, error: "Máximo 5 archivos permitidos" };
  }

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  const maxSize = 10 * 1024 * 1024; // 10 MB

  for (const file of files) {
    // Validar tipo de archivo
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `Tipo de archivo no permitido: ${file.name}. Solo se permiten PDF, DOC, DOCX, JPG, PNG`,
      };
    }

    // Validar tamaño
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `El archivo ${file.name} excede el tamaño máximo de 10 MB`,
      };
    }
  }

  return { valid: true };
}

/**
 * Envía una denuncia
 * @param data Datos del formulario de denuncia
 * @returns Promise con la respuesta del servidor
 */
export async function storeDenuncias(data: DenunciaFormData): Promise<any> {
  console.log('[storeDenuncias] Función llamada con datos:', data);
  
  // Validar archivos
  const validation = validateFiles(data.prueba);
  console.log('[storeDenuncias] Validación de archivos:', validation);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  try {
    console.log('[storeDenuncias] Creando FormData...');
    // Crear FormData con los campos que espera el backend
    const formData = new FormData();
    formData.append("presunto_hecho", data.hecho);
    formData.append("fecha_desde", data.desde);
    if (data.hasta) {
      formData.append("fecha_hasta", data.hasta);
    }
    // Convertir '1'/'0' a boolean
    formData.append("continua", data.continua === "1" ? "true" : "false");
    formData.append("involucrados", data.involucrados);
    formData.append("correo", data.correo);

    // Agregar archivos - el backend espera archivos en el campo 'archivos'
    data.prueba.forEach((file) => {
      formData.append("archivos", file);
    });

    const rutaCompleta = `${API_BASE_URL}/denuncia`;
    console.log(`[API] Llamando a la ruta del backend: ${rutaCompleta}`);
    console.log(`[API] Método: POST`);
    console.log(`[API] Endpoint: /denuncia`);
    console.log(`[API] API_BASE_URL:`, API_BASE_URL);
    console.log(`[API] Datos del FormData:`, {
      presunto_hecho: formData.get('presunto_hecho'),
      fecha_desde: formData.get('fecha_desde'),
      fecha_hasta: formData.get('fecha_hasta'),
      continua: formData.get('continua'),
      involucrados: formData.get('involucrados'),
      correo: formData.get('correo'),
      archivos_count: formData.getAll('archivos').length
    });

    console.log(`[API] Realizando petición POST...`);
    const response = await apiClient.post("/denuncia", formData);
    console.log(`[API] Respuesta recibida:`, response);

    return response.data;
  } catch (error: any) {
    console.error("Error al enviar denuncia:", error);
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      const errorMessage =
        error.response.data?.message ||
        `Error ${error.response.status}: ${error.response.statusText}`;
      throw new Error(errorMessage);
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      throw new Error(
        "No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet."
      );
    } else {
      // Algo más causó el error
      throw new Error(error.message || "Error al enviar la denuncia");
    }
  }
}

