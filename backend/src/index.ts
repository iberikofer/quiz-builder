import express from 'express';
import cors from 'cors';
import quizRoutes from './routes/quizRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/quizzes', quizRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
