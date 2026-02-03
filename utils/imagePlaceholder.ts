/**
 * Genera un placeholder gris para imágenes faltantes
 * @param width Ancho de la imagen (opcional, default: 400)
 * @param height Alto de la imagen (opcional, default: 300)
 * @returns URL de una imagen placeholder gris
 */
export function getGrayPlaceholder(width: number = 400, height: number = 300): string {
  // Usar un servicio de placeholder o generar un data URL SVG gris
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3Crect width='100%25' height='100%25' fill='%23999'/%3E%3C/svg%3E`;
}

// Placeholder genérico para uso común
export const grayPlaceholder = getGrayPlaceholder();

