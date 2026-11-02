'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { getQuizById, deleteQuiz } from '../../../services/api';
import type { Quiz } from '../../../types/quiz';
import QuestionView from '../../../components/QuestionView';
import { useStorageMode } from '../../../context/StorageModeContext';
import { TrashIcon } from '../../../assets/svg';

export default function QuizDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const router = useRouter();
  const { isLocalMode, refreshLocalCount } = useStorageMode();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        setError(null);
        const data = await getQuizById(Number(id));
        setQuiz(data);
      } catch (err: unknown) {
        console.error('Failed to load quiz details', err);
        setError('Quiz not found or could not be loaded.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleDelete = async () => {
    if (!quiz) return;
    if (!window.confirm('Are you sure you want to delete this quiz?')) return;

    try {
      await deleteQuiz(quiz.id);
      refreshLocalCount();
      toast.success('Quiz deleted successfully');
      router.push('/quizzes');
    } catch (err: unknown) {
      console.error('Failed to delete quiz', err);
      toast.error('Failed to delete quiz');
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">Quiz not found</h2>
        <p className="mt-2 text-sm text-gray-500">
          {error || 'The requested quiz does not exist.'}
        </p>
        <Link
          href="/quizzes"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
        >
          &larr; Back to Quizzes
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(quiz.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/quizzes"
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          &larr; Back to Quizzes
        </Link>

        <button
          onClick={handleDelete}
          className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <TrashIcon className="h-4 w-4" />
          Delete Quiz
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span>
            {quiz.questions.length}{' '}
            {quiz.questions.length === 1 ? 'question' : 'questions'}
          </span>
          <span>•</span>
          <span>Created on {formattedDate}</span>
          {(isLocalMode || quiz.id > 100000) && (
            <>
              <span>•</span>
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-800 border border-amber-200">
                🟡 Local Storage
              </span>
            </>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Questions</h2>
        {quiz.questions.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
            This quiz has no questions.
          </div>
        ) : (
          <div className="space-y-3">
            {quiz.questions.map((question, index) => (
              <QuestionView
                key={question.id || index}
                question={question}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

