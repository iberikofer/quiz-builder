import { z } from 'zod';

export const quizSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  questions: z
    .array(
      z.object({
        type: z.enum(['boolean', 'input', 'checkbox']),
        text: z.string().min(1, 'Question text is required'),
        order: z.number().int().min(0),
        correctAnswer: z.string().optional(),
        options: z
          .array(
            z.object({
              text: z.string().min(1, 'Option text is required'),
              isCorrect: z.boolean(),
            }),
          )
          .optional(),
      }),
    )
    .min(1, 'At least one question is required'),
});
