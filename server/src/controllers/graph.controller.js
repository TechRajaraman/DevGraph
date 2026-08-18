import { getDeveloperTechnologyTraversal, getGraphOverview, getTechnologyNeighbors } from '../services/graph.service.js';
export async function developerTraversalController(req, res, next) { try { res.json({ success: true, data: await getDeveloperTechnologyTraversal(req.params.id) }); } catch (error) { next(error); } }
export async function technologyNeighborsController(req, res, next) { try { res.json({ success: true, data: await getTechnologyNeighbors(req.params.id) }); } catch (error) { next(error); } }
export async function graphOverviewController(req, res, next) { try { res.json({ success: true, data: await getGraphOverview(req.query.limit) }); } catch (error) { next(error); } }
