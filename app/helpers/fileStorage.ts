import fs from 'fs';
import path from 'path';
import { SaveFileOptions, SaveMultipleFilesOptions } from '@/types';

export const saveFile = ({
  baseFolder = 'public',
  nombre,
  subfolder = '',
  filename,
  buffer,
  codigo,
}: SaveFileOptions) => {

  // 1. Construcción de rutas
  // Si se proporciona un código, usarlo en la estructura de carpetas
  const folderStructure = codigo 
    ? path.join(nombre, codigo, subfolder)
    : path.join(nombre, subfolder);
  
  const relativeDir = path.join(baseFolder, folderStructure);
  const absoluteDir = path.join(process.cwd(), relativeDir);

  // 2. Crear carpeta si no existe
  fs.mkdirSync(absoluteDir, { recursive: true });

  // 3. Construir la ruta final del archivo
  const relativeFilePath = path.join(relativeDir, filename);
  const absoluteFilePath = path.join(process.cwd(), relativeFilePath);

  // 4. Guardar archivo
  fs.writeFileSync(absoluteFilePath, buffer);

  // 5. Retornar rutas por si las necesitas
  return {
    relativePath: relativeFilePath,
    absolutePath: absoluteFilePath,
  };
};

/**
 * Guarda múltiples archivos en una carpeta basada en un código
 * Maneja automáticamente nombres duplicados agregando un índice
 * @param options Opciones para guardar múltiples archivos
 * @returns Array de rutas relativas de los archivos guardados
 */
export const saveMultipleFiles = ({
  baseFolder = 'public',
  nombre,
  subfolder = '',
  codigo,
  archivos,
}: SaveMultipleFilesOptions): string[] => {
  const archivosGuardados: string[] = [];

  if (!archivos || archivos.length === 0) {
    return archivosGuardados;
  }

  // Mapa para rastrear nombres de archivos y evitar duplicados
  const nombresUsados = new Map<string, number>();

  for (let i = 0; i < archivos.length; i++) {
    const archivo = archivos[i];
    
    // Generar nombre único si hay duplicados
    let nombreFinal = archivo.nombre;
    if (nombresUsados.has(archivo.nombre)) {
      const contador = nombresUsados.get(archivo.nombre)! + 1;
      nombresUsados.set(archivo.nombre, contador);
      
      // Extraer extensión y nombre base
      const ultimoPunto = archivo.nombre.lastIndexOf('.');
      if (ultimoPunto > 0) {
        const nombreBase = archivo.nombre.substring(0, ultimoPunto);
        const extension = archivo.nombre.substring(ultimoPunto);
        nombreFinal = `${nombreBase}_${contador}${extension}`;
      } else {
        nombreFinal = `${archivo.nombre}_${contador}`;
      }
    } else {
      nombresUsados.set(archivo.nombre, 0);
    }
    
    // Guardar cada archivo usando la función saveFile
    const { relativePath } = saveFile({
      baseFolder,
      nombre,
      codigo,
      subfolder,
      filename: nombreFinal,
      buffer: archivo.buffer,
    });

    // Almacenar la ruta relativa en el array
    archivosGuardados.push(relativePath);
  }

  return archivosGuardados;
};
