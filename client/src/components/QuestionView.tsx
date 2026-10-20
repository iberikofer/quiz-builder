import type { Question } from '../types/quiz';
import { CheckIcon } from '../assets/svg';

interface QuestionViewProps {
  question: Question;
  index: number;
}

function QuestionView({ question, index }: QuestionViewProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">
            {index + 1}
          </span>
          <h3 className="text-base font-semibold text-gray-900">
            {question.text}
          </h3>
        </div>
        <span className="inline-flex shrink-0 items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
          {question.type === 'input'
            ? 'Short Answer'
            : question.type === 'boolean'
              ? 'True / False'
              : 'Multiple Choice'}
        </span>
      </div>

      <div className="mt-5 pl-10">
        {question.type === 'boolean' && (
          <div className="space-y-2">
            {['True', 'False'].map((option) => {
              const isCorrect =
                question.correctAnswer?.toLowerCase() === option.toLowerCase();
              return (
                <div
                  key={option}
                  className={`flex items-center justify-between rounded-lg border px-4 py-2.5 text-sm transition ${
                    isCorrect
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-950 font-medium'
                      : 'border-gray-200 bg-gray-50/60 text-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      disabled
                      checked={isCorrect}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>{option}</span>
                  </div>
                  {isCorrect && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
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
            <div className="rounded-lg border border-gray-200 bg-gray-50/60 px-4 py-2.5 text-sm italic text-gray-400">
              User text answer placeholder...
            </div>
            {question.correctAnswer && (
              <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-medium text-emerald-900">
                <span className="font-bold text-emerald-700">
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
                  className={`flex items-center justify-between rounded-lg border px-4 py-2.5 text-sm transition ${
                    option.isCorrect
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-950 font-medium'
                      : 'border-gray-200 bg-gray-50/60 text-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      disabled
                      checked={option.isCorrect}
                      className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>{option.text}</span>
                  </div>
                  {option.isCorrect && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                      <CheckIcon className="h-3.5 w-3.5" />
                      Correct option
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs italic text-gray-400">
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
