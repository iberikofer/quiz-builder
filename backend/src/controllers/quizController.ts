import { Request, Response } from 'express';
import * as quizService from '../services/quizService';

export const createQuiz = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (
      !req.body.title ||
      !req.body.questions ||
      !Array.isArray(req.body.questions)
    ) {
      res.status(400).json({ error: 'Title and questions array are required' });
      return;
    }

    const quiz = await quizService.createQuiz(req.body);
    res.status(201).json(quiz);
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
