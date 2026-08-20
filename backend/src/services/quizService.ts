import prisma from '../lib/prisma';

export interface CreateQuizDTO {
  title: string;
  questions: {
    type: string;
    text: string;
    order: number;
    correctAnswer?: string;
    options?: {
      text: string;
      isCorrect: boolean;
    }[];
  }[];
}

export const createQuiz = async (data: CreateQuizDTO) => {
  return await prisma.quiz.create({
    data: {
      title: data.title,
      questions: {
        create: data.questions.map((q) => ({
          type: q.type,
          text: q.text,
          order: q.order,
          correctAnswer: q.correctAnswer || null,
          options: q.options
            ? {
                create: q.options.map((o) => ({
                  text: o.text,
                  isCorrect: o.isCorrect,
                })),
              }
            : undefined,
        })),
      },
    },
    include: {
      questions: {
        include: {
          options: true,
        },
      },
    },
  });
};
