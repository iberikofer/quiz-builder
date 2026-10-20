import type { QuizListItem } from '../types/quiz';
import { useNavigate } from 'react-router-dom';
import { TrashIcon, CalendarIcon } from '../assets/svg';

interface QuizCardProps {
  quiz: QuizListItem;
  onDelete: (id: number) => void;
}

function QuizCard({ quiz, onDelete }: QuizCardProps) {
  const navigate = useNavigate();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      onDelete(quiz.id);
    }
  };

  const formattedDate = new Date(quiz.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      onClick={() => navigate(`/quizzes/${quiz.id}`)}
      className="group relative flex cursor-pointer flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
            {quiz.title}
          </h3>
          <button
            onClick={handleDelete}
            className="shrink-0 rounded-lg p-1.5 text-gray-400 opacity-80 transition hover:bg-red-50 hover:text-red-600 hover:opacity-100"
            aria-label="Delete quiz"
            title="Delete quiz"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
          {quiz.questionCount}{' '}
          {quiz.questionCount === 1 ? 'question' : 'questions'}
        </span>
        <span className="flex items-center gap-1">
          <CalendarIcon className="h-3.5 w-3.5 text-gray-400" />
          {formattedDate}
        </span>
      </div>
    </div>
  );
}

export default QuizCard;
