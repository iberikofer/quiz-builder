'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { getQuizzes, deleteQuiz } from '../../services/api';
import type { QuizListItem } from '../../types/quiz';
import QuizCard from '../../components/QuizCard';
import { PlusIcon, EmptyQuizIcon } from '../../assets/svg';
import { useStorageMode } from '../../context/StorageModeContext';

export default function QuizzesPage() {
  const { isLocalMode, refreshLocalCount } = useStorageMode();
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuizzes = async (retryCount = 0) => {
    try {
      if (retryCount === 0) setIsLoading(true);
      setError(null);
      const data = await getQuizzes();
      setQuizzes(data);
      setIsLoading(false);
    } catch (err: unknown) {
      console.error(`Failed to fetch quizzes (attempt ${retryCount + 1})`, err);
      const errObj = err as { response?: { status?: number }; message?: string };
      const isRetryable =
        errObj?.response?.status === 502 || errObj?.message === 'Network Error';
      if (isRetryable && retryCount < 4) {
        setTimeout(() => fetchQuizzes(retryCount + 1), 1500);
      } else {
        setError('Could not load quizzes. Please try again later.');
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [isLocalMode]);

  const handleDelete = async (id: number) => {
    try {
      await deleteQuiz(id);
      toast.success('Quiz deleted successfully');
      refreshLocalCount();
      setQuizzes((prev) => prev.filter((q) => q.id !== id));
    } catch (err: unknown) {
      console.error('Failed to delete quiz', err);
      toast.error('Failed to delete quiz');
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Your Quizzes
          </h1>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
            Manage and create custom quizzes
          </p>
        </div>
        <Link
          href="/create"
          className="inline-flex items-center gap-1.5 rounded-md bg-mint-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-mint-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-600 dark:bg-mint-600 dark:hover:bg-mint-500"
        >
          <PlusIcon className="h-4 w-4" />
          New Quiz
        </Link>
      </div>

      {isLocalMode && (
        <div className="mb-6 flex items-center justify-between rounded-md border border-amber-200/80 bg-amber-50/70 px-4 py-3 text-xs text-amber-900 dark:border-amber-800/50 dark:bg-amber-950/40 dark:text-amber-200">
          <div className="flex items-center gap-2">
            <span className="text-base">🟡</span>
            <span>
              <strong>Локальний режим:</strong> Тести завантажено з пам'яті вашого браузера (Local Storage). Усі зміни зберігаються локально.
            </span>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="flex h-36 animate-pulse flex-col justify-between rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="space-y-2.5">
                <div className="h-5 w-3/4 rounded-md bg-gray-200 dark:bg-gray-800"></div>
                <div className="h-4 w-1/2 rounded-md bg-gray-100 dark:bg-gray-850"></div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
                <div className="h-4 w-20 rounded-md bg-gray-200 dark:bg-gray-800"></div>
                <div className="h-4 w-16 rounded-md bg-gray-100 dark:bg-gray-850"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-600 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
          <p>{error}</p>
          <button
            onClick={() => fetchQuizzes()}
            className="mt-4 rounded-md bg-red-100 px-4 py-2 text-sm font-medium hover:bg-red-200 dark:bg-red-900/60 dark:hover:bg-red-900"
          >
            Try Again
          </button>
        </div>
      ) : quizzes.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-white py-16 text-center dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-md bg-mint-50 text-mint-600 dark:bg-mint-950/60 dark:text-mint-400">
            <EmptyQuizIcon className="h-6 w-6" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            No quizzes yet
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get started by creating your very first quiz!
          </p>
          <div className="mt-6">
            <Link
              href="/create"
              className="inline-flex items-center gap-1.5 rounded-md bg-mint-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-mint-700 dark:bg-mint-600 dark:hover:bg-mint-500"
            >
              <PlusIcon className="h-4 w-4" />
              Create Quiz
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
