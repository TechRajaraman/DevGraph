import { Router } from 'express';
import { developerNetworkController, getDeveloperController, listDevelopersController } from '../controllers/developer.controller.js';
const router = Router();
router.get('/', listDevelopersController);
router.get('/:id/network', developerNetworkController);
router.get('/:id', getDeveloperController);
export default router;
