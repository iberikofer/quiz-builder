'use client';

import { useFieldArray } from 'react-hook-form';
import type {
  Control,
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
} from 'react-hook-form';
import type { QuizFormData } from '../validators/quizFormSchema';
import {
  CheckCircleIcon,
  LinesIcon,
  CheckIcon,
  CloseCircleIcon,
} from '../assets/svg';

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
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">
          {index + 1}
        </span>
        {canRemove && (
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-xs font-medium text-red-500 hover:text-red-700"
          >
            Remove Question
          </button>
        )}
      </div>

      <div className="mt-4 space-y-4">
        {/* Question Type Selection */}
        <div>
          <label className="block text-xs font-medium text-gray-700">
            Question Type
          </label>
          <div className="mt-1 flex gap-2">
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
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  watchedType === t.type
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Question Text */}
        <div>
          <label className="block text-xs font-medium text-gray-700">
            Question Statement
          </label>
          <input
            type="text"
            placeholder="e.g. Next.js App Router uses Server Components by default."
            {...register(`questions.${index}.text`)}
            className={`mt-1 block w-full rounded-lg border px-3.5 py-2 text-sm transition focus:outline-none focus:ring-2 ${
              questionErrors?.text
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
          />
          {questionErrors?.text && (
            <p className="mt-1 text-xs text-red-600">{questionErrors.text.message}</p>
          )}
        </div>

        {/* Answer configuration based on type */}
        {watchedType === 'boolean' && (
          <div>
            <label className="block text-xs font-medium text-gray-700">
              Correct Answer
            </label>
            <div className="mt-1.5 flex gap-3">
              {['True', 'False'].map((val) => (
                <label
                  key={val}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3.5 py-2 text-xs font-medium hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    value={val}
                    {...register(`questions.${index}.correctAnswer`)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>{val}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {watchedType === 'input' && (
          <div>
            <label className="block text-xs font-medium text-gray-700">
              Expected Answer Text
            </label>
            <input
              type="text"
              placeholder="e.g. Server Component"
              {...register(`questions.${index}.correctAnswer`)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        )}

        {watchedType === 'checkbox' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium text-gray-700">
                Options & Correct Answers
              </label>
              <button
                type="button"
                onClick={() => append({ text: '', isCorrect: false })}
                className="text-xs font-medium text-blue-600 hover:text-blue-800"
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
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    title="Mark as correct answer"
                  />
                  <input
                    type="text"
                    placeholder={`Option ${optIndex + 1}`}
                    {...register(`questions.${index}.options.${optIndex}.text`)}
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {fields.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(optIndex)}
                      className="text-gray-400 hover:text-red-500 p-1 text-xs"
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
