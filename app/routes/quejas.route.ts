import { Router } from 'express';
import { storeQuejasController } from '../controllers/quejas.controller.ts';

const router = Router();

router.post('/', storeQuejasController);

export default router;