import { Router } from 'express';
import {
  createQuiz,
  getQuizzes,
  getQuizById,
} from '../controllers/quizController';

const router = Router();

router.post('/', createQuiz);
router.get('/', getQuizzes);
router.get('/:id', getQuizById);

export default router;
