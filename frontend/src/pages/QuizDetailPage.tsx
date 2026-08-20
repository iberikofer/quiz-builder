import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getQuizById, deleteQuiz } from '../services/api';
import type { Quiz } from '../types/quiz';
import QuestionView from '../components/QuestionView';

function QuizDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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
      toast.success('Quiz deleted successfully');
      navigate('/quizzes');
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
          to="/quizzes"
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
          to="/quizzes"
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          &larr; Back to Quizzes
        </Link>

        <button
          onClick={handleDelete}
          className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
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
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Questions</h2>
        {quiz.questions.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
            This quiz has no questions.
          </div>
        ) : (
          quiz.questions.map((question, index) => (
            <QuestionView key={question.id} question={question} index={index} />
          ))
        )}
      </div>
    </div>
  );
}

export default QuizDetailPage;
