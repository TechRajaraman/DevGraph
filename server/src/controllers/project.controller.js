import { getProject } from '../services/project.service.js';
export async function getProjectController(req, res, next) { try { const data = await getProject(req.params.id); if (!data) return res.status(404).json({ success: false, error: 'Project not found' }); res.json({ success: true, data }); } catch (error) { next(error); } }
