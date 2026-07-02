import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js';
import { asyncHandler } from './middleware/errorHandler.js';
import parkRoutes from './routes/parks.js';
import eventRoutes from './routes/events.js';
import adminRoutes from './routes/admin.js';

const app: express.Express = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/parks', parkRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/admin', adminRoutes);

app.use((_req: Request, _res: Response, _next: NextFunction) => {
  throw new Error('Not Found');
});

app.use(errorHandler);

export default app;