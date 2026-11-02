import type { Question } from '../types/quiz';
import { CheckIcon } from '../assets/svg';

interface QuestionViewProps {
  question: Question;
  index: number;
}

function QuestionView({ question, index }: QuestionViewProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-mint-50 text-xs font-bold text-mint-700 dark:bg-mint-950/60 dark:text-mint-400">
            {index + 1}
          </span>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            {question.text}
          </h3>
        </div>
        <span className="inline-flex shrink-0 items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          {question.type === 'input'
            ? 'Short Answer'
            : question.type === 'boolean'
              ? 'True / False'
              : 'Multiple Choice'}
        </span>
      </div>

      <div className="mt-4 pl-0 sm:pl-10">
        {question.type === 'boolean' && (
          <div className="space-y-2">
            {['True', 'False'].map((option) => {
              const isCorrect =
                question.correctAnswer?.toLowerCase() === option.toLowerCase();
              return (
                <div
                  key={option}
                  className={`flex items-center justify-between rounded-md border px-4 py-2.5 text-sm transition ${
                    isCorrect
                      ? 'border-mint-300 bg-mint-50/80 text-mint-950 font-medium dark:border-mint-800/80 dark:bg-mint-950/50 dark:text-mint-200'
                      : 'border-gray-200 bg-gray-50/60 text-gray-600 dark:border-gray-800 dark:bg-gray-800/40 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      disabled
                      checked={isCorrect}
                      className="h-4 w-4 text-mint-600 focus:ring-mint-500 dark:text-mint-400"
                    />
                    <span>{option}</span>
                  </div>
                  {isCorrect && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-mint-100 px-2 py-0.5 text-xs font-semibold text-mint-800 dark:bg-mint-900/60 dark:text-mint-300">
                      <CheckIcon className="h-3.5 w-3.5" />
                      Correct answer
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {question.type === 'input' && (
          <div className="space-y-2">
            <div className="rounded-md border border-gray-200 bg-gray-50/60 px-4 py-2.5 text-sm italic text-gray-400 dark:border-gray-800 dark:bg-gray-805 dark:text-gray-500">
              User text answer placeholder...
            </div>
            {question.correctAnswer && (
              <div className="inline-flex items-center gap-2 rounded-md border border-mint-200 bg-mint-50 px-3.5 py-2 text-xs font-medium text-mint-900 dark:border-mint-800/70 dark:bg-mint-950/50 dark:text-mint-200">
                <span className="font-bold text-mint-700 dark:text-mint-400">
                  Expected answer:
                </span>
                <span>{question.correctAnswer}</span>
              </div>
            )}
          </div>
        )}

        {question.type === 'checkbox' && (
          <div className="space-y-2">
            {question.options && question.options.length > 0 ? (
              question.options.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-center justify-between rounded-md border px-4 py-2.5 text-sm transition ${
                    option.isCorrect
                      ? 'border-mint-300 bg-mint-50/80 text-mint-950 font-medium dark:border-mint-800/80 dark:bg-mint-950/50 dark:text-mint-200'
                      : 'border-gray-200 bg-gray-50/60 text-gray-600 dark:border-gray-800 dark:bg-gray-800/40 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      disabled
                      checked={option.isCorrect}
                      className="h-4 w-4 rounded text-mint-600 focus:ring-mint-500 dark:text-mint-400"
                    />
                    <span>{option.text}</span>
                  </div>
                  {option.isCorrect && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-mint-100 px-2 py-0.5 text-xs font-semibold text-mint-800 dark:bg-mint-900/60 dark:text-mint-300">
                      <CheckIcon className="h-3.5 w-3.5" />
                      Correct option
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs italic text-gray-400 dark:text-gray-500">
                No options provided
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionView;
