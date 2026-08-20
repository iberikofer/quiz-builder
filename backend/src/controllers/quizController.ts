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

export const getQuizzes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const quizzes = await quizService.getQuizzes();
    res.status(200).json(quizzes);
  } catch (error) {
    console.error('Error getting quizzes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getQuizById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }

    const quiz = await quizService.getQuizById(id);
    if (!quiz) {
      res.status(404).json({ error: 'Quiz not found' });
      return;
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error('Error getting quiz by id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
