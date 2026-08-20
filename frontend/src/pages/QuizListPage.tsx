import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getQuizzes, deleteQuiz } from '../services/api';
import type { QuizListItem } from '../types/quiz';
import QuizCard from '../components/QuizCard';

function QuizListPage() {
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuizzes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getQuizzes();
      setQuizzes(data);
    } catch (err: unknown) {
      console.error('Failed to fetch quizzes', err);
      setError('Could not load quizzes. Please try again later.');
    } finally {
      setIsLoading(false);
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
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
            onClick={fetchQuizzes}
            className="mt-4 rounded-md bg-red-100 px-4 py-2 text-sm font-medium hover:bg-red-200"
          >
            Try Again
          </button>
        </div>
      ) : quizzes.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white py-20 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
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
