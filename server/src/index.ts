import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import quizRoutes from './routes/quizRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check endpoint for Render monitoring
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/quizzes', quizRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
