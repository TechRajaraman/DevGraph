import { getTechnology, listTechnologies } from '../services/technology.service.js';
export async function listTechnologiesController(req, res, next) { try { res.json({ success: true, data: await listTechnologies(req.query) }); } catch (error) { next(error); } }
export async function getTechnologyController(req, res, next) { try { const data = await getTechnology(req.params.id); if (!data) return res.status(404).json({ success: false, error: 'Technology not found' }); res.json({ success: true, data }); } catch (error) { next(error); } }
