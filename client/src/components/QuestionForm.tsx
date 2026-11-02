'use client';

import { useFieldArray } from 'react-hook-form';
import type {
  Control,
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
} from 'react-hook-form';
import type { QuizFormData } from '../validators/quizFormSchema';

interface QuestionFormProps {
  index: number;
  control: Control<QuizFormData>;
  register: UseFormRegister<QuizFormData>;
  errors: FieldErrors<QuizFormData>;
  setValue: UseFormSetValue<QuizFormData>;
  remove: (index: number) => void;
  watchedType?: 'boolean' | 'input' | 'checkbox';
  canRemove: boolean;
}

function QuestionForm({
  index,
  control,
  register,
  errors,
  setValue,
  remove,
  watchedType = 'boolean',
  canRemove,
}: QuestionFormProps) {
  const { fields, append, remove: removeOption } = useFieldArray({
    control,
    name: `questions.${index}.options` as 'questions.0.options',
  });

  const questionErrors = errors.questions?.[index];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-mint-50 text-xs font-bold text-mint-700 dark:bg-mint-950/60 dark:text-mint-400">
          {index + 1}
        </span>
        {canRemove && (
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-xs font-medium text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            Remove Question
          </button>
        )}
      </div>

      <div className="mt-4 space-y-4">
        {/* Question Type Selection */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
            Question Type
          </label>
          <div className="mt-1 flex flex-wrap gap-2">
            {[
              { type: 'boolean', label: 'True / False' },
              { type: 'input', label: 'Short Answer' },
              { type: 'checkbox', label: 'Multiple Choice' },
            ].map((t) => (
              <button
                key={t.type}
                type="button"
                onClick={() => {
                  setValue(`questions.${index}.type`, t.type as 'boolean' | 'input' | 'checkbox');
                  if (t.type === 'boolean') {
                    setValue(`questions.${index}.correctAnswer`, 'True');
                  } else {
                    setValue(`questions.${index}.correctAnswer`, '');
                  }
                }}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                  watchedType === t.type
                    ? 'bg-mint-600 text-white shadow-sm dark:bg-mint-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Question Text */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
            Question Statement
          </label>
          <input
            type="text"
            placeholder="e.g. Next.js App Router uses Server Components by default."
            {...register(`questions.${index}.text`)}
            className={`mt-1 block w-full rounded-md border px-3.5 py-2 text-sm transition focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white ${
              questionErrors?.text
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200 dark:border-red-800'
                : 'border-gray-300 focus:border-mint-500 focus:ring-mint-200 dark:border-gray-700 dark:focus:ring-mint-900'
            }`}
          />
          {questionErrors?.text && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">{questionErrors.text.message}</p>
          )}
        </div>

        {/* Answer configuration based on type */}
        {watchedType === 'boolean' && (
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
              Correct Answer
            </label>
            <div className="mt-1.5 flex gap-3">
              {['True', 'False'].map((val) => (
                <label
                  key={val}
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 px-3.5 py-2 text-xs font-medium hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-750"
                >
                  <input
                    type="radio"
                    value={val}
                    {...register(`questions.${index}.correctAnswer`)}
                    className="text-mint-600 focus:ring-mint-500 dark:text-mint-400"
                  />
                  <span>{val}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {watchedType === 'input' && (
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
              Expected Answer Text
            </label>
            <input
              type="text"
              placeholder="e.g. Server Component"
              {...register(`questions.${index}.correctAnswer`)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3.5 py-2 text-sm focus:border-mint-500 focus:outline-none focus:ring-2 focus:ring-mint-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-mint-900"
            />
          </div>
        )}

        {watchedType === 'checkbox' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                Options & Correct Answers
              </label>
              <button
                type="button"
                onClick={() => append({ text: '', isCorrect: false })}
                className="text-xs font-medium text-mint-600 hover:text-mint-700 dark:text-mint-400 dark:hover:text-mint-300"
              >
                + Add Option
              </button>
            </div>

            <div className="space-y-2">
              {fields.map((optField, optIndex) => (
                <div key={optField.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register(`questions.${index}.options.${optIndex}.isCorrect`)}
                    className="h-4 w-4 rounded border-gray-300 text-mint-600 focus:ring-mint-500 dark:border-gray-700 dark:bg-gray-800"
                    title="Mark as correct answer"
                  />
                  <input
                    type="text"
                    placeholder={`Option ${optIndex + 1}`}
                    {...register(`questions.${index}.options.${optIndex}.text`)}
                    className="flex-1 rounded-md border border-gray-300 px-3 py-1.5 text-xs focus:border-mint-500 focus:outline-none focus:ring-2 focus:ring-mint-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-mint-900"
                  />
                  {fields.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(optIndex)}
                      className="text-gray-400 hover:text-red-500 p-1 text-xs dark:hover:text-red-400"
                      title="Remove option"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionForm;
