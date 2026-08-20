import type { QuizListItem } from '../types/quiz';
import { useNavigate } from 'react-router-dom';

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
          {quiz.questionCount}{' '}
          {quiz.questionCount === 1 ? 'question' : 'questions'}
        </span>
        <span className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-3.5 w-3.5 text-gray-400"
          >
            <path
              fillRule="evenodd"
              d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z"
              clipRule="evenodd"
            />
          </svg>
          {formattedDate}
        </span>
      </div>
    </div>
  );
}

export default QuizCard;
