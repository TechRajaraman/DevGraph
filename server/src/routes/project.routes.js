import { Router } from 'express';
import { getProjectController } from '../controllers/project.controller.js';
const router = Router();
router.get('/:id', getProjectController);
export default router;
