import { Router } from 'express';
import { developerTraversalController, graphOverviewController, technologyNeighborsController } from '../controllers/graph.controller.js';
const router = Router();
router.get('/overview', graphOverviewController);
router.get('/developers/:id/technologies', developerTraversalController);
router.get('/technologies/:id/neighbors', technologyNeighborsController);
export default router;
