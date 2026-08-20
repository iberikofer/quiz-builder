import { Router } from 'express';
import { createQuiz } from '../controllers/quizController';

const router = Router();

router.post('/', createQuiz);

export default router;
