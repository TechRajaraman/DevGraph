import { getDashboard } from '../services/dashboard.service.js';
export async function dashboardController(_req, res, next) { try { res.json({ success: true, data: await getDashboard() }); } catch (error) { next(error); } }
