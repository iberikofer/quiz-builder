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

export const getQuizzes = async () => {
  const quizzes = await prisma.quiz.findMany({
    include: {
      _count: {
        select: { questions: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return quizzes.map((quiz) => ({
    id: quiz.id,
    title: quiz.title,
    createdAt: quiz.createdAt,
    questionCount: quiz._count.questions,
  }));
};

export const getQuizById = async (id: number) => {
  return await prisma.quiz.findUnique({
    where: { id },
    include: {
      questions: {
        orderBy: { order: 'asc' },
        include: {
          options: true,
        },
      },
    },
  });
};

export const deleteQuiz = async (id: number) => {
  return await prisma.quiz.delete({
    where: { id },
  });
};
