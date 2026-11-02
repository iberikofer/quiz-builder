import type { Quiz, QuizListItem, CreateQuizPayload, Option, Question } from '../types/quiz';

const LOCAL_STORAGE_KEY = 'quiz_builder_local_quizzes_v1';

// Initial realistic sample quizzes so users have rich content to inspect immediately
const INITIAL_LOCAL_QUIZZES: Quiz[] = [
  {
    id: 101,
    title: 'JavaScript Core & Fundamentals',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    questions: [
      {
        id: 1001,
        type: 'boolean',
        text: 'In JavaScript, is `typeof null === "object"` true?',
        order: 0,
        correctAnswer: 'True',
        options: [],
      },
      {
        id: 1002,
        type: 'checkbox',
        text: 'Which of the following are primitive types in JavaScript?',
        order: 1,
        correctAnswer: null,
        options: [
          { id: 2001, text: 'String', isCorrect: true },
          { id: 2002, text: 'Symbol', isCorrect: true },
          { id: 2003, text: 'Array', isCorrect: false },
          { id: 2004, text: 'BigInt', isCorrect: true },
        ],
      },
      {
        id: 1003,
        type: 'input',
        text: 'What keyword declares a block-scoped variable that cannot be reassigned?',
        order: 2,
        correctAnswer: 'const',
        options: [],
      },
    ],
  },
  {
    id: 102,
    title: 'React & Modern Frontend Architecture',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    questions: [
      {
        id: 1004,
        type: 'boolean',
        text: 'React components re-render whenever their state or props change.',
        order: 0,
        correctAnswer: 'True',
        options: [],
      },
      {
        id: 1005,
        type: 'checkbox',
        text: 'Which React Hooks are built into React by default?',
        order: 1,
        correctAnswer: null,
        options: [
          { id: 2005, text: 'useState', isCorrect: true },
          { id: 2006, text: 'useEffect', isCorrect: true },
          { id: 2007, text: 'useQuery', isCorrect: false },
          { id: 2008, text: 'useMemo', isCorrect: true },
        ],
      },
    ],
  },
];

// Helper to safely load quizzes from localStorage
export const getStoredLocalQuizzes = (): Quiz[] => {
  if (typeof window === 'undefined') return INITIAL_LOCAL_QUIZZES;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      // First time initializing: seed sample quizzes
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_LOCAL_QUIZZES));
      return INITIAL_LOCAL_QUIZZES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_LOCAL_QUIZZES;
  } catch (err) {
    console.error('Failed to read quizzes from localStorage:', err);
    return INITIAL_LOCAL_QUIZZES;
  }
};

// Helper to save quizzes to localStorage
const saveStoredLocalQuizzes = (quizzes: Quiz[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(quizzes));
  } catch (err) {
    console.error('Failed to save quizzes to localStorage:', err);
  }
};

// 1. Get list of all local quizzes
export const getLocalQuizzes = (): QuizListItem[] => {
  const quizzes = getStoredLocalQuizzes();
  return quizzes.map((q) => ({
    id: q.id,
    title: q.title,
    createdAt: q.createdAt,
    questionCount: q.questions.length,
  }));
};

// 2. Get single quiz by ID
export const getLocalQuizById = (id: number): Quiz | null => {
  const quizzes = getStoredLocalQuizzes();
  return quizzes.find((q) => q.id === id) || null;
};

// 3. Create new quiz in localStorage
export const createLocalQuiz = (payload: CreateQuizPayload): Quiz => {
  const quizzes = getStoredLocalQuizzes();
  const newQuizId = Date.now();

  const formattedQuestions: Question[] = payload.questions.map((q, qIndex) => {
    const questionId = newQuizId * 100 + qIndex;
    const formattedOptions: Option[] = (q.options || []).map((opt, optIndex) => ({
      id: questionId * 10 + optIndex,
      text: opt.text,
      isCorrect: Boolean(opt.isCorrect),
    }));

    return {
      id: questionId,
      type: q.type,
      text: q.text,
      order: q.order ?? qIndex,
      correctAnswer: q.correctAnswer ?? null,
      options: formattedOptions,
    };
  });

  const newQuiz: Quiz = {
    id: newQuizId,
    title: payload.title,
    createdAt: new Date().toISOString(),
    questions: formattedQuestions,
  };

  const updated = [newQuiz, ...quizzes];
  saveStoredLocalQuizzes(updated);
  return newQuiz;
};

// 4. Delete quiz from localStorage
export const deleteLocalQuiz = (id: number): boolean => {
  const quizzes = getStoredLocalQuizzes();
  const filtered = quizzes.filter((q) => q.id !== id);
  saveStoredLocalQuizzes(filtered);
  return filtered.length < quizzes.length;
};

// 5. Total count of stored local quizzes
export const getLocalQuizCount = (): number => {
  return getStoredLocalQuizzes().length;
};

