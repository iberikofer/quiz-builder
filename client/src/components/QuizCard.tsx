'use client';

import type { QuizListItem } from '../types/quiz';
import { useRouter } from 'next/navigation';
import { TrashIcon, CalendarIcon } from '../assets/svg';

interface QuizCardProps {
  quiz: QuizListItem;
  onDelete: (id: number) => void;
}

function QuizCard({ quiz, onDelete }: QuizCardProps) {
  const router = useRouter();

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
      onClick={() => router.push(`/quizzes/${quiz.id}`)}
      className="group relative flex cursor-pointer flex-col justify-between rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 ease-out transform-gpu hover:-translate-y-0.5 hover:border-mint-400 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-mint-600 after:absolute after:inset-x-0 after:-bottom-2 after:h-2 after:content-['']"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-gray-900 transition-colors group-hover:text-mint-600 dark:text-white dark:group-hover:text-mint-400">
            {quiz.title}
          </h3>
          <button
            onClick={handleDelete}
            className="shrink-0 rounded-md p-1.5 text-gray-400 opacity-80 transition hover:bg-red-50 hover:text-red-600 hover:opacity-100 dark:hover:bg-red-950/50 dark:hover:text-red-400"
            aria-label="Delete quiz"
            title="Delete quiz"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
        <span className="inline-flex items-center rounded-md bg-mint-50 px-2 py-0.5 text-xs font-semibold text-mint-700 dark:bg-mint-950/60 dark:text-mint-400">
          {quiz.questionCount}{' '}
          {quiz.questionCount === 1 ? 'question' : 'questions'}
        </span>
        <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
          <CalendarIcon className="h-3.5 w-3.5" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}

export default QuizCard;
