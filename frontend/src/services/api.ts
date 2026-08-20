import axios from 'axios';
import type { Quiz, QuizListItem, CreateQuizPayload } from '../types/quiz';

const api = axios.create({
  baseURL: '/quizzes',
});

export const getQuizzes = async (): Promise<QuizListItem[]> => {
  const { data } = await api.get<QuizListItem[]>('/');
  return data;
};

export const getQuizById = async (id: number): Promise<Quiz> => {
  const { data } = await api.get<Quiz>(`/${id}`);
  return data;
};

export const createQuiz = async (payload: CreateQuizPayload): Promise<Quiz> => {
  const { data } = await api.post<Quiz>('/', payload);
  return data;
};

export const deleteQuiz = async (id: number): Promise<void> => {
  await api.delete(`/${id}`);
};
