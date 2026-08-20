export interface Option {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  type: 'boolean' | 'input' | 'checkbox';
  text: string;
  order: number;
  correctAnswer: string | null;
  options: Option[];
}

export interface Quiz {
  id: number;
  title: string;
  createdAt: string;
  questions: Question[];
}

export interface QuizListItem {
  id: number;
  title: string;
  createdAt: string;
  questionCount: number;
}

export interface CreateQuizPayload {
  title: string;
  questions: {
    type: 'boolean' | 'input' | 'checkbox';
    text: string;
    order: number;
    correctAnswer?: string;
    options?: {
      text: string;
      isCorrect: boolean;
    }[];
  }[];
}
