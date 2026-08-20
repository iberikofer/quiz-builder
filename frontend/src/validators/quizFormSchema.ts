import { z } from 'zod';

export const optionSchema = z.object({
  text: z.string().min(1, 'Option text cannot be empty'),
  isCorrect: z.boolean(),
});

export const questionFormSchema = z
  .object({
    type: z.enum(['boolean', 'input', 'checkbox']),
    text: z.string().min(1, 'Question text cannot be empty'),
    correctAnswer: z.string().optional(),
    options: z.array(optionSchema).optional(),
  })
  .refine(
    (data) => {
      if (data.type === 'checkbox') {
        return (data.options?.length ?? 0) >= 2;
      }
      return true;
    },
    {
      message: 'Checkbox questions must have at least 2 options',
      path: ['options'],
    },
  );

export const quizFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Quiz title is required')
    .max(255, 'Title is too long (max 255 characters)'),
  questions: z
    .array(questionFormSchema)
    .min(1, 'At least one question is required'),
});

export type QuizFormData = z.infer<typeof quizFormSchema>;
export type QuestionFormData = z.infer<typeof questionFormSchema>;
