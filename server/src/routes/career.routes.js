import { Router } from 'express';
import { careerOptionsController, careerPathController, careerRecommendationsController } from '../controllers/career.controller.js';
const router = Router();
router.get('/options', careerOptionsController);
router.get('/path', careerPathController);
router.get('/recommendations', careerRecommendationsController);
export default router;
