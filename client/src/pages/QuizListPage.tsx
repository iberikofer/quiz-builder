import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getQuizzes, deleteQuiz } from '../services/api';
import type { QuizListItem } from '../types/quiz';
import QuizCard from '../components/QuizCard';
import { PlusIcon, EmptyQuizIcon } from '../assets/svg';

function QuizListPage() {
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
      const error = err as { response?: { status?: number }; message?: string };
      const isRetryable =
        error?.response?.status === 502 || error?.message === 'Network Error';
      if (isRetryable && retryCount < 5) {
        setTimeout(() => fetchQuizzes(retryCount + 1), 1500);
      } else {
        setError('Could not load quizzes. Please try again later.');
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteQuiz(id);
      toast.success('Quiz deleted successfully');
      setQuizzes((prev) => prev.filter((q) => q.id !== id));
    } catch (err: unknown) {
      console.error('Failed to delete quiz', err);
      toast.error('Failed to delete quiz');
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Your Quizzes
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and create custom quizzes
          </p>
        </div>
        <Link
          to="/create"
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <PlusIcon className="h-4 w-4" />
          New Quiz
        </Link>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="flex h-36 animate-pulse flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="space-y-2.5">
                <div className="h-5 w-3/4 rounded-md bg-gray-200"></div>
                <div className="h-4 w-1/2 rounded-md bg-gray-100"></div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <div className="h-5 w-20 rounded-full bg-gray-200"></div>
                <div className="h-4 w-16 rounded-md bg-gray-100"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
          <p>{error}</p>
          <button
            onClick={() => fetchQuizzes()}
            className="mt-4 rounded-md bg-red-100 px-4 py-2 text-sm font-medium hover:bg-red-200"
          >
            Try Again
          </button>
        </div>
      ) : quizzes.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white py-20 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <EmptyQuizIcon className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            No quizzes yet
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating your first quiz.
          </p>
          <Link
            to="/create"
            className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500"
          >
            Create Quiz
          </Link>
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

export default QuizListPage;
