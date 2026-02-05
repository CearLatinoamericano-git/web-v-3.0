import { Router } from 'express';
import multer from 'multer';
import { storeDenunciaController } from '../controllers/denuncia.controller.ts';

const router = Router();

// Configurar multer para manejar archivos en memoria
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB por archivo
  },
});

// Permitir múltiples archivos con el campo 'archivos'
router.post('/', upload.array('archivos', 5), storeDenunciaController);

export default router;