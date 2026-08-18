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
const allowedOrigins = new Set([
  'http://localhost:5173',
  'https://dev-graph-tau.vercel.app',
  'https://www.dev-graph-tau.vercel.app'
]);

app.disable('x-powered-by');
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options(/.*/, cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
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
