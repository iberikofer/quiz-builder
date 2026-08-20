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
    } catch (err) {
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
    } catch (err) {
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

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center text-red-600">
        <p>{error}</p>
        <button
          onClick={fetchQuizzes}
          className="mt-4 rounded-md bg-red-100 px-4 py-2 text-sm font-medium hover:bg-red-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white py-24 text-center">
        <h2 className="text-xl font-semibold text-gray-900">No quizzes yet</h2>
        <p className="mt-2 text-gray-500">
          Get started by creating your first quiz.
        </p>
        <Link
          to="/create"
          className="mt-6 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Create Quiz
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Your Quizzes</h1>
        <Link
          to="/create"
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          New Quiz
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default QuizListPage;
