import type { Request, Response } from 'express';
import { storeContacto } from '../services/contacto.service';

export const storeContactoController = async (req: Request, res: Response) => {

    try {
        const data = req.body;
        
        // Validar que los datos requeridos estén presentes
        if (!data.nombre_completo || !data.celular || !data.email || !data.mensaje || data.estado_politica === undefined) {
            return res.status(400).json({ 
                status: 400, 
                message: 'Datos incompletos', 
                success: false,
                required_fields: ['nombre_completo', 'celular', 'email', 'mensaje', 'estado_politica']
            });
        }

        await storeContacto(data);
        
        return res.status(201).json({ status: 201, message: 'Mensaje creado correctamente', success: true });

    } catch (error) {
        return res.status(500).json({ 
            status: 500, 
            message: 'Error al crear el mensaje', 
            error: (error as Error).message,
            success: false
        });

    }
    
}