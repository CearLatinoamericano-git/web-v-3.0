import { Router } from 'express';
import { storeContactoController } from '../controllers/contacto.controller.ts';

const router = Router();

router.post('/', storeContactoController);

export default router;