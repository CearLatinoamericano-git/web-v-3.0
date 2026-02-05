import type { Request, Response } from 'express';
import { storeQuejas } from '../services/quejas.service';

export const storeQuejasController = async (req: Request, res: Response) => {

    try {
        
        const data = req.body;
        await storeQuejas(data);
        return res.status(201).json({ status: 201, message: 'Queja creada correctamente', success: true });

    } catch (error) {

        return res.status(500).json({ status: 500, message: 'Error al crear la queja', error: (error as Error).message });

    }

}