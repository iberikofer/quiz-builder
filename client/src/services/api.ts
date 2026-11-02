import axios from 'axios';
import type { Quiz, QuizListItem, CreateQuizPayload } from '../types/quiz';
import {
  getLocalQuizzes,
  getLocalQuizById,
  createLocalQuiz,
  deleteLocalQuiz,
} from './localQuizStorage';

const getApiBaseUrl = (): string => {
  let envUrl = '';
  if (typeof process !== 'undefined' && process.env) {
    envUrl = process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL || '';
  }
  return envUrl ? `${envUrl.replace(/\/$/, '')}/api/quizzes` : '/api/quizzes';
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 5000,
});

const isExplicitLocalMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('quiz_builder_storage_mode') === 'local';
};

export const getQuizzes = async (): Promise<QuizListItem[]> => {
  if (isExplicitLocalMode()) {
    return getLocalQuizzes();
  }

  try {
    const { data } = await api.get<QuizListItem[]>('/');
    return data;
  } catch (err) {
    console.warn('Backend unavailable, falling back to browser memory:', err);
    localStorage.setItem('quiz_builder_storage_mode', 'local');
    return getLocalQuizzes();
  }
};

export const getQuizById = async (id: number): Promise<Quiz> => {
  // If id was generated locally (Date.now() timestamp is > 1000000) or explicit local mode
  if (id > 100000 || isExplicitLocalMode()) {
    const local = getLocalQuizById(id);
    if (local) return local;
  }

  try {
    const { data } = await api.get<Quiz>(`/${id}`);
    return data;
  } catch (err) {
    console.warn(`Failed to fetch quiz #${id} from cloud, checking local storage:`, err);
    const local = getLocalQuizById(id);
    if (local) return local;
    throw err;
  }
};

export const createQuiz = async (payload: CreateQuizPayload): Promise<Quiz> => {
  if (isExplicitLocalMode()) {
    return createLocalQuiz(payload);
  }

  try {
    const { data } = await api.post<Quiz>('/', payload);
    return data;
  } catch (err) {
    console.warn('Backend unavailable during creation, saving locally:', err);
    localStorage.setItem('quiz_builder_storage_mode', 'local');
    return createLocalQuiz(payload);
  }
};

export const deleteQuiz = async (id: number): Promise<void> => {
  if (id > 100000 || isExplicitLocalMode()) {
    deleteLocalQuiz(id);
    return;
  }

  try {
    await api.delete(`/${id}`);
  } catch (err) {
    console.warn(`Failed to delete quiz #${id} from cloud, deleting from local:`, err);
    deleteLocalQuiz(id);
  }
};
