import type { Request, Response } from 'express';
import { storeDenuncia } from '../services/denuncia.service';
import type { StoreDenunciaData } from '@/types';

export const storeDenunciaController = async (req: Request, res: Response) => {

    try {

        // Extraer datos del body (multer los parsea automáticamente)
        const {
            correo,
            presunto_hecho,
            fecha_desde,
            fecha_hasta,
            continua,
            involucrados
        } = req.body;

        // Extraer archivos de req.files (multer los coloca aquí)
        const files = req.files as Express.Multer.File[] || [];

        // Convertir archivos al formato esperado por saveMultipleFiles
        const archivos = files.map((file) => ({
            nombre: file.originalname,
            buffer: file.buffer,
        }));

        // Preparar los datos en el formato esperado por el servicio
        const data: StoreDenunciaData = {
            correo: correo as string,
            presunto_hecho: presunto_hecho as string,
            fecha_desde: new Date(fecha_desde as string),
            fecha_hasta: fecha_hasta ? new Date(fecha_hasta as string) : undefined,
            continua: continua === 'true' || continua === true,
            involucrados: involucrados as string,
            archivos: archivos.length > 0 ? archivos : undefined,
        };

        await storeDenuncia(data);

        return res.status(201).json({ status: 201, message: 'Caso creado correctamente', success: true });

    } catch (error) {

        return res.status(500).json({ status: 500, message: 'Error al crear el caso', error: (error as Error).message });

    }

}
