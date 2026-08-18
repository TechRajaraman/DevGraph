import { Router } from 'express';
import { getTechnologyController, listTechnologiesController } from '../controllers/technology.controller.js';
const router = Router();
router.get('/', listTechnologiesController);
router.get('/:id', getTechnologyController);
export default router;
