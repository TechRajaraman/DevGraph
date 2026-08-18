import express from 'express';
import cors from 'cors';
import dashboardRoutes from './routes/dashboard.routes.js';
import developerRoutes from './routes/developer.routes.js';
import technologyRoutes from './routes/technology.routes.js';
import careerRoutes from './routes/career.routes.js';
import graphRoutes from './routes/graph.routes.js';
import projectRoutes from './routes/project.routes.js';
import healthRoutes from './routes/health.routes.js';
import { errorMiddleware, notFoundMiddleware } from './middleware/error.middleware.js';

const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/', (_req, res) => res.json({ success: true, service: 'devgraph-api', version: '1.0.0' }));
app.use('/api/health', healthRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/developers', developerRoutes);
app.use('/api/technologies', technologyRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/graph', graphRoutes);
app.use('/api/projects', projectRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
